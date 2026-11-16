# 資料切分與洩漏

## 白話定義

訓練集是 AI 的課本，驗證集用來調整方法，測試集則是最後不能偷看的考卷。若同一位病人的相關影像出現在不同集合，模型可能認出病人或製作特徵，而不是學會真正任務。

## 鑑識意義

資料必須在病人層級分組後再切分，並確保測試集不參與模型選擇。

## 證物

- **E04**：Campanella 等人於病人層級切為 70% 訓練、15% 驗證、15% 測試。[S03](../raw/S03-campanella-clinical-grade.md)
- **E05**：FDA／IMDRF GMLP 強調訓練與測試資料應保持獨立。[S06](../raw/S06-fda-gmlp.md)

## 相關頁面

- [指標與臨床用途](metrics-and-clinical-use.md)
- [跨院泛化與站點偏差](generalization-and-site-bias.md)

