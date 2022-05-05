import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAuth } from "../../services/authSlice";
import { Link, useNavigate } from "react-router-dom";
import {
  Flex,
  Spacer,
  Box,
  Heading,
  ButtonGroup,
  Button,
  IconButton,
  Icon,
  useDisclosure,
} from "@chakra-ui/react";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { FaUserAlt } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import LoginModal from "../AuthModal/LoginModal";
import RegistrationModal from "../AuthModal/RegistrationModal";
import LogoutButton from "./LogoutButton";

function NavbarDesktop() {
  const auth = useSelector(selectAuth);
  let navigate = useNavigate();

  const {
    isOpen: isOpenLog,
    onOpen: onOpenLog,
    onClose: onCloseLog,
  } = useDisclosure();
  const {
    isOpen: isOpenReg,
    onOpen: onOpenReg,
    onClose: onCloseReg,
  } = useDisclosure();

  return (
    <React.Fragment>
      <Flex
        minWidth="max-content"
        alignItems="center"
        gap="2"
        p={2}
        display={{ base: "none", md: "flex" }}
        bgGradient="linear(to right, #0f2027, #203a43, #2c5364)"
      >
        <Box p="2">
          <Heading
            size="md"
            bgGradient="linear(to right, #f12711, #f5af19)"
            bgClip="text"
          >
            <Link to="/">Пиццерия</Link>
          </Heading>
        </Box>
        <Spacer />
        <Box p="2">
          <Heading
            size="md"
            bgGradient="linear(to right, #f12711, #f5af19)"
            bgClip="text"
          >
            +7 (999) 777-77-77
          </Heading>
        </Box>
        <Spacer />
        <ButtonGroup gap="2">
          <IconButton
            bgGradient="linear(to right, #f12711, #f5af19)"
            _hover={{
              bgGradient: "linear(to right, #659999, #f4791f)",
            }}
            icon={<AiOutlineShoppingCart />}
          />
          {!auth ? (
            <Button
              bgGradient="linear(to right, #f12711, #f5af19)"
              _hover={{
                bgGradient: "linear(to right, #659999, #f4791f)",
              }}
              onClick={onOpenLog}
              leftIcon={<FiLogIn />}
            >
              Войти
            </Button>
          ) : (
            <React.Fragment>
              <IconButton
                bgGradient="linear(to right, #f12711, #f5af19)"
                _hover={{
                  bgGradient: "linear(to right, #659999, #f4791f)",
                }}
                icon={<FaUserAlt />}
                onClick={() => navigate("/profile")}
              />
              <LogoutButton />
            </React.Fragment>
          )}
        </ButtonGroup>
      </Flex>
      <LoginModal isOpen={isOpenLog} onClose={onCloseLog} onOpen={onOpenReg} />
      <RegistrationModal
        isOpen={isOpenReg}
        onClose={onCloseReg}
        onOpen={onOpenLog}
      />
    </React.Fragment>
  );
}

export default NavbarDesktop;
