// src/constants/learningInitialData.ts

import type {
    ChatMessage,
    WeakPoint,
    UnderstandingMap,
  } from '../types/learning';
  
  export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
    {
      role: 'assistant',
      text: 'HTTPって、そもそも何の略で、どんな役割を持っているものですか?',
      turn: 1,
    },
    {
      role: 'user',
      text: 'HyperText Transfer Protocolの略で、Webブラウザとサーバーの間でデータをやり取りするための通信プロトコルです。',
      turn: 1,
    },
    {
      role: 'assistant',
      text: 'いいですね!では、HTTPの「ステートレス」って何を意味しますか?',
      turn: 2,
    },
    {
      role: 'user',
      text: 'えーっと、状態を保持しないってことですかね...?',
      turn: 2,
    },
    {
      role: 'assistant',
      text: '正解です!もう少し具体的に説明できますか?なぜステートレスが重要なのでしょう?',
      turn: 3,
    },
    { role: 'user', text: 'うーん、よくわからないです。', turn: 3 },
  ];
  
  export const INITIAL_WEAK_POINTS: WeakPoint[] = [
    {
      id: 'wp_stateless',
      concept: 'ステートレスの意義',
      status: 'weak',
      reason:
        'ステートレスの概念は理解しているが、なぜHTTPがステートレスに設計されたのか、その利点(スケーラビリティ、負荷分散、シンプルさ)を説明できていない。',
      relatedTurns: [2, 3],
      suggestion:
        'サーバーの負荷分散やスケーラビリティとの関係を学び、ステートフルな通信との比較を理解しよう。',
      aiLevel: 'critical',
      studyStatus: 'todo',
    },
    {
      id: 'wp_cookie',
      concept: 'Cookieの仕組み',
      status: 'vague',
      reason:
        'Cookieが状態管理に使われることは知っているが、サーバーからSet-Cookieヘッダーで送信され、クライアント側に保存される仕組みを理解していない。',
      relatedTurns: [8],
      suggestion:
        'Set-CookieヘッダーとCookieヘッダーの役割を確認し、ブラウザの開発者ツールで実際のCookieの動きを観察してみよう。',
      aiLevel: 'weak',
      studyStatus: 'todo',
    },
  ];
  
  export const INITIAL_UNDERSTANDING_MAP: UnderstandingMap = {
    center: {
      id: 'center',
      concept: 'HTTP',
      status: 'mastered',
      x: 50,
      y: 50,
      explanation:
        'HyperText Transfer Protocolは、Webブラウザとサーバー間でデータをやり取りするための通信プロトコルです。',
      relatedTo: [],
    },
    nodes: [
      {
        id: 'n1',
        concept: 'HTTPメソッド',
        status: 'mastered',
        x: 50,
        y: 12,
        explanation:
          'GET、POST、PUT、DELETEなど、HTTPリクエストの種類を定義します。',
        relatedTo: ['center'],
      },
      {
        id: 'n2',
        concept: 'ステートレスの意義',
        status: 'weak',
        x: 15,
        y: 28,
        explanation:
          '各リクエストが独立していることで、サーバーの負荷分散やスケーラビリティが向上します。',
        relatedTo: ['center'],
      },
      {
        id: 'n3',
        concept: 'Cookie',
        status: 'vague',
        x: 8,
        y: 50,
        explanation:
          'HTTPのステートレス性を補完するため、クライアント側に状態情報を保存する仕組みです。',
        relatedTo: ['center'],
      },
      {
        id: 'n4',
        concept: 'ステータスコード',
        status: 'mastered',
        x: 85,
        y: 28,
        explanation:
          '200、404、500など、サーバーからの応答の状態を示す3桁の数値コードです。',
        relatedTo: ['center'],
      },
      {
        id: 'n5',
        concept: 'HTTPヘッダー',
        status: 'weak',
        x: 85,
        y: 72,
        explanation:
          'リクエスト・レスポンスに含まれるメタデータで、Content-TypeやAuthorizationなどがあります。',
        relatedTo: ['center'],
      },
      {
        id: 'n6',
        concept: 'HTTPS',
        status: 'partial',
        x: 50,
        y: 88,
        explanation:
          'HTTPにTLS/SSLによる暗号化を追加したプロトコルで、通信の安全性を確保します。',
        relatedTo: ['center'],
      },
      {
        id: 'n7',
        concept: 'べき等性',
        status: 'vague',
        x: 28,
        y: 8,
        explanation:
          '同じ操作を何度実行しても結果が変わらない性質で、GET、PUT、DELETEが持つ重要な特性です。',
        relatedTo: ['n1'],
      },
      {
        id: 'n8',
        concept: 'REST API',
        status: 'vague',
        x: 72,
        y: 8,
        explanation:
          'HTTPメソッドを活用したAPI設計の原則で、リソース指向のアーキテクチャです。',
        relatedTo: ['n1'],
      },
    ],
  };
  