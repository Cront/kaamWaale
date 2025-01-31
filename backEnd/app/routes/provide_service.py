from flask import jsonify, request

from config import app, db
from models import ServiceProvider


# TO DO: UPDATE JS TO MATCH SERVICE PROVIDER ATTRIBUTES
@app.route("/register_provider", methods=["POST"])
def create_provider():
    name = request.json.get("name")
    service_type = request.json.get("service_type")
    address = request.json.get("address")
    phone_number = request.json.get("phone_number")
    email_address = request.json.get("email_address")
    date_of_birth = request.json.get("date_of_birth")
    rate = request.json.get("rate")
    gender = request.json.get("gender")

    if not name:
        return jsonify({"message": "You must include your name"})
    if not service_type:
        return jsonify({"message": "You must include service type"})
    if not address:
        return jsonify({"message": "You must include address"})
    if not phone_number:
        return jsonify({"message": "You must include phone number"})
    if not email_address:
        return jsonify({"message": "You must include email address"})
    if not rate:
        return jsonify({"message": "You must include rate"})
    if not gender:
        return jsonify({"message": "You must include your gender"})
    if not date_of_birth:
        return jsonify({"message": "You must include your date of birth"})

    new_service_provider = ServiceProvider(
        name,
        service_type,
        address,
        phone_number,
        email_address,
        date_of_birth,
        rate,
        gender,
    )


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
