import React from "react";
import { Loader } from "components/Loader/Loader";
import type { Size } from "types/loader";

interface Props {
  isLoading: boolean;
  size: Size;
  children: React.ReactNode;
}

export const WithLoader = ({ isLoading, size, children }: Props) => {
  return isLoading ? <Loader size={size} /> : <>{children}</>;
};
