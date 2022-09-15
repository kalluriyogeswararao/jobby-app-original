import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class Profile extends Component {
  state = {profileData: {}, showErrorMsg: false}

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/profile`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      const updateData = {
        imageUrl: data.profile_details.profile_image_url,
        name: data.profile_details.name,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({profileData: updateData})
    } else {
      this.setState({showErrorMsg: true})
    }
  }

  getProfileDetailsData = () => {
    const {profileData} = this.state
    const {imageUrl, name, shortBio} = profileData

    return (
      <div className="profile-container">
        <img src={imageUrl} alt={name} className="profile-image" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  render() {
    const {showErrorMsg} = this.state

    return (
      <>
        {showErrorMsg && (
          <button type="button" className="retry-btn">
            Retry
          </button>
        )}
        {!showErrorMsg && this.getProfileDetailsData()}
      </>
    )
  }
}

export default Profile
