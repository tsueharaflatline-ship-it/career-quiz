import { useState } from "react";

const questions = [
  { id: 1, text: "休みの日、どんなふうに過ごすことが多い？", options: [{ label: "友達と出かけたり、予定を入れてる", type: "L" }, { label: "気になったことを調べたり、本を読んでる", type: "A" }, { label: "何か作ったり、自分の好きなことをしてる", type: "C" }, { label: "家族や友達とのんびり過ごしてる", type: "S" }] },
  { id: 2, text: "仕事で一番大事にしたいのは？", options: [{ label: "誰かの役に立ってると実感できること", type: "S" }, { label: "自分らしさを表現できること", type: "C" }, { label: "正確で、質の高いものを仕上げること", type: "A" }, { label: "目標を達成して、成果を出すこと", type: "L" }] },
  { id: 3, text: "チームで動くとき、自然となるポジションは？", options: [{ label: "情報を整理・分析する人", type: "A" }, { label: "フォローして支える人", type: "S" }, { label: "全体をまとめる人", type: "L" }, { label: "アイデアを出す人", type: "C" }] },
  { id: 4, text: "友達や先輩によく言われることは？", options: [{ label: "リーダー向き・頼りになる", type: "L" }, { label: "詳しい・しっかりしてる", type: "A" }, { label: "センスある・発想が面白い", type: "C" }, { label: "話しやすい・気が利く", type: "S" }] },
  { id: 5, text: "仕事でストレスを感じやすい場面は？", options: [{ label: "人間関係がギスギスしているとき", type: "S" }, { label: "自分が動けず、人任せになるとき", type: "L" }, { label: "根拠なく、感覚だけで進むとき", type: "A" }, { label: "やり方を細かく決められてしまうとき", type: "C" }] },
  { id: 6, text: "理想の働き方に近いのは？", options: [{ label: "専門性が磨ける・スキルが身につく", type: "A" }, { label: "裁量があって、自分でどんどん動ける", type: "C" }, { label: "人との関係が大切にされる職場", type: "S" }, { label: "挑戦的で、成長し続けられる環境", type: "L" }] },
  { id: 7, text: "困難にぶつかったとき、どう動く？", options: [{ label: "とにかく動いて、突破口を探す", type: "L" }, { label: "周りに相談して、一緒に考える", type: "S" }, { label: "情報を集めて、原因から分析する", type: "A" }, { label: "別のやり方を考えて、新しく試す", type: "C" }] },
  { id: 8, text: "5年後、どんな自分になっていたい？", options: [{ label: "「あなたがいてよかった」と言われる自分", type: "S" }, { label: "「あの人の仕事、かっこいい」と言われる自分", type: "C" }, { label: "この分野なら誰にも負けないと言える自分", type: "A" }, { label: "チームや組織を引っ張っている自分", type: "L" }] },
];

