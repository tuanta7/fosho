import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
const AuthLayout = () => {
  // Try to refresh tokens before rendering the layout
  // If the refresh fails, the user will be redirected to the login page
  // TODO: Implement refresh token logic

  return (
    <div className="w-full flex flex-col justify-between h-screen bg-base-100">
      <div className="navbar bg-base-100 px-10">
        <a className="text-xl min-w-24" href="/">
          <img src="/text-logo.png" alt="logo" className="w-24" />
        </a>
      </div>
      <div className="flex-1 bg-[#FE2053] flex justify-evenly items-center px-3">
        <img src="/auth-bg.png" alt="auth-bg" className="w-1/3 max-lg:hidden" />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
AuthLayout.propTypes = {};

export default AuthLayout;
