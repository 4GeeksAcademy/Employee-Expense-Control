"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint

from api.models import db, Employee, Bill, Department, Budget
from api.utils import generate_sitemap, APIException, generate_reset_token, generate_password_hash, verify_reset_token
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt, get_jwt_identity
from flask_mail import Message
from extensions import mail 
import re
import cloudinary.uploader


api = Blueprint('api', __name__)
bcrypt = Bcrypt()
# Allow CORS requests to this API
CORS(api)


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
    frontend_url="https://sturdy-telegram-g44v64v9vxq29xww-3000.app.github.dev"
    
    # Busca al empleado en la base de datos usando el email
    employee = Employee.query.filter_by(email=email).first()  
    
    # Si no existe un empleado con ese email, devuelve un error
    if not employee:
        return jsonify({"msg": "Email no registrado"}), 404

    # Genera un token de recuperación usando el id del empleado
    token = generate_reset_token(employee.id)
    
    # Crea el enlace de restablecimiento de contraseña con el token generado
    reset_link = f"{frontend_url}/reset-password/{token}" # Modifica este enlace según mi entorno

    # Crea el correo con el enlace de recuperación
    msg = Message("Restablecer contraseña", recipients=[email])
    msg.body = f"Usa este enlace para restablecer tu contraseña: {reset_link}"

    # Envía el correo
    mail.send(msg)

    # Responde al frontend confirmando que el correo fue enviado
    return jsonify({"msg": "Correo enviado"}), 200


@api.route('/reset-password/<token>', methods=['POST'])
def reset_password(token):
    employee_id = verify_reset_token(token)
    if not employee_id:
        return jsonify({'msg': 'Token inválido o expirado'}), 400

    data = request.get_json()
    new_password = data.get('password')

    if not new_password:
        return jsonify({'msg': 'Contraseña nueva requerida'}), 400

    employee = Employee.query.get(employee_id)
    if not employee:
        return jsonify({'msg': 'Empleado no encontrado'}), 404

    employee.password = generate_password_hash(new_password)
    db.session.commit()

    return jsonify({'msg': 'Contraseña actualizada correctamente'}), 200




@api.route('/login', methods=['POST'])
def login_user():
    body = request.get_json()

    if body['email'].strip() == "" or body["password"].strip() == "":
        return jsonify({"msg": "fields cannot be empty"}), 400

    email = body['email']

    pattern = r"^[\w\.-]+@[\w\.-]+\.\w+$"

    if re.match(pattern, email) is None:
        return jsonify({"msg": "The email format is not valid"}), 400

    password = body["password"]

    if len(password) < 8:
        return jsonify({"msg": "Invalid credentials"}), 401

    user = Employee.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"msg": "Invalid credentials"}), 401

    password_hashed = bcrypt.check_password_hash(user.password, password)
    if not password_hashed:
        return jsonify({"msg": "Incorrect data"}), 404

    # if user.password != password:
    #     return jsonify({"msg": "Invalid credentials"}), 401

    access_token = create_access_token(identity=str(user.id))

    refresh_token = create_refresh_token(identity=str(user.id))

    return jsonify({"token": access_token, "refresh_token": refresh_token}), 201


@api.route("/me", methods=["POST"])
@jwt_required()
def me():
    user_id = get_jwt_identity()
    user = Employee.query.filter_by(id=user_id).first()
    if user is None:
        return jsonify({"msg": "not found"}), 404
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
