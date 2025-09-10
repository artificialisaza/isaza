# Andrés Isaza Giraldo - Filmmaker Portfolio

A clean, responsive, bilingual portfolio website for filmmaker and media artist Andrés Isaza Giraldo.

---

## Structure

- **index.html** – Main page with dynamic project and publication lists
- **css/style.css** – Styling with a dark grey theme
- **js/main.js** – Dynamic rendering of projects, language sync, and interactions
- **js/language.js** – Global language toggle logic and UI updates
- **js/projectsData.js** – Centralized array of project data and translations
- **projects/** – Individual project pages (each with bilingual support)
- **assets/images/** – Images and media files

---

## Features

- Bilingual (English/Español) with persistent language toggle
- Dynamic project list, always sorted by year (most recent first)
- Responsive design (desktop-first, mobile-friendly)
- Social media links in the footer
- Smooth transitions and modern UI
- Multi-tab language sync (change language in one tab, updates everywhere)

---

## JavaScript Architecture

### 1. **main.js**
- Renders the project list dynamically from `projectsData.js`.
- Ensures projects are always shown in reverse chronological order.
- Listens for language changes (via `localStorage` and the `storage` event) and re-renders the project list in the correct language.

### 2. **language.js**
- Manages the language toggle system for the entire site.
- On every page load, reads the selected language from `localStorage` and updates the UI accordingly.
- When a language button is clicked, updates `localStorage`, the UI, and the `.active` class on the buttons.
- Listens for the `storage` event to sync language changes across tabs and pages.
- Provides a universal snippet for project and publication pages to ensure language consistency everywhere.

### 3. **projectsData.js**
- Contains a centralized array of project objects, each with unique `id`, `year`, `title`, `meta`, `image`, `link`, and translations for each language.
- This makes it easy to add, remove, or reorder projects without editing multiple files or translation keys.

---

## Language Toggle System

- The language toggle is **global and persistent**: changing the language on any page updates the state everywhere (using `localStorage`).
- All language-dependent content blocks (e.g., descriptions, meta info, credits) use IDs like `desc-en`, `desc-es`, `meta-en`, `meta-es`, etc.
- The universal language script ensures that the correct content and button state are always shown, even after navigation or in multiple tabs.

---

## Adding New Projects

1. **Edit `js/projectsData.js`:**
   - Add a new object to the `projects` array with the following structure:
     ```js
     {
       id: "unique_slug",
       year: 2025,
       title: { en: "Project Title", es: "Título del Proyecto" },
       meta: { en: "2025 · genre", es: "2025 · género" },
       image: "assets/images/your_image.jpg",
       link: "projects/your_project.html"
     }
     ```
   - The `id` should be unique and used as a reference.
   - Add both English and Spanish translations for `title` and `meta`.

2. **Create the Project Page:**
   - Copy an existing project HTML file as a template.
   - Make sure to include language-dependent blocks with IDs like `desc-en`, `desc-es`, `meta-en`, `meta-es`, `credits-en`, `credits-es`, etc.
   - Add the universal language toggle script at the end of the file (see below).

3. **Add Images:**
   - Place your project images in the appropriate folder under `assets/images/`.

4. **Test:**
   - Open the site, switch languages, and ensure your new project appears in the correct order and with the correct translations.

---

## Adding New Publications

- Publications can be managed similarly to projects, either by using a centralized data file or by editing the HTML directly.
- For each publication, provide both English and Spanish versions of the title, abstract, and other relevant fields.
- Use the same ID convention for language-dependent blocks (e.g., `title-en`, `title-es`, `abstract-en`, `abstract-es`).
- Include the universal language toggle script to ensure consistency.

---

## Universal Language Toggle Script

Add this script at the end of every project or publication page (before `</body>`):

```html
<script>
function updateLanguageUI(lang) {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) btn.classList.add('active');
    });
    document.querySelectorAll('[id^="desc-"], [id^="meta-"], [id^="credits-"]').forEach(el => {
        if (el.id.endsWith(lang)) {
            el.style.display = 'block';
        } else {
            el.style.display = 'none';
        }
    });
}
function initializeLanguageUniversal() {
    const savedLang = localStorage.getItem('selectedLanguage') || 'en';
    updateLanguageUI(savedLang);
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            localStorage.setItem('selectedLanguage', lang);
            updateLanguageUI(lang);
        });
    });
}
document.addEventListener('DOMContentLoaded', initializeLanguageUniversal);
if (document.readyState !== 'loading') initializeLanguageUniversal();
window.addEventListener('storage', function(e) {
    if (e.key === 'selectedLanguage') {
        updateLanguageUI(localStorage.getItem('selectedLanguage') || 'en');
    }
});
</script>
```

---

## Best Practices & Tips

- **Always use unique IDs** for language-dependent blocks and keep the naming consistent.
- **Add both English and Spanish translations** for every new project or publication.
- **Test language switching** after adding new content to ensure everything updates correctly.
- **Keep your JS files modular** and avoid duplicating logic across pages.
- **If you add new types of content** (e.g., awards, reviews), use the same ID and translation pattern.
- **If you add new pages**, always include the universal language toggle script.
- **For multi-tab consistency**, the language will update everywhere thanks to the `storage` event listener.

---

## Notes from Development

- The site was refactored to use a centralized data-driven approach for projects, making it much easier to add, remove, or reorder projects without breaking translations or UI.
- The language toggle system is robust and works across all pages and tabs, thanks to `localStorage` and the `storage` event.
- If you ever see language mismatches, check that your IDs and the universal script are present and correct on the page.
- For best results, always run the site on a local server (e.g., with `python -m http.server` or similar) to avoid issues with localStorage and JS loading.

---

## Session changelog (2025-09-10)

Improvements made during the pairing session:

- Abstracts are hidden by default with a language-aware toggle ("show abstract +" / "mostrar abstract +").
- The toggle is consistently placed just above each publication's downloads block; media (images/videos) remain visible.
- Fixed language toggle on the index to update button labels and publications properly; aligned with `.section-btn[data-tab]`.
- Avoided handler conflicts by centralizing logic in `js/language.js`; ensured bio, nav labels, and publications update together.
- Standardized download link sizes and alignment; cleaned up spacing between multiple download links (stacked neatly, no extra gaps).
- Resolved layout so, when there is room, text/links appear to the right of floated media; preserved responsive stacking on mobile.
- Reordered the "Modeling Water" abstract/image for consistency on mobile.
- Added lightbox behavior and ensured it coexists with the abstract toggle.

Touched files:

- `index.html` – publication markup tweaks (image/abstract order, removed stray <br> in downloads).
- `css/style.css` – new rules for abstract toggle, downloads, alignment, and float behavior.
- `js/main.js` – inject abstract toggles, handle clicks, placement logic, label sync with language, minor guards.
- `js/language.js` – updated nav label targeting to buttons and integrated publications text updates.

Notes:

- The language selection persists via `localStorage` (`selectedLanguage`) and is respected across pages/tabs.
- If future publications introduce different markup, ensure they keep `.publication-abstract`, `.abstract-text`, and `.publication-downloads` so the toggle/placement rules apply.

---

Happy filmmaking and site building! 