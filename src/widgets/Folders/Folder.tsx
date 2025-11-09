"use client";

import clsx from "clsx";
import Image from "../../shared/ui/base/Image";

import css from "./Folders.module.scss";

interface FoldersProps {
  className?: string;
  folderName?: string;
}

export const Folders: React.FC<FoldersProps> = ({ className, folderName }) => {
  return (
    <div className={clsx(css.folders, className)}>
      <div className={css.folders_name}>
        <p>{folderName}</p>
      </div>

      <div className={css.dropdown_wrapper}>
        <Image.Default src="/icons/arrow-down.svg" className={css.arrow_icon} />
      </div>
    </div>
  );
};
