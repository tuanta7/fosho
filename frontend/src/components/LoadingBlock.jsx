import PropTypes from "prop-types";
import toast from "react-hot-toast";
import Skeleton from "../components/Skeleton";

const LoadingBlock = ({ number, isLoading, error, children, vertical }) => {
  const blockClassNames =
    "flex-1 flex gap-6" + (vertical ? " flex-col" : " justify-evenly");

  if (isLoading) {
    return (
      <div className={blockClassNames}>
        {Array.from({ length: number || 3 }).map((_, index) => (
          <Skeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    const serverError = error.response?.data?.message;
    toast.error(serverError || error.message);
    return serverError || error.message;
  }

  return children;
};
LoadingBlock.propTypes = {
  vertical: PropTypes.bool,
  number: PropTypes.number,
  isLoading: PropTypes.bool,
  error: PropTypes.object,
  children: PropTypes.node,
};

export default LoadingBlock;
