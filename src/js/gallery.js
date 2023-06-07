import refs from './refs';
import {PixabayAPI} from './pixabayAPI.js';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';


let page = 1;
let searchEl = '';
let totalSearch = 0;
let newArr = [];

const newPixabayAPI = new PixabayAPI();

refs.formSearch.addEventListener('submit', onSubmit);
refs.btnLoad.addEventListener('click', onLoad);


async function onLoad(evt){
    evt.preventDefault();
    page += 1;
    console.log('page', page);
    
    
    try {
    const dataRenderI = await newPixabayAPI.fetchImg();
    const dataRenderImg = dataRenderI.data;
    renderImg(dataRenderImg);
    }
    catch (error) {console.log(error.message);
    };

    let count = Math.floor(totalSearch / 40);
    let countI = totalSearch % 40;
     
    if (count >= 1 && countI >= 1 && page === (count + 1)) {   
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
      refs.btnLoad.classList.add('is-hidden');
    }   
}


async function onSubmit(evt) {
    evt.preventDefault();
    searchEl = refs.inputSearch.value.trim();
    newPixabayAPI.query = searchEl;

    if (!searchEl || searchEl === ' ') {
      return Notiflix.Notify.failure (`Please, enter your search query.`);
    } 

    try {
      const dataI = await newPixabayAPI.fetchImg();
      const dataImg = dataI.data;
      // console.log('dataImg', dataImg);
      // console.log('dataImg.hits', dataImg.hits);
      renderImg(dataImg);

          if (totalSearch === 0 || newArr === [] || dataImg.hits === []) {
            Notiflix.Notify.info (`Sorry, there are no images matching your search query. Please try again.`);
          } else
           if (totalSearch > 0 && totalSearch < 41) {
            Notiflix.Notify.info (`Hooray! We found ${totalSearch} images.`);
            refs.btnLoad.classList.add('is-hidden');
          } else  if (totalSearch > 40) {
            Notiflix.Notify.info (`Hooray! We found ${totalSearch} images.`);
            refs.btnLoad.classList.remove('is-hidden');
          }     
    }
      catch (onFetchError) {
        console.log(error.message);
      };
    clearEl();
}


async function renderImg(data) {
   newArr = data.hits;
   totalSearch = data.totalHits;

  try {
  const newHits = await newArr
       .map((hit) => {
                  return `
          <div class="photo-card">
            <a class="photo-card_link" href="${hit.largeImageURL}">
                <img src="${hit.webformatURL}" class="img-set" alt="${hit.tags}" loading="lazy" width='180px' height='160px'/>
            </a>
            <div class="info">
            <p class="info-item">
              <b>Likes</b>${hit.likes}
            </p>
            <p class="info-item">
              <b>Views</b>${hit.views}
            </p>
            <p class="info-item">
              <b>Comments</b>${hit.comments}
            </p>
            <p class="info-item">
              <b>Downloads</b>${hit.downloads}
            </p>
            </div>
          </div>
            `;
    })
      .join('');
      refs.galleryImg.insertAdjacentHTML('beforeend', newHits);
      var lightbox = new SimpleLightbox('.gallery a');
      lightbox.refresh(); 
  }
  catch (error){
    console.log(error);
   }
};


function onFetchError(){
    Notiflix.Notify.failure (`Sorry, there are no images matching your search query. Please try again.`);
}

function clearEl(){
    refs.galleryImg.innerHTML = ''; 
}














































