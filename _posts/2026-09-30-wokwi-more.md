---
title: "Wokwi có gì thêm"
date: 2026-09-30
layout: post
---

Wokwi có gì thêm

### Wokwi Megasearch
[Wokwi Megasearch (Alpha)](https://wokwi.com/experimental/megasearch)

Trang này ghi rõ là:

> “Search across all public Wokwi projects”

Nó cho phép tìm theo **Project Name** và filter. Đặc biệt, để trống Project Name thì nó sẽ hiển thị tất cả project khớp filter. :chatgpt-content-reference{index="1"}

Ví dụ filter hỗ trợ:

```text
part:wokwi-pi-pico
language:python
part:wokwi-7segment
```

Có thể kết hợp bằng dấu phẩy, ví dụ:

```text
part:wokwi-esp32-devkit-v1, language:python
```

Nghĩa là về mặt crawl thì **Megasearch ngon hơn sitemap rất nhiều**.

Ngoài ra còn có 2 nguồn public đáng chú ý:

- `https://wokwi.com/makers` → danh sách maker/user public. :chatgpt-content-reference{index="2"}
- `https://wokwi.com/makers/{username}` → danh sách project public của user đó. Ví dụ `urish`: :chatgpt-content-reference{index="3"}

Project thì URL chuẩn dạng:

```text
https://wokwi.com/projects/328451800839488084
```


- **Viewer (experimental)**: có form nhận trực tiếp `Diagram URL` và `Firmware URL` rồi load thành simulation. Nghĩa là Wokwi có cơ chế dựng simulator từ tài nguyên ngoài, không nhất thiết phải là một project đã lưu trên Wokwi. :chatgpt-content-reference{index="1"}  
  [Wokwi Experimental Viewer](https://wokwi.com/experimental/viewer)
  Ví dụ https://wokwi.com/experimental/viewer?diagram=https://gist.githubusercontent.com/urish/c3d58ddaa0817465605ecad5dc171396/raw/ab1abfa902835a9503d412d55a97ee2b7e0a6b96/diagram.json&firmware=https://github.com/georgik/esp32-graphical-bootloader/releases/latest/download/graphical-bootloader-esp32-s3-box.uf2

- **Projects dashboard**: project đã save của account/browser nằm ở `/dashboard/projects`. :chatgpt-content-reference{index="3"}  
  [My Projects](https://wokwi.com/dashboard/projects)

- **CI dashboard / API token**: `/dashboard/ci` dùng để tạo token cho Wokwi CLI. Token CLI có prefix `wok_`; CLI có thể chạy simulator từ terminal/CI. :chatgpt-content-reference{index="5"}  
  [Wokwi CI Dashboard](https://wokwi.com/dashboard/ci)

- **CLI khá mạnh**: ngoài chạy simulation, nó có `--expect-text`, `--fail-text`, automation scenario, screenshot một part, xuất Logic Analyzer ra VCD và mở GDB server. :chatgpt-content-reference{index="7"}

- **MCP Server cho AI**: cái này khá thú vị. `wokwi-cli mcp` biến Wokwi thành MCP server để ChatGPT/Cursor/Claude/Gemini… có thể chạy simulation, test firmware, đọc serial và tương tác virtual hardware. Hiện vẫn experimental. :chatgpt-content-reference{index="8"}

- **Automation scenarios**: file YAML có thể mô phỏng thao tác người dùng, ví dụ bấm button, đổi sensor rồi đợi output Serial. :chatgpt-content-reference{index="9"}

Ví dụ ý tưởng:

```yaml
steps:
  - set-control:
      part-id: btn1
      control: pressed
      value: 1

  - delay: 500ms

  - wait-serial: "Button 1 pressed"
```

Nên về lý thuyết bạn có thể lấy một project public → chạy tự động → kiểm tra output, không chỉ crawl source.

Một chỗ nữa mình thấy rất đáng chú ý là **Custom Chips API**. Wokwi cho viết linh kiện mô phỏng riêng bằng C rồi compile sang WebAssembly; ngoài C còn có các thử nghiệm Rust, AssemblyScript, Zig và thậm chí Verilog thông qua Yosys/CXXRTL. :chatgpt-content-reference{index="10"}

Có endpoint public thật trong docs:

```text
https://wokwi.com/api/chips/wokwi-api.h
```

Đây là header C của Chips API được CLI sử dụng khi compile custom chip. :chatgpt-content-reference{index="11"}

Ngoài ra còn có **Wokwi Elements**:

[Wokwi Elements catalog](https://elements.wokwi.com/)

Đây là Storybook chứa Web Components dùng để render Arduino, LED, display, sensor, button... Wokwi Elements còn open-source và có thể cài bằng NPM. :chatgpt-content-reference{index="13"}

Điểm này rất hữu ích nếu bạn đang muốn **lấy danh mục toàn bộ component/part** thay vì crawl từng project.

Repo chính chủ Wokwi cũng khá lớn:

[Wokwi trên GitHub](https://github.com/wokwi)

Hiện GitHub organization của họ có hơn 100 repo public; đáng chú ý có:

```text
wokwi/wokwi-cli
wokwi/wokwi-elements
wokwi/wokwi-docs
wokwi/wokwi-boards
wokwi/wokwi-library-index
wokwi/wokwi-part-tests

wokwi/avr8js
wokwi/rp2040js
```

`avr8js` chính là simulator AVR chạy bằng JavaScript, còn `rp2040js` là emulator Raspberry Pi Pico/RP2040. :chatgpt-content-reference{index="15"}

Có một repo đặc biệt nữa:

[Wokwi Embed Example](https://github.com/wokwi/wokwi-embed-example)

Nó là prototype chính chủ cho việc **embed Wokwi vào website khác** bằng iframe/message transport. README nói chưa chính thức support, nhưng source code public. :chatgpt-content-reference{index="17"}

### Project thực chất chứa những gì?

Một Wokwi project thường có dạng:

```text
project
├── sketch.ino / main.py / main.c
├── diagram.json
├── libraries.txt
├── custom files...
└── custom chip files...
```

`diagram.json` là phần đặc biệt quan trọng vì nó chứa:

```json
{
  "parts": [],
  "connections": []
}
```

tức là có thể parse được:

```text
MCU
 ↓
sensor nào
 ↓
pin nào nối pin nào
 ↓
tọa độ linh kiện
 ↓
attributes/config
```

Wokwi công khai format này trong docs. :chatgpt-content-reference{index="18"}

Và project có chức năng chính thức **Download Project ZIP**, trong đó có source code + `diagram.json`. :chatgpt-content-reference{index="19"}

### Cái mình thấy tiềm năng nhất nếu mục tiêu của bạn là crawl

Có thể xây discovery theo kiểu:

```text
Megasearch
   │
   ├── Project ID
   ├── Project title
   └── Maker
         │
         ▼
https://wokwi.com/projects/{id}
         │
         ├── source code
         ├── diagram.json
         ├── libraries.txt
         ├── board
         ├── parts
         └── connections
```

Sau đó còn enrich được bằng:

```text
Wokwi Elements
      ↓
metadata linh kiện

Wokwi Boards
      ↓
metadata board

Wokwi Library Index
      ↓
Arduino libraries

Wokwi CLI
      ↓
thực sự chạy project

Automation
      ↓
test project tự động
```

Nói cách khác, **Wokwi có nhiều dữ liệu public hơn sitemap thể hiện rất nhiều**.

Thứ mình **chưa tìm thấy trong tài liệu chính thức** là API kiểu:

```text
GET /api/projects
GET /api/projects/{id}
GET /api/search
```

để liệt kê tất cả project theo JSON.




Đúng rồi, trang `experimental/viewer` này thực chất chỉ cần **2 file**:

1. **Diagram URL** → file `diagram.json`
2. **Firmware URL** → file firmware đã compile sẵn, ví dụ `.uf2`, `.bin`, `.hex`, `.elf`

Chính tác giả Wokwi có đưa ví dụ chạy Viewer như sau: :chatgpt-content-reference{index="0"}

```text
https://wokwi.com/experimental/viewer
?diagram=https://.../diagram.json
&firmware=https://.../firmware.uf2
```

### 1. Diagram URL

Nội dung là JSON mô tả **board + linh kiện + dây nối**. Wokwi document format chính thức như sau: :chatgpt-content-reference{index="1"}

Ví dụ tối giản:

```json
{
  "version": 1,
  "author": "Dev",
  "editor": "wokwi",
  "parts": [
    {
      "type": "wokwi-pi-pico",
      "id": "pico",
      "top": 0,
      "left": 0,
      "attrs": {}
    },
    {
      "type": "wokwi-led",
      "id": "led1",
      "top": 20,
      "left": 300,
      "attrs": {
        "color": "red"
      }
    }
  ],
  "connections": [
    [
      "pico:GP15",
      "led1:A",
      "green",
      []
    ],
    [
      "led1:C",
      "pico:GND.1",
      "black",
      []
    ]
  ]
}
```

Tức là file này **không chứa code chương trình**.

Nó chỉ mô tả kiểu:

```text
Raspberry Pi Pico
      |
      GP15
      |
     LED
      |
     GND
```

Ngoài `parts` và `connections`, `diagram.json` còn có thể chứa cấu hình Serial Monitor và một số thuộc tính giao diện khác. :chatgpt-content-reference{index="2"}

---

### 2. Firmware URL

Đây mới là **chương trình đã được compile**.

Ví dụ nếu code ban đầu là:

```cpp
void setup() {
  pinMode(15, OUTPUT);
}

void loop() {
  digitalWrite(15, HIGH);
  delay(500);

  digitalWrite(15, LOW);
  delay(500);
}
```

Viewer **không nhận trực tiếp file `.ino` này**.

Bạn phải compile nó thành ví dụ:

```text
firmware.uf2
```

hoặc tùy board:

| Board | Firmware |
|---|---|
| Arduino Uno / Mega | `.hex`, `.elf` |
| Raspberry Pi Pico | `.uf2`, `.hex`, `.elf` |
| ESP32 | `.bin`, `.uf2`, `.elf` |
| STM32 | `.hex`, `.bin`, `.elf` |

Đây cũng là các loại firmware Wokwi hỗ trợ trong VS Code simulator. :chatgpt-content-reference{index="3"}

---

### Ví dụ thực tế của chính Wokwi

Tác giả Wokwi từng đưa URL kiểu này:

```text
https://wokwi.com/experimental/viewer
?diagram=https://gist.githubusercontent.com/.../diagram.json
&firmware=https://github.com/.../graphical-bootloader-esp32-s3-box.uf2
```

Trong đó:

```text
diagram=
↓
GitHub Gist raw
↓
diagram.json
```

và

```text
firmware=
↓
GitHub Release
↓
graphical-bootloader-esp32-s3-box.uf2
``` :chatgpt-content-reference{index="4"}


Điểm rất hay là **2 file không cần nằm trên Wokwi**. Chúng có thể nằm ở:

```text
GitHub
GitHub Releases
GitHub Gist
raw.githubusercontent.com
server riêng của bạn
CDN
S3
...
```

miễn là URL trả trực tiếp nội dung file.

---

### Có nghĩa là ta có thể tự host project Wokwi

Ví dụ server của bạn có:

```text
https://example.com/wokwi/test1/diagram.json
https://example.com/wokwi/test1/firmware.uf2
```

thì URL Viewer có thể là:

```text
https://wokwi.com/experimental/viewer?diagram=https://example.com/wokwi/test1/diagram.json&firmware=https://example.com/wokwi/test1/firmware.uf2
```

```
https://wokwi.com/experimental/viewer?diagram=https://gist.githubusercontent.com/urish/c3d58ddaa0817465605ecad5dc171396/raw/ab1abfa902835a9503d412d55a97ee2b7e0a6b96/diagram.json&firmware=https://github.com/georgik/esp32-graphical-bootloader/releases/latest/download/graphical-bootloader-esp32-s3-box.uf2
```

```
https://github.com/georgik/esp32-graphical-bootloader
```

Về concept:

```text
Your Server
│
├── diagram.json
│      ↓
│   circuit
│
└── firmware.uf2
       ↓
    program
       │
       ▼
 Wokwi Viewer
       │
       ▼
   Simulation
```

Đây là thứ mình thấy **hay hơn project URL bình thường khá nhiều**, vì bạn không cần tạo:

```text
wokwi.com/projects/xxxxxxxx
```

mà có thể tự quản lý hàng nghìn simulation ở server/GitHub của mình rồi dùng một Viewer chung.

Một điểm đáng đào tiếp là xem **Viewer có hỗ trợ thêm query parameter khác ngoài `diagram` và `firmware` không**, chẳng hạn `elf`, board config, serial, custom chip, hoặc auto-start. Nếu có thì Viewer có thể dùng gần như một **Wokwi embed API không chính thức**.
