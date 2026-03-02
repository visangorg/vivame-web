# VIVAME 19기 모집 랜딩 페이지 - HTML 버전

비상교육의 사내 변화 주도자 'VIVAME 19기' 모집을 위한 랜딩 페이지 HTML 버전입니다.

## 파일 구조

```
/
├── index.html          # 메인 랜딩 페이지
├── apply.html          # 지원서 작성 페이지
├── README-HTML.md      # 이 파일
└── assets/            # 이미지 폴더 (생성 필요)
    ├── visang-logo.png
    ├── popup-book.jpg
    ├── bottle-cap.jpg
    ├── snack-attack.jpg
    ├── film-festival.jpg
    ├── fake-docu.jpg
    └── writing-room.jpg
```

## 필요한 이미지 파일

`assets` 폴더를 생성하고 다음 이미지들을 준비해주세요:

1. **visang-logo.png** - 비상교육 로고
2. **popup-book.jpg** - 팝업북 제작 봉사 활동 이미지
3. **bottle-cap.jpg** - 업!뚜껑 프로젝트 활동 이미지
4. **snack-attack.jpg** - 간식 어택 활동 이미지
5. **film-festival.jpg** - 비바미 필름 페스티벌 활동 이미지
6. **fake-docu.jpg** - 우리의 믿음이 알고 싶다 활동 이미지
7. **writing-room.jpg** - 라이팅룸 프로젝트 활동 이미지

## 사용된 기술

- **Pretendard 폰트** (CDN)
- **Tailwind CSS v3** (CDN)
- **Slick Carousel** (CDN)
- **jQuery** (Slick Carousel 의존성)
- **순수 JavaScript** (모든 인터랙션)

## 주요 기능

### index.html (메인 랜딩 페이지)
- 반응형 네비게이션
- 히어로 섹션 (애니메이션 배경 효과)
- 비바미 소개 섹션
- 변화 방향 섹션 (3가지 역할)
- 활동 소개 섹션 (6가지 활동)
- VIVAME 활동 혜택 섹션 (6가지 혜택)
- 후기 캐러셀 (8개의 후기, 좌우 스크롤)
- VIVAME 적합도 테스트 (팝업 모달)
- 푸터 (문의처 정보)

### apply.html (지원서 작성 페이지)
- 작성 진행률 표시
- 실시간 폼 유효성 검사
- 제출 완료 모달
- 자동 메인 페이지 이동

## 브라우저 지원

- Chrome (최신)
- Firefox (최신)
- Safari (최신)
- Edge (최신)

## 로컬 실행 방법

1. 파일을 다운로드합니다
2. `assets` 폴더를 생성하고 이미지 파일들을 넣습니다
3. `index.html` 파일을 브라우저로 엽니다

또는 로컬 서버를 실행합니다:

```bash
# Python 3
python -m http.server 8000

# Node.js (http-server 설치 필요)
npx http-server
```

그 다음 브라우저에서 `http://localhost:8000` 으로 접속합니다.

## GitHub Pages 배포

1. 저장소를 GitHub에 push합니다
2. Settings → Pages → Source에서 **Deploy from a branch** 선택
3. Branch를 `main`(또는 `master`), folder를 `/ (root)`로 설정
4. 저장 후 자동 배포됩니다

- `index.html`이 루트에 있어야 합니다
- 모든 경로는 상대 경로(`./`)로 설정되어 GitHub Pages와 호환됩니다
- `.nojekyll` 파일이 있어 정적 HTML만 서빙됩니다

## 커스터마이징

### 브랜드 컬러 변경
`#00B7F1` (Vibrant Sky Blue)를 찾아 원하는 컬러로 변경하세요.

### 텍스트 수정
각 섹션의 텍스트는 HTML 파일 내에서 직접 수정 가능합니다.

### 이미지 경로 변경
`./assets/` 경로를 원하는 경로로 변경하세요.

## 연락처

문의: 교육기획 Cell 유지수 CP (yoojs4@visang.com)

---

© 2026 비상교육. All rights reserved.
