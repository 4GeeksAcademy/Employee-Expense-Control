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
        return jsonify({"msg": "Email no registrado"}), 404

    # Genera un token de recuperación usando el id del empleado
    token = generate_reset_token(employee.id)

    # Crea el enlace de restablecimiento de contraseña con el token generado
    # Modifica este enlace según mi entorno
    reset_link = f"{frontend_url}/reset-password?token={token}"

    # Crea el correo con el enlace de recuperación
    msg = Message("Restablecer contraseña", recipients=[email])
    msg.body = f"""
             Hola,

            Recibiste este correo porque se solicitó un cambio de contraseña para tu cuenta.

            Haz clic en el siguiente enlace para restablecer tu contraseña. Este enlace es válido por 15 minutos:{reset_link}

            Si no solicitaste este cambio, puedes ignorar este mensaje. Tu contraseña actual permanecerá segura.

            Saludos,
            El equipo de soporte Melena de cangrejo (Bless, Juan, Giovanny, Carlos)
            """
    print(msg)
    # Envía el correo
    mail.send(msg)

    # Responde al frontend confirmando que el correo fue enviado
    return jsonify({"msg": "Correo enviado"}), 200


@api.route('/reset-password', methods=['POST'])
def reset_password():
    data = request.get_json()
    token = data.get('token')
    new_password = data.get('password')

    if not token or not new_password:
        return jsonify({'msg': 'Token y nueva contraseña son requeridos'}), 400

    try:
        decoded_token = decode_token(token)
        employee_id = decoded_token['sub']  # sub =subject=identity
    except Exception as e:
        return jsonify({'msg': 'Token inválido o expirado'}), 400

    employee = Employee.query.get(employee_id)
    if not employee:
        return jsonify({'msg': 'Empleado no encontrado'}), 404
    hashed_password = bcrypt.generate_password_hash(
        new_password).decode('utf-8')
    employee.password = hashed_password
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


@api.route("/me", methods=["POST"])
@jwt_required()
def me():
    user_id = get_jwt_identity()
    user = Employee.query.get(user_id)
    if user is None:
        return jsonify({"msg": "invalid credentials"}), 404
    return jsonify({"name": user.name, "supervisor": bool(user.is_supervisor)})


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
        return ({"msg": "Invalid object"}), 400

    fields_required = ["budget_description"]

    for field in fields_required:
        if field not in body:
            return jsonify({"msg": "Invalid creedentials"}), 400

    if body["budget_description"].strip() == "":
        return jsonify({"msg": "Invalid credentials"}), 400

    budget_description = body["budget_description"]

    new_budget = Budget(budget_description=budget_description,
                        employee_id=1, department_id=1)
    db.session.add(new_budget)
    db.session.commit()
    return jsonify({"msg": "Budget created successfully"}), 201


@api.route("/bill", methods=["POST"])
@jwt_required()
def bill_create():
    user_id = get_jwt_identity()
    user = Employee.query.get(user_id)

    if user is None:
        return jsonify({"msg": "Invalid credentials"}), 404

    body = request.get_json(silent=True)

    if body is None:
        return jsonify({"msg": "Invalid object"}), 400

    filds_required = ["description", "location", "amount", "date"]

    for filed in filds_required:
        if filed not in body:
            return jsonify({"msg": "invalid credentials"}), 400

    if body["description"].strip() == "" or body["location"].strip() == "" or body["amount"].strip() == "" or body["date"].strip() == "":
        return jsonify({"msg": "Invalid credentials"}), 400

    trip_description = body["description"]
    trip_address = body["location"]
    amount = float(body["amount"])
    date = body["date"]

    new_bill = Bill(trip_description=trip_description,
                    trip_address=trip_address, state="PENDING", amount=amount, evaluator_id=1, date_approved=None, budget_id=3)
    db.session.add(new_bill)
    db.session.commit()
    return jsonify({"msg": "bill created successfully"}), 201


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
