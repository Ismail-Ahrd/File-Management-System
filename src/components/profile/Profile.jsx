import React, { useState } from 'react';
import { updateProfile, updatePassword, getAuth, sendPasswordResetEmail } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useAuth } from '../../contexts/AuthContext';
import { storage } from '../../firebase/firebase';
import { FaSpinner } from 'react-icons/fa';

const UserProfile = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [newUsername, setNewUsername] = useState(currentUser.displayName || '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  const handleChangeUsername = async () => {
    try {
      setLoading(true);
      await updateProfile(getAuth().currentUser, { displayName: newUsername });
      setEditing(false);
      setCurrentUser({...currentUser, displayName: newUsername}); // Update user in context
    } catch (error) {
      console.log(error);
      setErrorMessage('Error updating username');
    } finally {
      setLoading(false);
    }
  };

//   const handleChangePassword = async () => {
//     try {
//       setLoading(true);
//       console.log(newPassword);
//       await updatePassword(getAuth().currentUser, newPassword+"");
//       setNewPassword('');
//       setConfirmPassword('');
//     } catch (error) {
//       setErrorMessage('Error updating password');
//     } finally {
//       setLoading(false);
//     }
//   };
  const handleChangePassword = async () => {
    try {
      setLoading(true);
      console.log(newPassword);
      await sendPasswordResetEmail(getAuth().currentUser, currentUser.email);
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      setErrorMessage('Error updating password');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageLoading(true);
      const storageRef = ref(storage, `usersImages/${currentUser.uid}/photoURL`);
      await uploadBytes(storageRef, file);
      const imageURL = await getDownloadURL(storageRef);
      try {
        await updateProfile(getAuth().currentUser, { photoURL: imageURL });
        setCurrentUser({...currentUser, photoURL: imageURL}); // Update user in context
      } catch (error) {
        setErrorMessage('Error updating profile image');
      } finally {
        setImageLoading(false);
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-6">User Profile</h2>
      <div className="mb-6 flex items-center">
        <div className="w-20 h-20 rounded-full overflow-hidden mr-4">
          {currentUser.photoURL ? (
            <img src={currentUser.photoURL} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 text-4xl font-semibold">
              <i className="fas fa-user"></i>
            </div>
          )}
        </div>
        <div>
          <p className="font-semibold flex gap-3">Username:<span className='text-blue-600'>{currentUser.displayName}</span></p>
          {editing ? (
            <div className="flex items-center">
              <input type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} className="border border-gray-300 rounded px-3 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
              <button onClick={handleChangeUsername} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" disabled={loading}>
                {loading ? <FaSpinner className="animate-spin mr-2" /> : 'Save'}
              </button>
            </div>
          ) : (
              
              <button onClick={() => setEditing(true)} className=" bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-400">Edit</button>
          )}
        </div>
      </div>
      <div className="mb-6">
        <p className="font-semibold">Email:</p>
        <p>{currentUser.email}</p>
      </div>
      <div className="mb-6">
        <p className="font-semibold">Change Password:</p>
        <div className="flex flex-col items-start gap-4">
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password" className="border border-gray-300 rounded px-3 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" className="border border-gray-300 rounded px-3 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <button onClick={handleChangePassword} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" disabled={loading}>
            {loading ? <FaSpinner className="animate-spin mr-2" /> : 'Change'}
          </button>
        </div>
      </div>
      <div className="mb-6">
        <label className="font-semibold block">Change Profile Image:</label>
        <input type="file" onChange={handleImageUpload} className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" disabled={imageLoading} />
        <button onClick={handleImageUpload} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 mt-2" disabled={imageLoading}>
          {imageLoading ? <FaSpinner className="animate-spin mr-2" /> : 'Submit'}
        </button>
      </div>
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
    </div>
  );
};

export default UserProfile;
