import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

import LoadingButton from '../../components/LoadingButton';
import useGlobal from '../../hooks/useGlobal';
import { fetchWithAccessTokenAndCredentials } from '../../utils/fetchFn';
import { BASE_URL } from '../../utils/constant';

const Logout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { info, dispatch } = useGlobal();
  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      fetchWithAccessTokenAndCredentials('POST', `${BASE_URL}/logout`, info.accessToken),
    onSuccess: () => {
      queryClient.clear();
      toast.success('Đăng xuất thành công');
      dispatch({ type: 'LOGOUT' });
      navigate('/auth/login');
    },
  });

  const handleLogout = () => {
    mutate();
  };

  return (
    <button className="pr-12 rounded-lg" onClick={handleLogout}>
      <LoadingButton isLoading={isPending}>
        <ArrowRightStartOnRectangleIcon className="w-5" />
      </LoadingButton>
      Đăng xuất
    </button>
  );
};

export default Logout;
