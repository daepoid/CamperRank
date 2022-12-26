# 개선
프로젝트 기간 이후 부족한 부분에 대한 개선을 위한 레포입니다.


# CamperRank

> *라이브 코딩 면접을 준비하는데 어려움이 있었습니다. <br/> 팀 단위로 진행되는 알고리즘 문제 풀이 대회를 준비하는데 어려움이 있었습니다. <br/> 그런 어려움을…*
<br/><br/>개발 기간: 2022.11.07 ~ 2022.12.16
> 
<br/>

# ✨프로젝트 소개


<img src="https://user-images.githubusercontent.com/46220202/207907303-39b20ea4-b9d5-4996-9d7f-643d852f0740.png" width="900" height="300"/>


코딩테스트 연습/학습 플랫폼 CamperRank 입니다!

팀 단위로 진행되는 코딩 테스트나 대회를 연습할 수 있습니다!

라이브 코딩을 연습해 볼 수 있습니다!

[https://www.camperrank.shop](https://www.camperrank.shop)


<br/>

# ⚒️개발환경 및 라이브러리

<br/>

<div align="center">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/>
  <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=Vite&logoColor=white"/>
  <img src="https://img.shields.io/badge/styled--components-DB7093?style=flat-square&logo=styled-components&logoColor=white"/><br>
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=flat-square&logo=NestJS&logoColor=white"/>
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=MySQL&logoColor=white"/>
  <img src="https://img.shields.io/badge/TypeORM-FF4716?style=flat-square&logo=%20Actions&logoColor=white"/><br>
  <img src="https://img.shields.io/badge/github action-2671E5?style=flat-square&logo=GitHub%20Actions&logoColor=white"/>
  <img src="https://img.shields.io/badge/Jest-C21325?style=flat-square&logo=Jest&logoColor=white"/>
  <img src="https://img.shields.io/badge/socket.io-010101?style=flat-square&logo=socket.io&logoColor=white">
  <img src="https://img.shields.io/badge/NGINX-009639?style=flat-square&logo=NGINX&logoColor=white">
  <img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=Docker&logoColor=white">
  <img src="https://img.shields.io/badge/NCloud-03C75A?style=flat-square&logo=Naver&logoColor=white">
</div>

<br/>
<br>

# 🎁로컬 구동 방법
```
git clone https://github.com/boostcampwm-2022/Web31-CamperRank.git
```
## 필요 파일
### backend/.env
```
# development
GRADING_SERVER_URL=http://localhost:4000/grade-server/v1/grading
MYSQL_DATABASE=camperRank
MYSQL_HOST=
MYSQL_PASSWORD=
MYSQL_PORT=3306
MYSQL_USERNAME=
SERVERLESS_GRADE_JAVASCRIPT=
SERVERLESS_GRADE_PYTHON=
JWT_SECRETKEY=
```
### frontend/.env
```
# development
VITE_CLIENT_URL="http://127.0.0.1:5173/"
VITE_SERVER_URL="http://127.0.0.1:3000/api"
VITE_SOCKET_SERVER_URL="ws://127.0.0.1:3333"
VITE_SOCKET_URL="ws://127.0.0.1:4444/"
```
## 구동 명령어
```
#각 디렉토리 공통
yarn install

cd backend
yarn start:dev

cd frontend
yarn dev

cd frontend
npx y-webrtc

cd socket
yarn dev

cd grading
yarn start
```

<br>

# 자세한 내용은 아래 링크로

[클릭](https://github.com/boostcampwm-2022/Web31-CamperRank)


