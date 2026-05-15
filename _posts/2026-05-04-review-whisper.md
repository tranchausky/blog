---
title: "Review Whisper All model"
date: 2026-05-04
layout: post
---


# 📊 So sánh model

| Model    | Độ chính xác  | Tốc độ    | Gợi ý dùng             |
| -------- | ------------- | --------- | ---------------------- |
| tiny     | thấp          | cực nhanh | realtime demo          |
| base     | thấp-trung    | rất nhanh | bạn đang dùng          |
| 👉 small | **trung-cao** | nhanh     | ⭐ best choice đa số    |
| medium   | cao           | chậm hơn  | audio khó / tiếng Việt |
| large    | rất cao       | rất chậm  | production             |


# So sánh openai-whisper (gốc) với faster-whisper

| Tiêu chí | openai-whisper | faster-whisper        |
| -------- | -------------- | --------------------- |
| Tốc độ   | ❌ chậm         | ✅ nhanh hơn 2–4x      |
| RAM      | ❌ cao          | ✅ thấp hơn            |
| GPU      | dùng tốt       | dùng tốt + tối ưu hơn |
| CPU      | chậm           | nhanh hơn rõ          |
| Realtime | ❌ khó          | ⚠️ gần realtime       |
| Cài đặt  | dễ             | hơi kỹ hơn chút       |




openai-whisper


```
!pip install -q openai-whisper
!apt update && apt install -y ffmpeg
```

```
from google.colab import files
uploaded = files.upload()
```

```
import whisper
import time

# Load model
t0 = time.perf_counter()
model = whisper.load_model("small")
t1 = time.perf_counter()

# Transcribe
result = model.transcribe("hn_female_ngochuyen_full_48k-fhg.mp3", language="vi")
t2 = time.perf_counter()

print(result["text"])

print(f"\n⏱️ Load model: {t1 - t0:.2f} giây")
print(f"⏱️ Transcribe: {t2 - t1:.2f} giây")
print(f"⏱️ Tổng: {t2 - t0:.2f} giây")
```



 
https://vbee.vn/ file <a href="../mp3/hn_female_ngochuyen_full_48k-fhg.mp3">hn_female_ngochuyen_full_48k-fhg.mp3</a>
Nội dung gốc
```
Capybara, còn được gọi là chuột lang nước, được mệnh danh là "bộ trưởng bộ ngoại giao" trong thế giới động vật vì tính cách hiền lành, thân thiện và khả năng hòa đồng. Chúng thường sống hòa bình với các loài động vật khác, kể cả những loài săn mồi, và được yêu thích bởi sự gần gũi, thân thiện với con người.
```


tiny
```
Các vì bà ra, con được gọi là chua lăng nước, được mạnh dành là bụ trường bộ ngoại giao trong thế giới động vật tìm các hiện lành, thân thiện và khả năng hoạt động. Chúng thường sống phà bình với các loại động vật khác, kể cả những loại sân mùi và được yêu thiết bởi sự gần vũi, thân thiện với con người.

⏱️ Load model: 1.26 giây
⏱️ Transcribe: 3.43 giây
⏱️ Tổng: 4.69 giây
```

base
```
Capi bara, con được gọi là chuột lang nước, được mệnh dành là bộ trưởng bộ hãi dau trong thế giới động vật kỳ tính cách hiền lạnh, thân thiện và khả năng hòa động. Chúng thường sống hòa bình với các loài động vật khác, kể cả những loài săn mùi và được ưu thích bởi sự gần vui, thân thiện với con người.

⏱️ Load model: 1.41 giây
⏱️ Transcribe: 6.56 giây
⏱️ Tổng: 7.97 giây
```

small
```
Capybara, còn được gọi là chuột lang nước, được mệnh danh là bộ trưởng bộ ngoại giao trong thế giới động vật phí tính cách hiền lạnh, thân thiện và khả năng hòa đồng. Chúng thường sống hòa bình với các loài động vật khác kể cả những loài xan mồi và được yêu thích bởi sự gần vui, thân thiện với con người.

⏱️ Load model: 5.27 giây
⏱️ Transcribe: 16.60 giây
⏱️ Tổng: 21.87 giây
```

medium
```
Capybara còn được gọi là chuột lang nước, được mệnh danh là bộ trưởng Bộ Ngoại giao trong thế giới động vật vì tính cách hiền lành, thân thiện và khả năng hòa đồng. Chúng thường sống hòa bình với các loài động vật khác kể cả những loài săn mồi và được yêu thích bởi sự gần gũi, thân thiện với con người.

⏱️ Load model: 34.05 giây
⏱️ Transcribe: 53.82 giây
⏱️ Tổng: 87.88 giây
```

