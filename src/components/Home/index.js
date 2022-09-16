import {Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const Home = props => {
  const {history} = props
  const onClickFindJobsBtn = () => {
    history.replace('/jobs')
  }

  return (
    <div className="home-bg-container">
      <Header />
      <div className="homepage-details-container">
        <h1 className="main-heading">Find The Job That Fits Your Life</h1>
        <p className="home-page-description">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <Link to="/jobs">
          <button
            type="button"
            className="find-jobs-btn"
            onClick={onClickFindJobsBtn}
          >
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Home
