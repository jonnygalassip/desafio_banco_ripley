$("#chatbot_mensaje").append("<div class='alert alert-primary' role='alert'><h6 class='alert-heading'><i class='fa fa-commenting' aria-hidden='true'></i> <strong>Asistente Virtual:</strong></h6>Te damos la bienvenida al Chatbot de Banco Ripley, esperamos poder ayudarte hoy.</div>");

$("#chatbot_mensaje").append("<div class='alert alert-primary' role='alert'><h6 class='alert-heading'><i class='fa fa-commenting' aria-hidden='true'></i> <strong>Asistente Virtual:</strong></h6><ul><li>Consulta de Saldo, ingrese 1</li> <li>Realizar Transferencia, ingrese 2 </li><li>Consultar Indicador Económico, ingrese 3</li></ul></div>");
var consultaSeleccionada = "0";
var rutEmisor = "";
var rutDestino = "";
var montoTransferencia = "";
// Permite que botón ENTER sea utilizado para enviar mensaje
$(document).ready(function() {
  $(window).keydown(function(event){
    if(event.keyCode == 13) {
      event.preventDefault();
      accionar_mensaje();
      return false;
    }
  });
});

// Permite que al hacer click en Enviar se ejecute nuestra función de todas maneras
var botonSubmit = document.querySelector("#enviarMensaje");

