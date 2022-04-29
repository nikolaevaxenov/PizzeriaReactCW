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
import {
  emailValidation,
  nameValidation,
  passwordValidation,
} from "../../utils/formValidation";
import { registerUser } from "../../api/userAPI";

function RegistrationModal(props) {
  const initialRef = useRef();
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");

  const [emailError, setEmailError] = useState(true);
  const [nameError, setNameError] = useState(true);
  const [pass1Error, setPass1Error] = useState(true);
  const [pass2Error, setPass2Error] = useState(true);
  const [authError, setAuthError] = useState(true);

  const formValidationHandler = (event) => {
    event.preventDefault();
    if (emailValidation(email)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }

    if (nameValidation(name)) {
      setNameError(true);
    } else {
      setNameError(false);
    }

    if (passwordValidation(pass1)) {
      setPass1Error(true);
    } else {
      setPass1Error(false);
    }
    if (pass1 === pass2) {
      setPass2Error(true);
    } else {
      setPass2Error(false);
    }

    if (emailError && nameError && pass1Error && pass2Error && !auth) {
      registerUser(email, pass2, name).then((res) => {
        console.log(res.status);
        if (res.status === 208) {
          setAuthError(false);
          return;
        }

        setAuthError(true);
        dispatch(login());
        props.onClose();
        toast({
          title: "Успех",
          description: "Вы успешно зарегистрировались!",
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
            <ModalHeader>Регистрация</ModalHeader>
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
                <FormLabel>Имя</FormLabel>
                <Input
                  placeholder="Имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  isRequired={true}
                />
              </FormControl>
              {!nameError && (
                <Alert status="error" mt={2}>
                  <AlertIcon />
                  Неверное имя пользователя.
                </Alert>
              )}

              <FormControl mt={4}>
                <FormLabel>Пароль</FormLabel>
                <Input
                  type="password"
                  placeholder="Пароль"
                  value={pass1}
                  onChange={(e) => setPass1(e.target.value)}
                  isRequired={true}
                />
              </FormControl>
              {!pass1Error && (
                <Alert status="error" mt={2}>
                  <AlertIcon />
                  Пароль должен содержать от 8 до 32 символов. Пароль должен
                  содержать буквы и цифры.
                </Alert>
              )}

              <FormControl mt={4}>
                <FormLabel>Подтвердите пароль</FormLabel>
                <Input
                  type="password"
                  placeholder="Подтвердите пароль"
                  value={pass2}
                  onChange={(e) => setPass2(e.target.value)}
                  isRequired={true}
                />
              </FormControl>
              {!pass2Error && (
                <Alert status="error" mt={2}>
                  <AlertIcon />
                  Пароли не совпадают.
                </Alert>
              )}
              {!authError && (
                <Alert status="error" mt={2}>
                  <AlertIcon />
                  Пользователь с такой электронной почтой уже существует!
                </Alert>
              )}
            </ModalBody>
            <Center>
              <Text color="blackAlpha.700">
                Уже зарегистрировались?
                <Button
                  pl={2}
                  color="black"
                  variant="link"
                  onClick={() => {
                    props.onClose();
                    props.onOpen();
                  }}
                >
                  Войдите
                </Button>
              </Text>
            </Center>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit">
                Зарегистрироваться
              </Button>
              <Button onClick={props.onClose}>Закрыть</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default RegistrationModal;
