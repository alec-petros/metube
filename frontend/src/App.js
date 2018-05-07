import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import "../node_modules/video-react/dist/video-react.css";
import Uploader from './components/Uploader'
import VidContainer from './containers/VidContainer';
import RegisterForm from './components/RegisterForm'

class App extends Component {

  state = {

  }

  componentDidMount() {
    if (localStorage.auth) {
      const auth = JSON.parse(localStorage.auth)
      this.setState({ auth });
    }
  }

  authFetched = (auth) =>{
    localStorage.auth = JSON.stringify(auth);
    this.setState({ auth });
  }

  render() {
    return (
      <div className="App">
        {!localStorage.auth ? <RegisterForm authSet={ this.authFetched } /> : null}
        <Uploader />
        <VidContainer auth={this.state.auth} />
      </div>
    );
  }
}

export default App;
