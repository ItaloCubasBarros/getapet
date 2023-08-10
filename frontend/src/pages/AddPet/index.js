import React, { useState } from 'react'
import Input from '../../components/Input'
import api from '../../utils/api'

function AddPet() {
    const [pet, setPet] = useState({})
    const [preview, setPreview] = useState()
    const [token] = useState(localStorage.getItem('token' || ''))

    function handleChange(e) {
        setPet({ ...pet, [e.target.name]: e.target.value })
    }

    const [images, setImage] = useState(null)

    //trabalhando com imagem
    function onFileChange(e) {
        setPreview(URL.createObjectURL(e.target.files[0]))
        setImage(e.target.files[0])
    }

    async function handleSubmit(e) {
        e.preventDefault()

        const formData = new FormData()

        if (images) {
            formData.append('images', images)
        }

        await Object.keys(pet).forEach((key) => formData.append(key, pet[key]))

        formData.append('pet', JSON.stringify(pet))

        const data = await api.post('pets/create', formData, {
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
        <section>
            <div>
                <h3>Cadastre um cachorro</h3>
                <p>Depois ele ficará disponivel para adoção</p>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <Input
                        type='file'
                        label='Imagem'
                        placeholder='Coloque a foto do cachorro'
                        name='images'
                        handleChange={onFileChange}
                    />
                    <Input
                        type='text'
                        label='Nome do cachorro'
                        placeholder='Digite o nome do cachorro'
                        name='name'
                        handleChange={handleChange}
                    />
                    <Input
                        type='number'
                        label='Idade do cachorro'
                        placeholder='Digite a idade do cachorro'
                        name='age'
                        handleChange={handleChange}
                    />
                    <Input
                        type='number'
                        label='Peso do cachorro'
                        placeholder='Digite o peso do cachorro'
                        name='weight'
                        handleChange={handleChange}
                    />
                    <Input
                        type='text'
                        label='Cor do cachorro'
                        placeholder='Digite a cor do cachorro'
                        name='color'
                        handleChange={handleChange}
                    />
                    <button type='submit'>Cadastrar cachorro</button>
                </form>
            </div>
        </section>
    )
}

export default AddPet