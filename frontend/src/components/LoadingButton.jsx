import PropTypes from "prop-types";
const LoadingButton = ({ isLoading, children }) => {
  if (isLoading) {
    return <span className="loading loading-spinner loading-xs" />;
  }

  return children;
};
LoadingButton.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.any,
};

export default LoadingButton;
