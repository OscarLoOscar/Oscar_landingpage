const QUESTIONS = [
  ["完全唔識寫程式，可以參加？", "AI 素養、研究同辦公應用課程可以由基本電腦操作開始。Vibe Coding 會涉及專案、debug 同測試；查詢時講低你嘅程度，再確認適合嘅起點。"],
  ["Codex、Gemini、Copilot，同 Vibe Coding 點揀？", "先由任務揀課：想處理研究或文件，可以了解實用 AI 班；想建立或修改軟件，可以了解 Vibe Coding。工具、帳戶同練習會按你嘅使用情況確認。"],
  ["企業或學校可以客製內容？", "可以按對象、程度同工作／學習場景調整解說及練習。先提供人數、目標、可用工具同時間；物流文件培訓亦有現成嘅 36 小時主線可參考。"],
  ["需要準備咩設備？費用點計？", "查詢時會先確認電腦、網絡、帳戶權限同可用軟件；費用、時數及安排按實際課程範圍確認。需要付費帳戶嘅練習，會先說明。"],
  ["學完可以直接交畀 AI 全自動做？", "課程會練習拆解任務、查證來源、測試同人工覆核。涉及公司資料、正式系統或對外內容，仍要按權限同驗收要求處理。"],
];

export default function Faq() {
  return <section className="faq section-pad" id="faq" aria-labelledby="faq-heading"><div className="section-shell faq__layout"><div><p className="label">Before we start</p><h2 className="section-title" id="faq-heading">你可能想問。</h2></div><div>{QUESTIONS.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></div></section>;
}
