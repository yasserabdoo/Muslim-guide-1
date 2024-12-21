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