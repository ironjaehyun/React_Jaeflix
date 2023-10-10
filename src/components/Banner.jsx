import React from 'react'

const Banner = (props) => {
  const url = props.movie.results[8].poster_path
  // console.log(props)
  const title = props.movie.results[8].original_title
  const overview = props.movie.results[8].overview

  const src = `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${url}`
  return (
    <div className='poster'>
      <img src={src} className='poster__img'></img>

      <div className='poster__cont'>
      <h1>{title}</h1>
      <p>{overview}</p>
      </div>
    </div>
  )
}

export default Banner