"use client";

import React from "react";
import clsx from "clsx";

import css from "./Grid.module.scss";

interface GridProps {
  className?: string;
}

export const Grid: React.FC<GridProps> = ({ className }) => {
  return (
    <div className={clsx(css.grid, className)}>
      <></>
    </div>
  );
};
