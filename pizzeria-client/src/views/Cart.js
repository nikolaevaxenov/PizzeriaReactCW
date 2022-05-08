import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Heading,
  Center,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Grid,
  GridItem,
  useToast,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectUserID,
  selectOrderCartID,
  selectOrderCartQuantityReload,
} from "../services/authSlice";
import {
  emailValidation,
  nameValidation,
  phoneValidation,
} from "../utils/formValidation";
import useAuth from "../hooks/useAuth";
import Navbar from "../components/Navbar/Navbar";
import PizzaRow from "../components/Cart/PizzaRow";
import PersonalInfoMenu from "../components/Cart/PersonalInfoMenu";
import { getCartPizzas, getCartOrderPrice, createOrder } from "../api/orderAPI";
import { updateUserOnOrder } from "../api/userAPI";

function Cart() {
  useAuth();

  const toast = useToast();
  let navigate = useNavigate();

  const userID = useSelector(selectUserID);

  const [comment, setComment] = useState("");
  const [address, setAddress] = useState(0);
  const [card, setCard] = useState(0);

  const orderCartID = useSelector(selectOrderCartID);
  const orderCartQuantityReload = useSelector(selectOrderCartQuantityReload);

  const [pizzas, setPizzas] = useState({});

  const [firstName, setFirstName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const [firstNameErrors, setFirstNameErrors] = useState([]);
  const [phoneNumberErrors, setPhoneNumberErrors] = useState([]);
  const [emailErrors, setEmailErrors] = useState([]);

  const [totalPrice, setTotalPrice] = useState(0);
  const [formSubmitting, setFormSubmitting] = useState(0);

  useEffect(() => {
    getCartPizzas(orderCartID.payload)
      .then((res) => {
        if (res.status === 201) {
          return res;
        }
        return {};
      })
      .then((result) => {
        return result.json();
      })
      .then((result) => {
        console.log(result);
        setPizzas(result);
      });
  }, [orderCartID.payload, orderCartQuantityReload]);

  useEffect(() => {
    getCartOrderPrice(orderCartID.payload)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTotalPrice(data);
      });
  }, [orderCartID, orderCartQuantityReload]);

  const validateForm = new Promise((resolve, reject) => {
    let errors = {
      firstName: [],
      lastName: [],
      middleName: [],
      phoneNumber: [],
      email: [],
    };

    console.log(
      `firstName = ${firstName} | phoneNumber = ${phoneNumber} | email = ${email}`
    );

    if (!firstName) {
      errors.firstName = ["Обязательное поле"];
    } else if (!nameValidation(firstName)) {
      errors.firstName = [
        "Некорректное имя, попробуйте написать с большой буквы",
      ];
    }

    if (!phoneNumber) {
      errors.phoneNumber = ["Обязательное поле"];
    } else if (!phoneValidation(phoneNumber)) {
      errors.phoneNumber = ["Некорректный номер телефона. Пример: 79998887766"];
    }

    if (!email) {
      errors.email = ["Обязательное поле"];
    } else if (!emailValidation(email)) {
      errors.email = ["Некорректная электронная почта!"];
    }

    resolve(errors);
  });

  const handleSubmit = async () => {
    const errors = await validateForm;
    console.log(errors);

    if (
      errors.firstName.length === 0 &&
      errors.phoneNumber.length === 0 &&
      errors.email.length === 0
    ) {
      if (address !== 0 && card !== 0) {
        console.log(`Success! Address = ${address} | Card = ${card}`);
        await updateUserOnOrder(userID, firstName, phoneNumber, email);
        createOrder(userID.payload, address, card, comment).then(() => {
          toast({
            title: "Успех",
            description: "Вы успешно заказали пиццу!",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          navigate("/");
        });
      }
    }
    setFirstNameErrors(errors.firstName);
    setPhoneNumberErrors(errors.phoneNumber);
    setEmailErrors(errors.email);
  };

  return (
    <>
      <Navbar />
      <Grid
        mt={2}
        mx={2}
        templateColumns={{
          base: "1fr",
          md: "repeat(5, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
        templateRows={{ base: "repeat(5, 1fr)" }}
        gap={4}
      >
        <GridItem colSpan={1}>
          <PersonalInfoMenu
            comment={comment}
            setComment={setComment}
            address={address}
            setAddress={setAddress}
            card={card}
            setCard={setCard}
            firstName={firstName}
            setFirstName={setFirstName}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            email={email}
            setEmail={setEmail}
            firstNameErrors={firstNameErrors}
            setFirstNameErrors={setFirstNameErrors}
            phoneNumberErrors={phoneNumberErrors}
            setPhoneNumberErrors={setPhoneNumberErrors}
            emailErrors={emailErrors}
            setEmailErrors={setEmailErrors}
          />
        </GridItem>
        <GridItem colSpan={4}>
          <Box>
            <Center>
              <Heading>Заказ</Heading>
            </Center>
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th></Th>
                    <Th>Название</Th>
                    <Th>Цена</Th>
                    <Th>Количество</Th>
                    <Th>Итог</Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {Object.getOwnPropertyNames(pizzas).length !== 0 &&
                    pizzas.map((pizza) => (
                      <PizzaRow key={pizza.id} pizza={pizza} />
                    ))}
                  <Tr>
                    <Td></Td>
                    <Td></Td>
                    <Td></Td>
                    <Td></Td>
                    <Td>
                      <strong>Итог: {totalPrice} ₽</strong>
                    </Td>
                    <Td>
                      <Button
                        leftIcon={<CheckIcon />}
                        colorScheme="teal"
                        variant="solid"
                        onClick={() => {
                          handleSubmit();
                        }}
                      >
                        Оформить заказ
                      </Button>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
            <VStack m={2} spacing={2}></VStack>
          </Box>
        </GridItem>
      </Grid>
    </>
  );
}

export default Cart;
