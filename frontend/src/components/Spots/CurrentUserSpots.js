import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import { getSpotCurrentUser } from '../../store/spots';
import './CurrentUserSpots.css'

const GetSpotsCurrentUser = () => {
  const spots = useSelector(state => {
    return state.spots.allSpots;
  });
  const spotsArr = Object.values(spots);
  // console.log('These are spots:', spots)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSpotCurrentUser())
  }, [dispatch]);

  if (!spots || !spotsArr.length) return (<div className='card-1'>Currently not hosting any spots</div>)

  return (
    <div className='card'>
      {spotsArr.map(spot => (
        <div id='card-info' key={spot.id}>
          <NavLink to={`/spots/${spot.id}`}>
            <img className='spot-image' src={spot.previewImage} />
          </NavLink>
          <div id='each-one'>
            <div className='each-card'>
              <div className='city-state'>{`${spot.city}, ${spot.state}`}</div>
              <div id='extra-info'>
                <div>{spot.country}</div>
                <div>{spot.name}</div>
              </div>
              <div className='price'>
                <span id='number'>{`$${spot.price}`}</span>
                <span id='night'>night</span>
              </div>
            </div>

            <div className='reviews-1'>
              <i id='star-spot' className="fa-sharp fa-solid fa-star"></i>
              <div>
                {spot.avgRating}
              </div>
            </div>
          </div>
        </div>
      ))}

    </div>
  )
}

export default GetSpotsCurrentUser;
