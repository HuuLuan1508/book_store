const loginAPI = 'http://localhost:3000/users?';

export const getUsersByEmail = async (email) => {
    try{
        const response = await fetch(`${loginAPI}email=${email}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    return await response.json();
    }catch(error){
        console.error('Error fetching data:', error);
        throw error;
    }
}