import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsProduct } from '../actions/productActions';

const ProductScreen = (props) => {
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsProduct(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  const handleAddToCart = () => {
    props.history.push(`/cart/${props.match.params.id}?qty=${qty}`);
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="product-details">
          <div className="product-details-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="product-details-info">
            <ul>
              <li>
                <h1>{product.name}</h1>
              </li>
              <li>Giá: ${product.price}</li>
              <li>
                Mô tả:
                <div>{product.description}</div>
              </li>
            </ul>
          </div>
          <div className="product-details-action">
            <ul>
              <li>
                Giá: <strong>${product.price}</strong>
              </li>
              <li>
                Tình trạng: {product.countInStock > 0 ? 'Còn hàng' : 'Hết hàng'}
              </li>
              <li>
                Số lượng:
                <select value={qty} onChange={(e) => setQty(e.target.value)}>
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </li>
              <li>
                {product.countInStock > 0 && (
                  <button onClick={handleAddToCart} className="primary">
                    Thêm vào giỏ hàng
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
      <div className="back-to-result">
        <Link to="/">Quay lại kết quả</Link>
      </div>
    </div>
  );
};

export default ProductScreen;
