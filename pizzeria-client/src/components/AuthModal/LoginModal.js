import React from "react";
import {
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

function LoginModal(props) {
  const initialRef = React.useRef();

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        isOpen={props.isOpen}
        onClose={props.onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Вход</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input ref={initialRef} placeholder="Email" />
            </FormControl>

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
            <Button colorScheme="blue" mr={3}>
              Войти
            </Button>
            <Button onClick={props.onClose}>Закрыть</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default LoginModal;
