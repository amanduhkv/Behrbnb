import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getASpot } from '../../store/spots';

import DeleteSpot from '../Spots/DeleteSpot';
import '../SingleSpot/SingleSpot.css'
import Reviews from '../Reviews/Reviews';
import bear from '../../assets/bear.svg';

const SingleSpot = () => {
  const { spotId } = useParams();
  const sessionUser = useSelector(state => state.session.user);
  const singleSpot = useSelector(state => state.spots.singleSpot);
  console.log('single spot', singleSpot)
  const dispatch = useDispatch();
  const [editModal, setEditModal] = useState(false);

  useEffect(() => {
    dispatch(getASpot(spotId));
  }, [dispatch, spotId])

  if (!singleSpot) return null;

  let addEditButton;
  if (sessionUser.id === singleSpot.ownerId) {
    addEditButton = (
      <>
        <NavLink id='edit-delete-button' to={`/spots/${spotId}/edit`}>Edit</NavLink>
        <DeleteSpot />
      </>
    );
  }

  return (
    <div>
      {singleSpot.id && (
        <div id='grid-spot'>
          <div id='spot-name-container'>
            <div id='spot-name'>{singleSpot.name}</div>
          </div>

          <div id='top-info'>
            <span id='avg-rating-star'>
              <i id='star' className="fa-sharp fa-solid fa-star"></i>
              <span id='avg-rating'>{singleSpot.avgStarRating ?? 'new'}</span>
            </span>
            <span id='dots'>•</span>
            <span id='review-link'>
              {singleSpot.numReviews} {singleSpot.numReviews === 1 ? 'review' : 'reviews'}
            </span>
            <span id='dots'>•</span>
            <span id='location'>
              {`${singleSpot.city}, ${singleSpot.state}, ${singleSpot.country}`}
            </span>
          </div>

          <div className='spot-images'>
            <img id='single-image' src={singleSpot?.SpotImages?.[0]?.url ?? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnAe4iFTE1nJiQAnaY8hqwwNwP7E27mTHk2g&usqp=CAU'} alt='no-img' />
            <div id='quad-images'>
              <div id='first-two'>
                <img id='one' src={singleSpot?.SpotImages?.[1]?.url ?? 'https://drive.google.com/uc?export=view&id=1tksFIkzN8aVDjYOR58LGNE31Kgsyfnja'} alt='no-img' />
                <img id='one' src={singleSpot?.SpotImages?.[2]?.url ?? 'https://drive.google.com/uc?export=view&id=1tksFIkzN8aVDjYOR58LGNE31Kgsyfnja'} alt='no-img' />
              </div>
              <div id='second-two'>
                <img id='two' src={singleSpot?.SpotImages?.[3]?.url ?? 'https://drive.google.com/uc?export=view&id=1tksFIkzN8aVDjYOR58LGNE31Kgsyfnja'} alt='no-img' />
                <img id='three' src={singleSpot?.SpotImages?.[4]?.url ?? 'https://drive.google.com/uc?export=view&id=1tksFIkzN8aVDjYOR58LGNE31Kgsyfnja'} alt='no-img' />
              </div>
            </div>
          </div>

          <div id='price-review-side-box'>
            <span id='price'>
              ${singleSpot.price}
              <span id='night'>night</span>
            </span>
            <i id='star-deets' className="fa-sharp fa-solid fa-star"></i>
            <span id='avg-rating'>{singleSpot.avgStarRating ?? 'new'}</span>
            <span id='dots'>•</span>
            <span id='review-link'>
              {singleSpot.numReviews} {singleSpot.numReviews === 1 ? 'review' : 'reviews'}
            </span>
          </div>

          <div id='user-para'>
            <div id='user-deets'>
              <p id='user-p'>
                {`Entire home hosted by ${singleSpot?.Owner?.firstName}`}
              </p>
              <img id='bear' className='user-bear' src={bear} />
            </div>
            <div className='p'>
              <div id='p-title'>Self check-in</div>
              <div id='p-des'>
                Check yourself in with the lockbox.
              </div>
              <div id='p-title'>{singleSpot?.Owner?.firstName} is a Superhost</div>
              <div id='p-des'>
                Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.
              </div>
              <div id='p-title'>Free cancellation</div>
            </div>
            <div id='p-protect'>
              <img id='aircover' src='https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg' />
              <div id='air-des'>
                Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.
              </div>
            </div>
            <div id='user-des'>
              {singleSpot.description}
            </div>
          </div>

          <br></br>
          <br></br>
          <div id='ed-buttons'>
            {addEditButton}
          </div>

          <div id='reviews'>
            <Reviews />
          </div>
        </div>
      )}
    </div>
  )
}

export default SingleSpot;