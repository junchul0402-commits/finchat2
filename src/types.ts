/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Choice {
  text: string;
  scores: {
    A?: number;
    B?: number;
    C?: number;
  };
}

export interface Question {
  q: string;
  choices: Choice[];
}

export type UserType = 'A' | 'B' | 'C';

export interface TypeDetail {
  icon: string;
  name: string;
  tagline: string;
  desc: string;
  keywords: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  feedback?: 'positive' | 'negative';
}

export interface AppState {
  currentPage: 'main' | 'diagnosis' | 'chat';
  diagnosisStep: 'intro' | 'question' | 'loading' | 'result';
  currentQuestion: number;
  answers: number[];
  scores: { A: number; B: number; C: number };
  userType: UserType | null;
  chatHistory: ChatMessage[];
  isLoading: boolean;
}

// ── 진단 문항 데이터 ──────────────────────────────────────
export const QUESTIONS: Question[] = [
  {
    q: "이번 달 예상치 못한 여유 자금 50만 원이 생겼어요. 가장 먼저 하고 싶은 건?",
    choices: [
      { text: "적금이나 예금에 넣어둔다", scores: { A: 2 } },
      { text: "일부는 저축, 일부는 소비한다", scores: { B: 2 } },
      { text: "투자 기회를 찾아본다", scores: { C: 2 } },
      { text: "비상금으로 따로 둔다", scores: { A: 1, B: 1 } }
    ]
  },
  {
    q: "투자한 금액이 10% 손실 났습니다. 어떻게 하시겠어요?",
    choices: [
      { text: "즉시 손절하고 원금 보전에 집중한다", scores: { A: 2 } },
      { text: "상황을 지켜보다가 판단한다", scores: { B: 2 } },
      { text: "오히려 더 매수 기회라고 생각한다", scores: { C: 2 } }
    ]
  },
  {
    q: "지금 가장 중요하게 생각하는 금융 목표는?",
    choices: [
      { text: "비상금 확보와 안정적인 자산 보존", scores: { A: 2 } },
      { text: "내 집 마련 등 중장기 목표 달성", scores: { B: 2 } },
      { text: "빠른 자산 증식과 재정적 자유", scores: { C: 2 } },
      { text: "아직 잘 모르겠다", scores: { A: 1, B: 1 } }
    ]
  },
  {
    q: "연 수익률 8%를 기대하는 대신 원금 손실 위험이 있는 상품, 어떻게 느끼시나요?",
    choices: [
      { text: "원금 손실은 절대 안 된다", scores: { A: 2 } },
      { text: "일부 손실은 감수할 수 있다", scores: { B: 2 } },
      { text: "그 정도 리스크는 충분히 감수한다", scores: { C: 2 } }
    ]
  },
  {
    q: "새로운 금융 상품을 알게 됐을 때, 나의 행동은?",
    choices: [
      { text: "검증된 기관(은행, 공공기관) 정보를 먼저 찾는다", scores: { A: 2 } },
      { text: "여러 출처를 비교해서 결정한다", scores: { B: 2 } },
      { text: "빠르게 가입 후 직접 경험해본다", scores: { C: 2 } }
    ]
  },
  {
    q: "지금 내 재정 상황을 한 마디로 표현한다면?",
    choices: [
      { text: "아직 기반이 부족해서 안전하게 쌓아가야 한다", scores: { A: 2 } },
      { text: "조금씩 자산을 늘려가는 단계다", scores: { B: 2 } },
      { text: "적극적으로 불려야 할 시기다", scores: { C: 2 } },
      { text: "잘 모르겠다", scores: { A: 1, B: 1 } }
    ]
  },
  {
    q: "돈을 대하는 나의 가장 중요한 원칙은?",
    choices: [
      { text: "잃지 않는 것이 버는 것보다 중요하다", scores: { A: 2 } },
      { text: "균형 잡힌 포트폴리오가 최선이다", scores: { B: 2 } },
      { text: "과감한 투자 없이는 큰 수익도 없다", scores: { C: 2 } }
    ]
  }
];

