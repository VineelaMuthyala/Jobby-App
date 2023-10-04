import {AiFillStar} from 'react-icons/ai'
import './index.css'

const JobDetailsList = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails

  return (
    <div className="job-details-container">
      <div className="logo-title-rating-container">
        <img className="logo" alt="logo" src={companyLogoUrl} />
        <div className="title-rating-container">
          <h1 className="title-heading">{employmentType}</h1>
          <div className="rating-container">
            <AiFillStar className="star-rating" />
            <p className="rating-text">{rating}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobDetailsList
