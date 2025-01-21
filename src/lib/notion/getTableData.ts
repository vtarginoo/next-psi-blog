import { values } from './rpc'
import Slugger from 'github-slugger'
import queryCollection from './queryCollection'
import { normalizeSlug } from '../blog-helpers'
import { RecordMap } from '../interface/IRecordMap'

export default async function loadTable(collectionBlock: any, isPosts = false) {
  const slugger = new Slugger()

  const { value } = collectionBlock
  let table: any = {}

  // Tipando a variável `col` como RecordMap
  const col: RecordMap = await queryCollection({
    collectionId: value.collection_id,
    collectionViewId: value.view_ids[0],
  })

  const entries = values(col.recordMap.block).filter((block: any) => {
    return block.value && block.value.parent_id === value.collection_id
  })

  const colId = Object.keys(col.recordMap.collection)[0]
  const schema = col.recordMap.collection[colId].value.schema
  const schemaKeys = Object.keys(schema)

  for (const entry of entries) {
    const props = entry.value && entry.value.properties
    const row: any = {}

    if (!props) continue
    if (entry.value.content) {
      row.id = entry.value.id
    }

    schemaKeys.forEach((key) => {
      let val = props[key] && props[key][0][0]

      if (val && props[key][0][1]) {
        const type = props[key][0][1][0]

        switch (type[0]) {
          case 'a': // link
            val = type[1]
            break
          case 'u': // user
            val = props[key]
              .filter((arr: any[]) => arr.length > 1)
              .map((arr: any[]) => arr[1][0][1])
            break
          case 'p': // page (block)
            const page = col.recordMap.block[type[1]]
            row.id = page.value.id
            val = page.value.properties.title[0][0]
            break
          case 'd': // date
            if (!type[1].start_date) {
              break
            }
            const providedDate = new Date(
              type[1].start_date + ' ' + (type[1].start_time || '')
            ).getTime()

            const timezoneOffset =
              new Date(
                new Date().toLocaleString('en-US', {
                  timeZone: type[1].time_zone,
                })
              ).getTime() - new Date().getTime()

            val = new Date(providedDate - timezoneOffset).getTime()
            break
          default:
            console.error('unknown type', type[0], type)
            break
        }
      }

      if (typeof val === 'string') {
        val = val.trim()
      }
      row[schema[key].name] = val || null
    })

    row.Slug = normalizeSlug(row.Slug || slugger.slug(row.Page || ''))

    const key = row.Slug
    if (isPosts && !key) continue

    if (key) {
      table[key] = row
    } else {
      if (!Array.isArray(table)) table = []
      table.push(row)
    }
  }
  return table
}
