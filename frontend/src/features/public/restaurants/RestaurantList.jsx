import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { fetchPublicGet } from '../../../utils/fetchFn';

import LoadingBlock from '../../../components/LoadingBlock';
import RestaurantItem from './RestaurantItem';
import Filter from '../Filter';

const RestaurantList = ({ long, lat }) => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get('q');

  const { data, isLoading, error } = useQuery({
    queryKey: ['restaurants', search],
    queryFn: () =>
      fetchPublicGet(`/restaurants`, {
        lat: lat,
        long: long,
        q: search,
      }),
  });

  const list = (
    <LoadingBlock isLoading={isLoading} error={error} vertical={false}>
      {data?.restaurants.map((r) => (
        <RestaurantItem key={r.id} restaurant={r} />
      ))}
    </LoadingBlock>
  );

  return (
    <div className="flex-1">
      <Filter />
      <div className="flex flex-wrap justify-evenly gap-3 mt-6 px-3">{list}</div>
    </div>
  );
};
RestaurantList.propTypes = {
  long: PropTypes.number,
  lat: PropTypes.number,
};

export default RestaurantList;
