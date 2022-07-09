console.log("Welcome to Spotify");

// Initializing Variables

let songIndex = 0;
let masterPlay = document.getElementById('masterPlay');
let previousSong = document.getElementById('previousSong');
let nextSong = document.getElementById('nextSong');
let myProgressBar = document.getElementById('myProgressBar');
let songInfo = document.getElementById('songInfo');
let gif = document.getElementById('gif');
let songsList = document.getElementById('songsList');
let songs = [];
let musicTime = '03:05';
let temp = null;


function getTime(filepath) {
    temp = new Audio(filepath);
    temp.addEventListener('loadeddata', () => {
        duration = temp.duration;
        minutes = Math.floor(duration / 60).toString();
        seconds = Math.round(duration - minutes * 60).toString();
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        musicTime = (minutes + ":" + seconds);
    });;
    console.log(musicTime);
    return musicTime;
}

function addSong(songname, filepath, coverpath) {
    getTime(filepath); // Takes filepath and returns musicTime
    songs.push({ songName: songname, filePath: filepath, coverPath: coverpath, duration: musicTime });
    // Adding Song in List
    html = `<div class="songItem">
    <img src="${coverpath}">
    <span>${songname}</span>
    <span class="songListPlay"><span class="timeStamp" id="timeStamp${songs.length-1}">${musicTime}</span><i class="listPlay fa-solid fa-circle-play" id="play${songs.length-1}"></i></span>
    </div>`
    songsList.innerHTML += html;
};




for (let i = 0; i < songs.length; i++) {
    mplay = document.getElementById(`play${i}`)
    mplay.addEventListener("click", () => {
        audio.pause();
        myProgressBar.value = 0;
        audio = new Audio(`${songs[i].filePath}`);
        songInfo.innerText = songs[i].songName;
        if (audio.currentTime <= 0 || audio.paused) {
            audio.play();
            masterPlay.classList.remove("fa-circle-play");
            masterPlay.classList.add("fa-circle-pause");
            gif.style.opacity = 1;
        } else {
            audio.pause();
            masterPlay.classList.remove("fa-circle-pause");
            masterPlay.classList.add("fa-circle-play");
            gif.style.opacity = 0;
        }
    })
}


// Listeners


masterPlay.addEventListener("click", () => {
    if (audio.currentTime <= 0 || audio.paused) {
        audio.play();
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        gif.style.opacity = 1;
    } else {
        audio.pause();
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
        gif.style.opacity = 0;
    }
});

nextSong.addEventListener("click", () => {
    audio.pause();
    myProgressBar.value = 0;
    if (songIndex == songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex++;
    }
    audio = new Audio(`${songs[songIndex].filePath}`);
    audio.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    gif.style.opacity = 1;
    songInfo.innerText = songs[songIndex].songName;
})

previousSong.addEventListener("click", () => {
    audio.pause();
    myProgressBar.value = 0;
    if (songIndex == 0) {
        songIndex = songs.length - 1;
    } else {
        songIndex--;
    }
    audio = new Audio(`${songs[songIndex].filePath}`);
    audio.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    gif.style.opacity = 1;
    songInfo.innerText = songs[songIndex].songName;
});

addSong("Song 1 New World", "songs/1.mp3", "covers/1.jpg");
addSong("Song 2 of mIne", "songs/2.mp3", "covers/2.jpg");
addSong("Song Three Love You", "songs/3.mp3", "covers/3.jpg");
addSong("Song 4 The End", "songs/4.mp3", "covers/4.jpg");

let audio = new Audio(`${songs[0].filePath}`);
songInfo.innerText = songs[0].songName;

audio.addEventListener("timeupdate", () => {
    progress = parseFloat((audio.currentTime / audio.duration) * 10000)
    console.log([progress]);
    myProgressBar.value = progress;
    if (audio.currentTime == audio.duration) {
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
        gif.style.opacity = 0;
        console.log("Song Ended");
    }
});


myProgressBar.addEventListener("change", () => {
    audio.currentTime = (myProgressBar.value * audio.duration) / 10000;
});