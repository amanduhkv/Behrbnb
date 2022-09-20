import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';

import { createSpot } from '../../store/spots';
import './CreateSpotForm.css';

const CreateSpotForm = () => {
  const dispatch = useDispatch();
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const history = useHistory();

  // useEffect(() => {
  //   dispatch(createSpot())
  // }, [dispatch]);

  const handleSubmit = async e => {
    e.preventDefault();

    const payload = {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price
    };

    let createdSpot = await dispatch(createSpot(payload));
    // console.log('this is the spot', createdSpot)
    if (createdSpot) {
      history.push(`/spots/${createdSpot.id}`)
    }
  }

  return (
    <div className='form-for-spot'>
      <form className='create-spot-form' onSubmit={handleSubmit}>
        <h2>Create a New Spot</h2>
        <input
          id='spot-input'
          type='text'
          placeholder='address'
          value={address}
          onChange={e => setAddress(e.target.value)}
          required
        />
        <input
          id='spot-input'
          type='text'
          placeholder='city'
          value={city}
          onChange={e => setCity(e.target.value)}
          required
        />
        <input
          id='spot-input'
          type='state'
          placeholder='state'
          value={state}
          onChange={e => setState(e.target.value)}
          required
        />
        <input
          id='spot-input'
          type='country'
          placeholder='country'
          value={country}
          onChange={e => setCountry(e.target.value)}
          required
        />
        <input
          id='spot-input'
          type='number'
          placeholder='latitude'
          value={lat}
          onChange={e => setLat(e.target.value)}
          required
        />
        <input
          id='spot-input'
          type='number'
          placeholder='longitude'
          value={lng}
          onChange={e => setLng(e.target.value)}
          required
        />
        <input
          id='spot-input'
          type='name'
          placeholder='name'
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <textarea
          id='spot-input'
          placeholder='description'
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />
        <input
          id='spot-input'
          placeholder='$'
          type='number'
          min="0"
          value={price}
          onChange={e => setPrice(e.target.value)}
          required
        />
        <button id='host-button' type='submit'>Host the Spot</button>
        <NavLink id='cancel-link' to='/'>Cancel</NavLink>
      </form>
    </div>
  )
}

export default CreateSpotForm;
