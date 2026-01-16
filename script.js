// --- MOBILE MENU LOGIC ---
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    const hamburger = document.querySelector('.hamburger i');
    navLinks.classList.toggle('active');

    if (navLinks.classList.contains('active')) {
        hamburger.classList.remove('fa-bars');
        hamburger.classList.add('fa-times');
    } else {
        hamburger.classList.remove('fa-times');
        hamburger.classList.add('fa-bars');
    }
}

// Auto-close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        const navLinks = document.getElementById('navLinks');
        const hamburger = document.querySelector('.hamburger i');

        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('fa-times');
            hamburger.classList.add('fa-bars');
        }
    });
});

// --- SWIPER JS ---
var swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
        rotate: 35,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    },
    pagination: {
        el: ".swiper-pagination",
    },
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    }
});

// --- THEME TOGGLE JS ---
function toggleTheme() {
    const body = document.body;
    const icon = document.querySelector('.theme-toggle i');

    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// --- MUSIC PLAYER JS ---
const songs = [
    {
        title: "Perfect",
        artist: "Ed Sheeran",
        img: "image1.jpg",
        src: "songs/music1.mp3"
    },
    {
        title: "Thousand Years",
        artist: "Christina Perri",
        img: "image2.jpg",
        src: "songs/music2.mp3"
    },
    {
        title: "All of Me",
        artist: "John Legend",
        img: "image3.jpg",
        src: "songs/music3.mp3"
    },
    {
        title: "Just The Way You Are",
        artist: "Bruno Mars",
        img: "image4.jpg",
        src: "songs/music4.mp3"
    },
    {
        title: "Thinking Out Loud",
        artist: "Ed Sheeran",
        img: "image5.jpg",
        src: "songs/music5.mp3"
    },
    {
        title: "At My Worst",
        artist: "Pink Sweat$",
        img: "image6.jpg",
        src: "songs/music6.mp3"
    },
    {
        title: "Until I Found You",
        artist: "Stephen Sanchez",
        img: "image7.jpg",
        src: "songs/music7.mp3"
    },
    {
        title: "Uden Jab Jab Julfe Teri",
        artist: "Vicky Singh",
        img: "image8.jpg",
        src: "songs/music8.mp3"
    },
    {
        title: "Sajna",
        artist: "Ishpreet Singh",
        img: "image9.jpg",
        src: "songs/music9.mp3"
    },
    {
        title: "Beqwarar Karke Hume Yu Na Jayiye",
        artist: "Hemant Kumar",
        img: "image10.jpg",
        src: "songs/music10.mp3"
    },
    {
        title: "Mere Samne Wali Khidki Mein",
        artist: "kishor Kumar",
        img: "image11.jpg",
        src: "songs/music11.mp3"
    },
    {
        title: "Hum Tere Pyar Mein Sara Alam",
        artist: "Lata Mangeshkar",
        img: "image12.jpg",
        src: "songs/music12.mp3"
    },
    {
        title: "Bargad",
        artist: "Arpit Bala",
        img: "image13.jpg",
        src: "songs/music13.mp3"
    },
    {
        title: "Tate Khoti Ki ?",
        artist: "Arzeen",
        img: "image14.jpg",
        src: "songs/music14.mp3"
    },
    {
        title: "Tujhe Yaad Kar Liya Ha",
        artist: "Arijit Singh",
        img: "image15.jpg",
        src: "songs/music15.mp3"
    },
    {
        title: "Zara Sa",
        artist: "KK",
        img: "image16.jpg",
        src: "songs/music16.mp3"
    },
];

const audio = document.getElementById('audio');
const playBtn = document.getElementById('playBtn');
const playIcon = playBtn.querySelector('i');
const title = document.getElementById('currTitle');
const artist = document.getElementById('currArtist');
const cover = document.getElementById('currAlbum');
const progressFill = document.getElementById('progressFill');
const currTimeEl = document.getElementById('currTime');
const durTimeEl = document.getElementById('durTime');
const playlistDiv = document.getElementById('playlist');

let songIndex = 0;

function loadSong(song) {
    title.innerText = song.title;
    artist.innerText = song.artist;
    cover.src = song.img;
    audio.src = song.src;
    renderPlaylist();
}

function playSong() {
    document.querySelector('.music-wrapper').classList.add('play');
    playIcon.classList.remove('fa-play');
    playIcon.classList.add('fa-pause');
    cover.classList.add('playing');
    audio.play();
    renderPlaylist();
}

function pauseSong() {
    document.querySelector('.music-wrapper').classList.remove('play');
    playIcon.classList.remove('fa-pause');
    playIcon.classList.add('fa-play');
    cover.classList.remove('playing');
    audio.pause();
    renderPlaylist();
}

function togglePlay() {
    const isPlaying = playIcon.classList.contains('fa-pause');
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
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

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progressFill.style.width = `${progressPercent}%`;
    const formatTime = (time) => {
        const min = Math.floor(time / 60);
        let sec = Math.floor(time % 60);
        if (sec < 10) sec = `0${sec}`;
        return `${min}:${sec}`;
    };
    if (duration) {
        currTimeEl.innerText = formatTime(currentTime);
        durTimeEl.innerText = formatTime(duration);
    }
}

function setProgress(e) {
    const width = document.getElementById('progressBar').clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

function setVolume(val) {
    audio.volume = val;
}

function renderPlaylist() {
    playlistDiv.innerHTML = '<div class="playlist-header">Playlist</div>';
    songs.forEach((song, index) => {
        const item = document.createElement('div');
        item.classList.add('song-item');
        if (index === songIndex) {
            item.classList.add('active');
        }
        item.innerHTML = `
            <img src="${song.img}" alt="Thumb">
            <div class="song-details">
                <span class="song-title">${song.title}</span>
                <span class="song-artist">${song.artist}</span>
            </div>
            <div class="music-bars-animation">
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
            </div>
        `;
        item.addEventListener('click', () => {
            songIndex = index;
            loadSong(songs[songIndex]);
            playSong();
        });
        playlistDiv.appendChild(item);
    });
}

audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', nextSong);
loadSong(songs[songIndex]);

// --- TIMELINE SCROLL ANIMATION ---
const timelineItems = document.querySelectorAll('.timeline-item');

const observerOptions = {
    threshold: 0.2 // Trigger when 20% of the item is visible
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, observerOptions);

timelineItems.forEach(item => {
    observer.observe(item);
});

function openLetter() {
    const letter = document.querySelector('.letter-container');
    const instruction = document.querySelector('.instruction-text');
    
    letter.classList.toggle('open');
    
    // Hide the "Tap to Open" text once opened
    if (letter.classList.contains('open')) {
        instruction.style.display = 'none';
    }
}

// --- UNBREAKABLE SLIDER LOGIC ---
const slider = document.getElementById('loveSlider');
const emoji = document.getElementById('sliderEmoji');
const text = document.getElementById('sliderText');

slider.addEventListener('input', function() {
    const val = this.value;

    // Change emoji based on position
    if (val > 80) {
        emoji.innerText = "💖";
        text.innerText = "That's more like it!";
    } else if (val > 50) {
        emoji.innerText = "🤨";
        text.innerText = "Hey, what are you doing?";
    } else if (val > 20) {
        emoji.innerText = "🥺";
        text.innerText = "You're breaking my heart...";
    } else {
        emoji.innerText = "😭";
        text.innerText = "Why would you do this?!";
    }
});

// The Magic Snap-Back Effect
slider.addEventListener('change', function() {
    // When she lets go, snap back to 100
    let currentVal = parseInt(this.value);
    
    if (currentVal < 100) {
        let interval = setInterval(() => {
            currentVal += 2; // Speed of snap back
            this.value = currentVal;
            
            // Update visuals as it snaps back
            if (currentVal > 80) {
                 emoji.innerText = "🥰";
                 text.innerText = "Knew you couldn't resist!";
            }

            if (currentVal >= 100) {
                clearInterval(interval);
                this.value = 100;
            }
        }, 5); // 5ms delay makes it smooth
    }
});

// --- STATS COUNTER ANIMATION ---
const statsSection = document.getElementById('stats-section');
const counters = document.querySelectorAll('.counter');
let started = false; // Ensures animation only runs once

function startCounting() {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const speed = 200; // The lower the slower
        
        const updateCount = () => {
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
}

// Trigger animation when scrolled into view
const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !started) {
        startCounting();
        started = true;
    }
});

statsObserver.observe(statsSection);