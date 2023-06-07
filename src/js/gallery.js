import refs from './refs';
import {PixabayAPI} from './pixabayAPI.js';
// import {renderImg} from './pixabayAPI';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';
// import axios from "axios";




let page = 1;
let searchEl = '';
let totalSearch = 0;
let newArr = [];
let dataImg;

const newPixabayAPI = new PixabayAPI();


refs.formSearch.addEventListener('submit', onSubmit);
refs.btnLoad.addEventListener('click', onLoad);


async function onLoad(evt){
    evt.preventDefault();
    page += 1;
    try {
      const dataRenderImg = await newPixabayAPI.fetchImg(page);
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
    // let dataImg;
    page = 1;
    searchEl = refs.inputSearch.value.trim();
    console.log('searchEl', searchEl);
    
    newPixabayAPI.query = searchEl;
    // const rew = newPixabayAPI.query;
    // console.log(' newPixabayAPI.query', rew);

    if (!searchEl || searchEl === ' ') {
      return Notiflix.Notify.failure (`Please, enter your search query.`);
    } 

    try {
    const dataI = await newPixabayAPI.fetchImg(page);
     dataImg = dataI.data;
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
      catch (error) {
        console.log(error.message);
      }

    clearEl();
}




async function renderImg(data) {
   newArr = data.hits;
   console.log('newArr', newArr);
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
catch (error) {
console.log(error);
}  
};


function onFetchError(){
    Notiflix.Notify.failure (`Sorry, there are no images matching your search query. Please try again.`);
}

function clearEl(){
    refs.galleryImg.innerHTML = ''; 
}
















































// const { height: cardHeight } = refs.galleryImg
// .firstElementChild.getBoundingClientRect();

//   window.scrollBy({
//   top: cardHeight * 2,
//   behavior: "smooth",
// });




/*2variant*/
// import refs from './refs';
// // import {fetchImg} from './pixabayAPI.js';
// import {PixabayAPI} from './pixabayAPI.js';
// import {renderImg} from './pixabayAPI';
// import SimpleLightbox from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";
// import Notiflix from 'notiflix';
// import axios from "axios";




// // let page = 1;
// // let searchEl = '';
// let totalSearch = 0;
// let newArr = [];
// const newPixabayAPI = new PixabayAPI();


// refs.formSearch.addEventListener('submit', onSubmit);
// refs.btnLoad.addEventListener('click', onLoad);


// async function onLoad(evt){
//     evt.preventDefault();
//     page += 1;
//     try {
//       const dataRenderImg = await fetchImg();
//       renderImg(dataRenderImg);
//     }
//     catch (error) {console.log(error.message);
//     };

//     let count = Math.floor(totalSearch / 40);
//     let countI = totalSearch % 40;
     
//     if (count >= 1 && countI >= 1 && page === (count + 1)) {   
//       Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
//       refs.btnLoad.classList.add('is-hidden');
//     }   
// }


// async function onSubmit(evt) {
//     evt.preventDefault();
//     page = 1;
//     searchEl = refs.inputSearch.value;

//     if (!searchEl || searchEl === ' ') {
//       return Notiflix.Notify.failure (`Please, enter your search query.`);
//     } 

//     try {
//       const dataImg = await fetchImg();
//       renderImg(dataImg);

//           if (totalSearch === 0 || newArr === [] || dataImg.hits === []) {
//             Notiflix.Notify.info (`Sorry, there are no images matching your search query. Please try again.`);
//           } else
//            if (totalSearch > 0 && totalSearch < 41) {
//             Notiflix.Notify.info (`Hooray! We found ${totalSearch} images.`);
//             refs.btnLoad.classList.add('is-hidden');
//           } else  if (totalSearch > 40) {
//             Notiflix.Notify.info (`Hooray! We found ${totalSearch} images.`);
//             refs.btnLoad.classList.remove('is-hidden');
//           }     
//     }
//       // .catch(onFetchError);
//       catch (onFetchError) {
//         console.log(error.message);
//       };
//     clearEl();
// }

// //  async function fetchImg(){
// //     try {
// //      const { data } = await axios(`https://pixabay.com/api/?key=36926934-069e003b546c638e37e68c3ce&q=${searchEl}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`);
// //      return data;
// //      } catch (error) {
// //        console.log(error.message);
// //      }   
// //  }




// async function renderImg(data) {
//    newArr = data.hits;
//    totalSearch = data.totalHits;

//   try {
//   const newHits = await newArr
//        .map((hit) => {
//                   return `
//           <div class="photo-card">
//             <a class="photo-card_link" href="${hit.largeImageURL}">
//                 <img src="${hit.webformatURL}" class="img-set" alt="${hit.tags}" loading="lazy" width='180px' height='160px'/>
//             </a>
//             <div class="info">
//             <p class="info-item">
//               <b>Likes</b>${hit.likes}
//             </p>
//             <p class="info-item">
//               <b>Views</b>${hit.views}
//             </p>
//             <p class="info-item">
//               <b>Comments</b>${hit.comments}
//             </p>
//             <p class="info-item">
//               <b>Downloads</b>${hit.downloads}
//             </p>
//             </div>
//           </div>
//             `;
//     })
//       .join('');
//       refs.galleryImg.insertAdjacentHTML('beforeend', newHits);
//       var lightbox = new SimpleLightbox('.gallery a');
//       lightbox.refresh(); 
//   }
//   catch (error){
//     console.log(error);
//    }
// };


// function onFetchError(){
//     Notiflix.Notify.failure (`Sorry, there are no images matching your search query. Please try again.`);
// }

// function clearEl(){
//     refs.galleryImg.innerHTML = ''; 
// }


























//key str Your API key: 36926934-069e003b546c638e37e68c3ce

  // .then ((response) => {
  //     if (!response.ok) {
  //         throw new Error(response.status);
  //     }
      // console.log(response.json())

        // console.log('hits', hits);
  // console.log('hits hits', hits.hits);
  // console.log('newArr', newArr);
  // console.log('hits 1', hits.hits[1].id);
  // console.log('hits 1', hits.hits[1].webformatURL);
  // console.log('hitsHits', hits.totalHits);
  // const createImgI = hits.hits[1].webformatURL;
  // console.log('createImg', createImgI);



  /***** 1 variant */

//   import SimpleLightbox from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";
// import Notiflix from 'notiflix';
// import axios from "axios";


//   // try {

//   //   } catch (error) {
//   //     console.log(error.message);
//   //   }

// const refs = {
//     formSearch: document.querySelector('.search-form'),
//     // formSearch: document.querySelector('.search-form').elements,
//     inputSearch: document.querySelector('input'),
//     btnSub: document.querySelector('button'),
//     galleryImg: document.querySelector('.gallery'),
//     btnLoad: document.querySelector('.load-more'),
// }

// let page = 1;
// let searchEl = '';
// let totalSearch = 0;
// let newArr = [];


// refs.formSearch.addEventListener('submit', onSubmit);
// // refs.inputSearch.addEventListener('submit', onSubmit);
// refs.btnLoad.addEventListener('click', onLoad);

//  function onLoad(evt){
//     evt.preventDefault();

//    fetchImg()
//       .then((hits) => renderImg(hits))
//       .catch(onFetchError);
//       page += 1;
// }


//  function onSubmit(evt) {
//     evt.preventDefault();
//     refs.btnLoad.classList.add('is-hidden');
//     const markUpRT = evt.currentTarget;
//     // console.log(markUpRT);
//     searchEl = refs.inputSearch.value;
  

//     if (!searchEl || searchEl === ' ') {
//       return Notiflix.Notify.failure (`Please, enter your search query.`);
//     } 


//     fetchImg()
//     .then((hits) =>  { 
//         renderImg(hits);

//        if (totalSearch > 0 && totalSearch < 41) {
//           Notiflix.Notify.info (`Hooray! We found ${totalSearch} images.`);
//           refs.btnLoad.classList.add('is-hidden');
//         } else  if (totalSearch > 40) {
//           Notiflix.Notify.info (`Hooray! We found ${totalSearch} images.`);
//           refs.btnLoad.classList.remove('is-hidden');
//         } else if (totalSearch === 0 || newArr === []) {
//           Notiflix.Notify.info (`Sorry, there are no images matching your search query. Please try again.`);
//         }

//     })
//     .catch(onFetchError);
//     clearEl();
//     page += 1;
// }



// async function fetchImg(){

//    try {
//     // const response = await axios(`https://pixabay.com/api/?key=36926934-069e003b546c638e37e68c3ce&q=${searchEl}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`);
//     const response = await fetch(`https://pixabay.com/api/?key=36926934-069e003b546c638e37e68c3ce&q=${searchEl}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`);
//     // console.log('response', response);
    
//     let hits = await response.json();
//     return hits;
//     } catch (error) {
//       console.log(onFetchError);
//     }   
// }



//  async function renderImg(hits) {
//    newArr = hits.hits;
//    totalSearch = hits.totalHits;

//   try {
//   const newHits = await newArr
//        .map((hit) => {
//                   return `
//           <div class="photo-card">
//             <a class="photo-card_link" href="${hit.largeImageURL}">
//                 <img src="${hit.webformatURL}" class="img-set" alt="${hit.tags}" loading="lazy" width='180px' height='160px'/>
//             </a>
//             <div class="info">
//             <p class="info-item">
//               <b>Likes</b>${hit.likes}
//             </p>
//             <p class="info-item">
//               <b>Views</b>${hit.views}
//             </p>
//             <p class="info-item">
//               <b>Comments</b>${hit.comments}
//             </p>
//             <p class="info-item">
//               <b>Downloads</b>${hit.downloads}
//             </p>
//             </div>
//           </div>
//             `;
//     })
//       .join('');
//       refs.galleryImg.insertAdjacentHTML('beforeend', newHits);
//       var lightbox = new SimpleLightbox('.gallery a');
//       lightbox.refresh(); 
//   }
//   catch (error){
//     console.log(error);
//    }
// };


// function onFetchError(){
//     Notiflix.Notify.failure (`Sorry, there are no images matching your search query. Please try again.`);
// }

// function clearEl(){
//     refs.galleryImg.innerHTML = ''; 
// }










