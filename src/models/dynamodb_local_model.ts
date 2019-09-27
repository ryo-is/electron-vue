import { DynamoDB, Credentials } from "aws-sdk"
import { CreateTableParam } from "@/types"

const clientConfiguration: DynamoDB.ClientConfiguration = {
  endpoint: "http://localhost:8000",
  region: "local",
  credentials: new Credentials({
    accessKeyId: "dummy",
    secretAccessKey: "dummy"
  })
}

export default class DynamoDBLocalModel {
  private dynamodb: DynamoDB
  private documentClient: DynamoDB.DocumentClient

  constructor() {
    this.dynamodb = new DynamoDB(clientConfiguration)
    this.documentClient = new DynamoDB.DocumentClient(clientConfiguration)
  }

  // Update accessKeyID
  public updateAccessKeyId(accessKeyId: string): void {
    this.dynamodb.config.update({
      accessKeyId: accessKeyId
    })
  }

  // Get all tables
  public async listTable(): Promise<DynamoDB.Types.TableNameList> {
    const tableList: DynamoDB.Types.ListTablesOutput = await this.dynamodb
      .listTables()
      .promise()
    return tableList.TableNames
  }

  // Describe table info
  public async describeTable(
    tableName: string
  ): Promise<DynamoDB.TableDescription> {
    const describeTableData: DynamoDB.Types.DescribeTableOutput = await this.dynamodb
      .describeTable({ TableName: tableName })
      .promise()
    return describeTableData.Table
  }

  // Create Table in DynamoDB local
  public async createTable(createTableParam: CreateTableParam): Promise<void> {
    const param: DynamoDB.CreateTableInput = {
      TableName: createTableParam.tableName,
      AttributeDefinitions: [
        {
          AttributeName: createTableParam.hashKey,
          AttributeType: createTableParam.hashKeyType
        }
      ],
      KeySchema: [
        {
          AttributeName: createTableParam.hashKey,
          KeyType: "HASH"
        }
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
      }
    }
    if (createTableParam.rengeKey !== "") {
      param.AttributeDefinitions.push({
        AttributeName: createTableParam.rengeKey,
        AttributeType: createTableParam.hashKeyType
      })
      param.KeySchema.push({
        AttributeName: createTableParam.rengeKey,
        KeyType: "RENGE"
      })
    }
    await this.dynamodb.createTable(param).promise()
  }

  // Scan
  public async scan(tableName: string): Promise<{ [k: string]: any }> {
    const param: DynamoDB.DocumentClient.ScanInput = {
      TableName: tableName,
      Limit: 300
    }
    const scanData: DynamoDB.DocumentClient.ScanOutput = await this.documentClient
      .scan(param)
      .promise()
    return scanData.Items
  }

  // Query
  public async query(): Promise<{ [k: string]: any }> {
    const param: DynamoDB.DocumentClient.QueryInput = {
      TableName: "",
      KeyConditionExpression: "",
      ExpressionAttributeNames: {},
      ExpressionAttributeValues: {}
    }
    const queryData: DynamoDB.DocumentClient.QueryOutput = await this.documentClient
      .query(param)
      .promise()
    console.log(queryData)
    return queryData.Items
  }
}
