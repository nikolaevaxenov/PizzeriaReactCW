import {
  Box,
  Image,
  Text,
  Center,
  HStack,
  useRadioGroup,
  Heading,
  Button,
  Spacer,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import RadioSizeButton from "./RadioSizeButton";
import AmountInput from "./AmountInput";
import { useEffect, useState } from "react";

function PizzaCard(props) {
  const [price, setPrice] = useState(props.price_26);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("26 см");

  const options = ["26 см", "30 см", "40 см"];
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "pizzaSizes",
    defaultValue: "26 см",
    onChange: (size) => {
      setSize(size);
    },
  });

  const group = getRootProps();

  useEffect(() => {
    setPrice(props[`price_${size.substring(0, 2)}`] * quantity);
  }, [quantity, size]);
  return (
    <Box
      maxW="sm"
      m={2}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      px={8}
    >
      <Center>
        <Image
          maxW={250}
          src={require(`../../assets/${props.photo}`)}
          fallbackSrc="https://via.placeholder.com/150"
          alt={props.title}
        />
      </Center>

      <Center>
        <Popover>
          <PopoverTrigger>
            <Heading
              size="md"
              cursor="pointer"
              textDecoration="underline dotted"
            >
              {props.title}
            </Heading>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>
              <Heading size="sm">Ингредиенты</Heading>
            </PopoverHeader>
            <PopoverBody>
              <Text as="i">{props.ingredients}</Text>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Center>
      <Center>
        <HStack {...group} mt={2}>
          {options.map((value) => {
            const radio = getRadioProps({ value });
            return (
              <RadioSizeButton key={value} {...radio}>
                {value}
              </RadioSizeButton>
            );
          })}
        </HStack>
      </Center>
      <Center mt={2}>
        <AmountInput setQuantity={setQuantity} />
        <Heading ml={2} size="md">
          {price} ₽
        </Heading>
      </Center>
      <Center my={2}>
        <Button leftIcon={<AddIcon />} colorScheme="teal" variant="solid">
          В корзину
        </Button>
      </Center>
    </Box>
  );
}

export default PizzaCard;
