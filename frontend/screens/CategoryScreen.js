import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { listProducts } from '../actions/productActions';

const CategoryScreen = (props) => {
  const category = props.match.params.category;
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts(category));
  }, [dispatch, category]);

  return (
    <div className="category-screen">
      <h2>{category}</h2>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="products">
          {products.map((product) => (
            <div key={product._id} className="product">
              <Link to={`/product/${product._id}`}>
                <img src={product.image} alt={product.name} />
                <div className="product-name">{product.name}</div>
              </Link>
              <div className="product-price">{product.price} VND</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryScreen;
