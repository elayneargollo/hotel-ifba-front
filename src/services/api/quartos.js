import axios from '../../config/axios';

export const getQuartosDisponiveis = numerode_pessoas =>
{
    return axios
    .get(`/quartoDisponivel/${numerode_pessoas}`)
    .then(response => {
        return response;
    })
    .catch(error => {
        console.log(error)
    });
}