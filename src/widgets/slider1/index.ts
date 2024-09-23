// Swiper Docs: https://swiperjs.com/swiper-api
import Swiper from 'swiper';
import { Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { fetchPosts } from './fetchPosts';
import './index.css';

const slider1Init = async () => {
  const slider1El = document.querySelector("[data-widget='slider1']");
  if (!slider1El) {
    return false;
  }

  const fetchedPosts = await fetchPosts();
  if (!fetchedPosts) {
    return false;
  }

  const slidesEls = slider1El.querySelectorAll('.slider1-slide h2');
  slidesEls.forEach((slideEl, index) => {
    slideEl.textContent = fetchedPosts.posts[index].title + '👍';
  });

  new Swiper('.slider1.swiper', {
    loop: true,
    spaceBetween: 20,
    slidesPerView: 3,
    autoplay: { delay: 5000 },
    modules: [Navigation, Pagination],
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.slider1-pagination.swiper-pagination',
    },
  });
};

slider1Init();
