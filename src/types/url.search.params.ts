export enum URL_FILTER_OPTIONS {
  "ALL" = "all",
  "NEW" = "new",
  "DONE" = "done"
}

export interface UrlSearchParams {
  search?: string;
  option?: URL_FILTER_OPTIONS;
}
