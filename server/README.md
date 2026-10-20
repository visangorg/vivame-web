# VIVAME 지원서 수집 서버

19기 비바미 지원서를 저장하고, **운영자가 전체 목록을 CSV로 다운로드**할 수 있게 하는 소규모 API입니다.

## 기능

- **POST /api/apply** — 지원서 제출 시 프론트에서 이 주소로 전송. `data/applications.json`에 누적 저장.
- **GET /api/applications/csv?key=ADMIN_SECRET** — 운영자만 접근. 저장된 전체 제출을 CSV 파일로 다운로드.
- **GET /api/club-events** — 동호회 리더가 등록한 일정을 모두 조회(공개).
- **POST /api/club-events**, **PUT /api/club-events/:id**, **DELETE /api/club-events/:id** — 리더 비밀번호(`X-Club-Leader-Password`)가 맞을 때만 등록/수정/삭제. 결과는 `data/club-events.json`에 공용 저장됩니다.

## 로컬 실행

```bash
cd server
npm install
cp .env.example .env
# .env 에서 ADMIN_SECRET 을 꼭 다른 값으로 변경
npm run dev
```

- 서버: `http://localhost:3001`
- 프론트(apply.js)의 `BACKEND_URL`을 `http://localhost:3001` 로 두고 테스트.

## 운영자 CSV 다운로드

1. 서버 배포 후 `.env`에 설정한 **ADMIN_SECRET** 값을 안전하게 보관.
2. 브라우저 주소창에 아래 주소 입력 후 접속:
   ```
   https://your-server.com/api/applications/csv?key=여기에_ADMIN_SECRET_값
   ```
3. CSV 파일(`vivame-19기-지원목록.csv`)이 바로 다운로드됩니다. 북마크해 두면 버튼처럼 사용 가능합니다.

## 배포 예시 (Railway / Render)

- **Railway**: 프로젝트에 `server` 폴더를 서비스로 추가, Root Directory를 `server`로 지정, `npm start` 사용.
- **Render**: New Web Service → Repository 연결, Root Directory `server`, Build: `npm install`, Start: `npm start`.
- 둘 다 환경 변수에 `ADMIN_SECRET`(및 필요 시 `PORT`) 설정.

배포 후 나온 URL을 프론트의 `window.CLUB_SCHEDULE_API_BASE`에 넣으면 동호회 일정이 해당 서버에 쌓여 모든 브라우저에서 같이 보입니다.

같은 서버로 사이트까지 열려면 저장소 루트에서 `node server/server.js`를 실행하세요. `index.html`을 정적 파일로 함께 제공합니다.
