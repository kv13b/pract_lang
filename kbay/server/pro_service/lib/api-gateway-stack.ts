import { aws_apigateway } from "aws-cdk-lib";
import { LambdaIntegration, IResource } from "aws-cdk-lib/aws-apigateway";
import { IFunction } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

interface APiGatewayStackProps {
    productService: IFunction;
    categoryService: IFunction;
    dealsService: IFunction;
    imageService: IFunction;
}

interface ResourceType {
    name: string;
    methods: string[];
    child?: ResourceType[];
}

export class APiGatewayStack extends Construct {
    constructor(scope: Construct, id: string, props: APiGatewayStackProps) {
        super(scope, id);
        this.addResources("product", props);
    }

    addResources(
        serviceName: string,
        { categoryService, productService, dealsService ,imageService}: APiGatewayStackProps
    ) {
        const apgw = new aws_apigateway.RestApi(this, `${serviceName}-ApiGateway`);
        
        // Pass apgw.root (which is IResource) to createEndPoints
        this.createEndPoints(productService, apgw.root, {
            name: "products",
            methods: ["GET", "POST"],
            child: [
                {
                    name: "{id}",
                    methods: ["GET", "PUT", "DELETE"]
                }
            ]
        });
        this.createEndPoints(categoryService, apgw.root, {
            name: "categories",
            methods: ["GET", "POST"],
            child: [
                {
                    name: "{id}",
                    methods: ["GET", "PUT", "DELETE"]
                }
            ]
        });
        this.createEndPoints(dealsService, apgw.root, {
            name: "deals",
            methods: ["GET", "POST"],
            child: [
                {
                    name: "{id}",
                    methods: ["GET", "PUT", "DELETE"]
                }
            ]
        });
        this.createEndPoints(imageService, apgw.root, {
            name: "images",
            methods: ["POST"],
        });
    }

    createEndPoints(
        handler: IFunction,
        resource: IResource,  // Changed from RestApi to IResource
        { name, methods, child }: ResourceType
    ) {
        const lambdaFunction = new LambdaIntegration(handler);
        const rootResource = resource.addResource(name);
        
        // Add methods to the current resource
        methods.forEach((method) => {
            rootResource.addMethod(method, lambdaFunction);
        });
        
        // Handle child resources recursively
        if (child && child.length > 0) {
            child.forEach((childResource) => {
                this.createEndPoints(handler, rootResource, childResource);
            });
        }
    }
}