import PropTypes from 'prop-types';

import Rating from '../../components/Rating';
import { fill, isOpen } from '../../utils/common';
import { Link } from 'react-router-dom';

const RestaurantResult = ({ restaurants, search }) => {
  if (restaurants.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <div className="mb-3 flex justify-between items-center">
        <h1 className="text-primary font-semibold">Cửa hàng phù hợp</h1>
        <Link to={`/restaurants?q=${search}`} className="btn-xs btn">
          See more
        </Link>
      </div>
      {restaurants.map((r) => (
        <Link key={r.id} to={`/restaurants/${r.id}`}>
          <div className="border border-neutral-300 rounded-lg flex">
            <figure>
              <img
                src={fill(r.logo_url, 400, 400) || '/no-img.png'}
                className="h-[140px] w-[140px] object-center object-cover rounded-l-lg"
              />
            </figure>
            <div className="p-2">
              <h2 className="font-semibold text-xl truncate">{r.name}</h2>
              <p className="mb-2 text-sm">{r.address}</p>
              <p className="text-sm mb-2">
                {isOpen(r.is_active, r.open_time, r.close_time)
                  ? '🟢 Đang mở cửa'
                  : '🔴 Chưa mở cửa'}
              </p>
              {r.rating > 0 ? (
                <div className="flex items-end gap-1">
                  <Rating defaultValue={r.rating} disable={true} />{' '}
                  <span className="text-sm">{r.rating.toFixed(1)}</span>
                </div>
              ) : (
                <p className="text-sm text-neutral-500">⭐ Chưa có đánh giá</p>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

RestaurantResult.propTypes = {
  restaurants: PropTypes.array,
  search: PropTypes.string,
};

export default RestaurantResult;
