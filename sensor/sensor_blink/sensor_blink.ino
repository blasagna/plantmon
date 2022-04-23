#if defined(USE_TINYUSB)
// https://github.com/adafruit/Adafruit_TinyUSB_Arduino
#include <Adafruit_TinyUSB.h> // for Serial
#endif

void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
  Serial.begin(115200);
  Serial.println("Blink builtin LED on sensor board.");
}

void loop() {
  Serial.println("LED on");
  digitalWrite(LED_BUILTIN, HIGH);   // turn the LED on (HIGH is the voltage level)
  delay(1000);                       // wait for a second
  Serial.println("LED off");
  digitalWrite(LED_BUILTIN, LOW);    // turn the LED off by making the voltage LOW
  delay(1000);                       // wait for a second
}
