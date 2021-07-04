import axios from '../../config/axios';

export const getAllServico = () =>
{
    return axios
    .get(`/servicos/`)
    .then(response => {
        return response;
    })
    .catch(error => {
        console.log(error)
    });
}
