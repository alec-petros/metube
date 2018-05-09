import React, { Component } from 'react';
import {
  BrowserRouter as Switch,
  Redirect,
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
import SearchContainer from './containers/SearchContainer'

const url = "http://localhost:3000/videos"

class App extends Component {

  state = {
    videos: [],
    search: "",
    allVideos: []
  }

  fetchVideos(){
    fetch(url)
    .then(r => r.json())
    .then(json => this.setState({
      videos: json,
      allVideos: json
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

  handleSearch = (e) => {
    this.setState({search: e.target.value})
    if (e.target.value !== "") {
      this.setState({
        videos: this.state.allVideos.filter(video => video.data.attributes.name.toLowerCase().includes(this.state.search.toLowerCase()))
      })
    } else {
      this.setState({
        videos: this.state.allVideos
      })
    }
  }

  addVideo = (newVideo) => {
    let videoObj = {data: {
      id: newVideo.data.id,
      attributes: {
        name: newVideo.data.attributes.name,
        handle: newVideo.data.attributes.handle,
        url: newVideo.data.attributes.url,
        user_id: newVideo.data.attributes.user_id
      }
    }}
    this.setState({
      allVideos: [...this.state.allVideos, videoObj],
      videos: this.state.allVideos
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
      allVideos: [...this.state.allVideos.filter(video=> video.data.id !== videoId)],
      videos: this.state.allVideos
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

    const selectVideo = (data) => {
      let video = this.state.videos.find(v => v.data.id == parseInt(data.match.params.id, 10))
      if (video) {
        return <Video auth={this.state.auth} key={video.data.attributes.handle} video={video} deleteVideo={this.deleteVideo}/>
      } else {
        return ''
      }
    }

    return (
      <div className="App">
        <NavBar auth={this.state.auth} logout={this.logout} search={this.state.search} handleChange={this.handleSearch} />
        <div id="main-div">
            <Route exact path="/" component={ VidContainerVar } />
            <Route path='/:id' component={selectVideo} />
            <Route path="/search" render={ (renderProps) =>
                <SearchContainer history={ renderProps.history } auth={this.state.auth} videos={this.state.searchResults} selectVideo={this.selectVideo}/>
            } />
            <Route path="/upload" render={ (renderProps) =>
                <Uploader history={ renderProps.history } auth={this.state.auth} addVideo={this.addVideo}/>
            } />
            <Route path="/register" render={ (renderProps) =>
                <RegisterForm history={ renderProps.history } authSet={ this.authFetched } />
            } />
            <Route path="/login" render={ (renderProps) =>
                <LoginForm history={ renderProps.history } authSet={ this.authFetched } />
            } />
        </div>
      </div>
    );
  }
}

export default App;
