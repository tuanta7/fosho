import { MapPinIcon } from '@heroicons/react/24/outline';
import Mapbox from './Mapbox';

const MapDrawer = () => {
  return (
    <div className="drawer drawer-end max-w-fit fixed top-32 right-6">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label
          htmlFor="my-drawer-4"
          className="drawer-button btn btn-sm btn-ghost btn-circle border border-success"
        >
          <MapPinIcon className="w-5 h-5 text-success" />
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="bg-base-100 text-base-content min-h-fit rounded-lg w-96 p-4">
          <Mapbox />
        </div>
      </div>
    </div>
  );
};

export default MapDrawer;
