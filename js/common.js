// 스크롤 시 헤더부분 검은색 바 추가

window.addEventListener('scroll', () => {
    let scroll = document.querySelector('html').scrollTop;
    if (scroll > 100) {
        document.querySelector('.header_top').classList.add('scrolled');
    } else {
        document.querySelector('.header_top').classList.remove('scrolled');
    }
});

// 소개화면에 skiils에 나오는 스크롤인터렉션
let gauges = document.querySelectorAll('.gauge');
gauges.forEach((item, i) => {
    console.log(item, i);

    gsap.to(item, {
        scale: 1,
        duration: 1,
        delay: i * 0.5,
        scrollTrigger: {
            trigger: '.gauge',
            start: 'top 75%',
            end: 'bottom 25%',
        },
    });
});

//gallery 슬라이드
var swiper = new Swiper('.swiper', {
    spaceBetween: 30,
    centeredSlides: true,
    // loop: true,
    autoHeight: true,
    autoplay: {
        delay: 10000,
        disableOnInteraction: false,
    },
    breakpoints: {
        720: {
            slidesPerView: 3,
            spaceBetween: '7%',
        },
    },
    // pagination: {
    //     el: '.swiper-pagination',
    //     clickable: true,
    // },
    // navigation: {
    //     nextEl: '.swiper-button-next',
    //     prevEl: '.swiper-button-prev',
    // },
});

//포트폴리오 리스트 생성
let portfolioData = [
    {
        subject: '포트폴리오1번',
        tags: '#반응형웹 #2주#2주#2주#2주#2주#2주#2주#2주#2주#2주#2주#2주',
        imgSrc: ['./img/portfolio01.jpg', './img/portfolio01.jpg', './img/portfolio01.jpg'],
        desc: '하나의 값만 쓰면 두 속성 모두에 적용됩니다.',
    },
    {
        subject: '포트폴리오2번',
        tags: '#반응형웹 #2주#2주#2주#2주#2주#2주#2주#2주#2주#2주#2주#2주',
        imgSrc: ['./img/portfolio02.jpg', './img/portfolio02.jpg'],
        desc: '하나의 값만 쓰면 두 속성 모두에 적용됩니다.',
    },
    {
        subject: '포트폴리오3번',
        tags: '#반응형웹 #2주#2주#2주#2주#2주#2주#2주#2주#2주#2주#2주#2주',
        imgSrc: './img/portfolio03.jpg',
        desc: '하나의 값만 쓰면 두 속성 모두에 적용됩니다.',
    },
    {
        subject: '포트폴리오4번',
        tags: '#반응형웹 #2주#2주#2주#2주#2주#2주#2주#2주#2주#2주#2주#2주',
        imgSrc: './img/portfolio04.jpg',
        desc: '하나의 값만 쓰면 두 속성 모두에 적용됩니다.',
    },
    {
        subject: '포트폴리오5번',
        tags: '#반응형웹 #2주#2주#2주#2주#2주#2주#2주#2주#2주#2주#2주#2주',
        imgSrc: './img/portfolio05.jpg',
        desc: '하나의 값만 쓰면 두 속성 모두에 적용됩니다.',
    },
];

portfolioData.forEach((data) => {
    let img;
    if (Array.isArray(data.imgSrc)) {
        img = data.imgSrc[0];
    } else {
        img = data.imgSrc;
    }

    let html = `<li>
                    <a href="">
                        <div class="txt">
                            <strong>${data.subject}</strong>
                                <p>#반응형웹 #2주#2주#2주#2주#2주#2주#2주#2주#2주#2주#2주#2주</p>
                                </div>
                                <img src="${img}" alt=""/></a>
                            </li>`;
    document.querySelector('.portfolio_list').insertAdjacentHTML('beforeend', html);
});

// 포트폴리오 팝업
let links = document.querySelectorAll('.portfolio_list a');
let popUp = document.querySelector('.portfolio_pop');

console.log('img', popUp.querySelector('.img_wrap'));

