import React from "react";

export default function Logo({className}: Readonly<{className: string}>){
    let svg =
        <a href="/" className={className}>
            <svg viewBox="0 0 113 141" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M68.5248 77.3213H107V86.7037C107 94.2045 105.737 101.255 103.185 107.828C100.69 114.384 97.0955 120.167 92.4016 125.151C87.6906 130.152 82.0731 134.043 75.5814 136.823C69.0409 139.624 61.8543 141 54.0645 141C46.0372 141 38.6577 139.628 31.9698 136.833L31.9562 136.828L31.9426 136.822C25.3571 133.994 19.6448 130.057 14.8364 125.012C10.0385 119.978 6.36388 114.141 3.81539 107.528L3.81247 107.52C1.2631 100.851 0 93.7268 0 86.1744C0 78.8707 0.832393 70.2355 3.43597 63.4763C5.98337 56.8134 9.65885 50.9715 14.4641 45.9818C19.2741 40.9365 24.9893 37.0245 31.5784 34.2479C34.9752 32.8015 35.7637 32.2911 39.4872 31.5853V34.9192C36.1751 35.5862 35.7786 35.7536 32.7623 37.0384C26.5402 39.6596 21.1711 43.3394 16.6551 48.0778C12.1391 52.7658 8.67677 58.2603 6.26822 64.5614C3.85967 70.812 3.03332 79.0164 3.03332 86.1744C3.03332 93.3828 4.23759 100.138 6.64614 106.439C9.05469 112.689 12.517 118.184 17.033 122.922C21.5491 127.661 26.9181 131.366 33.1402 134.037C39.4125 136.659 46.3872 137.969 54.0645 137.969C61.4909 137.969 68.2649 136.659 74.3866 134.037C80.5084 131.416 85.7771 127.761 90.1928 123.073C94.6084 118.385 97.9955 112.941 100.354 106.741C102.762 100.541 103.967 93.8617 103.967 86.7037V80.3522H69.5387L46.613 97.5919H78.6016C78.5091 98.6331 78.3483 99.6434 78.1192 100.623C77.7273 102.299 77.1354 103.885 76.3436 105.38C75.1393 107.699 73.4584 109.715 71.3007 111.429C69.1932 113.143 66.6843 114.454 63.774 115.361C60.8636 116.268 57.6271 116.722 54.0645 116.722C50.0001 116.722 46.2618 115.941 42.8497 114.378C39.4878 112.765 36.5774 110.547 34.1187 107.724C31.66 104.901 29.7532 101.65 28.3984 97.97C27.0937 94.2902 26.4414 90.3583 26.4414 86.1744C26.4414 82.0409 26.7158 76.6342 28.0204 72.9544C29.3753 69.2242 31.282 65.9728 33.7408 63.2004C36.1372 60.449 36.8394 59.2529 40.0939 57.6508V61.2879C37.7613 62.6213 37.8254 63.1276 36.0289 65.1901L36.02 65.2003L36.011 65.2105C33.8258 67.6745 32.1094 70.5849 30.8759 73.9771C29.7668 77.1146 29.4747 82.0386 29.4747 86.1744C29.4747 90.0317 30.0741 93.6133 31.2515 96.9407C32.4847 100.284 34.2053 103.207 36.4068 105.734C38.5896 108.24 41.1604 110.201 44.1381 111.634C47.1152 112.993 50.4097 113.691 54.0645 113.691C57.3711 113.691 60.2971 113.27 62.8705 112.468C65.457 111.661 67.6123 110.521 69.3859 109.078L69.3995 109.067L69.4131 109.057C71.2552 107.593 72.6541 105.904 73.6512 103.984L73.6568 103.973L73.6624 103.963C74.22 102.91 74.6632 101.798 74.9893 100.623H37.5381L68.5248 77.3213ZM66.7871 57.1577H87.0456L106.203 30H66.7871V33.0309H100.354L85.4725 54.1268H66.7871V57.1577Z"/>
                    <path d="M41 1.5H39.5072L39.5 2.99279L39.07 92.4928L39.0555 95.5128L41.4706 93.6995L66.3506 75.0195L66.95 74.5695V73.82V48.1219V39.0969V30.0718V22.8795H107H109.697L108.274 20.5885L96.866 2.20893L96.426 1.5H95.5916H41Z" strokeWidth="3"/>
            </svg>
        </a>

    return (svg);
}