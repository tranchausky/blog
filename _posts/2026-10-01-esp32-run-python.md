---
title: "Esp32 run run run python and microPython"
date: 2026-10-01
layout: post
---

Esp32 run run run python



Đây là bảng so sánh nhanh **Arduino vs ESP-IDF vs MicroPython** trên ESP32:

| Tiêu chí | Arduino | ESP-IDF | MicroPython |
|---|---|---|---|
| Ngôn ngữ | C/C++ | C/C++ | Python |
| Độ dễ | Dễ | Khó hơn | Dễ nhất |
| Build/compile | Có | Có | Thường không |
| Upload code | Flash firmware | Flash firmware | Copy `.py` |
| Tốc độ | Nhanh | Nhanh nhất / kiểm soát sâu | Chậm hơn |
| RAM usage | Vừa | Tối ưu nhất nếu làm kỹ | Cao hơn |
| Thư viện sensor | Rất nhiều | Ít tiện hơn Arduino | Khá nhiều |
| GPIO/I2C/SPI/UART | ✅ | ✅ | ✅ |
| Wi-Fi | ✅ | ✅ | ✅ |
| BLE | ✅ | ✅ | ✅ |
| MQTT | ✅ | ✅ | ✅ |
| HTTPS/TLS | ✅ | ✅ | ✅ |
| FreeRTOS | Có bên dưới | ✅ dùng trực tiếp | Không trực tiếp như IDF |
| Multi-task | Khá dễ | Rất mạnh | Có `asyncio`, thread hạn chế hơn |
| Debug | Khá | Tốt nhất | Đơn giản |
| OTA | ✅ | ✅ rất mạnh | Có thể làm |
| Low power | Tốt | Tốt nhất | Có nhưng ít kiểm soát hơn |
| Production | ✅ | ✅ tốt nhất | Có, nhưng tùy project |
| Prototype | ✅ | Có | ✅ tốt nhất |


