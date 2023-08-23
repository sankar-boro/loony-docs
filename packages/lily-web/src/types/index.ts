export type ObjectId = {
  $oid: string
}

export type Post = {
  title: string
  _id: ObjectId
  body: string
}

export type Group = {
  _id: ObjectId
  name: string
}
