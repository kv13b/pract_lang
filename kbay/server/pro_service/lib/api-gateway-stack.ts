import { aws_apigateway } from "aws-cdk-lib";
import { LambdaRestApi } from "aws-cdk-lib/aws-apigateway";
import { IFunction } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

interface APiGatewayStackProps {
    productService: IFunction;
    categoryService?: IFunction;
    dealsService?: IFunction;
}
interface ResourceType{
    name:string;
    method:string;
    child?:ResourceType[];
}
export class APiGatewayStack extends Construct {
    constructor(scope: Construct, id: string, props: APiGatewayStackProps) {
        super(scope, id);
        this.addResources("product", props);
    }
    addResources(serviceName: string, { categoryService, productService, dealsService }: APiGatewayStackProps) {
        const apgw=new aws_apigateway.RestApi(this, `${serviceName}-ApiGateway`);
        // const agpw = new LambdaRestApi(this, `${serviceName}-ApiGateway`, {
        //     restApiName: `${serviceName}-Api`,
        //     handler: handler,
        //     proxy: false,
        // });

        // const ProductResource = agpw.root.addResource("product");
        // ProductResource.addMethod("GET");
        // ProductResource.addMethod("POST");

        // const ProductIdResource = ProductResource.addResource("{id}");
        // ProductIdResource.addMethod("GET");
        // ProductIdResource.addMethod("PUT");
        // ProductIdResource.addMethod("DELETE");

        // const CategoryResource = agpw.root.addResource("category");
        // CategoryResource.addMethod("GET");
        // CategoryResource.addMethod("POST");

        // const CatResource = CategoryResource.addResource("{id}");
        // CatResource.addMethod("GET");
        // CatResource.addMethod("PUT");
        // CatResource.addMethod("DELETE");

        // const dealsResource = agpw.root.addResource("deals");
        // dealsResource.addMethod("GET");
        // dealsResource.addMethod("POST");

        // const dealsIdResource = dealsResource.addResource("{id}");
        // dealsIdResource.addMethod("GET");
        // dealsIdResource.addMethod("PUT");
        // dealsIdResource.addMethod("DELETE");

    }
}