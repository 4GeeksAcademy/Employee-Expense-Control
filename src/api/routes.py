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
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt, get_jwt_identity, JWTManager, decode_token
import re
import cloudinary.uploader
from dotenv import load_dotenv
import os
from datetime import datetime, timezone
from .models import StateType
from .models import StateBudget

load_dotenv()  # Carga las variables desde .env
FRONTEND_URL = os.getenv('FRONTEND_URL')

api = Blueprint('api', __name__)
bcrypt = Bcrypt()
# Allow CORS requests to this API
CORS(api)

jwt = JWTManager()

# mail = Mail()
# mail.init_app()

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
    frontend_url = FRONTEND_URL

    # Busca al empleado en la base de datos usando el email
    employee = Employee.query.filter_by(email=email).first()

    # Si no existe un empleado con ese email, devuelve un error
    if not employee:
        return jsonify({"msg": "Email not registered. Please sign up."}), 404

    # Genera un token de recuperación usando el id del empleado
    token = generate_reset_token(employee.id)

    # Crea el enlace de restablecimiento de contraseña con el token generado
    # Modifica este enlace según mi entorno
    reset_link = f"{frontend_url}/reset-password?token={token}"

    # Crea el correo con el enlace de recuperación
    msg = Message("Reset password", recipients=[email])
    msg.body = f"""
             Hello,

            You received this email because a password reset was requested for your account.

            Click the following link to reset your password. This link is valid for 15 minutes: {reset_link}

            If you did not request this change, you can ignore this message. Your current password will remain secure.

            Regards,  
                    El Melena de cangrejo support team (Bless, Juan, Giovanny, Carlos)
            """
    print(msg)
    # Envía el correo
    mail.send(msg)

    # Responde al frontend confirmando que el correo fue enviado
    return jsonify({"msg": "Email sent"}), 200


@api.route('/reset-password', methods=['POST'])
def reset_password():
    data = request.get_json()
    token = data.get('token')
    new_password = data.get('password')

    if not token or not new_password:
        return jsonify({'msg': 'Token and new password are required.'}), 400

    try:
        decoded_token = decode_token(token)
        employee_id = decoded_token['sub']  # sub =subject=identity
    except Exception as e:
        return jsonify({'msg': 'Invalid or expired token.'}), 400

    employee = Employee.query.get(employee_id)
    if not employee:
        return jsonify({'msg': 'Employee not found'}), 404

    hashed_password = bcrypt.generate_password_hash(
        new_password).decode('utf-8')
    employee.password = hashed_password
    db.session.commit()

    return jsonify({'msg': 'Password updated successfully'}), 200


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

@api.route("/me", methods=["GET"])
@jwt_required()
def get_me_user():
    user_id = get_jwt_identity()
    user = Employee.query.get(user_id)

    if not user:
        return jsonify({"msg": "User not found"}), 404

    return jsonify({"id": user.id, "name": user.name, "email": user.email, "rol": user.is_supervisor}), 200


@api.route("/myid", methods=["GET"])
@jwt_required()
def my_id():
    employee_id = get_jwt_identity()
    employee = Employee.query.get(employee_id)

    if employee is None or employee.is_supervisor:
        return jsonify({"msg": "you don't have permission"}), 403

    return jsonify({"id": employee.id}), 200


@api.route("/assigndepartment", methods=["PUT"])
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
    return jsonify({"msg": "successfully assigned"}), 200


@api.route("/assign-supervisor-department", methods=["PUT"])
@jwt_required()
def assign_supervisor_department():
    supervisor_id = get_jwt_identity()
    supervisor = Employee.query.get(supervisor_id)

    if supervisor is None or not supervisor.is_supervisor:
        return jsonify({"msg": "Unauthorized access"}), 403

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

    return jsonify({"msg": "Supervisor assigned to department successfully"}), 200


@api.route("/supervisor-area", methods=["GET"])
@jwt_required()
def supervisor_area():
    claims = get_jwt()
    rol = claims.get("rol")

    if rol != "CBJ-G13":
        return jsonify({"msg": "Unauthorized"}), 403

    return jsonify({"msg": "Welcome",
                    "data": {
                        "rol": rol,
                        "access_level": claims.get("lvl")}
                    }), 200


