import { useQuery } from '@tanstack/react-query';

import useGlobal from '../../hooks/useGlobal';
import { fetchWithAccessToken } from '../../utils/fetchFn';
import LoadingBlock from '../../components/LoadingBlock';
import CartGroupByRestaurant from './CartGroupByRestaurant';

const Cart = () => {
  const {
    info: { accessToken },
  } = useGlobal();

  const { data } = useQuery({
    queryKey: ['carts'],
    queryFn: () => fetchWithAccessToken('GET', `/carts`, accessToken),
  });

  const groupedItems = groupByRestaurantId(data?.order_items);

  return (
    <div className="flex-1 flex flex-col items-center gap-3 min-w-max">
      <div className="w-full flex items-center gap-3 border border-neutral-300 rounded-xl py-2 pl-4">
        <input type="checkbox" className="checkbox checkbox-md" checked disabled />
        <div className="w-full grid grid-cols-6 place-items-center gap-6 font-semibold text-sm px-3">
          <p className="col-span-2 justify-self-start">Món ăn</p>
          <p>Giá</p>
          <p>Số lượng</p>
          <p>Tổng</p>
          <p>Thao tác</p>
        </div>
      </div>
      <LoadingBlock>
        {data?.order_items &&
          Object.keys(groupedItems).map((key) => {
            return <CartGroupByRestaurant key={key} items={groupedItems[key]} />;
          })}
      </LoadingBlock>
    </div>
  );
};

function groupByRestaurantId(items) {
  if (!items) return {};
  const groupedItems = {};
  items.forEach((item) => {
    if (!groupedItems[item.restaurant_id]) {
      groupedItems[item.restaurant_id] = [];
    }
    groupedItems[item.restaurant_id].push(item);
  });
  return groupedItems;
}

export default Cart;
