import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { onValue, ref } from 'firebase/database';
import { db } from '../../firebase/firebase';
// import { getDatabase, ref, onValue } from "firebase/database";
// import { getStorage, ref as storageRef } from "firebase/storage";

const StorageProgress = () => {
  const [storageUsage, setStorageUsage] = useState(10000000);
  const [maxStorage, setMaxStorage] = useState(10 * 1024 * 1024); // 10MB in bytes
  const {currentUser} = useAuth()

  useEffect(() => {
    const fileCountRef = ref(db, `users/${currentUser.uid}/fileCount`)

    // Listen for changes in fileCount
    const unsubscribe = onValue(fileCountRef, (snapshot) => {
      const fileCount = snapshot.val();
      console.log("fileCount", fileCount)
      setStorageUsage(fileCount);
    });

    return () => {
      // Unsubscribe when component unmounts
      unsubscribe();
    };
  }, []);

  // Calculate storage progress
  const progress = (storageUsage / maxStorage) * 100;
  const progressInt =parseInt(progress)
  const storageUsageMB=(storageUsage/(1024 * 1024))

  return (
    <div className="relative flex flex-col gap-2">
      <div className='flex gap-3 flex-row items-center ms-3'>
        <div className="w-[70%] bg-gray-200 rounded-full relative">
          <div
            className="bg-purple-500 h-4 rounded-full"
            style={{ width: `${progress}%` }}
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
          />
          <p className={`absolute top-1/2 left-[calc(${progressInt}%-55px)] -translate-y-1/2 text-[12px] ms-2 text-white `}>
            {storageUsageMB.toFixed(2)} MB
          </p>
        </div>
        <p className=" text-sm">10 MB</p>
      </div>

      <p className="text-sm m-auto">{progress.toFixed(2)}% used</p>
    </div>
  );
};

export default StorageProgress;
