import Logo from '../../_components/Logo';
import ClientLottie from '@/app/components/ClientLottie';
import Login from './_components/Login';

export default function LoginPage() {
  return (
    // min-h, not h-screen: the form is taller than the viewport on small
    // phones, and a fixed height would clip it. `py` gives breathing room when
    // it does overflow instead of pinning content to the edges.
    <div className="min-h-screen flex items-center justify-center py-[4.8rem]">
      <div className="w-full max-w-[100rem] grid grid-cols-1 lg:grid-cols-2 gap-[3.2rem] lg:gap-[6.4rem] items-center">
        {/* Decorative only — hidden below lg rather than stacked, where it
            pushed the form a full screen down and read as dead space. */}
        <div className="hidden lg:flex items-center justify-center">
          <ClientLottie src="/animations/wave.json" />
        </div>

        <div className="w-full max-w-[44rem] mx-auto lg:mx-0">
          <Logo />
          <p className="mt-[1.6rem] mb-[3.2rem] text-[1.6rem] text-[#6b6b6b]">
            Log into your account
          </p>

          <Login />
        </div>
      </div>
    </div>
  );
}
