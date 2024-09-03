$(function () {
    let curIndex = 1;
    const carouselItemCount = $('.carousel-item').length;
    const translateX = 100 / carouselItemCount;

    $('.carousel-prev-btn').click(function(){
        console.log('-1');
        clickedMoveBtn(-1);
    })

    $('.carousel-next-btn').click(function(){
        console.log('1');
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

        $('.carousel-wrap>ul').css('transform', `translateX(-${translateX * (curIndex - 1)}%)`);
    }
})