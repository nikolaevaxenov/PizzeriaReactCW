import React, { useState } from "react";
import {
  Flex,
  Spacer,
  Box,
  Heading,
  ButtonGroup,
  Button,
  Icon,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { FiLogIn } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import LoginModal from "../AuthModal/LoginModal";
import RegistrationModal from "../AuthModal/RegistrationModal";

function NavbarMobile() {
  const [navBarMobVisibility, setNavBarMobVisibility] = useState("none");
  const { isOpenLog, onOpenLog, onCloseLog } = useDisclosure();
  const { isOpenReg, onOpenReg, onCloseReg } = useDisclosure();

  return (
    <React.Fragment>
      <Flex
        minWidth="max-content"
        alignItems="center"
        gap="2"
        p={2}
        display={{ base: "flex", md: "none" }}
        bgGradient="linear(to right, #0f2027, #203a43, #2c5364)"
      >
        <Box p="2">
          <Heading
            size="md"
            bgGradient="linear(to right, #f12711, #f5af19)"
            bgClip="text"
          >
            Пиццерия
          </Heading>
        </Box>
        <Spacer />
        <ButtonGroup gap="2">
          <Button
            bgGradient="linear(to right, #f12711, #f5af19)"
            _hover={{
              bgGradient: "linear(to right, #659999, #f4791f)",
            }}
            onClick={() => setNavBarMobVisibility("flex")}
          >
            <HamburgerIcon />
          </Button>
        </ButtonGroup>
      </Flex>
      <Flex
        w="100vw"
        h="100vh"
        display={{ base: navBarMobVisibility, md: "none" }}
        bgGradient="linear(to right, #0f2027, #203a43, #2c5364)"
        zIndex={20}
        pos="fixed"
        top="0"
        left="0"
        overflowY="auto"
        flexDir="column"
        alignItems="center"
      >
        <Flex width="100%" p={2}>
          <Box p="2">
            <Heading
              size="md"
              bgGradient="linear(to right, #f12711, #f5af19)"
              bgClip="text"
            >
              Пиццерия
            </Heading>
          </Box>
          <Spacer />
          <Box>
            <Button
              bgGradient="linear(to right, #f12711, #f5af19)"
              _hover={{
                bgGradient: "linear(to right, #659999, #f4791f)",
              }}
              onClick={() => setNavBarMobVisibility("none")}
            >
              <CloseIcon />
            </Button>
          </Box>
        </Flex>
        <Box p="2">
          <Heading
            size="md"
            bgGradient="linear(to right, #f12711, #f5af19)"
            bgClip="text"
          >
            +7 (999) 777-77-77
          </Heading>
        </Box>
        <ButtonGroup gap="2">
          <Button
            bgGradient="linear(to right, #f12711, #f5af19)"
            _hover={{
              bgGradient: "linear(to right, #659999, #f4791f)",
            }}
          >
            <Icon as={AiOutlineShoppingCart} />
          </Button>
          <Button
            bgGradient="linear(to right, #f12711, #f5af19)"
            _hover={{
              bgGradient: "linear(to right, #659999, #f4791f)",
            }}
            onClick={onOpenLog}
          >
            <Icon as={FiLogIn} mr={2} />
            Войти
          </Button>
        </ButtonGroup>
      </Flex>
      <LoginModal
        isOpenLog={isOpenLog}
        onCloseLog={onCloseLog}
        onOpenReg={onOpenReg}
      />
      <RegistrationModal
        isOpenReg={isOpenReg}
        onCloseReg={onCloseReg}
        onOpenLog={onOpenLog}
      />
    </React.Fragment>
  );
}

export default NavbarMobile;
