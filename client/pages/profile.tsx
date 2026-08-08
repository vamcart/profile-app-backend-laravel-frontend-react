import { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('authToken');

        axios.get(`${API_BASE_URL}/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        })
        .then(response => {
            setUser(response.data);
        })
        .catch(error => {
            console.error(error.data);
        });
                  
      } catch (err: any) {
        console.error(err.response?.data || err.message);
      }
    };
    fetchProfile();
  }, []);

  if (!user) return <p>Загрузка профиля...</p>;
  return (
    <div style={{maxWidth:400, margin:'auto'}}>
      <h2>Ваш профиль</h2>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}