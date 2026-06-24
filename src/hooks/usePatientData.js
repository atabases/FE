import { useState, useEffect } from 'react';

export const usePatientData = (patientId) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!patientId) return;
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:8000/api/patients/${encodeURIComponent(patientId)}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                setData(result);
                setError(null);
            } catch (err) {
                console.error("Failed to fetch patient data:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [patientId]);

    return { data, loading, error };
};
