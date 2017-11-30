var express = require('express')
var bodyParser = require('body-parser')

var app = express()

app.use(bodyParser.json())
app.use(bodyParser.text())

app.set('port', (process.env.PORT || 8080));

app.get('/', function (req, res) {
   res.send("Hello World");
})

var errorCodeMessageMap = { 200: "",
                            401: "Authentication Failure", 
                            404: "Not Found",
                            407: "Authentication Failure",
                            422: "Invalid startDate format (hardcoded attribute for this errorCode)",
                            504: "Request Timeout",
                            999: "No such error code for debugging. Please refer to documentation"}

function checkPayloadAttribute(attributeName, reqBodyAttribute, errorFieldList){
	if (reqBodyAttribute == undefined){
		errorFieldList.push(attributeName)
	}
}
							
app.post('/grantinfo', function(req, res) {

	var reqBody = req.body

	if (reqBody.hasOwnProperty('transactionID') && reqBody.hasOwnProperty('transactionTime') &&
	    reqBody.hasOwnProperty('applicationInfo') && reqBody.hasOwnProperty('applicationContactInfo') &&
		reqBody.hasOwnProperty('applicationLocationDeployed') && reqBody.hasOwnProperty('claimInfo') &&
		reqBody.hasOwnProperty('claimContactInfo') && reqBody.hasOwnProperty('claimLocationDeployed') &&
		reqBody.hasOwnProperty('companyGeneralInfo') && reqBody.hasOwnProperty('projectInfo') ) {

		// For all parameters 
		var safeErrorCode = 200
		if (reqBody.hasOwnProperty('errorCode') && reqBody.errorCode != ""){
			safeErrorCode = reqBody.errorCode in errorCodeMessageMap ? reqBody.errorCode : 999
		} 
		res.status(safeErrorCode).json({ "statusCode": safeErrorCode, "body": {"requestID": reqBody.transactionID, "dataError": errorCodeMessageMap[safeErrorCode]}})

	} else {
		
		var errorFieldList = []
		checkPayloadAttribute("transactionID", reqBody.transactionID, errorFieldList)
		checkPayloadAttribute("transactionTime", reqBody.transactionTime, errorFieldList)
		checkPayloadAttribute("applicationInfo", reqBody.applicationInfo, errorFieldList)
		checkPayloadAttribute("applicationContactInfo", reqBody.applicationContactInfo, errorFieldList)
		checkPayloadAttribute("applicationLocationDeployed", reqBody.applicationLocationDeployed, errorFieldList)
		checkPayloadAttribute("claimInfo", reqBody.claimInfo, errorFieldList)
		checkPayloadAttribute("claimContactInfo", reqBody.claimContactInfo, errorFieldList)
		checkPayloadAttribute("claimLocationDeployed", reqBody.claimLocationDeployed, errorFieldList)
		checkPayloadAttribute("companyGeneralInfo", reqBody.companyGeneralInfo, errorFieldList)
		checkPayloadAttribute("projectInfo", reqBody.projectInfo, errorFieldList)
		
		res.status(400).json({ "statusCode": 400, "body": {"requestID": reqBody.transcationID, "dataError": errorFieldList.join(", ") + (errorFieldList.length > 1 ? " attributes are " : " attribute is ") + "required"}})
	}

})
							
