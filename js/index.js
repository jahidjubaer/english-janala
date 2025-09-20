// data fetch
const levelLoad = () => {
  const url = "https://openapi.programming-hero.com/api/levels/all#";
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLevel(data.data));
};

levelLoad();

// display the level ;
const displayLevel = (data) => {
  // get the container ;
  const levelContainer = document.getElementById("lesson-container");
  levelContainer.innerHTML = " ";

  data.forEach((element) => {
    // create a new element
    const div = document.createElement("div");
    div.innerHTML = `
        <button onclick="loadLevelWord(${element.level_no })" class="btn btn-outline btn-primary">
          <i class="fa-solid fa-book-open"></i>Lesson - ${element.level_no}
        </button>
        `;

    // append the new element ;
    levelContainer.appendChild(div);
  });
};

// load the loadLevelWord

const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLevelWord(data.data));
};

// display level word
const displayLevelWord = (word) => {
  // get the container
  const levelWordContainer = document.getElementById("level-word-container");
  levelWordContainer.innerHTML = " ";
  if (word.length == 0) {
    levelWordContainer.innerHTML = `
    <div class="space-y-6 rounded-2xl bg-white p-16 col-span-3 " >
      <img class="mx-auto" src="./assets/alert-error.png" alt="">
      <p class="text-gray-600 font-medium text-xl bangla">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
      <h1 class="font-bold bangla text-4xl">নেক্সট Lesson এ যান</h1>
     </div>
    `;
  }

  word.forEach((element) => {
    // create new element
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="space-y-6 rounded-2xl bg-white p-16">
        <h1 class="text-3xl font-bold">${element.word ? element.word: "Word not found"}</h1>
        <p class="text-xl bangla">${element.pronunciation ? element.pronunciation : "Pronunciation Not found"}</p>
        <h2 class="bangla font-semibold text-3xl mb-16">"${element.meaning ? element.meaning : "Meaning not found" }"</h2>
        <div class="flex justify-between">
          <button class="btn btn-square bg-[#1A91FF]/10 hover:bg-[#1A91FF]/60 border-none p-6">
            <i class="fa-solid fa-circle-info fa-xl text-[#374957]"></i>
          </button>
          <button  class="btn btn-square bg-[#1A91FF]/10 hover:bg-[#1A91FF]/60 border-none p-6">
            <i class="fa-solid fa-volume-high fa-xl text-[#374957] "></i>
          </button>
        </div>
      </div>
        `;
    levelWordContainer.appendChild(div);
  });
};
