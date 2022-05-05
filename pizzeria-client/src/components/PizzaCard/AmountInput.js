import { useNumberInput, HStack, Button, Input } from "@chakra-ui/react";
import { useEffect } from "react";

function AmountInput(props) {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 1,
      min: 1,
      max: 99,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  useEffect(() => {
    props.setQuantity(input.value);
  }, [input.value]);

  return (
    <HStack maxW="320px">
      <Button {...dec}>-</Button>
      <Input
        maxW={20}
        {...input}
        isReadOnly={true}
        style={{ cursor: "default" }}
      />
      <Button {...inc}>+</Button>
    </HStack>
  );
}

export default AmountInput;
