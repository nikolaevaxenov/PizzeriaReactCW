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
import { getAddress } from "../../api/addressAPI";
import { getCard } from "../../api/cardAPI";

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
        <Heading>???????????? ????????????</Heading>
      </Center>
      <VStack m={2}>
        <FormControl>
          <InputGroup>
            <InputLeftAddon children="??????" maxW={24} />
            <Input
              type="text"
              placeholder="???????? ??????"
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
            <InputLeftAddon children="??????????????" maxW={24} />
            <Input
              type="tel"
              placeholder="?????? ??????????????"
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
              placeholder="?????? email"
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
          <FormLabel htmlFor="address">??????????</FormLabel>
          <Select
            id="address"
            value={props.address}
            onChange={(e) => props.setAddress(e.target.value)}
            defaultValue={0}
          >
            <option value={0}>?????? ??????????</option>
            {Object.getOwnPropertyNames(addresses).length !== 0 &&
              addresses.map((address) => (
                <option
                  value={address.id}
                  key={address.id}
                >{`??. ${address.city}, ${address.street}, ${address.house_number}, ?????????????? ${address.housing_number}, ????. ${address.apartment_number}`}</option>
              ))}
          </Select>
        </FormControl>
        <AddressModal />
        <FormControl>
          <FormLabel htmlFor="card">?????????????????? ????????????????</FormLabel>
          <Select
            id="card"
            value={props.card}
            onChange={(e) => props.setCard(e.target.value)}
            defaultValue={0}
          >
            <option value={0}>???????? ?????????????????? ????????????????</option>
            <option value={1}>????????????????</option>
            {Object.getOwnPropertyNames(cards).length !== 0 &&
              cards.map((card) => (
                <option
                  value={card.id}
                  key={card.id}
                >{`?????????? ${card.card_number.substring(
                  card.card_number.length - 4,
                  card.card_number.length
                )}`}</option>
              ))}
          </Select>
        </FormControl>
        <CardDetailsModal />
        <FormControl>
          <FormLabel htmlFor="comment">?????????????????????? ?? ????????????</FormLabel>
          <Textarea
            id="comment"
            placeholder="?????????????????????? ?? ????????????"
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
