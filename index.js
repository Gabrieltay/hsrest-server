var express = require('express')
var bodyParser = require('body-parser')
var definitions = require('./definitions.js')
var Ajv = require('ajv')
//var jwt = require('jsonwebtoken')


var app = express()
app.use(bodyParser.json())
app.use(bodyParser.text())
app.set('port', (process.env.PORT || 8080));


app.get('/', function (req, res) {
   res.send("Welcome to bgphs pseudo API server");
})

var errorCodeMessageMap = { 200: "",
                            400: "Request data field Error...",
                            401: "Authentication Failure",
                            404: "Not Found",
                            407: "Authentication Failure",
                            422: "Invalid startDate format (hardcoded attribute for this errorCode)",
                            504: "Request Timeout",
                            999: "No such error code for debugging. Please refer to documentation"}

var statusCodeLineMap = { 200: "OK",
                            400: "Bad Request",
                            401: "Unauthorized",
                            404: "Not Found",
                            407: "Unauthorized",
                            422: "Unprocessable Entity",
                            504: "Timeout",
                            999: "No such error code for debugging. Please refer to documentation"}

var singleMissingAttributeError = " attribute is required" 
var manyMissingAttributeError = " attributes are required"
var missingAttributeDelimiter = ", "

function checkPayloadAttribute(attributeName, reqBodyAttribute, errorFieldList){
	if (reqBodyAttribute == undefined){
		errorFieldList.push(attributeName)
	}
}

function formatJsonValidatorErrors(parentKey, errorList) {
	var missingKeys = []
	for (i in errorList) {
		missingKeys.push(parentKey + errorList[i].dataPath + "." + errorList[i].params.missingProperty)
	}
	return missingKeys
}

function checkChildKeys(jsonBody, parentKey) {
	if (definitions.hasOwnProperty(parentKey)) {
		var ajv = new Ajv({allErrors: true})
		var validate = ajv.addSchema(definitions["locationDeployedObject"]).addSchema(definitions["correspondenceAddressField"]).addSchema(definitions["deployedAddressField"]).addSchema(definitions["contactPerson"]).addSchema(definitions["costItem"]).compile(definitions[parentKey])
		var valid = validate(jsonBody)
		if (!valid) {
		    console.log(validate.errors);
			return formatJsonValidatorErrors(parentKey, validate.errors)
		}
	} 
	return []
}

function checkParentKeys(jsonBody, expectedParentKeys) {
    var missingParentKeys = []
    for (i in expectedParentKeys) {
        if (!(jsonBody.hasOwnProperty(expectedParentKeys[i]))) {
            missingParentKeys.push(expectedParentKeys[i])
        }
    }
    return missingParentKeys
}

function generateResponseBody(statusCode, requestId, dataErrorMessage) { 
    
    /* // Full Body Response
	return { 
        'success' : parseInt(statusCode) == 200 ? true : false,
        'result' : {
            'statusCode' : parseInt(statusCode),
            'statusLine' : "HTTP/1.1 " + parseInt(statusCode) + " " + statusCodeLineMap[parseInt(statusCode)],
            'contentType' : "application/json",
            'body': {
                'requestID': requestId, 
                'dataError': dataErrorMessage 
                }
            }
        }
    */
    return {'requestID': requestId, 'dataError': dataErrorMessage}
} 

function customErrorHandler(reqBody){
						
    if (reqBody.hasOwnProperty('errorCode') && reqBody.errorCode != "") {
        var santizedErrorCode = reqBody.errorCode in errorCodeMessageMap ? reqBody.errorCode : 999
        return [santizedErrorCode, generateResponseBody(santizedErrorCode, reqBody.transactionID, errorCodeMessageMap[santizedErrorCode])]
    }
    return []

}

