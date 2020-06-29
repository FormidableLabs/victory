import React from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";

import {
  SidebarSectionHeading,
  SidebarSectionList,
  SidebarSectionSublist
} from "../styles";

const Category = ({ content, title, subCategories }) => {
  if (isEmpty(subCategories) && isEmpty(content)) {
    return null;
  }
  const sectionContent =
    !isEmpty(subCategories) &&
    subCategories
      .filter(category => category && !isEmpty(category.content))
      .map((subcategory, index) => {
        return (
          <div key={index}>
            <SidebarSectionHeading>{subcategory.title}</SidebarSectionHeading>
            <SidebarSectionSublist>{subcategory.content}</SidebarSectionSublist>
          </div>
        );
      });

  return (
    <>
      <SidebarSectionHeading>{title}</SidebarSectionHeading>
      <SidebarSectionList>{content}</SidebarSectionList>
      {sectionContent}
    </>
  );
};

Category.propTypes = {
  content: PropTypes.array,
  subCategories: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      content: PropTypes.array
    })
  ),
  title: PropTypes.string
};

export default Category;
