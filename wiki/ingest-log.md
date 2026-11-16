# Ingest Log

| Run | Source | 類型 | 產生／更新頁面 | 狀態 |
|---|---|---|---|---|
| ING-001 | S01 OpenSlide | paper | WSI、tiling | passed |
| ING-002 | S02 CAMELYON16 | paper | metrics、data split | passed |
| ING-003 | S03 Campanella et al. | paper | weak supervision、split、generalization、metrics | passed after metric label fix |
| ING-004 | S04 Howard et al. | paper | site bias、ethics | passed |
| ING-005 | S05 Steiner et al. | paper | human-AI collaboration | passed after backlink fix |
| ING-006 | S06 FDA／IMDRF GMLP | official | data split、deployment | passed |
| ING-007 | S07 WHO ethics | guideline | deployment、collaboration | passed |

## Ingest 規則

每次 ingest 都讀取既有 Wiki，新增或更新相關頁面，而不是只附加一篇獨立摘要。S03 加入時同時更新四個概念頁；S06 加入時則強化原有資料切分頁的治理理由。

