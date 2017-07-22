class Inicio extends InnerPagina {
    constructor(nombre, ruta, app, contexto) {
        super(nombre, ruta, app, contexto);
        this._comidaApi = new ComidasApi();
        this._bebidaApi = new BebidasApi();
        this.processed_json = [];
        this.nameJson = [];
    }
    pinta() {
        this.pintaEstructuraBasePagina();
        this.pintaContexto();
        this.pintarEstructuraComida();

        this.obtenerComida();
        this.obtenerBebida();
        //this.obtenerBebida() 

    }

    obtenerComida() {

        return this._comidaApi.getComidaByUrl().then((data) => {

            for (let com = 0; com < data.length; com++) {

                this.processed_json.push([data[com]._nombre, data[com]._existencias]);
                this.nameJson.push(data[com]._nombre);
            }

            this.graficaComida();
            return this.processed_json;
        })

    }
    obtenerBebida() {

        return this._bebidaApi.getBebidaByUrl().then((data) => {

            for (let com = 0; com < data.length; com++) {

                this.processed_json.push([data[com]._nombre, data[com]._existencias]);
                this.nameJson.push(data[com]._nombre);
            }

            this.graficaBebidas();
            return this.processed_json;
        })

    }

    pintarEstructuraComida() {
        let presentaComida = "";
        let presentaDetalleModal = "";

        let innerBodyNuevo = "";
        presentaComida = this.obtenerDivCajaPresentaGraficaComida();
        innerBodyNuevo = innerBodyNuevo + presentaComida + presentaDetalleModal;
        document.getElementsByClassName("text-left")[0].innerHTML = innerBodyNuevo;
    }

    obtenerDivCajaPresentaGraficaComida() {
        let fila = "";
         fila = fila + '<div class="row">';
         fila = fila + '<h1> Pagina Inicial de Ness></h1>';
         fila = fila + '<p>Bienvenido al portal de Prueba para aplicar conceptos de Javascript.</p>';
         fila = fila + '</div>';
        fila = fila + '<div class="row">';
        fila = fila + '<div class="col-sm-6 containerGrafC " id="containerGrafC" >';
        fila = fila + '</div>';

        fila = fila + '<div class="col-sm-6 containerGrafB" id="containerGrafB">';

        fila = fila + '</div>';
        fila = fila + '</div>';
        return fila;
    }

    graficaComida() {

        Highcharts.chart('containerGrafC', {
            chart: {
                type: 'column',
                options3d: {
                    enabled: true,

                    alpha: 15,
                    beta: 15,
                    depth: 50,
                    viewDistance: 25

                }
            },
            title: {
                text: 'Almacen de Comidas'
            },
            xAxis: {
                categories: this.nameJson,
                type: 'category',
                allowDecimals: false,
                title: {
                    text: ""
                }
            },

            plotOptions: {
                pie: {
                    innerSize: 100,
                    depth: 45
                }
            },
            series: [{
                name: 'Productos',
                data: this.processed_json
            }]

        });


    }
     graficaBebidas() {

        Highcharts.chart('containerGrafB', {
            chart: {
                type: 'column',
                options3d: {
                    enabled: true,

                    alpha: 15,
                    beta: 15,
                    depth: 50,
                    viewDistance: 25

                }
            },
            title: {
                text: 'Almacen de Bebidas'
            },
            xAxis: {
                categories: this.nameJson,
                type: 'category',
                allowDecimals: false,
                title: {
                    text: ""
                }
            },

            plotOptions: {
                pie: {
                    innerSize: 100,
                    depth: 45
                }
            },
            series: [{
                name: 'Productos',
                data: this.processed_json
            }]

        });


    }


}
