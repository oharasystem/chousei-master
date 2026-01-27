import { createClient } from 'honox/client'
import { hydrateRoot } from 'react-dom/client'
import { createElement } from 'react'

createClient({
  hydrate: async (elem, root) => {
    hydrateRoot(root, elem)
  },
  createElement
})
