import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';

import LoadingButton from '../../components/LoadingButton';
import { fetchWithAccessToken } from '../../utils/fetchFn';
import useGlobal from '../../hooks/useGlobal';

const DishCreate = ({ cancel }) => {
  const queryClient = useQueryClient();
  const { userId, restaurantId } = useParams();
  const {
    info: { accessToken },
  } = useGlobal();

  const { mutate, isPending } = useMutation({
    mutationFn: (payload) =>
      fetchWithAccessToken('POST', `/restaurants/${restaurantId}/items`, accessToken, payload),
    onSuccess: () => {
      queryClient.invalidateQueries(['user-dishes', userId, restaurantId]);
      queryClient.invalidateQueries(['dishes']);
      toast.success('Tạo món thành công');
      cancel();
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      discount: 0,
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <form
      className="p-3 mb-3 border border-neutral-400 rounded-xl"
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="on"
    >
      <h2 className="font-semibold mb-3 pl-1 text-primary">Thêm món mới</h2>
      <div className="grid max-sm:grid-cols-1 grid-cols-3 gap-3">
        <label className="form-control mb-2">
          <div className="label">
            <span className="label-text">Tên món</span>
            <p className="text-red-600 text-sm">{errors?.name?.message}</p>
          </div>
          <input
            type="text"
            className="input input-sm input-bordered"
            {...register('name', {
              required: 'Tên không được để trống',
            })}
          />
        </label>
        <label className="form-control mb-2 sm:col-span-2">
          <div className="label">
            <span className="label-text">Mô tả</span>
            <p className="text-red-600 text-sm">{errors?.description?.message}</p>
          </div>
          <input
            type="text"
            className="input input-sm input-bordered"
            {...register('description')}
          />
        </label>
      </div>
      <div className="grid grid-cols-4 max-sm:grid-cols-1 gap-3">
        <label className="form-control mb-2">
          <div className="label">
            <span className="label-text">Giá gốc</span>
            <p className="text-red-600 text-sm">{errors?.price?.message}</p>
          </div>
          <input
            type="number"
            className="input input-sm input-bordered"
            {...register('price', {
              required: '*',
              min: {
                value: 0,
                message: 'Giá không được âm',
              },
            })}
          />
        </label>
        <label className="form-control mb-2">
          <div className="label">
            <span className="label-text">Chiết khấu</span>
            <p className="text-red-600 text-sm">{errors?.discount?.message}</p>
          </div>
          <input
            type="numnber"
            className="input input-sm input-bordered"
            {...register('discount', {
              required: '*',
              min: {
                value: 0,
                message: 'Chiết khấu không được âm',
              },
              validate: (value) =>
                parseFloat(value) < parseFloat(getValues('price')) ||
                'Chiết khấu không được lớn hơn giá',
            })}
          />
        </label>

        <label className="form-control mb-2">
          <div className="label">
            <span className="label-text">
              Đơn vị <span className="text-xs text-neutral-500">(VD: Hộp, suất...)</span>
            </span>
            <p className="text-red-600 text-sm">{errors?.unit?.message}</p>
          </div>
          <input
            type="text"
            className="input input-sm input-bordered"
            {...register('unit', {
              required: '*',
            })}
          />
        </label>
        <label className="form-control mb-2">
          <div className="label">
            <span className="label-text">Kho</span>
            <p className="text-red-600 text-sm">{errors?.stock?.message}</p>
          </div>
          <input
            type="numnber"
            className="input input-sm input-bordered"
            {...register('stock', {
              required: '*',
              min: {
                value: 0,
                message: 'Số lượng trong kho không được âm',
              },
            })}
          />
        </label>
      </div>
      <div className="flex flex-row-reverse gap-3 mt-4">
        <button
          className="btn btn-primary text-base-100 rounded-lg btn-sm"
          type="submit"
          disabled={isPending}
        >
          <LoadingButton isLoading={isPending}>Xác nhận</LoadingButton>
        </button>
        <button className="btn btn-ghost rounded-lg btn-sm" type="reset" onClick={cancel}>
          Hủy
        </button>
      </div>
    </form>
  );
};
DishCreate.propTypes = {
  cancel: PropTypes.func.isRequired,
};

export default DishCreate;
