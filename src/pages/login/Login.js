import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import '../login/Sytle.css';
import { login } from "../../services/api/users";
import swal from 'sweetalert';
import { registrarCliente } from '../../routes/paths';

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    }
  }

  handleClick() {
    let username = this.state.username;
    let password = this.state.password;
    let credentials = { username, password };

    async function getResponse() {
      const data = await login(credentials);

      if(data.status === 200)
      {
        swal("", `${data.data}\n`, "success");
      }
      else 
        swal("Houve um erro", "Verifique as informações e tente novamente", "error");
    }
  
    getResponse();

  }

  render() {

    return (
      <div className="conteudoLogin">
        <div className="boxLogin">
          <h1>Login</h1>
      
            <div>
              <TextField 
              required 
              id="standard-required" 
              label="Enter your username" 
              defaultValue="Hello World" 
              size="small"
              value={this.state.username}
              onChange={(e) => this.setState({ username: e.target.value })}
              />
            </div>

            <div className="texto">
              <TextField 
              required 
              id="standard-required" 
              label="Enter your password" 
              defaultValue="Hello World" 
              size="small"
              value={this.state.password}
              type="password"
              autoComplete="current-password"
              onChange={(e) => this.setState({ password: e.target.value })}
              />
            </div>
      
 
          <div className="senhas">
            <Link href={registrarCliente} >
              Cadastrar uma conta
            </Link>
          </div>
   
          <div className="button">
            <Button size="small" variant="contained" color="primary" onClick={this.handleClick.bind(this)}>Entrar</Button>
          </div>

        </div>
      </div>
    );
  }
}