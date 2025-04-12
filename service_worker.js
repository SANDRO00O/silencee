self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('silence-cache').then((cache) => {
      return cache.addAll([
        '/', // الصفحة الرئيسية
        '/index.html', // الصفحة الرئيسية
        '/style.css', // الملف الخاص بتنسيق الصفحات
        '/script.js', // الملف الخاص بالـ JavaScript
        '/PWAlogo.png', // شعار الـ PWA
        '/PWAlogo512.png', // شعار الـ PWA بحجم أكبر
        '/اختبار حبس النفس.html', // صفحة اختبار حبس النفس
        '/تأمل التنفس 4-7-8.html', // صفحة تأمل التنفس 4-7-8
        '/التنفس المنتظم.html', // صفحة التنفس المنتظم
        '/التنفس مربع الزمن.html', // صفحة التنفس مربع الزمن
        '/logopng2.png', // صورة الشعار
        '/about2.html', // صفحة "حول"
        '/contact/contact.html' // صفحة "اتصل بنا"
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});