app.put('/grantinfo/:grantid', function(req, res) {
	var reqBody = req.body
	if (reqBody.hasOwnProperty('transactionID') && reqBody.hasOwnProperty('transactionTime') &&
	    reqBody.hasOwnProperty('type') && reqBody.hasOwnProperty('data')) {

		// For all parameters
		var safeErrorCode = 200
		if (reqBody.hasOwnProperty('errorCode') && reqBody.errorCode != ""){
			safeErrorCode = reqBody.errorCode in errorCodeMessageMap ? reqBody.errorCode : 999
		} 
		res.status(safeErrorCode).json({ "statusCode": safeErrorCode, "body": {"requestID": reqBody.transactionID, "dataError": errorCodeMessageMap[safeErrorCode]}, "Record Updated": req.params.grantid})

	} else {
		
		var errorFieldList = []
		checkPayloadAttribute("transactionID", reqBody.transactionID, errorFieldList)
		checkPayloadAttribute("transactionTime", reqBody.transactionTime, errorFieldList)
		checkPayloadAttribute("type", reqBody.type, errorFieldList)
		checkPayloadAttribute("data", reqBody.data, errorFieldList)
		
		res.status(400).json({ "statusCode": 400, "body": {"requestID": reqBody.transcationID, "dataError": errorFieldList.join(", ") + (errorFieldList.length > 1 ? " attributes are " : " attribute is ") + "required"}})
	}
})

app.post('/riskreport/adhoc', function(req, res) {

	var reqBody = req.body

	if (reqBody.hasOwnProperty('transactionID') && reqBody.hasOwnProperty('transactionTime') &&
	    reqBody.hasOwnProperty('applicationID')) {

		// For all parameters 
		var safeErrorCode = 200
		if (reqBody.hasOwnProperty('errorCode') && reqBody.errorCode != ""){
			safeErrorCode = reqBody.errorCode in errorCodeMessageMap ? reqBody.errorCode : 999
		} 
		res.status(safeErrorCode).json({ "statusCode": safeErrorCode, "body": {"requestID": reqBody.transactionID, "dataError": errorCodeMessageMap[safeErrorCode]}})

	} else {
		
		var errorFieldList = []
		checkPayloadAttribute("transactionID", reqBody.transactionID, errorFieldList)
		checkPayloadAttribute("transactionTime", reqBody.transactionTime, errorFieldList)
		checkPayloadAttribute("applicationID", reqBody.applicationID, errorFieldList)
		
		res.status(400).json({ "statusCode": 400, "body": {"requestID": reqBody.transcationID, "dataError": errorFieldList.join(", ") + (errorFieldList.length > 1 ? " attributes are " : " attribute is ") + "required"}})
	}

})
														
app.post('/riskreport/detailed', function(req, res) {
	
	var reqBody = req.body
	
	if (reqBody.hasOwnProperty('transactionID') && reqBody.hasOwnProperty('transactionTime') &&
	    reqBody.hasOwnProperty('startDate') && reqBody.hasOwnProperty('endDate')) {
		
		// For all parameters 
		var safeErrorCode = 200
		if (reqBody.hasOwnProperty('errorCode') && reqBody.errorCode != ""){
			safeErrorCode = reqBody.errorCode in errorCodeMessageMap ? reqBody.errorCode : 999
		} 
		res.status(safeErrorCode).json({ "statusCode": safeErrorCode, "body": {"requestID": reqBody.transactionID, "dataError": errorCodeMessageMap[safeErrorCode]}})
			
	} else {
		
		var errorFieldList = []
		checkPayloadAttribute("transactionID", reqBody.transactionID, errorFieldList)
		checkPayloadAttribute("transactionTime", reqBody.transactionTime, errorFieldList)
		checkPayloadAttribute("startDate", reqBody.startDate, errorFieldList)
		checkPayloadAttribute("endDate", reqBody.endDate, errorFieldList)
		
		res.status(400).json({ "statusCode": 400, "body": {"requestID": reqBody.transcationID, "dataError": errorFieldList.join(", ") + (errorFieldList.length > 1 ? " attributes are " : " attribute is ") + "required"}})
	}
	
})

app.post('/watchblacklist', function(req,res) {
    res.send("watchblacklist post")
})

app.put('/watchblacklist', function(req,res) {
    res.send("watchblacklist put")
})


var server = app.listen(app.get('port'), function () {
	
	var host = server.address().address
	var port = server.address().port
	console.log("Pseudo Server listening on port %s", app.get('port'))
})
