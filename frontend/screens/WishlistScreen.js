import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromWishlist } from '../actions/cartActions';

const WishlistScreen = ({ match, location, history }) => {
  const productId = match.params.id;
  const dispatch = useDispatch();
  const wishlist = useSelector(state => state.wishlist);
  const { wishlistItems } = wishlist;

  const removeFromWishlistHandler = (id) => {
    dispatch(removeFromWishlist(id));
  };

  const addToCartHandler = (id) => {
    dispatch(addToCart(id, 1));
    dispatch(removeFromWishlist(id));
  };

  return (
    <div className="wishlist-screen">
      <div className="wishlist-header">
        <h1>Danh sách yêu thích</h1>
      </div>
      {wishlistItems.length === 0 ? (
        <div className="wishlist-message">Danh sách yêu thích của bạn trống</div>
      ) : (
        <div className="wishlist-items">
          {wishlistItems.map((item) => (
            <div key={item.product} className="wishlist-item">
              <div className="wishlist-item-image">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="wishlist-item-details">
                <Link to={`/product/${item.product}`}>{item.name}</Link>
                <div className="wishlist-item-price">${item.price}</div>
                <button
                  type="button"
                  className="button primary wishlist-item-button"
                  onClick={() => addToCartHandler(item.product)}
                >
                  Thêm vào giỏ hàng
                </button>
                <button
                  type="button"
                  className="button secondary wishlist-item-button"
                  onClick={() => removeFromWishlistHandler(item.product)}
                >
                  Xóa khỏi danh sách yêu thích
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistScreen;
