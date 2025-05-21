"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint

from api.models import db, Employee, Bill, Department, Budget
from api.utils import generate_sitemap, APIException, generate_reset_token, generate_password_hash, verify_reset_token
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_mail import Message
from extensions import mail
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt, get_jwt_identity, JWTManager
import re
import cloudinary.uploader


api = Blueprint('api', __name__)
bcrypt = Bcrypt()
# Allow CORS requests to this API
CORS(api)
jwt = JWTManager()

revoked_tokens = set()


@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()

    if data is None:
        return jsonify({"Error": "Data Not Provided"}), 400

    name = data.get("name", None)
    last_name = data.get("last_name", None)
    email = data.get("email", None)
    password = data.get("password", None)
    is_supervisor = data.get("is_supervisor", False)

    if not email or not password:
        return jsonify({"Error": "Email and Password are required"}), 400
    if "@" not in email or "." not in email:
        return jsonify({"Error": "Invalid email format"}), 400
    if len(password) < 8:
        return jsonify({"Error": "Password must be at least 8 characters long"}), 400

    # check if an employee already exist
    existing_employee = Employee.query.filter_by(email=email).first()
    if existing_employee:
        return jsonify({"Msg": "This employee already exists. Please go to login."}), 409

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    # Create new user with the data obtained
    new_employee = Employee(
        name=name,
        last_name=last_name,
        email=email,
        password=hashed_password,
        is_supervisor=is_supervisor,
        is_active=True)

    db.session.add(new_employee)
    db.session.commit()
    return jsonify({"msg": "New employee created",
                    "employee": new_employee.serialize()
                    }), 201


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/forgot-password', methods=['POST'])
def forgot_password():
    # Obtiene el email del frontend
    email = request.json.get('email')
    frontend_url = "https://sturdy-telegram-g44v64v9vxq29xww-3000.app.github.dev"

    # Busca al empleado en la base de datos usando el email
    employee = Employee.query.filter_by(email=email).first()

    # Si no existe un empleado con ese email, devuelve un error
    if not employee:
        return jsonify({"msg": "Email no registrado"}), 404

    # Genera un token de recuperación usando el id del empleado
    token = generate_reset_token(employee.id)

    # Crea el enlace de restablecimiento de contraseña con el token generado
    # Modifica este enlace según mi entorno
    reset_link = f"{frontend_url}/reset-password/{token}"

    # Crea el correo con el enlace de recuperación
    msg = Message("Restablecer contraseña", recipients=[email])
    msg.body = f"Usa este enlace para restablecer tu contraseña: {reset_link}"

    # Envía el correo
    mail.send(msg)

    # Responde al frontend confirmando que el correo fue enviado
    return jsonify({"msg": "Correo enviado"}), 200


@api.route('/reset-password', methods=['POST'])
@jwt_required()
def reset_password():
    employee_id = get_jwt_identity()
    if not employee_id:
        return jsonify({'msg': 'Token inválido o expirado'}), 400

    data = request.get_json()
    new_password = data.get('password')

    if not new_password:
        return jsonify({'msg': 'Contraseña nueva requerida'}), 400

    employee = Employee.query.get(employee_id)
    if not employee:
        return jsonify({'msg': 'Empleado no encontrado'}), 404

    employee.password = new_password
    db.session.commit()

    return jsonify({'msg': 'Contraseña actualizada correctamente'}), 200


@api.route('/login', methods=['POST'])
def login_user():
    body = request.get_json(silent=True)

    if body is None:
        return jsonify({"msg": "Invalid object"}), 400

    if body['email'].strip() == "" or body["password"].strip() == "":
        return jsonify({"msg": "Invalid credentials"}), 400

    email = body['email']

    pattern = r"^[\w\.-]+@[\w\.-]+\.\w+$"

    if re.match(pattern, email) is None:
        return jsonify({"msg": "Invalid credentials"}), 400

    password = body["password"]

    if len(password) < 8:
        return jsonify({"msg": "Invalid credentials"}), 401

    user = Employee.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"msg": "Invalid credentials"}), 401

    password_hashed = bcrypt.check_password_hash(user.password, password)
    if not password_hashed:

        return jsonify({"msg": "Invalid credentials"}), 404

    code_r = "CBJ-G13" if user.is_supervisor else "NTO-711"
    access_level = 2 if user.is_supervisor else 1

    token_payload = {
        "sub": str(user.id),
        "rol": code_r,
        "lvl": access_level,
    }

    access_token = create_access_token(identity=str(
        user.id), additional_claims=token_payload)

    refresh_token = create_refresh_token(
        identity=str(user.id), additional_claims=token_payload)

    return jsonify({"token": access_token,
                    "refresh_token": refresh_token,
                    "user": {"id": user.id, "name": user.name, "rol": user.is_supervisor,
                             }}), 201