@api.route("/bills/<int:bill_id>/state", methods=["PATCH"])
@jwt_required()
def update_bill_state(bill_id):
    supervisor_id = get_jwt_identity()
    supervisor = Employee.query.get(supervisor_id)

    # Ensure requester is a supervisor
    if supervisor is None or not supervisor.is_supervisor:
        return jsonify({"msg": "Unauthorized"}), 403

    data = request.get_json()
    # bill_id = data.get("bill_id")
    new_state = data.get("state")  # "approved" or "denegated"

    # Validate input
    if new_state not in ["approved", "denegated"]:
        return jsonify({"msg": "Invalid bill ID or state"}), 400

    bill = Bill.query.get(bill_id)

    if bill is None:
        return jsonify({"msg": "Bill not found"}), 404

    # Prevents re-approval/denial
    # better than bill.state.APPROVED
    if bill.state in [StateType.APPROVED, StateType.DENEGATED]:
        return jsonify({"msg": f"Bill already {bill.state.name.lower()}."}), 400

     # Update bill state
    try:
        bill.state = StateType[new_state.upper()]
    except KeyError:
        return jsonify({"msg": "Invalid state"}), 400

    bill.evaluator_id = supervisor_id
    bill.date_approved = datetime.now(timezone.utc)

    '''Record who submitted the bill (from Budget → Employee)'''
    budget = Budget.query.get(bill.budget_id)
    # Attach the original submitter
    employee_id = budget.employee_id if budget else None

    db.session.commit()

    # ✅ Add employee_id to serialized response
    bill_data = bill.serialize()
    bill_data["employee_id"] = employee_id

    print("Budget:", budget)
    print("Budget employee_id:", employee_id)
    print("Serialized bill data:", bill_data)

    return jsonify({"msg": f"Bill {bill_id} successfully {new_state}.",
                    "bill": bill_data}), 200


@api.route("/budgets/<int:budget_id>/state", methods=["PATCH"])
@jwt_required()
def update_budget_state(budget_id):
    supervisor_id = get_jwt_identity()
    supervisor = Employee.query.get(supervisor_id)

    # Ensure requester is a supervisor
    if supervisor is None or not supervisor.is_supervisor:
        return jsonify({"msg": "Unauthorized"}), 403

    data = request.get_json()
    new_state = data.get("state")  # "approved" or "rejected"
    new_amount = data.get("amount")

    # Validate input
    if not new_state in ["accepted", "rejected"]:
        return jsonify({"msg": "Invalid budget ID or state"}), 400

    budget = Budget.query.get(budget_id)

    if budget is None:
        return jsonify({"msg": "Budget not found"}), 404

    # Prevents re-approval/denial
    if budget.state in [StateBudget.ACCEPTED, StateBudget.REJECTED]:
        return jsonify({"msg": f"Budget already {budget.state.name.lower()}."}), 400

 # If amount is given, validate and update
    if new_amount is not None:
        try:
            new_amount = float(new_amount)
            if new_amount <= 0:
                return jsonify({"msg": "Amount must be a positive number"}), 400
            budget.amount = new_amount
            budget.available = new_amount  # update available as well if logic permits
        except (ValueError, TypeError):
            return jsonify({"msg": "Invalid amount format"}), 400

    if new_amount is not None and new_state == "rejected":
        return jsonify({"msg": "Cannot update amount for a rejected budget"}), 400

     # Update budget state
    try:
        budget.state = StateBudget[new_state.upper()]
    except KeyError:
        return jsonify({"msg": "Invalid state"}), 400

    # Assign evaluator to budget (supervisor who approved/denied the bill)
    budget.evaluator_id = supervisor_id
    budget.date_approved = datetime.now(timezone.utc)

    db.session.commit()

    return jsonify({"msg": f"Budget {budget_id} successfully {new_state}.",
                    "budget": budget.serialize()}
                   ), 200

# un endpoint (GET) donde el supervisor pueda obtener todos los budget de su departmento. Serialize
# y enviar a frontend. y una vez en el frontend, guardar los datos en el store. Una vez guardado en el store
# usar useParams para acceder al ID.


@api.route("/supervisor-budgets-bills", methods=["GET"])
@jwt_required()
def get_department_budgets_and_bills():
    current_user_id = get_jwt_identity()
    supervisor = Employee.query.get(current_user_id)

    if not supervisor or not supervisor.is_supervisor:
        return jsonify({"error": "Unauthorized or not a supervisor"}), 403

    department_id = supervisor.department_id

    if not department_id:
        return jsonify({"error": "Supervisor has no department assigned"}), 400

    budgets = Budget.query.filter_by(department_id=department_id).all()

    serialized_data = [budget.serialize() for budget in budgets]

    return jsonify({
        "department_id": department_id,
        "data": {
            "supervisor_name": supervisor.name,
            "budgets": serialized_data
        }
    }), 200


@api.route("/supervisor-get-bills", methods=["GET"])
@jwt_required()
def supervisor_get_bills():
    try:
        supervisor_id = get_jwt_identity()

        if not supervisor_id:
            return jsonify({"msg": "Invalid token"}), 401

        supervisor = Employee.query.get(supervisor_id)
        if not supervisor or not supervisor.is_supervisor:
            return jsonify({"msg": "Supervisor not found or unauthorized"}), 404

          # Get all budgets evaluated by this supervisor
        budgets = Budget.query.filter_by(evaluator_id=supervisor_id).all()

        # Collect all bills from these budgets
        all_bills = []
        for budget in budgets:
            all_bills.extend(budget.bills)

        return jsonify({"bills": [bill.serialize() for bill in all_bills]})

    except Exception as e:
        print("❌ Server Error in /supervisor-get-bills:", e)
        return jsonify({"msg": "Internal server error"}), 500


