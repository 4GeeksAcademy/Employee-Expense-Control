import os
from flask_admin import Admin
from .models import db, Employee, Bill, Department, Budget
from flask_admin.contrib.sqla import ModelView


def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    # Add your models here, for example this is how we add a the User model to the admin

    class EmployeeAdmin(ModelView):
        form_columns = ['name', 'last_name', 'email', 'is_supervisor',
                        'department_id', 'is_active', 'password']

    class BudgetAdmin(ModelView):
        form_columns = ['budget_description', 'employee_id', 'department_id']

    class BillAdmin(ModelView):
        form_columns = ['trip_description', 'trip_address',
                        'state', 'amount', 'date_approved', 'evaluator_id', 'budget_id']

    admin.add_view(EmployeeAdmin(Employee, db.session))
    admin.add_view(ModelView(Department, db.session))
    admin.add_view(BudgetAdmin(Budget, db.session))
    admin.add_view(BillAdmin(Bill, db.session))

    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))
