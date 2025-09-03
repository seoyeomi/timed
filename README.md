# Timed - Desktop Application (by Electron)

데스크톱에서 Timer와 D-day 기능을 구현한 앱입니다.

# 초기 화면

초기 화면은 Timer를 보여줍니다.
상단의 menu에서 Timer, D-day와 관련한 기능을 확인할 수 있습니다.

# 작동 방법

터미널에서
` npm run start`
입력

# 파일 설명

## 1. main.js

메뉴 구성, 창 관리, 앱의 전역 데이터(총 타이머 시간, D-day 목록)를 관리하는 control tower 역할을 합니다.

## 2. renderer.js

메인화면(index.js)의 동작을 담당하고, main.js와 통신하여 데이터를 주고받습니다.

## 3. total-time.html & total-time.js

누적 시간을 보여주는 새로운 window와 그에 대한 script입니다.
