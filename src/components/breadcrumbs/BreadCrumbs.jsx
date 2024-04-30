import React from "react";
import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";
import { useFileFolder } from "../../contexts/FileFolderContext";
import { getFolderById } from "../../firebase/db";

export default function BreadCrumbs() {
  const { currentFolder, setCurrentFolder } = useFileFolder()
  //console.log(currentFolder)

  const onClick = async (id) => {
    const res = await getFolderById(id)
    setCurrentFolder(res)
  }

  return (
    <Breadcrumbs size="lg">
      {currentFolder.path.map((path) => {
        return (
          <BreadcrumbItem onPress={() => onClick(path.id)} key={path.id}>
            {path.name}
          </BreadcrumbItem>
        )
      })}
      <BreadcrumbItem>
        { currentFolder.name }
      </BreadcrumbItem>
    </Breadcrumbs>
  );
}
