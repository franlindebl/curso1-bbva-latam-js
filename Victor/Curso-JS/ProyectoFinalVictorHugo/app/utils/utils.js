// Api LocalStorage
class Api_LS {
    constructor() {
    }

    static _getJsonAtLocalStorage(nombreParametro) {
        let cadena = localStorage.getItem(nombreParametro);
        return JSON.parse(cadena);
    }

    static _setJsonAtLocalStorage(nombreParametro, Objeto) {
        let cadena = JSON.stringify(Objeto);
        localStorage.setItem(nombreParametro, cadena);
    }

    static _removeParam(nombreParametro) {
        localStorage.removeItem(nombreParametro);
    }
}

class Utils {
    constructor() {
    }

    static _addEventClick(nombreButton, funcion) {
        document.querySelector(nombreButton).addEventListener("click", funcion);
    }

    static _pintaModalLoading() {
        if (document.querySelector('#divModalLoading') == null) {
            let htmlModal = '';
            htmlModal += '<div class="modal fade" id="modalLoading" role="dialog" aria-hidden="true" data-backdrop="static" data-keyboard="false">';
            htmlModal += '<div class="modal-dialog">';
            htmlModal += '<div class="modal-content">';
            htmlModal += '<div class="modal-body">';
            htmlModal += '<img src="./app/img/cargando.gif">';
            htmlModal += '<button type="button" id="btnModalOpen" class="btn btn-info hidden" data-toggle="modal" data-target="#modalLoading"></button>';
            htmlModal += '<button type="button" id="btnModalClose" class="btn btn-info hidden" data-dismiss="modal"></button>';
            htmlModal += '</div>';
            htmlModal += '</div>';
            htmlModal += '</div>';
            htmlModal += '</div>';

            let divContainer = document.createElement("DIV");
            divContainer.className = 'container';
            divContainer.id = 'divModalLoading';
            divContainer.innerHTML = htmlModal;

            document.querySelector('body').appendChild(divContainer);
        }
        document.querySelector('#btnModalOpen').click();
    }

    static _quitarModalLoading() {
        document.querySelector('#btnModalClose').click();
    }

    static _msg(tipoMsg, Msg, divMsg) {
        let titleMsg = '';
        let classMsg = '';
    
        switch(tipoMsg){
            case 'Success':
                titleMsg = 'Success!';
                classMsg = 'alert-success';
            break;
            case 'Info':
                titleMsg = 'Info!'; 
                classMsg = 'alert-info';
            break;
            case 'Warning':
                titleMsg = 'Warning!';
                classMsg = 'alert-warning';
            break;
            case 'Error':
                titleMsg = 'Error!';
                classMsg = 'alert-danger';
            break;
        }

        let divMsgHTML = '';
        divMsgHTML += `<div class="alert ${classMsg}">`;
        divMsgHTML += `<button type="button" class="close" data-dismiss="alert">&times;</button>`;
        divMsgHTML += `<strong>${titleMsg}</strong> ${Msg}`;
        divMsgHTML += '</div>';

        divMsg.innerHTML = divMsgHTML;
    }
}

class UtilTable {
    static _pintarTable(divTable, nameClass, nameCols, nametbody) {
        let botones = '<button type="button" class="btn btn-primary" id="btnActualizar"><span class="glyphicon glyphicon-refresh"></span> Refrescar</button>';
        botones += '&nbsp;&nbsp;&nbsp;<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modalModifica" id="btnNuevo"><span class="glyphicon glyphicon-plus"></span> Nuevo</button>';

        let divTableHeader = document.createElement("DIV");
        divTableHeader.className = 'row';
        let divColL = document.createElement("DIV");
        divColL.className = 'col-sd-0 col-md-1';
        let divColC = document.createElement("DIV");
        divColC.className = 'divHeaderTable col-sd-12 col-md-10';
        divColC.innerHTML = botones;
        let divColR = document.createElement("DIV");
        divColR.className = 'col-sd-0 col-md-1';


        divTableHeader.appendChild(divColL);
        divTableHeader.appendChild(divColC);
        divTableHeader.appendChild(divColR);

        let divTableBody = document.createElement("DIV");
        divTableBody.className = 'row';
        let divTableL = document.createElement("DIV");
        divTableL.className = 'col-sd-0 col-md-1';
        let divTableC = document.createElement("DIV");
        divTableC.className = nameClass + ' col-sd-12 col-md-10';
        let divTableR = document.createElement("DIV");
        divTableR.className = 'col-sd-0 col-md-1';

        let divContent = document.createElement("DIV");
        divContent.className = "container-fluid";
        let divTableResponsive = document.createElement("DIV");
        divTableResponsive.className = "table-responsive";
        divContent.appendChild(divTableResponsive);
        divTableC.appendChild(divContent);

        divTableBody.appendChild(divTableL);
        divTableBody.appendChild(divTableC);
        divTableBody.appendChild(divTableR);

        let divmensajes = document.createElement("DIV");

        divTable.appendChild(divmensajes);
        divTable.appendChild(divTableHeader);
        divTable.appendChild(divTableBody);

        UtilTable._pintarEstructuraTabla("table-responsive", nameCols, nametbody);
    }

    static _pintarTH(valor) {
        return '<th>' + valor + '</th>';
    }

    static _pintarTR(tbodyLista, htmlTD) {
        let tr = document.createElement("TR");
        tr.innerHTML = htmlTD;
        tbodyLista.appendChild(tr);
    }

    static _pintarEstructuraTabla(divDestino, tituloColumnas = [], nombreIDTbody) {
        let estructura = "";
        estructura += '<table class="table table-striped table-hover">';
        estructura += '<thead>';

        tituloColumnas.forEach((titulo) => estructura += UtilTable._pintarTH(titulo));

        estructura += '</thead>';
        estructura += '<tbody id="' + nombreIDTbody + '">';
        estructura += '</tbody>';
        estructura += '</table>';

        document.querySelector("." + divDestino).innerHTML = estructura;
    }
}