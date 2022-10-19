import logo from './logo.svg';
import './App.css';
import { SerchBox } from './component/serchBox';
import countries from './utlies/country';
import { useEffect, useState } from 'react';

function App() {
  const [query,setQuery]=useState("")
  const [loading,setLoading]=useState(false)
  const [suggestion,setSuggestion]=useState([])

  useEffect(()=>{
    if(query==""){
      setSuggestion([])
    }
    else{

      let newSuggestion=countries.filter((item)=>item.country.toLowerCase().indexOf(query)!="-1"?true:false).map((item)=>item.country)
      setSuggestion(newSuggestion)
      setTimeout(()=>{
        setLoading(false)

      },2000)
    }
    

  },[query])
 

  return (
    <div className="App">
      
        <h1>Serch-Bar</h1>
        <h2>query:-{query}</h2>
        <SerchBox setQuery={setQuery} suggestion={suggestion} loading={loading} setLoading={setLoading}/>
    </div>
  );
}

export default App;
