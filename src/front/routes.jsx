// Import necessary components and functions from react-router-dom.

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";
import EnterBill from "./pages/EnterBill";
import EmployeeHome from "./pages/EmployeeHome";
import BudgetCreate from "./pages/BudgetCreate";
import BudgetList from "./pages/BudgetList";
import IdEmployee from "./pages/IdEmployee";
import PrivateRoute from "./components/PrivateRoute";
import SupervisorHome from "./pages/SupervisorHome";
import SupervisorBudgetPending from "./pages/SupervisorBudgetPending";
import SupervisorBudgetAccepted from "./pages/SupervisorBudgetsAccepted";
import AssignDepartmentEmployee from "./pages/AssignDepartmentEmployee";
import AssingDepartmentSupervisor from "./pages/AssingDepartmentSupervisor";
import SupervisorTotalExpense from "./pages/SupervisorTotalExpense";
import Companiesprofile from "./pages/Companiesprofile";
import PricingPage from "./pages/PricingPage";
import UnderConstruction from "./pages/UnderConstruction"



export const router = createBrowserRouter(
  createRoutesFromElements(

    // CreateRoutesFromElements function allows you to build route elements declaratively.
    // Create your routes here, if you want to keep the Navbar and Footer in all views, add your new routes inside the containing Route.
    // Root, on the contrary, create a sister Route, if you have doubts, try it!
    // Note: keep in mind that errorElement will be the default page when you don't get a route, customize that page to make your project more attractive.
    // Note: The child paths of the Layout element replace the Outlet component with the elements contained in the "element" attribute of these child paths.

    // Root Route: All navigation will start from here.
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >
      {/* Nested Routes: Defines sub-routes within the BaseHome component. */}

      {/* 🔒 RUTAS PUBLICAS */}

      <Route path="/" element={<Home />} />
      <Route path="/single/:theId" element={<Single />} />  {/* Dynamic route for single items */}
      <Route path="/demo" element={<Demo />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/companiesprofile" element={<Companiesprofile />} />
      <Route path="/pricingpage" element={<PricingPage />} />
      <Route path="/underconstruction" element={<UnderConstruction/>} />



      {/* 🔒 RUTAS PROTEGIDAS SOLO EMPLOYEE*/}

      <Route path="/employeehome" element={<PrivateRoute onlyFor="employee"><EmployeeHome /></PrivateRoute>} />
      <Route path="/enterbill" element={<PrivateRoute onlyFor="employee"><EnterBill /></PrivateRoute>} />
      <Route path="/mybudgets" element={<PrivateRoute onlyFor="employee"><BudgetList /></PrivateRoute>} />
      <Route path="/createbudget" element={<PrivateRoute onlyFor="employee"><BudgetCreate /></PrivateRoute>} />
      <Route path="/employeeid" element={<PrivateRoute onlyFor="employee"><IdEmployee /></PrivateRoute>} />

      {/* 🔒 RUTAS PROTEGIDAS SOLO SUPERVISOR */}
      <Route path="/supervisor" element={<PrivateRoute onlyFor="supervisor"><SupervisorHome /></PrivateRoute>} />
      <Route path="/budgetspending" element={<PrivateRoute onlyFor="supervisor"><SupervisorBudgetPending /></PrivateRoute>} />
      <Route path="/budgetsaccepted" element={<PrivateRoute onlyFor="supervisor"><SupervisorBudgetAccepted /></PrivateRoute>} />
      <Route path="/assignDepartmentEmployee" element={<PrivateRoute onlyFor="supervisor"><AssignDepartmentEmployee /></PrivateRoute>} />
      <Route path="/assignDepartmentSupervisor" element={<PrivateRoute onlyFor="supervisor"><AssingDepartmentSupervisor /></PrivateRoute>} />
      <Route path="/totaldepartment" element={<PrivateRoute onlyFor="supervisor"><SupervisorTotalExpense /></PrivateRoute>} />



      {/* 🔒 RUTAS COMPARTIDAS */}




      {/* 🔒 RUTA UNAUTHORIZED */}
      <Route path="/unauthorized" element={<h1>Unauthorized access</h1>} />


    </Route>
  )
);