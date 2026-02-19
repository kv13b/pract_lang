import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import { ServiceStack } from './service-stack';
import { APiGatewayStack } from './api-gateway-stack';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class ProServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const { productService } = new ServiceStack(this, "ProductService", { bucket: "product-bucket" });
    const {categoryService} = new ServiceStack(this, "CategoryService", { bucket: "category-bucket" });
    const {dealsService} = new ServiceStack(this, "DealsService", { bucket: "deals-bucket" });
    const {imageService} = new ServiceStack(this, "ImageService", { bucket: "image-bucket" });
    new APiGatewayStack(this, "ApiGatewayStack", {
      productService,
      categoryService,
      dealsService,
      imageService
    });
  }
}
