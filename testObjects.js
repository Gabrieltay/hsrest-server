var testObjects = {

    // POST /grantinfo
    "grantInfoCorrectPostReq": {
        "transactionID": "1501AB24",
        "transactionTime": "2017-12-05T16:23:54.172Z",
        "applicationInfo": {
            "applicationID": "1501AB24",
            "userNric": "S1234567A",
            "userName": "Tan Ah Seng",
            "industryType": "Engineering Services",
            "developmentCategory": "Capability Development",
            "functionalArea": "IT Software",
            "subFunctionalArea": "ICT Productivity Solutions",
            "applicationStatus": "A2"
        },
        "applicationContactInfo": {
            "contactPersonName": "Person A",
            "contactPersonDesignation": "CEO",
            "contactPersonPhone": "81231234",
            "contactPersonEmail": "person_a@testing.com.sg",
            "contactPersonSecondaryEmail": "person_a@other-email.com",
            "correspondenceAddress": {
                "addressType": null,
                "foreignAddress1": null,
                "foreignAddress2": null,
                "block": "678",
                "street": "Garlick Avenue",
                "level": "70",
                "buildingName": null,
                "unit": "70",
                "postalCode": "386018"
            },
            "lofAddresseeName": "Person B",
            "lofAddresseeDesignation": "CEO",
            "lofAddresseeEmail": "person_b@testedtrading.com.sg"
        },
        "applicationLocationDeployed": {
            "locationDeployedType": "Home Office",
            "locationDeployedProjectAddress": null,
            "locationDeployedAddresses": [{
                "addressType": null,
                "foreignAddress1": null,
                "foreignAddress2": null,
                "block": "678",
                "street": "Garlick Avenue",
                "level": "70",
                "buildingName": null,
                "unit": "70",
                "postalCode": "386018"
            }]
        },
        "claimInfo": {
            "applicationID": "1501AB24",
            "officerID": "processing.officer@example.com",
            "officerName": "Tan Ah Bee",
            "approvedGrantAmount": "1000000000"
        },
        "claimContactInfo": {
            "contactPersonName": "Person A",
            "contactPersonDesignation": "CEO",
            "contactPersonPhone": "81231234",
            "contactPersonEmail": "person_a@testing.com.sg",
            "contactPersonSecondaryEmail": "person_a@other-email.com",
            "correspondenceAddress": {
                "addressType": null,
                "foreignAddress1": null,
                "foreignAddress2": null,
                "block": "678",
                "street": "Garlick Avenue",
                "level": "70",
                "buildingName": null,
                "unit": "70",
                "postalCode": "386018"
            }
        },
        "claimLocationDeployed": {
            "locationDeployedType": "Home Office",
            "locationDeployedProjectAddress": null,
            "locationDeployedAddresses": [{
                "addressType": null,
                "foreignAddress1": null,
                "foreignAddress2": null,
                "block": "678",
                "street": "Garlick Avenue",
                "level": "70",
                "buildingName": null,
                "unit": "70",
                "postalCode": "386018"
            }]
        },
        "companyGeneralInfo": {
            "companyUEN": "663784266U"
        },
        "projectInfo": {
            "projectTitle": "Purchase Software to Improve Productivity",
            "startDate": "2017-12-05T16:23:54.172Z",
            "endDate": "2017-12-05T16:23:54.172Z",
            "costs": [{
                    "type": "Consultancy and third party service provider",
                    "vendorName": "Vendor A",
                    "vendorUEN": "163784266U",
                    "vendorSgRegisteredCheck": true
                },
                {
                    "type": "Training provider",
                    "vendorName": "Vendor B",
                    "vendorUEN": "263784266U",
                    "vendorSgRegisteredCheck": true
                }
            ]
        }
    },
    "grantInfoCorrectPostRes": {
        "statusCode": 200,
        "body": {
            "requestID": "1501AB24",
            "dataError": ""
        }
    },

    "grantInfoWrongPostReq": {
        "transactionID": "1501AB24",
        "transactionTime": "2017-12-05T16:23:54.172Z",
        "applicationInfo": {
            "applicationID": "1501AB24",
            "userNric": "S1234567A",
            "userName": "Tan Ah Seng",
            "industryType": "Engineering Services",
            "developmentCategory": "Capability Development",
            "functionalArea": "IT Software",
            "subFunctionalArea": "ICT Productivity Solutions",
            "applicationStatus": "A2"
        },
        "applicationContactInfo": {
            "contactPersonName": "Person A",
            "contactPersonDesignation": "CEO",
            "contactPersonPhone": "81231234",
            "contactPersonEmail": "person_a@testing.com.sg",
            "contactPersonSecondaryEmail": "person_a@other-email.com",
            "correspondenceAddress": {
                "addressType": null,
                "foreignAddress1": null,
                "foreignAddress2": null,
                "block": "678",
                "street": "Garlick Avenue",
                "level": "70",
                "buildingName": null,
                "unit": "70",
                "postalCode": "386018"
            },
            "lofAddresseeName": "Person B",
            "lofAddresseeDesignation": "CEO",
            "lofAddresseeEmail": "person_b@testedtrading.com.sg"
        },
        "applicationLocationDeployed": {
            "locationDeployedType": "Home Office",
            "locationDeployedProjectAddress": null,
            "locationDeployedAddresses": [{
                "addressType": null,
                "foreignAddress1": null,
                "foreignAddress2": null,
                "block": "678",
                "street": "Garlick Avenue",
                "level": "70",
                "buildingName": null,
                "unit": "70",
                "postalCode": "386018"
            }]
        },
        "claimInfo": {
            "applicationID": "1501AB24",
            "officerID": "processing.officer@example.com",
            "officerName": "Tan Ah Bee",
            "approvedGrantAmount": "1000000000"
        },
        "claimContactInfo": {
            "contactPersonName": "Person A",
            "contactPersonDesignation": "CEO",
            "contactPersonPhone": "81231234",
            "contactPersonEmail": "person_a@testing.com.sg",
            "contactPersonSecondaryEmail": "person_a@other-email.com",
            "correspondenceAddress": {
                "addressType": null,
                "foreignAddress1": null,
                "foreignAddress2": null,
                "block": "678",
                "street": "Garlick Avenue",
                "level": "70",
                "buildingName": null,
                "unit": "70",
                "postalCode": "386018"
            }
        },
        "claimLocationDeployed": {
            "locationDeployedProjectAddress": null,
            "locationDeployedAddresses": [{
                "addressType": null,
                "foreignAddress1": null,
                "foreignAddress2": null,
                "block": "678",
                "street": "Garlick Avenue",
                "level": "70",
                "buildingName": null,
                "unit": "70",
                "postalCode": "386018"
            },{
                "addressType": null,
                "foreignAddress2": null,
                "block": "678",
                "street": "Garlick Avenue",
                "level": "70",
                "buildingName": null,
                "unit": "70",
                "postalCode": "386018"
            }]
        },
        "companyGeneralInfo": {
            "companyUEN": "663784266U"
        }
    },
    "grantInfoWrongPostRes": {
        "statusCode": 400,
        "body": {
            "requestID": "1501AB24",
            "dataError": "projectInfo, claimLocationDeployed.locationDeployedType, claimLocationDeployed.locationDeployedAddresses[1].foreignAddress1 attributes are required"
        }
    },

    // PUT /grantinfo/:item
    "grantInfoCorrectPutReq": {
        "transactionID": "1501AB24",
        "transactionTime": "2017-12-05T16:34:49.240Z",
        "type": "updateOfficer",
        "data": {
            "role": "BGP BIM Grant Processing Officer",
            "officerID": "7152",
            "officerName": "John Tan"
        }
    },
    "grantInfoCorrectPutRes": {
        "statusCode": 200,
        "body": {
            "requestID": "1501AB24",
            "dataError": ""
        }
    },

    "grantInfoWrongPutReq": {
        "transactionID": "1501AB24",
        "transactionTime": "2017-12-05T16:34:49.240Z",
        "type": "updateOfficer"
    },
    "grantInfoWrongPutRes": {
        "statusCode": 400,
        "body": {
            "requestID": "1501AB24",
            "dataError": "data attribute is required"
        }
    },

    // POST /riskreport/adhoc
    "riskReportAdhocCorrectPostReq": {
        "transactionID": "1501AB24",
        "transactionTime": "2017-12-05T16:49:16.343Z",
        "applicationID": "1501AB"
    },
    "riskReportAdhocCorrectPostRes": {
        "statusCode": 200,
        "body": {
            "requestID": "1501AB24",
            "dataError": ""
        }
    },

    "riskReportAdhocWrongPostReq": {
        "transactionID": "1501AB24",
        "transactionTime": "2017-12-05T16:49:16.343Z"
    },
    "riskReportAdhocWrongPostRes": {
        "statusCode": 400,
        "body": {
            "requestID": "1501AB24",
            "dataError": "applicationID attribute is required"
        }
    },

    // POST /riskreport/detailed
    "riskReportDetailedCorrectPostReq": {
        "transactionID": "1501AB24",
        "transactionTime": "2017-12-05T16:49:21.025Z",
        "startDate": "2016-11-01T00:00:00.000Z",
        "endDate": "2016-11-30T00:00:00.000Z"
    },
    "riskReportDetailedCorrectPostRes": {
        "statusCode": 200,
        "body": {
            "requestID": "1501AB24",
            "dataError": ""
        }
    },

    "riskReportDetailedWrongPostReq": {
        "transactionID": "1501AB24",
        "endDate": "2016-11-30T00:00:00.000Z"
    },
    "riskReportDetailedWrongPostRes": {
        "statusCode": 400,
        "body": {
            "requestID": "1501AB24",
            "dataError": "transactionTime, startDate attributes are required"
        }
    },

    // POST /watchblacklist
    "listCorrectPostReq": {
        "transactionID": "LIST45678",
        "transactionTime": "2017-12-05T16:49:24.565Z",
        "entityItemList": [{
            "entityType": "company",
            "entityName": "Vendor A Pte Ltd",
            "entityID": "UEN456127",
            "certificationNumber": null,
            "blacklist": {
                "agencyList": [
                    "Agency1",
                    "Agency2"
                ],
                "reason": "Persistently failed to comply with Section 2.4 of Vendor Act despite repeated warnings"
            },
            "watchlist": {
                "agencyList": [
                    "Agency1",
                    "Agency2"
                ],
                "reason": "Persistently failed to comply with Section 2.4 of Vendor Act despite repeated warnings"
            }
        }]
    },
    "listCorrectPostRes": {
	    "statusCode": 200,
	    "body": {
	        "requestID": "LIST45678",
	        "dataError": ""
	    }
	},

    "listWrongPostReq": {
        "transactionID": "LIST45678",
        "transactionTime": "2017-12-05T16:49:24.565Z",
        "entityItemLista": [{
            "entityType": "company",
            "entityName": "Vendor A Pte Ltd",
            "entityID": "UEN456127",
            "certificationNumber": null,
            "blacklist": {
                "agencyList": [
                    "Agency1",
                    "Agency2"
                ],
                "reasonn": "Persistently failed to comply with Section 2.4 of Vendor Act despite repeated warnings"
            },
            "watchlistt": {
                "agencyList": [
                    "Agency1",
                    "Agency2"
                ],
                "reason": "Persistently failed to comply with Section 2.4 of Vendor Act despite repeated warnings"
            }
        }]
    },
    "listWrongPostRes": {
        "statusCode": 400,
        "body": {
            "requestID": "LIST45678",
            "dataError": "entityItemList attribute is required"
        }
    },


    // PUT /watchblacklist/:item
    "listCorrectPutReq": {
        "transactionID": "LIST45678",
        "transactionTime": "2017-12-05T16:56:04.846Z",
        "updateEntity": {
            "entityType": "company",
            "entityName": "Vendor A Pte Ltd",
            "entityID": "UEN456127",
            "certificationNumber": null,
            "blacklist": {
                "agencyList": [
                    "Agency1",
                    "Agency2"
                ],
                "reason": "Persistently failed to comply with Section 2.4 of Vendor Act despite repeated warnings"
            },
            "watchlist": {
                "agencyList": [
                    "Agency1",
                    "Agency2"
                ],
                "reason": "Persistently failed to comply with Section 2.4 of Vendor Act despite repeated warnings"
            }
        }
    },
    "listCorrectPutRes": {
        "statusCode": 200,
        "body": {
            "requestID": "LIST45678",
            "dataError": ""
        }
    },

    "listWrongPutReq": {
        "transactionID": "LIST45678",
        "transactionTime": "2017-12-05T16:56:04.846Z",
        "updateEntity": {
            "entityType": "company",
            "entityName": "Vendor A Pte Ltd",
            "entityID": "UEN456127",
            "certificationNumber": null,
            "blacklist": {
                "agencyList": [
                    "Agency1",
                    "Agency2"
                ]
            },
            "watchlist": {
                "agencyListMispelt": [
                    "Agency1",
                    "Agency2"
                ],
                "reason": "Persistently failed to comply with Section 2.4 of Vendor Act despite repeated warnings"
            }
        }
    },
    "listWrongPutRes": {
        "statusCode": 400,
        "body": {
            "requestID": "LIST45678",
            "dataError": "updateEntity.blacklist.reason, updateEntity.watchlist.agencyList attributes are required"
        }
    }
}

module.exports = testObjects