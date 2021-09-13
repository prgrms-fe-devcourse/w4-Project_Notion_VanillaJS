import { createElement } from '../utils/DOM.js';

export default function KeywordList({ $target, initialState }) {
    const $keywordList = createElement('div');
    $keywordList.setAttribute('class', 'keywords-container');

    this.state = initialState;

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };

    this.render = () => {
        const { keywords } = this.state;
        $keywordList.innerHTML = `
      ${
          keywords.length
              ? keywords.map((keyword) => `<div class='item'>${keyword}</div>`).join('') +
                `<button class="expand">확장</button><button class="collapse">최소화</button>`
              : `<div class="keyword-temp">등록된 자동완성 키워드가 없습니다</div>`
      }
    `;
    };

    this.render();
    $target.appendChild($keywordList);

    $keywordList.addEventListener('click', (e) => {
        $keywordList.classList.toggle('wrapped-container');
        const $expandBtn = $keywordList.querySelector('.expand');
        const $collapseBtn = $keywordList.querySelector('.collapse');
        $expandBtn.classList.toggle('wrapped-expand');
        $collapseBtn.classList.toggle('wrapped-collapse');
    });
}
