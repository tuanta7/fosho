import PropTypes from 'prop-types';
import { useState } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

import useGlobal from '../../hooks/useGlobal';
import { fetchWithAccessToken } from '../../utils/fetchFn';
import { formatPrice } from '../../utils/common';

import LoadingButton from '../../components/LoadingButton';
import SelectShippingAddress from './SelectShippingAddress';
import OrderItem from './OrderItem';

const OrderConfirm = ({ items, restaurantId }) => {
  const queryClient = useQueryClient();
  const [shippingAddress, setShippingAddress] = useState(0);

  const total = items.reduce((acc, item) => acc + item.dish.price * item.quantity, 0);
  const discount = items.reduce((acc, item) => acc + item.dish.discount * item.quantity, 0);

  const navigate = useNavigate();
  const {
    info: { user, accessToken },
    stompClient,
  } = useGlobal();

  const { mutate, isPending } = useMutation({
    mutationFn: (payload) =>
      fetchWithAccessToken('POST', `/restaurants/${restaurantId}/orders`, accessToken, payload),
    onSuccess: () => {
      queryClient.invalidateQueries(['carts']);
      queryClient.invalidateQueries(['orders']);
      toast.success('Đặt hàng thành công');
      navigate(`/users/${user.id}/orders`);

      if (stompClient.current) {
        stompClient.current.publish({
          destination: `/app/notifications`,
          body: JSON.stringify({
            restaurant_id: restaurantId,
            user_id: user.id,
            from_user: true,
            message: `Đơn hàng mới từ ${user.full_name} (${user.email})`,
          }),
        });
      }
    },
  });

  const placeOrder = () => {
    console.log({
      shipping_address_id: shippingAddress,
      order_item_ids: items.map((item) => item.id),
    });
    mutate({
      shipping_address_id: shippingAddress,
      order_item_ids: items.map((item) => item.id),
    });
  };

  return (
    <dialog id={`order_confirm_${restaurantId}`} className="modal">
      <div className="modal-box rounded-xl">
        <div className="flex flex-col gap-6 max-md:flex-col max-md:items-center">
          <SelectShippingAddress setFn={setShippingAddress} />
          <div className="flex flex-col gap-3 w-full">
            <h2 className="text-lg text-primary font-semibold w-full">Đơn hàng</h2>
            <div className="flex flex-col gap-2 border p-3 rounded-xl w-full">
              {items.map((item) => (
                <OrderItem key={item.id} item={item} />
              ))}
            </div>
            <div className="form-control w-fit">
              <label className="label cursor-pointer">
                <input
                  type="radio"
                  name={`method_${restaurantId}`}
                  className="radio radio-primary radio-sm"
                  checked
                  disabled
                />
                <span className="label-text text-primary ml-1 font-semibold">
                  Thanh toán khi nhận hàng
                </span>
              </label>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 justify-between mt-3">
          <div>
            <div>
              <span>Tổng:</span>
              <span className="pl-1 text-primary font-semibold text-lg">
                {formatPrice(total - discount)} <sup>₫</sup>{' '}
                <span className="text-neutral-500 text-sm">
                  + phí vận chuyển{' '}
                  <span className="tooltip" data-tip="Phí vận chuyển nội thành: 30.000 ₫">
                    <InformationCircleIcon className="w-4 h-4" />
                  </span>
                </span>
              </span>
            </div>
            {discount > 0 && (
              <p className="text-neutral-500 text-xs">Tiết kiệm: {formatPrice(discount)} ₫</p>
            )}
          </div>
          <button className="btn btn-primary text-base-100" onClick={placeOrder}>
            <LoadingButton isLoading={isPending}>Xác nhận</LoadingButton>
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button id="close_confirm_order">Đóng</button>
      </form>
    </dialog>
  );
};

OrderConfirm.propTypes = {
  items: PropTypes.array.isRequired,
  restaurantId: PropTypes.number.isRequired,
};

export default OrderConfirm;
