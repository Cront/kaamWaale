from flask import Blueprint, jsonify, request
from werkzeug import security

from config import app, db
from models import ServiceProvider, User

login_bp = Blueprint('login_bp', __name__)

@login_bp.route('/login_bp')
def login_home():
    return "Login Home"

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    original_password = data.get("original_password")

    if not email:
        return (jsonify({"message": "You must include your email"}), 400) 
    if not original_password:
        return (jsonify({"message": "You must include your password"}), 400) 

    user = User.query.filter_by(email=email).first()
    if not user:
        return (jsonify({"message": "User not found"}), 404)

    if not security.check_password_hash(user.password, original_password):
        return (jsonify({"message": "Incorrect password"}), 401)

    return jsonify({
        "message": "Successfully found email and password",
        "data": user.account_type
    })

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
