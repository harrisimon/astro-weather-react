import { useState, useEffect } from "react"
import { location } from "./types"
import Table from "./components/Table"
import Loading from "./components/Loading"
import axios from "axios"
import "./App.css"

function App() {
	const [location, setLocation] = useState<location>({ lat: 0, long: 0 })
	const [loading, setLoading] = useState<boolean>(false)
	const [weather, setWeather] = useState<any>(null)
	const [sunrise, setSunrise] = useState<any>(null)
	const [isDarkMode, setIsDarkMode] = useState<boolean>(false)

	useEffect(() => {
		if (isDarkMode) {
			document.body.classList.add("dark-mode")
		} else {
			document.body.classList.remove("dark-mode")
		}
	}, [isDarkMode])

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
					let start = performance.now()
					const astroAPIURL = `http://www.7timer.info/bin/api.pl?lon=${long}&lat=${lat}&product=astro&output=json`

					const sunriseAPIURL = `https://api.sunrisesunset.io/json?lat=${lat}&lng=${long}`
					const astroAPI = axios.get(astroAPIURL)
					const sunriseAPI = axios.get(sunriseAPIURL)
					Promise.all([astroAPI, sunriseAPI]).then(
						// add astro api response to weather state
						(response) => {
							const [astroResponse, sunriseResponse] = response
							const astroData = astroResponse.data.dataseries
							const sunriseData = sunriseResponse.data.results
							setWeather(astroData)
							setSunrise(sunriseData)
							setLoading(false)
						}
					)

			
					let end = performance.now()
					console.log(end - start)
				},
				(error) => {
					console.error("Error fetching data", error)
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
				<Loading />
			</div>
		)
	}

	return (
		<>
			<div>
				<h1>Astro Weather</h1>
				<button onClick={() => setIsDarkMode(!isDarkMode)} style={{"margin": "10px"}}>
					{isDarkMode ? "Light Mode 🌝" : "Dark Mode 🌚"}
				</button>
				<button onClick={findMe}>Locate 📍</button>
			</div>
			{report}
		</>
	)
}

export default App
