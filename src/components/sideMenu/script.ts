import { Component, Vue, Watch, Emit } from "vue-property-decorator"
import { CreateTableParam, KeyTypes } from "@/types"
import DynamoDBLocalModel from "@/models/dynamodb_local_model"

@Component({})
export default class SideMenu extends Vue {
  public dynamoDBLocalModel: DynamoDBLocalModel = null
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
      this.dynamoDBLocalModel = new DynamoDBLocalModel()
      this.tableList = await this.dynamoDBLocalModel.listTable()
    } catch (err) {
      console.error(err)
    }
  }

  // Create Table in DynamoDB local
  public async createTable(): Promise<void> {
    try {
      await this.dynamoDBLocalModel.createTable(this.createTableParam)
    } catch (err) {
      console.error(err)
    }
  }
}