@api.route("/me", methods=["GET"])
@jwt_required()
def get_me_user():
    user_id = get_jwt_identity()
    user = Employee.query.get(user_id)

    if not user:
        return jsonify({"msg": "User not found"}), 404
    
    return jsonify({"id": user.id, "name": user.name, "email": user.email, "rol": user.is_supervisor}),200


@api.route("/myid", methods=["GET"])
@jwt_required()
def my_id():
    employee_id = get_jwt_identity()
    employee = Employee.query.get(employee_id)

    if employee is None or employee.is_supervisor:
        return jsonify({"msg": "you don't have permission"}), 403

    return jsonify({"id": employee.id}), 200


@api.route("/assigndepartment", methods=["POST"])
@jwt_required()
# solo un supervisor puede asignarle el departamento a un empleado
def assign_department():
    supervisor_id = get_jwt_identity()
    supervisor = Employee.query.get(supervisor_id)
    if supervisor is None or not supervisor.is_supervisor:
        return jsonify({"msg": "unauthorized"}), 403

    data = request.get_json()
    employee_id = data["id_employee"]
    department_id = data["id_department"]

    employee = Employee.query.get(employee_id)
    department = Department.query.get(department_id)

    if employee is None or department is None:
        return jsonify({"msg": "Invalid credentials"}), 401

    employee.department_id = department_id
    db.session.commit()
    return jsonify({"msg": "successfully assigned"}), 201


@api.route("/assign-supervisor-department", methods=["POST"])
@jwt_required()
def assign_supervisor_department():
    supervisor_id = get_jwt_identity()
    supervisor = Employee.query.get(supervisor_id)

    if supervisor is None or not supervisor.is_supervisor:
        return jsonify({"msg": "unauthorized"}), 403

    data = request.get_json()

    if not data or "id_employee" not in data or "id_department" not in data:
        return jsonify({"msg": "Invalid data"}), 400

    supervisor_to_assign_id = data["id_employee"]
    department_id = data["id_department"]

    supervisor_to_assign = Employee.query.get(supervisor_to_assign_id)
    department = Department.query.get(department_id)

    if supervisor_to_assign is None or not supervisor_to_assign.is_supervisor:
        return jsonify({"msg": "The selected employee is not a supervisor"}), 400

    if department is None:
        return jsonify({"msg": "Department not found"}), 404

    existing_supervisor = Employee.query.filter_by(
        department_id=department_id, is_supervisor=True).first()
    if existing_supervisor and existing_supervisor.id != supervisor_to_assign_id:
        return jsonify({"msg": "Department already has a supervisor assigned"}), 409

    supervisor_to_assign.department_id = department_id
    db.session.commit()

    return jsonify({"msg": "Supervisor assigned to department successfully"}), 201


@api.route("/supervisor-area", methods=["GET"])
@jwt_required()
def supervisor_area():
    claims = get_jwt()
    rol = claims.get("rol")

    if rol != "CBJ-G13":
        return jsonify({"msg": "Unauthorized access"}), 403

    return jsonify({"msg": "Welcome",
                    "data": {
                        "rol": rol,
                        "access_level": claims.get("lvl")}
                    })


