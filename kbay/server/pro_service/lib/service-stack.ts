import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction, NodejsFunctionProps } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { join } from "path";

export class ServiceStack extends Construct {
  public readonly productService: NodejsFunction;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    const nodeJsFunctionProps: NodejsFunctionProps = {
      bundling: {
        externalModules: ["aws-sdk"],
      },
      environment: {
        BUCKET_NAME: "MY-BUCKET-NAME",
      },
      runtime: Runtime.NODEJS_22_X,
    };

    this.productService = new NodejsFunction(this, "productLambda", {
      entry: join(__dirname, "../src/product/index.ts"),
      ...nodeJsFunctionProps,
    });
  }
}
