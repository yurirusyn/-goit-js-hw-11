import './sass/main.scss';
import Feach from './searchImage';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import createMarcup from './marcap';
import Notiflix from 'notiflix';


const refs = {
  form:  document.querySelector('.search-form'),
  input: document.querySelector('input'),
  gallery: document.querySelector('.gallery'),
  btn:  document.querySelector('.load-more'),
}
console.log(refs.btn);

const feach = new Feach();
let counter = 40;
refs.btn.addEventListener('click', clickButton);

async function clickButton() {
  feach.increment();
  const buttonSearch = await feach.searchImage();
  const photeCard = buttonSearch.hits;
  const markup = createMarcup(photeCard);
  
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  let lightbox = new SimpleLightbox('.gallery a');
  counter = 40 + counter;
  if (counter >= buttonSearch.totalHits) {
    Notiflix.Report.warning(`We're sorry`, `We're sorry, but you've reached the end of search results.`);
    refs.btn.classList.add('is-hidden');
  }
}

refs.form.addEventListener('submit', formSubmit);

async function formSubmit(e) {
  e.preventDefault();
  feach.resetPage();
  addMarkup();
  const inputEl = refs.input.value.trim();
  feach.inputValue = inputEl;
  if (inputEl === '') {
    addMarkup();
    return;
  }

  const image = await feach.searchImage();
  const renderImages = await image.hits;
  Notiflix.Notify.success(`Hooray! We found ${image.total} images.`)
 
  if (feach.pages >= 1) {

    refs.btn.classList.remove('is-hidden');

  }
  
  if (renderImages.length === 0) {

    console.log("ok");
    refs.btn.classList.add('is-hidden');
    addMarkup()
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
    );
    return;
  }

  
  const markup = createMarcup(renderImages);
  
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  let lightbox = new SimpleLightbox('.gallery a');
 
}


function addMarkup (a = ' ',) {
  refs.gallery.innerHTML = a;
  refs.btn.classList.add('is-hidden');
};

