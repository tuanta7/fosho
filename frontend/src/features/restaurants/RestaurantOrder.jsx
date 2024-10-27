import PropTypes from "prop-types";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { formatISODate, formatPrice } from "../../utils/common";
import RestaurantOrderStatus from "./RestaurantOrderStatus";
import { Link } from "react-router-dom";

const RestaurantOrder = ({ order }) => {
  return (
    <div className="collapse-title p-0 mb-3 border border-neutral-400 shadow-sm rounded-xl flex flex-col">
      <div className="flex justify-between items-center p-2 border-b border-neutral-400">
        <Link
          to={`${order.id}`}
          className="font-semibold pl-3 hover:text-primary"
        >
          Đơn hàng #{order.id}
          <span className="text-xs mx-2 text-primary text-center">
            Chi tiết
          </span>
        </Link>
        <RestaurantOrderStatus
          status={order.status}
          orderId={order.id}
          restaurantId={order.restaurant.id}
        />
      </div>
      <div className="grid lg:grid-cols-2 gap-3 px-5 py-4">
        <div className="flex flex-col justify-between">
          {order.items.map((item, index) => (
            <p className="flex gap-1" key={item.id}>
              <span>
                {index + 1}. {item.dish.name}
              </span>
              <span className="font-semibold min-w-max">
                <XMarkIcon className="w-3 inline-block" />
                {item.quantity}
              </span>
            </p>
          ))}
          <p className="flex items-baseline">
            <span className="text-sm">Thành tiền:</span>
            <span className="font-semibold text-primary px-2 text-lg">
              {formatPrice(
                order.total_price - order.total_discount + order.shipping_fee
              )}
              <sup> ₫</sup>
            </span>
            <span className="text-sm text-neutral-500 ml-6">
              {order.items.length} sản phẩm
            </span>
          </p>
        </div>
        <div className="flex flex-col gap-1 justify-start lg:items-end max-lg:border max-lg:p-2 rounded-xl">
          <p className="text-sm text-neutral-500 justify-self-start">
            Đặt {formatISODate(order.created_at)}
          </p>
          <p className="text-sm text-neutral-500">
            Giao tới: <span>{order.shipping_address.address}</span>
          </p>
          <p className="text-sm text-neutral-500">
            Người nhận:{" "}
            <span>
              {order.shipping_address.receiver_name} -{" "}
              {order.shipping_address.phone}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

RestaurantOrder.propTypes = {
  order: PropTypes.object.isRequired,
};

export default RestaurantOrder;
