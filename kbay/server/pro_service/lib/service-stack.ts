import { Duration } from "aws-cdk-lib";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction, NodejsFunctionProps } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { join } from "path";

interface ServiceProps{
  bucket:string;
}
export class ServiceStack extends Construct {
  public readonly productService: NodejsFunction;
  public readonly categoryService: NodejsFunction;
  public readonly dealsService: NodejsFunction;
  public readonly imageService: NodejsFunction;

  constructor(scope: Construct, id: string,props:ServiceProps) {
    super(scope, id);

    const nodeJsFunctionProps: NodejsFunctionProps = {
      bundling: {
        externalModules: [
          "aws-sdk",
          "@aws-sdk/core",
          "@aws-sdk/credential-providers",
          "@aws-sdk/credential-provider-env",
          "@aws-sdk/credential-provider-http",
          "@aws-sdk/credential-provider-ini",
          "@aws-sdk/credential-provider-sso",
          "@aws-sdk/credential-provider-process",
          "@aws-sdk/credential-provider-web-identity",
        ],
      },
      environment: {
        S3_BUCKET_NAME: props.bucket,
        DB_URL: process.env.DB_URL || "mongodb://localhost:27017/product-db",
      },
      runtime: Runtime.NODEJS_22_X,
      timeout: Duration.seconds(30),
    };

    this.productService = new NodejsFunction(this, "productLambda", {
      entry: join(__dirname, "../src/product-api.ts"),
      ...nodeJsFunctionProps,
    });

    this.categoryService = new NodejsFunction(this, "categoryLambda", {
      entry: join(__dirname, "../src/category-api.ts"),
      ...nodeJsFunctionProps,
    });

    this.dealsService = new NodejsFunction(this, "dealsLambda", {
      entry: join(__dirname, "../src/deals-api.ts"),
      ...nodeJsFunctionProps,
    });
    
    this.imageService = new NodejsFunction(this, "imageLambda", {
      entry: join(__dirname, "../src/image-api.ts"),
      ...nodeJsFunctionProps,
    });
  }
}
