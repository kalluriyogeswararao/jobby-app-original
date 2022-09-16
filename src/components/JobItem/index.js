import './index.css'

const JobItem = props => {
  const {eachJob} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = eachJob

  return (
    <li className="job-container">
      <div className="title-container">
        <img src={companyLogoUrl} alt={title} className="company-logo" />
        <h1 className="title-heading">{title}</h1>
        <p className="rating">{rating}</p>
      </div>
    </li>
  )
}

export default JobItem
