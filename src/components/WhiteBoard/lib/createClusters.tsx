import React from "react";
import { Cluster } from "../../Cluster/Cluster";
import { TOP, LEFT } from "./constants";

// --- Создаёт список компонентов Cluster.

interface SelectionBoxType {
  x: number;
  y: number;
  width: number;
  height: number;
  visible: boolean;
}

interface Params {
  folders: { id: number; name: string }[]; // --- массив папок { id, name }
  images: string[]; // --- общий массив изображений
  frameRefs: React.RefObject<Map<number, HTMLDivElement>>; // --- реф на карту всех фреймов
  selectionBox: SelectionBoxType | undefined; // --- текущая область выделения
  clusterFrameRefs: React.RefObject<
    Map<number, React.RefObject<Map<number, HTMLDivElement>>>
  >; // --- реф для хранения per-cluster ref-карт
}

export const createClusters = ({
  folders,
  images,
  frameRefs,
  selectionBox,
  clusterFrameRefs,
}: Params) => {
  return folders.map((folder, index) => {
    const top = TOP;
    const left = LEFT * index;

    if (!clusterFrameRefs.current.has(folder.id)) {
      clusterFrameRefs.current.set(folder.id, { current: new Map() });
    }

    return (
      <Cluster
        key={folder.id}
        id={folder.id.toString()}
        title={folder.name}
        frameRefs={frameRefs}
        images={images}
        selectionBox={selectionBox}
        style={{
          top: `${top}px`,
          left: `${left}px`,
        }}
      />
    );
  });
};
