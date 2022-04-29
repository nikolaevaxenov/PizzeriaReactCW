import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../services/authSlice";
import { Button, useToast } from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";
import { logoutUser } from "../../api/userAPI";

function LogoutButton() {
  const toast = useToast();
  const dispatch = useDispatch();

  return (
    <Button
      bgGradient="linear(to right, #f12711, #f5af19)"
      _hover={{
        bgGradient: "linear(to right, #659999, #f4791f)",
      }}
      leftIcon={<FiLogOut />}
      onClick={() => {
        logoutUser().then((res) => {
          console.log(res);
          dispatch(logout());
          toast({
            title: "Выход",
            description: "Вы вышли из аккаунта!",
            status: "warning",
            duration: 3000,
            isClosable: true,
          });
        });
      }}
    >
      Выйти
    </Button>
  );
}

export default LogoutButton;
