from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from dotenv import load_dotenv
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

load_dotenv()

app = Flask(__name__)
# Update CORS configuration

app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
SECRET_KEY_SUPABASE = os.getenv("SECRET_KEY")

# Create the SQLAlchemy engine
engine = create_engine(app.config["SQLALCHEMY_DATABASE_URI"])

# Create a sessionmaker
Session = sessionmaker(bind=engine)

# Create a base class for declarative models
Base = declarative_base()

db = SQLAlchemy(app)


# Function to get a database session
def get_db_session():
    return Session()
