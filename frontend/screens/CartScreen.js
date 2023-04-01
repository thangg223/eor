import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart, updateCartItemQuantity } from '../actions/cartActions';

const CartScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id, quantity) => {
    dispatch(updateCartItemQuantity(id, quantity));
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="cart-screen">
      <h2>Giỏ hàng</h2>
      {cartItems.length === 0 ? (
        <div>
          Giỏ hàng trống. <Link to="/">Quay lại cửa hàng</Link>
        </div>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.product} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <Link to={`/product/${item.product}`}>{item.name}</Link>
                <div>{item.price} VND</div>
                <select
                  value={item.qty}
                  onChange={(e) => handleQuantityChange(item.product, Number(e.target.value))}
                >
                  {[...Array(item.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
                <button onClick={() => handleRemoveFromCart(item.product)}>Xóa khỏi giỏ hàng</button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="cart-summary">
        <h3>
          Tổng cộng ({cartItems.reduce((acc, item) => acc + item.qty, 0)} sản phẩm): {totalPrice} VND
        </h3>
        <button disabled={cartItems.length === 0} onClick={() => alert('Thanh toán')}>
          Thanh toán
        </button>
      </div>
    </div>
  );
};

export default CartScreen;
