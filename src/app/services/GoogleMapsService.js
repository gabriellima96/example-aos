const axios = require('axios')
const apiKey = process.env.API_KEY_GOOGLE
const urlPlacesApi = `https://maps.googleapis.com/maps/api/place/textsearch/json?key=${apiKey}&query=`
const urlDirectionsApi = `https://maps.googleapis.com/maps/api/directions/json?key=${apiKey}`

class GoogleMapsService {
  async findDetailsPlace (place) {
    const data = await this.axiosGet(
      `${urlPlacesApi}${encodeURIComponent(place)}`
    )

    if (data.status === 'ZERO_RESULTS') return { address: place }

    const { formatted_address, types } = data.results[0]
    return { address: formatted_address, types }
  }

  async findDistanceAndDuration (origin, destination) {
    const { status, routes } = await this.axiosGet(
      `${urlDirectionsApi}&origin=${encodeURIComponent(
        origin
      )}&destination=${encodeURIComponent(destination)}`
    )

    if (status !== 'OK') return { distance: '', duration: '' }

    return {
      distance: routes[0].legs[0].distance.text,
      duration: routes[0].legs[0].duration.text
    }
  }

  async axiosGet (url) {
    const { data } = await axios.get(url)
    return data
  }
}

module.exports = new GoogleMapsService()
