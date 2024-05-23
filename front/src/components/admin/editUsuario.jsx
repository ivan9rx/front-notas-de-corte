import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditUsuario({ usuarioId, onClose }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [accessLevel, setAccessLevel] = useState(1);

    useEffect(() => {
        // Recuperar as informações do usuário para edição
        axios.get(`http://localhost:8080/get-usuario/${usuarioId}`)
            .then(response => {
                const usuario = response.data;
                setName(usuario.nome);
                setEmail(usuario.email);
                setSenha(usuario.senha);
                setAccessLevel(usuario.nivelacesso);
            })
            .catch(error => {
                console.error('Erro ao buscar usuário para edição:', error);
            });
    }, [usuarioId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Enviar solicitação para atualizar o usuário
            await axios.put(`http://localhost:8080/edit-usuario/${usuarioId}`, {
                nome: name,
                email: email,
                senha: senha,
                nivelacesso: accessLevel,
            });

            console.log('Usuário atualizado com sucesso');
            onClose(window.location.reload());
        } catch (error) {
            console.error('Erro ao editar usuário:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='row'>
                <div className='col-md-6 offset-md-3'>
                    <input
                        className='form-control'
                        type="text"
                        placeholder="Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    /> <br />
                    <input
                        className='form-control'
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    /> <br />
                    <input
                        className='form-control'
                        type="text"
                        placeholder="Senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    /> <br />
                    <select
                        className='form-control'
                        value={accessLevel}
                        onChange={(e) => setAccessLevel(parseInt(e.target.value))}
                    >
                        <option value={1}>Cliente</option>
                        <option value={2}>Colaborador</option>
                        <option value={3}>Admin</option>
                    </select> <br />
                    <button className='btn btn-primary mt-2' type="submit">Salvar</button>
                    <button className='btn btn-secondary mt-2 ms-2' onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </form>
    );
}

export default EditUsuario;