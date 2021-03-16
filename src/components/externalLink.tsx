import * as React from "react"
import { ReactNode } from "react"
import PropTypes from "prop-types"

type ExternalLinkProps = {
  className?: string; 
  href: string; 
  title: string; 
  children?: ReactNode;
  isMobile?: "mobile" | "desktop";
}

const ExternalLink = ({ className, href, title, children }:ExternalLinkProps) => {
    return (
      <a className={className} href={href} title={title} aria-label={title} target="_blank" rel="noreferrer noopener">{children}</a>
    )
    }

    ExternalLink.propTypes= {
      className: PropTypes.string,
      href: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      }
      
      export default ExternalLink