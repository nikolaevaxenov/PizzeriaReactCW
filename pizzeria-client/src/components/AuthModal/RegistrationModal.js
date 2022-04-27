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

function RegistrationModal(props) {
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
          <ModalHeader>Регистрация</ModalHeader>
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

            <FormControl mt={4}>
              <FormLabel>Подтвердите пароль</FormLabel>
              <Input type="password" placeholder="Подтвердите пароль" />
            </FormControl>
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
            <Button colorScheme="blue" mr={3}>
              Зарегистрироваться
            </Button>
            <Button onClick={props.onClose}>Закрыть</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default RegistrationModal;
