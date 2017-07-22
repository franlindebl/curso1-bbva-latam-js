class ModalController {
    constructor() {

    }
    openModalWithChild(child, title, ruta) {
    	let padreModal="";
    	if (!ruta){
    		padreModal = document.getElementById("htmlModal");
    	}else{
    		padreModal = document.getElementsByClassName("containerBody")[0];
    	}

         
        let divModal = document.createElement('div');

        padreModal.appendChild(divModal);
        divModal.className = "modal fade in";
        divModal.setAttribute("id", "myModal");
        divModal.setAttribute("role", "dialog");
        divModal.setAttribute("style", "display:block;");

        let divModalDialog = document.createElement('div');
        divModal.appendChild(divModalDialog);
        divModalDialog.className = 'modal-dialog';

        let divModalContent = document.createElement('div');
        divModalDialog.appendChild(divModalContent);
        divModalContent.setAttribute("class", "modal-content");

        let divModalHeader = document.createElement('div');
        divModalContent.appendChild(divModalHeader);
        divModalHeader.setAttribute("class", "modal-header");

        let cabaceraModal = document.createElement("h4");
        divModalHeader.appendChild(cabaceraModal);
        let textoCabecera = document.createTextNode(title);
        cabaceraModal.appendChild(textoCabecera);
        let botonCerrarModalAspa = document.createElement('button');
        divModalHeader.appendChild(botonCerrarModalAspa);

        botonCerrarModalAspa.setAttribute("type", "button");
        botonCerrarModalAspa.setAttribute("class", "close");
        botonCerrarModalAspa.setAttribute("data-dismiss", "modal");
        let textoAspa = document.createTextNode("X");
        botonCerrarModalAspa.appendChild(textoAspa);
        botonCerrarModalAspa.addEventListener('click', () => this.removeModale());

        let divModalBody = document.createElement('div');
        divModalBody.className = "divModalBody";
        divModalContent.appendChild(divModalBody);

        let divModalFooter = document.createElement('div');
        divModalContent.appendChild(divModalFooter);
        divModalFooter.setAttribute("class", "modal-footer");

        let botonCerrarModal = document.createElement('button');
        divModalFooter.appendChild(botonCerrarModal);
        botonCerrarModal.setAttribute("type", "button");
        botonCerrarModal.setAttribute("class", "btn btn-default");
        botonCerrarModal.setAttribute("data-dismiss", "modal");
        let textoCerrar = document.createTextNode("Cerrar");
        botonCerrarModal.appendChild(textoCerrar);
        botonCerrarModal.addEventListener('click', () => this.removeModale());

        // inserto el child
        divModalBody.appendChild(child);
        window.scrollTo(0, 0);
    }
    removeModale() {

        document.getElementById('myModal').parentElement.removeChild(document.getElementById('myModal'));
    }
}
