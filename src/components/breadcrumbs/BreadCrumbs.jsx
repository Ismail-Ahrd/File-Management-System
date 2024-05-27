import React, { useEffect, useState } from "react";
import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { decrypt, encrypt } from "../../utils/crypto";

export default function BreadCrumbs({ fileName }) {
  const {currentUser} = useAuth()
  const { documentId } = useParams()
  const [breads, setBreads] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    let list = decrypt(documentId).split("/")
    list[0] = "root"
    setBreads(list)
  }, [documentId])

  const onClick = async (index) => {
    console.log(index)
    const list = breads.slice(0,index+1);
    list[0] = currentUser.uid;
    const str = list.join("/")
    navigate(`/dashboard/${encrypt(str)}`)
  }

  return (
    <Breadcrumbs size="lg">
      {breads.map((bread, index) => {
        
        return (
          <BreadcrumbItem key={bread+index} onClick={() => onClick(index)}>
            {bread}
          </BreadcrumbItem>
        )
      })}
    </Breadcrumbs>
  );
}
