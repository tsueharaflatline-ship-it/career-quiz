import { useState } from "react";

const questions = [
  { id: 1, text: "休日、気づいたら何をしてることが多い？", emoji: "☀️", options: [{ label: "何か作ったり、デザインしたりしてる", type: "C" }, { label: "友達を誘って、何か企画してる", type: "L" }, { label: "誰かの話を聞いたり、一緒にいる", type: "S" }, { label: "気になったことをひたすら調べてる", type: "A" }] },
  { id: 2, text: "仕事で一番大事にしたいのは？", emoji: "💼", options: [{ label: "自分らしさを表現できること", type: "C" }, { label: "目標を達成して、成果を出すこと", type: "L" }, { label: "誰かの役に立ってると実感できること", type: "S" }, { label: "正確で、質の高いものを仕上げること", type: "A" }] },
  { id: 3, text: "チームで動くとき、自然となるポジションは？", emoji: "🤝", options: [{ label: "アイデアを出す人", type: "C" }, { label: "全体をまとめる人", type: "L" }, { label: "フォローして支える人", type: "S" }, { label: "情報を整理・分析する人", type: "A" }] },
  { id: 4, text: "友達や先輩によく言われることは？", emoji: "💬", options: [{ label: "センスある・発想が面白い", type: "C" }, { label: "リーダー向き・頼りになる", type: "L" }, { label: "話しやすい・気が利く", type: "S" }, { label: "詳しい・しっかりしてる", type: "A" }] },
  { id: 5, text: "仕事でストレスを感じやすい場面は？", emoji: "😓", options: [{ label: "やり方を細かく決められてしまうとき", type: "C" }, { label: "自分が動けず、人任せになるとき", type: "L" }, { label: "人間関係がギスギスしているとき", type: "S" }, { label: "根拠なく、感覚だけで進むとき", type: "A" }] },
  { id: 6, text: "理想の働き方に近いのは？", emoji: "🏢", options: [{ label: "裁量があって、自分でどんどん動ける", type: "C" }, { label: "挑戦的で、成長し続けられる環境", type: "L" }, { label: "人との関係が大切にされる職場", type: "S" }, { label: "専門性が磨ける・スキルが身につく", type: "A" }] },
  { id: 7, text: "困難にぶつかったとき、どう動く？", emoji: "🧩", options: [{ label: "別のやり方を考えて、新しく試す", type: "C" }, { label: "とにかく動いて、突破口を探す", type: "L" }, { label: "周りに相談して、一緒に考える", type: "S" }, { label: "情報を集めて、原因から分析する", type: "A" }] },
  { id: 8, text: "5年後、どんな自分になっていたい？", emoji: "🌟", options: [{ label: "「あの人の仕事、かっこいい」と言われる自分", type: "C" }, { label: "チームや組織を引っ張っている自分", type: "L" }, { label: "「あなたがいてよかった」と言われる自分", type: "S" }, { label: "この分野なら誰にも負けないと言える自分", type: "A" }] },
];

const results = {
  C: { type: "クリエイター型", emoji: "🎨", tagline: "つくることで、世界を動かす人", color: "#FF6B35", bg: "linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)", description: "感性と表現力があなたの最大の武器。ゼロからアイデアを生み出し、カタチにする力があります。「型通り」より「自分らしさ」を大切にできる環境で、最大限に輝くタイプです。", jobs: ["デザイナー", "コピーライター", "動画クリエイター", "ブランドマーケター", "UI・UXデザイナー"], strength: "発想力・表現力・独創性" },
  L: { type: "リーダー型", emoji: "🚀", tagline: "人を動かし、結果で語る人", color: "#5B4CFF", bg: "linear-gradient(135deg, #5B4CFF 0%, #9B59B6 100%)", description: "行動力と推進力があなたの最大の武器。目標に向かって人を巻き込み、結果を出すのが得意です。チャレンジングな環境に飛び込むほど、本来の力が発揮されるタイプです。", jobs: ["営業職", "プロジェクトマネージャー", "コンサルタント", "事業開発", "ベンチャー全般"], strength: "行動力・統率力・突破力" },
  S: { type: "サポーター型", emoji: "🌸", tagline: "誰かの力になることが、力になる人", color: "#26C485", bg: "linear-gradient(135deg, #26C485 0%, #15A0A0 100%)", description: "共感力と気遣いがあなたの最大の武器。人の気持ちに寄り添い、チームをあたたかく支える力があります。「誰かのために」という気持ちが、あなたの一番のエネルギー源です。", jobs: ["HR・人事", "カスタマーサクセス", "教育・研修", "医療・福祉", "接客・ホスピタリティ"], strength: "共感力・傾聴力・チームワーク" },
  A: { type: "アナリスト型", emoji: "🔍", tagline: "データと論理で、正解を見つける人", color: "#1A7FDB", bg: "linear-gradient(135deg, #1A7FDB 0%, #0D4F8B 100%)", description: "論理力と探究心があなたの最大の武器。物事を深く調べ、筋道を立てて考えるのが得意です。「なんとなく」で動くより、根拠のある選択ができる環境で力を発揮するタイプです。", jobs: ["エンジニア", "データアナリスト", "経営企画", "Webマーケター", "コンサルタント"], strength: "分析力・論理力・専門性" },
};

