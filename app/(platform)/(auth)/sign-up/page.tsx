import ClientLottie from '@/app/components/ClientLottie';
import Logo from '../../_components/Logo';
import Signup from './_components/Signup';

export default function SignUpPage() {
  return (
    // Mirrors the login page — see the notes there. The sign-up form is the
    // taller of the two, so min-h matters more here.
    <div className="min-h-screen flex items-center justify-center py-[4.8rem]">
      <div className="w-full max-w-[100rem] grid grid-cols-1 lg:grid-cols-2 gap-[3.2rem] lg:gap-[6.4rem] items-center">
        <div className="hidden lg:flex items-center justify-center">
          <ClientLottie src="/animations/hello.json" />
        </div>

        <div className="w-full max-w-[44rem] mx-auto lg:mx-0">
          <Logo />
          <p className="mt-[1.6rem] mb-[3.2rem] text-[1.6rem] text-[#6b6b6b]">
            Sign into your account
          </p>

          <Signup />
        </div>
      </div>
    </div>
  );
}
