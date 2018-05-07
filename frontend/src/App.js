import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import './App.css';
import "../node_modules/video-react/dist/video-react.css";
import Uploader from './components/Uploader'
import VidContainer from './containers/VidContainer';
import RegisterForm from './components/RegisterForm'
import NavBar from './NavBar'
import LoginForm from './components/LoginForm'

const url = "http://localhost:3000/videos"

class App extends Component {

  state = {
    videos: []
  }

  fetchVideos(){
    fetch(url)
    .then(r => r.json())
    .then(json => this.setState({
      videos: json
    }))
  }

  componentDidMount() {
    if (localStorage.auth) {
      const auth = JSON.parse(localStorage.auth)
      this.setState({ auth });
    }
    this.fetchVideos()
  }

  authFetched = (auth) =>{
    localStorage.auth = JSON.stringify(auth);
    this.setState({ auth });
  }

  addVideo = (newVideo) => {
    this.setState({
      videos: [...this.state.videos, newVideo]
    })
  }

  deleteVideo = (e) => {
    let videoId = e.target.id
    let deleteUrl = url + `/${videoId}`
    fetch(deleteUrl, {
      method: 'DELETE',
      headers: {
        "Authorization": `Token token=${ this.state.auth.token }`
      }
    }).then(this.setState({
      videos: [...this.state.videos.filter(video=> video.id !== parseInt(videoId, 10))]
    }))
  }

  logout = () => {
    localStorage.removeItem("auth")
    this.setState({ auth: null })
  }

  render() {

    const VidContainerVar = (props) => {
      return (<VidContainer auth={this.state.auth} videos={this.state.videos} deleteVideo={this.deleteVideo}/>)
    }

    const RegisterFormVar = (props) => {
      return (<RegisterForm authSet={ this.authFetched } />)
    }

    return (
      <div className="App">
        <NavBar auth={this.state.auth} logout={this.logout} />
        <div>
          <Route exact path="/" component={ VidContainerVar } />
          <Route path="/upload" render={ (renderProps) =>
              <Uploader history={ renderProps.history } auth={this.state.auth} addVideo={this.addVideo}/>
          } />
          <Route path="/login" render={ (renderProps) =>
              <LoginForm history={ renderProps.history } authSet={ this.authFetched } />
          } />
          <Route path="/register" component={ RegisterFormVar } />
        </div>
      </div>
    );
  }
}

export default App;
