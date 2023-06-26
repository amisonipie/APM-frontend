import React, { useState } from "react";

export default function useStateRef(defaultValue) {
  const [state, setState] = useState(defaultValue);
  const ref = React.useRef(state);
  const dispatch = React.useCallback((val) => {
    ref.current = typeof val === "function" ? val(ref.current) : val;
    setState(ref.current);
  }, []);

  return [state, dispatch, ref];
}
