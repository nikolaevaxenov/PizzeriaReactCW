import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addressReload, selectUserID } from "../../services/authSlice";
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
import {
  getAddress,
  createAddress,
  updateAddress,
  deleteAddress,
} from "../../api/addressAPI";

function AddressModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const toast = useToast();

  const userID = useSelector(selectUserID);

  const [addresses, setAddresses] = useState({});
  const [watchAddress, setWatchAddress] = useState(false);
  const [insertingAddress, setInsertingAddress] = useState(false);
  const [editingAddress, setEditingAddress] = useState([false, 0]);

  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [housingNumber, setHousingNumber] = useState("");
  const [apartmentNumber, setApartmentNumber] = useState("");
  const [intercomCode, setIntercomCode] = useState("");

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
  }, [userID.payload, watchAddress]);

  return (
    <>
      <Button
        leftIcon={<MdModeEdit />}
        colorScheme="teal"
        variant="solid"
        onClick={onOpen}
      >
        Изменить адреса
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Адреса</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Город</Th>
                    <Th>Улица</Th>
                    <Th>Дом</Th>
                    <Th>Подъезд</Th>
                    <Th>Квартира</Th>
                    <Th>Код домофона</Th>
                    <Th></Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {Object.getOwnPropertyNames(addresses).length !== 0 &&
                    addresses.map((address) => (
                      <Tr key={address.id}>
                        <Td>
                          {editingAddress[0] &&
                          editingAddress[1] === address.id ? (
                            <Input
                              type="text"
                              placeholder="Город"
                              value={city}
                              onChange={(e) => setCity(e.target.value)}
                              required
                            />
                          ) : (
                            address.city
                          )}
                        </Td>
                        <Td>
                          {editingAddress[0] &&
                          editingAddress[1] === address.id ? (
                            <Input
                              type="text"
                              placeholder="Улица"
                              value={street}
                              onChange={(e) => setStreet(e.target.value)}
                              required
                            />
                          ) : (
                            address.street
                          )}
                        </Td>
                        <Td>
                          {editingAddress[0] &&
                          editingAddress[1] === address.id ? (
                            <Input
                              type="text"
                              placeholder="Дом"
                              value={houseNumber}
                              onChange={(e) => setHouseNumber(e.target.value)}
                              required
                            />
                          ) : (
                            address.house_number
                          )}
                        </Td>
                        <Td>
                          {editingAddress[0] &&
                          editingAddress[1] === address.id ? (
                            <Input
                              type="text"
                              placeholder="Подъезд"
                              value={housingNumber}
                              onChange={(e) => setHousingNumber(e.target.value)}
                              required
                            />
                          ) : (
                            address.housing_number
                          )}
                        </Td>
                        <Td>
                          {editingAddress[0] &&
                          editingAddress[1] === address.id ? (
                            <Input
                              type="text"
                              placeholder="Квартира"
                              value={apartmentNumber}
                              onChange={(e) =>
                                setApartmentNumber(e.target.value)
                              }
                              required
                            />
                          ) : (
                            address.apartment_number
                          )}
                        </Td>
                        <Td>
                          {editingAddress[0] &&
                          editingAddress[1] === address.id ? (
                            <Input
                              type="text"
                              placeholder="Код домофона"
                              value={intercomCode}
                              onChange={(e) => setIntercomCode(e.target.value)}
                              required
                            />
                          ) : (
                            address.intercom_code
                          )}
                        </Td>
                        <Td>
                          <Button
                            leftIcon={<MdModeEdit />}
                            colorScheme="teal"
                            variant="solid"
                            onClick={() => {
                              if (!editingAddress[0]) {
                                setInsertingAddress(false);
                                setEditingAddress([true, address.id]);
                                setCity(address.city);
                                setStreet(address.street);
                                setHouseNumber(address.house_number);
                                setHousingNumber(address.housing_number);
                                setApartmentNumber(address.apartment_number);
                                setIntercomCode(address.intercom_code);
                              } else {
                                if (editingAddress[1] === address.id) {
                                  updateAddress(
                                    address.id,
                                    city,
                                    street,
                                    houseNumber,
                                    housingNumber,
                                    apartmentNumber,
                                    intercomCode
                                  ).then((result) => {
                                    if (result.status === 201) {
                                      dispatch(addressReload());
                                      toast({
                                        title: "Успех",
                                        description:
                                          "Вы успешно изменили адрес!",
                                        status: "success",
                                        duration: 3000,
                                        isClosable: true,
                                      });
                                      setEditingAddress([false, 0]);
                                      setWatchAddress(
                                        (watchAddress) => !watchAddress
                                      );
                                    }
                                  });
                                }
                              }
                            }}
                          >
                            {editingAddress[0] &&
                            editingAddress[1] === address.id
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
                                !editingAddress[0] ||
                                editingAddress[1] !== address.id
                              ) {
                                deleteAddress(address.id).then((result) => {
                                  if (result.status === 201) {
                                    dispatch(addressReload());
                                    toast({
                                      title: "Успех",
                                      description: "Вы успешно удалили адрес!",
                                      status: "success",
                                      duration: 3000,
                                      isClosable: true,
                                    });
                                    setWatchAddress(
                                      (watchAddress) => !watchAddress
                                    );
                                  }
                                });
                              } else if (
                                editingAddress[0] &&
                                editingAddress[1] === address.id
                              ) {
                                setEditingAddress(false);
                                setCity(address.city);
                                setStreet(address.street);
                                setHouseNumber(address.house_number);
                                setHousingNumber(address.housing_number);
                                setApartmentNumber(address.apartment_number);
                                setIntercomCode(address.intercom_code);
                              }
                            }}
                          >
                            {editingAddress[0] &&
                            editingAddress[1] === address.id
                              ? "Отмена"
                              : "Удалить"}
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                  <Tr>
                    <Td>
                      {insertingAddress && (
                        <FormControl mb={2}>
                          <InputGroup>
                            <Input
                              type="text"
                              placeholder="Город"
                              value={city}
                              onChange={(e) => setCity(e.target.value)}
                              required
                            />
                          </InputGroup>
                        </FormControl>
                      )}
                    </Td>
                    <Td>
                      {insertingAddress && (
                        <FormControl mb={2}>
                          <InputGroup>
                            <Input
                              type="text"
                              placeholder="Улица"
                              value={street}
                              onChange={(e) => setStreet(e.target.value)}
                              required
                            />
                          </InputGroup>
                        </FormControl>
                      )}
                    </Td>
                    <Td>
                      {insertingAddress && (
                        <FormControl mb={2}>
                          <InputGroup>
                            <Input
                              type="text"
                              placeholder="Дом"
                              value={houseNumber}
                              onChange={(e) => setHouseNumber(e.target.value)}
                              required
                            />
                          </InputGroup>
                        </FormControl>
                      )}
                    </Td>
                    <Td>
                      {insertingAddress && (
                        <FormControl mb={2}>
                          <InputGroup>
                            <Input
                              type="text"
                              placeholder="Подъезд"
                              value={housingNumber}
                              onChange={(e) => setHousingNumber(e.target.value)}
                              required
                            />
                          </InputGroup>
                        </FormControl>
                      )}
                    </Td>
                    <Td>
                      {insertingAddress && (
                        <FormControl mb={2}>
                          <InputGroup>
                            <Input
                              type="text"
                              placeholder="Квартира"
                              value={apartmentNumber}
                              onChange={(e) =>
                                setApartmentNumber(e.target.value)
                              }
                              required
                            />
                          </InputGroup>
                        </FormControl>
                      )}
                    </Td>
                    <Td>
                      {insertingAddress && (
                        <FormControl mb={2}>
                          <InputGroup>
                            <Input
                              type="text"
                              placeholder="Код домофона"
                              value={intercomCode}
                              onChange={(e) => setIntercomCode(e.target.value)}
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
                          if (!insertingAddress) {
                            setInsertingAddress(true);
                          } else {
                            createAddress(
                              userID.payload,
                              city,
                              street,
                              houseNumber,
                              housingNumber,
                              apartmentNumber,
                              intercomCode
                            ).then((result) => {
                              if (result.status === 201) {
                                dispatch(addressReload());
                                toast({
                                  title: "Успех",
                                  description: "Вы успешно добавили адрес!",
                                  status: "success",
                                  duration: 3000,
                                  isClosable: true,
                                });
                                setInsertingAddress(false);
                                setWatchAddress(
                                  (watchAddress) => !watchAddress
                                );
                                setCity("");
                                setStreet("");
                                setHouseNumber("");
                                setHousingNumber("");
                                setApartmentNumber("");
                                setIntercomCode("");
                              }
                            });
                          }
                        }}
                      >
                        Добавить
                      </Button>
                    </Td>
                    <Td>
                      {insertingAddress && (
                        <Button
                          leftIcon={<CloseIcon />}
                          colorScheme="red"
                          variant="solid"
                          onClick={() => {
                            setInsertingAddress(false);
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
