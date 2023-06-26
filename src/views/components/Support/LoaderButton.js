import React from "react";
import { Button, Spinner } from "reactstrap";
import { FormattedMessage } from "react-intl";

function LoaderButton({ title }) {
  return (
    <Button color="secondary" className="mr-1 mb-1">
      <Spinner color="white" size="sm" className="mb-25" />
      <span className="ml-25">
        <FormattedMessage id={title} defaultMessage={title} />
      </span>
    </Button>
  );
}

export default LoaderButton;
