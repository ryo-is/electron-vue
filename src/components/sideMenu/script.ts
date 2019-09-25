import Vue from "vue"
import { HomeComponentState } from "@/types"
import DynamoDBLocalModel from "@/models/dynamodb_local_model"
import { defaultCreateTableParam, keyTypesValue } from "./config_values"

export default Vue.extend({
  data(): HomeComponentState {
    return {
      dynamoDBLocalModel: null,
      tableList: [],
      selectedTableName: "",
      selectedTableIndex: null,
      createTableDialog: false,
      createTableParam: defaultCreateTableParam,
      keyTypes: keyTypesValue
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
