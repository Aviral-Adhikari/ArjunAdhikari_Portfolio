(() => {
  const posts = window.blogPosts || [];
  const list = document.querySelector('#blog-archive');
  const search = document.querySelector('#blog-search');
  const category = document.querySelector('#blog-category');
  const toggle = document.querySelector('.blog-lang-toggle');
  const dialog = document.querySelector('#post-dialog');
  let language = localStorage.getItem('arjun-site-language') === 'ne' ? 'ne' : 'en';

  const labels = {
    en: { all: 'All topics', read: 'Read article', search: 'Search blogs', empty: 'No articles match this search.', published: 'Published', close: 'Close article', archive: 'Blog archive' },
    ne: { all: 'सबै विषय', read: 'लेख पढ्नुहोस्', search: 'ब्लग खोज्नुहोस्', empty: 'यस खोजसँग मिल्ने लेख भेटिएन।', published: 'प्रकाशित', close: 'लेख बन्द गर्नुहोस्', archive: 'ब्लग संग्रह' }
  };

  function formatDate(date) {
    return new Intl.DateTimeFormat(language === 'ne' ? 'ne-NP' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(`${date}T00:00:00`));
  }

  function updateStaticCopy() {
    document.documentElement.lang = language;
    document.querySelectorAll('[data-en]').forEach(node => { node.textContent = node.dataset[language]; });
    toggle.querySelectorAll('span').forEach((node, index) => node.classList.toggle('active', index === (language === 'ne' ? 1 : 0)));
    toggle.setAttribute('aria-pressed', String(language === 'ne'));
    search.placeholder = labels[language].search;
    category.options[0].textContent = labels[language].all;
    document.title = language === 'ne' ? 'ब्लग | अधिवक्ता अर्जुन अधिकारी' : 'Blogs | Advocate Arjun Adhikari';
  }

  function populateCategories() {
    const selected = category.value;
    const values = [...new Set(posts.map(post => post.category.en))];
    category.innerHTML = `<option value="">${labels[language].all}</option>${values.map(value => {
      const post = posts.find(item => item.category.en === value);
      return `<option value="${value}">${post.category[language]}</option>`;
    }).join('')}`;
    category.value = values.includes(selected) ? selected : '';
  }

  function renderPosts() {
    const term = search.value.trim().toLocaleLowerCase();
    const chosen = category.value;
    const filtered = posts.filter(post => {
      const haystack = `${post.title[language]} ${post.excerpt[language]} ${post.category[language]}`.toLocaleLowerCase();
      return (!term || haystack.includes(term)) && (!chosen || post.category.en === chosen);
    });
    list.innerHTML = filtered.length ? filtered.map((post, index) => `
      <article class="archive-card reveal is-visible">
        <div class="archive-number">${String(index + 1).padStart(2, '0')}</div>
        <div class="archive-meta"><span>${post.category[language]}</span><time datetime="${post.date}">${formatDate(post.date)}</time></div>
        <h2>${post.title[language]}</h2>
        <p>${post.excerpt[language]}</p>
        <button type="button" class="read-post" data-slug="${post.slug}"><span>${labels[language].read}</span><i aria-hidden="true">↗</i></button>
      </article>`).join('') : `<p class="archive-empty">${labels[language].empty}</p>`;
  }

  function openPost(slug) {
    const post = posts.find(item => item.slug === slug);
    if (!post) return;
    dialog.querySelector('.dialog-category').textContent = post.category[language];
    dialog.querySelector('time').textContent = formatDate(post.date);
    dialog.querySelector('time').dateTime = post.date;
    dialog.querySelector('h2').textContent = post.title[language];
    dialog.querySelector('.dialog-read-time').textContent = post.readTime[language];
    dialog.querySelector('.dialog-body').innerHTML = post.body[language].map(paragraph => `<p>${paragraph}</p>`).join('');
    dialog.querySelector('.dialog-close').setAttribute('aria-label', labels[language].close);
    if (!dialog.open) dialog.showModal();
    history.replaceState(null, '', `#${post.slug}`);
  }

  function setLanguage(next) {
    language = next;
    localStorage.setItem('arjun-site-language', language);
    updateStaticCopy(); populateCategories(); renderPosts();
    if (dialog.open && location.hash) openPost(location.hash.slice(1));
  }

  list.addEventListener('click', event => { const button = event.target.closest('.read-post'); if (button) openPost(button.dataset.slug); });
  search.addEventListener('input', renderPosts);
  category.addEventListener('change', renderPosts);
  toggle.addEventListener('click', () => setLanguage(language === 'en' ? 'ne' : 'en'));
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => history.replaceState(null, '', location.pathname));

  setLanguage(language);
  if (location.hash) window.setTimeout(() => openPost(location.hash.slice(1)), 0);
})();
