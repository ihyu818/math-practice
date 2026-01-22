// game-config.js
const GAME_CONFIG = {
    addsub: {
        id: 'addsub',
        url: 'addsub.html',
        symbol: '±',
        bgColor: '#bfdbfe',
        textColor: '#1e40af',
        shadow: 'rgba(30, 64, 175, 0.3)',
        fontSize: 'clamp(3.5rem, 14vw, 5rem)'
    },
    directedangle: {
        id: 'directedangle',
        url: 'directedangle.html',
        // 直接存入 SVG，確保兩端渲染一致
        symbol: `<svg width="70" height="70" viewBox="0 0 100 100" style="margin:auto">
                    <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" stroke-width="6" />
                    <line x1="50" y1="50" x2="85" y2="15" stroke="currentColor" stroke-width="8" stroke-linecap="round" />
                    <circle cx="50" cy="50" r="4" fill="currentColor" />
                 </svg>`,
        bgColor: '#bbf7d0',
        textColor: '#166534',
        shadow: 'rgba(22, 101, 52, 0.3)',
        fontSize: '1rem' // SVG 不受此限
    },
    exponent: {
        id: 'exponent',
        url: 'exponent.html',
        symbol: `<span class="math-font" style="position: relative;">a<span style="font-size: 0.55em; position: absolute; top: -0.2em; left: 0.8em;">x</span></span>`,
        bgColor: '#fde68a',
        textColor: '#92400e',
        shadow: 'rgba(146, 64, 14, 0.3)',
        fontSize: 'clamp(3.5rem, 14vw, 5rem)'
    },
    factorization: {
        id: 'factorization',
        url: 'factorization.html',
        symbol: '( )( )',
        bgColor: '#fecdd3',
        textColor: '#9f1239',
        shadow: 'rgba(159, 18, 57, 0.3)',
        fontSize: 'clamp(2rem, 9.5vw, 3.2rem)'
    },
    completingsquare: {
        id: 'completingsquare',
        url: 'completingsquare.html',
        symbol: `<span class="math-font">(x±<span style="font-weight:bold; color:#1e40af">?</span>)²</span>`,
        bgColor: '#dbeafe',
        textColor: '#1e40af',
        shadow: 'rgba(30, 64, 175, 0.3)',
        fontSize: 'clamp(2rem, 9.5vw, 3.2rem)'
    },
    trigratio: {
        id: 'trigratio',
        url: 'trigratio.html',
        // 專業的分數排版
        symbol: `<div style="display:flex; flex-direction:column; align-items:center; line-height:1.1;">
                    <span>y</span>
                    <div style="height:3px; width:1.2em; background:currentColor; margin:2px 0;"></div>
                    <span>r</span>
                 </div>`,
        bgColor: '#ddd6fe',
        textColor: '#5b21b6',
        shadow: 'rgba(91, 33, 182, 0.3)',
        fontSize: 'clamp(2rem, 9.5vw, 3.2rem)'
    }
};