app.post('/bgp/grantinfo', function(req, res) {

    var reqBody = req.body

    resPayload = customErrorHandler(reqBody)
    if (resPayload.length == 2) {
        res.status(resPayload[0]).json(resPayload[1])
    } else {
		
        var expectedParentAttributes = ["transactionID", "transactionTime", "response", "applicationInfo", "applicationContactInfo", "applicationLocationDeployed", "claimInfo", "claimContactInfo", "claimLocationDeployed", "companyGeneralInfo", "projectInfo"]
        var missingParentAttributes = checkParentKeys(reqBody, expectedParentAttributes)
        var missingChildAttributes = []

        for (i in expectedParentAttributes) {
            if (missingParentAttributes.indexOf(expectedParentAttributes[i]) == -1) { //means the expectedParentAttribute exists, check the child
                missingChildAttributes = missingChildAttributes.concat(checkChildKeys(reqBody[expectedParentAttributes[i]], expectedParentAttributes[i]))
            }
        } 

        var allMissingAttributes = missingParentAttributes.concat(missingChildAttributes)

        if (allMissingAttributes.length > 0) {
            res.status(400).json(generateResponseBody(400, reqBody.transactionID, allMissingAttributes.join(missingAttributeDelimiter) + (allMissingAttributes.length == 1 ? singleMissingAttributeError : manyMissingAttributeError)))
        } else {
            res.status(200).json(generateResponseBody(200, reqBody.transactionID, errorCodeMessageMap[200])) 
        }
    }
})

							
app.post('/bgp/grantinfo/:grantid', function(req, res) {

	var reqBody = req.body
	
    resPayload = customErrorHandler(reqBody)
    if (resPayload.length == 2) {
        res.status(resPayload[0]).json(resPayload[1])
    } else {
		
        var expectedParentAttributes = ["transactionID", "transactionTime", "type", "data", "response"]
        var missingParentAttributes = checkParentKeys(reqBody, expectedParentAttributes)
        var missingChildAttributes = []

        for (i in expectedParentAttributes) {
            if (missingParentAttributes.indexOf(expectedParentAttributes[i]) == -1) { //means the expectedParentAttribute exists, check the child
                missingChildAttributes = missingChildAttributes.concat(checkChildKeys(reqBody[expectedParentAttributes[i]], expectedParentAttributes[i]))
            }
        } 

        var allMissingAttributes = missingParentAttributes.concat(missingChildAttributes)

        if (allMissingAttributes.length > 0) {
            res.status(400).json(generateResponseBody(400, reqBody.transactionID, allMissingAttributes.join(missingAttributeDelimiter) + (allMissingAttributes.length == 1 ? singleMissingAttributeError : manyMissingAttributeError)))
        } else {
            res.status(200).json(generateResponseBody(200, reqBody.transactionID, errorCodeMessageMap[200])) 
        }
    }
	
})

app.post('/bgp/riskreport/adhoc', function(req, res) {

	var reqBody = req.body
	
    resPayload = customErrorHandler(reqBody)
    if (resPayload.length == 2) {
        res.status(resPayload[0]).json(resPayload[1])
    } else {
		
        var expectedParentAttributes = ["transactionID", "transactionTime", "applicationID", "response"]
        var missingParentAttributes = checkParentKeys(reqBody, expectedParentAttributes)
        var missingChildAttributes = []

        for (i in expectedParentAttributes) {
            if (missingParentAttributes.indexOf(expectedParentAttributes[i]) == -1) { //means the expectedParentAttribute exists, check the child
                missingChildAttributes = missingChildAttributes.concat(checkChildKeys(reqBody[expectedParentAttributes[i]], expectedParentAttributes[i]))
            }
        } 

        var allMissingAttributes = missingParentAttributes.concat(missingChildAttributes)

        if (allMissingAttributes.length > 0) {
            res.status(400).json(generateResponseBody(400, reqBody.transactionID, allMissingAttributes.join(missingAttributeDelimiter) + (allMissingAttributes.length == 1 ? singleMissingAttributeError : manyMissingAttributeError)))
        } else {
            res.status(200).json(generateResponseBody(200, reqBody.transactionID, errorCodeMessageMap[200])) 
        }
    }

})
														
app.post('/bgp/riskreport/detailed', function(req, res) {
	
	var reqBody = req.body
	
    resPayload = customErrorHandler(reqBody)
    if (resPayload.length == 2) {
        res.status(resPayload[0]).json(resPayload[1])
    } else {
		
        var expectedParentAttributes = ["transactionID", "transactionTime", "startDate", "endDate", "type", "grant", "response"]
        var missingParentAttributes = checkParentKeys(reqBody, expectedParentAttributes)
        var missingChildAttributes = []

        for (i in expectedParentAttributes) {
            if (missingParentAttributes.indexOf(expectedParentAttributes[i]) == -1) { //means the expectedParentAttribute exists, check the child
                missingChildAttributes = missingChildAttributes.concat(checkChildKeys(reqBody[expectedParentAttributes[i]], expectedParentAttributes[i]))
            }
        } 

        var allMissingAttributes = missingParentAttributes.concat(missingChildAttributes)

        if (allMissingAttributes.length > 0) {
            res.status(400).json(generateResponseBody(400, reqBody.transactionID, allMissingAttributes.join(missingAttributeDelimiter) + (allMissingAttributes.length == 1 ? singleMissingAttributeError : manyMissingAttributeError)))
        } else {
            res.status(200).json(generateResponseBody(200, reqBody.transactionID, errorCodeMessageMap[200])) 
        }
    }
	
})

