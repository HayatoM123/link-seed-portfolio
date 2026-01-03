export type Project = {
  slug: string;
  title: string;
  category: "Automation" | "CAD" | "Workflow";
  summary: string;
  problem: string;
  approach: string[];
  stack: string[];
  results: string[];

  /**
   * ✅【ここから追加】詳細ページ用の“中身”
   * TODO: 各プロジェクトごとに、あなたの実案件に合わせて文章を調整してください。
   * - 数値（h/月、件/日、ミス率など）が入ると説得力が一気に上がります。
   */
  detail: {
    overview: string; // TODO: 冒頭の結論サマリ（1〜2文でOK）
    role: string; // TODO: あなたの役割（例：要件整理 / 実装 / 運用設計）
    period: string; // TODO: 期間（例：2週間、1ヶ月、段階導入など）
    scope: string[]; // TODO: 対象範囲（何を自動化したか）
    deliverables: string[]; // TODO: 納品物（スクリプト、手順書、テンプレなど）
    constraints?: string[]; // 任意：制約（止められない、例外多いなど）
    implementationPoints: { title: string; bullets: string[] }[]; // TODO: 工夫点
    learnings: string[]; // TODO: 学び（短くてOK）
    nextSteps: string[]; // TODO: 次の改善（短くてOK）
  };

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

    detail: {
      // TODO: 1〜2文で「何をどう変えたか」を結論から書く
      overview:
        "手作業で発生していた「収集→転記→整形→帳票作成」を、RPAとVBAで分担して自動化。月次の合計工数を削減し、確認漏れも減らしました。",

      // TODO: あなたの立場に合わせて調整
      role: "要件整理 / 実装 / 運用設計（1人）",

      // TODO: 実際の期間感に合わせて調整
      period: "数週間〜（段階導入・改善）",

      // TODO: 自動化対象を具体的に（見積もりしやすい/信頼が上がる）
      scope: [
        "入力データの整形（表記ゆれ・空欄・型の統一）",
        "Webからの定型データ取得（ダウンロード〜整形）",
        "帳票（複数フォーマット）への転記自動化",
        "CADの定型操作の置換（可能な範囲を自動化）",
      ],

      // TODO: 納品物（相手が得るもの）を明確に
      deliverables: [
        "RPAシナリオ一式（実行手順・設定）",
        "Excel/VBAツール（ログ出力・例外処理込み）",
        "運用手順（例外時の対応・再実行方法）",
      ],

      constraints: [
        "現場運用を止めない（段階導入）",
        "例外ケースが一定数あり、改善サイクルを前提に設計",
      ],

      // TODO: ここが“技術力”より“仕事力”を見せられるポイントです
      implementationPoints: [
        {
          title: "“失敗しない”より“復旧できる”設計",
          bullets: [
            "途中で止まっても再実行できるよう、工程を分割",
            "どこで止まったかが分かるログ設計（工程名/対象/結果）",
          ],
        },
        {
          title: "入力チェックと表記ゆれ吸収",
          bullets: [
            "必須項目・型・桁・許容値のチェック",
            "全角/半角、余計な空白、表現違いを正規化",
          ],
        },
        {
          title: "RPAとVBAの役割分担",
          bullets: [
            "UI操作・アプリ間連携が必要 → RPA",
            "集計・変換・帳票転記 → VBA（高速/安定）",
          ],
        },
      ],

      learnings: [
        "自動化は実装前の“例外定義”が成果の大半を決める",
        "ログと復旧手順まで含めると運用が回り続ける",
      ],
      nextSteps: [
        "例外ケースの自動判定精度を上げて手戻りをさらに減らす",
        "設定値（列名/フォーマット）を外部化して保守性を上げる",
      ],
    },
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

    detail: {
      overview:
        "情報収集（複数ソース）→整形→Excel出力→CAD配置の流れを繋げ、手作業の“転記”を削減しました。",
      role: "業務フロー整理 / スクリプト実装 / 検証",
      period: "数週間（初期版→改善）",
      scope: [
        "地点情報の取得（定型項目）",
        "Excelへの整形出力（列順/書式統一）",
        "VectorWorksへの自動配置（定型ルールに沿った配置）",
      ],
      deliverables: [
        "Pythonスクリプト一式（取得/整形/出力）",
        "Excelテンプレ（列・書式統一）",
        "CAD配置の前提ルールと実行手順",
      ],
      constraints: [
        "取得元の仕様変化に備え、項目定義を集約",
        "CAD側は“定型ルール化できる範囲”を自動化",
      ],
      implementationPoints: [
        {
          title: "データ定義を先に固定して迷子を防ぐ",
          bullets: [
            "必要項目を表で定義（名前/住所/ID/日射量…）",
            "取得元が変わっても出力形式は変えない",
          ],
        },
        {
          title: "CAD自動配置の前提を“ルール化”",
          bullets: [
            "配置基準点・ピッチ・例外時の扱いを明文化",
            "人が判断する箇所だけ残し、残りは自動化",
          ],
        },
      ],
      learnings: [
        "CAD自動化は“完全自動”より“8割自動＋人の判断”が強い",
        "列/書式を固定すると後工程の工数が激減する",
      ],
      nextSteps: ["取得元の変更検知（落ちた時のアラート）", "配置ルールのパラメータ化（案件ごとの切替）"],
    },
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

    detail: {
      overview:
        "“提出する/依頼する/記録する”を人がやると漏れやすい部分をフロー化し、自動化。日次の負担と心理コストを下げました。",
      role: "業務整理 / 実装 / 運用ルール整備",
      period: "数週間（導入→改善）",
      scope: ["案内図の作成（定型テンプレ化）", "承認提出（自動提出・記録）", "資料収集依頼（リマインド含む）"],
      deliverables: ["Excel/VBA（テンプレ生成・取り込み）", "Power Automateフロー（提出・記録・依頼）", "運用手順（例外対応、担当引継ぎ）"],
      implementationPoints: [
        {
          title: "“担当者の記憶”に依存しない導線",
          bullets: ["提出と記録をワンセット化（片方だけ忘れない）", "リマインドを自動化し、催促の心理負担を削減"],
        },
        {
          title: "例外時の人手対応を先に決める",
          bullets: ["失敗時はどこを見て、何を直して再実行するかを明文化", "手動対応が必要なケースを限定し、判断を簡単にする"],
        },
      ],
      learnings: ["フロー自動化は“運用ルール”込みで初めて効果が出る", "提出・記録・通知は自動化のROIが大きい"],
      nextSteps: ["提出物のバリデーション（抜けの検知）", "ログ集計でボトルネックを可視化し、追加自動化へ"],
    },
  },
];