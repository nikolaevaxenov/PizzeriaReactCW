export const getCartOrder = async (id) => {
  if (id !== undefined) {
    return await fetch(`http://localhost:3001/order/cart/${id}`, {
      method: "GET",
      credentials: "include",
    });
  }
};

export const getCartOrderQuantity = async (id) => {
  if (id !== undefined) {
    return await fetch(`http://localhost:3001/order/cartquantity/${id}`, {
      method: "GET",
      credentials: "include",
    });
  }
};

export const getCartOrderPrice = async (id) => {
  if (id !== undefined) {
    return await fetch(`http://localhost:3001/order/cartprice/${id}`, {
      method: "GET",
      credentials: "include",
    });
  }
};

export const getCartPizzas = async (id) => {
  if (id !== undefined) {
    return await fetch(`http://localhost:3001/order/cartpizza/${id}`, {
      method: "GET",
      credentials: "include",
    });
  }
};

export const addToCart = async (id, pizzaId, size, quantity) => {
  if (id !== undefined) {
    return await fetch(`http://localhost:3001/order/cart/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        pizzaId: Number(pizzaId),
        size: Number(size),
        quantity: Number(quantity),
      }),
    });
  }
};

export const removeFromCart = async (id, pizzaId, size, quantity) => {
  return await fetch(`http://localhost:3001/order/cart/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      pizzaId: Number(pizzaId),
      size: Number(size),
      quantity: Number(quantity),
    }),
  });
};

export const getOrders = async (id) => {
  if (id !== undefined) {
    return await fetch(`http://localhost:3001/order/${id}`, {
      method: "GET",
      credentials: "include",
    });
  }
};

export const createOrder = async (id, addressId, cardDetailId, comment) => {
  return await fetch(`http://localhost:3001/order/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      comment: comment,
      addressId: Number(addressId),
      cardDetailId: Number(cardDetailId),
    }),
  });
};
