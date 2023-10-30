import React, {useState, useEffect} from "react";
import { jwtDecode } from "jwt-decode";
import JoblyApi from "./api";
import useLocalStorage from "./Hooks";
import Routes from './Routes';
import {DataContext, MethodContext} from "./Context";
import NavBar from "./NavBar";
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [companies, setCompanies] = useState([])
  const [jobs, setJobs] = useState([])
  const [user, setUser] = useState({})
  const initialToken = localStorage.token ? localStorage.token : ''
  const [localUserToken, setLocalUserToken] = useLocalStorage('token', initialToken)
    
  useEffect(() => {
      async function getData() {
        console.log(localStorage.token)
        let companies = await JoblyApi.getCompanies()
        let jobs = await JoblyApi.getJobs()
        setCompanies(companies)
        setJobs(jobs)
        setIsLoading(false);
        if (localStorage.token) {
          const decoded = jwtDecode(localStorage.token)
          console.log(decoded)
          const username = decoded.username
          console.log(username)
          console.log(JoblyApi.token)
          const user = await JoblyApi.getUser(username)
          console.log(user)
          setUser(user)
        }
      }
      getData();
    }, []);
    
  useEffect(() => {
      async function decodeToken() {
        if (localStorage.token) {
          const decoded = jwtDecode(localStorage.token)
          console.log(decoded)
          const username = decoded.username
          console.log(username)
          console.log(JoblyApi.token)
          const user = await JoblyApi.getUser(username)
          console.log(user)
          setUser(user)
          setIsLoading(false)
        } else {
          setUser({})
          setIsLoading(false)
        }
      }
      decodeToken();
    }, [localUserToken]);

  if (isLoading) {
    return <h1>Loading &hellip;</h1>;
  }

  async function register({username, password, firstName, lastName, email}) {
    const token = await JoblyApi.signup(username, password, firstName, lastName, email)
    JoblyApi.token = token
    setLocalUserToken(token)
    setIsLoading(true);
  }

  async function login({username, password}) {
    const token = await JoblyApi.login(username, password)
    JoblyApi.token = token
    console.log(JoblyApi.token)
    setLocalUserToken(token)
    console.log(localStorage.token)
    setIsLoading(true);
  }

  function logout() {
    JoblyApi.token = ''
    setLocalUserToken('')
    console.log(localStorage.token)
    setIsLoading(true);
  }

  return (
    <div className="App">
      <DataContext.Provider value={{jobs, companies, user}}>
        <MethodContext.Provider value={{register, login, logout}}>
          <NavBar />
          <Routes />
        </MethodContext.Provider>
      </DataContext.Provider>
    </div>
  );
}

export default App;
