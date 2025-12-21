
// Fonction de formatage de Date
export function formatDate(date) {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
}
