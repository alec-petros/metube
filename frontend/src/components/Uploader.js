import React from 'react';
import Filestack from 'filestack-js'
import ReactFilestack from 'filestack-react';
const api_key = "AHe7lVMVWSVycM21THpXwz"
const video_url = "http://localhost:3000/videos"
const client = Filestack.init('api_key');

const options = {
  accept: 'video/*',
  maxFiles: 1,
  storeTo: {
    location: 's3',
  },
};


class Uploader extends React.Component {

  state = {
    name: "",
    description: "",
    handle: "",
    url: ""
  }

  handleChange = (e) => {
    if (e.target.name === "name") {
      this.setState({
        name: e.target.value
      })
    } else {
      this.setState({
        description: e.target.value
      })
    }
  }

  handleUpload = (resp) => {
    this.setState({
      handle: resp.filesUploaded[0].handle,
      url: resp.filesUploaded[0].url
    })
  }

  handleSubmit = () => {
    if (this.state.name && this.state.description && this.state.url) {
      fetch(video_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/javascript",
          "Authorization": `Token token=${ this.props.auth.token }`
        },
        body: JSON.stringify({
          video: {
            name: this.state.name,
            description: this.state.description,
            handle: this.state.handle,
            url: this.state.url,
            user_id: 1
          }
        })
      }).then(r => r.json()).then(json => console.log(json))
    } else {
      alert("Please complete all fields")
    }
  }

  render() {
    return (
      <div>
        <form onChange={this.handleChange}>
          <input name="name" placeholder="Name" value={this.state.name}></input><br></br>
          <input name="description" type="textarea" placeholder="Description" value={this.state.description}></input>
        </form>
        <ReactFilestack
          apikey={api_key}
          options={options}
          buttonText="Upload Video"
          buttonClass="classname"
          onSuccess={this.handleUpload}
        /> {this.state.url ? this.state.name : null} <br></br>
        <button onClick={this.handleSubmit}>Submit</button><br></br>
      </div>
    )
  }
}

export default Uploader
