import AuthContext from '../AuthContext'
import { useState, useEffect } from 'react'

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({})
  const [token, setToken] = useState(null)

  useEffect(() => {
    async function getUser() {
      if (localStorage.getItem('token')) {
        // Pretend this is from a fetchUser()
        const newUser = { name: 'Elvis', age: 99, email: 'elvis@elvis.net' }
        setUser(newUser)
      } else {
        setUser({})
      }
    }
    getUser()
  }, [token])

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider