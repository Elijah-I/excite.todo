import { Loader } from "components/Loader/Loader";
import React from "react";

interface Props {
  isLoading: boolean;
  children: React.ReactNode;
}

export const WithLoader = ({ isLoading, children }: Props) => {
  return isLoading ? <Loader /> : <>{children}</>;
};
