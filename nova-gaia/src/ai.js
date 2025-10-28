import { GoogleGenerativeAI } from '@google/generative-ai';
import { nanoid } from 'nanoid';

const modelName = 'models/gemini-2.5-pro';

function getClient() {
  const key = process.env.GOOGLE_API_KEY;
  if (!key) throw new Error('GOOGLE_API_KEY is not set');
  return new GoogleGenerativeAI(key);
}

const systemPrompt = `You are an evaluator AI in the fictional world of Nova Gaia. Assess a player's proposed action to undermine the Empire by shifting public sentiment. Evaluate:
1) Scale of impact (individual/local/regional/national/global)
2) Coordination (solo/spontaneous/organized/coalition/mass)
3) Feasibility (realistic logistics, resources, time, risk)
4) Narrative power (memetic reach, media leverage, storytelling)
5) Risks/downsides (backlash, repression, alienation, fatigue)

Scoring guideline (0–500):
- 0–3: trivial gestures
- 4–20: small civic/advocacy acts
- 21–100: coordinated local campaigns
- 101–250: regional/national, organized efforts
- 251–500: mass movements, high coordination, realistic logistics
"summary" should concisely state the likely POSITIVE impact if successful.
"consequences" should briefly note both projected benefits AND risks (e.g., "Benefits: ...; Risks: ...").

Return STRICT JSON only: { "summary": "short", "consequences": "short", "points": 0 }.`;

export async function evaluateAction(actionText, opts = {}) {
  const provider = (process.env.AI_PROVIDER || 'google').toLowerCase();
  if (provider === 'custom') {
    return evaluateWithCustomProvider(actionText, opts);
  }
  try {
    const client = getClient();
    const model = client.getGenerativeModel({ model: modelName, systemInstruction: systemPrompt });
    const user = `Action: ${actionText}\nReturn ONLY valid JSON with keys: summary, consequences, points (integer).`;
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: user }]}],
      generationConfig: { responseMimeType: 'application/json' }
    });
    const text = result.response.text();
    const json = safeParseJson(text);
    if (!json || typeof json.points !== 'number') throw new Error('Bad AI response');
    return { ...json, source: 'ai' };
  } catch (e) {
    console.error('AI evaluator failed:', e);
    // Fallback heuristic if API fails: derive points from keywords, scale, coordination, feasibility, and risk signals.
    const text = (actionText || '').toLowerCase();
    const keywords = [
      { re: /general\s+strike|nationwide\s+strike|mass\s+strike/, pts: 220 },
      { re: /strike|walkout|work stoppage/, pts: 120 },
      { re: /boycott|divest|sanction/, pts: 100 },
      { re: /whistleblow|leak|expos[eé]|reveal/, pts: 140 },
      { re: /union|organize|organise|coalition|network|cells?/, pts: 110 },
      { re: /protest|march|rally|sit-?in/, pts: 80 },
      { re: /media\s+campaign|viral|hashtag|documentary|podcast|zine/, pts: 90 },
      { re: /education|train(ing)?|workshop|teach-?in/, pts: 60 },
      { re: /petition|vote|letter|email campaign/, pts: 20 },
      { re: /mutual aid|community kitchen|clinic|shelter/, pts: 70 },
    ];
    let base = 0;
    for (const k of keywords) if (k.re.test(text)) base = Math.max(base, k.pts);
    // Scale modifiers
    const scaleBoost = (/global|planet|world|nationwide|national|regional/.test(text) ? 120 : /city|local|neighborhood|neighbourhood|campus/.test(text) ? 30 : 0);
    // Coordination modifiers
    const coordBoost = (/coordinate|co-?ordinate|organize|organise|coalition|union|cells?|chapters?|federation/.test(text) ? 80 : /together|group|team/.test(text) ? 30 : 0);
    // Feasibility penalty if unrealistic scale without logistics
    const grandiose = (/everyone|all\s+citizens|entire\s+planet|8\s*\,?0{8}|8\s*billion/.test(text));
    const logistics = (/plan|logistics|resources|timeline|phased|pilot|funding|infrastructure/.test(text));
    const feasPenalty = grandiose && !logistics ? -80 : 0;
    // Risk can add impact but with negative consequences
    const risky = (/risk|danger|repression|arrest|jail|retaliation|backlash/.test(text) || /leak|whistleblow|strike/.test(text));
    const riskBoost = risky ? 30 : 0;
    // Length signal (very short => trivial)
    const lenBoost = Math.min(40, Math.max(0, Math.floor(text.split(/\s+/).length / 10) * 8));

    let points = base + scaleBoost + coordBoost + feasPenalty + riskBoost + lenBoost;
    if (base === 0) points += Math.min(15, Math.max(0, Math.floor(text.length / 30))); // small floor for generic but non-empty
    points = Math.max(0, Math.min(500, Math.round(points)));

    const benefits = [];
    const cons = [];
    if (points >= 250) benefits.push('mass visibility and momentum');
    else if (points >= 100) benefits.push('broad reach and agenda-setting');
    else if (points >= 21) benefits.push('localized sentiment shift');
    else if (points >= 4) benefits.push('incremental awareness');
    if (feasPenalty < 0) cons.push('logistical gaps reduce effectiveness');
    if (risky) cons.push('risk of repression/backlash');
    if (coordBoost >= 80) cons.push('requires strong coordination');
    if (points <= 3) cons.push('minimal public impact');
    const benStr = benefits.length ? `Benefits: ${benefits.join('; ')}.` : '';
    const riskStr = cons.length ? `Risks: ${cons.join('; ')}.` : '';
    const consequences = [benStr, riskStr].filter(Boolean).join(' ');

    const summary = points >= 250 ? 'High-impact, mass-coordinated plan' : points >= 100 ? 'Solid organized action with broad reach' : points >= 21 ? 'Meaningful local coordinated effort' : points >= 4 ? 'Small advocacy act' : 'Trivial gesture';

    return { summary, consequences, points, source: 'heuristic' };
  }
}

