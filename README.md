# AI 病理鑑識局｜案件 WSI-095

一份由 LLM Wiki 產生的互動式教學 HTML 簡報。使用者扮演 AI 醫療審查員，檢查一個宣稱「準確率 95%」的虛構病理模型是否具備上線條件。

## 公開連結

- GitHub Repository：<https://github.com/JohnnyFu987/ai-pathology-forensics-wiki>
- 教學 HTML 簡報：<https://johnnyfu987.github.io/ai-pathology-forensics-wiki/>
- LLM Wiki：<https://johnnyfu987.github.io/ai-pathology-forensics-wiki/wiki.html>
- Loop／Graph：<https://johnnyfu987.github.io/ai-pathology-forensics-wiki/workflow.html>

## 成果入口

- `index.html`：互動式教學簡報
- `wiki.html`：AI 病理鑑識檔案庫
- `workflow.md`：loop／graph 設計
- `execution-log.md`：實際執行與修正紀錄

## LLM Wiki

Wiki 依照 local-first LLM Wiki 的 `raw → wiki → query/lint` 模式建立：

- 7 筆已 ingest 來源
- 7 個交叉連結概念頁
- 10 張證物卡
- 4 次教學查詢
- 1 份 lint 與修正紀錄

LLM 在 ingest 時負責閱讀來源、提取可教學的證物、更新概念頁與建立連結；原始來源卡和修改紀錄均保留在 repository 中，讓成果可以被檢查。

## 本機預覽

```bash
python3 -m http.server 8000
```

開啟 `http://localhost:8000/`。

## 鍵盤操作

- `←` / `→`：上一張／下一張
- `Home` / `End`：第一張／最後一張
- `W`：開啟 Wiki
- `S`：開啟目前投影片的來源證物

## 教學與醫療界線

案件 WSI-095、模型與 95% 數字是虛構教學情境。研究數字只用來解釋特定研究中的驗證與泛化問題，不應直接套用到其他模型或臨床情境。本專案不提供醫療診斷。

