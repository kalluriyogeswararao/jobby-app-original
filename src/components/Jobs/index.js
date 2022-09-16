import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Profile from '../Profile'
import JobItem from '../JobItem'
import EmployType from '../EmployType'
import SalaryRange from '../SalaryRange'

import './index.css'

const apiStatusConstraints = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'IN_PROGRESS',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    apiStatus: apiStatusConstraints.initial,
    searchInput: '',
    jobsDataList: [],
    employType: '',
    salaryRange: '',
  }

  componentDidMount() {
    this.getAlljobsDetails()
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value.toLowerCase()})
  }

  onClickSearch = () => {
    this.getAlljobsDetails()
  }

  getAlljobsDetails = async () => {
    this.setState({apiStatus: apiStatusConstraints.inprogress})
    const {searchInput, employType, salaryRange} = this.state
    console.log(salaryRange)

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employType}&minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updateData = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobsDataList: updateData,
        apiStatus: apiStatusConstraints.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstraints.failure})
    }
  }

  onClickEmployItem = id => {
    const {employType} = this.state
    let string
    if (employType.length > 0) {
      string = [employType, id].join(',')
    } else {
      string = id
    }
    this.setState(
      {
        employType: string,
      },
      this.getAlljobsDetails,
    )
  }

  onClickRetry = () => {
    this.getAlljobsDetails()
  }

  onClickSalaryRange = id => {
    const {salaryRange} = this.state
    let salaryString
    if (salaryRange.length > 0) {
      salaryString = [salaryRange, id].join(',')
    } else {
      salaryString = id
    }
    this.setState({salaryRange: salaryString}, this.getAlljobsDetails)
  }

  renderInProgress = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="40" width="40" />
    </div>
  )

  renderJobs = () => {
    const {jobsDataList} = this.state

    return (
      <ul>
        {jobsDataList.map(eachJob => (
          <JobItem eachJob={eachJob} key={eachJob.id} />
        ))}
      </ul>
    )
  }

  noJobsFound = () => (
    <div className="no-jobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-job-description">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  renderJobDisplayPage = () => {
    const {jobsDataList} = this.state

    if (jobsDataList.length > 0) {
      return this.renderJobs()
    }
    return this.noJobsFound()
  }

  onFailureDisplayJobs = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view"
      />
      <h1 className="oops-error">Oops! Something Went Wrong</h1>
      <p className="failure-error-msg">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" className="retry-btn" onClick={this.onClickRetry}>
        Retry
      </button>
    </div>
  )

  allJobsDisplayDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstraints.inprogress:
        return this.renderInProgress()
      case apiStatusConstraints.success:
        return this.renderJobDisplayPage()
      case apiStatusConstraints.failure:
        return this.onFailureDisplayJobs()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="total-container">
        <Header />
        <div className="jobs-container">
          <div className="all-details-container">
            <Profile />
            <hr />
            <h1 className="employment-heading">Type of Employment</h1>
            <ul className="all-types">
              {employmentTypesList.map(eachType => (
                <EmployType
                  eachType={eachType}
                  key={eachType.employmentTypeId}
                  onClickEmployItem={this.onClickEmployItem}
                />
              ))}
            </ul>
            <hr />
            <h1 className="employment-heading">Salary Range</h1>
            <ul className="all-types">
              {salaryRangesList.map(eachItem => (
                <SalaryRange
                  eachItem={eachItem}
                  key={eachItem.salaryRangeId}
                  onClickSalaryRange={this.onClickSalaryRange}
                />
              ))}
            </ul>
          </div>
          <div className="all-jobs-container">
            <div className="search-container">
              <input
                type="search"
                className="search-input"
                placeholder="Search"
                onChange={this.onChangeSearchInput}
              />
              <button
                type="button"
                className="search-button"
                onClick={this.onClickSearch}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <div className="jobs-display">{this.allJobsDisplayDetails()}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
