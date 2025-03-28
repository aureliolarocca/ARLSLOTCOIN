//Dichiarazione vari Bottoni (Info,Bottoni Mini Game,Renderli incliccabili)
const info = document.querySelector(".info");
console.log(info);
const scommettiBtn = document.querySelector("#scommettiBtn");
const ritiraBtn = document.querySelector("#ritiraBtn");
scommettiBtn.disabled = true;
ritiraBtn.disabled = true;

//EVENT LISTENER INFO BUTTON (ALLUNGATO NEL CASO LE MEDIAQUERY DIANO DISPONIBILE IL BOTTONE INFO IN QUALCHE DEVICE)
info.addEventListener("click", () => {
  const infoBanner = document.querySelector(".banner");
  console.log(infoBanner);
  infoBanner.classList.toggle("active");
  const chiusuraBanner = document.querySelector("#chiusuraBanner");
  chiusuraBanner.addEventListener("click", () => {
    if (infoBanner.classList.contains("active")) {
      infoBanner.classList.remove("active");
    }
  });
});

//Dichiarazione tasto aumento diminuimento del Bet , il bet iniziale e' 10 lo modelleremo.
const btnBetPiu = document.querySelector(".moneyBetPiu");
const btnBetMeno = document.querySelector(".moneyBetMeno");
let bet = 10;

//Aggiunta del bet nel HTML
document.querySelector("#bet").innerHTML = `${bet}`;

//EventListener per quando si preme il bottone + , inoltre implementazione ogni qual volta si aumenta il bet
//I livelli del miniGame aumenteranno in base all'aumento
btnBetPiu.addEventListener("click", () => {
  if (bet <= 99 && bet >= 0) {
    bet += 10;
    console.log(bet);
    document.querySelector("#bet").innerHTML = bet;
    document.querySelector("#lv6").innerHTML = `${(bet + bet) * 2}`;
    document.querySelector("#lv5").innerHTML = `${(bet + bet) * 4}`;

    document.querySelector("#lv4").innerHTML = `${(bet + bet) * 8}`;

    document.querySelector("#lv3").innerHTML = `${(bet + bet) * 16}`;

    document.querySelector("#lv2").innerHTML = `${(bet + bet) * 32}`;

    document.querySelector("#lv1").innerHTML = `${(bet + bet) * 64}`;
  }
});
//EventListener per quando si preme il bottone - , inoltre implementazione ogni qual volta si aumenta il bet
//I livelli del miniGame aumenteranno in base all'aumento
btnBetMeno.addEventListener("click", () => {
  if (bet <= 100 && bet >= 20) {
    bet -= 10;
    console.log(bet);
    document.querySelector("#bet").innerHTML = bet;
    document.querySelector("#lv6").innerHTML = `${(bet + bet) * 2}`;
    document.querySelector("#lv5").innerHTML = `${(bet + bet) * 4}`;

    document.querySelector("#lv4").innerHTML = `${(bet + bet) * 8}`;

    document.querySelector("#lv3").innerHTML = `${(bet + bet) * 16}`;

    document.querySelector("#lv2").innerHTML = `${(bet + bet) * 32}`;

    document.querySelector("#lv1").innerHTML = `${(bet + bet) * 64}`;
  }
});

//Dichiarazione soldi iniziali e' inserimento in HTML
let money = 1000;
document.querySelector("#money").innerHTML = `${money}`;
//Dichiarazione bottone spin
let btnSpin = document.querySelector(".spin");

//Event Listener Bottone Spin
btnSpin.addEventListener("click", () => {
  //Dichiarazione
  const banner2 = document.querySelector(".banner2");
  const chiusuraBanner2 = document.querySelector("#chiusuraBanner2");
  const banner2ProblemDescription = document.querySelector(
    "#banner2ProblemDescription"
  );
  chiusuraBanner2.addEventListener("click", () => {
    if (banner2.classList.contains("active")) {
      banner2.classList.remove("active");
    }
  });

  if (money >= bet) {
    money -= bet;
    document.querySelector("#money").innerHTML = `${money}`;
    console.log(money);
    startSpin();
  } else if (money === 0) {
    banner2.classList.add("active");
    banner2ProblemDescription.innerHTML =
      "HAI FINITO, RIAGGIORNA SE VUOI CONTINUARE";
  } else {
    banner2.classList.add("active");
    ("BET TROPPO ALTO");
  }
});

