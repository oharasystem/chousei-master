import { Fragment } from 'react'

export const Script = ({ src, async, nonce }: { src: string, async?: boolean, nonce?: string }) => {
  if (import.meta.env.PROD) {
    const MANIFEST = import.meta.glob<{ default: Record<string, { file: string }> }>('/dist/.vite/manifest.json', { eager: true })
    let manifest
    for (const [, manifestFile] of Object.entries(MANIFEST)) {
      if (manifestFile.default) {
        manifest = manifestFile.default
        break
      }
    }

    if (manifest) {
      const scriptInManifest = manifest[src.replace(/^\//, '')]
      if (scriptInManifest) {
        return <script type="module" async={!!async} src={`/${scriptInManifest.file}`} nonce={nonce} />
      }
    }
    return <Fragment />
  } else {
    return <script type="module" async={!!async} src={src} nonce={nonce} />
  }
}

export const Link = ({ href, rel, ...rest }: { href: string, rel?: string, [key: string]: any }) => {
  if (import.meta.env.PROD && href) {
    const MANIFEST = import.meta.glob<{ default: Record<string, { file: string }> }>('/dist/.vite/manifest.json', { eager: true })
    let manifest
    for (const [, manifestFile] of Object.entries(MANIFEST)) {
      if (manifestFile.default) {
        manifest = manifestFile.default
        break
      }
    }

    if (manifest) {
      const assetInManifest = manifest[href.replace(/^\//, '')]
      if (assetInManifest) {
        return <link href={`/${assetInManifest.file}`} rel={rel || "stylesheet"} {...rest} />
      }
    }
    return <Fragment />
  } else {
    return <link href={href} rel={rel || "stylesheet"} {...rest} />
  }
}
