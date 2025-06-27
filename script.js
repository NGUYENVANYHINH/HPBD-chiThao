// Quản lý các màn hình
const screens = {
    intro: document.getElementById('intro-screen'),
    gift: document.getElementById('gift-screen'),
    message: document.getElementById('message-screen')
};

let balloonInterval = null;

// Chuyển màn hình
function showScreen(screenId) {
    const duration = 700; // ms, khớp với CSS
    const current = document.querySelector('.screen.active');
    const next = screens[screenId];
    if (current && current !== next) {
        current.classList.remove('active');
        current.classList.add('screen-leave');
        setTimeout(() => {
            current.classList.remove('screen-leave');
        }, duration);
    }
    next.classList.add('active');
    if(screenId === 'message') {
        createBalloons();
        if (balloonInterval) clearInterval(balloonInterval);
        balloonInterval = setInterval(createBalloons, 3000);
        // Thêm tia lửa cho pháo bông
        document.querySelectorAll('.sparkler').forEach(sparkler => {
            if (!sparkler.querySelector('.sparkler-fire')) {
                const fire = document.createElement('div');
                fire.className = 'sparkler-fire';
                for (let i = 0; i < 8; i++) {
                    const span = document.createElement('span');
                    fire.appendChild(span);
                }
                sparkler.appendChild(fire);
            }
        });
    } else {
        if (balloonInterval) {
            clearInterval(balloonInterval);
            balloonInterval = null;
        }
    }
}

// Haptic feedback cho iPhone
function triggerHapticFeedback() {
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }
    
    // iOS haptic feedback
    if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.haptic) {
        window.webkit.messageHandlers.haptic.postMessage('light');
    }
}

// Tạo confetti
function createConfetti() {
    const confettiContainer = document.getElementById('confetti-container');
    const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#1dd1a1', '#ff9ff3'];
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            confetti.style.animationDelay = Math.random() * 2 + 's';
            
            confettiContainer.appendChild(confetti);
            
            // Xóa confetti sau khi animation kết thúc
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }, i * 50);
    }
}

// Hiệu ứng đặc biệt cho text nổi bật
function addHighlightEffects() {
    const highlightText = document.querySelector('.highlight-text');
    const guessText = document.querySelector('.guess-text');
    
    if (highlightText) {
        // Thêm hiệu ứng sparkle khi hover
        highlightText.addEventListener('mouseenter', () => {
            highlightText.style.filter = 'brightness(1.3) drop-shadow(0 0 10px #feca57)';
        });
        
        highlightText.addEventListener('mouseleave', () => {
            highlightText.style.filter = 'none';
        });
        
        // Touch events cho iPhone
        highlightText.addEventListener('touchstart', () => {
            highlightText.style.filter = 'brightness(1.3) drop-shadow(0 0 10px #feca57)';
        });
        
        highlightText.addEventListener('touchend', () => {
            setTimeout(() => {
                highlightText.style.filter = 'none';
            }, 200);
        });
    }
    
    if (guessText) {
        // Hiệu ứng đặc biệt cho text "Sếp đoán xem"
        guessText.addEventListener('click', () => {
            triggerHapticFeedback();
            guessText.style.animation = 'bounce 0.5s ease-in-out';
            setTimeout(() => {
                guessText.style.animation = 'bounce 1.5s ease-in-out infinite';
            }, 500);
        });
        
        guessText.addEventListener('touchstart', () => {
            triggerHapticFeedback();
            guessText.style.animation = 'bounce 0.5s ease-in-out';
            setTimeout(() => {
                guessText.style.animation = 'bounce 1.5s ease-in-out infinite';
            }, 500);
        });
    }
}

// Hiệu ứng đặc biệt cho surprise message
function addSurpriseEffects() {
    const surpriseText = document.querySelector('.surprise-text');
    
    if (surpriseText) {
        // Thêm hiệu ứng sparkle cho text surprise
        surpriseText.addEventListener('mouseenter', () => {
            surpriseText.style.textShadow = '0 0 20px #fff, 0 0 30px #ff6b6b, 0 0 40px #feca57';
        });
        
        surpriseText.addEventListener('mouseleave', () => {
            surpriseText.style.textShadow = '2px 2px 4px rgba(0,0,0,0.5)';
        });
        
        // Touch events
        surpriseText.addEventListener('touchstart', () => {
            surpriseText.style.textShadow = '0 0 20px #fff, 0 0 30px #ff6b6b, 0 0 40px #feca57';
        });
        
        surpriseText.addEventListener('touchend', () => {
            setTimeout(() => {
                surpriseText.style.textShadow = '2px 2px 4px rgba(0,0,0,0.5)';
            }, 200);
        });
        
        // Thêm hiệu ứng typing cho surprise text
        setTimeout(() => {
            const originalText = surpriseText.textContent;
            surpriseText.textContent = '';
            let i = 0;
            
            function typeSurprise() {
                if (i < originalText.length) {
                    surpriseText.textContent += originalText.charAt(i);
                    i++;
                    setTimeout(typeSurprise, 100);
                }
            }
            
            typeSurprise();
        }, 1000);
    }
}

