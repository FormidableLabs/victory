import { StyledLink } from "@/partials/styled-link";

const SidebarListItemLink = ({ className, ...props }) => {
  const classNames = [
    "block text-2xl text-[#bc5240] tracking-wide hyphens-auto leading-9",
    "pt-2 pr-4 pb-1.5 pl-14",
    className,
  ];

  return (
    <StyledLink className={classNames.join(" ")} {...props} />
  );
};

export default SidebarListItemLink;
