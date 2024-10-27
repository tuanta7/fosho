import PropTypes from 'prop-types';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Map, { Marker } from 'react-map-gl';
import toast from 'react-hot-toast';
import LoadingButton from '../../components/LoadingButton';
import useGlobal from '../../hooks/useGlobal';

import { MAPBOX_ACCESS_TOKEN } from '../../utils/constant';
import axios from 'axios';
import { fetchWithAccessToken } from '../../utils/fetchFn';

const RestaurantCreate = ({ cancel }) => {
  const {
    info: { accessToken },
  } = useGlobal();
  const { userId } = useParams();
  const queryClient = useQueryClient();
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue,
  } = useForm();

  const { mutate: findCoords } = useMutation({
    mutationFn: () => {
      const address = getValues('location.address');
      if (!address) toast.error('Bạn chưa nhập địa chỉ');
      else
        return axios.get(`https://api.mapbox.com/search/geocode/v6/forward`, {
          params: {
            q: address,
            access_token: MAPBOX_ACCESS_TOKEN,
          },
        });
    },
    onSuccess: (data) => {
      const [long, lat] = data.data.features[0].geometry.coordinates;
      setCoordinates({ long: long, lat: lat });
      setViewState({ long: long, lat: lat });
      setValue('long', long);
      setValue('lat', lat);
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (payload) => fetchWithAccessToken('POST', `/restaurants`, accessToken, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user-restaurants', userId],
      });
      toast.success('Thêm cửa hàng thành công');
      cancel();
    },
  });

  const [coordinates, setCoordinates] = useState({
    lat: parseFloat(localStorage.getItem('lat')),
    long: parseFloat(localStorage.getItem('long')),
  });

  const [viewState, setViewState] = useState({
    long: coordinates.long,
    lat: coordinates.lat,
    zoom: 15,
  });

  const form = (
    <div className="flex-1 flex flex-col justify-between">
      <h2 className="font-semibold mb-3 text-lg text-primary">Tạo cửa hàng mới</h2>
      <label className="form-control mb-2">
        <div className="label">
          <span className="label-text">Tên cửa hàng</span>
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
      <label className="form-control mb-2 w-full">
        <div className="label">
          <span className="label-text">
            Địa chỉ chi tiết{' '}
            <span className="text-xs text-neutral-500">
              (VD: AEON Mall, Đường Cổ Linh, Quận Long Biên, Thành phố Hà Nội)
            </span>
          </span>

          <p className="text-red-600 text-sm">{errors?.address?.message}</p>
        </div>
        <input
          type="text"
          className="input input-sm input-bordered"
          {...register('location.address', {
            required: 'Địa chỉ không được để trống',
          })}
        />
      </label>
      <div className="grid grid-cols-3 gap-3">
        <label className="form-control mb-2">
          <div className="label">
            <span className="label-text">Điện thoại</span>
            <p className="text-red-600 text-sm">{errors?.phone?.message}</p>
          </div>
          <input
            type="text"
            className="input input-sm input-bordered"
            {...register('phone', {
              required: '*',
              pattern: {
                value: /^[0-9]{10}$/,
                message: 'Số điện thoại không hợp lệ',
              },
            })}
          />
        </label>
        <label className="form-control mb-2">
          <div className="label">
            <span className="label-text">Giờ mở</span>
            <p className="text-red-600 text-sm">{errors?.open_time?.message}</p>
          </div>
          <input
            type="time"
            className="input input-sm input-bordered"
            {...register('open_time', {
              required: '*',
            })}
          />
        </label>
        <label className="form-control mb-2">
          <div className="label">
            <span className="label-text">Giờ đóng</span>
            <p className="text-red-600 text-sm">{errors?.close_time?.message}</p>
          </div>
          <input
            type="time"
            className="input input-sm input-bordered"
            {...register('close_time', {
              required: '*',
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
    </div>
  );

  const map = (
    <div className="border rounded-xl max-h-[230px] max-w-[400px] overflow-hidden">
      <Map
        mapLib={import('mapbox-gl')}
        mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: 400, height: 300 }}
        mapStyle="mapbox://styles/tran-anhtuan/cm2h39h7o00e101pk6u2qcdwi"
        onClick={(e) => {
          console.log(e.lngLat);
          setCoordinates({
            long: e.lngLat.lng,
            lat: e.lngLat.lat,
          });
          setViewState({
            long: e.lngLat.lng,
            lat: e.lngLat.lat,
          });
          setValue('location.long', e.lngLat.lng);
          setValue('location.lat', e.lngLat.lat);
        }}
      >
        <Marker long={coordinates.long} lat={coordinates.lat} anchor="bottom">
          <img src="/marker.png" alt="marker" className="w-6" />
        </Marker>
      </Map>
    </div>
  );

  const submit = (payload) => {
    console.log(payload);
    mutate(payload);
  };

  return (
    <form
      className="p-4 pt-2 mb-3 border border-neutral-400 rounded-xl"
      onSubmit={handleSubmit(submit)}
      autoComplete="on"
    >
      <div className="flex flex-wrap gap-6 justify-between">
        {form}
        <div className="flex flex-col gap-3">
          {map}
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              className="input input-sm input-bordered"
              placeholder="Vĩ độ"
              {...register('location.lat', {
                required: '*',
              })}
              disabled
            />
            <input
              type="text"
              className="input input-sm input-bordered"
              placeholder="Kinh độ"
              {...register('location.long', {
                required: '*',
              })}
              disabled
            />
          </div>
          <button type="button" className="btn btn-sm" onClick={findCoords}>
            Tìm theo địa chỉ chi tiết
          </button>
        </div>
      </div>
    </form>
  );
};
RestaurantCreate.propTypes = {
  cancel: PropTypes.func.isRequired,
};

export default RestaurantCreate;
