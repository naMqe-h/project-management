import { useState } from 'react'
import './Signup.css'

export default function Signup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [thumbnail, setThumbnail] = useState(null)

    return (
        <form className='auth-form'>
            <h2>Sign up</h2>
            <label>
                <span>Email:</span>
                <input 
                    required
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </label>
            <label>
                <span>Password:</span>
                <input 
                    required
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </label>
            <label>
                <span>Display name:</span>
                <input 
                    required
                    type="text"
                    onChange={(e) => setDisplayName(e.target.value)}
                    value={displayName}
                />
            </label>
            <label>
                <span>Profile thumbanil:</span>
                <input 
                    required
                    type="file"
                    value={thumbnail}
                />
            </label>
            <button className="btn">Sign up</button>
        </form>
    )
}
