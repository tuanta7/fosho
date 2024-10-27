import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';

import useGlobal from '../hooks/useGlobal';
import { fetchWithAccessToken, fetchWithCredentials } from '../utils/fetchFn';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Categories from '../features/public/Categories';
import Avatar from '../features/users/Avatar';
import MapDrawer from '../features/public/maps/MapDrawer';

const PublicLayout = () => {
  const { info, dispatch } = useGlobal();

  const { data, error } = useQuery({
    queryKey: ['info'],
    queryFn: () => fetchWithAccessToken('GET', `/info`, info.accessToken),
    meta: { DisableGlobalErrorHandling: true },
    retry: 0,
  });

  useEffect(() => {
    if (data) dispatch({ type: 'SET_USER', payload: data.user });
    else if (error) {
      fetchWithCredentials('POST', `/refresh`)
        .then((data) => dispatch({ type: 'LOGIN', payload: data }))
        .catch((error) => console.log('Error refreshing token: ', error));
    }
  }, [data, dispatch, error]);

  return (
    <div className="w-full h-screen bg-base-100 overflow-x-hidden">
      <Navbar UserAvatar={info.user && <Avatar user={info.user} />} />
      <div className="w-full flex">
        <Categories />
        <div className="flex-1 p-4">
          <div className="min-h-[80vh]">
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>

      <MapDrawer />
    </div>
  );
};

export default PublicLayout;
