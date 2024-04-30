import  { useEffect } from 'react'
import { Link } from 'react-router-dom'

import "./Header.css"
import { useDispatch } from 'react-redux'
import { fetchData } from '../redux/slice/salesDataSlice'
import { AppDispatch } from '../redux/store'


export default function Header() {
  const dispatch: AppDispatch = useDispatch();
  

    useEffect(()=>{
        dispatch(fetchData())
    },[dispatch])
  return (
    <><div className='Header_container'>
        <div className='tag_section'>
                      <Link to="/">Home</Link>
                  
                      <Link to="/dashboard">Dashboard</Link>
                      </div> 
          
        
      </div><div>

            

          </div></>
  )
}