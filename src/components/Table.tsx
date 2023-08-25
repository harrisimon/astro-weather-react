import { useState } from "react"
import { addHours } from "../helpers/convertHrsToDate"

const Table = (props: any) => {
    const { weather } = props
    const [isFahrenheit, setIsFahrenheit] = useState(true);
    const toggleTemperatureUnit = () => {
        setIsFahrenheit(!isFahrenheit);
      };
	const headerColumns = [
		"Cloudcover",
		"Seeing",
		"Transparency",
		"Lifted Index",
		"RH2m",
		"Temp2m",
		"Precip Type",
		"Wind (10m)",
	]

	// make the background of the table cells change color based on the value
	// of the data point



	return (
		<div className="table-container">
			<table className="weather-table">
				<thead>
					<tr>
						<th className="blank-header"></th>
						{weather.map((dataPoint: any, index: number) => (
							<th key={index} scope="col">
								{addHours(dataPoint.timepoint)}
							</th>
						))}
					</tr>
				</thead>
                
				<tbody>
					{headerColumns.map((header, index) => (
						<tr key={index}>
							<th scope="row">{
                            header === "Temp2m" ?
                            <button onClick={toggleTemperatureUnit}>
                                {isFahrenheit ? "°F" : "°C"}
                            </button>
                            :
                            header}</th>
							{weather.map(
								(dataPoint: any, dataIndex: number) => (
                                    <td key={dataIndex}>
                                    {header === "Wind (10m)"
                                      ? `${dataPoint.wind10m.direction} ${dataPoint.wind10m.speed} m/s`
                                      : header === "Temp2m"
                                      ? isFahrenheit

                                      ? `${((dataPoint.temp2m * 9/5) + 32).toFixed(0)} °F` : `${dataPoint.temp2m.toFixed(0)} °C`
                                      : header === "Precip Type"
                                      ? dataPoint.prec_type
                                      : dataPoint[header.toLowerCase().replace(" ", "_")]}
                                  </td>
								)
							)}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default Table
