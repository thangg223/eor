import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ fullName, address, city, postalCode, country }));
    history.push('/payment');
  };

  return (
    <div>
      <CheckoutSteps step1 step2 />
      <form onSubmit={submitHandler}>
        <div>
          <h1>Thông tin giao hàng</h1>
        </div>
        <div>
          <label htmlFor="fullName">Họ và tên đầy đủ</label>
          <input
            type="text"
            id="fullName"
            placeholder="Nhập họ và tên đầy đủ"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="address">Địa chỉ</label>
          <input
            type="text"
            id="address"
            placeholder="Nhập địa chỉ"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="city">Thành phố</label>
          <input
            type="text"
            id="city"
            placeholder="Nhập thành phố"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="postalCode">Mã bưu chính</label>
          <input
            type="text"
            id="postalCode"
            placeholder="Nhập mã bưu chính"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="country">Quốc gia</label>
          <input
            type="text"
            id="country"
            placeholder="Nhập quốc gia"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <button className="primary" type="submit">
            Tiếp tục
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShippingScreen;
