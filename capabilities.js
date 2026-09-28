document.addEventListener("DOMContentLoaded", () => {

    const tabs = document.querySelectorAll(".capTab");

    const sections = [
        document.getElementById("data-engineering"),
        document.getElementById("analytics"),
        document.getElementById("operations"),
        document.getElementById("cloud"),
        document.getElementById("data"),
        document.getElementById("ai"),
        document.getElementById("apps")
    ];


    /* ---------------------------------------------
       CLICK TO SCROLL
    --------------------------------------------- */

    tabs.forEach(tab => {

        tab.addEventListener("click", function () {

            tabs.forEach(item => {
                item.classList.remove("active");
            });

            this.classList.add("active");

        });

    });


    /* ---------------------------------------------
       CHANGE ACTIVE TAB WHILE SCROLLING
    --------------------------------------------- */

    const observer = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const id = entry.target.id;

                    tabs.forEach(tab => {

                        tab.classList.remove("active");

                        if (
                            tab.getAttribute("href") ===
                            "#" + id
                        ) {

                            tab.classList.add("active");

                            tab.scrollIntoView({
                                behavior: "smooth",
                                block: "nearest",
                                inline: "center"
                            });

                        }

                    });

                }

            });

        },

        {
            root: null,

            rootMargin:
                "-35% 0px -50% 0px",

            threshold:0

        }

    );


    sections.forEach(section => {

        if (section) {
            observer.observe(section);
        }

    });

});