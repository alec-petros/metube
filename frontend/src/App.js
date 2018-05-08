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
import Video from './components/Video'

const url = "http://localhost:3000/videos"

class App extends Component {

  state = {
    videos: [],
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
    let videoObj = {data: {
      id: newVideo.id,
      attributes: {
        name: newVideo.name,
        handle: newVideo.handle,
        url: newVideo.url,
        user_id: newVideo.user_id
      }
    }}
    this.setState({
      videos: [...this.state.videos, videoObj]
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
      videos: [...this.state.videos.filter(video=> video.data.attributes.id !== parseInt(videoId, 10))]
    }))
  }



  logout = () => {
    localStorage.removeItem("auth")
    this.setState({ auth: null })
  }

  render() {

    
    const VidContainerVar = (props) => {
      return (<VidContainer auth={this.state.auth} videos={this.state.videos} deleteVideo={this.deleteVideo} selectVideo={this.selectVideo}/>)
    }

    const RegisterFormVar = (props) => {
      return (<RegisterForm authSet={ this.authFetched } />)
    }

    const selectVideo = (data) => {
      let video = this.state.videos.find(v => v.id === parseInt(data.match.params.id))
      if (video) {
        return <Video auth={this.state.auth} key={video.data.attributes.handle} video={video} deleteVideo={this.deleteVideo}/>
      } else {
        return 'Loading'
      }
    }

    return (
      <div className="App">
        <NavBar auth={this.state.auth} logout={this.logout} />
        <div>
          <Route exact path="/" component={ VidContainerVar } />
          <Route path='/:id' component={selectVideo} />
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
