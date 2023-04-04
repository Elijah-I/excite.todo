export enum URL_FILTER_OPTIONS {
  "ALL" = "",
  "NEW" = "new",
  "DONE" = "done"
}

export interface UrlSearchParams {
  search?: string;
  option?: URL_FILTER_OPTIONS;
}
