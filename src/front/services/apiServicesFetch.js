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

    const token = JSON.stringify(data.token);

    const refreshToken = JSON.stringify(data.refresh_token);

    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);
    if (token) {
      const responseMe = await fetch(`${backendUrl}api/me`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${data.token}`,
        },
        body: token,
      });
      if (!responseMe.ok) {
        throw new Error(`Error verifying role`);
      }
      const dataMe = await responseMe.json();
      if (dataMe.name == null || dataMe.supervisor == null) {
        throw new Error("the role has not been sent");
      }
      if (dataMe) {
        return dataMe;
      }
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchImageBill = async (image) => {
  try {
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
  } catch (error) {
    console.error(error);
  }
};
