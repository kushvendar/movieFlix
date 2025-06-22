import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import Search from './components/Search'
import Loader from './components/Loader'
import Moviecard from './components/Moviecard'
import { useDebounce } from 'react-use'
import { updateSearchCount, getTrendingMovie } from './appwrite'



const API_BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

 const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:`Bearer ${API_KEY}`
  }
};

// 1:43:00

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [errorMessage,setErrorMessage] = useState('')
  const [movieList,setMovieList] = useState([])
  const [isLoading,setLoading] = useState(false)
  const [debounceInput, setDebounceInput] = useState('')
  const [trendingList, setTrendingList] = useState([])

  // search optimization is required to prevent server crash
  // avoid hiting rate limiting

  useDebounce(()=> setDebounceInput(searchTerm),600,[searchTerm])

  const fetchMovie = async (query='') => {
    setLoading(true)
    try {
      const endPoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURI(query)}` : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`
      const response = await fetch(endPoint,API_OPTIONS)

      if(!response.ok){
        throw new Error('failed to fetch movies')
      }

      const data = await response.json()
      // console.log(data)

      if(data.response===false){
        setErrorMessage(data.Error || 'Failed to fetch movies')
        setMovieList([])
        return
      }
      setMovieList(data.results || [] )

      updateSearchCount(query,data.results[0])

    } catch (error) {
      console.log(`error code : ${error}`)
        setErrorMessage('Error fetching movies. Please try again later')
    } finally {
      setLoading(false)
    }
  } 
  const fetchTrendingList = async () => {
      try {
        const data = await getTrendingMovie()
        setTrendingList(data)
        console.log(trendingList)
      } catch (error) {
        console.log(`Error fetching trending movies ${error}`)
      }
    }

  useEffect(()=>{
    fetchMovie(debounceInput)
  },[debounceInput])

  useEffect(()=>{
    fetchTrendingList()
  },[])

  return (
    <main>
      <div className='pattern'></div>
      <div className='wrapper'>
        <Header/>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}
        />
        {/* conditional rendering of trending page */}
      
         {trendingList.length>0 && 
          <section className='trending'>
          <h2>Trending Movies</h2>
          <ul>
            {trendingList.map((movie,index)=>(
            <li key={movie.$id}>
              <p>{index+1}</p>
              <img src={movie.poster_url} alt={movie.title} />
            </li>
          ))}

          </ul>
          </section>
         }   
        <section className='all-movies'>
          <h2 className='mt-[40px]'>All Movies</h2>

          {isLoading?(<Loader/>):
          errorMessage ? (<p className='text-red-500'>{errorMessage}</p>):
          (<ul>
            {movieList.map((movie)=>(
            <Moviecard key={movie.id} movie={movie}/>
          ))}
          </ul>)
          }

        </section>
      </div>
    </main>
  )
}

export default App
