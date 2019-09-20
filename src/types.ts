export type CreateTableParam = {
  tableName: string
  hashKey: string
  hashKeyType: string
  rengeKey: string
  rengeKeyType: string
}

export type KeyTypes = {
  text: string
  value: "S" | "N" | "B"
}
