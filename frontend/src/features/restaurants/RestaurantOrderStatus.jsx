import PropTypes from 'prop-types';
import OrderStatus from '../orders/OrderStatus';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import useGlobal from '../../hooks/useGlobal';
import { fetchWithAccessToken } from '../../utils/fetchFn';

const RestaurantOrderStatus = ({ status, orderId, restaurantId }) => {
  const queryClient = useQueryClient();
  const {
    info: { accessToken },
  } = useGlobal();

  const { mutate } = useMutation({
    mutationFn: (newStatus) =>
      fetchWithAccessToken(
        'PATCH',
        `/restaurants/${restaurantId}/orders/${orderId}?status=${newStatus}`,
        accessToken
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['restaurant-orders', status]);
      queryClient.invalidateQueries(['restaurant-orders', data.order_status]);
    },
  });

  let btn = '';
  switch (status) {
    case 'PENDING':
      btn = (
        <button className="btn btn-info btn-xs z-[2]" onClick={() => mutate('CONFIRMED')}>
          Xác nhận
        </button>
      );
      break;
    case 'CONFIRMED':
      btn = (
        <button
          className="btn btn-secondary text-base-100 btn-xs z-[2]"
          onClick={() => mutate('PREPARING')}
        >
          Chuẩn bị hàng
        </button>
      );
      break;
    case 'PREPARING':
      btn = (
        <button
          className="btn btn-secondary text-base-100 btn-xs z-[2]"
          onClick={() => document.getElementById('order-ready').click()}
        >
          In đơn giao
        </button>
      );
      break;
  }

  return (
    <div className="flex items-center gap-3">
      <OrderStatus status={status} />
      {btn}
    </div>
  );
};

RestaurantOrderStatus.propTypes = {
  status: PropTypes.string.isRequired,
  orderId: PropTypes.number.isRequired,
  restaurantId: PropTypes.number.isRequired,
};

export default RestaurantOrderStatus;
