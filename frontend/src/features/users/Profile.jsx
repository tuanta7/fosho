import { Link } from 'react-router-dom';

import useGlobal from '../../hooks/useGlobal';

import ChangeAvatar from './ChangeAvatar';
import ShippingAddressDelete from './ShippingAddressDelete';
import ShippingAddressCreate from './ShippingAddressCreate';

const Profile = () => {
  const {
    info: { user },
  } = useGlobal();

  const shippingAddress = user?.shipping_addresses?.map((s) => (
    <div
      key={s.address}
      className="flex items-center gap-6 justify-between p-2 mb-3 border border-neutral-500 hover:border-info hover:cursor-pointer rounded-lg"
    >
      <div className="w-64 text-sm">
        <h2 className="font-semibold">🏠 {s.name}</h2>
        <p>
          🧑🏼‍💼 {s.receiver_name} - {s.phone}
        </p>
        <p className="break-words">🗺️ {s.address}</p>
      </div>
      <ShippingAddressDelete />
    </div>
  ));

  return (
    <div className="flex-1 flex flex-wrap gap-8">
      <div className="flex flex-col gap-3">
        <div className="flex gap-3">
          <div className="avatar flex flex-col items-end">
            <div className="w-44 h-44 rounded-xl">
              <img src={user?.avarta_url || '/default.svg'} alt="avatar" />
            </div>
            <div className="-mt-44 mb-36">
              <ChangeAvatar userId={user?.id} />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="pl-1">
              <h2 className="font-semibold ">{user?.full_name}</h2>
              <p className=" text-sm">{user?.email}</p>
            </div>
            <button
              className="btn btn-xs max-w-fit min-w-max"
              onClick={() => document.getElementById('shipping_address_create_form').showModal()}
            >
              Thêm địa chỉ giao hàng 🏠
            </button>
            <Link className="btn btn-xs max-w-fit">Đổi mật khẩu 🔑</Link>
          </div>
        </div>
        <div>
          <h2 className="font-semibold mb-2 pl-1 text-sm">Địa chỉ giao hàng</h2>
          <ShippingAddressCreate />
          {user?.shipping_addresses?.length > 0 ? (
            shippingAddress
          ) : (
            <p className="text-neutral-400 text-sm">Bạn chưa thêm địa chỉ giao hàng nào</p>
          )}
        </div>
      </div>
      <div className="flex-1 border border-neutral-400 p-3 rounded-xl">FoshoFeed 🏗️</div>
    </div>
  );
};
Profile.propTypes = {};

export default Profile;
