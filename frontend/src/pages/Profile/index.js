import React, { useState, useEffect } from 'react'
import api from '../../utils/api'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/Input'

function Profile() {
  //Aqui vamos digitar a logica do perfil
  const [user, setUser] = useState({})
  const [preview, setPreview] = useState()
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      alert('Por favor faça o login')
      navigate('/login')
    } else {
      api.get('/users/checkuser', {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`
        }
      }).then((response) => {
        setUser(response.data)
      })
    }
  }, [token, navigate])

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  //trabalhando com a imagem
  const [image, setImage] = useState(null)

  function onFileChange(e) {
    setPreview(URL.createObjectURL(e.target.files[0]))
    setImage(e.target.files[0])
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const formData = new FormData()

    //adiciona a imagem ao formdata (se ela existir)
    if (image) {
      formData.append('image', image)
    }

    //adiciona as outras propriedades do usuario ao formData
    await Object.keys(user).forEach((key) => formData.append(key, user[key]))

    const data = await api.patch(`users/edit/${user.id}`, formData, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        'Content-Type': 'multipart/form-data'
      }
    }).then((response) => {
      return response.data
    }).catch((err) => {
      alert(err.response.data)
      return err.response.data
    })

    alert(data.message)
  }

  return (
    <div>
      <h2>Perfil</h2>
      <img
        style={{ height: '200px', width: '200px' }}
        className='rounded-circle m-3'
        src={'http://localhost:5000/images/users/' + user.image}
        alt='Foto de perfil'
      />
      <form onSubmit={handleSubmit}>
        <Input
          label='Imagem'
          type='file'
          name='image'
          handleChange={onFileChange}
        />
        <Input
          type='text'
          label='Nome'
          name='name'
          placeholder='Digite seu nome'
          handleChange={handleChange}
          value={user.name}
        />
        <Input
          type='email'
          label='email'
          name='email'
          placeholder='Digite seu email'
          handleChange={handleChange}
          value={user.email}
        />
        <Input
          type='phone'
          label='phone'
          name='phone'
          placeholder='Digite seu phone'
          handleChange={handleChange}
          value={user.phone}
        />
        <Input
          type='password'
          label='password'
          name='password'
          placeholder='Digite seu password'
          handleChange={handleChange}
        />
        <Input
          type='password'
          label='password'
          name='confirmpassword'
          placeholder='Digite seu password'
          handleChange={handleChange}
        />
        <button type='submit'>Atualizar</button>
      </form>
    </div>
  )
}

export default Profile