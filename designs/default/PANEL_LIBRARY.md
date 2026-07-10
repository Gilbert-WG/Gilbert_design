# 본문 패널 확장 카탈로그 — 설계분석 + 컴포넌트 (실험적, 선택 사용)

이 문서는 `default` 디자인의 **확장**입니다. 새 디자인 id가 아닙니다 — `DESIGN_SYSTEM.md`(틀)는
한 글자도 바뀌지 않았고, 이 문서는 `.pbody`(패널 본문) 안에서 쓸 수 있는 **선택적** 구조 컴포넌트를
추가할 뿐입니다. `DESIGN_SYSTEM.md`·`CONTENT_GUIDE.md`만으로도 완결된 문서가 나옵니다 — 이 카탈로그는
"내용이 단조로워 보일 때" 참고하는 추가 도구 상자입니다.

**현재 상태: 실험적(experimental) 1차 배치.** 4개 컴포넌트만 실제 브라우저 렌더로 검증했습니다.
나머지는 §5 백로그에 후보로만 남겨뒀습니다 — 검증 전 컴포넌트를 실사용하지 마세요.

## 0. 왜 이 문서가 필요한가 — 설계/타당성 분석

### 질문: 본문 패널에 자유도를 더 줄 수 있는가?

**구조적으로는 이미 가능합니다.** `.pbody`는 `DESIGN_SYSTEM.md` §0부터 자유 컨테이너입니다 —
`.l1`/`.l2`/`.l3`/`.t`/`.chart`/`.flow`/`.img` 중 무엇을 얼마나 섞을지는 이미 작성자 판단입니다.
"자유도가 없다"는 체감은 실제로는 **컴포넌트 메뉴가 7종뿐**이라는 것이지, 구조가 막혀 있다는 뜻이
아닙니다. 그래서 이 작업의 진짜 질문은 "가능한가"가 아니라 **"메뉴를 몇 종 더 늘릴 것인가, 어떤
기준으로 고를 것인가"**입니다.

### 왜 "자유 CSS 저작"이 아니라 "고정 컴포넌트 메뉴 확장"인가

사용자가 원하는 자유도와 저사양 LLM 제약은 서로 충돌합니다 — 저사양 LLM은 그 자리에서 새로운 CSS를
안정적으로 설계하지 못합니다(중첩 구조 실수, 단위 누락, `overflow` 미고려로 잘림 발생). 이 문서는
그 충돌을 다음과 같이 해석해 풉니다:

> **자유도 = "더 큰 고정 블록 메뉴에서 골라 쓰기"**. 기존 표(`.t`)·차트(`.chart`)·플로우(`.flow`)와
> 정확히 같은 계약입니다 — CSS·DOM은 고정, `[ ]` 자리만 채움. 새 CSS를 그 자리에서 생성하지 않습니다.

### 후보 채택 기준 — 3개 게이트 (전부 통과해야 카탈로그에 들어감)

1. **Copy-paste 가능** — 고정 DOM+class 조합을 그대로 복사하고 `[ ]`만 채우면 끝. 저사양 LLM이
   새 CSS 값을 계산·창작하지 않아도 됨(색상표·간격·폰트크기 모두 고정값).
2. **PowerPoint 네이티브 도형으로 재현 가능** — 이 저장소는 HTML용(`DESIGN_SYSTEM.md`)과 실제
   `.pptx`용(`POWERPOINT_TEMPLATE_GUIDE.md`, 슬라이드 마스터+placeholder)이 **병렬로 존재하는 수작업
   가이드**이지 자동 변환기가 아닙니다(`README.md` §"왜 이렇게 나뉘어 있나" 참고). 즉 HTML에서만
   예쁘고 PowerPoint 도형으로 옮길 수 없는 컴포넌트는 두 산출물 간 괴리를 만듭니다 — 그라디언트·
   그림자·블러(글래스모피즘)·아이콘폰트·복잡한 다단 겹침은 이 게이트에서 탈락합니다.
3. **720px 고정 프레임 + `overflow:hidden` 안에서 크기가 예측 가능** — 컴포넌트마다 "항목 수 상한 /
   글자수 상한"이 명확해야 하고, 그 상한을 지키면 어떤 콘텐츠를 넣어도 패널을 못 벗어남을 렌더로
   확인합니다. 내용량에 따라 셀 크기가 재배치되는 레이아웃(bento grid 등)은 탈락합니다.

### PPTX 관계 — 명시적으로 답함

이번 확장은 "HTML→PPTX 자동 변환"을 만들지 않습니다(저장소에 그런 코드가 없고, 이번 범위도 아님).
대신 게이트 2를 강제해서, 사람이 `POWERPOINT_TEMPLATE_GUIDE.md`대로 슬라이드 마스터에 도형을 그릴 때
**이 카탈로그의 컴포넌트는 항상 PowerPoint 기본 도형 조합으로 옮길 수 있음**을 설계 단계에서 보장하는
방식입니다. 컴포넌트별 대응 도형은 §2 각 항목의 "PPT 대응"에 적어둡니다.

