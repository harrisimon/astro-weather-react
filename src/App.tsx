import { useState, useEffect } from "react"
import { location } from "./types"
import Table from "./components/Table"
import axios from "axios"
import "./App.css"

function App() {
	const [location, setLocation] = useState<location>({ lat: 0, long: 0 })
	const [loading, setLoading] = useState<boolean>(false)
	const [weather, setWeather] = useState<any>(null)
	const [time, setTime] = useState(new Date())

	useEffect(() => {
		setTime(new Date())
	}, [])



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
					const apiUrl = `http://www.7timer.info/bin/api.pl?lon=${long}&lat=${lat}&product=astro&output=json`

					// Use Axios to make the API request
					axios
						.get(apiUrl)
						.then((response) => {
							const data = response.data.dataseries
							// You can further process the response data here
							setWeather(data)
							setLoading(false)
						})
						.catch((error) => {
							console.error("Error fetching data:", error)
						})
				},
				(error) => {
					console.error("Error getting location:", error)
				}
			)
		} catch (err) {
			console.log(err)
		}
	}
	let results
	let resultsTable
	if (!weather && !loading) {
		{
			results = (
				<div className="loading">
					<p>Click locate to get weather</p>
				</div>
			)
		}
	} else if ((!weather && loading) || (weather && loading)) {
		results = (
			<div className="loading">
				<p>Loading...</p>
			</div>
		)
	} else {
		// resultsTable = weather.dataseries.map((hour: any, index: number) => (
		// 	<div>
		// 		<tr>
		// 			<th>{addHours(time, hour.timepoint)}</th>
		// 		</tr>
		// 		<tr>{hour.cloudcover}</tr>
		// 		<tr>{hour.lifted_index}</tr>
		// 		<tr>{hour.prec_type}</tr>
		// 		<tr>{hour.transparency}</tr>
		// 	</div>
		// ))
		// results = (
		// 	<div className="container">
		// 		<div id="key">
		// 			<table id="key">
		// 				<tr>Time</tr>
		// 				<tr>Cloud Cover</tr>
		// 				<tr>Lifted Index</tr>
		// 				<tr>Precipitation</tr>
		// 				<tr>Transparency</tr>
		// 			</table>
		// 		</div>
		// 		<div className="results-table">
		// 			<table>{resultsTable}</table>
		// 		</div>
		// 	</div>
		// )
	}
	let report
	if(weather){
		report = (

			<Table weather={weather}/>
		)
	}


	return (
		<>
			<div>
				<h1>Astro Weather</h1>
				<button onClick={findMe}>Get Location 📍</button>
			</div>
			{report}
			
		</>
	)
}

export default App
