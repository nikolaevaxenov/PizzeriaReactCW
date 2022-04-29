import React, { useState, useRef } from "react";
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
} from "@chakra-ui/react";
import {
  emailValidation,
  nameValidation,
  passwordValidation,
} from "../../utils/formValidation";

function RegistrationModal(props) {
  const initialRef = useRef();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");

  const [emailError, setEmailError] = useState(true);
  const [nameError, setNameError] = useState(true);
  const [pass1Error, setPass1Error] = useState(true);
  const [pass2Error, setPass2Error] = useState(true);

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
                />
              </FormControl>
              {!pass2Error && (
                <Alert status="error" mt={2}>
                  <AlertIcon />
                  Пароли не совпадают.
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
