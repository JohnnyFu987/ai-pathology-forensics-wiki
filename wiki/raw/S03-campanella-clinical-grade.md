---
source_id: S03
title: "Clinical-grade computational pathology using weakly supervised deep learning on whole slide images"
type: paper
authors_or_org: "Campanella G, Hanna MG, Geneslaw L, et al."
published: 2019-07-15
url: https://pmc.ncbi.nlm.nih.gov/articles/PMC7418463/
ingested_at: 2026-11-17
status: verified
---

# S03｜大規模弱監督與外部泛化

## 來源用途

說明病人層級切分、弱監督學習、大型多樣化資料與外部測試的重要性。

## 可支持的說法

- 研究使用 44,732 張切片、15,187 位病人，並在病人層級切成 70% 訓練、15% 驗證、15% 測試。
- CAMELYON16 上訓練的全監督模型在該挑戰測試集得到 AUC 0.930；移至較大的 MSK 測試集時 AUC 為 0.727。
- 掃描器、染色與切片製備差異可能影響泛化表現。

## 限制

AUC 不是準確率。上述數字屬於該研究、模型與資料集，不可直接套用到案件 WSI-095。

## 衍生頁面

- [切片分塊與弱監督](../pages/tiling-and-weak-supervision.md)
- [資料切分與洩漏](../pages/data-splitting-and-leakage.md)
- [跨院泛化與站點偏差](../pages/generalization-and-site-bias.md)

