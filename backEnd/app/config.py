"""File provides configurations for the backend"""

from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

# TO DO: IMPLEMENT FLASK MIGRATE TOOL TO MANAGE DATABSE BETTER

app = Flask(__name__)

CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///mydatabase.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)
