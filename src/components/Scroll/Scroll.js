import React, { useRef, useEffect } from "react";

export const ScrollDown = () => {
  const elementRef = useRef();
  useEffect(() => {
    if (elementRef !== undefined) {
      elementRef.current.scrollIntoView();
    }
  });
  return <div ref={elementRef} />;
};
