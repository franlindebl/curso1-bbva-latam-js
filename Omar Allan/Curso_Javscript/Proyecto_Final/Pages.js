class Page {
    constructor(urlname, urlPage) {
        this._urlname = urlname;
        this._urlPage = urlPage;
        this._navigationController = null;
    }
}


class InnerPages extends Page {
    constructor(urlname, urlPage) {
        super(urlname, urlPage);
        //this._pageHome = new PageHome();
        //this._pageMovimientos = new PageMovimientos();
        //this._pageTarjetas = new PageTarjetas();
        //this.pintar();
    }

    pintarEstructura() {
        let estructura = '';
        estructura += '<div class="container">';

        estructura += '<div class="container1">';
        estructura += '<div class="row">';
        estructura += '<div class="col-sm-12 col-md-12 col-lg-12 bloque superior">';
        estructura += '<div class="divHeader"></div>';
        estructura += '</div>';
        estructura += '</div>';
        estructura += '</div>';

        estructura += '<div class="container2">';
        estructura += '<div class="row">';
        estructura += '<div class="col-sm-12 col-md-12 col-lg-12 bloque medio">';
        estructura += '<div class="divMain"></div>';
        estructura += '<div class="divModal">';
        //estructura += '<div class="col-sm-6 col-md-6 col-lg-6 bloque medio">';
        //estructura += '</div>';
        //estructura += '<div class="col-sm-6 col-md-6 col-lg-6 bloque medio">';
        estructura += '</div>';
        estructura += '</div>';
        estructura += '</div>';
        estructura += '</div>';

        //estructura += '</div>';
        //estructura += '</div>';

        estructura += '<div class="container3">';
        estructura += '<div class="row">';
        estructura += '<div class="col-sm-12 col-md-12 col-lg-12 bloque inferior">';
        estructura += '<div class="divFooter"></div>';
        estructura += '</div>';
        estructura += '</div>';
        estructura += '</div>';
        estructura += '</div>';
        estructura += '</div>';

        let miDiv = document.createElement("div");
        miDiv.innerHTML = estructura;

        return miDiv;

    }

    pintarHeader(miDiv) {

        let miDivTemp = document.createElement("div");

        let miString = '<p><strong>Esto es el Header</strong></p>';
        miString += '<button id="Home">Home</button></div>';
        miString += '<button id="Comidas">Comidas</button></div>';
        miString += '<button id="Bebidas">Bebidas</button></div>';
        miString += '<button id="Usuarios">Usuarios</button></div>';
        miString += '<button id="Login">Login</button></div>';
        miDivTemp.innerHTML = miString;


        //document.querySelector("#Comidas").addEventListener("click", this._navigationController.navigateToUrl("#Comidas"));


        // Agregar evento click
        miDivTemp.querySelector("#Home").addEventListener("click", () => this._navigationController.navigateToUrl("#Home"));
        miDivTemp.querySelector("#Comidas").addEventListener("click", () => this._navigationController.navigateToUrl("#Comidas"));
        miDivTemp.querySelector("#Bebidas").addEventListener("click", () => this._navigationController.navigateToUrl("#Bebidas"));
		miDivTemp.querySelector("#Usuarios").addEventListener("click", () => this._navigationController.navigateToUrl("#Usuarios"));
        miDivTemp.querySelector("#Login").addEventListener("click", () => this._navigationController.navigateToUrl("#Login"));
        miDiv.querySelector(".divHeader").appendChild(miDivTemp);

        return miDiv;

    }



    pintarFooter(miDiv) {

        let miDiv1 = document.createElement("div");
        let footer = '<p><strong>Gestion Restaurante</strong></p>';
        //footer += '<button id="Home">Home</button></div>';
        miDiv1.innerHTML = footer;
        miDiv.querySelector(".divFooter").appendChild(miDiv1);

		return miDiv;

        // Agregar evento click
    }

    /*
        pintarHeader2() {

            let header = '';
            header += '<a href="#Home" id="Home"class="menu">Home</a>';
            header += '<a href="#Bebidas" id="Comidas" class="menu">Bebidas</a>';
            header += '<a href="#Comidas" id="Bebidas" class="menu">Comidas</a>';
            header += '<a href="#Comidas" id="Usuarios" class="menu">Usuarios</a>';
     
            document.querySelector(".divHeader").innerHTML = header;
    }
    */

    /*        // Agregar evento click
        document.querySelector("#Home").addEventListener("click", this._navigationController.navigateToUrl("#Home"));
        document.querySelector("#Comidas").addEventListener("click", this._navigationController.navigateToUrl("#Comidas"));
        document.querySelector("#Bebidas").addEventListener("click", this._navigationController.navigateToUrl("#Bebidas"));
        document.querySelector("#Usuarios").addEventListener("click", this._navigationController.navigateToUrl("#Usuarios"));
*/




    pintar() {
        let miDiv = this.pintarEstructura();
        miDiv = this.pintarHeader(miDiv);
        miDiv = this.pintarFooter(miDiv);

        document.body.innerHTML = "";
        document.body.appendChild(miDiv);
    }

}
