import { DynamoDB } from "aws-sdk"
import DynamoDBLocalModel from "@/models/dynamodb_local_model"

export type SideMenuComponentState = {
  dynamoDBLocalModel: DynamoDBLocalModel
  tableList: string[]
  selectedTableName: string
  selectedTableIndex: number
  createTableDialog: boolean
  createTableParam: CreateTableParam
  keyTypes: KeyTypes[]
}

export type HomeComponentState = {
  dynamoDBLocalModel: DynamoDBLocalModel
  tableDescription: DynamoDB.TableDescription
  tableHeaders: TableHeader[]
  tableItems: { [k: string]: any }
}

export type AppVueData = {
  toolbarColor: string
  tableName: string
}

export type CreateTableParam = {
  tableName: string
  hashKey: string
  hashKeyType: "S" | "N" | "B"
  rengeKey: string
  rengeKeyType: "S" | "N" | "B"
}

export type KeyTypes = {
  text: string
  value: "S" | "N" | "B"
}

export type TableHeader = {
  text: string
  value: string
}
