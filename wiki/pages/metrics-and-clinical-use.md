# 指標與臨床用途

## 白話定義

- **Accuracy（準確率）**：全部案例中答對多少。
- **Sensitivity（敏感度）**：真正陽性中抓到多少。
- **Specificity（特異度）**：真正陰性中排除多少。
- **AUC**：模型在不同閾值下區分陽性與陰性的整體能力，不等於準確率。

## 鑑識意義

同一個 95% 可能代表完全不同的錯誤分布。篩檢工具通常更關心漏掉多少陽性；排序或第二讀者工具則需要另外評估工作量與假警報。

## 證物

- **E06**：CAMELYON16 將病灶定位與整張切片分類分開評估。[S02](../raw/S02-camelyon16.md)
- **E07**：特定研究中，模型在 CAMELYON16 測試集的 AUC 0.930，移至 MSK 測試集為 0.727；這不是準確率比較。[S03](../raw/S03-campanella-clinical-grade.md)

## 相關頁面

- [資料切分與洩漏](data-splitting-and-leakage.md)
- [人機協作](human-ai-collaboration.md)

