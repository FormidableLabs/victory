 
import React from "react";

import AirbnbLogo from "../../../static/logos/logo-airbnb.svg";
import ViacomLogo from "../../../static/logos/logo-viacom.svg";
import FiveThirtyEightLogo from "../../../static/logos/logo-fivethirtyeight.svg";
import UsaFactsLogo from "../../../static/logos/logo-usafacts.svg";
import RedfinLogo from "../../../static/logos/logo-redfin.svg";
import TuneLogo from "../../../static/logos/logo-tune.svg";
import ZillowLogo from "../../../static/logos/logo-zillow.svg";
import BenaroyaLogo from "../../../static/logos/logo-benaroya.svg";

const logoClass = "max-h-[100px] max-w-[200px] self-center justify-self-center";

export function LandingShowcase() {
  return (
    <div className="px-8 lg:px-16 pt-6 pb-16 bg-[#f0f0f0]">
      <h2 className="my-8 text-4xl font-semibold text-center dark:text-black">
        A Few of Our Fans
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-4">
        <AirbnbLogo className={logoClass} />
        <FiveThirtyEightLogo className={logoClass} />
        <RedfinLogo className={logoClass} />
        <UsaFactsLogo className={logoClass} />
        <ViacomLogo className={logoClass} />
        <BenaroyaLogo className={logoClass} />
        <ZillowLogo className={logoClass} />
        <TuneLogo className={logoClass} />
      </div>
    </div>
  );
}
