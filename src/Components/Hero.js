import React from 'react';
import '../App.css'

const Hero = () => {
  return (
    <div className="relative isolate px-6 pt-14 lg:px-8 bg-black">
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-white ring-1 ring-white">
            Od 1989{' '}
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            <span className="text-white">
              SALON DLA {" "}
            </span>
            <span className="text-transparent bg-orange-500 bg-clip-text inline-block">
              MĘŻCZYZN
            </span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-white">
            Masz ochotę przyciąć brodę, odświeżyć fryzurę i dać się rozpieścić? To jest miejsce dla Ciebie.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6 ">
            <a
              href="#"
              className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-orange-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 "
            >
              ZOBACZ WSZYSTKO
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
