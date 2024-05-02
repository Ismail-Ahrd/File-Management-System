import React from "react";
import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";
import { useFileFolder } from "../../contexts/FileFolderContext";
import { getDocumentById } from "../../firebase/db";
import { useNavigate } from "react-router-dom";

export default function BreadCrumbs({ fileName }) {
  const { currentFolder, setCurrentFolder } = useFileFolder();
  const navigate = useNavigate()

  const onClick = async (id) => {
    console.log(id)
    const res = await getDocumentById(id)
    localStorage.setItem("currentFolder", JSON.stringify(res));
    setCurrentFolder(res)
    navigate(`/dashboard/${id}`)
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
      <BreadcrumbItem onPress={() => onClick(currentFolder.id)}>
        { currentFolder.name }
      </BreadcrumbItem>
      {
        fileName != undefined ?
        <BreadcrumbItem>
          { fileName }
        </BreadcrumbItem>
      :
      null
      }
    </Breadcrumbs>
  );
}
