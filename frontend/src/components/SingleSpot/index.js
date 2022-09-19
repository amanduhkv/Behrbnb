import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import { getASpot } from '../../store/spots'

const SingleSpot = () => {
  const { spotId } = useParams();
  const singleSpot = useSelector(state => state.spots.singleSpot);
  console.log('single spot', singleSpot)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getASpot(spotId));
  }, [dispatch])

  if (!singleSpot) return null;

  return (
    <div>
      <h2>{singleSpot.name}</h2>
      <div>
        <span>
          <i class="fa-sharp fa-solid fa-star"></i>
        </span>
        <span>{singleSpot.avgStarRating}</span>
        <span>{singleSpot.numReviews} reviews</span>
        <span>
          {`${singleSpot.city}, ${singleSpot.state}, ${singleSpot.country}`}
        </span>
      </div>
      <div>
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn2rxCQ-CBZqmyMh9k5H5T-LgcBlN7TbK-Sw&usqp=CAU' />
      </div>
      <p>{`Entire home hosted by ${singleSpot.Owner.firstName}`}</p>
    </div>
  )
}

export default SingleSpot;
