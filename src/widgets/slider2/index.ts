import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Swiper Docs: https://swiperjs.com/swiper-api
import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';

import './index.css';
import { log } from '@shared/lib';

import { fetchUsers } from './fetchUsers';
import { UserType } from './UserType';

interface Users {
  limit: number;
  skip: number;
  total: number;
  users: Record<string, UserType>;
}

const slider2Init = async () => {
  const slider2El = document.querySelector("[data-widget='slider2']");

  if (!slider2El) {
    return false;
  }

  const fetchedUsers = await fetchUsers();
  const { users } = fetchedUsers as Users;

  const slidesEls = slider2El.querySelectorAll('.slider2-slide h2');
  slidesEls.forEach((slideEl, index) => {
    slideEl.textContent = `😎 ${users[index].firstName} ${users[index].lastName}`;
  });

  log('Start slider2');

  new Swiper('.slider2.swiper', {
    loop: true,
    spaceBetween: 20,
    slidesPerView: 3,
    autoplay: { delay: 5000 },
    modules: [Pagination],
    pagination: {
      el: '.slider2-pagination.swiper-pagination',
    },
  });
};

slider2Init();
