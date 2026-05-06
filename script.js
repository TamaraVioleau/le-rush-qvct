/*
  Le Rush QVCT — Fresque interactive
  Compatible GitHub Pages · JavaScript vanilla · Sans cookie ni tracker
*/

const GOOGLE_FORMS_ACTION_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSczIo_lgErL3R8OX4swXLeV4swh2S6_Uh5GZThDWFydbWFuEw/formResponse";
const STORAGE_KEY = "rush-qvct-sector";

const sectors = {
  restaurant: {
    label: "Restaurant / brasserie",
    place: "la cuisine et la salle",
    moment: "le coup de feu du midi",
    team: "la brigade et l’équipe de salle",
    manager: "le responsable de service",
  },
  hotel: {
    label: "Hôtellerie",
    place: "la réception, les étages et le petit-déjeuner",
    moment: "l’arrivée simultanée de clients et les départs du matin",
    team: "la réception, les étages et l’équipe petit-déjeuner",
    manager: "le responsable d’exploitation",
  },
  bar: {
    label: "Café / bar",
    place: "le comptoir et la terrasse",
    moment: "l’affluence de fin de journée",
    team: "l’équipe bar et terrasse",
    manager: "le responsable du bar",
  },
  collective: {
    label: "Restauration collective",
    place: "la production, le self et la plonge",
    moment: "la montée en charge du service",
    team: "l’équipe de production et de distribution",
    manager: "le chef de production",
  },
  rapide: {
    label: "Restauration rapide",
    place: "le comptoir, la cuisine et la zone de retrait",
    moment: "le pic de commandes sur place, livraison et drive",
    team: "l’équipe comptoir et production",
    manager: "le manager de shift",
  },
  autre: {
    label: "Autre établissement CHR",
    place: "les zones de service",
    moment: "une période de forte activité",
    team: "l’équipe terrain",
    manager: "le manager de proximité",
  },
};

const tagLabels = {
  organisation: "Organisation du travail",
  integration: "Intégration des nouveaux et saisonniers",
  pauses: "Pauses, récupération et fatigue",
  communication: "Communication et gestion des tensions",
  prevention: "Prévention des risques physiques",
  planning: "Charge de travail et planning",
  duerp: "Remontée terrain, DUERP et amélioration continue",
};

const actionMap = {
  organisation:
    "Formaliser un briefing de 5 minutes avant les pics d’activité : rôles, priorités, points sensibles et entraide possible.",
  integration:
    "Prévoir un binôme identifié pour chaque nouveau ou saisonnier, avec une consigne simple : personne ne doit découvrir seul les règles critiques.",
  pauses:
    "Rendre les pauses visibles dans l’organisation du service, même courtes, pour limiter l’usure et les erreurs liées à la fatigue.",
  communication:
    "Installer un rituel de débrief court après les situations tendues : faits, impacts, décision utile pour le prochain service.",
  prevention:
    "Traiter les presque-accidents comme des alertes utiles : sécuriser tout de suite, puis ajuster les consignes ou le matériel.",
  planning:
    "Prévoir un plan B d’absence ou de surcharge avant le rush : priorités, renforts possibles, tâches reportables.",
  duerp:
    "Mettre à jour le DUERP à partir du réel terrain : incidents, irritants fréquents, retours d’équipe et actions suivies.",
};

