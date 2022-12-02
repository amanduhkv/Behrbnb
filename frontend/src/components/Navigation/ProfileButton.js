import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import '../Navigation/ProfileButton.css';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/');
  };

  return (
    <>
      <button className='profile-button' onClick={openMenu}>
        <i id='burger' className="fa-sharp fa-solid fa-bars"></i>
        <img className='bear' src='https://drive.google.com/uc?export=view&id=1VREYIKcLE9WLjacwaosrzf9PyoRzlw2t' alt='bear' />
      </button>
      {showMenu && (
        <div className="profile-dropdown">
          <h3 id='greeting'>Hello, {user.firstName}!</h3>
          <div id='user-creds'>{user.username}</div>
          <div id='user-creds'>{user.email}</div>

          <div className="menu-spots">
            <NavLink id='my-spots' to='/spots/current'>Manage listings</NavLink>
          </div>
          <div className="menu-spots">
            <NavLink id='my-spots' to='/reviews/current'>Manage reviews</NavLink>
          </div>
          <div className="menu-spots">
            <NavLink id='my-spots' to='/bookings/current'>Trips</NavLink>
          </div>
          <div id='logout-div'>
            <button id='logout-button' onClick={logout}>Log Out</button>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileButton;
