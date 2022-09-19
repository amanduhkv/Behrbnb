import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { createSpot } from '../../store/spots';

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
  const [price, setPrice] = useState(0);

  const history = useHistory();

  useEffect(() => {
    dispatch(createSpot())
  }, [dispatch]);

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

    if(createdSpot) {
      history.push(`/spots/${createdSpot.id}`)
    }
  }

  return (
    <form className='create-spot-form' onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='address'
        value={address}
        onChange={e => setAddress(e.target.value)}
        required
      />
      <input
        type='text'
        placeholder='city'
        value={city}
        onChange={e => setCity(e.target.value)}
        required
      />
      <input
        type='state'
        placeholder='state'
        value={state}
        onChange={e => setState(e.target.value)}
        required
      />
      <input
        type='country'
        placeholder='country'
        value={country}
        onChange={e => setCountry(e.target.value)}
        required
      />
      <input
        type='number'
        placeholder='latitude'
        value={lat}
        onChange={e => setLat(e.target.value)}
        required
      />
      <input
        type='number'
        placeholder='longitude'
        value={lng}
        onChange={e => setLng(e.target.value)}
        required
      />
      <input
        type='name'
        placeholder='name'
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <textarea
        placeholder='description'
        value={description}
        onChange={e => setDescription(e.target.value)}
        required
      />
      <input
        type='number'
        min='0'
        placeholder='price'
        value={price}
        onChange={e => setPrice(e.target.value)}
        required
      />
      <button type='submit'>Host a new Spot</button>
    </form>
  )
}

export default CreateSpotForm;
