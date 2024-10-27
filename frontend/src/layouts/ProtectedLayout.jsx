import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

import useGlobal from '../hooks/useGlobal';
import { fetchWithAccessToken, fetchWithCredentials } from '../utils/fetchFn';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Avatar from '../features/users/Avatar';
import ProfileSidebar from '../features/ProfileSidebar';

const ProtectedLayout = () => {
  const navigate = useNavigate();
  const { info, dispatch } = useGlobal();

  const { data, error, refetch } = useQuery({
    queryKey: ['info'],
    queryFn: () => fetchWithAccessToken('GET', `/info`, info.accessToken),
    meta: { DisableGlobalErrorHandling: true },
    retry: 0,
  });

  useEffect(() => {
    if (data) {
      dispatch({ type: 'SET_USER', payload: data.user });
    } else if (error) {
      console.log('Try to refresh token');
      fetchWithCredentials('POST', `/refresh`)
        .then((data) => {
          dispatch({ type: 'LOGIN', payload: data });
          console.log('Refreshed token successfully!!!');
        })
        .catch((error) => {
          console.log('Error refreshing token: ', error);
          navigate('/auth/login');
        });
    }
  }, [data, dispatch, error, refetch, navigate]);

  const UserAvatar = info.user && <Avatar user={info.user} />;

  return (
    <div className="w-full h-screen bg-base-100 min-w-fit overflow-auto">
      <Navbar UserAvatar={UserAvatar} />
      <div className="w-full py-6 px-3 flex gap-6 min-h-[80vh]">
        <ProfileSidebar />
        {info.accessToken && <Outlet />}
      </div>
      <Footer />
    </div>
  );
};
ProtectedLayout.propTypes = {
  children: PropTypes.any,
};

export default ProtectedLayout;
