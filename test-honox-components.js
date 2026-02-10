// Mock import.meta.env for Node.js
globalThis.import = globalThis.import || {};
globalThis.import.meta = globalThis.import.meta || {};
globalThis.import.meta.env = { PROD: false };

import { Link, Script } from './node_modules/honox/dist/server/components/index.js'

console.log('--- Script ---')
const s = Script({ src: '/test.js' })
console.log(JSON.stringify(s, null, 2))
console.log('keys:', Object.keys(s))
console.log('type:', s.type)
console.log('ref:', s.ref)

console.log('\n--- Link ---')
const l = Link({ href: '/test.css', rel: 'stylesheet' })
console.log(JSON.stringify(l, null, 2))
console.log('keys:', Object.keys(l))
console.log('type:', l.type)
console.log('ref:', l.ref)
