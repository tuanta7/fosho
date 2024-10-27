import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';

import { fetchPublicGet } from '../../../utils/fetchFn';

import DishItem from '../../../components/DishItem';
import AddToCartBar from '../../cart/AddToCartBar';
import Pagination from '../../../components/Pagination';
import LoadingBlock from '../../../components/LoadingBlock';
import Filter from '../Filter';

const ItemList = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get('q') || '';

  const [page, setPage] = useState(1);
  const { isPending, data, error } = useQuery({
    queryKey: ['items', page, search],
    queryFn: () =>
      fetchPublicGet(`/items`, {
        limit: 8,
        page: page,
        q: search,
      }),
  });

  const searchResult = search && (
    <div className="flex items-center gap-2 ml-12">
      <p className="text-sm font-semibold">
        Search results for: <span className="text-primary font-semibold">&quot;{search}&quot;</span>
      </p>
      <button
        className="btn btn-xs btn-ghost btn-circle text-primary p-0 -mb-1"
        onClick={() => {
          searchParams.delete('q');
          window.history.replaceState({}, '', window.location.pathname);
          window.location.reload();
        }}
      >
        <XMarkIcon className="w-3 h-3" />
      </button>
    </div>
  );

  return (
    <div className="flex-1">
      <Filter />
      {searchResult}
      <div className="flex flex-wrap justify-evenly gap-6 mb-10">
        <LoadingBlock isLoading={isPending} error={error}>
          {data?.dishes?.map((d) => (
            <DishItem key={d.id} dish={d} buttonBar={<AddToCartBar dishId={d.id} />} />
          ))}
        </LoadingBlock>
      </div>
      <Pagination current={page} setFn={setPage} total={data?.total} />
    </div>
  );
};

export default ItemList;
