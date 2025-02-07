from datetime import datetime

from sqlalchemy import DateTime
from sqlalchemy.dialects.postgresql import ENUM

from config import db

GENDER_ENUM = ENUM("male", "female", name="gender_type")
SERVICE_TYPE_ENUM = ENUM("peon", "maid", "driver", name="service_type")


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), nullable=True)
    address = db.Column(db.String(225), nullable=False)
    date_of_birth = db.Column(DateTime, nullable=False)
    phone_number = db.Column(db.String(15), nullable=False)
    profile_picture = db.Column(db.String(225), nullable=True)
    gender = db.Column(GENDER_ENUM, nullable=False)
    created_at = db.Column(DateTime, default=datetime.utcnow)
    updated_at = db.Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    type = db.Column(db.String(50), nullable=False)

    __mapper_args__ = {"polymorphic_identity": "user", "polymorphic_on": type}

    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "address": self.address,
            "date_of_birth": (
                self.date_of_birth.isoformat() if self.date_of_birth else None
            ),
            "phone_number": self.phone_number,
            "profile_picture": self.profile_picture,
            "gender": self.gender,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }


class ServiceProvider(User):
    __tablename__ = "service_providers"

    id = db.Column(db.Integer, db.ForeignKey("users.id"), primary_key=True)
    service_provided = db.Column(SERVICE_TYPE_ENUM, nullable=False)
    number_of_reviews_received = db.Column(db.Integer, default=0)
    distance = db.Column(db.Float, default=0.0)
    rating = db.Column(db.Float, default=0.0)
    rate = db.Column(db.Float, default=0.0)

    __mapper_args__ = {"polymorphic_identity": "service_provider"}

    def to_json(self):
        base = super().to_json()
        base.update(
            {
                "service_provided": self.service_provided,
                "number_of_reviews_received": self.number_of_reviews_received,
                "distance": self.distance,
                "rating": self.rating,
                "rate": self.rate,
            }
        )

        return base


class JobSeeker(User):
    __tablename__ = "job_seekers"

    id = db.Column(db.Integer, db.ForeignKey("users.id"), primary_key=True)
    service_type = db.Column(SERVICE_TYPE_ENUM, nullable=False)

    __mapper_args__ = {"polymorphic_identity": "job_seeker"}

    def to_json(self):
        base = super().to_json()
        base.update({"service_type": self.service_type})

        return base
