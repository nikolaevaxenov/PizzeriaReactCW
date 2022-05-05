export const getAddress = async (id) => {
  if (id !== undefined) {
    return await fetch(`http://localhost:3001/address/${id}`, {
      method: "GET",
      credentials: "include",
    });
  }
};

export const createAddress = async (
  id,
  city,
  street,
  house_number,
  housing_number,
  apartment_number,
  intercom_code
) => {
  return await fetch(`http://localhost:3001/address/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      city: city,
      street: street,
      house_number: house_number,
      housing_number: housing_number,
      apartment_number: apartment_number,
      intercom_code: intercom_code,
    }),
  });
};

export const updateAddress = async (
  id,
  city,
  street,
  house_number,
  housing_number,
  apartment_number,
  intercom_code
) => {
  return await fetch(`http://localhost:3001/address/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      city: city,
      street: street,
      house_number: house_number,
      housing_number: housing_number,
      apartment_number: apartment_number,
      intercom_code: intercom_code,
    }),
  });
};

export const deleteAddress = async (id) => {
  return await fetch(`http://localhost:3001/address/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
};
