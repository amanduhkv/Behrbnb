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
        <button onClick={() => setEditModal(true)}>Edit Spot</button>
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
        <div>
          <h2 id='spot-name'>{singleSpot.name}</h2>
          <div>
            <span>
              <i id='star' className="fa-sharp fa-solid fa-star"></i>
            </span>
            {/* dis wrong v */}
            <span>{singleSpot.avgStarRating ?? 'new'}</span>
            <NavLink id='review-link' to={`/spots/${singleSpot.id}/reviews`}>{singleSpot.numReviews} {singleSpot.numReviews === 1 ? 'review' : 'reviews'}</NavLink>
            <span>
              {`${singleSpot.city}, ${singleSpot.state}, ${singleSpot.country}`}
            </span>
          </div>
          <div className='spot-images'>
            <img id='single-image' src={singleSpot?.SpotImages?.[0]?.url ?? { broken }} alt='broken-img' />
            <div id='quad-images'>
              <span>
                <img id='one' src={singleSpot?.SpotImages?.[1]?.url ?? { broken }} alt='broken-img' />
                <img id='one' src={singleSpot?.SpotImages?.[2]?.url ?? { broken }} alt='broken-img' />
              </span>
              <span>
                <img id='two' src={singleSpot?.SpotImages?.[3]?.url ?? { broken }} alt='broken-img' />
                <img id='two' src={singleSpot?.SpotImages?.[4]?.url ?? { broken }} alt='broken-img' />
              </span>
            </div>

          </div>
          <p>{`Entire home hosted by ${singleSpot?.Owner.firstName}`}</p>
          <br></br>
          <br></br>
          {addEditButton}
          <Reviews />
        </div>
      )}
    </div>
  )
}

export default SingleSpot;
