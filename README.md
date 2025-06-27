# 🎉 Ứng Dụng Chúc Mừng Sinh Nhật

Một ứng dụng web tương tác để tạo bất ngờ sinh nhật đặc biệt cho bạn bè!

## ✨ Tính Năng

- 🐰 **Con thỏ chạy nhảy**: Hiệu ứng con thỏ dễ thương chạy qua màn hình
- 🎁 **Mở quà tương tác**: Click vào hộp quà để mở với hiệu ứng confetti
- 🎊 **Hiệu ứng confetti**: Confetti rơi đầy màu sắc khi mở quà
- 💝 **Lời chúc đẹp mắt**: Typography gradient và animation
- 📱 **Responsive**: Hoạt động tốt trên mọi thiết bị

## 🚀 Cách Sử Dụng

1. **Mở file `index.html`** trong trình duyệt web
2. **Xem con thỏ chạy** trong 4 giây đầu
3. **Click vào hộp quà** để mở
4. **Thưởng thức** lời chúc sinh nhật!

## 🎨 Tùy Chỉnh

### Thay đổi tên bạn
Mở file `index.html` và tìm dòng:
```html
<div class="friend-name">[Tên Bạn Của Bạn]</div>
```
Thay `[Tên Bạn Của Bạn]` bằng tên thực của bạn.

### Thay đổi lời chúc
Tìm phần `message-content` trong `index.html`:
```html
<div class="message-content">
    <p>Chúc bạn một ngày sinh nhật thật vui vẻ và hạnh phúc!</p>
    <p>Mong rằng năm mới sẽ mang đến cho bạn nhiều niềm vui, sức khỏe và thành công!</p>
    <p>🎁 Chúc bạn luôn xinh đẹp và rạng rỡ như hôm nay! 🎁</p>
</div>
```

### Thay đổi con vật
Trong `index.html`, tìm:
```html
<div class="animal-body">🐰</div>
```
Thay `🐰` bằng emoji khác như:
- `🐶` (chó)
- `🐱` (mèo)
- `🐻` (gấu)
- `🦊` (cáo)
- `🐸` (ếch)

### Thay đổi màu sắc
Mở file `style.css` và tìm các biến màu:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```
Thay đổi mã màu để tạo theme mới.

## 📁 Cấu Trúc File

```
birthday-surprise/
├── index.html      # File HTML chính
├── style.css       # CSS và animations
├── script.js       # JavaScript logic
└── README.md       # Hướng dẫn này
```

## 🎵 Thêm Âm Thanh (Tùy Chọn)

Để thêm âm thanh, thêm vào `index.html`:
```html
<audio id="birthday-music" loop>
    <source src="birthday-song.mp3" type="audio/mpeg">
</audio>
```

Và trong `script.js`, thêm:
```javascript
document.getElementById('birthday-music').play();
```

## 🌟 Hiệu Ứng Đặc Biệt

- **Hover effects**: Di chuột qua các phần tử để xem hiệu ứng
- **Click effects**: Click vào trái tim để xem animation
- **Progress bar**: Thanh tiến trình khi con thỏ chạy
- **Confetti**: 100 mảnh confetti với màu sắc ngẫu nhiên

## 📱 Responsive Design

Ứng dụng tự động điều chỉnh cho:
- 📱 Điện thoại di động
- 📱 Tablet
- 💻 Desktop

## 🎯 Tips Sử Dụng

1. **Chia sẻ**: Chụp màn hình để chia sẻ lời chúc
2. **Tùy chỉnh**: Thay đổi màu sắc theo sở thích
3. **Âm nhạc**: Thêm file nhạc để tăng thêm không khí
4. **Ảnh**: Có thể thêm ảnh kỷ niệm vào lời chúc

## 🎊 Chúc Bạn Tạo Ra Một Bất Ngờ Tuyệt Vời!

---

*Được tạo với ❤️ để mang lại niềm vui cho những người thân yêu* 