import Image from "next/image";
import React from "react";
import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(28rem, 1fr));
  grid-gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: 6rem;
`;

const Company = styled.h3`
  font-size: 2.4rem;
  margin-top: 0;
  margin-bottom: 0.5rem;
`;

const ShowcaseApp = (props) => {
  return (
    <Grid>
      <div>
        <Company>{props.company}</Company>
        {props.description}
      </div>
      <Image
      
        alt={props.screenshot.alt}
        src={props.screenshot.src}
        className="w-full pr-5 mr-5 mb-5 feature-img"
      />
    </Grid>
  );
};

export default ShowcaseApp;
