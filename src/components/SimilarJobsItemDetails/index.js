import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobs = props => {
  const {similarJob} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJob

  return (
    <div className="similar-job-container">
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
      <h1 className="description-card-heading">Description</h1>
      <p className="description">{jobDescription}</p>
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
    </div>
  )
}

export default SimilarJobs
