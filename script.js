
/* ==================================================
   MY WEBSITE HUB
   FINAL JAVASCRIPT — COMPLETE EDITION
================================================== */


/* 1. HTML ELEMENTS */

const projectsGrid = document.getElementById("projectsGrid");
const searchInput = document.getElementById("searchInput");
const searchForm = document.getElementById("searchForm");

const categoryButtons = document.querySelectorAll(".category");

const loadMoreButton = document.getElementById("loadMoreButton");
const resultsCount = document.getElementById("resultsCount");
const emptyState = document.getElementById("emptyState");
const clearFiltersButton = document.getElementById("clearFiltersButton");

const themeToggle = document.getElementById("themeToggle");

const categoriesToggle = document.getElementById("categoriesToggle");
const categoriesMenu = document.getElementById("categoriesMenu");

const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const mainNavigation = document.getElementById("mainNavigation");


/* PROGRESS TRACKER ELEMENTS */

const publishedCountElement =
    document.getElementById("publishedCount");

const remainingCountElement =
    document.getElementById("remainingCount");

const totalCountElement =
    document.getElementById("totalCount");

const progressPercentElement =
    document.getElementById("progressPercent");

const progressFill =
    document.getElementById("progressFill");

const progressBar =
    document.getElementById("progressBar");

const progressNote =
    document.getElementById("progressNote");


/* 2. CATEGORY INFORMATION */

const categoryData = {

    tools: {
        label: "Tools",
        icon: "⚒",
        description: "A custom website tool for everyday tasks."
    },

    utilities: {
        label: "Utilities",
        icon: "▦",
        description: "A useful online utility project."
    },

    converters: {
        label: "Converters",
        icon: "⇄",
        description: "A project for converting data and formats."
    },

    design: {
        label: "Design",
        icon: "✿",
        description: "A creative design and visual project."
    },

    development: {
        label: "Development",
        icon: "</>",
        description: "A website development project."
    },

    others: {
        label: "Others",
        icon: "•••",
        description: "Another project in my collection."
    }

};


/* 3. PROJECT CONFIGURATION */

const categoryNames = Object.keys(categoryData);

const totalProjectCount = 100;

const projectsPerPage = 10;


/*
   CUSTOMISE YOUR WEBSITES HERE.

   Example:

   "01": {
       name: "My Portfolio",
       category: "design",
       description: "My personal portfolio website.",
       icon: "✦",
       url: "https://example.com"
   }

   Keep url as null until the website is ready.
*/

const projectSettings = {

    // WEBSITE 01

    // "01": {
    //     name: "My Portfolio",
    //     category: "design",
    //     description: "My professional portfolio.",
    //     icon: "✦",
    //     url: null
    // },


    // WEBSITE 02

    // "02": {
    //     name: "My Business Website",
    //     category: "tools",
    //     description: "My business website.",
    //     icon: "◆",
    //     url: null
    // }

};


/* 4. GENERATE 100 PROJECTS */

const projects = Array.from(
    { length: totalProjectCount },
    (_, index) => {

        const number = String(index + 1).padStart(2, "0");

        const settings = projectSettings[number] || {};

        const category = categoryData[settings.category]
            ? settings.category
            : categoryNames[index % categoryNames.length];

        return {

            number,

            name: settings.name || `My Website ${number}`,

            category,

            description:
                settings.description ||
                categoryData[category].description,

            icon:
                settings.icon ||
                categoryData[category].icon,

            url: settings.url || null

        };

    }
);


/* 5. DISPLAY SETTINGS */

let visibleLimit = projectsPerPage;

let selectedCategory = "all";


/* 6. CREATE HTML ELEMENTS SAFELY */

function createElement(tag, className, text) {

    const element = document.createElement(tag);

    if (className) {
        element.className = className;
    }

    if (text !== undefined) {
        element.textContent = text;
    }

    return element;

}


/* 7. VALIDATE WEBSITE URL */

function getValidWebsiteUrl(value) {

    if (typeof value !== "string" || !value.trim()) {
        return null;
    }

    try {

        const url = new URL(value.trim());

        if (
            url.protocol === "https:" ||
            url.protocol === "http:"
        ) {
            return url.href;
        }

    } catch (error) {

        return null;

    }

    return null;

}


/* 8. CREATE PROJECT CARD */

