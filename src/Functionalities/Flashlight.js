const SUPPORTS_MEDIA_DEVICES = 'mediaDevices' in navigator;

export default class FlashLight {
    if(SUPPORTS_MEDIA_DEVICES) {
        //Get the environment camera (usually the second one)
        navigator.mediaDevices.enumerateDevices().then(devices => {

            const cameras = devices.filter((device) => device.kind === 'videoinput');

            if (cameras.length === 0) {
                throw 'No camera found on this device.';
            }
            const camera = cameras[cameras.length - 1];

            // Create stream and get video track
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    deviceId: camera.deviceId,
                    facingMode: ['user', 'environment'],
                    height: { ideal: 1080 },
                    width: { ideal: 1920 }
                }
            })
            this.track = stream.getVideoTracks()[0];
        });
    }


    static on() {
        this.track && this.track.applyConstraints({
            advanced: [{ torch: true }]
        });
    }

    static off() {
        this.track && this.track.applyConstraints({
            advanced: [{ torch: false }]
        });
    }


}