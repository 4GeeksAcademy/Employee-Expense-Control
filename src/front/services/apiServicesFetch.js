const backendUrl = import.meta.env.VITE_BACKEND_URL;
// Check if the backend URL is defined
if (!backendUrl) {
  throw new Error("VITE_BACKEND_URL is not defined in .env file");
}

export const createSignup = async (dispatch, info) => {
  try {
    const response = await fetch(`${backendUrl}api/signup`, {
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
      return { success: true };
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
    const response = await fetch(`${backendUrl}api/login`, {
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
    const response = await fetch(`${backendUrl}api/myid`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
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

export const budgetFetch = async (description) => {
  try {
    if (!description || description.trim() === "") {
      throw new Error("Invalid description");
    }
    const rawData = JSON.stringify({ budget_description: description });
    const token = localStorage.getItem("token");
    const response = await fetch(`${backendUrl}api/budget`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
    const response = await fetch(`${backendUrl}api/mybudgets`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
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
    const response = await fetch(`${backendUrl}api/upload`, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      throw new Error(`Error fetching data ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    const billResponse = await fetch(`${backendUrl}api/bill`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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

export const sendResetEmail = async (email) => {
  const res = await fetch(process.env.BACKEND_URL + "/forgot-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) throw new Error("No se pudo enviar el correo");
  return await res.json();
};

export const refreshAccessToken = async () => {
  const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));

  if (!refreshToken) {
    throw new Error("no refresh token ivailable");
  }

  const response = await fetch(`${backendUrl}api/refresh-token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  if (!response.ok) {
    throw new Error("failed to refresh access token");
  }
  const data = await response.json();

  if (!data.token) {
    throw new Error("New access token not recived");
  }

  localStorage.setItem("token", JSON.stringify(data.token));
  return data.token;
};

export const authFetch = async (url, options = {}) => {
  let token = JSON.parse(localStorage.getItem("token"));

  options.headers = {
    ...(options.headers || {}),
    Authorization: `Bearer ${token}`,
  };

  let response = await fetch(url, options);

  if (response.status === 401) {
    try {
      const newToken = await refreshAccessToken();
      options.headers.Authorization = `Bearer ${newToken}`;
      response = await fetch(url, options);
    } catch (err) {
      console.error("Token refresh failed", err);
      throw new Error("Session expired. Please log in again..");
    }
  }

  return response;
};
