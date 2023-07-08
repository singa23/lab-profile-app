import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5005';

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [campus, setCampus] = useState('');
  const [course, setCourse] = useState('');

  const handleInputUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleInputPassword = (e) => {
    setPassword(e.target.value);
  };
  const handleInputCampus = (e) => {
    setCampus(e.target.value);
  };
  const handleInputCourse = (e) => {
    setCourse(e.target.value);
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = { username, password, campus, course };
    axios
      .post(`${API_URL}/auth/signup`, body)
      .then((response) => {
        // console.log('ouiiiii');

        navigate('/login');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="signupPage">
      <form onSubmit={handleSubmit}>
        <div className="champ">
          <h1>Sign Up</h1>
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

          <label>
            Campus
            <input
              type="text"
              name="campus"
              value={campus}
              onChange={handleInputCampus}
            />
          </label>

          <label>
            Course
            <input
              type="text"
              name="course"
              value={course}
              onChange={handleInputCourse}
            />
          </label>
        </div>

        <div className="createPart">
          <h2>Hello!!</h2>
          <p>Welcome to IronProfile</p>

          <p>
            If you signup you agree with all our terms and conditions where we
            can do whatever we want with the date!
          </p>
          <button type="submit">Create the Account</button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
