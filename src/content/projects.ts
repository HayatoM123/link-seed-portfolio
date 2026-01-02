export type Project = {
  slug: string;
  title: string;
  category: "Automation" | "CAD" | "Workflow";
  summary: string;
  problem: string;
  approach: string[];
  stack: string[];
  results: string[];
};

export const projects: Project[] = [
  {
    slug: "rpa-vba-recurring-work",
    title: "帳票作成など繰り返し業務の自動化（RPA + VBA）",
    category: "Automation",
    summary: "入力整理・CAD操作・Webデータ取得・帳票転記を自動化し、月次工数を削減。",
    problem:
      "繰り返し業務で人の時間が拘束され、他の重要業務に着手できない。ミスや確認コストも増える。",
    approach: [
      "現状ヒアリングで作業手順・例外・品質要件を整理",
      "RPAとVBAを使い分け（UI操作が必要→RPA、表計算処理→VBA）",
      "処理ログ・例外分岐・入力チェックを実装して運用品質を担保",
    ],
    stack: ["RPA", "VBA", "Excel"],
    results: [
      "出勤時入力情報の自動データ整理：5h/月短縮",
      "CADソフトの自動操作：3h/月短縮",
      "Webサイトからデータ自動DL：10h/月短縮",
      "帳票データの複数FMT自動入力：1h/月短縮",
    ],
  },
  {
    slug: "python-drawing-automation",
    title: "図面作成の業務自動化（Python）",
    category: "CAD",
    summary: "地点情報取得→Excel記入→VectorWorks自動配置までを自動化。",
    problem:
      "地点情報の収集・転記・配置作業が手作業で、時間がかかり属人化しやすい。",
    approach: [
      "必要情報（名前/住所/日射量等）の取得元を整理",
      "Pythonでデータ取得・整形・Excel記入を自動化",
      "VectorWorksの自動配置（パネル配置）を自動化",
    ],
    stack: ["Python", "Excel", "VectorWorks"],
    results: ["地点情報取得〜配置まで：8h/月短縮", "VectorWorks自動パネル配置：1h/月短縮"],
  },
  {
    slug: "vba-powerautomate-approval",
    title: "情報収集と提出の自動化（VBA / Power Automate）",
    category: "Workflow",
    summary: "案内図生成、承認提出、資料収集依頼を自動化し、日次・月次の負担を削減。",
    problem:
      "手作業の収集・提出・記入が多く、確認漏れが起きやすい。担当者負荷が高い。",
    approach: [
      "VBAでファイル作成と地図取り込みを自動化",
      "Power Automateで提出・記入・収集を自動化",
      "運用ルール（例外時の手順）を合わせて整備",
    ],
    stack: ["VBA", "Power Automate", "Excel"],
    results: ["案内図作成：30分/日短縮", "承認提出＋管理表記入：30分/日短縮", "資料収集：2h/月短縮"],
  },
];