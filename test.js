/* ==================================================
   1. إدارة الوضع الافتراضي والوضع الداكن
   ================================================== */

// تطبيق الوضع الافتراضي بناءً على تفضيل النظام
function applySystemTheme() {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
}
applySystemTheme();

// الاستماع لتغييرات النظام أثناء تشغيل الصفحة
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  if (e.matches) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
});

// زر تبديل الوضع يدويًا
const toggleDarkMode = document.getElementById("toggleDarkMode");
toggleDarkMode.addEventListener("click", function() {
  document.body.classList.toggle("dark-mode");
});


/* ==================================================
   2. إعدادات التطبيق
   ================================================== */

// إعدادات التطبيق (تم حذف إعدادات الصوت)
let backgrondImages = false; // صور الخلفية من Unsplash


/* ==================================================
   3. عناصر DOM
   ================================================== */

const slider = document.getElementById("slider");
const output = document.getElementById("countdown");
const button = document.getElementById("button");
const messageElement = document.getElementById("mess");


/* ==================================================
   4. رسائل التأمل والإعداد المبدئي
   ================================================== */

const messages = [
  "تنفس بعمق",
  "ركّز على الحاضر",
  "استرخِ",
  "دع الأفكار تمر بهدوء",
  "أفكر في الجمال الداخلي",
  "عيش اللحظة",
  "أعطِ نفسك فرصة للتجدد",
  "كن ممتنًا لكل شيء",
  "تأمل في بساطة الحياة",
  "دع الهدوء يملأ قلبك",
  "أشعر بالسلام الداخلي",
  "احتضن لحظات الهدوء",
  "استمع لصوت قلبك",
  "اعمل على تهدئة عقلك",
  "أنعم بالسكينة",
  "تأمل في جمال الطبيعة",
  "ركز على تناغم جسدك",
  "أطلق سراح التوتر",
  "احتفل باللحظة الحالية",
  "دع السكينة تملأ روحك",
  "الحياة قصيرة، فابتسم.",
  "الأمل هو مفتاح السعادة.",
  "السعادة قرار.",
  "النجاح رحلة وليس وجهة.",
  "العلم نور.",
  "العمل هو مفتاح النجاح.",
  "التغيير يبدأ من الداخل.",
  "الصبر مفتاح الفرج."
];
let currentMessageIndex = 0;
let sliderValue = Number(slider.value);
output.textContent = sliderValue + " ثواني";


/* ==================================================
   5. دوال مساعدة
   ================================================== */

/**
 * دالة تقريب قيمة السلايدر إلى أقرب مضاعف لمقدار معين
 * هنا نستخدم 30 ثواني كمضاعف افتراضي
 */
function snapToNearestMinute(val) {
  const threshold = 3; // فارق مسموح به (ثواني)
  const minuteMark = 30;
  let nearestMultiple = Math.round(val / minuteMark) * minuteMark;
  if (Math.abs(val - nearestMultiple) < threshold) {
    return nearestMultiple;
  }
  return val;
}


/* ==================================================
   6. مستمعين للأحداث
   ================================================== */

// تحديث السلايدر عند تغير القيمة مع تطبيق التقريب
slider.addEventListener("input", function() {
  let value = Number(this.value);
  let snappedValue = snapToNearestMinute(value);
  if (snappedValue !== value) {
    // تحديث السلايدر بالقيمة المنجذبة
    value = snappedValue;
    this.value = value;
  }
  sliderValue = value;
  output.textContent = sliderValue + " ثواني";
});

// مستمع الزر لبدء العداد
button.addEventListener("click", start);


/* ==================================================
   7. إدارة الخلفيات
   ================================================== */

if (backgrondImages === true) {
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundImage =
    "url('https://images.unsplash.com/photo-1535242208474-9a2793260ca8?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjYzOTkzMTN8&ixlib=rb-4.0.3&q=85')";
  document.documentElement.style.setProperty("--maincolor", "rgba(255,255,255,0.8)");
  document.documentElement.style.setProperty("--secondcolor", "rgba(255,255,255,0.5)");
  document.documentElement.style.setProperty("--textcolor", "rgba(0,50,0,1)");
}


/* ==================================================
   8. وظائف العداد وتحديث الرسائل
   ================================================== */

let messageUpdateInterval;

/**
 * دالة بدء العداد وتحديث الرسائل
 * تم حذف جميع الوظائف المتعلقة بالصوت
 */
function start() {
  // إظهار نص الرسائل مع تأثير تلاشي
  messageElement.style.display = "block";
  gsap.fromTo(messageElement, { opacity: 0 }, { opacity: 1, duration: 1 });

  // تعيين الرسالة الأولية
  currentMessageIndex = 0;
  messageElement.textContent = messages[currentMessageIndex];

  // تحديث قيمة العداد
  sliderValue = Number(slider.value);

  // إنشاء تسلسل الحركات باستخدام GSAP
  const tl = gsap.timeline();

  // بدء تحديث الرسائل بشكل دوري أثناء العداد
  startMessageUpdate();

  // تحريك عنصر "#gonggong" للأسفل (يمكن الاحتفاظ بهذا العنصر للتأثيرات البصرية أو حذفه إن لم يكن مطلوبًا)
  tl.to("#gonggong", {
    duration: 1,
    ease: "power1.out",
    y: 290
  });

  // إخفاء وتعطيل المدخلات أثناء التحريك
  tl.to(".inputs", {
    opacity: 0.2,
    duration: 1,
    onComplete: toggleDisabled
  }, "<");

  // تحريك عنصر "#gonggong" للأعلى مع تحديث الثواني المتبقية
  tl.to("#gonggong", {
    duration: sliderValue,
    ease: "none",
    y: 0,
    onUpdate: function() {
      const progress = this.progress();
      const remainingSeconds = sliderValue - Math.ceil(progress * sliderValue);
      output.textContent = remainingSeconds + " ثواني";
    }
  });

  // إعادة إظهار المدخلات وتفعيلها بعد انتهاء التحريك وإيقاف تحديث الرسائل
  tl.to(".inputs", {
    opacity: 1,
    duration: 1,
    onComplete: () => {
      toggleDisabled();
      stopMessageUpdate();
    }
  });
}

/**
 * دالة تحديث الرسائل مع تأثير تلاشي سلس
 */
function updateMessage() {
  gsap.to(messageElement, {
    opacity: 0,
    duration: 0.5,
    onComplete: () => {
      currentMessageIndex = (currentMessageIndex + 1) % messages.length;
      messageElement.textContent = messages[currentMessageIndex];
      gsap.to(messageElement, { opacity: 1, duration: 0.5 });
    }
  });
}

/**
 * بدء تحديث الرسائل بشكل دوري كل 8 ثوانٍ
 */
function startMessageUpdate() {
  messageUpdateInterval = setInterval(() => {
    if (Number(slider.value) > 0) {
      updateMessage();
    }
  }, 8000);
}

/**
 * إيقاف تحديث الرسائل
 */
function stopMessageUpdate() {
  clearInterval(messageUpdateInterval);
}

/**
 * تبديل حالة تعطيل الزر والسلايدر
 */
function toggleDisabled() {
  button.disabled = !button.disabled;
  slider.disabled = !slider.disabled;
}


/* ==================================================
   9. إدارة شاشة التحميل
   ================================================== */

window.addEventListener('load', () => {
  const loading = document.getElementById('loading');
  loading.style.display = 'none';
});