import { useState, useEffect } from "react";
import { fetchId } from "../services/apiServicesFetch";

const IdEmployeeComponent = () => {
    const [id, setId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getId = async () => {
            try {
                const data = await fetchId();
                if (data && data.id) {
                    setId(data.id);
                } else {
                    setError("No ID found");
                }
            } catch (err) {
                setError("Error fetching ID");
            } finally {
                setLoading(false);
            }
        };
        getId();
    }, []);

    if (loading) return <h1>Loading your ID...</h1>;
    if (error) return <h1>{error}</h1>;

    return (
        <h1>
            Your ID {id} is to give it to your superior so that he can start using the app.
        </h1>
    );
};

export default IdEmployeeComponent;
