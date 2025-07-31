---
title: "Giới thiệu MailHog"
date: 2025-07-31
layout: post
---


# Giới thiệu về MailHog

**MailHog** là một **SMTP server giả lập (fake SMTP server)**, thường được sử dụng trong môi trường phát triển để **bắt và xem email** mà ứng dụng gửi đi, **mà không thực sự gửi email ra thế giới thực**. Đây là công cụ cực kỳ hữu ích giúp lập trình viên kiểm tra các tính năng gửi email mà không lo gửi nhầm đến người dùng thật.

---

## 🔧 Tính năng chính của MailHog

- ✅ **Giả lập SMTP server:** Nhận email gửi đến như một máy chủ thật.
- 📬 **Giao diện web:** Có giao diện web trực quan để xem nội dung email (HTML, plain text, headers...).
- 🔁 **API RESTful:** Cung cấp API để truy xuất, xoá hoặc kiểm tra email tự động.
- 📦 **Dễ tích hợp:** Dùng được với hầu hết các ngôn ngữ như PHP, Node.js, Python, Ruby...
- 🔐 **Không gửi mail ra ngoài:** Không lo gửi nhầm email đến khách hàng thật trong quá trình phát triển.

---

## 🧪 Khi nào nên dùng MailHog?

- Phát triển chức năng đăng ký, quên mật khẩu, xác minh email...
- Kiểm tra định dạng nội dung email (HTML/CSS).
- Test khối lượng lớn email mà không lo spam.
- Môi trường staging hoặc dev.

---

## ⚙️ Cách sử dụng (ví dụ trên Linux hoặc WSL)

### 1. Cài đặt (cách nhanh nhất)

```bash
go install github.com/mailhog/MailHog@latest
```

Nếu bạn không dùng `Go`, bạn có thể dùng Docker:

```bash
docker run -d -p 1025:1025 -p 8025:8025 mailhog/mailhog
```

### 2. Cấu hình ứng dụng gửi email

- SMTP server: `localhost`
- SMTP port: `1025`

Ví dụ cấu hình trong Laravel:

```env
MAIL_MAILER=smtp
MAIL_HOST=localhost
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
```

<img width="2444" height="1444" alt="image" src="https://github.com/user-attachments/assets/110c22ea-76c4-4069-b575-a5f3525056c3" />

### 3. Truy cập giao diện web

Mở trình duyệt và vào: [http://localhost:8025](http://localhost:8025)

---

## 📚 So sánh với một số công cụ khác

| Công cụ       | Tính năng chính               | Giao diện Web | Gửi email thật |
|--------------|-------------------------------|----------------|----------------|
| MailHog      | SMTP giả lập                  | Có             | ❌ Không       |
| Mailtrap     | SMTP thật (có tính phí)       | Có             | ❌/✅ (tùy chọn gửi) |
| Papercut SMTP| Tương tự MailHog (Windows)    | Có             | ❌ Không       |
| FakeSMTP     | Java-based, đơn giản          | Có             | ❌ Không       |

---

> Nếu bạn cần mình hướng dẫn chi tiết cách cấu hình với PHP, Node.js, Laravel hay framework khác, cứ nói nhé.

More link document
- https://kinsta.com/blog/mailhog/
- https://github.com/mailhog/MailHog
- https://viblo.asia/p/send-mail-trong-laravel-su-dung-mailhog-Eb85orBkl2G
