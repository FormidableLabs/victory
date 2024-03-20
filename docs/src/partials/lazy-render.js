import React from "react";
import { useInView } from "react-cool-inview";

const LazyRender = ({ LazyRenderedComponent, className, ...rest }) => {
  const { observe, inView } = useInView({
    unobserveOnEnter: true,
    rootMargin: "50px",
  });

  return (
    <div className={className} ref={observe}>
      {inView && <LazyRenderedComponent {...rest} />}
    </div>
  );
};

export default LazyRender;
