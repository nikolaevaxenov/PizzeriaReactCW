import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { FaUserAlt } from "react-icons/fa";
import { selectUserFirstName } from "../../services/authSlice";

function ProfileButton() {
  let navigate = useNavigate();
  const userFirstName = useSelector(selectUserFirstName);

  return (
    <React.Fragment>
      <Button
        bgGradient="linear(to right, #f12711, #f5af19)"
        _hover={{
          bgGradient: "linear(to right, #659999, #f4791f)",
        }}
        leftIcon={<FaUserAlt />}
        onClick={() => navigate("/profile")}
      >
        {userFirstName.payload !== undefined && userFirstName.payload}
      </Button>
    </React.Fragment>
  );
}

export default ProfileButton;
