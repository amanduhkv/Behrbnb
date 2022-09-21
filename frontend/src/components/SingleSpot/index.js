import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getASpot } from '../../store/spots';
import { Modal } from '../../context/Modal';
import EditSpotForm from '../Spots/EditSpotForm';
import DeleteSpot from '../Spots/DeleteSpot';

const SingleSpot = () => {
  const { spotId } = useParams();
  const sessionUser = useSelector(state => state.session.user)
  const singleSpot = useSelector(state => state.spots.singleSpot);
  console.log('single spot', singleSpot)
  const dispatch = useDispatch();
  const [editModal, setEditModal] = useState(false);

  useEffect(() => {
    dispatch(getASpot(spotId));
  }, [dispatch, spotId])

  if (!singleSpot) return null;

  let addEditButton;
  if(sessionUser.id === singleSpot.ownerId) {
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
      <h2>{singleSpot.name}</h2>
      <div>
        <span>
          <i class="fa-sharp fa-solid fa-star"></i>
        </span>
        {/* dis wrong v */}
        {/* <span>{singleSpot.avgRating}</span> */}
        <span>{singleSpot.numReviews} reviews</span>
        <span>
          {`${singleSpot.city}, ${singleSpot.state}, ${singleSpot.country}`}
        </span>
      </div>
      <div>
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn2rxCQ-CBZqmyMh9k5H5T-LgcBlN7TbK-Sw&usqp=CAU' alt='polar-bears' />
      </div>
      {/* <p>{`Entire home hosted by ${singleSpot.Owner.firstName}`}</p> */}
      <hr></hr>
      {addEditButton}
      {/* <DeleteSpot /> */}
    </div>
  )
}

export default SingleSpot;
