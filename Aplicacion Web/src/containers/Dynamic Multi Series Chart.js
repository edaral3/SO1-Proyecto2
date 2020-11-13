import React, { Component } from 'react';
import CanvasJSReact from '../assets/canvasjs.react';
import url from '../url'
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var dataPoints1 = [];
var dataPoints2 = [];
var updateInterval = 2000;
//initial values
var yValue1 = 0;
var auxi = 0;
var auxi2 = "";

class DynamicMultiSeriesChart extends Component {

	constructor(){
		super();
		this.state = {
		  puntos: []
		};
	  }


	llenado(){
		fetch(url.url+'getRangoEdad')
		.then(res => res.json())
        .then(res => {
			dataPoints1 = []
			var longitud = res["data"].length;
			for(var i = 0; i < longitud;i++){

				auxi = res["data"][i]["cantidad"];
				auxi2 = res["data"][i]["edades"];
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
			animationEnabled: true,
			theme: "light2",
			title:{
				text: ""
			},
			axisX: {
				title: "Rango",
				reversed: true,
			},
			axisY: {
				title: "Cantidad",
				includeZero: true,
				labelFormatter: this.addSymbols
			},
			data: [{
				type: "bar",
				dataPoints: this.state.puntos
			}]
		}
		return (
		<div>
			<h2>RANGO DE EDADES</h2>
			<CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}

	
	
}

export default DynamicMultiSeriesChart;