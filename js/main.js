const GITHUB_USERNAME = 'hyojun-edu';
const systemThemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
const savedTheme = localStorage.getItem('portfolio-theme');
const state = { theme: savedTheme || (systemThemeQuery.matches ? 'dark' : 'light'), projects: [], filter: 'all' };
const select = (selector) => document.querySelector(selector);
const selectAll = (selector) => document.querySelectorAll(selector);
const escapeHtml = (value = '') => String(value).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));
const startTyping = () => {
  const target = select('.typing-text');
  const text = target.getAttribute('aria-label');
  let index = 0;
  const typeNextCharacter = () => {
    target.textContent += text[index];
    index += 1;
    if (index < text.length) window.setTimeout(typeNextCharacter, 90);
  };
  typeNextCharacter();
};
const renderFilters = () => {
  const languages = [...new Set(state.projects.map(({ language }) => language).filter(Boolean))].sort();
  state.filter = 'all';
  select('.project-filters').innerHTML = ['all', ...languages].map((filter) => `<button class="filter-button${filter === 'all' ? ' active' : ''}" data-filter="${escapeHtml(filter)}">${filter === 'all' ? '전체' : escapeHtml(filter)}</button>`).join('');
};

const applyTheme = () => {
  document.documentElement.dataset.theme = state.theme;
  const toggle = select('.theme-toggle');
  toggle.textContent = state.theme === 'dark' ? '☀' : '☾';
  toggle.setAttribute('aria-label', state.theme === 'dark' ? '라이트 모드 켜기' : '다크 모드 켜기');
};
const renderProjects = () => {
  const grid = select('.projects-grid');
  const projects = state.filter === 'all' ? state.projects : state.projects.filter(({ language }) => language === state.filter);
  if (!projects.length) { grid.innerHTML = ''; select('.projects-state').innerHTML = '<p>표시할 프로젝트가 없습니다.</p>'; return; }
  select('.projects-state').innerHTML = '';
  grid.innerHTML = projects.map(({ name, description, language, stargazers_count: stars, html_url: url }) => `<article class="project-card"><div class="project-card-top"><span>${escapeHtml(language || 'PROJECT')}</span><span>★ ${stars}</span></div><h3>${escapeHtml(name)}</h3><p>${escapeHtml(description || '설명이 입력되어있지 않은 프로젝트입니다.')}</p><div class="project-card-bottom"><span>GitHub Repository</span><a href="${escapeHtml(url)}" target="_blank" rel="noreferrer" aria-label="${escapeHtml(name)} 저장소 열기">보기 ↗</a></div></article>`).join('');
};
const loadProjects = async () => {
  const status = select('.projects-state');
  status.innerHTML = '<p class="loading-message"><span class="spinner"></span>프로젝트를 불러오는 중...</p>';
  select('.projects-grid').innerHTML = '';
  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=12`);
    if (!response.ok) throw new Error(`GitHub API 오류: ${response.status}`);
    state.projects = await response.json();
    renderFilters();
    renderProjects();
  } catch (error) {
    state.projects = [];
    renderFilters();
    status.innerHTML = '<p class="state-error">프로젝트를 불러올 수 없습니다. <button type="button" class="retry-button">다시 시도</button></p>';
    select('.retry-button').addEventListener('click', loadProjects);
  }
};
const validateField = (field) => {
  const value = field.value.trim(); let message = '';
  if (!value) message = '필수 입력 항목입니다.';
  else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) message = '올바른 이메일 형식을 입력해 주세요.';
  select(`[data-error-for="${field.name}"]`).textContent = message;
  field.setAttribute('aria-invalid', Boolean(message)); return !message;
};
const handleFormSubmit = async (event) => {
  event.preventDefault();
  event.stopImmediatePropagation();
  const form = event.currentTarget;
  const fields = [...form.querySelectorAll('input, textarea')];
  const message = select('.form-success');
  const submitButton = form.querySelector('button[type="submit"]');
  if (!fields.map(validateField).every(Boolean)) return;
  submitButton.disabled = true;
  message.textContent = '메시지를 보내는 중입니다...';
  try {
    const response = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error('Formspree 전송 실패');
    message.textContent = '메시지가 전송되었습니다. 감사합니다!';
    form.reset();
  } catch (error) {
    message.textContent = '전송에 실패했습니다. 잠시 후 다시 시도해 주세요.';
  } finally {
    submitButton.disabled = false;
  }
};
select('.contact-form').addEventListener('submit', handleFormSubmit, true);
applyTheme();
startTyping();
select('.theme-toggle').addEventListener('click', () => { state.theme = state.theme === 'dark' ? 'light' : 'dark'; localStorage.setItem('portfolio-theme', state.theme); applyTheme(); });
systemThemeQuery.addEventListener('change', ({ matches }) => { if (!localStorage.getItem('portfolio-theme')) { state.theme = matches ? 'dark' : 'light'; applyTheme(); } });
select('.menu-toggle').addEventListener('click', (event) => { const menu = select('.nav-links'); const active = menu.classList.toggle('active'); event.currentTarget.setAttribute('aria-expanded', active); });
selectAll('.nav-links a').forEach((link) => link.addEventListener('click', () => select('.nav-links').classList.remove('active')));
select('.project-filters').addEventListener('click', (event) => { const button = event.target.closest('.filter-button'); if (!button) return; state.filter = button.dataset.filter; selectAll('.filter-button').forEach((item) => item.classList.remove('active')); button.classList.add('active'); renderProjects(); });
select('.contact-form').addEventListener('submit', (event) => { event.preventDefault(); const fields = [...event.currentTarget.querySelectorAll('input, textarea')]; const valid = fields.map(validateField).every(Boolean); if (valid) { select('.form-success').textContent = '메시지가 전송되었습니다. 곧 연락드릴게요!'; event.currentTarget.reset(); } });
selectAll('.field input, .field textarea').forEach((field) => field.addEventListener('input', () => validateField(field)));
const observer = new IntersectionObserver((entries) => entries.forEach(({ isIntersecting, target }) => { if (isIntersecting) { target.classList.add('visible'); observer.unobserve(target); } }), { threshold: 0.2 });
selectAll('.reveal').forEach((section) => observer.observe(section));
const handleScroll = () => { const y = window.scrollY; select('.site-header').classList.toggle('scrolled', y > 60); select('.to-top').classList.toggle('visible', y > 300); };
window.addEventListener('scroll', handleScroll, { passive: true });
select('.to-top').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
loadProjects();
