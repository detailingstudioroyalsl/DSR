// JS para el menu
function accordion(selector, element) {
    document.querySelectorAll(selector).forEach(item => {
        item.addEventListener('click', () => {
            let content = item.nextElementSibling;
            if (content.classList.contains('active')) {
                content.querySelectorAll(element).forEach(el => {
                    if (el.nextElementSibling && el.nextElementSibling.classList.contains('menu-mobile--nested')) {
                        el.addEventListener('click', () => {
                            let inner = el.nextElementSibling;
                            if (inner.classList.contains('active')) {
                                el.classList.add('arrow--active');
                                inner.style.maxHeight = null;
                                inner.classList.remove('active');
                            } else {
                                content.querySelectorAll(element).forEach(el => {
                                    if (el.nextElementSibling) {
                                        el.classList.remove('arrow--active');
                                        el.nextElementSibling.classList.remove('active');
                                        el.nextElementSibling.style.maxHeight = null;
                                    }
                                });
                                inner.style.maxHeight = inner.scrollHeight + 'px';
                                inner.classList.add('active');
                            }
                        });
                    }
                });
                content.style.maxHeight = null;
                content.classList.remove('active');
            } else {
                content.querySelectorAll(element).forEach(el => {
                    if (el.nextElementSibling && el.nextElementSibling.classList.contains('menu-mobile--nested')) {
                        el.addEventListener('click', e => {
                            let inner = el.nextElementSibling;
                            if (inner.classList.contains('active')) {
                                inner.style.maxHeight = null;
                                inner.classList.remove('active');
                                el.classList.remove('arrow--active');
                            } else {
                                content.querySelectorAll(element).forEach(el => {
                                    if (el.nextElementSibling) {
                                        el.classList.remove('arrow--active');
                                        el.nextElementSibling.classList.remove('active');
                                        el.nextElementSibling.style.maxHeight = null;
                                    }
                                });
                                e.target.classList.add('arrow--active');
                                inner.style.maxHeight = inner.scrollHeight + 'px';
                                inner.classList.add('active');
                            }
                        });
                    }
                });
                content.style.maxHeight = content.scrollHeight + "px";
                content.classList.add('active');
            }
        });
    });
}

// Fix header on scroll
function fixHeader() {
    let headerHeight = document.querySelector('.header')?.clientHeight;
    let containers = document.querySelector('.header')?.querySelectorAll('.header__container'),
        displayed = [];

    containers.forEach(el => {
        if (el.clientHeight > 0) displayed.push(el);
    });

    let last = displayed[displayed.length - 1];
    if (window.scrollY >= headerHeight / 2) {
        last.classList.add('header__container--fixed');
    } else {
        last.classList.remove('header__container--fixed');
    }
}

// Add event listeners for scroll and DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
    // Initialize accordion for menu
    accordion('.menu-mobile__item', '.arrow');
    // Handle sticky header behavior on scroll
    window.addEventListener('scroll', fixHeader);
});
