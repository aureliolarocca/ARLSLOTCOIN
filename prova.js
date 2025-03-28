function ritornaNumero() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(10);
    }, 2000);
  });
}

ritornaNumero().then((numero) => {
  console.log("Numero ricevotu", numero);
});

async function mostranNumero() {
  const numero = await ritornaNumero();
  console.log("Numero con await", numero);
}
mostranNumero();
