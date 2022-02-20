
if ($('body').find('#myChart').length !== 0) {


var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
	// The type of chart we want to create
	type: 'line', // also try bar or other graph types

	// The data for our dataset
	data: {
		labels: ["", "", "", "", "", "", "", "", "", "", "", ""],
		// Information about the dataset
    datasets: [{
			label: "",
			backgroundColor: '#edf1f6',
			borderColor: '#1c69d9',
			borderWidth: 2,
			data: [96.4, 120.8, 90.8, 130.4, 100.6, 105.2, 147.4, 100.8, 120.8, 140, 150.8, 182.6],
			fill: true,
			lineTension: 0.2,
			borderCapStyle: 'butt',
			borderDash: [],
			borderDashOffset: 0.0,
			borderJoinStyle: 'miter',
			pointBorderColor: "rgba(75,192,192,1)",
			pointBackgroundColor: "#fff",
			pointBorderWidth: 1,
			pointHoverRadius: 6,
			pointHoverBackgroundColor: "#fff",
			pointHoverBorderColor: "#ffc854", 
			pointHoverBorderWidth: 5,
			pointRadius: 0,
			pointHitRadius: 10,
		}]
	},

	// Configuration options
	options: {
		responsive: true,
    layout: {
      padding: 20,
	}, 
	
	legend: {
		display: false,
		position: 'top',
	},
		scales: {
			xAxes: [{
				gridLines: {
					display: false,
					drawBorder: false,
				}
			}],
			yAxes: [{
				gridLines: {
					display: false,
					drawBorder: false,
				},
				ticks: {
					display:false,
				}
			}]
		},
	}
});

}





if ($('body').find('#myChart-withdraw').length !== 0) {


	var ctx = document.getElementById('myChart-withdraw').getContext('2d');
	var chart = new Chart(ctx, {
		// The type of chart we want to create
		type: 'line', // also try bar or other graph types
	
		// The data for our dataset
		data: {
			labels: ["", "", "", "", "", "", "", "", "", "", "", ""],
			// Information about the dataset
		datasets: [{
				label: "",
				backgroundColor: '#fff9ee',
				borderColor: '#fec754',
				borderWidth: 2,
				data: [96.4, 120.8, 90.8, 130.4, 100.6, 105.2, 147.4, 100.8, 120.8, 140, 150.8, 142.6],
				fill: true,
				lineTension: 0.2,
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: "rgba(75,192,192,1)",
				pointBackgroundColor: "#fff",
				pointBorderWidth: 1,
				pointHoverRadius: 6,
				pointHoverBackgroundColor: "#fff",
				pointHoverBorderColor: "#ffc854", 
				pointHoverBorderWidth: 5,
				pointRadius: 0,
				pointHitRadius: 10,
			}]
		},
	
		// Configuration options
		options: {
			responsive: true,
		layout: {
		  padding: 20,
		}, 
		
		legend: {
			display: false,
			position: 'top',
		},
			scales: {
				xAxes: [{
					gridLines: {
						display: false,
						drawBorder: false
					}
				}],
				yAxes: [{
					gridLines: {
						display: false,
						drawBorder: false
					},
					ticks: {
						display:false,
					}
				}]
			},
		}
	});
	
	}


	

if ($('body').find('#myChart-client').length !== 0) {


	var ctx = document.getElementById('myChart-client').getContext('2d');
	var chart = new Chart(ctx, {
		// The type of chart we want to create
		type: 'line', // also try bar or other graph types
	
		// The data for our dataset
		data: {
			labels: ["", "", "", "", "", "", "", "", "", "", "", ""],
			// Information about the dataset
		datasets: [{
				label: "",
				backgroundColor: '#edf1f6',
				borderColor: '#1c69d9',
				borderWidth: 2,
				data: [110.4, 110.8, 120.8, 140.4, 145.6, 130.2, 127.4, 120.8, 120.8, 140, 150.8, 152.6],
				fill: true,
				lineTension: 0.2,
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: "rgba(75,192,192,1)",
				pointBackgroundColor: "#fff",
				pointBorderWidth: 1,
				pointHoverRadius: 6,
				pointHoverBackgroundColor: "#fff",
				pointHoverBorderColor: "#ffc854", 
				pointHoverBorderWidth: 5,
				pointRadius: 0,
				pointHitRadius: 10,
			}]
		},
	
		// Configuration options
		options: {
			responsive: true,
		layout: {
		  padding: 20,
		}, 
		
		legend: {
			display: false,
			position: 'top',
		},
			scales: {
				xAxes: [{
					gridLines: {
						display: false,
						drawBorder: false
					}
				}],
				yAxes: [{
					gridLines: {
						display: false,
						drawBorder: false
					},
					ticks: {
						display:false,
					}
				}]
			},
		}
	});
	
	}







		

if ($('body').find('#myChart-yearly').length !== 0) {


	var ctx = document.getElementById('myChart-yearly').getContext('2d');
	var chart = new Chart(ctx, {
		// The type of chart we want to create
		type: 'line', // also try bar or other graph types
		
	
		// The data for our dataset
		data: {
			labels: ["1", "3", "5", "9", "11", "13", "15", "17", "19", "21", "23", "25","27","29","31","33","35","37","39","41"],
			// Information about the dataset
		datasets: [{
				label: "",
				backgroundColor: '#edf1f6',
				borderColor: '#1c69d9',
				borderWidth: 2,
				data: [ 35, 40, 27, 25, 35, 30, 33, 35, 38, 45,45,30, 35, 44 ,45,46, 65, 64, 70, 85],
				fill: true,
				lineTension: 0.2,
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: "rgba(75,192,192,1)",
				pointBackgroundColor: "#fff",
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: "#fff",
				pointHoverBorderColor: "#ffc854", 
				pointHoverBorderWidth: 5,
				pointRadius: 0,
				pointHitRadius: 10,
			}]
		},
	
		
		// Configuration options
		options: {
			responsive: true,
		layout: {
		  padding: 20,
		}, 
		tooltips:{
			backgroundColor:'#4e76a4',
			position:'average',
			titleAlign:'center',
			cornerRadius:6,
		},
		
		legend: {
			display: false,
			position: 'top',
		},
			scales: {
				xAxes: [{
					gridLines: {
						display: false,
						drawBorder: false
					}
				}],
				yAxes: [{
					gridLines: {
						display: false,
						drawBorder: false
					},
					ticks: {
						display:false,
					}
				}]
			},   
		}
		
	});
	
	}