function createProjectCard(project) {

    const card = createElement(
        "article",
        "website-card"
    );

    card.dataset.name = project.name.toLowerCase();
    card.dataset.category = project.category;


    // CARD TOP

    const cardTop = createElement("div", "card-top");


    // CATEGORY ICON

    const icon = createElement(
        "div",
        `card-icon icon-${project.category}`,
        project.icon
    );


    // CATEGORY BADGE

    const badge = createElement(
        "span",
        "card-category",
        categoryData[project.category].label
    );


    cardTop.appendChild(icon);
    cardTop.appendChild(badge);


    // PROJECT TITLE

    const title = createElement(
        "h3",
        "",
        project.name
    );


    // DESCRIPTION

    const description = createElement(
        "p",
        "",
        project.description
    );


    // WEBSITE ACTION

    const websiteUrl = getValidWebsiteUrl(project.url);

    let action;

    if (websiteUrl) {

        action = createElement(
            "a",
            "card-action",
            "Open Website →"
        );

        action.href = websiteUrl;
        action.target = "_blank";
        action.rel = "noopener noreferrer";

    } else {

        action = createElement(
            "button",
            "card-action is-disabled",
            "Coming Soon →"
        );

        action.type = "button";
        action.disabled = true;

    }


    // BUILD CARD

    card.appendChild(cardTop);
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(action);

    return card;

}


/* 9. FILTER PROJECTS */

function getFilteredProjects() {

    const searchText = searchInput.value
        .toLowerCase()
        .trim();

    return projects.filter(project => {

        const categoryName =
            categoryData[project.category].label.toLowerCase();

        const matchesSearch =
            project.name.toLowerCase().includes(searchText) ||
            project.description.toLowerCase().includes(searchText) ||
            categoryName.includes(searchText) ||
            project.number.includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            project.category === selectedCategory;

        return matchesSearch && matchesCategory;

    });

}


/* 10. RENDER PROJECTS */

function renderProjects() {

    const filteredProjects = getFilteredProjects();

    const visibleProjects = filteredProjects.slice(
        0,
        visibleLimit
    );


    // CLEAR OLD CARDS

    projectsGrid.replaceChildren();


    // GENERATE CARDS

    const fragment = document.createDocumentFragment();

    visibleProjects.forEach(project => {

        fragment.appendChild(
            createProjectCard(project)
        );

    });

    projectsGrid.appendChild(fragment);


    // UPDATE RESULT COUNT

    resultsCount.textContent =
        `Showing ${visibleProjects.length} of ${filteredProjects.length} websites`;


    // EMPTY STATE

    emptyState.hidden =
        filteredProjects.length !== 0;


    // SHOW MORE BUTTON

    loadMoreButton.hidden =
        visibleProjects.length >= filteredProjects.length;

}


/* 11. UPDATE WEBSITE PROGRESS */

function updateProjectProgress() {

    const total = projects.length;

    const published = projects.filter(project => {

        return getValidWebsiteUrl(project.url) !== null;

    }).length;

    const remaining = total - published;

    const percentage = total > 0
        ? Math.round((published / total) * 100)
        : 0;


    publishedCountElement.textContent = published;

    remainingCountElement.textContent = remaining;

    totalCountElement.textContent = total;

    progressPercentElement.textContent =
        `${percentage}%`;

    progressFill.style.width =
        `${percentage}%`;

    progressBar.setAttribute(
        "aria-valuenow",
        String(percentage)
    );


    progressNote.textContent =
        published === total
            ? "Congratulations! All your websites are published."
            : `You have ${remaining} websites left to build. Keep going!`;

}


/* 12. SYNCHRONISE CATEGORY BUTTONS */

function updateCategoryButtons(category) {

    categoryButtons.forEach(button => {

        const isActive =
            button.dataset.category === category;

        button.classList.toggle("active", isActive);

    });

}


/* 13. CLOSE CATEGORY DROPDOWN */

function closeCategoriesMenu() {

    if (!categoriesMenu || !categoriesToggle) {
        return;
    }

    categoriesMenu.hidden = true;

    categoriesToggle.setAttribute(
        "aria-expanded",
        "false"
    );

}


/* 14. CLOSE MOBILE MENU */

function closeMobileMenu() {

    const navbar = document.querySelector(".navbar");

    if (!navbar || !mobileMenuToggle) {
        return;
    }

    navbar.classList.remove("mobile-menu-open");

    mobileMenuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

    mobileMenuToggle.setAttribute(
        "aria-label",
        "Open navigation menu"
    );

    mobileMenuToggle.textContent = "☰";

}


/* 15. CATEGORY FILTER EVENTS */

categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        selectedCategory = button.dataset.category;

        visibleLimit = projectsPerPage;


        // UPDATE BOTH SETS OF CATEGORY BUTTONS

        updateCategoryButtons(selectedCategory);


        // CLOSE CATEGORY DROPDOWN

        closeCategoriesMenu();


        // CLOSE MOBILE MENU AFTER DROPDOWN SELECTION

        if (button.classList.contains("nav-category-option")) {

            closeMobileMenu();

        }


        // REFRESH PROJECTS

        renderProjects();

    });

});


/* 16. SEARCH FUNCTIONALITY */

searchInput.addEventListener("input", () => {

    visibleLimit = projectsPerPage;

    renderProjects();

});


/* SEARCH FORM */

searchForm.addEventListener("submit", event => {

    event.preventDefault();

    visibleLimit = projectsPerPage;

    renderProjects();

    document.getElementById("categories").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

});


/* 17. CLEAR SEARCH AND FILTERS */

