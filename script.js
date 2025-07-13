      // Cambio entre las pestañas
        function cambiarPestana(evt, nombrePestana) {
            // Escondemos todos los contenidos primero
            const contenidos = document.querySelectorAll(".contenido-pestana");
            contenidos.forEach(contenido => {
                contenido.classList.remove("activa");
            });

            // Quitamos el activo de todas las pestañas
            const pestanas = document.querySelectorAll(".pestana");
            pestanas.forEach(pestana => {
                pestana.classList.remove("activa");
            });

            // Mostramos el contenido de la pestaña clickeada
            document.getElementById(nombrePestana).classList.add("activa");
            evt.currentTarget.classList.add("activa");
            
            // Recalculamos por las dudas
            if (nombrePestana === 'retencion') {
                calcularRetencion();
            } else {
                calcularDiasSinServicio();
            }
        }

        // Le damos formato al número
        function formatearNumero(num) {
            // Redondeamos a 2 decimales
            num = Math.round(num * 100) / 100;
            
            // Lo pasamos a texto para ver si tiene decimales
            let textoNumero = num.toString();
            
            // Si no tiene punto, le agregamos .0
            if (textoNumero.indexOf('.') === -1) {
                textoNumero += '.0';
            }
            
            // Si tiene un solo decimal, le agregamos un 0 más
            const partes = textoNumero.split('.');
            if (partes[1].length === 1) {
                textoNumero += '0';
            }
            
            return textoNumero;
        }

        // Calculamos el ajuste por retención
        function calcularRetencion() {
            const saldo = parseFloat(document.getElementById('saldo-pendiente').value) || 0;
            const objetivo = parseFloat(document.getElementById('monto-objetivo').value) || 0;
            
            // Validación básica
            if (objetivo > saldo) {
                document.getElementById('resultado-retencion').textContent = "El monto objetivo tiene que ser menor al saldo";
                document.getElementById('resultado-retencion').style.color = 'var(--rojo)';
                return;
            }
            
            // Fórmula de calculo
            const ajuste = (saldo - objetivo) / 1.21;
            const resultado = formatearNumero(ajuste);
            
            // Mostramos el resultado
            document.getElementById('resultado-retencion').textContent = `$${resultado}`;
            document.getElementById('resultado-retencion').style.color = 'var(--verde)';
        }

        // Calculamos el ajuste por días sin servicio
        function calcularDiasSinServicio() {
            const precio = parseFloat(document.getElementById('precio-mensual').value) || 0;
            const dias = parseInt(document.getElementById('dias-sin-servicio').value) || 0;
            
            // Validamos que no pongan más de 30 días
            if (dias > 30) {
                document.getElementById('resultado-dias').textContent = "No puede ser más de 30 días";
                document.getElementById('resultado-dias').style.color = 'var(--rojo)';
                return;
            }
            
            // Fórmula de calculo días sin servicio
            const ajuste = (precio / 30) * dias / 1.21;
            const resultado = formatearNumero(ajuste);
            
            // Mostramos el resultado
            document.getElementById('resultado-dias').textContent = `$${resultado}`;
            document.getElementById('resultado-dias').style.color = 'var(--verde)';
        }

        // Función para copiar el resultado
        function copiarResultado(id) {
            const resultado = document.getElementById(id);
            const texto = resultado.textContent.replace('$', '').trim();
            
            // Usamos la API del portapapeles
            navigator.clipboard.writeText(texto).then(() => {
                // Cambiamos el botón para que se note que se copió
                const boton = document.querySelector(`button[onclick="copiarResultado('${id}')"]`);
                const textoOriginal = boton.innerHTML;
                boton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linecap="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg> Listo!';
                
                // Volvemos al texto original después de 2 segundos:D
                setTimeout(() => {
                    boton.innerHTML = textoOriginal;
                }, 2000);
            });
        }

        // Calculamos todo cuando carga la página
        window.onload = function() {
            calcularRetencion();
            calcularDiasSinServicio();
        };

//DIAS SIN SERVICIO//
function calcularDiasSinServicio() {
    const precioMensual = parseFloat(document.getElementById("precio-mensual").value);
    const diasSinServicio = parseInt(document.getElementById("dias").value);

    const resultadoElement = document.getElementById("resultado-dias");

    // Validación básica
    if (
        isNaN(precioMensual) ||
        isNaN(diasSinServicio) ||
        precioMensual <= 0 ||
        diasSinServicio <= 0 ||
        diasSinServicio > 30
    ) {
        resultadoElement.textContent = "$0.00";
        return;
    }

    // Cálculo del monto proporcional por día
    const montoPorDia = precioMensual / 30;

    // Cálculo del descuento total (base)
    const descuento = montoPorDia * diasSinServicio;

    // Aplicar el 21% al total
    const descuentoCon21 = descuento * 1.21;

    // Mostrar resultado con desglose
    resultadoElement.innerHTML = `
        Monto base: $${descuento.toFixed(2)}<br>
        Monto con 21%: <strong>$${descuentoCon21.toFixed(2)}</strong>
    `;
}

    




