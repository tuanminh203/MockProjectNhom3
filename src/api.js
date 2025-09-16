import axios from "axios";

export const login = async (username, password) => {
  const response = await axios.post("http://localhost:8080/api/v1/auth/login", {
    username,
    password,
  });
  console.log("Login response:", response.data); // <-- log ra để chắc chắn
  return response.data; // cái này là JWT string
};
