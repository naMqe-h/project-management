import { useState, useEffect } from "react"
import { auth } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useLogout = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const logout = async () => {
        setError(null)
        setIsPending(true)

        try {
            await auth.signOut()

            dispatch({ type: 'LOGOUT' })

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

    return { logout, error, isPending }
}