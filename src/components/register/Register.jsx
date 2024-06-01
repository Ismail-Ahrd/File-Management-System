import React, { useState } from 'react'
import { Navigate, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { doCreateUserWithEmailAndPassword } from '../../firebase/auth'
import { createRootFolder } from '../../firebase/storage'
import MyNavbar from '../navbar/MyNavbar'
import { updateProfile } from 'firebase/auth'
import { encrypt } from '../../utils/crypto'
import toast from 'react-hot-toast';

const Register = () => {

    const navigate = useNavigate()
    const {currentUser, setCurrentUser} = useAuth()
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [isRegistering, setIsRegistering] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [loading, setLoading] = useState(false)


    const { userLoggedIn } = useAuth()

    const onSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        if(!isRegistering) {
            if (password.length < 6) {
                toast.error("Password should be at least 6 charachters.")
            } else if (password !== confirmPassword) {
                toast.error("Password and Confirm Password are not the same.")
            } else { 
                try {
                    setIsRegistering(true)
                    const res = await doCreateUserWithEmailAndPassword(email, password)
                    await updateProfile(res.user, {displayName: username})
                    await createRootFolder(res.user.uid)
                    setLoading(false)
                    window.location.reload()
                } catch (error) {
                    setIsRegistering(false)
                    //console.log(error.message)
                    const message = error.message.split(" ")[2].split("/")[1].split(")")[0]
                    //console.log(message)
                    toast.error(message)
                }
            }
        }   
    }

    return (
        <>
            {userLoggedIn && !loading && (<Navigate to={`/dashboard/${encrypt(currentUser.uid)}`} replace={true} />)}
            <MyNavbar />
            <main className="w-full pt-10 flex self-center place-content-center place-items-center">
                <div className="w-96 text-gray-600 space-y-5 p-4 shadow-xl border rounded-xl">
                    <div className="text-center mb-6">
                        <div className="mt-2">
                            <h3 className="text-gray-800 text-xl font-semibold sm:text-2xl">Create a New Account</h3>
                        </div>

                    </div>
                    <form
                        onSubmit={onSubmit}
                        className="space-y-4"
                    >
                        <div>
                            <label className="text-sm text-gray-600 font-bold">
                                Username
                            </label>
                            <input
                                type="test"
                                required
                                value={username} onChange={(e) => { setUsername(e.target.value) }}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:indigo-600 shadow-sm rounded-lg transition duration-300"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-600 font-bold">
                                Email
                            </label>
                            <input
                                type="email"
                                autoComplete='email'
                                required
                                value={email} onChange={(e) => { setEmail(e.target.value) }}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:indigo-600 shadow-sm rounded-lg transition duration-300"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-600 font-bold">
                                Password
                            </label>
                            <input
                                disabled={isRegistering}
                                type="password"
                                autoComplete='new-password'
                                required
                                value={password} onChange={(e) => { setPassword(e.target.value) }}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-600 font-bold">
                                Confirm Password
                            </label>
                            <input
                                disabled={isRegistering}
                                type="password"
                                autoComplete='off'
                                required
                                value={confirmPassword} onChange={(e) => { setconfirmPassword(e.target.value) }}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                            />
                        </div>

                        {errorMessage && (
                            <span className='text-red-600 font-bold'>{errorMessage}</span>
                        )}

                        <button
                            type="submit"
                            disabled={isRegistering}
                            className={`w-full px-4 py-2 text-white font-medium rounded-lg ${isRegistering ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300'}`}
                        >
                            {isRegistering ? 'Signing Up...' : 'Sign Up'}
                        </button>
                        <div className="text-sm text-center">
                            Already have an account? {'   '}
                            <Link to={'/login'} className="text-center text-sm hover:underline font-bold">Continue</Link>
                        </div>
                    </form>
                </div>
            </main>
        </>
    )
}

export default Register