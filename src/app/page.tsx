"use client";

import { Wrapper } from "@/components/Wrapper/Wrapper";
import { LeftSideBar } from "@/widgets/LeftSideBar/LeftSideBar";
import { ComposerBar } from "@/widgets/ComposerBar/ComposerBar";
import { ActionBar } from "@/widgets/ActionBar/ActionBar";
import { WhiteBoard } from "@/components/WhiteBoard/WhiteBoard";
import { Folders } from "@/widgets/Folders/Folder";

import { motion } from "motion/react";

import css from "./Main.module.scss";

const leftsideImage = "/images/LeftSideBar.png";
const ComposerImage = "/images/Composer.png";

const mockData = [
  "/images/Gallery/img1.png",
  "/images/Gallery/img2.png",
  "/images/Gallery/img3.jpg",
  "/images/Gallery/img4.png",
  "/images/Gallery/img5.jpg",
  "/images/Gallery/img6.png",
  "/images/Gallery/img7.png",
  "/images/Gallery/img8.png",
  "/images/Gallery/img9.png",
  "/images/Gallery/img10.jpg",
  "/images/Gallery/img11.png",
  "/images/Gallery/img12.png",
  "/images/Gallery/img13.png",
  "/images/Gallery/img14.png",
  "/images/Gallery/img15.png",
  "/images/Gallery/img16.png",
  "/images/Gallery/img17.png",
  "/images/Gallery/img18.jpg",
  "/images/Gallery/img19.jpg",
  "/images/Gallery/img20.png",
  "/images/Gallery/img21.jpg",
  "/images/Gallery/img22.jpg",
  "/images/Gallery/img23.png",
  "/images/Gallery/img1.png",
  "/images/Gallery/img2.png",
  "/images/Gallery/img3.jpg",
  "/images/Gallery/img4.png",
  "/images/Gallery/img5.jpg",
  "/images/Gallery/img6.png",
  "/images/Gallery/img7.png",
  "/images/Gallery/img8.png",
  "/images/Gallery/img9.png",
];

export default function Home() {
  return (
    <main>
      <Wrapper className={css.main_wrapper}>
        <div className={css.leftside_div}>
          <motion.div
            initial={{ x: -50, opacity: 0, filter: "blur(10px)" }}
            animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{
              duration: 0.8,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <LeftSideBar srcImage={leftsideImage} />
          </motion.div>
        </div>

        <div className={css.composer_bar_div}>
          <motion.div
            initial={{ y: 50, opacity: 0, filter: "blur(10px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <ComposerBar srcImage={ComposerImage} />
          </motion.div>
        </div>

        <div className={css.action_bar_div}>
          <motion.div
            initial={{ y: -50, opacity: 0, filter: "blur(10px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{
              delay: 2,
              duration: 0.8,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <ActionBar />
          </motion.div>
        </div>

        <WhiteBoard className={css.whiteboard_div} images={mockData} />

        <div className={css.folders_div}>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 2.2,
              duration: 0.8,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <Folders folderName="/Favorites" />
          </motion.div>
        </div>

        <div className={css.info_div}>
          <motion.div
            initial={{ x: 50, opacity: 0, filter: "blur(10px)" }}
            animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{
              delay: 3,
              duration: 0.8,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <div className={css.info}>
              <p>
                <kbd>Ctrl</kbd> + <kbd>Wheel</kbd> — Zoom
              </p>
              <p>
                <kbd>Wheel</kbd> — Scroll vertically
              </p>
              <p>
                <kbd>Space</kbd> + <kbd>Drag</kbd> — Pan
              </p>
              <p>
                <kbd>Middle Mouse Drag</kbd> — Pan
              </p>
              <p>
                <kbd>Click</kbd> + <kbd>Drag</kbd> — Select
              </p>
            </div>
          </motion.div>
        </div>
      </Wrapper>
    </main>
  );
}
