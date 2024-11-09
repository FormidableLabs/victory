 
import React from "react";
import { FeaturedBadge } from "formidable-oss-badges";

import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export const LandingHero = () => {
  const { siteConfig } = useDocusaurusContext();
  return (
    <div className="hero-pattern w-fill bg-cover bg-no-repeat">
      <div className="py-12 lg:py-24 mx-16 lg:mx-32 xl:mx-64 relative">
        <div className="flex-col md:flex-row flex justify-between gap-16 lg:gap-24 mx-auto">
          <div className="self-center md:self-left">
            <FeaturedBadge name="victory" className="h-[320px] w-[320px]" />
          </div>
          <div className="text-left lg:w-6/12 text-white">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              {siteConfig.title}
            </h1>
            <p className="mt-6 text-lg leading-8">
              {siteConfig.tagline}
            </p>
            <div className="mt-10 flex flex-wrap flex-col xl:flex-row xl:items-center justify-start gap-6">
              <button
                className="overflow-hidden grid-rows-2 md:grid-rows-1 lg:max-w-fit grid lg:grid-cols-6 align-center rounded-md shadow-sm border-none bg-white my-0 py-0 px-0 text-sm font-semibold text-theme-2  cursor-pointer"
                onClick={() =>
                  navigator.clipboard.writeText("npm install victory")
                }
              >
                <code className="max-w-fit py-2.5 pl-3.5 content-center grid-span-12 lg:col-span-4 border-0 bg-white">
                  npm install victory
                </code>
                <span className="w-full lg:min-w-fit col-span-2 capitalize rounded-b-md lg:rounded-l-none lg:!rounded-r-md text-theme-2 bg-theme-1 lg:ml-2 pr-3.5 lg:pl-2.5 py-2.5 h-full">
                  Copy
                </span>
              </button>
            </div>
            <nav className="mt-6">
              <ul className="list-none flex pl-0 gap-2 lg:gap-4">
                <li>
                  <img
                    alt="GitHub Repo stars"
                    src="https://img.shields.io/github/stars/FormidableLabs/Victory?style=for-the-badge&color=%23ffffff"
                  />
                </li>
                <li>
                  <img
                    alt="GitHub Repo watchers"
                    src="https://img.shields.io/github/watchers/FormidableLabs/Victory?style=for-the-badge&color=%23ffffff"
                  />
                </li>
                <li>
                  <img
                    alt="GitHub Repo forks"
                    src="https://img.shields.io/github/forks/FormidableLabs/Victory?style=for-the-badge&color=%23ffffff"
                  />
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};
