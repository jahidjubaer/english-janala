// data fetch
const levelApi = () => {
  const url = "https://openapi.programming-hero.com/api/levels/all#";
  fetch(url)
    .then((res) => res.json())
    .then((data) => viewLevel(data.data));
};

levelApi();

const viewLevel = (data) => {
  // get the container ;
  const levelContainer = document.getElementById("lesson-container");
  levelContainer.innerHTML = " ";

  data.forEach((element) => {
    // create a new element
    const div = document.createElement("div");
    div.innerHTML = `
        <button class="btn btn-outline btn-primary">
          <i class="fa-solid fa-book-open"></i>Lesson - ${element.level_no}
        </button>
        `;

    // append the new element ; 
    levelContainer.appendChild(div);
  });
};
