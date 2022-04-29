export const registerUser = async (email, password, first_name) => {
  return await fetch("http://localhost:3001/user/registration/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password, first_name }),
  });
};

export const loginUser = async (email, password) => {
  return await fetch("http://localhost:3001/user/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });
};

export const logoutUser = async () => {
  return await fetch("http://localhost:3001/logout/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
};

export const refreshUser = async () => {
  return await fetch("http://localhost:3001/refresh/", {
    method: "GET",
    credentials: "include",
  });
};