const questions = [
  {
    id: "briefing-rush",
    tag: "organisation",
    title: "Le service démarre déjà sous pression",
    scene:
      "Dans {place}, {team} sent que {moment} va être dense. Deux personnes demandent des consignes en même temps, les priorités ne sont pas claires et {manager} doit lancer le service.",
    qvct: "Enjeu QVCT : clarifier l’organisation avant le rush évite les tensions inutiles et soutient la performance du service.",
    choices: [
      {
        label:
          "Faire un briefing express : priorités, rôles, points de vigilance et entraide attendue.",
        score: 100,
        level: "good",
        feedback:
          "Bon réflexe. Un cadrage très court avant l’action réduit les malentendus et sécurise l’équipe sans ralentir le service.",
      },
      {
        label:
          "Répondre aux questions au fil de l’eau, en fonction des urgences qui arrivent.",
        score: 60,
        level: "medium",
        feedback:
          "Réflexe compréhensible, mais fragile. Cela peut fonctionner ponctuellement, mais l’équipe risque de courir après l’information.",
      },
      {
        label:
          "Accélérer tout de suite : chacun connaît son métier, il faut produire.",
        score: 20,
        level: "risky",
        feedback:
          "Choix risqué. Sous pression, l’implicite crée des erreurs, des tensions et une charge mentale plus forte pour tout le monde.",
      },
    ],
  },
  {
    id: "nouveau-saisonnier",
    tag: "integration",
    title: "Une nouvelle personne arrive dans le rythme du service",
    scene:
      "Une personne récemment arrivée rejoint {team}. Elle observe, hésite sur certaines consignes et n’ose pas interrompre {manager} pendant {moment}.",
    qvct: "Enjeu QVCT : une intégration structurée limite les erreurs, le stress et les risques, surtout en période de forte activité.",
    choices: [
      {
        label:
          "Désigner un binôme, rappeler les consignes critiques et prévoir un point rapide après le service.",
        score: 100,
        level: "good",
        feedback:
          "Très bon choix. Le binôme sécurise l’apprentissage et évite de laisser la personne seule face aux risques du terrain.",
      },
      {
        label:
          "Lui confier uniquement des tâches simples jusqu’à ce qu’elle prenne le rythme.",
        score: 60,
        level: "medium",
        feedback:
          "C’est protecteur, mais incomplet. Les tâches simples ne remplacent pas l’explication des règles, des priorités et des points de vigilance.",
      },
      {
        label:
          "La laisser apprendre en observant : dans le CHR, on comprend vite en faisant.",
        score: 20,
        level: "risky",
        feedback:
          "Choix risqué. L’apprentissage par immersion seule augmente les erreurs, l’isolement et l’exposition aux situations dangereuses.",
      },
    ],
  },
  {
    id: "pauses-fatigue",
    tag: "pauses",
    title: "La fatigue commence à se voir",
    scene:
      "Après plusieurs heures dans {place}, les gestes deviennent moins précis. Une personne souffle qu’elle n’a pas pris de pause, mais {moment} n’est pas terminé.",
    qvct: "Enjeu QVCT : organiser la récupération est un levier de sécurité, de qualité de service et de prévention de l’usure.",
    choices: [
      {
        label:
          "Réorganiser temporairement les postes pour permettre une pause courte et réelle.",
        score: 100,
        level: "good",
        feedback:
          "Bon réflexe terrain. Une pause courte mais effective peut éviter une erreur, une blessure ou une tension qui coûtera plus cher au collectif.",
      },
      {
        label:
          "Proposer de tenir encore un peu, puis de faire une pause dès que le flux baisse.",
        score: 60,
        level: "medium",
        feedback:
          "Cela peut dépanner, mais attention à la pause qui disparaît. Sans décision claire, la récupération passe souvent après tout le reste.",
      },
      {
        label:
          "Reporter la pause : le service client passe avant, l’équipe récupérera ensuite.",
        score: 20,
        level: "risky",
        feedback:
          "Choix risqué. La fatigue accumulée augmente les erreurs, les accidents et l’irritabilité, y compris face aux clients.",
      },
    ],
  },
  {
    id: "incivilite-client",
    tag: "communication",
    title: "Une tension client déborde sur l’équipe",
    scene:
      "Un client s’emporte. Le ton monte près de {place}. Une personne de {team} encaisse la remarque, continue à travailler, mais le climat se tend.",
    qvct: "Enjeu QVCT : soutenir l’équipe face aux incivilités protège la santé mentale, la cohésion et la qualité de la relation client.",
    choices: [
      {
        label:
          "Intervenir calmement, poser un cadre au client, puis faire un court débrief avec la personne concernée.",
        score: 100,
        level: "good",
        feedback:
          "Très bon réflexe. Le manager protège le cadre de travail sans dramatiser, puis transforme l’incident en apprentissage collectif.",
      },
      {
        label:
          "Laisser passer l’épisode, puis demander plus tard si tout va bien.",
        score: 60,
        level: "medium",
        feedback:
          "L’intention est bonne, mais tardive. Sans cadre visible, l’équipe peut avoir l’impression que subir fait partie du métier.",
      },
      {
        label:
          "Demander à l’équipe de rester professionnelle quoi qu’il arrive.",
        score: 20,
        level: "risky",
        feedback:
          "Choix fragile. Le professionnalisme ne doit pas signifier accepter l’incivilité sans soutien ni règle claire.",
      },
    ],
  },
  {
    id: "presque-accident",
    tag: "prevention",
    title: "Un presque-accident est signalé",
    scene:
      "Dans {place}, quelqu’un manque de glisser ou de se blesser. Il n’y a pas d’arrêt, le service continue, mais plusieurs personnes ont vu la scène.",
    qvct: "Enjeu QVCT : traiter les signaux faibles évite d’attendre l’accident pour agir.",
    choices: [
      {
        label:
          "Sécuriser immédiatement la zone, identifier la cause et noter l’action à suivre.",
        score: 100,
        level: "good",
        feedback:
          "Excellent réflexe. Un presque-accident est une information précieuse : il permet d’agir avant qu’un dommage réel ne survienne.",
      },
      {
        label: "Rappeler rapidement à tout le monde de faire attention.",
        score: 60,
        level: "medium",
        feedback:
          "Utile, mais insuffisant. La vigilance individuelle ne remplace pas une action sur la cause : sol, matériel, flux, rangement ou consigne.",
      },
      {
        label:
          "Ne pas interrompre le service puisqu’il n’y a pas eu de blessure.",
        score: 20,
        level: "risky",
        feedback:
          "Choix risqué. Ignorer un signal faible laisse le danger en place et banalise les alertes terrain.",
      },
    ],
  },
  {
    id: "absence-planning",
    tag: "planning",
    title: "Une absence déséquilibre l’organisation",
    scene:
      "Une absence tombe au mauvais moment. {team} sait que {moment} sera plus tendu que prévu, et chacun commence à compenser à sa manière.",
    qvct: "Enjeu QVCT : anticiper la surcharge limite l’épuisement et évite que la performance repose seulement sur l’effort individuel.",
    choices: [
      {
        label:
          "Prioriser les tâches, répartir la charge, identifier ce qui peut être reporté et prévenir l’équipe du plan.",
        score: 100,
        level: "good",
        feedback:
          "Très bon choix. La surcharge se pilote mieux quand les arbitrages sont explicites et partagés.",
      },
      {
        label:
          "Demander à l’équipe de s’entraider davantage jusqu’à la fin du service.",
        score: 60,
        level: "medium",
        feedback:
          "L’entraide est précieuse, mais elle doit être organisée. Sinon, elle repose souvent sur les mêmes personnes.",
      },
      {
        label: "Compenser en accélérant et en réduisant les temps de pause.",
        score: 20,
        level: "risky",
        feedback:
          "Choix risqué. Réduire la récupération pour absorber la charge peut créer de l’usure, des erreurs et des tensions.",
      },
    ],
  },
  {
    id: "duerp-retour",
    tag: "duerp",
    title: "Le même problème revient régulièrement",
    scene:
      "Après plusieurs services dans {place}, le même irritant revient : circulation difficile, matériel mal placé, consigne floue ou tension répétée. Tout le monde le connaît, mais rien ne change vraiment.",
    qvct: "Enjeu QVCT : relier les retours terrain au plan d’action et au DUERP permet de passer du constat à la prévention durable.",
    choices: [
      {
        label:
          "Organiser un court retour terrain, choisir une action concrète, la suivre et l’intégrer au plan de prévention.",
        score: 100,
        level: "good",
        feedback:
          "Très bon réflexe. La QVCT devient concrète quand les irritants fréquents produisent des décisions visibles et suivies.",
      },
      {
        label:
          "Noter le sujet pour une réunion ultérieure quand la période sera plus calme.",
        score: 60,
        level: "medium",
        feedback:
          "C’est mieux que rien, mais le risque est d’enterrer le sujet. Il faut au moins une première action simple ou une date de suivi.",
      },
      {
        label:
          "Considérer que ces contraintes font partie du métier en période de rush.",
        score: 20,
        level: "risky",
        feedback:
          "Choix risqué. Banaliser les irritants installe l’usure et empêche l’amélioration réelle des conditions de travail.",
      },
    ],
  },
];

