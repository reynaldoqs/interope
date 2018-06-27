export default {
  req: v => !!v || "campo requerido",
  noSpace: v => {
    const expReg = /^\S+$/;
    return expReg.test(v) || "No debe tener espacios en blanco.";
  },
  ip: v => {
    const expRegIp = /^(([1-9]?[0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]).){3}([1-9]?[0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
    return expRegIp.test(v) || "Ip no validad";
  },
  min3: v => v.length >= 3 || "El tamaño minimo es de 3 caracteres",
  max9: v => v.length <= 9 || "El tamaño máximo es de 9 caracteres",
  min15: v => v.length >= 15 || "El tamaño minimo es de 15 caracteres",
  max20: v => v.length <= 20 || "El tamaño máximo es de 20 caracteres",
  max30: v => v.length >= 30 || "El tamaño minimo es de 3 caracteres",
  max50: v => v.length <= 50 || "El tamaño maximo es de 50 caracteres",
  max150: v => v.length <= 150 || "El tamaño máximo es de 150 caracteres",
  max500: v => v.length <= 500 || "El tamaño maximo es de 500 caracteres",
  integer: v => typeof v === "number" || "Tiene que ser un integer",
  maxCustom: (v, limit) =>
    v.length <= limit || `El numero maximo aceptado es ${limit}`
};
