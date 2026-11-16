# Wiki Schema

## Raw source card

```yaml
source_id: S01
title: source title
type: paper | guideline | official-web
authors_or_org: names
published: YYYY-MM-DD
url: canonical URL
ingested_at: YYYY-MM-DD
status: verified | partial
```

正文依序包含：來源用途、可支持的說法、重要限制、衍生頁面。

## Evidence card

```yaml
evidence_id: E01
claim: beginner-readable claim
source_ids: [S01]
context: dataset / metric / intended use
status: supported | unsupported | needs-context
slides: [2, 3]
```

## Concept page

每頁包含：白話定義、鑑識意義、來源證物、限制、相關頁面。交叉連結使用相對 Markdown 連結。

