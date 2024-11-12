import React from "react";
import { LinkButton } from "../../components/link-button";

import robustFeature from "./assets/feature-robust.png";
import flexibleFeature from "./assets/feature-flexible.png";
import nativeFeature from "./assets/feature-native.png";

const list = [
  {
    imgSrc: robustFeature,
    alt: "Robust",
    title: "Robust",
    body: "Area charts. Scatter plots. Voronoi polygons. Easy-to-use components for complex charting.",
  },
  {
    imgSrc: flexibleFeature,
    alt: "Flexible",
    title: "Flexible",
    body: "Fully contained, reusable data visualization elements are responsible for their own styles and behaviors.",
  },
  {
    imgSrc: nativeFeature,
    alt: "Native",
    title: "Native",
    body: "Extend the Victory experience on Android and iOS platforms with an identical API.",
  },
];

export const LandingFeatures = () => (
  <div className="flex flex-col text-left mx-16 lg:mx-32 xl:mx-64 my-6">
    <h2 className="my-8 text-4xl font-semibold text-center">Features</h2>
    <ul className="grid grid-cols-3 items-start content-start justify-items-start justify-between gap-12 list-none pl-0">
      {list.map(({ alt, body, imgSrc, title }) => (
        <li
          className="col-span-3 md:col-span-1 flex flex-col items-center text-center"
          key={alt}
        >
          <img src={imgSrc} alt={alt} className="max-h-72" />
          <span className="mt-8 text-2xl font-semibold">{title}</span>
          <span className="mt-2 text-lg leading-8 mx-3">{body}</span>
        </li>
      ))}
    </ul>
    <LinkButton
      link="/open-source/victory/docs/introduction"
      className="mx-auto my-6"
    >
      Documentation
    </LinkButton>
  </div>
);
