export const registerUser = async (email, password, first_name) => {
  return await fetch(`${process.env.REACT_APP_SERVER_URL}user/registration/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password, first_name }),
  });
};

export const loginUser = async (email, password) => {
  return await fetch(`${process.env.REACT_APP_SERVER_URL}user/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });
};

export const logoutUser = async () => {
  return await fetch(`${process.env.REACT_APP_SERVER_URL}logout/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
};

export const refreshUser = async () => {
  return await fetch(`${process.env.REACT_APP_SERVER_URL}refresh/`, {
    method: "GET",
    credentials: "include",
  });
};

export const getUser = async (id) => {
  return await fetch(`${process.env.REACT_APP_SERVER_URL}user/${id}`, {
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
  return await fetch(`${process.env.REACT_APP_SERVER_URL}user/`, {
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

export const updateUserOnOrder = async (
  userID,
  firstName,
  phoneNumber,
  email
) => {
  return await fetch(`${process.env.REACT_APP_SERVER_URL}user/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      id: userID.payload,
      email: email,
      phone_number: phoneNumber,
      first_name: firstName,
    }),
  });
};

export const updatePasswordUser = async (userID, oldPassword, newPassword) => {
  return await fetch(`${process.env.REACT_APP_SERVER_URL}user/password/`, {
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