![python in esp32](https://i.ibb.co/yFmQbKK6/image.png)

Ví dụ cùng một việc bật LED.

**Arduino:**
```cpp
void setup() {
    pinMode(2, OUTPUT);
}

void loop() {
    digitalWrite(2, HIGH);
    delay(1000);
    digitalWrite(2, LOW);
    delay(1000);
}
```

**MicroPython:**
```python
from machine import Pin
import time

led = Pin(2, Pin.OUT)

while True:
    led.on()
    time.sleep(1)
    led.off()
    time.sleep(1)
```

**ESP-IDF** sẽ dài hơn vì thường đi theo kiểu API chính thức:

```c
gpio_reset_pin(GPIO_NUM_2);
gpio_set_direction(GPIO_NUM_2, GPIO_MODE_OUTPUT);

while (1) {
    gpio_set_level(GPIO_NUM_2, 1);
    vTaskDelay(pdMS_TO_TICKS(1000));

    gpio_set_level(GPIO_NUM_2, 0);
    vTaskDelay(pdMS_TO_TICKS(1000));
}
```

Nếu nhìn theo workflow thì khác biệt khá rõ:

```text
Arduino
code
→ compile
→ flash
→ chạy
```

```text
ESP-IDF
code
→ build
→ link
→ flash
→ monitor/debug
```

```text
MicroPython
MicroPython firmware đã flash sẵn
→ sửa main.py
→ copy vào ESP32
→ reset
→ chạy
```

Về performance thì đại khái:

```text
ESP-IDF ≈ Arduino
>>>>>>>> MicroPython
```

Nhưng trong các project kiểu:

```text
đọc sensor
→ xử lý chút dữ liệu
→ gửi MQTT
→ điều khiển relay/LED
```

thì thường **không cảm nhận được khác biệt lớn** giữa Arduino và MicroPython.

Khác biệt sẽ rõ nếu làm:

```text
camera
audio processing
DSP
high-frequency PWM
motor control tốc độ cao
rất nhiều interrupt
BLE + Wi-Fi + nhiều task
real-time timing nghiêm ngặt
```

thì nên dùng **ESP-IDF hoặc Arduino C++**.

Còn về thư viện thì Arduino thường thắng:

```text
Arduino ecosystem
████████████████████

MicroPython
████████████

ESP-IDF
████████
```

ESP-IDF không phải ít khả năng, mà là nhiều sensor không có kiểu:

```cpp
sensor.begin();
sensor.readTemperature();
```

sẵn tiện như Arduino. Bạn thường phải làm driver hoặc dùng component của bên thứ ba.

Một điểm rất quan trọng nữa là **Arduino ESP32 thực ra chạy trên ESP-IDF**.

Kiến trúc đại khái:

```text
Your Arduino code
       ↓
Arduino ESP32 Core
       ↓
ESP-IDF
       ↓
FreeRTOS
       ↓
ESP32 hardware
```

Nên Arduino không phải một hệ hoàn toàn tách biệt.

Thậm chí bạn có thể dùng API ESP-IDF bên trong project Arduino:

```cpp
#include "esp_system.h"

void setup() {
    Serial.begin(115200);

    Serial.println(esp_get_free_heap_size());
}
```

Đây là lý do Arduino khá hấp dẫn: dễ viết nhưng vẫn có thể xuống tầng thấp khi cần.

Nếu chia theo project thực tế thì tôi sẽ chọn như này:

| Project | Nên dùng |
|---|---|
| LED / relay | MicroPython |
| Sensor IoT | MicroPython / Arduino |
| MQTT | MicroPython / Arduino |
| OLED/LCD | Arduino / MicroPython |
| Home automation | ESPHome |
| Robot đơn giản | Arduino |
| Servo / stepper | Arduino |
| Motor control chính xác | ESP-IDF |
| ESP32-CAM | Arduino / ESP-IDF |
| Audio | ESP-IDF |
| BLE phức tạp | ESP-IDF |
| Sản phẩm thương mại | ESP-IDF / Arduino |
| Prototype 1 ngày | MicroPython |
| Học ESP32 | Arduino hoặc MicroPython |

Nếu bạn đang bắt đầu ESP32 mà đã biết Python, mình thấy lộ trình khá hay là:

```text
MicroPython
    ↓
hiểu GPIO / I2C / SPI / UART / Wi-Fi
    ↓
Arduino C++
    ↓
ESP-IDF
```

Như vậy ban đầu không bị mất quá nhiều thời gian vào build toolchain, rồi khi cần tốc độ hoặc project lớn mới chuyển sang C/C++.



Có khá nhiều “cách chạy ESP32”, nhưng nên tách ra thành **framework/runtime** và **công cụ build/IDE** vì nhiều cái hay bị gọi lẫn.

Những lựa chọn phổ biến nhất:

- **Arduino Core for ESP32** — viết C/C++, dễ học, thư viện rất nhiều. Đây là lựa chọn phổ biến nhất cho project IoT nhỏ đến vừa.
- **ESP-IDF** — framework chính thức của Espressif, viết C/C++, mạnh nhất và kiểm soát phần cứng sâu nhất. Hợp project production, cần FreeRTOS, networking, BLE, OTA, power management, performance.
- **MicroPython** — chạy Python trên ESP32. Dev rất nhanh, chỉ cần upload `main.py`, phù hợp prototype, sensor, MQTT, web API đơn giản.
- **CircuitPython** — cũng là Python cho microcontroller, tập trung mạnh vào thư viện phần cứng và trải nghiệm dễ dùng. ESP32 hỗ trợ tùy dòng/board, không phổ biến bằng MicroPython trên ESP32.
- **ESPHome** — chủ yếu cấu hình YAML, gần như không cần code. Rất hợp Home Assistant, sensor, relay, smart-home.
- **Zephyr RTOS** — hệ điều hành real-time, viết C, kiến trúc bài bản, hỗ trợ nhiều MCU chứ không riêng ESP32.
- **NuttX** — RTOS kiểu POSIX, gần giống Linux embedded hơn, dùng được trên ESP32 nhưng ít phổ biến hơn ESP-IDF.
- **Rust** — có thể viết ESP32 bằng Rust qua ecosystem `esp-rs`. Khá hiện đại nhưng learning curve cao hơn.
- **Lua / NodeMCU** — từng rất phổ biến với ESP8266/ESP32, giờ ít dùng hơn nhiều.

Nếu xếp theo độ dễ:

```text
ESPHome
↓
MicroPython / CircuitPython
↓
Arduino
↓
ESP-IDF
↓
Zephyr / Rust
```

Còn nếu xếp theo độ kiểm soát/performance:

```text
ESP-IDF
≈ Zephyr / Rust native
↓
Arduino
↓
MicroPython / CircuitPython
↓
ESPHome
```

Một điểm dễ nhầm: **PlatformIO không phải framework chạy trên ESP32**. Nó là công cụ build/project manager. Trong PlatformIO bạn có thể chọn:

```text
PlatformIO
 ├─ Arduino
 └─ ESP-IDF
```

Tương tự, **VS Code** hay **Arduino IDE** chỉ là môi trường viết code.

Nếu mục tiêu của bạn là:

- học nhanh / prototype: **MicroPython**
- làm sản phẩm bình thường, nhiều thư viện: **Arduino**
- làm production nghiêm túc, cần performance và control: **ESP-IDF**
- smart home với Home Assistant: **ESPHome**

Nếu muốn, tôi có thể làm luôn bảng so sánh **Arduino vs ESP-IDF vs MicroPython** theo RAM, tốc độ, Wi-Fi, BLE, thư viện, build, debug và độ khó.


## esp32 chạy python sao nó không cần build vậy

Vì ESP32 không chạy “Python thường” trực tiếp. Với MicroPython, bạn đã flash sẵn một **firmware có interpreter Python** vào chip rồi.

Luồng thực tế là:

```text
ESP32
↓
MicroPython firmware
↓
Python interpreter
↓
main.py
```

Nên khi bạn sửa:

```python
print("hello")
```

thì không cần build lại toàn bộ firmware. Interpreter sẽ đọc và thực thi code Python.

Nó giống máy tính của bạn đã cài Python:

```text
python main.py
```

Bạn cũng không compile `main.py` thành `.exe` mỗi lần.

Trong khi Arduino/C++ là:

```text
source .cpp
↓
compiler
↓
machine code
↓
flash vào ESP32
```

ESP32 chỉ hiểu machine code, nên C/C++ phải được compile trước.

Còn MicroPython:

```text
main.py
↓
MicroPython interpreter đọc
↓
chuyển thành bytecode nội bộ
↓
VM thực thi
```

Nói chính xác hơn, MicroPython thường vẫn có bước **compile Python source thành bytecode**, nhưng việc này diễn ra ngay trên runtime, rất nhanh và tự động. Bạn không phải tự chạy build.

Có thể hình dung:

```text
Arduino / ESP-IDF
-----------------
main.cpp
  ↓
compile trên PC
  ↓
firmware.bin
  ↓
ESP32 chạy machine code
```

```text
MicroPython
-----------
MicroPython firmware.bin  ← flash một lần
  ↓
main.py
  ↓
compile thành bytecode lúc chạy
  ↓
MicroPython VM chạy bytecode
```

Vì vậy `main.py` chỉ là “script” nằm trong flash filesystem.

Đổi code:

```text
main.py cũ
↓
copy main.py mới
↓
reset
↓
chạy code mới
```

không cần build lại firmware.

Đổi lại, cái giá phải trả là:

- chậm hơn C/C++
- tốn RAM hơn
- timing không chính xác bằng native code
- một số phần cứng chuyên sâu khó dùng hơn

Nhưng với sensor, MQTT, Wi-Fi, relay, OLED, API… thì rất tiện.

Có một chi tiết khá thú vị: bạn còn có thể compile trước file Python thành `.mpy` để giảm dung lượng và load nhanh hơn. Nhưng với development bình thường thì cứ `.py` là đủ.


## So sánh lúc chạy


Với **ESP32 classic** không PSRAM, chip có tổng RAM khoảng **528 KB**, nhưng một phần bị ESP-IDF, Wi-Fi/BLE, stack hệ thống… dùng mất. :chatgpt-content-reference{index="0"}

MicroPython hiện tại khởi tạo Python heap khá nhỏ rồi **mở rộng thêm khi cần**. Với ESP32 classic, cấu hình hiện tại đặt heap ban đầu khoảng **56 KB**. :chatgpt-content-reference{index="1"} Một ví dụ chính thức của MicroPython trên ESP32 không PSRAM cho thấy lúc mới boot, Python có thể thấy khoảng **170 KB bộ nhớ khả dụng tổng cộng** cho heap sau khi tính cả vùng có thể mở rộng. :chatgpt-content-reference{index="2"}

Có thể hình dung RAM như này:

```text
ESP32 RAM ~528 KB
│
├── ESP-IDF / FreeRTOS
├── Wi-Fi / BLE buffers
├── stack
├── driver
├── MicroPython runtime
└── Python heap
      └── khoảng ~100–200 KB usable
          tùy firmware / Wi-Fi / BLE / board
```

Nếu bật Wi-Fi, TLS, MQTT, BLE cùng lúc thì RAM trống giảm khá nhanh.

Bạn có thể tự xem trực tiếp:

```python
import gc

print(gc.mem_alloc())
print(gc.mem_free())
```

Hoặc chi tiết hơn:

```python
import micropython

micropython.mem_info()
```

MicroPython docs cũng khuyến nghị dùng `gc.mem_free()` và `micropython.mem_info()` để xem bộ nhớ Python thực tế. :chatgpt-content-reference{index="3"}

Về **ROM/Flash**, MicroPython firmware bản thân nó thường chiếm cỡ **1–2 MB flash** tùy build và tính năng. ESP32_GENERIC hiện yêu cầu board thường có **4 MB flash trở lên**; phần flash còn lại được chia cho filesystem, partition, OTA nếu bật, v.v. :chatgpt-content-reference{index="4"}

Ví dụ board:

```text
ESP32 WROOM
4 MB Flash
528 KB RAM
```

sau khi flash MicroPython đại khái:

```text
Flash 4 MB
├── bootloader + partition
├── MicroPython firmware ~1–2 MB
└── filesystem cho main.py/lib/data...
```

Còn RAM lúc chạy:

```text
528 KB
↓
hệ thống + runtime ăn một phần
↓
Python app thường còn khoảng 100–200 KB để chơi
```

Đây là lý do đoạn kiểu này rất dễ chết:

```python
data = bytearray(500_000)
```

với lỗi:

```text
MemoryError
```

Nhưng nếu board có **PSRAM**, câu chuyện khác hẳn. ESP32/ESP32-S3 có board 2 MB, 4 MB, 8 MB PSRAM; MicroPython có thể tận dụng vùng đó. MicroPython thậm chí khuyến nghị ESP32-S3 + PSRAM nếu cần nhiều RAM. :chatgpt-content-reference{index="5"}

Ví dụ ESP32-S3 N16R8:

```text
Flash: 16 MB
PSRAM: 8 MB
```

thì chạy MicroPython thoải mái hơn rất nhiều:

```text
main.py
HTTP
MQTT
JSON
display buffer
nhiều sensor
```

đều dễ thở hơn ESP32 528 KB RAM thường.

Còn nếu bạn đang hỏi **Python desktop CPython** thì khác một trời một vực: chỉ khởi động interpreter trên Windows/Linux thường đã dùng **hàng chục MB RAM**, import `numpy`, `pandas` có thể lên **100 MB+** rất nhanh.

Nên so tương đối:

```text
Arduino/C:
vài KB → vài chục KB RAM

MicroPython ESP32:
vài chục KB runtime
+ ~100–200 KB heap khả dụng

Python desktop CPython:
~10–30+ MB chỉ runtime
+ thư viện có thể lên hàng trăm MB
```

Đó cũng chính là lý do **không thể bê nguyên CPython xuống ESP32**, mà phải có MicroPython được cắt gọn rất mạnh.


## Ai chế python cho esp32

Người khởi tạo **MicroPython** là **Damien George**. Dự án bắt đầu khoảng 2013 với mục tiêu đưa Python 3 xuống vi điều khiển; trang chính thức của MicroPython hiện vẫn ghi đây là “A project by Damien George.”  
https://micropython.org/download/?mcu=stm32f4
https://github.com/micropython/micropython-esp32  

https://github.com/micropython/micropython/blob/master/ports/esp32/README.md

Nhưng ông ấy không “viết Python riêng cho ESP32” ngay từ đầu. MicroPython ban đầu chạy trên các vi điều khiển khác như STM32/pyboard, rồi sau đó cộng đồng làm **port cho ESP32**. Port ESP32 hiện đã nằm trong repo chính của MicroPython và dùng **ESP-IDF + FreeRTOS** ở bên dưới. :chatgpt-content-reference{index="1"}

Kiến trúc có thể hiểu như này:

```text
code Python của bạn
        ↓
MicroPython interpreter
        ↓
ESP32 port của MicroPython
        ↓
ESP-IDF
        ↓
FreeRTOS
        ↓
ESP32 hardware
```

Nên bên dưới MicroPython trên ESP32 thực ra vẫn là một đống **C/C++ native code** rất tối ưu. Python chỉ là lớp bạn viết ở phía trên.

Điểm hay là port ESP32 hỗ trợ khá sâu: GPIO, UART, SPI, I2C, ADC, DAC, PWM, touch, watchdog, timer, Wi-Fi và BLE. :chatgpt-content-reference{index="2"}

Nói ngắn gọn: **Damien George tạo MicroPython; sau đó ông ấy cùng cộng đồng port nó sang ESP32.** Espressif hiện cũng hỗ trợ ESP32 như một port cấp cao trong dự án MicroPython. :chatgpt-content-reference{index="3"}
https://github.com/micropython/micropython


## Python chạy được ở đâu 

Python có thể chạy ở rất nhiều nơi, từ máy tính mạnh cho tới vi điều khiển nhỏ như ESP32. Điểm khác nhau là **implementation/runtime** dùng để chạy Python.

Có thể chia như này:

- **PC / laptop / server**: thường dùng **CPython** trên Windows, Linux, macOS. Đây là Python “chuẩn” phổ biến nhất.
- **Raspberry Pi**: chạy CPython bình thường vì Raspberry Pi là máy tính Linux đầy đủ.
- **ESP32 / STM32 / RP2040**: thường dùng **MicroPython** hoặc **CircuitPython**.
- **Raspberry Pi Pico / Pico W**: rất phổ biến với MicroPython.
- **Arduino board mới**: một số board hỗ trợ MicroPython/CircuitPython, tùy chip.
- **BBC micro:bit**: có MicroPython riêng.
- **Web browser**: có thể chạy Python qua **Pyodide**, tức Python/WebAssembly trong trình duyệt.
- **Android/iOS**: có thể chạy Python qua app/runtime riêng, nhưng không “native” tiện như desktop.
- **Cloud/serverless**: AWS Lambda, Google Cloud Functions, Azure Functions đều hỗ trợ Python.
- **GPU/AI server**: Python chạy trên CPU, còn phần nặng gọi CUDA/C/C++ phía dưới qua NumPy, PyTorch, TensorFlow.
- **Embedded Linux**: router, industrial PC, Jetson, BeagleBone… nếu chạy Linux thì thường chạy CPython được.

Điểm thú vị là “Python chạy được ở đâu” phụ thuộc rất nhiều vào phần cứng:

```text
PC / Server
→ CPython

Raspberry Pi
→ CPython

ESP32 / STM32 / RP2040
→ MicroPython / CircuitPython

Browser
→ Pyodide / WebAssembly
```

Nếu xét riêng kiểu **giống ESP32**, tức là vi điều khiển nhỏ, thì những chip/board đáng chú ý nhất là:

```text
ESP32
STM32
RP2040 / Raspberry Pi Pico
nRF52
SAMD21 / SAMD51
micro:bit
Teensy một số dòng
```

Trong số này, **ESP32 và Raspberry Pi Pico** là hai lựa chọn rất phổ biến để chạy MicroPython.

Nếu muốn, tôi có thể làm tiếp bảng **ESP32 vs Raspberry Pi Pico vs STM32 khi chạy MicroPython**, xem con nào mạnh hơn, RAM/flash bao nhiêu và dùng cho việc gì.


## Link document microPython for esp32 

Có. Website **chính thức của MicroPython** là chỗ tốt nhất để xem đầy đủ `import`, class, method, function và phần riêng cho ESP32.

Bạn nên bookmark mấy trang này:

- **ESP32 Quick Reference** — rất thực dụng, có ví dụ GPIO, ADC, PWM, I2C, SPI, UART, Wi-Fi, Ethernet… dành riêng cho ESP32. :chatgpt-content-reference{index="0"}  
  [MicroPython ESP32 Quick Reference](https://docs.micropython.org/en/latest/esp32/quickref.html?utm_source=chatgpt.com)

- **`machine` module** — đây là trang quan trọng nhất khi làm phần cứng. Nó liệt kê các class như `Pin`, `ADC`, `PWM`, `UART`, `SPI`, `I2C`, `I2S`, `RTC`, `Timer`, `WDT`… :chatgpt-content-reference{index="2"}  
  [machine module documentation](https://docs.micropython.org/en/latest/library/machine.html?utm_source=chatgpt.com)

- **Full Index** — gần giống kiểu “tra tất cả API”, tìm theo tên function/class như `Pin.value()`, `I2C.scan()`, `UART.read()`… :chatgpt-content-reference{index="4"}  
  [MicroPython API Index](https://docs.micropython.org/en/latest/genindex.html?utm_source=chatgpt.com)

Ví dụ bạn muốn GPIO thì vào `machine.Pin`: :chatgpt-content-reference{index="6"}  
[machine.Pin documentation](https://docs.micropython.org/en/latest/library/machine.Pin.html?utm_source=chatgpt.com)

Muốn I2C: :chatgpt-content-reference{index="8"}  
[machine.I2C documentation](https://docs.micropython.org/en/latest/library/machine.I2C.html?utm_source=chatgpt.com)

Muốn SPI: :chatgpt-content-reference{index="10"}  
[machine.SPI documentation](https://docs.micropython.org/en/latest/library/machine.SPI.html?utm_source=chatgpt.com)

Kiểu tra cứu sẽ như này:

```python
from machine import Pin, ADC, PWM, I2C, SPI, UART
```

rồi vào docs sẽ thấy:

```text
machine
├── Pin
│   ├── value()
│   ├── on()
│   ├── off()
│   ├── irq()
│   └── init()
│
├── ADC
├── PWM
├── UART
├── SPI
├── SoftSPI
├── I2C
├── SoftI2C
├── I2S
├── RTC
├── Timer
└── WDT
```

Ngoài `machine`, mấy module rất hay dùng trên ESP32 là:

```python
import network
import bluetooth
import socket
import ssl
import time
import json
import os
import gc
import micropython
import esp32
import neopixel
```

Có một điểm cần chú ý: docs ở `/en/latest/` là **development/latest docs**, nên đôi khi có API chưa có trong firmware bạn đang chạy. Chính docs cũng cảnh báo điều này. :chatgpt-content-reference{index="12"}

Nếu muốn xem chính xác firmware ESP32 của bạn hỗ trợ cái gì, ngay trên ESP32 có thể chạy:

```python
help('modules')
```

Nó sẽ liệt kê module có trong firmware đó.

Sau đó:

```python
import machine
help(machine)
```

hoặc:

```python
from machine import Pin
help(Pin)
```

Đây mới là cách **chắc chắn nhất** xem board hiện tại thực sự hỗ trợ gì.

Nếu bạn muốn, tôi có thể làm cho bạn một **cheat sheet toàn bộ MicroPython ESP32** kiểu `import → class → function → ví dụ`, gói gọn trong 1 bảng để tra rất nhanh.


## Cách chạy 1 file


Tối thiểu nhất thì MicroPython trên ESP32 chỉ cần **`main.py`**.

Ví dụ:

```python
# main.py
print("Hello ESP32")
```

Cách chạy là:

```text
ESP32 bật nguồn / reset
        ↓
MicroPython firmware khởi động
        ↓
boot.py   (nếu có)
        ↓
main.py   (nếu có)
        ↓
chạy code trong main.py
```

Cấu trúc tối thiểu:

```text
/
└── main.py
```

Không bắt buộc phải có `boot.py`.

Nếu có `boot.py` thì thường dùng cho phần khởi tạo hệ thống:

```python
# boot.py
print("Booting...")
```

rồi:

```python
# main.py
print("Main program")
```

Kết quả khi reset:

```text
Booting...
Main program
```

Một ví dụ thực tế tối thiểu với LED:

```python
# main.py

from machine import Pin
import time

led = Pin(2, Pin.OUT)

while True:
    led.on()
    time.sleep(1)

    led.off()
    time.sleep(1)
```

Quy trình dev thường là:

```text
1. Flash MicroPython firmware vào ESP32
2. Kết nối USB
3. Copy main.py vào filesystem của ESP32
4. Reset ESP32
5. main.py tự chạy
```

Không cần lệnh kiểu:

```bash
python main.py
```

trên ESP32.

MicroPython tự tìm `main.py` sau khi boot.

Nếu đang dùng REPL thì bạn cũng có thể chạy từng câu trực tiếp:

```python
>>> print("hello")
hello
```

hoặc import một file khác:

```text
/
├── main.py
└── wifi.py
```

`wifi.py`:

```python
def connect():
    print("connecting wifi...")
```

`main.py`:

```python
import wifi

wifi.connect()
```

MicroPython sẽ tìm `wifi.py` trong filesystem và import nó.

Project thực tế thường tổ chức kiểu:

```text
/
├── boot.py
├── main.py
├── config.py
├── wifi.py
├── sensor.py
└── lib/
    └── ssd1306.py
```

Nhưng tối thiểu nhất vẫn chỉ là:

```text
main.py
```

và reset board là chạy.



Được, bạn hoàn toàn có thể tự tổ chức MicroPython theo kiểu Arduino `setup()` + `loop()` cho dễ nhìn.

Ví dụ cấu trúc:

```text
/
├── main.py
└── mycode.py
```

`mycode.py`:

```python
from machine import Pin

led = Pin(2, Pin.OUT)

def setup():
    print("Setup")
    led.off()

def loop():
    led.value(not led.value())
```

`main.py`:

```python
import time
import mycode

def setup():
    mycode.setup()

def loop():
    mycode.loop()
    time.sleep(1)

setup()

while True:
    loop()
```

Nhìn nó sẽ rất giống Arduino:

```cpp
void setup() {
    ...
}

void loop() {
    ...
}
```

bên MicroPython:

```python
def setup():
    ...

def loop():
    ...

setup()

while True:
    loop()
```

Bạn cũng có thể chia file đẹp hơn:

```text
/
├── main.py
├── config.py
├── wifi.py
├── sensor.py
└── led.py
```

`main.py`:

```python
import time

import wifi
import sensor
import led

def setup():
    wifi.connect()
    sensor.init()
    led.init()

def loop():
    value = sensor.read()

    print(value)

    led.update(value)

    time.sleep(1)

setup()

while True:
    loop()
```

Cách này rất dễ maintain.

Một kiểu mình thấy còn sạch hơn là:

```python
import time
from app import App

app = App()

app.setup()

while True:
    app.loop()
    time.sleep_ms(10)
```

`app.py`:

```python
class App:

    def setup(self):
        print("Starting app")

    def loop(self):
        print("Running...")
```

Thực tế MicroPython không bắt bạn phải viết `setup()` và `loop()`. Nó chỉ chạy từ trên xuống dưới:

```python
print("1")
print("2")
print("3")
```

rồi kết thúc.

Muốn loop thì tự viết:

```python
while True:
    ...
```

Nên có thể hiểu:

```text
Arduino framework
    ↓
framework tự gọi setup()
    ↓
framework tự gọi loop() liên tục
```

còn MicroPython:

```text
main.py
    ↓
bạn tự gọi setup()
    ↓
bạn tự tạo while True
    ↓
bạn tự gọi loop()
```

Nếu bạn quen Arduino thì cứ viết MicroPython theo style này là rất ổn:

```python
import time
from machine import Pin

led = Pin(2, Pin.OUT)

def setup():
    print("ESP32 starting...")

def loop():
    led.toggle()
    time.sleep_ms(500)

setup()

while True:
    loop()
```

Nhìn code sẽ đỡ cảm giác "Python chạy lung tung từ trên xuống dưới" hơn nhiều. 😄


## Link học microPython

Có. Nếu bạn muốn học **cú pháp MicroPython từ cơ bản như biến, hàm, class, import, vòng lặp...**, thì nên dùng song song **Python docs** và **MicroPython docs**.

MicroPython cố gắng tương thích cú pháp Python 3, nên phần ngôn ngữ như biến, `if`, `for`, `while`, `def`, `class`, `import` gần như học theo Python bình thường. MicroPython docs cũng nói phần lớn language syntax giống Python 3. :chatgpt-content-reference{index="0"}

Mình khuyên đi theo thứ tự này:

1. **Python Tutorial** — học biến, string, list, dict, `if`, `for`, `while`, function, class, import:
   [Python Official Tutorial](https://docs.python.org/3/tutorial/?utm_source=chatgpt.com)

2. **MicroPython Language Reference** — xem những điểm riêng của MicroPython:
   [MicroPython Language & Implementation](https://docs.micropython.org/en/latest/reference/index.html?utm_source=chatgpt.com) :chatgpt-content-reference{index="3"}

3. **MicroPython builtins** — tra các hàm có sẵn như `print()`, `len()`, `range()`, `int()`, `str()`, `list()`, `dict()`...:
   [MicroPython Built-in Functions](https://docs.micropython.org/en/latest/library/builtins.html?utm_source=chatgpt.com) :chatgpt-content-reference{index="5"}

4. **MicroPython Library Reference** — tra tất cả `import`, module, class, function:
   [MicroPython Libraries](https://docs.micropython.org/en/latest/library/index.html?utm_source=chatgpt.com) :chatgpt-content-reference{index="7"}

5. Sau khi biết Python cơ bản thì vào **ESP32 Quick Reference** để học phần hardware:
   [MicroPython ESP32 Quick Reference](https://docs.micropython.org/en/latest/esp32/quickref.html?utm_source=chatgpt.com)

Ví dụ phần cơ bản bạn cần nắm chỉ khoảng này:

```python
# Variable
name = "ESP32"
count = 10
temperature = 25.5
enabled = True

# List
values = [10, 20, 30]

# Dictionary
config = {
    "wifi": "MyWifi",
    "port": 1883
}

# If
if temperature > 30:
    print("Hot")
else:
    print("Normal")

# For
for value in values:
    print(value)

# While
count = 0

while count < 5:
    print(count)
    count += 1
```

Function:

```python
def add(a, b):
    return a + b

result = add(10, 20)

print(result)
```

Class:

```python
class Led:

    def __init__(self, pin):
        self.pin = pin

    def on(self):
        print("LED ON")

    def off(self):
        print("LED OFF")


led = Led(2)

led.on()
```

Import file của mình:

```text
/
├── main.py
└── led.py
```

`led.py`:

```python
def on():
    print("LED ON")

def off():
    print("LED OFF")
```

`main.py`:

```python
import led

led.on()
```

Hoặc:

```python
from led import on, off

on()
```

Rồi khi chuyển sang ESP32 thì chỉ thay phần hardware:

```python
from machine import Pin

led = Pin(2, Pin.OUT)

led.on()
led.off()
```

Một trang nữa rất hữu ích là **MicroPython vs CPython**, vì nó liệt kê cụ thể những chỗ khác nhau ở `functions`, `classes`, `import`, `dict`, `list`, `str`... :chatgpt-content-reference{index="9"}

[MicroPython differences from Python](https://docs.micropython.org/en/latest/genrst/index.html?utm_source=chatgpt.com)

Nếu mục tiêu của bạn chỉ là **học đủ Python để code ESP32**, thì thực ra không cần học hết Python desktop. Chỉ cần khoảng:

```text
variable
↓
if / else
↓
for / while
↓
list / dict
↓
function
↓
import
↓
class cơ bản
↓
try / except
↓
machine.Pin
↓
I2C / SPI / UART
↓
Wi-Fi
```

là đã làm được khá nhiều project ESP32 rồi.


## So sánh php với python

Đúng, nhìn **MicroPython/Python ngắn hơn PHP khá rõ**, chủ yếu vì Python bỏ rất nhiều “ký hiệu cú pháp” như `{}`, `;`, `$`, `->`, `function`.

Ví dụ cùng một việc.

PHP:

```php
<?php

$name = "ESP32";
$count = 10;

if ($count > 5) {
    echo "Hello " . $name;
}
```

MicroPython:

```python
name = "ESP32"
count = 10

if count > 5:
    print("Hello", name)
```

Python ngắn hơn vì:

```text
PHP        Python
$var       var
;          không cần
{}         dùng indent
echo       print()
function   def
->         .
. nối chuỗi  thường dùng + hoặc f-string
```

Function cũng khác khá rõ.

PHP:

```php
function add($a, $b) {
    return $a + $b;
}

$result = add(10, 20);
```

MicroPython:

```python
def add(a, b):
    return a + b

result = add(10, 20)
```

Array/list:

PHP:

```php
$items = [10, 20, 30];

foreach ($items as $item) {
    echo $item;
}
```

MicroPython:

```python
items = [10, 20, 30]

for item in items:
    print(item)
```

Dictionary giống associative array PHP.

PHP:

```php
$config = [
    "wifi" => "Home",
    "port" => 1883
];

echo $config["wifi"];
```

MicroPython:

```python
config = {
    "wifi": "Home",
    "port": 1883
}

print(config["wifi"])
```

Class cũng gọn hơn khá nhiều.

PHP:

```php
class Led
{
    private $pin;

    public function __construct($pin)
    {
        $this->pin = $pin;
    }

    public function on()
    {
        echo "LED ON";
    }
}

$led = new Led(2);
$led->on();
```

MicroPython:

```python
class Led:

    def __init__(self, pin):
        self.pin = pin

    def on(self):
        print("LED ON")


led = Led(2)
led.on()
```

Cái này là một trong những chỗ Python nhìn rất “thoáng”:

```text
PHP
$this->pin
$led->on()

Python
self.pin
led.on()
```

Import cũng ngắn:

PHP:

```php
require_once 'Led.php';

$led = new Led(2);
```

MicroPython:

```python
from led import Led

led = Led(2)
```

Try/catch:

PHP:

```php
try {
    doSomething();
} catch (Exception $e) {
    echo $e->getMessage();
}
```

MicroPython:

```python
try:
    do_something()
except Exception as e:
    print(e)
```

Boolean:

PHP:

```php
if ($enabled === true && $count > 10) {
    echo "OK";
}
```

MicroPython:

```python
if enabled and count > 10:
    print("OK")
```

Loop:

PHP:

```php
$i = 0;

while ($i < 10) {
    echo $i;
    $i++;
}
```

MicroPython:

```python
i = 0

while i < 10:
    print(i)
    i += 1
```

Điều thú vị là Python **không có `++`**:

```python
i += 1
```

chứ không có:

```python
i++
```

String interpolation cũng rất đẹp:

PHP:

```php
$name = "ESP32";
$temp = 26;

echo "Device: {$name}, Temp: {$temp}";
```

Python:

```python
name = "ESP32"
temp = 26

print(f"Device: {name}, Temp: {temp}")
```

Với MicroPython trên ESP32, code hardware nhìn còn gọn hơn:

```python
from machine import Pin
import time

led = Pin(2, Pin.OUT)

while True:
    led.on()
    time.sleep(1)

    led.off()
    time.sleep(1)
```

Nếu viết tư duy kiểu PHP thì có thể tưởng tượng:

```php
$led = new Pin(2, Pin::OUT);

while (true) {
    $led->on();
    sleep(1);

    $led->off();
    sleep(1);
}
```

Python ngắn chủ yếu nhờ triết lý của nó: **ít ký hiệu, code đọc gần giống tiếng Anh, dùng indentation để biểu diễn block**.

Nhưng có một cái giá: indentation là cú pháp thật. Ví dụ cái này sai:

```python
if x > 10:
print("hello")
```

phải là:

```python
if x > 10:
    print("hello")
```

Nếu bạn đã biết PHP rồi thì học MicroPython khá nhanh. Phần cần làm quen nhất chỉ là `indent`, `def`, `self`, list/dict và cách `import`; logic `if`, `while`, class, function thực ra rất giống PHP.


## Kiểu dữ liệu ở python

Được. Python là **dynamic typing**, nên biến không cần khai báo kiểu dữ liệu trước như C/Java.

Ví dụ cùng một biến có thể đổi kiểu:

```python
x = 10
print(type(x))   # int

x = "hello"
print(type(x))   # str

x = [1, 2, 3]
print(type(x))   # list

x = {1, 2, 3}
print(type(x))   # set
```

Tức là Python không “gắn kiểu vào biến”, mà kiểu nằm ở **giá trị/object** mà biến đang trỏ tới.

Ví dụ:

```python
a = 10
```

hiểu là:

```text
a  --->  object int 10
```

sau đó:

```python
a = "ESP32"
```

thì thành:

```text
a  --->  object str "ESP32"
```

Các kiểu cơ bản thường dùng:

```python
x = 10              # int
y = 3.14            # float
name = "ESP32"      # str
enabled = True      # bool

items = [1, 2, 3]   # list
config = {"a": 1}   # dict
values = {1, 2, 3}  # set
point = (10, 20)    # tuple
```

Nếu muốn “ghi rõ kiểu” cho dễ đọc code, Python có **type hint**:

```python
age: int = 30
name: str = "ESP32"
items: list = [1, 2, 3]
```

Hoặc function:

```python
def add(a: int, b: int) -> int:
    return a + b
```

Nhưng chú ý: type hint thường **không ép kiểu ở runtime**.

Ví dụ vẫn có thể viết:

```python
age: int = "hello"
```

Python thường vẫn chạy, chỉ IDE/linter sẽ cảnh báo.

So với PHP hiện đại thì khá giống:

PHP có thể viết:

```php
$age = 30;
$age = "hello";
```

Python cũng vậy:

```python
age = 30
age = "hello"
```

Nếu bạn muốn, tôi có thể làm tiếp bảng **PHP type vs Python type** kiểu `array -> list/dict`, `null -> None`, `bool`, `object`, `set`, `tuple` để nhìn phát hiểu luôn.



## Python list ký hiệu


Có. Với **Python/MicroPython**, nếu bạn muốn nhìn toàn bộ “ký hiệu trong code” thì có thể chia thành mấy nhóm dưới đây. MicroPython dùng gần như cùng syntax với Python 3.

### 1. Gán biến

```python
x = 10
name = "ESP32"
```

`=` là gán giá trị.

```text
=      gán
:=     walrus operator, vừa gán vừa dùng trong biểu thức
```

Ví dụ:

```python
if (x := 10) > 5:
    print(x)
```

### 2. Toán học

```text
+      cộng
-      trừ
*      nhân
/      chia
//     chia lấy phần nguyên
%      chia lấy dư
**     lũy thừa
```

Ví dụ:

```python
a = 10 + 5
b = 10 - 5
c = 10 * 5
d = 10 / 3
e = 10 // 3
f = 10 % 3
g = 2 ** 3
```

Kết quả:

```text
15
5
50
3.333...
3
1
8
```

### 3. Gán kết hợp

```text
+=
-=
*=
/=
//=
%=
**=
```

Ví dụ:

```python
x = 10
x += 5
```

tương đương:

```python
x = x + 5
```

Cũng có:

```text
&=
|=
^=
>>=
<<=
```

cho bitwise.

---

### 4. So sánh

```text
==     bằng
!=     khác
>      lớn hơn
<      nhỏ hơn
>=     lớn hơn hoặc bằng
<=     nhỏ hơn hoặc bằng
```

Ví dụ:

```python
if age >= 18:
    print("OK")
```

Khác PHP/C một điểm quan trọng:

```python
x = 10      # gán
x == 10     # so sánh
```

---

### 5. Logic

Python không dùng:

```text
&&
||
!
```

mà dùng:

```text
and
or
not
```

Ví dụ:

```python
if age > 18 and enabled:
    print("OK")
```

```python
if a or b:
    print("yes")
```

```python
if not enabled:
    print("disabled")
```

---

### 6. Kiểm tra object

```text
is
is not
```

Ví dụ:

```python
value = None

if value is None:
    print("empty")
```

Thường:

```python
x == y
```

so sánh **giá trị**.

Còn:

```python
x is y
```

kiểm tra có phải cùng object hay không.

---

### 7. Kiểm tra phần tử

```text
in
not in
```

Ví dụ:

```python
items = [10, 20, 30]

if 20 in items:
    print("found")
```

String cũng được:

```python
if "ESP" in "ESP32":
    print("yes")
```

---

### 8. Ngoặc tròn `()`

Dùng cho:

Function call:

```python
print("hello")
```

Khai báo function:

```python
def add(a, b):
    return a + b
```

Thay đổi thứ tự toán:

```python
x = (10 + 5) * 2
```

Tuple:

```python
point = (10, 20)
```

---

### 9. Ngoặc vuông `[]`

Dùng cho list:

```python
items = [10, 20, 30]
```

Lấy phần tử:

```python
items[0]
```

Slice:

```python
items[1:3]
```

Dictionary access:

```python
config["wifi"]
```

---

### 10. Ngoặc nhọn `{}`

Dictionary:

```python
config = {
    "wifi": "Home",
    "port": 1883
}
```

Set:

```python
numbers = {1, 2, 3}
```

Chú ý:

```python
{}
```

là **dict rỗng**, không phải set.

Set rỗng phải là:

```python
set()
```

---

### 11. Dấu `:`

Rất quan trọng trong Python.

Sau `if`:

```python
if x > 10:
    print(x)
```

Sau `for`:

```python
for item in items:
    print(item)
```

Sau `while`:

```python
while True:
    print("running")
```

Sau function:

```python
def hello():
    print("hello")
```

Sau class:

```python
class Led:
    pass
```

Trong dictionary:

```python
config = {
    "port": 1883
}
```

Trong slice:

```python
items[1:5]
```

---

### 12. Dấu `,`

Phân cách giá trị:

```python
print("Temp", 25)
```

List:

```python
items = [1, 2, 3]
```

Function arguments:

```python
def add(a, b):
    pass
```

Tuple:

```python
x = 1, 2, 3
```

Thậm chí:

```python
x = 1,
```

là tuple một phần tử.

---

### 13. Dấu `.`

Truy cập property/method/module:

```python
led.on()
```

```python
config.port
```

```python
time.sleep(1)
```

```python
machine.Pin
```

PHP tương đương kiểu:

```php
$led->on();
```

Python:

```python
led.on()
```

---

### 14. String quote

Có thể dùng:

```python
"hello"
```

hoặc:

```python
'hello'
```

Multiline:

```python
"""
hello
world
"""
```

hoặc:

```python
'''
hello
world
'''
```

---

### 15. Escape `\`

Ví dụ:

```python
print("hello\nworld")
```

Các escape phổ biến:

```text
\n     xuống dòng
\t     tab
\r     carriage return
\\     dấu \
\"     dấu "
\'     dấu '
```

Raw string:

```python
path = r"C:\test\abc"
```

---

### 16. Comment `#`

```python
# đây là comment
x = 10
```

Inline:

```python
x = 10  # count
```

Python không có:

```text
// comment
/* comment */
```

như C/JS/PHP.

---

### 17. F-string `{}` trong string

```python
name = "ESP32"
temp = 25

print(f"Device: {name}, Temp: {temp}")
```

Rất hay dùng.

Có thể nhét expression:

```python
print(f"Total: {10 + 20}")
```

---

### 18. Index và slice

```python
text = "ESP32"
```

```python
text[0]
```

→ `E`

```python
text[-1]
```

→ `2`

Slice:

```python
text[0:3]
```

→ `"ESP"`

```python
text[:3]
```

```python
text[2:]
```

```python
text[::2]
```

Syntax tổng quát:

```text
[start : stop : step]
```

---

### 19. Bitwise

Quan trọng khi code ESP32.

```text
&      AND bit
|      OR bit
^      XOR
~      NOT
<<     shift left
>>     shift right
```

Ví dụ:

```python
flags = 0b0010

if flags & 0b0010:
    print("bit enabled")
```

Binary:

```python
x = 0b1010
```

Hex:

```python
x = 0xFF
```

Octal:

```python
x = 0o77
```

---

### 20. `@`

Dùng decorator:

```python
@staticmethod
def test():
    pass
```

Hoặc:

```python
@property
def name(self):
    return self._name
```

Ngoài ra `@` còn là matrix multiplication trong Python desktop, nhưng MicroPython/ESP32 hiếm khi dùng.

---

### 21. `->`

Dùng type hint cho return:

```python
def add(a: int, b: int) -> int:
    return a + b
```

Không phải operator truy cập object như PHP.

PHP:

```php
$user->name
```

Python:

```python
user.name
```

---

### 22. `*` trong function

Ngoài phép nhân:

```python
2 * 3
```

nó còn dùng unpack:

```python
items = [1, 2, 3]

print(*items)
```

Kết quả:

```text
1 2 3
```

Trong function:

```python
def test(*args):
    print(args)
```

---

### 23. `**`

Ngoài lũy thừa:

```python
2 ** 3
```

còn dùng dictionary unpack:

```python
config = {
    "port": 1883,
    "debug": True
}

def start(**kwargs):
    print(kwargs)

start(**config)
```

---

### 24. `_`

Underscore được dùng rất nhiều.

Tên biến:

```python
sensor_value = 10
```

Tên private theo convention:

```python
_internal_value = 20
```

Special method:

```python
__init__()
__str__()
__name__
```

Bỏ qua giá trị:

```python
for _ in range(10):
    print("hello")
```

---

### 25. `;`

Python **có hỗ trợ**, nhưng gần như không nên dùng.

```python
x = 10; y = 20; print(x + y)
```

Thông thường viết:

```python
x = 10
y = 20
print(x + y)
```

---

### 26. Xuống dòng và indentation

Cái này cực kỳ quan trọng.

PHP:

```php
if ($x > 10) {
    echo "hello";
}
```

Python:

```python
if x > 10:
    print("hello")
```

Python dùng **indent** thay cho `{}`.

Thông thường là **4 spaces**:

```python
if x > 10:
    print("level 1")

    if x > 20:
        print("level 2")
```

---

### 27. Keywords của Python

Đây không phải ký hiệu nhưng là các từ đặc biệt của syntax:

```text
False
None
True

and
as
assert
async
await
break
class
continue
def
del
elif
else
except
finally
for
from
global
if
import
in
is
lambda
nonlocal
not
or
pass
raise
return
try
while
with
yield
```

MicroPython có thể khác nhẹ tùy version/port, đặc biệt với một số tính năng mới của CPython.

---

### 28. Những thứ bạn sẽ dùng nhiều nhất khi code ESP32

Thực tế code MicroPython ESP32 thì khoảng **90% thời gian** bạn chỉ dùng mấy cái này:

```text
=           gán

+ - * /     toán

== !=
> < >= <=   so sánh

and or not  logic

()          function
[]          list/index
{}          dict/set
.           method/property
:           block
,           phân cách
#           comment

if
elif
else

for
while

def
return

import
from

try
except
```

Ví dụ gom gần hết syntax phổ biến vào một đoạn:

```python
from machine import Pin
import time

led = Pin(2, Pin.OUT)

count = 0
enabled = True

def toggle_led(delay_ms=500):
    global count

    if enabled and count < 10:
        led.value(not led.value())

        print(f"Count: {count}")

        count += 1

        time.sleep_ms(delay_ms)

while True:
    try:
        toggle_led()

    except Exception as e:
        print("Error:", e)
        break
```

Nếu bạn đã biết PHP thì chỉ cần nhớ mấy chuyển đổi lớn nhất này:

```text
PHP                 Python

$variable           variable

->                   .

function             def

&&                   and
||                   or
!                    not

true                 True
false                False
null                 None

elseif               elif

foreach (...)        for ... in ...

{} block             indentation

;                    không cần

echo                 print()

$array[] = x         list.append(x)
```

Thật ra Python nhìn ít ký hiệu chính vì **nó thay nhiều ký hiệu bằng từ tiếng Anh + indentation**, nên mới có cảm giác code ngắn và “trống” hơn PHP.


## Python có switch case không

Có, nhưng **MicroPython hiện chưa có `switch/case` kiểu C/PHP**, và tính năng `match/case` của Python 3.10 cũng chưa được MicroPython hỗ trợ chính thức; issue theo dõi tính năng này vẫn đang mở. :chatgpt-content-reference{index="0"}

Nên trên ESP32 + MicroPython thường viết kiểu:

```python
status = 2

if status == 1:
    print("Start")
elif status == 2:
    print("Running")
elif status == 3:
    print("Stop")
else:
    print("Unknown")
```

So với PHP:

```php
switch ($status) {
    case 1:
        echo "Start";
        break;

    case 2:
        echo "Running";
        break;

    case 3:
        echo "Stop";
        break;

    default:
        echo "Unknown";
}
```

Trong Python, nếu case nhiều thì cách đẹp hơn là dùng `dict`:

```python
status_text = {
    1: "Start",
    2: "Running",
    3: "Stop"
}

print(status_text.get(status, "Unknown"))
```

Hoặc muốn mỗi case chạy function:

```python
def start():
    print("Start")

def running():
    print("Running")

def stop():
    print("Stop")

actions = {
    1: start,
    2: running,
    3: stop
}

actions.get(status, lambda: print("Unknown"))()
```

Cái này khá giống `switch` nhưng linh hoạt hơn.

Còn **Python desktop từ Python 3.10** có:

```python
match status:
    case 1:
        print("Start")

    case 2:
        print("Running")

    case 3:
        print("Stop")

    case _:
        print("Unknown")
```

Nhưng với **MicroPython ESP32 hiện tại**, cứ ưu tiên:

```python
if / elif / else
```

hoặc `dict` là an toàn nhất.
