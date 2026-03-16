import { useState } from "react";
import "./App.css";

// ============================================================
// Data
// ============================================================
const questions = [
  { id: 1, text: "休みの日の過ごし方は？", options: [{ label: "友達と出かけたり、予定を入れてる", type: "L" }, { label: "気になったことを調べたり、本を読んでる", type: "A" }, { label: "何か作ったり、自分の好きなことをしてる", type: "C" }, { label: "家族や友達とのんびり過ごしてる", type: "S" }] },
  { id: 2, text: "仕事で一番大事にしたいのは？", options: [{ label: "誰かの役に立ってると実感できること", type: "S" }, { label: "自分らしさを表現できること", type: "C" }, { label: "正確で、質の高いものを仕上げること", type: "A" }, { label: "目標を達成して、成果を出すこと", type: "L" }] },
  { id: 3, text: "チームだとどんな役割になることが多い？", options: [{ label: "情報を整理・分析する人", type: "A" }, { label: "フォローして支える人", type: "S" }, { label: "全体をまとめる人", type: "L" }, { label: "アイデアを出す人", type: "C" }] },
  { id: 4, text: "友達や先輩によく言われることは？", options: [{ label: "リーダー向き・頼りになる", type: "L" }, { label: "詳しい・しっかりしてる", type: "A" }, { label: "センスある・発想が面白い", type: "C" }, { label: "話しやすい・気が利く", type: "S" }] },
  { id: 5, text: "仕事でストレスを感じやすい場面は？", options: [{ label: "人間関係がギスギスしているとき", type: "S" }, { label: "自分が動けず、人任せになるとき", type: "L" }, { label: "根拠なく、感覚だけで進むとき", type: "A" }, { label: "やり方を細かく決められてしまうとき", type: "C" }] },
  { id: 6, text: "理想の働き方に近いのは？", options: [{ label: "専門性が磨ける・スキルが身につく", type: "A" }, { label: "裁量があって、自分でどんどん動ける", type: "C" }, { label: "人との関係が大切にされる職場", type: "S" }, { label: "挑戦的で、成長し続けられる環境", type: "L" }] },
  { id: 7, text: "困難にぶつかったとき、どう動く？", options: [{ label: "とにかく動いて、突破口を探す", type: "L" }, { label: "周りに相談して、一緒に考える", type: "S" }, { label: "情報を集めて、原因から分析する", type: "A" }, { label: "別のやり方を考えて、新しく試す", type: "C" }] },
  { id: 8, text: "5年後、どんな自分になっていたい？", options: [{ label: "「あなたがいてよかった」と言われる自分", type: "S" }, { label: "「あの人の仕事、かっこいい」と言われる自分", type: "C" }, { label: "この分野なら誰にも負けないと言える自分", type: "A" }, { label: "チームや組織を引っ張っている自分", type: "L" }] },
];

const results = {
  C: { type: "クリエイター型", tagline: "つくることで、世界を動かす人", color: "var(--type-c)", description: "感性と表現力があなたの最大の武器。ゼロからアイデアを生み出し、カタチにする力があります。「型通り」より「自分らしさ」を大切にできる環境で、最大限に輝くタイプです。", jobs: ["デザイナー", "コピーライター", "動画クリエイター", "ブランドマーケター", "UI・UXデザイナー"], strength: "発想力・表現力・独創性" },
  L: { type: "リーダー型", tagline: "人を動かし、結果で語る人", color: "var(--type-l)", description: "行動力と推進力があなたの最大の武器。目標に向かって人を巻き込み、結果を出すのが得意です。チャレンジングな環境に飛び込むほど、本来の力が発揮されるタイプです。", jobs: ["営業職", "プロジェクトマネージャー", "コンサルタント", "事業開発", "ベンチャー全般"], strength: "行動力・統率力・突破力" },
  S: { type: "サポーター型", tagline: "誰かの力になることが、力になる人", color: "var(--type-s)", description: "共感力と気遣いがあなたの最大の武器。人の気持ちに寄り添い、チームをあたたかく支える力があります。「誰かのために」という気持ちが、あなたの一番のエネルギー源です。", jobs: ["HR・人事", "カスタマーサクセス", "教育・研修", "医療・福祉", "接客・ホスピタリティ"], strength: "共感力・傾聴力・チームワーク" },
  A: { type: "アナリスト型", tagline: "データと論理で、正解を見つける人", color: "var(--type-a)", description: "論理力と探究心があなたの最大の武器。物事を深く調べ、筋道を立てて考えるのが得意です。「なんとなく」で動くより、根拠のある選択ができる環境で力を発揮するタイプです。", jobs: ["エンジニア", "データアナリスト", "経営企画", "Webマーケター", "コンサルタント"], strength: "分析力・論理力・専門性" },
};

