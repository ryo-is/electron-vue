import { Component, Vue, Watch, Emit } from "vue-property-decorator"
import { DynamoDB, Credentials } from "aws-sdk"
import { CreateTableParam, KeyTypes } from "@/types"

const db: DynamoDB = new DynamoDB({
  endpoint: "http://localhost:8000",
  region: "local",
  credentials: new Credentials({
    accessKeyId: "",
    secretAccessKey: ""
  })
})

@Component({})
export default class SideMenu extends Vue {
  public tableList: string[] = []
  public selectedTableName: string = ""
  public selectedTableIndex: number = null
  public createTableDialog: boolean = false
  public createTableParam: CreateTableParam = {
    tableName: "",
    hashKey: "",
    hashKeyType: "S",
    rengeKey: "",
    rengeKeyType: "S"
  }
  public keyTypes: KeyTypes[] = [
    {
      text: "String",
      value: "S"
    },
    {
      text: "Number",
      value: "N"
    },
    {
      text: "Binary",
      value: "B"
    }
  ]

  @Watch("selectedTableIndex")
  public changeSelectedTableValue(): void {
    this.selectedTableName = this.tableList[this.selectedTableIndex]
    console.log(this.selectedTableName)
    this.setSelectedTableName()
  }

  @Emit("setTableName")
  public setSelectedTableName(): string {
    return this.selectedTableName
  }

  public async created(): Promise<void> {
    try {
      const tableList = await db.listTables().promise()
      this.tableList = tableList.TableNames
    } catch (err) {
      console.error(err)
    }
  }

  // Create Table in DynamoDB local
  public async createTable(): Promise<void> {
    try {
      console.log(this.createTableParam)
      const param: DynamoDB.CreateTableInput = {
        TableName: this.createTableParam.tableName,
        AttributeDefinitions: [
          {
            AttributeName: this.createTableParam.hashKey,
            AttributeType: this.createTableParam.hashKeyType
          }
        ],
        KeySchema: [
          {
            AttributeName: this.createTableParam.hashKey,
            KeyType: "HASH"
          }
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 1,
          WriteCapacityUnits: 1
        }
      }
      if (this.createTableParam.rengeKey !== "") {
        param.AttributeDefinitions.push({
          AttributeName: this.createTableParam.rengeKey,
          AttributeType: this.createTableParam.hashKeyType
        })
        param.KeySchema.push({
          AttributeName: this.createTableParam.rengeKey,
          KeyType: "RENGE"
        })
      }
      await db.createTable(param).promise()
    } catch (err) {
      console.error(err)
    }
  }
}
