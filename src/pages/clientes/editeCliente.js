import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { addCliente } from "../../services/api/clientes";
import { login } from '../../routes/paths';
import swal from 'sweetalert';
import { getById, edit } from "../../services/api/clientes";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '25ch',
    },
    button: {
        display: 'block',
        marginTop: theme.spacing(4),
        width: 1200,
    }
}));

export default function LayoutTextFields() {
    const classes = useStyles();
    const [cliente, setCliente] = useState();
    const [telefone, setTelefone] = useState();
    const [email, setEmail] = useState();
    const [endereco, setEndereco] = useState();
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    const id = localStorage.getItem('id');

    useEffect(() => {
        async function getItems() {
         
          try {
            const data  = await getById(id);
            setCliente(data.data);
            setLoading(false);
          } catch (error) {
            swal("Opis ... ocorreu um erro", "", "error");   
            history.replace('/'); 
          }
        }
        getItems();
    },[]);

    async function handleEdit() {
        //let data_nascimento= cliente.data_nascimento
        let nacionalidade= cliente.nacionalidade
        let nome= cliente.nome
        let numero_identificacao= cliente.numero_identificacao
        let data_expedicao= cliente.data_expedicao

        let clientePut = { id , data_nascimento: cliente.data_nascimento, email, endereco, nacionalidade, nome, telefone, numero_identificacao, data_expedicao};

        async function getResponse() {

            const data = await edit(clientePut);
            setLoading(false);

            if (data != null) {
                swal("Usuário criado!", "Sua senha será enviada por email", "success");
                history.push(login);
            }

            else
                swal("Houve um erro", "Verifique as informações e tente novamente", "error");

        }

        getResponse();
    
    }

    if (loading) {
        return (
            <div className="loading">
                <CircularProgress />
            </div>
        );
    }
    return (
        <div className="conteudoLogin">
            <div className="boxLogin">
                <h1>Alterar dados cadastrais</h1>
                <div className={classes.root}>

                    <div>
                        <TextField
                            id="filled-full-width"
                            label="Nome *"
                            style={{ margin: 8 }}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            defaultValue={cliente.nome}
                            disabled 
                        />
                        <TextField
                            label="Telefone/Celular *"
                            id="margin-none"
                            defaultValue={cliente.telefone}
                            className={classes.textField}
                            onChange={(e) => setTelefone(e.target.value)}
                        />
                        <TextField
                            label="Nacionalidade *"
                            id="margin-none"
                            defaultValue={cliente.nacionalidade}
                            className={classes.textField}
                            disabled 

                        />

                        <TextField
                            label="E-mail *"
                            id="margin-none"
                            defaultValue={cliente.email}
                            className={classes.textField}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <TextField
                            id="filled-full-width"
                            label="Endereço *"
                            style={{ margin: 8 }}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            defaultValue={cliente.endereco}
                            onChange={(e) => setEndereco(e.target.value)}
                        />

                        <TextField
                            id="date"
                            label="Número de identificação *"
                            type="int"
                            className={classes.textField}
                            disabled 
                            defaultValue={cliente.numero_identificacao}
                        />

                        <TextField
                            id="date"
                            label="Data de expedição *"
                            type="date"
                            defaultValue={cliente.data_expedicao}
                            className={classes.textField}
                            disabled 
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="date"
                            label="Data de nascimento *"
                            type="date"
                            defaultValue={cliente.data_nascimento}
                            className={classes.textField}
                            disabled 
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                </div>
                <div className={classes.button}>
                    <Button size="small" variant="contained" color="primary" onClick={() => handleEdit()}>Alterar</Button>
                </div>
            </div>
        </div>
    );
}
