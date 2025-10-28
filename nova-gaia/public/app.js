const term = document.getElementById('term');
const goal = 8000000000;
let lastSpeaker = null; // 'agent' | 'player'

function beep() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.value = 880; // A5
  gain.gain.value = 0.05;
  osc.connect(gain).connect(ctx.destination);
  osc.start();
  setTimeout(() => { osc.stop(); ctx.close(); }, 140);
}

function addLine(text, speaker) {
  const div = document.createElement('div');
  div.className = 'line';
  const prefix = speaker && speaker !== lastSpeaker ? '>> ' : '';
  div.textContent = prefix + text;
  if (speaker) lastSpeaker = speaker;
  term.appendChild(div);
  window.scrollTo(0, document.body.scrollHeight);
}

function addPrompt() {
  const wrap = document.createElement('div');
  wrap.className = 'prompt';
  const pre = document.createElement('div'); pre.className = 'line'; pre.textContent = '>>';
  const inp = document.createElement('input'); inp.type = 'text'; inp.placeholder = 'Type your action...';
  const btn = document.createElement('button'); btn.textContent = 'Send';
  function submit() {
    const txt = inp.value.trim();
    if (!txt) return;
    wrap.remove();
    addLine(txt, 'player');
    evaluate(txt);
  }
  inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') submit(); });
  btn.addEventListener('click', submit);
  wrap.appendChild(pre); wrap.appendChild(inp); wrap.appendChild(btn);
  term.appendChild(wrap);
  inp.focus();
}

async function fetchScore() {
  const res = await fetch('/api/score', { credentials: 'include' });
  if (!res.ok) return { currentScore: 0, goal };
  return res.json();
}

async function evaluate(actionText) {
  const loader = addLoader();
  const res = await fetch('/api/evaluateAction', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include',
    body: JSON.stringify({ actionText })
  });
  loader.remove();
  if (!res.ok) {
    addLine('The systems faltered. Try again.', 'agent');
    addPrompt();
    return;
  }
  const data = await res.json();
  try { beep(); } catch {}
  addLine('Impact: ' + (data.summary || ''), 'agent');
  addLine('Outcome: ' + data.consequences, 'agent');
  if (data.source) addLine('Evaluator: ' + (data.source === 'ai' ? 'AI' : 'Fallback'), 'agent');
  addLine('Points gained: ' + data.points, 'agent');
  addLine('The new score is ' + formatScore(Number(data.newScore || 0)) + '/' + formatScore(goal), 'agent');
  maybeGrantAccess();
  addLine('What is your next move?', 'agent');
  addPrompt();
}

async function maybeGrantAccess() {
  const res = await fetch('/api/logAccess', { method: 'POST', credentials: 'include' });
  if (res.ok) {
    const link = document.createElement('span');
    link.className = 'grant';
    link.textContent = 'You have been granted access';
    link.addEventListener('click', async () => {
      const res2 = await fetch('/api/logAccess', { method: 'POST', credentials: 'include' });
      if (!res2.ok) return;
      const text = await res2.text();
      addLine('Narrative summary of Anta:', 'agent');
      const box = document.createElement('div'); box.id = 'logViewer'; box.textContent = text;
      term.appendChild(box);
    });
    const line = document.createElement('div'); line.className = 'line';
    line.textContent = '>> ';
    line.appendChild(link);
    term.appendChild(line);
  }
}

(async function init() {
    addLine('Welcome to the secret forces of Nova Gaia.', 'agent');
    addLine('For a long time the planet has been ruled by The Empire, who have sold the idea that life in Nova Gaia is perfect. But you have become aware that the whole world is built on lies. To keep the status quo, The Empire gives rights, food and shelter to a very few privileged people, leaving the majority of the population unattended and hidden of sight. To bring justice and equality to Nova Gaia, we have to work togheter to change the mindsets of every single person out of the 8 billion inhabitants in the planet. Alone we are powerless, togheter we are undestructible. You have been chosen, be careful and act wisely.', 'agent');
  const sc = await fetchScore();
  addLine('Current score: ' + formatScore(Number(sc.currentScore || 0)) + '/' + formatScore(goal), 'agent');
  addLine('How will you help destroy The Empire today?', 'agent');
  addPrompt();
})();

function formatScore(n) {
  const s = Math.max(0, Math.floor(n)).toString().padStart(10, '0');
  return s.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function addLoader() {
  const div = document.createElement('div');
  div.className = 'line';
  let i = 0;
  const frames = ['▒▒▒', '░▒▒', '░░▒', '░░░', '▒░░', '▒▒░'];
  const t = setInterval(() => {
    div.textContent = (lastSpeaker !== 'agent' ? '>> ' : '') + 'Thinking ' + frames[i % frames.length];
    i++;
  }, 120);
  div.remove = ((orig) => function() { clearInterval(t); orig.call(this); })(div.remove);
  term.appendChild(div);
  return div;
}


