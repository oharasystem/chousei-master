/** @jsxImportSource react */
import { createRoute } from 'honox/factory'
import HistoryList from '../islands/HistoryList'

export default createRoute((c) => {
  return c.render(
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">履歴</h1>
      <HistoryList />
    </div>,
    { title: '履歴' }
  )
})
