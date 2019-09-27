import { CreateTableParam, KeyTypes } from "@/types"

export const defaultCreateTableParam: CreateTableParam = {
  tableName: "",
  hashKey: "",
  hashKeyType: "S",
  rengeKey: "",
  rengeKeyType: "S"
}

export const keyTypesValue: KeyTypes[] = [
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
