// Same-origin links that point outside this site's section of the domain
// (sibling docs sites like /<repo>/) must be real navigations. VitePress's
// SPA router intercepts every same-origin <a> click and would 404 on them.
//
// This is a local copy of the guard vitepress-theme-9aia ships in
// src/section-links.ts, with two deliberate differences:
//
//   1. It installs at theme-module evaluation time, not onMounted. Since
//      VitePress 1.6 the router binds its click interceptor with
//      `{ capture: true }` on window during createApp() — before any
//      component mounts. A capture listener registered later can never
//      preempt it, so the theme's onMounted guard is dead code on this
//      VitePress version. Module side effects run before createApp(), so
//      this listener is registered first.
//   2. It calls stopImmediatePropagation(), not stopPropagation(). Both
//      listeners live on window in the capture phase; stopPropagation
//      would still let the router's same-node listener run. Only
//      stopImmediatePropagation() prevents it.
//
// The site sits at the domain root (base "/"), so "outside" means the
// first path segment is listed in externalSections.

interface GuardOptions {
  base: () => string;
  sections: () => readonly string[];
}

// Mirrors VitePress's treatAsHtml closely enough: page routes are
// extensionless or .html; anything else is left to the browser anyway.
function isHtmlPath(pathname: string) {
  const last = pathname.slice(pathname.lastIndexOf('/') + 1)
  const dot = last.lastIndexOf('.')
  if (dot === -1) return true
  const ext = last.slice(dot + 1).toLowerCase()
  return ext === 'html' || ext === 'htm'
}

function isOutsideSite(pathname: string, base: string, sections: readonly string[]) {
  const norm = base.endsWith('/') ? base : `${base}/`
  if (norm !== '/') {
    return !pathname.startsWith(norm)
  }
  return sections.some(
    (s) => pathname === `/${s}` || pathname === `/${s}/` || pathname.startsWith(`/${s}/`),
  )
}

const INSTALLED = '__gaiaSectionLinkGuardInstalled'

export function installSectionLinkGuard({ base, sections }: GuardOptions) {
  if (typeof window === 'undefined') return
  const w = window as unknown as Record<string, unknown>
  if (w[INSTALLED]) return
  w[INSTALLED] = true

  const onClick = (e: MouseEvent) => {
    if (
      e.defaultPrevented ||
      !(e.target instanceof Element) ||
      e.target.closest('button') ||
      e.button !== 0 ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      e.metaKey
    ) {
      return
    }
    const link = e.target.closest('a')
    if (
      !link ||
      link.closest('.vp-raw') ||
      link.hasAttribute('download') ||
      link.hasAttribute('target')
    ) {
      return
    }
    const linkHref =
      link.getAttribute('href') ??
      (link instanceof SVGAElement ? link.getAttribute('xlink:href') : null)
    if (linkHref == null) return
    let url: URL
    try {
      url = new URL(linkHref, link.baseURI)
    } catch {
      return
    }
    if (url.origin !== location.origin || !isHtmlPath(url.pathname)) return
    if (!isOutsideSite(url.pathname, base(), sections())) return
    e.stopImmediatePropagation()
  }
  window.addEventListener('click', onClick, true)
}
