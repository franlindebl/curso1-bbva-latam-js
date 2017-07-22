class Utilerias {
    constructor() {

    }
    constriurDiv(id, clase) {
        let miDiv = document.createElement("div");
        if (id != "" && id != "undefined")
            miDiv.setAttribute("id", id);
        if (clase != "" && clase != "undefined")
            miDiv.setAttribute("class", clase);


        return miDiv;
    }
    constriurH(h, nombre) {
        let hD = document.createElement(h);
        hD.innerHTML = nombre;

        return hD;
    }
    constriurForm(id, clase) {
        var formD = document.createElement("FORM");
        if (clase != "" && clase != "undefined")
            formD.setAttribute("class", clase);
        if (id != "" && id != "undefined")
            formD.setAttribute("id", clase);

        return formD;
    }
    constriurLabel(forL, claseL, message) {
        var label = document.createElement('label');
        if (forL != "" && forL != "undefined")
            label.setAttribute('for', forL);
        if (claseL != "" && claseL != "undefined")
            label.setAttribute("class", claseL);
        if (message != "" && message != "undefined")
            label.innerHTML = message;

        return label;
    }
    constriurInput(type, clase, id, placeholder, message) {
        var input = document.createElement("INPUT");
        if (type != "" && type != "undefined")
            input.setAttribute("type", type);
        if (clase != "" && clase != "undefined")
            input.setAttribute("class", clase);
        if (id != "" && id != "undefined")
            input.setAttribute("id", id);
        if (placeholder != "" && placeholder != "undefined")
            input.setAttribute("placeholder", placeholder);
        if (message != "" && message != "undefined")
            input.innerHTML = message;

        return input;
    }
    constriurButton(type, clase, id, message, functionOnClick, toggle, target) {
        var boton = document.createElement("button");

        if (type != "" && type != "undefined")
            boton.setAttribute("type", type);
        if (clase != "" && clase != "undefined")
            boton.setAttribute("class", clase);
        if (id != "" && id != "undefined")
            boton.setAttribute("id", id);
        if (message != "" && message != "undefined")
            boton.innerHTML = message;
        if (toggle != "" && toggle != "undefined")
            boton.setAttribute("data-toggle",toggle);
        if (target != "" && target != "undefined")
            boton.setAttribute("data-target",target);
        if (functionOnClick != "" && functionOnClick != null && typeof(functionOnClick) != "undefined")
            boton.addEventListener("click", functionOnClick);

        return boton;
    }
}