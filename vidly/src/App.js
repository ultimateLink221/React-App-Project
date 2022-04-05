import './App.css';
import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Movies from './components/movies';
import Customers from './components/customers';
import NotFound from './components/notFound';
import Rentals from './components/rentals';
import NavBar from './components/navBar';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import 'react-toastify/dist/ReactToastify.css';
import Test from './components/test';
import Logout from './components/logout';
import ProtectedRoute from './components/common/protectedRoute';
import auth from './services/authService';

class App extends Component {
  state = {} 

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() { 
    const { user } = this.state;

    return (
      <div>
        <ToastContainer />
        <NavBar user={user} />
        <main className='container'>
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            {/* <Route path="/movies/:title" component={Test} ></Route> */}
            <ProtectedRoute 
              path="/movies/:id" 
              component={MovieForm}
            />
            <Route 
              path="/movies" 
              render={props => <Movies {...props} user={this.state.user} />} 
            />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from='/' exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
