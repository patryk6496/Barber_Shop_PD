import React from 'react';

export default function Example() {
  return (
    <div className="quotes-container">
      <div className="mx-auto max-w-2xl flex flex-col-reverse md:flex-row gap-8 items-center px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8">
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-3xl font-bold tracking-tight  sm:text-4xl quote">
            Naszą ambicją jest, abyś opuścił program z nowym obrazem siebie.
          </h2>
          <p className="mt-20  author">Richard Davidson,</p>
          <p className="mt-2 explain-author text-white">
            Odpowiedzialny za pokaz w Montpellier
          </p>
        </div>
        <div className="flex-1">
          <p className="explain-quote">
            Czysta broda, wyrzeźbione wąsy, spersonalizowane strzyżenie,
            ukierunkowane zabiegi - pielęgnacja to sztuka dbania o siebie.
            Przyjdź do nas z lub bez jasnego pomysłu na swój przyszły wygląd...
          </p>
        </div>
      </div>
    </div>
  );
}
