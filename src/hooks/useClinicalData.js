import { useState, useEffect } from 'react';

export const useClinicalData = (studyId) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let url = 'http://localhost:8000/api/clinical-data';
                if (studyId) {
                    url += `?study_id=${encodeURIComponent(studyId)}`;
                }
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                setData(result);
                setError(null);
            } catch (err) {
                console.error("Failed to fetch clinical data:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [studyId]);

    return { data, loading, error };
};
