// ============================================
// AUTH MODAL (Login / Signup)
// ============================================
(function(){
  const modal = document.getElementById('authModal');
  if(!modal) return;
  const tabs = modal.querySelectorAll('.tab');
  const forms = modal.querySelectorAll('.auth-form');

  const open = () => { modal.classList.add('open'); document.body.style.overflow = 'hidden'; };
  const close = () => { modal.classList.remove('open'); document.body.style.overflow = ''; };

  document.getElementById('loginBtn')?.addEventListener('click', open);
  modal.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', close));
  modal.addEventListener('click', e => { if(e.target === modal) close(); });

  tabs.forEach(t => t.addEventListener('click', () => {
    tabs.forEach(x => x.classList.remove('active'));
    forms.forEach(x => x.classList.remove('active'));
    t.classList.add('active');
    modal.querySelector('#' + t.dataset.tab + 'Form').classList.add('active');
  }));

  const validators = {
    name: v => v.trim().length >= 2 || 'Please enter your full name',
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Please enter a valid email',
    password: v => v.length >= 6 || 'Password must be at least 6 characters',
  };

  const validateField = (input) => {
    const name = input.name;
    const rule = validators[name];
    if(!rule) return true;
    const res = rule(input.value);
    const errEl = input.parentElement.querySelector('.err');
    if(res === true){
      input.parentElement.classList.remove('invalid');
      if(errEl) errEl.textContent = '';
      return true;
    } else {
      input.parentElement.classList.add('invalid');
      if(errEl) errEl.textContent = res;
      return false;
    }
  };

  modal.querySelectorAll('input').forEach(inp => {
    inp.addEventListener('blur', () => validateField(inp));
    inp.addEventListener('input', () => { if(inp.parentElement.classList.contains('invalid')) validateField(inp); });
  });

  const handle = (form, extra) => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      let ok = true;
      form.querySelectorAll('input[required]').forEach(inp => { if(!validateField(inp)) ok = false; });
      if(extra) ok = extra(form) && ok;
      if(!ok) return;
      KefayatStore.toast(form.id === 'loginForm' ? 'Welcome back!' : 'Account created successfully!');
      close();
      form.reset();
    });
  };

  handle(document.getElementById('loginForm'));
  handle(document.getElementById('signupForm'), (form) => {
    const pw = form.querySelector('[name="password"]');
    const cf = form.querySelector('[name="confirm"]');
    if(pw.value !== cf.value){
      cf.parentElement.classList.add('invalid');
      cf.parentElement.querySelector('.err').textContent = 'Passwords do not match';
      return false;
    }
    return true;
  });
})();