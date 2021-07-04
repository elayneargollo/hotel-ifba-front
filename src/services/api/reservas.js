import axios from '../../config/axios'; 

export const addReserva = reserva =>
{
    return axios
    .post(`/reservas/`, reserva)
    .then(response => {
        return response;
    })
    .catch(error => {
        return null;
    });
}
