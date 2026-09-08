import React from 'react';
import styles from './ai-private-deployment.module.css';

export type AiPrivateArticleFaqItem = {
  question: string;
  answer: string;
};

type Props = {
  items: AiPrivateArticleFaqItem[];
};

export default function AiPrivateArticleFaq({items}: Props): JSX.Element {
  return (
    <div className={styles.faqAccordion}>
      {items.map((item) => (
        <details className={styles.faqItem} key={item.question}>
          <summary>{item.question}</summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
