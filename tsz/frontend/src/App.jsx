import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header.jsx' 


const API = "http://localhost:3200/api";
function App() {
  const [stats, setStats] = useState([]);

  const fetchStats = async () =>{
    try{
      const res = await fetch(API+"/tasks/stats")
      const data = await res.json();
      setStats(data)
      console.log(data);
    }catch(error){
      console.log(error)
    }
  }


  useEffect(()=>{
    fetchStats();
  }, [])

  return (
    <>
      <div>
        <Header stats={stats}/>
      </div>
    </>
  )
}

export default App