### 실측: 패널 안에서 실제로 쓸 수 있는 높이

계산이 아니라 렌더 후 실측했습니다(§4 방법 참고, Chrome headless + `getBoundingClientRect`류 측정).

| 레이아웃 | `.pbody` `clientHeight` | 컴포넌트가 실제 쓸 수 있는 콘텐츠 높이 |
|---|---|---|
| 2단/3단 기본형(`.panel`에 테두리·`ptitle` 있음, `.detail` 없음 기준) | 416px | 366px (상하 padding 24+26 제외) |
| 전체활용(`.body.free`, 테두리·`ptitle` 없음, `.detail` 없음 기준) | 514px | 514px (padding 0) |

위 수치는 `.detail`(선택 요소)이 없는 헤더 기준입니다 — `.detail`을 추가하면 본문 쪽 높이가
그만큼(대략 25px 안팎) 줄어듭니다. 아래 §2 컴포넌트는 모두 더 좁은 366px 기준에서, **권장 상한보다
더 많이 채운 스트레스 케이스**(KPI 4칸+텍스트 4줄, 매트릭스 4분면×2줄씩)로 검증했고 여유(약
130~150px)가 남았습니다 — `.detail` 유무에 따른 25px 정도는 이 여유 안에서 흡수됩니다.

**단, 아래 컴포넌트별 "용량 상한"은 실측한 한계치가 아니라 권장치입니다.** 글자수 상한(예:
콜아웃 줄당 34자, 타임라인 라벨 14자)은 렌더 테스트를 실제로 그 글자수까지 채워서 검증한 값이
아니라, 기존 `.l1`~`.l3`/`.ptitle` 글자수 한도(`CONTENT_GUIDE.md` §7)와 실제 검증한 항목
개수(타일 4개, 분면 4개 등)로부터 유추한 안전한 시작값입니다. 실사용 중 잘림이 보이면 더 보수적인
값으로 조정하세요 — 이 표는 "정답"이 아니라 "권장 출발점"입니다.

## 1. 이 카탈로그가 바꾸지 않는 것

- `DESIGN_SYSTEM.md`의 CSS·DOM·스크립트는 원문 그대로입니다. 이 문서의 CSS는 **추가분**이며 전부
  `.rpt` 스코프 아래에서 새 클래스 이름만 씁니다(기존 클래스 재정의 없음 — 충돌 검토는 §4 참고).
- "1요소=1줄", 글자수 한도, 날조 금지, 표/차트/플로우/이미지 "패널당 최대 1개" 같은 기존 규칙은
  아래 §3에서 신규 컴포넌트에도 그대로 확장 적용됩니다(예외를 만들지 않고 같은 틀에 편입).
- `.v` 클래스는 기존 `.col.v`/`.step.v`(강조)와 같은 의미로 신규 컴포넌트에도 재사용합니다 —
  새 강조 클래스를 만들지 않습니다.

## 2. 컴포넌트 카탈로그 (검증 완료 4종)

### 2-1. KPI 타일 (`.kpi`) — 핵심 지표 2~4개를 숫자로 강조

**언제**: 비교보다 "지금 이 숫자가 핵심"일 때. 표(`.t`)가 항목×값의 나열이라면, KPI 타일은 그중
1~4개만 뽑아 크게 보여줌.
**용량 상한**: 타일 2~4개. `.num` 8자 이내(예: "67.4%", "1.8배", "1,204억"). `.lbl` 10자 이내.
강조 타일(`.item.v`)은 0~1개만.
**PPT 대응**: 테두리 있는 사각형 도형 N개를 가로로 균등 배치 + 그 안에 텍스트박스 2개(숫자/라벨).

```css
.rpt .kpi{display:flex;gap:14px;margin-top:14px}
.rpt .kpi .item{flex:1;border:1px solid #ccc;padding:14px 10px;text-align:center}
.rpt .kpi .item.v{border-color:#376092;background:#EEF2F7}
.rpt .kpi .num{font-size:28px;font-weight:700;color:#000;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.rpt .kpi .item.v .num{color:#376092}
.rpt .kpi .lbl{font-size:13px;color:#666;margin-top:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
```

```html
<div class="kpi">
  <div class="item v"><div class="num">[67.4%]</div><div class="lbl">[가동률(전사)]</div></div>
  <div class="item"><div class="num">[42.0%]</div><div class="lbl">[전년 동기]</div></div>
  <div class="item"><div class="num">[1.8배]</div><div class="lbl">[업계 평균 대비]</div></div>
</div>
```

