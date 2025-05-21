from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Integer, DateTime, ForeignKey, Enum, Numeric, Integer, DateTime, ForeignKey, Enum, Numeric, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime
from typing import List
from datetime import datetime
from typing import List
import enum

db = SQLAlchemy()


class state_type(enum.Enum):
    APPROVED = 'approved'
    DENEGATED = 'denegated'
    PENDING = 'pending'


class state_budget(enum.Enum):
    ACCEPTED = "accepted"
    REFUSED = "refused"
    PENDING = "pending"


class Employee(db.Model):
    __tablename__ = "employees"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(250), nullable=False)
    last_name: Mapped[str] = mapped_column(String(250), nullable=False)
    email: Mapped[str] = mapped_column(
        String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(120), nullable=False)
    is_supervisor: Mapped[bool] = mapped_column(
        Boolean(), nullable=False, default=False)  # Cambiado a boolean
    department_id: Mapped[int] = mapped_column(
        ForeignKey('departments.id'), nullable=True)
    is_active: Mapped[bool] = mapped_column(
        Boolean(), nullable=False, default=True)

    department: Mapped['Department'] = relationship(
        back_populates="employees"
    )

    budgets: Mapped[List['Budget']] = relationship(
        back_populates="employee"
    )

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "last_name": self.last_name,
            "name": self.name,
            "last_name": self.last_name,
            "email": self.email,
            "is_supervisor": self.is_supervisor,
            "is_active": self.is_active
            # password not included for security reasons
        }


class Department(db.Model):
    __tablename__ = "departments"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(250), nullable=False)
    budgets: Mapped[List['Budget']] = relationship(

        back_populates="department"
    )
    employees: Mapped[List['Employee']] = relationship(
        back_populates="department"
    )


class Bill(db.Model):
    __tablename__ = "bills"

    id: Mapped[int] = mapped_column(primary_key=True)
    trip_description: Mapped[str] = mapped_column(String(250), nullable=False)
    trip_address: Mapped[str] = mapped_column(String(250), nullable=False)
    state: Mapped[state_type] = mapped_column(Enum(state_type))
    # Por usar propiedad "Float" para manejar numeros y no texto
    amount: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)
    evaluator_id: Mapped[int] = mapped_column(
        ForeignKey('employees.id'), nullable=False)
    date_approved: Mapped[datetime] = mapped_column(
        DateTime, nullable=True)  # Cambiado a datetime
    budget_id: Mapped[int] = mapped_column(
        ForeignKey('budgets.id'), nullable=False)

    budget: Mapped['Budget'] = relationship(
        back_populates="bills"
    )

    def serialize(self):
        return {
            "id": self.id,
            "trip_description": self.trip_description,
            "trip_address": self.trip_address,
            "state": self.state.name,
            "amount": float(self.amount),
            "evaluator_id": self.evaluator_id,
            "date_approved": self.date_approved.isoformat() if self.date_approved else None,
            "budget_id": self.budget_id,
        }


class Budget(db.Model):
    __tablename__ = "budgets"
    id: Mapped[int] = mapped_column(primary_key=True)
    budget_description: Mapped[str] = mapped_column(
        String(250), nullable=False)
    amount: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)
    available: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)
    state: Mapped[state_budget] = mapped_column(Enum(state_budget))
    condition: Mapped[str] = mapped_column(Text(), nullable=True)
    employee_id: Mapped[int] = mapped_column(
        ForeignKey('employees.id'), nullable=False)
    department_id: Mapped[int] = mapped_column(
        ForeignKey('departments.id'), nullable=False)
    department: Mapped["Department"] = relationship(back_populates="budgets")
    bills: Mapped[List["Bill"]] = relationship(back_populates="budget")
    employee: Mapped['Employee'] = relationship(back_populates="budgets")

    def serialize(self):
        return {
            "id": self.id,
            "budget_description": self.budget_description,
            "amount": float(self.amount),
            "available": self.available,
            "state": self.state.name,
            "condition": self.condition,
            "employee_id": self.employee_id,
            "department_id": self.department_id,
            "bills": [bill.serialize() for bill in self.bills]
        }
