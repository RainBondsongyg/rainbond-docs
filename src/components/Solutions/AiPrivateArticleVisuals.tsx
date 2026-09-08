import React from 'react';
import Link from '@docusaurus/Link';
import styles from './ai-private-article.module.css';

type JourneyStep = {
  title: string;
  description: string;
};

type ProofItem = {
  src: string;
  alt: string;
  caption: string;
};

type OutcomeItem = {
  label: string;
  value: string;
};

const scopeItems = [
  {
    code: 'APP',
    title: '刚用 AI 写好项目',
    description: '把 Claude Code、Codex 或 Vibe Coding 开发的前端、API 与全栈项目直接部署上线。',
    source: '从源码、Git 或镜像部署',
  },
  {
    code: 'AGENT',
    title: '已经搭好 Agent',
    description: '把 Dify 等 Agent 平台，以及你的知识库、工作流、插件和业务数据放进自己的环境。',
    source: '从应用市场或应用模板安装',
  },
  {
    code: 'MODEL',
    title: '需要自己的大模型',
    description: '在自己的算力上运行模型，让业务应用通过内部 API 调用，不再把请求交给外部平台。',
    source: '从模型仓库创建推理服务',
  },
];

export function AiPrivateScopeVisual(): JSX.Element {
  return (
    <section className={styles.scopeShell} aria-label="AI 应用私有化的三个层面">
      <div className={styles.scopeIntro}>
        <h2>无论你的 AI 项目从哪里开始，都能部署到自己的环境</h2>
        <p>只迁移当前需要的一层，或者让应用、Agent 与模型全部在你的 Rainbond 中连接。</p>
      </div>
      <div className={styles.scopeGrid}>
        {scopeItems.map((item, index) => (
          <article className={styles.scopeCard} key={item.code}>
            <div className={styles.scopeTopline}>
              <span className={styles.scopeCode}>{item.code}</span>
              <span className={styles.scopeIndex}>{String(index + 1).padStart(2, '0')}</span>
            </div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <small>{item.source}</small>
          </article>
        ))}
      </div>
      <div className={styles.scopeResult}>
        <span>部署到你的 Rainbond</span>
        <i aria-hidden="true" />
        <strong>内部访问 · 数据可控 · 持续更新 · 可迁移交付</strong>
      </div>
    </section>
  );
}

export function AiDeploymentAssistantPaths(): JSX.Element {
  return (
    <section className={styles.assistantShell} aria-label="使用 RainSkills 或 RainAgent 部署 AI 应用">
      <div className={styles.visualHeading}>
        <h2>不用自己拼部署命令，选择你正在使用的入口</h2>
        <p>AI 生成的代码和 Dify 类 Agent 应用，都可以交给 RainSkills 或 RainAgent 部署到 Rainbond。</p>
      </div>
      <div className={styles.assistantGrid}>
        <article className={styles.assistantCard}>
          <div className={styles.assistantLabel}>本地开发入口</div>
          <h3>RainSkills</h3>
          <p>正在使用 Claude Code、Codex 等工具时，直接从当前项目继续部署、排错和验证。</p>
          <div className={styles.promptBox}>帮我把当前项目部署上线，并验证页面和 API。</div>
          <strong>适合：AI 生成代码、Git 项目、Dify 类 Agent 应用</strong>
          <Link to="/docs/ai/rainskills">查看 RainSkills</Link>
        </article>
        <article className={`${styles.assistantCard} ${styles.assistantCardDark}`}>
          <div className={styles.assistantLabel}>Rainbond 控制台入口</div>
          <h3>RainAgent</h3>
          <p>已经进入 Rainbond 控制台时，用自然语言发起部署，让 Agent 结合平台上下文继续操作。</p>
          <div className={styles.promptBox}>帮我部署这个 AI 应用，运行后给我访问地址。</div>
          <strong>适合：AI 生成代码、开源 Agent 应用、平台内运维</strong>
          <Link to="/docs/ai/rainagent">查看 RainAgent</Link>
        </article>
      </div>
      <p className={styles.assistantResult}>
        两条路径最终都由 Rainbond 承载应用运行，并继续处理构建、依赖、访问、日志、升级和交付验证。
      </p>
    </section>
  );
}

export function AiPrivateJourney({
  title,
  description,
  steps,
}: {
  title: string;
  description?: string;
  steps: JourneyStep[];
}): JSX.Element {
  return (
    <section className={styles.journeyShell} aria-label={title}>
      <div className={styles.visualHeading}>
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      <ol className={styles.journeyGrid}>
        {steps.map((step, index) => (
          <li key={`${step.title}-${index}`}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function AiPrivateProofGallery({
  title,
  description,
  items,
}: {
  title: string;
  description?: string;
  items: ProofItem[];
}): JSX.Element {
  return (
    <section className={styles.proofShell} aria-label={title}>
      <div className={styles.visualHeading}>
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      <div className={styles.proofGrid}>
        {items.map((item, index) => (
          <figure className={styles.proofItem} key={item.src}>
            <figcaption>
              <span>{String(index + 1).padStart(2, '0')}</span>
              {item.caption}
            </figcaption>
            <div className={styles.proofCard}>
              <div className={styles.proofImageFrame}>
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  width={1600}
                  height={900}
                />
              </div>
            </div>
          </figure>
        ))}
      </div>
    </section>
  );
}

export function AiPrivateOutcomeGrid({
  title,
  items,
}: {
  title: string;
  items: OutcomeItem[];
}): JSX.Element {
  return (
    <section className={styles.outcomeShell} aria-label={title}>
      <div className={styles.visualHeading}>
        <h2>{title}</h2>
      </div>
      <div className={styles.outcomeGrid}>
        {items.map((item) => (
          <article key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}
