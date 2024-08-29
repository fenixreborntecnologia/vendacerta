document.querySelectorAll(".button").forEach(btn => {
    btn.addEventListener('mousemove', function(e) {
        var rect = btn.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;

        btn.style.setProperty('--eixoX', x + 'px');
        btn.style.setProperty('--eixoY', y + 'px');
    });
});

var msgCookies = document.getElementById('cookies-msg')

function aceito(){
    localStorage.lgpd = "sim"
    msgCookies.classList.remove('mostrar')
}

if(localStorage.lgpd == 'sim'){
    msgCookies.classList.remove('mostrar')
}

else{
    msgCookies.classList.add('mostrar')
}