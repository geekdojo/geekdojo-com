# geekdojo-com

Source for **[geekdojo.com](https://geekdojo.com)** — the company site.
Hugo builds it (`hugo --minify` → `public/`): the landing and about pages are
plain HTML served verbatim from `static/`, and content sections (currently
[/developing-with-ai/](https://geekdojo.com/developing-with-ai/)) are rendered
from markdown in `content/`. Pushes to `master` deploy to Azure Static Web
Apps; PRs run the same build as a required check.

Local preview: `hugo server` (Hugo 0.164.0 extended — same version CI pins).
New deep-dive: `hugo new content developing-with-ai/<slug>.md` (starts as
`draft: true`).

geekdojo's flagship project is **Rasputin**, the open-source homelab cluster
system — its site lives at [rasputin.geekdojo.com](https://rasputin.geekdojo.com)
([source](https://github.com/geekdojo/rasputin-site)), downloads at
[rasputin.geekdojo.com/download](https://rasputin.geekdojo.com/download/).

The previous DocFx-based "dojo" content site lives on in this repo's git
history (pre-2026 commits).

Site content is [CC-BY-SA-4.0](LICENSE).
