import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './LoginForm.css'

function LoginForm({ onClose }) {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [showModal, setShowModal] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.message) setErrors(["Incorrect username/email or password"]);
      }
    );
  };

  return (
    <div id='here'>
      <div id="login-title">
        {/* <img id='x-button' src={x} alt='x' onClick={() => setShowModal(false)} /> */}
        <span className='modal-title'>Log in or sign up</span>
      </div>
      {showModal && (
        <form id='login-form' onSubmit={handleSubmit}>
          <div className='modal-cred'>Welcome to Behrbnb</div>

          <input
            id='cred1'
            type="text"
            placeholder="Username or Email"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
          <input
            id='cred2'
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div id='cred-error'>
            {errors.map((error, idx) => (
              <div key={idx}>{error}</div>
            ))}
          </div>

          <button id='modal-button' type="submit">Log In</button>

          <button
            id='modal-button'
            type='submit'
            onClick={() => {
              setCredential('honeylover123')
              setPassword('password')
            }}
          >
            Demo Login
          </button>
          <span className='or'>or</span>
          {/* <div>
        {`Not an existing user? `}
        <NavLink to='/signup'>Sign up</NavLink>
      </div> */}
        </form>
      )}

    </div>
  );
}

export default LoginForm;
