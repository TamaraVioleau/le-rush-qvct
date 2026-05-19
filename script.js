/*
  Le Rush QVCT — Fresque interactive
  Compatible GitHub Pages · JavaScript vanilla · Sans cookie ni tracker
*/

const GOOGLE_FORMS_ACTION_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSczIo_lgErL3R8OX4swXLeV4swh2S6_Uh5GZThDWFydbWFuEw/formResponse";
const STORAGE_KEY = "rush-qvct-sector";

const sectors = {
  restaurant: {
    label: "Restaurant / brasserie / concept food",
    place: "les espaces de production, de vente et d’accueil",
    moment: "une journée d’activité classique",
    team: "les équipes cuisine, salle, accueil et support",
    manager: "la personne référente",
  },
  hotel: {
    label: "Hôtellerie-restauration",
    place:
      "la réception, les étages, le petit-déjeuner et les espaces de restauration",
    moment: "une journée rythmée entre accueil, production et coordination",
    team: "les équipes réception, étages, restauration et support",
    manager: "la personne responsable de l’organisation",
  },
  bar: {
    label: "Café / bar / coffee shop",
    place: "le comptoir, la terrasse, la réserve et les espaces clients",
    moment: "une journée alternant préparation, accueil et vente",
    team: "l’équipe bar, accueil, vente et préparation",
    manager: "la personne référente sur place",
  },
  collective: {
    label: "Restauration collective / cuisine centrale",
    place: "les zones de production, de distribution, de stockage et de plonge",
    moment:
      "une journée organisée autour de la production et de la distribution",
    team: "les équipes de production, distribution, logistique et plonge",
    manager: "la personne responsable de l’activité",
  },
  rapide: {
    label: "Restauration rapide / vente à emporter / livraison",
    place: "la zone de préparation, le comptoir, le retrait et les commandes",
    moment:
      "une journée avec des flux variables entre préparation, vente et livraison",
    team: "les équipes production, vente, livraison et coordination",
    manager: "la personne référente de l’équipe",
  },
  autre: {
    label: "Foodbusiness / métiers de bouche",
    place: "les espaces de travail, de préparation, de vente ou de production",
    moment: "une journée d’activité ordinaire",
    team: "l’équipe terrain",
    manager: "la personne référente",
  },
};

const tagLabels = {
  organisation: "Organisation réelle du travail",
  integration: "Accueil, transmission et intégration",
  pauses: "Récupération, rythme et fatigue",
  communication: "Communication, coopération et climat d’équipe",
  prevention: "Prévention des risques professionnels",
  planning: "Planning, charge et équilibre de l’activité",
  duerp: "Remontées terrain, DUERP et amélioration continue",
};

const actionMap = {
  organisation:
    "Clarifier le fonctionnement quotidien : rôles, priorités, relais possibles, points de vigilance et règles communes.",
  integration:
    "Prévoir un parcours d’accueil simple : binôme, consignes essentielles, points de repère et temps de questions identifié.",
  pauses:
    "Rendre les temps de récupération visibles dans l’organisation, même courts, pour prévenir la fatigue et les erreurs.",
  communication:
    "Installer un rituel d’échange court et régulier pour traiter les irritants avant qu’ils ne deviennent des tensions.",
  prevention:
    "Transformer les risques du quotidien en actions concrètes : rangement, matériel, gestes, circulation, consignes et suivi.",
  planning:
    "Comparer régulièrement le planning prévu avec la charge réelle pour ajuster les effectifs, les priorités et les temps de récupération.",
  duerp:
    "Faire remonter les situations récurrentes dans le plan d’action et le DUERP afin de passer du constat à l’amélioration durable.",
};

