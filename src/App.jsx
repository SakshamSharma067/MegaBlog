import { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'
import authService from "./appwrite/auth"
import './App.css'
import {login,logout} from "./store/authSlice"
import { Outlet } from 'react-router'
import { Footer, Header } from './components'

function App() {
  const [loading,setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
    })
    .finally(()=> setLoading(false))
  },[])

  return !loading ? (
    <div className='min-h-screen w-320 flex flex-wrap content-between bg-gray-400'>
      <div className='w-full'>
        <Header/>
        <main>
         <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  ):null
}

export default App
