import React, { useState } from "react"

const Table = () => {
	const [data, setData] = useState([
		{
			key: "1",
			value: "This is the first row",
		},
		{
			key: "2",
			value: "This is the second row",
		},
		{
			key: "3",
			value: "This is the third row",
		},
	])

	return (
		<div>
			<table>
				<thead>
					<tr>
						<th>Key</th>
						<th>Value</th>
					</tr>
				</thead>
				<tbody>
					{data.map((row, index) => (
						<tr key={row.index}>
							<td>{row.key}</td>
							<td>{row.value}</td>
						</tr>
					))}
				</tbody>
			</table>
			<div style={{ height: '200px, overflow: "scroll"' }}>
				{data.map((row, index) => (
					<div key={row.key}>{row.value}</div>
				))}
			</div>
		</div>
	)
}

export default Table
