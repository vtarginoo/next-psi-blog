import { Sema } from 'async-sema'
import rpc, { values } from './rpc'
import getTableData from './getTableData'
import { getPostPreview } from './getPostPreview'
import { readFile, writeFile } from '../fs-helpers'
import { BLOG_INDEX_ID, BLOG_INDEX_CACHE } from './server-constants'
import { RpcResponse } from '../interface/IRpcResponse'

export default async function getBlogIndex(previews = true) {
  let postsTable: any = null
  const useCache = process.env.USE_CACHE === 'true'
  const cacheFile = `${BLOG_INDEX_CACHE}${previews ? '_previews' : ''}`

  if (useCache) {
    try {
      postsTable = JSON.parse(await readFile(cacheFile, 'utf8'))
    } catch (_) {
      /* not fatal */
    }
  }

  if (!postsTable) {
    try {
      const data = (await rpc('loadPageChunk', {
        pageId: BLOG_INDEX_ID,
        limit: 100,
        cursor: { stack: [] },
        chunkNumber: 0,
        verticalColumns: false,
      })) as RpcResponse

      if (!data || typeof data !== 'object' || !('recordMap' in data)) {
        throw new Error('Invalid data format from RPC')
      }

      // Parse table with posts
      const tableBlock = Object.values(data.recordMap.block).find(
        (block) => block.value.type === 'collection_view'
      )

      if (!tableBlock) {
        throw new Error('No collection_view block found in recordMap')
      }

      postsTable = await getTableData(tableBlock, true)
    } catch (err) {
      console.warn(
        `Failed to load Notion posts, have you run the create-table script?`
      )
      return {}
    }

    // Process posts previews
    const postsKeys = Object.keys(postsTable).splice(0, 10)
    const sema = new Sema(3, { capacity: postsKeys.length })

    if (previews) {
      await Promise.all(
        postsKeys
          .sort((a, b) => {
            const postA = postsTable[a]
            const postB = postsTable[b]
            const timeA = postA.Date
            const timeB = postB.Date
            return Math.sign(timeB - timeA)
          })
          .map(async (postKey) => {
            await sema.acquire()
            const post = postsTable[postKey]
            post.preview = post.id
              ? await getPostPreview(postsTable[postKey].id)
              : []
            sema.release()
          })
      )
    }

    if (useCache) {
      writeFile(cacheFile, JSON.stringify(postsTable), 'utf8').catch(() => {})
    }
  }

  return postsTable
}
