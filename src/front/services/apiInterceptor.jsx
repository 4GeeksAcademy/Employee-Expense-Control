const backendUrl = import.meta.env.VITE_BACKEND_URL;


export const authFetch = async (url, options = {}, callbacks = {}) => {
    let token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');

    // 1. Primera llamada a la API
    let response = await fetch(`${backendUrl}${url}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            ...options.headers,
        },
        body: options.body, // Aseguramos que el body se mantenga
    });

    // 2. Si hay un 401 y hay refreshToken, intentamos refrescar
    if (response.status === 401 && refreshToken) {
        try {
            if (callbacks.onRefreshStart) callbacks.onRefreshStart();

            const refreshResponse = await fetch(`${backendUrl}/refresh`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${refreshToken}`,
                },
            });

            if (!refreshResponse.ok) throw new Error('Refresh failed');

            const { token: newToken } = await refreshResponse.json();
            localStorage.setItem('token', newToken);

            if (callbacks.onRefreshEnd) callbacks.onRefreshEnd();

            // 3. Reintentamos la petición original con el nuevo token
            response = await fetch(`${backendUrl}${url}`, {
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${newToken}`,
                    ...options.headers,
                },
                body: options.body, // Aseguramos que el body se mantenga
            });

            // 4. Si la segunda llamada también falla, cerramos sesión
            if (response.status === 401) {
                throw new Error("Still unauthorized after refresh");
            }
        } catch (error) {
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            if (callbacks.onLogout) callbacks.onLogout();
            window.location.href = '/login';
            throw new Error('Session expired. Redirecting to login.');
        }
    }

    return response;
};