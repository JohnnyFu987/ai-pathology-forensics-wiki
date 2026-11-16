const slides = [...document.querySelectorAll(".slide")];
const prevButton = document.querySelector("#prev-button");
const nextButton = document.querySelector("#next-button");
const slideCounter = document.querySelector("#slide-counter");
const evidenceCounter = document.querySelector("#evidence-counter");
const progressBar = document.querySelector("#progress-bar");
const sourceButton = document.querySelector("#source-button");
const sourceDialog = document.querySelector("#source-dialog");
const sourceList = document.querySelector("#source-list");
let activeIndex = Math.max(0, Math.min(slides.length - 1, Number(location.hash.replace("#slide-", "")) - 1 || 0));

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
}

function showSlide(index) {
  activeIndex = Math.max(0, Math.min(slides.length - 1, index));
  slides.forEach((slide, slideIndex) => {
    const active = slideIndex === activeIndex;
    slide.classList.toggle("is-active", active);
    slide.setAttribute("aria-hidden", String(!active));
  });
  const number = activeIndex + 1;
  slideCounter.textContent = `${String(number).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
  evidenceCounter.textContent = `${Math.min(7, Math.max(0, number - 1))} / 7 證物`;
  progressBar.style.width = `${(number / slides.length) * 100}%`;
  prevButton.disabled = activeIndex === 0;
  nextButton.disabled = activeIndex === slides.length - 1;
  sourceButton.disabled = (SLIDE_SOURCES[number] || []).length === 0;
  history.replaceState(null, "", `#slide-${number}`);
  document.title = `${String(number).padStart(2, "0")}｜案件 WSI-095｜AI 病理鑑識局`;
}

function goNext() {
  showSlide(activeIndex + 1);
}

function goPrevious() {
  showSlide(activeIndex - 1);
}

function openSources() {
  const ids = SLIDE_SOURCES[activeIndex + 1] || [];
  sourceList.replaceChildren();
  ids.map((id) => SOURCE_DATA.find((source) => source.id === id)).filter(Boolean).forEach((source) => {
    const card = createElement("article", "source-item");
    const meta = createElement("p", "source-meta", `${source.id} · ${source.type} · ${source.year}`);
    const title = createElement("h3", "", source.title);
    const note = createElement("p", "", source.note);
    const link = createElement("a", "", "開啟原始來源 ↗");
    link.href = source.url;
    link.target = "_blank";
    link.rel = "noreferrer";
    card.append(meta, title, note, link);
    sourceList.append(card);
  });
  if (ids.length === 0) sourceList.append(createElement("p", "", "本頁為虛構案件情境，沒有研究數字。"));
  sourceDialog.showModal();
}

prevButton.addEventListener("click", goPrevious);
nextButton.addEventListener("click", goNext);
document.querySelectorAll("[data-next]").forEach((button) => button.addEventListener("click", goNext));
sourceButton.addEventListener("click", openSources);
document.querySelector("#close-source-dialog").addEventListener("click", () => sourceDialog.close());
sourceDialog.addEventListener("click", (event) => {
  if (event.target === sourceDialog) sourceDialog.close();
});

document.addEventListener("keydown", (event) => {
  if (["INPUT", "BUTTON"].includes(document.activeElement?.tagName) || sourceDialog.open) return;
  if (event.key === "ArrowRight" || event.key === "PageDown") goNext();
  if (event.key === "ArrowLeft" || event.key === "PageUp") goPrevious();
  if (event.key === "Home") showSlide(0);
  if (event.key === "End") showSlide(slides.length - 1);
  if (event.key.toLowerCase() === "s" && !sourceButton.disabled) openSources();
  if (event.key.toLowerCase() === "w") location.href = "wiki.html";
});

document.querySelector("#fullscreen-button").addEventListener("click", async () => {
  if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
    await document.documentElement.requestFullscreen();
  } else if (document.exitFullscreen) {
    await document.exitFullscreen();
  }
});

