// CourseForm.js

import React, { useState } from 'react';
import { api } from '../../services/api';
import axios from 'axios';

function CoursoForm() {
    const [name, setName] = useState('');
    const [faculdade, setFaculdade] = useState('');
    const [cutoff, setCutoff] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("@Auth:token")

        try {
            const response = await api.post('/cad-curso', {
                nome: name,
                faculdade: faculdade,
                notaDeCorte: parseFloat(cutoff), // Convert to a number if needed
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setName('');
            setFaculdade('');
            setCutoff('');
            console.log('Resposta da API:', response.data);
            window.location.reload();
        } catch (error) {
            console.error('Erro ao enviar requisição:', error);
        }
    };

    return (
        <form className='form' onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <input
                        className='form-control'
                        type="text"
                        placeholder="Nome do curso"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <br />
                    <input
                        className='form-control'
                        type="text"
                        placeholder="Nome da faculdade"
                        value={faculdade}
                        onChange={(e) => setFaculdade(e.target.value)}
                    />
                    <br />
                    <input
                        className='form-control'
                        type="number"
                        placeholder="Nota de corte"
                        value={cutoff}
                        onChange={(e) => setCutoff(e.target.value)}
                    />
                    <br />
                    <button className='mt-2 btn btn-primary btn-block' type="submit">Cadastrar</button> {/* btn-block para ocupar a largura do pai */}
                </div>
            </div>
        </form>
    );

}

export default CoursoForm;
