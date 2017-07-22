class ObjetoDom {
	constructor(tipo, id, idcontenedor, clase) {
		this._tipo = tipo;
		this._id = id;
		this._idcontenedor = idcontenedor;
		this._clase = clase;
		this._objeto = null;
		
		this.creaElemento();
	}

	creaElemento() {
		try {
			this._objeto = document.createElement(this._tipo);
			if(this._id != "") this._objeto.setAttribute("id", this._id);
			if(this._clase != "") this._objeto.setAttribute("class", this._clase);
			document.getElementById(this._idcontenedor).appendChild(this._objeto);
		}
		catch(e) {
			console.log(e.description + ":" + this.toString());
		}
	}

	toString() {
		let resp = "";
		for(let prop in this) {
			resp += "(" + prop + ":" + this[prop] + ")";
		}
		return (resp);
	}
}

class Formulario {
	creaForm(id, idContenedor, clase) {
		let objeto = new ObjetoDom("FORM", id, idContenedor, clase);
	}

	creaInput(id, idContenedor, clase) {
		let objeto = new ObjetoDom("INPUT", id, idContenedor, clase);
	}

	creaHidden(id, idContenedor) {
		let objeto = new ObjetoDom("HIDDEN", id, idContenedor, "");
	}

	creaButton(id, idContenedor, clase, texto) {
		let objeto = new ObjetoDom("BUTTON", id, idContenedor, clase);
		let item = document.createTextNode(texto);
		objeto._objeto.appendChild(item);
	}
}

class Estructura {
	creaContenedor(id, idContenedor, clase) {
		let objeto = new ObjetoDom("DIV", id, idContenedor, clase);
	}

	creaContenedorTexto(id, idContenedor, clase, texto) {
		let objeto = new ObjetoDom("DIV", id, idContenedor, clase);
		let item = document.createTextNode(texto);
		objeto._objeto.appendChild(item);
	}

	creaSpan(id, idContenedor, clase, texto) {
		let objeto = new ObjetoDom("SPAN", id, idContenedor, clase);
		let item = document.createTextNode(texto);
		objeto._objeto.appendChild(item);
	}
}