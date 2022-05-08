import { useState, useEffect } from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Heading,
  Center,
  VStack,
  FormControl,
  Input,
  InputGroup,
  InputLeftAddon,
  FormLabel,
  Select,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import {
  selectUserID,
  selectUserFirstName,
  selectUserPhoneNumber,
  selectUserEmail,
  selectAddressReload,
  selectCardReload,
} from "../../services/authSlice";
import AddressModal from "../Profile/AddressModal";
import CardDetailsModal from "../Profile/CardDetailsModal";
import { getAddress, createAddress } from "../../api/addressAPI";
import { getCard, createCard } from "../../api/cardAPI";

function PersonalInfoMenu(props) {
  const toast = useToast();

  const userID = useSelector(selectUserID);
  const userFirstName = useSelector(selectUserFirstName);
  const userPhoneNumber = useSelector(selectUserPhoneNumber);
  const userEmail = useSelector(selectUserEmail);

  const addressReload = useSelector(selectAddressReload);
  const cardReload = useSelector(selectCardReload);

  const [addresses, setAddresses] = useState({});
  const [cards, setCards] = useState({});

  useEffect(() => {
    props.setFirstName(userFirstName.payload);
    props.setPhoneNumber(userPhoneNumber.payload);
    props.setEmail(userEmail.payload);
  }, [userFirstName.payload, userPhoneNumber.payload, userEmail.payload]);

  useEffect(() => {
    console.log(userID.payload);
    getAddress(userID.payload)
      .then((res) => {
        if (res.status !== 400) {
          return [true, res];
        }
        return [false, res];
      })
      .then((result) => {
        if (result[0]) {
          return result[1].json();
        }
        return {};
      })
      .then((result) => {
        console.log(result);
        setAddresses(result);
      });
  }, [userID.payload, addressReload]);

  useEffect(() => {
    getCard(userID.payload)
      .then((res) => {
        if (res.status !== 400) {
          return [true, res];
        }
        return [false, res];
      })
      .then((result) => {
        if (result[0]) {
          return result[1].json();
        }
        return {};
      })
      .then((result) => {
        setCards(result);
      });
  }, [userID.payload, cardReload]);

  return (
    <Box>
      <Center>
        <Heading>Личные данные</Heading>
      </Center>
      <VStack m={2}>
        <FormControl>
          <InputGroup>
            <InputLeftAddon children="Имя" maxW={24} />
            <Input
              type="text"
              placeholder="Ваше имя"
              value={props.firstName}
              onChange={(e) => props.setFirstName(e.target.value)}
              required
            />
          </InputGroup>
          {props.firstNameErrors?.length > 0 ? (
            <Alert status="error" mx={2}>
              <AlertIcon />
              {props.firstNameErrors[0]}
            </Alert>
          ) : null}
        </FormControl>
        <FormControl>
          <InputGroup>
            <InputLeftAddon children="Телефон" maxW={24} />
            <Input
              type="tel"
              placeholder="Ваш телефон"
              value={props.phoneNumber}
              onChange={(e) => props.setPhoneNumber(e.target.value)}
              required
            />
          </InputGroup>
          {props.phoneNumberErrors?.length > 0 ? (
            <Alert status="error" mx={2}>
              <AlertIcon />
              {props.phoneNumberErrors[0]}
            </Alert>
          ) : null}
        </FormControl>
        <FormControl>
          <InputGroup>
            <InputLeftAddon children="Email" maxW={24} />
            <Input
              type="email"
              placeholder="Ваш email"
              value={props.email}
              onChange={(e) => props.setEmail(e.target.value)}
              required
            />
          </InputGroup>
          {props.emailErrors?.length > 0 ? (
            <Alert status="error" mx={2}>
              <AlertIcon />
              {props.emailErrors[0]}
            </Alert>
          ) : null}
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="address">Адрес</FormLabel>
          <Select
            id="address"
            value={props.address}
            onChange={(e) => props.setAddress(e.target.value)}
            defaultValue={0}
          >
            <option value={0}>Ваш адрес</option>
            {Object.getOwnPropertyNames(addresses).length !== 0 &&
              addresses.map((address) => (
                <option
                  value={address.id}
                  key={address.id}
                >{`г. ${address.city}, ${address.street}, ${address.house_number}, подъезд ${address.housing_number}, кв. ${address.apartment_number}`}</option>
              ))}
          </Select>
        </FormControl>
        <AddressModal />
        <FormControl>
          <FormLabel htmlFor="card">Платежное средство</FormLabel>
          <Select
            id="card"
            value={props.card}
            onChange={(e) => props.setCard(e.target.value)}
            defaultValue={0}
          >
            <option value={0}>Ваше платежное средство</option>
            <option value={1}>Наличные</option>
            {Object.getOwnPropertyNames(cards).length !== 0 &&
              cards.map((card) => (
                <option
                  value={card.id}
                  key={card.id}
                >{`Карта ${card.card_number.substring(
                  card.card_number.length - 4,
                  card.card_number.length
                )}`}</option>
              ))}
          </Select>
        </FormControl>
        <CardDetailsModal />
        <FormControl>
          <FormLabel htmlFor="comment">Комментарий к заказу</FormLabel>
          <Textarea
            id="comment"
            placeholder="Комментарий к заказу"
            resize="none"
            value={props.comment}
            onChange={(e) => props.setComment(e.target.value)}
          />
        </FormControl>
      </VStack>
    </Box>
  );
}

export default PersonalInfoMenu;