const results = {
  C: { type: "クリエイター型", tagline: "つくることで、世界を動かす人", color: "#E8623A", bg: "linear-gradient(135deg, #E8623A 0%, #D4501F 100%)", description: "感性と表現力があなたの最大の武器。ゼロからアイデアを生み出し、カタチにする力があります。「型通り」より「自分らしさ」を大切にできる環境で、最大限に輝くタイプです。", jobs: ["デザイナー", "コピーライター", "動画クリエイター", "ブランドマーケター", "UI・UXデザイナー"], strength: "発想力・表現力・独創性", photo: "/creator.jpg" },
  L: { type: "リーダー型", tagline: "人を動かし、結果で語る人", color: "#4A3FD4", bg: "linear-gradient(135deg, #4A3FD4 0%, #7B52C8 100%)", description: "行動力と推進力があなたの最大の武器。目標に向かって人を巻き込み、結果を出すのが得意です。チャレンジングな環境に飛び込むほど、本来の力が発揮されるタイプです。", jobs: ["営業職", "プロジェクトマネージャー", "コンサルタント", "事業開発", "ベンチャー全般"], strength: "行動力・統率力・突破力", photo: "/leader.jpg" },
  S: { type: "サポーター型", tagline: "誰かの力になることが、力になる人", color: "#1E9E6B", bg: "linear-gradient(135deg, #1E9E6B 0%, #128870 100%)", description: "共感力と気遣いがあなたの最大の武器。人の気持ちに寄り添い、チームをあたたかく支える力があります。「誰かのために」という気持ちが、あなたの一番のエネルギー源です。", jobs: ["HR・人事", "カスタマーサクセス", "教育・研修", "医療・福祉", "接客・ホスピタリティ"], strength: "共感力・傾聴力・チームワーク", photo: "/supporter.jpg" },
  A: { type: "アナリスト型", tagline: "データと論理で、正解を見つける人", color: "#1668C2", bg: "linear-gradient(135deg, #1668C2 0%, #0D4A8A 100%)", description: "論理力と探究心があなたの最大の武器。物事を深く調べ、筋道を立てて考えるのが得意です。「なんとなく」で動くより、根拠のある選択ができる環境で力を発揮するタイプです。", jobs: ["エンジニア", "データアナリスト", "経営企画", "Webマーケター", "コンサルタント"], strength: "分析力・論理力・専門性", photo: "/analyst.jpg" },
};

const typeColors = { C: "#E8623A", L: "#4A3FD4", S: "#1E9E6B", A: "#1668C2" };
const typeLabels = { C: "クリエイター", L: "リーダー", S: "サポーター", A: "アナリスト" };
const optionLetters = ["A", "B", "C", "D"];

