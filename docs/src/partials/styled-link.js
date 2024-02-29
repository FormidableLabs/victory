import Link from "next/link";

export const StyledLink = ({ href, className, children, ...props }) => {
  return (
    <Link href={href} className={className} {...props}>
      {children}
    </Link>
  );
};
