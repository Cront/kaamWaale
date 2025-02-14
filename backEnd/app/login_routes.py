
from flask import jsonify, request
from werkzeug.security import check_password_hash, generate_password_hash

from config import app, db
from models import ServiceProvider


@app.route("/login", methods=["GET"])
def login():
    email = request.json.get("email")
    password = request.json.get("password").check_password_hash()


    if not email:
        return (jsonify({"message": "You must include your email"}))
    if not password:
        return (jsonify({"message": "You must include your password"}))

    return jsonify({"message": "Successfully found email and password"})
