// 기술 스택 섹션 js

// 스킬 max 확인 및 애니메이션 적용
function initializeRadialProgress() {
    $('.pf-skills .radial-progress').each(function(idx, item) {
        const max = parseInt($(item).data('maxValue'));
        animateRadialProgress(item, max);
    });
}

// 방사형 프로세스 애니메이션
function animateRadialProgress(item, max) {
    
    let value = 0;
    const interval = setInterval(() => {
        if (value <= max) {
            $(item).css('--value', value++);
        } else {
            clearInterval(interval);
        }
    }, 10);
}