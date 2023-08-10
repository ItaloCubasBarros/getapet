import React from 'react'
import Input from '../../components/Input'

//hooks
import { useContext, useState } from 'react'

//context
import { Context } from '../../context/UserContext'

function Register() {
  //aqui eu crio funções e lógicas para  resolver uma tela
  const [user, setUser] = useState({})
  const { register } = useContext(Context)

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value })
    //{...user} esse cara cria uma cópia do objeto atual, usando a sintaxe de espalhamento(...) Essa cópia é feita para preservar os valores existentes no objeto antes de fazer qualquer atualização
  }

  function handleSubmit(e){
    e.preventDefault()

    console.log(user)
    register(user)
  }

  return (
    <div>
      <h2>Registrar</h2>
      <div>
        <form onSubmit={handleSubmit}>
          {/* Nome do user */}
          <Input
            type='text'
            label='Nome'
            placeholder='Digite seu nome'
            name='name'
            handleChange={handleChange}
          />
          {/* Email do user  */}
          <Input
            type='email'
            label='Email'
            placeholder='Digite seu email'
            name='email'
            handleChange={handleChange}
          />
          {/* phone do user  */}
          <Input
            type='tel'
            label='Telefone'
            placeholder='Digite seu telefone'
            name='phone'
            handleChange={handleChange}
          />
          {/* Senha do usuario */}
          <Input
            type='password'
            label='Senha'
            placeholder='Digite sua senha'
            name='password'
            handleChange={handleChange}
          />
          {/* confirmação de senha do user  */}
          <Input
            type='password'
            label='Confirme sua senha'
            placeholder='Confirme sua senha'
            name='confirmpassword'
            handleChange={handleChange}
          />
          <button type='submit' className='btn mt-3'>Registrar</button>
        </form>
      </div>
    </div>
  )
}

export default Register