export default function CareerQuiz() {
  const [screen, setScreen] = useState("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);
  const [counts, setCounts] = useState(null);
  const [animating, setAnimating] = useState(false);

  const handleStart = () => { setScreen("quiz"); setCurrent(0); setAnswers([]); setSelected(null); };

  const handleNext = () => {
    if (!selected || animating) return;
    const newAnswers = [...answers, selected];
    if (current + 1 >= questions.length) {
      const c = { C: 0, L: 0, S: 0, A: 0 };
      newAnswers.forEach((t) => c[t]++);
      const top = Object.entries(c).sort((a, b) => b[1] - a[1])[0][0];
      setCounts(c);
      setResult(top);
      setScreen("result");
    } else {
      setAnimating(true);
      setTimeout(() => { setAnswers(newAnswers); setCurrent(current + 1); setSelected(null); setAnimating(false); }, 280);
    }
  };

  const handleRetry = () => { setScreen("intro"); setAnswers([]); setSelected(null); setCurrent(0); setResult(null); setCounts(null); };

  const q = questions[current];
  const r = result ? results[result] : null;

  const s = {
    wrapper: { minHeight: "100vh", background: "#F4F3F0", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px", fontFamily: "'Hiragino Kaku Gothic ProN', 'Noto Sans JP', sans-serif" },
    card: { background: "#fff", borderRadius: "20px", boxShadow: "0 2px 24px rgba(0,0,0,0.08)", width: "100%", maxWidth: "460px", overflow: "hidden" },
  };

  const label = (text) => (
    <div style={{ fontSize: "11px", fontWeight: 700, color: "#999", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "10px" }}>{text}</div>
  );

  return (
    <div style={s.wrapper}>

      {/* ── INTRO ── */}
      {screen === "intro" && (
        <div style={s.card}>
          <div style={{ padding: "32px 28px 28px", textAlign: "center" }}>
            <img src="/logo.png" alt="ロゴ" style={{ width: "150px", height: "auto", display: "block", margin: "0 auto 20px" }} />

            <h1 style={{ fontSize: "48px", fontWeight: 900, color: "#1A1A1A", margin: "0 0 20px", letterSpacing: "-1px", lineHeight: 1 }}>
              適職診断
            </h1>
            <p style={{ fontSize: "14px", color: "#777", lineHeight: 1.8, margin: "0 0 24px" }}>
              8つの質問に答えるだけで、あなたのタイプと向いてる職種がわかります。
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "24px", textAlign: "left" }}>
              {Object.entries(typeLabels).map(([key, lbl]) => (
                <div key={key} style={{ background: typeColors[key] + "0D", border: `1px solid ${typeColors[key]}20`, borderRadius: "10px", padding: "11px 13px" }}>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: typeColors[key], marginBottom: "2px" }}>{lbl}型</div>
                  <div style={{ fontSize: "11px", color: "#aaa", lineHeight: 1.4 }}>{results[key].tagline}</div>
                </div>
              ))}
            </div>

            <button onClick={handleStart} style={{ width: "100%", padding: "16px", background: "#1A1A1A", color: "#fff", fontWeight: 700, fontSize: "15px", border: "none", borderRadius: "12px", cursor: "pointer" }}>
              無料で診断する（約2分）
            </button>
            <p style={{ fontSize: "12px", color: "#ccc", margin: "10px 0 0" }}>登録不要ですぐ使えます</p>
          </div>
        </div>
      )}

      {/* ── QUIZ ── */}
      {screen === "quiz" && (
        <div style={s.card}>
          <div style={{ padding: "24px 28px 0" }}>
            <div style={{ display: "flex", gap: "4px", marginBottom: "20px" }}>
              {questions.map((_, i) => (
                <div key={i} style={{
                  flex: 1, height: "3px", borderRadius: "100px",
                  background: i < current ? "#1A1A1A" : i === current ? "#1A1A1A" : "#E8E8E8",
                  opacity: i === current ? 1 : i < current ? 0.35 : 1,
                  transition: "all 0.3s ease",
                }} />
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span style={{ fontSize: "11px", fontWeight: 700, color: "#999", letterSpacing: "1px" }}>Q{current + 1} / {questions.length}</span>
              <span style={{ fontSize: "11px", color: "#ccc" }}>{Math.round((current / questions.length) * 100)}%</span>
            </div>
          </div>

          <div style={{ padding: "20px 28px 28px", opacity: animating ? 0 : 1, transform: animating ? "translateY(6px)" : "translateY(0)", transition: "opacity 0.25s ease, transform 0.25s ease" }}>
            <h2 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: "20px", fontWeight: 700, color: "#1A1A1A", margin: "0 0 22px", lineHeight: 1.55 }}>
              {q.text}
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px" }}>
              {q.options.map((opt, i) => (
                <button key={i} onClick={() => setSelected(opt.type)} style={{
                  padding: "14px 16px",
                  border: selected === opt.type ? "1.5px solid #1A1A1A" : "1.5px solid #EBEBEB",
                  borderRadius: "10px",
                  background: selected === opt.type ? "#F5F5F3" : "#fff",
                  textAlign: "left", fontSize: "14px", color: "#1A1A1A",
                  cursor: "pointer", display: "flex", alignItems: "center", gap: "12px",
                  transition: "border-color 0.12s ease, background 0.12s ease",
                }}>
                  <span style={{
                    width: "24px", height: "24px", borderRadius: "6px", flexShrink: 0,
                    background: selected === opt.type ? "#1A1A1A" : "#F0F0EE",
                    color: selected === opt.type ? "#fff" : "#aaa",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "10px", fontWeight: 800,
                    transition: "background 0.12s ease, color 0.12s ease",
                  }}>
                    {optionLetters[i]}
                  </span>
                  <span style={{ fontWeight: selected === opt.type ? 600 : 400, lineHeight: 1.5, color: selected === opt.type ? "#1A1A1A" : "#444" }}>
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>

            <button onClick={handleNext} disabled={!selected} style={{
              width: "100%", padding: "15px",
              background: selected ? "#1A1A1A" : "#F0F0EE",
              color: selected ? "#fff" : "#ccc",
              fontWeight: 700, fontSize: "14px", border: "none", borderRadius: "10px",
              cursor: selected ? "pointer" : "default",
              transition: "background 0.15s ease, color 0.15s ease",
              letterSpacing: "0.5px",
            }}>
              {current + 1 === questions.length ? "結果を見る" : "次へ"}
            </button>
          </div>
        </div>
      )}

      {/* ── RESULT ── */}
      {screen === "result" && r && (
        <div style={s.card}>
          <div style={{ position: "relative" }}>
            <img src={r.photo} alt={r.type} style={{ width: "100%", height: "260px", objectFit: "cover", display: "block" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0.28) 100%)" }} />
            <div style={{ position: "absolute", bottom: "24px", left: "24px" }}>
              <div style={{ fontSize: "10px", fontWeight: 700, color: "rgba(255,255,255,0.6)", letterSpacing: "2px", marginBottom: "8px" }}>YOUR TYPE</div>
              <h2 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: "26px", fontWeight: 900, color: "#fff", margin: "0 0 6px", textShadow: "0 2px 16px rgba(0,0,0,0.6)", letterSpacing: "0.5px" }}>{r.type}</h2>
              <p style={{ fontFamily: "'Noto Serif JP', serif", fontSize: "13px", color: "rgba(255,255,255,0.82)", margin: 0, textShadow: "0 1px 6px rgba(0,0,0,0.4)" }}>「{r.tagline}」</p>
            </div>
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "40px", background: "linear-gradient(to bottom, transparent, #fff)" }} />
          </div>

          <div style={{ padding: "24px 28px" }}>
            <p style={{ fontSize: "14px", color: "#555", lineHeight: 1.9, marginBottom: "28px" }}>{r.description}</p>

            {counts && (
              <div style={{ marginBottom: "28px" }}>
                {label("診断スコア")}
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {Object.entries(counts).sort((a, b) => b[1] - a[1]).map(([key, count]) => (
                    <div key={key}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                        <span style={{ fontSize: "12px", fontWeight: key === result ? 700 : 500, color: key === result ? typeColors[key] : "#bbb" }}>
                          {typeLabels[key]}型
                        </span>
                        <span style={{ fontSize: "12px", fontWeight: 600, color: key === result ? typeColors[key] : "#ccc" }}>{count} / {questions.length}</span>
                      </div>
                      <div style={{ background: "#F0F0EE", borderRadius: "100px", height: "4px" }}>
                        <div style={{
                          background: typeColors[key],
                          height: "4px", borderRadius: "100px",
                          width: `${(count / questions.length) * 100}%`,
                          opacity: key === result ? 1 : 0.3,
                        }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{ marginBottom: "24px" }}>
              {label("強み")}
              <div style={{ display: "inline-block", background: r.color + "10", color: r.color, border: `1px solid ${r.color}22`, borderRadius: "6px", padding: "7px 14px", fontWeight: 700, fontSize: "13px" }}>
                {r.strength}
              </div>
            </div>

            <div style={{ marginBottom: "32px" }}>
              {label("向いている職種")}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
                {r.jobs.map((job, i) => (
                  <span key={i} style={{ background: "#F5F5F3", color: "#444", borderRadius: "6px", padding: "6px 12px", fontSize: "13px", fontWeight: 500 }}>{job}</span>
                ))}
              </div>
            </div>

            <div style={{ borderTop: "1px solid #F0F0EE", paddingTop: "24px", marginBottom: "12px" }}>
              <p style={{ fontSize: "15px", fontWeight: 700, color: "#1A1A1A", margin: "0 0 4px" }}>あなたに合った仕事、一緒に探しませんか？</p>
              <p style={{ fontSize: "13px", color: "#999", margin: "0 0 16px" }}>キャリアの悩み、気軽に話してみませんか。</p>
              <button style={{ width: "100%", padding: "15px", background: r.bg, color: "#fff", fontWeight: 700, fontSize: "14px", border: "none", borderRadius: "10px", cursor: "pointer", letterSpacing: "0.5px" }}>
                無料で相談してみる
              </button>
            </div>

            <button onClick={handleRetry} style={{ width: "100%", padding: "13px", background: "transparent", color: "#ccc", fontWeight: 500, fontSize: "13px", border: "1.5px solid #EBEBEB", borderRadius: "10px", cursor: "pointer" }}>
              もう一度診断する
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
