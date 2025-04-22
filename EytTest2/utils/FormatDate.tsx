export const formatDateLong = (input: string): string => {
  if (!input) return "-";

  const months = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ];

  const [year, month, day] = input.split("-");
  const monthName = months[parseInt(month, 10) - 1];

  return `📆 ${parseInt(day, 10)} ${monthName} ${year}`;
};
