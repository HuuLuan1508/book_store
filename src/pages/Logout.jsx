import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Thêm logic logout ở đây (xóa token, clear session, etc.)
    const handleLogout = () => {
      // Giả lập quá trình logout
      setTimeout(() => {
        navigate('/');
      }, 2000);
    };

    handleLogout();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F2F7FD] dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4 dark:text-white">Logging Out...</h1>
        <p className="text-gray-600 dark:text-gray-300">Please wait while we sign you out.</p>
        <div className="mt-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      </div>
    </div>
  );
}

export default Logout; 