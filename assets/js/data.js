const SOURCE_DATA = [
  {
    id: "S01",
    title: "OpenSlide: A vendor-neutral software foundation for digital pathology",
    author: "Goode et al.",
    year: "2013",
    type: "研究論文",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3815078/",
    note: "說明全視野切片的多倍率、超大型影像與存取基礎。",
    topics: ["wsi", "tiling"]
  },
  {
    id: "S02",
    title: "Diagnostic Assessment of Deep Learning Algorithms for Detection of Lymph Node Metastases",
    author: "CAMELYON16 Consortium",
    year: "2017",
    type: "研究論文",
    url: "https://jamanetwork.com/journals/jama/fullarticle/2665774",
    note: "提供獨立挑戰測試集、病灶定位與整張切片分類的案例。",
    topics: ["metrics", "split"]
  },
  {
    id: "S03",
    title: "Clinical-grade computational pathology using weakly supervised deep learning",
    author: "Campanella et al.",
    year: "2019",
    type: "研究論文",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7418463/",
    note: "大規模弱監督、病人層級切分與跨資料來源泛化研究。",
    topics: ["tiling", "split", "metrics", "bias"]
  },
  {
    id: "S04",
    title: "The impact of site-specific digital histology signatures on model accuracy and bias",
    author: "Howard et al.",
    year: "2021",
    type: "研究論文",
    url: "https://www.nature.com/articles/s41467-021-24698-1",
    note: "說明站點特徵如何造成過度樂觀的表現與公平性風險。",
    topics: ["bias", "ethics"]
  },
  {
    id: "S05",
    title: "Impact of Deep Learning Assistance on Histopathologic Review",
    author: "Steiner et al.",
    year: "2018",
    type: "研究論文",
    url: "https://pubmed.ncbi.nlm.nih.gov/30312179/",
    note: "AI 協助病理醫師審閱淋巴結切片的概念驗證。",
    topics: ["human", "metrics"]
  },
  {
    id: "S06",
    title: "Good Machine Learning Practice for Medical Device Development",
    author: "FDA / IMDRF",
    year: "2025",
    type: "官方指引",
    url: "https://www.fda.gov/medical-devices/artificial-intelligence-enabled-medical-devices/good-machine-learning-practice-medical-device-development-guiding-principles",
    note: "產品生命週期、資料代表性與訓練／測試獨立原則。",
    topics: ["split", "human", "ethics"]
  },
  {
    id: "S07",
    title: "Ethics and governance of artificial intelligence for health",
    author: "World Health Organization",
    year: "2021",
    type: "國際指引",
    url: "https://www.who.int/publications/i/item/9789240029200",
    note: "健康 AI 的倫理、人權、透明、問責、包容與安全治理。",
    topics: ["human", "ethics"]
  }
];

const SLIDE_SOURCES = {
  1: [],
  2: ["S01"],
  3: ["S01", "S03"],
  4: ["S03", "S06"],
  5: ["S02", "S03"],
  6: ["S04"],
  7: ["S03"],
  8: ["S05", "S06", "S07"],
  9: ["S03", "S04", "S06", "S07"],
  10: ["S06", "S07"]
};

const WIKI_CARDS = [
  ...SOURCE_DATA.map((source) => ({
    id: source.id,
    kind: "source",
    label: source.type,
    title: source.title,
    summary: source.note,
    meta: `${source.author} · ${source.year}`,
    topics: source.topics,
    href: source.url,
    external: true
  })),
  {
    id: "C01", kind: "concept", label: "Concept", title: "全視野切片",
    summary: "可縮放、超大型的數位玻片影像；能存取不等於能理解。", meta: "E01 · S01", topics: ["wsi"], href: "wiki/pages/whole-slide-image.md"
  },
  {
    id: "C02", kind: "concept", label: "Concept", title: "切片分塊與弱監督",
    summary: "把 WSI 切成 patch，使用整張切片標籤學習，但取樣方式仍會影響證據。", meta: "E02–E03 · S01/S03", topics: ["tiling"], href: "wiki/pages/tiling-and-weak-supervision.md"
  },
  {
    id: "C03", kind: "concept", label: "Concept", title: "資料切分與洩漏",
    summary: "相關影像必須在病人層級分組，測試集才是真正沒看過的考卷。", meta: "E04–E05 · S03/S06", topics: ["split"], href: "wiki/pages/data-splitting-and-leakage.md"
  },
  {
    id: "C04", kind: "concept", label: "Concept", title: "指標與臨床用途",
    summary: "Accuracy、Sensitivity、Specificity 與 AUC 回答不同問題。", meta: "E06–E07 · S02/S03", topics: ["metrics"], href: "wiki/pages/metrics-and-clinical-use.md"
  },
  {
    id: "C05", kind: "concept", label: "Concept", title: "跨院泛化與站點偏差",
    summary: "模型可能學到醫院指紋；外部驗證要使用真正不同的資料來源。", meta: "E08–E09 · S03/S04", topics: ["bias"], href: "wiki/pages/generalization-and-site-bias.md"
  },
  {
    id: "C06", kind: "concept", label: "Concept", title: "人機協作",
    summary: "AI 可協助標示、排序或第二讀；協作效果仍需在實際工作流程驗證。", meta: "E10 · S05", topics: ["human"], href: "wiki/pages/human-ai-collaboration.md"
  },
  {
    id: "C07", kind: "concept", label: "Concept", title: "倫理與部署",
    summary: "上線需要安全、透明、責任、代表性與生命週期監測。", meta: "S06/S07", topics: ["ethics"], href: "wiki/pages/ethical-deployment.md"
  },
  {
    id: "R01", kind: "record", label: "Ingest Log", title: "7 次來源 Ingest",
    summary: "每次 ingest 都更新既有概念頁與交叉連結，而非只追加摘要。", meta: "ING-001 → ING-007", topics: ["all"], href: "wiki/ingest-log.md"
  },
  {
    id: "R02", kind: "record", label: "Query Log", title: "4 次 Wiki Query",
    summary: "從核心問題、WSI 特性、外部驗證到最終裁決的查詢紀錄。", meta: "Q01 → Q04", topics: ["all"], href: "wiki/query-log.md"
  },
  {
    id: "R03", kind: "record", label: "Lint Report", title: "3 個問題，全部修正",
    summary: "修正 AUC／準確率混淆、過度概括與孤立概念頁。", meta: "0 open issues", topics: ["all"], href: "wiki/lint-report.md"
  }
];

