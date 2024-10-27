import PropTypes from "prop-types";
import { useState } from "react";
import CartItem from "./CartItem";
import TotalBar from "./TotalBar";
import { BuildingStorefrontIcon } from "@heroicons/react/24/outline";

const CartRestaurant = ({ items }) => {
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [checkAll, setCheckAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);

  return (
    <div className="w-full flex flex-col gap-3 mb-6 border border-neutral-300 pb-3 rounded-xl">
      <div className="flex items-center gap-5 px-4 py-3 border-b border-neutral-300">
        <input
          type="checkbox"
          className="checkbox checkbox-md [--chkbg:oklch(var(--p))] [--chkfg:oklch(var(--b1))]"
          value={items[0].restaurant_id}
          checked={checkAll}
          onChange={(e) => {
            setCheckAll(e.target.checked);
            Array.from(
              document.getElementsByClassName(
                `checkbox-${items[0].restaurant_id}`
              )
            ).forEach((checkbox) => {
              checkbox.checked = e.target.checked;
            });
            if (e.target.checked) {
              const total = items.reduce((acc, item) => {
                return (
                  acc + (item.dish.price - item.dish.discount) * item.quantity
                );
              }, 0);
              const discount = items.reduce((acc, item) => {
                return acc + item.dish.discount * item.quantity;
              }, 0);
              setTotal(total);
              setDiscount(discount);
              setCheckedItems(items);
            } else {
              setTotal(0);
              setDiscount(0);
              setCheckedItems([]);
            }
          }}
        />
        <h2 className="font-semibold col-span-4 flex items-center gap-2">
          <BuildingStorefrontIcon className="w-4" />
          <span>{items[0].restaurant_name}</span>
        </h2>
      </div>
      {items.map((item) => (
        <div
          key={item.id}
          className="w-full flex items-center gap-3 p-4 rounded-xl"
        >
          <input
            type="checkbox"
            className={`checkbox checkbox-md [--chkbg:oklch(var(--p))] [--chkfg:oklch(var(--b1))] checkbox-${items[0].restaurant_id}`}
            value={item.id}
            onChange={(e) => {
              const afterDiscount =
                (item.dish.price - item.dish.discount) * item.quantity;
              if (e.target.checked) {
                setDiscount(discount + item.dish.discount * item.quantity);
                setTotal(total + afterDiscount);
                setCheckedItems([...checkedItems, item]);
              } else {
                setDiscount(discount - item.dish.discount * item.quantity);
                setTotal(total - afterDiscount);
                setCheckedItems(checkedItems.filter((i) => i.id !== item.id));
              }
            }}
          />
          <CartItem item={item} />
        </div>
      ))}
      <TotalBar
        total={total}
        discount={discount}
        items={checkedItems}
        restaurantId={items[0].restaurant_id}
      />
    </div>
  );
};

CartRestaurant.propTypes = {
  items: PropTypes.array.isRequired,
};

export default CartRestaurant;
