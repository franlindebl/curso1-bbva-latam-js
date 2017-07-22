class Modal {
	constructor() {

	}

	static pintarCabecera(idName,tituloCabecera) {
		var texto = "";
		var divAddModal = document.createElement("div");
        divAddModal.setAttribute("class", "modal fade");
        divAddModal.setAttribute("id", idName);
        divAddModal.setAttribute("role", "dialog");

        var divDialogModal = document.createElement("div");
        divDialogModal.setAttribute("class", "modal-dialog");
        
        divAddModal.appendChild(divDialogModal);

        var divContentModal = document.createElement("div");
        divContentModal.setAttribute("class", "modal-content");
        
        divDialogModal.appendChild(divContentModal);

        var divHeaderModal = document.createElement('div');
        divHeaderModal.setAttribute("class", "modal-header");
        divContentModal.appendChild(divHeaderModal);

        //<button type="button" class="close" data-dismiss="modal">&times;</button>
        var tache = document.createElement('button');
        tache.setAttribute("class", "close");
        tache.setAttribute("type", "button");
        tache.setAttribute("data-dismiss", "modal");

        texto = document.createTextNode("cerrar");
        tache.appendChild(texto);

        divHeaderModal.appendChild(tache);

        var h4 = document.createElement('h4');
        h4.setAttribute("class", "modal-title");
        texto = document.createTextNode(tituloCabecera);
        h4.appendChild(texto);

        divHeaderModal.appendChild(h4);

        return {"divContentModal": divContentModal,
        			"divAddModal": divAddModal };
	}

	static pintarBodyFormModal() {
		var divBodyModal = document.createElement('div');
        divBodyModal.setAttribute("class", "modal-body");

        var formModal = document.createElement('form');
        formModal.setAttribute("class", "form-body");
        formModal.setAttribute("id", "form-body");
        divBodyModal.appendChild(formModal);

        return {"divBodyModal" : divBodyModal,
				"formModal": formModal};
	}

	static pintarBoton(string, formModal) {
		var botonSave = document.createElement('button');
		botonSave.setAttribute("class", "btn-success");
		botonSave.setAttribute("id", "botonSave");
		botonSave.setAttribute("data-toggle", "modal");
		botonSave.setAttribute("click", "");
		botonSave.setAttribute("data-dismiss", "modal");
		formModal.appendChild(botonSave);

		var texto = document.createTextNode(string);
                botonSave.appendChild(texto);
	}

        static pintarBotonDelete(string, formModal) {
                var botonSave = document.createElement('button');
                botonSave.setAttribute("class", "btn-success");
                botonSave.setAttribute("id", "botonDelete");
                botonSave.setAttribute("data-toggle", "modal");
                botonSave.setAttribute("click", "");
                botonSave.setAttribute("data-dismiss", "modal");
                formModal.appendChild(botonSave);

                var texto = document.createTextNode(string);
                botonSave.appendChild(texto);
        }

}