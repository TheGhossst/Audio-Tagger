import { NavBar } from './components/NavBar'
import { Hero } from './components/Hero'
import { MainContent } from './components/MainContent'

export function App(){
  return (
    <>
      <NavBar />
      <div className = 'container'>
        <Hero />
        <MainContent />
      </div>
    </>
  )
}