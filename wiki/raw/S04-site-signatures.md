---
source_id: S04
title: "The impact of site-specific digital histology signatures on deep learning model accuracy and bias"
type: paper
authors_or_org: "Howard FM, Dolezal J, Kochanny S, et al."
published: 2021-07-20
url: https://www.nature.com/articles/s41467-021-24698-1
ingested_at: 2026-11-17
status: verified
---

# S04｜站點特徵與偏差

## 來源用途

說明模型可能學到醫院、染色或掃描流程留下的站點特徵，而不是預期的生物訊號。

## 可支持的說法

- 研究分析 TCGA 六種癌症、超過 3,000 位病人的資料，發現臨床與切片特徵會隨提交站點改變。
- 深度學習可以辨識切片來源站點；常見色彩正規化與擴增不一定完全消除這些訊號。
- 站點特徵可能導致過度樂觀的內部估計，並影響公平性與外部泛化。

## 限制

研究指出風險與機制，不表示所有病理模型都必然產生相同偏差。

## 衍生頁面

- [跨院泛化與站點偏差](../pages/generalization-and-site-bias.md)
- [倫理與部署](../pages/ethical-deployment.md)

