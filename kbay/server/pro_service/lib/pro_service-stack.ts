import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import { ServiceStack } from './service-stack';
import { APiGatewayStack } from './api-gateway-stack';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class ProServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const { productService } = new ServiceStack(this, "ProductService", {});
    const {categoryService} = new ServiceStack(this, "CategoryService", {});
    const {dealsService} = new ServiceStack(this, "DealsService", {});
    new APiGatewayStack(this, "ApiGatewayStack", {
      productService,
      categoryService,
      dealsService
    });
  }
}
