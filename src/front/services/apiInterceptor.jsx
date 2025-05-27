const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const authFetch = async (url, options = {}) => {
let token = localStorage.getItem('token')
const refreshToken =  localStorage.getItem('refreshToken');

let response = await fetch(`${backendUrl}${url}`, {
    ...options,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers, // Se usa Para permitir sobrescribir o agregar más headers
    },
});
if (response.status === 401 && refreshToken)
try {
    const refreshResponse = await fetch(`${backendUrl}/refresh`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${refreshToken}`,
        },
    });
    if (!refreshResponse.ok)throw new Error('Refresh failed');

    const {token: newToken} = await refreshResponse.json();
    localStorage.setItem('token', newToken)

    response =  await fetch(`${backendUrl}${url}`,{
        ...options,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${newToken}`,
            ...options.headers,
        },
    });
} catch (error){
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
    throw new Error('Session expired. Redirecting to login.')
}
return response;
};