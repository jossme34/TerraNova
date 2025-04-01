// Obtener datos de Odoo via JSON-RPC
async function fetchDatosOdoo() {
    const response = await fetch('http://localhost:8069/agricultura/historic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jsonrpc: "2.0", method: "call" })
    });
    return await response.json();
}

// Gráfico de Rendimiento Histórico
fetchDatosOdoo().then(data => {
    const ctx = document.getElementById('rendimientoChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.años,
            datasets: [{
                label: 'Rendimiento (ton/ha)',
                data: data.rendimientos,
                borderColor: '#2ecc71'
            }]
        }
    });
});

// Mapa de Riesgo Climático (Leaflet)
const map = L.map('mapaClimatico').setView([14.0818, -87.2068], 7); // Centro de Honduras
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// Función de Predicción
function predecirRendimiento() {
    const lluvia = document.getElementById('lluviaInput').value;
    const modelo = { a: 0.8, b: -0.2 }; // Coeficientes del modelo (ajustables)
    const rendimiento = (modelo.a * lluvia + modelo.b * 25).toFixed(2); // Temp. promedio: 25°C
    document.getElementById('resultado').innerHTML = 
        `<strong>Rendimiento Estimado:</strong> ${rendimiento} ton/ha`;
}