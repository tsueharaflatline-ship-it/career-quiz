import { useState } from "react";

const questions = [
  { id: 1, axis: "EI", text: "仕事のモチベーションが上がるのはどっちに近い？", a: { label: "評価されたり、成果が数字で見えるとき", type: "E" }, b: { label: "自分が成長していると実感できるとき", type: "I" } },
  { id: 2, axis: "EI", text: "理想の仕事環境に近いのは？", a: { label: "実力が正当に評価される、競争がある環境", type: "E" }, b: { label: "自分のペースで深く取り組める環境", type: "I" } },
  { id: 3, axis: "EI", text: "5年後になりたい自分に近いのは？", a: { label: "高収入・高評価のポジションにいる自分", type: "E" }, b: { label: "この仕事が好きで誇りを持って働いている自分", type: "I" } },
  { id: 4, axis: "TF", text: "何かを決めるとき、どっちを重視する？", a: { label: "データや根拠をもとに論理的に判断する", type: "T" }, b: { label: "直感や「なんとなく合う」感覚を大事にする", type: "F" } },
  { id: 5, axis: "TF", text: "職場で信頼できる人ってどんな人？", a: { label: "感情に左右されず、冷静に判断できる人", type: "T" }, b: { label: "空気を読んで、人の気持ちに寄り添える人", type: "F" } },
  { id: 6, axis: "TF", text: "仕事でミスをしたとき、まず何をする？", a: { label: "原因を分析して、再発防止策を考える", type: "T" }, b: { label: "関係者に謝罪して、フォローを優先する", type: "F" } },
  { id: 7, axis: "PS", text: "プロジェクトが始まったとき、あなたはどう動く？", a: { label: "まずスケジュールと手順を整理する", type: "P" }, b: { label: "とりあえず動きながら考える", type: "S" } },
  { id: 8, axis: "PS", text: "急な予定変更があったとき、どう感じる？", a: { label: "少し困る。事前に決めておきたい", type: "P" }, b: { label: "むしろ楽しい。臨機応変が得意", type: "S" } },
  { id: 9, axis: "PS", text: "仕事のやり方で自分に近いのは？", a: { label: "丁寧に、確実に、着実に進めたい", type: "P" }, b: { label: "スピード優先で、修正しながら進めたい", type: "S" } },
  { id: 10, axis: "LC", text: "チームで仕事するとき、自然となるポジションは？", a: { label: "率先して意見を出したり、まとめる役割", type: "L" }, b: { label: "メンバーのフォローや、縁の下を支える役割", type: "C" } },
  { id: 11, axis: "LC", text: "友達や同僚に言われることが多いのは？", a: { label: "頼りになる・引っ張ってくれる", type: "L" }, b: { label: "話しやすい・気が利く・安心する", type: "C" } },
  { id: 12, axis: "LC", text: "仕事でやりがいを感じるのはどっち？", a: { label: "自分の意見や判断がチームを動かしたとき", type: "L" }, b: { label: "誰かの役に立てた・支えられたと感じたとき", type: "C" } },
];

