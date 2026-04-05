// Tab Switching Functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.section-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    // Function to switch tabs
    function switchTab(tabName) {
        // Remove active class from all tabs and contents
        tabButtons.forEach(button => button.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // Add active class to selected tab and content
        const activeButton = document.querySelector(`[data-tab="${tabName}"]`);
        const activeContent = document.getElementById(tabName);
        
        if (activeButton && activeContent) {
            activeButton.classList.add('active');
            activeContent.classList.add('active');
        }
    }

    // Add click event listeners to tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            switchTab(tabName);
            // If publications tab is activated, update language for abstracts after DOM update
            if (tabName === 'publications') {
                setTimeout(() => {
                    const lang = localStorage.getItem('selectedLanguage') || 'en';
                    document.querySelectorAll('[data-translate]').forEach(el => {
                        const key = el.getAttribute('data-translate');
                        const textSpan = el.querySelector('.abstract-text');
                        if (textSpan && translations[lang][key]) {
                            textSpan.innerHTML = translations[lang][key];
                        }
                    });
                    // Ensure toggles exist and labels reflect current language
                    ensureAbstractToggles();
                    if (typeof window.refreshAbstractToggleLabels === 'function') {
                        window.refreshAbstractToggleLabels(lang);
                    }
                }, 0);
            }
        });
    });

    // Initialize with projects tab active (already set in HTML)
    console.log('Portfolio website loaded successfully!');

    // Expand/collapse publication abstract
    // Insert toggle controls for each publication abstract and handle clicks
    function getAbstractToggleLabel(lang, expanded) {
        if (lang === 'es') {
            return expanded ? 'ocultar abstract −' : 'mostrar abstract +';
        }
        return expanded ? 'hide abstract −' : 'show abstract +';
    }

    function ensureAbstractToggles() {
        const lang = localStorage.getItem('selectedLanguage') || 'en';
        document.querySelectorAll('.publication-item').forEach(item => {
            const abstract = item.querySelector('.publication-abstract');
            if (!abstract) return;
            const text = abstract.querySelector('.abstract-text');
            if (text) {
                text.style.display = 'none';
            }
            let toggle = item.querySelector('.abstract-toggle');
            if (!toggle) {
                toggle = document.createElement('button');
                toggle.type = 'button';
                toggle.className = 'abstract-toggle';
                toggle.setAttribute('aria-expanded', 'false');
            }
            // Determine insertion point: before downloads, else before first PDF link, else after abstract
            const downloads = item.querySelector('.publication-downloads');
            const firstPdfLink = item.querySelector('.publication-abstract .publication-pdf-link, .publication-pdf-link');
            if (downloads && downloads.parentElement) {
                downloads.parentElement.insertBefore(toggle, downloads);
            } else if (firstPdfLink && firstPdfLink.parentElement) {
                firstPdfLink.parentElement.insertBefore(toggle, firstPdfLink);
            } else {
                abstract.parentElement.insertBefore(toggle, abstract.nextSibling);
            }
            toggle.textContent = getAbstractToggleLabel(lang, false);
        });
    }

    ensureAbstractToggles();

    // New helper to update labels when language changes
    window.refreshAbstractToggleLabels = function(lang) {
        document.querySelectorAll('.publication-item .abstract-toggle').forEach(btn => {
            const expanded = btn.getAttribute('aria-expanded') === 'true';
            btn.textContent = getAbstractToggleLabel(lang, expanded);
        });
    }

    document.querySelector('.publication-list')?.addEventListener('click', function(e) {
        if (e.target.classList.contains('abstract-toggle')) {
            const btn = e.target;
            const lang = localStorage.getItem('selectedLanguage') || 'en';
            const item = btn.closest('.publication-item');
            if (!item) return;
            const abstract = item.querySelector('.publication-abstract');
            const text = abstract?.querySelector('.abstract-text');
            const expanded = btn.getAttribute('aria-expanded') === 'true';
            if (text) {
                text.style.display = expanded ? 'none' : 'block';
            }
            btn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
            btn.textContent = getAbstractToggleLabel(lang, !expanded);
        }
    });

    // Lightbox for images in publications and elsewhere
    document.body.addEventListener('click', function(e) {
        const link = e.target.closest('.lightbox-link');
        if (link) {
            e.preventDefault();
            const imgSrc = link.getAttribute('data-img');
            const overlay = document.getElementById('lightbox-overlay');
            const img = document.getElementById('lightbox-img');
            if (imgSrc && overlay && img) {
                img.src = imgSrc;
                overlay.style.display = 'flex';
            }
        }
    });
    const overlay = document.getElementById('lightbox-overlay');
    if (overlay) {
        overlay.addEventListener('click', function() {
            overlay.style.display = 'none';
            const img = document.getElementById('lightbox-img');
            if (img) img.src = '';
        });
    }
});

// Smooth scrolling for future project links
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add some basic accessibility features
document.addEventListener('keydown', function(event) {
    // Allow tab navigation with arrow keys
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        const activeTab = document.querySelector('.section-btn.active');
        const tabButtons = Array.from(document.querySelectorAll('.section-btn'));
        const currentIndex = tabButtons.indexOf(activeTab);
        
        let newIndex;
        if (event.key === 'ArrowUp') {
            newIndex = currentIndex > 0 ? currentIndex - 1 : tabButtons.length - 1;
        } else {
            newIndex = currentIndex < tabButtons.length - 1 ? currentIndex + 1 : 0;
        }
        
        tabButtons[newIndex].click();
    }
}); 

// --- Scroll Position Memory ---
function saveScrollPosition() {
  if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/')) {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    localStorage.setItem('indexScrollPosition', scrollPosition.toString());
  }
}

