import { useRouter } from 'next/navigation';
import { useUserHook } from '@/user/useUserHook';

export const useMaster = () => {
  const router = useRouter();
  const { user, isLoading } = useUserHook();

  const isMaster = user?.profileId === 1;

  const checkAccess = () => {
    if (isLoading) return true;
    if (!user) {
      router.push('/login');
      return false;
    }
    if (user.profileId !== 1) {
      router.push('/dashboard');
      return false;
    }
    return true;
  };

  return {
    user,
    isLoading,
    isMaster,
    checkAccess,
  };
};