botonSubmit.addEventListener('click', () => {
  accionar_mensaje();
});
function accionar_mensaje()
{
  event.preventDefault();
  const mensaje = document.getElementById("mensaje").value;
  // Se incluye el mensaje
  $("#chatbot_mensaje").append("<div class='alert alert-success' role='alert'><h6 class='alert-heading'><i class='fa fa-commenting' aria-hidden='true'></i> <strong>Cliente:</strong></h6>"+mensaje+"</div>");
  cargarMensajes(mensaje);
  $("#chatbot_mensaje").animate({ scrollTop: $('#chatbot_mensaje')[0].scrollHeight}, 1000);
}
function limpiar_mensaje()
{
  document.getElementById("mensaje").value = "";
}
function cargarMensajes(tipo){
  limpiar_mensaje();
  if(consultaSeleccionada == "0")
  {
    // Manejo de 3 opciones iniciales con sus respectivas consecuencias
    switch(tipo) {
      case "1":
        $("#chatbot_mensaje").append("<div class='alert alert-primary' role='alert'><h6 class='alert-heading'><i class='fa fa-commenting' aria-hidden='true'></i> <strong>Asistente Virtual:</strong></h6>Ingrese su rut a continuación (Ej: 11.111.111-4)</div>");
        consultaSeleccionada = tipo;
        break;
        // Cuando el cliente pregunta el saldo, se le consulta el rut e inicia el flujo de saldo en el siguiente switch.
      case "2":
        $("#chatbot_mensaje").append("<div class='alert alert-primary' role='alert'><h6 class='alert-heading'><i class='fa fa-commenting' aria-hidden='true'></i> <strong>Asistente Virtual:</strong></h6>Ingrese su rut cuenta emisora (Ej: 11.111.111-4)</div>");
        consultaSeleccionada = tipo;
        break;
        // Cuando el cliente solicita transferencia, se le consulta los datos del emisor para continuar el proceso en el siguiente switch
      case "3":
        // Cuando el cliente consulta indicadores, automáticamente se le muestra el resultado obtenido desde la api
          fetch('/indicadores_economicos', {
              method: 'POST'
          })
          .then(res => res.text())
          .then(data =>{
             $("#chatbot_mensaje").append("<div class='alert alert-primary' role='alert'><h6 class='alert-heading'><i class='fa fa-commenting' aria-hidden='true'></i> <strong>Asistente Virtual:</strong></h6>"+data+"</div>");

             consultaSeleccionada = "0";
             $("#chatbot_mensaje").append("<div class='alert alert-primary' role='alert'><h6 class='alert-heading'><i class='fa fa-commenting' aria-hidden='true'></i> <strong>Asistente Virtual:</strong></h6><ul><li>Consulta de Saldo, ingrese 1</li> <li>Realizar Transferencia, ingrese 2 </li><li>Consultar Indicador Económico, ingrese 3</li></ul></div>");
          });
          break;
      default:
      $("#chatbot_mensaje").append("<div class='alert alert-primary' role='alert'><h6 class='alert-heading'><i class='fa fa-commenting' aria-hidden='true'></i> <strong>Asistente Virtual:</strong></h6>Ingrese una de las opciones disponibles.</div>");
    }
  }else{
    switch (consultaSeleccionada) {
      case "1":
      fetch('/get_saldo', {
          method: 'POST',
          headers: {'Content-type' :  'application/json'},
          body: JSON.stringify({rut_cliente: tipo})
      })
      .then(res => res.text())
      .then(data =>{
         let saldo_cliente = '';
         // Si rut no es válido se le comunica al cliente
         if(data == "Rut inválido")
         {
           $("#chatbot_mensaje").append("<div class='alert alert-primary' role='alert'><h6 class='alert-heading'><i class='fa fa-commenting' aria-hidden='true'></i> <strong>Asistente Virtual:</strong></h6>El rut ingresado no es válido. Intente ingresar su rut nuevamente:</div>");

         }else{
           $("#chatbot_mensaje").append("<div class='alert alert-primary' role='alert'><h6 class='alert-heading'><i class='fa fa-commenting' aria-hidden='true'></i> <strong>Asistente Virtual:</strong></h6>Su saldo disponible es de $"+data+"</div>");
           consultaSeleccionada = "0";
           $("#chatbot_mensaje").append("<div class='alert alert-primary' role='alert'><h6 class='alert-heading'><i class='fa fa-commenting' aria-hidden='true'></i> <strong>Asistente Virtual:</strong></h6><ul><li>Consulta de Saldo, ingrese 1</li> <li>Realizar Transferencia, ingrese 2 </li><li>Consultar Indicador Económico, ingrese 3</li></ul></div>");

         }
      });
        break;
      case "2":
        fetch('/get_cliente', {
            method: 'POST',
            headers: {'Content-type' :  'application/json'},
            body: JSON.stringify({rut_cliente: tipo})
        })
        .then(res => res.text())
        .then(data =>{
           let saldo_cliente = '';
           // Si rut no es válido se le comunica al cliente
           if(data == "0")
           {
             $("#chatbot_mensaje").append("<div class='alert alert-primary' role='alert'><h6 class='alert-heading'><i class='fa fa-commenting' aria-hidden='true'></i> <strong>Asistente Virtual:</strong></h6>El rut ingresado no es válido. Intente ingresar su rut de emisor nuevamente:</div>");

           }else{
             $("#chatbot_mensaje").append("<div class='alert alert-primary' role='alert'><h6 class='alert-heading'><i class='fa fa-commenting' aria-hidden='true'></i> <strong>Asistente Virtual:</strong></h6>Ingrese su rut cuenta destino (Ej: 11.111.111-4)</div>");
             rutEmisor = tipo;
             consultaSeleccionada = "2.1";
           }
        });
        break;
      case "2.1":
      if(rutEmisor == tipo)
      {
        $("#chatbot_mensaje").append("<div class='alert alert-primary' role='alert'><h6 class='alert-heading'><i class='fa fa-commenting' aria-hidden='true'></i> <strong>Asistente Virtual:</strong></h6>El rut ingresado es el mismo de emisor. Intente ingresar su rut de destino nuevamente:</div>");

      }else{
        fetch('/get_cliente', {
            method: 'POST',
            headers: {'Content-type' :  'application/json'},
            body: JSON.stringify({rut_cliente: tipo})
        })
        .then(res => res.text())
        .then(data =>{
           let saldo_cliente = '';
           // Si rut no es válido se le comunica al cliente
           if(data == "0")
           {
             $("#chatbot_mensaje").append("<div class='alert alert-primary' role='alert'><h6 class='alert-heading'><i class='fa fa-commenting' aria-hidden='true'></i> <strong>Asistente Virtual:</strong></h6>El rut ingresado no es válido. Intente ingresar su rut de destino nuevamente:</div>");

           }else{
             $("#chatbot_mensaje").append("<div class='alert alert-primary' role='alert'><h6 class='alert-heading'><i class='fa fa-commenting' aria-hidden='true'></i> <strong>Asistente Virtual:</strong></h6>Ingrese monto transferencia en pesos chilenos: (Ej: 1000)</div>");
             rutDestino = tipo;
             consultaSeleccionada = "2.2";
           }
        });
      }

        break;
      case "2.2":
        fetch('/realizar_transferencia', {
            method: 'POST',
            headers: {'Content-type' :  'application/json'},
            body: JSON.stringify({monto: tipo, cuenta_emisor: rutEmisor, cuenta_destino: rutDestino})
        })
        .then(res => res.text())
        .then(data =>{
           let saldo_cliente = '';
           // Si el saldo es insuficiente para la transferencia se le comunica al cliente
           if(data == "Sin Saldo")
           {
             $("#chatbot_mensaje").append("<div class='alert alert-primary' role='alert'><h6 class='alert-heading'><i class='fa fa-commenting' aria-hidden='true'></i> <strong>Asistente Virtual:</strong></h6>Saldo insuficiente para realizar transferencia.</div>");
             consultaSeleccionada = "0";
           }else{
             $("#chatbot_mensaje").append("<div class='alert alert-primary' role='alert'><h6 class='alert-heading'><i class='fa fa-commenting' aria-hidden='true'></i> <strong>Asistente Virtual:</strong></h6>Transferencia Realizada con Éxito.</div>");
             consultaSeleccionada = "0";
             $("#chatbot_mensaje").append("<div class='alert alert-primary' role='alert'><h6 class='alert-heading'><i class='fa fa-commenting' aria-hidden='true'></i> <strong>Asistente Virtual:</strong></h6><ul><li>Consulta de Saldo, ingrese 1</li> <li>Realizar Transferencia, ingrese 2 </li><li>Consultar Indicador Económico, ingrese 3</li></ul></div>");

           }
        });
        break;
      default:

    }
  }


}
