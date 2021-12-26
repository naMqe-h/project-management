import { useState, useEffect } from "react"
import { auth } from '../firebase/config'
import { useAuthContext } from "./useAuthContext"

export const useSignup = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const signup = async (email, password, displayName) => {
        setError(null)
        setIsPending(true)

        try {
            const res = await auth.createUserWithEmailAndPassword(email, password)

            if (!res) {
                throw new Error('Could not complete signup')
            }

            await res.user.updateProfile({ displayName })

            dispatch({ type: 'LOGIN', payload: res.user })

            if(!isCancelled) {
                setIsPending(false)
                setError(null)
            }

        } catch (err) {
            if(!isCancelled) {
                setIsPending(false)
                setError(err.message)
                console.log(err.message)
            }
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { error, isPending, signup }

}