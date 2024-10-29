import React from "react";
import { RxAvatar } from "react-icons/rx";
import { useCurrentUser } from "@/app/hooks/useCurrentUser";
import { useRouter } from "next/navigation";
import { useSignOut } from "@/app/hooks/useAuth";
import { AnimatePresence, motion } from "framer-motion";

interface AccountMenuProps {
  visible?: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
  const router = useRouter();
  const { user } = useCurrentUser();
  const { mutate: signOut } = useSignOut();

  const handleSignOut = () => {
    if (user) {
      signOut();
      router.push("/login");
    }

    if (!user) {
      router.push("/login");
    }
  };

  if (!visible) return null;
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#F9F9F9] text-black absolute top-[6rem] right-0 py-5 flex flex-col border-1 border-gray-200 w-[150px] rounded-md shadow-lg "
        >
          <div className="flex flex-col gap-3">
            <div className="px-3 group/icon flex flex-wrap gap-3  items-center w-full">
              <div className="bg-[#15803d] rounded-full md:p-1 lg:p-2 cursor-pointer">
                <RxAvatar className="text-white" size={15} />
              </div>
              <p className=" text-[1.2rem] group-hover/item:underline">{`Hello, ${user ? user.name : "Guest"} `}</p>
            </div>
            <hr className="bg-gray-300 border-0 h-px my-4" />
            <div
              className="px-3  text-center text-[1.2rem] hover:underline hover:cursor-pointer"
              onClick={handleSignOut}
            >
              {`${user ? "Sign Out" : "Sign In"}`}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AccountMenu;
