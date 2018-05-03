import React from 'react';
import Filestack from 'filestack-js'
import ReactFilestack from 'filestack-react';
const api_key = "AHe7lVMVWSVycM21THpXwz"
const video_url = "http://localhost:3000/videos"
const client = Filestack.init('api_key');


class Uploader extends React.Component {

  state = {
    name: "",
    description: ""
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

  handleSubmit = (resp) => {
    if (this.state.name && this.state.description) {
      fetch(video_url, {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({
          video: {
            name: this.state.name,
            description: this.state.description,
            handle: resp.filesUploaded[0].handle,
            url: resp.filesUploaded[0].url
          }
        })
      }).then(r => r.json()).then(json => console.log(json))
    } else {
      alert("Please enter name and description")
    }

  }

  render() {
    return (
      <div>
        <form onChange={this.handleChange}>
          <input name="name" placeholder="Name" value={this.state.name}></input><br></br>
          <input name="description" type="text-area" placeholder="Description" value={this.state.description}></input>
        </form>
        <ReactFilestack
          apikey={api_key}
          buttonText="Upload Song"
          buttonClass="classname"
          onSuccess={this.handleSubmit}
        />
      </div>
    )
  }
}

export default Uploader