function safeParseJson(txt) {
  try {
    // Extract JSON block if extra text
    const start = txt.indexOf('{');
    const end = txt.lastIndexOf('}');
    if (start >= 0 && end > start) {
      return JSON.parse(txt.slice(start, end + 1));
    }
    return JSON.parse(txt);
  } catch {
    return null;
  }
}

async function evaluateWithCustomProvider(actionText, { sessionId } = {}) {
  const url = process.env.CUSTOM_GPT_API_URL;
  const apiKey = process.env.CUSTOM_GPT_API_KEY;
  const channelId = process.env.CUSTOM_GPT_CHANNEL_ID;
  if (!url || !apiKey || !channelId) {
    throw new Error('Missing CUSTOM_GPT_* env vars');
  }
  const threadId = sessionId || nanoid(16);
  const form = new FormData();
  form.append('channel_id', channelId);
  form.append('thread_id', threadId);
  form.append('user_info', JSON.stringify({ sessionId: threadId }));
  const instruction = `Evaluate the following player action in the fictional world of Nova Gaia using this rubric:\n` +
    `1) Scale (individual/local/regional/national/global)\n` +
    `2) Coordination (solo/spontaneous/organized/coalition/mass)\n` +
    `3) Feasibility (logistics/resources/time/risk)\n` +
    `4) Narrative power (memetic reach/media/storytelling)\n` +
    `5) Risks and benefits.\n` +
    `Score 0-500 with guideline: 0–3 trivial; 4–20 small; 21–100 local coordinated; 101–250 regional/national organized; 251–500 mass coordinated logistics.\n` +
    `Return STRICT JSON only with keys: { "summary": "short positive impact", "consequences": "Benefits: ...; Risks: ...", "points": 0 }.`;
  form.append('message', `${instruction}\n\nAction: ${actionText}`);

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'x-api-key': apiKey },
    body: form
  });
  const txt = await res.text();
  const json = safeParseJson(txt);
  if (json && typeof json.points === 'number') {
    return { ...json, source: 'ai' };
  }
  throw new Error('Custom provider returned non-JSON');
}

export async function summarizeUpdate(previousSummary, newEvent, opts = {}) {
  const provider = (process.env.AI_PROVIDER || 'google').toLowerCase();
  const instruction = `You are maintaining a concise, narrative summary of Operation ANTA on Nova Gaia. Update the summary with the new event, only if the event is relevant, preserving style and coherence. Keep it brief, story-like, and reflective, blending benefits and risks. Return the FULL updated summary text only, only relevant information, no user IDs, no personal information.`;
  if (provider === 'custom') {
    const url = process.env.CUSTOM_GPT_API_URL;
    const apiKey = process.env.CUSTOM_GPT_API_KEY;
    const channelId = process.env.CUSTOM_GPT_CHANNEL_ID;
    const threadId = opts.sessionId || 'summary-thread';
    const form = new FormData();
    form.append('channel_id', channelId);
    form.append('thread_id', threadId);
    form.append('user_info', JSON.stringify({ kind: 'summary' }));
    form.append('message', `${instruction}\n\nPrevious Summary:\n${previousSummary}\n\nNew Event:\n${newEvent}`);
    const res = await fetch(url, { method: 'POST', headers: { 'x-api-key': apiKey }, body: form });
    return await res.text();
  }
  // Google path
  try {
    const client = getClient();
    const model = client.getGenerativeModel({ model: modelName, systemInstruction: instruction });
    const result = await model.generateContent({ contents: [{ role: 'user', parts: [{ text: `Previous Summary:\n${previousSummary}\n\nNew Event:\n${newEvent}` }]}] });
    return result.response.text();
  } catch {
    return previousSummary + `\n- ${newEvent}`;
  }
}


