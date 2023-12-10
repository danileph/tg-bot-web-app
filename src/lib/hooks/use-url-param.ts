import { useLayoutEffect, useState } from "react";

export const useUrlParam = (paramName: string) => {
  const [paramValue, setParamValue] = useState<string>("");

  useLayoutEffect(() => {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const _paramValue = params.get(paramName);
    setParamValue(_paramValue ?? "");
  }, []);

  return paramValue;
};
