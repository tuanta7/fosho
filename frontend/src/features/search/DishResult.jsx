import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import DishItem from '../../components/DishItem';
import AddToCartBar from '../cart/AddToCartBar';

const DishResult = ({ dishes, search }) => {
  if (dishes.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col">
      <div className="mb-3 flex justify-between items-center">
        <h1 className="text-primary font-semibold">Results</h1>
        <Link to={`/dishes?q=${search}`} className="btn-xs btn">
          See more
        </Link>
      </div>
      <div className="flex gap-6">
        {dishes.map((d) => (
          <DishItem key={d.id} dish={d} buttonBar={<AddToCartBar dishId={d.id} />} />
        ))}
      </div>
    </div>
  );
};
DishResult.propTypes = {
  dishes: PropTypes.array,
  search: PropTypes.string,
};

export default DishResult;
