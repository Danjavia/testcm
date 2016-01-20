import React, { PropTypes, Component } from 'react'

// Import components here

import Navbar from '../navbar'

class AdminPage extends Component {

	componentDidMount () {

		// Woopra Api credentials
		let site = 'wooprapp.danjavia.xyz'
	    let email = 'd@danjavia.xyz'
	    let appID = 'SY60JOBTT1X4F5A6BB0D1U7ZD4DESCEU'
	    let secretKey = 'bhYAr2D60MizKslHvh2kufDpg3JIw3nh1vX4Y9fDmhqWFUAH0hqLY4Ts3vDzhX6N'
	    let chartData = {}
	    let chartData2 = {}
	    let chartData3 = {}

	    // Pubnub initialize
		let pubnub = PUBNUB.init({
  			publish_key: 'pub-c-2d01e482-3f99-4631-a44d-4439a97e769a',
  			subscribe_key: 'sub-c-ac24dde8-bf12-11e5-837e-02ee2ddab7fe'
		});


		setInterval ( () => {
			$.ajax({
			    type: 'POST',
			    url: 'https://www.woopra.com/rest/2.2/report',
			    crossDomain: true,
			    dataType: "json",
			    jsonp: false,
			    cache: false,
			    beforeSend: function (xhr) {
			        xhr.setRequestHeader( 'Authorization', 'Basic ' + btoa( appID + ':' + secretKey ));
			    },
			    data: {
			        request: JSON.stringify({
			            "website": site,
			            "date_format": "MM/dd/yyyy",
			            "start_day": "01/01/2016",
			            "end_day": "01/22/2016",
			            "limit": 100,
			            "offset": 0,
			            "report_id": "reports:schema:action:646272055:1354571749",
			        })
			 
			    },
			    success: function ( data ) {

			        let rows = data.rows

			        $.each( rows, ( k, v ) => {
			        	chartData[ v.i ] = v.cells[ 0 ] 
			        })

			    }
			});

		  	pubnub.publish({
		  	  	channel: channel,
		  	  	message: {
		  	  		eon: chartData
		  	  	}
		  	});

		}, 1000 )

		let channel = "c3-bar" + Math.random()
		
		eon.chart({
		  	channel: channel,
		  	pubnub: pubnub,
		  	generate: {
		  	  	bindto: '#enceladus-dashboard-bar',
		  	  	data: {
		  	  	  	labels: true,
		  	  	  	type: 'bar'
		  	  	},
		  	  	bar: {
		  	  	  	width: {
		  	  	  	  	ratio: 0.5
		  	  	  	}
		  	  	},
		  	  	tooltip: {
		  	  	    show: false
		  	  	}
		  	}
		})
		
		// donut chart
		setInterval ( () => {
			$.ajax({
			    type: 'POST',
			    url: 'https://www.woopra.com/rest/2.2/report',
			    crossDomain: true,
			    dataType: "json",
			    jsonp: false,
			    cache: false,
			    beforeSend: function (xhr) {
			        xhr.setRequestHeader( 'Authorization', 'Basic ' + btoa( appID + ':' + secretKey ));
			    },
			    data: {
			        request: JSON.stringify({
			            "website": site,
			            "date_format": "MM/dd/yyyy",
			            "start_day": "01/01/2016",
			            "end_day": "01/22/2016",
			            "limit": 100,
			            "offset": 0,
			            "report_id": "reports:schema:action:646272055:1354571749",
			        })
			 
			    },
			    success: function ( data ) {

			        let rows = data.rows

			        $.each( data.rows, ( k, v ) => {
			        	chartData2[ v.i ] = v.cells[ 0 ] 
			        })

					pubnub.publish({
				      channel: 'c3-donut',
				      message: {
				        eon: chartData2
				      }
				    })

			    }
			});

		}, 3000 )

		// Firts load
		pubnub.publish({
	      channel: 'c3-donut',
	      message: {
	        eon: chartData2
	      }
	    })
		
		eon.chart({
		    pubnub: pubnub,
		    channel: 'c3-donut',
		    generate: {
		      bindto: '#enceladus-dashboard-pie',
		      data: {
		        labels: true,
		        type: 'donut'
		      }
		    }
		})

		setInterval ( () => {
			$.ajax({
			    type: 'POST',
			    url: 'https://www.woopra.com/rest/2.2/report',
			    crossDomain: true,
			    dataType: "json",
			    jsonp: false,
			    cache: false,
			    beforeSend: function (xhr) {
			        xhr.setRequestHeader( 'Authorization', 'Basic ' + btoa( appID + ':' + secretKey ));
			    },

			    data: {
			        request: JSON.stringify({
			            "website": site,
			            "date_format": "MM/dd/yyyy",
			            "start_day": "01/01/2016",
			            "end_day": "01/22/2016",
			            "limit": 5,
			            "offset": 0,
			            "report_id": "reports:schema:visitor:265713450",
			        })
			    },

			    success: function ( data ) {

			        $.each( data.rows, ( k, v ) => {
			        	chartData3[ v.i ] = v.cells[ 2 ] 
			        })

			    }
			});

		  	pubnub.publish({
		  	  	channel: 'c3-chart-tech',
		  	  	message: {
		  	  		eon: chartData3
		  	  	}
		  	});

		}, 2000 )
		
		eon.chart({
		    pubnub: pubnub,
			channel: 'c3-chart-tech',
		  	generate: {
		  	  	bindto: '#enceladus-dashboard-points',
		  	  	data: {
		  	  	  	labels: true,
		  	  	  	type: 'bar'
		  	  	},
		  	  	bar: {
		  	  	  	width: {
		  	  	  	  	ratio: 0.5
		  	  	  	}
		  	  	},
		  	  	tooltip: {
		  	  	    show: false
		  	  	}
		  	}
		})

	}

	render() {
		return (
			<section className="dashboard" id="dashboard">
				<Navbar />
				<h3 className="center-align">Dashboard</h3>
				<section className="dashboard__properties">
					<article className="dashboard_entity" style={{ width: 500 }}>
						<h4 className="center-align">Direct Sales</h4>
						<div id="enceladus-dashboard-bar"></div>
					</article>
					<article className="dashboard_entity" style={{ width: 500 }}>
						<h4 className="center-align">Sales Percentage</h4>
						<div id="enceladus-dashboard-pie"></div>
					</article>
					<article className="dashboard_entity" style={{ width: 500 }}>
						<h4 className="center-align">Active users</h4>
						<div id="enceladus-dashboard-points"></div>
					</article>
				</section>
				<h3 className="center-align">Realtime actions tracking</h3>
			</section>
        )
	}
}

export default AdminPage