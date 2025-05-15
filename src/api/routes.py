"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Employee
from api.utils import generate_sitemap, APIException, generate_reset_token, generate_password_hash, verify_reset_token
from flask_cors import CORS
from flask_mail import Message
from src.app import mail  # asegurarme de  importar la instancia de Flask-Mail
from app import FRONTEND_URL

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200































































































































@app.route('/forgot-password', methods=['POST'])
def forgot_password():
    # Obtiene el email del frontend
    email = request.json.get('email')
    
    # Busca al empleado en la base de datos usando el email
    employee = Employee.query.filter_by(email=email).first()  # Usa 'employee', no 'user'
    
    # Si no existe un empleado con ese email, devuelve un error
    if not employee:
        return jsonify({"msg": "Email no registrado"}), 404

    # Genera un token de recuperación usando el id del empleado
    token = generate_reset_token(employee.id)
    
    # Crea el enlace de restablecimiento de contraseña con el token generado
    reset_link = f"{FRONTEND_URL}/reset-password/{token}" # Modifica este enlace según mi entorno

    # Crea el correo con el enlace de recuperación
    msg = Message("Restablecer contraseña", recipients=[email])
    msg.body = f"Usa este enlace para restablecer tu contraseña: {reset_link}"

    # Envía el correo
    mail.send(msg)

    # Responde al frontend confirmando que el correo fue enviado
    return jsonify({"msg": "Correo enviado"}), 200

@app.route('/reset-password/<token>', methods=['POST'])
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