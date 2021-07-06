import React from 'react';
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { getAllServico } from "../../services/api/servicos";
import { getQuartosDisponiveis } from "../../services/api/quartos";
import { addReserva, getById } from "../../services/api/reservas";
import { ReservaFieldsValidation } from "./reservaFieldsValidation.js";
import swal from 'sweetalert';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

export default function ControlledOpenSelect() {
    const classes = useStyles();
    const [servicoId, setServico] = React.useState('');
    const [servicos, setServicoCombo] = useState('');
    const [reserva, setReserva] = useState('');
    const [reservaId, setReservaId] = useState('');
    const [open, setOpen] = React.useState(false);
    const [data_entrada, setData_entrada] = useState('');
    const [data_saida, setData_saida] = useState('');
    const [quantidade_pessoas, setQuantidade_pessoas] = useState('');
    const [cliente, setClienteId] = useState('');
    const [quartoNumber, setNumeroQuarto] = React.useState('');
    const [quartoId, setQuarto] = React.useState('');
    const [cartao, setCartao] = useState('');
    const id = localStorage.getItem('id');

    function validationField(data_entrada, data_saida, quantidade_pessoas, cliente, servico, quarto) {
        cliente = id
        var error = ReservaFieldsValidation(data_entrada, data_saida, quantidade_pessoas, cliente, servico, quarto);

        if (error) {
            swal(`${error}`);
            return true;
        }
    }

    function cleanField() {
        setNumeroQuarto("");
        setServico("");
        setData_entrada("");
        setData_saida("");
        setQuantidade_pessoas("");
        setNumeroQuarto("");
        setCartao("")
        setClienteId("")
    }

    async function handleSave() {

        if (!validationField(data_entrada, data_saida, quantidade_pessoas, cliente, servicoId, quartoId)) {
            let reserva = { data_entrada, data_saida, quantidade_pessoas: parseInt(quantidade_pessoas), cliente, servico: parseInt(servicoId), quarto: parseInt(quartoId), cartao }

            async function getResponse() {

                const data = await addReserva(reserva);

                if (data != null) {
                    swal("Reserva cadastrada!", "", "success");
                }
                else
                    swal("Houve um erro", "Verifique as informações e tente novamente", "error");
            }
            getResponse();
            cleanField()
        }
    }

    const handleChangeQuarto = (event) => {
        setQuantidade_pessoas(event.target.value);

        async function getQuartos() {
            try {
                const data = await getQuartosDisponiveis(event.target.value);
                setNumeroQuarto(data.data.numero);
                setQuarto(data.data.id);
            } catch (error) {
            }
        }
        getQuartos();
    };

    const handleSearchReserva = () => {

        async function getReserva() {
            try {
                const data = await getById(reservaId);
                setReserva(data.data);
                console.log(reserva.cartao)
            } catch (error) {
            }
        }
        getReserva();
    };

    useEffect(() => {
        async function getServicos() {
            try {
                const data = await getAllServico();
                setServicoCombo(data.data);
            } catch (error) {
            }
        }
        getServicos();
    }, []);

    const handleChange = (event) => {
        setServico(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <Container fixed>

                <div className="texto">
                    <h1>Atualizar Reserva</h1>
                </div>

                <div className="texto">
                    <TextField
                        id="date"
                        label="Número da reserva *"
                        type="int"
                        defaultValue="13"
                        className={classes.textField}
                        value={reservaId}
                        onChange={(e) => setReservaId(e.target.value)}
                    />

                </div>
                <div className="texto">
                    <Button size="small" variant="contained" color="primary" onClick={() => handleSearchReserva()}>Procurar Reserva</Button>
                </div>

                <div className="texto">
                    <TextField
                        id="margin-none"
                        className={classes.textField}
                        value={reserva.cartao}
                        onChange={(e) => setCartao(e.target.value)}
                    />
                </div>
                <div className="texto">
                    <TextField disabled
                        id="date"
                        type="int"
                        defaultValue="0"
                        className={classes.textField}
                        value={reserva.quarto}
                    />
                </div>
                <div className="texto">
                    <div className="texto">
                        <TextField disabled
                            id="date"
                            type="int"
                            defaultValue="0"
                            className={classes.textField}
                            value={reserva.servico}
                        />
                    </div>
                </div>
                <div className="texto">
                    <TextField
                        id="date"
                        type="datetime-local"
                        className={classes.textField}
                        value={reserva.data_entrada}
                        onChange={(e) => setData_entrada(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>

                <div className="texto">
                    <TextField
                        id="date"
                        type="datetime-local"
                        className={classes.textField}
                        value={reserva.data_entrada}
                        onChange={(e) => setData_saida(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
                <div className="texto">
                    <Button size="small" variant="contained" color="primary" onClick={() => handleSave()}>Registrar</Button>
                </div>
            </Container>
        </React.Fragment>
    );
}