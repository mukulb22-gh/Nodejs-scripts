/**
* Nodejs script to Athena database cleanup to remove non used table
* Dependencies : athena-express, aws-sdk 
* AWS Requried resouce: S3 bucket to store result, 
*	permission to delete table from athena and store result in buckets
**/

"use strict";

const AthenaExpress = require("athena-express"),
	aws = require("aws-sdk"),
	awsCredentials = {
		region: "YOUR_REGION",
		accessKeyId: "YOUR_ACCESS_KEY",
		secretAccessKey: "YOUR_SECRET_KEY"
	};

aws.config.update(awsCredentials);

const athenaExpressConfig = {
	aws,
	s3: "S3_BUCKET_PATH_TO_STORE_RESULTS",	
	getStats: true
};

const athenaExpress = new AthenaExpress(athenaExpressConfig);

const tblArr = ["TABLE_1_TO_DELETE","TABLE_2_TO_DELETE"]

// database name from which table need to delete
db = "default";

//Invoking a query on Amazon Athena
let droptable = async (tbl) => {
	let sql1 = "DROP TABLE `" + tbl +"`;";
	let myQuery = {
		sql:sql1,
		db: db,
		getStats: true
	};

	try {
		let results = await athenaExpress.query(myQuery);
		console.log(results);
	} catch (error) {
		console.log(error);
	}
};

tblArr.forEach(tbl => {	
	droptable(tbl);
});