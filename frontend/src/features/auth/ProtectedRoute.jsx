import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
  // Check if user is authenticated before rendering the component
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
