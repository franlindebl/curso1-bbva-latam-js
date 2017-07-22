class PageHome1 extends InnerPages {
    constructor(urlname, urlPage) {
        super(urlname, urlPage);
    }

pintarPaginaHome(miDiv) {

    let main = '<div class="dashboard">';
        main +=  '<h1><strong>Home del Restaurante</strong></h1>';
        main += '</div>';

        miDiv.querySelector(".divMain").innerHTML = main;
        // Agregar evento click

        return miDiv;
    }



        pintar() {

        let miDiv = this.pintarEstructura();
        miDiv = this.pintarHeader(miDiv);
        miDiv = this.pintarPaginaHome(miDiv);
        


        miDiv = this.pintarFooter(miDiv);
        document.body.innerHTML = "";
        document.body.appendChild(miDiv);




        // traer bebidas
        //this.pintarHome();
    }

}




