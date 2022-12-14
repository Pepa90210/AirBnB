import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import customLogo from './images/pink-logo.jpg';
import MainNavMenu from './MainNavMenu';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <div id='greeting-message'>{`Hello, ${sessionUser.firstName} ${sessionUser.lastName}`}</div>
        <div id='become-a-host-and-dropdown-div'>
          <NavLink id='become-a-host-navlink'exact to='/spots/current'><div id='become-a-host'>Switch to hosting</div></NavLink>
          <ProfileButton user={sessionUser} />
        </div>
      </>
    );
  } else {
    sessionLinks = (
      <>
        <div id='become-a-host-and-dropdown-div'>
          <NavLink id='become-a-host-navlink'exact to='/spots/current'><div id='become-a-host'>Become a Host</div></NavLink>
          <MainNavMenu setShowLoginModal={setShowLoginModal} setShowSignupModal={setShowSignupModal}/>
        </div>
      </>
    );
  }

  return (
    <header>
      <nav>
        <NavLink exact to="/">
          <img id="logo" src={customLogo} alt="airbnb-logo" />
        </NavLink>
        {isLoaded && sessionLinks}
        {showLoginModal && <LoginFormModal setShowLoginModal={setShowLoginModal} />}
        {showSignupModal && <SignupFormModal setShowSignupModal={setShowSignupModal} />}
      </nav>
    </header>
  );
}

export default Navigation;
