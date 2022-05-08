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
import {
  selectUserID,
  selectUserFirstName,
  selectUserLastName,
  selectUserMiddleName,
  selectUserPhoneNumber,
  selectUserEmail,
} from "../../services/authSlice";
import useAuth from "../../hooks/useAuth";
import { updateUser } from "../../api/userAPI";
import {
  emailValidation,
  nameValidation,
  phoneValidation,
} from "../../utils/formValidation";

function PersonalInfoForm() {
  const [formState, setFormState] = useState(false);

  useAuth(true, formState);

  const userID = useSelector(selectUserID);
  const userFirstName = useSelector(selectUserFirstName);
  const userLastName = useSelector(selectUserLastName);
  const userMiddleName = useSelector(selectUserMiddleName);
  const userPhoneNumber = useSelector(selectUserPhoneNumber);
  const userEmail = useSelector(selectUserEmail);

  const [firstName, setFirstName] = useState(userFirstName.payload);
  const [lastName, setLastName] = useState(userLastName.payload);
  const [middleName, setMiddleName] = useState(userMiddleName.payload);
  const [phoneNumber, setPhoneNumber] = useState(userPhoneNumber.payload);
  const [email, setEmail] = useState(userEmail.payload);

  const [firstNameErrors, setFirstNameErrors] = useState([]);
  const [lastNameErrors, setLastNameErrors] = useState([]);
  const [middleNameErrors, setMiddleNameErrors] = useState([]);
  const [phoneNumberErrors, setPhoneNumberErrors] = useState([]);
  const [emailErrors, setEmailErrors] = useState([]);

  const [editingPersonalInfo, setEditingPersonalInfo] = useState(true);

  const toast = useToast();

  const validateForm = new Promise((resolve, reject) => {
    let errors = {
      firstName: [],
      lastName: [],
      middleName: [],
      phoneNumber: [],
      email: [],
    };

    if (!firstName) {
      errors.firstName = ["Обязательное поле"];
    } else if (!nameValidation(firstName)) {
      errors.firstName = [
        "Некорректное имя, попробуйте написать с большой буквы",
      ];
    }

    if (lastName && !nameValidation(lastName)) {
      errors.lastName = [
        "Некорректная фамилия, попробуйте написать с большой буквы",
      ];
    }

    if (middleName && !nameValidation(middleName)) {
      errors.middleName = [
        "Некорректное отчество, попробуйте написать с большой буквы",
      ];
    }

    if (phoneNumber && !phoneValidation(phoneNumber)) {
      errors.phoneNumber = ["Некорректный номер телефона. Пример: 79998887766"];
    }

    if (!email) {
      errors.email = ["Обязательное поле"];
    } else if (!emailValidation(email)) {
      errors.email = ["Некорректная электронная почта!"];
    }

    resolve(errors);
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    validateForm.then((errors) => {
      if (
        errors.firstName.length === 0 &&
        errors.lastName.length === 0 &&
        errors.middleName.length === 0 &&
        errors.phoneNumber.length === 0 &&
        errors.email.length === 0
      ) {
        updateUser(userID, firstName, lastName, middleName, phoneNumber, email);
        toast({
          title: "Успех",
          description: "Вы успешно изменили данные аккаунта!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setFormState(true);

        setEditingPersonalInfo(true);
      }
      setFirstNameErrors(errors.firstName);
      setLastNameErrors(errors.lastName);
      setMiddleNameErrors(errors.middleName);
      setPhoneNumberErrors(errors.phoneNumber);
      setEmailErrors(errors.email);
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormControl mb={2}>
          <InputGroup>
            <InputLeftAddon children="Имя" width="10vw" />
            <Input
              type="text"
              placeholder="Ваше имя"
              isReadOnly={editingPersonalInfo}
              style={
                editingPersonalInfo ? { cursor: "default" } : { cursor: "text" }
              }
              value={editingPersonalInfo ? userFirstName.payload : firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </InputGroup>
          {firstNameErrors?.length > 0 ? (
            <Alert status="error" mx={2}>
              <AlertIcon />
              {firstNameErrors[0]}
            </Alert>
          ) : null}
        </FormControl>
        <FormControl mb={2}>
          <InputGroup>
            <InputLeftAddon children="Фамилия" width="10vw" />
            <Input
              type="text"
              placeholder="Ваша фамилия"
              isReadOnly={editingPersonalInfo}
              style={
                editingPersonalInfo ? { cursor: "default" } : { cursor: "text" }
              }
              value={editingPersonalInfo ? userLastName.payload : lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </InputGroup>
          {lastNameErrors?.length > 0 ? (
            <Alert status="error" mx={2}>
              <AlertIcon />
              {lastNameErrors[0]}
            </Alert>
          ) : null}
        </FormControl>
        <FormControl mb={2}>
          <InputGroup>
            <InputLeftAddon children="Отчество" width="10vw" />
            <Input
              type="text"
              placeholder="Ваше отчество"
              isReadOnly={editingPersonalInfo}
              style={
                editingPersonalInfo ? { cursor: "default" } : { cursor: "text" }
              }
              value={editingPersonalInfo ? userMiddleName.payload : middleName}
              onChange={(e) => setMiddleName(e.target.value)}
            />
          </InputGroup>
          {middleNameErrors?.length > 0 ? (
            <Alert status="error" mx={2}>
              <AlertIcon />
              {middleNameErrors[0]}
            </Alert>
          ) : null}
        </FormControl>
        <FormControl mb={2}>
          <InputGroup>
            <InputLeftAddon children="Телефон" width="10vw" />
            <Input
              type="tel"
              placeholder="Ваш телефон"
              isReadOnly={editingPersonalInfo}
              style={
                editingPersonalInfo ? { cursor: "default" } : { cursor: "text" }
              }
              value={
                editingPersonalInfo ? userPhoneNumber.payload : phoneNumber
              }
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </InputGroup>
          {phoneNumberErrors?.length > 0 ? (
            <Alert status="error" mx={2}>
              <AlertIcon />
              {phoneNumberErrors[0]}
            </Alert>
          ) : null}
        </FormControl>
        <FormControl mb={2}>
          <InputGroup>
            <InputLeftAddon children="Email" width="10vw" />
            <Input
              type="email"
              placeholder="Ваш email"
              isReadOnly={editingPersonalInfo}
              style={
                editingPersonalInfo ? { cursor: "default" } : { cursor: "text" }
              }
              value={editingPersonalInfo ? userEmail.payload : email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputGroup>
          {emailErrors?.length > 0 ? (
            <Alert status="error" mx={2}>
              <AlertIcon />
              {emailErrors[0]}
            </Alert>
          ) : null}
        </FormControl>
        <HStack spacing={2}>
          {editingPersonalInfo ? (
            <Button
              leftIcon={<MdModeEdit />}
              colorScheme="teal"
              variant="solid"
              onClick={(e) => {
                e.preventDefault();
                if (editingPersonalInfo) {
                  setEditingPersonalInfo(false);
                }
              }}
            >
              Изменить личные данные
            </Button>
          ) : (
            <Button
              leftIcon={<MdModeEdit />}
              colorScheme="teal"
              variant="solid"
              type="submit"
            >
              Сохранить данные
            </Button>
          )}
          {!editingPersonalInfo && (
            <Button
              leftIcon={<CloseIcon />}
              colorScheme="red"
              variant="solid"
              onClick={(e) => {
                e.preventDefault();
                setEditingPersonalInfo(true);
                setFirstName(userFirstName.payload);
                setLastName(userLastName.payload);
                setMiddleName(userMiddleName.payload);
                setPhoneNumber(userPhoneNumber.payload);
                setEmail(userEmail.payload);
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

export default PersonalInfoForm;
