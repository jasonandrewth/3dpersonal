import React, { PropsWithChildren } from "react";

interface ExternalLinkProps extends PropsWithChildren {
  rel?: string;
  target?: string;
  href: string;
  ariaLabel: string;
  classes: string;
}

const ExternalLink: React.FC<ExternalLinkProps> = ({
  rel = "nofollow noopener noreferrer",
  target = "_blank",
  href,
  ariaLabel,
  classes,
  children,
}) => {
  return (
    <a
      className={classes}
      aria-label={ariaLabel}
      href={href}
      rel={rel}
      target={target}
    >
      {children}
    </a>
  );
};

export default ExternalLink;
