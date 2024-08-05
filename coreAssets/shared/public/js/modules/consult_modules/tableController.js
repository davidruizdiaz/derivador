/**
 * Modulo que controla la tabla de la vista de consultas.
 * @module Consultas/ControladorTabla
 */
import { deletePerson, deletePersonAttendances } from "../common_modules/apiConsumer.js";
import { notificator } from "../common_modules/notifications.js";
import { sendSearch } from "./consultController.js";

const tbody = document.querySelector('tbody');

/**
 * Carga la tabla con las personas recuperadas.
 * @param persons {Array[object]} Colección de personas
 * @example
 * { persons:[ { id: uuid, name: string, document: string}, ... ] }
 */
function loadTable(persons) {
  const emptyRow = `<tr><td colspan="3" class="center">⏳Buscando...</td></tr>`;
  tbody.innerHTML = emptyRow;
  if (persons.length <= 0) {
    const emptyRow = `<tr><td colspan="3" class="center">⚠️ No hay datos que mostrar</td></tr>`;
    tbody.innerHTML = emptyRow;
  } else {
    tbody.innerHTML = '';
    persons.forEach(per => {
      const row = document.createElement('tr');
      row.innerHTML = `<tr>
                    <td>${per.name}</td>
                    <td>${per.document}</td>
                    <td>
                      <button class="btn-edit">Editar</button>
                      <button class="btn-del">Borrar</button>
                    </td>
                  </tr>`;
      row.querySelector('.btn-edit')
        .addEventListener('click', (e) => {
          e.stopPropagation();
          handleEdit(`${per.id}`)
        });
      row.querySelector('.btn-del')
        .addEventListener('click', (e) => {
          e.stopPropagation();
          handleDelete(per.id, per.name)
        });
      tbody.append(row);
    });
  }
}

/**
 * Maneja la petición edición de los datos de una persona.
 * @param id {uuid} Id de la persona
 */
function handleEdit(id) {
  window.location.href = `/register.html?q=${id}`
}

/**
 * Manejar la eliminación de los datos de una persona.
 * @param id {uuid} Id de la persona
 * @param name {string} Nombre de la persona
 */
async function handleDelete(id, name) {
  const isConfirmed = confirm(`🫣 Está seguro que desea Eliminar a ${name}?`)
  if (!isConfirmed) {
    notificator.notify('🤗 Operación cancelada', 'info')
    return;
  }
  try {
    const res = await deletePerson(id);
    if (!res.ok) {
      if (res.msg === 'SequelizeForeignKeyConstraintError') {
        const isReconfirmed = confirm(`⚠️ ${name} tiene asistencias registrada\n😱 Desea Eliminar todas sus registros de asistencias de ${name}?`);
        if (!isReconfirmed) {
          notificator.notify('🤗 Operación cancelada', 'info')
          return;
        }
        const resAtt = await deletePersonAttendances(id);
        if (!resAtt.ok) {
          console.error(resAtt.msg);
          notificator.notify(`⚠️ ${resAtt.msg}`, 'error')
          return;
        }
        const resPer = await deletePerson(id);
        if (!resPer.ok) {
          console.error(resPer.msg);
          notificator.notify(`⚠️ ${resPer.msg}`, 'error')
          return;
        }
        notificator.notify(`🫤 ${resPer.msg} y ${resAtt.msg}`, 'info')
        sendSearch();
        return;
      }
      console.error(res.msg);
      notificator.notify(`⚠️ ${res.msg}`, 'error')
      return;
    }
    notificator.notify(`🫤 ${res.msg}`, 'info')
    sendSearch();
    return;
  } catch (error) {
    console.erro(error);
    notificator.notify('⚠️ Ocurrió un error al procesar los datos', 'error')
    return;
  }
}

export {
  loadTable,
}
