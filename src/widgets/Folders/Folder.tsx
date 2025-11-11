"use client";

import React, { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import Image from "../../shared/ui/base/Image";

import css from "./Folders.module.scss";

interface FoldersProps {
  className?: string;
  folderName?: string;
}

const dropdownArray = [
  { id: 1, name: "Export to Figma", icon: "/icons/figma.svg" },
  { id: 2, name: "Share" },
  { id: 3, name: "Add to Folder" },
  { id: 4, name: "Delete" },
];

const userFoldersArray = [
  { id: 1, name: "Bank App", count: "145" },
  { id: 2, name: "Dashboard  AI", count: "815" },
  { id: 3, name: "E-commerce", count: "68" },
  { id: 4, name: "Hero Section", count: "1128" },
];

export const Folders: React.FC<FoldersProps> = ({ className, folderName }) => {
  const [open, setOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen((prev) => !prev);
    if (submenuOpen) setSubmenuOpen(false);
  };

  const handleItemClick = (e: React.MouseEvent, itemName: string) => {
    e.stopPropagation();
    if (itemName === "Add to Folder") {
      setSubmenuOpen((prev) => !prev);
      setOpen(true);
    } else {
      setSubmenuOpen(false);
      setOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        setSubmenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className={clsx(css.folders, className)}>
      <div className={css.folders_name}>
        <p>{folderName}</p>
      </div>

      <div
        ref={dropdownRef}
        className={clsx(css.dropdown_wrapper, open && css.open)}
        onClick={toggleDropdown}
      >
        <Image.Default src="/icons/arrow-down.svg" className={css.arrow_icon} />

        <ol className={clsx(css.dropdown_menu, open && css.open)}>
          {dropdownArray.map((item) => (
            <li
              key={item.id}
              className={css.dropdown_item}
              onClick={(e) => handleItemClick(e, item.name)}
            >
              <span>{item.name}</span>
              {item.icon && (
                <Image.Default src={item.icon} className={css.item_icon} />
              )}
            </li>
          ))}

          <div className={clsx(css.submenu, submenuOpen && css.open)}>
            <div className={css.submenu_header}>My Folder</div>
            <div className={css.submenu_list}>
              {userFoldersArray.map((folder) => (
                <div key={folder.id} className={css.submenu_item}>
                  <div className={css.submenu_item_left}>
                    <Image.Default
                      src="/icons/folder-add-dropdown.svg"
                      className={css.folder_icon}
                    />
                    <span>{folder.name}</span>
                  </div>
                  <span className={css.folder_count}>{folder.count}</span>
                </div>
              ))}
            </div>
            <div className={css.submenu_footer}>
              <button className={css.new_folder_btn}>
                <Image.Default
                  src="/icons/plus.svg"
                  className={css.plus_icon}
                />
                New Folder
              </button>
            </div>
          </div>
        </ol>
      </div>
    </div>
  );
};
