import Vue from "vue"
import { HomeComponentState } from "@/types"
import DynamoDBLocalModel from "@/models/dynamodb_local_model"

export default Vue.extend({
  data(): HomeComponentState {
    return {
      dynamoDBLocalModel: null,
      tableList: [],
      selectedTableName: "",
      selectedTableIndex: null,
      createTableDialog: false,
      createTableParam: {
        tableName: "",
        hashKey: "",
        hashKeyType: "S",
        rengeKey: "",
        rengeKeyType: "S"
      },
      keyTypes: [
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
    }
  },
  watch: {
    selectedTableIndex(): void {
      this.selectedTableName = this.tableList[this.selectedTableIndex]
      console.log(this.selectedTableName)
      this.$emit("setTableName", this.selectedTableName)
    }
  },
  async created() {
    try {
      this.dynamoDBLocalModel = new DynamoDBLocalModel()
      this.tableList = await this.dynamoDBLocalModel.listTable()
    } catch (err) {
      console.error(err)
    }
  },
  methods: {
    async createTable(): Promise<void> {
      try {
        await this.dynamoDBLocalModel.createTable(this.createTableParam)
        this.createTableDialog = false
        this.tableList = await this.dynamoDBLocalModel.listTable()
      } catch (err) {
        console.error(err)
      }
    }
  }
})
