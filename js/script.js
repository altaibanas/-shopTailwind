// script.js - ملف JavaScript الرئيسي للمتجر

// تهيئة المتجر
document.addEventListener('DOMContentLoaded', function() {
    // تفعيل قائمة الجوال
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // تأثيرات التمرير
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.classList.add('shadow-lg');
        } else {
            header.classList.remove('shadow-lg');
        }
    });
    
    // تفعيل تأثيرات الرفع عند التمرير
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);
    
    // مراقبة العناصر التي تحتاج تأثيرات ظهور
    document.querySelectorAll('.hover-lift').forEach(el => {
        observer.observe(el);
    });
    
    // إضافة فئة CSS للرسوم المتحركة
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
            animation: fadeIn 0.6s ease forwards;
        }
    `;
    document.head.appendChild(style);
});

// وظيفة إضافة منتج إلى السلة
function addToCart(productId, productName, price) {
    // في التطبيق الحقيقي، سيتم إرسال طلب AJAX إلى الخادم
    console.log(`تمت إضافة ${productName} إلى السلة`);
    
    // عرض إشعار للمستخدم
    showNotification(`تمت إضافة ${productName} إلى سلة التسوق`);
}

// وظيفة عرض الإشعارات
function showNotification(message, type = 'success') {
    // إنصراف عنصر الإشعار
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full ${
        type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
    }`;
    notification.textContent = message;
    
    // إضافة الإشعار إلى الصفحة
    document.body.appendChild(notification);
    
    // عرض الإشعار
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // إخفاء الإشعار بعد 3 ثوانٍ
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// وظيفة البحث عن المنتجات
function searchProducts(query) {
    // في التطبيق الحقيقي، سيتم إرسال طلب AJAX إلى الخادم
    console.log(`البحث عن: ${query}`);
    
    // إعادة توجيه إلى صفحة المتجر مع معلمات البحث
    window.location.href = `shop.html?search=${encodeURIComponent(query)}`;
}

// وظيفة تصفية المنتجات حسب الفئة
function filterProducts(category) {
    // في التطبيق الحقيقي، سيتم إرسال طلب AJAX إلى الخادم
    console.log(`تصفية حسب الفئة: ${category}`);
    
    // تحديث واجهة المستخدم لعرض المنتجات المصفاة
    const products = document.querySelectorAll('.product-item');
    products.forEach(product => {
        if (category === 'all' || product.dataset.category === category) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}