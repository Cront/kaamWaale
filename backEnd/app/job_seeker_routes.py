from datetime import datetime

from flask import jsonify, request
from werkzeug.security import check_password_hash, generate_password_hash

from config import app, db
from models import JobSeeker


@app.route("/get_job_seekers", methods=["GET"])
def get_job_seekers():
    job_seekers = JobSeeker.query.all()
    json_job_seekers = list(map(lambda x: x.to_json(), job_seekers))

    return jsonify({"job_seekers": json_job_seekers})


@app.route("/delete_all_sp", methods=["DELETE"])
def delete_all_sp():
    job_seekers = JobSeeker.query.all()
    for job_seeker in job_seekers:
        delete_job_seekers(job_seeker.id)

    return jsonify({"message": "All job seekers deleted"}), 200

@app.route("/delete_job_seekers/<int:user_id>", methods=["DELETE"])
def delete_job_seekers(user_id):
    # get service provider by their id
    job_seeker = JobSeeker.query.get(user_id)

    if not job_seeker:
        return jsonify({"message": "Service provider not found"}), 404

    db.session.delete(job_seeker)
    db.session.commit()

    return jsonify({"message": "Job Seeker deleted"}), 200

@app.route("/create_job_seeker", methods=["POST"])
def create_job_seeker():
    name = request.json.get("name")
    account_type = "job_seeker"
    address = request.json.get("address")
    phone_number = request.json.get("phone_number")
    email = request.json.get("email")
    password = request.json.get("password")
    date_of_birth = request.json.get("date_of_birth")
    gender = request.json.get("gender")
    profile_picture = request.json.get("profile_picture")

    if not name:
        return (jsonify({"message": "You must include your name"}), 400)
    if not address:
        return (jsonify({"message": "You must include address"}), 400)
    if not phone_number:
        return (jsonify({"message": "You must include phone number"}), 400)
    if not email:
        return (jsonify({"message": "You must include email address"}), 400)
    if not gender:
        return (jsonify({"message": "You must include your gender"}), 400)
    if not date_of_birth:
        return (jsonify({"message": "You must include your date of birth"}), 400)

    new_job_seeker = JobSeeker(
        name=name,
        account_type=account_type,
        address=address,
        phone_number=phone_number,
        email=email,
        password=generate_password_hash(password),
        date_of_birth=datetime.fromisoformat(date_of_birth),
        gender=gender,
        profile_picture=profile_picture
    )

    try:
        db.session.add(new_job_seeker)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "Job seeker created!"}), 201
