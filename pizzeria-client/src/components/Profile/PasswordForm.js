import { useState } from "react";
import {
  Alert,
  AlertIcon,
  FormControl,
  Input,
  InputGroup,
  InputLeftAddon,
  HStack,
  Button,
  useToast,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { MdModeEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import { selectUserID } from "../../services/authSlice";
import useAuth from "../../hooks/useAuth";
import { updatePasswordUser } from "../../api/userAPI";
import { passwordValidation } from "../../utils/formValidation";

function Profile() {
  const [formState, setFormState] = useState(false);

  useAuth(true, formState);

  const userID = useSelector(selectUserID);

  const [oldPassword, setOldPassword] = useState("");
  const [new1Password, setNew1Password] = useState("");
  const [new2Password, setNew2Password] = useState("");

  const [oldPasswordErrors, setOldPasswordErrors] = useState([]);
  const [new1PasswordErrors, setNew1PasswordErrors] = useState([]);
  const [new2PasswordErrors, setNew2PasswordErrors] = useState([]);

  const [editingPassword, setEditingPassword] = useState(true);

  const toast = useToast();

  const validateForm = new Promise((resolve, reject) => {
    let errors = {
      oldPassword: [],
      new1Password: [],
      new2Password: [],
    };

    if (!oldPassword) {
      errors.oldPassword = ["Обязательное поле"];
    } else if (!passwordValidation(oldPassword)) {
      errors.oldPassword = [
        "Пароль должен содержать от 8 до 32 символов. Пароль должен содержать буквы и цифры.",
      ];
    }

    if (!new1Password) {
      errors.new1Password = ["Обязательное поле"];
    } else if (new1Password === oldPassword) {
      errors.new1Password = ["Пароль не должен быть идентичен старому!"];
    } else if (!passwordValidation(new1Password)) {
      errors.new1Password = [
        "Пароль должен содержать от 8 до 32 символов. Пароль должен содержать буквы и цифры",
      ];
    }

    if (!new2Password) {
      errors.new2Password = ["Обязательное поле"];
    } else if (new1Password !== new2Password) {
      errors.new2Password = ["Пароли не совпадают"];
    } else if (!passwordValidation(new2Password)) {
      errors.new2Password = [
        "Пароль должен содержать от 8 до 32 символов. Пароль должен содержать буквы и цифры",
      ];
    }

    resolve(errors);
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    let errors = await validateForm;
    if (
      errors.oldPassword.length === 0 &&
      errors.new1Password.length === 0 &&
      errors.new2Password.length === 0
    ) {
      const result = await updatePasswordUser(
        userID,
        oldPassword,
        new1Password
      );
      console.log(result);
      if (result.status === 201) {
        toast({
          title: "Успех",
          description: "Вы успешно изменили пароль!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setFormState(true);

        setEditingPassword(true);
      } else if (result.status === 401) {
        errors.oldPassword = ["Неверный пароль!"];
      }
    }
    setOldPasswordErrors(errors.oldPassword);
    setNew1PasswordErrors(errors.new1Password);
    setNew2PasswordErrors(errors.new2Password);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormControl mb={2}>
          <InputGroup>
            <InputLeftAddon children="Старый пароль" width="15vw" />
            <Input
              type="password"
              placeholder="Ваш старый пароль"
              isReadOnly={editingPassword}
              style={
                editingPassword ? { cursor: "default" } : { cursor: "text" }
              }
              value={editingPassword ? "Your password" : oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </InputGroup>
          {!editingPassword && oldPasswordErrors?.length > 0 && (
            <Alert status="error" mx={2}>
              <AlertIcon />
              {oldPasswordErrors[0]}
            </Alert>
          )}
        </FormControl>
        <FormControl mb={2}>
          <InputGroup>
            <InputLeftAddon children="Новый пароль" width="15vw" />
            <Input
              type="password"
              placeholder="Ваш новый пароль"
              isReadOnly={editingPassword}
              style={
                editingPassword ? { cursor: "default" } : { cursor: "text" }
              }
              value={editingPassword ? "Your password" : new1Password}
              onChange={(e) => setNew1Password(e.target.value)}
            />
          </InputGroup>
          {!editingPassword && new1PasswordErrors?.length > 0 && (
            <Alert status="error" mx={2}>
              <AlertIcon />
              {new1PasswordErrors[0]}
            </Alert>
          )}
        </FormControl>
        <FormControl mb={2}>
          <InputGroup>
            <InputLeftAddon children="Подтвердите новый пароль" width="25vw" />
            <Input
              type="password"
              placeholder="Подтвердите ваш новый пароль"
              isReadOnly={editingPassword}
              style={
                editingPassword ? { cursor: "default" } : { cursor: "text" }
              }
              value={editingPassword ? "Your password" : new2Password}
              onChange={(e) => setNew2Password(e.target.value)}
            />
          </InputGroup>
          {!editingPassword && new2PasswordErrors?.length > 0 && (
            <Alert status="error" mx={2}>
              <AlertIcon />
              {new2PasswordErrors[0]}
            </Alert>
          )}
        </FormControl>
        <HStack spacing={2}>
          {editingPassword ? (
            <Button
              leftIcon={<MdModeEdit />}
              colorScheme="teal"
              variant="solid"
              onClick={(e) => {
                e.preventDefault();
                if (editingPassword) {
                  setEditingPassword(false);
                }
              }}
            >
              Изменить пароль
            </Button>
          ) : (
            <Button
              leftIcon={<MdModeEdit />}
              colorScheme="teal"
              variant="solid"
              type="submit"
            >
              Сохранить пароль
            </Button>
          )}
          {!editingPassword && (
            <Button
              leftIcon={<CloseIcon />}
              colorScheme="red"
              variant="solid"
              onClick={(e) => {
                e.preventDefault();
                setEditingPassword(true);
                setOldPassword("");
                setNew1Password("");
                setNew2Password("");

                setOldPasswordErrors("");
                setNew1PasswordErrors("");
                setNew2PasswordErrors("");
              }}
            >
              Отмена
            </Button>
          )}
        </HStack>
      </form>
    </>
  );
}

export default Profile;