// ── 유형별 결과 데이터 ────────────────────────────────────
export const TYPE_DATA: Record<string, TypeDetail> = {
  A: {
    icon: "🛡️",
    name: "안정형 투자자",
    tagline: "잃지 않는 것이 최고의 전략",
    desc: "당신은 안정을 최우선으로 생각하는 신중한 투자자예요.\n원금 보존을 중시하고 예측 가능한 수익을 선호합니다.\n적금, 예금, 청약, 원금보장형 ISA가 잘 맞는 상품이에요.\n급하게 투자하기보다 비상금을 먼저 충분히 확보하는 것을 권장드려요.",
    keywords: ["적금", "예금", "청약", "비상금 통장", "원금보장 ISA"]
  },
  B: {
    icon: "⚖️",
    name: "균형형 투자자",
    tagline: "안정과 성장, 두 마리 토끼를 잡는다",
    desc: "당신은 안정과 성장을 모두 고려하는 균형 잡힌 투자자예요.\n적절한 리스크를 감수하면서 꾸준한 자산 증식을 목표로 합니다.\n적금+ETF 혼합, 혼합형 ISA, IRP가 잘 맞는 상품이에요.\n포트폴리오를 나눠서 안정과 성장 자산을 함께 가져가는 전략을 권장드려요.",
    keywords: ["혼합형 ISA", "IRP", "인덱스 ETF", "적금+투자 병행"]
  },
  C: {
    icon: "🚀",
    name: "성장형 투자자",
    tagline: "과감한 도전이 큰 수익을 만든다",
    desc: "당신은 적극적으로 자산을 불리고 싶은 성장 지향 투자자예요.\n높은 수익을 위해 어느 정도의 리스크를 감수할 준비가 되어 있습니다.\n성장형 ETF, 일반형 ISA, IRP+펀드가 잘 맞는 상품이에요.\n단, 비상금(생활비 3~6개월)은 반드시 먼저 확보한 후 투자를 시작하세요.",
    keywords: ["성장형 ETF", "일반형 ISA", "IRP 적극 활용", "분산 투자"]
  }
};

// ── 유형별 첫 인사 메시지 ─────────────────────────────────
export const GREETING_MESSAGES: Record<string, string> = {
  A: `안녕하세요! 금융 가치관 진단 결과, **안정형 투자자** 성향으로 분석되었어요 🛡️\n원금을 정직하고 가치 있게 지키며 안전하게 성장시키는 습관을 크게 중시하시는군요.\n오늘 자산 기획이나 첫 저축, 주택 청약 활용 등 어떤 점이 가장 알고 싶으신가요? 차근차근 편하게 말을 건네주세요!`,
  B: `안녕하세요! 금융 가치관 진단 결과, **균형형 투자자** 성향으로 분석되었어요 ⚖️\n안정의 든든함과 투자의 성장을 균형감 있게 조율할 수 있는 정밀한 감각을 갖고 계시네요.\n오늘 적금 과 주식 분해, ISA 배분을 통한 유연한 포트폴리오 자산 구성 등 어떤 금융 아이디어를 나누어 볼까요?`,
  C: `안녕하세요! 금융 가치관 진단 결과, **성장형 투자자** 성향으로 분석되었어요 🚀\n장기 복리의 큰 수익을 바라보고 리스크를 합리적으로 제어하며 기꺼이 도전하려는 혁신가이시군요.\n오늘 세액공제 한도를 채우는 법이나 똑똑한 ETF 지수 추종 주식 투자, 중개형 ISA 활용 등 궁금한 부분을 화끈하게 풀어 보세요!`
};

// ── 용어 사전 ─────────────────────────────────────────────
export const TERM_DICTIONARY: Record<string, string> = {
  "IRP": "개인형 퇴직연금. 세금 혜택을 받으며 노후 자금을 적립하는 계좌예요. 연간 700만 원까지 세액공제 가능.",
  "ISA": "개인종합자산관리계좌. 예금·펀드·ETF 등 여러 금융상품을 하나의 계좌에서 운용하고 세금 혜택을 받을 수 있어요.",
  "ETF": "상장지수펀드. 주식처럼 거래할 수 있는 펀드예요. 코스피나 S&P500 같은 지수를 따라 움직이는 상품이에요.",
  "청약": "주택청약. 아파트를 분양받을 수 있는 신청 자격을 쌓는 적금이에요. 사회초년생에게 필수 가입 상품 중 하나예요.",
  "적금": "매달 일정 금액을 납입하고 만기에 원금과 이자를 받는 저축 상품이에요.",
  "예금": "목돈을 한 번에 맡기고 만기에 이자를 받는 상품이에요.",
  "펀드": "여러 투자자의 돈을 모아 전문가가 대신 운용해주는 상품이에요.",
  "세액공제": "납부해야 할 세금에서 일정 금액을 빼주는 혜택이에요. IRP, 연금저축이 대표적이에요.",
  "비상금": "갑작스러운 지출에 대비한 생활비 3~6개월치 현금성 자산이에요."
};
