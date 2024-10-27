import PropTypes from 'prop-types';
import { BuildingStorefrontIcon } from '@heroicons/react/24/outline';

import { formatISODate, formatPrice } from '../../utils/common';

import OrderItem from './OrderItem';
import OrderStatus from './OrderStatus';
import OrderDetail from './OrderDetail';

const Order = ({ order }) => {
  return (
    <div className="collapse">
      <input type="checkbox" />
      <div className="collapse-title p-3 mb-3 border border-neutral-300 shadow-sm rounded-xl flex flex-col">
        <div className="flex justify-between items-center pl-3 mb-2">
          <h2 className="font-semibold col-span-4 flex items-center gap-2">
            <BuildingStorefrontIcon className="w-4" />
            <span>{order.restaurant.name}</span>
          </h2>
          <OrderStatus status={order.status} />
        </div>
        <div className="grid lg:grid-cols-2 items-center gap-3 p-2">
          <OrderItem key={order.items[0].id} item={order.items[0]} />
          <div className="flex flex-col gap-1 justify-evenly lg:items-end max-lg:border max-lg:p-2 rounded-xl">
            <p className="text-sm text-neutral-500 justify-self-start mb-2">
              Đặt {formatISODate(order.created_at)}
            </p>
            <p className="text-sm text-neutral-500">
              Giao tới: <span>{order.shipping_address.address}</span>
            </p>
            <p className="text-sm text-neutral-500">
              Người nhận:{' '}
              <span>
                {order.shipping_address.receiver_name} - {order.shipping_address.phone}
              </span>
            </p>
            <div className="flex items-center gap-6 mt-2">
              <p className="text-sm text-neutral-500">{order.items.length} sản phẩm</p>
              <p>
                <span className="text-sm">Thành tiền:</span>
                <span className="font-semibold text-primary px-2 text-lg">
                  {formatPrice(order.total_price - order.total_discount + order.shipping_fee)}
                  <sup> ₫</sup>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="collapse-content">
        <OrderDetail order={order} />
      </div>
    </div>
  );
};
Order.propTypes = {
  order: PropTypes.object.isRequired,
};

export default Order;
