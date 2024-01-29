var container = document.querySelector(".music-container");
var prevBtn = document.getElementById("prev");
var playBtn = document.getElementById("play");
var nextBtn = document.getElementById("next");
var audio = document.getElementById("audio");
let title = document.querySelector(".title");
let cover = document.querySelector(".cover");
var progressContainer = document.querySelector(".progress-container");
var progress = document.querySelector(".progress");

var songs = ["Music1", "Music2", "Music3"];

var songIndex = 0;

loadSong(songs[songIndex]);

function loadSong(song) {
	title.innerText = song;
	audio.src = `./music/${song}.mp3`;
	cover.src = `./images/${song}.jpg`;
}

function playSong() {
	container.classList.add("play");
	playBtn.classList.remove("fa-play");
	playBtn.classList.add("fa-pause");
	audio.play();
}

function pauseSong() {
	container.classList.remove("play");
	playBtn.classList.add("fa-play");
	playBtn.classList.remove("fa-pause");
	audio.pause();
}

function prevSong() {
	songIndex--;

	if (songIndex < 0) {
		songIndex = songs.length - 1;
	}

	loadSong(songs[songIndex]);

	playSong();
}

function nextSong() {
	songIndex++;

	if (songIndex > songs.length - 1) {
		songIndex = 0;
	}

	loadSong(songs[songIndex]);

	playSong();
}

function updateTime(e) {
	let { duration, currentTime } = e.srcElement;
	timePercent = (currentTime / duration) * 100;
	progress.style.width = `${timePercent}%`;
}

function setProgress(e) {
	let width = this.clientWidth;
	let clickX = e.offsetX;
	let duration = audio.duration;

	audio.currentTime = (clickX / width) * duration;
}

playBtn.addEventListener("click", () => {
	var playing = container.classList.contains("play");

	if (playing) {
		pauseSong();
	} else {
		playSong();
	}
});

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
audio.addEventListener("timeupdate", updateTime);
progressContainer.addEventListener("click", setProgress);
audio.addEventListener("ended", nextSong);
