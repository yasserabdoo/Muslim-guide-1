//explore button
let exploreBtn = document.querySelector('.title .btn'),
   HadithSection = document.querySelector('.hadith');
exploreBtn.addEventListener('click',()=>{
    HadithSection.scrollIntoView({
        behavior : "smooth"
    })
})
let fixedNav = document.querySelector('.header'),
   scrollbtn = document.querySelector('.scrollbtn');
window.addEventListener("scroll",()=>{
    window.scrollY > 100 ? fixedNav.classList.add('active') : fixedNav.classList.remove('active');
    window.scrollY > 500 ? scrollbtn.classList.add('active') : scrollbtn.classList.remove('active')
})
scrollbtn.addEventListener('click',()=>{
    window.scrollTo({
        top : 0,
        behavior : "smooth"
    })
})
//hadith changer
let hadithContainer = document.querySelector('.hadithContainer'),
     next = document.querySelector('.buttons .next')
     prev = document.querySelector('.buttons .prev')
     number = document.querySelector('.buttons .number')
     let hadithIndex = 0;
HadithChanger();
     function HadithChanger()
{
    fetch("https://api.hadith.gading.dev/books/muslim?range=1-300")
    .then(response => response.json())
    .then(data =>{

        let Hadiths = data.data.hadiths;
        changeHadith();
        next.addEventListener('click',()=>{
            hadithIndex == 299 ? hadithIndex = 0 : hadithIndex++;
            changeHadith()
        })
        prev.addEventListener('click',()=>{
            hadithIndex == 0 ? hadithIndex = 299 : hadithIndex--;
            changeHadith()
        })
        function changeHadith()
        {
           hadithContainer.innerText = Hadiths[hadithIndex].arab;
           number.innerText = `300 - ${hadithIndex + 1}`
        }
    })
}
//pray time

// link section
let section = document.querySelectorAll("section"),
  links = document.querySelectorAll('.header ul li');
links.forEach(link =>{
    link.addEventListener('click',()=>{
        document.querySelector('.header ul li.active').classList.remove('active');
        link.classList.add('active');
        let target = link.dataset.filter;
        section.forEach(section=>{
            if(section.classList.contains(target))
                {
                    section.scrollIntoView({
                        behavior : "smooth"
                    })
                }
            })
        })
})
//active sidbar
let bars = document.querySelector('.bars'),
    SideBar = document.querySelector('.header ul');
bars.addEventListener('click',()=>{
    SideBar.classList.toggle("active");
})
  // تحديد المدينة والدولة وطريقة الحساب
  const city = "Cairo";
  const country = "Egypt";
  const method = 5; // طريقة الحساب

  // رابط API الخاص بـ Aladhan
  const apiUrl = `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=${method}`;

  // جلب بيانات مواقيت الصلاة
  fetch(apiUrl)
      .then(response => {
          if (!response.ok) {
              throw new Error("خطأ في الاتصال بالـ API");
          }
          return response.json();
      })
      .then(data => {
          if (data.code === 200) {
              const timings = data.data.timings;
              displayPrayerTimes(timings);
          } else {
              document.getElementById("prayer-times").innerText = "خطأ أثناء جلب مواقيت الصلاة.";
          }
      })
      .catch(error => {
          document.getElementById("prayer-times").innerText = "خطأ: " + error.message;
      });

  // عرض مواقيت الصلاة
  function displayPrayerTimes(timings) {
      const container = document.getElementById("prayer-times");
      container.innerHTML = "<ul>";

      for (const prayer in timings) {
          // استثناء الإمساك
          if (prayer === "Imsak") continue;

          const time24 = timings[prayer];
          const time12 = convertTo12Hour(time24);
          const prayerName = translatePrayer(prayer);
          container.innerHTML += `<h5>${prayerName}: ${time12}</h5>`;
      }

      container.innerHTML += "</h5>";
  }

  // تحويل الوقت من 24 ساعة إلى 12 ساعة باللغة العربية
  function convertTo12Hour(time24) {
      const [hour, minute] = time24.split(":");
      let hour12 = parseInt(hour) % 12 || 12;
      const period = parseInt(hour) >= 12 ? "م" : "ص";
      return `${hour12}:${minute} ${period}`;
  }

  // ترجمة أسماء الصلوات إلى العربية
  function translatePrayer(prayer) {
      const translations = {
          Fajr: "الفجر",
          Sunrise: "الشروق",
          Dhuhr: "الظهر",
          Asr: "العصر",
          Maghrib: "المغرب",
          Isha: "العشاء",
          Lastthird: "الثلث الأخير",
          Firstthird: "الثلث الأول",
          Midnight: "منتصف الليل",
          Sunset: "غروب الشمس",
      };
      return translations[prayer] || prayer;
  }