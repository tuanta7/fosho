import { PlusIcon } from '@heroicons/react/24/outline';
import PropTypes from 'prop-types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchWithAccessToken } from '../../utils/fetchFn';
import toast from 'react-hot-toast';

import useGlobal from '../../hooks/useGlobal';
import LoadingButton from '../../components/LoadingButton';

const AddToCartBar = ({ dishId }) => {
  const queryClient = useQueryClient();
  const {
    info: { accessToken },
  } = useGlobal();

  const { isPending, mutate } = useMutation({
    mutationFn: () => {
      if (!accessToken) return (window.location.href = '/auth/login');
      return fetchWithAccessToken('POST', `/carts`, accessToken, {
        quantity: 1,
        dish_id: dishId,
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries(['carts']);
      toast.success('Đã thêm vào giỏ hàng');
    },
  });

  const handleClick = () => {
    mutate();
  };

  return (
    <button className="btn btn-xs" onClick={handleClick}>
      <LoadingButton isLoading={isPending}>
        <PlusIcon className="w-3" />
      </LoadingButton>
    </button>
  );
};

AddToCartBar.propTypes = {
  dishId: PropTypes.number.isRequired,
};

export default AddToCartBar;
