import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  login,
  userID,
  userFirstName,
  userLastName,
  userMiddleName,
  userPhoneNumber,
  userEmail,
  selectAuth,
} from "../services/authSlice";
import { refreshUser, getUser } from "../api/userAPI";

function useAuth(privateRoute = false, watchingState = null) {
  const dispatch = useDispatch();
  const authState = useSelector(selectAuth);
  let navigate = useNavigate();

  useEffect(() => {
    refreshUser()
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          dispatch(login());
          return res.json();
        } else if (privateRoute) {
          navigate("/");
          return false;
        }
      })
      .then((data) => {
        if (data) {
          console.log(data);
          dispatch(userID(data.userID));
          getUser(data.userID)
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              console.log(data);
              dispatch(userFirstName(data[0].first_name));
              dispatch(userLastName(data[0].last_name));
              dispatch(userMiddleName(data[0].middle_name));
              dispatch(userPhoneNumber(data[0].phone_number));
              dispatch(userEmail(data[0].email));
            });
        }
      });
  }, [authState, watchingState]);
}

export default useAuth;
