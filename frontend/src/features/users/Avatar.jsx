import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  UserCircleIcon,
  BuildingStorefrontIcon,
  ArchiveBoxIcon,
} from '@heroicons/react/24/outline';

import Logout from '../auth/Logout';

const Avatar = ({ user }) => {
  return (
    <details className="dropdown dropdown-bottom dropdown-end hover:cursor-pointer">
      <summary className="m-1">
        <div className="avatar online">
          <div className="w-8 rounded-full ring-2 ring-secondary ring-offset-base-100 ring-offset-1">
            <img src={user.avatar_url || '/default.svg'} />
          </div>
        </div>
      </summary>
      <ul className="shadow menu dropdown-content z-[99] bg-base-100 rounded-box min-w-max">
        <p className="mx-4 mt-2 mb-6">{`🫡 Xin chào, ${user.full_name}`}</p>
        <li>
          <Link to={`/users/${user.id}/info`} className="pr-12 rounded-lg mb-2">
            <UserCircleIcon className="w-5" /> Thông tin cá nhân
          </Link>
        </li>
        <li>
          <Link to={`/users/${user.id}/orders`} className="pr-12 rounded-lg mb-2">
            <ArchiveBoxIcon className="w-5" /> Đơn mua
          </Link>
        </li>
        <li>
          <Link to={`/users/${user.id}/restaurants`} className="pr-12 rounded-lg mb-2">
            <BuildingStorefrontIcon className="w-5" /> Kênh người bán
          </Link>
        </li>
        <li>
          <Logout />
        </li>
      </ul>
    </details>
  );
};
Avatar.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Avatar;
