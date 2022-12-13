import { useMemo } from "react";
import StarIcon from "./StarIcon";

function RatingIcon(props) {
  const {
    index,
    rating,
    hoverRating,
    onMouseEnter,
    onMouseLeave,
    onSaveRating,
  } = props;

  const fill = useMemo(() => {
    if (hoverRating >= index) {
      return 'rgb(220,30,87)';
    } else if (!hoverRating && rating >= index) {
      return 'rgb(220,30,87)';
    }
    return 'none';
  }, [rating, hoverRating, index]);

  return (
      <div
        className="cursor-pointer"
        onMouseEnter={() => onMouseEnter(index)}
        onMouseLeave={() => onMouseLeave()}
        onClick={() => onSaveRating(index)}>
        <StarIcon fill={fill} />
      </div>
  )
}

export default RatingIcon;
