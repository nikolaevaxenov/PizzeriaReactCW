import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUserID } from "../../services/authSlice";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  FormControl,
  InputGroup,
  Input,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { CloseIcon, AddIcon } from "@chakra-ui/icons";
import { MdModeEdit } from "react-icons/md";
import { getCard, createCard, updateCard, deleteCard } from "../../api/cardAPI";

function AddressModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const userID = useSelector(selectUserID);

  const [cards, setCards] = useState({});
  const [watchCard, setWatchCard] = useState(false);
  const [insertingCard, setInsertingCard] = useState(false);
  const [editingCard, setEditingCard] = useState([false, 0]);

  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvcCode, setCvcCode] = useState("");

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
  }, [userID.payload, watchCard]);

  return (
    <>
      <Button
        leftIcon={<MdModeEdit />}
        colorScheme="teal"
        variant="solid"
        onClick={onOpen}
      >
        Изменить платежные данные
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Банковские карты</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Номер</Th>
                    <Th>Срок действия</Th>
                    <Th>CVC код</Th>
                    <Th></Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {Object.getOwnPropertyNames(cards).length !== 0 &&
                    cards.map((card) => (
                      <Tr key={card.id}>
                        <Td>
                          {editingCard[0] && editingCard[1] === card.id ? (
                            <Input
                              type="number"
                              placeholder="Номер"
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                              required
                            />
                          ) : (
                            card.card_number
                          )}
                        </Td>
                        <Td>
                          {editingCard[0] && editingCard[1] === card.id ? (
                            <Input
                              type="text"
                              placeholder="Срок действия"
                              value={expiryDate}
                              onChange={(e) => setExpiryDate(e.target.value)}
                              required
                            />
                          ) : (
                            card.expiry_date
                          )}
                        </Td>
                        <Td>
                          {editingCard[0] && editingCard[1] === card.id ? (
                            <Input
                              type="number"
                              placeholder="CVC код"
                              value={cvcCode}
                              onChange={(e) => setCvcCode(e.target.value)}
                              required
                            />
                          ) : (
                            card.cvc_code
                          )}
                        </Td>
                        <Td>
                          <Button
                            leftIcon={<MdModeEdit />}
                            colorScheme="teal"
                            variant="solid"
                            onClick={() => {
                              if (!editingCard[0]) {
                                setInsertingCard(false);
                                setEditingCard([true, card.id]);
                                setCardNumber(card.cardNumber);
                                setExpiryDate(card.expiryDate);
                                setCvcCode(card.house_number);
                              } else {
                                if (editingCard[1] === card.id) {
                                  updateCard(
                                    card.id,
                                    cardNumber,
                                    expiryDate,
                                    cvcCode
                                  ).then((result) => {
                                    if (result.status === 201) {
                                      toast({
                                        title: "Успех",
                                        description:
                                          "Вы успешно изменили банковскую карту!",
                                        status: "success",
                                        duration: 3000,
                                        isClosable: true,
                                      });
                                      setEditingCard([false, 0]);
                                      setWatchCard((watchCard) => !watchCard);
                                    }
                                  });
                                }
                              }
                            }}
                          >
                            {editingCard[0] && editingCard[1] === card.id
                              ? "Сохранить"
                              : "Изменить"}
                          </Button>
                        </Td>
                        <Td>
                          <Button
                            leftIcon={<CloseIcon />}
                            colorScheme="red"
                            variant="solid"
                            onClick={() => {
                              if (
                                !editingCard[0] ||
                                editingCard[1] !== card.id
                              ) {
                                deleteCard(card.id).then((result) => {
                                  if (result.status === 201) {
                                    toast({
                                      title: "Успех",
                                      description:
                                        "Вы успешно удалили банковскую карту!",
                                      status: "success",
                                      duration: 3000,
                                      isClosable: true,
                                    });
                                    setWatchCard((watchCard) => !watchCard);
                                  }
                                });
                              } else if (
                                editingCard[0] &&
                                editingCard[1] === card.id
                              ) {
                                setEditingCard(false);
                                setCardNumber(card.cardNumber);
                                setExpiryDate(card.expiryDate);
                                setCvcCode(card.house_number);
                              }
                            }}
                          >
                            {editingCard[0] && editingCard[1] === card.id
                              ? "Отмена"
                              : "Удалить"}
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                  <Tr>
                    <Td>
                      {insertingCard && (
                        <FormControl mb={2}>
                          <InputGroup>
                            <Input
                              type="text"
                              placeholder="Номер"
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                              required
                            />
                          </InputGroup>
                        </FormControl>
                      )}
                    </Td>
                    <Td>
                      {insertingCard && (
                        <FormControl mb={2}>
                          <InputGroup>
                            <Input
                              type="text"
                              placeholder="Срок действия"
                              value={expiryDate}
                              onChange={(e) => setExpiryDate(e.target.value)}
                              required
                            />
                          </InputGroup>
                        </FormControl>
                      )}
                    </Td>
                    <Td>
                      {insertingCard && (
                        <FormControl mb={2}>
                          <InputGroup>
                            <Input
                              type="text"
                              placeholder="CVC код"
                              value={cvcCode}
                              onChange={(e) => setCvcCode(e.target.value)}
                              required
                            />
                          </InputGroup>
                        </FormControl>
                      )}
                    </Td>
                    <Td>
                      <Button
                        leftIcon={<AddIcon />}
                        colorScheme="teal"
                        variant="solid"
                        onClick={() => {
                          if (!insertingCard) {
                            setInsertingCard(true);
                          } else {
                            createCard(
                              userID.payload,
                              cardNumber,
                              expiryDate,
                              cvcCode
                            ).then((result) => {
                              if (result.status === 201) {
                                toast({
                                  title: "Успех",
                                  description:
                                    "Вы успешно добавили банковскую карту!",
                                  status: "success",
                                  duration: 3000,
                                  isClosable: true,
                                });
                                setInsertingCard(false);
                                setWatchCard((watchCard) => !watchCard);
                                setCardNumber("");
                                setExpiryDate("");
                                setCvcCode("");
                              }
                            });
                          }
                        }}
                      >
                        Добавить
                      </Button>
                    </Td>
                    <Td>
                      {insertingCard && (
                        <Button
                          leftIcon={<CloseIcon />}
                          colorScheme="red"
                          variant="solid"
                          onClick={() => {
                            setInsertingCard(false);
                          }}
                        >
                          Отмена
                        </Button>
                      )}
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Закрыть
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddressModal;
