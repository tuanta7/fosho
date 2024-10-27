import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import {
  BuildingStorefrontIcon,
  FireIcon,
  GiftIcon,
  HomeIcon,
  MagnifyingGlassCircleIcon,
  MapPinIcon,
  TagIcon,
} from '@heroicons/react/24/outline';

import SearchPopup from './SearchPopup';
import Address from './maps/Address';

const Categories = ({ isExpanding }) => {
  const textCSS = 'max-sm:hidden ml-2 max-w-[120px]' + (isExpanding ? ' hidden' : '');

  return (
    <div className="lg:w-[250px] min-w-fit border-r border-base-200 p-3">
      <SearchPopup />
      <ul className="menu gap-3 text-lg bg-base-100 font-medium h-full">
        <li>
          <NavLink to="" className="rounded-lg">
            <HomeIcon className="w-5 h-5" />
            <p className={textCSS}>Home</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="restaurants" className="rounded-lg">
            <BuildingStorefrontIcon className="w-5 h-5" />
            <p className={textCSS}>Restaurants</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="items" className="rounded-lg">
            <FireIcon className="w-5 h-5" />
            <p className={textCSS}>Cuisines</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="offers" className="rounded-lg disabled">
            <TagIcon className="w-5 h-5" />
            <p className={textCSS}>Offers</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="gifts" className="rounded-lg disabled">
            <GiftIcon className="w-5 h-5" />
            <p className={textCSS}>Gifts</p>
          </NavLink>
        </li>
        <li>
          <button
            className="rounded-lg"
            onClick={() => document.getElementById('sidebar-search').showModal()}
          >
            <MagnifyingGlassCircleIcon className="w-5 h-5" />
            <p className={textCSS}>Search</p>
          </button>
        </li>
        <li className="border-t text-sm py-3">
          <div className="gap-2 flex items-center input-bordered text-primary font-semibold ">
            <MapPinIcon className="w-5 h-5" />
            <p className={textCSS}>
              <Address coordinates={{}} />
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
};

Categories.propTypes = {
  isExpanding: PropTypes.bool,
};

export default Categories;
