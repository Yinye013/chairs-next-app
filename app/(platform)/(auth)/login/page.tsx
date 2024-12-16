'use client';
import React from 'react';
import Logo from '../../_components/Logo';
import Lottie from 'lottie-react';
import WaveAnimation from '@/animations/wave.json';
import Login from './_components/Login';

export default function LoginPage() {
  return (
    <div className="h-screen flex items-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="flex items-center justify-center">
          <Lottie animationData={WaveAnimation} />
        </div>
        <div className="p-5">
          <div className="">
            <Logo />
            <p className="mt-[2rem] text-[1.8rem] md:text-[1.4rem]">
              Log into your account
            </p>
          </div>

          <div className=" pt-[7rem]">
            <Login />
          </div>
        </div>
      </div>
    </div>
  );
}