const results = {
  ETPL: { name: "司令官", catch: "戦略と結果で組織を動かす人", color: "#FF6B35", bg: "linear-gradient(135deg, #FF6B35, #F7931E)", desc: "目標から逆算して計画を立て、チームを引っ張って結果を出すのが得意。評価や成果へのこだわりが強く、責任感も抜群。リーダーとして周囲の信頼を勝ち取るタイプ。", strength: "戦略思考・統率力・目標達成力", jobs: ["営業マネージャー", "プロジェクトマネージャー", "コンサルタント", "経営企画", "事業開発"] },
  ETPC: { name: "設計者", catch: "緻密な計画で着実に勝つ人", color: "#FF6B35", bg: "linear-gradient(135deg, #FF6B35, #F7931E)", desc: "データと論理を武器に、緻密な計画を立てて着実に目標を達成するタイプ。数字や成果へのこだわりが強く、チームを縁の下から支えながら結果を出す。", strength: "分析力・計画力・実行力", jobs: ["データアナリスト", "経営企画", "システムエンジニア", "財務・経理", "マーケター"] },
  ETSL: { name: "突破者", catch: "直感とスピードで道を切り開く人", color: "#FF6B35", bg: "linear-gradient(135deg, #FF6B35, #F7931E)", desc: "スピードと直感を武器に、誰よりも早く動いて結果を出すタイプ。変化の多い環境で力を発揮し、リーダーとしてチームをぐいぐい引っ張っていく。", strength: "行動力・スピード・突破力", jobs: ["営業職", "スタートアップ全般", "ベンチャー企業", "起業家", "事業開発"] },
  ETSC: { name: "分析者", catch: "データで静かに正解を出す人", color: "#FF6B35", bg: "linear-gradient(135deg, #FF6B35, #F7931E)", desc: "論理と直感を組み合わせて、素早く正確な判断を下すタイプ。感情に流されず、データをもとに冷静に動く。縁の下でチームを支えながら着実に成果を積み上げる。", strength: "論理力・判断力・冷静さ", jobs: ["データサイエンティスト", "コンサルタント", "エンジニア", "マーケティング", "金融アナリスト"] },
  EFPL: { name: "牽引者", catch: "熱量と共感で人を動かす人", color: "#5B4CFF", bg: "linear-gradient(135deg, #5B4CFF, #9B59B6)", desc: "感情に訴えかける力と計画性を兼ね備えたリーダータイプ。人の気持ちを理解しながらチームをまとめ、熱量で周囲を巻き込んでいく。", strength: "共感力・リーダーシップ・熱量", jobs: ["HR・人事", "チームリーダー", "教育・研修", "ブランドマネージャー", "NPO・社会起業"] },
  EFPC: { name: "調停者", catch: "チームの空気を整える縁の下の力持ち", color: "#5B4CFF", bg: "linear-gradient(135deg, #5B4CFF, #9B59B6)", desc: "人の気持ちに寄り添いながら、丁寧に物事を進めるタイプ。チームの調和を大切にし、誰かが困っていると真っ先に気づいて動ける縁の下の力持ち。", strength: "調整力・共感力・丁寧さ", jobs: ["カスタマーサクセス", "HR・人事", "医療・福祉", "接客・ホスピタリティ", "秘書・アシスタント"] },
  EFSL: { name: "革命家", catch: "感性と行動力で変化を起こす人", color: "#5B4CFF", bg: "linear-gradient(135deg, #5B4CFF, #9B59B6)", desc: "感性と行動力を兼ね備えた異端児タイプ。「なんでこうなってるの？」と常識を疑い、直感で動いてチームに新しい風を吹き込む。", strength: "発想力・行動力・共感力", jobs: ["クリエイティブディレクター", "プロダクトデザイナー", "スタートアップ", "SNSマーケター", "コンテンツクリエイター"] },
  EFSC: { name: "共感者", catch: "人の気持ちに寄り添う天才", color: "#5B4CFF", bg: "linear-gradient(135deg, #5B4CFF, #9B59B6)", desc: "誰よりも人の気持ちに敏感で、相手の立場に立って考えられるタイプ。スピーディに動きながら周囲をサポートし、チームの空気を和やかにする存在。", strength: "傾聴力・共感力・柔軟性", jobs: ["カウンセラー・コーチ", "カスタマーサポート", "医療・看護", "教育・保育", "接客全般"] },
  ITPL: { name: "探求者", catch: "知識を武器に道を切り拓く人", color: "#26C485", bg: "linear-gradient(135deg, #26C485, #15A0A0)", desc: "内発的な探究心を持ち、知識を深めながら計画的に目標へ向かうタイプ。リーダーとして専門性を武器に、チームに方向性を示す知的なエキスパート。", strength: "専門性・探究心・論理力", jobs: ["エンジニア", "研究開発", "コンサルタント", "弁護士・会計士", "医師・薬剤師"] },
  ITPC: { name: "研究者", catch: "深く掘り下げて本質を見つける人", color: "#26C485", bg: "linear-gradient(135deg, #26C485, #15A0A0)", desc: "物事を徹底的に深掘りし、本質を見極める力を持つタイプ。一人で集中して取り組む力が高く、専門領域では圧倒的な強みを発揮する縁の下の知的エース。", strength: "深掘り力・専門性・継続力", jobs: ["研究職", "データサイエンティスト", "エンジニア", "ライター・編集者", "経理・財務"] },
  ITSL: { name: "改革者", catch: "独自の視点で常識を疑う人", color: "#26C485", bg: "linear-gradient(135deg, #26C485, #15A0A0)", desc: "内向きな探究心と直感的な行動力を持つ異才タイプ。「もっとよくできるはず」という視点で常識を疑い、独自のやり方でチームや組織に革新をもたらす。", strength: "独創性・直感力・問題発見力", jobs: ["プロダクトマネージャー", "UXデザイナー", "起業家", "新規事業開発", "ITエンジニア"] },
  ITSC: { name: "観察者", catch: "静かに全体を見通す洞察力の持ち主", color: "#26C485", bg: "linear-gradient(135deg, #26C485, #15A0A0)", desc: "全体を俯瞰して静かに観察し、誰も気づかない本質を見抜くタイプ。サポート側に回りながらも、その洞察力でチームに欠かせない存在になる。", strength: "観察力・洞察力・冷静さ", jobs: ["品質管理・QA", "データアナリスト", "編集者・校正", "システム監査", "リサーチャー"] },
  IFPL: { name: "伝道者", catch: "信念を持って人に語りかける人", color: "#1A7FDB", bg: "linear-gradient(135deg, #1A7FDB, #0D4F8B)", desc: "強い信念と共感力を持ち、人の心を動かす言葉で周囲を引っ張るタイプ。「なぜこれをやるのか」という意味にこだわり、チームに情熱と方向性を与える存在。", strength: "発信力・信念・共感力", jobs: ["コーチ・メンター", "マーケター", "教師・講師", "NPO・社会起業", "人事・採用"] },
  IFPC: { name: "育成者", catch: "人の可能性を引き出すのが得意な人", color: "#1A7FDB", bg: "linear-gradient(135deg, #1A7FDB, #0D4F8B)", desc: "人の成長を喜び、丁寧に寄り添いながら相手の可能性を引き出すタイプ。感情と計画性を兼ね備えた縁の下の力持ちで、人が育つ環境を自然とつくり出す。", strength: "育成力・傾聴力・丁寧さ", jobs: ["人事・研修", "教師・保育士", "コーチ・カウンセラー", "医療・福祉", "カスタマーサクセス"] },
  IFSL: { name: "創造者", catch: "感性とひらめきで世界を彩る人", color: "#1A7FDB", bg: "linear-gradient(135deg, #1A7FDB, #0D4F8B)", desc: "豊かな感性と自由な発想で、世界に色を加えるクリエイタータイプ。内発的な動機で動き、誰かのためにつくることに喜びを感じる。スピードとひらめきで唯一無二の価値を生み出す。", strength: "創造力・感性・共感力", jobs: ["デザイナー", "イラストレーター", "コピーライター", "動画クリエイター", "UI/UXデザイナー"] },
  IFSC: { name: "癒し手", catch: "そこにいるだけで場が和む存在", color: "#1A7FDB", bg: "linear-gradient(135deg, #1A7FDB, #0D4F8B)", desc: "存在そのものがチームに安心感を与えるタイプ。人の話を聞くのが得意で、誰も気づかないところで誰かを支えている。やりがいと人との繋がりを大切にする、チームの心の拠り所。", strength: "傾聴力・包容力・安心感", jobs: ["看護師・介護士", "保育士", "カウンセラー", "接客・ホスピタリティ", "社内サポート全般"] },
};

