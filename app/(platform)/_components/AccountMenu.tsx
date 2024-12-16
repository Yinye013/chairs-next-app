import React, { useEffect } from 'react';
import { RxAvatar } from 'react-icons/rx';
import { useCurrentUser } from '@/app/hooks/useCurrentUser';
import { useRouter } from 'next/navigation';
import { useSignOut } from '@/app/hooks/useAuth';
import { AnimatePresence, motion } from 'framer-motion';

interface AccountMenuProps {
  visible?: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
  const [greeting, setGreeting] = React.useState<string>('');
  const router = useRouter();
  const { user } = useCurrentUser();
  const { mutate: signOut } = useSignOut();

  const handleSignOut = () => {
    if (user) {
      signOut();
      router.push('/login');
    }

    if (!user) {
      router.push('/login');
    }
  };

  // create a useEffect hook to handle greetings based on the time of day
  useEffect(() => {
    const currentHour = new Date().getHours();
    const updateGreeting = () => {
      if (currentHour < 12) {
        setGreeting('Good morning');
      } else if (currentHour < 16) {
        setGreeting('Good afternoon');
      } else {
        setGreeting('Good evening');
      }
    };
    updateGreeting();
    const interval = setInterval(updateGreeting, 60000);
    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  // render the account menu component
  if (!visible) return null;
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#F9F9F9] text-black absolute top-[6rem] right-[3rem] py-5 flex flex-col border-1 border-gray-200 w-[200px] rounded-md shadow-lg "
        >
          <div className="flex flex-col gap-3">
            <div className="px-3 group/icon flex flex-wrap gap-3  items-center w-full">
              <div className="bg-[#15803d] rounded-full md:p-1 lg:p-2 cursor-pointer">
                <RxAvatar className="text-white" size={15} />
              </div>
              <p className=" text-[1.2rem] group-hover/item:underline">{`${greeting}, ${
                user ? user.name : 'Guest'
              } `}</p>
            </div>
            <hr className="bg-gray-300 border-0 h-px my-4" />
            <div
              className="px-3  text-center text-[1.2rem] hover:underline hover:cursor-pointer"
              onClick={handleSignOut}
            >
              {`${user ? 'Sign Out' : 'Sign In'}`}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AccountMenu;
