import { useState, useEffect } from "react"
import { auth, db } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setError(null)
        setIsPending(true)

        try {
            const res = await auth.signInWithEmailAndPassword(email, password)

            await db.collection('users').doc(res.user.uid).update({
                online: true
            })

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

    return { login, error, isPending }
}