
// Get the backend URL from environment variables
const backendUrl = import.meta.env.VITE_BACKEND_URL;

// Check if the backend URL is defined
if (!backendUrl) {
    throw new Error("VITE_BACKEND_URL is not defined in .env file");
}

export const createSignup = async (dispatch, info) => {
    try{
    const response = await fetch(`${backendUrl}/signup`,
        {
            method: "POST",
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify(info)
        }
    );
    console.log(response)
    if(response.status === 201) {
        const data = await response.json()
        console.log(data)
        dispatch({type: "signup", payload:data.employee});
        return { success: true };
    } 
    else if(response.status === 400) {
        const errorMsg = await response.json()
        return{success: false, 
            message: errorMsg.Error
        };
        
    } else {
        const errorData = await response.json();
        console.error("Signup failed:", errorData);
        return {
           success: false, message: errorData.Msg
        };
    }
} catch (error) {
    console.error("Network error:", error);
    return { success: false, message: "Network error. Please try again later." };
}
};