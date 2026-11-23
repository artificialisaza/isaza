// Tab Switching Functionality
// switchTab is global so it can also be reused to restore the last active tab on load
function switchTab(tabName) {
    const tabButtons = document.querySelectorAll('.section-btn');
    const tabContents = document.querySelectorAll('.tab-content');

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

document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.section-btn');

    // Add click event listeners to tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            if (tabName === currentTab) return;

            // Remember the scroll position of the tab we are leaving
            saveCurrentTabScroll();
            switchTab(tabName);
            currentTab = tabName;
            persistActiveTab();

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

            // Restore the destination tab's own scroll position
            // (top on first visit, remembered position afterwards)
            requestAnimationFrame(() => restoreScrollTo(currentTab));
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

// --- Tab-scoped Scroll Position Memory ---
// Each tab (projects / publications / bio) keeps its own scroll position, so
// switching tabs lands you where you left off in that tab (top on first visit).
// The active tab + its position are also persisted so returning from a project
// page (browser back/forward) restores the same tab & spot.
const tabScrollPositions = {};
let currentTab = 'projects';
let activeTagFilter = 'selected';
let projectRenderToken = 0;

function isIndexPage() {
  return window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/');
}

function getSavedTabScroll(tab) {
  if (tab in tabScrollPositions) return tabScrollPositions[tab];
  const saved = parseInt(localStorage.getItem('indexScrollPosition_' + tab) || '', 10);
  return isNaN(saved) ? 0 : saved;
}

function saveCurrentTabScroll() {
  if (!currentTab) return;
  const pos = window.pageYOffset || document.documentElement.scrollTop || 0;
  tabScrollPositions[currentTab] = pos;
  try {
    localStorage.setItem('indexScrollPosition_' + currentTab, pos.toString());
  } catch (e) {}
}

function persistActiveTab() {
  try {
    localStorage.setItem('indexActiveTab', currentTab);
  } catch (e) {}
}

function restoreScrollTo(tab) {
  window.scrollTo(0, getSavedTabScroll(tab));
}

function saveScrollPosition() {
  if (!isIndexPage()) return;
  saveCurrentTabScroll();
  persistActiveTab();
}

function restoreScrollPosition() {
  if (!isIndexPage()) return;
  restoreScrollTo(currentTab);
}

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
function renderProjects(lang, tagFilter, restoreTarget) {
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

  // restoreTarget: a number scrolls to an exact pixel (e.g. 0 for a new filter),
  // anything else restores the saved position of the currently visible tab.
  const applyScroll = () => {
    const target = (typeof restoreTarget === 'number') ? restoreTarget : getSavedTabScroll(currentTab);
    window.scrollTo(0, target);
  };

  const appendRemainingProjects = () => {
    if (currentRenderToken !== projectRenderToken) return;

    if (remainingProjects.length > 0) {
      const fragment = document.createDocumentFragment();
      remainingProjects.forEach(project => {
        fragment.appendChild(createProjectCard(project, lang));
      });
      container.appendChild(fragment);
    }

    applyScroll();
  };

  if (remainingProjects.length === 0) {
    applyScroll();
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
  // Keep the current scroll position intact while re-rendering projects
  const scrollNow = window.pageYOffset || document.documentElement.scrollTop || 0;
  renderProjects(getCurrentLanguage(), activeTagFilter, scrollNow);
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

  // Reopen the tab that was active when the visitor navigated away
  // (default projects; used when returning from a project page via back/forward)
  const activeBtn = document.querySelector('.section-btn.active');
  const htmlDefaultTab = activeBtn ? activeBtn.getAttribute('data-tab') : 'projects';
  const savedTab = localStorage.getItem('indexActiveTab');
  const initialTab = (savedTab && document.getElementById(savedTab)) ? savedTab : htmlDefaultTab;
  if (initialTab !== htmlDefaultTab) {
    switchTab(initialTab);
  }
  currentTab = initialTab;

  renderProjects(lang, activeTagFilter);
  // Make sure the restored tab lands on its remembered position
  requestAnimationFrame(() => restoreScrollPosition());

  // Tag filter buttons: "selected works" (default), "all", film, exhibition, video
  document.querySelectorAll('.tag-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const tag = this.getAttribute('data-tag');
      if (tag === 'all') {
        activeTagFilter = null;
      } else {
        activeTagFilter = tag;
      }
      document.querySelectorAll('.tag-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      // Start the new filter list at the top
      renderProjects(getCurrentLanguage(), activeTagFilter, 0);
    });
  });
  
  // Add per-tab scroll position memory for navigation
  if (isIndexPage()) {
    // Save scroll position before navigating away (e.g. opening a project)
    document.addEventListener('click', function(e) {
      const link = e.target.closest('a');
      if (link && link.href && link.href.includes('projects/')) {
        saveScrollPosition();
      }
    });
    
    // Also save on beforeunload/pagehide for browser back/forward
    window.addEventListener('beforeunload', saveScrollPosition);
    window.addEventListener('pagehide', saveScrollPosition);
  }
});

// Listen for localStorage changes (e.g., language change in another tab or after navigation)
window.addEventListener('storage', function(e) {
  if (e.key === 'selectedLanguage') {
    const scrollNow = window.pageYOffset || document.documentElement.scrollTop || 0;
    renderProjects(getCurrentLanguage(), activeTagFilter, scrollNow);
    if (typeof window.refreshAbstractToggleLabels === 'function') {
      window.refreshAbstractToggleLabels(getCurrentLanguage());
    }
  }
}); 

 