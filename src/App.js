import React, {useState, useEffect} from "react";
import JoblyApi from "./api";
import Routes from './Routes';
import DataContext from "./Context";
import NavBar from "./NavBar";
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [companies, setCompanies] = useState([])
  const [jobs, setJobs] = useState([])
  const [user, setUser] = useState({})
    
  useEffect(() => {
      async function getData() {
        let companies = await JoblyApi.getCompanies()
        let jobs = await JoblyApi.getJobs()
        setCompanies(companies)
        setJobs(jobs)
        setIsLoading(false);
        console.log(companies)
        console.log(jobs)
      }
      getData();
    }, []);

  if (isLoading) {
    return <h1>Loading &hellip;</h1>;
  }

  return (
    <div className="App">
      <DataContext.Provider value={{jobs, companies, user}}>
        <NavBar />
        <Routes />
      </DataContext.Provider>
    </div>
  );
}

export default App;
