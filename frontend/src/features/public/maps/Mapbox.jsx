import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Map, { Marker } from 'react-map-gl';
import { useQueryClient } from '@tanstack/react-query';

import useGlobal from '../../../hooks/useGlobal';
import { MAPBOX_ACCESS_TOKEN } from '../../../utils/constant';

import Address from './Address';
import UpdateMapForm from './UpdateMapForm';

const Mapbox = () => {
  const queryClient = useQueryClient();
  const { dispatch } = useGlobal();
  const [isUpdating, setIsUpdating] = useState(false);
  const [coordinates, setCoordinates] = useState({
    lat: parseFloat(localStorage.getItem('lat')),
    long: parseFloat(localStorage.getItem('long')),
  });

  const [viewState, setViewState] = useState({
    latitude: coordinates.lat,
    longitude: coordinates.long,
    zoom: 15,
  });

  const handleCoordinatesChange = (lat, long) => {
    setCoordinates({ lat, long });
    setViewState((prev) => ({ ...prev, latitude: lat, longitude: long }));
    dispatch({ type: 'SET_COORDINATES', payload: { lat, long } });
    queryClient.invalidateQueries(['reverse-geocode']);
  };

  useEffect(() => {
    if (localStorage.getItem('long') && localStorage.getItem('lat')) return;
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      handleCoordinatesChange(latitude, longitude);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!localStorage.getItem('long') && !localStorage.getItem('lat')) return 'Loading';
  return (
    <div className="w-full">
      <p className="p-2 border rounded-t-lg word-wrap">
        <Address coordinates={coordinates} />
      </p>
      <div className="p-2 mb-2 border rounded-b-lg flex items-center justify-between text-sm">
        <h2 className="text-neutral-500">Wrong address?</h2>

        <button
          className={`btn btn-sm text-base-100 ${isUpdating ? 'btn-primary' : 'btn-info'}`}
          onClick={() => setIsUpdating((prev) => !prev)}
        >
          {isUpdating ? 'OK' : 'Update'}
        </button>
      </div>
      {isUpdating ? (
        <UpdateMapForm initCoordinates={coordinates} reset={handleCoordinatesChange} />
      ) : (
        <Map
          mapLib={import('mapbox-gl')}
          mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
          {...viewState}
          onMove={(evt) => setViewState(evt.viewState)}
          style={{
            height: 400,
            borderRadius: '0.5rem',
          }}
          mapStyle="mapbox://styles/tran-anhtuan/cm2h39h7o00e101pk6u2qcdwi"
        >
          <Marker latitude={coordinates.lat} longitude={coordinates.long} anchor="bottom">
            <img src="/marker.png" alt="marker" className="w-6" />
          </Marker>
        </Map>
      )}
    </div>
  );
};

Mapbox.propTypes = {
  long: PropTypes.number,
  lat: PropTypes.number,
};

export default Mapbox;
