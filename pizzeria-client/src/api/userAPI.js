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

export const getUser = async (id) => {
  return await fetch(`http://localhost:3001/user/${id}`, {
    method: "GET",
    credentials: "include",
  });
};

export const updateUser = async (
  userID,
  firstName,
  lastName,
  middleName,
  phoneNumber,
  email
) => {
  return await fetch(`http://localhost:3001/user/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      id: userID.payload,
      email: email,
      phone_number: phoneNumber,
      first_name: firstName,
      last_name: lastName,
      middle_name: middleName,
    }),
  });
};

export const updatePasswordUser = async (userID, oldPassword, newPassword) => {
  return await fetch(`http://localhost:3001/user/password/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      id: userID.payload,
      oldPassword: oldPassword,
      newPassword: newPassword,
    }),
  });
};
