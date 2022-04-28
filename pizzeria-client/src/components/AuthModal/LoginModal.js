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
import { emailValidation } from "../../utils/formValidation";

function LoginModal(props) {
  const initialRef = useRef();

  const [email, setEmail] = useState("");

  const [emailError, setEmailError] = useState(true);

  const formValidationHandler = (event) => {
    event.preventDefault();
    if (emailValidation(email)) {
      setEmailError(true);
    } else {
      setEmailError(false);
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
                <Input type="password" placeholder="Пароль" />
              </FormControl>
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
