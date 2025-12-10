window.onload = function () {

    // ✅ Loader fix
    const loader = document.getElementById("page-loader");
    if (loader) {
        setTimeout(() => {
            loader.classList.add("hidden");
        }, 600);
    }

    // ✅ Footer year fix
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // ✅ Scroll reveal animation fix
    const revealElements = document.querySelectorAll(".reveal-on-scroll");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const delay = entry.target.getAttribute("data-delay") || 0;
                    setTimeout(() => {
                        entry.target.classList.add("revealed");
                    }, delay);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        revealElements.forEach((el) => observer.observe(el));
    } else {
        revealElements.forEach((el) => el.classList.add("revealed"));
    }
};



// =====================================================
// PROPERTIES PAGE FILTER LOGIC
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    const cityFilter = document.getElementById("filterCity");
    const typeFilter = document.getElementById("filterType");
    const priceFilter = document.getElementById("filterPrice");
    const properties = document.querySelectorAll(".property-item");

    function filterProperties() {
        const city = cityFilter.value;
        const type = typeFilter.value;
        const price = priceFilter.value;

        properties.forEach(property => {
            const pCity = property.dataset.city;
            const pType = property.dataset.type;
            const pPrice = parseInt(property.dataset.price);

            let cityMatch = city === "all" || city === pCity;
            let typeMatch = type === "all" || type === pType;
            let priceMatch = price === "all" || pPrice <= parseInt(price);

            if (cityMatch && typeMatch && priceMatch) {
                property.style.display = "block";
            } else {
                property.style.display = "none";
            }
        });
    }

    if (cityFilter) {
        cityFilter.addEventListener("change", filterProperties);
        typeFilter.addEventListener("change", filterProperties);
        priceFilter.addEventListener("change", filterProperties);
    }

});
