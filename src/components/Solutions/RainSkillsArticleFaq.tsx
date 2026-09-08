import React from 'react';
import styles from './rainskills-deployment.module.css';

export type RainSkillsArticleFaqItem = {
  question: string;
  answer: string;
};

type Props = {
  items: RainSkillsArticleFaqItem[];
};

export default function RainSkillsArticleFaq({items}: Props): JSX.Element {
  return (
    <div className={styles.faqList}>
      {items.map((item) => (
        <details className={styles.faqItem} key={item.question}>
          <summary>{item.question}</summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
