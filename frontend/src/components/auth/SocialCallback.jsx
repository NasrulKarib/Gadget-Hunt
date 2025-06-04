import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const SocialCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/users/social-login-callback/', {
          withCredentials: true,
        });
        const { user } = response.data;
        localStorage.setItem('user', JSON.stringify(user));
        toast.success('Social authentication successful', {
          position: "top-center",
          autoClose: 3000,
        });
        setTimeout(() => {
          if (user.role === 'Admin') {
            navigate('/admin-dashboard');
          } else {
            navigate('/');
          }
        }, 2000);
      } catch (err) {
        toast.error('Social authentication failed', {
          position: "top-center",
          autoClose: 3000,
        });
        navigate('/login');
      }
    };
    handleCallback();
  }, [navigate]);

  return <div> Processing social authentication...</div>;
};

export default SocialCallback;