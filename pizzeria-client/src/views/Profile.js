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
      <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} spacing={10}>
        <Box mx={5}>
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
        </Box>
      </SimpleGrid>
    </>
  );
}

export default Profile;
