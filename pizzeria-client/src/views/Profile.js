import {
  SimpleGrid,
  Box,
  Button,
  Heading,
  Center,
  VStack,
  HStack,
  Divider,
} from "@chakra-ui/react";
import { MdModeEdit } from "react-icons/md";
import Navbar from "../components/Navbar/Navbar";
import PersonalInfoForm from "../components/Profile/PersonalInfoForm";
import PasswordForm from "../components/Profile/PasswordForm";
import AddressModal from "../components/Profile/AddressModal";
import CardDetailsModal from "../components/Profile/CardDetailsModal";

function Profile() {
  return (
    <>
      <Navbar />
      <SimpleGrid columns={2} spacing={10}>
        <Box>
          <Center>
            <Heading>Личные данные</Heading>
          </Center>
          <VStack m={2} spacing={2}>
            <PersonalInfoForm />
            <Divider />
            <PasswordForm />
          </VStack>
          <HStack spacing={2}>
            <AddressModal />
            <CardDetailsModal />
          </HStack>
        </Box>
        <Box>
          <Center>
            <Heading>История заказов</Heading>
          </Center>
        </Box>
      </SimpleGrid>
    </>
  );
}

export default Profile;
