import { authFetch } from "./apiInterceptor";
const backendUrl = import.meta.env.VITE_BACKEND_URL;
// Check if the backend URL is defined
if (!backendUrl) {
  throw new Error("VITE_BACKEND_URL is not defined in .env file");
}
export const createSignup = async (dispatch, info) => {
  try {
    const response = await fetch(`${backendUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    });
    if (response.status === 201) {
      const data = await response.json();
      dispatch({ type: "signup", payload: data.employee });
      return { success: true, message: "Signup successful! Please login." };
    } else if (response.status === 400) {
      const errorMsg = await response.json();
      return {
        success: false,
        error: errorMsg.Error,
      };
    } else {
      const errorData = await response.json();
      console.error("Signup failed:", errorData);
      return {
        success: false,
        message: errorData.Msg,
      };
    }
  } catch (error) {
    console.error("Network error:", error);
    return {
      success: false,
      message: "Network error. Please try again later.",
    };
  }
};

export const fetchLogin = async (email, password) => {
  try {
    if (password.trim() === "" || email.trim() === "") {
      throw new Error("the fields cannot be empty");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email format");
    }
    if (password.length < 8) {
      throw new Error("The password must have at least 8 characters");
    }
    const rawData = JSON.stringify({
      email: email,
      password: password,
    });
    const response = await fetch(`${backendUrl}/login`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: rawData,
    });
    if (!response.ok) {
      throw new Error(`Error fetching data code:${response.status}`);
    }
    const data = await response.json();
    if (!data.token) {
      throw new Error("The token has not been sent correctly to the user");
    }
    if (!data.refresh_token) {
      throw new Error(
        "The refresh token has not been sent correctly to the user"
      );
    }
    const token = data.token;
    const refreshToken = data.refresh_token;
    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchId = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found");
    }
    const response = await authFetch('/myid', {
      method: "GET"
    });
    if (!response.ok) {
      throw new Error(`Error fetching data ${response.status}`);
    }
    const data = await response.json();
    if (!data) {
      throw new Error("the data was sent incorrectly");
    }
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchUserProfile = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }

  const response = await authFetch('/me', {
    method: "GET",
  })
  if (!response.ok) {
    throw new Error(`Failed to fetch user profile: ${response.status}`);
  }

  const user = await response.json();
  return user;
}



export const budgetFetch = async (description, amount) => {
  try {
    if (
      !description ||
      description.trim() === "" ||
      !amount ||
      amount.trim() === ""
    ) {
      throw new Error("Invalid description");
    }
    const rawData = JSON.stringify({
      budget_description: description,
      amount: amount,
    });
    const token = localStorage.getItem("token");
    const response = await authFetch('/budget', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: rawData,
    });
    const data = await response.json();
    return {
      ok: response.ok,
      status: response.status,
      message: data.msg || "Budget created successfully"
    };
  }
  catch (error) {
    console.error("Error en budgetFetch:", error);
    return {
      ok: false,
      message: "Error sending budget.",
      error,
    };
  }
};


export const budgetListFetch = async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not founded");
    }

    const response = await authFetch('/mybudgets', {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(`Error fetching data ${response.status}`);
    }
    const data = await response.json();


    if (!data || !data.budget_list) {
      throw new Error("Error obtaining the data: budget_list missing.");
    }

    const action = {
      type: "SET_BUDGETS",
      payload: {
        budgets: data.budget_list,
        supervisorName: data.supervisor_name || null,
      },
    };

    dispatch(action);
    return data;
  } catch (error) {
    console.error(error);

  }
};



export const billListFetch = async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not founded");
    }
    const response = await authFetch('/mybills', {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(`Error fetching data ${response.status}`);
    }
    const data = await response.json();
    if (!data || !data.bill_list) {
      throw new Error("Error obtaining the data");
    }
    dispatch({
      type: "SET_BILLS",
      payload: data.bill_list,
    });

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchImageBill = async (image, description, location, amount) => {
  try {
    if (
      description.trim() === "" ||
      location.trim() === "" ||
      amount.trim() === ""
    ) {
      return { ok: false, message: "All fields are required." };
    }

    if (!image) {
      return { ok: false, message: "You must upload an image of the receipt." };
    }

    const token = localStorage.getItem("token");
    if (token == null) {
      return { ok: false, message: "Token does not exist." };
    }

    const formData = new FormData();
    formData.append("bill", image);

    if (!formData.has("bill")) {
      return { ok: false, message: "The image has not been loaded correctly." };
    }

    const response = await fetch(`${backendUrl}/upload`, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      return { ok: false, message: `Image upload failed (${response.status})` };
    }

    const rawData = JSON.stringify({
      description,
      location,
      amount,
      date: new Date().toISOString(),
    });

    const billResponse = await authFetch("/bill", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: rawData,
    });

    if (!billResponse.ok) {
      return { ok: false, message: "Unable to create bill. Your budget must be accepted first." };
    }
    const data = await billResponse.json();
    return { ok: true, message: data?.msg || "Bill created successfully." };
  } catch (error) {
    console.error(error);
    return { ok: false, message: error.message || "Unexpected error." };
  }
};


export const editBill = async (billId, editedBill, dispatch) => {
  try {
    if (!billId) {
      throw new Error("the id has been passed");
    }
    const allowedFields = ["amount", "trip_description", "trip_address"];

    const filteredFields = Object.entries(editedBill)
      .filter(
        ([key, value]) =>
          allowedFields.includes(key) && value !== undefined && value !== ""
      )
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    if (Object.keys(filteredFields).length === 0) {
      console.log("No fields to update.");
      return;
    }

    filteredFields.id_bill = billId;

    const token = localStorage.getItem("token");
    const response = await authFetch('/updatebill', {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filteredFields),
    });

    if (!response.ok) {
      throw new Error(`Error fetching data ${response.status}`);
    }
    const data = await response.json();
    if (!data) {
      throw new Error("no data returned");
    }
    const action = {
      type: "EDIT_BILL",
      payload: data.bill,
    };
    dispatch(action);
  } catch (error) {
    console.error(error);
  }
};

export const deleteBill = async (billId, budgetId, dispatch) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found");
    }
    if (!billId || !budgetId) {
      throw new Error("the ids have not been passed");
    }
    const rawData = JSON.stringify({ id_bill: billId });

    const response = await authFetch('/deletebill', {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: rawData,
    });
    if (!response.ok) {
      throw new Error(`Error fetching data ${response.status}`);
    }
    const data = await response.json();
    if (!data) {
      throw new Error("Error fetching data");
    }
    const payload = { budgetId: budgetId, billId: billId };
    const action = {
      type: "DELETE_BILL",
      payload: payload,
    };
    dispatch(action);
  } catch (error) {
    console.error(error);
  }
};


export const deleteBudget = async (budgetId, dispatch) => {
  try {

    if (!budgetId) {
      throw new Error("the ids have not been passed");
    }
    const rawData = JSON.stringify({ budget_id: budgetId });
    const response = await authFetch('/deletebudget', {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: rawData,
    });
    if (!response.ok) {
      throw new Error(`Error fetching data ${response.status}`);
    }
    const data = await response.json();
    if (!data) {
      throw new Error("Error fetching data");
    }

    const action = {
      type: "DELETE_BUDGET",
      payload: { budgetId }, 
    };
    dispatch(action);
  } catch (error) {
    console.error(error);
  }
};

export const sendResetEmail = async (email) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/forgot-password`, {

    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) throw new Error("Email couldn't be sent");
  return await res.json();
};

export const supervisorBudgetFetch = async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No se obtuvo el token");
    }
    const response = await authFetch('/supervisor-budgets-bills', { method: "GET" });
    if (!response.ok) {
      throw new Error(`Error al obtener datos: ${response.status}`);
    }
    const { data } = await response.json();

    if (!data || !data.budgets || !data.supervisor_name) {
      throw new Error("Los datos necesarios (budgets o supervisor_name) no se han enviado correctamente.");
    }

    const action = {
      type: "SET_BUDGETS",
      payload: {
        budgets: data.budgets,
        supervisorName: data.supervisor_name
      }
    };
    dispatch(action);

  } catch (error) {
    console.error("Error en supervisorBudgetFetch:", error);
  }
};

