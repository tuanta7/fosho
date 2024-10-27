import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import haversine from 'haversine-distance';

import useGlobal from '../../../hooks/useGlobal';
import { isOpen, fill } from '../../../utils/common';
import { MapIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/16/solid';

const RestaurantItem = ({ restaurant }) => {
  const {
    info: { coordinates },
  } = useGlobal();

  const distanceInMeters = haversine(
    { lat: coordinates.lat, lon: coordinates.long },
    { lat: restaurant.lat, lon: restaurant.long }
  );

  const isOpening = isOpen(restaurant.is_active, restaurant.open_time, restaurant.close_time);

  return (
    <div className="card w-[328px]">
      <Link to={`/restaurants/${restaurant.id}`}>
        <img
          src={fill(restaurant.logo_url, 400, 400) || '/no-img.png'}
          className="h-[172px] w-full object-center object-fill rounded-2xl"
        />
        <div className="flex flex-col items-start max-w-[310px] mt-2">
          <h2 className="font-semibold text-xl max-w-[300px] truncate">{restaurant.name}</h2>
          <p className="max-w-[310px] truncate">{restaurant.address}</p>
          <div className="flex items-end gap-2">
            {isOpening ? (
              <span className="font-semibold text-success">Open</span>
            ) : (
              <span className="font-semibold text-error">Closed</span>
            )}
            &#x2022;
            <span className="flex items-center gap-2">
              <MapIcon className="w-4" /> {((distanceInMeters / 1000) * 1.35).toFixed(2)} km
            </span>{' '}
            &#x2022;
            <span className="flex items-center gap-1">
              <StarIcon className="w-4 text-yellow-500" />
              {restaurant.rating > 0 ? restaurant.rating.toFixed(1) : 'N/A'}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

RestaurantItem.propTypes = {
  restaurant: PropTypes.object,
};

export default RestaurantItem;
