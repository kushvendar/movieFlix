import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import Search from './components/Search'

const API_BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

 const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:`Bearer ${API_KEY}`
  }
};


const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [errorMessage,setErrorMessage] = useState('')

  const fetchMovie = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`)

      if(!response.ok){
        throw new Error('failed to fetch movies')
      }
      const data = await response.json()

      console.log(data)

    } catch (error) {
      console.log(`error code ${error}`)
        setErrorMessage('Error fetching movies. Please try again later')
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

          {errorMessage && <p className='text-red-500'>{errorMessage}</p>}

        </section>
      </div>
    </main>
  )
}

export default App
