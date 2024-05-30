import React, { useState } from 'react';
import { updateProfile, updatePassword, updateEmail, getAuth, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useAuth } from '../../contexts/AuthContext';
import { storage } from '../../firebase/firebase';
import { FaSpinner } from 'react-icons/fa';
import Header from '../header/Header';

const UserProfile = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const [editingUsername, setEditingUsername] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);
  const [file, setFile] = useState();
  const [newUsername, setNewUsername] = useState(currentUser.displayName || '');
  const [newEmail, setNewEmail] = useState(currentUser.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  const handleChangeUsername = async () => {
    try {
      setLoading(true);
      await updateProfile(getAuth().currentUser, { displayName: newUsername });
      setEditingUsername(false);
      setCurrentUser({ ...currentUser, displayName: newUsername });
    } catch (error) {
      console.log(error);
      setErrorMessage('Error updating username');
    } finally {
      setLoading(false);
    }
  };

  const handleChangeEmail = async () => {
    try {
      setLoading(true);
      const auth = getAuth();
      const user = auth.currentUser;
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      await updateEmail(user, newEmail);
      setEditingEmail(false);
      setCurrentUser({ ...currentUser, email: newEmail });
    } catch (error) {
      console.log(error);
      setErrorMessage('Error updating email');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      setErrorMessage('Password should be at least 6 characters long');
      return;
    }

    try {
      setLoading(true);
      const auth = getAuth();
      const user = auth.currentUser;
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      setEditingPassword(false);
      setNewPassword('');
      setConfirmPassword('');
      setCurrentPassword('');
      setErrorMessage('');
    } catch (error) {
      console.error('Error updating password:', error);
      setErrorMessage(error.message || 'Error updating password');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    if (file) {
      setImageLoading(true);
      const storageRef = ref(storage, `usersImages/${currentUser.uid}/photoURL`);
      await uploadBytes(storageRef, file);
      const imageURL = await getDownloadURL(storageRef);
      try {
        await updateProfile(getAuth().currentUser, { photoURL: imageURL });
        setCurrentUser({ ...currentUser, photoURL: imageURL });
      } catch (error) {
        setErrorMessage('Error updating profile image');
      } finally {
        setImageLoading(false);
      }
    }
  };

  return (
    <>
      <Header hasInput={false}/>
      <div className="max-w-lg flex flex-col gap-2 mx-auto p-4 bg-white rounded-lg shadow-md">
        {/* <h2 className="text-3xl  font-semibold">User Profile</h2> */}
        <div className="w-32 h-32 self-center rounded-full overflow-hidden ">
          {currentUser.photoURL ? (
            <img src={currentUser.photoURL} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 text-4xl font-semibold">
              <i className="fas fa-user"></i>
            </div>
          )}
        </div>
        <div className=" flex items-center">
          <div>
            <p className="font-semibold flex gap-3">Username:<span className='text-gray-500'>{currentUser.displayName}</span></p>
            {editingUsername ? (
              <div className="flex items-center">
                <input type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} className="border border-gray-300 rounded px-3 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                <button onClick={handleChangeUsername} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" disabled={loading}>
                  {loading ? <FaSpinner className="animate-spin mr-2" /> : 'Save'}
                </button>
                <button onClick={() => setEditingUsername(false)} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-400 ml-2">
                  Cancel
                </button>
              </div>
            ) : (
              <button onClick={() => setEditingUsername(true)} className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-400">Edit</button>
            )}
          </div>
        </div>
        <div className="">
          <p className="font-semibold flex gap-3">Email: <span className='text-gray-500'>{currentUser.email}</span></p>
          {editingEmail ? (
            <div className="flex flex-col">
              <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Current Password" className="border border-gray-300 rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
              <input type="text" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="New Email" className="border border-gray-300 rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
              <div className="flex">
                <button onClick={handleChangeEmail} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" disabled={loading}>
                  {loading ? <FaSpinner className="animate-spin mr-2" /> : 'Save'}
                </button>
                <button onClick={() => setEditingEmail(false)} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-400 ml-2">
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button onClick={() => setEditingEmail(true)} className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-400">Edit</button>
          )}
        </div>
        <div className="">
          <p className="font-semibold">Change Password:</p>
          {editingPassword ? (
            <div className="flex flex-col">
              <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Current Password" className="border border-gray-300 rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
              <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password" className="border border-gray-300 rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" className="border border-gray-300 rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
              <div className="flex">
                <button onClick={handleChangePassword} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" disabled={loading}>
                  {loading ? <FaSpinner className="animate-spin mr-2" /> : 'Save'}
                </button>
                <button onClick={() => setEditingPassword(false)} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-400 ml-2">
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button onClick={() => setEditingPassword(true)} className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-400">Edit</button>
          )}
        </div>
        <div className="mb-6">
          <label className="font-semibold block">Change Profile Image:</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" disabled={imageLoading} />
          <button onClick={handleImageUpload} className="ms-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 mt-2" disabled={imageLoading}>
            {imageLoading ? <FaSpinner className="animate-spin mr-2" /> : 'Submit'}
          </button>
        </div>
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      </div>
    </>
  );
};

export default UserProfile;
