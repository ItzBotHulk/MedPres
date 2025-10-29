// --------- Keys used in localStorage ----------
const LS_USERS = 'mp_users';
const LS_LOGGED = 'mp_loggedInUser';

// ---------- Simple mapping of symptoms -> suggestions ----------
const SUGGESTIONS_DB = {
  fever: {
    title: 'Fever',
    medicines: ['Paracetamol (as per dose)', 'Oral rehydration'],
    advice: ['Drink fluids', 'Rest', 'Monitor temperature', 'Consult if > 38.5°C or persistent']
  },
  headache: {
    title: 'Headache',
    medicines: ['Ibuprofen (if no contraindication)', 'Paracetamol'],
    advice: ['Rest in quiet/dim place', 'Stay hydrated', 'Avoid bright screens']
  },
  cough: {
    title: 'Cough',
    medicines: ['Honey (for adults/children >1yr)', 'Dextromethorphan (OTC)'],
    advice: ['Warm fluids', 'Humidify air', 'See doctor if cough is severe or blood-streaked']
  },
  'sore throat': {
    title: 'Sore throat',
    medicines: ['Lozenges', 'Paracetamol for pain'],
    advice: ['Gargle with warm saline', 'Stay hydrated']
  },
  nausea: {
    title: 'Nausea',
    medicines: ['Ondansetron (prescribed)', 'Oral rehydration'],
    advice: ['Small sips of clear fluids', 'Avoid fatty foods']
  },
  cold: {
    title: 'Cold / Runny nose',
    medicines: ['Antihistamine (OTC)', 'Decongestant (short-term)'],
    advice: ['Steam inhalation', 'Rest']
  },
  fatigue: {
    title: 'Fatigue',
    medicines: ['Consider multivitamin if deficient - consult'],
    advice: ['Good sleep', 'Balanced diet', 'See doctor if persistent']
  },
  'shortness of breath': {
    title: 'Shortness of breath',
    medicines: [],
    advice: ['Seek urgent medical care if severe', 'Avoid exertion', 'Call emergency services if sudden/worsening']
  }
};

// ---------- Utilities ----------
function readUsers() {
  try {
    return JSON.parse(localStorage.getItem(LS_USERS) || '{}');
  } catch (e) {
    return {};
  }
}
function saveUsers(obj) {
  localStorage.setItem(LS_USERS, JSON.stringify(obj));
}
function setLoggedIn(username) {
  localStorage.setItem(LS_LOGGED, username);
}
function getLoggedIn() {
  return localStorage.getItem(LS_LOGGED);
}
function clearSession() {
  localStorage.removeItem(LS_LOGGED);
}

// ---------- Auth Page ----------
function initAuthPage() {
  if (getLoggedIn()) window.location.href = 'index.html';

  const loginForm = document.getElementById('login-form');
  const regForm = document.getElementById('register-form');
  const showRegister = document.getElementById('show-register');
  const showLogin = document.getElementById('show-login');
  const loginMsg = document.getElementById('login-msg');
  const regMsg = document.getElementById('reg-msg');

  showRegister.addEventListener('click', e => {
    e.preventDefault();
    loginForm.classList.add('hidden');
    regForm.classList.remove('hidden');
    loginMsg.textContent = '';
  });
  showLogin.addEventListener('click', e => {
    e.preventDefault();
    regForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
    regMsg.textContent = '';
  });

  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    loginMsg.textContent = '';
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;
    if (!username || !password) {
      loginMsg.textContent = 'Please fill credentials.';
      return;
    }
    const users = readUsers();
    if (users[username] && users[username].password === password) {
      setLoggedIn(username);
      window.location.href = 'index.html';
    } else {
      loginMsg.textContent = 'Invalid username or password.';
    }
  });

  regForm.addEventListener('submit', e => {
    e.preventDefault();
    regMsg.textContent = '';
    const username = document.getElementById('reg-username').value.trim();
    const password = document.getElementById('reg-password').value;
    const confirm = document.getElementById('reg-password-confirm').value;
    if (!username || !password) { regMsg.textContent = 'Please provide username and password.'; return; }
    if (password !== confirm) { regMsg.textContent = 'Passwords do not match.'; return; }
    const users = readUsers();
    if (users[username]) { regMsg.textContent = 'Username already taken.'; return; }

    users[username] = { password };
    saveUsers(users);
    setLoggedIn(username);
    window.location.href = 'index.html';
  });
}

