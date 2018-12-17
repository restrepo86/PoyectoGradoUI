

const REQUIRE = { required: true, message: 'Este campo es requerido' };

const OBJECT_REQUIRE = { type: 'object', required: true, message: 'Este campo es requerido' };

const NUMBER = { type: 'number', message: 'Este campo solo permite valores númericos' }

const compareDates = (initialDate, lastDate, callback) => {
  let message;
  if (initialDate > lastDate) {
    message = 'La fecha inicial debe ser menor a la fecha final';
  } else {
    message = comparteDateRange(initialDate, lastDate);
  }
  return message ? callback([new Error(message)]) : callback();
}

const comparteDateRange = (initialDate, lastDate)  => {
  let message;
  const totalDays = lastDate.diff(initialDate, 'days');
  message = totalDays > 60 ? 'El rango entre fechas no debe ser mayor a 60 días' : null;
  return message;
};

const DOCUMENT = [
  REQUIRE,
  { pattern:/^[0-9]*$/gm, message: 'Formato incorrecto. Solo se admiten números '}
]

export default {
    REQUIRE,
    OBJECT_REQUIRE,
    NUMBER,
    DOCUMENT,
    compareDates,
    comparteDateRange,
}
