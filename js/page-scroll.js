// 스크롤 관련 js

// 전역
let page = 0;					                            // 현재 페이지 번호(현재 섹션 index)
let curSectionPos = 0;					                    // 현재 섹션 위치
let lastPage = 0;                                           // 섹션 수
let totalHeight = getCalcSectionHeightUntilIdx(lastPage);   // 전체 높이
let scrollDuration = 700;                                   // 스크롤 애니메이션 지속시간, ms
let canScroll = true;                                       // 스크롤 움직일 수 있는지

// 애니메이션 실행 관련
let sectionTop = 0;                                         // 섹션 top
let curScrollPos = 0;                                       // 현재 스크롤 위치
let animationPlayed = [];                                   // 섹션별 애니메이션 동작 유무(한번만 실행되도록)

// 페이지 로딩
$(function () {
    lastPage = $('section').length - 1;         // 마지막 페이지
    for (let i = 0; i <= lastPage; i++) {       // 페이지 수에 맞춰서 배열 초기화
        animationPlayed.push(false);            // 초기값은 모두 false (애니메이션을 실행하지 않은 상태)
    }
    // console.log(animationPlayed)
    updatePageAndScroll();

    // 휠 이벤트
    $(window).on("wheel", function (e) {
        if (!canScroll) return;
        canScroll = false;

        if (e.originalEvent.deltaY > 0) {				// 휠 다운
            page = (page === lastPage) ? page : page + 1;
        } else if (e.originalEvent.deltaY < 0) {		// 휠 업
            page = (page === 0) ? page : page - 1;
        }

        updatePageAndScroll();

        // 0.7초 후에 휠 이벤트가 다시 발생할 수 있도록 타이머 설정
        setTimeout(function() {
            canScroll = true;
        }, 700);
    });

    // 사이드 버튼 클릭 이벤트
    $(".side-move-btn").each(function (idx, item) {
        $(item).click(function () {
            page = idx;
            updatePageAndScroll();
        });
    })
})

// ==========================================

// 페이지 및 스크롤 업데이트
function updatePageAndScroll() {
    if ($("html").is(":animated")) {    // 애니메이션 진행 중 추가적인 애니메이션효과를 방지
        return;
    }
    changeSideMoveBtnStyle();
    curSectionPos = getCalcSectionHeightUntilIdx(page);
    animateScrollToTop(curSectionPos, scrollDuration);

    setTimeout(function(){
        checkSectionReached();
    }, scrollDuration + 50);   // 스크롤 지속시간 + 여유시간
}


// section의 idx 까지의 높이 가져오기
function getCalcSectionHeightUntilIdx(index) {
    let height = 0;
    $('section').each(function (idx, item) {
        if (idx >= 1 && idx <= index) {
            height += $(item).outerHeight(); // outerHeight()를 사용하여 마진 등도 포함한 높이를 계산
        }
    })
    return height;
}

// 사이드 버튼 스타일 변경
function changeSideMoveBtnStyle() {
    $(".side-move-btn").each(function (idx, item) {
        if (idx != page) {
            // $('.tooltip').eq(idx).removeClass('tooltip-open');
            $(item).removeClass("btn-active bg-yellow-200 neon-box-yellow scale-[0.7]");
        } else if (idx == page) {
            // $('.tooltip').eq(idx).addClass('tooltip-open');
            $(item).addClass("btn-active bg-yellow-200 neon-box-yellow scale-[0.7]");
        }
    });
}


// scrollTop 애니메이션
function animateScrollToTop(scrollTopValue, duration) {
    $('html, body').animate({
        scrollTop: scrollTopValue
    }, duration);
}

// 특정 섹션에 도달했을 때 실행할 애니메이션 체크 함수
function checkSectionReached() {
    // 현재 섹션의 상단 위치와 현재 스크롤 위치 초기화
    sectionTop = $('section').eq(page).offset().top;
    curScrollPos = $(window).scrollTop() + $(window).height();

    if (curScrollPos > sectionTop && !animationPlayed[page]) {
        animationPlayed[page] = true;
        runAnimation(page);
    }
}