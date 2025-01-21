import rpc from './rpc'

import { RecordMap } from '../interface/IRecordMap'

export default function queryCollection({
  collectionId,
  collectionViewId,
  loader = {},
  query = {},
}: any): Promise<RecordMap> {
  const queryCollectionBody = {
    loader: {
      type: 'reducer',
      reducers: {
        collection_group_results: {
          type: 'results',
          limit: 999,
          loadContentCover: true,
        },
        'table:uncategorized:title:count': {
          type: 'aggregation',
          aggregation: {
            property: 'title',
            aggregator: 'count',
          },
        },
      },
      searchQuery: '',
      userTimeZone: 'America/Phoenix',
    },
  }

  // Chama a função rpc e retorna o valor esperado
  return rpc('queryCollection', {
    collectionId,
    collectionViewId,
    ...queryCollectionBody,
  }).then((response: any) => {
    // Supondo que a resposta do RPC tenha a estrutura correta, adaptamos para um RecordMap
    const recordMap: RecordMap = {
      recordMap: response.recordMap,
      block: response.recordMap.block,
      collection: response.recordMap.collection,
    }
    return recordMap
  })
}
