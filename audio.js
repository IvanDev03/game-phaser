const INIT_AUDIOs = [
    {
        key: 'enemy-stomp',
        path: 'assets/sound/effects/goomba-stomp.wav'
    },
    {
        key: 'game-over',
        path: 'assets/sound/effects/Effect 18.wav'
    }
]


export const initAudio = ({load}) => {
    INIT_AUDIOs.forEach(({key, path}) => {
        load.audio(key, path);
    });
}