import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import useGlobal from '../../hooks/useGlobal';

import { fetchWithAccessToken } from '../../utils/fetchFn';
import { formatISODate } from '../../utils/common';

const RestaurantNotificationList = ({ restaurantId }) => {
  const {
    info: { user, accessToken },
  } = useGlobal();

  const { data } = useQuery({
    queryKey: ['notifications', user?.id],
    queryFn: () =>
      fetchWithAccessToken(
        'GET',
        `/restaurants/${restaurantId}/notifications?limit=5&page=1`,
        accessToken
      ),
  });

  if (data?.notifications?.length === 0) {
    return <li>Không có thông báo nào</li>;
  }

  return (
    <>
      {data?.notifications?.map((n) => (
        <li key={n.id} className="border border-base-300 mb-3 rounded-lg">
          <div className="flex items-center justify-between w-full hover:bg-base-100">
            <Link
              to={`/users/${user?.id}/restaurants/${restaurantId}/orders`}
              className="hover:text-info"
            >
              <p className="text-sm max-w-64 break-words">{n.message}</p>
            </Link>
            <button className="btn btn-link btn-xs text-success no-underline p-0">Đã xem</button>
          </div>
          <p className="text-xs hover:bg-base-100">Đặt {formatISODate(n.timestamp)}</p>
        </li>
      ))}
    </>
  );
};

RestaurantNotificationList.propTypes = {
  restaurantId: PropTypes.number.isRequired,
};

export default RestaurantNotificationList;
