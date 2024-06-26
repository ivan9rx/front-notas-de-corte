import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/auth.jsx'

const Autenticado = ({ children }) => {
    const { signed, loading } = useContext(AuthContext)

    if (loading) {
        // Pode retornar um spinner ou qualquer componente de carregamento
        return <div>Loading...</div>
    }

    return signed ? children : <Navigate to="/login" />
}

export default Autenticado
