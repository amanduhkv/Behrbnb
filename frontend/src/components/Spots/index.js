import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import { getSpots } from '../../store/spots'
import './Spots.css'

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

  if (!spots) return null

  return (
    <div className='card'>
      {spotsArr.map(spot => (
        <div key={spot.id}>
          <div className='each-card'>
            <NavLink to={`/spots/${spot.id}`}>
              <img className='spot-image' src='https://t4.ftcdn.net/jpg/02/65/70/73/360_F_265707361_N79UdgpbERwsjHZxIWRixuodCKqYsBF5.jpg' />
            </NavLink>
            <div className='city-state'>{`${spot.city}, ${spot.state}`}</div>
            <div className='price'>
              <span id='number'>{`$${spot.price}`}</span>
              <span id='night'>night</span>
            </div>
            <div className='reviews'>
              <i className="fa-sharp fa-solid fa-star"></i>
              {`${spot.avgRating}` ? `${spot.avgRating}` : "new"}
            </div>
          </div>
        </div>
      ))}

    </div>
  )
}

export default Spots;