const questions = [
  {
    id: "organisation-quotidienne",
    tag: "organisation",
    title: "L’organisation du travail au quotidien",
    scene:
      "Dans {place}, {team} commence {moment}. Les tâches sont connues, mais la répartition dépend beaucoup des habitudes. Certaines consignes restent implicites et tout le monde ne sait pas toujours à qui s’adresser.",
    qvct: "Enjeu QVCT : une organisation claire réduit la charge mentale, limite les malentendus et aide chacun à travailler dans de meilleures conditions.",
    choices: [
      {
        label:
          "Clarifier les rôles, les priorités, les points de vigilance et les relais possibles dès le début de la journée.",
        score: 100,
        level: "good",
        feedback:
          "Bon réflexe. La QVCT commence par une organisation lisible : chacun sait ce qu’il doit faire, avec qui coopérer et quand demander de l’aide.",
      },
      {
        label:
          "Laisser l’équipe s’organiser naturellement, puis intervenir seulement si un problème apparaît.",
        score: 60,
        level: "medium",
        feedback:
          "Cela peut fonctionner avec une équipe expérimentée, mais cela reste fragile. Quand tout repose sur l’habitude, les nouveaux, les renforts ou les personnes fatiguées peuvent vite être perdues.",
      },
      {
        label:
          "Considérer que chacun connaît son poste et que l’organisation se réglera au fil de la journée.",
        score: 20,
        level: "risky",
        feedback:
          "Choix risqué. L’implicite crée de la charge mentale, des erreurs, des tensions et une dépendance aux personnes les plus expérimentées.",
      },
    ],
  },
  {
    id: "integration-reperes",
    tag: "integration",
    title: "Une nouvelle personne prend ses repères",
    scene:
      "Une personne récemment arrivée rejoint {team}. Elle observe, hésite sur certaines pratiques, ne connaît pas encore les règles importantes et n’ose pas toujours solliciter {manager}.",
    qvct: "Enjeu QVCT : une intégration structurée protège la personne, sécurise l’activité et évite que l’apprentissage repose uniquement sur l’observation.",
    choices: [
      {
        label:
          "Prévoir un binôme, transmettre les consignes essentielles et organiser un court point de suivi en fin de journée.",
        score: 100,
        level: "good",
        feedback:
          "Très bon choix. Un accueil clair limite le stress, les erreurs et le sentiment d’isolement. C’est un levier QVCT très concret.",
      },
      {
        label:
          "Lui confier d’abord des tâches simples, puis compléter les explications quand l’activité sera plus calme.",
        score: 60,
        level: "medium",
        feedback:
          "C’est protecteur, mais incomplet. Les tâches simples ne remplacent pas les repères essentiels : sécurité, priorités, personnes ressources et règles de fonctionnement.",
      },
      {
        label:
          "La laisser apprendre en observant les autres, comme cela se fait souvent dans les métiers de terrain.",
        score: 20,
        level: "risky",
        feedback:
          "Choix risqué. L’apprentissage par immersion seule peut créer du stress, des erreurs et une intégration inégale selon les personnes présentes.",
      },
    ],
  },
  {
    id: "recuperation-fatigue",
    tag: "pauses",
    title: "Les temps de récupération disparaissent facilement",
    scene:
      "Au fil de {moment}, {team} enchaîne les tâches. Les pauses sont prévues, mais elles sautent facilement lorsque l’activité s’accumule, les livraisons arrivent ou que certaines personnes compensent pour les autres.",
    qvct: "Enjeu QVCT : la récupération fait partie de l’organisation du travail. Elle prévient la fatigue, les erreurs, les accidents et l’usure professionnelle.",
    choices: [
      {
        label:
          "Identifier les moments où chacun peut réellement récupérer, même brièvement, et les intégrer à l’organisation.",
        score: 100,
        level: "good",
        feedback:
          "Bon réflexe. Une pause courte mais réelle vaut mieux qu’une pause théorique jamais prise. La récupération doit être organisée, pas seulement autorisée.",
      },
      {
        label:
          "Rappeler à chacun de prendre une pause quand il ou elle en ressent le besoin.",
        score: 60,
        level: "medium",
        feedback:
          "L’intention est bonne, mais insuffisante. Dans les métiers du foodbusiness, beaucoup de personnes n’osent pas s’arrêter si l’organisation ne le rend pas possible.",
      },
      {
        label:
          "Laisser l’équipe gérer : dans ces métiers, chacun sait que les pauses dépendent de l’activité.",
        score: 20,
        level: "risky",
        feedback:
          "Choix risqué. Quand la récupération dépend seulement de la bonne volonté ou du moment disponible, elle disparaît souvent au détriment de la santé et de la qualité du travail.",
      },
    ],
  },
  {
    id: "communication-irritants",
    tag: "communication",
    title: "Un irritant crée des tensions dans l’équipe",
    scene:
      "Dans {place}, un irritant revient régulièrement : information transmise trop tard, matériel déplacé, consigne différente selon les personnes, retard non anticipé ou remarque maladroite. Le climat se tend sans que le sujet soit vraiment traité.",
    qvct: "Enjeu QVCT : traiter les irritants du quotidien améliore la coopération, la qualité du travail et la santé mentale des équipes.",
    choices: [
      {
        label:
          "Nommer le problème factuellement, écouter les personnes concernées et décider d’un ajustement concret à tester.",
        score: 100,
        level: "good",
        feedback:
          "Très bon réflexe. La QVCT se joue souvent dans ces petits irritants répétés. Les traiter tôt évite qu’ils deviennent des conflits installés.",
      },
      {
        label:
          "Attendre un moment plus calme pour en reparler avec les personnes concernées.",
        score: 60,
        level: "medium",
        feedback:
          "Cela peut être pertinent, à condition de fixer un vrai moment. Sinon, le sujet risque d’être repoussé jusqu’à devenir une tension permanente.",
      },
      {
        label:
          "Ne pas trop s’attarder dessus : les tensions font partie du travail en équipe.",
        score: 20,
        level: "risky",
        feedback:
          "Choix risqué. Banaliser les tensions empêche d’améliorer le fonctionnement collectif et peut créer du désengagement ou de l’épuisement.",
      },
    ],
  },
  {
    id: "risques-banalises",
    tag: "prevention",
    title: "Un risque du quotidien est banalisé",
    scene:
      "Dans {place}, plusieurs situations semblent devenues normales : sol humide, gestes répétitifs, port de charges, matériel mal rangé, circulation difficile ou équipements utilisés par habitude. Personne n’est blessé, mais les signaux sont là.",
    qvct: "Enjeu QVCT : la prévention ne concerne pas seulement les accidents graves. Elle commence par les risques ordinaires que l’on finit par ne plus voir.",
    choices: [
      {
        label:
          "Repérer le risque, chercher sa cause et décider d’une action simple : rangement, consigne, matériel, circulation ou organisation.",
        score: 100,
        level: "good",
        feedback:
          "Excellent réflexe. Les risques du quotidien sont souvent les plus importants à traiter, car ils se répètent et finissent par user les équipes.",
      },
      {
        label:
          "Faire un rappel général à la vigilance et demander à chacun de faire attention.",
        score: 60,
        level: "medium",
        feedback:
          "Utile, mais limité. La vigilance individuelle ne suffit pas si l’organisation, l’espace ou le matériel créent toujours le même risque.",
      },
      {
        label:
          "Considérer que ce sont les contraintes normales des métiers de bouche et du terrain.",
        score: 20,
        level: "risky",
        feedback:
          "Choix risqué. Dire que cela fait partie du métier revient à accepter des risques évitables et à retarder les actions de prévention.",
      },
    ],
  },
  {
    id: "planning-charge-reelle",
    tag: "planning",
    title: "Le planning ne reflète pas toujours la charge réelle",
    scene:
      "Sur le papier, l’organisation semble tenir. Mais dans la réalité, {team} doit absorber des commandes supplémentaires, des livraisons, des absences, des pics d’accueil, de la préparation, du nettoyage ou des tâches administratives peu visibles.",
    qvct: "Enjeu QVCT : un planning efficace doit tenir compte du travail réel, pas seulement des horaires ou des postes prévus.",
    choices: [
      {
        label:
          "Comparer régulièrement le planning prévu avec la charge réelle et ajuster les priorités, les renforts ou les tâches reportables.",
        score: 100,
        level: "good",
        feedback:
          "Très bon choix. La charge réelle est souvent plus large que ce qui est visible. L’analyser permet d’éviter que l’équilibre repose toujours sur les mêmes personnes.",
      },
      {
        label:
          "Demander à l’équipe de signaler les journées trop lourdes pour ajuster plus tard si cela se répète.",
        score: 60,
        level: "medium",
        feedback:
          "C’est une première étape utile, mais elle doit déboucher sur un suivi concret. Sinon, les remontées risquent de ne pas produire de changement.",
      },
      {
        label:
          "Se baser sur le planning prévu : si tout est couvert, l’organisation est suffisante.",
        score: 20,
        level: "risky",
        feedback:
          "Choix risqué. Un planning peut sembler complet tout en masquant une surcharge réelle, des interruptions constantes ou des tâches invisibles.",
      },
    ],
  },
  {
    id: "amelioration-continue",
    tag: "duerp",
    title: "Les problèmes remontent, mais peu de choses changent",
    scene:
      "Après plusieurs semaines dans {place}, les mêmes sujets reviennent : fatigue, matériel peu adapté, circulation difficile, manque d’information, tension entre postes ou difficulté à intégrer les nouveaux. Tout le monde connaît le problème, mais il reste dans les conversations.",
    qvct: "Enjeu QVCT : les remontées terrain doivent devenir des actions suivies. C’est aussi ce qui permet d’alimenter le DUERP et le plan de prévention.",
    choices: [
      {
        label:
          "Choisir un sujet prioritaire, définir une action simple, fixer un responsable de suivi et vérifier si l’amélioration fonctionne.",
        score: 100,
        level: "good",
        feedback:
          "Très bon réflexe. La QVCT devient concrète quand les problèmes observés produisent des décisions visibles, testées et suivies.",
      },
      {
        label:
          "Noter les sujets pour une réunion ultérieure ou une période plus calme.",
        score: 60,
        level: "medium",
        feedback:
          "C’est mieux que rien, mais attention au sujet qui disparaît. Il faut au moins une date, une première action ou une personne chargée du suivi.",
      },
      {
        label:
          "Considérer que ces problèmes sont connus et qu’ils font partie du fonctionnement habituel.",
        score: 20,
        level: "risky",
        feedback:
          "Choix risqué. Quand les irritants deviennent normaux, ils installent l’usure, la résignation et empêchent l’amélioration réelle des conditions de travail.",
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
        "Merci, votre demande a bien été prise en compte. Vous recevrez prochainement la newsletter Zest’us d’After All.";
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
    errors.push("Le consentement est obligatoire pour recevoir la newsletter.");
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

const privacyDialog = document.querySelector("#privacy-dialog");
const openPrivacyButton = document.querySelector("[data-open-privacy]");
const closePrivacyButton = document.querySelector("[data-close-privacy]");

if (privacyDialog && openPrivacyButton && closePrivacyButton) {
  openPrivacyButton.addEventListener("click", () => {
    privacyDialog.showModal();
    closePrivacyButton.focus();
  });

  closePrivacyButton.addEventListener("click", () => {
    privacyDialog.close();
    openPrivacyButton.focus();
  });

  privacyDialog.addEventListener("click", (event) => {
    if (event.target === privacyDialog) {
      privacyDialog.close();
      openPrivacyButton.focus();
    }
  });
}

init();
