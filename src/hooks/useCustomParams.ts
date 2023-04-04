import { useSearchParams } from "react-router-dom";
import { UrlSearchParams } from "types/url.search.params";

export const useCustomParams = (): [
  Required<UrlSearchParams>,
  (params: UrlSearchParams) => void
] => {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  const setCustomParams = (params: UrlSearchParams) => {
    Object.entries(params).forEach(([param, value]) => {
      if (value) {
        if (searchParams.has(param)) searchParams.set(param, value);
        else searchParams.append(param, value);
      } else {
        searchParams.delete(param);
      }
    });

    setSearchParams(searchParams);
  };

  return [{ search }, setCustomParams];
};
