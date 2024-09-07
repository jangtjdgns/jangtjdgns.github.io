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
            $('.title-border').removeClass('w-full').addClass('w-[calc(100%-160px)]')
        }, 3000)

        setTimeout(function () {
            $('.moew-icon, .mouse-icon, .displly-resolution').removeClass('opacity-0');
        }, 3500)
    }

    // 프로필 섹션
    else if(index === 1) {
        // 애니메이션 효과
        $('.pf-profile .pf-profile-wrap').addClass('profile-animation');
        $('.pf-profile-wrap>.spin-wrap>span').addClass('spin');
        $('.pf-profile .pf-profile-title').addClass('text-shadow-neon');
        $('.pf-profile .pf-profile-content-wrap>.pf-profile-content-image').removeClass('opacity-0')
        $('.pf-profile .pf-profile-content-wrap>.pf-profile-content-text').removeClass('opacity-0')

        // 캐러셀
        let curIndex = 1;
        const carouselItemCount = $('.profile-carousel-item').length;
        const translateX = 100 / carouselItemCount;
        $('.profile-carousel-prev-btn').click(function(){
            clickedMoveBtn(-1);
        })

        $('.profile-carousel-next-btn').click(function(){
            clickedMoveBtn(1);
        })

        $('.profile-carousel-controls>button').click(function(){
            curIndex = $(this).index() + 1;
            clickedControlBtn();
        })

        // prev, next 버튼 클릭 시 curIndex 1, -1 추가
        function clickedMoveBtn(moveBtn) {
            curIndex += moveBtn;
            clickedControlBtn();
        }

        // 캐러셀 자동 스크롤
        autoCarousel();
        function autoCarousel(){
            autoCarouselInterval = setInterval(function(){
                curIndex += 1;
                clickedControlBtn();
            }, 10000);
        }


        $('.profile-carousel-swap>input').change(function(){
            playPauseBtn($(this).prop('checked'));
        });

        // 캐러셀 정지 및 재생 버튼
        function playPauseBtn(isPaused) {
            isPaused ? clearInterval(autoCarouselInterval) : autoCarousel();
        }

        // 캐러셀 컨트롤 버튼
        function clickedControlBtn() {
            if (curIndex == 0) {
                curIndex = carouselItemCount;
            } else if (curIndex > carouselItemCount) {
                curIndex = 1;
            }

            const control = $('.profile-carousel-controls>button');
            control.removeClass('w-10 bg-gray-300').addClass('w-3 bg-gray-100');
            control.eq(curIndex - 1).removeClass('w-3 bg-gray-300').addClass('w-10 bg-gray-300');
            
            $('.profile-carousel-wrap>ul').css('transform', `translateX(-${translateX * (curIndex - 1)}%)`);
        }
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
        const carouselItemCount = $('.project-carousel-item').length;
        const translateX = 100 / carouselItemCount;
        $('.project-carousel-prev-btn').click(function(){
            clickedMoveBtn(-1);
        })

        $('.project-carousel-next-btn').click(function(){
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

            $('.project-carousel-wrap>ul').css('transform', `translateX(-${translateX * (curIndex - 1)}%)`);
        }
    }
}