import { useState, useEffect } from "react"
import { location } from "./types"
import Table from "./components/Table"
import axios from "axios"
import "./App.css"

function App() {
	const [location, setLocation] = useState<location>({ lat: 0, long: 0 })
	const [loading, setLoading] = useState<boolean>(false)
	const [weather, setWeather] = useState<any>(null)
	const [sunrise, setSunrise] = useState<any>(null)

	const findMe = () => {
		setLoading(true)
		try {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const lat = position.coords.latitude
					const long = position.coords.longitude

					setLocation({
						lat: lat,
						long: long,
					})
					// Construct the URL with latitude and longitude as query parameters
					const astroAPIURL = `http://www.7timer.info/bin/api.pl?lon=${long}&lat=${lat}&product=astro&output=json`
					
					const sunriseAPIURL = `https://api.sunrisesunset.io/json?lat=${lat}&lng=${long}`
					const astroAPI = axios.get(astroAPIURL)
					const sunriseAPI = axios.get(sunriseAPIURL)
					axios.all([astroAPI, sunriseAPI]).then(
						// add astro api response to weather state
						axios.spread((...responses) => {
							const astroResponse = responses[0]
							const sunriseResponse = responses[1]
							const astroData = astroResponse.data.dataseries
							const sunriseData = sunriseResponse.data.results
							setWeather(astroData)
							setSunrise(sunriseData)
							setLoading(false)
						})
					)
				},
				(error) => {
					console.error("Error getting location:", error)
				}
			)
		} catch (err) {
			console.log(err)
		}
	}

	let report
	if (weather && !loading) {
		console.log(sunrise)
		report = <Table weather={weather} />
	} else if (!weather && !loading) {
		{
			report = (
				<div className="loading">
					<p>Click locate to get weather</p>
				</div>
			)
		}
	} else if ((!weather && loading) || (weather && loading)) {
		report = (
			<div className="loading">
				<p>Loading...</p>
			</div>
		)
	}

	return (
		<>
			<div>
				<h1>Astro Weather</h1>
				<button onClick={findMe}>Locate 📍</button>
			</div>
			{report}
		</>
	)
}

export default App
