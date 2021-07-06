import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { login, servicos, registrarCliente, registrarReserva, editarCliente, caracteristicas, editReserva } from '../../routes/paths';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import AppsIcon from '@material-ui/icons/Apps';
import Home from '@material-ui/icons/Home';
import ExitToApp from '@material-ui/icons/ExitToApp';
import {  Redirect } from 'react-router-dom';


const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    
  }),
);

export default function ButtonAppBar() {

  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  
  const open = Boolean(anchorEl);

  const redirectLogin = () => {
    setAnchorEl(null);
    history.push(login);
  }

  const redirectService = () => {
    setAnchorEl(null);
    history.push(servicos);
  }

  const redirectHome = () => {
    setAnchorEl(null);
    history.push("/");
  }

  const redirectRegister = () => {
    setAnchorEl(null);
    history.push(registrarCliente);
  }

  const redirectEdit = () => {
    setAnchorEl(null);
    history.push(editarCliente);
  }

  const redirectCaracteristicasGerais = () => {
    setAnchorEl(null);
    history.push(caracteristicas);
  }

  const redirectReservation = () => {
    setAnchorEl(null);
    history.push(registrarReserva);
  }

  const redirectEditReservation = () => {
    setAnchorEl(null);
    history.push(editReserva);
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleClick}>
            <AppsIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Menu
          </Typography>
          <Menu
            id="fade-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            <MenuItem
              onClick={redirectService}>
            Serviços e Preços</MenuItem>
            <MenuItem
              onClick={redirectReservation}>
            Realizar Reserva</MenuItem>
            <MenuItem
              onClick={redirectEditReservation}>
            Alterar Reserva</MenuItem>
            <MenuItem
              onClick={redirectLogin}>
            Login</MenuItem>
            <MenuItem
            onClick={redirectRegister}>
            Registrar-se</MenuItem>
            <MenuItem
              onClick={redirectHome}>
            Home</MenuItem>
            <MenuItem
              onClick={redirectEdit}>
              Alterar Dados Cadastrais</MenuItem>
            <MenuItem
              onClick={redirectCaracteristicasGerais}>
             Características Gerais</MenuItem>
          </Menu>
          <Button 
          color="inherit" 
          onClick={redirectLogin}>
               <ExitToApp />
            Entrar</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}