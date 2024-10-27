import PropTypes from "prop-types";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";

const Pagination = ({ current, setFn, total }) => {
  const handlePrev = () => {
    setFn(current - 1);
  };

  const handleNext = () => {
    setFn(current + 1);
  };

  if (total === 0) total = 1;

  return (
    <div className="join mt-4 flex justify-center">
      <button
        className="join-item btn btn-xs"
        disabled={current === 1}
        onClick={handlePrev}
      >
        <ChevronDoubleLeftIcon className="w-3 h-3" />
      </button>
      <button className="join-item btn btn-xs px-6">
        Trang {current} / {total}
      </button>
      <button
        className="join-item btn btn-xs"
        onClick={handleNext}
        disabled={current >= total}
      >
        <ChevronDoubleRightIcon className="w-3 h-3" />
      </button>
    </div>
  );
};

Pagination.propTypes = {
  current: PropTypes.number.isRequired,
  setFn: PropTypes.func,
  total: PropTypes.number,
};

export default Pagination;
