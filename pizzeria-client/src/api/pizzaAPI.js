export const getAllPizzas = async () => {
  return await fetch(`${process.env.REACT_APP_SERVER_URL}pizza/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