// Xử lý mở quà
function openGift() {
    const giftBox = document.querySelector('.gift-box');
    giftBox.classList.add('opened');
    
    // Phát nhạc khi mở quà (chỉ nếu chưa phát)
    var audio = document.getElementById('birthday-music');
    if (audio && audio.paused) audio.play();
    
    // Haptic feedback
    triggerHapticFeedback();
    
    // Tạo hiệu ứng confetti
    createConfetti();
    
    // Chuyển sang màn hình lời chúc sau 2 giây
    setTimeout(() => {
        showScreen('message');
        // Thêm hiệu ứng surprise sau khi chuyển màn hình
        setTimeout(() => {
            addSurpriseEffects();
        }, 500);
    }, 2000);
}

// Khởi tạo ứng dụng
function initApp() {
    // Chuyển sang màn hình mở quà sau khi con thỏ chạy xong
    setTimeout(() => {
        showScreen('gift');
    }, 4000);
    
    // Thêm hiệu ứng cho text nổi bật
    setTimeout(() => {
        addHighlightEffects();
    }, 2000);
    
    // Thêm event listener cho hộp quà
    const giftBox = document.querySelector('.gift-box');
    
    // Touch events cho iPhone
    giftBox.addEventListener('touchstart', (e) => {
        e.preventDefault();
        giftBox.style.transform = 'scale(0.95)';
    });
    
    giftBox.addEventListener('touchend', (e) => {
        e.preventDefault();
        giftBox.style.transform = 'scale(1)';
        openGift();
    });
    
    // Click events cho desktop
    giftBox.addEventListener('click', openGift);
    
    // Keyboard accessibility
    giftBox.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openGift();
        }
    });
    
    // Thêm hiệu ứng hover cho hộp quà (chỉ trên desktop)
    if (window.matchMedia('(hover: hover)').matches) {
        giftBox.addEventListener('mouseenter', () => {
            giftBox.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        giftBox.addEventListener('mouseleave', () => {
            giftBox.style.transform = 'scale(1) rotate(0deg)';
        });
    }
}

// Thêm hiệu ứng âm thanh (nếu có)
function playSound() {
    // Có thể thêm âm thanh ở đây nếu muốn
    console.log('🎵 Playing birthday music!');
}

// Thêm hiệu ứng sparkle cho tiêu đề
function addSparkleEffect() {
    const title = document.querySelector('.title');
    if (!title) return;
    title.addEventListener('mouseenter', () => {
        title.style.textShadow = '0 0 20px #feca57, 0 0 30px #ff6b6b, 0 0 40px #48dbfb';
    });
    
    title.addEventListener('mouseleave', () => {
        title.style.textShadow = '2px 2px 4px rgba(0,0,0,0.3)';
    });
}

// Thêm hiệu ứng typing cho lời chúc
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Khởi tạo khi trang đã load
document.addEventListener('DOMContentLoaded', () => {
    initApp();
    addSparkleEffect();
    
    // Thêm hiệu ứng typing cho lời chúc khi chuyển màn hình
    const messageContent = document.querySelector('.message-content');
    const originalText = messageContent.innerHTML;
    
    // Lưu trữ text gốc để có thể sử dụng lại
    messageContent.setAttribute('data-original', originalText);
    
    // iPhone 16 Pro Max specific optimizations
    if (window.innerWidth === 430 && window.innerHeight === 932) {
        console.log('iPhone 16 Pro Max detected - applying optimizations');
        
        // Prevent zoom on double tap
        let lastTouchEnd = 0;
        document.addEventListener('touchend', (event) => {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
        
        // Prevent pull-to-refresh
        document.body.addEventListener('touchmove', (e) => {
            if (e.target.closest('.gift-box') || e.target.closest('.hearts')) {
                e.preventDefault();
            }
        }, { passive: false });
    }

    function unlockAudio() {
        var audio = document.getElementById('birthday-music');
        if (audio) audio.play();
        document.removeEventListener('click', unlockAudio);
        document.removeEventListener('touchstart', unlockAudio);
    }
    document.addEventListener('click', unlockAudio);
    document.addEventListener('touchstart', unlockAudio);
});

// Thêm hiệu ứng parallax cho background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('body');
    const speed = scrolled * 0.5;
    parallax.style.transform = `translateY(${speed}px)`;
});

// Thêm hiệu ứng click cho hearts
document.addEventListener('click', (e) => {
    if (e.target.textContent.includes('❤️') || e.target.textContent.includes('💖')) {
        triggerHapticFeedback();
        e.target.style.transform = 'scale(1.5) rotate(360deg)';
        setTimeout(() => {
            e.target.style.transform = 'scale(1) rotate(0deg)';
        }, 500);
    }
});

// Touch events cho hearts
document.addEventListener('touchstart', (e) => {
    if (e.target.textContent.includes('❤️') || e.target.textContent.includes('💖')) {
        e.target.style.transform = 'scale(1.3)';
    }
});

document.addEventListener('touchend', (e) => {
    if (e.target.textContent.includes('❤️') || e.target.textContent.includes('💖')) {
        triggerHapticFeedback();
        e.target.style.transform = 'scale(1.5) rotate(360deg)';
        setTimeout(() => {
            e.target.style.transform = 'scale(1) rotate(0deg)';
        }, 500);
    }
});

// Thêm hiệu ứng hover cho tên bạn
const friendName = document.querySelector('.friend-name');
if (friendName) {
    friendName.addEventListener('mouseenter', () => {
        friendName.style.color = '#ff6b6b';
        friendName.style.transform = 'scale(1.1)';
    });
    
    friendName.addEventListener('mouseleave', () => {
        friendName.style.color = '#feca57';
        friendName.style.transform = 'scale(1)';
    });
    
    // Touch events cho tên bạn
    friendName.addEventListener('touchstart', () => {
        friendName.style.color = '#ff6b6b';
        friendName.style.transform = 'scale(1.1)';
    });
    
    friendName.addEventListener('touchend', () => {
        setTimeout(() => {
            friendName.style.color = '#feca57';
            friendName.style.transform = 'scale(1)';
        }, 200);
    });
}

// Thêm hiệu ứng loading cho progress bar
const progressFill = document.querySelector('.progress-fill');
if (progressFill) {
    progressFill.addEventListener('animationend', () => {
        progressFill.style.animation = 'none';
        progressFill.style.width = '100%';
    });
}

// Thêm hiệu ứng shake cho hộp quà khi hover
const giftBox = document.querySelector('.gift-box');
if (giftBox && window.matchMedia('(hover: hover)').matches) {
    giftBox.addEventListener('mouseenter', () => {
        giftBox.style.animation = 'shake 0.5s ease-in-out';
    });
    
    giftBox.addEventListener('animationend', () => {
        giftBox.style.animation = '';
    });
}

// Thêm CSS cho hiệu ứng shake
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    /* iPhone 16 Pro Max specific touch optimizations */
    @media (hover: none) and (pointer: coarse) {
        .gift-box:active {
            transform: scale(0.95) !important;
        }
        
        .hearts:active {
            transform: scale(1.3) !important;
        }
    }
    
    /* Special effects for highlighted text */
    .highlight-text:hover {
        cursor: pointer;
    }
    
    .guess-text:hover {
        cursor: pointer;
    }
`;
document.head.appendChild(style);

// Prevent context menu on long press
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// Handle orientation change
window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        // Recalculate positions after orientation change
        const giftBox = document.querySelector('.gift-box');
        if (giftBox) {
            giftBox.style.transform = 'scale(1)';
        }
    }, 100);
});

// Tạo bóng bay bay lên
function createBalloons() {
    const balloonColors = ['#ff6b6b', '#48dbfb', '#feca57', '#1dd1a1', '#ff9ff3', '#bfa100'];
    const container = document.createElement('div');
    container.id = 'balloon-container';
    document.body.appendChild(container);
    for (let i = 0; i < 12; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.style.left = (i % 2 === 0 ? Math.random() * 15 : 85 + Math.random() * 10) + 'vw';
        balloon.style.background = balloonColors[Math.floor(Math.random() * balloonColors.length)];
        balloon.style.animationDelay = (Math.random() * 2) + 's';
        balloon.style.animationDuration = (4 + Math.random() * 3) + 's';
        container.appendChild(balloon);
    }
} 