let state = {
  sectorKey: "",
  currentQuestionIndex: 0,
  answers: [],
  selectedChoice: null,
};

const dom = {
  sectorStep: document.querySelector("#sector-step"),
  questionStep: document.querySelector("#question-step"),
  resultStep: document.querySelector("#result-step"),
  resultTitle: document.querySelector("#result-title"),
  sectorForm: document.querySelector("#sector-form"),
  sectorError: document.querySelector("#sector-error"),
  questionTitle: document.querySelector("#question-title"),
  questionScene: document.querySelector("#question-scene"),
  questionQvct: document.querySelector("#question-qvct"),
  scenarioTag: document.querySelector("#scenario-tag"),
  choices: document.querySelector("#choices"),
  feedback: document.querySelector("#feedback"),
  nextQuestion: document.querySelector("#next-question"),
  restartFromQuestion: document.querySelector("#restart-from-question"),
  progressText: document.querySelector("#progress-text"),
  currentScore: document.querySelector("#current-score"),
  progressBar: document.querySelector("#progress-bar"),
  finalScore: document.querySelector("#final-score"),
  scoreLevel: document.querySelector("#score-level"),
  scoreMessage: document.querySelector("#score-message"),
  strengthsList: document.querySelector("#strengths-list"),
  watchList: document.querySelector("#watch-list"),
  actionsList: document.querySelector("#actions-list"),
  printSummary: document.querySelector("#print-summary"),
  restartGame: document.querySelector("#restart-game"),
  leadForm: document.querySelector("#lead-form"),
  leadSector: document.querySelector("#leadSector"),
  formErrors: document.querySelector("#form-errors"),
  formStatus: document.querySelector("#form-status"),
};

