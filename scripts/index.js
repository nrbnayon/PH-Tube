const btnContainer = getElementById("btn-container");
const videoContainer = getElementById("video-container");
const errorElement = getElementById("error");
let sortByView = false;

const sortBtn = getElementById("sort-btn");

// sortBtn.addEventListener("click", () => {
//   sortByView = true;
//   fetchDataByCategories(sortByView);
// });
sortBtn.addEventListener("click", () => {
  if (sortByView) {
    sortBtn.classList.remove("bg-[#FF1F3D]");
    sortByView = false;
  } else {
    sortByView = true;
  }
  fetchDataByCategories(sortByView);
});

const fetchCategories = async () => {
  const categoriesURL =
    "https://openapi.programming-hero.com/api/videos/categories";
  const fetchCategory = await fetch(categoriesURL);
  const res = await fetchCategory.json();
  const data = res.data;
  createBtn(data);
};

const createBtn = (data) => {
  data.forEach((cate) => {
    const createNewBtn = document.createElement("div");
    createNewBtn.className = "btn btn-ghost bg-slate-700 text-white text-lg";
    createNewBtn.innerText = cate.category;

    createNewBtn.addEventListener("click", () => {
      const allButtons = document.querySelectorAll(".btn-ghost");
      allButtons.forEach((button) => {
        button.classList.remove("bg-[#FF1F3D]");
      });
      createNewBtn.classList.add("bg-[#FF1F3D]");
      fetchDataByCategories(cate.category_id);
    });
    btnContainer.appendChild(createNewBtn);
  });
};

const fetchDataByCategories = async (categoryId = 1000) => {
  //   console.log(categoryId);

  const categoriesURL = `https://openapi.programming-hero.com/api/videos/category/${categoryId}`;
  const fetchCategory = await fetch(categoriesURL);
  const res = await fetchCategory.json();
  const data = res.data;
  createVideoContainer(data, sortByView);
};

const createVideoContainer = (videos, sortByView) => {
  videoContainer.innerHTML = "";
  if (sortByView) {
    sortBtn.classList.add("bg-[#FF1F3D]");

    videos.sort((a, b) => {
      const totalViewStrFirst = a.others?.views;
      const totalViewStrSecond = b.others?.views;
      const totalViewStrFirstNumber = parseFloat(
        totalViewStrFirst.replace("K", "") || 0
      );
      const totalViewStrSecondNumber = parseFloat(
        totalViewStrSecond.replace("K", "") || 0
      );
      return totalViewStrSecondNumber - totalViewStrFirstNumber;
    });
  }
  if (videos.length === 0) {
    errorElement.classList.remove("hidden");
  } else {
    errorElement.classList.add("hidden");
  }
  console.log(videos);
  videos.forEach((video) => {
    let verifiedBadge = "";
    if (video.authors[0].verified) {
      verifiedBadge = `<svg
    width="18.750000"
    height="18.750000"
    viewBox="0 0 18.75 18.75"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <defs />
    <path
      id="Vector"
      d="M18.75 9.375C18.75 10.175 17.7672 10.8344 17.5703 11.5719C17.3672 12.3344 17.8813 13.3969 17.4953 14.0641C17.1031 14.7422 15.9234 14.8234 15.3734 15.3734C14.8234 15.9234 14.7422 17.1031 14.0641 17.4953C13.3969 17.8812 12.3344 17.3672 11.5719 17.5703C10.8344 17.7672 10.175 18.75 9.375 18.75C8.575 18.75 7.91562 17.7672 7.17813 17.5703C6.41562 17.3672 5.35313 17.8812 4.68594 17.4953C4.00781 17.1031 3.92656 15.9234 3.37656 15.3734C2.82656 14.8234 1.64687 14.7422 1.25469 14.0641C0.868752 13.3969 1.38281 12.3344 1.17969 11.5719C0.982811 10.8344 0 10.175 0 9.375C0 8.575 0.982811 7.91563 1.17969 7.17812C1.38281 6.41563 0.868752 5.35313 1.25469 4.68594C1.64687 4.00781 2.82656 3.92656 3.37656 3.37656C3.92656 2.82656 4.00781 1.64687 4.68594 1.25468C5.35313 0.868752 6.41562 1.38281 7.17813 1.17969C7.91562 0.982811 8.575 0 9.375 0C10.175 0 10.8344 0.982811 11.5719 1.17969C12.3344 1.38281 13.3969 0.868752 14.0641 1.25468C14.7422 1.64687 14.8234 2.82656 15.3734 3.37656C15.9234 3.92656 17.1031 4.00781 17.4953 4.68594C17.8813 5.35313 17.3672 6.41563 17.5703 7.17812C17.7672 7.91563 18.75 8.575 18.75 9.375Z"
      fill="#2568EF"
      fill-opacity="1.000000"
      fill-rule="nonzero"
    />
    <path
      id="Vector"
      d="M12.0844 6.58126L8.51562 10.15L6.66562 8.30157C6.26406 7.90001 5.6125 7.90001 5.21093 8.30157C4.80937 8.70314 4.80937 9.3547 5.21093 9.75626L7.80624 12.3516C8.19687 12.7422 8.83124 12.7422 9.22187 12.3516L13.5375 8.03595C13.9391 7.63438 13.9391 6.98283 13.5375 6.58126C13.1359 6.1797 12.4859 6.1797 12.0844 6.58126Z"
      fill="#FFFCEE"
      fill-opacity="1.000000"
      fill-rule="nonzero"
    />
  </svg>`;
    }
    const createNewVideo = document.createElement("div");
    createNewVideo.className = "card w-80 bg-base-100 shadow-xl";
    createNewVideo.innerHTML = `
    
    <figure class="w-full h-[200px]"><img class="w-full h-full" src="${video.thumbnail}" />
    </figure>
    <div class="py-4 px-1 flex gap-3 flex-row  ">
        <div class="w-10 h-10 rounded-full overflow-hidden">
            <img class="w-full h-full object-cover" alt="user" src="${video.authors[0].profile_picture}" />
        </div>
        <div class="card-actions flex-col justify-between">
            <p class="card-title">${video.title}</p>
            <p class="flex gap-3 items-center"> <span text-[#171717B3]>${video.authors[0]?.profile_name}</span> ${verifiedBadge} <span> 
                </span></p>
            <small text-[#171717B3]>${video.others.views}</small>
        </div>
    </div>
    `;
    videoContainer.appendChild(createNewVideo);
  });
};

fetchDataByCategories();
fetchCategories();