### 2-2. 콜아웃 박스 (`.callout`) — 핵심 메시지 1~2줄 강조

**분류**: 시각화가 아니라 **텍스트 계층**입니다(§3 참고) — `.l1`처럼 자유롭게 쓰되, 패널당 시각화
1개 상한과는 별도로 셉니다.
**언제**: 패널 본문 중 한 문장을 인용·강조하고 싶을 때(패널의 결론 요약, 인용구 등).
**용량 상한**: `.txt` 최대 2줄, 줄당 34자 이내.
**PPT 대응**: 왼쪽에 굵은 세로선(좁은 사각형)을 붙인 사각형 도형 안에 텍스트박스 1개.

```css
.rpt .callout{display:flex;margin-top:14px;background:#F5F8FC}
.rpt .callout .stripe{width:4px;background:#376092;flex-shrink:0}
.rpt .callout .txt{padding:10px 14px;font-size:15px;font-weight:700;color:#000}
```

```html
<div class="callout"><div class="stripe"></div><div class="txt">[핵심 메시지 한 줄]</div></div>
```

### 2-3. 2×2 매트릭스 (`.matrix`) — 두 기준으로 항목 분류

**언제**: 영향도×시급성, 실행난이도×효과처럼 두 축으로 항목을 나눠 우선순위를 보여줄 때.
**용량 상한**: 4분면 고정. 분면당 `.qh`(분면 제목) 10자 이내 + `.qi`(항목) 최대 2줄, 줄당 16자 이내.
강조 분면(`.quad.v`)은 0~1개만.
**PPT 대응**: 2행×2열 표, 또는 십자선 도형 2개 + 사각형 4개 조합.

```css
.rpt .matrix{margin-top:14px}
.rpt .matrix .row{display:flex;gap:8px}
.rpt .matrix .row+.row{margin-top:8px}
.rpt .matrix .quad{flex:1;border:1px solid #ccc;padding:8px 10px;min-height:70px}
.rpt .matrix .quad.v{background:#EEF2F7;border-color:#376092}
.rpt .matrix .qh{font-size:13px;font-weight:700;color:#000;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.rpt .matrix .qi{font-size:12px;color:#000;margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
```

```html
<div class="matrix">
  <div class="row">
    <div class="quad v"><div class="qh">[사분면1]</div><div class="qi">· [항목]</div></div>
    <div class="quad"><div class="qh">[사분면2]</div><div class="qi">· [항목]</div></div>
  </div>
  <div class="row">
    <div class="quad"><div class="qh">[사분면3]</div><div class="qi">· [항목]</div></div>
    <div class="quad"><div class="qh">[사분면4]</div><div class="qi">· [항목]</div></div>
  </div>
</div>
```

### 2-4. 마일스톤 타임라인 (`.tl`) — 일정·로드맵

