// Require 
var http = require('http')
var testObjects = require('./testObjects.js')

// Server Properties 
var serverUrl = "bgphs-staging.herokuapp.com"
var grantInfoEndpoint = "/bgp/grantinfo"
var riskreportEndpoint = "/riskreport"
var watchblacklistEndpoint = "/watchblacklist"
var testUrlResource = "/item1"

// Expected Error Responses
var error400Response = { statusCode: 400, body: { dataError: 'Request data field Error' } };
var error401Response = { statusCode: 401, body: { dataError: 'Authentication Failure' } };
var error404Response = { statusCode: 404, body: { dataError: 'Not Found' } };
var error407Response = { statusCode: 407, body: { dataError: 'Authentication Failure' } };
var error422Response = { statusCode: 422, body: { dataError: 'Invalid startDate format (hardcoded attribute for this errorCode)' } };
var error504Response = { statusCode: 504, body: { dataError: 'Request Timeout' } };

function testEndpoint(httpMethod, endpoint, requestBody, responseCheck, description) {
    var options = {  hostname: serverUrl,
                     path: endpoint, 
                     method: httpMethod,
                     headers: { 'Content-Type': 'application/json' }
                  }

    var req = http.request(options, function(response) {
        var dataString = "";

        response.on("data", function(data) { 
            dataString += data; 
        });

        response.on("end", function () {
            if (JSON.stringify(JSON.parse(dataString)) === JSON.stringify(responseCheck) ) {
                console.log("Test for " + endpoint + " endpoint: " + description + " " + httpMethod + " Successful!");
                return true;
            } else {
                console.log("Test for " + endpoint + " endpoint: " + description + " " + httpMethod + " FAILED!");
                return false;
            }
        });
    });

    req.on('error', function(error) { 
        console.log("Test for " + endpoint + " endpoint: " + description + " " +  httpMethod + " FAILED! (request encountered an error)");
        console.log(error);
        return false;
    });

    req.write( JSON.stringify(requestBody) );
    req.end();

}

// Grant Info Endpoint - POST
testEndpoint('POST', grantInfoEndpoint, testObjects['grantInfoCorrectPostReq'], testObjects['grantInfoCorrectPostRes'], 'Well Formed Request')
testEndpoint('POST', grantInfoEndpoint, testObjects['grantInfoWrongPostReq'], testObjects['grantInfoWrongPostRes'], 'Malformed Request')
testEndpoint('POST', grantInfoEndpoint, {'errorCode': 400}, error400Response, 'Custom Error 400');
testEndpoint('POST', grantInfoEndpoint, {'errorCode': 401}, error401Response, 'Custom Error 401');
testEndpoint('POST', grantInfoEndpoint, {'errorCode': 404}, error404Response, 'Custom Error 404');
testEndpoint('POST', grantInfoEndpoint, {'errorCode': 407}, error407Response, 'Custom Error 407');
testEndpoint('POST', grantInfoEndpoint, {'errorCode': 422}, error422Response, 'Custom Error 422');
testEndpoint('POST', grantInfoEndpoint, {'errorCode': 504}, error504Response, 'Custom Error 504');


// Grant Info Endpoint - PUT
testEndpoint('PUT', grantInfoEndpoint + testUrlResource, testObjects['grantInfoCorrectPutReq'], testObjects['grantInfoCorrectPutRes'], 'Well Formed Request')
testEndpoint('PUT', grantInfoEndpoint + testUrlResource, testObjects['grantInfoWrongPutReq'], testObjects['grantInfoWrongPutRes'], 'Malformed Request')
testEndpoint('PUT', grantInfoEndpoint + testUrlResource, {'errorCode': 400}, error400Response, 'Custom Error 400');
testEndpoint('PUT', grantInfoEndpoint + testUrlResource, {'errorCode': 401}, error401Response, 'Custom Error 401');
testEndpoint('PUT', grantInfoEndpoint + testUrlResource, {'errorCode': 404}, error404Response, 'Custom Error 404');
testEndpoint('PUT', grantInfoEndpoint + testUrlResource, {'errorCode': 407}, error407Response, 'Custom Error 407');
testEndpoint('PUT', grantInfoEndpoint + testUrlResource, {'errorCode': 422}, error422Response, 'Custom Error 422');
testEndpoint('PUT', grantInfoEndpoint + testUrlResource, {'errorCode': 504}, error504Response, 'Custom Error 504');

