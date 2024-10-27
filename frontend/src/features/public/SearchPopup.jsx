import Address from './maps/Address';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const SearchPopup = () => {
  return (
    <dialog id="sidebar-search" className="modal">
      <div className="modal-box bg-base-100 bg-opacity-90 p-4">
        <h3 className="pl-1 font-semibold mb-3">What do you want to eat today? 🍕🍔🍟🥟</h3>
        <div className="flex items-center justify-between border border-base-content rounded-lg bg-base-100 w-full mb-3">
          <input
            type="text"
            placeholder="Tìm nhà hàng, món ăn..."
            className="input input-sm rounded-lg focus:border-none no-focus w-full"
          />
          <button className="btn btn-ghost rounded-lg btn-sm">
            <MagnifyingGlassIcon className="w-4 h-4" />
          </button>
        </div>
        <p className="pl-1 text-sm">
          <span className="font-semibold text-primary">Current location: </span>
          <Address coordinates={{}} />
        </p>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button></button>
      </form>
    </dialog>
  );
};
SearchPopup.propTypes = {};

export default SearchPopup;
