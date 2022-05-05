import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { SimpleGrid, Center } from "@chakra-ui/react";
import Navbar from "../components/Navbar/Navbar";
import PizzaCard from "../components/PizzaCard/PizzaCard";
import { getAllPizzas } from "../api/pizzaAPI";

function Home() {
  const [pizzas, setPizzas] = useState([]);

  useAuth();

  useEffect(() => {
    getAllPizzas()
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        return result.map((pizza) => (
          <PizzaCard
            key={pizza.id}
            title={pizza.title}
            ingredients={pizza.ingredients}
            photo={pizza.photo}
            price_26={pizza.price_26}
            price_30={pizza.price_30}
            price_40={pizza.price_40}
          />
        ));
      })
      .then((pizzas) => {
        setPizzas(pizzas);
      });
  }, []);

  return (
    <>
      <Navbar />
      <Center>
        <SimpleGrid spacing={10} columns={{ base: 1, md: 2, lg: 3 }}>
          {pizzas}
        </SimpleGrid>
      </Center>
    </>
  );
}

export default Home;
