import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AddressBook from './AddressBook';
import { fetchAddresses, addAddress } from '../actions/addressActions';

const AddressScreen = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [zip, setZip] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();

  const addressList = useSelector((state) => state.addressList);
  const { addresses } = addressList;

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAddress = {
      name,
      phoneNumber,
      street,
      city,
      state,
      country,
      zip,
    };
    dispatch(addAddress(newAddress));
    history.push('/address');
  };

  return (
    <div className="address-screen">
      <AddressBook addresses={addresses} />
      <form className="address-form" onSubmit={handleSubmit}>
        <h3>Thêm địa chỉ mới</h3>
        <input
          type="text"
          placeholder="Họ và tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Số điện thoại"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <input
          type="text"
          placeholder="Địa chỉ"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
        <input
          type="text"
          placeholder="Thành phố"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tiểu bang / Tỉnh"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <input
          type="text"
          placeholder="Quốc gia"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <input
          type="text"
          placeholder="Mã bưu chính"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
        />
        <button type="submit">Thêm địa chỉ</button>
      </form>
    </div>
  );
};

export default AddressScreen;
