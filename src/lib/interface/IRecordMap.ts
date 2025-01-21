export interface PageBlock {
  id: string
  value: {
    parent_id: string
    collection_id: string
    properties: { [key: string]: any }
    content?: string[]
  }
}

export interface CollectionSchema {
  [key: string]: {
    name: string
    type: string
  }
}

export interface RecordMap {
  recordMap: any
  block: { [key: string]: { value: any } }
  collection: { [key: string]: { value: { schema: { [key: string]: any } } } }
}
