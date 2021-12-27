import './OnlineUsers.css'
import { useCollection } from '../hooks/useCollection'
import Avatar from './Avatar'

export default function OnlineUsers() {
    const { documents, error } = useCollection('users')

    return (
        <div className='user-list'>
            <h2>All Users</h2>
            {error && <div className='error'>{error}</div>}
            {documents?.map(user => (
                <div key={user.id} className='user-list-item'>
                    {user.online && <span className="online-user"></span>}
                    <span>{user.displayName}</span>
                    <Avatar src={user.photoURL} />
                </div>
            ))}
        </div>
    )
}
