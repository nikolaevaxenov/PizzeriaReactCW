import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import {
  selectOrderCartID,
  selectOrderCartQuantityReload,
} from "../../services/authSlice";
import { getCartOrderQuantity, getCartOrderPrice } from "../../api/orderAPI";

function CartButton() {
  const orderCartID = useSelector(selectOrderCartID);
  const orderCartQuantityReload = useSelector(selectOrderCartQuantityReload);

  const [cartQuantity, setCartQuantity] = useState(0);
  const [cartPrice, setCartPrice] = useState(0);
  let navigate = useNavigate();

  useEffect(() => {
    getCartOrderQuantity(orderCartID.payload)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCartQuantity(data);
      });

    getCartOrderPrice(orderCartID.payload)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCartPrice(data);
      });
  }, [orderCartID, orderCartQuantityReload]);

  return (
    <React.Fragment>
      <Button
        bgGradient="linear(to right, #f12711, #f5af19)"
        _hover={{
          bgGradient: "linear(to right, #659999, #f4791f)",
        }}
        onClick={() => navigate("/cart")}
        leftIcon={<AiOutlineShoppingCart />}
      >
        {cartQuantity !== null && `${cartQuantity} | ${cartPrice} ₽`}
      </Button>
    </React.Fragment>
  );
}

export default CartButton;
