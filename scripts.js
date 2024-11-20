document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.querySelector('.custom-audio-player');
    const audio = audioPlayer.querySelector('#audio');
    const playPauseButton = audioPlayer.querySelector('#play-pause-button');
    const prevButton = audioPlayer.querySelector('#prev-button');
    const nextButton = audioPlayer.querySelector('#next-button');
    const nowPlaying = audioPlayer.querySelector('#now-playing');
    const seekBar = audioPlayer.querySelector('#seek-bar');
    const currentTimeSpan = audioPlayer.querySelector('#current-time');
    const durationSpan = audioPlayer.querySelector('#duration');
    const volumeBar = audioPlayer.querySelector('#volume-bar');
    const muteButton = audioPlayer.querySelector('#mute-button');

    if (!audioPlayer || !audio || !playPauseButton || !prevButton || !nextButton || !nowPlaying || !seekBar || !currentTimeSpan || !durationSpan || !volumeBar || !muteButton) {
        console.error('One or more required elements are missing');
        return;
    }

    const playlist = [
        { title: "Cartoon-On & On", file: "assets/songs/Cartoon_Jeja_On_And_On.mp3" },
        { title: "Janji-Heroes", file: "assets/songs/Janji_Heroes.mp3" },
        { title: "Deaf Kev-Invincible", file: "assets/songs/DK_Invincible.mp3" },
        { title: "Waryo-Mortals", file: "assets/songs/Waryo-Mortals.mp3" },
        { title: "Disfigure-Blank", file: "assets/songs/Disfigure_Blank.mp3" },
        { title: "Elektronomia-Sky High", file: "assets/songs/Elektronomia-Sky_High.mp3" },
        { title: "Cartoon-Why We Lose", file: "assets/songs/Cartoon-WWL.mp3" }
    ];

    let currentTrack = 0;

    const loadTrack = (trackIndex) => {
        if (trackIndex >= 0 && trackIndex < playlist.length) {
            audio.src = playlist[trackIndex].file;
            nowPlaying.textContent = `Now Playing: ${playlist[trackIndex].title}`;
            audio.load();
        } else {
            console.error('Invalid track index');
        }
    };

    const playPause = () => {
        if (audio.paused) {
            audio.play().catch(e => console.error('Error playing audio:', e));
            playPauseButton.textContent = "Pause";
        } else {
            audio.pause();
            playPauseButton.textContent = "Play";
        }
    };

    const nextTrack = () => {
        currentTrack = (currentTrack + 1) % playlist.length;
        loadTrack(currentTrack);
        playPause();
    };

    const prevTrack = () => {
        currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
        loadTrack(currentTrack);
        playPause();
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    playPauseButton.addEventListener('click', playPause);
    nextButton.addEventListener('click', nextTrack);
    prevButton.addEventListener('click', prevTrack);

    audio.addEventListener('timeupdate', () => {
        currentTimeSpan.textContent = formatTime(audio.currentTime);
        seekBar.value = (audio.currentTime / audio.duration) * 100 || 0;
    });

    audio.addEventListener('loadedmetadata', () => {
        durationSpan.textContent = formatTime(audio.duration);
    });

    audio.addEventListener('ended', nextTrack);

    seekBar.addEventListener('input', () => {
        const time = audio.duration * (seekBar.value / 100);
        audio.currentTime = time;
    });

    // Add volume control functionality
    volumeBar.addEventListener('input', () => {
        audio.volume = volumeBar.value / 100;
        if (audio.volume > 0) {
            audio.muted = false;
            muteButton.textContent = "Mute";
        }
    });

    muteButton.addEventListener('click', () => {
        if (audio.muted) {
            audio.muted = false;
            muteButton.textContent = "Mute";
            volumeBar.value = audio.volume * 100;
        } else {
            audio.muted = true;
            muteButton.textContent = "Unmute";
            volumeBar.value = 0;
        }
    });

    audio.addEventListener('volumechange', () => {
        volumeBar.value = audio.muted ? 0 : audio.volume * 100;
    });

    // Initialize volume
    audio.volume = volumeBar.value / 100;

    loadTrack(currentTrack);
});