function init() {
  restoreSector();
  bindEvents();
}

function bindEvents() {
  dom.sectorForm.addEventListener("submit", handleSectorSubmit);
  dom.nextQuestion.addEventListener("click", goToNextQuestion);
  dom.restartFromQuestion.addEventListener("click", resetGame);
  dom.restartGame.addEventListener("click", resetGame);
  dom.printSummary.addEventListener("click", () => window.print());
  dom.leadForm.addEventListener("submit", handleLeadSubmit);

  document.querySelectorAll("[data-start-link]").forEach((link) => {
    link.addEventListener("click", () => {
      setTimeout(() => {
        const checked = dom.sectorForm.querySelector(
          "input[name='sector']:checked",
        );
        if (!checked) {
          dom.sectorForm.querySelector("input[name='sector']").focus();
        }
      }, 200);
    });
  });
}

function restoreSector() {
  try {
    const savedSector = localStorage.getItem(STORAGE_KEY);
    if (savedSector && sectors[savedSector]) {
      const input = dom.sectorForm.querySelector(
        `input[value="${savedSector}"]`,
      );
      if (input) {
        input.checked = true;
        syncLeadSector(savedSector);
      }
    }
  } catch (error) {
    // localStorage peut être indisponible selon le navigateur ou le contexte.
  }
}

function saveSector(sectorKey) {
  try {
    localStorage.setItem(STORAGE_KEY, sectorKey);
  } catch (error) {
    // Amélioration progressive uniquement : l’expérience reste fonctionnelle sans stockage.
  }
}

function handleSectorSubmit(event) {
  event.preventDefault();

  const formData = new FormData(dom.sectorForm);
  const sectorKey = formData.get("sector");

  if (!sectorKey || !sectors[sectorKey]) {
    dom.sectorError.hidden = false;
    return;
  }

  dom.sectorError.hidden = true;
  state.sectorKey = sectorKey;
  state.currentQuestionIndex = 0;
  state.answers = [];
  state.selectedChoice = null;

  saveSector(sectorKey);
  syncLeadSector(sectorKey);
  showQuestionStep();
}

function showQuestionStep() {
  dom.sectorStep.hidden = true;
  dom.resultStep.hidden = true;
  dom.questionStep.hidden = false;
  renderQuestion();
}

function renderQuestion() {
  const question = questions[state.currentQuestionIndex];
  const sector = sectors[state.sectorKey] || sectors.autre;
  const progressValue = (state.currentQuestionIndex / questions.length) * 100;
  const provisionalScore = calculateScore(state.answers);

  state.selectedChoice = null;

  dom.progressText.textContent = `Question ${state.currentQuestionIndex + 1} sur ${questions.length}`;
  dom.currentScore.textContent = `Score provisoire : ${provisionalScore}`;
  dom.progressBar.style.width = `${progressValue}%`;
  dom.scenarioTag.textContent = `Situation terrain · ${sector.label}`;
  dom.questionTitle.textContent = question.title;
  dom.questionScene.textContent = applySectorTokens(question.scene, sector);
  dom.questionQvct.textContent = question.qvct;

  dom.feedback.hidden = true;
  dom.feedback.className = "feedback";
  dom.feedback.innerHTML = "";
  dom.nextQuestion.hidden = true;
  dom.nextQuestion.textContent =
    state.currentQuestionIndex === questions.length - 1
      ? "Voir mon diagnostic"
      : "Continuer";

  dom.choices.innerHTML = "";
  shuffleArray(question.choices).forEach((choice) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice-button";
    button.textContent = choice.label;
    button.addEventListener("click", () => selectChoice(choice, button));
    dom.choices.appendChild(button);
  });

  dom.questionTitle.focus();
}

