import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get details on all companies */

  static async getCompanies() {
    let res = await this.request(`companies`);
    return res.companies;
  }

  /** Get details on all companies that include a specified name */

  static async getCompaniesByName(name) {
    let res = await this.request(`companies`, {name});
    return res.companies;
  }


  /** Get details on all jobs */

  static async getJobs() {
    let res = await this.request(`jobs`);
    return res.jobs;
  }

  /** Get details on all jobs that include a specified name */

  static async getJobsByName(name) {
    let res = await this.request(`jobs`, {name});
    return res.jobs;
  }

  /** Signup as a new user */

  static async signup(username, password, firstName, lastName, email) {
    const newUserData = {username, password, firstName, lastName, email}
    let res = await this.request(`auth/register`, newUserData, 'post');
    return res.token;
  }

  /** Login as a currently existing user */

  static async login(username, password) {
    let res = await this.request(`auth/token`, {username, password}, 'post');
    return res.token;
  }

  /** Get the data of a currently existing user is authorized */

  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Update the data of a currently existing user */

  static async updateUser(username, password, firstName, lastName, email) {
    let res = await this.request(`users/${username}`, {password, firstName, lastName, email}, 'patch');
    return res.user;
  }

  /** Apply for a job by id as a currently existing user */

  static async applyForJob(username, jobId) {
    let res = await this.request(`users/${username}/jobs/${jobId}`, {}, 'post');
    return res.applied;
  }

  // obviously, you'll add a lot here ...
}

// for now, put token ("testuser" / "password" on class)
JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi