import { useEffect, useState } from "react";

export default function Gallery() {
  const [rand1, setRand1] = useState();
  const setRandomValues = () => {
    const random = Math.floor(Math.random() * (15 - 1 + 1) + 1);
    setRand1(random);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setRandomValues();
    }, 5000);
    return () => clearTimeout(timer);
  });

  useEffect(() => {
    setRand1(10);
  }, []);
  return (
    <div className="relative flex w-full h-full test-border ">
      <div className="wiggle-pattern-container wiggle-svg"></div>
      <div className="nft-card-1 animation-from-top">
        <div
          key={rand1 + 3}
          className={`animation-fade nft-card-img mb-md bg-p${
            rand1 - 3 < 1 ? rand1 + 3 : rand1 - 3
          }`}
        ></div>
        <div className="rarity-label">
          <span className="white font-md weight-500">Phanatic #{rand1 - 3 < 1 ? rand1 + 3 : rand1 - 3}</span>
        </div>
      </div>
      <div className={`nft-card-2 animation-from-right`}>
        <div
          key={rand1 + 5}
          className={`animation-fade nft-card-img mb-md bg-p${
            rand1 - 5 < 1 ? rand1 + 5 : rand1 - 5
          }`}
        ></div>
        <div className="rarity-label">
          <span className="white font-md weight-500">Phanatic #{rand1 - 5 < 1 ? rand1 + 5 : rand1 - 5}</span>
        </div>
      </div>
      <div className="nft-card-3 animation-from-bottom">
        <div
          key={rand1}
          className={`animation-fade nft-card-img mb-md bg-p${rand1}`}
        ></div>
        <div className="rarity-label">
          <span className="font-md weight-500">Phanatic #{rand1}</span>
        </div>
      </div>
    </div>
  );
}
