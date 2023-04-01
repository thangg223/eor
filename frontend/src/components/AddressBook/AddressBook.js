import React from 'react';

const AddressBook = ({ addresses }) => {
  return (
    <div className="address-book">
      <h3>Địa chỉ giao hàng</h3>
      {addresses.map((address, index) => (
        <div key={index} className="address-item">
          <p>
            {address.name} - {address.phoneNumber}
          </p>
          <p>
            {address.street}, {address.city}, {address.state}, {address.country}, {address.zip}
          </p>
        </div>
      ))}
    </div>
  );
};

export default AddressBook;