// ---------- App Page ----------
function initAppPage() {
  const user = getLoggedIn();
  if (!user) window.location.href = 'login.html';

  setupNavbar(user);

  document.getElementById('welcome-user').textContent = `Hi, ${user}`;
  document.getElementById('year').textContent = new Date().getFullYear();

  document.getElementById('logout-btn').addEventListener('click', () => {
    clearSession();
    window.location.href = 'login.html';
  });

  const symptomForm = document.getElementById('symptom-form');
  const resultsEl = document.getElementById('results');
  const resultsEmpty = document.getElementById('results-empty');
  const resetBtn = document.getElementById('reset-btn');

  symptomForm.addEventListener('submit', e => {
    e.preventDefault();
    const selected = Array.from(document.querySelectorAll('input[name="symptom"]:checked')).map(i => i.value);
    const otherRaw = document.getElementById('symptom-other').value.trim();
    const others = otherRaw ? otherRaw.split(',').map(s => s.trim().toLowerCase()).filter(Boolean) : [];
    const allSymptoms = [...new Set([...selected, ...others])];

    if (allSymptoms.length === 0) {
      resultsEl.innerHTML = '';
      resultsEl.classList.add('hidden');
      resultsEmpty.textContent = 'Please select or enter at least one symptom.';
      return;
    }

    const suggestions = getSuggestionsForSymptoms(allSymptoms);
    renderSuggestions(suggestions, allSymptoms);
  });

  resetBtn.addEventListener('click', () => {
    document.querySelectorAll('input[name="symptom"]').forEach(i => i.checked = false);
    document.getElementById('symptom-other').value = '';
    resultsEl.innerHTML = '';
    resultsEl.classList.add('hidden');
    resultsEmpty.textContent = 'Enter symptoms and click Get Suggestions.';
  });
}

// ---------- Suggestion logic ----------
function getSuggestionsForSymptoms(symptoms) {
  const hits = [];
  const unknown = [];
  symptoms.forEach(s => {
    const key = s.toLowerCase();
    if (SUGGESTIONS_DB[key]) hits.push({ key, data: SUGGESTIONS_DB[key] });
    else unknown.push(s);
  });
  const severityFlag = symptoms.includes('shortness of breath') || symptoms.includes('chest pain');
  return { hits, unknown, severityFlag };
}

function renderSuggestions({ hits, unknown, severityFlag }, allSymptoms) {
  const resultsEl = document.getElementById('results');
  const resultsEmpty = document.getElementById('results-empty');
  resultsEl.innerHTML = '';

  if (severityFlag) {
    resultsEl.appendChild(createBlock('Urgent: Seek medical attention', 'One or more symptoms may indicate a serious condition. Please contact local emergency services or a doctor immediately.', true));
  }

  hits.forEach(h => {
    resultsEl.appendChild(createBlock(h.data.title + ' <span class="tag">Symptom matched</span>', 
      `<strong>Suggested medicines:</strong> ${h.data.medicines.length ? h.data.medicines.join(', ') : '<em>Consult doctor</em>'}
       <br><strong>Advice:</strong><ul class="result-list">${h.data.advice.map(a => `<li>${a}</li>`).join('')}</ul>`));
  });

  if (unknown.length > 0) {
    resultsEl.appendChild(createBlock('Custom / unmatched symptoms', `We could not find automatic matches for: <strong>${unknown.join(', ')}</strong>. Consider consulting a doctor.`));
  }

  resultsEl.appendChild(createBlock('Summary', `Symptoms entered: <strong>${allSymptoms.join(', ')}</strong><br>If symptoms persist or worsen, please consult a healthcare professional.`));
  resultsEl.classList.remove('hidden');
  resultsEmpty.textContent = '';
}

function createBlock(title, html, isUrgent = false) {
  const div = document.createElement('div');
  div.className = 'result-block';
  div.innerHTML = `<h3${isUrgent ? ' style="color:var(--danger)"' : ''}>${title}</h3><div>${html}</div>`;
  return div;
}

