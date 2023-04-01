import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listProductDetails, createReview } from '../actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';

const ReviewScreen = (props) => {
  const productId = props.match.params.id;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productCreateReview = useSelector((state) => state.productCreateReview);
  const { success: successReview, error: errorReview } = productCreateReview;

  useEffect(() => {
    if (successReview) {
      alert('Đánh giá đã được gửi');
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(productId));
  }, [dispatch, productId, successReview]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createReview(productId, { rating, comment }));
  };

  return (
    <div>
      <Link to="/" className="back-to-home">Quay lại</Link>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div>
          <h2>{product.name}</h2>
          <div>{product.rating} sao trên tổng số {product.numReviews} đánh giá</div>
          <ul>
            {product.reviews.map((review) => (
              <li key={review._id}>
                <strong>{review.name}</strong>
                <div>{review.rating} sao</div>
                <div>{review.comment}</div>
              </li>
            ))}
            <li>
              {userInfo ? (
                <form onSubmit={submitHandler}>
                  <div>
                    <label htmlFor="rating">Đánh giá</label>
                    <select
                      id="rating"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option value="">Chọn...</option>
                      <option value="1">1 - Tệ</option>
                      <option value="2">2 - Chưa tốt</option>
                      <option value="3">3 - Bình thường</option>
                      <option value="4">4 - Tốt</option>
                      <option value="5">5 - Rất tốt</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="comment">Bình luận</label>
                    <textarea
                      id="comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                  </div>
                  <div>
                    <button type="submit">Gửi đánh giá</button>
                  </div>
                  {errorReview && <div>{errorReview}</div>}
                </form>
              ) : (
                <div>
                  Vui lòng <Link to="/signin">đăng nhập</Link> để viết đánh giá </div>
              )}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ReviewScreen;
