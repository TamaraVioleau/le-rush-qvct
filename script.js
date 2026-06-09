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
  recrutement: "Recrutement et attractivité",
  selection: "Sécurisation du recrutement",
  onboarding: "Accueil et intégration",
  autoformation: "Autoformation terrain",
  turnover: "Prévention du turnover",
  fidelisation: "Fidélisation et engagement",
  pilotage: "Suivi RH et amélioration continue",
};

const actionMap = {
  recrutement:
    "Clarifier vos offres d’emploi : contraintes réelles, horaires, rythme, missions, avantages et conditions d’intégration.",
  selection:
    "Structurer vos entretiens avec une grille simple : compétences attendues, contraintes du poste, disponibilité, motivation et points de vigilance.",
  onboarding:
    "Mettre en place un parcours d’accueil court : checklist du premier jour, binôme référent, consignes prioritaires et point de suivi.",
  autoformation:
    "Créer des supports d’autoformation simples : fiches gestes métier, QR codes, mini-vidéos, rappels hygiène, sécurité et organisation.",
  turnover:
    "Identifier les causes de départ : charge réelle, planning, intégration, reconnaissance, ambiance, management et perspectives d’évolution.",
  fidelisation:
    "Renforcer les leviers de fidélisation : reconnaissance, progression, polyvalence accompagnée, planning lisible et temps d’échange réguliers.",
  pilotage:
    "Suivre quelques indicateurs RH simples : départs précoces, absences, retours d’intégration, irritants récurrents et actions correctives.",
};