@api.route("/supervisor-total-expense", methods=["GET"])
@jwt_required()
def get_total_expense():
    current_user_id = get_jwt_identity()
    supervisor = Employee.query.get(current_user_id)

    if not supervisor or not supervisor.is_supervisor:
        return jsonify({"error": "Unauthorized or not a supervisor"}), 403

    department_id = supervisor.department_id
    if not department_id:
        return jsonify({"error": "Supervisor has no department assigned"}), 400

# #AÑADIR UN FILTRO PARA DIVIDIR UNA LISTA DE TODOS LOS EMPLEADOS Y DEPARTAMENTOS DE FORMA INDIVIDUAL
# #USAMOS REQUEST.ARGS.GET PARA OBTENER LOS PARAMETROS A TRAVES DE LA URL Y AÑADIMOS TYPE=INT PARA
# #BUSCAR EL PARAMETRO EMPLOYEE_ID EN LA URL SI EXISTE LO CONVIERTE EN INT AUTOMATICAMENTE Y SI NO DEVUELVE NONE
#
    department = Department.query.get(department_id)

    # Obtener parámetro employee_id desde la URL
    employee_id_param = request.args.get("employee_id", type=int)
    if employee_id_param:
        employees = Employee.query.filter_by(
            id=employee_id_param, department_id=department_id).all()
    else:
        employees = Employee.query.filter_by(
            department_id=department_id, is_supervisor=False).all()

    department_total = 0.0
    total_active_budgets = 0
    employees_data = []

    for employee in employees:
        employee_total = 0.0
        employee_budgets = []

        for budget in employee.budgets:
            # Get all bills (approved, pending, rejected)
            all_bills = budget.bills
            approved_bills = [
                bill for bill in all_bills if bill.state == StateType.APPROVED]

            #  Only approved bills count toward totals
            budget_total = sum(float(bill.amount) for bill in approved_bills)

            if approved_bills:
                employee_total += budget_total
                department_total += budget_total
                total_active_budgets += 1

            employee_budgets.append({
                "budget_id": budget.id,
                "description": budget.budget_description,
                "total": budget_total,  # total of approved bills only
                "state": budget.state.name,
                # show all bills for review
                "bills": [bill.serialize() for bill in all_bills]
            })

        employees_data.append({
            "employee_id": employee.id,
            "name": employee.name,
            "total_expenses": employee_total,  # only approved
            "budgets": employee_budgets
        })

    return {
        "department": {
            "name": department.name,
            "total_expenses": department_total  # only approved
        },
        "employees": employees_data,
        "total_active_budgets": total_active_budgets
    }


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

    existing_pending_budget = Budget.query.filter_by(
        employee_id=user.id, state=StateBudget.PENDING).first()
    if existing_pending_budget:
        # 409 Conflict
        return jsonify({"msg": "You already have a pending budget"}), 409

    body = request.get_json(silent=True)

    if body is None:
        return jsonify({"msg": "Invalid object"}), 401

    fields_required = ["budget_description", "amount"]

    for field in fields_required:
        if field not in body:
            return jsonify({"msg": "Invalid credentials"}), 402

    if body["budget_description"].strip() == "" or body["amount"].strip() == "":
        return jsonify({"msg": "Invalid credentials"}), 403

    budget_description = body["budget_description"]
    amount = float(body["amount"])

    try:
        new_budget = Budget(
            budget_description=budget_description,
            employee_id=user.id,
            department_id=user.department_id,
            amount=amount,
            available=amount,
            state=StateBudget.PENDING,
            condition=None
        )
        db.session.add(new_budget)
        db.session.commit()
        return jsonify({"msg": "Budget created successfully"}), 201
    except Exception as e:
        print(e)
        return jsonify({"msg": "error"}), 500


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


@api.route("/mybills", methods=["GET"])
@jwt_required()
def my_bills():
    try:
        employee_id = get_jwt_identity()

        if not employee_id:
            return jsonify({"msg": "Invalid token"}), 401

        employee = Employee.query.get(employee_id)
        if not employee:
            return jsonify({"msg": "Employee not found"}), 404

        budgets = Budget.query.filter_by(employee_id=employee_id).all()

        # collect all bills from all budgets
        all_bills = []
        for budget in budgets:
            all_bills.extend(budget.bills)

        return jsonify({"bill_list": [bill.serialize() for bill in all_bills]})

    except Exception as e:
        print("❌ Server Error in /mybills:", e)
        return jsonify({"msg": "Internal server error"}), 500


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

@api.route("/deletebudget", methods=["DELETE"])
@jwt_required()
def delete_budget():
    user_id = get_jwt_identity()
    user = Employee.query.get(user_id)
    if user is None:
        return jsonify({"msg": "Invalid credentials"}), 401
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({"msg": "Invalid object"}), 400
    fields_required = ["budget_id"]
    for field in fields_required:
        if field not in body:
            return jsonify({"msg": "Invalid credentials"}), 400
    budget_id = body["budget_id"]
    budget = Budget.query.filter_by(id=budget_id).first()
    if budget is None:
        return jsonify({"msg": "Not found"}), 404
    db.session.delete(budget)
    db.session.commit()
    return jsonify({"msg": "budget successfully deleted"}), 200


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



