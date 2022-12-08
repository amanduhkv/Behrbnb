import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';

import { createSpot } from '../../store/spots';
import brokenImg from '../../assets/no-image.svg';
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
  const [image, setImage] = useState([]);
  const [img1, setImg1] = useState('');
  const [img2, setImg2] = useState('');
  const [img3, setImg3] = useState('');
  const [img4, setImg4] = useState('');
  const [img5, setImg5] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmit, setHasSubmit] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const errors = [];
    if (!address.length) errors.push("Please enter an address");
    if (!city.length) errors.push("Please enter a city");
    if (!state.length) errors.push("Please enter a state");
    if (!country.length) errors.push("Please enter a country");
    if (!lat) errors.push("Please enter a valid latitude");
    if (!lng) errors.push("Please enter a valid longitude");
    if (!name || name.length > 50) errors.push("Please enter a valid name for the new spot");
    if (!description) errors.push('Please enter a description for the new spot');
    if (!price) errors.push("Please enter a price");
    if (!image) errors.push("Please provide a valid image url for the spot");

    let imgArr = []
    if (img1.length) {
      if(!img1.endsWith('.jpg') && !img1.endsWith('jpeg') && !img1.endsWith('.png')) {
        errors.push("Please provide a valid image url for the spot (.jpg, .jpeg, or .png)")
      } else {
        imgArr.push(img1)
      }
    }
    if (img2.length) {
      if(!img2.endsWith('.jpg') && !img2.endsWith('jpeg') && !img2.endsWith('.png')) {
        errors.push("Please provide a valid image url for the spot (.jpg, .jpeg, or .png)")
      } else {
      imgArr.push(img2)
      }
    }
    if (img3.length) {
      if(!img3.endsWith('.jpg') && !img3.endsWith('jpeg') && !img3.endsWith('.png')) {
        errors.push("Please provide a valid image url for the spot (.jpg, .jpeg, or .png)")
      } else {
      imgArr.push(img3)
      }
    }
    if (img4.length) {
      if(!img4.endsWith('.jpg') && !img4.endsWith('jpeg') && !img4.endsWith('.png')) {
        errors.push("Please provide a valid image url for the spot (.jpg, .jpeg, or .png)")
      } else {
      imgArr.push(img4)
      }
    }
    if (img5.length) {
      if(!img5.endsWith('.jpg') && !img5.endsWith('jpeg') && !img5.endsWith('.png')) {
        errors.push("Please provide a valid image url for the spot (.jpg, .jpeg, or .png)")
      } else {
      imgArr.push(img5)
      }
    }
    if (imgArr.length) setImage(imgArr);
    setValidationErrors(errors);
  }, [address, city, state, country, lat, lng, name, description, price, img1, img2, img3, img4, img5]);



  const handleSubmit = async e => {
    e.preventDefault();

    setHasSubmit(true);

    // if (validationErrors.length) {
    //   setAddress('');
    //   setCity('');
    //   setState('');
    //   setCountry('');
    //   setLat('');
    //   setLng('');
    //   setName('');
    //   setDescription('');
    //   setPrice('')
    //   setImage('');
    // }
    // console.log('THESE ARE THE SPOT IMAGES', image)

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
    if (!validationErrors.length) {
      let createdSpot = await dispatch(createSpot(payload, image));
      // console.log('this is the spot', createdSpot)
      if (createdSpot) {
        history.push(`/spots/${createdSpot.id}`)
      }
    }
  }

  return (
    <div className='form-for-spot'>
      <form className='create-spot-form' onSubmit={handleSubmit}>
        <h2>Create a New Spot</h2>
        <div className='create-content'>
          <input
            id='spot-input1'
            type='text'
            placeholder='address'
            maxLength='255'
            value={address}
            onChange={e => setAddress(e.target.value)}
          // required
          />
          <input
            id='spot-input'
            type='text'
            placeholder='city'
            maxLength='255'
            value={city}
            onChange={e => setCity(e.target.value)}
          // required
          />
          <input
            id='spot-input'
            type='state'
            placeholder='state'
            maxLength='255'
            value={state}
            onChange={e => setState(e.target.value)}
          // required
          />
          <input
            id='spot-input'
            type='country'
            placeholder='country'
            maxLength='255'
            value={country}
            onChange={e => setCountry(e.target.value)}
          // required
          />
          <input
            id='spot-input'
            type='number'
            placeholder='latitude'
            min='-90'
            max='90'
            value={lat}
            onChange={e => setLat(e.target.value)}
          // required
          />
          <input
            id='spot-input'
            type='number'
            placeholder='longitude'
            min='-180'
            max='180'
            value={lng}
            onChange={e => setLng(e.target.value)}
          // required
          />
          <input
            id='spot-input'
            type='name'
            placeholder='name'
            maxLength='50'
            value={name}
            onChange={e => setName(e.target.value)}
          // required
          />
          <textarea
            id='spot-input-textarea'
            placeholder='description'
            maxLength='255'
            value={description}
            onChange={e => setDescription(e.target.value)}
          // required
          />
          <input
            id='spot-input2'
            placeholder='$'
            type='number'
            min="0"
            value={price}
            onChange={e => setPrice(e.target.value)}
          // required
          />
          <input
            id='spot-input-url'
            placeholder='url'
            type='text'
            maxLength='255'
            value={img1}
            onChange={e => setImg1(e.target.value)}
          />
          <input
            id='spot-input-url'
            placeholder='url'
            type='text'
            maxLength='255'
            value={img2}
            onChange={e => setImg2(e.target.value)}
          />
          <input
            id='spot-input-url'
            placeholder='url'
            type='text'
            maxLength='255'
            value={img3}
            onChange={e => setImg3(e.target.value)}
          />
          <input
            id='spot-input-url'
            placeholder='url'
            type='text'
            maxLength='255'
            value={img4}
            onChange={e => setImg4(e.target.value)}
          />
          <input
            id='spot-input-url'
            placeholder='url'
            type='text'
            maxLength='255'
            value={img5}
            onChange={e => setImg5(e.target.value)}
          />
        </div>
        {hasSubmit && validationErrors.length > 0 && (
          <div id='error-div'>
            The following errors were found:
            <ul id='error-list'>
              {validationErrors.map((error, idx) => <li id='errors' key={idx}>{error}</li>)}
            </ul>
          </div>
        )}
        <div id='buttons-submit'>
          <button id='host-button' type='submit'>Host the Spot</button>
          <NavLink id='cancel-link' to='/'>Cancel</NavLink>
        </div>
      </form>
    </div>
  )
}

export default CreateSpotForm;
