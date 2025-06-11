import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import Search from './components/Search'

const API_BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

 const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:`Bearer ${API_KEY}`
  }
};

// 1:23:00

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [errorMessage,setErrorMessage] = useState('')
  const [movieList,setMovieList] = useEffect([])
  const [isLoading,setLoading] = useState(false)


  const fetchMovie = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`,API_OPTIONS)

      if(!response.ok){
        throw new Error('failed to fetch movies')
      }

      const data = await response.json()

      if(data.Response===false){
        setErrorMessage(data.Error || 'Failed to fetch movies')
        setMovieList([])
        return
      }
      setMovieList(data.results || [] )
      console.log(data)

    } catch (error) {
      console.log(`error code ${error}`)
        setErrorMessage('Error fetching movies. Please try again later')
    } finally {
    
      setLoading(false)
      return
    }
  } 

  useEffect(()=>{
    fetchMovie()
  },[])



  return (
    <main>
      <div className='pattern'></div>
      <div className='wrapper'>
        <Header/>
        <Search 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm}
        />
          
        <section className='all-movies'>
          <h2>All Movies</h2>

          {isLoading?(<p className='text-white'>Loading...</p>):
          errorMessage ? (<p className='text-red-500'>{errorMessage}</p>):
          (<ul>
            {movieList.map((movie)=>(
            <p>{movie.title}</p>
          ))}
          </ul>)
          }

        </section>
      </div>
    </main>
  )
}

export default App