large
```
 Capybara còn được gọi là chuột lang nước, được mệnh danh là bộ trưởng bộ ngoại giao trong thế giới động vật vì tính cách hiền lành, thân thiện và khả năng hòa đồng. Chúng thường sống hòa bình với các loài động vật khác, kể cả những loài săn mồi, và được yêu thích bởi sự gần gũi, thân thiện với con người.

⏱️ Load model: 45.36 giây
⏱️ Transcribe: 102.25 giây
⏱️ Tổng: 147.61 giây
```




## faster_whisper

```
!pip install -q faster-whisper
!apt update && apt install -y ffmpeg
```

```
from google.colab import files
uploaded = files.upload()
```

```
from faster_whisper import WhisperModel
import time

# ⏱️ đo thời gian load model
t0 = time.perf_counter()
model = WhisperModel("large", compute_type="int8")
t1 = time.perf_counter()

# ⏱️ đo thời gian transcribe
segments, info = model.transcribe(
    "hn_female_ngochuyen_full_48k-fhg.mp3",
    language="vi"
)

# ⚠️ cần loop qua segments để thực sự chạy hết (lazy generator)
results = []
for segment in segments:
    results.append(segment)
    print(f"[{segment.start:.2f}s -> {segment.end:.2f}s] {segment.text}")

t2 = time.perf_counter()

# ⏱️ in thời gian
print(f"\n⏱️ Load model: {t1 - t0:.2f} giây")
print(f"⏱️ Transcribe: {t2 - t1:.2f} giây")
print(f"⏱️ Tổng: {t2 - t0:.2f} giây")
```


tiny
```
[0.00s -> 8.30s]  Các pi bà ra, con được gọi là chuột lăng nước, được mẹng dành là bụ trường bộ ngoại giao trong thế giới động vật tỉ tính các thiền lành thân thiện và khả năng hòa động.
[8.30s -> 15.90s]  Chúng thường xống phà bình với các loại động vật khác, kể cả những loại xanh mùi và được yêu thiết bởi sự gần vũi, thân thiện với con người.

⏱️ Load model: 1.52 giây
⏱️ Transcribe: 3.49 giây
⏱️ Tổng: 5.01 giây
```

base
```
[0.00s -> 8.20s]  Capibara, con được gọi là chuột lang nước, được miệng dành là bộ trưởng bộ hãi rau trong thế giới động vật kỳ tính cách hiền lạnh, thân thiện và khả năng hòa động.
[8.20s -> 15.80s]  Chúng thường sống hòa bình với các loài động vật khác, kể cả những loài xanh mùi và được yêu thích bởi sự gần vui, thân thiện với con người.

⏱️ Load model: 3.91 giây
⏱️ Transcribe: 6.29 giây
⏱️ Tổng: 10.20 giây
```

small
```
[0.00s -> 8.20s]  Capybara, còn được gọi là chuột lang nước, được mệnh danh là bộ trưởng bộ ngoại giao trong thế giới động vật phí tính các hiền lạnh, thân thiện và khả năng hòa đồng.
[8.20s -> 15.80s]  Chúng thường sống hòa bình với các loài động vật khác, kể cả những loài xan mồi và được yêu thích bởi sự gần vui, thân thiện với con người.

⏱️ Load model: 1.73 giây
⏱️ Transcribe: 18.05 giây
⏱️ Tổng: 19.78 giây
```

medium
```
[0.00s -> 8.16s]  Capybara còn được gọi là chuột lang nước, được mệnh danh là Bộ trưởng Bộ Ngoại giao trong thế giới động vật vì tính cách hiền lành, thân thiện và khả năng hòa đồng.
[8.16s -> 15.82s]  Chúng thường sống hòa bình với các loài động vật khác kể cả những loài săn mồi và được yêu thích bởi sự gần gũi, thân thiện với con người.

⏱️ Load model: 26.35 giây
⏱️ Transcribe: 60.70 giây
⏱️ Tổng: 87.05 giây
```

large
```
[0.00s -> 7.96s]  Capybara còn được gọi là chuột lang nước, được mệnh danh là bộ trưởng bộ ngoại giao trong thế giới động vật vì tính cách hiền lành, thân thiện và khả năng hòa đồng.
[8.62s -> 15.42s]  Chúng thường sống hòa bình với các loài động vật khác, kể cả những loài săn mồi, và được yêu thích bởi sự gần gũi, thân thiện với con người.

⏱️ Load model: 52.17 giây
⏱️ Transcribe: 94.73 giây
⏱️ Tổng: 146.90 giây
```





