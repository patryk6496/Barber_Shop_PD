import React from 'react';
import '../App.css';
import image1 from '../Assets/Images/Shearing_module/nozyczki.jpg';
import image2 from '../Assets/Images/Shearing_module/strzyzenie.jpg';

export default function Example() {
  return (
    <div className="bg-white">
      <div className="orange-baner">
        <span className="orange-baner-text">STRZYŻENIE</span>
      </div>
      <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:flex lg:justify-between ">
        <div className="flex flex-col justify-center text-container article-text">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            STRZYŻENIE
          </h2>
          <p className="mt-4 text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,
            purus sit amet luctus venenatis, lectus magna fringilla urna,
            porttitor rhoncus dolor purus non t aliquam, purus sit amet luctus
            venenatis, lectus magna fringilla urna, porttitor rhoncus dolor
            purus non.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#"
              className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              <div className="svg-container">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="215"
                  height="79"
                  viewBox="0 0 215 79"
                  fill="none"
                >
                  <path
                    d="M213.265 39.1323C213.265 44.217 210.44 49.1574 205.117 53.7447C199.796 58.3301 192.052 62.4935 182.419 66.0048C163.157 73.0253 136.498 77.3823 107.015 77.3823C77.532 77.3823 50.8729 73.0253 31.6115 66.0048C21.9778 62.4935 14.2344 58.3301 8.91333 53.7447C3.58999 49.1574 0.765137 44.217 0.765137 39.1323C0.765137 34.0477 3.58999 29.1073 8.91333 24.5199C14.2344 19.9346 21.9778 15.7712 31.6115 12.2598C50.8729 5.23931 77.532 0.882324 107.015 0.882324C136.498 0.882324 163.157 5.23931 182.419 12.2598C192.052 15.7712 199.796 19.9346 205.117 24.5199C210.44 29.1073 213.265 34.0477 213.265 39.1323Z"
                    stroke="black"
                    stroke-width="1.5"
                  />
                  <text
                    x="50%"
                    y="50%"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    fill="black"
                    fontSize="16"
                    fontFamily="Arial"
                  >
                    ZOBACZ WSZYSTKO
                  </text>
                </svg>
                <svg
                  className="svg-animation"
                  xmlns="http://www.w3.org/2000/svg"
                  width="215"
                  height="79"
                  viewBox="0 0 215 79"
                  fill="none"
                >
                  <path
                    d="M213.265 39.1323C213.265 44.217 210.44 49.1574 205.117 53.7447C199.796 58.3301 192.052 62.4935 182.419 66.0048C163.157 73.0253 136.498 77.3823 107.015 77.3823C77.532 77.3823 50.8729 73.0253 31.6115 66.0048C21.9778 62.4935 14.2344 58.3301 8.91333 53.7447C3.58999 49.1574 0.765137 44.217 0.765137 39.1323C0.765137 34.0477 3.58999 29.1073 8.91333 24.5199C14.2344 19.9346 21.9778 15.7712 31.6115 12.2598C50.8729 5.23931 77.532 0.882324 107.015 0.882324C136.498 0.882324 163.157 5.23931 182.419 12.2598C192.052 15.7712 199.796 19.9346 205.117 24.5199C210.44 29.1073 213.265 34.0477 213.265 39.1323Z"
                    stroke="black"
                    stroke-width="1.5"
                  />
                </svg>
              </div>
            </a>
          </div>
        </div>
        <div className="flex justify-center items-center image-container">
          <img
            src={image1}
            alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
            className="rounded-lg bg-gray-100"
          />
          <img
            src={image2}
            alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
            className="rounded-lg bg-gray-100"
          />
        </div>
      </div>
    </div>
  );
}
