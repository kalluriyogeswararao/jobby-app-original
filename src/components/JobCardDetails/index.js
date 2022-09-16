import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import SimilarJobsItemDetails from '../SimilarJobsItemDetails'
import './index.css'

const JobCardDetails = props => {
  const {jobDataList} = props
  const {jobDetails, similarJobs} = jobDataList
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    skills,
    lifeAtCompany,
  } = jobDetails
  const {description, imageUrl} = lifeAtCompany

  return (
    <div className="job-card-bg-container">
      <div className="job-card-container">
        <div className="job-details-container">
          <img src={companyLogoUrl} alt={title} className="logo" />
          <div>
            <h1 className="job-title">{title}</h1>
            <div className="job-rating-container">
              <img
                src="https://www.freepnglogos.com/uploads/star-png/star-vector-png-transparent-image-pngpix-21.png"
                alt="star"
                className="star"
              />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-and-employment-container">
          <div className="location-and-employ">
            <div className="location-container">
              <MdLocationOn className="location-icon" />
              <p className="location">{location}</p>
            </div>
            <div className="employment-container">
              <BsFillBriefcaseFill className="employ-icon" />
              <p className="employ-type">{employmentType}</p>
            </div>
          </div>
          <p className="salary">{packagePerAnnum}</p>
        </div>
        <hr className="hr-line" />
        <h1 className="description-card-heading">Description</h1>
        <p className="description">{jobDescription}</p>

        <p className="skills-heading">Skills</p>
        <ul className="all-skills">
          {skills.map(eachSkill => (
            <div className="skill-container">
              <img
                src={eachSkill.imageUrl}
                alt={eachSkill.name}
                className="skill-logo"
              />
              <p className="skill-name">{eachSkill.name}</p>
            </div>
          ))}
        </ul>
        <h1 className="life-at-company">Life At Company</h1>
        <div className="life-container">
          <p className="life-at-company-description ">{description}</p>
          <img src={imageUrl} alt="company" className="life-image" />
        </div>
      </div>

      <h1 className="similar-heading">Similar Jobs</h1>
      <ul className="similar-jobs">
        {similarJobs.map(job => (
          <SimilarJobsItemDetails similarJob={job} key={job.id} />
        ))}
      </ul>
    </div>
  )
}

export default JobCardDetails
