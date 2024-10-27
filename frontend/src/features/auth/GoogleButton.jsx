import { useMutation } from '@tanstack/react-query';

import LoadingButton from '../../components/LoadingButton';

const GoogleButton = () => {
  const { isPending, mutate } = useMutation({
    mutationFn: async () => {
      const res = await fetch('http://localhost:8080/', {
        method: 'GET',
        redirect: 'manual',
      });
      window.location.href = res.url;
      return res.url;
    },
  });

  const handleClick = () => {
    mutate();
  };

  return (
    <button className="btn border bg-base-200 rounded-xl w-full" onClick={handleClick}>
      <LoadingButton isLoading={isPending}>
        <span className="text-neutral-600">Continue with Google</span>
      </LoadingButton>
      <img src="/google.svg" className="h-6 w-6" />
    </button>
  );
};

export default GoogleButton;
