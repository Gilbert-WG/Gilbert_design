# 고정형 16:9 보고 슬라이드 — Self-contained HTML 디자인 시스템

특정 기업과 무관한 범용 예시입니다. "한 슬라이드 = 한 메시지"로 넘겨보는 임원보고/사내공유용 보고 슬라이드를 순수 HTML(+inline CSS·JS, 외부 리소스 없음)로 만들기 위한 디자인 규격과 내용 작성 가이드를 담고 있습니다.

## 이 저장소의 파일

| 파일 | 역할 | 준수 강도 |
|---|---|---|
| [`INDEX.md`](./INDEX.md) | **에이전트가 가장 먼저 읽는 진입점** — 등록된 디자인 목록(지금은 `default` 1개, 향후 추가 가능) | 필수 진입점 |
| [`designs/default/DESIGN_SYSTEM.md`](./designs/default/DESIGN_SYSTEM.md) | CSS·DOM 골격·동작 스크립트 — 슬라이드의 "틀" (HTML 산출물용) | **불변** — 그대로 재사용, 재해석 금지 |
| [`designs/default/CONTENT_GUIDE.md`](./designs/default/CONTENT_GUIDE.md) | 내용(문장·구성)을 채우는 큰 틀과 원칙 | **참고** — 세부 표현은 작성 주체(사람/AI)의 판단에 위임 |
| [`POWERPOINT_TEMPLATE_GUIDE.md`](./POWERPOINT_TEMPLATE_GUIDE.md) | 같은 원칙을 실제 `.pptx`(슬라이드 마스터)로 구현하는 방법 + MS Copilot 사용 시 주의점 (모든 디자인 공통) | 참고 |
| [`COPILOT_AGENT_INSTRUCTIONS.md`](./COPILOT_AGENT_INSTRUCTIONS.md) | MS Copilot Studio 등 에이전트 빌더의 "Instructions" 칸에 붙여넣는 지침 원문 | 참고 |

여러 디자인을 쓰게 되면 `designs/<새 id>/` 폴더를 추가하고 `INDEX.md`에 항목만 추가합니다 — 기존 `default` 경로는 그대로 유지되므로 이미 이 구조를 쓰고 있는 에이전트는 영향받지 않습니다.

## 왜 이렇게 나뉘어 있나

슬라이드가 "안 깨지는 것"과 "내용이 좋은 것"은 서로 다른 문제입니다.

- **틀(DESIGN_SYSTEM)** 은 한 글자도 바꾸지 않아야 레이아웃이 보장됩니다. CSS 클래스 이름·DOM 중첩 구조·동작 스크립트를 임의로 변형하면 잘림·깨짐이 발생합니다.
- **내용(CONTENT_GUIDE)** 은 반대로, 규칙을 세세하게 강제할수록 오히려 기계적이고 뻣뻣한 글이 나옵니다. 충분히 능력 있는 작성 주체(사람이든 LLM이든)에게는 "무엇을 판단해야 하는가"라는 큰 틀만 주고, 표현은 맡기는 편이 결과가 낫습니다.

## 사용 방법 (사람 또는 AI 에이전트)

0. `INDEX.md`를 먼저 읽고 어떤 디자인을 쓸지 확인합니다(지정 안 하면 `default`).
1. 해당 디자인의 `DESIGN_SYSTEM.md`(예: `designs/default/DESIGN_SYSTEM.md`)의 CSS 전체와 동작 스크립트 전체를 그대로 복사해 각각 `<style>`, `<script>`에 넣습니다.
2. 같은 문서의 DOM 골격을 그대로 복사하고, 대괄호(`[ ]`)로 표시된 자리만 실제 내용으로 채웁니다. class 이름·중첩 구조는 바꾸지 않습니다.
3. 내용을 채울 때는 `CONTENT_GUIDE.md`의 원칙(결론 선행, 근거→판단, 글자수 한도, 표·차트·플로우를 적극 활용해 전달력 높이기)을 참고합니다. 문장 표현이나 구성 순서까지 이 문서가 강제하지는 않습니다.
4. 완성된 HTML은 그 자체로 브라우저에서 바로 열리는 완결 문서입니다(외부 CDN·원격 이미지 링크 없음 — 필요한 사진은 base64로 직접 포함 가능).
5. 실제 `.pptx` 파일이 필요하면 `POWERPOINT_TEMPLATE_GUIDE.md`를 참고해 슬라이드 마스터 기반 템플릿을 별도로 구성합니다(HTML 산출물과는 다른 경로).

MS Copilot Studio 등 에이전트 빌더에 이 저장소를 지식 소스로 연결할 때는 `COPILOT_AGENT_INSTRUCTIONS.md`를 그대로 가져다 씁니다.

## 라이선스

자유롭게 복사·수정·재배포해 사용하세요. 별도 표기가 없습니다.
