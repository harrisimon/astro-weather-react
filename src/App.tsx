import { useState, useEffect } from "react"
import { location } from "./types"
import axios from "axios"
import "./App.css"

function App() {
	const [location, setLocation] = useState<location>({ lat: 0, long: 0 })
  const [loading, setLoading] = useState<boolean>(false)
	const [weather, setWeather] = useState<any>(null)
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setInterval(() => {
      setTime(new Date());

    }, 1000);
  }, []);

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
							console.log(response.data)
							// You can further process the response data here
							setWeather(response.data)
							// console.log(weather.dataseries)
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
	if (!weather && !loading) {
		{
			results = <p>Click locate to get weather</p>
		}
	} else if ((!weather && loading) || (weather && loading)) {
    results = <p>Loading...</p>
  }else {
		results = weather.dataseries.map((hour: any, index: number) => {
			return (
				<div key={index} className="hr">
					<p>{hour.timepoint} +hrs</p>
					<p>cloud cover {hour.cloudcover}</p>
					<p>lifted index {hour.lifted_index}</p>
					<p>Precipation {hour.prec_type}</p>
					<p>Transparency {hour.transparency}</p>
				</div>
			)
		})
	}

	return (
		<>
			<div>
				<h1>Astro Weather</h1>
				<button onClick={findMe}>Get Location 📍</button>
			</div>
			<div className="results-table">{results}</div>
		</>
	)
}

export default App
