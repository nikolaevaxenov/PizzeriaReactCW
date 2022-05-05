import { Heading, Flex, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import Navbar from "../components/Navbar/Navbar";

function NoMatch() {
  useAuth();

  return (
    <>
      <Navbar />
      <Flex minWidth="max-content" alignItems="center" flexDir="column">
        <Heading size="4xl">404</Heading>
        <Heading mt={10}>Страница не найдена!</Heading>
        <RouterLink to="/">
          <Link size="lg">
            <Heading size="md" mt={10}>
              Главная страница
            </Heading>
          </Link>
        </RouterLink>
      </Flex>
    </>
  );
}

export default NoMatch;
