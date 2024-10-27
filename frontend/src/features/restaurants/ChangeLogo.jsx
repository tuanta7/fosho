import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchWithAccessToken } from '../../utils/fetchFn';

import useGlobal from '../../hooks/useGlobal';
import toast from 'react-hot-toast';

const ChangeLogo = () => {
  const queryClient = useQueryClient();
  const { userId, restaurantId } = useParams();
  const {
    info: { accessToken },
  } = useGlobal();

  const { mutate, isPending } = useMutation({
    mutationFn: (image) => {
      const formData = new FormData();
      formData.append('logoFile', image);

      return fetchWithAccessToken(
        'PATCH',
        `/restaurants/${restaurantId}/logo`,
        accessToken,
        formData
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['restaurants']);
      queryClient.invalidateQueries(['user-restaurants', userId, restaurantId]);
      toast.success('Cập nhật logo thành công');
    },
  });

  return (
    <form className="flex items-center justify-center">
      <label htmlFor="avatar-upload" className="btn btn-xs text-neutral-500 max-w-fit">
        {isPending ? (
          <span className="loading loading-spinner text-primary loading-xs" />
        ) : (
          <PencilSquareIcon className="w-4" />
        )}
      </label>
      <input
        id="avatar-upload"
        name="avatar"
        type="file"
        className="hidden"
        accept="image/*"
        onChange={(e) => {
          console.log(e.target.files[0]);
          if (e.target.files[0]) {
            mutate(e.target.files[0]);
          }
        }}
      />
    </form>
  );
};
ChangeLogo.propTypes = {
  restaurantId: PropTypes.number,
};

export default ChangeLogo;