function selectChoice(choice, button) {
  if (state.selectedChoice) return;

  state.selectedChoice = choice;

  const buttons = dom.choices.querySelectorAll(".choice-button");
  buttons.forEach((item) => {
    item.disabled = true;
    item.classList.toggle("is-selected", item === button);
  });

  dom.feedback.hidden = false;
  dom.feedback.classList.add(choice.level);
  dom.feedback.innerHTML = `
    <strong>${getFeedbackTitle(choice.level)}</strong>
    <span>${choice.feedback}</span>
  `;

  dom.nextQuestion.hidden = false;
  dom.nextQuestion.focus();
}

function goToNextQuestion() {
  if (!state.selectedChoice) return;

  const question = questions[state.currentQuestionIndex];

  state.answers.push({
    questionId: question.id,
    title: question.title,
    tag: question.tag,
    score: state.selectedChoice.score,
    level: state.selectedChoice.level,
    label: state.selectedChoice.label,
    feedback: state.selectedChoice.feedback,
  });

  state.currentQuestionIndex += 1;

  if (state.currentQuestionIndex >= questions.length) {
    showResults();
    return;
  }

  renderQuestion();
}

function showResults() {
  const score = calculateScore(state.answers);
  const level = getScoreLevel(score);
  const synthesis = buildSynthesis();

  dom.questionStep.hidden = true;
  dom.resultStep.hidden = false;
  dom.progressBar.style.width = "100%";

  dom.finalScore.textContent = score;
  dom.scoreLevel.textContent = level.title;
  dom.scoreMessage.textContent = level.message;

  renderList(dom.strengthsList, synthesis.strengths);
  renderList(dom.watchList, synthesis.watchPoints);
  renderList(dom.actionsList, synthesis.actions);

  dom.resultTitle.focus();
}

function buildSynthesis() {
  const strengths = [];
  const watchPoints = [];
  const scoresByTag = {};

  state.answers.forEach((answer) => {
    if (!scoresByTag[answer.tag]) {
      scoresByTag[answer.tag] = [];
    }

    scoresByTag[answer.tag].push(answer.score);

    const label = tagLabels[answer.tag];

    if (answer.score >= 76 && !strengths.includes(label)) {
      strengths.push(label);
    }

    if (answer.score < 76 && !watchPoints.includes(label)) {
      watchPoints.push(label);
    }
  });

  const sortedTags = Object.entries(scoresByTag)
    .map(([tag, scores]) => ({
      tag,
      average: scores.reduce((sum, score) => sum + score, 0) / scores.length,
    }))
    .sort((a, b) => a.average - b.average)
    .map((item) => item.tag);

  const actions = sortedTags.slice(0, 3).map((tag) => actionMap[tag]);

  return {
    strengths:
      strengths.length > 0
        ? strengths.slice(0, 4)
        : [
            "Votre diagnostic met surtout en avant des marges de progression : c’est une base utile pour prioriser.",
          ],
    watchPoints:
      watchPoints.length > 0
        ? watchPoints.slice(0, 4)
        : [
            "Aucun point critique majeur dans vos choix : l’enjeu principal est maintenant de pérenniser les pratiques.",
          ],
    actions:
      actions.length > 0
        ? actions
        : [actionMap.organisation, actionMap.communication, actionMap.duerp],
  };
}

function renderList(listElement, items) {
  listElement.innerHTML = "";

  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    listElement.appendChild(li);
  });
}

function calculateScore(answers) {
  if (!answers.length) return 0;

  const total = answers.reduce((sum, answer) => sum + answer.score, 0);
  return Math.round(total / answers.length);
}

function getScoreLevel(score) {
  if (score <= 45) {
    return {
      title:
        "Zone de vigilance : vos équipes tiennent, mais le système fatigue.",
      message:
        "Votre diagnostic indique que plusieurs décisions reposent encore sur l’urgence, l’effort individuel ou l’implicite. La priorité est de structurer quelques règles simples pour protéger l’équipe et stabiliser l’activité.",
    };
  }

  if (score <= 75) {
    return {
      title:
        "Bases solides : vous avez de bons réflexes, mais certains points doivent être structurés.",
      message:
        "Vos choix montrent une culture terrain déjà présente. Pour progresser, l’enjeu est de transformer les bons réflexes en pratiques régulières, partagées et suivies.",
    };
  }

  return {
    title:
      "Dynamique maîtrisée : vos pratiques soutiennent déjà la QVCT, pensez à les pérenniser.",
    message:
      "Votre diagnostic montre des décisions favorables à la prévention, à l’organisation et au soutien des équipes. La prochaine étape consiste à documenter ces pratiques et à les faire vivre dans la durée.",
  };
}

