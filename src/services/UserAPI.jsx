const usersAPI = `http://localhost:3000/users`;
const getUserByEmailAPI = `${usersAPI}?email=`;

export const getUsersByEmail = async (email) => {
  try {
    const response = await fetch(`${getUserByEmailAPI}${email}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const registerNewAccount = async (name, email, password) => {
  const user = {
    id: Date.now(),
    name: name,
    email: email,
    password: password,
    red : []
  };

  try {
    const response = await fetch(usersAPI, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
