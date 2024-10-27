import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import Map, { Marker } from 'react-map-gl';
import { ClipboardDocumentCheckIcon, Cog8ToothIcon, PencilIcon } from '@heroicons/react/24/outline';

import useGlobal from '../../hooks/useGlobal';
import { MAPBOX_ACCESS_TOKEN } from '../../utils/constant';
import { fetchWithAccessToken } from '../../utils/fetchFn';
import UserDishList from '../dishes/UserDishList';
import ChangeLogo from './ChangeLogo';
import { isOpen } from '../../utils/common';
import RestaurantOrderNotification from './RestaurantOrderNotification';

const RestaurantDetail = () => {
  const {
    info: { user, accessToken },
  } = useGlobal();

  const { restaurantId } = useParams();

  const { data } = useQuery({
    queryKey: ['user-restaurants', restaurantId],
    queryFn: () => fetchWithAccessToken('GET', `/restaurants/${restaurantId}`, accessToken),
  });

  console.log(data);

  const isOwner = data ? data?.restaurant?.owner_id === user?.id : false;

  const isOpenNow = isOpen(
    data?.restaurant?.is_active,
    data?.restaurant?.open_time,
    data?.restaurant?.close_time
  );

  const map = data && (
    <Map
      mapLib={import('mapbox-gl')}
      mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
      initialViewState={{
        ...data.restaurant.location,
        zoom: 16,
      }}
      style={{
        width: 320,
        height: 180,
        borderRadius: '0.5rem',
      }}
      mapStyle="mapbox://styles/tran-anhtuan/cm2h39h7o00e101pk6u2qcdwi"
    >
      <Marker
        long={data.restaurant.location.long}
        lat={data.restaurant.location.lat}
        anchor="bottom"
      >
        <img src="/marker.png" alt="marker" className="w-6" />
      </Marker>
    </Map>
  );

  return (
    <div className="flex-1 overflow-auto">
      {isOwner && (
        <div className="flex justify-between items-center mb-3">
          <Link
            to={isOwner ? `/users/${user?.id}/restaurants` : `/restaurants`}
            className="btn btn-sm"
          >
            🔙 Toàn bộ
          </Link>
          <div className="flex gap-2 items-center">
            <RestaurantOrderNotification restaurantId={restaurantId} />
            <Link to="orders" className="btn btn-sm">
              Đơn hàng
              <ClipboardDocumentCheckIcon className="h-4" />
            </Link>
            <button className="btn btn-sm">
              <PencilIcon className="h-4" />
            </button>
            <button className="btn btn-sm">
              <Cog8ToothIcon className="w-4" />
            </button>
          </div>
        </div>
      )}
      <div className="flex justify-between items-start gap-6 flex-wrap mb-3">
        <div className="flex items-start gap-3">
          <div className="avatar flex flex-col items-end">
            <div className="w-44 h-44 border border-base-200 rounded-xl overflow-hidden">
              <img src={data?.restaurant?.logo_url || '/no-img.png'} alt="Logo" />
            </div>
            {isOwner && (
              <div className="-mt-44 mb-36">
                <ChangeLogo />
              </div>
            )}
          </div>
          <div className="w-fit">
            <p>
              {isOpenNow ? (
                <span className="text-green-500 font-semibold">🟢 Đang mở cửa</span>
              ) : (
                <span className="text-red-500 font-semibold">🔴 Chưa mở cửa</span>
              )}
            </p>
            <h2 className="font-semibold text-2xl">{data?.restaurant?.name}</h2>
            <h3 className="mb-2">{data?.restaurant?.address}</h3>
            <p className="mb-1">☎️ Điện thoại: {data?.restaurant?.phone}</p>
            <p className="mb-1">
              {`🕙 Giờ hoạt động: ${data?.restaurant?.open_time} - ${data?.restaurant?.close_time}`}
            </p>
            <p className="mr-2">
              {data?.restaurant.rating ? (
                `Đánh giá: ${data?.restaurant?.rating}⭐`
              ) : (
                <span className="text-neutral-400">⭐ Chưa có đánh giá</span>
              )}
            </p>
          </div>
        </div>
        {map}
      </div>
      <UserDishList isOwner={isOwner} />
    </div>
  );
};
RestaurantDetail.propTypes = {};

export default RestaurantDetail;
