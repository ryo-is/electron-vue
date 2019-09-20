import { Component, Vue } from "vue-property-decorator"
import { DynamoDB, Credentials } from "aws-sdk"

const db: DynamoDB = new DynamoDB({
  endpoint: "http://localhost:8000",
  region: "local",
  credentials: new Credentials({
    accessKeyId: "",
    secretAccessKey: ""
  })
})

@Component({})
export default class Home extends Vue {
  public async created(): Promise<void> {
    try {
      const tableList = await db.listTables().promise()
      console.log(tableList)
    } catch (err) {
      console.error(err)
    }
  }

  // Create Table in DynamoDB local
  public async createTable(): Promise<void> {
    await db
      .createTable({
        TableName: "tastTable",
        AttributeDefinitions: [
          {
            AttributeName: "id",
            AttributeType: "S"
          },
          {
            AttributeName: "record_time",
            AttributeType: "S"
          }
        ],
        KeySchema: [
          {
            AttributeName: "id",
            KeyType: "HASH"
          },
          {
            AttributeName: "record_time",
            KeyType: "RENGE"
          }
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 1,
          WriteCapacityUnits: 1
        }
      })
      .promise()
  }
}
