const cardGrid = document.querySelector("#wiki-card-grid");
const resultCount = document.querySelector("#result-count");
let activeFilter = "all";
let activeTopic = "all";

function renderWikiCards() {
  const visibleCards = WIKI_CARDS.filter((card) => {
    const kindMatches = activeFilter === "all" || card.kind === activeFilter;
    const topicMatches = activeTopic === "all" || card.topics.includes(activeTopic) || card.topics.includes("all");
    return kindMatches && topicMatches;
  });
  cardGrid.replaceChildren();
  visibleCards.forEach((card) => {
    const article = document.createElement("article");
    article.className = `wiki-card wiki-card-${card.kind}`;
    const top = document.createElement("div");
    top.className = "wiki-card-top";
    const id = document.createElement("span");
    id.textContent = card.id;
    const label = document.createElement("span");
    label.textContent = card.label;
    top.append(id, label);
    const title = document.createElement("h3");
    title.textContent = card.title;
    const summary = document.createElement("p");
    summary.textContent = card.summary;
    const link = document.createElement("a");
    link.href = card.href;
    link.textContent = card.external ? "開啟原始來源 ↗" : "閱讀 Markdown →";
    if (card.external) {
      link.target = "_blank";
      link.rel = "noreferrer";
    }
    const meta = document.createElement("small");
    meta.textContent = card.meta;
    article.append(top, title, summary, meta, link);
    cardGrid.append(article);
  });
  resultCount.textContent = `${visibleCards.length} 筆`;
}

document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    document.querySelectorAll("[data-filter]").forEach((item) => item.classList.remove("is-selected"));
    button.classList.add("is-selected");
    renderWikiCards();
  });
});

document.querySelectorAll("[data-topic]").forEach((button) => {
  button.addEventListener("click", () => {
    activeTopic = button.dataset.topic;
    document.querySelectorAll("[data-topic]").forEach((item) => item.classList.remove("is-selected"));
    button.classList.add("is-selected");
    renderWikiCards();
    document.querySelector(".wiki-content").scrollIntoView({ behavior: "smooth" });
  });
});

renderWikiCards();

