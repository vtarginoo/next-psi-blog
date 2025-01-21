import rpc, { values } from './rpc'

interface PageChunkData {
  recordMap: {
    block: Record<string, { value: any }>
  }
  cursor: {
    stack: any[]
  }
}

export default async function getPageData(pageId: string) {
  const maximumChunkNumber = 100

  try {
    let chunkNumber = 0
    let data: PageChunkData = await loadPageChunk({ pageId, chunkNumber })
    let blocks = data.recordMap.block

    while (data.cursor.stack.length !== 0 && chunkNumber < maximumChunkNumber) {
      chunkNumber = chunkNumber + 1
      data = await loadPageChunk({
        pageId,
        chunkNumber,
        cursor: data.cursor,
      })
      blocks = { ...blocks, ...data.recordMap.block }
    }

    const blockArray = Object.values(blocks)
    if (blockArray[0] && blockArray[0].value.content) {
      // remove table blocks
      blockArray.splice(0, 3)
    }
    return { blocks: blockArray }
  } catch (err) {
    console.error(`Failed to load pageData for ${pageId}`, err)
    return { blocks: [] }
  }
}

export function loadPageChunk({
  pageId,
  limit = 30,
  cursor = { stack: [] },
  chunkNumber = 0,
  verticalColumns = false,
}: any): Promise<PageChunkData> {
  return rpc('loadPageChunk', {
    pageId,
    limit,
    cursor,
    chunkNumber,
    verticalColumns,
  })
}
