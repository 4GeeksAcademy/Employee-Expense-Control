import { authFetch } from "./apiInterceptor";
const backendUrl = import.meta.env.VITE_BACKEND_URL;
// Check if the backend URL is defined
if (!backendUrl) {
  throw new Error("VITE_BACKEND_URL is not defined in .env file");
}

//MEJORAS AGREGADAS AHORA QUE TENEMOS UN apiInterceptor.jsx COMO NUEVO SERVICE ESTE SE ENCARGA DE OBTENER.
//AUTORIZAR Y REFRESCAR EL TOKEN AL HACER UN FETCH DE UNA RUTA PROTEGIDA NO HACE FALTA AÑADIR
//Authorization: `Bearer ${token}` PORQUE ES ALGO QUE SE ENCARGA DE HACER APIINTERCEPTOR SIEMPRE Y CUANDO
//LE AÑADAS A EL FETCH authFetch MAS ("NOMBRE DE LA RUTA")


export const createSignup = async (dispatch, info) => {
  try {
    const response = await fetch(`${backendUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    });
    console.log(response);
    if (response.status === 201) {
      const data = await response.json();
      console.log(data);
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
    console.log(rawData);
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

    //USAR authFetch en las rutas que requieran token
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

//USAR authFetch en las rutas que requieran token

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

    //USAR authFetch en las rutas que requieran token
    const response = await authFetch('/budget', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: rawData,
    });
    if (!response.ok) {
      throw new Error(`Error fetching data ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

export const budgetListFetch = async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not founded");
    }

    //USAR authFetch en las rutas que requieran token
    const response = await authFetch('/mybudgets', {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(`Error fetching data ${response.status}`);
    }
    const data = await response.json();
    if (!data || !data.budget_list) {
      throw new Error("Error obtaining the data");
    }
    const action = {
      type: "SET_BUDGETS",
      payload: data.budget_list,
    };

    dispatch(action);
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
      throw new Error("fields cannot be empty");
    }
    const token = localStorage.getItem("token");
    if (token == null) {
      throw new Error("token dont exist");
    }
    const rawData = JSON.stringify({
      description: description,
      location: location,
      amount: amount,
      date: new Date().toISOString(),
    });
    const formData = new FormData();
    formData.append("bill", image);
    if (!formData.has("bill")) {
      throw new Error("The image has not been loaded correctly");
    }
    const response = await fetch(`${backendUrl}/upload`, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      throw new Error(`Error fetching data ${response.status}`);
    }
    const data = await response.json();
    console.log(data);

    //USAR authFetch en las rutas que requieran token
    const billResponse = await authFetch('/bill', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: rawData,
    });
    if (!billResponse.ok) {
      throw new Error(`Error fetching data ${billResponse.status}`);
    }
    const billData = await billResponse.json();
    console.log(billData);
  } catch (error) {
    console.error(error);
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

    //USAR authFetch en las rutas que requieran token
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
    console.log(data);
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

    //USAR authFetch en las rutas que requieran token

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

///export const sendResetEmail = async (email) => {
///const res = await fetch(process.env.BACKEND_URL + "/forgot-password", {
//method: "POST",
//headers: {
//"Content-Type": "application/json",
//},
//body: JSON.stringify({ email }),
//});
//if (!res.ok) throw new Error("No se pudo enviar el correo");
//return await res.json();
//};

//Desde la linea 357 hasta la 377 Comentada para pruebas no borrar hasta que hayamos concluido todo
// export const refreshAccessToken = async () => {
//   const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));
//   if (!refreshToken) {
//     throw new Error("no refresh token ivailable");
//   }
//   const response = await fetch(`${backendUrl}/refresh-token`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ refresh_token: refreshToken }),
//   });
//   if (!response.ok) {
//     throw new Error("failed to refresh access token");
//   }
//   const data = await response.json();
//   if (!data.token) {
//     throw new Error("New access token not recived");
//   }
//   localStorage.setItem("token", JSON.stringify(data.token));
//   return data.token;
// };

// export const authFetch = async (url, options = {}) => {
//   let token = JSON.parse(localStorage.getItem("token"));
//   options.headers = {
//     ...(options.headers || {}),
//     Authorization: `Bearer ${token}`,
//   };
//   let response = await fetch(url, options);
//   if (response.status === 401) {
//     try {
//       const newToken = await refreshAccessToken();
//       options.headers.Authorization = `Bearer ${newToken}`;
//       response = await fetch(url, options);
//     } catch (err) {
//       console.error("Token refresh failed", err);
//       throw new Error("Session expired. Please log in again..");
//     }
//   }
//   return response;
// };

export const supervisorBudgetFetch = async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("the token was not obtained")
    }
    const response = await authFetch('/supervisor-budgets-bills', { method: "GET",})
    if (!response.ok) {
      throw new Error(`Error fetching data ${response.status}`)
    }
    const data = await response.json()
    if (!data.budgets || !data.department_id) {
      throw new Error("the data has not been sent correctly")
    }
    const action = {
      type: "SET_BUDGETS",
      payload: data.budgets
    }
    dispatch(action)
  } catch (error) {
    console.log(error)
  }
}

export const acceptBudget = async (budgetId, amount, dispatch) => {
  try {
    const response = await authFetch(`/budgets/${budgetId}/accept`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount }),
    });

    if (!response.ok) {
      throw new Error("Error al aceptar el presupuesto");
    }

    const updatedBudget = await response.json();

    dispatch({ type: "EDIT_BUDGET", payload: updatedBudget });
  } catch (error) {
    console.error(error);
  }
};

export const rejectBudget = async (budgetId, dispatch) => {
  try {
    
    const response = await authFetch(`/budgets/${budgetId}/reject`, {
      method: "PUT",
    });

    if (!response.ok) {
      throw new Error("Error al rechazar el presupuesto");
    }

    const updatedBudget = await response.json();

    dispatch({ type: "EDIT_BUDGET", payload: updatedBudget });
  } catch (error) {
    console.error(error);
  }
};

export const assignDepartmentEmployee = async (employeeId, departmentId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found")
    }
    if (!employeeId || employeeId.trim() === "" || !departmentId || departmentId.trim() ==="") {
      throw new Error("the data has not been passed correctly")
    }
    const rawData = JSON.stringify({ id_employee: employeeId, id_department: departmentId })
    const response = await authFetch('/assigndepartment', { method: "PUT", headers: { "Content-Type": "application/json",}, body: rawData })
    if (!response.ok) {
      throw new Error(`Error fetching data ${response.status}`)
    }
    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

export const assignDepartmentSupervisor = async (supervisorId, departmentId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found")
    }
    if (!supervisorId || supervisorId.trim() === "" || !departmentId || departmentId.trim() === "") {
      throw new Error("the data has not been passed correctly")
    }
    const rawData = JSON.stringify({ id_employee: supervisorId, id_department: departmentId })
    const response = await authFetch(`/assign-supervisor-department`, { method: "PUT", headers: { "Content-Type": "application/json",}, body: rawData })
    if (!response.ok) {
      throw new Error(`Error fetching data ${response.status}`)
    }
    const data = await response.json()
    console.log(data)

  } catch (error) {
    console.error(error)
  }
}




