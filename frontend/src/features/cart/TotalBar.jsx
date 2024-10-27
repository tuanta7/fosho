import PropTypes from "prop-types";

import OrderConfirm from "../orders/OrderConfirm";
import { formatPrice } from "../../utils/common";

const TotalBar = ({ total, discount, items, restaurantId }) => {
  return (
    <div className="flex w-full justify-end items-center gap-10 px-3 pt-3 border-t border-neutral-300">
      <div>
        <p>
          <span>Tổng cộng:</span>
          <span className="pl-2 text-primary font-semibold text-lg">
            {formatPrice(total)} <sup>₫</sup>
          </span>
        </p>
        {discount > 0 && (
          <p className="text-neutral-500 mt-1 text-sm">
            Tiết kiệm {formatPrice(discount)} ₫
          </p>
        )}
      </div>
      <button
        className="btn btn-primary text-base-100"
        onClick={() => {
          if (items.length === 0) return;
          document.getElementById(`order_confirm_${restaurantId}`).showModal();
        }}
      >
        Đặt hàng
      </button>
      <OrderConfirm items={items} restaurantId={restaurantId} />
    </div>
  );
};
TotalBar.propTypes = {
  total: PropTypes.number.isRequired,
  discount: PropTypes.number.isRequired,
  items: PropTypes.array.isRequired,
  restaurantId: PropTypes.number.isRequired,
};

export default TotalBar;
