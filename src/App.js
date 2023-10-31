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
        let companies = await JoblyApi.getCompanies()
        let jobs = await JoblyApi.getJobs()
        setCompanies(companies)
        setJobs(jobs)
        setIsLoading(false);
        if (localStorage.token) {
          JoblyApi.token = localStorage.token
          const decoded = jwtDecode(localStorage.token)
          const username = decoded.username
          const user = await JoblyApi.getUser(username)
          setUser(user)
        }
      }
      getData();
    }, []);
    
  useEffect(() => {
      async function decodeToken() {
        if (localStorage.token) {
          const decoded = jwtDecode(localStorage.token)
          const username = decoded.username
          JoblyApi.token = localStorage.token
          const user = await JoblyApi.getUser(username)
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

  /** Call the api to register as a new user */
  async function register({username, password, firstName, lastName, email}) {
    const token = await JoblyApi.signup(username, password, firstName, lastName, email)
    JoblyApi.token = token
    setLocalUserToken(token)
    setIsLoading(true);
  }

  /** Call the api to log in as a user */
  async function login({username, password}) {
    const token = await JoblyApi.login(username, password)
    JoblyApi.token = token
    setLocalUserToken(token)
    setIsLoading(true);
  }

  /** log out of the front-end application */
  function logout() {
    JoblyApi.token = ''
    setLocalUserToken('')
    setIsLoading(true);
  }

  /** Call the api to update a user */
  async function updateUser(username, {password, firstName, lastName, email}) {
    const user = await JoblyApi.updateUser(username, password, firstName, lastName, email)
    setUser(user)
  }


  /** Call the api to apply for a job */
  async function apply(username, jobId){
    const applied = await JoblyApi.applyForJob(username, jobId)
    user.applications.push(applied) //Update front-end user
  }

  return (
    <div className="App">
      <DataContext.Provider value={{jobs, companies, user}}>
        <MethodContext.Provider value={{register, login, logout, updateUser, apply}}>
          <NavBar />
          <Routes />
        </MethodContext.Provider>
      </DataContext.Provider>
    </div>
  );
}

export default App;
