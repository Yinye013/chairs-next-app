'use client';

import React from 'react';
import Lottie from 'lottie-react';
import HelloAnimation from '@/animations/hello.json';
import Logo from '../../_components/Logo';
import Signup from './_components/Signup';

export default function SignUpPage() {
  return (
    <div className="h-screen flex mt-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="flex items-center">
          <Lottie animationData={HelloAnimation} />
        </div>
        <div className="p-5">
          <div className="mt-[6rem]">
            <Logo />
            <p className="mt-[2rem] text-[1.8rem] md:text-[1.4rem] mb-[3rem]">
              Sign into your account
            </p>
          </div>

          <div className="">
            <Signup />
          </div>
        </div>
      </div>
    </div>
  );
}