const typeColors = { C: "var(--type-c)", L: "var(--type-l)", S: "var(--type-s)", A: "var(--type-a)" };
const typeLabels = { C: "クリエイター", L: "リーダー", S: "サポーター", A: "アナリスト" };

// ============================================================
// Component
// ============================================================
export default function CareerQuiz() {
  const [screen, setScreen] = useState("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);
  const [counts, setCounts] = useState(null);
  const [animating, setAnimating] = useState(false);

  const handleStart = () => {
    setScreen("quiz");
    setCurrent(0);
    setAnswers([]);
    setSelected(null);
  };

  const handleNext = () => {
    if (!selected || animating) return;
    const newAnswers = [...answers, selected];
    if (current + 1 >= questions.length) {
      const c = { C: 0, L: 0, S: 0, A: 0 };
      newAnswers.forEach((t) => c[t]++);
      const sorted = Object.entries(c).sort((a, b) => b[1] - a[1]);
      setCounts(c);
      setResult(sorted[0][0]);
      setAnswers(newAnswers);
      setScreen("result");
    } else {
      setAnimating(true);
      setTimeout(() => {
        setAnswers(newAnswers);
        setCurrent(current + 1);
        setSelected(null);
        setAnimating(false);
      }, 280);
    }
  };

  const handleBack = () => {
    if (current <= 0 || animating) return;
    setAnimating(true);
    setTimeout(() => {
      const prevAnswer = answers[answers.length - 1] || null;
      setAnswers(answers.slice(0, -1));
      setCurrent(current - 1);
      setSelected(prevAnswer);
      setAnimating(false);
    }, 280);
  };

  const handleRetry = () => {
    setScreen("intro");
    setAnswers([]);
    setSelected(null);
    setCurrent(0);
    setResult(null);
    setCounts(null);
  };

  const q = questions[current];
  const r = result ? results[result] : null;

  // スコア僅差の判定
  const isTied = counts && (() => {
    const sorted = Object.values(counts).sort((a, b) => b - a);
    return sorted[0] === sorted[1];
  })();

  return (
    <div className="app-wrapper">

      {/* ── INTRO ── */}
      {screen === "intro" && (
        <div className="card">
          <div className="intro-content">
            <img src="/logo.png" alt="ロゴ" className="logo" />
            <p className="intro-kicker">適職診断</p>

            <h1 className="intro-title">
              あなたに向いている仕事、<br />
              見つけてみませんか？
            </h1>

            <p className="intro-desc">
              8つの質問に答えるだけで、あなたのタイプと<br />
              向いている職種がわかります。
            </p>

            <div className="intro-meta">
              <span>全8問</span>
              <span>約2分</span>
              <span>登録不要</span>
            </div>

            <button className="btn btn-primary" onClick={handleStart}>
              診断をはじめる
            </button>
          </div>
        </div>
      )}

      {/* ── QUIZ ── */}
      {screen === "quiz" && (
        <div className="card">
          <div className="quiz-header">
            <div className="progress-bar">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className={`progress-segment ${
                    i < current ? "progress-segment--done" :
                    i === current ? "progress-segment--current" :
                    "progress-segment--todo"
                  }`}
                />
              ))}
            </div>
            <span className="quiz-counter">
              Q{current + 1} / {questions.length}
            </span>
          </div>

          <div className={`quiz-body ${animating ? "quiz-body--animating" : ""}`}>
            <h2 className="question-text">{q.text}</h2>

            <div className="choices">
              {q.options.map((opt, i) => (
                <button
                  key={i}
                  className={`choice-btn ${selected === opt.type ? "choice-btn--selected" : ""}`}
                  onClick={() => setSelected(opt.type)}
                >
                  <span className="choice-indicator" />
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>

            <div className="quiz-nav">
              {current > 0 && (
                <button className="btn btn-ghost" onClick={handleBack}>
                  戻る
                </button>
              )}
              <button
                className="btn btn-primary"
                onClick={handleNext}
                disabled={!selected}
              >
                {current + 1 === questions.length ? "結果を見る" : "次へ"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── RESULT ── */}
      {screen === "result" && r && (
        <div className="card">
          <div className="result-content">
            <img src="/logo.png" alt="ロゴ" className="logo" />
            {/* 主役：タイプ名 */}
            <p className="result-kicker">あなたのタイプ</p>
            <h2 className="result-type-name" style={{ color: r.color }}>
              {r.type}
            </h2>
            <p className="result-tagline">{r.tagline}</p>

            {/* 僅差の場合だけ注意表示 */}
            {isTied && (
              <div className="result-caution">
                複数のタイプが同スコアでした。2番目の結果も参考にしてみてください。
              </div>
            )}

            <p className="result-desc">{r.description}</p>

            {/* スコア比較 — 見る→比較する の流れ */}
            {counts && (
              <div className="scores">
                <p className="section-label">診断スコア</p>
                {Object.entries(counts)
                  .sort((a, b) => b[1] - a[1])
                  .map(([key, count]) => {
                    const isTop = key === result;
                    return (
                      <div className="score-row" key={key}>
                        <div className="score-header">
                          <span
                            className={`score-label ${isTop ? "score-label--top" : "score-label--other"}`}
                            style={{ color: isTop ? typeColors[key] : undefined }}
                          >
                            {typeLabels[key]}型
                          </span>
                          <span
                            className="score-value"
                            style={{ color: isTop ? typeColors[key] : "var(--text-faint)" }}
                          >
                            {count} / {questions.length}
                          </span>
                        </div>
                        <div className="score-bar-track">
                          <div
                            className={`score-bar-fill ${isTop ? "score-bar-fill--top" : "score-bar-fill--other"}`}
                            style={{
                              width: `${(count / questions.length) * 100}%`,
                              background: typeColors[key],
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}

            {/* 強み */}
            <div className="strength-section">
              <p className="section-label">強み</p>
              <span
                className="strength-badge"
                style={{
                  background: `color-mix(in srgb, ${r.color} 8%, transparent)`,
                  color: r.color,
                  border: `1px solid color-mix(in srgb, ${r.color} 15%, transparent)`,
                }}
              >
                {r.strength}
              </span>
            </div>

            {/* 向いている職種 */}
            <div className="jobs-section">
              <p className="section-label">向いている職種</p>
              <div className="job-tags">
                {r.jobs.map((job, i) => (
                  <span className="job-tag" key={i}>{job}</span>
                ))}
              </div>
            </div>

            {/* CTA — 操作色は統一（タイプ色を使わない） */}
            <div className="result-cta-section">
              <p className="result-cta-title">あなたに合った仕事、一緒に探しませんか？</p>
              <p className="result-cta-sub">キャリアの悩み、気軽に話してみませんか。</p>
              <button className="btn btn-primary">
                無料で相談してみる
              </button>
            </div>

            <button className="btn btn-ghost" onClick={handleRetry}>
              もう一度診断する
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
