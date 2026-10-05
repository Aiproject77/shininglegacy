# Shining Legacy Commercial Cleaning — Website (static, Vercel)

Canonical domain: https://www.shininglegacy.ca (the bare domain redirects to www in Vercel).

## Deploy
Push this folder to the GitHub repo connected to Vercel. No build step needed.
`vercel.json` enables clean URLs (/about instead of about.html), 301 redirects for old URLs, and caching.

## Pages
- Home, Services, About, Quote, Contact, Blog, Privacy, Thank-you (noindex), 404 (noindex)
- Lead magnets: /checklist (60-point inspection checklist), /cleaning-cost-estimator (cost estimator + email capture via Formspree)
- Service areas: /service-areas + /commercial-cleaning-{toronto, etobicoke, mississauga, brampton, vaughan, markham, durham-region, clarington}
- Blog articles (6)

## SEO / AEO
- Favicon set from the logo (favicon.ico, PNG, apple-touch-icon, manifest), og-image.jpg for sharing
- Images extracted from inline base64 to /images/*.webp (index went from 3.8 MB to ~90 KB)
- JSON-LD on every page: LocalBusiness, WebSite, WebPage, BreadcrumbList, FAQPage, BlogPosting, Service
- robots.txt (AI crawlers allowed), sitemap.xml, llms.txt

## To check with the client
- Cost estimator rates (top of the script in cleaning-cost-estimator.html, object `EST`)
- Testimonials and figures in the articles (e.g. "25% fewer sick days", "Real Results") must be real or sourced
