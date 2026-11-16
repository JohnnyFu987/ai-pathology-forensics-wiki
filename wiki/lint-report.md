# Lint Report

執行日期：2026-11-17

## 結果摘要

- Raw sources：7
- Concept pages：7
- Missing source metadata：0
- Broken relative links：0（修正前 1）
- Unsupported numeric claims：0（修正前 1）
- Metric-name mismatch：0（修正前 1）
- Orphan concept pages：0（修正前 1）

## 已修正問題

### LINT-01｜指標名稱錯置

原句將 AUC 0.930 與 0.727 寫成 93% 與 72.7% 準確率。已修正為 AUC，並補上資料集與研究情境。

### LINT-02｜過度概括

原句「換醫院一定失準」超出來源，已改為「資料來源改變時表現可能下降，因此需要外部驗證」。

### LINT-03｜孤立概念

人機協作頁缺少回連至指標與用途頁。已建立雙向連結。

## 當前注意事項

案件 WSI-095 的 95% 是虛構教學數字，只能用來觸發審查問題，不得與任何研究數字混用。

## 介面 QA 補充

768px 初次測試發現 Loop／Graph 的回退標籤向右溢出約 50px。已將 960px 以下版面的標籤改為流程內排列；375px、768px 與桌面版重新檢查後無水平溢出。

