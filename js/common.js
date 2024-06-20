// 공용 js

// 섹션별 애니메이션 효과
function runAnimation(index) {
    // 메인 섹션 애니메이션 효과
    if(index === 0) {
        setTimeout(function () {
            $('.title-border').removeClass('-translate-x-full');
        }, 500)

        setTimeout(function () {
            $('.title-name').removeClass('opacity-0');
            $('.title-border')
                .removeClass('h-2 duration-[2500ms]')
                .addClass('h-16 duration-[900ms]');
        }, 3000)

        setTimeout(function () {
            $('.moew-icon, .mouse-icon').removeClass('opacity-0');
            $('.title-box').addClass('neon-box-purple');
        }, 4000)
    }

    // 프로필 섹션 애니메이션 효과
    else if(index === 1) {
        $('.pf-profile .pf-profile-wrap').addClass('profile-animation');
        $('.pf-profile-wrap>.spin-wrap>span').addClass('spin');
        $('.pf-profile .pf-profile-title').addClass('text-shadow-neon');
        $('.pf-profile .pf-profile-content-wrap>.pf-profile-content-image').removeClass('opacity-0')
        $('.pf-profile .pf-profile-content-wrap>.pf-profile-content-text').removeClass('opacity-0')
    }

    // 스킬 섹션 애니메이션 효과
    else if(index === 2) {
        $('.pf-skills .pf-skills-title').addClass('text-shadow-neon');
        $('.pf-skills-subtitle, .pf-skills-list>li, .pf-skills-list>li>div').removeClass('opacity-0');
        setTimeout(() => initializeRadialProgress(), 1000);
    }

    // 포트폴리오 섹션 애니메이션 효과
    else if(index === 3) {
        $('.pf-portfolio .pf-portfolio-title').addClass('text-shadow-neon');
    }
}