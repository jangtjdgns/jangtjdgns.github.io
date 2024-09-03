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

    // 프로젝트 섹션 애니메이션 효과
    else if(index === 3) {
        $('.pf-project .pf-project-title').addClass('text-shadow-neon');
        $('.pf-project-wrap').removeClass('opacity-0');

        let curIndex = 1;
        const carouselItemCount = $('.pj-carousel-item').length;
        const translateX = 100 / carouselItemCount;

        $('.pj-carousel-prev-btn').click(function(){
            clickedMoveBtn(-1);
        })

        $('.pj-carousel-next-btn').click(function(){
            clickedMoveBtn(1);
        })

        // prev, next 버튼 클릭 시 curIndex 1, -1 추가
        function clickedMoveBtn(moveBtn) {
            curIndex += moveBtn;
            if (curIndex == 0) {
                curIndex = carouselItemCount;
            } else if (curIndex > carouselItemCount) {
                curIndex = 1;
            }

            $('.pj-carousel-wrap>ul').css('transform', `translateX(-${translateX * (curIndex - 1)}%)`);
        }
    }
}