export default function CareerQuiz() {
  const [screen, setScreen] = useState("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);
  const [animating, setAnimating] = useState(false);

  const handleStart = () => { setScreen("quiz"); setCurrent(0); setAnswers([]); setSelected(null); };

  const handleNext = () => {
    if (!selected || animating) return;
    const newAnswers = [...answers, selected];
    if (current + 1 >= questions.length) {
      const counts = { C: 0, L: 0, S: 0, A: 0 };
      newAnswers.forEach((t) => counts[t]++);
      const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
      setResult(top); setScreen("result");
    } else {
      setAnimating(true);
      setTimeout(() => { setAnswers(newAnswers); setCurrent(current + 1); setSelected(null); setAnimating(false); }, 250);
    }
  };

  const handleRetry = () => { setScreen("intro"); setAnswers([]); setSelected(null); setCurrent(0); setResult(null); };

  const q = questions[current];
  const r = result ? results[result] : null;

  const s = {
    wrapper: { minHeight: "100vh", background: "linear-gradient(160deg, #FFF8F3 0%, #FFF0E8 50%, #F5F0FF 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px", fontFamily: "'Hiragino Kaku Gothic ProN', 'Noto Sans JP', sans-serif" },
    card: { background: "#fff", borderRadius: "24px", boxShadow: "0 8px 48px rgba(0,0,0,0.10)", width: "100%", maxWidth: "480px", overflow: "hidden" },
  };

  return (
    <div style={s.wrapper}>
      {screen === "intro" && (
        <div style={s.card}>
          <div style={{ padding: "28px 24px", textAlign: "center" }}>
            <img src="/logo.png" alt="ロゴ" style={{ width: "180px", height: "auto", display: "block", margin: "0 auto 8px" }} />
            <div style={{ display: "inline-block", background: "#FFF0E0", color: "#FF6B35", fontWeight: 700, fontSize: "13px", borderRadius: "100px", padding: "6px 16px", marginBottom: "8px" }}>✨ 20代のための</div>
            <h1 style={{ fontSize: "48px", fontWeight: 900, lineHeight: 1.1, color: "#1A1A2E", margin: "0 0 8px", letterSpacing: "-1px" }}>適職タイプ<br /><span style={{ color: "#FF6B35" }}>診断</span></h1>
            <p style={{ fontSize: "16px", color: "#555", lineHeight: 1.7, margin: "0 0 16px" }}>8つの質問に答えるだけで、<br />あなたに合った仕事のスタイルがわかる。</p>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", marginBottom: "20px", fontSize: "14px", color: "#888" }}>
              <span>⏱ 約2分</span><span style={{ color: "#ddd" }}>|</span><span>📝 全8問</span><span style={{ color: "#ddd" }}>|</span><span>🎯 4タイプ</span>
            </div>
            <button onClick={handleStart} style={{ width: "100%", padding: "18px", background: "linear-gradient(135deg, #FF6B35, #F7931E)", color: "#fff", fontWeight: 800, fontSize: "17px", border: "none", borderRadius: "14px", cursor: "pointer", marginBottom: "12px" }}>診断スタート →</button>
            <p style={{ fontSize: "12px", color: "#aaa", margin: 0 }}>登録不要・無料で診断できます</p>
          </div>
        </div>
      )}

      {screen === "quiz" && (
        <div style={s.card}>
          <div style={{ padding: "24px 28px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ fontSize: "13px", fontWeight: 700, color: "#FF6B35" }}>Q{current + 1} / {questions.length}</span>
              <span style={{ fontSize: "13px", color: "#bbb" }}>{Math.round(((current + 1) / questions.length) * 100)}%</span>
            </div>
            <div style={{ background: "#F0F0F0", borderRadius: "100px", height: "6px" }}>
              <div style={{ background: "linear-gradient(90deg, #FF6B35, #F7931E)", height: "6px", borderRadius: "100px", width: `${((current + 1) / questions.length) * 100}%`, transition: "width 0.4s" }} />
            </div>
          </div>
          <div style={{ padding: "24px 28px 32px" }}>
            <div style={{ fontSize: "40px", textAlign: "center", marginBottom: "12px" }}>{q.emoji}</div>
            <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#1A1A2E", textAlign: "center", margin: "0 0 24px", lineHeight: 1.4 }}>{q.text}</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
              {q.options.map((opt, i) => (
                <button key={i} onClick={() => setSelected(opt.type)} style={{ padding: "16px 20px", border: selected === opt.type ? "2px solid #FF6B35" : "2px solid #F0F0F0", borderRadius: "12px", background: selected === opt.type ? "#FFF5F1" : "#fff", textAlign: "left", fontSize: "15px", color: "#1A1A2E", cursor: "pointer", fontWeight: selected === opt.type ? 700 : 400, display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ width: "22px", height: "22px", borderRadius: "50%", background: selected === opt.type ? "#FF6B35" : "#F0F0F0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", color: "#fff", flexShrink: 0 }}>{selected === opt.type ? "✓" : ""}</span>
                  {opt.label}
                </button>
              ))}
            </div>
            <button onClick={handleNext} disabled={!selected} style={{ width: "100%", padding: "16px", background: selected ? "linear-gradient(135deg, #FF6B35, #F7931E)" : "#F0F0F0", color: selected ? "#fff" : "#bbb", fontWeight: 800, fontSize: "16px", border: "none", borderRadius: "12px", cursor: selected ? "pointer" : "default" }}>
              {current + 1 === questions.length ? "結果を見る 🎉" : "次の質問 →"}
            </button>
          </div>
        </div>
      )}

      {screen === "result" && r && (
        <div style={s.card}>
          <div style={{ background: r.bg, padding: "40px 28px 32px", textAlign: "center" }}>
            <div style={{ fontSize: "56px", marginBottom: "12px" }}>{r.emoji}</div>
            <div style={{ display: "inline-block", background: "rgba(255,255,255,0.25)", color: "#fff", fontSize: "12px", fontWeight: 700, borderRadius: "100px", padding: "4px 14px", marginBottom: "12px" }}>あなたのタイプ</div>
            <h2 style={{ fontSize: "28px", fontWeight: 900, color: "#fff", margin: "0 0 8px" }}>{r.type}</h2>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.85)", margin: 0 }}>「{r.tagline}」</p>
          </div>
          <div style={{ padding: "28px" }}>
            <p style={{ fontSize: "15px", color: "#444", lineHeight: 1.8, marginBottom: "24px" }}>{r.description}</p>
            <div style={{ marginBottom: "20px" }}>
              <div style={{ fontSize: "13px", fontWeight: 700, color: "#aaa", marginBottom: "8px" }}>💪 あなたの強み</div>
              <div style={{ display: "inline-block", background: r.color + "18", color: r.color, border: `1px solid ${r.color}30`, borderRadius: "8px", padding: "8px 16px", fontWeight: 700, fontSize: "14px" }}>{r.strength}</div>
            </div>
            <div style={{ marginBottom: "28px" }}>
              <div style={{ fontSize: "13px", fontWeight: 700, color: "#aaa", marginBottom: "8px" }}>🎯 向いている職種</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {r.jobs.map((job, i) => <span key={i} style={{ background: "#F5F5F5", color: "#444", borderRadius: "100px", padding: "6px 14px", fontSize: "13px", fontWeight: 600 }}>{job}</span>)}
              </div>
            </div>
            <div style={{ background: "linear-gradient(135deg, #FFF5F1, #FFF0FF)", borderRadius: "16px", padding: "24px", textAlign: "center", marginBottom: "16px" }}>
              <p style={{ fontSize: "16px", fontWeight: 800, color: "#1A1A2E", margin: "0 0 16px" }}>あなたに合った仕事、<br />一緒に探してみませんか？</p>
              <button style={{ width: "100%", padding: "16px", background: r.bg, color: "#fff", fontWeight: 800, fontSize: "16px", border: "none", borderRadius: "12px", cursor: "pointer", marginBottom: "8px" }}>無料で相談してみる →</button>
              <p style={{ fontSize: "11px", color: "#aaa", margin: 0 }}>完全無料・強引な勧誘は一切しません</p>
            </div>
            <button onClick={handleRetry} style={{ width: "100%", padding: "14px", background: "transparent", color: "#aaa", fontWeight: 600, fontSize: "14px", border: "2px solid #F0F0F0", borderRadius: "12px", cursor: "pointer" }}>もう一度診断する</button>
          </div>
        </div>
      )}
    </div>
  );
}
