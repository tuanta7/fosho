import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import useGlobal from '../../hooks/useGlobal';
import { fetchWithAccessToken } from '../../utils/fetchFn';
import Pagination from '../../components/Pagination';
import RestaurantOrder from './RestaurantOrder';

const RestaurantOrderList = () => {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('PENDING');
  const {
    info: { accessToken },
  } = useGlobal();

  const { restaurantId } = useParams();

  const { data } = useQuery({
    queryKey: ['restaurant-orders', restaurantId, status, page],
    queryFn: () =>
      fetchWithAccessToken(
        'GET',
        `/restaurants/${restaurantId}/orders?limit=10&page=${page}&status=${status}`,
        accessToken
      ),
  });

  const reset = (status) => {
    setPage(1);
    setStatus(status);
  };

  return (
    <div className="container md:px-10">
      <ul className="menu menu-horizontal justify-around gap-3 mb-4 bg-base-200 w-full rounded-lg">
        <li className="">
          <button
            className="btn btn-sm font-semibold w-40"
            onClick={() => reset('PENDING')}
            disabled={status === 'PENDING'}
          >
            Chờ xác nhận
          </button>
        </li>
        <li>
          <button
            className="btn btn-sm font-semibold w-40"
            onClick={() => reset('CONFIRMED')}
            disabled={status === 'CONFIRMED'}
          >
            Đã xác nhận
          </button>
        </li>
        <li>
          <button
            className="btn btn-sm font-semibold w-40"
            onClick={() => reset('PREPARING')}
            disabled={status === 'PREPARING'}
          >
            Đang chuẩn bị
          </button>
        </li>
        <li>
          <button
            className="btn btn-sm font-semibold w-40"
            onClick={() => reset('IN_TRANSIT')}
            disabled={status === 'IN_TRANSIT'}
          >
            Đang vận chuyển
          </button>
        </li>
        <li>
          <button
            className="btn btn-sm font-semibold w-40"
            onClick={() => reset('DELIVERED')}
            disabled={status === 'DELIVERED'}
          >
            Giao thành công
          </button>
        </li>
        <li>
          <button
            className="btn btn-sm font-semibold w-40"
            onClick={() => reset('CANCELLED')}
            disabled={status === 'CANCELLED'}
          >
            Hủy đơn
          </button>
        </li>
      </ul>
      {data?.orders?.map((o) => (
        <RestaurantOrder key={o.id} order={o} />
      ))}
      {data?.orders?.length === 0 && (
        <div className="flex flex-col justify-center items-center font-semibold ">
          <p className="mt-10 text-lg">Nhà hàng chưa có đơn nào</p>
          <img src="/empty-box.svg" alt="empty" className="h-64" />
        </div>
      )}
      <Pagination current={page} setFn={setPage} total={data?.total} />
    </div>
  );
};

export default RestaurantOrderList;
