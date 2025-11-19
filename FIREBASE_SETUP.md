# Firebase Admin 페이지 설정 가이드

## 🔥 Firebase 프로젝트 생성

### 1. Firebase Console 접속
1. https://console.firebase.google.com 접속
2. Google 계정으로 로그인
3. "프로젝트 추가" 클릭

### 2. 프로젝트 생성
1. **프로젝트 이름**: `hyeker-blog` (또는 원하는 이름)
2. **Google 애널리틱스**: 선택 사항 (나중에 추가 가능)
3. 프로젝트 생성 완료 대기

---

## 🔐 Authentication 설정

### 1. Authentication 활성화
1. Firebase Console → 좌측 메뉴 → **Authentication**
2. "시작하기" 클릭
3. **Sign-in method** 탭 클릭

### 2. 이메일/비밀번호 로그인 활성화
1. "이메일/비밀번호" 클릭
2. **사용 설정** 토글 ON
3. "저장" 클릭

### 3. Admin 계정 생성
1. **Users** 탭 클릭
2. "사용자 추가" 클릭
3. 입력:
   - **이메일**: `admin@hyeker.com` (또는 본인 이메일)
   - **비밀번호**: 강력한 비밀번호 (최소 6자)
4. "사용자 추가" 클릭

---

## 📁 Firestore Database 설정

### 1. Firestore 생성
1. Firebase Console → 좌측 메뉴 → **Firestore Database**
2. "데이터베이스 만들기" 클릭

### 2. 보안 규칙 선택
- **프로덕션 모드에서 시작** 선택 (보안 규칙은 나중에 설정)
- "다음" 클릭

### 3. Firestore 위치 선택
- **asia-northeast3 (Seoul)** 추천 (한국 사용자에게 가장 빠름)
- "사용 설정" 클릭
- 생성 완료 대기 (1-2분)

---

## 🖼️ Storage 설정

### 1. Storage 활성화
1. Firebase Console → 좌측 메뉴 → **Storage**
2. "시작하기" 클릭

### 2. 보안 규칙 선택
- **프로덕션 모드에서 시작** 선택
- "다음" 클릭

### 3. Storage 위치
- **asia-northeast3 (Seoul)** 선택
- "완료" 클릭

---

## 🔑 Firebase Config 복사

### 1. 웹 앱 추가
1. Firebase Console → 프로젝트 설정 (⚙️ 아이콘)
2. "내 앱" 섹션 → **웹 앱 추가** (</> 아이콘) 클릭
3. **앱 닉네임**: `Hyeker Blog Admin`
4. "Firebase Hosting 설정" 체크 해제
5. "앱 등록" 클릭

### 2. Firebase Config 복사
Firebase SDK 설정 화면에서 `firebaseConfig` 객체 복사:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "hyeker-blog.firebaseapp.com",
  projectId: "hyeker-blog",
  storageBucket: "hyeker-blog.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

### 3. `.env.local` 파일 생성
프로젝트 루트에 `.env.local` 파일 생성 후 다음 내용 추가:

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY="AIza..."
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="hyeker-blog.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="hyeker-blog"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="hyeker-blog.appspot.com"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="123456789"
NEXT_PUBLIC_FIREBASE_APP_ID="1:123456789:web:abcdef"
```

**중요**: `.env.local` 파일은 `.gitignore`에 이미 포함되어 있어 Git에 커밋되지 않습니다.

---

## 🔒 Firestore Security Rules 설정

### 1. Security Rules 탭 이동
1. Firestore Database → **규칙** 탭

### 2. 규칙 작성
다음 규칙을 복사하여 붙여넣기:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // 블로그 포스트: 모두 읽기 가능, Admin만 쓰기
    match /blog_posts/{postId} {
      allow read: if true;
      allow create, update, delete: if request.auth != null &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "admin";
    }

    // 포트폴리오: 모두 읽기 가능, Admin만 쓰기
    match /portfolio_items/{itemId} {
      allow read: if true;
      allow create, update, delete: if request.auth != null &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "admin";
    }

    // 사용자 정보: Admin만 접근
    match /users/{userId} {
      allow read, write: if request.auth != null &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "admin";
    }
  }
}
```

### 3. 게시 클릭

---

## 🖼️ Storage Security Rules 설정

### 1. Storage Rules 탭 이동
1. Storage → **Rules** 탭

### 2. 규칙 작성
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Admin만 이미지 업로드 가능
    match /blog/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    match /portfolio/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### 3. 게시 클릭

---

## 👤 Admin 권한 설정

### 1. Firestore에 users 컬렉션 생성
1. Firestore Database → **데이터** 탭
2. "컬렉션 시작" 클릭
3. **컬렉션 ID**: `users`
4. "다음" 클릭

### 2. Admin 사용자 문서 생성
1. **문서 ID**: Firebase Authentication에서 생성한 Admin의 UID
   - Authentication → Users 탭에서 Admin 계정의 UID 복사
2. 필드 추가:
   - **필드**: `email`, **값**: `admin@hyeker.com` (type: string)
   - **필드**: `name`, **값**: `장혜승` (type: string)
   - **필드**: `role`, **값**: `admin` (type: string)
   - **필드**: `createdAt`, **값**: 현재 시간 (type: timestamp)
3. "저장" 클릭

**팁**: UID를 찾는 방법
- Firebase Console → Authentication → Users 탭
- Admin 계정 클릭하면 "사용자 UID" 표시

---

## ✅ 설정 완료 체크리스트

- [ ] Firebase 프로젝트 생성
- [ ] Authentication 활성화 (Email/Password)
- [ ] Admin 계정 생성 (Authentication → Users)
- [ ] Firestore Database 생성 (asia-northeast3)
- [ ] Storage 활성화 (asia-northeast3)
- [ ] 웹 앱 추가 및 Firebase Config 복사
- [ ] `.env.local` 파일 생성 및 환경 변수 입력
- [ ] Firestore Security Rules 설정
- [ ] Storage Security Rules 설정
- [ ] Firestore `users` 컬렉션에 Admin 문서 생성

---

## 🚀 다음 단계

설정 완료 후:

1. 터미널에서 개발 서버 재시작:
   ```bash
   npm run dev
   ```

2. Admin 로그인 테스트:
   - http://localhost:3000/admin/login 접속
   - Admin 계정으로 로그인

3. 문제 발생 시:
   - 브라우저 콘솔 확인 (F12)
   - Firebase Console에서 Authentication 활동 확인
   - `.env.local` 환경 변수 재확인

---

## 📞 트러블슈팅

### 로그인이 안 될 때
- Firebase Console → Authentication → Users에서 계정 존재 확인
- `.env.local` 환경 변수 확인
- 개발 서버 재시작

### "Permission denied" 오류
- Firestore/Storage Security Rules 확인
- `users` 컬렉션에 `role: "admin"` 문서 존재 확인
- UID가 정확히 일치하는지 확인

### 이미지 업로드 실패
- Storage Rules 확인
- Storage Bucket 이름 확인 (`.env.local`)
- 네트워크 연결 확인

---

**마지막 업데이트**: 2025-11-19
