function Avisa() {
  var acepta = confirm("Atención se van a limpiar los datos del formulario");
  if (acepta) return true;
  else return false;
}
function Comprueba() {
  if (document.miform.nombre.value == "") {
    alert("No ha ingresado ningún dato");
    document.miform.nombre.focus();
    return false;
  } else return true;
}
function myFunction() {
  alert("Has seleccionado el texto ingresado!");
}