links.forEach((item, index) => {
    item.addEventListener('click', (e) => {
        popUp.querySelector('.img_wrap').innerHTML = '';
        e.preventDefault();
        console.log('index', index);

        popUp.style.display = 'block';
        document.querySelector('body').classList.add('non_scroll');

        if (Array.isArray(portfolioData[index].imgSrc)) {
            portfolioData[index].imgSrc.forEach((data) => {
                let html = `<img src="${data}" alt="" />`;
                popUp.querySelector('.img_wrap').insertAdjacentHTML('beforeend', html);
            });
        } else {
            let html = `<img src="${portfolioData[index].imgSrc}" alt="" />`;
            popUp.querySelector('.img_wrap').insertAdjacentHTML('beforeend', html);
        }

        popUp.querySelector('h1').innerHTML = portfolioData[index].subject;

        popUp.querySelector('p').innerHTML = portfolioData[index].desc;
    });
});

const closeBtn = document.querySelector('.portfolio_pop button');

closeBtn.addEventListener('click', () => {
    popUp.style.display = 'none';
    document.querySelector('body').classList.remove('non_scroll');
});

// email.js
document.querySelector('.contact button[type=submit]').addEventListener('click', (e) => {
    e.preventDefault();

    if (document.querySelector('input[name=name]').value == '') {
        console.log('이름확인');
        alert('이름을 입력해주세요');
        return;
    } else if (document.querySelector('input[name=tel]').value == '') {
        console.log('번호확인');
        alert('전화번호를 입력해주세요');
        return;
    } else if (document.querySelector('input[name=email]').value == '') {
        console.log('이메일확인');
        alert('이메일을 입력해주세요');
        return;
    } else {
        emailjs.init('FGuqW9opOhfjF9d9J');

        emailjs.sendForm('service_ncrti2k', 'template_pduy3si', '#myForm').then(
            (response) => {
                alert('메일이 전송되었습니다.');

                let inputBlank = document.querySelectorAll('.input_item input');
                console.log(inputBlank);

                for (let i = 0; i < inputBlank.length; i++) {
                    console.log(i, inputBlank[i].value);
                    inputBlank[i].value = '';
                }

                document.querySelector('textarea').value = '';

                console.log('SUCCESS!', response.status, response.text);
            },
            (error) => {
                alert('메일 전송실패하였습니다.');
                console.log('FAILED...', error);
            }
        );
    }
});

// gnb a태그 누를때 부드럽게 이동
let gnbLinks = document.querySelectorAll('.gnb a');

gnbLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        document.querySelector('.gnb').classList.remove('opened');
        document.querySelector('body').classList.remove('non_scroll');

        let targetID = link.getAttribute('href');
        console.log('targetID', targetID);
        let targetSection = document.querySelector(targetID);
        console.log(targetSection);

        window.scrollTo({ top: targetSection.offsetTop, behavior: 'smooth' });
    });
});

//logo 클릭 시 맨 위로 이동
let logo = document.querySelector('.logo a');
logo.addEventListener('click', (e) => {
    e.preventDefault();

    let targetID = logo.getAttribute('href');
    console.log('targetID', targetID);
    let targetSection = document.querySelector(targetID);
    console.log(targetSection);

    window.scrollTo({ top: targetSection.offsetTop, behavior: 'smooth' });
});

// 스크롤하다 보여지는 섹션 메뉴에 표시
window.addEventListener('scroll', () => {
    gnbLinks.forEach((link) => {
        link.classList.remove('active');
        let section = document.querySelector(link.getAttribute('href'));
        let sectionTop = section.offsetTop;
        let sectionBottom = sectionTop + section.clientHeight;
        let currentSection = link.getAttribute('href');

        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
            console.log(currentSection);
            document.querySelector(`.gnb a[href="${currentSection}"]`).classList.add('active');
        }
    });
});

//모바일 메뉴 열기 / 닫기
document.querySelector('.btn_open').addEventListener('click', () => {
    document.querySelector('.gnb').classList.add('opened');
    document.querySelector('body').classList.add('non_scroll');
});

document.querySelector('.btn_close').addEventListener('click', () => {
    document.querySelector('.gnb').classList.remove('opened');
    document.querySelector('body').classList.remove('non_scroll');
});
