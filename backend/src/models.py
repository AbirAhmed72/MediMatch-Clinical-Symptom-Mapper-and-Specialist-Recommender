from schemas import Symptoms
from typing import List, Optional
from sqlalchemy.orm import relationship
from sqlalchemy.sql.schema import ForeignKey, PrimaryKeyConstraint
from database import Base

from sqlalchemy import Column, Integer, String, Boolean, DateTime

class UserBase(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True)
    password_hashed = Column(String)
    consultation = relationship("Consultation", back_populates="users")
    
    class Config:
        orm_mode = True

class Doctors(Base):
    __tablename__ = "doctors"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True)
    password_hashed = Column(String)
    name = Column(String)
    specialization = Column(String)
    is_approved = Column(Boolean, default=False)

    consultation = relationship("Consultation", back_populates="doctors")

    class Config:
        orm_mode = True

class Consultation(Base):
    __tablename__ = "consultation"
    appointment_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    patient_name = Column(String)
    required_doctor = Column(String)
    symptoms = Column(String)
    predicted_disease = Column(String)
    doctor_id = Column(Integer, ForeignKey("doctors.id", onupdate="CASCADE"))
    status = Column(Boolean)
    appointment_datetime = Column(DateTime)

    doctors = relationship("Doctors", back_populates="consultation")
    users = relationship("UserBase", back_populates="consultation")

    class Config:
        orm_mode = True

class Admins(Base):
    __tablename__ = "admins"
    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True)
    password_hashed = Column(String)

    class Config:
        orm_mode = True


class Complaints(Base):
    __tablename__ = 'complaints'

    id = Column(Integer, primary_key=True, index=True)
    user_email = Column(String, index=True)  # Email of the user who made the complaint
    complaint_text = Column(String, nullable=False)
    feedback_text = Column(String)

    class Config:
        orm_mode = True


