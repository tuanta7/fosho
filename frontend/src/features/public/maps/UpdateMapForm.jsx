import PropTypes from 'prop-types';
import { useState } from 'react';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import Map, { Marker } from 'react-map-gl';

import { MAPBOX_ACCESS_TOKEN } from '../../../utils/constant';

import LoadingButton from '../../../components/LoadingButton';

const UpdateMapForm = ({ initCoordinates, reset }) => {
  const [place, setPlace] = useState('');
  const [coordinates, setCoordinates] = useState({
    lat: 21,
    long: 105,
    ...initCoordinates,
  });
  const [viewState, setViewState] = useState({
    latitude: coordinates.lat,
    longitude: coordinates.long,
    zoom: 15,
  });

  const handleCoordinatesChange = (lat, long) => {
    reset(lat, long);
    setCoordinates({ lat, long });
    setViewState({ latitude: lat, longitude: long, zoom: 15 });
  };

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      if (!place) throw new Error('Enter your address');
      return axios.get(`https://api.mapbox.com/search/geocode/v6/forward`, {
        params: {
          q: place,
          access_token: MAPBOX_ACCESS_TOKEN,
        },
      });
    },
    onSuccess: (data) => {
      const [long, lat] = data.data.features[0].geometry.coordinates;
      handleCoordinatesChange(lat, long);
    },
  });

  return (
    <div className="rounded-xl flex flex-col items-center gap-2">
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
        onClick={(e) => {
          const { lng, lat } = e.lngLat;
          handleCoordinatesChange(lat, lng);
        }}
      >
        <Marker latitude={coordinates.lat} longitude={coordinates.long} anchor="bottom">
          <img src="/marker.png" alt="marker" className="w-6" />
        </Marker>
      </Map>
      <div className="grid grid-cols-2 gap-3 w-full">
        <input
          type="text"
          className="input input-sm input-bordered text-center"
          placeholder="Latitude"
          value={coordinates.lat}
          disabled
        />
        <input
          type="text"
          className="input input-sm input-bordered text-center"
          placeholder="Longitude"
          value={coordinates.long}
          disabled
        />
      </div>
      <div className="grid gap-2 w-full">
        <h2 className="text-success font-semibold pl-1">
          Where are you at? 🚵🏼‍♀️{' '}
          <p className="text-xs text-neutral-400">
            (Select on the map to choose or enter in the search box)
          </p>
        </h2>
        <div className="flex gap-3">
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Enter your place here"
            name="current_place"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
          />
          <button className="btn" onClick={() => mutate()}>
            <LoadingButton isLoading={isPending}>🔎</LoadingButton>
          </button>
        </div>
        <button
          className="btn btn-success text-base-100"
          onClick={() => reset(coordinates.lat, coordinates.long)}
        >
          Update
        </button>
      </div>
    </div>
  );
};
UpdateMapForm.propTypes = {
  initCoordinates: PropTypes.object,
  reset: PropTypes.func,
};

export default UpdateMapForm;
