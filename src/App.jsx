import './App.css'
import Header from './components/Header'
import Search from './components/Search'

const App = () => {
  return (
    <main>
      <div className='pattern'></div>
      <div className='wrapper'>
          <Header/>
          <Search/>
      </div>
    </main>
  )
}

export default App
