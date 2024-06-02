import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Snippet,
} from '@nextui-org/react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdDelete, MdDownload, MdModeEdit } from 'react-icons/md';
import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { decrypt } from '../../utils/crypto';
import { createURL, deleteDocument, deleteFolder, downloadFolderAsZip, renameDocument } from '../../firebase/storage';
import { ref } from 'firebase/storage';
import { storage } from '../../firebase/firebase';
import { FaShare } from "react-icons/fa";

export default function Actions({ setHidden, name, setChanged, type }) {
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  const [isFocused, setIsFocused] = useState(false);
  const [fileName, setFileName] = useState(name);
  const isInvalid = isFocused && fileName.split('.')[0].length < 3;
  const modalRef = useRef(null);
  const openModalButtonRef = useRef(null);
  const [url,setURL]=useState("")
  const { documentId } = useParams();

  const handleDownloadFolder = async () => {
    try {
      const path = decrypt(documentId) + `/${name}`;
      await downloadFolderAsZip(path, path.length);
    } catch (error) {
      console.error('Error downloading folder as zip', error);
    }
  };

  const handleDownload = async () => {
    try {
      await downloadFolderAsZip(decrypt(documentId) + `/${name}`);
    } catch (error) {
      console.error('Error downloading folder as zip', error);
    }
  };

  const createURL2=async()=>{
    const url = await createURL(decrypt(documentId) + `/${name}`)
    console.log(url);
    setURL(url)
  }

  useEffect(() => {
    createURL2()
    if (showModal) {
      document.body.style.overflow = 'hidden';
      if (modalRef.current) {
        modalRef.current.focus();
      }
    } else {
      document.body.style.overflow = 'auto';
      if (openModalButtonRef.current) {
        openModalButtonRef.current.focus();
      }
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showModal]);

  const handleModalClose = () => {
    setShowModal(false);
    if (openModalButtonRef.current) {
      openModalButtonRef.current.focus();
    }
  };
  const handleModalClose2 = () => {
    setShowModal2(false);
    if (openModalButtonRef.current) {
      openModalButtonRef.current.focus();
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleModalClose();
    }
  };
  const handleOverlayClick2 = (e) => {
    if (e.target === e.currentTarget) {
      handleModalClose2();
    }
  };

  const handleRenameDocument=async()=>{
    console.log(fileName);
    const newMetadata = {
      name: fileName
    };
    await renameDocument(decrypt(documentId),name,fileName)
    setChanged(true);
  }

  return (
    <div className="absolute bottom-0 right-0">
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={handleOverlayClick}>
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div
            className="bg-white p-6 rounded shadow-lg z-50 relative"
            ref={modalRef}
            tabIndex="-1"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h3 className="text-2xl">Rename</h3>
              <button onClick={handleModalClose} className="text-2xl">
                &times;
              </button>
            </div>
            <Input
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Enter new file name"
              variant="bordered"
              classNames={{
                inputWrapper: 'h-[50px]',
              }}
              value={fileName}
              onValueChange={setFileName}
              isInvalid={isInvalid}
              color={isInvalid ? 'danger' : ''}
              errorMessage={isInvalid && 'File name must be at least 3 characters'}
            />
            <div className="flex justify-end gap-2 mt-4">
              <Button color="danger" variant="flat" onClick={handleModalClose}>
                Close
              </Button>
              <Button
                onPress={handleRenameDocument}
                color="primary"
                type="submit"
                isDisabled={fileName.split('.')[0].length < 3}
              >
                Rename
              </Button>
            </div>
          </div>
        </div>
      )}
      {showModal2 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={handleOverlayClick2}>
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div
            className="bg-white p-6 rounded shadow-lg z-50 relative"
            ref={modalRef}
            tabIndex="-1"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h3 className="text-2xl">Share URL</h3>
              <button onClick={handleModalClose2} className="text-2xl">
                &times;
              </button>
            </div>
            <div className='max-w-[400px] overflow-x-scroll'>
              <Snippet>{url}</Snippet>

            </div>
            <div className="flex justify-end mt-4">
              <Button color="danger" variant="flat" onClick={handleModalClose2}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      <Dropdown onClose={() => setHidden(false)}>
        <DropdownTrigger>
          <Button
            ref={openModalButtonRef}
            isIconOnly
            size="sm"
            variant="light"
            onClick={() => setHidden(true)}
          >
            <BsThreeDotsVertical className="text-default-600 text-lg z-10" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          {
            type=="file"&&(
              <DropdownItem
                startContent={<MdModeEdit size={20} color="blue" />}
                className="text-blue-600 font-bold"
                onPress={() => setShowModal(true)}
              >
                Rename
              </DropdownItem>
            )
          }
          <DropdownItem
            startContent={<MdDownload size={20} color="green" />}
            className="text-green-700 font-bold"
            onPress={async () => {
              if (type === 'file') {
                await handleDownload();
              } else {
                await handleDownloadFolder();
              }
            }}
          >
            Download
          </DropdownItem>
          {type=="file"&&(
            <DropdownItem
              startContent={<FaShare size={20} color="gray" />}
              className="text-gray-600 font-bold"
              onPress={() => setShowModal2(true)}
            >
              Share URL
            </DropdownItem>
          )
          }
          <DropdownItem
            startContent={<MdDelete size={20} color="red" />}
            className="text-red-600 font-bold"
            onPress={async () => {
              if (type === 'file') {
                await deleteDocument(decrypt(documentId) + `/${name}`);
              } else {
                await deleteFolder(decrypt(documentId) + `/${name}`);
              }
              setChanged(true);
            }}
          >
            Delete
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
