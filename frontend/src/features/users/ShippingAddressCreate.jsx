import { useState } from 'react';
import { Map, Marker } from 'react-map-gl';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import LoadingButton from '../../components/LoadingButton';
import { fetchWithAccessToken } from '../../utils/fetchFn';
import useGlobal from '../../hooks/useGlobal';
import { MAPBOX_ACCESS_TOKEN } from '../../utils/constant';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const ShippingAddressCreate = () => {
  const [coordinates, setCoordinates] = useState({
    long: parseFloat(localStorage.getItem('long')) || 105.8342,
    lat: parseFloat(localStorage.getItem('lat')) || 21.0278,
  });

  const [viewState, setViewState] = useState({
    long: coordinates.long,
    lat: coordinates.lat,
    zoom: 15,
  });

  const { register, handleSubmit, errors, getValues } = useForm();

  const onSubmit = (payload) => {
    mutate({
      ...payload,
      long: coordinates.long,
      lat: coordinates.lat,
    });
  };

  const handleCoordinatesChange = (long, lat) => {
    setCoordinates({ long: long, lat: lat });
    setViewState({ ...viewState, long: long, lat: lat });
  };

  const { mutate: find, isPending: isFinding } = useMutation({
    mutationFn: () => {
      const place = getValues('address');
      if (!place) {
        throw new Error('Vui lòng nhập địa chỉ cụ thể');
      }
      return axios.get(
        `https://api.mapbox.com/search/geocode/v6/forward?q=${place}&access_token=${MAPBOX_ACCESS_TOKEN}`
      );
    },
    onSuccess: (data) => {
      handleCoordinatesChange(
        data.data.features[0].geometry.coordinates[0],
        data.data.features[0].geometry.coordinates[1]
      );
    },
  });

  const queryClient = useQueryClient();
  const {
    info: { accessToken },
  } = useGlobal();

  const { mutate, isPending } = useMutation({
    mutationFn: (payload) => fetchWithAccessToken('POST', `/addresses`, accessToken, payload),
    onSuccess: () => {
      queryClient.invalidateQueries(['info']);
      document.getElementById('close_shipping_address').click();
    },
  });

  return (
    <dialog id="shipping_address_create_form" className="modal">
      <div className="modal-box rounded-xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-primary font-semibold mb-2">Thêm địa chỉ giao hàng mới</h2>
          <div className="grid grid-cols-2 gap-3">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Người nhận</span>
                <p className="text-red-600 text-sm">{errors?.receiver_name?.message}</p>
              </div>
              <input
                type="text"
                className="input input-sm input-bordered"
                {...register('receiver_name', {
                  required: 'Tên người nhận không được để trống',
                })}
              />
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Số điện thoại</span>
                <p className="text-red-600 text-sm">{errors?.phone?.message}</p>
              </div>
              <input
                type="text"
                className="input input-sm input-bordered"
                {...register('phone', {
                  required: 'Số điện thoại không được để trống',
                })}
              />
            </label>
          </div>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Tên gợi nhớ</span>
              <p className="text-red-600 text-sm">{errors?.name?.message}</p>
            </div>
            <input
              type="text"
              className="input input-sm input-bordered"
              {...register('name', {
                required: '*',
              })}
            />
          </label>
          <label className="form-control w-full  mb-3">
            <div className="label">
              <span className="label-text">Địa chỉ chi tiết</span>
              <p className="text-red-600 text-sm">{errors?.address?.message}</p>
            </div>
            <input
              type="text"
              className="input input-sm input-bordered"
              {...register('address', {
                required: '*',
              })}
            />
          </label>
          <Map
            mapLib={import('mapbox-gl')}
            mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
            {...viewState}
            onMove={(evt) => setViewState(evt.viewState)}
            style={{
              width: '100%',
              height: 200,
              borderRadius: '0.5rem',
            }}
            mapStyle="mapbox://styles/tran-anhtuan/clwt3dnps01b101qrc1nb8ed3"
            onClick={(e) => {
              handleCoordinatesChange(e.lngLat.lng, e.lngLat.lat);
            }}
          >
            <Marker long={coordinates.long} lat={coordinates.lat} anchor="bottom">
              <img src="/marker.png" alt="marker" className="w-6" />
            </Marker>
          </Map>
          <div className="grid grid-cols-7 gap-3 mt-3 w-full">
            <input
              type="text"
              className="input input-sm input-bordered col-span-3"
              placeholder="Kinh độ"
              value={coordinates.long}
              disabled
            />
            <input
              type="text"
              className="input input-sm input-bordered col-span-3"
              placeholder="Vĩ độ"
              value={coordinates.lat}
              disabled
            />
            <button
              className="btn btn-sm"
              onClick={(e) => {
                e.preventDefault();
                find();
              }}
            >
              <LoadingButton isLoading={isFinding}>
                <MagnifyingGlassIcon className="w-4" />
              </LoadingButton>
            </button>
          </div>
          <div className="flex flex-row-reverse gap-3 mt-4">
            <button
              className="btn btn-primary text-base-100 rounded-lg btn-sm"
              type="submit"
              disabled={isPending}
            >
              <LoadingButton isLoading={isPending}>Xác nhận</LoadingButton>
            </button>
            <button
              className="btn btn-ghost rounded-lg btn-sm"
              type="reset"
              onClick={() => {
                document.getElementById('close_shipping_address').click();
              }}
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button id="close_shipping_address">Đóng</button>
      </form>
    </dialog>
  );
};

export default ShippingAddressCreate;
