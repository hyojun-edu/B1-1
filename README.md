#포트폴리오

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
- 데스크톱 화면
<img width="1912" height="1152" alt="desktop" src="https://github.com/user-attachments/assets/c8ccc62f-c22a-44b0-b5e9-024d7b1f2144" />

- 모바일 화면 (라이트 모드)
<img width="872" height="1152" alt="mobile" src="https://github.com/user-attachments/assets/dde15e0e-b2ff-48df-87f1-5c9eb8d7a86b" />

- 모바일 화면 (다크 모드)
<img width="872" height="1152" alt="dark_mode" src="https://github.com/user-attachments/assets/8185ba77-e0bd-4b01-ac12-fc9080e2c82d" />

## 구현 설계와 학습 내용

### 시맨틱 태그를 사용한 이유

콘텐츠의 역할을 태그 이름만으로 알 수 있게 하기 위해 시맨틱 태그를 사용했습니다. `<header>`와 `<nav>`에는 사이트 로고와 이동 메뉴를 배치하고, `<main>` 안에는 페이지의 핵심 콘텐츠인 `<section>`들을 배치했습니다. 반복되는 기술과 프로젝트 항목은 각각 `<article>`로 표현했으며, 저작권과 소셜 링크는 `<footer>`에 두었습니다. 이렇게 구조를 나누면 브라우저와 검색 엔진, 스크린 리더가 페이지의 구조와 콘텐츠 의미를 더 쉽게 이해할 수 있습니다.

### Flexbox와 Grid를 선택한 기준

Flexbox는 한 방향으로 요소를 정렬할 때 적합하므로 네비게이션의 로고와 메뉴를 가로로 배치하고, 버튼과 푸터 링크를 정렬하는 데 사용했습니다. 반면 Grid는 행과 열을 함께 다루는 2차원 레이아웃에 적합하므로 프로젝트 카드를 `repeat(auto-fit, minmax(...))`로 배치했습니다. 화면 너비에 따라 카드 열 수가 자동으로 바뀌어 별도의 복잡한 계산 없이 반응형 레이아웃을 만들 수 있습니다.

### DOM 선택과 이벤트 연결

`js/main.js`의 `select` 함수는 `document.querySelector`로 하나의 DOM 요소를 선택하고, `selectAll` 함수는 `querySelectorAll`로 여러 요소를 선택합니다. 선택한 요소에는 `addEventListener`로 이벤트를 연결합니다. 예를 들어 테마 버튼에는 `click`, 문의 폼에는 `submit`, 입력 필드에는 `input`, 브라우저에는 `scroll` 이벤트를 연결했습니다. 이벤트가 발생하면 `event.preventDefault()`로 기본 동작을 제어한 뒤 필요한 상태와 화면을 변경합니다.

### ES6+ 문법과 배열 메서드

- 화살표 함수: 짧은 이벤트 핸들러와 배열 순회 함수를 간결하게 작성했습니다.
- 구조분해 할당: GitHub 응답 객체에서 `name`, `description`, `language`, `html_url` 등을 바로 추출했습니다.
- `map`: GitHub 프로젝트 배열을 프로젝트 카드 HTML 배열로 변환했습니다.
- `filter`: 선택한 언어와 일치하는 프로젝트만 남겨 필터링했습니다.
- `forEach`: 여러 메뉴, 입력 필드, 필터 버튼에 동일한 이벤트나 클래스를 적용했습니다.

### fetch와 async/await를 사용한 API 처리

`loadProjects` 함수에서 `fetch`와 `async/await`로 `https://api.github.com/users/{아이디}/repos`를 호출합니다. 요청 전에는 Projects 영역에 로딩 문구와 스피너를 표시하고, 응답이 성공하면 프로젝트 데이터를 상태에 저장한 뒤 카드 목록을 렌더링합니다. 응답 상태가 정상이 아니거나 네트워크 오류가 발생하면 `try/catch`가 이를 처리하고, 사용자에게 오류 문구와 다시 시도 버튼을 보여줍니다. 응답 배열이 비어 있거나 필터 결과가 없으면 빈 상태 문구를 표시합니다.

### 이벤트 → 상태 변경 → DOM 업데이트

이 프로젝트는 사용자 동작을 상태 변경과 화면 렌더링으로 연결합니다.

1. 다크 모드 버튼 클릭 → `state.theme` 변경 및 `localStorage` 저장 → `data-theme` 변경으로 CSS 변수 업데이트
2. GitHub API 호출 → 로딩·성공·실패 상태 변경 → Projects 영역의 문구와 카드 HTML 업데이트
3. 프로젝트 필터 클릭 → `state.filter` 변경 → `filter`로 목록을 골라 카드 목록 업데이트
4. 폼 입력 및 제출 → 각 필드의 유효성 상태 확인 → 에러 메시지 또는 Formspree 전송 결과 표시

이처럼 상태를 먼저 변경하고 그 결과를 DOM에 반영하는 구조를 사용해, 각 기능의 동작 흐름을 명확하게 유지했습니다.
