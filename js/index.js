// level data fetch
const levelLoad = () => {
  const url = "https://openapi.programming-hero.com/api/levels/all#";
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLevel(data.data));
};

levelLoad();

// spinner

const manageSpinner = (loading) => {
  if (loading === true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("level-word-container").classList.add("hidden");
  } else {
    document.getElementById("level-word-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

// pronounce word
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

// search

document.getElementById("search-btn").addEventListener("click", () => {
  let inputValue = document.getElementById("search-input").value;
  inputValue = inputValue.trim().toLowerCase();

  fetch("https://openapi.programming-hero.com/api/words/all")
    .then((res) => res.json())
    .then((data) => {
      const allWord = data.data;

      const fitterValue = allWord.filter((word) =>
        word.word.toLowerCase().includes(inputValue)
      );
      displayLevelWord(fitterValue);
    });

  const lessonBtn = document.querySelectorAll(".lesson-btn");

  // remove all the action class if there have any .
  lessonBtn.forEach((element) => {
    element.classList.remove("action");
  });
});

// display the level ;
const displayLevel = (data) => {
  // get the container ;
  const levelContainer = document.getElementById("lesson-container");
  levelContainer.innerHTML = " ";

  data.forEach((element) => {
    // create a new element
    const div = document.createElement("div");
    div.innerHTML = `
        <button id="activeBtn-${element.level_no}" onclick="loadLevelWord(${element.level_no}); activeBtn(${element.level_no}) " class="btn btn-outline btn-primary lesson-btn">
          <i class="fa-solid fa-book-open"></i>Lesson - ${element.level_no}
        </button>
        `; // onclick i pass two function one is loadLevelWord -> display level world ;
    // then activeBtn -> active the button ; to function occur at the same time ;

    // append the new element ;
    levelContainer.appendChild(div);
  });
};

// active btn ;
const activeBtn = (id) => {
  const levelBtn = document.getElementById(`activeBtn-${id}`);
  const lessonBtn = document.querySelectorAll(".lesson-btn");

  // remove all the action class if there have any .
  lessonBtn.forEach((element) => {
    element.classList.remove("action");
  });

  // add a action class to every element. but it will not
  levelBtn.classList.add("action");
};

// load the loadLevelWord

const loadLevelWord = (id) => {
  // spinner
  manageSpinner(true);

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
    // spinner
    manageSpinner(false);
    return;
  }

  word.forEach((element) => {
    // create new element
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="space-y-6 rounded-2xl bg-white p-16">
        <h1 class="text-3xl font-bold">${
          element.word ? element.word : "Word not found"
        }</h1>
        <p class="text-xl bangla">${
          element.pronunciation
            ? element.pronunciation
            : "Pronunciation Not found"
        }</p>
        <h2 class="bangla font-semibold text-3xl mb-16">"${
          element.meaning ? element.meaning : "Meaning not found"
        }"</h2>
        <div class="flex justify-between">
          <button onclick="loadWordDetails(${
            element.id
          })" class="btn btn-square bg-[#1A91FF]/10 hover:bg-[#1A91FF]/60 border-none p-6">
            <i class="fa-solid fa-circle-info fa-xl text-[#374957]"></i>
          </button>
          <button onclick="pronounceWord('${
            element.word
          }')" class="btn btn-square bg-[#1A91FF]/10 hover:bg-[#1A91FF]/60 border-none p-6">
            <i class="fa-solid fa-volume-high fa-xl text-[#374957] "></i>
          </button>
        </div>
      </div>
        `;
    levelWordContainer.appendChild(div);
  });
  manageSpinner(false);
};

// load the word details
const loadWordDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const data = await res.json();

  // call the display function ;
  displayWordDetails(data.data);

  // call the showModal -> a daisyui function ;  my id : remember i want to change the id name i can only use _ no - or space ;
  document.getElementById("my_modal_5").showModal();
};

// displayWordDetails
const displayWordDetails = (data) => {
  // get the container for word details
  wordDetailsContainer = document.getElementById("word-modal-container");
  // empty after close ;
  wordDetailsContainer.innerHTML = "";

  // create a new div and design the div
  const div = document.createElement("div");
  div.innerHTML = `
   <div class="border-1 border-[#EDF7FF] p-6 space-y-6">
          <h1 class="font-semibold text-4xl">${
            data.word
          } (<i class="fa-solid fa-microphone-lines"></i> : <span class="bangla">${
    data.pronunciation
  }</span> )</h1>
          <div>
            <p class="font-bold text-2xl">Meaning</p>
            <p class="font-medium text-2xl bangla">${data.meaning}</p>
          </div>
          <div>
            <h3 class="font-bold text-2xl">Example</h3>
            <p class="text-2xl bangla">${data.sentence}</p>
          </div>
          <div>
            <p class="font-medium text-2xl bangla mb-1">সমার্থক শব্দ গুলো</p>
              
            ${synonymsBtn(data.synonyms)}
          </div>
        </div>
  `;

  // append the new div ;
  wordDetailsContainer.appendChild(div);
};

// function for synonyms
const synonymsBtn = (arr) => {
  console.log(arr);

  const arrValue = arr.map(
    (element) => `<span class="btn bg-[#EDF7FF]">${element}</span>`
  );
  return arrValue.join(" "); // need to join en empty string bz arrValue return array of element , we need to pass string ;
};
