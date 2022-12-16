import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { EditModal } from '../../context/Modal';
import { getASpot, updateSpot } from '../../store/spots';
import './EditSpotForm.css';

const EditSpotForm = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const spot = useSelector(state => state.spots.singleSpot)


  const [address, setAddress] = useState(spot?.address);
  const [city, setCity] = useState(spot?.city);
  const [state, setState] = useState(spot?.state);
  const [country, setCountry] = useState(spot?.country);
  const [lat, setLat] = useState(spot?.lat);
  const [lng, setLng] = useState(spot?.lng);
  const [name, setName] = useState(spot?.name);
  const [description, setDescription] = useState(spot?.description);
  const [price, setPrice] = useState(spot?.price);
  const [image, setImage] = useState([]);
  const [img1, setImg1] = useState(spot?.SpotImages[0].url ?? '');
  const [img2, setImg2] = useState(spot?.SpotImages[1] ? spot.SpotImages[1].url : '');
  const [img3, setImg3] = useState(spot?.SpotImages[2] ? spot.SpotImages[2].url : '');
  const [img4, setImg4] = useState(spot?.SpotImages[3] ? spot.SpotImages[3].url : '');
  const [img5, setImg5] = useState(spot?.SpotImages[4] ? spot.SpotImages[4].url : '');
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmit, setHasSubmit] = useState(false);

  useEffect(() => {
    const errors = [];
    if (address && !address.length) errors.push("Please enter an address");
    if (city && !city.length) errors.push("Please enter a city");
    if (state && !state.length) errors.push("Please enter a state");
    if (country && !country.length) errors.push("Please enter a country");
    if (lat && !lat) errors.push("Please enter a valid latitude");
    if (lng && !lng) errors.push("Please enter a valid longitude");
    if (name && !name) errors.push("Please enter a name for the spot");
    if (description && !description) errors.push('Please enter a description for the spot');
    if (price && !price) errors.push("Please enter a price");
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

  const updateAddress = e => setAddress(e.target.value);
  const updateCity = e => setCity(e.target.value);
  const updateState = e => setState(e.target.value);
  const updateCountry = e => setCountry(e.target.value);
  const updateLat = e => setLat(e.target.value);
  const updateLng = e => setLng(e.target.value);
  const updateName = e => setName(e.target.value);
  const updateDescription = e => setDescription(e.target.value);
  const updatePrice = e => setPrice(e.target.value);
  const updateImg1 = e => setImg1(e.target.value);
  const updateImg2 = e => setImg2(e.target.value);
  const updateImg3 = e => setImg3(e.target.value);
  const updateImg4 = e => setImg4(e.target.value);
  const updateImg5 = e => setImg5(e.target.value);
  // const updateUrl = e => setUrl(e.target.value);

  useEffect(() => {
    dispatch(getASpot(spotId));
  }, [dispatch, spotId]);

  const handleSubmit = async e => {
    e.preventDefault();

    setHasSubmit(true);

    const newSpot = {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
      // url
    };
    if (!validationErrors.length) {
      let updatedSpot = await dispatch(updateSpot(newSpot, image, spot.id));
      if (updatedSpot) {
        history.push(`/spots/${spot.id}`)
      }
    }
    // reset();
  };

  // const reset = () => {
  //   setAddress(spot.address);
  //   setCity(spot.city);
  //   setState(spot.state);
  //   setCountry(spot.country);
  //   setLat(spot.lat);
  //   setLng(spot.lng);
  //   setName(spot.name);
  //   setDescription(spot.description);
  //   setPrice(spot.price);
  //   // setUrl('');
  // };

  return (
    <div className='form-for-update'>
      <form id='update-form' onSubmit={handleSubmit}>
        <h2>Update a Spot</h2>
        <div className='create-content'>
          <input
            id='spot-input-address'
            type='text'
            placeholder='address'
            value={address}
            onChange={updateAddress}
          />
          <input
            id='spot-input-mid'
            type='text'
            placeholder='city'
            value={city}
            onChange={updateCity}
          />
          <input
            id='spot-input-mid'
            type='state'
            placeholder='state'
            value={state}
            onChange={updateState}
          />
          <input
            id='spot-input-mid'
            type='country'
            placeholder='country'
            value={country}
            onChange={updateCountry}
          />
          <input
            id='spot-input-mid'
            type='number'
            placeholder='latitude'
            min='-90'
            max='90'
            value={lat}
            onChange={updateLat}
          />
          <input
            id='spot-input-mid'
            type='number'
            placeholder='longitude'
            min='-180'
            max='180'
            value={lng}
            onChange={updateLng}
          />
          <input
            id='spot-input-mid'
            type='name'
            placeholder='name'
            value={name}
            onChange={updateName}
          />
          <textarea
            id='spot-input-textarea'
            placeholder='description'
            value={description}
            onChange={updateDescription}
          />
          <input
            id='spot-input-url'
            placeholder='$'
            type='number'
            min="0"
            value={price}
            onChange={updatePrice}
          />
          {/* <input
            id='spot-input-url'
            placeholder='url'
            type='text'
            maxLength='255'
            value={img1}
            onChange={updateImg1}
          />
          <input
            id='spot-input-url'
            placeholder='url'
            type='text'
            maxLength='255'
            value={img2}
            onChange={updateImg2}
          />
          <input
            id='spot-input-url'
            placeholder='url'
            type='text'
            maxLength='255'
            value={img3}
            onChange={updateImg3}
          />
          <input
            id='spot-input-url'
            placeholder='url'
            type='text'
            maxLength='255'
            value={img4}
            onChange={updateImg4}
          />
          <input
            id='spot-input-url'
            placeholder='url'
            type='text'
            maxLength='255'
            value={img5}
            onChange={updateImg5}
          /> */}
          {hasSubmit && validationErrors.length > 0 && (
            <div id='error-div'>
              The following errors were found:
              <ul id='error-list'>
                {validationErrors.map((error, idx) => <li id='errors' key={idx}>{error}</li>)}
              </ul>
            </div>
          )}

          <div id='buttons-submit'>
            <button id='update-button' type='submit'>Update</button>
            <NavLink id='cancel-button' to={`/spots/${spotId}`}>Cancel</NavLink>
          </div>
        </div>
      </form>
    </div>
  )

};

export default EditSpotForm;
