document.addEventListener('DOMContentLoaded', () => {
    class Producte {
        constructor(descripcio, preu, quantitat) {
            // Inicialitza les propietats del producte amb els valors proporcionats            
            this.quantitat = parseInt(quantitat);
            this.descripcio = descripcio;
            this.preu = parseFloat(preu);
        }

        calculaSubtotal() {
            // Calcula el subtotal multiplicant el preu per la quantitat
            return this.preu * this.quantitat;
        }

        generaHTML() {
            // Crea una fila de taula HTML per representar el producte
            let fila = document.createElement('tr');

            // Crea i afegeix la celda de descripció, preu, quantitat i subtotal
            let celdaDescripcio = document.createElement('td');
            celdaDescripcio.textContent = this.descripcio;
            fila.appendChild(celdaDescripcio);

            let celdaPreu = document.createElement('td');
            celdaPreu.textContent = this.preu.toFixed(2) + ' €';
            fila.appendChild(celdaPreu);

            let celdaQuantitat = document.createElement('td');
            celdaQuantitat.textContent = this.quantitat;
            fila.appendChild(celdaQuantitat);

            let celdaSubtotal = document.createElement('td');
            celdaSubtotal.textContent = this.calculaSubtotal().toFixed(2) + ' €';
            fila.appendChild(celdaSubtotal);

            return fila;
        }

        toString() {
            // Retorna una representació en text del producte
            return this.descripcio + " - " + this.preu + "€";
        }
    }

    class Cistella {
        constructor() {
            // Inicialitza la llista de productes buida
            this.productes = [];
        }

        afegirProducte(producte) {
            // Afegeix el producte a la llista de productes
            this.productes.push(producte);
            // Actualitza el total de la cistella
            this.actualitzaTotal();
            // Mostra el producte afegit a la taula HTML
            this.mostraProducteHTML(producte);
        }

        actualitzaTotal() {
            // Calcula el total sumant els subtotals de tots els productes
            let total = 0;
            for (let producte of this.productes) {
                total += producte.calculaSubtotal();
            }
            // Actualitza el text del total en l'element HTML amb id 'total'
            document.getElementById('total').textContent = total.toFixed(2) + ' €';
        }

        mostraProducteHTML(producte) {
            // Afegeix la representació HTML del producte a la taula
            let taula = document.querySelector('#taula tbody');
            if (taula) {
                taula.appendChild(producte.generaHTML());
            }
        }
    }

    // Afegeix un event listener al botó amb id 'afegir' per afegir un producte a la cistella
    document.getElementById('afegir').addEventListener('click', function () {
        // Obté els valors dels camps de descripció, preu i quantitat
        let descripcio = document.getElementById('desc').value;
        let preu = parseFloat(document.getElementById('preu').value);
        let quantitat = parseInt(document.getElementById('quantitat').value);

        // Comprova que els camps no estiguin buits
        if (descripcio && !isNaN(preu) && !isNaN(quantitat)) {
            // Crea un nou producte i l'afegeix a la cistella
            let producte = new Producte(descripcio, preu, quantitat);
            cistella.afegirProducte(producte);
        } else {
            // Missatge d'alerta si algun camp és invàlid
            alert("Per favor, ompli tots els camps.");
        }
    });

    // Crea una nova instància de la cistella
    let cistella = new Cistella();
});