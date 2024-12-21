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



const prayerTimesContainer = document.getElementById("prayer-times");

function convertTo12HourFormat(time) {
    const [hours, minutes] = time.split(":").map(Number);
    const period = hours >= 12 ? "م" : "ص";
    const adjustedHours = hours % 12 === 0 ? 12 : hours % 12;
    return `${adjustedHours}:${minutes < 10 ? "0" + minutes : minutes} ${period}`;
}

async function fetchPrayerTimes() {
    try {
        const response = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=Dakahlia&country=Egypt&method=8&language=ar`);
        const data = await response.json();
        const timings = data.data.timings;

        const prayerNames = {
            Fajr: "الفجر",
            Sunrise: "الشروق",
            Dhuhr: "الظهر",
            Asr: "العصر",
            Sunset: "الغروب",
            Maghrib: "المغرب",
            Isha: "العشاء"
        };

        const prayerTimes = {
            Fajr: convertTo12HourFormat(timings.Fajr),
            Sunrise: convertTo12HourFormat(timings.Sunrise),
            Dhuhr: convertTo12HourFormat(timings.Dhuhr),
            Asr: convertTo12HourFormat(timings.Asr),
            Sunset: convertTo12HourFormat(timings.Sunset),
            Maghrib: convertTo12HourFormat(timings.Maghrib),
            Isha: convertTo12HourFormat(timings.Isha)
        };

        prayerTimesContainer.innerHTML = Object.keys(prayerNames)
            .map(prayer => `
                <div class="prayer-time animate">
                    <span>${prayerNames[prayer]}</span>
                    <span>${prayerTimes[prayer]}</span>
                </div>
            `)
            .join("");
    } catch (error) {
        console.error("حدث خطأ أثناء جلب مواقيت الصلاة:", error);
        prayerTimesContainer.innerHTML = "<p>تعذر تحميل مواقيت الصلاة.</p>";
    }
}

fetchPrayerTimes();

const surahButtons = document.getElementById('surah-buttons');
const surahList = document.getElementById('surah-list');
const surahContent = document.getElementById('surah-content');
const surahTitle = document.getElementById('surah-title');
const ayahList = document.getElementById('ayah-list');

fetch('https://api.alquran.cloud/v1/surah')
    .then(response => response.json())
    .then(data => {
        const surahs = data.data;
        surahs.forEach(surah => {
            const button = document.createElement('button');
            button.textContent = `${surah.number}. ${surah.name}`;
            button.onclick = () => loadSurah(surah.number, surah.name);
            surahButtons.appendChild(button);
        });
    })
    .catch(error => console.error('خطأ أثناء تحميل قائمة السور:', error));

// تحميل محتوى السورة
function loadSurah(surahId, surahName) {
    surahList.style.display = 'none';
    surahContent.style.display = 'block';

    // إضافة اللون الأخضر لعنوان السورة
    surahTitle.textContent = surahName;
    surahTitle.classList.add('active-surah'); // إضافة اللون الأخضر

    ayahList.innerHTML = '';

    fetch(`https://api.alquran.cloud/v1/surah/${surahId}`)
        .then(response => response.json())
        .then(data => {
            const ayahs = data.data.ayahs;
            ayahs.forEach(ayah => {
                const ayahDiv = document.createElement('div');
                ayahDiv.className = 'ayah';
                ayahDiv.innerHTML = `
                    <span class="ayah-number">(${ayah.numberInSurah})</span>
                    ${ayah.text}
                `;
                ayahList.appendChild(ayahDiv);
            });
        })
        .catch(error => console.error('خطأ أثناء تحميل السورة:', error));
}

// الرجوع إلى قائمة السور
function goBack() {
    surahList.style.display = 'block';
    surahContent.style.display = 'none';
    surahTitle.classList.remove('active-surah'); // إزالة اللون الأخضر عند الرجوع
}