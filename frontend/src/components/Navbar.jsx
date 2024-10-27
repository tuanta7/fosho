import { PropTypes } from 'prop-types';
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  Bars3BottomLeftIcon,
  ShoppingCartIcon,
  MagnifyingGlassIcon,
  ArrowRightEndOnRectangleIcon,
  ChatBubbleBottomCenterTextIcon,
} from '@heroicons/react/24/outline';

import useGlobal from '../hooks/useGlobal';

import Notification from '../features/Notification';

const Navbar = ({ avatar }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const { info } = useGlobal();

  return (
    <nav className="navbar sticky z-20 top-0 bg-base-100 border-b border-base-200">
      <div className="navbar-start flex items-center gap-4 min-w-fit">
        <button className="btn btn-ghost btn-sm">
          <Bars3BottomLeftIcon className="w-5" />
        </button>
        <Link to="/">
          <img src="/text-logo.png" alt="logo" className="w-24" />
        </Link>
      </div>
      <div className="navbar-center gap-4 max-md:hidden w-1/3">
        <div className="flex items-center justify-between border input-bordered rounded-lg w-full">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="input input-sm rounded-lg focus:border-none no-focus w-full"
          />
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => {
              search && navigate(`/search?q=${search}`);
            }}
          >
            <MagnifyingGlassIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="navbar-end flex gap-4 items-center">
        <Notification />
        <NavLink
          to={info.user ? `/users/${info.user.id}/cart` : '/auth/login'}
          className="btn btn-ghost btn-circle btn-sm"
        >
          <ShoppingCartIcon className="w-5" />
        </NavLink>
        <button className="btn btn-ghost btn-circle btn-sm">
          <ChatBubbleBottomCenterTextIcon className="w-5" />
        </button>
        {avatar || (
          <Link to={'/auth/login'} className="btn btn-ghost">
            Login
            <ArrowRightEndOnRectangleIcon className="w-5" />
          </Link>
        )}
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  avatar: PropTypes.node,
};

export default Navbar;
