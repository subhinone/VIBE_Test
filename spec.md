# peTox spec

## 한 문장 정의
숏폼(틱톡·릴스·쇼츠) 과사용을 스스로 자각하고 줄이고 싶어하는 사용자에게, 목표 시간 초과 시 화면에 커지는 캐릭터 오버레이 + 햅틱으로 시청을 물리적으로 불편하게 만들고, 캐릭터 육성이라는 재미 요소로 절제를 지속하게 만든다.

## 화면
- 온보딩 권한요청 화면 — 사용자가 사용시간 접근·오버레이 권한을 허용한다
- 온보딩 목표설정 화면 — 사용자가 하루 목표 사용시간과 감지 앱을 정한다
- 홈 대시보드 — 사용자가 오늘 사용시간과 목표 대비 진행률을 확인한다
- 오버레이 화면 — 목표를 넘긴 사용자가 화면 위에 뜬 캐릭터를 본다

## 데이터
- profiles — user_id, daily_goal_minutes, focus_start_time, focus_end_time, bedtime
- detected_apps / user_detected_apps — user_id, app_package_name, is_enabled
- daily_usage — user_id, app_package_name, log_date, duration_seconds
- pets — user_id, character_type, level

## 오늘 만들 기능 3개
1. Android 네이티브 모듈로 사용시간 감지 권한을 요청하고 실제 앱 사용시간 1건을 로그로 남긴다
2. Android 네이티브 모듈로 화면 위에 오버레이 캐릭터를 띄운다
3. 온보딩에서 목표 시간을 입력받아 BE profiles API로 저장한다

## 오늘 안 만들 것
- 캐릭터 단계적 확대 애니메이션과 햅틱 강도 조절
- 반려동물 사진 픽셀 캐릭터 변환
- 숏폼 화면 단위 정밀 판별(shorts_classifier.tflite 연동)
- 미션 시스템 연동
- 주간 리포트 화면
- 상점/코인 화면
- 설정 화면