const zoomRange = document.querySelector("#zoom-range");
const zoomOutput = document.querySelector("#zoom-output");
const wsiMap = document.querySelector("#wsi-map");
const zoomLabels = ["", "5× 全景", "10× 區域", "20× 組織", "40× 細胞"];
zoomRange.addEventListener("input", () => {
  const level = Number(zoomRange.value);
  wsiMap.style.setProperty("--zoom", String(1 + (level - 1) * 0.35));
  zoomOutput.value = zoomLabels[level];
});

const tileGrid = document.querySelector("#tile-grid");
const tileStatus = document.querySelector("#tile-status");
const targetTiles = new Set([5, 10, 14]);
const foundTiles = new Set();
for (let index = 1; index <= 16; index += 1) {
  const button = createElement("button", "tile", String(index).padStart(2, "0"));
  button.type = "button";
  button.setAttribute("aria-label", `檢查第 ${index} 個區塊`);
  if (targetTiles.has(index)) button.dataset.target = "true";
  button.addEventListener("click", () => {
    button.classList.add(targetTiles.has(index) ? "is-found" : "is-checked");
    if (targetTiles.has(index)) foundTiles.add(index);
    tileStatus.textContent = foundTiles.size === 3 ? "三個可疑區域都找到了：局部證據不代表整張切片。" : `已找到 ${foundTiles.size} / 3 個可疑區域`;
  });
  tileGrid.append(button);
}

document.querySelector("#audit-split").addEventListener("click", (event) => {
  document.querySelector("#split-board").classList.add("is-audited");
  document.querySelector("#split-status").textContent = "發現洩漏：病人 P014 同時出現在 Training 與 Test。";
  document.querySelector("#split-status").classList.add("is-alert");
  event.currentTarget.textContent = "已完成病人層級稽核";
  event.currentTarget.disabled = true;
});

const fnRange = document.querySelector("#fn-range");
const fpRange = document.querySelector("#fp-range");
function updateMetrics() {
  const fn = Number(fnRange.value);
  const fp = Number(fpRange.value);
  const tp = 20 - fn;
  const tn = 80 - fp;
  document.querySelector("#tp-value").textContent = String(tp);
  document.querySelector("#fn-value").textContent = String(fn);
  document.querySelector("#fp-value").textContent = String(fp);
  document.querySelector("#tn-value").textContent = String(tn);
  document.querySelector("#accuracy-value").textContent = `${Math.round(tp + tn)}%`;
  document.querySelector("#sensitivity-value").textContent = `${Math.round((tp / 20) * 100)}%`;
  document.querySelector("#specificity-value").textContent = `${Math.round((tn / 80) * 100)}%`;
}
fnRange.addEventListener("input", updateMetrics);
fpRange.addEventListener("input", updateMetrics);

const siteCaptions = {
  a: "醫院 A：偏粉紫、對比中等（抽象示意）",
  b: "醫院 B：偏藍紫、細胞邊界較深（抽象示意）",
  c: "醫院 C：偏暖紅、背景亮度不同（抽象示意）"
};
document.querySelectorAll("[data-site]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-site]").forEach((item) => item.classList.remove("is-selected"));
    button.classList.add("is-selected");
    const site = button.dataset.site;
    document.querySelector("#site-slide").className = `site-slide site-${site}`;
    document.querySelector("#site-caption").textContent = siteCaptions[site];
  });
});

const verdictMessages = {
  approve: "證據不足：一個未定義的 95% 無法支持直接上線。",
  supplement: "合理裁決：要求補上切分方式、錯誤分布、外部驗證、用途與監測計畫。",
  reject: "目前資料不足，但不代表模型永遠無法改善；先要求補件比永久退件合理。"
};
document.querySelectorAll("[data-verdict]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-verdict]").forEach((item) => item.classList.remove("is-selected", "is-correct"));
    button.classList.add("is-selected");
    if (button.dataset.verdict === "supplement") button.classList.add("is-correct");
    document.querySelector("#verdict-result").textContent = verdictMessages[button.dataset.verdict];
  });
});

showSlide(activeIndex);
updateMetrics();