async function startSpin() {
  let result = await giroRulli();
  confrontoPersonaggi(result);
}

function giroRulli() {
  const immagini = [
    "cartoon_character_converted.png",
    "bug_umanizzato.jpg",
    "CoinRullo.png",
  ];
  const img1 = immagini[Math.floor(Math.random() * immagini.length)];
  const img2 = immagini[Math.floor(Math.random() * immagini.length)];
  const img3 = immagini[Math.floor(Math.random() * immagini.length)];

  const rullo1 = document.querySelector(".rullo1");
  const rullo2 = document.querySelector(".rullo2");
  const rullo3 = document.querySelector(".rullo3");

  rullo1.style.backgroundImage = `url(${img1})`;
  rullo2.style.backgroundImage = `url(${img2})`;
  rullo3.style.backgroundImage = `url(${img3})`;
  return new Promise((resolve, reject) => {
    if (
      rullo1.style.backgroundImage === rullo2.style.backgroundImage &&
      rullo2.style.backgroundImage === rullo3.style.backgroundImage
    ) {
      resolve(img1);
    }
  });
}
async function confrontoPersonaggi(x) {
  console.log(x);
  document.querySelector("#money").innerHTML = `${(money -= bet)}`;
  const sommaVinta = document.querySelector("#sommaVinta");

  if (x === "bug_umanizzato.jpg") {
    console.log("Bug");
    sommaVinta.innerHTML = 0;

    console.log("BUG");
  } else if (x === "cartoon_character_converted.png") {
    sommaVinta.innerHTML = `${bet * 2}`;
    console.log("Mini Gioco");

    sceltaMiniGame();

    console.log("carattere");
  } else {
    console.log("partita bonus");
    bonus();
    money += moneyBonus;
    document.getElementById("money").innerHTML = money;
    moneyBonus = 0;
    console.log(money);
  }
  return x;
}

function startMiniBonus() {
  console.log("Inizio Funzione Mini Game");
  document.querySelector(".rullo1").style.display = "none";
  document.querySelector(".rullo2").style.display = "none";
  btnBetMeno.disabled = true;
  btnBetPiu.disabled = true;
  btnSpin.disabled = true;
  document.querySelector(".top-left").backgroundColor = "none";
  scommettiBtn.disabled = false;
  ritiraBtn.disabled = false;
  scommettiBtn.style.backgroundColor = "#b30000";
  scommettiBtn.style.boxShadow =
    "0 4px 10px rgba(0, 0, 0, 0.5), inset 0 -3px 5px rgba(0, 0, 0, 0.6),inset 0 3px 5px rgba(255, 255, 255, 0.3)";
  ritiraBtn.style.backgroundColor = "#0fb41f";
  ritiraBtn.style.boxShadow =
    " 0 4px 10px rgba(9, 74, 120, 0.5),inset 0 -3px 5px rgba(183, 10, 10, 0.6), inset 0 2px 5px rgba(79, 7, 7, 0.3); ";

  return new Promise((resolve, reject) => {
    scommettiBtn.addEventListener("click", () => {
      console.log("Vuoi Scommettere");
      resolve("scommesso");
    });

    ritiraBtn.addEventListener("click", () => {
      console.log("Vuoi ritirare");
      // Qui intendevi disabilitare il pulsante?
      scommettiBtn.disabled = true;
      ritiraBtn.disabled = true;
      scommettiBtn.style.backgroundColor = "rgb(0,0,0, 0.5)";
      ritiraBtn.style.backgroundColor = "rgb(0,0,0, 0.5)";
      document.querySelector(".top-left").backgroundColor = "rgb(0,0,0, 0.5)";

      resolve("ritirato");
    });
  });
}

