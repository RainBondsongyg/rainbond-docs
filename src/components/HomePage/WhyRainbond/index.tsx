import React, { useEffect, useRef, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Bot,
  Check,
  Copy,
  RefreshCw,
  Rocket,
  ShieldCheck,
  Terminal,
} from 'lucide-react';
import copyToClipboard from 'copy-to-clipboard';
import clsx from 'clsx';
import styles from './styles.module.css';
import { trackUmamiEvent } from '@src/utils/umami';

interface Benefit {
  title: string;
  description: string;
  icon: LucideIcon;
}

const benefits: Benefit[] = [
  {
    title: '不只完成一次部署',
    description: 'Rainbond 统一处理构建、网络、数据、证书和扩缩容。',
    icon: Rocket,
  },
  {
    title: '后续运维仍然可控',
    description: '查看状态和日志，完成升级、备份、恢复与回滚。',
    icon: RefreshCw,
  },
  {
    title: '仍然运行在你的环境',
    description: '应用、数据和模型保留在自己的服务器或 Kubernetes 中。',
    icon: ShieldCheck,
  },
];

const RAINSKILLS_AGENT_PROMPT = '帮我安装rainskills';
const RAINSKILLS_INSTALL_COMMAND = 'npx --yes rainskills';

type CopyTarget = 'agent' | 'command';
type CopyStatus = 'idle' | 'copied' | 'error';

interface CopyState {
  target: CopyTarget | null;
  status: CopyStatus;
}

const INITIAL_COPY_STATE: CopyState = { target: null, status: 'idle' };

export default function WhyRainbond() {
  const [copyState, setCopyState] = useState<CopyState>(INITIAL_COPY_STATE);
  const copyResetTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (copyResetTimerRef.current !== null) {
        window.clearTimeout(copyResetTimerRef.current);
      }
    };
  }, []);

  const handleCopy = (target: CopyTarget) => {
    if (copyResetTimerRef.current !== null) {
      window.clearTimeout(copyResetTimerRef.current);
    }

    const content = target === 'agent'
      ? RAINSKILLS_AGENT_PROMPT
      : RAINSKILLS_INSTALL_COMMAND;
    const copied = copyToClipboard(content);

    if (!copied) {
      setCopyState({ target, status: 'error' });
      return;
    }

    setCopyState({ target, status: 'copied' });
    trackUmamiEvent(target === 'agent'
      ? 'cta_home_second_screen_rainskills_agent_copied'
      : 'cta_home_second_screen_rainskills_command_copied', {
      module: 'home_second_screen',
      position: 'second_screen',
      install_method: target,
      cta_text: target === 'agent' ? '复制给 Agent' : '复制命令',
    });
    copyResetTimerRef.current = window.setTimeout(() => {
      setCopyState(INITIAL_COPY_STATE);
      copyResetTimerRef.current = null;
    }, 1800);
  };

  const copyButtonLabel = (target: CopyTarget, idleLabel: string) => {
    if (copyState.target !== target) {
      return idleLabel;
    }
    if (copyState.status === 'copied') {
      return '已复制';
    }
    if (copyState.status === 'error') {
      return '重新复制';
    }
    return idleLabel;
  };

  return (
    <section className={styles.section} aria-labelledby="why-rainbond-title">
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 id="why-rainbond-title" className={styles.title}>AI开发代码，Rainbond 让它稳定运行</h2>
          <p className={styles.subtitle}>AI 可以完成一次部署，但环境、依赖、网络、数据和后续运维，仍需要 Rainbond 持续管理。</p>
        </header>

        <div className={styles.contentGrid}>
          <div className={styles.message}>
            <h3 className={styles.claim}>
              让 AI 从代码<br />
              直接完成<span className={styles.highlight}>部署与运维</span><br />
            </h3>

            <ul className={styles.benefitList}>
              {benefits.map(({ title, description, icon: Icon }) => (
                <li key={title} className={styles.benefitItem}>
                  <span className={styles.benefitIcon} aria-hidden="true">
                    <Icon size={18} strokeWidth={2} />
                  </span>
                  <div>
                    <h4 className={styles.benefitTitle}>{title}</h4>
                    <p className={styles.benefitDescription}>{description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.installMethods} aria-label="RainSkills 安装方式">
            <h3 className={styles.installMethodsTitle}>任选一种安装方式</h3>

            <section className={styles.methodCard} aria-labelledby="agent-install-title">
              <div className={styles.methodHeader}>
                <span className={styles.agentMethodIcon} aria-hidden="true">
                  <Bot size={19} strokeWidth={2.1} />
                </span>
                <div className={styles.methodName}>
                  <h4 id="agent-install-title">复制到 AI Agent</h4>
                  <p>发送给 Codex、Claude Code 等 Agent</p>
                </div>
                <span className={styles.recommended}>推荐</span>
              </div>
              <div className={clsx(styles.copyRow, {
                [styles.copyRowSuccess]: copyState.target === 'agent' && copyState.status === 'copied',
              })}>
                <code>{RAINSKILLS_AGENT_PROMPT}</code>
                <button
                  type="button"
                  className={clsx(styles.copyButton, {
                    [styles.copyButtonSuccess]: copyState.target === 'agent' && copyState.status === 'copied',
                    [styles.copyButtonError]: copyState.target === 'agent' && copyState.status === 'error',
                  })}
                  onClick={() => handleCopy('agent')}
                >
                  {copyState.target === 'agent' && copyState.status === 'copied'
                    ? <Check size={16} strokeWidth={2.2} aria-hidden="true" />
                    : <Copy size={16} strokeWidth={2.2} aria-hidden="true" />}
                  {copyButtonLabel('agent', '复制给 Agent')}
                </button>
              </div>
            </section>

            <div className={styles.methodDivider} role="separator" aria-label="或者">
              <span>或</span>
            </div>

            <section className={styles.methodCard} aria-labelledby="command-install-title">
              <div className={styles.methodHeader}>
                <span className={styles.commandMethodIcon} aria-hidden="true">
                  <Terminal size={19} strokeWidth={2.1} />
                </span>
                <div className={styles.methodName}>
                  <h4 id="command-install-title">使用命令安装</h4>
                  <p>复制后在本地终端中执行</p>
                </div>
              </div>
              <div className={clsx(styles.copyRow, styles.commandRow, {
                [styles.commandRowSuccess]: copyState.target === 'command' && copyState.status === 'copied',
              })}>
                <code>{RAINSKILLS_INSTALL_COMMAND}</code>
                <button
                  type="button"
                  className={clsx(styles.copyButton, {
                    [styles.copyButtonSuccess]: copyState.target === 'command' && copyState.status === 'copied',
                    [styles.copyButtonError]: copyState.target === 'command' && copyState.status === 'error',
                  })}
                  onClick={() => handleCopy('command')}
                >
                  {copyState.target === 'command' && copyState.status === 'copied'
                    ? <Check size={16} strokeWidth={2.2} aria-hidden="true" />
                    : <Copy size={16} strokeWidth={2.2} aria-hidden="true" />}
                  {copyButtonLabel('command', '复制命令')}
                </button>
              </div>
            </section>

            <p className={styles.copyFeedback} aria-live="polite">
              {copyState.status === 'error' ? '复制失败，请重试' : ''}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
