import PropTypes from "prop-types";

import { formatPrice } from "../../utils/common";

const OrderDetail = ({ order }) => {
  return (
    <div>
      <span className="text-sm text-neutral-600">
        Phí vận chuyển:{" "}
        <span className="font-semibold text-primary">
          {formatPrice(order.shipping_fee)} <sup> ₫</sup>
        </span>
      </span>
    </div>
  );
};

OrderDetail.propTypes = {
  order: PropTypes.object.isRequired,
};

export default OrderDetail;
