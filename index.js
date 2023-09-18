const btn = document.getElementById("btn");

const result = document.getElementById("result");
const sound = document.getElementById("sound");

const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/`;

let getWordMeaning = async () => {
  let inputWord = document.getElementById("word");

  await fetch(`${apiUrl} ${inputWord.value}`)
    .then((response) => response.json())
    .then((data) => {
      //   console.log(data);

      //   console.log(`${data[0].meanings[0].definitions.length}`);

      let randomResult = Math.floor(
        Math.random() * `${data[0].meanings[0].definitions.length}`
      );
      //   console.log(randomResult);

      result.innerHTML = `<div class="result" id="result">
      <div class="words" id="text_words">
          <div class="your_word">
              <h4>
                  ${inputWord.value}
              </h4>
              <p>
                  ${data[0].meanings[0].partOfSpeech}<span>/ ${
        data[0].phonetic
      } /</span>
              </p>
          </div>
          <div class="audio">
              <p onClick="playSound()">&#127932;</p>
          </div>
      </div>

      <div class="meaning">
          <p>
          ${data[0].meanings[0].definitions[randomResult].definition}
          </p>
          <p>
          ${data[0].meanings[0].definitions[randomResult].example || ""}

      </p>
      </div>
  </div>`;

      //   sound.setAttribute("src", `https:${data[0].phonetics[0].audio}`);
      sound.setAttribute("src", data[0].phonetics[0].audio);
      //   console.log(sound);
    })
    .catch(() => {
      result.innerHTML = `<h3> Couldn't Find The Word </h3>`;
    });
};

function playSound() {
  sound.play();
}

btn.addEventListener("click", function () {
  getWordMeaning();
});
// getWordMeaning();
