import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteProduct, listProducts } from '../actions/productActions';

const ProductListScreen = (props) => {
  const productList = useSelector((state) => state.productList);
  const { products } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const { success: successDelete } = productDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch, successDelete]);

  const deleteHandler = (product) => {
    if (window.confirm('Bạn có chắc chắn muốn xoá sản phẩm này?')) {
      dispatch(deleteProduct(product._id));
    }
  };

  return (
    <div>
      <h1>Sản phẩm</h1>
      <button type="button" className="primary">
        <Link to="/create-product">Tạo sản phẩm mới</Link>
      </button>
      <div className="product-list">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên</th>
              <th>Giá</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>
                  <button type="button">
                    <Link to={`/product/${product._id}`}>Chi tiết</Link>
                  </button>
                  <button type="button" onClick={() => deleteHandler(product)}>
                    Xoá
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductListScreen;
