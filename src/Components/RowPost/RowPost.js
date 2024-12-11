import { useEffect, useState } from 'react'
import './RowPost.css'
import axios from '../../axios'
import {API_KEY, IMAGE_URL} from '../../constants/constants'
import YouTube from 'react-youtube'
const RowPost = (props) => {

  const [movies, setMovies] = useState([])
  const [trailerId, setTrailerId] = useState('')

  useEffect(()=>{
    axios.get(props.linkRef).then((response) =>{
      setMovies(response.data.results)
    }).catch((error) => {
      console.error("Error fetching data: ", error);
    });
  },[props.linkRef])

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleTrailer = (id) => {
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response => {
      console.log(response.data)
      if(response.data.results.length !== 0) {
        setTrailerId(response.data.results[0])
      } else {
        console.log("No Trailer Found")
      }
    }).catch((error) => {
      console.error("Error fetching data: ", error);
    });
  }

  return (
    <div className="row">
        <h2>{props.title}</h2>

        <div className="posters">
        {movies.map((movie) => {
        return(
              <img key={movie.id} onClick={() => {
                handleTrailer(movie.id)
              }} className={props.isSmall?'smallPoster':'poster'} src={movie?IMAGE_URL + movie.poster_path:''} alt="poster" />            
            )
          })}
        </div>
        {trailerId?<YouTube videoId={trailerId.key} opts={opts}/>:<></>}
    </div>
  )
}

export default RowPost