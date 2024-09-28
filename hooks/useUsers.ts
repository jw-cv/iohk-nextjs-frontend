import { useState, useEffect } from 'react';

// Define the User type
export type User = {
  name: string;
  surname: string;
  number: string;
  gender: string;
  country: string;
  dependants: number;
  birthDate: string; // Change this to string
};

export function useUsers() {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const processedData = await response.json();
        setData(processedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, setData, loading, error };
}