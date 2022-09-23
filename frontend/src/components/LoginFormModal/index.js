import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupFormPage from '../SignupFormPage';

import LoginForm from './LoginForm';

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='modal' onClick={() => setShowModal(true)}>
        <i id='burger' className="fa-sharp fa-solid fa-bars"></i>
        <img className='bear' src='https://drive.google.com/uc?export=view&id=1VREYIKcLE9WLjacwaosrzf9PyoRzlw2t' alt='bear' />
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
          <SignupFormPage />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
