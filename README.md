# study-notes

個人學習講義的靜態網站。沒有建置步驟，也沒有相依套件：每一頁都是可以直接開啟的 HTML。

## 內容

| 講義 | 路徑 | 說明 |
| --- | --- | --- |
| 從零打造 LLM | `llm/` | 13 章 + 畢業專題，含互動實驗，最後一章是實戰：業務客服 AI（RAG）。整頁自成一檔。 |
| 資安攻防入門講義 | `security/` | 7 課 + 12 週練習計畫 + 上線前檢查清單。 |

## 結構

```
index.html          首頁，列出所有講義
assets/site.css     首頁與一般講義頁的共用樣式（含深色模式）
assets/doc.js       一般講義頁的互動：目錄高亮、實作清單勾選
llm/index.html      從零打造 LLM（樣式與程式都內嵌在這一檔）
security/index.html 資安攻防入門講義（使用 assets/ 的共用樣式）
tools/serve.mjs     本機預覽用的小型伺服器
```

## 在本機閱讀

直接用瀏覽器開 `index.html` 即可。

想用本機伺服器的話（網址比較乾淨，行為也和上線後一致）：

```bash
node tools/serve.mjs
```

然後開 <http://localhost:4173/>。這支伺服器只用 Node 內建功能，不用安裝套件。

## 新增一份講義

1. 建一個資料夾，例如 `networking/`，裡面放 `index.html`。
2. 想沿用共用版面，就複製 `security/index.html` 當範本，換掉 `<main class="doc">` 裡的內容和目錄。
3. 在首頁 `index.html` 複製一張 `<a class="card">` 卡片，改連結、標題和說明。

## 注意事項

- 資安講義的「實作清單」勾選狀態存在瀏覽器的 localStorage，只留在那台裝置上，不會同步，也不會進 repo。
- 字體從 Google Fonts 載入。離線時會改用系統字體，內容不受影響。
- `llm/index.html` 的來源是上課用的 `llm-course.html`。課程更新後，要把新版內容再複製過來。
- `.nojekyll` 是給 GitHub Pages 用的，讓它原樣提供檔案。
