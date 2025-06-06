from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Integer, DateTime, ForeignKey, Enum, Numeric, Integer, DateTime, ForeignKey, Enum, Numeric, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime
from typing import List
from datetime import datetime
from typing import List
import enum

db = SQLAlchemy()


class StateType(enum.Enum):
    APPROVED = 'approved'
    DENEGATED = 'denegated'
    PENDING = 'pending'


class StateBudget(enum.Enum):
    ACCEPTED = "accepted"
    REJECTED = "rejected"
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
       "Budget",
        foreign_keys="[Budget.employee_id]",
        back_populates = "employee"
    )
    supervised_budgets: Mapped[List['Budget']] = relationship( 
        "Budget",
        foreign_keys= "[Budget.evaluator_id]",
        back_populates="evaluator"
    )
    supervised_bills: Mapped[List['Bill']] = relationship( 
        back_populates="evaluator"
    )

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "last_name": self.last_name,
            "name": self.name,
            "email": self.email,
            "is_supervisor": self.is_supervisor,
            "is_active": self.is_active
            # password not included for security reasons
        }
    
    '''def budgets(self):
        return {
            "budgets": list(map(lambda b: b.sumary(), self.budgets))
        }'''



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

#Para poder identificar el depart. y su id con mas facilidad, creo que mejor serializar con id y name 

class Bill(db.Model):
    __tablename__ = "bills"

    id: Mapped[int] = mapped_column(primary_key=True)
    trip_description: Mapped[str] = mapped_column(String(250), nullable=False)
    trip_address: Mapped[str] = mapped_column(String(250), nullable=False)
    state: Mapped[StateType] = mapped_column(Enum(StateType))
    # Por usar propiedad "Float" para manejar numeros y no texto
    amount: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)
    date_approved: Mapped[datetime] = mapped_column(
        DateTime, nullable=True)  # Cambiado a datetime
    evaluator_id: Mapped[int] = mapped_column(
        ForeignKey('employees.id'), nullable=False)
    evaluator: Mapped['Employee'] = relationship(
        "Employee",
        foreign_keys = [evaluator_id],
        back_populates = "supervised_bills"
    )

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
            "submitted_by": self.budget.employee.name if self.budget and self.budget.employee else None
        }
    

class Budget(db.Model):
    __tablename__ = "budgets"
    id: Mapped[int] = mapped_column(primary_key=True)
    budget_description: Mapped[str] = mapped_column(
        String(250), nullable=False)
    amount: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)
    available: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)
    state: Mapped[StateBudget] = mapped_column(Enum(StateBudget))
    condition: Mapped[str] = mapped_column(Text(), nullable=True)
    employee_id: Mapped[int] = mapped_column(ForeignKey('employees.id'), nullable=False)
    #employee: Mapped['Employee'] = relationship(back_populates="budgets")   
    evaluator_id: Mapped[int] = mapped_column(ForeignKey('employees.id'), nullable=True)
    #evaluator: Mapped['Employee'] = relationship(back_populates="supervised_budget")  
    date_approved: Mapped[datetime] = mapped_column(DateTime, nullable=True) 
    department_id: Mapped[int] = mapped_column( ForeignKey('departments.id'), nullable=False)
    department: Mapped["Department"] = relationship(back_populates="budgets")
    bills: Mapped[List["Bill"]] = relationship(back_populates="budget",  foreign_keys=[Bill.budget_id])

    employee: Mapped['Employee'] = relationship(
        "Employee",
        foreign_keys = [employee_id],
        back_populates = "budgets"
    )
    evaluator: Mapped['Employee'] = relationship(
        "Employee",
        foreign_keys = [evaluator_id],
        back_populates = "supervised_budgets"
    )        

    def serialize(self):
        return {
            "id": self.id,
            "budget_description": self.budget_description,
            "amount": float(self.amount),
            "available": float(self.available),
            "state": self.state.name,
            "condition": self.condition,
            "employee_id": self.employee_id,
            "employee_name": self.employee.name if self.employee else None,
            "evaluator_id": self.evaluator_id,
            "evaluator_name": self.evaluator.name if self.evaluator else None,
            "department_id": self.department_id,
            "bills": [bill.serialize() for bill in self.bills],
            "employee": self.employee.serialize() if self.employee else None,
        }

    def sumary(self):
        total = 0
        for bill in self.bills:
            total = total + bill.amount
        return {
            "id": self.id,
            "amount": self.amount,
            "total_bills": total
        }
