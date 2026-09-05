const assert = require('assert');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

function test(name, fn) {
  try {
    fn();
  } catch (error) {
    error.message = `${name}: ${error.message}`;
    throw error;
  }
}

test('creates an independent RainSkills content collection with its own sidebar', () => {
  const entryPath = path.join(root, 'rainskills/index.mdx');
  assert.ok(fs.existsSync(entryPath), 'Expected the RainSkills collection entry.');
  assert.ok(!fs.existsSync(path.join(root, 'src/pages/rainskills.tsx')));
  assert.ok(!fs.existsSync(path.join(root, 'solutions/rainskills.mdx')));

  const entry = read('rainskills/index.mdx');
  [
    'slug: /',
    'hide_title: true',
    'hide_table_of_contents: true',
    "import RainSkillsDeployment from '@site/src/components/Solutions/RainSkillsDeployment';",
    '<RainSkillsDeployment />',
  ].forEach(copy => assert.ok(entry.includes(copy), `Expected collection entry: ${copy}`));

  const solutionsSidebar = read('solutionsSidebar.js');
  assert.ok(!solutionsSidebar.includes("id: 'rainskills'"));

  const rainskillsSidebar = read('rainskillsSidebar.js');
  [
    'rainskillsSidebar',
    "id: 'index'",
    "label: 'AI Agent 部署应用'",
  ].forEach(copy => assert.ok(rainskillsSidebar.includes(copy), `Expected RainSkills sidebar: ${copy}`));

  const config = read('docusaurus.config.js');
  [
    "id: 'rainskills'",
    "path: 'rainskills'",
    "routeBasePath: 'rainskills'",
    "sidebarPath: require.resolve('./rainskillsSidebar.js')",
  ].forEach(copy => assert.ok(config.includes(copy), `Expected RainSkills docs plugin: ${copy}`));

  const layout = read('src/theme/Layout/index.tsx');
  assert.ok(layout.includes("pathname.startsWith('/rainskills')"));
  assert.ok(layout.includes('rainskills_url'));
});

test('targets the requested RainSkills search intent from one canonical landing page', () => {
  const source = read('src/components/Solutions/RainSkillsDeployment.tsx');
  [
    'RainSkills：让Claude Code、Codex等AI Agent完成应用部署、排错和验证的开源Skill',
    "const canonicalUrl = 'https://www.rainbond.com/rainskills';",
    'Claude Code部署应用',
    'Claude Code部署到服务器',
    'Claude Code deployment skill',
    'Claude Code部署Skill',
    'Codex部署项目',
    'Codex deployment skill',
    'Codex部署到自己的服务器',
    'AI Agent运维Skill',
    '开源部署Skill',
    "'@type': 'SoftwareApplication'",
    "'@type': 'FAQPage'",
    "'@type': 'BreadcrumbList'",
  ].forEach(copy => assert.ok(source.includes(copy), `Expected landing-page SEO signal: ${copy}`));
});

test('presents a product-style deployment journey instead of a documentation article', () => {
  const source = read('src/components/Solutions/RainSkillsDeployment.tsx');
  [
    '<CompareHeroGraphic',
    'AI 写完代码后，部署不该重新从零开始',
    '从当前项目到自己的服务器，一条对话完成交付闭环',
    'Claude Code、Codex 都能使用同一套部署能力',
    '部署、排错、验证，不止是执行一段脚本',
    '为什么不直接让 Agent SSH 到服务器？',
    '常见问题',
    '开始使用 RainSkills',
    '/img/agents/claude-code.svg',
    '/img/agents/codex.svg',
  ].forEach(copy => assert.ok(source.includes(copy), `Expected product landing content: ${copy}`));
});

test('shows the real RainSkills deployment result instead of a simulated terminal', () => {
  const source = read('src/components/Solutions/RainSkillsDeployment.tsx');
  const styles = read('src/components/Solutions/rainskills-deployment.module.css');

  [
    'https://grstatic.tos-cn-beijing.volces.com/wechat/rainskills/rainskills-deploy.png',
    'alt="RainSkills 在 AI Agent 中完成应用部署并返回访问地址"',
    'width={1720}',
    'height={1194}',
    'loading="lazy"',
    'decoding="async"',
    'className={styles.deployScreenshot}',
  ].forEach(copy => assert.ok(source.includes(copy), `Expected real deployment image: ${copy}`));

  assert.ok(!source.includes('className={styles.terminal}'));
  assert.ok(!styles.includes('.terminalBody'));
  assert.ok(styles.includes('.deployScreenshot'));
});

test('links the homepage and both header implementations to the standalone page', () => {
  const choosePath = read('src/components/HomePage/ChoosePath/index.tsx');
  const customNavbar = read('src/components/NavBar/index.tsx');
  const docusaurusConfig = read('docusaurus.config.js');

  [customNavbar, docusaurusConfig].forEach((source, index) => {
    assert.ok(
      source.includes("label: 'AI Agent 部署应用'"),
      `Expected user-centered RainSkills title in navigation source ${index + 1}.`
    );
    assert.ok(!source.includes("label: 'RainSkills：AI Agent 部署应用'"));
  });

  [choosePath, customNavbar, docusaurusConfig].forEach((source, index) => {
    assert.ok(
      source.includes("'/rainskills'"),
      `Expected standalone RainSkills link in source ${index + 1}.`
    );
  });

  [choosePath, customNavbar].forEach(source => {
    assert.ok(!source.includes("'/solutions/rainskills'"));
  });

  assert.ok(docusaurusConfig.includes("from: '/solutions/rainskills'"));
  assert.ok(docusaurusConfig.includes("to: '/rainskills'"));
});

test('keeps the topic page responsive and accessible', () => {
  const styles = read('src/components/Solutions/rainskills-deployment.module.css');
  [
    '@media (max-width: 996px)',
    '@media (max-width: 576px)',
    '@media (prefers-reduced-motion: reduce)',
    ':focus-visible',
    'overflow-x: auto;',
    'grid-template-columns: 1fr;',
  ].forEach(token => assert.ok(styles.includes(token), `Expected responsive style: ${token}`));
});

console.log('RainSkills topic page tests passed');
