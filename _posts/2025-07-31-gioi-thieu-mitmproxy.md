---
title: "Mitmproxy giới thiệu"
date: 2025-07-31
layout: post
---

# Giới thiệu về mitmproxy

**mitmproxy** là một **proxy trung gian (man-in-the-middle proxy)** mã nguồn mở mạnh mẽ, được sử dụng để **kiểm tra, ghi lại, sửa đổi và gỡ lỗi lưu lượng HTTP(s)** giữa client và server. Nó rất hữu ích trong việc phát triển web, kiểm thử bảo mật, phân tích ứng dụng di động, và giám sát lưu lượng mạng.

---

## 🧩 Mitmproxy là gì?

**mitmproxy** là một **interactive HTTPS proxy**, cho phép bạn "đứng giữa" client (trình duyệt, ứng dụng) và server, từ đó xem hoặc can thiệp vào dữ liệu truyền qua lại.

- **MITM**: viết tắt của _Man-In-The-Middle_.
- **Proxy**: công cụ trung gian giữa client và server.

---

## 🎯 Tính năng nổi bật

| Tính năng              | Mô tả                                                                 |
|------------------------|----------------------------------------------------------------------|
| 📡 Ghi lại traffic       | Ghi lại tất cả các yêu cầu và phản hồi HTTP/HTTPS.                    |
| 🔍 Phân tích           | Xem nội dung HTTP headers, body, cookies, v.v.                         |
| ✍️ Sửa đổi (Modify)     | Chặn, thay đổi request hoặc response khi đang chạy.                   |
| 🐍 Hỗ trợ script Python | Tùy chỉnh hành vi proxy với script Python (`mitmproxy addon`).        |
| 🔐 Bypass SSL           | Tạo và cài đặt CA certificate để giải mã HTTPS.                        |
| 📜 Giao diện dòng lệnh   | Có các công cụ CLI như `mitmproxy`, `mitmdump`, và `mitmweb`.        |

---

## ⚙️ Các công cụ chính

| Công cụ     | Mô tả                                                                 |
|-------------|----------------------------------------------------------------------|
| `mitmproxy` | Giao diện tương tác trong terminal (TUI).                            |
| `mitmdump`  | Phiên bản không có giao diện, cho scripting và automation.           |
| `mitmweb`   | Giao diện web để xem và chỉnh sửa lưu lượng dễ dàng hơn.             |

---

## 🧪 Ứng dụng thực tế

- Phân tích app mobile để xem API đang gọi.
- Kiểm tra bảo mật giao tiếp HTTP/HTTPS.
- Debug request và response khi lập trình frontend/backend.
- Fake dữ liệu trả về từ server để test chức năng.

---

## 🚀 Cài đặt nhanh

```bash
pip install mitmproxy
```


## Lưu ý về HTTPS
Để bắt HTTPS:

 - Bạn cần cài mitmproxy CA certificate vào thiết bị hoặc trình duyệt.
 - Đặc biệt trên thiết bị di động (Android/iOS), phải cài cert thủ công và cho phép tin cậy cert đó.

##  Trang chủ & tài liệu
 - Trang chủ: https://mitmproxy.org
 - Tài liệu: https://docs.mitmproxy.org

