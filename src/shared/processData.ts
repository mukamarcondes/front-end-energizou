export const processDataToSpTime = (originalTime: Date) => {
  return originalTime.toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
  });
};