**언제**: `.flow`(단계/절차, 시간 축 없음)와 달리 **날짜가 붙는** 일정을 보여줄 때. 절차 자체가
핵심이면 `.flow`를, 시점이 핵심이면 `.tl`을 씁니다(둘을 같은 패널에 같이 쓰지 않음 — §3의 "패널당
시각화 1개" 적용).
**용량 상한**: 지점 3~5개. `.date` 8자 이내, `.lbl` 14자 이내 각 1줄. 강조 지점(`.pt.v`)은 0~1개.
**PPT 대응**: SmartArt "기본 타임라인" 또는 가로선 도형 1개 + 원(점) 도형 N개 + 텍스트박스 조합.

```css
.rpt .tl{display:flex;align-items:flex-start;margin-top:26px;position:relative}
.rpt .tl::before{content:"";position:absolute;left:0;right:0;top:34px;height:2px;background:#ccc}
.rpt .tl .pt{flex:1;position:relative;text-align:center;z-index:1}
.rpt .tl .date{font-size:11px;color:#666;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.rpt .tl .dot{width:12px;height:12px;border-radius:50%;background:#DCE6F2;border:2px solid #376092;margin:4px auto}
.rpt .tl .pt.v .dot{background:#376092}
.rpt .tl .lbl{font-size:12px;color:#000;margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
```

```html
<div class="tl">
  <div class="pt v"><div class="date">[2026.01]</div><div class="dot"></div><div class="lbl">[1단계 착수]</div></div>
  <div class="pt"><div class="date">[2026.06]</div><div class="dot"></div><div class="lbl">[2단계 확대]</div></div>
  <div class="pt"><div class="date">[2026.12]</div><div class="dot"></div><div class="lbl">[3단계 완료]</div></div>
</div>
```

## 3. 규칙 통합 — 기존 규칙이 신규 컴포넌트에 어떻게 적용되는가

- **텍스트 계층** (개수 제한 없음, 분량 원칙만 준수): `.l1`/`.l2`/`.l3`(기존) + `.callout`(신규).
- **시각화 계층** (패널당 **최대 1개**, `DESIGN_SYSTEM.md` §4 규칙 그대로 확장):
  `.t`/`.chart`/`.flow`/`.img`(기존) + `.kpi`/`.matrix`/`.tl`(신규) — 이 7종 중 하나만 고릅니다.
- 따라서 한 패널에 "텍스트 계층 1개(`.l1` 등, 또는 `.callout`) + 시각화 계층 1개"까지가 표준
  조합입니다. §0 실측 스트레스 테스트도 이 조합(콜아웃 1 + 매트릭스 1)으로 검증했습니다.
- 클래스 충돌 검토: 신규 클래스(`kpi`/`item`/`lbl`/`callout`/`stripe`/`matrix`/`row`/`quad`/`qh`/
  `qi`/`tl`/`pt`/`date`/`dot`)는 기존 클래스와 이름이 겹치지 않습니다. `.v`는 기존 `.col.v`/
  `.step.v`(강조)와 같은 의미로 재사용했습니다. **`.num`은 재사용하지 않고 별도 규칙으로
  분리했습니다** — 기존 `.rpt .num{text-align:right}`(표 숫자 셀 전용, 우측정렬)과 KPI 타일의
  숫자(가운데 정렬)는 정렬 의미가 반대라, `.rpt .kpi .num`에 `text-align:center`를 명시로 넣어
  더 높은 특이도로 덮어씁니다(선택자 특이도상 항상 이깁니다). 클래스명은 같지만 규칙은 분리돼
  있다는 점에 주의 — `DESIGN_SYSTEM.md`에 최종 병합할 때 이 분리를 유지해야 합니다.

## 4. 검증 방법 (재현 가능)

Chrome headless로 1280×720 프레임 안에 각 컴포넌트를 권장 상한 및 스트레스 상한(그 이상)으로 채운
샘플을 렌더하고, `.pbody.scrollHeight > .pbody.clientHeight` 오버플로 여부를 JS로 측정:

```
chrome.exe --headless=new --disable-gpu --screenshot=out.png --window-size=1400,1600 file:///sample.html
```

결과: 기본형(2패널) `.pbody`에서 KPI 4칸+텍스트 4줄, 콜아웃+매트릭스(4분면×2줄) 동시 배치 모두
`scrollHeight == clientHeight`(오버플로 없음), 전체활용(free) `.pbody`에서 타임라인 5지점 모두
오버플로 없음. 스크린샷 육안 확인으로 `.footer` 침범·요소 겹침 없음도 확인.

## 5. 백로그 — 2차 배치 후보 (미검증, 아직 쓰지 말 것)

리서치 단계에서 3게이트를 통과한다고 판단했지만 아직 렌더 검증하지 않은 후보입니다(§0의 "실험적
1차 배치" 원칙에 따라 검증 전까지 카탈로그에 넣지 않음):

- **랭킹 바 리스트** — 항목 간 순위/비중을 가로 막대로. `.chart`(세로 막대)와 겹치지 않는 가로형.
- **진행률 바** — 목표 대비 달성률(트랙+채움 막대, 겹침 1단계라 PPT 사각형 겹치기로 재현 가능).
- **AS-IS/TO-BE 비교** — 전-후 단일 축 비교(좌우 박스 2개 + 중앙 화살표 도형).
- **기호 불릿 리스트** — 아이콘폰트 대신 유니코드 기호(▲▼●■)로 강조한 우선순위형 리스트.

탈락 후보(게이트 미통과, 채택 안 함): 글래스모피즘 카드(게이트2, blur 없음), bento grid(게이트3,
내용량 따라 셀 재배치), 애니메이션 게이지/도넛(게이트1·3, 정적 렌더 전제 위반), 아이콘폰트
리스트(게이트1·2, 외부 폰트 의존), 다단 겹침 카드 스택(게이트2·3, 겹침 순서 변경 시 높이 예측 불가).

## 6. 로드맵 — 최종적으로는 하나로 합침

지금은 검토·조사 편의를 위해 `DESIGN_SYSTEM.md`(불변 틀)와 분리된 파일로 둡니다. 이 카탈로그가
충분히 쓰이고 안정화되면:

1. 검증된 컴포넌트의 CSS를 `DESIGN_SYSTEM.md` §2 CSS 블록에 병합(그러면 이 파일은 없어짐).
2. 사용 원칙(텍스트 계층/시각화 계층 구분, 언제 어떤 컴포넌트를 쓰는지)은 `CONTENT_GUIDE.md`에 병합.
3. 최종 목표대로 "하나의 지침 + 하나의 CSS"로 저사양 LLM에 그대로 넘길 수 있는 상태로 수렴.

그 전까지는 이 파일을 `default` 디자인을 쓸 때 **선택적으로** 참고하는 확장 카탈로그로 취급합니다.
