import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import Profile from '../Profile'
import JobItem from '../JobItem'

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
    const {searchInput} = this.state
    this.setState({apiStatus: apiStatusConstraints.inprogress})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=FULLTIME&minimum_package=1000000&search=${searchInput}`
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
      console.log(updateData)
    }
  }

  renderJobdDisplayPage = () => {
    const {jobsDataList} = this.state

    return (
      <ul>
        {jobsDataList.map(eachJob => (
          <JobItem eachJob={eachJob} key={eachJob.id} />
        ))}
      </ul>
    )
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
              {employmentTypesList.map(eachType => {
                const onClickEmployId = () => {
                  console.log(eachType.employmentTypeId)
                }

                return (
                  <li className="employ-item" key={eachType.employmentTypeId}>
                    <input
                      type="checkbox"
                      className="checkbox"
                      id={eachType.employmentTypeId}
                      onClick={onClickEmployId}
                    />
                    <label htmlFor={eachType.employmentTypeId}>
                      {eachType.label}
                    </label>
                  </li>
                )
              })}
            </ul>
            <hr />
            <h1 className="employment-heading">Salary Range</h1>
            <ul className="all-types">
              {salaryRangesList.map(eachItem => (
                <li className="employ-item" key={eachItem.salaryRangeId}>
                  <input
                    type="radio"
                    className="checkbox"
                    id={eachItem.salaryRangeId}
                  />
                  <label htmlFor={eachItem.salaryRangeId}>
                    {eachItem.label}
                  </label>
                </li>
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
            <div className="jobs-display">{this.renderJobdDisplayPage()}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
