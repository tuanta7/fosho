import { NavLink } from 'react-router-dom';

import useGlobal from '../hooks/useGlobal';

const ProfileSidebar = () => {
  const {
    info: { user },
  } = useGlobal();

  return (
    <div className="min-w-fit">
      <ul className="menu gap-2 bg-base-200 rounded-lg pr-2">
        <li>
          <NavLink to={`/users/${user?.id}/info`} className="rounded-lg">
            🕵🏼 <p className="max-md:hidden"> Hồ sơ</p>
          </NavLink>
        </li>
        <li>
          <NavLink to={`/users/${user?.id}/orders`} className="rounded-lg">
            💴 <p className="max-md:hidden"> Đơn mua</p>
          </NavLink>
        </li>
        <li>
          <NavLink to={`/users/${user?.id}/carts`} className="rounded-lg">
            🛍️ <p className="max-md:hidden"> Giỏ hàng</p>
          </NavLink>
        </li>
        <li>
          <NavLink to={`/users/${user?.id}/restaurants`} className="rounded-lg">
            🛎️ <p className="max-md:hidden"> Cửa hàng</p>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default ProfileSidebar;
