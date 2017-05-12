/*Copyright DTCC 2016 All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
	
	http://www.apache.org/licenses/LICENSE-2.0
	
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.*/
var HyperledgerPeerIntf = function() {
	const hyperLedgerRESTEndpoint = process.env.HYP_REST_ENDPOINT || "http://tco7jtcwr.westus.cloudapp.azure.com";
	var async = require('async');
	var request = require('request');
	this.restCall = function(uri,completion) {
		var obj;
		async.series( [function (callback) {
				console.log( ' Querying Hyperledger ' ,uri);
				var options = {
					url: hyperLedgerRESTEndpoint + uri + '?peer=peer1',
					headers: {
						'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE0OTQ1MzAwODIsInVzZXJuYW1lIjoiSmltIiwib3JnTmFtZSI6Im9yZzEiLCJpYXQiOjE0OTQ1MjY0ODJ9.eh0DQQF9AdxKMM0mWwbaN4ERbXWgg6oz4CXzJsDfK1w',
						'cache-control': 'no-cache',
						'content-type': 'application/json',
						'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE0OTQ1MzAwODIsInVzZXJuYW1lIjoiSmltIiwib3JnTmFtZSI6Im9yZzEiLCJpYXQiOjE0OTQ1MjY0ODJ9.eh0DQQF9AdxKMM0mWwbaN4ERbXWgg6oz4CXzJsDfK1w'
					}
				};
				request(options, function (error, response, body) {
					if (!error && response.statusCode == 200) {
						//console.log( ' resp ' , body);
						if(body == null)
							callback(null,null);
						else {
							obj = JSON.parse(body)
							callback(null,obj);
						}
					} else {
						console.log(error);
						callback(error);
						//throw error;
					}
					
				})
			},
			function(callback) {
				   completion(obj);
				   callback();
			 }
			]
		);
		
	}
}


HyperledgerPeerIntf.prototype.chain = function(callBk) {
	this.restCall('/channels/mychannel',callBk);
}

HyperledgerPeerIntf.prototype.peers = function(callBk) {
	this.restCall('/network/peers',callBk);
}

HyperledgerPeerIntf.prototype.block = function(blockNum,callBk) {
	this.restCall('/channels/mychannel/blocks/'+blockNum,callBk);
}


module.exports = new HyperledgerPeerIntf();
