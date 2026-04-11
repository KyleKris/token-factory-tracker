# Token Factory Tracker — 数据溯源文档

> **用途**: 后台审核文档，用于逐条核实 `data.js` 中每个数据点的来源、原文引用和可信度  
> **最后更新**: 2026年4月  
> **维护说明**: 修改本文档后，通知开发者同步更新 `data.js` 和前端展示

---

## 目录

1. [方法论](#方法论)
2. [OpenAI](#1-openai)
3. [Anthropic](#2-anthropic)
4. [Google (Gemini)](#3-google-gemini)
5. [Microsoft (Azure AI / Copilot)](#4-microsoft-azure-ai--copilot)
6. [ByteDance (豆包)](#5-bytedance-豆包)
7. [xAI (Grok)](#6-xai-grok)
8. [Mistral AI](#7-mistral-ai)
9. [DeepSeek](#8-deepseek)
10. [Meta (Llama)](#9-meta-llama)
11. [Amazon (Bedrock)](#10-amazon-bedrock)
12. [Baidu (文心一言)](#11-baidu-文心一言)
13. [Alibaba (通义千问)](#12-alibaba-通义千问)
14. [Zhipu AI (智谱)](#13-zhipu-ai-智谱)
15. [MiniMax](#14-minimax)
16. [Moonshot AI (Kimi)](#15-moonshot-ai-kimi)
17. [待核实/存疑项汇总](#待核实存疑项汇总)

---

## 方法论

### Token消费量估算方法

本项目使用以下公式估算各公司日Token产出:

```
estimated_daily_tokens = annual_revenue / weighted_avg_price_per_token / 365
```

**加权平均价格假设**:
- 80%流量来自中低端/预算模型（mini/flash/lite等），20%来自旗舰模型
- 输出Token占总Token消耗的70%（输出权重更高，因为用户prompt通常较短）
- 加权公式: `weighted_price = 0.8 × budget_price × (0.3 × input + 0.7 × output) + 0.2 × flagship_price × (0.3 × input + 0.7 × output)`

**重要说明**: 如果公司有官方Token产出数据（如字节跳动的120万亿/日），直接使用官方数据而非估算。

### 收入结构拆分方法

本项目统一采用**三段式**收入结构:

| 板块 | 标签 | 典型来源 |
|------|------|---------|
| 消费者 (2C) | Consumer Subscriptions | ChatGPT Plus/Pro、Claude Pro、Gemini Advanced等订阅 |
| API/开发者 | API / Developer | 模型API调用收入（含Claude Code、Cursor间接贡献等） |
| 企业/平台 | Enterprise & Partner | 企业版部署、Azure OpenAI、大型合同等 |

### 数据来源列表

| 来源 | 类型 | 备注 |
|------|------|------|
| Epoch AI Company Dataset | 🟡 aggregated | 综合型AI公司数据集，CC-BY许可 |
| The Information | 🟡 reported | 科技行业深度报道，付费墙 |
| Bloomberg | 🟡 reported | 金融与科技报道 |
| SEC EDGAR Filings | 🟢 official | 美国上市公司官方财报 |
| Sacra Research | 🟡 reported | 私有公司收入分析 |
| Company Official | 🟢 official | 公司官方博客、新闻稿、财报电话会 |
| Reuters | 🟡 reported | 通讯社报道 |
| Financial Times | 🟡 reported | 金融时报报道 |
| CNBC | 🟡 reported | 财经媒体报道 |
| New York Times | 🟡 reported | 纽约时报报道 |
| Wall Street Journal | 🟡 reported | 华尔街日报报道 |
| App Economy Insights | 🟡 reported | 应用经济分析 |

**可信度指标说明**:
- 🟢 official: 公司财报、SEC文件、官方新闻稿——最高可信度
- 🟡 reported: 知名媒体引用消息源报道——中等可信度
- 🟠 estimated: 基于公开数据的分析师估算——需标注假设

---

## 1. OpenAI

**data.js中的值**: 梯队1 · ARR $25.0B · MAU 400M · 产品: ChatGPT, GPT API, DALL-E, Sora, Codex

### 1.1 收入数据

| 字段 | 值 | 可信度 | 来源 |
|------|-----|--------|------|
| 最新ARR | $25B | 🟡 reported | The Information, 2026年2月 |
| 2025全年收入 | $13B | 🟡 reported | The Information / Bloomberg |
| 2024全年收入 | $3.7B | 🟡 reported | The Information |

**收入历史轨迹核实**:

| 时间 | 类型 | data.js值 | 可信度 | 来源 |
|------|------|----------|--------|------|
| 2022-12 | 全年 | $28M | 🟡 likely | The Information |
| 2023-03 | ARR | $200M | 🟡 likely | The Information |
| 2023-08 | ARR | $1B | 🟡 likely | The Information |
| 2023-10 | ARR | $1.3B | 🟡 likely | The Information |
| 2023-12 | ARR | $1.6B | 🟡 confident | The Information |
| 2024-06 | ARR | $3.4B | 🟡 likely | The Information |
| 2024-09 | ARR | $4B | 🟡 likely | Bloomberg |
| 2024-12 | ARR | $5.5B | 🟡 likely | The Information |
| 2025-06 | ARR | $10B | 🟡 likely | The Information |
| 2025-07 | ARR | $12B | 🟡 confident | The Information |
| 2025-08 | ARR | $13B | 🟡 likely | CNBC |
| 2025-12 | ARR | $21.4B | 🟡 likely | The Information |
| 2026-02 | ARR | $25B | 🟡 likely | The Information |

**原始引用与来源**:

- "OpenAI hit $25 billion in annualized revenue in February 2026, up from $21.4 billion in December."
  - 来源: [The Information](https://www.theinformation.com/articles/openai-revenue-tracker) (付费)
  
- "OpenAI revenue hit $12.7 billion on an annualized basis, up from about $4 billion a year earlier."
  - 来源: [CNBC](https://www.cnbc.com/2025/08/06/openai-annualized-revenue-tops-12-billion.html)
  - 来源: [New York Times](https://www.nytimes.com/2025/08/06/technology/openai-revenue.html)

- "OpenAI generated $3.7 billion in revenue in 2024... expects to roughly quadruple that figure in 2025."
  - 来源: [The Information](https://www.theinformation.com/articles/openai-revenue-exceeds-3-4-billion)

> ⚠️ **审核要点**: OpenAI是私有公司，所有收入数据均来自媒体报道而非官方财报。ARR与实际收入之间的差距可能较大——ARR是当前月收入×12，不等于全年实际收入。2025全年实际收入$13B低于年底ARR $21.4B，说明下半年增速极快。

### 1.2 定价数据

| 模型 | 层级 | 输入价 | 输出价 | 上下文 | 来源 | 可信度 |
|------|------|--------|--------|--------|------|--------|
| GPT-5.4 | flagship | $2.50 | $10.00 | 256K | OpenAI定价页 | 🟢 official |
| GPT-5.4-mini | budget | $0.15 | $0.60 | 256K | OpenAI定价页 | 🟢 official |
| GPT-5.4-nano | nano | $0.10 | $0.40 | 1M | OpenAI定价页 | 🟢 official |
| o4 | reasoning | $10.00 | $40.00 | 200K | OpenAI定价页 | 🟢 official |
| o4-mini | reasoning-lite | $1.10 | $4.40 | 200K | OpenAI定价页 | 🟢 official |

**来源**: [OpenAI API Pricing](https://openai.com/api/pricing/)

> ⚠️ **审核要点**: OpenAI定价更新频繁。GPT-5.4系列为2026年新发布模型，价格需持续核实。o4系列为reasoning模型，使用模式与传统chat不同（包含内部思考token），实际成本可能远高于标价。

### 1.3 用户数据

| 字段 | 值 | 可信度 | 来源 |
|------|-----|--------|------|
| MAU | 400M | 🟡 reported | OpenAI官方声明, 2025年8月 |

**原始引用**:
- "OpenAI said ChatGPT now has 400 million weekly active users" — 注意此处有歧义：部分媒体报道为MAU，部分报道为WAU
  - 来源: [CNBC](https://www.cnbc.com/2025/08/14/openai-chatgpt-400-million-users.html)
  - 来源: [Reuters](https://www.reuters.com/technology/artificial-intelligence/openai-says-chatgpt-has-400-million-weekly-active-users-2025-08-14/)

> ⚠️ **审核要点**: data.js标注为MAU 400M，但2025年8月OpenAI CEO Sam Altman公开声明为"400 million weekly active users"。如果是**WAU**（而非MAU），则MAU可能更高（通常MAU > WAU）。需确认原始表述并统一口径。

### 1.4 收入结构

| 板块 | 金额 | 占比 | 可信度 | 来源 |
|------|------|------|--------|------|
| 消费者订阅 | $5.5B | 45.8% | 🟡 likely | The Information |
| API/开发者 | $2.9B | 24.2% | 🟡 likely | The Information |
| 企业与合作 | $3.6B | 30.0% | 🟡 likely | The Information |

**基准时间**: 2025年7月，总ARR $12B

**原始引用**:
- "OpenAI's consumer subscription business — ChatGPT Plus and Pro — accounts for roughly 46% of revenue... API revenue makes up about a quarter, with enterprise partnerships contributing the rest."
  - 来源: [The Information](https://www.theinformation.com/articles/openai-revenue-breakdown-2025)

> ⚠️ **审核要点**: 收入结构基准为2025年7月（$12B ARR时），到2026年2月（$25B ARR时）结构可能已显著变化。特别是企业板块增长可能更快。此外，ChatGPT Plus $20/月 → Pro $200/月的推出可能改变消费者板块ARPU。

### 1.5 关键事实核实

| keyFact | 核实状态 | 来源 |
|---------|---------|------|
| "ChatGPT 于2022年11月发布，史上增长最快的消费级应用" | ✅ 已确认 | 多方来源 |
| "纯AI实验室中收入最高" | ⚠️ 截至2026年4月，**Anthropic ARR已超越OpenAI**（$30B vs $25B） | The Information |
| "消费者订阅为最大收入板块" | ✅ 基于2025年7月数据 | The Information |
| "2025年转型为营利性公司" | ✅ 已确认，2025年宣布 | [OpenAI Blog](https://openai.com/index/evolving-our-structure/) |

> ⚠️ **审核要点**: "纯AI实验室中收入最高"这一事实需要更新——截至2026年4月，Anthropic的ARR $30B已超过OpenAI的$25B。建议修改keyFact为"曾为纯AI实验室中收入最高，2026年被Anthropic超越"。

---

## 2. Anthropic

**data.js中的值**: 梯队1 · ARR $30.0B · 产品: Claude, Claude API, Claude Code

### 2.1 收入数据

| 字段 | 值 | 可信度 | 来源 |
|------|-----|--------|------|
| 最新ARR | $30B | 🟡 confident | 公司官方, 2026年4月 |
| 2025全年收入 | $4.5B | 🟡 confident | Sacra / The Information |
| 2024全年收入 | 未披露 | — | — |

**收入历史轨迹核实**:

| 时间 | 类型 | data.js值 | 可信度 | 来源 |
|------|------|----------|--------|------|
| 2023-10 | ARR | $100M | 🟡 likely | The Information |
| 2024-01 | ARR | $87M | 🟡 confident | Sacra |
| 2024-12 | ARR | $1B | 🟡 likely | The Information |
| 2025-03 | ARR | $2B | 🟡 confident | The Information |
| 2025-05 | ARR | $3B | 🟡 likely | Bloomberg |
| 2025-07 | ARR | $5B | 🟡 likely | The Information |
| 2025-10 | ARR | $7B | 🟡 confident | Anthropic官方 |
| 2025-11 | 产品ARR | $1B (Claude Code) | 🟡 confident | Anthropic官方 |
| 2025-12 | ARR | $9B | 🟡 likely | The Information |
| 2026-02 | ARR | $14B | 🟡 confident | Sacra |
| 2026-03 | ARR | $19B | 🟡 confident | Sacra |
| 2026-04 | ARR | $30B | 🟡 confident | 公司官方 |

**原始引用与来源**:

- "Anthropic's annualized revenue run rate surpassed $30 billion in April 2026, making it the highest-revenue pure-play AI lab."
  - 来源: [Sacra](https://sacra.com/c/anthropic/)

- "Claude Code, Anthropic's agentic coding tool launched in late 2025, hit $1 billion in annualized revenue within months of launch."
  - 来源: [The Information](https://www.theinformation.com/articles/anthropic-claude-code-revenue)

- "Anthropic's revenue has grown roughly 30x in the 12 months from April 2025 to April 2026."
  - 来源: [Sacra](https://sacra.com/c/anthropic/)

> ⚠️ **审核要点**: Anthropic从$1B ARR（2024年底）到$30B ARR（2026年4月）的增长轨迹极为陡峭——约16个月增长30倍。虽然有多个媒体引用，但如此高速增长需要关注：(1) ARR是否基于短期峰值月份而非持续水平；(2) Claude Code的$1B ARR是否包含一次性大合同；(3) 来自Cursor/GitHub Copilot的API收入是否有批量折扣。

### 2.2 定价数据

| 模型 | 层级 | 输入价 | 输出价 | 上下文 | 来源 | 可信度 |
|------|------|--------|--------|--------|------|--------|
| Claude Opus 4.6 | flagship | $15.00 | $75.00 | 200K | Anthropic定价页 | 🟢 official |
| Claude Sonnet 4.6 | mid | $3.00 | $15.00 | 200K | Anthropic定价页 | 🟢 official |
| Claude Haiku 4.5 | budget | $0.80 | $4.00 | 200K | Anthropic定价页 | 🟢 official |

**来源**: [Anthropic API Pricing](https://www.anthropic.com/pricing)

> ⚠️ **审核要点**: Anthropic的定价显著高于竞争对手（Opus 4.6输出$75/1M Token vs GPT-5.4输出$10/1M Token）。这意味着同等收入下Anthropic的Token产出量会远低于OpenAI。Haiku 4.5作为"budget"模型价格也高于OpenAI的mini系列。此外，大客户（如Cursor、GitHub）可能享有大幅批量折扣，实际价格可能远低于标价。

### 2.3 用户数据

| 字段 | 值 | 可信度 | 来源 |
|------|-----|--------|------|
| MAU | 未披露 | 🟠 estimated | — |

> ⚠️ **审核要点**: Anthropic未公开披露MAU/WAU数据。其收入主要来自API（而非消费者订阅），因此MAU可能并非核心指标。开发者和企业用户数量可能更有意义但同样未披露。

### 2.4 收入结构

| 板块 | 金额 | 占比 | 可信度 | 来源 |
|------|------|------|--------|------|
| 消费者订阅 | $0.7B | 14.0% | 🟡 likely | The Information |
| API/开发者 | $3.5B | 68.0% | 🟡 likely | The Information |
| 企业与合作 | $0.9B | 18.0% | 🟡 likely | The Information |

**基准时间**: 2025年7月，总ARR $5B

**备注**: API板块详细构成:
- Claude Code贡献约$0.4B ARR
- Cursor和GitHub Copilot间接贡献约$1.4B ARR
- 其余为直接API调用

**原始引用**:
- "Anthropic's API-first strategy means roughly 68% of its revenue comes from developer and API channels, compared to OpenAI's 24%. Cursor and GitHub Copilot are among the largest API customers."
  - 来源: [The Information](https://www.theinformation.com/articles/anthropic-revenue-structure-api-first)

> ⚠️ **审核要点**: 收入结构基准为2025年7月（$5B ARR时）。到2026年4月（$30B ARR时），Claude Code的爆发式增长可能进一步提高API板块占比。需注意Cursor/Copilot的贡献依赖于这些平台的用户增长，存在集中度风险。

### 2.5 关键事实核实

| keyFact | 核实状态 | 来源 |
|---------|---------|------|
| "2026年4月ARR超越OpenAI（$30B对$25B）" | ✅ 已确认 | Sacra, The Information |
| "API优先战略：62%收入来自API（OpenAI为24%）" | ⚠️ 62%与上方68%有出入，需统一 | The Information |
| "Claude Code上线数月即达$1B ARR" | ✅ 已确认 | Anthropic官方 |
| "Cursor和GitHub Copilot是API收入的主要贡献者（约$1.4B）" | 🟡 reported | The Information |

> ⚠️ **审核要点**: keyFact中API占比写的是62%，但revenueMix数据显示68%，两个数字需统一。建议确认最新来源后取一个一致数字。

---

## 3. Google (Gemini)

**data.js中的值**: 梯队1 · ARR $70.0B (Cloud) · MAU 750M · 产品: Gemini, Gemini API, Google Cloud AI, Vertex AI

### 3.1 收入数据

| 字段 | 值 | 可信度 | 来源 |
|------|-----|--------|------|
| 最新ARR | $70B (Google Cloud整体) | 🟢 official | SEC EDGAR, 2025 Q4 |
| Gemini订阅收入 | ~$1.2B (2025) | 🟠 estimated | 分析师估算 |

**收入历史轨迹核实**:

| 时间 | 类型 | data.js值 | 可信度 | 来源 |
|------|------|----------|--------|------|
| 2024-03 | Cloud ARR | $36B | 🟢 official | Alphabet 10-K |
| 2024-09 | Cloud ARR | $46B (Q3年化) | 🟢 official | Alphabet Q3 2024 |
| 2025-06 | Cloud ARR | $60B (年化) | 🟢 official | Alphabet Q2 2025 |
| 2025-12 | Cloud ARR | $70B+ | 🟢 official | Alphabet Q4 2025 |

**原始引用与来源**:

- "Google Cloud revenue reached $70 billion on an annualized basis in Q4 2025, driven by strong demand for AI workloads and Vertex AI."
  - 来源: [Alphabet Q4 2025 Earnings](https://abc.xyz/investor/)
  - 来源: [CNBC](https://www.cnbc.com/2026/02/04/alphabet-resets-the-bar-for-ai-infrastructure-spending.html)

- "Google Cloud's generative AI products revenue grew more than 200% year-over-year."
  - 来源: [Alphabet Q4 2025 Earnings Call Transcript](https://seekingalpha.com/article/alphabet-q4-2025-earnings)

> ⚠️ **审核要点**: data.js使用$70B作为"收入"，但这是**Google Cloud整体**ARR，包含大量非AI业务（IaaS、PaaS、SaaS等）。AI专项收入未单独披露，分析师估计AI占Cloud收入的30-40%（约$21-28B）。如果仅看AI Token业务，数字可能更低。Gemini消费者订阅约$1.2B仅为很小一部分。建议在data.js中明确标注"Cloud total, AI not separately disclosed"。

### 3.2 定价数据

| 模型 | 层级 | 输入价 | 输出价 | 上下文 | 来源 | 可信度 |
|------|------|--------|--------|--------|------|--------|
| Gemini 2.5 Pro | flagship | $1.25 | $10.00 | 1M | Google AI定价页 | 🟢 official |
| Gemini 2.5 Flash | mid | $0.15 | $0.60 | 1M | Google AI定价页 | 🟢 official |
| Gemini 2.0 Flash | budget | $0.10 | $0.40 | 1M | Google AI定价页 | 🟢 official |

**来源**: [Google AI Studio Pricing](https://ai.google.dev/pricing)

> ⚠️ **审核要点**: Google的定价竞争力极强——Gemini 2.5 Pro的输入价($1.25/1M)仅为GPT-5.4($2.50)的一半，且支持1M上下文窗口。Flash系列与OpenAI mini系列价格一致。超长上下文（1M token）的实际成本可能因缓存等机制而与标价不同。

### 3.3 用户数据

| 字段 | 值 | 可信度 | 来源 |
|------|-----|--------|------|
| MAU | 750M | 🟡 reported | Google官方声明, 2025年12月 |
| API请求量 | 850亿次/月 (2026年1月) | 🟡 reported | Google I/O |

**原始引用**:
- "Gemini surpassed 750 million monthly active users in Q4 2025."
  - 来源: [Google Blog](https://blog.google/products/gemini/gemini-2025-year-in-review/)

- "Gemini API processed 85 billion requests in January 2026 alone."
  - 来源: [Google Cloud Blog](https://cloud.google.com/blog/products/ai-machine-learning/gemini-api-usage-2026)

> ⚠️ **审核要点**: 750M MAU可能包含Gemini在Google搜索、Gmail、Google Docs等产品中的嵌入式使用，而非独立App用户。如果包含被动触及用户，与ChatGPT的400M MAU（纯主动使用）不可直接比较。

### 3.4 收入结构

| 板块 | 金额 | 占比 | 可信度 | 来源 |
|------|------|------|--------|------|
| Gemini 应用/订阅 | $1.2B | 1.7% | 🟠 estimated | 分析师估算 |
| Gemini API/开发者 | $18.8B | 26.9% | 🟠 estimated | 分析师估算 |
| 云AI/Vertex AI | $50.0B | 71.4% | 🟠 estimated | 分析师估算 |

**基准时间**: 2025年12月，总Cloud ARR $70B

> ⚠️ **审核要点**: 此收入结构为分析师估算，可信度低。Google不单独披露AI收入，$70B中大部分为传统云业务。"云AI/Vertex AI $50B"这一数字尤其可疑——如果Google Cloud AI收入真有$50B，将使其成为全球最大的AI服务提供商。实际AI Token业务收入可能在$10-15B范围。建议降低此估算或增加不确定性标注。

### 3.5 关键事实核实

| keyFact | 核实状态 | 来源 |
|---------|---------|------|
| "Gemini 于2025年Q4达到7.5亿月活" | ✅ 已确认 | Google官方 |
| "Google Cloud AI生成式AI产品收入同比增长超200%" | ✅ 已确认 | Alphabet Q4 2025 Earnings |
| "70%的Google Cloud客户使用AI产品" | 🟡 reported | Google Cloud Next 2025 |
| "Gemini API仅2026年1月就处理了850亿次请求" | 🟡 reported | Google官方声明 |

---

## 4. Microsoft (Azure AI / Copilot)

**data.js中的值**: 梯队1 · ARR $13.0B (AI) · 产品: Azure OpenAI, Copilot, GitHub Copilot

### 4.1 收入数据

| 字段 | 值 | 可信度 | 来源 |
|------|-----|--------|------|
| AI业务ARR | $13B | 🟢 official | SEC EDGAR, FY26 Q2 (2026年1月) |

**收入历史轨迹核实**:

| 时间 | 类型 | data.js值 | 可信度 | 来源 |
|------|------|----------|--------|------|
| 2024-06 | AI ARR | $5B | 🟡 reported | Microsoft Earnings Call |
| 2024-12 | AI ARR | $8B | 🟡 reported | Bloomberg |
| 2025-06 | AI ARR | $10B | 🟢 official | Microsoft FY25 Q4 |
| 2026-01 | AI ARR | $13B | 🟢 official | Microsoft FY26 Q2 |

**原始引用与来源**:

- "Microsoft reported that its AI business has surpassed a $13 billion annual revenue run rate, up from $10 billion six months ago."
  - 来源: [Microsoft FY26 Q2 Earnings](https://www.microsoft.com/en-us/Investor/earnings/FY-2026-Q2/)
  - 来源: [CNBC](https://www.cnbc.com/2026/01/29/microsoft-earnings-fy26-q2.html)

- "Azure AI contributed 19 percentage points to Azure growth in Q2 FY26."
  - 来源: [Microsoft Earnings Call Transcript](https://www.microsoft.com/en-us/Investor/earnings/)

> ⚠️ **审核要点**: Microsoft的"AI revenue run rate"定义较模糊——可能包含Azure OpenAI Service、Copilot系列、GitHub Copilot、Azure AI Services等多个产品。与OpenAI/Anthropic的纯Token销售收入不可直接比较。此外，注意Microsoft财年截止6月底（FY2026 Q2 = 2025年10月-2026年1月）。

### 4.2 定价数据

| 模型 | 层级 | 输入价 | 输出价 | 上下文 | 来源 | 可信度 |
|------|------|--------|--------|--------|------|--------|
| GPT-5.4 (Azure) | flagship | $2.50 | $10.00 | 256K | Azure定价页 | 🟢 official |
| GPT-5.4-mini (Azure) | budget | $0.15 | $0.60 | 256K | Azure定价页 | 🟢 official |
| o4 (Azure) | reasoning | $10.00 | $40.00 | 200K | Azure定价页 | 🟢 official |

**来源**: [Azure OpenAI Service Pricing](https://azure.microsoft.com/en-us/pricing/details/cognitive-services/openai-service/)

> ⚠️ **审核要点**: Azure OpenAI定价与OpenAI直接API定价一致，但Azure企业客户可能通过Enterprise Agreement获得折扣。此外Azure提供"Provisioned Throughput"模式（按预留容量计费），价格结构不同。

### 4.3 用户数据

| 字段 | 值 | 可信度 | 来源 |
|------|-----|--------|------|
| GitHub Copilot开发者 | 1500万+ | 🟡 reported | Microsoft Earnings Call |
| Copilot MAU | 未披露（捆绑M365） | 🟠 estimated | — |

**原始引用**:
- "GitHub Copilot now has more than 15 million developers, making it the most widely adopted AI developer tool in the world."
  - 来源: [GitHub Blog](https://github.blog/news-insights/product-news/github-copilot-15-million/)

### 4.4 收入结构

| 板块 | 金额 | 占比 | 可信度 | 来源 |
|------|------|------|--------|------|
| Copilot 消费者 | $1.3B | 10.0% | 🟠 estimated | App Economy Insights |
| API/开发者/Copilot | $3.9B | 30.0% | 🟠 estimated | App Economy Insights |
| Azure OpenAI 企业 | $7.8B | 60.0% | 🟠 estimated | App Economy Insights |

**基准时间**: 2025年6月，总AI ARR $13B

**备注**: API板块包含GitHub Copilot ~$2.6B + Azure AI API ~$1.3B

**原始引用**:
- "Azure OpenAI Service quarterly revenue exceeded $3 billion... GitHub Copilot is the primary driver of developer tools revenue."
  - 来源: [App Economy Insights](https://www.appeconomyinsights.com/microsoft-ai-revenue-2025/)

> ⚠️ **审核要点**: 收入结构为App Economy Insights估算，并非官方数据。60%企业占比合理（Azure大客户合同），但GitHub Copilot $2.6B的估算需独立核实。Microsoft Cloud总季度收入超$51B，AI的$13B ARR仅占约6.4%。

### 4.5 关键事实核实

| keyFact | 核实状态 | 来源 |
|---------|---------|------|
| "AI业务截至2026年1月达$13B年化收入" | ✅ 已确认 | Microsoft Earnings |
| "Azure AI为Azure增长贡献了19个百分点" | ✅ 已确认 | Microsoft Earnings Call |
| "服务器业务季度收入$27.8B（同比+27%）" | ✅ 已确认 | Microsoft FY26 Q2 |
| "Microsoft Cloud总季度收入超$51B" | ✅ 已确认 | Microsoft Earnings Release |

---

## 5. ByteDance (豆包)

**data.js中的值**: 梯队2 · 总收入 $186B · MAU 157M · WAU 155M · 产品: Doubao (豆包), Seed 2.0, Doubao API, Volcano Engine

### 5.1 收入数据

| 字段 | 值 | 可信度 | 来源 |
|------|-----|--------|------|
| 公司总收入 (2025) | $186B | 🟡 likely | Sacra |
| 公司总收入 (2024) | $155B | 🟡 likely | Sacra |
| AI专项收入 | 未披露 | — | — |

**收入历史轨迹核实**:

| 时间 | 类型 | data.js值 | 可信度 | 来源 |
|------|------|----------|--------|------|
| 2023-12 | 总收入 | $112B | 🟡 likely | Bloomberg |
| 2024-12 | 总收入 | $155B | 🟡 likely | Bloomberg |
| 2025-12 | 总收入 | $186B | 🟡 likely | Sacra |

**原始引用与来源**:

- "ByteDance's total revenue reached approximately $186 billion in 2025, a 20% increase from 2024's $155 billion."
  - 来源: [Sacra](https://sacra.com/c/bytedance/)
  - 来源: [Bloomberg](https://www.bloomberg.com/news/articles/2026-02-10/bytedance-revenue-growth)

> ⚠️ **审核要点**: 字节跳动是私有公司，所有收入数据为媒体估算。$186B为**公司总收入**（主要来自TikTok/抖音广告和直播），AI专项收入（豆包App、Doubao API等）未单独披露。data.js中将总收入作为revenue指标可能误导——与其他公司的AI专项收入不可直接比较。建议增加注释说明。

### 5.2 定价数据

| 模型 | 层级 | 输入价 | 输出价 | 上下文 | 来源 | 可信度 |
|------|------|--------|--------|--------|------|--------|
| Seed 2.0 Pro | flagship | $0.55 | $2.19 | 128K | 火山引擎定价页 (¥换算) | 🟢 official |
| Seed 2.0 Lite | mid | $0.28 | $0.28 | 128K | 火山引擎定价页 | 🟢 official |
| Doubao-Lite | budget | $0.11 | $0.11 | 128K | 火山引擎定价页 (¥0.8/1M) | 🟢 official |
| Doubao-Seed-Code | code | $0.18 | $0.18 | 32K | 火山引擎定价页 (¥1.30/1M) | 🟢 official |

**来源**: [火山引擎-豆包大模型定价](https://www.volcengine.com/product/doubao)

> ⚠️ **审核要点**: 人民币价格按7.2汇率换算为美元。实际汇率波动可能影响价格对比。字节跳动的定价极具竞争力——Doubao-Lite的$0.11/1M Token远低于GPT-5.4-mini的$0.15。这种低价策略可能说明字节跳动在以补贴方式争夺市场份额。

### 5.3 Token产出数据

| 字段 | 值 | 可信度 | 来源 |
|------|-----|--------|------|
| 日Token产出 | 120万亿 (120T) | 🟢 official | 字节跳动官方 |

**原始引用**:
- "字节跳动官方公布豆包大模型日Token产出量达120万亿。"
  - 来源: [字节跳动官方声明](https://www.volcengine.com/product/doubao) (2026年4月)

> ⚠️ **审核要点**: 这是极少数有官方Token产出数据的公司之一。120万亿tokens/day = 120 trillion tokens/day，需确认这一数字是否包含内部使用（如抖音推荐系统、字节内部工具等），还是仅外部API + 豆包App。如果包含内部使用，与其他公司的纯外部Token销售不可比。

### 5.4 用户数据

| 字段 | 值 | 可信度 | 来源 |
|------|-----|--------|------|
| MAU | 157M | 🟡 reported | QuestMobile / 行业数据, 2026年1月 |
| WAU | 155M | 🟡 reported | QuestMobile, 2026年1月 |

**原始引用**:
- "豆包连续多月蝉联中国AI应用月活榜首，2026年1月MAU达1.57亿。"
  - 来源: [QuestMobile 2026年1月AI应用报告](https://www.questmobile.com.cn/)

- "约40%的DeepSeek用户已转向豆包。"
  - 来源: [36氪](https://36kr.com/)

> ⚠️ **审核要点**: WAU 155M与MAU 157M极为接近（WAU/MAU比率约98.7%），这意味着几乎所有月活用户每周都在使用。如此高的留存率在应用中罕见，需确认数据来源是否可靠。通常WAU/MAU比率在60-80%较为合理。

### 5.5 收入结构

| 板块 | 金额 | 占比 | 可信度 | 来源 |
|------|------|------|--------|------|
| 豆包App | 未披露 | — | — | — |
| 豆包API/代码 | 未披露 | — | — | — |
| 火山引擎AI | 未披露 | — | — | — |

**备注**: AI收入构成未披露。公司总收入中广告约60%、直播约26%，AI相关业务占比不详。

### 5.6 关键事实核实

| keyFact | 核实状态 | 来源 |
|---------|---------|------|
| "中国最受欢迎的AI聊天应用，月活1.57亿" | ✅ 已确认 | QuestMobile |
| "日Token产出：120万亿，官方公布" | ✅ 已确认 | 字节跳动官方 |
| "2026年AI资本开支预算¥160B（约$23B），包括20,000块H200 GPU" | ✅ 已确认 | [TrendForce](https://www.trendforce.com/news/2025/12/23/news-bytedance-reportedly-to-boost-2026-ai-spend-to-23b-plans-preliminary-20k-h200-chips-order) |
| "Seed 2.0系列模型于2026年发布" | ✅ 已确认 | 火山引擎官方 |
| "2025年公司总收入$186B（同比+20%）" | 🟡 reported | Sacra |

---

## 6. xAI (Grok)

**data.js中的值**: 梯队2 · ARR $2.0B · 产品: Grok, SuperGrok, Grok API

### 6.1 收入数据

| 字段 | 值 | 可信度 | 来源 |
|------|-----|--------|------|
| 最新ARR | $2B (2026指引) | 🟡 likely | Bloomberg |
| 2025全年收入 | $350M | 🟡 likely | Bloomberg |

**收入历史轨迹核实**:

| 时间 | 类型 | data.js值 | 可信度 | 来源 |
|------|------|----------|--------|------|
| 2024-11 | ARR | $100M | 🟡 likely | The Information |
| 2025-03 | ARR | $190M (估算均值) | 🟡 likely | Bloomberg |
| 2025-06 | 季度年化 | $236M | 🟡 likely | Bloomberg |
| 2025-09 | 季度年化 | $428M | 🟡 likely | Bloomberg |
| 2025-12 | ARR | $500M | 🟡 likely | Bloomberg |
| 2026-04 | ARR | $2B (指引) | 🟡 likely | Bloomberg |

**原始引用与来源**:

- "xAI is targeting $2 billion in revenue for 2026, up from roughly $350 million in 2025."
  - 来源: [Bloomberg](https://www.bloomberg.com/news/articles/2026-01-15/xai-revenue-target)

- "xAI generated approximately $100 million in annualized revenue by November 2024."
  - 来源: [The Information](https://www.theinformation.com/articles/xai-revenue)

> ⚠️ **审核要点**: $2B为2026年**指引/目标**，非实际已达到数字。data.js将其标为2026-04 ARR可能误导。实际2025年全年收入仅$350M，从$350M跳至$2B意味着约5.7倍增长。需关注SuperGrok订阅增长和政府合同的落地情况。

### 6.2 定价数据

| 模型 | 层级 | 输入价 | 输出价 | 上下文 | 来源 | 可信度 |
|------|------|--------|--------|--------|------|--------|
| Grok-3 | flagship | $3.00 | $15.00 | 131K | xAI定价页 | 🟢 official |
| Grok-3-mini | reasoning | $0.30 | $0.50 | 131K | xAI定价页 | 🟢 official |
| Grok-2 | mid | $2.00 | $10.00 | 131K | xAI定价页 | 🟢 official |

**来源**: [xAI API Pricing](https://docs.x.ai/docs/pricing)

### 6.3 用户数据

| 字段 | 值 | 可信度 | 来源 |
|------|-----|--------|------|
| SuperGrok订阅用户 | 100-200万 (估计) | 🟠 estimated | 分析师估算 |
| MAU | 未披露 | — | — |

> ⚠️ **审核要点**: xAI通过X平台（原Twitter）分发Grok，MAU难以独立衡量。SuperGrok订阅用户数为估算，无官方数据。

### 6.4 收入结构

| 板块 | 金额 | 占比 | 可信度 | 来源 |
|------|------|------|--------|------|
| SuperGrok 订阅 | $250M | 50.0% | 🟠 estimated | Bloomberg |
| Grok API | $100M | 20.0% | 🟠 estimated | Bloomberg |
| 政府/国防 | $150M | 30.0% | 🟠 estimated | Bloomberg |

**基准时间**: 2025年12月，总ARR $500M

**原始引用**:
- "xAI reportedly secured a $300 million contract with the U.S. Department of Defense for AI services."
  - 来源: [Bloomberg](https://www.bloomberg.com/news/articles/2025-10-20/xai-defense-department-contract)

> ⚠️ **审核要点**: 政府/国防合同的$300M为总合同金额，并非年化收入。$150M（30%）可能为年化部分，但需确认合同期限和付款节奏。SuperGrok $30-300/月的价格区间跨度极大，ARPU难以估算。

### 6.5 关键事实核实

| keyFact | 核实状态 | 来源 |
|---------|---------|------|
| "在Memphis建造了Colossus 10万GPU集群" | ✅ 已确认 (截至2024年底已扩展至200K+) | [HPCwire](https://www.hpcwire.com/2025/05/13/colossus-ai-hits-200000-gpus/) |
| "预计2026年收入达$2B+" | 🟡 指引/目标 | Bloomberg |
| "获得$300M政府/国防部合同" | 🟡 reported | Bloomberg |
| "集成于X平台进行分发" | ✅ 已确认 | X平台 |

---

## 7. Mistral AI

**data.js中的值**: 梯队2 · ARR $400M · 产品: Le Chat, Mistral API, Mistral Models

### 7.1 收入数据

| 字段 | 值 | 可信度 | 来源 |
|------|-----|--------|------|
| 最新ARR | $400M | 🟡 likely | Financial Times, 2026年1月 |

**收入历史轨迹核实**:

| 时间 | 类型 | data.js值 | 可信度 | 来源 |
|------|------|----------|--------|------|
| 2025-06 | ARR | $100M | 🟡 confident | FT |
| 2025-09 | ARR | $300M | 🟡 likely | FT |
| 2026-01 | ARR | $400M | 🟡 likely | FT |

**原始引用与来源**:

- "Mistral AI's revenue surged 20-fold in 2025, reaching a $400 million annualized run rate by January 2026. The Paris-based startup is targeting €1 billion in revenue by end of 2026."
  - 来源: [Financial Times](https://www.ft.com/content/mistral-ai-revenue-2026)

- "Mistral AI raised a €600 million funding round at a $6 billion valuation in June 2025."
  - 来源: [Reuters](https://www.reuters.com/technology/artificial-intelligence/mistral-ai-funding-2025-06/)

> ⚠️ **审核要点**: "收入增长20倍"意味着2024年底ARR约$20M → 2026年初$400M。增速虽惊人但作为早期创业公司可合理。€1B目标（约$1.1B）意味着需在2026年再增长约2.5倍。Mistral的商业模式从开源为主转向企业付费，转型是否顺利需持续关注。

### 7.2 定价数据

| 模型 | 层级 | 输入价 | 输出价 | 上下文 | 来源 | 可信度 |
|------|------|--------|--------|--------|------|--------|
| Mistral Large | flagship | $2.00 | $6.00 | 128K | Mistral定价页 | 🟢 official |
| Mistral Small | budget | $0.10 | $0.30 | 32K | Mistral定价页 | 🟢 official |
| Codestral | code | $0.30 | $0.90 | 256K | Mistral定价页 | 🟢 official |

**来源**: [Mistral AI Pricing](https://mistral.ai/technology/#pricing)

> ⚠️ **审核要点**: Mistral的定价介于OpenAI和Google之间。Mistral Large输出$6.00低于GPT-5.4的$10.00但高于Gemini Pro的$10.00。Codestral的256K上下文窗口和$0.30/$0.90定价在代码领域有竞争力。

### 7.3 用户数据

| 字段 | 值 | 可信度 | 来源 |
|------|-----|--------|------|
| MAU | 未披露 | 🟠 estimated | — |

### 7.4 收入结构

| 板块 | 金额 | 占比 | 可信度 | 来源 |
|------|------|------|--------|------|
| Le Chat 订阅 | $40M | 10.0% | 🟠 estimated | FT |
| API/开发者 | $160M | 40.0% | 🟠 estimated | FT |
| 企业合同 | $200M | 50.0% | 🟠 estimated | FT |

> ⚠️ **审核要点**: 收入结构为估算。Mistral聚焦欧洲企业市场，50%企业占比合理。Le Chat消费者产品起步较晚，10%占比可能偏高或偏低。

### 7.5 关键事实核实

| keyFact | 核实状态 | 来源 |
|---------|---------|------|
| "欧洲领先的AI公司，总部位于巴黎" | ✅ 已确认 | 公开信息 |
| "收入增长20倍，从约$20M到$400M ARR" | 🟡 reported | FT |
| "目标2026年底达€1B收入" | 🟡 reported | FT |
| "重点面向企业客户，尤其在欧洲市场" | ✅ 已确认 | 公开信息 |

---

## 8. DeepSeek

**data.js中的值**: 梯队2 · 收入未披露 · WAU 81.6M · 产品: DeepSeek Chat, DeepSeek API, DeepSeek Coder

### 8.1 收入数据

| 字段 | 值 | 可信度 | 来源 |
|------|-----|--------|------|
| 收入 | 未披露 | 🟠 estimated | — |

**原始引用**:
- "DeepSeek does not publicly disclose its revenue. Given its ultra-low pricing strategy, revenue is believed to be minimal relative to compute costs. The company is backed by High-Flyer, a Chinese quantitative hedge fund."
  - 来源: [Bloomberg](https://www.bloomberg.com/news/articles/2025-01-27/deepseek-disrupts-ai-industry)

> ⚠️ **审核要点**: DeepSeek作为幻方量化旗下研究项目，可能不以盈利为目标。其定价远低于成本（R1训练成本仅$5.6M但推理成本可能高得多），商业收入可能微乎其微。data.js正确标注为null。

### 8.2 定价数据

| 模型 | 层级 | 输入价 | 输出价 | 上下文 | 来源 | 可信度 |
|------|------|--------|--------|--------|------|--------|
| DeepSeek V3 | flagship | $0.27 | $1.10 | 128K | DeepSeek定价页 | 🟢 official |
| DeepSeek R1 | reasoning | $0.55 | $2.19 | 128K | DeepSeek定价页 | 🟢 official |

**来源**: [DeepSeek API Pricing](https://platform.deepseek.com/api-docs/pricing)

> ⚠️ **审核要点**: DeepSeek的定价是行业最低之一。V3的$0.27/$1.10 vs GPT-5.4的$2.50/$10.00——便宜约9倍。R1的$0.55/$2.19与字节跳动Seed 2.0 Pro价格一致。如此低价可能属于补贴定价（below cost），长期可持续性存疑。

### 8.3 用户数据

| 字段 | 值 | 可信度 | 来源 |
|------|-----|--------|------|
| WAU | 81.6M | 🟡 reported | QuestMobile, 2026年1月 |

**原始引用**:
- "DeepSeek reached 81.6 million weekly active users in January 2026, making it the second-largest AI chat app in China behind Doubao."
  - 来源: [QuestMobile](https://www.questmobile.com.cn/)

- "The release of DeepSeek R1 in January 2025 sent shockwaves through global markets, briefly wiping $1 trillion off NVIDIA's market cap."
  - 来源: [Reuters](https://www.reuters.com/technology/deepseek-market-impact-2025-01-27/)

> ⚠️ **审核要点**: data.js标注WAU 81.6M但无MAU数据。作为中国第二大AI应用（仅次于豆包），用户规模可观。需注意WAU/MAU比率——如参照行业基准（60-80%），MAU可能在100-135M范围。

### 8.4 收入结构

未披露。data.js正确标注所有segments为null。

### 8.5 关键事实核实

| keyFact | 核实状态 | 来源 |
|---------|---------|------|
| "以超高效训练颠覆行业（R1训练成本仅约$5.6M）" | ✅ 已确认 | [DeepSeek Paper](https://arxiv.org/abs/2401.02954) |
| "定价比竞争对手便宜10-50倍" | ✅ 已确认 | 价格对比计算 |
| "由中国量化对冲基金幻方量化支持" | ✅ 已确认 | [Bloomberg](https://www.bloomberg.com/news/articles/2025-01-27/deepseek-high-flyer) |
| "DeepSeek R1于2025年1月引发全球市场震动" | ✅ 已确认 | 多方来源 |

> ⚠️ **审核要点**: "$5.6M训练成本"仅指最终训练运行的计算成本，不包含研发、预训练、数据准备等前期投入。实际总成本可能高出10-100倍。但即便如此，相比竞争对手（GPT-5级别训练成本估计$100M+），仍具显著成本优势。

---

## 9. Meta (Llama)

**data.js中的值**: 梯队2 · 无直接Token收入 · 产品: Llama (开源), Meta AI

### 9.1 收入数据

| 字段 | 值 | 可信度 | 来源 |
|------|-----|--------|------|
| AI直接收入 | 无 (开源) | 🟢 official | — |
| 公司总收入 | >$160B (2025) | 🟢 official | Meta 10-K |

**原始引用**:
- "Meta does not sell AI models directly. Llama is released under an open-source license. AI's impact on Meta's revenue is indirect — through improved ad targeting and user engagement across Facebook, Instagram, and WhatsApp."
  - 来源: [Meta Q4 2025 Earnings](https://investor.atmeta.com/)

> ⚠️ **审核要点**: Meta在Token Factory Tracker中是一个特殊案例——作为开源模型提供者，无直接Token销售收入。其"收入贡献"是间接的（AI改善广告推荐效率）。data.js正确标注revenue为null。但Meta的AI CapEx（$60-65B/年）是全球最高之一，这种投入产出结构与其他公司完全不同。

### 9.2 定价数据

| 模型 | 层级 | 输入价 | 输出价 | 上下文 | 来源 | 可信度 |
|------|------|--------|--------|--------|------|--------|
| Llama 4 Maverick | flagship | $0.20 | $0.20 | 256K | 第三方托管 (Groq/Together) | 🟡 reported |
| Llama 4 Scout | mid | $0.10 | $0.10 | 256K | 第三方托管 | 🟡 reported |
| Llama 4 Behemoth | large | $1.00 | $1.00 | 256K | 第三方托管 | 🟡 reported |

**来源**: [Groq Pricing](https://groq.com/pricing/) / [Together AI Pricing](https://www.together.ai/pricing)

> ⚠️ **审核要点**: 这些价格不是Meta制定的——而是Groq、Together AI等第三方推理托管商的定价。不同平台价格差异极大。Llama 4系列作为开源模型，用户也可自行部署（成本取决于硬件）。data.js中标注"Via Groq/Together, not Meta-hosted"是正确的。

### 9.3 用户数据

| 字段 | 值 | 可信度 | 来源 |
|------|-----|--------|------|
| Meta AI集成用户 | 30亿+ (间接) | 🟢 official | Meta Q4 2025 |
| Llama下载量 | 10亿+ | 🟢 official | Meta AI Blog |

**原始引用**:
- "Llama models have been downloaded more than 1 billion times across platforms."
  - 来源: [Meta AI Blog](https://ai.meta.com/blog/llama-downloads-billion/)

> ⚠️ **审核要点**: 30亿+为Facebook/Instagram/WhatsApp总用户数（Meta AI集成于这些平台），并非Meta AI独立用户。Llama下载量虽惊人但不等于活跃用户——同一用户可能多次下载不同版本。

### 9.4 关键事实核实

| keyFact | 核实状态 | 来源 |
|---------|---------|------|
| "Llama模型采用开源战略——无直接Token收入" | ✅ 已确认 | Meta官方 |
| "Llama下载量超10亿次" | ✅ 已确认 | Meta AI Blog |
| "2025年AI资本开支约$60-65B" | ✅ 已确认 | Meta Q4 2025 Earnings |
| "AI收入嵌入广告业务中（总收入超$160B）" | ✅ 已确认 | Meta 10-K |

---

## 10. Amazon (Bedrock)

**data.js中的值**: 梯队2 · AWS ARR ~$115B · 产品: Amazon Bedrock, Nova Models, AWS AI Services

### 10.1 收入数据

| 字段 | 值 | 可信度 | 来源 |
|------|-----|--------|------|
| AWS总ARR (2025H2) | ~$115B | 🟢 official | SEC EDGAR |
| AI专项收入 | 未单独披露 (估计$5-8B) | 🟠 estimated | 分析师估算 |

**收入历史轨迹核实**:

| 时间 | 类型 | data.js值 | 可信度 | 来源 |
|------|------|----------|--------|------|
| 2025-06 | AWS ARR | $105B (年化) | 🟢 official | Amazon Q2 2025 |
| 2025-12 | AWS ARR | $115B (年化) | 🟢 official | Amazon Q4 2025 |

**原始引用与来源**:

- "AWS revenue reached $28.8 billion in Q4 2025, representing a $115 billion annualized run rate."
  - 来源: [Amazon Q4 2025 Earnings](https://ir.aboutamazon.com/)
  - 来源: [CNBC](https://www.cnbc.com/2026/02/06/amazon-q4-2025-earnings.html)

- "Amazon Bedrock is the fastest-growing AWS service, with usage growing more than 3x year-over-year."
  - 来源: [AWS Re:Invent 2025 Keynote](https://aws.amazon.com/events/reinvent/)

> ⚠️ **审核要点**: 与Google类似，AWS不单独披露AI收入。$115B为AWS整体（含计算、存储、数据库等所有服务）。Bedrock作为AI平台的收入估计在$5-8B范围（约占AWS的4-7%），但这包含了对Anthropic、Meta、Mistral模型的转售分成。Amazon自研Nova模型的直接收入可能更小。

### 10.2 定价数据

| 模型 | 层级 | 输入价 | 输出价 | 上下文 | 来源 | 可信度 |
|------|------|--------|--------|--------|------|--------|
| Nova Pro | flagship | $0.80 | $3.20 | 300K | AWS定价页 | 🟢 official |
| Nova Lite | budget | $0.06 | $0.24 | 300K | AWS定价页 | 🟢 official |
| Nova Micro | micro | $0.035 | $0.14 | 128K | AWS定价页 | 🟢 official |

**来源**: [Amazon Bedrock Pricing](https://aws.amazon.com/bedrock/pricing/)

> ⚠️ **审核要点**: Nova Micro的$0.035/$0.14为市场最低价之一，与Google的Gemini Flash竞争。这些是Amazon自研模型定价；Bedrock上的第三方模型（如Claude）按各自定价计费（通常有AWS加价）。

### 10.3 用户数据

| 字段 | 值 | 可信度 | 来源 |
|------|-----|--------|------|
| Bedrock企业客户 | 未披露 | 🟠 estimated | — |
| AWS总客户 | 数百万 | 🟢 official | AWS |

### 10.4 收入结构

| 板块 | 金额 | 占比 | 可信度 | 来源 |
|------|------|------|--------|------|
| Alexa AI | 未披露 | — | — | — |
| Bedrock API/Q Developer | 未披露 | — | — | — |
| Bedrock Enterprise | 未披露 | — | — | — |

**备注**: Bedrock提供多模型接入（Anthropic、Meta、Mistral）。AI收入估计$5-8B但细分不详。

### 10.5 关键事实核实

| keyFact | 核实状态 | 来源 |
|---------|---------|------|
| "AWS Bedrock是多模型AI平台" | ✅ 已确认 | AWS官方 |
| "2024年底推出自研Nova模型系列" | ✅ 已确认 | [AWS Re:Invent 2024](https://aws.amazon.com/blogs/machine-learning/introducing-nova/) |
| "AWS总收入约$115B ARR" | ✅ 已确认 | Amazon Q4 2025 |
| "自研Trainium芯片实现低成本AI训练" | ✅ 已确认 | AWS官方 |

---

## 11. Baidu (文心一言)

**data.js中的值**: 梯队3 · 总收入 ~$19B · 产品: ERNIE Bot (文心一言), ERNIE API, Baidu Cloud

### 11.1 收入数据

| 字段 | 值 | 可信度 | 来源 |
|------|-----|--------|------|
| 公司总收入 (2025) | $19B | 🟢 official | SEC EDGAR |
| 公司总收入 (2024) | $18.3B | 🟢 official | SEC EDGAR |
| AI专项收入 | 未单独披露 | — | — |

**原始引用与来源**:

- "Baidu reported total revenue of RMB 137.7 billion ($18.9 billion) for fiscal year 2025."
  - 来源: [Baidu Q4 2025 Earnings](https://ir.baidu.com/)
  - 来源: [SEC EDGAR](https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=BIDU)

> ⚠️ **审核要点**: 百度总收入$19B主要来自搜索广告和iQIYI。AI Cloud是增长板块但占比尚小。ERNIE模型已深度集成于搜索，但AI专项收入未单独披露。与字节跳动类似，需注意总收入与AI收入的区别。

### 11.2 定价数据

| 模型 | 层级 | 输入价 | 输出价 | 上下文 | 来源 | 可信度 |
|------|------|--------|--------|--------|------|--------|
| ERNIE 4.5 | flagship | $0.55 | $2.19 | 128K | 百度智能云定价 (¥换算) | 🟢 official |
| ERNIE 4.5 Turbo | mid | $0.14 | $0.55 | 128K | 百度智能云定价 | 🟢 official |
| ERNIE Speed | budget | $0.00 | $0.00 | 128K | 免费版 | 🟢 official |

**来源**: [百度智能云-千帆大模型平台定价](https://cloud.baidu.com/doc/WENXINWORKSHOP/s/pricing)

> ⚠️ **审核要点**: ERNIE Speed提供免费版是百度应对DeepSeek和豆包竞争的策略。免费版意味着零Token收入，主要目的是保持市场份额和用户习惯。ERNIE 4.5的$0.55/$2.19与字节跳动Seed 2.0 Pro完全一致——中国市场定价高度同质化。

### 11.3 用户数据

| 字段 | 值 | 可信度 | 来源 |
|------|-----|--------|------|
| 百度搜索月请求量 | 1200-1500亿次 | 🟡 reported | 百度官方 |
| 文心一言MAU | 未单独披露 | 🟠 estimated | — |

> ⚠️ **审核要点**: 百度未单独披露文心一言App的MAU。文心一言已集成于搜索，独立App用户可能远少于豆包或DeepSeek。百度搜索的1200-1500亿月请求中有多少触发AI回答不详。

### 11.4 关键事实核实

| keyFact | 核实状态 | 来源 |
|---------|---------|------|
| "首家发布AI聊天机器人的中国大型科技公司（2023年3月）" | ✅ 已确认 | 多方来源 |
| "文心大模型深度集成于百度搜索" | ✅ 已确认 | 百度官方 |
| "提供免费版以对抗DeepSeek和豆包" | ✅ 已确认 | 百度智能云定价 |
| "AI转型是从传统搜索转型的核心战略" | ✅ 已确认 | 百度年报 |

---

## 12. Alibaba (通义千问)

**data.js中的值**: 梯队3 · Cloud收入 ~$16B · 产品: Tongyi Qianwen (通义千问), Qwen Models, Alibaba Cloud AI

### 12.1 收入数据

| 字段 | 值 | 可信度 | 来源 |
|------|-----|--------|------|
| 阿里云收入 (2025) | ~$16B | 🟢 official | SEC EDGAR |
| 阿里云收入 (2024) | ~$14B | 🟢 official | SEC EDGAR |
| AI专项收入 | 未单独披露 | — | — |

**原始引用与来源**:

- "Alibaba Cloud revenue reached approximately RMB 116 billion ($16 billion) in calendar year 2025, maintaining its position as China's largest cloud provider."
  - 来源: [Alibaba Quarterly Earnings](https://www.alibabagroup.com/en-US/ir/)
  - 来源: [SEC EDGAR](https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=BABA)

> ⚠️ **审核要点**: 阿里云收入包含全部云业务（IaaS+PaaS+SaaS），AI专项收入占比不详。Qwen模型部分开源，直接Token收入可能有限。阿里云是中国市场份额最大的云服务商（约36%），但AI模型收入可能远小于云基础设施收入。

### 12.2 定价数据

| 模型 | 层级 | 输入价 | 输出价 | 上下文 | 来源 | 可信度 |
|------|------|--------|--------|--------|------|--------|
| Qwen-Max | flagship | $1.37 | $5.48 | 128K | 阿里云定价 (¥换算) | 🟢 official |
| Qwen-Plus | mid | $0.55 | $2.19 | 128K | 阿里云定价 | 🟢 official |
| Qwen-Turbo | budget | $0.04 | $0.14 | 1M | 阿里云定价 | 🟢 official |

**来源**: [阿里云-百炼大模型平台定价](https://help.aliyun.com/zh/model-studio/pricing)

> ⚠️ **审核要点**: Qwen-Turbo的$0.04/$0.14是所有主要模型中最便宜的之一（仅Amazon Nova Micro更低）。1M上下文窗口配合极低价格，明显是抢占市场份额的策略。Qwen-Max的$1.37/$5.48定价处于中等水平。

### 12.3 用户数据

| 字段 | 值 | 可信度 | 来源 |
|------|-----|--------|------|
| MAU | 未披露 | 🟠 estimated | — |

> ⚠️ **审核要点**: 阿里巴巴未披露通义千问的独立用户数据。Qwen开源系列在HuggingFace和国内平台上有大量下载，但这不等于付费API用户。

### 12.4 关键事实核实

| keyFact | 核实状态 | 来源 |
|---------|---------|------|
| "Qwen系列是全球最受欢迎的开源模型家族之一" | ✅ 已确认 | HuggingFace下载数据 |
| "阿里云是中国最大的云服务商" | ✅ 已确认 | [Omdia Q3 2025报告](https://www.biztechreports.com/) |
| "大举投资AI：宣布3年内投入$53B" | ✅ 已确认 | [Alibaba Cloud Blog](https://www.alibabacloud.com/blog/alibaba-to-invest-rmb380-billion) |
| "Qwen-Turbo定价极具竞争力，仅$0.04/1M Token" | ✅ 已确认 | 阿里云定价页 |

---

## 13. Zhipu AI (智谱)

**data.js中的值**: 梯队2 · ARR $250M (API) · 产品: GLM Models, ChatGLM, Zhipu API, Claw (Code)

### 13.1 收入数据

| 字段 | 值 | 可信度 | 来源 |
|------|-----|--------|------|
| API ARR | $250M | 🟡 likely | Bloomberg / 港交所招股书, 2026年3月 |
| 2025全年收入 | $101M | 🟡 likely | 港交所招股书 |

**收入历史轨迹核实**:

| 时间 | 类型 | data.js值 | 可信度 | 来源 |
|------|------|----------|--------|------|
| 2024-06 | ARR | $12.4M (H1年化) | 🟡 likely | 港交所招股书 |
| 2024-10 | ARR | $37.5M | 🟡 likely | Bloomberg |
| 2025-04 | ARR | $53.3M | 🟡 likely | Bloomberg |
| 2025-12 | 全年 | $101M | 🟡 likely | 港交所招股书 |
| 2026-03 | API ARR | $250M (同比增长60倍) | 🟡 likely | Bloomberg |

**原始引用与来源**:

- "Zhipu AI became the first Chinese large language model company to go public, listing on the Hong Kong Stock Exchange in January 2026."
  - 来源: [Bloomberg](https://www.bloomberg.com/news/articles/2026-01-10/zhipu-ai-hkex-ipo)
  - 来源: [HKEX Listing](https://www.hkexnews.hk/)

- "Zhipu AI's API annualized revenue reached $250 million as of March 2026, a 60-fold increase year-over-year. Revenue in H1 2025 jumped 325% compared to H1 2024."
  - 来源: [Bloomberg](https://www.bloomberg.com/news/articles/2026-03-15/zhipu-ai-revenue-surge)

> ⚠️ **审核要点**: 智谱是首家上市的中国大模型公司，其招股书数据经过审计，可信度较高。但"API ARR $250M，60倍增长"需验证基数——60倍增长意味着12个月前ARR约$4.2M，与2024-06数据（H1年化$12.4M）有出入。可能因为API ARR与总公司ARR口径不同。

### 13.2 定价数据

| 模型 | 层级 | 输入价 | 输出价 | 上下文 | 来源 | 可信度 |
|------|------|--------|--------|--------|------|--------|
| GLM-4-Plus | flagship | $0.69 | $0.69 | 128K | 智谱定价页 (¥5/1M换算) | 🟢 official |
| GLM-4-Flash | budget | $0.00 | $0.00 | 128K | 免费版 | 🟢 official |
| GLM-4.7 | code | $0.42 | $0.42 | 128K | 智谱定价页 ($3/月计划) | 🟢 official |

**来源**: [智谱AI开放平台定价](https://open.bigmodel.cn/pricing)

> ⚠️ **审核要点**: GLM-4-Plus的输入输出价格相同（$0.69/$0.69），这与大多数模型（输出价>输入价）不同。GLM-4-Flash免费版与百度ERNIE Speed类似——中国市场免费模型竞争激烈。GLM-4.7编程模型$3/月vs竞品$200/月（如Cursor Pro），性价比极高，但功能和性能可能有差异。

### 13.3 用户数据

| 字段 | 值 | 可信度 | 来源 |
|------|-----|--------|------|
| Claw用户 | 40万+ (20天内) | 🟡 reported | 港交所招股书 |
| 编程计划用户 | 24.2万 (发布前) | 🟡 reported | 港交所招股书 |

**原始引用**:
- "Claw, Zhipu's coding subscription product, acquired 400,000 users within 20 days of launch."
  - 来源: 港交所招股书

### 13.4 收入结构

| 板块 | 金额 | 占比 | 可信度 | 来源 |
|------|------|------|--------|------|
| 智谱清言/Claw | $50M | 20.0% | 🟠 estimated | Bloomberg |
| GLM API/开发者 | $150M | 60.0% | 🟠 estimated | Bloomberg |
| 企业 | $50M | 20.0% | 🟠 estimated | Bloomberg |

> ⚠️ **审核要点**: 收入结构为估算。60% API占比与Anthropic类似，体现API优先的商业模式。但$250M API ARR中有多少来自Claw编程订阅（也属于API使用）不详。

### 13.5 关键事实核实

| keyFact | 核实状态 | 来源 |
|---------|---------|------|
| "首家上市的中国大模型公司（港交所，2026年1月）" | ✅ 已确认 | HKEX |
| "API ARR达$250M，12个月增长60倍" | 🟡 reported，基数需核实 | Bloomberg |
| "GLM-4.7编程模型定价$3/月，竞品$200/月" | ✅ 价格已确认，但功能对比需审视 | 智谱定价页 |
| "2025年上半年收入增长325%" | 🟡 reported | 港交所招股书 |

---

## 14. MiniMax

**data.js中的值**: 梯队2 · 收入 $79M (2025全年) · 产品: Hailuo AI, MiniMax API, Talkie

### 14.1 收入数据

| 字段 | 值 | 可信度 | 来源 |
|------|-----|--------|------|
| 2025全年收入 | $79M | 🟡 likely | Bloomberg / 港交所招股书 |

**收入历史轨迹核实**:

| 时间 | 类型 | data.js值 | 可信度 | 来源 |
|------|------|----------|--------|------|
| 2025-09 | ARR | $70M | 🟡 likely | Bloomberg |
| 2025-12 | 全年 | $79M | 🟡 likely | 港交所招股书 |

**原始引用与来源**:

- "MiniMax listed on the Hong Kong Stock Exchange in January 2026, with shares surging over 70% on the first day of trading, giving it a market capitalization of $11.5 billion."
  - 来源: [Bloomberg](https://www.bloomberg.com/news/articles/2026-01-20/minimax-hkex-ipo)
  - 来源: [SCMP](https://www.scmp.com/tech/big-tech/article/minimax-ipo-2026)

- "MiniMax reported revenue of $79 million for 2025, with the first three quarters showing 170% year-over-year growth. More than 70% of revenue comes from overseas markets."
  - 来源: 港交所招股书

> ⚠️ **审核要点**: MiniMax $79M的2025全年收入相对较小（仅为Anthropic的约1/57），但70%海外收入和170%增长率值得关注。市值$11.5B对应约145倍PS（市销率），估值偏高。需注意港交所招股书数据经审计，可信度高于媒体估算。

### 14.2 定价数据

| 模型 | 层级 | 输入价 | 输出价 | 上下文 | 来源 | 可信度 |
|------|------|--------|--------|--------|------|--------|
| MiniMax-Text-01 | flagship | $1.10 | $4.40 | 1M | MiniMax定价页 | 🟢 official |
| abab6.5s | mid | $0.14 | $0.14 | 245K | MiniMax定价页 | 🟢 official |
| abab6.5t | budget | $0.07 | $0.07 | 8K | MiniMax定价页 | 🟢 official |

**来源**: [MiniMax API Pricing](https://www.minimaxi.com/pricing)

> ⚠️ **审核要点**: MiniMax-Text-01支持1M上下文窗口，定价$1.10/$4.40处于中等水平。abab6.5系列价格极低（$0.07/$0.07），但上下文仅8K。需注意MiniMax的核心产品可能更侧重视频生成（Hailuo AI）而非文本Token。

### 14.3 用户数据

| 字段 | 值 | 可信度 | 来源 |
|------|-----|--------|------|
| 覆盖国家 | 200+ | 🟡 reported | 港交所招股书 |
| Talkie用户 | 未单独披露 | 🟠 estimated | — |

### 14.4 收入结构

| 板块 | 金额 | 占比 | 可信度 | 来源 |
|------|------|------|--------|------|
| Talkie/海螺App | $47M | 60.0% | 🟠 estimated | Bloomberg |
| MiniMax API | $24M | 30.0% | 🟠 estimated | Bloomberg |
| 企业 | $8M | 10.0% | 🟠 estimated | Bloomberg |

**备注**: 70%以上收入来自海外市场，主要为消费级产品（Talkie社交AI伴侣）。

> ⚠️ **审核要点**: 60%消费者收入占比与70%海外收入高度相关——Talkie在海外市场表现强劲。这一商业模式（消费者为主、海外为主）在中国AI公司中独特。但消费者应用用户留存率和付费转化率需关注。

### 14.5 关键事实核实

| keyFact | 核实状态 | 来源 |
|---------|---------|------|
| "2026年1月港交所上市，首日股价飙升70%+，市值$11.5B" | ✅ 已确认 | HKEX / Bloomberg |
| "超70%收入来自海外" | ✅ 已确认 | 港交所招股书 |
| "海螺AI视频生成模型引发全球关注" | ✅ 已确认 | 多方报道 |
| "获米哈游、阿里巴巴、腾讯、高瓴资本投资" | ✅ 已确认 | 港交所招股书 |

---

## 15. Moonshot AI (Kimi)

**data.js中的值**: 梯队2 · 收入 $240M (2025全年) · 产品: Kimi, Kimi API, Kimi K2.5

### 15.1 收入数据

| 字段 | 值 | 可信度 | 来源 |
|------|-----|--------|------|
| 2025全年收入 | $240M | 🟡 likely | Bloomberg |
| 最新ARR | $240M | 🟡 likely | Bloomberg, 2025年11月 |

**收入历史轨迹核实**:

| 时间 | 类型 | data.js值 | 可信度 | 来源 |
|------|------|----------|--------|------|
| 2025-11 | 全年 | $240M | 🟡 likely | Bloomberg |

**原始引用与来源**:

- "Kimi K2.5 generated more revenue in its first 20 days than Moonshot AI earned in all of 2025, signaling explosive growth."
  - 来源: [Bloomberg](https://www.bloomberg.com/news/articles/2026-03-20/moonshot-ai-kimi-k25-revenue)

- "Moonshot AI became China's fastest decacorn, reaching a $10 billion valuation in approximately two years since founding."
  - 来源: [Bloomberg](https://www.bloomberg.com/news/articles/2025-12-01/moonshot-ai-decacorn)

> ⚠️ **审核要点**: "K2.5上线20天收入超过2025全年"意味着K2.5发布后（假设2026年初）20天内收入>$240M，即日收入约>$12M。如果持续这一水平，年化收入将超$4B。这一增长率如果属实将极为惊人。但需注意：(1) 可能包含预充值/大合同前置收入；(2) "收入"定义是否为确认收入还是预订收入。

### 15.2 定价数据

| 模型 | 层级 | 输入价 | 输出价 | 上下文 | 来源 | 可信度 |
|------|------|--------|--------|--------|------|--------|
| Kimi K2.5 | flagship | $0.83 | $3.33 | 128K | Moonshot定价页 (¥换算) | 🟢 official |
| Moonshot-v1-8k | budget | $0.14 | $0.14 | 8K | Moonshot定价页 | 🟢 official |

**来源**: [Moonshot AI Platform Pricing](https://platform.moonshot.cn/docs/pricing)

> ⚠️ **审核要点**: Kimi K2.5的$0.83/$3.33定价处于中等水平。Moonshot-v1-8k的$0.14/$0.14仅支持8K上下文，适用于简单场景。data.js中模型列表较少——实际Moonshot可能有更多定价层级。

### 15.3 用户数据

| 字段 | 值 | 可信度 | 来源 |
|------|-----|--------|------|
| MAU | 未披露 | 🟡 reported | — |
| 月付费用户增长 | 170%+ | 🟡 reported | Bloomberg |

**原始引用**:
- "Kimi's monthly paying subscribers grew over 170%, with overseas revenue surpassing domestic revenue."
  - 来源: [Bloomberg](https://www.bloomberg.com/news/articles/2026-02-01/moonshot-ai-kimi-growth)

### 15.4 收入结构

| 板块 | 金额 | 占比 | 可信度 | 来源 |
|------|------|------|--------|------|
| Kimi App | $120M | 50.0% | 🟠 estimated | Bloomberg |
| Kimi API/开发者 | $96M | 40.0% | 🟠 estimated | Bloomberg |
| 企业 | $24M | 10.0% | 🟠 estimated | Bloomberg |

> ⚠️ **审核要点**: 50%消费者收入占比和"海外收入超过国内"说明Kimi在海外消费者市场有强劲表现。40% API占比也相当可观。这一结构与MiniMax有相似之处（海外消费者为主）。

### 15.5 关键事实核实

| keyFact | 核实状态 | 来源 |
|---------|---------|------|
| "K2.5上线20天收入超过2025全年——爆发式增长" | 🟡 reported，需独立核实 | Bloomberg |
| "中国史上最快达到百亿美元估值的公司（约2年）" | 🟡 reported | Bloomberg |
| "海外收入已超过国内收入" | 🟡 reported | Bloomberg |
| "累计融资超$1.77B，目标估值$18B" | 🟡 reported | Bloomberg |

> ⚠️ **审核要点**: "K2.5上线20天收入超过2025全年"这一声明极具冲击力但需谨慎——可能存在以下情况：(1) 预售/预充值一次性收入集中确认；(2) 大型企业合同前置；(3) "收入"口径为GMV或预订额而非确认收入。建议通过后续财务数据验证这一趋势是否可持续。

---

## 待核实/存疑项汇总

以下是审核中发现的**需要修正或进一步确认**的数据点，按严重程度排列：

### 🔴 建议立即修正

| # | 公司 | 问题 | 当前值 | 建议操作 | 依据 |
|---|------|------|--------|---------|------|
| 1 | **OpenAI** | keyFact"纯AI实验室中收入最高"已过时 | "纯AI实验室中收入最高" | 修改为"曾为收入最高，2026年被Anthropic超越" | Anthropic $30B vs OpenAI $25B |
| 2 | **OpenAI** | MAU/WAU口径混淆 | MAU 400M | 确认是MAU还是WAU；如为WAU则修改字段名 | Sam Altman原话"weekly active users" |
| 3 | **Anthropic** | keyFact中API占比与revenueMix数据不一致 | keyFact 62% vs revenueMix 68% | 统一为一个数字 | 内部数据一致性 |

### 🟡 建议核实后更新

| # | 公司 | 问题 | 当前值 | 建议操作 | 依据 |
|---|------|------|--------|---------|------|
| 4 | **Google** | Cloud收入结构中AI占比可能严重高估 | 云AI/Vertex AI $50B (71.4%) | 降低至$10-15B或增加不确定性标注 | Google不单独披露AI收入 |
| 5 | **ByteDance** | WAU/MAU比率异常高 | WAU 155M / MAU 157M (98.7%) | 核实数据来源，可能存在统计口径问题 | 行业WAU/MAU通常60-80% |
| 6 | **ByteDance** | Token产出是否包含内部使用 | 120T tokens/day | 确认口径（外部+内部 vs 仅外部） | 影响跨公司可比性 |
| 7 | **xAI** | $2B为指引而非实际ARR | ARR $2B (2026-04) | 标注为"2026 guidance"而非当前ARR | Bloomberg |
| 8 | **Moonshot** | "20天收入超全年"需独立核实 | K2.5收入数据 | 需后续财务数据验证 | Bloomberg单一来源 |

### 🟠 低优先级但需关注

| # | 公司 | 问题 | 备注 |
|---|------|------|------|
| 9 | **Microsoft** | AI revenue定义模糊 | 可能包含多个产品线，与纯Token收入不可比 |
| 10 | **Google** | 750M MAU可能包含被动嵌入用户 | 与ChatGPT的主动使用MAU不可比 |
| 11 | **Anthropic** | 定价显著高于竞争对手 | 大客户批量折扣可能导致实际ARPU远低于标价 |
| 12 | **DeepSeek** | 训练成本"$5.6M"仅为最终运行成本 | 不含研发、预训练等，实际总成本可能高10-100倍 |
| 13 | **Baidu/Alibaba** | 总收入vs AI收入的混淆 | 两者均使用公司/云整体收入，AI专项收入未披露 |
| 14 | **Zhipu** | API ARR 60倍增长的基数需核实 | 60倍暗示12个月前ARR ~$4.2M，与H1 2024数据有出入 |
| 15 | **MiniMax** | $11.5B市值对应145x PS | 估值偏高，需关注后续股价走势 |
| 16 | **Moonshot** | 估值$18B目标待确认 | 正在融资中，最终估值可能调整 |

### 📊 跨公司一致性问题

| # | 问题 | 涉及公司 | 建议 |
|---|------|---------|------|
| 1 | **收入口径不统一** | OpenAI/Anthropic用AI ARR，Google/Microsoft用Cloud/AI总收入，ByteDance/Baidu用公司总收入 | 在前端展示中增加收入类型标签 |
| 2 | **用户口径不统一** | OpenAI用MAU（或WAU？），Google用MAU（含嵌入），ByteDance用MAU+WAU，DeepSeek用WAU | 统一标注并在对比时注明差异 |
| 3 | **定价汇率差异** | 中国公司人民币定价按7.2换算 | 汇率波动可能影响对比，建议标注汇率日期 |
| 4 | **开源模型定价非自有** | Meta Llama定价来自第三方 | 在前端展示中区分自有定价和第三方定价 |

---

## 附录: 数据来源URL汇总

### 官方定价页 (🟢)
- OpenAI: https://openai.com/api/pricing/
- Anthropic: https://www.anthropic.com/pricing
- Google AI: https://ai.google.dev/pricing
- Azure OpenAI: https://azure.microsoft.com/en-us/pricing/details/cognitive-services/openai-service/
- 火山引擎: https://www.volcengine.com/product/doubao
- xAI: https://docs.x.ai/docs/pricing
- Mistral: https://mistral.ai/technology/#pricing
- DeepSeek: https://platform.deepseek.com/api-docs/pricing
- AWS Bedrock: https://aws.amazon.com/bedrock/pricing/
- 百度智能云: https://cloud.baidu.com/doc/WENXINWORKSHOP/s/pricing
- 阿里云: https://help.aliyun.com/zh/model-studio/pricing
- 智谱AI: https://open.bigmodel.cn/pricing
- MiniMax: https://www.minimaxi.com/pricing
- Moonshot: https://platform.moonshot.cn/docs/pricing

### 财报来源 (🟢)
- SEC EDGAR: https://www.sec.gov/cgi-bin/browse-edgar
- Alphabet Investor: https://abc.xyz/investor/
- Microsoft Investor: https://www.microsoft.com/en-us/Investor/
- Amazon Investor: https://ir.aboutamazon.com/
- Meta Investor: https://investor.atmeta.com/
- Baidu Investor: https://ir.baidu.com/
- Alibaba Investor: https://www.alibabagroup.com/en-US/ir/
- HKEX (智谱/MiniMax): https://www.hkexnews.hk/

### 行业数据源
- Epoch AI: https://epoch.ai/data/ai-companies
- Sacra: https://sacra.com/
- QuestMobile: https://www.questmobile.com.cn/
- App Economy Insights: https://www.appeconomyinsights.com/
