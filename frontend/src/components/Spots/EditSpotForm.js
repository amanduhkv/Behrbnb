import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import { getASpot, updateSpot } from '../../store/spots';

const EditSpotForm = () => {
  const {spotId} = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const spot = useSelector(state => state.spots.singleSpot)


  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const updateAddress = e => setAddress(e.target.value)
  const updateCity = e => setCity(e.target.value)
  const updateState = e => setState(e.target.value)
  const updateCountry = e => setCountry(e.target.value)
  const updateLat= e => setLat(e.target.value)
  const updateLng= e => setLng(e.target.value)
  const updateName= e => setName(e.target.value)
  const updateDescription= e => setDescription(e.target.value)
  const updatePrice= e => setPrice(e.target.value)

  useEffect(() => {
    dispatch(getASpot(spotId));
  }, [dispatch]);

  const handleSubmit = async e => {
    e.preventDefault();

    const newSpot = {
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

    let updatedSpot = await dispatch(updateSpot(newSpot, spot.id));
    if(updatedSpot) {
      history.push(`/spots/${spot.id}`)
    }
    reset();
  };

  const reset = () => {
    setAddress('');
    setCity('');
    setState('');
    setCountry('');
    setLat('');
    setLng('');
    setName('');
    setDescription('');
    setPrice('');
  };

  return (
    <div className='form-for-spot'>
      <form className='update-spot-form' onSubmit={handleSubmit}>
        <h2>Update a Spot</h2>
        <input
          id='spot-input'
          type='text'
          placeholder='address'
          value={address}
          onChange={updateAddress}
          required
        />
        <input
          id='spot-input'
          type='text'
          placeholder='city'
          value={city}
          onChange={updateCity}
          required
        />
        <input
          id='spot-input'
          type='state'
          placeholder='state'
          value={state}
          onChange={updateState}
          required
        />
        <input
          id='spot-input'
          type='country'
          placeholder='country'
          value={country}
          onChange={updateCountry}
          required
        />
        <input
          id='spot-input'
          type='number'
          placeholder='latitude'
          value={lat}
          onChange={updateLat}
          required
        />
        <input
          id='spot-input'
          type='number'
          placeholder='longitude'
          value={lng}
          onChange={updateLng}
          required
        />
        <input
          id='spot-input'
          type='name'
          placeholder='name'
          value={name}
          onChange={updateName}
          required
        />
        <textarea
          id='spot-input'
          placeholder='description'
          value={description}
          onChange={updateDescription}
          required
        />
        <input
          id='spot-input'
          placeholder='$'
          type='number'
          min="0"
          value={price}
          onChange={updatePrice}
          required
        />
        <button id='host-button' type='submit'>Update</button>
        <NavLink id='cancel-link' to='/'>Cancel</NavLink>
      </form>
    </div>
  )

};

export default EditSpotForm;
