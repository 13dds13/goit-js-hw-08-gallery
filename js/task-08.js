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
refs.modal.addEventListener('click', onModalClick);

function onImgClick(e) {
    e.preventDefault();
    if (e.target === e.currentTarget) return;

    refs.modal.classList.add('is-open');
    refs.modalImg.src = e.target.dataset.source;
    refs.modalImg.alt = e.target.alt;
};

function onModalClick(e) {
    if (e.target === refs.modalOverlay || e.target === refs.modalCloseBtn) {
        e.currentTarget.classList.remove('is-open');

        removeImgSrc();
    }    
}

function removeImgSrc() {
    refs.modalImg.src = '';
}