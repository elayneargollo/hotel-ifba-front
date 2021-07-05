import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Menu from '../components/navbar/menu';
import Navbar from '../components/navbar/navbar';
import Footer from '../components/navbar/footer';
import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import Servicos from '../pages/servicos/Servicos';
import RegisterCliente from '../pages/clientes/registerCliente';
import RegisterReserva from '../pages/reservas/registerReserva';

export const paths = require('./paths');

function Rotas() {

  return (
    <BrowserRouter>
      <Navbar />
      <Menu />
      <Switch>
        <Route exact path={paths.root} component={Home} />
        <Route exact path={paths.login} component={Login} />
        <Route exact path={paths.servicos} component={Servicos} />
        <Route exact path={paths.registrarCliente} component={RegisterCliente} />
        <Route exact path={paths.registrarReserva} component={RegisterReserva} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default Rotas;