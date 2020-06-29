import React, { useState } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import Playground from "component-playground";
import Helmet from "react-helmet";
import { assign } from "lodash";
import { withRouteData } from "react-static";
import { Link } from "react-router-dom";
import createPath from "../helpers/path-helpers";

import Button from "../partials/button";

import config from "../../static-config-helpers/site-data";
import Page from "../partials/page";
import PlaygroundContainer from "../partials/markdown/playground-container";
import PureRender from "../partials/guides/themes/pure-render";
import DemoComponent from "../partials/guides/themes/demo-component";
import GrayscaleExample from "../partials/guides/themes/grayscale.example";
import MaterialExample from "../partials/guides/themes/material.example";
import styled from "styled-components";

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 4rem;
  text-align: center;

  button {
    margin-top: 2rem;
  }

  h2 {
    font-weight: normal;
    font-size: 2.4rem;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 0 auto;
  max-width: 56rem;
  width: 100%;
`;

const ThemesTemplate = props => {
  const [themeName, setThemeName] = useState("grayscale");
  const [edited, setEdited] = useState(false);

  const themeTexts = {
    grayscale: GrayscaleExample,
    material: MaterialExample
  };

  const processCodeText = text => {
    return text
      .replace(/\/\* [global|eslint|NOTE](.|[\n])*?\*\//g, "") // remove dev comments
      .trim(); // remove left-over whitespace
  };

  const resetTheme = theme => {
    setThemeName(theme);
    setEdited(false);
  };

  const getCodeText = () => {
    return processCodeText(themeTexts[themeName]);
  };

  // eslint-disable-next-line react/no-multi-comp
  const renderMenu = () => {
    return (
      <Menu>
        <ButtonRow>
          <Button className="btn" onClick={() => resetTheme("grayscale")}>
            reset to <b>grayscale</b>
          </Button>
          <Button className="btn" onClick={() => resetTheme("material")}>
            reset to <b>material</b>
          </Button>
        </ButtonRow>
        <h2>
          Viewing the {themeName}
          {edited ? "*" : ""} theme
        </h2>
      </Menu>
    );
  };

  const { doc, sidebarContent } = props;
  const { title } = doc.data;

  return (
    <Page withSidebar sidebarContent={sidebarContent}>
      <Helmet>
        <title>{`${config.siteTitle} |  ${title}`}</title>
        <meta name="description" content={config.siteDescription} />
      </Helmet>
      {/* <Seo postPath={slug} postNode={contents} postSEO />*/}
      {/* TODO: Add edit this page link once everything is merged to master
              <a className="SubHeading" href="">Edit this page</a>
            */}
      <h1>Themes</h1>
      <p>
        Try out the Victory themes and make your own. Check out the{" "}
        <Link to={createPath("docs/victory-theme/")}>
          VictoryTheme documentation
        </Link>{" "}
        more details on themes.
      </p>
      {renderMenu()}
      <PureRender themeName={themeName} edited={edited}>
        <pre className="u-noMarginTop u-noPadding">
          <div className="Interactive" onKeyPress={() => setEdited(true)}>
            <PlaygroundContainer>
              <Playground
                codeText={getCodeText()}
                scope={{
                  React,
                  ReactDOM,
                  assign,
                  DemoComponent
                }}
                theme="elegant"
                noRender={false}
              />
            </PlaygroundContainer>
          </div>
        </pre>
      </PureRender>
    </Page>
  );
};

ThemesTemplate.propTypes = {
  children: PropTypes.array,
  doc: PropTypes.shape({
    data: PropTypes.object
  }),
  sidebarContent: PropTypes.array
};

export default withRouteData(ThemesTemplate);