let lv = 6;
async function sceltaMiniGame() {
  let risultatoScelta = await startMiniBonus();
  if (lv === 1) {
    document.querySelector("#scommettiBtn").disabled = true;
    scommettiBtn.style.backgroundColor = "rgb(0,0,0, 0.5)";
    ritiraBtn.style.backgroundColor = "rgb(0,0,0, 0.5)";
    document.querySelector(".top-left").backgroundColor = "rgb(0,0,0, 0.5)";
  }
  if (risultatoScelta === "scommesso") {
    console.log("Siam dentro la funzione async");
    console.log("Hai scommesso");
    const imgArr = ["cartoon_character_converted.png", "bug_umanizzato.jpg"];
    const img1 = imgArr[Math.floor(Math.random() * imgArr.length)];
    const rullo3 = document.querySelector(".rullo3");
    rullo3.style.backgroundImage = `url(${img1})`;
    if (
      rullo3.style.backgroundImage === 'url("cartoon_character_converted.png")'
    ) {
      console.log("CARTONE SEI SALITO DI LIVELLO");

      document.querySelector(`#divLv${lv}`).style.backgroundColor =
        "greenYellow";
      document.querySelector(`#lv${lv}`).style.color = "black";
      lv--;
      document.querySelector("#sommaVinta").innerHTML = `${
        document.querySelector(`#lv${lv + 1}`).innerHTML
      }`;

      sceltaMiniGame();
    }
    //NEL CASO BECCHI IL MOSTRO NELLA PARTITA MINI GAME PERDI
    else {
      setTimeout(() => {
        console.log("Purtroppo hai beccato il mostro hai perso tutto");
        document.querySelector("#scommettiBtn").disabled = true;
        document.querySelector("#ritiraBtn").disabled = true;
        document.querySelector("#sommaVinta").innerHTML = 0;
        lv = 6;
        document.querySelector("#divLv1").style.backgroundColor =
          " rgba(0, 0, 0, 0.5)";
        document.querySelector("#divLv2").style.backgroundColor =
          " rgba(0, 0, 0, 0.5)";
        document.querySelector("#divLv3").style.backgroundColor =
          " rgba(0, 0, 0, 0.5)";
        document.querySelector("#divLv4").style.backgroundColor =
          " rgba(0, 0, 0, 0.5)";
        document.querySelector("#divLv5").style.backgroundColor =
          " rgba(0, 0, 0, 0.5)";
        document.querySelector("#divLv6").style.backgroundColor =
          " rgba(0, 0, 0, 0.5)";
        document.querySelector("#lv1").style.color = "greenYellow";
        document.querySelector("#lv2").style.color = "greenYellow";
        document.querySelector("#lv3").style.color = "greenYellow";
        document.querySelector("#lv4").style.color = "greenYellow";
        document.querySelector("#lv5").style.color = "greenYellow";
        document.querySelector("#lv6").style.color = "greenYellow";
        document.querySelector(".rullo1").style.display = "flex";
        document.querySelector(".rullo2").style.display = "flex";
        btnBetMeno.disabled = false;
        btnBetPiu.disabled = false;
        btnSpin.disabled = false;
        scommettiBtn.style.backgroundColor = "rgb(0,0,0, 0.5)";
        ritiraBtn.style.backgroundColor = "rgb(0,0,0, 0.5)";
        document.querySelector(".top-left").backgroundColor = "rgb(0,0,0, 0.5)";
      }, 2500);
    }
  }
  //RITIRA
  else if (risultatoScelta === "ritirato") {
    console.log("Siamo dentro la funzione async hai ritirato");
    document.querySelector("#scommettiBtn").disabled = true;
    document.querySelector("#ritiraBtn").disabled = true;
    const sV = parseInt(document.querySelector("#sommaVinta").textContent);
    document.querySelector("#money").innerHTML = money += sV;
    sommaVinta.innerHTML = 0;
    document.querySelector("#divLv1").style.backgroundColor =
      " rgba(0, 0, 0, 0.5)";
    document.querySelector("#divLv2").style.backgroundColor =
      " rgba(0, 0, 0, 0.5)";
    document.querySelector("#divLv3").style.backgroundColor =
      " rgba(0, 0, 0, 0.5)";
    document.querySelector("#divLv4").style.backgroundColor =
      " rgba(0, 0, 0, 0.5)";
    document.querySelector("#divLv5").style.backgroundColor =
      " rgba(0, 0, 0, 0.5)";
    document.querySelector("#divLv6").style.backgroundColor =
      " rgba(0, 0, 0, 0.5)";
    document.querySelector("#lv1").style.color = "greenYellow";
    document.querySelector("#lv2").style.color = "greenYellow";
    document.querySelector("#lv3").style.color = "greenYellow";
    document.querySelector("#lv4").style.color = "greenYellow";
    document.querySelector("#lv5").style.color = "greenYellow";
    document.querySelector("#lv6").style.color = "greenYellow";
    document.querySelector(".rullo1").style.display = "flex";
    document.querySelector(".rullo2").style.display = "flex";
    btnBetMeno.disabled = false;
    btnBetPiu.disabled = false;
    btnSpin.disabled = false;
    scommettiBtn.style.backgroundColor = "rgb(0,0,0, 0.5)";
    ritiraBtn.style.backgroundColor = "rgb(0,0,0, 0.5)";
    document.querySelector(".top-left").backgroundColor = "rgb(0,0,0, 0.5)";
  }
}

async function bonus() {
  await startBonus(); // primo step
  await eventListenerBonusStart(); // secondo step, aspetta tutto
  console.log(">>> adesso posso andare avanti");
  eventListenerBonusPrompt();
}

function startBonus() {
  document.querySelector(".grid-container").style.animation =
    "gridShake 1s ease-in-out";
  btnBetMeno.disabled = true;
  btnBetPiu.disabled = true;
  btnSpin.disabled = true;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      document.querySelector(".rullo1").style.display = "none";
      document.querySelector(".rullo2").style.display = "none";
    }, 1700);
    setTimeout(() => {
      document.querySelector(".giocoBonus").style.display = "flex";
    }, 2000);
    setTimeout(() => {
      document.querySelector(".displayGiocoBonus").style.backgroundImage =
        'url("STARTBONUSGIF.gif")';
    }, 2300);
    setTimeout(() => {
      document.querySelector(".displayGiocoBonus").style.backgroundImage =
        'url("STARTBONUSGIF_last_frame.png")';
      document.querySelector("#attacca").style.boxShadow =
        "2px 2px 2px  rgb(162, 155, 155)";
      resolve("FINE PREPARATIVI PARTITA BONUS");
    }, 12280);
  });
}

function eventListenerBonusStart() {
  return new Promise((resolve) => {
    const handler = () => {
      // 🔹 Rimuovo il listener appena clicchi
      document.querySelector("#attacca").removeEventListener("click", handler);

      // 🔹 Subito dopo il click posso già fare qualcosa
      document.querySelector("#attacca").textContent = "ATTACCA";

      // 🔹 Azioni che continuano dopo il click
      setTimeout(() => {
        document.querySelector("#attacca").style.boxShadow = "none";
        document.querySelector("#pBonus").style.display = "flex";
        document.querySelector("#attacca").textContent = "ATTACCA";
        document.querySelector("#pBonus").style.fontSize = "0.6rem";
      }, 500);

      setTimeout(() => {
        document.querySelector(".displayGiocoBonus").style.backgroundImage =
          'url("STARTFIGHT.gif")';

        // ✅ Risolvo la Promise alla fine dei timeout
        resolve("Fine evento con click e timeout");
      }, 600);
    };
    // 👇 Registro l’ascoltatore (una sola volta, quando la funzione viene chiamata)
    document.querySelector("#attacca").addEventListener("click", handler);
  });
}

let viteBug = 5;
let viteDev = 5;
let moneyBonus = 0;

function eventListenerBonusPrompt() {
  // Effetti visivi pre-click
  document.querySelector("#attacca").style.animation = "vibra 0.5s infinite";
  document.querySelector("#attacca").style.boxShadow =
    "0 4px 8px rgba(0, 0, 0, 0.3), 0 0 0 2px rgba(128, 128, 128, 0.4) inset";
  console.log("INIZIO SECONDO EVENT LISTENER");

  return new Promise((resolve) => {
    const handler = () => {
      document.querySelector("#attacca").removeEventListener("click", handler);

      setTimeout(() => {
        document.querySelector("#attacca").style.animation = "none";
      }, 200);

      // 👇 Estrai la gif casuale solo al momento del click
      const arrColpoGif = ["COLPODEV.gif", "COLPOBUG.gif"];
      const colpoGif =
        arrColpoGif[Math.floor(Math.random() * arrColpoGif.length)];

      // 🔁 Mostra la gif sullo sfondo
      setTimeout(() => {
        document.querySelector(
          ".displayGiocoBonus"
        ).style.backgroundImage = `url("${colpoGif}")`;
        console.log("gifffff!!!!!");
      }, 500);

      // 🔻 Aggiorna la vita in base alla gif

      if (colpoGif === "COLPODEV.gif" && viteDev > 1) {
        viteBug--;
        moneyBonus = moneyBonus + bet * 250;
        setTimeout(() => {
          document.querySelector(`#pBonus`).innerHTML =
            "SEI RIUSCITO A COLPIRE IL BUG, IL BUG PERDE UNA VITA ";
        }, 9000);
        setTimeout(() => {
          document.getElementById(`vitaBug${viteBug}`).style.display = "none";
          document.getElementById("moneyBonus").innerHTML = moneyBonus;
          document.getElementById("moneyBonus").style.color = "greenyellow";
          document.getElementById("moneyBonus").style.fontSize = "2rem";
        }, 10000);
        setTimeout(() => {
          document.getElementById("moneyBonus").style.color = "white";
          document.getElementById("moneyBonus").style.fontSize = "0.5rem";
        }, 11000);
        if (viteBug === 1) {
          setTimeout(() => {
            document.getElementById("pBonus").innerHTML =
              "HAI BATTUTO IL BUG!!!";
            document.getElementById(`vitaBug${viteBug}`).style.display = "none";
            document.querySelector(
              ".displayGiocoBonus"
            ).style.backgroundImage = `url("VINCEDEV.gif")`;
            document.getElementById("attacca").style.display = "none";
          }, 11500);
          setTimeout(() => {
            document.getElementById("pBonus").style.color = "greenyellow";
            document.getElementById("pBonus").style.fontSize = "2rem";
            document.getElementById("moneyBonus").style.color = "greenyellow";
            document.getElementById("moneyBonus").style.fontSize = "2rem";
          }, 12000);
          setTimeout(() => {
            document.getElementById("pBonus").style.color = "white";
            document.getElementById("pBonus").style.fontSize = "0.7rem";
            document.getElementById("moneyBonus").style.fontSize = "0.5rem";
          }, 12500);
          setTimeout(() => {
            document.querySelector(".displayGiocoBonus").style.backgroundImage =
              'url("STARTBONUSGIF.gif")';
          }, 18000);
          setTimeout(() => {
            document.querySelector(".displayGiocoBonus").style.backgroundImage =
              'url("SLEEPGIF.gif")';
            money += moneyBonus;
            document.getElementById("money").innerHTML = money;
            console.log(money);
          }, 25000);
          setTimeout(() => {
            document.querySelector(".giocoBonus").style.animation =
              "slideOutToLeft 2s ease forwards";
            btnBetMeno.disabled = false;
            btnBetPiu.disabled = false;
            btnSpin.disabled = false;
          }, 28000);
          setTimeout(() => {}, 29500);
          setTimeout(() => {
            document.querySelector(".giocoBonus").style.display = "none";
          }, 30000);
          setTimeout(() => {
            document.getElementById("vitaDev1").style.display = "block";
            document.getElementById("vitaDev2").style.display = "block";
            document.getElementById("vitaDev3").style.display = "block";
            document.getElementById("vitaDev4").style.display = "block";
            document.getElementById("vitaBug1").style.display = "block";
            document.getElementById("vitaBug2").style.display = "block";
            document.getElementById("vitaBug3").style.display = "block";
            document.getElementById("vitaBug4").style.display = "block";
            viteBug = 5;
            viteDev = 5;
            document.getElementById("pBonus").innerHTML =
              "SCONFIGGI IL BUG PER OTTENERE FINO A 1000 VOLTE LA TUA PUNTATA";
            document.getElementById("pBonus").style.display = "none";
            document.getElementById("attacca").style.display = "block";
            document.getElementById("attacca").style.textAlign = "center";
            document.getElementById("attacca").style.boxShadow = "none";

            document.getElementById("attacca").innerHTML = "INIZIA";
            document.getElementById("moneyBonus").innerHTML = 0;
            document.getElementById("moneyBonus").style.color = "white";
            document.getElementById("moneyBonus").style.fontSize = "0.5rem";
            document.querySelector(".rullo1").style.display = "block";
            document.querySelector(".rullo2").style.display = "block";
            document.querySelector(".giocoBonus").style.animation =
              "slideInFromLeft 3.5s ease-out forwards";
            moneyBonus = 0;
          }, 30500);
        } else {
          setTimeout(() => {
            document.querySelector(".displayGiocoBonus").style.backgroundImage =
              'url("STARTFIGHT.gif")';
            eventListenerBonusPrompt();
          }, 11001);
          console.log("BUG HA PERSO UNA VITA ");

          console.log(viteBug);
        }
      } else if (colpoGif === "COLPOBUG.gif") {
        viteDev--;
        if (viteDev === 1) {
          setTimeout(() => {
            document.getElementById("pBonus").innerHTML =
              "IL BUG TI HA BATTUTO ";
            document.getElementById(`vitaDev${viteDev}`).style.display = "none";
            document.querySelector(
              ".displayGiocoBonus"
            ).style.backgroundImage = `url("VINCEBUG.gif")`;
            document.getElementById("attacca").style.display = "none";
          }, 11500);
          setTimeout(() => {
            document.getElementById("pBonus").style.color = "red";
            document.getElementById("pBonus").style.fontSize = "2rem";
            document.getElementById("moneyBonus").style.color = "greenyellow";
            document.getElementById("moneyBonus").style.fontSize = "2rem";
          }, 12000);
          setTimeout(() => {
            document.getElementById("pBonus").style.color = "white";
            document.getElementById("pBonus").style.fontSize = "0.8rem";
            document.getElementById("moneyBonus").style.fontSize = "0.5rem";
          }, 12500);
          setTimeout(() => {
            document.querySelector(".displayGiocoBonus").style.backgroundImage =
              'url("STARTBONUSGIF.gif")';
          }, 18000);
          setTimeout(() => {
            document.querySelector(".displayGiocoBonus").style.backgroundImage =
              'url("SLEEPGIF.gif")';
          }, 25000);
          setTimeout(() => {
            document.querySelector(".giocoBonus").style.animation =
              "slideOutToLeft 2s ease forwards";
            btnBetMeno.disabled = false;
            btnBetPiu.disabled = false;
            btnSpin.disabled = false;
            money += moneyBonus;
            document.getElementById("money").innerHTML = money;
            console.log(money);
          }, 28000);

          setTimeout(() => {
            document.querySelector(".giocoBonus").style.display = "none";
          }, 30000);
          setTimeout(() => {
            document.getElementById("vitaDev1").style.display = "block";
            document.getElementById("vitaDev2").style.display = "block";
            document.getElementById("vitaDev3").style.display = "block";
            document.getElementById("vitaDev4").style.display = "block";
            document.getElementById("vitaBug1").style.display = "block";
            document.getElementById("vitaBug2").style.display = "block";
            document.getElementById("vitaBug3").style.display = "block";
            document.getElementById("vitaBug4").style.display = "block";
            viteBug = 5;
            viteDev = 5;
            document.getElementById("pBonus").innerHTML =
              "SCONFIGGI IL BUG PER OTTENERE FINO A 1000 VOLTE LA TUA PUNTATA";
            document.getElementById("pBonus").style.display = "none";
            document.getElementById("attacca").style.display = "block";
            document.getElementById("attacca").style.textAlign = "center";
            document.getElementById("attacca").style.boxShadow = "none";

            document.getElementById("attacca").innerHTML = "INIZIA";
            document.getElementById("moneyBonus").innerHTML = 0;
            document.getElementById("moneyBonus").style.color = "white";
            document.getElementById("moneyBonus").style.fontSize = "0.5rem";
            document.querySelector(".rullo1").style.display = "block";
            document.querySelector(".rullo2").style.display = "block";
            document.querySelector(".giocoBonus").style.animation =
              "slideInFromLeft 3.5s ease-out forwards";
            moneyBonus = 0;
          }, 30500);
        } else {
          setTimeout(() => {
            document.querySelector(`#pBonus`).innerHTML =
              "IL BUG E' RIUSCITO A COLPIRTI ";
          }, 9000);
          setTimeout(() => {
            document.getElementById(`vitaDev${viteDev}`).style.display = "none";
          }, 10000);
          setTimeout(() => {
            document.querySelector(".displayGiocoBonus").style.backgroundImage =
              'url("STARTFIGHT.gif")';
          }, 10001);
          setTimeout(() => {
            eventListenerBonusPrompt();
          }, 11000);
          console.log("DEV HA PERSO UNA VITA ");

          console.log(viteDev);
        }
      }

      // 🔚 Risolvi dopo breve delay
      setTimeout(() => {
        resolve("COLPO ESEGUITO");
      }, 1000);
    };

    // 💥 Aggiungo il listener (una sola volta)
    document.querySelector("#attacca").addEventListener("click", handler);
  });
}
