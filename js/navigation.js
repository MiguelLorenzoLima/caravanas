// Navegação centralizada (multi-page, sem router).
function navigateTo(page, params) {
    var base = window.location.pathname.indexOf('/pages/') !== -1 ? '' : 'pages/';
    var url = base + page;
    if (params) {
        var query = Object.keys(params)
            .map(function (k) { return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]); })
            .join('&');
        if (query) { url += '?' + query; }
    }
    window.location.href = url;
}

function goBack(fallback) {
    if (window.history.length > 1) { window.history.back(); }
    else { navigateTo(fallback || 'dashboard.html'); }
}

function rootNavigate(page) {
    window.location.href = page;
}
