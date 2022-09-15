import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import Profile from '../Profile'

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
  state = {apiStatus: apiStatusConstraints.initial, searchInput: ''}

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
    const data = await response.json()
    console.log(data)
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
                <li className="employ-item" key={eachType.employmentTypeId}>
                  <input
                    type="checkbox"
                    className="checkbox"
                    id={eachType.label}
                  />
                  <label htmlFor={eachType.label}>{eachType.label}</label>
                </li>
              ))}
            </ul>
            <hr />
            <h1 className="employment-heading">Salary Range</h1>
            <ul className="all-types">
              {salaryRangesList.map(eachItem => (
                <li className="employ-item" key={eachItem.salaryRangeId}>
                  <input
                    type="radio"
                    className="checkbox"
                    id={eachItem.label}
                  />
                  <label htmlFor={eachItem.label}>{eachItem.label}</label>
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
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
