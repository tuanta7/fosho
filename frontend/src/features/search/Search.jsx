import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { fetchPublicGet } from '../../utils/fetchFn';

import LoadingBlock from '../../components/LoadingBlock';
import RestaurantResult from './RestaurantResult';
import DishResult from './DishResult';

const Search = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get('q');

  const { isPending, data, error } = useQuery({
    queryKey: ['search', search],
    queryFn: () => fetchPublicGet(`/search?q=${search}`),
  });

  return (
    <LoadingBlock isLoading={isPending} error={error} number={3} vertical={false}>
      <div className="flex-1 flex flex-col gap-3 px-6">
        <p>
          Search results for:{' '}
          <span className="text-primary font-semibold">&quot;{search}&quot;</span>
        </p>
        {data?.restaurants.length === 0 && data?.dishes.length === 0 && (
          <p className="text-primary font-semibold">No matching results found</p>
        )}
        <RestaurantResult restaurants={data?.restaurants} search={search} />
        <DishResult dishes={data?.dishes} search={search} />
      </div>
    </LoadingBlock>
  );
};
Search.propTypes = {};

export default Search;
