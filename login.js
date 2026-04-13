/* =============================================
   login.js — Login Page Logic
   ============================================= */

const PORTFOLIO_URL = 'https://albybiju.github.io/portfolio1/';

/* ─── PARTICLES ──────────────────────────── */
(function spawnParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 2;
    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      --dur: ${Math.random() * 8 + 6}s;
      --delay: ${Math.random() * 8}s;
    `;
    container.appendChild(p);
  }
})();

/* ─── TAB SWITCH ─────────────────────────── */
let activeTab = 'email';

function switchTab(tab) {
  activeTab = tab;
  const emailGroup = document.getElementById('emailGroup');
  const phoneGroup = document.getElementById('phoneGroup');
  const toggleEmail = document.getElementById('toggleEmail');
  const togglePhone = document.getElementById('togglePhone');

  clearErrors();

  if (tab === 'email') {
    emailGroup.classList.remove('hidden');
    phoneGroup.classList.add('hidden');
    toggleEmail.classList.add('active');
    togglePhone.classList.remove('active');
    document.getElementById('emailInput').focus();
  } else {
    phoneGroup.classList.remove('hidden');
    emailGroup.classList.add('hidden');
    togglePhone.classList.add('active');
    toggleEmail.classList.remove('active');
    document.getElementById('phoneInput').focus();
  }
}

/* ─── PASSWORD TOGGLE ────────────────────── */
let pwVisible = false;

function togglePassword() {
  const input = document.getElementById('passwordInput');
  const btn   = document.getElementById('togglePw');
  pwVisible = !pwVisible;
  input.type = pwVisible ? 'text' : 'password';
  btn.textContent = pwVisible ? 'Hide' : 'Show';
}

/* ─── VALIDATION ─────────────────────────── */
function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function validatePhone(value) {
  const digits = value.replace(/[\s\-\+\(\)]/g, '');
  return digits.length >= 10 && /^\d+$/.test(digits);
}

function showFieldError(fieldId, errorId, message) {
  const input = document.getElementById(fieldId);
  const error = document.getElementById(errorId);
  if (input)  input.classList.add('error-field');
  if (error)  error.textContent = message;
}

function clearErrors() {
  ['emailInput', 'phoneInput', 'passwordInput'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('error-field');
  });
  ['emailError', 'phoneError', 'passwordError'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = '';
  });
  const banner = document.getElementById('errorBanner');
  if (banner) banner.classList.add('hidden');
}

/* ─── FORM SUBMIT ────────────────────────── */
function handleLogin(e) {
  e.preventDefault();
  clearErrors();

  const password = document.getElementById('passwordInput').value;
  let valid = true;

  // Validate identifier
  if (activeTab === 'email') {
    const email = document.getElementById('emailInput').value;
    if (!email.trim()) {
      showFieldError('emailInput', 'emailError', 'Email address is required.');
      valid = false;
    } else if (!validateEmail(email)) {
      showFieldError('emailInput', 'emailError', 'Please enter a valid email address.');
      valid = false;
    }
  } else {
    const phone = document.getElementById('phoneInput').value;
    if (!phone.trim()) {
      showFieldError('phoneInput', 'phoneError', 'Phone number is required.');
      valid = false;
    } else if (!validatePhone(phone)) {
      showFieldError('phoneInput', 'phoneError', 'Please enter a valid phone number (min 10 digits).');
      valid = false;
    }
  }

  // Validate password
  if (!password) {
    showFieldError('passwordInput', 'passwordError', 'Password is required.');
    valid = false;
  } else if (password.length < 4) {
    showFieldError('passwordInput', 'passwordError', 'Password must be at least 4 characters.');
    valid = false;
  }

  if (!valid) return;

  // Show loading state
  setLoading(true);

  // Simulate auth check then redirect
  setTimeout(() => {
    setLoading(false);
    redirectToPortfolio();
  }, 1400);
}

function setLoading(loading) {
  const btn    = document.getElementById('submitBtn');
  const text   = document.getElementById('btnText');
  const loader = document.getElementById('btnLoader');

  btn.disabled = loading;

  if (loading) {
    text.classList.add('hidden');
    loader.classList.remove('hidden');
  } else {
    loader.classList.add('hidden');
    text.classList.remove('hidden');
    text.textContent = '✓ Redirecting...';
    btn.style.background = 'var(--success)';
  }
}

function redirectToPortfolio() {
  window.location.href = PORTFOLIO_URL;
}

/* ─── ENTER KEY SUPPORT ──────────────────── */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const form = document.getElementById('loginForm');
    if (form) form.requestSubmit();
  }
});

/* ─── INPUT CLEAR ERROR ON TYPING ────────── */
['emailInput', 'phoneInput', 'passwordInput'].forEach(id => {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener('input', () => {
    el.classList.remove('error-field');
    const errId = id.replace('Input', 'Error');
    const err = document.getElementById(errId);
    if (err) err.textContent = '';
    document.getElementById('errorBanner')?.classList.add('hidden');
  });
});

console.log('🔐 Login page loaded — Alby Biju Portfolio');
