import React, { useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getPopularMovies } from '../redux/movieSlice';
import { useState } from 'react';
import { Badge } from 'react-bootstrap';
import axios from '../axios'

const MovieDetail = () => {

    // redux에 있는 데이터 가져오기
    const { popularMovies, topRatedMovies, upComingMovies } = useSelector(state => state.movies);


    // useParams
    // Route 작성하는 부분에 /:id <- path 작성
    const { id } = useParams();
    // //console.log(popularMovies, topRatedMovies, upComingMovies)

    // useSearchParams
    // url 을 작성하는 부분에 ?type=어쩌구저쩌구
    const [searchParams] = useSearchParams();
    const type = searchParams.get('type');
    //console.log(`내가 가져온 영화 의 id ${id}, 타입 ${type}`)

    const [movie, setMovie] = useState();
    const [reviews, setReviews] = useState([]);
    /** 내가 가져올 영화에 대한 데이터를 추출하는 함수 */
    const getMovieData = () => {
        if (type === "popularMovies") {
            setMovie(popularMovies.results.find((item) => item.id == id))
        } else if (type === "topRatedMovies") {
            setMovie(topRatedMovies.results.find((item) => item.id == id))
        } else {
            setMovie(upComingMovies.results.find((item) => item.id == id))
        }
    }

    /** 내가 선택한 영화에 대한 리뷰를 가져오는 함수 */
    const getReviewData = () => {
        // /{movie_id}/reviews
        axios.get(`/${id}/reviews`)
            .then(res => setReviews(res.data.results))
    }
    console.log(reviews)

    useEffect(() => {
        //console.log('현재 movie', movie)
        if (movie) {
            // movie 라는 state에 새로운 값이 들어가면, 그 값을 sessionStorage 안에 저장
            sessionStorage.setItem('movie', JSON.stringify(movie));
            getReviewData();
        }
    }, [movie])

    // redux의 값이 가지고 와졌을 때,
    useEffect(() => {
        const sessionMovie = JSON.parse(sessionStorage.getItem('movie'))
        //console.log('session Movie', sessionMovie)

        // 세션 안에 값이 존재한다면 (이미 클릭한 전적) => 세션안에 있는 값을 movie 세팅
        if (sessionMovie) {
            setMovie(sessionMovie)
        } else {
            // 세션 안에 값이 없다면 (최초 클릭) => Redux 로 가서 movie 세팅
            getMovieData()
        }

    }, [popularMovies.results,
    topRatedMovies.result,
    upComingMovies.result,
        id,
        type
    ])

    return (
        <div>
            {movie &&
                <div className='movie-detail'>
                    <div className='movie-box'>
                        <div className="detail-poster" style={
                            {
                                backgroundImage: `url(https://www.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path})`
                            }
                        }></div>
                        <br />
                        <div className='detail-item'>
                            <div>
                                {/* react-bootstrap Badge */}
                                {movie.adult
                                    ? <Badge bg="danger">청소년관람불가</Badge>
                                    : <Badge bg="success">전체관람가</Badge>
                                }

                            </div>
                            <h1>{movie.title}</h1>
                            <div>
                                <span>평점 : {movie.vote_average}점</span> {" "}
                                <span>개봉일 : {movie.release_date}</span>
                            </div>
                            <div>{movie.overview}</div>
                        </div>
                    </div>
                    <hr />
                    <h2>Review</h2>
                    

                    {reviews.length === 0
                    ? <p>등록된 리뷰가 없습니다</p>
                    :(reviews.map(item =>
                        <div key={item.id}>
                            <p>{item.content}</p>
                            <p>
                                작성자 {item.author}
                                작성일 {item.created_at}
                            </p>
                        </div>))
                    
                    }
                    
                </div>
            }
        </div>
    )
}

export default MovieDetail