import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  SimpleGrid,
  Box,
  Button,
  Heading,
  Center,
  VStack,
  HStack,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Divider,
} from "@chakra-ui/react";
import { MdModeEdit } from "react-icons/md";
import { selectUserID } from "../services/authSlice";
import { getOrderHistory } from "../api/orderAPI";
import Navbar from "../components/Navbar/Navbar";
import PersonalInfoForm from "../components/Profile/PersonalInfoForm";
import PasswordForm from "../components/Profile/PasswordForm";
import AddressModal from "../components/Profile/AddressModal";
import CardDetailsModal from "../components/Profile/CardDetailsModal";

function Profile() {
  const userID = useSelector(selectUserID);
  const [orderHistory, setOrderHistory] = useState([]);
  const [orderHistoryElem, setOrderHistoryElem] = useState([]);

  useEffect(() => {
    getOrderHistory(userID.payload)
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setOrderHistory(result);
      });
  }, [userID.payload]);

  useEffect(() => {
    if (orderHistory && orderHistory.length !== 0) {
      let orders = [];

      for (const order of orderHistory) {
        let myDate = new Date(order[0].createdAt);
        let totalPrice = 0;

        const heading = `Заказ №${
          order[0].id
        } от ${myDate.getDate()}.${myDate.getMonth()}.${myDate.getFullYear()} ${myDate.getHours()}:${myDate.getMinutes()}`;

        const status = order[0].status;
        let pizzas = [];

        for (const pizza of order[1]) {
          let price = pizza.Pizza[`price_${pizza.size}`] * pizza.quantity;
          totalPrice += price;

          pizzas.push([pizza.Pizza.title, pizza.size, pizza.quantity, price]);
        }

        orders.push([order[0].id, heading, status, pizzas, totalPrice]);
      }

      const elems = orders.map((order) => (
        <Box m={5} p={2} borderWidth="1px" borderRadius="lg" key={order[0]}>
          <Heading size="md">{order[1]}</Heading>
          <Text as="i">Статус: {order[2]}</Text>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Название</Th>
                  <Th>Кол-во</Th>
                  <Th>Итого</Th>
                </Tr>
              </Thead>
              <Tbody>
                {order[3].map((pizza) => (
                  <Tr>
                    <Td>
                      {pizza[0]}, {pizza[1]}
                    </Td>
                    <Td>{pizza[2]}</Td>
                    <Td>{pizza[3]}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <strong>Итого: {order[4]}</strong>
        </Box>
      ));

      setOrderHistoryElem(elems);
    }
  }, [orderHistory]);

  return (
    <>
      <Navbar />
      <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} spacing={10}>
        <Box mx={5} border>
          <Center>
            <Heading>Личные данные</Heading>
          </Center>
          <Box my={2}>
            <PersonalInfoForm />
            <Divider my={4} />
            <PasswordForm />
          </Box>
          <Box mb={2}>
            <AddressModal />
          </Box>
          <Box>
            <CardDetailsModal />
          </Box>
        </Box>
        <Box>
          <Center>
            <Heading>История заказов</Heading>
          </Center>
          {orderHistoryElem}
        </Box>
      </SimpleGrid>
    </>
  );
}

export default Profile;
