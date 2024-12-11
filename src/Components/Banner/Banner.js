import { useEffect, useState } from 'react'
import axios from '../../axios';
import './Banner.css'
import { API_KEY, IMAGE_URL } from '../../constants/constants';
import YouTube from 'react-youtube';

const Banner = () => {
  const [movie, setMovie] = useState([])
  const [trailerId, setTrailerId] = useState('')

  useEffect(() => {
    axios.get(`/trending/all/week?api_key=${API_KEY}&language=en-US`).then((response) => {
      const results = response.data.results;
      const randomIndex = Math.floor(Math.random() * results.length);
      setMovie(results[randomIndex]);
    })
  }, [])

  const handleTrailer = (id) => {
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response => {
      console.log(response.data)
      if (response.data.results.length !== 0) {
        setTrailerId(response.data.results[0])
      } else {
        console.log("No Trailer Found")
      }
    }).catch((error) => {
      console.error("Error fetching data: ", error);
    });
  }

  const opts = {
    height: '600',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  return trailerId ? <YouTube videoId={trailerId.key} opts={opts} /> : (
    <div
      style={{ backgroundImage: `url(${movie ? IMAGE_URL + movie.backdrop_path : ""})` }} className='banner'>
      <div className='content'>
        <h1 className='title'>{movie ? movie.title || movie.name : ''}</h1>
        <div className='banner_buttons'>
          <button className='button' onClick={() => {
            handleTrailer(movie.id)
          }}>Play</button>
          <button className='button'>My list</button>
        </div>
        <h1 className='description'>{movie ? movie.overview : ''}</h1>
      </div>
      <div className="fade">

      </div>
    </div>
  )
}

export default Banner
