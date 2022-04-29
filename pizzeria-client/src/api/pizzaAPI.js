export const getAllPizzas = async () => {
  return await fetch("http://localhost:3001/pizza/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
