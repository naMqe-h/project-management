import { useState } from "react"
import ProjectList from '../../components/ProjectList'
import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext'
import './Dashboard.css'
import ProjectFilter from './ProjectFilter'

export default function Dashboard() {
    const [currentFilter, setCurrentFilter] = useState('all')
    const { documents, error } = useCollection('projects')
    const { user } = useAuthContext()

    const changeFilter = (newFilter) => {
        setCurrentFilter(newFilter)
    }

    const projects = documents?.filter(document => {
        switch (currentFilter) {
            case 'all':
                return true
            case 'mine':
                let assignedToMe = false
                document.assignedUsersList.forEach(u => {
                    if (user.uid === u.id)  {
                        assignedToMe = true
                    }
                })
                return assignedToMe
            case 'development':
            case 'design':
            case 'sales':
            case 'marketing':
                return document.category === currentFilter
            default:
                return true
        }
    }) || null

    return (
        <div>
            <h2 className="page-title">Dashboard</h2>
            {error && <p className='error'>{error}</p>}
            {documents && <ProjectFilter currentFilter={currentFilter} changeFilter={changeFilter} />}
            {projects && <ProjectList projects={projects} />}
        </div>
    )
}
