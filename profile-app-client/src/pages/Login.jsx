import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5005';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleInputUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleInputPassword = (e) => {
    setPassword(e.target.value);
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = { username, password };
    axios
      .post(`${API_URL}/auth/login`, body)
      .then((response) => {
        navigate('/');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="loginPage">
      <form onSubmit={handleSubmit}>
        <div className="champ">
          <h1>Log in</h1>
          <label>
            Username
            <input
              type="text"
              name="username"
              value={username}
              onChange={handleInputUsername}
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleInputPassword}
            />
          </label>

          <p>
            If you don't have an account yet, you can create your account{' '}
            <Link to="/signup">here</Link>
          </p>
        </div>

        <div className="loginPart">
          <h2>Hello!!</h2>
          <p>Awesome to have at IronProfile again !</p>

          <p>
            If you signup you agree with all our terms and conditions where we
            can do whatever we want with the date!
          </p>

          <button type="submit">Log in</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
