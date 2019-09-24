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