export const supervisorBillListFetch = async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("the token was not obtained")
    }
    const response = await authFetch("/supervisor-get-bills", { method: "GET" });
    if (!response.ok) throw new Error(`Error fetching bills ${response.status}`);

    const data = await response.json();
    dispatch({ type: "SET_BILLS", payload: data.bills });
  } catch (error) {
    console.error(error);
  }
}

export const totalExpense = async (dispatch, employeeId = null) => {
  try {
    let url = "/supervisor-total-expense"
    if (employeeId) {
      url += `?employee_id=${employeeId}`
    }

    const response = await authFetch(url, { method: "GET" })
    if (!response.ok) {
      throw new Error(`Error fetching data ${response.status}`)
    }

    const data = await response.json()

    if (!data) {
      throw new Error("Error obtaining the data")
    }
    const action = {
      type: "SET_TOTAL_EXPENSE",
      payload: data
    }
    dispatch(action)


  } catch (error) {
    console.error(error)
  }
}

export const assignDepartmentEmployee = async (employeeId, departmentId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return { success: false, message: "Token not found" };
    }

    if (!employeeId?.trim() || !departmentId?.trim()) {
      return { success: false, message: "The data has not been passed correctly" };
    }

    const rawData = JSON.stringify({
      id_employee: employeeId,
      id_department: departmentId,
    });

    const response = await authFetch("/assigndepartment", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: rawData,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.msg || `Error (${response.status})`,
      };
    }

    return {
      success: true,
      message: data.msg || "Successfully assigned",
    };
  } catch (error) {
    console.error("Fetch error:", error);
    return { success: false, message: error.message || "Unexpected error" };
  }
};


