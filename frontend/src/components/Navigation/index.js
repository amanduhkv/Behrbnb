import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import '../Navigation/ProfileButton.css'

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal></LoginFormModal>
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <div className='nav-bar'>
      <div>
        <NavLink
          exact to="/"
        >
          <img className='logo' src='https://media.discordapp.net/attachments/992922379682599084/1020896309265309736/behr.png?width=1069&height=223' alt='logo' />
        </NavLink>
      </div>
      <div className='upper-right'>
        {isLoaded && sessionLinks}
      </div>
    </div>
  );
}

export default Navigation;
