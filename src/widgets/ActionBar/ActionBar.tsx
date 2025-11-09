"use client";

import React from "react";

import clsx from "clsx";
import Image from "@/shared/ui/base/Image";

import css from "./ActionBar.module.scss";

interface ActionBarProps {
  className?: string;
}

const leftIconsArray = [
  "/icons/add-note.svg",
  "/icons/stickynote.svg",
  "/icons/message.svg",
  "/icons/received.svg",
];

const rightIconsArray = [
  "/icons/heart-slash.svg",
  "/icons/folder-add.svg",
  "/icons/gallery-add.svg",
];

export const ActionBar: React.FC<ActionBarProps> = ({ className }) => {
  return (
    <div className={clsx(css.action_bar, className)}>
      <div className={css.inner_wrapper}>
        <ul className={css.left_side}>
          {leftIconsArray.map((icons, index) => (
            <li key={index} className={css.icon_block}>
              <Image.Default src={icons} />
            </li>
          ))}
        </ul>
        <div className={css.divider} />
        <ul className={css.right_side}>
          {rightIconsArray.map((icons, index) => (
            <li key={index} className={css.icon_block}>
              <Image.Default src={icons} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