clearFiltersButton.addEventListener("click", () => {

    searchInput.value = "";

    selectedCategory = "all";

    visibleLimit = projectsPerPage;

    updateCategoryButtons("all");

    closeCategoriesMenu();

    closeMobileMenu();

    renderProjects();

    document.getElementById("categories").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

});


/* 18. SHOW MORE WEBSITES */

loadMoreButton.addEventListener("click", () => {

    visibleLimit += projectsPerPage;

    renderProjects();

});


/* 19. CATEGORY NAVIGATION DROPDOWN */

if (categoriesToggle && categoriesMenu) {

    // OPEN AND CLOSE DROPDOWN

    categoriesToggle.addEventListener("click", () => {

        const isOpen =
            categoriesToggle.getAttribute("aria-expanded") === "true";

        categoriesMenu.hidden = isOpen;

        categoriesToggle.setAttribute(
            "aria-expanded",
            String(!isOpen)
        );

    });


    // CLOSE WHEN CLICKING OUTSIDE

    document.addEventListener("click", event => {

        if (!event.target.closest(".nav-dropdown")) {

            closeCategoriesMenu();

        }

    });


    // CLOSE WITH ESCAPE KEY

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            closeCategoriesMenu();

            categoriesToggle.focus();

        }

    });

}


/* 20. MOBILE NAVIGATION */

if (mobileMenuToggle && mainNavigation) {

    // OPEN AND CLOSE MOBILE MENU

    mobileMenuToggle.addEventListener("click", () => {

        const navbar = document.querySelector(".navbar");

        const isOpen =
            navbar.classList.toggle("mobile-menu-open");

        mobileMenuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        mobileMenuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );

        mobileMenuToggle.textContent =
            isOpen ? "✕" : "☰";

    });


    // CLOSE AFTER HOME OR ABOUT NAVIGATION

    mainNavigation.querySelectorAll(
        'a[href="#top"], a[href="#about"]'
    ).forEach(link => {

        link.addEventListener("click", () => {

            closeMobileMenu();

            closeCategoriesMenu();

        });

    });


    // CLOSE WHEN CLICKING OUTSIDE NAVIGATION

    document.addEventListener("click", event => {

        if (!event.target.closest(".navbar")) {

            closeMobileMenu();

        }

    });


    // CLOSE WITH ESCAPE

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            closeMobileMenu();

        }

    });


    // CLOSE AFTER RESIZING TO DESKTOP

    window.addEventListener("resize", () => {

        if (window.innerWidth > 520) {

            closeMobileMenu();

        }

    });

}


/* 21. LIGHT AND DARK THEME */

const THEME_KEY = "websiteHubTheme";


/* APPLY THEME */

function applyTheme(theme) {

    const isLight = theme === "light";

    document.body.classList.toggle(
        "light-theme",
        isLight
    );

    themeToggle.textContent =
        isLight ? "☾" : "☼";

    themeToggle.setAttribute(
        "aria-label",
        isLight
            ? "Switch to dark theme"
            : "Switch to light theme"
    );

    themeToggle.setAttribute(
        "title",
        isLight
            ? "Switch to dark theme"
            : "Switch to light theme"
    );

}


/* LOAD SAVED THEME */

let savedTheme = "dark";

try {

    const storedTheme =
        localStorage.getItem(THEME_KEY);

    if (
        storedTheme === "light" ||
        storedTheme === "dark"
    ) {

        savedTheme = storedTheme;

    }

} catch (error) {

    console.warn(
        "Could not load saved theme preference.",
        error
    );

}


/* APPLY THEME WHEN PAGE LOADS */

applyTheme(savedTheme);


/* SAVE THEME WHEN BUTTON IS CLICKED */

themeToggle.addEventListener("click", () => {

    const newTheme =
        document.body.classList.contains("light-theme")
            ? "dark"
            : "light";

    applyTheme(newTheme);

    try {

        localStorage.setItem(
            THEME_KEY,
            newTheme
        );

    } catch (error) {

        console.warn(
            "Could not save theme preference.",
            error
        );

    }

});


/* 22. HOME AND ABOUT NAVIGATION WITHOUT URL FRAGMENTS */

document.querySelectorAll(
    'a[href="#top"], a[href="#about"]'
).forEach(link => {

    link.addEventListener("click", event => {

        const targetId =
            link.getAttribute("href").substring(1);

        const targetSection =
            document.getElementById(targetId);

        if (!targetSection) {
            return;
        }

        // Prevent the URL fragment from appearing.

        event.preventDefault();

        // Scroll to the selected section.

        targetSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        // Keep the homepage URL clean.

        history.replaceState(
            null,
            "",
            window.location.pathname + window.location.search
        );

        // Close mobile navigation if open.

        closeMobileMenu();

        closeCategoriesMenu();

    });

});


/* 23. INITIALISE WEBSITE HUB */

updateCategoryButtons("all");

renderProjects();

updateProjectProgress();
