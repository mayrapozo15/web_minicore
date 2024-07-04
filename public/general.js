async function consultar(t, r = "GET", n = null, o = "") {
    return await new Promise((s, a) => {
      "ws" == o && (o = "http://localhost/ws_minicore/public/index.php/")
    //   "ws" == o && (o = "https://wscore-production.up.railway.app/public/"),
    //     "" == o && (o = "webproyecto-production.up.railway.app/");
      // "" == o && (o = "http://localhost/web_proyecto/public/index.php/");
      try {
        $.ajax({
          type: r,
          url: `${o}${t}`,
          data: JSON.stringify(n),
          contentType: "application/json",
          dataType: "json",
          success: function (t) {
            var r = imprimirError("9999", "Error en la consulta JS");
            (r = "string" == typeof t ? JSON.parse(t) : t), s(r);
          },
          error: function (t, r, n) {
            a(
              imprimirError("9999", "Error en la consulta JS, vuelva a intentar")
            );
          },
        });
      } catch ({ name: t, message: r }) {
        a(imprimirError("9999", `${t}: ${r}`));
      }
    });
  }
  function imprimirError(t, r, n = null) {
    return null == n
      ? { error: t, mensaje: r }
      : { error: t, mensaje: r, datos: n };
  }
  
  
function mostrarTareas() {
    $('#tareas').html('');
    consultar(`api/tareas/${$('#formIni').val()}/${$('#fomrFin').val()}/${$('#formEstado').val()}/${$('#formDias').val()}`, 'GET', null, 'ws').then((value) => {
      if (value.error != '0') {
            alert(`${value.mensaje}`);
            $('#tareas').html(``);
        } else {    
            let tareas = value.datos, c = '';
           for (const key in tareas) {
                c +=`
                <tr class="btn-reveal-trigger" id="trRu${tareas[key].id}">
                    <td class="align-middle white-space-nowrap">${key}</td>
                    <td class="align-middle white-space-nowrap">${tareas[key].empleado_nombres_apellidos}</td>
                    <td class="align-middle white-space-nowrap">${tareas[key].descripcion}</td>
                    <td class="align-middle white-space-nowrap">${tareas[key].fecha_inicio}</td>
                    <td class="align-middle white-space-nowrap">${tareas[key].fecha_fin}</td>
                    <td class="align-middle white-space-nowrap">${tareas[key].dias_pasados}</td>
                    <td class="align-middle white-space-nowrap">${tareas[key].proyecto_nombre}</td>
                </tr>
            `;
           }
            $('#tareas').html(c);
        }
    }).catch((error) => {
        $('#tareas').html(``);
        console.log(error);
    });
}