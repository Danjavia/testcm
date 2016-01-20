import React, { PropTypes, Component } from 'react'

// Import components here

class AdminPage extends Component {

	componentDidMount () {

		// Woopra Api credentials
		let site = 'wooprapp.danjavia.xyz'
	    let email = 'd@danjavia.xyz'
	    let appID = 'SY60JOBTT1X4F5A6BB0D1U7ZD4DESCEU'
	    let secretKey = 'bhYAr2D60MizKslHvh2kufDpg3JIw3nh1vX4Y9fDmhqWFUAH0hqLY4Ts3vDzhX6N'
	    let chartData = {}

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
			            // "report": reportObject,
			            // "segments": segmentsArray
			        })
			 
			    },
			    success: function ( data ) {
			    	console.log( data )

			        let rows = data.rows

			        $.each( rows, ( k, v ) => {
			        	chartData[ v.i ] = v.cells[ 0 ] 
			        })

					console.log( rows, data.rows, chartData )

			    }
			});

		  	pubnub.publish({
		  	  	channel: channel,
		  	  	message: {
		  	  		eon: chartData
		  	  	}
		  	});

		}, 1000);

		let channel = "c3-bar" + Math.random();
		
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
			            // "report": reportObject,
			            // "segments": segmentsArray
			        })
			 
			    },
			    success: function ( data ) {
			    	console.log( data )

			        let rows = data.rows

			        $.each( rows, ( k, v ) => {
			        	chartData[ v.i ] = v.cells[ 0 ] 
			        })

					console.log( rows, data.rows, chartData )

			    }
			});

		  	pubnub.publish({
			  	channel: 'c3-pie',
			  	message: {
			  	  	eon: chartData
			  	}
			});

		}, 1000);

		eon.chart({
		  channel: 'c3-pie',
		  generate: {
		    bindto: '#enceladus-dashboard-pie',
		    data: {
		      labels: true,
		      type: 'donut'
		    }
		  }
		});
	}

	render() {
		return (
			<section className="dashboard">
				<h3>Direct sales</h3>
				<div id="enceladus-dashboard-bar" style={{ width: 500 }}></div>
				<div id="enceladus-dashboard-pie" style={{ width: 500 }}></div>
			</section>
        )
	}
}

export default AdminPage