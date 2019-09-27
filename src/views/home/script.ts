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
      tableHeaders: []
    }
  },
  watch: {
    async tableName(): Promise<void> {
      this.tableDescription = await this.dynamoDBLocalModel.describeTable(
        this.tableName
      )
      console.log(this.tableDescription)
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
