import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';

const RegisterScreen = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, userInfo, error } = userRegister;

  const dispatch = useDispatch();

  const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [userInfo, props.history, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Mật khẩu không khớp');
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <div className="form">
      <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li>
            <h2>Đăng ký</h2>
          </li>
          {message && <div>{message}</div>}
          {error && <div>{error}</div>}
          {loading && <div>Loading...</div>}
          <li>
            <label htmlFor="name">Họ và tên</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="password">Mật khẩu</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </li>
          <li>
            <button type="submit" className="primary">Đăng ký</button>
          </li>
          <li>
            Đã có tài khoản?{' '}
            <Link to={`/signin?redirect=${redirect}`} className="text-link">
              Đăng nhập
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default RegisterScreen;
