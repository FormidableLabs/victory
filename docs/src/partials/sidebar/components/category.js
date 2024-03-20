import React from "react";
import isEmpty from "lodash/isEmpty";

import {
  SidebarSectionHeading,
  SidebarSectionList,
  SidebarSectionSublist,
} from "../styles";

const Category = ({ content, title, subCategories }) => {
  if (isEmpty(subCategories) && isEmpty(content)) {
    return null;
  }
  const sectionContent =
    !isEmpty(subCategories) &&
    subCategories
      .filter((category) => category && !isEmpty(category.content))
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

export default Category;
