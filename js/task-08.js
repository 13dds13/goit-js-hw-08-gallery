import { galleryItems } from './app.js';

// ====================================== //
// Все рефы на ДОМ элементы //

const refs = {
    galleryList: document.querySelector('.js-gallery'),
    modal: document.querySelector('.js-lightbox'),
    modalImg: document.querySelector('.lightbox__image'),
    modalCloseBtn: document.querySelector('.lightbox__button'),
    modalOverlay: document.querySelector('.lightbox__overlay'),
};

// ====================================== //
// Рендеринг разметки //

const allLiEl = galleryItems.map(item => createMarkUpLi(item)).join('');

function createMarkUpLi({ preview, original, description }) {
    return `
            <li class="gallery__item">
                <a
                    class="gallery__link"
                    href=${original}
                >
                    <img
                    class="gallery__image"
                    src=${preview}
                    data-source=${original}
                    alt=${description}
                    />
                </a>
            </li>`
};

function addAllEl(parant, html) {
    parant.insertAdjacentHTML('beforeend', html)
};

addAllEl(refs.galleryList, allLiEl);

// ====================================== //
// Реализация делегирования и модалка //

refs.galleryList.addEventListener('click', onImgClick);
refs.modal.addEventListener('click', onOverlayClickClose);

let currentImgEl;

function onImgClick(e) {
    e.preventDefault();
    if (e.target === e.currentTarget) return;

    currentImgEl = e.target;

    const newImgSource = e.target.dataset.source;
    const newImgAlt = e.target.alt;

    modalImg(newImgSource, newImgAlt)

    addWindowListener();
};

function modalImg(newImgSource, newImgAlt) {
    refs.modal.classList.add('is-open');
    refs.modalImg.src = newImgSource;
    refs.modalImg.alt = newImgAlt;
}

function onOverlayClickClose(e) {
    if (e.target === refs.modalOverlay || e.target === refs.modalCloseBtn) {
        e.currentTarget.classList.remove('is-open');
        removeWindowListener();
        removeImgSrc();
    }    
}

function removeImgSrc() {
    refs.modalImg.src = '';
}

// ====================================== //
// Закрытие модалки по нажатию Esc //
// и перелистывание стрелками //

function onKeydown(e) {
    if (e.key === 'Escape') {
        refs.modal.classList.remove('is-open');
        removeWindowListener();
        removeImgSrc();
    };

    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        onArrowKeydown(e.key)
    };
};

function addWindowListener() {
    window.addEventListener('keydown', onKeydown);
};

function removeWindowListener() {
    window.removeEventListener('keydown', onKeydown);
};

function onArrowKeydown(arrow) {
    if (arrow === 'ArrowRight') {
        if (!currentImgEl.closest('li').nextElementSibling) {
            return;
        }
        const currentLi = currentImgEl.closest('li');
        const nextLi = currentLi.nextElementSibling;
        const nextImg = nextLi.querySelector('.gallery__image');
        const nextImgSrc = nextImg.dataset.source;
        const nextImgAlt = nextImg.alt;

        modalImg(nextImgSrc, nextImgAlt);

        currentImgEl = nextLi;
    };

    if (arrow === 'ArrowLeft') {
        if (!currentImgEl.closest('li').previousElementSibling) {
            return;
        }
        
        const currentLi = currentImgEl.closest('li');
        const previousLi = currentLi.previousElementSibling;
        const previousImg = previousLi.querySelector('.gallery__image');
        const previousImgSrc = previousImg.dataset.source;
        const previousImgAlt = previousImg.alt;

        modalImg(previousImgSrc, previousImgAlt);

        currentImgEl = previousLi;
    };
}