app.post('/bgp/watchblacklist', function(req,res) {
	var reqBody = req.body
	
    resPayload = customErrorHandler(reqBody)
    if (resPayload.length == 2) {
        res.status(resPayload[0]).json(resPayload[1])
    } else {
		
        var expectedParentAttributes = ["transactionID", "transactionTime", "entityItemList"]
        var missingParentAttributes = checkParentKeys(reqBody, expectedParentAttributes)
        var missingChildAttributes = []

        for (i in expectedParentAttributes) {
            if (missingParentAttributes.indexOf(expectedParentAttributes[i]) == -1) { //means the expectedParentAttribute exists, check the child
                missingChildAttributes = missingChildAttributes.concat(checkChildKeys(reqBody[expectedParentAttributes[i]], expectedParentAttributes[i]))
            }
        } 

        var allMissingAttributes = missingParentAttributes.concat(missingChildAttributes)

        if (allMissingAttributes.length > 0) {
            res.status(400).json(generateResponseBody(400, reqBody.transactionID, allMissingAttributes.join(missingAttributeDelimiter) + (allMissingAttributes.length == 1 ? singleMissingAttributeError : manyMissingAttributeError)))
        } else {
            res.status(200).json(generateResponseBody(200, reqBody.transactionID, errorCodeMessageMap[200])) 
        }
    }
})

app.put('/watchblacklist/:entityid', function(req,res) {
	var reqBody = req.body
	
    resPayload = customErrorHandler(reqBody)
    if (resPayload.length == 2) {
        res.status(resPayload[0]).json(resPayload[1])
    } else {
		
        var expectedParentAttributes = ["transactionID", "transactionTime", "updateEntity"]
        var missingParentAttributes = checkParentKeys(reqBody, expectedParentAttributes)
        var missingChildAttributes = []

        for (i in expectedParentAttributes) {
            if (missingParentAttributes.indexOf(expectedParentAttributes[i]) == -1) { //means the expectedParentAttribute exists, check the child
                missingChildAttributes = missingChildAttributes.concat(checkChildKeys(reqBody[expectedParentAttributes[i]], expectedParentAttributes[i]))
            }
        } 

        var allMissingAttributes = missingParentAttributes.concat(missingChildAttributes)

        if (allMissingAttributes.length > 0) {
            res.status(400).json(generateResponseBody(400, reqBody.transactionID, allMissingAttributes.join(missingAttributeDelimiter) + (allMissingAttributes.length == 1 ? singleMissingAttributeError : manyMissingAttributeError)))
        } else {
            res.status(200).json(generateResponseBody(200, reqBody.transactionID, errorCodeMessageMap[200])) 
        }
    }

})


var server = app.listen(app.get('port'), function () {
	
	var host = server.address().address
	var port = server.address().port
	console.log("Pseudo Server listening on port %s", app.get('port'))
})

function checkApplicationInfo(reqApplicationInfo) {

    var expectedAttributes = ["applicationID", "userNric", "userName", "industryType", "developmentCategory", "functionalArea", "subFunctionalArea", "applicationStatus"]
    var missingAttributes = []

    if (reqApplicationInfo == undefined) {
         missingAttributes = expectedAttributes
    } else { 
        for (a in expectedAttributes) {
            if (!(reqApplicationInfo.hasOwnProperty(expectedAttributes[a]))) { 
                missingAttributes.push(expectedAttributes[a])
            }
        }
    }

    return missingAttributes

}

// Verify Token
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
      // Split at the space
      const bearer = bearerHeader.split(' ');
      // Get token from array
      const bearerToken = bearer[1];
      // Set the token
      req.token = bearerToken;
      // Next middleware
      next();
    } else {
      // Forbidden
      res.sendStatus(403);
    }
  
}
