import { hydrateRoot } from 'react-dom/client'
import { createElement } from 'react'

// ====================================================================
// Custom island hydration (replaces honox/client's createClient)
// to prevent hono/jsx/dom from being bundled into the client,
// which causes React Error #31 ({tag, type, props, key, ref} objects).
// ====================================================================

const COMPONENT_NAME = 'component-name'
const COMPONENT_EXPORT = 'component-export'
const DATA_SERIALIZED_PROPS = 'data-serialized-props'
const DATA_HONO_TEMPLATE = 'data-hono-template'

const FILES: Record<string, () => Promise<any>> = {
  ...import.meta.glob('/app/islands/**/[a-zA-Z0-9-]+.tsx'),
  ...import.meta.glob('/app/**/_[a-zA-Z0-9-]+.island.tsx'),
  ...import.meta.glob('/app/**/$[a-zA-Z0-9-]+.tsx'),
}

let keyIndex = 0

async function importComponent(name: string): Promise<any> {
  const file = FILES[name]
  if (!file) return undefined
  const mod = await file()
  return mod.default
}

function createChildren(childNodes: NodeListOf<ChildNode>): any[] {
  const children: any[] = []
  for (let i = 0; i < childNodes.length; i++) {
    const child = childNodes[i]
    if (child.nodeType === 8) continue // Skip comments
    if (child.nodeType === 3) {
      children.push(child.textContent)
      continue
    }
    if (child instanceof Element) {
      children.push(createElementFromDOM(child))
    }
  }
  return children
}

function createElementFromDOM(element: Element): any {
  const props: Record<string, any> = {}
  const attributes = element.attributes
  for (let i = 0; i < attributes.length; i++) {
    const attr = attributes[i]
    if (attr.name === 'class') {
      props.className = attr.value
    } else if (attr.name === 'for') {
      props.htmlFor = attr.value
    } else {
      props[attr.name] = attr.value
    }
  }
  const childArr = createChildren(element.childNodes)
  if (childArr.length > 0) {
    props.children = childArr.length === 1 ? childArr[0] : childArr
  }
  return createElement(element.tagName.toLowerCase(), { key: ++keyIndex, ...props })
}

async function hydrateIslands() {
  for (const filePath of Object.keys(FILES)) {
    const componentName = filePath
    const elements = document.querySelectorAll(
      `[${COMPONENT_NAME}="${componentName}"]:not([data-hono-hydrated])`
    )
    for (const element of Array.from(elements)) {
      element.setAttribute('data-hono-hydrated', 'true')
      const exportName = element.getAttribute(COMPONENT_EXPORT) || 'default'
      const file = await FILES[filePath]()
      const Component = file[exportName]
      const serializedProps = element.getAttribute(DATA_SERIALIZED_PROPS)
      const props: Record<string, any> = JSON.parse(serializedProps ?? '{}')

      // Handle template children (element props serialized by HonoXIsland)
      let maybeTemplate = element.childNodes[element.childNodes.length - 1]
      while (
        maybeTemplate instanceof HTMLTemplateElement &&
        maybeTemplate.getAttribute(DATA_HONO_TEMPLATE) !== null
      ) {
        const propKey = maybeTemplate.getAttribute(DATA_HONO_TEMPLATE)!
        props[propKey] = createChildren(maybeTemplate.content.childNodes)
        maybeTemplate = maybeTemplate.previousSibling as ChildNode
      }

      const newElem = createElement(Component, props)
      hydrateRoot(element as HTMLElement, newElem)
    }
  }
}

hydrateIslands()
