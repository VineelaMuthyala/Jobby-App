import {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'

import Cookies from 'js-cookie'

import Header from '../Header'

import './index.css'

class Home extends Component {
  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="login" />
    }
    return (
      <div className="home-container">
        <Header />
        <div className="home-text-container">
          <h1 className="home-heading">Find The Job That Fits Your Life</h1>
          <p className="home-text">
            Millions of people are searching for jobs, salary, information,
            company reviews. Find the job that fits your abilities and
            potential.
          </p>
          <Link to="/jobs">
            <button className="home-button" type="button">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

export default Home
