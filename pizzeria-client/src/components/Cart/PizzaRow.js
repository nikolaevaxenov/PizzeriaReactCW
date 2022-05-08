import { useState, useEffect } from "react";
import {
  SimpleGrid,
  Box,
  Button,
  Heading,
  Center,
  VStack,
  HStack,
  Divider,
  Alert,
  AlertIcon,
  FormControl,
  Input,
  InputGroup,
  InputLeftAddon,
  FormLabel,
  Select,
  Image,
  Grid,
  GridItem,
  Tr,
  Td,
  useToast,
  useNumberInput,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  orderCartQuantityReload,
  selectUserID,
  selectUserFirstName,
  selectUserPhoneNumber,
  selectUserEmail,
  selectOrderCartID,
} from "../../services/authSlice";
import { getAddress, createAddress } from "../../api/addressAPI";
import { getCard, createCard } from "../../api/cardAPI";
import { getCartPizzas, removeFromCart, addToCart } from "../../api/orderAPI";
import AmountInput from "../PizzaCard/AmountInput";

function PizzaRow(props) {
  const pizza = props.pizza;

  const toast = useToast();
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(pizza.quantity);
  const [totalPrice, setTotalPrice] = useState(
    pizza.Pizza[`price_${pizza.size}`] * pizza.quantity
  );
  const [submittingQuantity, setSubmittingQuantity] = useState(false);

  const orderCartID = useSelector(selectOrderCartID);

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: quantity,
      min: 1,
      max: 99,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  useEffect(() => {
    setQuantity(input.value);
  }, [input.value]);

  useEffect(() => {
    setTotalPrice(pizza.Pizza[`price_${pizza.size}`] * quantity);
  }, [quantity]);

  return (
    <>
      <Tr>
        <Td>
          <Image
            maxW={100}
            src={require(`../../assets/${pizza.Pizza.photo}`)}
            fallbackSrc="https://via.placeholder.com/150"
            alt={pizza.Pizza.title}
          />
        </Td>
        <Td>
          <p>
            {pizza.Pizza.title}, {pizza.size} см
          </p>
        </Td>
        <Td>
          <p>{pizza.Pizza[`price_${pizza.size}`]} ₽</p>
        </Td>
        <Td>
          <HStack maxW="320px">
            <Button
              {...dec}
              isLoading={submittingQuantity}
              onClick={() => {
                setSubmittingQuantity(true);
                console.log(orderCartID.payload);
                removeFromCart(
                  orderCartID.payload,
                  pizza.PizzaId,
                  pizza.size,
                  1
                )
                  .then(() => {
                    dispatch(orderCartQuantityReload());
                  })
                  .then(() => {
                    setSubmittingQuantity(false);
                  });
              }}
            >
              -
            </Button>
            <Input
              minW={12}
              {...input}
              isReadOnly={true}
              style={{ cursor: "default" }}
            />
            <Button
              {...inc}
              isLoading={submittingQuantity}
              onClick={() => {
                setSubmittingQuantity(true);
                addToCart(orderCartID.payload, pizza.PizzaId, pizza.size, 1)
                  .then(() => {
                    dispatch(orderCartQuantityReload());
                  })
                  .then(() => {
                    setSubmittingQuantity(false);
                  });
              }}
            >
              +
            </Button>
          </HStack>
        </Td>
        <Td>
          <strong>{totalPrice} ₽</strong>
        </Td>
        <Td>
          <Button
            leftIcon={<CloseIcon />}
            colorScheme="red"
            variant="solid"
            onClick={() => {
              removeFromCart(
                orderCartID.payload,
                pizza.PizzaId,
                pizza.size,
                2
              ).then(() => {
                toast({
                  title: "Успех",
                  description: "Вы успешно удалили пиццу!",
                  status: "success",
                  duration: 3000,
                  isClosable: true,
                });
                dispatch(orderCartQuantityReload());
              });
            }}
          >
            Удалить
          </Button>
        </Td>
      </Tr>
    </>
  );
}

export default PizzaRow;
