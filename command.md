# CNU-FPL 자주 쓰는 명령어

## GitHub 저장 / 홈페이지 업데이트

git status
git add .
git commit -m "Update website"
git push origin main


## 홈페이지 로컬 실행

npm run dev
npm run dev -- --open

## 최종 빌드 확인

npm run build


## Publications 업데이트

npm run publications

## 홈페이지
https://rlalf33-sudo.github.io/JNU-FPL/?utm_source=chatgpt.com

## 뉴스 사진 업로드
https://app.pagescms.org/

## 사진 업로드 후에 수행
git add .
git commit -m "Refine News detail title"
git pull --rebase origin main
git push origin main
