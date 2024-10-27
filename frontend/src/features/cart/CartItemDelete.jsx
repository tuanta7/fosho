import { useMutation } from "@tanstack/react-query";
import PropTypes from "prop-types";

const CartItemDelete = ({ itemId }) => {
  const { mutate } = useMutation({});

  return <button className="btn btn-ghost text-primary">Xóa</button>;
};
CartItemDelete.propTypes = {
  itemId: PropTypes.number.isRequired,
};

export default CartItemDelete;
