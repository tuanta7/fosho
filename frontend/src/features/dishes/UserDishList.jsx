import PropTypes from 'prop-types';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';

import useGlobal from '../../hooks/useGlobal';
import { fetchWithAccessToken } from '../../utils/fetchFn';

import LoadingBlock from '../../components/LoadingBlock';
import DishItem from '../../components/DishItem';
import UserDishToolbar from './UserDishToolbar';
import DishCreate from './DishCreate';
import AddToCartBar from '../cart/AddToCartBar';

const UserDishList = ({ isOwner }) => {
  const [showForm, setShowForm] = useState(false);
  const { restaurantId, userId } = useParams();
  const {
    info: { accessToken },
  } = useGlobal();

  const { isPending, data, error } = useQuery({
    queryKey: ['user-dishes', userId, restaurantId],
    queryFn: () => fetchWithAccessToken('GET', `/restaurants/${restaurantId}/items`, accessToken),
  });

  const search = (
    <div className="flex items-center justify-between border rounded-lg bg-base-100 w-full">
      <input
        type="text"
        placeholder="Tìm món ăn"
        className="input input-sm rounded-lg focus:border-none no-focus w-full"
      />
      <button className="btn btn-ghost rounded-lg btn-sm">
        <MagnifyingGlassIcon className="w-4 h-4" />
      </button>
    </div>
  );

  return (
    <div className="mt-6 p-4 rounded-xl border-2 border-base-200">
      <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
        <h2 className="font-semibold text-xl text-primary pl-2">🍽️ Thực đơn</h2>
        <div className="flex gap-3">
          {search}
          {isOwner && (
            <button
              className="btn btn-sm btn-primary text-base-100"
              onClick={() => setShowForm(!showForm)}
            >
              Thêm món mới
            </button>
          )}
        </div>
      </div>
      {showForm && <DishCreate cancel={() => setShowForm(false)} />}
      <LoadingBlock number={3} isPending={isPending} error={error}>
        <div className="p-2 flex gap-10 justify-evenly flex-wrap">
          {data?.dishes?.map((d) => (
            <DishItem
              key={d.id}
              dish={d}
              buttonBar={
                isOwner ? <UserDishToolbar dishId={d.id} /> : <AddToCartBar dishId={d.id} />
              }
              isOwner={isOwner}
            />
          ))}
        </div>
      </LoadingBlock>
    </div>
  );
};

UserDishList.propTypes = {
  isOwner: PropTypes.bool,
};

export default UserDishList;
