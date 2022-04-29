import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, selectAuth } from "../../services/authSlice";
import {
  Alert,
  AlertIcon,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Text,
  Center,
  useToast,
} from "@chakra-ui/react";
import { emailValidation } from "../../utils/formValidation";
import { loginUser } from "../../api/userAPI";

function LoginModal(props) {
  const initialRef = useRef();
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const [emailError, setEmailError] = useState(true);
  const [authError, setAuthError] = useState(true);

  const formValidationHandler = (event) => {
    event.preventDefault();
    if (emailValidation(email)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }

    if (emailError && !auth) {
      loginUser(email, pass).then((res) => {
        if (res.status === 400) {
          setAuthError(false);
          return;
        }

        setAuthError(true);
        dispatch(login());
        props.onClose();
        toast({
          title: "Успех",
          description: "Вы успешно вошли на сайт!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      });
    }
  };

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        isOpen={props.isOpen}
        onClose={props.onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <form action="" onSubmit={formValidationHandler}>
            <ModalHeader>Вход</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  isRequired={true}
                />
              </FormControl>
              {!emailError && (
                <Alert status="error" mt={2}>
                  <AlertIcon />
                  Неверный email
                </Alert>
              )}

              <FormControl mt={4}>
                <FormLabel>Пароль</FormLabel>
                <Input
                  type="password"
                  placeholder="Пароль"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  isRequired={true}
                />
              </FormControl>
              {!authError && (
                <Alert status="error" mt={2}>
                  <AlertIcon />
                  Комбинация электронной почты и пароля неверны!
                </Alert>
              )}
            </ModalBody>
            <Center>
              <Text color="blackAlpha.700">
                Нет аккаунта?
                <Button
                  pl={2}
                  color="black"
                  variant="link"
                  onClick={() => {
                    props.onClose();
                    props.onOpen();
                  }}
                >
                  Зарегистрируйтесь
                </Button>
              </Text>
            </Center>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit">
                Войти
              </Button>
              <Button onClick={props.onClose}>Закрыть</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default LoginModal;
