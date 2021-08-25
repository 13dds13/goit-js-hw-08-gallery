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

const allLiEl = galleryItems.map(({ preview, original, description }) =>
{return createMarkUpLi({ preview, original, description })}).join('');

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

function onImgClick(e) {
    e.preventDefault();
    if (e.target === e.currentTarget) return;

    const newImgSource = e.target.dataset.source;
    const newImgAlt = e.target.alt;

    modalIsOpen(newImgSource, newImgAlt)

    addWindowListener();
};

function modalIsOpen(newImgSource, newImgAlt) {
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

function onKeyEsc({key}) {
    if (key === 'Escape') {
        refs.modal.classList.remove('is-open');
        removeWindowListener();
        removeImgSrc()
    }
};

function addWindowListener() {
    window.addEventListener('keydown', onKeyEsc);
};

function removeWindowListener() {
    window.removeEventListener('keydown', onKeyEsc);
};


