import axios from "axios";


export class PixabayAPI {
    #BASE_URL = 'https://pixabay.com/api/';
    #API_KEY = '36926934-069e003b546c638e37e68c3ce';
    #query = '';

    fetchImg(page){
            const data = axios.get(`${this.#BASE_URL}`,{    
            params: {
                    key: this.#API_KEY,
                    query: this.#query,
                    page,
                    per_page: 40,
                    image_type: 'photo',
                    orientation: 'horizontal',
                    safesearch: true
                }
             });
             console.log('data', data);
             
             return data;
             }   

    set query(newQuery) {
        this.#query = newQuery;
    }

}










































// import refs from './refs';
// import SimpleLightbox from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";


// let newArr = [];

// let page = 1;
// let searchEl = '';
// axios.defaults.baseURL = "https://pixabay.com/api/";
// const API = "36926934-069e003b546c638e37e68c3ce";

// export class UnsplashAPI{
//     #BASE_URL = 'https://api.unsplash.com';
//     #API_KEY = 'LxvKVGJqiSe6NcEVZOaLXC-f2JIIWZaq_o0WrF8mwJc';
//     #query = '';
  
//     getPopularPhotos(page) {
//       return axios.get(`${this.#BASE_URL}/search/photos`, {
//         params: {
//           query:'random',
//           page,
//           per_page: 12,
//           client_id: this.#API_KEY
//         }
//       })
//     }
  
  
//     getPhotosByQuery(page) {
//       return axios.get(`${this.#BASE_URL}/search/photos`, {
//         params: {
//           query: this.#query,
//           page,
//           per_page: 12,
//           client_id: this.#API_KEY
//         }
//       })
//     }
  
//     set query(newQuery) {
//       this.#query = newQuery;
//     }
  
//   }
  
  











// export async function fetchImg(){
//     try {
//         // const { data } = await axios(`&q=${searchEl}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`, {
//         const { data } = await axios(`&q=${searchEl}`, {
//         params: {
//             apikey: API,
//             page,
//             per_page: 40,
//             image_type: 'photo',
//             orientation: 'horizontal',
//             safesearch: true
//         }
//      });
//      return data;
//      } catch (error) {
//        console.log(error.message);
//      }   
//  }


//  export async function renderImg(data) {
//     newArr = data.hits;
//     totalSearch = data.totalHits;
 
//    try {
//    const newHits = await newArr
//         .map((hit) => {
//                    return `
//            <div class="photo-card">
//              <a class="photo-card_link" href="${hit.largeImageURL}">
//                  <img src="${hit.webformatURL}" class="img-set" alt="${hit.tags}" loading="lazy" width='180px' height='160px'/>
//              </a>
//              <div class="info">
//              <p class="info-item">
//                <b>Likes</b>${hit.likes}
//              </p>
//              <p class="info-item">
//                <b>Views</b>${hit.views}
//              </p>
//              <p class="info-item">
//                <b>Comments</b>${hit.comments}
//              </p>
//              <p class="info-item">
//                <b>Downloads</b>${hit.downloads}
//              </p>
//              </div>
//            </div>
//              `;
//      })
//        .join('');
//        refs.galleryImg.insertAdjacentHTML('beforeend', newHits);
//        var lightbox = new SimpleLightbox('.gallery a');
//        lightbox.refresh(); 
//    }
//    catch (error){
//      console.log(error);
//     }
//  };