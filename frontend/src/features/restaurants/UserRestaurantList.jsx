import { useState } from 'react';
import useGlobal from '../../hooks/useGlobal';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';
import LoadingBlock from '../../components/LoadingBlock';
import { fetchWithAccessToken } from '../../utils/fetchFn';

import UserRestaurantItem from './UserRestaurantItem';
import RestaurantCreate from './RestaurantCreate';

const UserRestaurantList = () => {
  const [showForm, setShowForm] = useState(false);
  const {
    info: { user, accessToken },
  } = useGlobal();

  const { isPending, data, error } = useQuery({
    queryKey: ['user-restaurants', user.id],
    queryFn: () => fetchWithAccessToken('GET', `/restaurants`, accessToken),
  });

  const content = data?.restaurants?.map((restaurant) => (
    <UserRestaurantItem key={restaurant.id} restaurant={restaurant} />
  ));

  const searchForm = (
    <div className="flex items-center border border-neutral-400 rounded-lg">
      <input
        type="text"
        placeholder="Search"
        className="input input-sm rounded-lg focus:border-none no-focus "
      />
      <button className="btn btn-ghost rounded-lg btn-sm">
        <MagnifyingGlassIcon className="text-neutral-500 w-4 h-4" />
      </button>
    </div>
  );

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex justify-between items-center mb-3 flex-wrap gap-3">
        <div className="flex items-center">
          <h2 className="font-semibold text-xl">Quản lý cửa hàng với</h2>
          <img src="/text-logo.png" className="h-5 inline pl-2" />⚡
        </div>
        <div className="flex gap-3">
          {searchForm}
          <div className="flex gap-3 ">
            <button
              className="btn btn-primary text-base-100 rounded-lg btn-sm"
              onClick={() => setShowForm(!showForm)}
            >
              Thêm mới 🧑🏼‍🍳👩🏼‍🍳
            </button>
          </div>
        </div>
      </div>
      {showForm && <RestaurantCreate cancel={() => setShowForm(false)} />}
      <LoadingBlock number={2} vertical={true} isLoading={isPending} error={error}>
        <div className="flex flex-col gap-6 w-full">
          {content?.length > 0 ? content : <p>Bạn chưa tạo cửa hàng nào 🌆</p>}
        </div>
      </LoadingBlock>
    </div>
  );
};

export default UserRestaurantList;
