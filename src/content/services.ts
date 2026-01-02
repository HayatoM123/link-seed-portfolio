export type Service = {
  title: string;
  summary: string;
  bullets: string[];
};

export const services: Service[] = [
  {
    title: "業務自動化（VBA / RPA / Power Automate / Python）",
    summary: "繰り返し作業を標準化し、運用しやすい形で自動化します。",
    bullets: [
      "現状ヒアリング → ボトルネック整理 → 自動化方針の提案",
      "VBA/RPA/Power Automate/Pythonを適材適所で選定",
      "抜け漏れ防止（チェック・判定ロジック）を組み込み",
      "引き継ぎ資料・手順化まで対応",
    ],
  },
  {
    title: "機械設計",
    summary: "要件整理から図面作成まで、現場の制約を踏まえて設計します。",
    bullets: ["要件整理・構想検討", "2D/3D図面作成（環境に応じて）", "設計レビュー・改善提案"],
  },
  {
    title: "Web制作（ポートフォリオ/LP/小規模サイト）",
    summary: "シンプルで信頼感のあるサイトを、運用しやすい構成で制作します。",
    bullets: ["要件定義・情報設計", "実装（Next.js/React）", "SEO/表示速度/アクセシビリティ配慮"],
  },
];