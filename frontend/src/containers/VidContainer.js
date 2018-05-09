import React from 'react';
import { Link } from 'react-router-dom';


const VidContainer = (props) => {


    const videos = props.videos.map(video => {
      return (<div key={video.data.id} className='video-link'>
        <div className="card mx-auto" style={{width: 18 + "rem"}}>
          <img className="card-img-top" src="/images/wiki-video.svg" alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title">{video.data.attributes.name}</h5>
            <p className="card-text">{video.data.attributes.description}</p>
            <a href={`/${video.data.id}`} className="btn btn-primary">Go To Video</a>
          </div>
        </div>
      </div>)
    })

    return (
      <div id="vid-container">
        <h1>Videos</h1>
        <div className="ui four column grid">
          <div className="row">
              {videos}
          </div>
        </div>

      </div>
    )
}

export default VidContainer
