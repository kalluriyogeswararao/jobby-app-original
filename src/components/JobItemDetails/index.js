import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import JobCardDetails from '../JobCardDetails'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JonItemDetails extends Component {
  state = {apiStatus: apiStatusConstants.initial, jobDataList: {}}

  componentDidMount() {
    this.getJobDetils()
  }

  getJobDetils = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()

      const updateData = {
        jobDetails: {
          companyLogoUrl: data.job_details.company_logo_url,
          companyWebsiteUrl: data.job_details.company_website_url,
          employmentType: data.job_details.employment_type,
          title: data.job_details.title,
          id: data.job_details.id,
          jobDescription: data.job_details.job_description,
          lifeAtCompany: {
            description: data.job_details.life_at_company.description,
            imageUrl: data.job_details.life_at_company.image_url,
          },
          location: data.job_details.location,
          packagePerAnnum: data.job_details.package_per_annum,
          rating: data.job_details.rating,
          skills: data.job_details.skills.map(skill => ({
            name: skill.name,
            imageUrl: skill.image_url,
          })),
        },
        similarJobs: data.similar_jobs.map(job => ({
          companyLogoUrl: job.company_logo_url,
          employmentType: job.employment_type,
          id: job.id,
          jobDescription: job.job_description,
          location: job.location,
          rating: job.rating,
          title: job.title,
        })),
      }
      this.setState({
        jobDataList: updateData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickRetry = () => {
    this.getJobDetils()
  }

  renderInProgress = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="40" width="40" />
    </div>
  )

  getDisplayJobDetails = () => {
    const {jobDataList} = this.state
    return (
      <div>
        <JobCardDetails jobDataList={jobDataList} />
      </div>
    )
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

  renderGetJobDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderInProgress()
      case apiStatusConstants.success:
        return this.getDisplayJobDetails()
      case apiStatusConstants.failure:
        return this.onFailureDisplayJobs()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderGetJobDetails()}
      </div>
    )
  }
}

export default JonItemDetails
