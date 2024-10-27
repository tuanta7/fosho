import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useGlobal from '../../hooks/useGlobal';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';
import { fetchWithAccessToken } from '../../utils/fetchFn';

const UserDishToolbar = ({ itemId }) => {
  const queryClient = useQueryClient();
  const { userId, restaurantId } = useParams();
  const {
    info: { accessToken },
  } = useGlobal();

  const { mutate, isPending } = useMutation({
    mutationFn: (image) => {
      const formData = new FormData();
      formData.append('image', image);

      return fetchWithAccessToken(
        'PATCH',
        `/restaurants/${restaurantId}/items/${itemId}/thumbnail`,
        accessToken,
        formData
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['user-dishes', userId, restaurantId]);
      queryClient.invalidateQueries(['dishes']);
      toast.success('Cập nhật thành công');
    },
  });

  return (
    <form className="flex items-center justify-center">
      <label
        htmlFor={`thumbnail-upload-${itemId}`}
        className="btn btn-xs text-neutral-500 max-w-fit"
      >
        {isPending ? (
          <span className="loading loading-spinner text-primary loading-xs" />
        ) : (
          <PencilSquareIcon className="w-4" />
        )}
      </label>
      <input
        id={`thumbnail-upload-${itemId}`}
        name={`thumbnail-${itemId}`}
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

UserDishToolbar.propTypes = {
  itemId: PropTypes.number.isRequired,
};

export default UserDishToolbar;
