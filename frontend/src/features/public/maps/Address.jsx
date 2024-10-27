import PropTypes from 'prop-types';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import { MAPBOX_ACCESS_TOKEN } from '../../../utils/constant';

const Address = ({ coordinates }) => {
  const { data: address } = useQuery({
    queryKey: ['reverse-geocode'],
    queryFn: async () => {
      if (!coordinates.lat || !coordinates.long) {
        throw new Error('No coordinate information available');
      }
      return axios
        .get(`https://api.mapbox.com/search/geocode/v6/reverse`, {
          params: {
            latitude: coordinates.lat,
            longitude: coordinates.long,
            access_token: MAPBOX_ACCESS_TOKEN,
          },
        })
        .then((res) => res?.data?.features[0]?.properties?.full_address);
    },
  });
  return address || 'Unknown location';
};

Address.propTypes = {
  coordinates: PropTypes.shape({
    lat: PropTypes.number,
    long: PropTypes.number,
  }),
};

export default Address;
