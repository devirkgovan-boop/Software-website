document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       INDUSTRY TABS
    ===================================================== */

    const tabs = document.querySelectorAll(".industry-tab");

    const tabContainer =
        document.querySelector(".industry-tabs");


    /* =====================================================
       INDUSTRY SECTIONS
    ===================================================== */

    const sections = [
        document.getElementById("healthcare"),
        document.getElementById("manufacturing"),
        document.getElementById("energy"),
        document.getElementById("bfsi"),
        document.getElementById("education")
    ].filter(section => section !== null);



    /* =====================================================
       CLICKING AN INDUSTRY TAB
       Smoothly scroll to the correct section
    ===================================================== */

    tabs.forEach(tab => {

        tab.addEventListener("click", function (event) {

            event.preventDefault();


            const targetId =
                this.getAttribute("href");


            const target =
                document.querySelector(targetId);


            if (!target) {
                return;
            }


            /* Active tab */

            tabs.forEach(item => {
                item.classList.remove("active");
            });

            this.classList.add("active");


            /* 
               Get sticky bar height so the section
               does not hide underneath it.
            */

            const nav =
                document.querySelector(".industry-nav");

            const navHeight =
                nav ? nav.offsetHeight : 0;


            const targetPosition =
                target.getBoundingClientRect().top +
                window.pageYOffset -
                navHeight -
                10;


            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });


            /*
             * IMPORTANT:
             * Scroll ONLY the horizontal tab container.
             *
             * Do NOT use tab.scrollIntoView().
             * That was causing the main page to jump.
             */

            if (tabContainer) {

                const tabLeft =
                    tab.offsetLeft;

                const tabWidth =
                    tab.offsetWidth;

                const containerWidth =
                    tabContainer.clientWidth;

                const targetScroll =
                    tabLeft -
                    (containerWidth / 2) +
                    (tabWidth / 2);


                tabContainer.scrollTo({

                    left: Math.max(0, targetScroll),

                    behavior: "smooth"

                });

            }

        });

    });



    /* =====================================================
       CHANGE ACTIVE TAB WHILE SCROLLING
    ===================================================== */

    const observer =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    const currentId =
                        entry.target.id;


                    tabs.forEach(tab => {

                        const tabTarget =
                            tab.getAttribute("href");


                        if (
                            tabTarget ===
                            "#" + currentId
                        ) {

                            tab.classList.add("active");

                        } else {

                            tab.classList.remove("active");

                        }

                    });


                    /*
                     * Keep the active tab visible
                     * ONLY inside the horizontal tab bar.
                     *
                     * This does NOT move the page.
                     */

                    const activeTab =
                        document.querySelector(
                            `.industry-tab[href="#${currentId}"]`
                        );


                    if (
                        activeTab &&
                        tabContainer
                    ) {

                        const tabLeft =
                            activeTab.offsetLeft;

                        const tabRight =
                            tabLeft +
                            activeTab.offsetWidth;

                        const visibleLeft =
                            tabContainer.scrollLeft;

                        const visibleRight =
                            visibleLeft +
                            tabContainer.clientWidth;


                        if (
                            tabLeft < visibleLeft
                        ) {

                            tabContainer.scrollTo({

                                left: tabLeft - 10,

                                behavior: "smooth"

                            });

                        }
                        else if (
                            tabRight > visibleRight
                        ) {

                            tabContainer.scrollTo({

                                left:
                                    tabRight -
                                    tabContainer.clientWidth +
                                    10,

                                behavior: "smooth"

                            });

                        }

                    }

                });

            },


            {
                root: null,

                /*
                 * The section becomes active
                 * when it enters the middle area
                 * of the screen.
                 */

                rootMargin:
                    "-30% 0px -55% 0px",

                threshold: 0

            }

        );



    /* =====================================================
       START OBSERVER
    ===================================================== */

    sections.forEach(section => {

        observer.observe(section);

    });



    /* =====================================================
       INITIAL ACTIVE TAB
    ===================================================== */

    if (tabs.length > 0) {

        tabs.forEach(tab => {
            tab.classList.remove("active");
        });


        tabs[0].classList.add("active");

    }

});