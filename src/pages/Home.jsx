import React, { useEffect,useState } from 'react'
import axios from '../axios'
import { useDispatch, useSelector } from 'react-redux'
import {
    getPopularMovies,
    getTopRatedMovies,
    getUpComingMovies
} from '../redux/movieSlice';
import Banner from '../components/Banner';
import MoonLoader from "react-spinners/MoonLoader";
import MovieSlide from '../components/MovieSlide';
import MovieCard from '../components/MovieCard';

const Home = () => {
    
    //기존에 있던 session Movie를 지워버릴거임(새로고침문제)
    sessionStorage.removeItem('movie')

    const dispatch = useDispatch();
    const { popularMovies, topRatedMovies, upComingMovies} = useSelector(state => state.movies);
    const [loading, setLoading] = useState(true);
    console.log(popularMovies, topRatedMovies, upComingMovies)
    
    /**화면이 렌더링 되자마자, API를 가져올 것 */
    useEffect(() => {
        const popularApi = axios.get('/popular?language=ko-KR&page=1');
        const topRatedApi = axios.get('/top_rated?language=ko-KR&page=1');
        const upComingApi = axios.get('/upcoming?language=ko-KR&page=1');

        //Promise.all을 사용하여 여러번의 API요청을 병렬로 처리
        Promise
            .all([popularApi,topRatedApi,upComingApi])
            .then(res => {
                console.log(res)

                //API 에서 받아온 데이터를 store안에 넣고싶음! => useDispatch
                dispatch(getPopularMovies(res[0].data));
                dispatch(getTopRatedMovies(res[1].data));
                dispatch(getUpComingMovies(res[2].data));
            })
            .then(()=>{
                setLoading(false)
            })  
    }, [])


    // store에 값이 잘 들어갔는지 확인해보는 용도
    // useEffect(()=>{
    //     console.log('store의 상태', popularMovies, topRatedMovies, upComingMovies)
    // },[popularMovies, topRatedMovies, upComingMovies])

    if(loading){
        return(<MoonLoader color='#ffffff' loading={loading} size={50}></MoonLoader>)
    }

    return (
        <div>
            {/* ? =
                LifeCycle 생명주기 - 컴포넌트
                - popularMovies 라는 애가 존재하면 => result
                - 존재하지않는다면 배너 띄울필요x
            */}
            {/* 로딩스피너를 만들면 데이터가 안왔을 때는 로딩만 리턴이 되기 때문에 별도로 조건부 처리를 해 줄 필요가 없다. */}

            {/* {popularMovies.results && */}
               <Banner movie={popularMovies}/> 
            {/* } */}


            <p>Popular Movies</p>
            {/* 카드슬라이드 */}
            {popularMovies &&
                <MovieSlide movies={popularMovies} type="popularMovies"></MovieSlide>
            }

            <p>TopRated Movies</p>
            {/* 카드슬라이드 */}
            {topRatedMovies &&
                <MovieSlide movies={topRatedMovies} type="topRatedMovies"></MovieSlide>
            }

            <p>UpComing Movies</p>
            {/* 카드슬라이드 */}
            {upComingMovies &&
                <MovieSlide movies={upComingMovies} type="upComingMovies"></MovieSlide>
            }

        </div>
    )
}

export default Home