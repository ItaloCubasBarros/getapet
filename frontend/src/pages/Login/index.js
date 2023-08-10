import React from 'react'
import Input from '../../components/Input'

import { Link } from 'react-router-dom'

//context
import { Context } from '../../context/UserContext'
import { useContext, useState } from 'react'



function Login() {
	const [user, setUser] = useState({})
	const { login } = useContext(Context)

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  function handleSubmit(e){
    e.preventDefault()
    login(user)
  }
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <Input
          label='Email'
          type='email'
          name='email'
          placeholder='Digite seu email'
          handleChange={handleChange}
        />
        <Input
          label='Senha'
          type='password'
          name='password'
          placeholder='Digite sua senha'
          handleChange={handleChange}
        />
        <button type='submit'>Login</button>
      </form>
      <p>
        Não tem conta??? <Link to='/register'>Clique aqui</Link>
      </p>
    </div>
  )
}

export default Login