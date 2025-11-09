"use client";

import React from "react";
import clsx from "clsx";


import css from "./Wrapper.module.scss";

export type WrapperProps = {
  className?: string;
  
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

export const Wrapper: React.FC<WrapperProps> = ({ className, children }) => {
  return (
    <div className={clsx(css.wrapper, className)}>
      {children}
    </div>
  );
};
