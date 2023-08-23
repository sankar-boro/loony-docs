export type ObjectId = {
  $oid: string
}

export type Post = {
  title: string
  _id: ObjectId
  body: string
}
