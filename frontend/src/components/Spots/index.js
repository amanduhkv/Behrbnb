import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getSpots } from '../../store/spots'
import './Spots.css'

import brokenImg from '../../assets/no-image.svg';

const Spots = () => {
  const spots = useSelector(state => {
    return state.spots.allSpots;
  });
  const spotsArr = Object.values(spots);
  // console.log('These are spots:', spots)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSpots())
  }, [dispatch]);

  if (!spots || !spotsArr.length) return (<div className='card-1'>Loading spots...</div>)

  return (
    <div className='card'>
      {spotsArr.map(spot => (
        <div id='card-info' key={spot.id}>
          <NavLink to={`/spots/${spot.id}`}>
            <img className='spot-image' src={spot.previewImage} onError={e => e.target.src=brokenImg} />
          </NavLink>
          <div id='each'>
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

            <div className='reviews'>
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

export default Spots;
