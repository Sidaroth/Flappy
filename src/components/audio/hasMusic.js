import store from '../../store';

const hasMusic = function hasMusicFunc(state) {
    let currentlyPlaying = false;
    let looping = true;
    let volume = store.BGMVolume;

    let currentSong;

    function setLooping(loop) {
        looping = loop;
    }

    function setMusicVolume(vol) {
        volume = vol;
        if (currentSong) currentSong.volume = vol;
    }

    function isMusicPlaying() {
        return currentlyPlaying;
    }

    function playMusic(key, vol = volume) {
        if (!store.SFXMap) return;

        const song = store.SFXMap.get(key);

        if (song) {
            song.volume = volume;
            song.play({
                loop: looping,
                singleInstance: true,
            });

            currentlyPlaying = true;
            currentSong = song;
        }
    }

    function pauseMusic() {
        if (currentSong) currentSong.pause();
        currentlyPlaying = false;
    }

    function stopMusic() {
        if (currentSong) currentSong.stop();
        currentlyPlaying = false;
    }

    return {
        setMusicVolume,
        setLooping,
        isMusicPlaying,
        playMusic,
        pauseMusic,
        stopMusic,
    };
};

export default hasMusic;
