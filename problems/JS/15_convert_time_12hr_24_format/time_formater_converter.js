function convert12hto24(time12hr) {
  const [time, modifier] = time12hr.split(" ");
  let [hours, minutes] = time.split(":");

  if (hours === "12") hours = "00";
  if (modifier === "PM") hours = Number(hours) + 12;
  return `${hours}:${minutes}`;
}

console.log(convert12hto24("11:02 PM"));
console.log(convert12hto24("12:02 PM"));
console.log(convert12hto24("12:02 AM"));
console.log(convert12hto24("01:29 PM"));
console.log(convert12hto24("11:29 AM"));
console.log(convert12hto24("08:59 PM"));
