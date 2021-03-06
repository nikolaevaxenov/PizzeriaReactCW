export const getCard = async (id) => {
  if (id !== undefined) {
    return await fetch(`${process.env.REACT_APP_SERVER_URL}card/${id}`, {
      method: "GET",
      credentials: "include",
    });
  }
};

export const createCard = async (id, card_number, expiry_date, cvc_code) => {
  return await fetch(`${process.env.REACT_APP_SERVER_URL}card/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      card_number: card_number,
      expiry_date: expiry_date,
      cvc_code: cvc_code,
    }),
  });
};

export const updateCard = async (id, card_number, expiry_date, cvc_code) => {
  return await fetch(`${process.env.REACT_APP_SERVER_URL}card/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      card_number: card_number,
      expiry_date: expiry_date,
      cvc_code: cvc_code,
    }),
  });
};

export const deleteCard = async (id) => {
  return await fetch(`${process.env.REACT_APP_SERVER_URL}card/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
};
