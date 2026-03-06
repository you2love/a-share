// ===== 导航栏激活状态 =====
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// ===== 平滑滚动 =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== 卡片悬停效果增强 =====
const cards = document.querySelectorAll('.card, .lesson-card, .method-card, .trap-card, .wisdom-card');

cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// ===== 滚动动画 =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 为所有卡片添加初始样式并观察
cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

// ===== 陷阱卡片特殊效果 =====
const trapCards = document.querySelectorAll('.trap-card');
trapCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const essence = this.querySelector('.trap-essence');
        if (essence) {
            essence.style.transition = 'all 0.3s ease';
            essence.style.transform = 'scale(1.02)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const essence = this.querySelector('.trap-essence');
        if (essence) {
            essence.style.transform = 'scale(1)';
        }
    });
});

// ===== 交易计划模板交互 =====
const planTemplate = document.querySelector('.plan-template');
if (planTemplate) {
    const planItems = planTemplate.querySelectorAll('.plan-item');
    planItems.forEach(item => {
        item.addEventListener('click', function() {
            const span = this.querySelector('span');
            if (span) {
                const currentValue = span.textContent;
                const newValue = prompt('请输入 ' + this.querySelector('label').textContent.trim(), currentValue);
                if (newValue !== null) {
                    span.textContent = newValue || '_______';
                }
            }
        });
        
        if (!item.querySelector('span')) {
            const span = document.createElement('span');
            span.textContent = '_______';
            span.style.cursor = 'pointer';
            span.style.color = '#666';
            item.appendChild(span);
        }
    });
}

// ===== 清单勾选效果 =====
const checkItems = document.querySelectorAll('.check-item');
checkItems.forEach(item => {
    item.addEventListener('click', function() {
        this.classList.toggle('checked');
        if (this.classList.contains('checked')) {
            this.style.textDecoration = 'line-through';
            this.style.opacity = '0.6';
        } else {
            this.style.textDecoration = 'none';
            this.style.opacity = '1';
        }
    });
});

// ===== 智慧语录随机排序（可选）=====
function shuffleWisdom() {
    const wisdomGrid = document.querySelector('.wisdom-grid');
    if (wisdomGrid) {
        const cards = Array.from(wisdomGrid.querySelectorAll('.wisdom-card'));
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
            wisdomGrid.appendChild(cards[i]);
        }
    }
}

// ===== 页面加载完成提示 =====
window.addEventListener('load', function() {
    console.log('%c⚠️ 风险提示', 'font-size: 20px; color: red; font-weight: bold;');
    console.log('%c股市有风险，入市需谨慎。本站内容仅供参考，不构成投资建议。', 'font-size: 14px;');
    console.log('%c🀄 欢迎来到 A 股真相 - 用教训换真知', 'font-size: 16px; color: #c41e3a;');
});

// ===== 添加回到顶部按钮 =====
function createBackToTop() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '↑ 顶部';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        padding: 10px 20px;
        background: #c41e3a;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        display: none;
        z-index: 999;
        transition: all 0.3s ease;
    `;
    
    backToTop.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 5px 20px rgba(0,0,0,0.3)';
    });
    
    backToTop.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    document.body.appendChild(backToTop);
    
    // 滚动时显示/隐藏
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }
    });
}

createBackToTop();

// ===== 陷阱本质高亮效果 =====
const trapEssences = document.querySelectorAll('.trap-essence');
trapEssences.forEach(essence => {
    essence.addEventListener('mouseenter', function() {
        this.style.animation = 'pulse 0.5s ease';
    });
});

// 添加 pulse 动画
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    .back-to-top:hover {
        background: #8b0000 !important;
    }
`;
document.head.appendChild(style);

// ===== 统计陷阱数量 =====
function countTraps() {
    const trapCards = document.querySelectorAll('.trap-card');
    const trapSections = document.querySelectorAll('.trap-section');
    
    if (trapCards.length > 0 && trapSections.length > 0) {
        console.log(`📊 本页共介绍 ${trapCards.length} 个陷阱，分为 ${trapSections.length} 类`);
    }
}

countTraps();

// ===== 移动端导航优化 =====
function optimizeMobileNav() {
    const navLinks = document.querySelector('.nav-links');
    const logo = document.querySelector('.logo');

    if (window.innerWidth <= 480) {
        if (navLinks && !navLinks.classList.contains('mobile-ready')) {
            navLinks.classList.add('mobile-ready');
        }
    }
}

optimizeMobileNav();
window.addEventListener('resize', optimizeMobileNav());
