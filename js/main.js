// 메인 섹션 js

$(function () {
    sectionLoad();

    const canvas = $("#bg-canvas")[0];      // 캔버스
    const ctx = canvas.getContext("2d");    // 캔버스 2D 사용

    // 공 객체를 생성하는 생성자 함수
    function Ball(x, y, radius, dx, dy, color) {
        this.x = x;             // 공의 x 중심위치
        this.y = y;             // 공의 y 중심위치
        this.radius = radius;   // 공의 반지름
        this.dx = dx;           // 공의 x축 방향 이동량
        this.dy = dy;           // 공의 y축 방향 이동량
        this.color = color;     // 공의 색상
        this.clicked = false;   // 클릭 여부를 저장하는 변수

        // 공을 그리는 함수
        this.draw = function () {
            ctx.globalAlpha = 0.1                                   // 투명도 0.1
            ctx.beginPath();                                        // 원 그리기 시작
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);   // 원 그리기
            ctx.fillStyle = this.color;                             // 원 채우기 색상 설정
            ctx.fill();                                             // 원 채우기
            ctx.closePath();                                        // 원 그리기 종료
        }

        // 공을 이동시키는 함수
        this.move = function () {

            checkCanvasBounds(this);

            if (this.clicked) { // 클릭된 공만 튕겨나가도록 속도 조정

                checkCanvasBounds(this);

            } else { // 클릭되지 않은 공은 초기 속도로 돌아가기
                const speedReduction = 0.05; // 속도가 감소하는 비율
                if (Math.abs(this.dx) > 0.1) {
                    this.dx -= this.dx * speedReduction;
                }
                if (Math.abs(this.dy) > 0.1) {
                    this.dy -= this.dy * speedReduction;
                }
            }
        }
    }

    // 캔버스 경계 체크
    function checkCanvasBounds(ball) {
        ball.x += ball.dx;
        ball.y += ball.dy;

        if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
            ball.dx = -ball.dx;
        }
        if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
            ball.dy = -ball.dy;
        }
    }

    const balls = []; // 공 객체들을 담을 배열

    // 초기화 함수, 공 객체들을 생성하여 배열에 추가, n개의 공 생성
    function init() {
        for (let i = 0; i < 60; i++) {
            const radius = Math.random() * 10 + 5;                                  // 랜덤 반지름
            const x = Math.random() * (window.innerWidth - 2 * radius) + radius;    // 랜덤 x 좌표
            const y = Math.random() * (window.innerHeight - 2 * radius) + radius;   // 랜덤 y 좌표
            const dx = (Math.random() - 0.5) * 2;                                   // x 속도
            const dy = (Math.random() - 0.5) * 2;                                   // y 속도
            const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;    // 색상 지정
            balls.push(new Ball(x, y, radius, dx, dy, color));  // 공 객체 생성 및 배열에 추가
        }
    }

    // 애니메이션 함수
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < balls.length; i++) {
            balls[i].draw();
            balls[i].move();
        }
        requestAnimationFrame(animate);
    }

    init();         // 초기화
    resizeCanvas(); // 캔버스 사이즈 초기화
    animate();      // 애니메이션 시작

    // 클릭 이벤트, 클릭한 위치 주변의 공들을 클릭 위치 기준 사방으로 튕기기
    $(canvas).on("click", function (event) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        for (let i = 0; i < balls.length; i++) {
            const dx = balls[i].x - mouseX;
            const dy = balls[i].y - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 300) { // 클릭 위치 주변의 공들만을 선택
                balls[i].clicked = true; // 클릭된 공으로 표시

                // 클릭한 위치와 공의 중심 사이의 각도 계산
                const angle = Math.atan2(dy, dx);

                // 클릭한 위치 기준으로 공을 이동시킴
                const speed = Math.random() * 4;    // 임의의 속도
                balls[i].dx = Math.cos(angle) * speed;
                balls[i].dy = Math.sin(angle) * speed;

                setTimeout(function (index) {
                    balls[index].clicked = false;   // 튕긴 후 클릭 상태를 다시 false로 설정하여 움직이지 않도록 함
                }, 1000, i);    // 1초 후에 클릭 상태를 다시 false로 설정
            }
        }
    });

    //  윈도우 크기가 변경될 때마다 캔버스 크기 조정
    window.addEventListener("resize", resizeCanvas);

    // 캔버스 리사이즈
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
})

// 페이지 섹션 가져오기
function sectionLoad() {
    $(".pf-profile").load("../section/profile.html");
    $(".pf-skills").load("../section/skills.html");
    $(".pf-project").load("../section/project.html");
}