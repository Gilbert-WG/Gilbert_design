# Gilbert_design — 보고 슬라이드 디자인·작문 참고 저장소

외부 AI 어시스턴트(예: MS Copilot)가 **HTML 슬라이드·PPT를 만들 때 참고할 디자인 규격·CSS·말투·작성 지침**을 모아둔 공개용 저장소입니다.

- **골격(디자인)은 고정** — CSS·동작 스크립트·DOM 구조는 그대로 복사해 씁니다.
- **본문 내용은 자율** — 무엇을 담을지는 주제에 맞게 자유롭게 구성합니다.
- **회사·조직·기밀 정보 없음** — 특정 회사명·팀명·거점명·내부 수치는 모두 제외했습니다. 실제 값은 사용 시 작성자가 자신의 맥락에서 채웁니다.

## 이 저장소를 쓰는 법 (AI·사람 공통)

1. 먼저 [`AI-USAGE.md`](AI-USAGE.md)를 읽어 **고정 영역 / 자율 영역 / 넣지 말아야 할 것**을 파악합니다.
2. 슬라이드를 만들 땐 [`design-guide/slide-html-guide.md`](design-guide/slide-html-guide.md)의 규칙을 따릅니다.
3. 골격은 [`design-guide/css/slide-base.css`](design-guide/css/slide-base.css) + [`design-guide/script/slide-nav.js`](design-guide/script/slide-nav.js)를 **그대로** 복사합니다.
4. 말투·문장 구성은 [`tone-and-voice/writing-style.md`](tone-and-voice/writing-style.md)를 참고합니다.
5. 시작점이 필요하면 [`design-guide/templates/`](design-guide/templates/)의 빈 골격이나 [`examples/`](examples/)의 완성 예시를 복사해 내용만 교체합니다.

## 폴더 구조

```
Gilbert_design/
├─ README.md                         이 파일
├─ AI-USAGE.md                       외부 AI가 지킬 범위(고정/자율/금지) 안내
├─ design-guide/
│  ├─ slide-html-guide.md            ★ 핵심 지침(디자인 잠금 + 작성 규칙, 범용판 v2.7)
│  ├─ css/slide-base.css             디자인 잠금 CSS (그대로 복사)
│  ├─ script/slide-nav.js            면 이동·전체화면 동작 스크립트 (그대로 복사)
│  └─ templates/
│     ├─ single-slide.html           단일 면 빈 골격
│     └─ deck-multi.html             다중 면(덱) 빈 골격
├─ tone-and-voice/
│  └─ writing-style.md               말투·어투·컨설턴트 문장 패턴
└─ examples/
   └─ example-generic.html           가상 주제로 채운 완성 예시(참고용)
```

## 디자인 규격 요약

- 화면: 16:9 고정 **1280×720**, self-contained HTML (외부 CSS/JS/폰트/이미지 금지).
- 폰트: `Malgun Gothic`(맑은 고딕) 계열. 강조색: 파랑 `#0000FF`, 포인트 `#376092` / 보조 `#DCE6F2`.
- 레이아웃: 제목 → 상단 룰 → 거버닝(`□`) → 부연(`-`) → 본문 **좌우 2단 패널** → 하단 footer.
- 말투: 개조식·명사형, 결론 선행, 구어체·이모지 금지. "So-what(그래서 무엇)"으로 맺기.

## 라이선스 / 사용 범위

이 저장소의 목적은 **디자인·작문 참고**입니다. 골격(CSS·스크립트)과 지침 텍스트는 자유롭게 참고·복사해 슬라이드를 만드는 데 사용할 수 있습니다. 별도 라이선스 파일이 없다면 저장소 소유자에게 사용 범위를 확인하세요.

> 주의: 이 저장소에는 어떤 회사·조직의 기밀·내부 데이터도 넣지 않습니다. 기여·수정 시에도 동일 원칙을 지켜주세요([`AI-USAGE.md`](AI-USAGE.md) 참고).
