(function() {

    var actualizarHora = function() {

        let fecha = new Date(),
            horas = fecha.getHours(),
            ampm,
            minutos = fecha.getMinutes(),
            segundos = fecha.getSeconds(),
            diaSemana = fecha.getDay(),
            dia = fecha.getDate(),
            mes = fecha.getMonth(),
            año = fecha.getFullYear();

        let pHoras = document.getElementById('horas'),
            pAMPM = document.getElementById('ampm'),
            pMinutos = document.getElementById('minutos'),
            pSegundos = document.getElementById('segundos'),
            pDiaSemana = document.getElementById('diaSemana'),
            pDia = document.getElementById('dia'),
            pMes = document.getElementById('mes'),
            pAño = document.getElementById('año');

        const semana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        pDiaSemana.textContent = semana[diaSemana];
        pDia.textContent = dia;

        const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        pMes.textContent = meses[mes];
        pAño.textContent = año;

        if (horas >= 12) {
            horas = horas - 12;
            ampm = 'PM';
        } else {
            ampm = 'AM';
        };

        if (horas == 0) {
            horas = 12;
        };

        pHoras.textContent = horas;
        pAMPM.textContent = ampm;

        if (minutos < 10) {
            minutos = '0' + minutos;
        };

        if (segundos < 10) {
            segundos = '0' + segundos;
        }

        pMinutos.textContent = minutos;
        pSegundos.textContent = segundos;

    };

    actualizarHora();
    setInterval(actualizarHora, 1000);

}())