import PropTypes from "prop-types";

import { formatPrice, fill } from "../../utils/common";
import { XMarkIcon } from "@heroicons/react/24/outline";

const OrderItem = ({ item }) => {
  return (
    <div className="flex gap-2 w-full">
      <img
        src={fill(item.dish.thumbnail_url, 200, 200)}
        className="w-[100px] h-[100px] rounded-lg"
      />
      <div className="max-w-max">
        <h2 className="font-semibold">
          {item.dish.name}{" "}
          <span>
            <XMarkIcon className="w-3 inline" />
            {item.quantity}
          </span>
        </h2>
        <p className="text-primary font-semibold">
          Giá gốc: {formatPrice(item.dish.price * item.quantity)}
          <sup> ₫</sup>
        </p>
        <p className="text-sm">
          Giảm: {formatPrice(item.dish.discount * item.quantity)}
          <sup> ₫</sup>
        </p>
      </div>
    </div>
  );
};
OrderItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default OrderItem;
