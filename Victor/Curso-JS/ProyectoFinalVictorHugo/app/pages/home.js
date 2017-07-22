class HomePage extends InnerPage {
    constructor() {
        super('Home', '/home.html', 'Home');

        this.homeApi = new HomeApi();
    }

    pintarSection(divContent) {
        let divRow = document.createElement("DIV");
        divRow.className = 'row';

        let htmlPresentacion = '';
        htmlPresentacion += '<div class="hero-unit homeBienvenida">';
        htmlPresentacion += '<h1>Bienvenidos a "Restaurante de Fran"</h1>';
        htmlPresentacion += '<p>El mejor servicio con la mejor atención y calidad.</p>';
        // htmlPresentacion += '<p><img src="./app/img/bob.jpg"></p>';
        htmlPresentacion += '</div>';

        let divCol = document.createElement("DIV");
        divCol.className = 'col-sm-12 col-md-12';

        let divRow2 = document.createElement("DIV");
        divRow2.className = 'row';
        let divCol2 = document.createElement("DIV");
        divCol2.className = 'col-sm-12 col-md-12';
        divCol2.innerHTML = htmlPresentacion;
        divRow2.appendChild(divCol2);

        let divRow3 = document.createElement("DIV");
        divRow3.className = 'row';

        let divCol3 = document.createElement("DIV");
        divCol3.className = 'col-sm-6 col-md-6';
        let divComidasGrafica = document.createElement("DIV");
        divComidasGrafica.id = "divComidasGrafica";
        divCol3.appendChild(divComidasGrafica);

        let divCol4 = document.createElement("DIV");
        divCol4.className = 'col-sm-6 col-md-6';
        let divBebidasGrafica = document.createElement("DIV");
        divBebidasGrafica.id = "divBebidasGrafica";
        divCol4.appendChild(divBebidasGrafica);

        divRow3.appendChild(divCol3);
        divRow3.appendChild(divCol4);

        divCol.appendChild(divRow2);
        divCol.appendChild(divRow3);


        divRow.appendChild(divCol);
        divContent.appendChild(divRow);
    }

    pintar(navBar) {
        this.pintarEstructura(navBar, this._name);

        // Pintamos pagina completa
        let divContent = document.querySelector('.divContent');
        this.pintarSection(divContent);

        Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function (color) {
            return {
                radialGradient: {
                    cx: 0.5,
                    cy: 0.3,
                    r: 0.7
                },
                stops: [
                    [0, color],
                    [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
                ]
            };
        });

        this.homeApi.gtC('divComidasGrafica');

        this.homeApi.gtB('divBebidasGrafica');

    }

}

class HomeApi {
    constructor() {
        this._apiComida = new ComidaApi();
        this._apiBebida = new BebidaApi();
    }

    gtC(divDestino) {
        let promise = this.graficaTiposComidas(divDestino).then(
            () => {
                // Utils._quitarModalLoading();
                return true;
            }
        )

        return promise;
    }

    graficaTiposComidas(divDestino) {
        let contEntrante = 0;
        let contPrincipal = 0;
        let contPostre = 0;

        this._apiComida.getComidasSinModal().then(
            (data) => {
                data.forEach((comida) => {
                    if (comida._tipo == "Entrante") {
                        contEntrante += 1;
                    } else if (comida._tipo == "Principal") {
                        contPrincipal += 1;
                    } else if (comida._tipo == "Postre") {
                        contPostre += 1;
                    }
                });

                let datos = [];

                datos.push({ name: 'Entrante', y: contEntrante });
                datos.push({ name: 'Principal', y: contPrincipal });
                datos.push({ name: 'Postre', y: contPostre });

                // Build the chart
                Highcharts.chart(divDestino, {
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                    },
                    title: {
                        text: 'Distribución de tipos de Comida.'
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                style: {
                                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                },
                                connectorColor: 'silver'
                            }
                        }
                    },
                    series: [{
                        name: 'Comidas',
                        data: datos
                    }]
                });
            }
        );
    }

    gtB(divDestino) {
        let promise = this.graficaTiposBebidas(divDestino).then(
            () => {
                // Utils._quitarModalLoading();
                return true;
            }
        )

        return promise;
    }

    graficaTiposBebidas(divDestino) {
        let contAlcoholica = 0;
        let contNoAlcoholica = 0;

        this._apiBebida.getBebidasSinModal().then(
            (data) => {
                data.forEach((bebida) => {
                    if (bebida.esAlcoholica == 'Si') {
                        contAlcoholica += 1;
                    } else if (bebida._esAlcoholica == 'No') {
                        contNoAlcoholica += 1;
                    }
                });

                let datos = [];

                datos.push({ name: 'Alcoholica', y: contAlcoholica });
                datos.push({ name: 'No alcoholica', y: contNoAlcoholica });

                // Build the chart
                Highcharts.chart(divDestino, {
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                    },
                    title: {
                        text: 'Distribución de tipos de Bebidas.'
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                style: {
                                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                },
                                connectorColor: 'silver'
                            }
                        }
                    },
                    series: [{
                        name: 'Bebidas',
                        data: datos
                    }]
                });
            }
        );
    }
}