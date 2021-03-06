import React from "react";
import { Button } from "react-bootstrap";

function LineProfileInfo({ className, ...props }) {
  return (
    <div className={`${className} row p-1`}>
      <div className="col-5 text-muted">{props.title}</div>
      <div className="col-7">{props.children}</div>
    </div>
  );
}

export default LineProfileInfo;
