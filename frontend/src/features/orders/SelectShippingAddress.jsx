import PropTypes from 'prop-types';
import { useState } from 'react';
import Map, { Marker } from 'react-map-gl';

import { MAPBOX_ACCESS_TOKEN } from '../../utils/constant';
import useGlobal from '../../hooks/useGlobal';
import ShippingAddressCreate from '../users/ShippingAddressCreate';

const SelectShippingAddress = ({ setFn }) => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const {
    info: { user, coordinates: c },
  } = useGlobal();

  const [coordinates, setCoordinates] = useState({
    long: user?.shipping_addresses[0]?.long || c.long,
    lat: user?.shipping_addresses[0]?.lat || c.lat,
  });

  const [viewState, setViewState] = useState({
    long: coordinates.long,
    lat: coordinates.lat,
    zoom: 16,
  });

  const handleCoordinatesChange = (long, lat) => {
    setCoordinates({ long: long, lat: lat });
    setViewState({ long: long, lat: lat, zoom: 16 });
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <h2 className="text-lg text-primary font-semibold w-full">Điạ chỉ giao hàng</h2>
      <div className="flex gap-3">
        <select
          className="select select-sm select-bordered w-full"
          defaultValue={-1}
          onChange={(e) => {
            const address = user?.shipping_addresses[e.target.value];
            setFn(address.id);
            setSelectedAddress(address);
            handleCoordinatesChange(address.long, address.lat);
          }}
        >
          <option value={-1} disabled>
            Chọn địa chỉ giao hàng
          </option>
          {user?.shipping_addresses?.map((sa, i) => (
            <option key={i} value={i}>
              {sa.name}
            </option>
          ))}
        </select>
        <button
          className="btn btn-sm"
          onClick={() => document.getElementById('shipping_address_create_form').showModal()}
        >
          Thêm mới
        </button>
      </div>
      {selectedAddress && (
        <div className="text-sm border w-full p-2 rounded-lg">
          <h2 className="font-semibold">🏠 {selectedAddress?.name}</h2>
          <p>
            🧑🏼‍💼 {selectedAddress?.receiver_name} - {selectedAddress?.phone}
          </p>
          <p className="break-words">🗺️ {selectedAddress?.address}</p>
        </div>
      )}
      <Map
        mapLib={import('mapbox-gl')}
        mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{
          width: '100%',
          height: '150px',
          borderRadius: '0.5rem',
          border: '1px solid #aaa',
        }}
        mapStyle="mapbox://styles/tran-anhtuan/clwt3dnps01b101qrc1nb8ed3"
      >
        <Marker long={coordinates.long} lat={coordinates.lat} anchor="bottom">
          <img src="/marker.png" alt="marker" className="w-6" />
        </Marker>
      </Map>
      <ShippingAddressCreate />
    </div>
  );
};
SelectShippingAddress.propTypes = {
  setFn: PropTypes.func.isRequired,
};

export default SelectShippingAddress;