function calcResult(answers) {
  const score = { E: 0, I: 0, T: 0, F: 0, P: 0, S: 0, L: 0, C: 0 };
  answers.forEach(a => score[a]++);
  const ei = score.E >= score.I ? "E" : "I";
  const tf = score.T >= score.F ? "T" : "F";
  const ps = score.P >= score.S ? "P" : "S";
  const lc = score.L >= score.C ? "L" : "C";
  return `${ei}${tf}${ps}${lc}`;
}

export default function CareerQuiz() {
  const [screen, setScreen] = useState("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  const handleStart = () => { setScreen("quiz"); setCurrent(0); setAnswers([]); };

  const handleAnswer = (type) => {
    const newAnswers = [...answers, type];
    if (current + 1 >= questions.length) {
      setResult(calcResult(newAnswers));
      setScreen("result");
    } else {
      setAnswers(newAnswers);
      setCurrent(current + 1);
    }
  };

  const handleRetry = () => { setScreen("intro"); setAnswers([]); setCurrent(0); setResult(null); };

  const q = questions[current];
  const r = result ? results[result] : null;

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #FFF8F3 0%, #FFF0E8 50%, #F5F0FF 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px", fontFamily: "'Hiragino Kaku Gothic ProN', 'Noto Sans JP', sans-serif" }}>

      {/* イントロ */}
      {screen === "intro" && (
        <div style={{ background: "#fff", borderRadius: "24px", boxShadow: "0 8px 48px rgba(0,0,0,0.10)", width: "100%", maxWidth: "480px", padding: "40px 32px", textAlign: "center" }}>
          <img src="/logo.png" alt="キャリミー" style={{ width: "180px", display: "block", margin: "0 auto 16px" }} />
          <div style={{ display: "inline-block", background: "#FFF0E0", color: "#FF6B35", fontWeight: 700, fontSize: "13px", borderRadius: "100px", padding: "6px 16px", marginBottom: "16px" }}>✨ 20代のための</div>
          <h1 style={{ fontSize: "42px", fontWeight: 900, lineHeight: 1.1, color: "#1A1A2E", margin: "0 0 8px", letterSpacing: "-1px" }}>適職タイプ<br /><span style={{ color: "#FF6B35" }}>診断</span></h1>
          <p style={{ fontSize: "15px", color: "#555", lineHeight: 1.7, margin: "0 0 8px" }}>12の質問に答えるだけで、<br />あなたの仕事タイプがわかる。</p>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", marginBottom: "28px", fontSize: "13px", color: "#888" }}>
            <span>⏱ 約3分</span><span style={{ color: "#ddd" }}>|</span><span>📝 全12問</span><span style={{ color: "#ddd" }}>|</span><span>🎯 16タイプ</span>
          </div>
          <button onClick={handleStart} style={{ width: "100%", padding: "18px", background: "linear-gradient(135deg, #FF6B35, #F7931E)", color: "#fff", fontWeight: 800, fontSize: "17px", border: "none", borderRadius: "14px", cursor: "pointer", marginBottom: "12px" }}>診断スタート →</button>
          <p style={{ fontSize: "12px", color: "#aaa", margin: 0 }}>登録不要・無料で診断できます</p>
        </div>
      )}

      {/* 質問 */}
      {screen === "quiz" && (
        <div style={{ background: "#fff", borderRadius: "24px", boxShadow: "0 8px 48px rgba(0,0,0,0.10)", width: "100%", maxWidth: "480px", overflow: "hidden" }}>
          <div style={{ padding: "24px 28px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ fontSize: "13px", fontWeight: 700, color: "#FF6B35" }}>Q{current + 1} / {questions.length}</span>
              <span style={{ fontSize: "13px", color: "#bbb" }}>{Math.round(((current + 1) / questions.length) * 100)}%</span>
            </div>
            <div style={{ background: "#F0F0F0", borderRadius: "100px", height: "6px" }}>
              <div style={{ background: "linear-gradient(90deg, #FF6B35, #F7931E)", height: "6px", borderRadius: "100px", width: `${((current + 1) / questions.length) * 100}%`, transition: "width 0.3s" }} />
            </div>
          </div>
          <div style={{ padding: "28px" }}>
            <h2 style={{ fontSize: "19px", fontWeight: 800, color: "#1A1A2E", textAlign: "center", margin: "0 0 28px", lineHeight: 1.5 }}>{q.text}</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[q.a, q.b].map((opt, i) => (
                <button key={i} onClick={() => handleAnswer(opt.type)}
                  style={{ padding: "20px", border: "2px solid #F0F0F0", borderRadius: "14px", background: "#fff", textAlign: "left", fontSize: "15px", color: "#1A1A2E", cursor: "pointer", fontWeight: 500, lineHeight: 1.5, transition: "all 0.15s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#FF6B35"; e.currentTarget.style.background = "#FFF5F1"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#F0F0F0"; e.currentTarget.style.background = "#fff"; }}
                >
                  <span style={{ display: "inline-block", width: "24px", height: "24px", borderRadius: "50%", background: "#F0F0F0", textAlign: "center", lineHeight: "24px", fontSize: "12px", fontWeight: 700, marginRight: "12px", color: "#888" }}>{i === 0 ? "A" : "B"}</span>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 結果 */}
      {screen === "result" && r && (
        <div style={{ background: "#fff", borderRadius: "24px", boxShadow: "0 8px 48px rgba(0,0,0,0.10)", width: "100%", maxWidth: "480px", overflow: "hidden" }}>
          <div style={{ background: r.bg, padding: "0", position: "relative", height: "220px", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 100%)" }} />
            <div style={{ position: "absolute", bottom: "24px", left: "24px" }}>
              <div style={{ display: "inline-block", background: "rgba(255,255,255,0.25)", color: "#fff", fontSize: "11px", fontWeight: 700, borderRadius: "100px", padding: "4px 12px", marginBottom: "8px", letterSpacing: "2px" }}>あなたのタイプ</div>
              <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", marginBottom: "4px", fontFamily: "'Noto Serif JP', serif" }}>{result}</div>
              <h2 style={{ fontSize: "28px", fontWeight: 900, color: "#fff", margin: "0 0 4px", fontFamily: "'Noto Serif JP', serif", textShadow: "0 2px 12px rgba(0,0,0,0.4)" }}>{r.name}</h2>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.9)", margin: 0, textShadow: "0 1px 6px rgba(0,0,0,0.4)" }}>「{r.catch}」</p>
            </div>
          </div>
          <div style={{ padding: "28px" }}>
            <p style={{ fontSize: "15px", color: "#444", lineHeight: 1.8, marginBottom: "24px" }}>{r.desc}</p>
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
              <a href="https://lstep.app/form/95655/hQex8Q/767054" target="_blank" rel="noopener noreferrer"
                style={{ display: "block", width: "100%", padding: "16px", background: r.bg, color: "#fff", fontWeight: 800, fontSize: "16px", border: "none", borderRadius: "12px", cursor: "pointer", textDecoration: "none", textAlign: "center", boxSizing: "border-box" }}>
                無料で相談してみる →
              </a>
              <p style={{ fontSize: "11px", color: "#aaa", margin: "8px 0 0" }}>完全無料・強引な勧誘は一切しません</p>
            </div>
            <button onClick={handleRetry} style={{ width: "100%", padding: "14px", background: "transparent", color: "#aaa", fontWeight: 600, fontSize: "14px", border: "2px solid #F0F0F0", borderRadius: "12px", cursor: "pointer" }}>もう一度診断する</button>
          </div>
        </div>
      )}
    </div>
  );
}