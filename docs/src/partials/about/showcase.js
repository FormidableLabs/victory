import React from "react";
import ShowcaseApp from "./showcase-app";
// Images
import IMG538 from "../../../static/showcase-fivethirtyeight.jpg";
import IMGPOSTMARK from "../../../static/showcase-postmark.jpg";
import IMGTUNE from "../../../static/showcase-tune.jpg";
import IMGCUMUL8 from "../../../static/showcase-cumul8.jpg";

const showcaseAppData = [
  {
    company: "FiveThirtyEight",
    screenshot: {
      src: IMG538,
      alt: "FiveThirtyEight screenshot"
    },
    description:
      "FiveThirtyEight uses Victory for data visualizations, including this one about the history of sumo wrestling."
  },
  {
    company: "Postmark",
    screenshot: {
      src: IMGPOSTMARK,
      alt: "Postmark screenshot"
    },
    description:
      "Postmark uses Victory on its status page to let users know how their service is performing."
  },
  {
    company: "Tune",
    screenshot: {
      src: IMGTUNE,
      alt: "Tune screenshot"
    },
    description:
      "Tune uses Victory in its Marketing Console, a tool for marketers to track all of their mobile data."
  },
  {
    company: "Cumul8",
    screenshot: {
      src: IMGCUMUL8,
      alt: "Cumul8 screenshot"
    },
    description:
      "Cumul8 uses Victory for Cirrus, a SaaS platform for businesses to manage their internal data."
  }
];

const Showcase = () => {
  return (
    <div className="Showcases">
      {showcaseAppData.map((app, index) => (
        <ShowcaseApp
          key={index}
          company={app.company}
          screenshot={app.screenshot}
          description={app.description}
        />
      ))}
    </div>
  );
};

export default Showcase;
