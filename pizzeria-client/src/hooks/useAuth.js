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
  orderCartID,
  orderCartQuantity,
  selectAuth,
  selectUserID,
  selectOrderCartID,
} from "../services/authSlice";
import { refreshUser, getUser } from "../api/userAPI";
import { getCartOrder } from "../api/orderAPI";

function useAuth(privateRoute = false, watchingState = null) {
  const dispatch = useDispatch();
  const authState = useSelector(selectAuth);
  const userIDSelector = useSelector(selectUserID);
  const orderCartIDSelector = useSelector(selectOrderCartID);

  let navigate = useNavigate();

  useEffect(() => {
    refreshUser()
      .then((res) => {
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
          dispatch(userID(data.userID));
          getUser(data.userID)
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              dispatch(userFirstName(data[0].first_name));
              dispatch(userLastName(data[0].last_name));
              dispatch(userMiddleName(data[0].middle_name));
              dispatch(userPhoneNumber(data[0].phone_number));
              dispatch(userEmail(data[0].email));
            });
        }
      });
  }, [authState, watchingState]);

  useEffect(() => {
    if (userIDSelector.payload !== undefined) {
      getCartOrder(userIDSelector.payload)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          dispatch(orderCartID(data.id));
        });
    }
  }, [userIDSelector]);
}

export default useAuth;
