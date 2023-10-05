import {AiFillStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'

import './index.css'

const JobDetailsList = props => {
  const {jobDetailsItem} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetailsItem
  console.log(jobDetailsItem)
  return (
    <div className="job-details-container">
      <div className="logo-title-rating-container">
        <img className="logo" alt="logo" src={companyLogoUrl} />
        <div className="title-rating-container">
          <h1 className="title-heading">{title}</h1>
          <div className="rating-container">
            <AiFillStar className="star-rating" />
            <p className="rating-text">{rating}</p>
          </div>
        </div>
      </div>

      <div className="location-internship-salary-container">
        <div className="location-internship-container">
          <div className="location-container">
            <GoLocation className="location-icon" />
            <p className="location-text">{location}</p>
          </div>
          <div className="employment-type-container">
            <p className="employment-type-text">{employmentType}</p>
          </div>
        </div>
        <p className="package-text">{packagePerAnnum}</p>
      </div>
      <hr />
    </div>
  )
}

export default JobDetailsList