// ---------- Generic pages ----------
function initGenericPage() {
  const user = getLoggedIn();
  if (!user) window.location.href = 'login.html';

  setupNavbar(user);
  document.getElementById('welcome-user').textContent = `Hi, ${user}`;
  document.getElementById('year').textContent = new Date().getFullYear();
  document.getElementById('logout-btn').addEventListener('click', () => {
    clearSession();
    window.location.href = 'login.html';
  });
}

// ---------- Contact Page ----------
function initContactPage() {
  initGenericPage();
  const form = document.getElementById('contact-form');
  const msgEl = document.getElementById('contact-msg');

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();
    if (!name || !email || !message) {
      msgEl.textContent = 'Please fill all fields.';
      return;
    }
    const feedbackList = JSON.parse(localStorage.getItem('mp_feedback') || '[]');
    feedbackList.push({ name, email, message, date: new Date().toISOString() });
    localStorage.setItem('mp_feedback', JSON.stringify(feedbackList));
    msgEl.style.color = 'green';
    msgEl.textContent = 'Thank you! Your message has been saved locally.';
    form.reset();
  });
}

// ---------- Navbar ----------
function setupNavbar(user) {
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav-links');
  const feedbackLink = document.getElementById('feedback-link');
  if (toggle && nav) toggle.addEventListener('click', () => nav.classList.toggle('show'));
  if (feedbackLink) feedbackLink.classList.toggle('hidden', !(user && user.toLowerCase() === 'admin'));
}

// ---------- Feedback Page ----------
function initFeedbackPage() {
  const user = getLoggedIn();
  if (!user) window.location.href = 'login.html';
  setupNavbar(user);

  document.getElementById('welcome-user').textContent = `Hi, ${user}`;
  document.getElementById('year').textContent = new Date().getFullYear();
  document.getElementById('logout-btn').addEventListener('click', () => {
    clearSession();
    window.location.href = 'login.html';
  });

  if (user.toLowerCase() !== 'admin') {
    document.querySelector('main').innerHTML = `<section class="card"><h2>Access Denied</h2><p>You must be logged in as <strong>admin</strong> to view feedback.</p></section>`;
    return;
  }

  const listEl = document.getElementById('feedback-list');
  const feedbacks = JSON.parse(localStorage.getItem('mp_feedback') || '[]');
  if (!feedbacks.length) { listEl.innerHTML = `<p class="muted">No feedback messages yet.</p>`; return; }

  listEl.innerHTML = feedbacks.map(f => `
    <div class="result-block">
      <h3>${f.name} <span class="tag small">${f.email}</span></h3>
      <p>${f.message}</p>
      <p class="small-muted">Submitted: ${new Date(f.date).toLocaleString()}</p>
    </div>
  `).join('');
}

// ---------- About Page Testimonials ----------
function initAboutTestimonials() {
  const user = getLoggedIn();
  if (!user) window.location.href = 'login.html';
  setupNavbar(user);

  const form = document.getElementById('testimonial-form');
  const nameInput = document.getElementById('testimony-name');
  const textInput = document.getElementById('testimony-text');
  const msgEl = document.getElementById('testimony-msg');
  const listEl = document.getElementById('testimonial-list');

  function loadTestimonials() {
    const testimonials = JSON.parse(localStorage.getItem('mp_testimonials') || '[]');
    listEl.innerHTML = !testimonials.length
      ? '<p class="muted">No testimonials yet. Be the first to submit!</p>'
      : testimonials.map(t => `<div class="testimonial"><h4>${t.name}</h4><p>${t.text}</p><small class="small-muted">${new Date(t.date).toLocaleString()}</small></div>`).join('');
  }

  loadTestimonials();

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const text = textInput.value.trim();
    if (!name || !text) {
      msgEl.textContent = 'Please fill all fields.';
      msgEl.style.color = 'red';
      return;
    }
    const testimonials = JSON.parse(localStorage.getItem('mp_testimonials') || '[]');
    testimonials.push({ name, text, date: new Date().toISOString() });
    localStorage.setItem('mp_testimonials', JSON.stringify(testimonials));
    msgEl.textContent = 'Thank you for your testimony!';
    msgEl.style.color = 'green';
    form.reset();
    loadTestimonials();
  });
}
