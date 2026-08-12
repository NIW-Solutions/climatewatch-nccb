# Publication PDFs

Publication downloads are served from this folder as static files.

## Naming convention

Each entry in `src/content/publications.ts` declares a `pdf` path that
follows the publication's own slug:

```
/documents/<slug>.pdf
```

For example, the publication with
`slug: "from-disaster-response-to-climate-resilience"` expects:

```
public/documents/from-disaster-response-to-climate-resilience.pdf
```

## Currently expected files

- `from-disaster-response-to-climate-resilience.pdf`
- `pakistan-climate-budget-reduction.pdf`
- `wildlife-of-northern-pakistan.pdf`
- `ace-at-sb64.pdf`
- `bonn-sb64-midway-media-brief.pdf`
- `glof-risk-northern-pakistan.pdf`
- `loss-and-damage-readiness.pdf`
- `climate-education-baseline.pdf`
- `cop30-position-brief.pdf`

Until a file is added, its download link resolves to a 404. Update the
`pdfSize` and `pages` fields in the content file to match each real
document once it is in place.

## Cover artwork

Covers are optional. When a publication has no `cover` field, the archive
renders a generated typographic cover from the title and metadata. To use
real artwork, add the image under `public/images/publications/` and set:

```ts
cover: "/images/publications/<slug>.webp",
coverAlt: "Cover of ...",
```