function getFeedbackTitle(level) {
  const titles = {
    good: "Réflexe QVCT solide",
    medium: "Réflexe utile, à structurer",
    risky: "Point de vigilance",
  };

  return titles[level] || "Feedback";
}

function applySectorTokens(text, sector) {
  return text
    .replaceAll("{place}", sector.place)
    .replaceAll("{moment}", sector.moment)
    .replaceAll("{team}", sector.team)
    .replaceAll("{manager}", sector.manager);
}

function syncLeadSector(sectorKey) {
  if (!dom.leadSector || !sectors[sectorKey]) return;
  dom.leadSector.value = sectors[sectorKey].label;
}

function resetGame() {
  state = {
    sectorKey: "",
    currentQuestionIndex: 0,
    answers: [],
    selectedChoice: null,
  };

  dom.questionStep.hidden = true;
  dom.resultStep.hidden = true;
  dom.sectorStep.hidden = false;
  dom.sectorError.hidden = true;
  dom.feedback.hidden = true;

  const firstInput = dom.sectorForm.querySelector("input[name='sector']");
  if (firstInput) {
    firstInput.focus();
  }
}

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function handleLeadSubmit(event) {
  event.preventDefault();

  clearFormState();

  const errors = validateLeadForm();

  if (errors.length > 0) {
    showFormErrors(errors);
    return;
  }

  if (!GOOGLE_FORMS_ACTION_URL) {
    dom.formStatus.textContent =
      "Le formulaire est valide, mais l’URL Google Forms n’est pas encore renseignée. Aucun envoi réel n’a été effectué.";
    return;
  }

  const formData = new FormData(dom.leadForm);

  fetch(GOOGLE_FORMS_ACTION_URL, {
    method: "POST",
    mode: "no-cors",
    body: formData,
  })
    .then(() => {
      dom.leadForm.reset();
      dom.formStatus.textContent =
        "Merci, votre demande a bien été prise en compte. La checklist pourra vous être transmise par l’équipe After All.";
    })
    .catch(() => {
      dom.formErrors.hidden = false;
      dom.formErrors.textContent =
        "L’envoi n’a pas pu aboutir. Veuillez réessayer ou contacter l’équipe After All.";
    });
}

function validateLeadForm() {
  const errors = [];
  const requiredFields = [
    ["firstName", "Le prénom est obligatoire."],
    ["lastName", "Le nom est obligatoire."],
    ["company", "L’établissement est obligatoire."],
    ["role", "La fonction est obligatoire."],
    ["leadSector", "Le type d’établissement est obligatoire."],
    ["email", "L’email est obligatoire."],
  ];

  requiredFields.forEach(([id, message]) => {
    const field = document.getElementById(id);
    const isEmpty = !field.value.trim();

    setInvalidState(field, isEmpty);

    if (isEmpty) {
      errors.push(message);
    }
  });

  const email = document.getElementById("email");
  const emailValue = email.value.trim();

  if (emailValue && !isValidEmail(emailValue)) {
    setInvalidState(email, true);
    errors.push("L’adresse email doit être valide.");
  }

  const consent = document.getElementById("consent");
  setInvalidState(consent, !consent.checked);

  if (!consent.checked) {
    errors.push(
      "Le consentement est obligatoire pour recevoir la checklist et être recontacté.",
    );
  }

  return errors;
}

function setInvalidState(field, isInvalid) {
  field.setAttribute("aria-invalid", String(isInvalid));
}

function clearFormState() {
  dom.formErrors.hidden = true;
  dom.formErrors.innerHTML = "";
  dom.formStatus.textContent = "";

  dom.leadForm.querySelectorAll("[aria-invalid]").forEach((field) => {
    field.removeAttribute("aria-invalid");
  });
}

function showFormErrors(errors) {
  dom.formErrors.hidden = false;

  const list = document.createElement("ul");
  errors.forEach((error) => {
    const li = document.createElement("li");
    li.textContent = error;
    list.appendChild(li);
  });

  dom.formErrors.replaceChildren(list);
  dom.formErrors.focus();
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

init();