export const assignDepartmentSupervisor = async (supervisorId, departmentId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return { success: false, message: "Token not found" };
    }
    if (!supervisorId || supervisorId.trim() === "" || !departmentId || departmentId.trim() === "") {
      return { success: false, message: "The data has not been passed correctly" };
    }
    const rawData = JSON.stringify({ id_employee: supervisorId, id_department: departmentId });
    const response = await authFetch(`/assign-supervisor-department`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: rawData,
    });
    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, message: errorData.msg || `Error fetching data ${response.status}` };
    }
    const data = await response.json();
    return { success: true, message: data.msg || "Supervisor assigned successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: error.message || "Unknown error occurred" };
  }
};


export const fetchAndSetEmployees = async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token not found");

    const res = await authFetch("/employees", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) throw new Error(`Error fetching employees: ${res.status}`);
    const data = await res.json();
    dispatch({ type: "SET_EMPLOYEES", payload: data });
  } catch (err) {
    console.error("Error:", err);
  }
};

export const fetchAndSetDepartments = async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token not found");

    const res = await authFetch("/departments", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) throw new Error(`Error fetching departments: ${res.status}`);
    const data = await res.json();
    dispatch({ type: "SET_DEPARTMENTS", payload: data });
  } catch (err) {
    console.error("Error:", err);
  }
};

export const fetchAndSetSupervisors = async (dispatch) => {
  const res = await authFetch("/supervisors");
  const data = await res.json();
  dispatch({ type: "SET_SUPERVISORS", payload: data });
};

export const budgetValidation = async (dispatch, budget_id, state, amount = null) => {
  try {
    const body = amount !== null
      ? JSON.stringify({ state, amount })
      : JSON.stringify({ state });
    const response = await authFetch(`/budgets/${budget_id}/state`,
      { method: "PATCH", headers: { "Content-Type": "application/json", }, body: body })
    if (!response.ok) {
      throw new Error(`Error fetching data ${response.status}`)
    }
    const data = await response.json()
    dispatch({ type: "UPDATE_BUDGET_STATE", payload: { budgetId: budget_id, newState: state.toUpperCase(), newAmount: amount } })
  } catch (error) {
    console.error(error)
  }
}

export const billValidation = async (dispatch, bill_id, state) => {
  try {
    const response = await authFetch(`/bills/${bill_id}/state`,
      { method: "PATCH", headers: { "Content-Type": "application/json", }, body: JSON.stringify({ state }) })
    if (!response.ok) {
      throw new Error(`Error fetching data ${response.status}`)
    }
    const data = await response.json();

    dispatch({
      type: "UPDATE_BILL_STATE",
      payload: {
        billId: bill_id,
        newState: state.toUpperCase(),
      },
    });

  } catch (error) {
    console.error(error)
  }
}

