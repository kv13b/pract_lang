import { Bucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

export class S3BucketStack extends Construct {
    public readonly bucketName: Bucket;

    constructor(scope: Construct, id: string) {
        super(scope, id);
    }
}