const questions = [
  {
    id: "recrutement-offre-claire",
    tag: "recrutement",
    title: "Votre offre d’emploi attire-t-elle les bons profils ?",
    scene:
      "Dans {place}, vous cherchez à renforcer {team}. Les candidatures sont rares, les profils ne correspondent pas toujours et certains candidats découvrent les contraintes du poste trop tard.",
    qvct: "Enjeu QVCT : un recrutement clair limite les malentendus, sécurise l’arrivée des nouveaux et réduit le risque de départ rapide.",
    choices: [
      {
        label:
          "Rédiger une offre transparente avec les missions, les horaires, le rythme, les contraintes réelles et les avantages concrets.",
        score: 100,
        level: "good",
        feedback:
          "Très bon réflexe. Plus votre offre est claire, plus vous attirez des candidats capables de se projeter réellement dans le poste.",
      },
      {
        label:
          "Mettre surtout en avant l’ambiance, la polyvalence et les opportunités, puis détailler les contraintes en entretien.",
        score: 60,
        level: "medium",
        feedback:
          "C’est utile, mais incomplet. Si les contraintes arrivent trop tard, vous risquez de créer une déception dès les premières semaines.",
      },
      {
        label:
          "Publier une annonce courte pour recevoir plus vite des candidatures et préciser les détails après sélection.",
        score: 20,
        level: "risky",
        feedback:
          "Choix risqué. Une annonce trop vague peut générer des candidatures peu adaptées et fragiliser tout le processus de recrutement.",
      },
    ],
  },
  {
    id: "selection-entretien",
    tag: "selection",
    title: "Votre entretien sécurise-t-il vraiment le recrutement ?",
    scene:
      "Vous recevez un candidat motivé pour rejoindre {team}. L’échange est positif, mais vous devez vérifier si le poste, le rythme, les horaires et les pratiques terrain correspondent réellement à ses attentes.",
    qvct: "Enjeu QVCT : un entretien structuré permet d’éviter les recrutements fragiles, les incompréhensions et les départs précoces.",
    choices: [
      {
        label:
          "Utiliser une grille d’entretien simple pour vérifier les compétences, les contraintes acceptées, les motivations et les besoins d’accompagnement.",
        score: 100,
        level: "good",
        feedback:
          "Très bon choix. Vous sécurisez votre décision et vous donnez au candidat une vision plus juste du poste.",
      },
      {
        label:
          "Mener un entretien libre pour créer une relation naturelle, puis décider selon votre ressenti.",
        score: 60,
        level: "medium",
        feedback:
          "Le ressenti compte, mais il ne suffit pas. Sans critères communs, vous pouvez passer à côté de points essentiels.",
      },
      {
        label:
          "Recruter rapidement si le candidat semble disponible et motivé, car le besoin terrain est urgent.",
        score: 20,
        level: "risky",
        feedback:
          "Choix risqué. L’urgence peut conduire à un mauvais alignement entre le poste, la personne et les conditions réelles de travail.",
      },
    ],
  },
  {
    id: "onboarding-premier-jour",
    tag: "onboarding",
    title: "Le premier jour donne-t-il assez de repères ?",
    scene:
      "Une nouvelle personne arrive dans {team}. Elle découvre {place}, les collègues, les règles implicites, les gestes attendus et les priorités du poste.",
    qvct: "Enjeu QVCT : un onboarding structuré réduit le stress, les erreurs, l’isolement et le risque de rupture pendant la période d’essai.",
    choices: [
      {
        label:
          "Prévoir une checklist d’accueil, un binôme référent, les consignes prioritaires et un court point de suivi en fin de journée.",
        score: 100,
        level: "good",
        feedback:
          "Excellent réflexe. Vous donnez à la personne des repères concrets et vous évitez qu’elle apprenne uniquement par observation.",
      },
      {
        label:
          "Présenter rapidement l’équipe et le poste, puis laisser la personne apprendre progressivement sur le terrain.",
        score: 60,
        level: "medium",
        feedback:
          "C’est un début, mais cela reste fragile. Le terrain forme mieux quand il est accompagné par des repères clairs.",
      },
      {
        label:
          "La placer directement en situation réelle pour qu’elle comprenne vite le rythme du métier.",
        score: 20,
        level: "risky",
        feedback:
          "Choix risqué. Une immersion brutale peut créer du stress, des erreurs et une envie de partir rapidement.",
      },
    ],
  },
  {
    id: "autoformation-terrain",
    tag: "autoformation",
    title: "Vos équipes peuvent-elles se former facilement ?",
    scene:
      "Dans {place}, certaines consignes doivent être répétées souvent : gestes métier, hygiène, sécurité, rangement, procédures, priorités ou utilisation du matériel.",
    qvct: "Enjeu QVCT : l’autoformation facilite la transmission, sécurise les pratiques et évite que toute la formation repose sur les mêmes personnes.",
    choices: [
      {
        label:
          "Créer des supports courts et accessibles : fiches pratiques, QR codes, mini-vidéos, rappels visuels et parcours d’autoformation.",
        score: 100,
        level: "good",
        feedback:
          "Très bon choix. Vous rendez la formation plus autonome, plus régulière et moins dépendante de la disponibilité du manager.",
      },
      {
        label:
          "Prévoir des rappels oraux réguliers pendant les moments plus calmes.",
        score: 60,
        level: "medium",
        feedback:
          "C’est utile, mais fragile. Les rappels oraux disparaissent facilement quand l’activité augmente ou que les équipes changent.",
      },
      {
        label:
          "Compter sur les personnes expérimentées pour transmettre les bonnes pratiques aux nouveaux.",
        score: 20,
        level: "risky",
        feedback:
          "Choix risqué. Sans support commun, chaque personne transmet à sa façon et les pratiques peuvent devenir inégales.",
      },
    ],
  },
  {
    id: "turnover-departs-precoces",
    tag: "turnover",
    title: "Comprenez-vous pourquoi les personnes partent ?",
    scene:
      "Depuis plusieurs mois, vous constatez des départs rapides dans {team}. Certains salariés quittent l’établissement après quelques semaines, parfois sans expliquer clairement leur décision.",
    qvct: "Enjeu QVCT : analyser le turnover permet de repérer les causes réelles : intégration, planning, charge, reconnaissance, ambiance ou management.",
    choices: [
      {
        label:
          "Analyser les départs avec quelques indicateurs simples et recueillir les retours des personnes concernées quand c’est possible.",
        score: 100,
        level: "good",
        feedback:
          "Très bon réflexe. Vous transformez le turnover en information utile pour corriger ce qui fragilise l’équipe.",
      },
      {
        label:
          "Observer si les départs se répètent avant de modifier votre organisation.",
        score: 60,
        level: "medium",
        feedback:
          "C’est prudent, mais incomplet. Si vous attendez trop, les mêmes causes peuvent continuer à produire les mêmes départs.",
      },
      {
        label:
          "Considérer que le turnover fait partie des réalités normales du foodbusiness.",
        score: 20,
        level: "risky",
        feedback:
          "Choix risqué. Le turnover est fréquent, mais il n’est pas une fatalité. Le banaliser empêche d’agir sur les causes évitables.",
      },
    ],
  },
  {
    id: "fidelisation-engagement",
    tag: "fidelisation",
    title: "Votre organisation donne-t-elle envie de rester ?",
    scene:
      "Dans {place}, {team} tient le rythme, mais plusieurs signaux apparaissent : fatigue, irritants répétés, manque de reconnaissance, planning difficile à anticiper ou sentiment de ne pas progresser.",
    qvct: "Enjeu QVCT : fidéliser ne dépend pas seulement du salaire. Les conditions de travail, la reconnaissance et les perspectives jouent un rôle majeur.",
    choices: [
      {
        label:
          "Identifier les leviers de fidélisation : reconnaissance, planning plus lisible, progression, polyvalence accompagnée et temps d’échange réguliers.",
        score: 100,
        level: "good",
        feedback:
          "Excellent choix. Vous agissez sur ce qui aide les équipes à se projeter et à rester engagées dans la durée.",
      },
      {
        label:
          "Faire des efforts ponctuels sur l’ambiance et remercier davantage l’équipe pendant les périodes difficiles.",
        score: 60,
        level: "medium",
        feedback:
          "C’est positif, mais insuffisant si les problèmes d’organisation restent les mêmes. La reconnaissance doit s’accompagner d’actions concrètes.",
      },
      {
        label:
          "Se concentrer sur l’activité : si l’équipe est professionnelle, elle saura s’adapter aux contraintes.",
        score: 20,
        level: "risky",
        feedback:
          "Choix risqué. Une équipe peut tenir un temps, mais l’adaptation permanente finit souvent par créer de l’usure et du désengagement.",
      },
    ],
  },
  {
    id: "pilotage-rh-qvct",
    tag: "pilotage",
    title: "Vos actions RH sont-elles suivies dans le temps ?",
    scene:
      "Vous avez déjà identifié plusieurs sujets dans {place} : recrutement difficile, intégration inégale, formation informelle, départs rapides ou irritants récurrents. Mais tout ne se transforme pas encore en actions suivies.",
    qvct: "Enjeu QVCT : le pilotage permet de passer du constat à l’action, puis de vérifier si les outils mis en place améliorent vraiment le quotidien.",
    choices: [
      {
        label:
          "Choisir trois indicateurs simples, définir des actions prioritaires, désigner un responsable de suivi et faire un bilan régulier.",
        score: 100,
        level: "good",
        feedback:
          "Très bon réflexe. Vous rendez vos actions visibles, mesurables et plus faciles à ajuster dans le temps.",
      },
      {
        label:
          "Noter les problèmes au fil de l’eau et les traiter quand une période plus calme se présente.",
        score: 60,
        level: "medium",
        feedback:
          "C’est mieux que rien, mais cela risque de repousser les sujets importants. Un suivi simple vaut mieux qu’un plan parfait jamais lancé.",
      },
      {
        label:
          "Gérer les problèmes au cas par cas, selon les urgences du moment.",
        score: 20,
        level: "risky",
        feedback:
          "Choix risqué. Le cas par cas peut dépanner, mais il ne règle pas les causes profondes du recrutement fragile, du turnover ou de l’intégration inégale.",
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
      title: "Zone de vigilance : votre parcours RH fragilise vos équipes.",
      message:
        "Votre diagnostic montre que le recrutement, l’intégration ou la fidélisation reposent encore trop sur l’urgence, l’oral ou l’adaptation individuelle. La priorité est de mettre en place quelques outils simples pour sécuriser vos pratiques.",
    };
  }

  if (score <= 75) {
    return {
      title:
        "Bases solides : vos réflexes sont présents, mais doivent être structurés.",
      message:
        "Vos choix montrent une attention réelle aux équipes. Pour progresser, l’enjeu est de transformer ces bons réflexes en outils concrets : grille d’entretien, checklist d’accueil, supports d’autoformation et suivi du turnover.",
    };
  }

  return {
    title: "Dynamique maîtrisée : vos pratiques RH soutiennent déjà la QVCT.",
    message:
      "Votre diagnostic montre une organisation favorable au recrutement, à l’intégration et à la fidélisation. La prochaine étape consiste à formaliser ces pratiques pour les rendre durables, transmissibles et faciles à suivre.",
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
