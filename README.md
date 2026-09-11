# 민준 포트폴리오

순수 HTML, CSS, JavaScript로 만든 반응형 프론트엔드 개발자 포트폴리오입니다. 사용자 이벤트 → 상태 변경 → DOM 렌더링의 흐름을 한 페이지에서 확인할 수 있습니다.

## 주요 기능

- 모바일 햄버거 메뉴와 앵커 기반 부드러운 스크롤
- 다크 모드 및 `localStorage` 설정 유지
- 스크롤 60px 이후 헤더 스타일 변경, 300px 이후 맨 위로 버튼 표시
- Intersection Observer(`threshold: 0.2`) 기반 섹션 등장 애니메이션
- GitHub API 프로젝트 목록의 로딩·성공·에러·빈 상태 처리 및 언어 필터
- 이름·이메일·메시지 필수값과 이메일 형식 검증

## 실행 방법

프로젝트를 VS Code로 열고 Live Server 확장 프로그램으로 `index.html`을 실행합니다. 별도 패키지 설치나 빌드 과정은 필요하지 않습니다.

## 사용자 설정

`js/main.js`의 `GITHUB_USERNAME` 값을 본인의 GitHub 아이디로 변경하세요. `index.html`의 이름, 이메일, 소셜 링크도 본인 정보로 바꿀 수 있습니다.

## 사용 기술

HTML5 시맨틱 마크업, CSS3(Flexbox/Grid/반응형 변수), Vanilla JavaScript(ES6+, Fetch API, async/await, Intersection Observer)를 사용했습니다. 외부 라이브러리는 사용하지 않았습니다.

## 배포

GitHub 저장소의 Settings → Pages에서 `main` 브랜치의 루트 폴더를 선택하면 GitHub Pages로 배포할 수 있습니다.

- 저장소 URL: `https://github.com/본인아이디/저장소명`
- 배포 URL: `https://본인아이디.github.io/저장소명/`

## 스크린샷

배포 후 데스크톱, 모바일, 다크 모드 화면을 캡처해 아래에 추가합니다.

<!-- 예: ![데스크톱 화면](images/screenshot-desktop.png) -->
