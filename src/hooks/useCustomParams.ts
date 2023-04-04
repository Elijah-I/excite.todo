import { useSearchParams } from "react-router-dom";
import { URL_FILTER_OPTIONS, UrlSearchParams } from "types/url.search.params";

export const useCustomParams = (): [
  Required<UrlSearchParams>,
  (params: UrlSearchParams) => void
] => {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const option =
    (searchParams.get("option") as URL_FILTER_OPTIONS) ||
    URL_FILTER_OPTIONS.ALL;

  const setCustomParams = (params: UrlSearchParams) => {
    Object.entries(params).forEach(([param, value]) => {
      if (param === "option" && value === URL_FILTER_OPTIONS.ALL) {
        value = "";
      }

      if (value) {
        if (searchParams.has(param)) searchParams.set(param, value);
        else searchParams.append(param, value);
      } else {
        searchParams.delete(param);
      }
    });

    setSearchParams(searchParams);
  };

  return [{ search, option }, setCustomParams];
};
