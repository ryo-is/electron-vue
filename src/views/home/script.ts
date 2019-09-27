import Vue from "vue"
import DynamoDBLocalModel from "@/models/dynamodb_local_model"
import { HomeComponentState } from "@/types"

export default Vue.extend({
  props: {
    tableName: {
      default: "",
      type: String
    }
  },
  data(): HomeComponentState {
    return {
      dynamoDBLocalModel: null,
      tableDescription: null,
      tableHeaders: [],
      tableItems: null
    }
  },
  watch: {
    async tableName(): Promise<void> {
      if (this.tableName !== "") {
        try {
          this.tableHeaders = []
          this.tableItems = []
          this.tableDescription = await this.dynamoDBLocalModel.describeTable(
            this.tableName
          )
          console.log(this.tableDescription)
          for (
            let i: number = 0;
            i < this.tableDescription.KeySchema.length;
            i++
          ) {
            this.tableHeaders.push({
              text: this.tableDescription.KeySchema[i].AttributeName,
              value: this.tableDescription.KeySchema[i].AttributeName
            })
          }
          this.tableItems = await this.dynamoDBLocalModel.scan(this.tableName)
          console.log(this.tableItems)
        } catch (err) {
          console.error(err)
        }
      }
    }
  },
  async created() {
    try {
      this.dynamoDBLocalModel = new DynamoDBLocalModel()
    } catch (err) {
      console.error(err)
    }
  }
})
