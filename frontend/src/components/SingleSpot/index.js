import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getASpot } from '../../store/spots';
import { Modal } from '../../context/Modal';
import EditSpotForm from '../Spots/EditSpotForm';
import DeleteSpot from '../Spots/DeleteSpot';
import '../SingleSpot/SingleSpot.css'
import Reviews from '../Reviews/Reviews';
import broken from '../../assets/no-image.svg';
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
        <button id='edit-delete-button' onClick={() => setEditModal(true)}>Edit Spot</button>
        {editModal && (
          <Modal onClose={() => setEditModal(false)}>
            <EditSpotForm />
          </Modal>
        )}
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
            <img id='single-image' src={singleSpot?.SpotImages?.[0]?.url ?? { broken }} alt='broken-img' />
            <div id='quad-images'>
              <div id='first-two'>
                <img id='one' src={singleSpot?.SpotImages?.[1]?.url ?? { broken }} alt='broken-img' />
                <img id='one' src={singleSpot?.SpotImages?.[2]?.url ?? { broken }} alt='broken-img' />
              </div>
              <div id='second-two'>
                <img id='two' src={singleSpot?.SpotImages?.[3]?.url ?? { broken }} alt='broken-img' />
                <img id='three' src={singleSpot?.SpotImages?.[4]?.url ?? { broken }} alt='broken-img' />
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
              <p>
                {`Entire home hosted by ${singleSpot?.Owner.firstName}`}
              </p>
              <img id='bear' src={bear} />
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