// Risk Report Adhoc Endpoint - POST 
testEndpoint('POST', riskreportEndpoint + "/adhoc", testObjects['riskReportAdhocCorrectPostReq'], testObjects['riskReportAdhocCorrectPostRes'], 'Well Formed Request')
testEndpoint('POST', riskreportEndpoint + "/adhoc", testObjects['riskReportAdhocWrongPostReq'], testObjects['riskReportAdhocWrongPostRes'], 'Malformed Request')
testEndpoint('POST', riskreportEndpoint + "/adhoc", {'errorCode': 400}, error400Response, 'Custom Error 400');
testEndpoint('POST', riskreportEndpoint + "/adhoc", {'errorCode': 401}, error401Response, 'Custom Error 401');
testEndpoint('POST', riskreportEndpoint + "/adhoc", {'errorCode': 404}, error404Response, 'Custom Error 404');
testEndpoint('POST', riskreportEndpoint + "/adhoc", {'errorCode': 407}, error407Response, 'Custom Error 407');
testEndpoint('POST', riskreportEndpoint + "/adhoc", {'errorCode': 422}, error422Response, 'Custom Error 422');
testEndpoint('POST', riskreportEndpoint + "/adhoc", {'errorCode': 504}, error504Response, 'Custom Error 504');

// Risk Report Detailed Endpoint - POST 
testEndpoint('POST', riskreportEndpoint + "/detailed", testObjects['riskReportDetailedCorrectPostReq'], testObjects['riskReportDetailedCorrectPostRes'], 'Well Formed Request')
testEndpoint('POST', riskreportEndpoint + "/detailed", testObjects['riskReportDetailedWrongPostReq'], testObjects['riskReportDetailedWrongPostRes'], 'Malformed Request')
testEndpoint('POST', riskreportEndpoint + "/detailed", {'errorCode': 400}, error400Response, 'Custom Error 400');
testEndpoint('POST', riskreportEndpoint + "/detailed", {'errorCode': 401}, error401Response, 'Custom Error 401');
testEndpoint('POST', riskreportEndpoint + "/detailed", {'errorCode': 404}, error404Response, 'Custom Error 404');
testEndpoint('POST', riskreportEndpoint + "/detailed", {'errorCode': 407}, error407Response, 'Custom Error 407');
testEndpoint('POST', riskreportEndpoint + "/detailed", {'errorCode': 422}, error422Response, 'Custom Error 422');
testEndpoint('POST', riskreportEndpoint + "/detailed", {'errorCode': 504}, error504Response, 'Custom Error 504');

// Watch/Black List Endpoint - POST 
testEndpoint('POST', watchblacklistEndpoint, testObjects['listCorrectPostReq'], testObjects['listCorrectPostRes'], 'Well Formed Request')
testEndpoint('POST', watchblacklistEndpoint, testObjects['listWrongPostReq'], testObjects['listWrongPostRes'], 'Malformed Request')
testEndpoint('POST', watchblacklistEndpoint, {'errorCode': 400}, error400Response, 'Custom Error 400');
testEndpoint('POST', watchblacklistEndpoint, {'errorCode': 401}, error401Response, 'Custom Error 401');
testEndpoint('POST', watchblacklistEndpoint, {'errorCode': 404}, error404Response, 'Custom Error 404');
testEndpoint('POST', watchblacklistEndpoint, {'errorCode': 407}, error407Response, 'Custom Error 407');
testEndpoint('POST', watchblacklistEndpoint, {'errorCode': 422}, error422Response, 'Custom Error 422');
testEndpoint('POST', watchblacklistEndpoint, {'errorCode': 504}, error504Response, 'Custom Error 504');

// Watch/Black List Endpoint - PUT
testEndpoint('PUT', watchblacklistEndpoint + testUrlResource, testObjects['listCorrectPutReq'], testObjects['listCorrectPutRes'], 'Well Formed Request')
testEndpoint('PUT', watchblacklistEndpoint + testUrlResource, testObjects['listWrongPutReq'], testObjects['listWrongPutRes'], 'Malformed Request')
testEndpoint('PUT', watchblacklistEndpoint + testUrlResource, {'errorCode': 400}, error400Response, 'Custom Error 400');
testEndpoint('PUT', watchblacklistEndpoint + testUrlResource, {'errorCode': 401}, error401Response, 'Custom Error 401');
testEndpoint('PUT', watchblacklistEndpoint + testUrlResource, {'errorCode': 404}, error404Response, 'Custom Error 404');
testEndpoint('PUT', watchblacklistEndpoint + testUrlResource, {'errorCode': 407}, error407Response, 'Custom Error 407');
testEndpoint('PUT', watchblacklistEndpoint + testUrlResource, {'errorCode': 422}, error422Response, 'Custom Error 422');
testEndpoint('PUT', watchblacklistEndpoint + testUrlResource, {'errorCode': 504}, error504Response, 'Custom Error 504');

