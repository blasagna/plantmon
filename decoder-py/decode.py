# receive and decode sensor data

from serial import Serial
from serial.tools import list_ports

USB_VID = 0x239A
USB_PID = 0x8087


def find_serial_port() -> str:
    for port in list_ports.comports():
        print(f"USB VID: {hex(port.vid)}, PID: {hex(port.pid)}")
        if port.vid == USB_VID and port.pid == USB_PID:
            return port.device
    return ""


def main() -> None:
    port_name = find_serial_port()
    if not port_name:
        print("No device found")
        return
    print(f"selected device at {port_name}")

    port = Serial(port_name)
    buffer = bytearray()

    delim = b"\r\n"
    while True:
        # read bytes
        recv = port.read()
        buffer.extend(recv)

        # decode bytes
        ind = buffer.find(delim)
        if ind > 0:
            msg, _, buffer = buffer.partition(delim)
            print(f"message: {msg}")


if __name__ == "__main__":
    main()
