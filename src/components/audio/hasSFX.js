import store from '../../store';

const hasSFX = function hasSFXFunc(state) {
    let useGlobalSFXVolume = true;
    let volume = 0.5;

    // Play an SFX using global volume, local volume, or a volume override, allowing more finegrained mixing.
    function playSFX(key, volumeOverride = undefined) {
        if (!store.SFXMap) return;

        const SFX = store.SFXMap.get(key);
        if (SFX) {
            const localVolume = useGlobalSFXVolume ? store.SFXVolume : volume;
            SFX.volume = volumeOverride || localVolume;
            SFX.play();
        }
    }

    function setSFXVolume(vol) {
        volume = vol;
    }

    function setUseGlobalSFXVolume(status) {
        useGlobalSFXVolume = status;
    }

    return {
        playSFX,
        setSFXVolume,
        setUseGlobalSFXVolume,
    };
};

export default hasSFX;
