import React, { Component } from 'react';
import CanvasJSReact from '../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var dataPoints1 = [];
var dataPoints2 = [];
var updateInterval = 2000;
//initial values
var yValue1 = 0;
var auxi = 0;
var auxi2 = "";

class DynamicMultiSeriesChart2 extends Component {
	constructor(){
		super();
		this.state = {
		  puntos: []
		};
	  }

	llenado(){
		fetch('http://localhost:5000/getDepartamentos')
		.then(res => res.json())
        .then(res => {
			dataPoints1 = []
			var longitud = res["data"].length;
			for(var i = 0; i < longitud;i++){

				auxi = res["data"][i]["cantidad"];
				auxi2 = res["data"][i]["nombre"];
				yValue1 = Math.round(auxi);
				dataPoints1.push({
					y: yValue1,
			  		label: auxi2
				});
			}
			this.setState({puntos:dataPoints1})
			})
		dataPoints2 = dataPoints1;
	}
	
	render() {
		this.llenado();
		const options = {
			exportEnabled: true,
			animationEnabled: true,
			title: {
				text: ""
			},
			data: [{
				type: "pie",
				startAngle: 75,
				toolTipContent: "<b>{label}</b>: {y}%",
				showInLegend: "true",
				legendText: "{label}",
				indexLabelFontSize: 16,
				indexLabel: "{label} - {y}%",
				dataPoints: this.state.puntos
			}]
		}
		return (
		<div>
			<h2>DEPARTAMENTOS AFECTADOS</h2>
			<CanvasJSChart options = {options}
				onRef={ref => this.chart = ref} 
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default DynamicMultiSeriesChart2;