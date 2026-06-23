import { useState, useEffect } from 'react';

export const useDashboardData = (studyId) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Assuming backend runs on port 8000
                let url = 'http://localhost:8000/api/dashboard/data';
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
                console.error("Failed to fetch dashboard data:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [studyId]);

    return { data, loading, error };
};
