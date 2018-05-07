import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import "../node_modules/video-react/dist/video-react.css";
import Uploader from './components/Uploader'
import VidContainer from './containers/VidContainer';
import RegisterForm from './components/RegisterForm'

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
      videos: [...this.state.videos.filter(video=> video.id !== parseInt(videoId))]
    }))
  }

  render() {
    return (
      <div className="App">
        {!localStorage.auth ? <RegisterForm authSet={ this.authFetched } /> : null}
        <Uploader auth={this.state.auth} addVideo={this.addVideo}/>
        <VidContainer auth={this.state.auth} videos={this.state.videos} deleteVideo={this.deleteVideo}/>
      </div>
    );
  }
}

export default App;
