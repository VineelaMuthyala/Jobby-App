import {Component} from 'react'
import {Loader} from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {AiOutlineSearch} from 'react-icons/ai'
import JobDetailsList from '../JobDetailsList'
import Header from '../Header'
import './index.css'

const apiStatusValues = {
  failure: 'FAILURE',
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
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
    jobDetails: [],
    profileDetails: '',
    apiStatus: apiStatusValues.initial,
    inputValue: '',
  }

  componentDidMount() {
    this.getTheData()
  }

  onClickEmploymentList = event => {
    console.log(event.target.id)
  }

  onChangeSearchValue = event => {
    const searchInput = event.target.value
    this.setState({inputValue: searchInput})
  }

  onClickSearchButton = () => {
    const {inputValue, jobDetails} = this.state
    const filteredList = jobDetails.filter(
      eachItem => eachItem.title.toLowerCase() === inputValue.toLowerCase(),
    )
    this.setState({jobDetails: filteredList})
  }

  getUpDatedData = data => {
    const updatedData = {
      companyLogoUrl: data.company_logo_url,
      employmentType: data.employment_type,
      id: data.id,
      jobDescription: data.job_description,
      location: data.location,
      packagePerAnnum: data.package_per_annum,
      rating: data.rating,
      title: data.title,
    }
    return updatedData
  }

  getTheData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
    const profileUrl = 'https://apis.ccbp.in/profile'
    const jobsUrl = 'https://apis.ccbp.in/jobs'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const profileResponse = await fetch(profileUrl, options)

    const fetchedProfile = await profileResponse.json()
    const jobsResponse = await fetch(jobsUrl, options)

    const fetchedJobsData = await jobsResponse.json()

    if (profileResponse.ok && jobsResponse.ok === true) {
      // update the data

      const data = fetchedProfile.profile_details
      const upDatedProfile = {
        name: data.name,
        profileImageUrl: data.profile_image_url,
        shortBio: data.short_bio,
      }
      const updatedJobsData = fetchedJobsData.jobs.map(eachItem =>
        this.getUpDatedData(eachItem),
      )
      console.log(updatedJobsData)
      console.log(upDatedProfile)
      this.setState({
        jobDetails: updatedJobsData,
        profileDetails: upDatedProfile,
        apiStatus: apiStatusValues.success,
      })
    } else {
      this.setState({apiStatus: apiStatusValues.failure})
    }
  }

  renderLoading = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </div>
  )

  renderJobDetailsPage = () => {
    const {jobDetails, profileDetails, inputValue} = this.state

    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="succuss-container">
        <div className="container-1">
          <div className="profile-container">
            <img className="profile-image" alt={name} src={profileImageUrl} />
            <h1 className="profile-name">{name}</h1>
            <p className="profile-description">{shortBio}</p>
          </div>
          <hr />
          <div className="employment-salary-container">
            <h1 className="heading-1">Type Of Employment</h1>
            <ul>
              {employmentTypesList.map(eachItem => (
                <li
                  key={eachItem.employmentTypeId}
                  onClick={this.onClickEmploymentList}
                >
                  <input
                    className="emp-check-box"
                    type="checkbox"
                    id={eachItem.employmentTypeId}
                    name={eachItem.employmentTypeId}
                    value={eachItem.label}
                  />
                  <label htmlFor={eachItem.employmentTypeId}>
                    {eachItem.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <hr />
          <div className="employment-salary-container">
            <h1 className="heading-1">Salary Range</h1>
            <ul>
              {salaryRangesList.map(eachItem => (
                <li key={eachItem.salaryRangeId}>{eachItem.label}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="container-2">
          <div className="search-container">
            <input
              type="search"
              placeholder="Search"
              className="input-search"
              onChange={this.onChangeSearchValue}
              value={inputValue}
            />
            <button
              className="search-button"
              type="button"
              onClick={this.onClickSearchButton}
            >
              <AiOutlineSearch className="search-icon" />
            </button>
          </div>
          <div>
            {jobDetails.map(eachItem => (
              <JobDetailsList key={eachItem.id} jobDetailsItem={eachItem} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  renderFailure = () => <div>Failure</div>

  renderPage = () => {
    const {apiStatus} = this.state
    console.log(apiStatus)
    switch (apiStatus) {
      case apiStatusValues.success:
        return this.renderJobDetailsPage()
      case apiStatusValues.failure:
        return this.renderFailure()
      case apiStatusValues.inProgress:
        return this.renderLoading()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="jobs-container">
        <Header />
        <div>{this.renderPage()}</div>
      </div>
    )
  }
}

export default Jobs