function restoreScrollPosition() {
  if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/')) {
    const savedPosition = localStorage.getItem('indexScrollPosition');
    if (savedPosition) {
      // Wait for content to load, then restore position
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedPosition));
        // Clean up the saved position after restoring
        localStorage.removeItem('indexScrollPosition');
      }, 100);
    }
  }
}

let projectRenderToken = 0;
let activeTagFilter = null;

function preloadTopProjectImages(projectsToPreload) {
  document.querySelectorAll('link[data-project-preload="true"]').forEach(link => link.remove());

  projectsToPreload.forEach(project => {
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.as = 'image';
    preloadLink.href = project.image;
    preloadLink.setAttribute('fetchpriority', 'high');
    preloadLink.setAttribute('data-project-preload', 'true');
    document.head.appendChild(preloadLink);
  });
}

function createProjectCard(project, lang) {
  const card = document.createElement('a');
  card.href = project.link;
  card.className = 'project-link';

  const projectItem = document.createElement('div');
  projectItem.className = 'project-item';
  projectItem.style.background = `linear-gradient(rgba(30,30,30,0.72), rgba(30,30,30,0.82)), url('${project.image}') center center/cover no-repeat`;
  projectItem.innerHTML = `
      <h3>${project.title[lang]}</h3>
      <p class="project-meta">${project.meta[lang]}</p>
    `;

  let hoverTimeout;
  projectItem.addEventListener('mouseenter', function() {
    clearTimeout(hoverTimeout);
    hoverTimeout = setTimeout(() => {
      this.style.background = `linear-gradient(rgba(30,30,30,0.5), rgba(30,30,30,0.6)), url('${project.image}') center center/cover no-repeat`;
    }, 50);
  });

  projectItem.addEventListener('mouseleave', function() {
    clearTimeout(hoverTimeout);
    this.style.background = `linear-gradient(rgba(30,30,30,0.72), rgba(30,30,30,0.82)), url('${project.image}') center center/cover no-repeat`;
  });

  card.appendChild(projectItem);
  return card;
}

// --- Dynamic Project Rendering ---
function renderProjects(lang, tagFilter) {
  if (typeof projects === 'undefined') return;
  let sorted = projects.slice().sort((a, b) => b.year - a.year);

  // Apply tag filter
  if (tagFilter) {
    sorted = sorted.filter(p => p.tags && p.tags.includes(tagFilter));
  }

  const topProjects = sorted.slice(0, 3);
  const remainingProjects = sorted.slice(3);
  const currentRenderToken = ++projectRenderToken;

  preloadTopProjectImages(topProjects);

  const container = document.getElementById('project-list');
  if (!container) return;
  container.innerHTML = '';

  topProjects.forEach(project => {
    container.appendChild(createProjectCard(project, lang));
  });

  const appendRemainingProjects = () => {
    if (currentRenderToken !== projectRenderToken) return;

    if (remainingProjects.length > 0) {
      const fragment = document.createDocumentFragment();
      remainingProjects.forEach(project => {
        fragment.appendChild(createProjectCard(project, lang));
      });
      container.appendChild(fragment);
    }

    restoreScrollPosition();
  };

  if (remainingProjects.length === 0) {
    restoreScrollPosition();
    return;
  }

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(appendRemainingProjects, { timeout: 200 });
  } else {
    setTimeout(appendRemainingProjects, 0);
  }
}

// --- Language Switching Integration ---
function getCurrentLanguage() {
  return localStorage.getItem('selectedLanguage') || 'en';
}

// Patch language switching to re-render projects
const origSetLanguage = window.setLanguage;
window.setLanguage = function(lang) {
  if (typeof origSetLanguage === 'function') origSetLanguage(lang);
  renderProjects(getCurrentLanguage(), activeTagFilter);
  updateTagLabels(lang);
  // Update abstract toggle labels to current language
  if (typeof window.refreshAbstractToggleLabels === 'function') {
    window.refreshAbstractToggleLabels(lang);
  }
};

function updateTagLabels(lang) {
  document.querySelectorAll('.tag-btn').forEach(btn => {
    const label = btn.getAttribute('data-label-' + lang);
    if (label) btn.textContent = label;
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const lang = getCurrentLanguage();
  updateTagLabels(lang);
  renderProjects(lang, activeTagFilter);

  // Tag filter buttons
  document.querySelectorAll('.tag-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const tag = this.getAttribute('data-tag');
      if (activeTagFilter === tag) {
        // Deactivate: show all
        activeTagFilter = null;
        this.classList.remove('active');
      } else {
        // Activate this tag
        activeTagFilter = tag;
        document.querySelectorAll('.tag-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
      }
      renderProjects(getCurrentLanguage(), activeTagFilter);
    });
  });
  
  // Add scroll position memory for navigation
  if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/')) {
    // Save scroll position before navigating away
    document.addEventListener('click', function(e) {
      const link = e.target.closest('a');
      if (link && link.href && link.href.includes('projects/')) {
        saveScrollPosition();
      }
    });
    
    // Also save on beforeunload for browser back/forward
    window.addEventListener('beforeunload', saveScrollPosition);
  }
});

// Listen for localStorage changes (e.g., language change in another tab or after navigation)
window.addEventListener('storage', function(e) {
  if (e.key === 'selectedLanguage') {
    renderProjects(getCurrentLanguage(), activeTagFilter);
    if (typeof window.refreshAbstractToggleLabels === 'function') {
      window.refreshAbstractToggleLabels(getCurrentLanguage());
    }
  }
}); 

 