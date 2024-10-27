import PropTypes from "prop-types";
const OrderStatus = ({ status }) => {
  if (status.toUpperCase() === "PENDING") {
    return (
      <span className="text-info text-sm px-3 border border-info rounded-xl">
        Chờ xác nhận
      </span>
    );
  }
  if (status.toUpperCase() === "CONFIRMED") {
    return (
      <span className="text-secondary text-sm px-3 border border-secondary rounded-xl">
        Đã xác nhận
      </span>
    );
  }
  if (status.toUpperCase() === "PREPARING") {
    return (
      <span className="text-secondary text-sm px-3 border border-secondary rounded-xl">
        Đang chuẩn bị
      </span>
    );
  }
};
OrderStatus.propTypes = {
  status: PropTypes.string.isRequired,
};

export default OrderStatus;
