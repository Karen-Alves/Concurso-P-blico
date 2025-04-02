document.addEventListener("DOMContentLoaded", () => {
    const categorias = [
        "orcamento", "gestao", "admFin", "direitoPenal",
        "processualPenal", "dignitarios", "segurancaOrganica", "legislacao"
    ];
    const tempos = {};
    const intervalos = {};
    let tempoTotal = 0;
    
    categorias.forEach(categoria => {
        tempos[categoria] = 0;
    });
    
    function atualizarDisplay() {
        categorias.forEach(categoria => {
            document.getElementById(`tempo${capitalize(categoria)}`).innerText = formatarTempo(tempos[categoria]);
        });
        document.getElementById("tempoTotal").innerText = formatarTempo(tempoTotal);
        atualizarGrafico();
    }
    
    function iniciarPausar(categoria) {
        if (intervalos[categoria]) {
            clearInterval(intervalos[categoria]);
            intervalos[categoria] = null;
        } else {
            intervalos[categoria] = setInterval(() => {
                tempos[categoria]++;
                tempoTotal++;
                atualizarDisplay();
            }, 1000);
        }
    }
    
    function zerarTempo() {
        categorias.forEach(categoria => {
            tempos[categoria] = 0;
            if (intervalos[categoria]) {
                clearInterval(intervalos[categoria]);
                intervalos[categoria] = null;
            }
        });
        tempoTotal = 0;
        atualizarDisplay();
    }
    
    function formatarTempo(segundos) {
        const h = Math.floor(segundos / 3600).toString().padStart(2, '0');
        const m = Math.floor((segundos % 3600) / 60).toString().padStart(2, '0');
        const s = (segundos % 60).toString().padStart(2, '0');
        return `${h}:${m}:${s}`;
    }
    
    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    
    function atualizarGrafico() {
        const ctx = document.getElementById("graficoEstudos").getContext("2d");
        if (window.grafico) window.grafico.destroy();
        window.grafico = new Chart(ctx, {
            type: "bar",
            data: {
                labels: categorias.map(capitalize),
                datasets: [{
                    label: "Tempo de Estudo (segundos)",
                    data: categorias.map(categoria => tempos[categoria]),
                    backgroundColor: "rgba(75, 192, 192, 0.6)"
                }]
            }
        });
    }

    categorias.forEach(categoria => {
        document.getElementById(`btn${capitalize(categoria)}`).addEventListener("click", () => iniciarPausar(categoria));
    });

    document.getElementById("zerar").addEventListener("click", zerarTempo);
    atualizarDisplay();
});