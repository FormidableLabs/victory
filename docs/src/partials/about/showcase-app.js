import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import LazyImage from "../lazy-image";

const Img = styled(LazyImage)`
  max-width: 100%;
  box-shadow: -1.2rem 1.2rem 0px 0px ${({ theme }) => theme.color.brown};
  margin: 0 0 1.2rem 1.2rem;
  padding-right: 1.2rem;
`;

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

const ShowcaseApp = props => {
  return (
    <Grid>
      <div>
        <Company>{props.company}</Company>
        {props.description}
      </div>
      <Img
        minHeight={200}
        alt={props.screenshot.alt}
        src={props.screenshot.src}
      />
    </Grid>
  );
};

ShowcaseApp.propTypes = {
  company: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  screenshot: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
  })
};

export default ShowcaseApp;
