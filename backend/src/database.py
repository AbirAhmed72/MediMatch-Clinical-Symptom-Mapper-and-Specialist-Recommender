from sqlalchemy import create_engine, engine
from sqlalchemy.engine import base
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm.session import Session

SQL_DATABASE_URL = "sqlite:///../sqlite.db"

engine = create_engine(
    SQL_DATABASE_URL, connect_args = {"check_same_thread" : False} #SQLite Specific
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine) 

Base =  declarative_base()