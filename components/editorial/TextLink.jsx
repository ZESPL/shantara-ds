import React from "react";
import { Button } from "../core/Button.jsx";
import { Icon } from "../core/Icon.jsx";

/* A grid-aligned text link with a hairline and an arrow, the only "more" link on the
   website. It is Button variant="link" with the arrow built in. */
export function TextLink({ children, arrow = true, ...rest }) {
  return (
    <Button data-ds-id="editorial/TextLink" variant="link" endIcon={arrow ? <Icon name="arrow-right" size={16} /> : undefined} {...rest}>{children}</Button>
  );
}