@api.route("/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh():
    user = get_jwt_identity()
    new_access_token = create_access_token(identity=user)
    return jsonify({"token": new_access_token})


@api.route("/upload", methods=["POST"])
def upload():
    if "bill" not in request.files:
        return jsonify({"msg": "the image has not been sent correctly"}), 400

    image = request.files["bill"]

    try:
        upload_result = cloudinary.uploader.upload(image, folder="bills")

        return jsonify({"url": upload_result["secure_url"], "public_id": upload_result["public_id"]}), 200

    except Exception as e:

        return jsonify({"error": str(e)}), 500


@api.route("/budget", methods=["POST"])
@jwt_required()
def budget_create():
    user_id = get_jwt_identity()
    user = Employee.query.get(user_id)

    if user is None:
        return jsonify({"msg": "Invalid credentials"}), 404

    body = request.get_json(silent=True)

    if body is None:
        return ({"msg": "Invalid object"}), 401

    fields_required = ["budget_description", "amount"]

    for field in fields_required:
        if field not in body:
            return jsonify({"msg": "Invalid creedentials"}), 402

    if body["budget_description"].strip() == "" or body["amount"].strip() == "":
        return jsonify({"msg": "Invalid credentials"}), 403

    budget_description = body["budget_description"]
    amount = float(body["amount"])

    new_budget = Budget(budget_description=budget_description,
                        employee_id=user.id, department_id=user.department_id, amount=amount, available=amount, state="PENDING", condition=None)
    db.session.add(new_budget)
    db.session.commit()
    return jsonify({"msg": "Budget created successfully"}), 201


@api.route("/mybudgets", methods=["GET"])
@jwt_required()
def my_budgets():
    employee_id = get_jwt_identity()
    employee = Employee.query.get(employee_id)

    if employee is None:
        return jsonify({"msg": "Not response"}), 404

    budgets = Budget.query.filter_by(employee_id=employee_id).all()

    return jsonify({"budget_list": [budget.serialize() for budget in budgets], }), 200


@api.route("/bill", methods=["POST"])
@jwt_required()
def bill_create():
    user_id = get_jwt_identity()
    user = Employee.query.get(user_id)

    if user is None:
        return jsonify({"msg": "Not response"}), 404

    body = request.get_json(silent=True)

    if body is None:
        return jsonify({"msg": "Invalid object"}), 401

    filds_required = ["description", "location", "amount", "date"]

    for filed in filds_required:
        if filed not in body:
            return jsonify({"msg": "invalid credentials"}), 402

    if body["description"].strip() == "" or body["location"].strip() == "" or body["amount"].strip() == "" or body["date"].strip() == "":
        return jsonify({"msg": "Invalid credentials"}), 403

    trip_description = body["description"]
    trip_address = body["location"]
    amount = float(body["amount"])
    date = body["date"]

    budget = Budget.query.filter_by(
        employee_id=user.id, state="ACCEPTED").order_by(Budget.id.desc()).first()

    if budget is None:
        return jsonify({"msg": "Invalid credentials"}), 404

    supervisor = Employee.query.filter_by(
        department_id=user.department_id,
        is_supervisor=True
    ).first()

    if supervisor is None:
        return jsonify({"msg": "Invalid credentials"}), 405

    new_bill = Bill(trip_description=trip_description,
                    trip_address=trip_address, state="PENDING", amount=amount, evaluator_id=supervisor.id, date_approved=None, budget_id=budget.id)
    db.session.add(new_bill)
    db.session.commit()
    return jsonify({"msg": "bill created successfully"}), 201


@api.route("/deletebill", methods=["DELETE"])
@jwt_required()
def detete_bill():
    user_id = get_jwt_identity()
    user = Employee.query.get(user_id)
    if user is None:
        return jsonify({"msg": "Invalid credentials"}), 401
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({"msg": "Invalid object"}), 400
    fields_required = ["id_bill"]
    for field in fields_required:
        if field not in body:
            return jsonify({"msg": "Invalid credentials"}), 400
    bill_id = body["id_bill"]
    bill = Bill.query.filter_by(id=bill_id).first()
    if bill is None:
        return jsonify({"msg": "Not found"}), 404
    db.session.delete(bill)
    db.session.commit()
    return jsonify({"msg": "bill successfully deleted"}), 200


@api.route("/updatebill", methods=["PUT"])
@jwt_required()
def update_bill():
    user_id = get_jwt_identity()
    user = Employee.query.get(user_id)
    if user is None:
        return jsonify({"msg": "Invalid credentials"}), 401

    body = request.get_json(silent=True)
    if body is None:
        return jsonify({"msg": "Invalid object"}), 400

    if "id_bill" not in body:
        return jsonify({"msg": "Missing bill ID"}), 400

    bill_id = body["id_bill"]
    bill = Bill.query.filter_by(id=bill_id).first()
    if bill is None:
        return jsonify({"msg": "Bill not found"}), 404

    editable_fields = ["amount", "trip_description", "trip_address"]

    for field in editable_fields:
        if field in body:
            setattr(bill, field, body[field])

    db.session.commit()

    return jsonify({"msg": "Bill updated successfully", "bill": bill.serialize()}), 200


@api.route("/logout", methods=['POST'])
@jwt_required()
def logout():
    jti = get_jwt()["jti"]
    revoked_tokens.add(jti)
    return jsonify({"msg": "User logged out"})


@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload):
    jti = jwt_payload["jti"]
    return jti in revoked_tokens
