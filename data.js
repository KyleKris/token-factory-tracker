// Token Factory Tracker - Data Layer
// Data sources: Epoch AI, The Information, SEC filings, Sacra, official pricing pages
// Last updated: 2026-04

const TOKEN_DATA = {
  meta: {
    lastUpdated: '2026-04',
    version: '1.0',
    currency: 'USD',
    pricingUnit: 'per 1M tokens'
  },

  sources: [
    { id: 'epoch-ai', label: 'Epoch AI Company Dataset', type: 'aggregated', url: 'epoch.ai/data/ai-companies' },
    { id: 'the-information', label: 'The Information', type: 'reported' },
    { id: 'bloomberg', label: 'Bloomberg', type: 'reported' },
    { id: 'sec-edgar', label: 'SEC EDGAR Filings', type: 'official' },
    { id: 'sacra', label: 'Sacra Research', type: 'reported' },
    { id: 'company-official', label: 'Company Official', type: 'official' },
    { id: 'reuters', label: 'Reuters', type: 'reported' },
    { id: 'ft', label: 'Financial Times', type: 'reported' },
    { id: 'cnbc', label: 'CNBC', type: 'reported' },
    { id: 'nyt', label: 'New York Times', type: 'reported' },
    { id: 'wsj', label: 'Wall Street Journal', type: 'reported' },
    { id: 'app-economy', label: 'App Economy Insights', type: 'reported' }
  ],

  companies: [
    // ============================================================
    // 1. OpenAI
    // ============================================================
    {
      id: 'openai',
      name: 'OpenAI',
      nameCN: 'OpenAI',
      country: 'US',
      tier: 1,
      role: 'ai-lab',
      color: '#10A37F',
      products: ['ChatGPT', 'GPT API', 'DALL-E', 'Sora', 'Codex'],

      revenue: {
        latestARR: 25e9,
        asOfDate: '2026-02',
        confidence: 'likely',
        sourceId: 'the-information',
        fullYear2025: 13e9,
        fullYear2024: 3.7e9,
        history: [
          { date: '2022-12', value: 28e6, type: 'full-year', confidence: 'likely' },
          { date: '2023-03', value: 200e6, type: 'arr', confidence: 'likely' },
          { date: '2023-08', value: 1e9, type: 'arr', confidence: 'likely' },
          { date: '2023-10', value: 1.3e9, type: 'arr', confidence: 'likely' },
          { date: '2023-12', value: 1.6e9, type: 'arr', confidence: 'confident' },
          { date: '2024-06', value: 3.4e9, type: 'arr', confidence: 'likely' },
          { date: '2024-09', value: 4e9, type: 'arr', confidence: 'likely' },
          { date: '2024-12', value: 5.5e9, type: 'arr', confidence: 'likely' },
          { date: '2025-06', value: 10e9, type: 'arr', confidence: 'likely' },
          { date: '2025-07', value: 12e9, type: 'arr', confidence: 'confident' },
          { date: '2025-08', value: 13e9, type: 'arr', confidence: 'likely' },
          { date: '2025-12', value: 21.4e9, type: 'arr', confidence: 'likely' },
          { date: '2026-02', value: 25e9, type: 'arr', confidence: 'likely' }
        ]
      },

      revenueMix: {
        asOfDate: '2025-07',
        sourceId: 'the-information',
        confidence: 'likely',
        totalAtTime: 12e9,
        segments: [
          { id: 'consumer', label: 'Consumer Subscriptions', labelCN: '消费者订阅', value: 5.5e9, pct: 45.8 },
          { id: 'api', label: 'API / Developer', labelCN: 'API/开发者', value: 2.9e9, pct: 24.2 },
          { id: 'enterprise', label: 'Enterprise & Partner', labelCN: '企业与合作', value: 3.6e9, pct: 30.0 }
        ]
      },

      pricing: [
        { model: 'GPT-5.4', tier: 'flagship', input: 2.50, output: 10.00, context: '256K' },
        { model: 'GPT-5.4-mini', tier: 'budget', input: 0.15, output: 0.60, context: '256K' },
        { model: 'GPT-5.4-nano', tier: 'nano', input: 0.10, output: 0.40, context: '1M' },
        { model: 'o4', tier: 'reasoning', input: 10.00, output: 40.00, context: '200K' },
        { model: 'o4-mini', tier: 'reasoning-lite', input: 1.10, output: 4.40, context: '200K' }
      ],

      users: {
        mau: 400e6,
        asOfDate: '2025-08',
        confidence: 'reported',
        details: 'ChatGPT 月活用户'
      },

      keyFacts: [
        'ChatGPT 于2022年11月发布，史上增长最快的消费级应用',
        '纯AI实验室中收入最高',
        '消费者订阅（ChatGPT Plus/Pro）为最大收入板块',
        '2025年转型为营利性公司'
      ]
    },

    // ============================================================
    // 2. Anthropic
    // ============================================================
    {
      id: 'anthropic',
      name: 'Anthropic',
      nameCN: 'Anthropic',
      country: 'US',
      tier: 1,
      role: 'ai-lab',
      color: '#D4A574',
      products: ['Claude', 'Claude API', 'Claude Code'],

      revenue: {
        latestARR: 30e9,
        asOfDate: '2026-04',
        confidence: 'confident',
        sourceId: 'company-official',
        fullYear2025: 4.5e9,
        fullYear2024: null,
        history: [
          { date: '2023-10', value: 100e6, type: 'arr', confidence: 'likely' },
          { date: '2024-01', value: 87e6, type: 'arr', confidence: 'confident' },
          { date: '2024-12', value: 1e9, type: 'arr', confidence: 'likely' },
          { date: '2025-03', value: 2e9, type: 'arr', confidence: 'confident' },
          { date: '2025-05', value: 3e9, type: 'arr', confidence: 'likely' },
          { date: '2025-07', value: 5e9, type: 'arr', confidence: 'likely' },
          { date: '2025-10', value: 7e9, type: 'arr', confidence: 'confident' },
          { date: '2025-11', value: 1e9, type: 'product-arr', confidence: 'confident', note: 'Claude Code only' },
          { date: '2025-12', value: 9e9, type: 'arr', confidence: 'likely' },
          { date: '2026-02', value: 14e9, type: 'arr', confidence: 'confident' },
          { date: '2026-03', value: 19e9, type: 'arr', confidence: 'confident' },
          { date: '2026-04', value: 30e9, type: 'arr', confidence: 'confident' }
        ]
      },

      revenueMix: {
        asOfDate: '2025-07',
        sourceId: 'the-information',
        confidence: 'likely',
        totalAtTime: 5e9,
        segments: [
          { id: 'consumer', label: 'Consumer Subscriptions', labelCN: '消费者订阅', value: 0.7e9, pct: 14.0 },
          { id: 'api', label: 'API / Developer', labelCN: 'API/开发者', value: 3.5e9, pct: 68.0, note: 'Includes Claude Code $0.4B, Cursor & Copilot ~$1.4B' },
          { id: 'enterprise', label: 'Enterprise & Partner', labelCN: '企业与合作', value: 0.9e9, pct: 18.0 }
        ],
        notes: 'API主导：Cursor和GitHub Copilot贡献约$1.4B，Claude Code在API板块中贡献$0.4B ARR'
      },

      pricing: [
        { model: 'Claude Opus 4.6', tier: 'flagship', input: 15.00, output: 75.00, context: '200K' },
        { model: 'Claude Sonnet 4.6', tier: 'mid', input: 3.00, output: 15.00, context: '200K' },
        { model: 'Claude Haiku 4.5', tier: 'budget', input: 0.80, output: 4.00, context: '200K' }
      ],

      users: {
        mau: null,
        asOfDate: '2026-04',
        confidence: 'estimated',
        details: '未公开披露；拥有大量开发者和企业用户'
      },

      keyFacts: [
        '2026年4月ARR超越OpenAI（$30B对$25B）',
        'API优先战略：62%收入来自API（OpenAI为24%）',
        'Claude Code 上线数月即达$1B ARR',
        'Cursor和GitHub Copilot是API收入的主要贡献者（约$1.4B）'
      ]
    },

    // ============================================================
    // 3. Google (Gemini)
    // ============================================================
    {
      id: 'google',
      name: 'Google',
      nameCN: '谷歌',
      country: 'US',
      tier: 1,
      role: 'hyperscaler',
      color: '#4285F4',
      products: ['Gemini', 'Gemini API', 'Google Cloud AI', 'Vertex AI'],

      revenue: {
        latestARR: 70e9,
        asOfDate: '2025-12',
        confidence: 'official',
        sourceId: 'sec-edgar',
        fullYear2025: null,
        fullYear2024: null,
        history: [
          { date: '2024-03', value: 36e9, type: 'cloud-arr', confidence: 'official', note: 'Google Cloud total' },
          { date: '2024-09', value: 46e9, type: 'cloud-arr', confidence: 'official', note: 'Google Cloud Q3 annualized' },
          { date: '2025-06', value: 60e9, type: 'cloud-arr', confidence: 'official', note: 'Google Cloud annualized' },
          { date: '2025-12', value: 70e9, type: 'cloud-arr', confidence: 'official', note: 'Google Cloud $70B+ ARR' }
        ],
        notes: 'Google Cloud total; AI-specific revenue not separately disclosed. Gemini subscriptions ~$1.2B in 2025.'
      },

      revenueMix: {
        asOfDate: '2025-12',
        sourceId: 'sec-edgar',
        confidence: 'estimated',
        totalAtTime: 70e9,
        segments: [
          { id: 'consumer', label: 'Gemini App/Subscriptions', labelCN: 'Gemini 应用/订阅', value: 1.2e9, pct: 1.7 },
          { id: 'api', label: 'Gemini API / Developer', labelCN: 'Gemini API/开发者', value: 18.8e9, pct: 26.9 },
          { id: 'enterprise', label: 'Cloud AI / Vertex AI', labelCN: '云AI/Vertex AI', value: 50e9, pct: 71.4 }
        ],
        notes: '云收入包含非AI业务；AI专项收入占比估计为30-40%'
      },

      pricing: [
        { model: 'Gemini 2.5 Pro', tier: 'flagship', input: 1.25, output: 10.00, context: '1M' },
        { model: 'Gemini 2.5 Flash', tier: 'mid', input: 0.15, output: 0.60, context: '1M' },
        { model: 'Gemini 2.0 Flash', tier: 'budget', input: 0.10, output: 0.40, context: '1M' }
      ],

      users: {
        mau: 750e6,
        asOfDate: '2025-12',
        confidence: 'reported',
        details: 'Gemini 应用月活用户；API于2026年1月处理了850亿次请求'
      },

      keyFacts: [
        'Gemini 于2025年Q4达到7.5亿月活',
        'Google Cloud AI生成式AI产品收入同比增长超200%',
        '70%的Google Cloud客户使用AI产品',
        'Gemini API仅2026年1月就处理了850亿次请求'
      ]
    },

    // ============================================================
    // 4. Microsoft (Azure AI / Copilot)
    // ============================================================
    {
      id: 'microsoft',
      name: 'Microsoft',
      nameCN: '微软',
      country: 'US',
      tier: 1,
      role: 'hyperscaler',
      color: '#00A4EF',
      products: ['Azure OpenAI', 'Copilot', 'GitHub Copilot'],

      revenue: {
        latestARR: 13e9,
        asOfDate: '2026-01',
        confidence: 'official',
        sourceId: 'sec-edgar',
        fullYear2025: null,
        fullYear2024: null,
        history: [
          { date: '2024-06', value: 5e9, type: 'ai-arr', confidence: 'reported', note: 'AI business run rate' },
          { date: '2024-12', value: 8e9, type: 'ai-arr', confidence: 'reported' },
          { date: '2025-06', value: 10e9, type: 'ai-arr', confidence: 'official' },
          { date: '2026-01', value: 13e9, type: 'ai-arr', confidence: 'official', note: 'AI revenue run rate, Q2 FY26' }
        ],
        notes: 'Azure AI contributed 19pp to Azure growth. Azure total >$75B ARR. Server segment $27.8B/quarter.'
      },

      revenueMix: {
        asOfDate: '2025-06',
        sourceId: 'app-economy',
        confidence: 'estimated',
        totalAtTime: 13e9,
        segments: [
          { id: 'consumer', label: 'Copilot Consumer', labelCN: 'Copilot 消费者', value: 1.3e9, pct: 10.0 },
          { id: 'api', label: 'API / Developer / Copilot', labelCN: 'API/开发者/Copilot', value: 3.9e9, pct: 30.0, note: 'Includes GitHub Copilot $2.6B + Azure AI API $1.3B' },
          { id: 'enterprise', label: 'Azure OpenAI Enterprise', labelCN: 'Azure OpenAI 企业', value: 7.8e9, pct: 60.0 }
        ],
        notes: 'Azure AI服务季度收入超$3B。GitHub Copilot是开发者工具收入的主要驱动力。'
      },

      pricing: [
        { model: 'GPT-5.4 (Azure)', tier: 'flagship', input: 2.50, output: 10.00, context: '256K' },
        { model: 'GPT-5.4-mini (Azure)', tier: 'budget', input: 0.15, output: 0.60, context: '256K' },
        { model: 'o4 (Azure)', tier: 'reasoning', input: 10.00, output: 40.00, context: '200K' }
      ],

      users: {
        mau: null,
        asOfDate: '2026-01',
        confidence: 'estimated',
        details: 'GitHub Copilot：1500万+开发者。Copilot：捆绑于M365。'
      },

      keyFacts: [
        'AI业务截至2026年1月达$13B年化收入',
        'Azure AI为Azure增长贡献了19个百分点',
        '服务器业务季度收入$27.8B（同比+27%）',
        'Microsoft Cloud总季度收入超$51B'
      ]
    },

    // ============================================================
    // 5. ByteDance (Doubao)
    // ============================================================
    {
      id: 'bytedance',
      name: 'ByteDance',
      nameCN: '字节跳动',
      country: 'CN',
      tier: 2,
      role: 'platform',
      color: '#325AB4',
      products: ['Doubao (豆包)', 'Seed 2.0', 'Doubao API', 'Volcano Engine'],

      revenue: {
        latestARR: null,
        asOfDate: '2025-12',
        confidence: 'estimated',
        sourceId: 'sacra',
        totalCompanyRevenue: 186e9,
        aiRevenue: null,
        fullYear2025: 186e9,
        fullYear2024: 155e9,
        history: [
          { date: '2023-12', value: 112e9, type: 'total-revenue', confidence: 'likely', note: 'Total ByteDance revenue' },
          { date: '2024-12', value: 155e9, type: 'total-revenue', confidence: 'likely' },
          { date: '2025-12', value: 186e9, type: 'total-revenue', confidence: 'likely' }
        ],
        notes: 'Total company revenue (mostly TikTok/Douyin ads). AI-specific revenue (Doubao) not separately disclosed. AI capex ~$23B in 2026.'
      },

      revenueMix: {
        asOfDate: '2025-12',
        sourceId: 'sacra',
        confidence: 'estimated',
        totalAtTime: null,
        segments: [
          { id: 'consumer', label: 'Doubao App', labelCN: '豆包App', value: null, pct: null },
          { id: 'api', label: 'Doubao API / Seed-Code', labelCN: '豆包API/代码', value: null, pct: null },
          { id: 'enterprise', label: 'Volcano Engine AI', labelCN: '火山引擎AI', value: null, pct: null }
        ],
        notes: 'AI收入构成未披露。公司总收入：广告约60%，直播约26%。'
      },

      pricing: [
        { model: 'Seed 2.0 Pro', tier: 'flagship', input: 0.55, output: 2.19, context: '128K', note: 'Converted from ¥ at 7.2' },
        { model: 'Seed 2.0 Lite', tier: 'mid', input: 0.28, output: 0.28, context: '128K' },
        { model: 'Doubao-Lite', tier: 'budget', input: 0.11, output: 0.11, context: '128K', note: '¥0.8/1M tokens' },
        { model: 'Doubao-Seed-Code', tier: 'code', input: 0.18, output: 0.18, context: '32K', note: '¥1.30/1M' }
      ],

      tokenOutput: {
        dailyTokens: 120e6,
        unit: 'million tokens',
        asOfDate: '2026-04',
        confidence: 'official',
        sourceId: 'company-official',
        notes: 'ByteDance official: 120万亿 tokens/day (120 trillion)'
      },

      users: {
        mau: 157e6,
        wau: 155e6,
        asOfDate: '2026-01',
        confidence: 'reported',
        details: '中国排名第一的AI应用。全球排名第四，仅次于ChatGPT和Gemini。40%的DeepSeek用户转向豆包。'
      },

      keyFacts: [
        '中国最受欢迎的AI聊天应用，月活1.57亿',
        '日Token产出：120万亿，官方公布',
        '2026年AI资本开支预算¥160B（约$23B），包括20,000块H200 GPU',
        'Seed 2.0系列模型（Pro/Lite/Code）于2026年发布',
        '2025年公司总收入$186B（同比+20%）'
      ]
    },

    // ============================================================
    // 6. xAI (Grok)
    // ============================================================
    {
      id: 'xai',
      name: 'xAI',
      nameCN: 'xAI',
      country: 'US',
      tier: 2,
      role: 'ai-lab',
      color: '#1DA1F2',
      products: ['Grok', 'SuperGrok', 'Grok API'],

      revenue: {
        latestARR: 2e9,
        asOfDate: '2026-04',
        confidence: 'likely',
        sourceId: 'bloomberg',
        fullYear2025: 350e6,
        fullYear2024: null,
        history: [
          { date: '2024-11', value: 100e6, type: 'arr', confidence: 'likely' },
          { date: '2025-03', value: 190e6, type: 'arr', confidence: 'likely', note: 'Average of $172-208M estimates' },
          { date: '2025-06', value: 236e6, type: 'quarterly-ann', confidence: 'likely' },
          { date: '2025-09', value: 428e6, type: 'quarterly-ann', confidence: 'likely' },
          { date: '2025-12', value: 500e6, type: 'arr', confidence: 'likely' },
          { date: '2026-04', value: 2e9, type: 'arr', confidence: 'likely', note: '2026 guidance' }
        ]
      },

      revenueMix: {
        asOfDate: '2025-12',
        sourceId: 'bloomberg',
        confidence: 'estimated',
        totalAtTime: 500e6,
        segments: [
          { id: 'consumer', label: 'SuperGrok Subscriptions', labelCN: 'SuperGrok 订阅', value: 250e6, pct: 50.0 },
          { id: 'api', label: 'Grok API', labelCN: 'Grok API', value: 100e6, pct: 20.0 },
          { id: 'enterprise', label: 'Government / DoD', labelCN: '政府/国防', value: 150e6, pct: 30.0 }
        ],
        notes: 'SuperGrok订阅$30-300/月。据报道获得$300M国防部合同。'
      },

      pricing: [
        { model: 'Grok-3', tier: 'flagship', input: 3.00, output: 15.00, context: '131K' },
        { model: 'Grok-3-mini', tier: 'reasoning', input: 0.30, output: 0.50, context: '131K' },
        { model: 'Grok-2', tier: 'mid', input: 2.00, output: 10.00, context: '131K' }
      ],

      users: {
        mau: null,
        asOfDate: '2025-12',
        confidence: 'estimated',
        details: '通过X（原Twitter）平台分发。SuperGrok订阅用户估计100-200万。'
      },

      keyFacts: [
        '在Memphis建造了Colossus 10万GPU集群',
        '预计2026年收入达$2B+',
        '获得$300M政府/国防部合同',
        '集成于X平台进行分发'
      ]
    },

    // ============================================================
    // 7. Mistral AI
    // ============================================================
    {
      id: 'mistral',
      name: 'Mistral AI',
      nameCN: 'Mistral AI',
      country: 'FR',
      tier: 2,
      role: 'ai-lab',
      color: '#FF7000',
      products: ['Le Chat', 'Mistral API', 'Mistral Models'],

      revenue: {
        latestARR: 400e6,
        asOfDate: '2026-01',
        confidence: 'likely',
        sourceId: 'ft',
        fullYear2025: null,
        fullYear2024: null,
        history: [
          { date: '2025-06', value: 100e6, type: 'arr', confidence: 'confident' },
          { date: '2025-09', value: 300e6, type: 'arr', confidence: 'likely' },
          { date: '2026-01', value: 400e6, type: 'arr', confidence: 'likely' }
        ],
        notes: 'Targeting €1B revenue by end of 2026. Revenue surged 20-fold.'
      },

      revenueMix: {
        asOfDate: '2026-01',
        sourceId: 'ft',
        confidence: 'estimated',
        totalAtTime: 400e6,
        segments: [
          { id: 'consumer', label: 'Le Chat Subscriptions', labelCN: 'Le Chat 订阅', value: 40e6, pct: 10.0 },
          { id: 'api', label: 'API / Developer', labelCN: 'API/开发者', value: 160e6, pct: 40.0 },
          { id: 'enterprise', label: 'Enterprise Contracts', labelCN: '企业合同', value: 200e6, pct: 50.0 }
        ]
      },

      pricing: [
        { model: 'Mistral Large', tier: 'flagship', input: 2.00, output: 6.00, context: '128K' },
        { model: 'Mistral Small', tier: 'budget', input: 0.10, output: 0.30, context: '32K' },
        { model: 'Codestral', tier: 'code', input: 0.30, output: 0.90, context: '256K' }
      ],

      users: {
        mau: null,
        asOfDate: '2026-01',
        confidence: 'estimated',
        details: 'Le Chat于2024年发布。在欧洲企业市场获得广泛采用。'
      },

      keyFacts: [
        '欧洲领先的AI公司，总部位于巴黎',
        '收入增长20倍，从约$20M到$400M ARR',
        '目标2026年底达€1B收入',
        '重点面向企业客户，尤其在欧洲市场'
      ]
    },

    // ============================================================
    // 8. DeepSeek
    // ============================================================
    {
      id: 'deepseek',
      name: 'DeepSeek',
      nameCN: '深度求索',
      country: 'CN',
      tier: 2,
      role: 'ai-lab',
      color: '#4A6CF7',
      products: ['DeepSeek Chat', 'DeepSeek API', 'DeepSeek Coder'],

      revenue: {
        latestARR: null,
        asOfDate: '2026-04',
        confidence: 'estimated',
        sourceId: 'bloomberg',
        fullYear2025: null,
        fullYear2024: null,
        history: [],
        notes: 'Revenue not publicly disclosed. Ultra-low pricing strategy suggests revenue is minimal relative to compute costs. Backed by quant fund High-Flyer.'
      },

      revenueMix: {
        asOfDate: '2026-04',
        sourceId: 'bloomberg',
        confidence: 'estimated',
        totalAtTime: null,
        segments: [
          { id: 'consumer', label: 'DeepSeek Chat App', labelCN: 'DeepSeek 聊天', value: null, pct: null },
          { id: 'api', label: 'DeepSeek API', labelCN: 'DeepSeek API', value: null, pct: null },
          { id: 'enterprise', label: 'Enterprise', labelCN: '企业', value: null, pct: null }
        ],
        notes: '以研究为主导。API定价旨在大规模推广，而非收入最大化。'
      },

      pricing: [
        { model: 'DeepSeek V3', tier: 'flagship', input: 0.27, output: 1.10, context: '128K' },
        { model: 'DeepSeek R1', tier: 'reasoning', input: 0.55, output: 2.19, context: '128K' }
      ],

      users: {
        wau: 81.6e6,
        asOfDate: '2026-01',
        confidence: 'reported',
        details: '中国第二大AI聊天应用。R1模型于2025年1月引发全球"DeepSeek震动"。'
      },

      keyFacts: [
        '以超高效训练颠覆行业（R1训练成本仅约$5.6M）',
        '定价比竞争对手便宜10-50倍',
        '由中国量化对冲基金幻方量化支持',
        'DeepSeek R1于2025年1月引发全球市场震动'
      ]
    },

    // ============================================================
    // 9. Meta (Llama)
    // ============================================================
    {
      id: 'meta',
      name: 'Meta',
      nameCN: 'Meta',
      country: 'US',
      tier: 2,
      role: 'hyperscaler',
      color: '#0668E1',
      products: ['Llama (Open Source)', 'Meta AI'],

      revenue: {
        latestARR: null,
        asOfDate: '2026-04',
        confidence: 'estimated',
        sourceId: 'sec-edgar',
        fullYear2025: null,
        fullYear2024: null,
        history: [],
        notes: 'Meta does not sell AI models directly. Llama is open-source. AI revenue embedded in advertising optimization and engagement. AI capex ~$60-65B in 2025.'
      },

      revenueMix: {
        asOfDate: '2025-12',
        sourceId: 'sec-edgar',
        confidence: 'estimated',
        totalAtTime: null,
        segments: [
          { id: 'consumer', label: 'Meta AI (embedded)', labelCN: 'Meta AI (嵌入)', value: null, pct: null },
          { id: 'api', label: 'N/A (Open Source)', labelCN: '无(开源)', value: null, pct: null },
          { id: 'enterprise', label: 'N/A', labelCN: '无', value: null, pct: null }
        ],
        notes: '开源模型战略。收入影响为间接的——AI驱动Facebook、Instagram、WhatsApp的广告优化和用户参与。'
      },

      pricing: [
        { model: 'Llama 4 Maverick', tier: 'flagship', input: 0.20, output: 0.20, context: '256K', note: 'Via Groq/Together, not Meta-hosted' },
        { model: 'Llama 4 Scout', tier: 'mid', input: 0.10, output: 0.10, context: '256K', note: 'Via third-party hosting' },
        { model: 'Llama 4 Behemoth', tier: 'large', input: 1.00, output: 1.00, context: '256K', note: 'Via third-party hosting' }
      ],

      users: {
        mau: null,
        asOfDate: '2026-04',
        confidence: 'estimated',
        details: 'Meta AI集成于Facebook、Instagram、WhatsApp（30亿+用户）。Llama下载量超10亿次。'
      },

      keyFacts: [
        'Llama模型采用开源战略——无直接Token收入',
        'Llama下载量超10亿次，最受欢迎的开源大模型',
        '2025年AI资本开支约$60-65B，全球最高之一',
        'AI收入嵌入广告业务中（总收入超$160B）'
      ]
    },

    // ============================================================
    // 10. Amazon (Bedrock)
    // ============================================================
    {
      id: 'amazon',
      name: 'Amazon',
      nameCN: '亚马逊',
      country: 'US',
      tier: 2,
      role: 'hyperscaler',
      color: '#FF9900',
      products: ['Amazon Bedrock', 'Nova Models', 'AWS AI Services'],

      revenue: {
        latestARR: null,
        asOfDate: '2026-04',
        confidence: 'estimated',
        sourceId: 'sec-edgar',
        fullYear2025: null,
        fullYear2024: null,
        history: [
          { date: '2025-06', value: 105e9, type: 'aws-arr', confidence: 'official', note: 'AWS total annualized' },
          { date: '2025-12', value: 115e9, type: 'aws-arr', confidence: 'official', note: 'AWS total annualized' }
        ],
        notes: 'AWS does not break out AI-specific revenue. Bedrock is fastest-growing AWS service. AWS total ~$115B ARR.'
      },

      revenueMix: {
        asOfDate: '2025-12',
        sourceId: 'sec-edgar',
        confidence: 'estimated',
        totalAtTime: null,
        segments: [
          { id: 'consumer', label: 'Alexa AI', labelCN: 'Alexa AI', value: null, pct: null },
          { id: 'api', label: 'Bedrock API / Q Developer', labelCN: 'Bedrock API/Q开发者', value: null, pct: null },
          { id: 'enterprise', label: 'Bedrock Enterprise', labelCN: 'Bedrock 企业', value: null, pct: null }
        ],
        notes: 'Bedrock提供Anthropic、Meta、Mistral模型接入。AWS中AI收入估计$5-8B。'
      },

      pricing: [
        { model: 'Nova Pro', tier: 'flagship', input: 0.80, output: 3.20, context: '300K' },
        { model: 'Nova Lite', tier: 'budget', input: 0.06, output: 0.24, context: '300K' },
        { model: 'Nova Micro', tier: 'micro', input: 0.035, output: 0.14, context: '128K' }
      ],

      users: {
        mau: null,
        asOfDate: '2026-04',
        confidence: 'estimated',
        details: 'Bedrock面向企业客户。AWS服务数百万客户。'
      },

      keyFacts: [
        'AWS Bedrock是多模型AI平台（Anthropic、Llama、Mistral）',
        '2024年底推出自研Nova模型系列',
        'AWS总收入约$115B ARR，AI专项收入未单独披露',
        '自研Trainium芯片实现低成本AI训练'
      ]
    },

    // ============================================================
    // 11. Baidu (ERNIE)
    // ============================================================
    {
      id: 'baidu',
      name: 'Baidu',
      nameCN: '百度',
      country: 'CN',
      tier: 3,
      role: 'platform',
      color: '#2932E1',
      products: ['ERNIE Bot (文心一言)', 'ERNIE API', 'Baidu Cloud'],

      revenue: {
        latestARR: null,
        asOfDate: '2025-12',
        confidence: 'estimated',
        sourceId: 'sec-edgar',
        totalCompanyRevenue: 19e9,
        fullYear2025: 19e9,
        fullYear2024: 18.3e9,
        history: [
          { date: '2024-12', value: 18.3e9, type: 'total-revenue', confidence: 'official' },
          { date: '2025-12', value: 19e9, type: 'total-revenue', confidence: 'official' }
        ],
        notes: 'Total company revenue. AI Cloud revenue is a growing segment but not separately disclosed at AI-model level.'
      },

      revenueMix: {
        asOfDate: '2025-12',
        sourceId: 'sec-edgar',
        confidence: 'estimated',
        totalAtTime: null,
        segments: [
          { id: 'consumer', label: 'ERNIE Bot', labelCN: '文心一言', value: null, pct: null },
          { id: 'api', label: 'ERNIE API', labelCN: 'ERNIE API', value: null, pct: null },
          { id: 'enterprise', label: 'Baidu AI Cloud', labelCN: '百度智能云', value: null, pct: null }
        ]
      },

      pricing: [
        { model: 'ERNIE 4.5', tier: 'flagship', input: 0.55, output: 2.19, context: '128K', note: 'Converted from ¥' },
        { model: 'ERNIE 4.5 Turbo', tier: 'mid', input: 0.14, output: 0.55, context: '128K' },
        { model: 'ERNIE Speed', tier: 'budget', input: 0.00, output: 0.00, context: '128K', note: 'Free tier' }
      ],

      users: {
        mau: null,
        asOfDate: '2025-12',
        confidence: 'estimated',
        details: '百度搜索月处理1200-1500亿次搜索请求。文心一言已集成至搜索。'
      },

      keyFacts: [
        '首家发布AI聊天机器人的中国大型科技公司（2023年3月）',
        '文心大模型深度集成于百度搜索',
        '提供免费版以对抗DeepSeek和豆包',
        'AI转型是从传统搜索转型的核心战略'
      ]
    },

    // ============================================================
    // 12. Alibaba (Qwen/Tongyi)
    // ============================================================
    {
      id: 'alibaba',
      name: 'Alibaba',
      nameCN: '阿里巴巴',
      country: 'CN',
      tier: 3,
      role: 'hyperscaler',
      color: '#FF6A00',
      products: ['Tongyi Qianwen (通义千问)', 'Qwen Models', 'Alibaba Cloud AI'],

      revenue: {
        latestARR: null,
        asOfDate: '2025-12',
        confidence: 'estimated',
        sourceId: 'sec-edgar',
        cloudRevenue: 16e9,
        fullYear2025: null,
        fullYear2024: null,
        history: [
          { date: '2024-12', value: 14e9, type: 'cloud-arr', confidence: 'official', note: 'Alibaba Cloud annual' },
          { date: '2025-12', value: 16e9, type: 'cloud-arr', confidence: 'official', note: 'Alibaba Cloud annual' }
        ],
        notes: 'Cloud revenue includes non-AI workloads. Qwen models are partially open-source. AI-specific revenue not disclosed.'
      },

      revenueMix: {
        asOfDate: '2025-12',
        sourceId: 'sec-edgar',
        confidence: 'estimated',
        totalAtTime: null,
        segments: [
          { id: 'consumer', label: 'Tongyi App', labelCN: '通义千问App', value: null, pct: null },
          { id: 'api', label: 'Qwen API', labelCN: 'Qwen API', value: null, pct: null },
          { id: 'enterprise', label: 'Alibaba Cloud AI', labelCN: '阿里云AI', value: null, pct: null }
        ]
      },

      pricing: [
        { model: 'Qwen-Max', tier: 'flagship', input: 1.37, output: 5.48, context: '128K', note: 'Converted from ¥' },
        { model: 'Qwen-Plus', tier: 'mid', input: 0.55, output: 2.19, context: '128K' },
        { model: 'Qwen-Turbo', tier: 'budget', input: 0.04, output: 0.14, context: '1M' }
      ],

      users: {
        mau: null,
        asOfDate: '2025-12',
        confidence: 'estimated',
        details: 'Qwen模型在中国广泛使用。Qwen开源系列在HuggingFace上热度高。'
      },

      keyFacts: [
        'Qwen系列是全球最受欢迎的开源模型家族之一',
        '阿里云是中国最大的云服务商',
        '大举投资AI：宣布3年内投入$53B用于云和AI基础设施',
        'Qwen-Turbo定价极具竞争力，仅$0.04/1M Token'
      ]
    },

    // ============================================================
    // 13. Zhipu AI (Z.ai / 智谱)
    // ============================================================
    {
      id: 'zhipu',
      name: 'Zhipu AI',
      nameCN: '智谱AI',
      country: 'CN',
      tier: 2,
      role: 'ai-lab',
      color: '#00BFA5',
      products: ['GLM Models', 'ChatGLM', 'Zhipu API', 'Claw (Code)'],

      revenue: {
        latestARR: 250e6,
        asOfDate: '2026-03',
        confidence: 'likely',
        sourceId: 'bloomberg',
        fullYear2025: 101e6,
        fullYear2024: null,
        history: [
          { date: '2024-06', value: 12.4e6, type: 'arr', confidence: 'likely', note: 'H1 2024 annualized, HKEX filing' },
          { date: '2024-10', value: 37.5e6, type: 'arr', confidence: 'likely' },
          { date: '2025-04', value: 53.3e6, type: 'arr', confidence: 'likely' },
          { date: '2025-12', value: 101e6, type: 'full-year', confidence: 'likely' },
          { date: '2026-03', value: 250e6, type: 'api-arr', confidence: 'likely', note: 'API ARR, up 60x YoY' }
        ],
        notes: 'IPO on HKEX Jan 2026, first Chinese LLM IPO. API ARR $250M as of Mar 2026, up 60x. Revenue jumped 325% in H1 2025.'
      },

      revenueMix: {
        asOfDate: '2026-03',
        sourceId: 'bloomberg',
        confidence: 'estimated',
        totalAtTime: 250e6,
        segments: [
          { id: 'consumer', label: 'ChatGLM / Claw', labelCN: '智谱清言/Claw', value: 50e6, pct: 20.0, note: 'Claw hit 400K users in 20 days' },
          { id: 'api', label: 'GLM API / Developer', labelCN: 'GLM API/开发者', value: 150e6, pct: 60.0 },
          { id: 'enterprise', label: 'Enterprise', labelCN: '企业', value: 50e6, pct: 20.0 }
        ]
      },

      pricing: [
        { model: 'GLM-4-Plus', tier: 'flagship', input: 0.69, output: 0.69, context: '128K', note: 'Converted from ¥5/1M tokens' },
        { model: 'GLM-4-Flash', tier: 'budget', input: 0.00, output: 0.00, context: '128K', note: 'Free tier' },
        { model: 'GLM-4.7', tier: 'code', input: 0.42, output: 0.42, context: '128K', note: '$3/mo coding plan' }
      ],

      users: {
        mau: null,
        asOfDate: '2026-03',
        confidence: 'reported',
        details: 'Claw订阅计划20天内达40万用户。发布前已有24.2万编程计划用户。'
      },

      keyFacts: [
        '首家上市的中国大模型公司（港交所，2026年1月）',
        'API ARR达$250M，12个月增长60倍',
        'GLM-4.7编程模型定价$3/月，竞品$200/月',
        '2025年上半年收入增长325%'
      ]
    },

    // ============================================================
    // 14. MiniMax
    // ============================================================
    {
      id: 'minimax',
      name: 'MiniMax',
      nameCN: 'MiniMax',
      country: 'CN',
      tier: 2,
      role: 'ai-lab',
      color: '#7C4DFF',
      products: ['Hailuo AI', 'MiniMax API', 'Talkie'],

      revenue: {
        latestARR: 79e6,
        asOfDate: '2025-12',
        confidence: 'likely',
        sourceId: 'bloomberg',
        fullYear2025: 79e6,
        fullYear2024: null,
        history: [
          { date: '2025-09', value: 70e6, type: 'arr', confidence: 'likely' },
          { date: '2025-12', value: 79e6, type: 'full-year', confidence: 'likely' }
        ],
        notes: 'IPO on HKEX Jan 2026, market cap $11.5B. Revenue in first 3 quarters rose 170% YoY. 70%+ revenue from overseas.'
      },

      revenueMix: {
        asOfDate: '2025-12',
        sourceId: 'bloomberg',
        confidence: 'estimated',
        totalAtTime: 79e6,
        segments: [
          { id: 'consumer', label: 'Talkie / Hailuo App', labelCN: 'Talkie/海螺App', value: 47e6, pct: 60.0, note: '70%+ revenue from overseas, mostly consumer' },
          { id: 'api', label: 'MiniMax API', labelCN: 'MiniMax API', value: 24e6, pct: 30.0 },
          { id: 'enterprise', label: 'Enterprise', labelCN: '企业', value: 8e6, pct: 10.0 }
        ],
        notes: '70%以上收入来自海外市场。用户覆盖200多个国家。'
      },

      pricing: [
        { model: 'MiniMax-Text-01', tier: 'flagship', input: 1.10, output: 4.40, context: '1M' },
        { model: 'abab6.5s', tier: 'mid', input: 0.14, output: 0.14, context: '245K' },
        { model: 'abab6.5t', tier: 'budget', input: 0.07, output: 0.07, context: '8K' }
      ],

      users: {
        mau: null,
        asOfDate: '2025-12',
        confidence: 'estimated',
        details: '用户覆盖200多个国家。Talkie（社交AI伴侣）是主要消费级产品。'
      },

      keyFacts: [
        '2026年1月港交所上市，首日股价飙升70%+，市值$11.5B',
        '超70%收入来自海外——在中国AI实验室中独树一帜',
        '海螺AI视频生成模型引发全球关注',
        '获米哈游、阿里巴巴、腾讯、高瓴资本投资'
      ]
    },

    // ============================================================
    // 15. Moonshot AI (Kimi)
    // ============================================================
    {
      id: 'moonshot',
      name: 'Moonshot AI',
      nameCN: '月之暗面',
      country: 'CN',
      tier: 2,
      role: 'ai-lab',
      color: '#FF6090',
      products: ['Kimi', 'Kimi API', 'Kimi K2.5'],

      revenue: {
        latestARR: 240e6,
        asOfDate: '2025-11',
        confidence: 'likely',
        sourceId: 'bloomberg',
        fullYear2025: 240e6,
        fullYear2024: null,
        history: [
          { date: '2025-11', value: 240e6, type: 'full-year', confidence: 'likely' }
        ],
        notes: 'K2.5 generated more revenue in 20 days than all of 2025. Became fastest decacorn in China. Seeking $18B valuation with $1B raise.'
      },

      revenueMix: {
        asOfDate: '2025-11',
        sourceId: 'bloomberg',
        confidence: 'estimated',
        totalAtTime: 240e6,
        segments: [
          { id: 'consumer', label: 'Kimi App', labelCN: 'Kimi App', value: 120e6, pct: 50.0 },
          { id: 'api', label: 'Kimi API / Developer', labelCN: 'Kimi API/开发者', value: 96e6, pct: 40.0 },
          { id: 'enterprise', label: 'Enterprise', labelCN: '企业', value: 24e6, pct: 10.0 }
        ],
        notes: '海外收入超过国内。月付费用户增长超170%。'
      },

      pricing: [
        { model: 'Kimi K2.5', tier: 'flagship', input: 0.83, output: 3.33, context: '128K', note: 'Converted from ¥' },
        { model: 'Moonshot-v1-8k', tier: 'budget', input: 0.14, output: 0.14, context: '8K' }
      ],

      users: {
        mau: null,
        asOfDate: '2026-02',
        confidence: 'reported',
        details: 'Kimi是中国头部AI聊天应用。月付费用户增长超170%。'
      },

      keyFacts: [
        'K2.5上线20天收入超过2025全年——爆发式增长',
        '中国史上最快达到百亿美元估值的公司（约2年）',
        '海外收入已超过国内收入',
        '累计融资超$1.77B，目标估值$18B'
      ]
    }
  ],

  // ============================================================
  // Segment definitions for consistent labeling
  // 3-segment framework: 2C / API & Developer / Enterprise & Platform
  // ============================================================
  segments: {
    consumer: { id: 'consumer', label: '2C', labelCN: '消费者', color: '#4FC3F7', icon: '👤' },
    api: { id: 'api', label: 'API/Dev', labelCN: 'API/开发者', color: '#FFB74D', icon: '⚡' },
    enterprise: { id: 'enterprise', label: 'Enterprise', labelCN: '企业/平台', color: '#81C784', icon: '🏢' }
  },

  // ============================================================
  // Helper: compute estimated token consumption from revenue + pricing
  // ============================================================
  computeTokenConsumption: function(company) {
    // If company has official token output data, use that
    if (company.tokenOutput && company.tokenOutput.dailyTokens) {
      return {
        dailyTokens: company.tokenOutput.dailyTokens,
        monthlyTokens: company.tokenOutput.dailyTokens * 30,
        yearlyTokens: company.tokenOutput.dailyTokens * 365,
        avgPricePerMToken: null,
        unit: 'million tokens',
        isOfficial: true,
        confidence: company.tokenOutput.confidence
      };
    }
    if (!company.revenue.latestARR || !company.pricing.length) return null;
    const flagship = company.pricing.find(p => p.tier === 'flagship');
    const budget = company.pricing.find(p => p.tier === 'budget' || p.tier === 'mid');
    if (!flagship) return null;
    // 80% budget/mid model, 20% flagship; 70% output, 30% input by revenue
    const avgPrice = budget
      ? (flagship.output * 0.2 + (budget.output || flagship.output) * 0.8) * 0.7 +
        (flagship.input * 0.2 + (budget.input || flagship.input) * 0.8) * 0.3
      : flagship.output * 0.7 + flagship.input * 0.3;
    const tokensPerYear = company.revenue.latestARR / avgPrice;
    return {
      dailyTokens: tokensPerYear / 365,
      monthlyTokens: tokensPerYear / 12,
      yearlyTokens: tokensPerYear,
      avgPricePerMToken: avgPrice,
      unit: 'million tokens',
      isOfficial: false,
      confidence: 'estimated'
    };
  }
};
