import React, { Component } from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import Input from './common/input';
import auth, { login } from '../services/authService';
import { Redirect } from 'react-router-dom';

class LoginForm extends Form {
  state = {
    data: { username: '', password: ''},
    errors: {}
  }

  schema = {
    username: Joi.string().required().label('Username'),
    password: Joi.string().required().label('Password'),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await login(data.username, data.password);
      // this.props.history.push('/');
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : '/';
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = {...this.state.errors};
        errors.username = error.response.data;
        this.setState({ errors });
      }      
    }

  };

  render() { 
    if (auth.getCurrentUser()) return <Redirect to="/" />

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username', 'Username')}
          {this.renderInput('password', 'Password', 'password')}

{/*           old 2
          <Input 
            name="username" 
            value={data.username} 
            label="Username" 
            onChange={this.handleChange} 
            error={errors.username}
          />
          <Input 
            name="password" 
            value={data.password} 
            label="Password" 
            onChange={this.handleChange} 
            error={errors.password}
          /> */}
          
          {/* <div className="form-group"> // Before common reusable input was created
            <label htmlFor="username">Username</label>
            <input 
              value={data.username} 
              onChange={this.handleChange}
              id="username" 
              name="username"
              type="text" 
              className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              value={data.password}
              onChange={this.handleChange}
              name="password"
              id="password" 
              type="text" 
              className="form-control" 
            />
          </div> */}
          {this.renderButton('Login')}
          
        </form>
      </div>
    );
  }
}
 
export default LoginForm;