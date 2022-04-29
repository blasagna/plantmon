'use strict'

// example following https://web.dev/serial/
// reference: https://developer.mozilla.org/en-US/docs/Web/API/Web_Serial_API
if ("serial" in navigator) {
    console.log('The Web Serial API is supported.');
} else {
    console.error('The Web Serial API is not supported.');
}


const deviceFinder = document.querySelector('.btn-connect');
const deviceStopper = document.querySelector('.btn-disconnect');

deviceFinder.addEventListener('click', function () {
    console.log('Find serial devices');

    const filters = [
        { usbVendorId: 0x239A, usbProductId: 0x8087 },
    ];

    navigator.serial.requestPort({ filters }).then(function (port) {
        // Connect to `port` or add it to the list of available ports.
        const { usbProductId, usbVendorId } = port.getInfo();
        console.log('Selected device with USB PID: 0x' + usbProductId.toString(16) + ', VID: 0x' + usbVendorId.toString(16));

        port.open({ baudRate: 155200 }).then(function () {
            const reader = port.readable.getReader();

            // Read a chunk of data
            reader.read().then(function ({value, done}) {
                if (done) {
                    // Allow the serial port to be closed later.
                    console.log("read done");
                    reader.releaseLock();
                }

                // value is Uint8Array
                let textValue = new TextDecoder('utf-8').decode(value);
                console.log("data: " + textValue);

                reader.cancel().then(function () {
                    port.close().then(function () {
                        console.log("port closed.");
                    })

                });
            })

        });

    });
});