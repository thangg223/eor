import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import CheckoutSteps from '../components/CheckoutSteps';

const PlaceOrderScreen = (props) => {
  const cart = useSelector((state) => state.cart);
  const orderCreate = useSelector((state) => state.orderCreate);
  const { success, order } = orderCreate;

  const dispatch = useDispatch();

  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };

  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
    }
  }, [success, props.history, order]);

  // Xử lý các phần tử liên quan đến giỏ hàng, phí vận chuyển, thuế, tổng cộng ở đây

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      {/* Thêm các thành phần hiển thị thông tin đơn hàng, giao hàng, phương thức thanh toán ở đây */}
      <div>
        <button
          type="button"
          onClick={placeOrderHandler}
          className="primary block"
          disabled={cart.cartItems.length === 0}
        >
          Đặt đơn hàng
        </button>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
