import { NavBar } from './components/NavBar'
import { Hero } from './components/Hero'

export function App(){
  return (
    <>
      <NavBar />
      <div className = 'container'>
        <Hero />
      </div>
    </>
  )
}