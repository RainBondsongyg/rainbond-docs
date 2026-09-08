const assert = require('assert');
const fs = require('fs');
const path = require('path');

function read(relativePath) {
  return fs.readFileSync(path.join(__dirname, '..', relativePath), 'utf8');
}

function test(name, fn) {
  try {
    fn();
  } catch (error) {
    error.message = `${name}: ${error.message}`;
    throw error;
  }
}

const whyRainbondSource = read('src/components/HomePage/WhyRainbond/index.tsx');
const whyRainbondStyles = read('src/components/HomePage/WhyRainbond/styles.module.css');
const homeSource = read('src/pages/index.tsx');

test('why Rainbond preserves the approved left-side copy', () => {
  [
    'AI开发代码，Rainbond 让它稳定运行',
    'AI 可以完成一次部署，但环境、依赖、网络、数据和后续运维，仍需要 Rainbond 持续管理。',
    '让 AI 从代码',
    '部署与运维',
    '不只完成一次部署',
    'Rainbond 统一处理构建、网络、数据、证书和扩缩容。',
    '后续运维仍然可控',
    '查看状态和日志，完成升级、备份、恢复与回滚。',
    '仍然运行在你的环境',
    '应用、数据和模型保留在自己的服务器或 Kubernetes 中。',
  ].forEach((copy) => {
    assert.ok(whyRainbondSource.includes(copy), `Expected approved copy: ${copy}`);
  });
});

test('why Rainbond uses a labelled section and semantic benefit and card structures', () => {
  const labelledBy = whyRainbondSource.match(/<section[\s\S]*?aria-labelledby="([^"]+)"/);
  assert.ok(labelledBy, 'Expected the section to use aria-labelledby.');
  assert.ok(
    new RegExp(`<h2\\s+id="${labelledBy[1]}"`).test(whyRainbondSource),
    'Expected aria-labelledby to reference the section h2.'
  );
  assert.ok(/<h3 className=\{styles\.claim\}>/.test(whyRainbondSource), 'Expected the main claim to be a lower-level heading.');
  assert.ok(/<ul className=\{styles\.benefitList\}>[\s\S]*<li[\s\S]*<\/li>[\s\S]*<\/ul>/.test(whyRainbondSource));
  assert.strictEqual((whyRainbondSource.match(/<section className=\{styles\.methodCard\}/g) || []).length, 2);
  assert.strictEqual((whyRainbondSource.match(/onClick=\{\(\) => handleCopy\('(agent|command)'\)\}/g) || []).length, 2);
  assert.ok(/role="separator" aria-label="或者"/.test(whyRainbondSource));
});

test('why Rainbond presents two alternative RainSkills installation methods', () => {
  const agentIndex = whyRainbondSource.indexOf('复制到 AI Agent');
  const separatorIndex = whyRainbondSource.indexOf('aria-label="或者"');
  const commandIndex = whyRainbondSource.indexOf('使用命令安装');

  assert.ok(agentIndex >= 0 && separatorIndex > agentIndex && commandIndex > separatorIndex);
  assert.ok(whyRainbondSource.includes("const RAINSKILLS_AGENT_PROMPT = '帮我安装rainskills';"));
  assert.ok(whyRainbondSource.includes("const RAINSKILLS_INSTALL_COMMAND = 'npx --yes rainskills';"));
  assert.ok(whyRainbondSource.includes('任选一种安装方式'));
  assert.ok(whyRainbondSource.includes('推荐'));
});

test('homepage places Why Rainbond second and moves ChoosePath directly before Users', () => {
  const order = ['<Hero />', '<WhyRainbond />', '<Demo />', '<ChoosePath />', '<Users />', '<DeployCommand />'];
  let previousIndex = -1;

  order.forEach((component) => {
    const componentIndex = homeSource.indexOf(component);
    assert.ok(componentIndex > previousIndex, `Expected ${component} in the approved homepage order.`);
    previousIndex = componentIndex;
  });
});

test('desktop keeps the 46/54 split and stacks the two installation methods', () => {
  assert.ok(
    /\.contentGrid\s*\{[\s\S]*grid-template-columns:\s*minmax\(0,\s*0\.46fr\)\s+minmax\(0,\s*0\.54fr\);/.test(whyRainbondStyles),
    'Expected the approved desktop copy/visual split.'
  );
  assert.ok(/\.installMethods\s*\{[\s\S]*display:\s*grid;[\s\S]*gap:\s*0\.875rem;/.test(whyRainbondStyles));
  assert.ok(/\.methodDivider\s*\{[\s\S]*grid-template-columns:\s*minmax\(0,\s*1fr\)\s+auto\s+minmax\(0,\s*1fr\);/.test(whyRainbondStyles));
});

test('mobile stacks content and keeps both copy actions usable', () => {
  assert.ok(/\.section\s*\{[\s\S]*overflow:\s*(?:hidden|clip);/.test(whyRainbondStyles));
  assert.ok(
    /@media \(max-width:\s*959px\)\s*\{[\s\S]*\.contentGrid\s*\{[\s\S]*grid-template-columns:\s*1fr;/.test(whyRainbondStyles),
    'Expected a single-column mobile layout below 960px.'
  );
  assert.ok(/@media \(max-width:\s*600px\)\s*\{[\s\S]*\.copyRow\s*\{[\s\S]*grid-template-columns:\s*1fr;/.test(whyRainbondStyles));
  assert.ok(/@media \(max-width:\s*600px\)\s*\{[\s\S]*\.copyButton\s*\{[\s\S]*width:\s*100%;/.test(whyRainbondStyles));
});

test('both installation methods copy independently and emit source-specific analytics', () => {
  assert.ok(whyRainbondSource.includes("import copyToClipboard from 'copy-to-clipboard';"));
  assert.ok(whyRainbondSource.includes("import { trackUmamiEvent } from '@src/utils/umami';"));
  assert.ok(whyRainbondSource.includes("'cta_home_second_screen_rainskills_agent_copied'"));
  assert.ok(whyRainbondSource.includes("'cta_home_second_screen_rainskills_command_copied'"));
  assert.ok(whyRainbondSource.includes("module: 'home_second_screen'"));
  assert.ok(whyRainbondSource.includes("position: 'second_screen'"));
  assert.ok(whyRainbondSource.includes("install_method: target"));
  assert.ok(/<p className=\{styles\.copyFeedback\} aria-live="polite">/.test(whyRainbondSource));
  assert.ok(whyRainbondSource.includes('复制失败，请重试'));
});

console.log('home Why Rainbond tests passed');
