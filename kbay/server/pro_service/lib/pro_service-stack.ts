import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import { ServiceStack } from './service-stack';
import { APiGatewayStack } from './api-gateway-stack';
import { S3BucketStack } from './S3-bucket-stack';

export class ProServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const { bucketName } = new S3BucketStack(this, "ProductImages");
    const { productService, categoryService, dealsService, imageService } = new ServiceStack(this, "ProductServiceStack", {
      bucket: bucketName.bucketName
    });
    bucketName.grantReadWrite(imageService);
    new APiGatewayStack(this, "ApiGatewayStack", {
      productService,
      categoryService,
      dealsService,
      imageService
    });
  }
}
