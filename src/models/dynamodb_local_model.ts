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
}
