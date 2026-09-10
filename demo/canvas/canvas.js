/* Guildwork — the operating canvas, drawn on the Lantern example.
   One layout, two languages. The mission path reads as a serpentine: left to
   right, then right to left, so every step between two lanes is a short drop
   between neighbours, and the two loops that return — the register into the
   next contract, the watcher waking a seat — run in margins that hold no text.
   Rule of the drawing: no wire crosses a word. */
(function () {
  'use strict';

  const G = {
    person: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="8" cy="5" r="2.6"/><path d="M2.6 14c.6-3 2.8-4.4 5.4-4.4S12.8 11 13.4 14"/></svg>',
    bot: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="2.4" y="5" width="11.2" height="8" rx="2"/><circle cx="6" cy="9" r="1"/><circle cx="10" cy="9" r="1"/><path d="M8 2.4V5"/></svg>',
    doc: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="3" y="1.8" width="10" height="12.4" rx="1.4"/><path d="M5.6 5.4h4.8M5.6 8h4.8M5.6 10.6h3"/></svg>',
    shield: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M8 1.6l5 2v4.6c0 3-2.2 5.3-5 6.2-2.8-.9-5-3.2-5-6.2V3.6z"/><path d="M5.8 8l1.6 1.6 3-3.2"/></svg>',
    branch: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="4" cy="3.4" r="1.6"/><circle cx="4" cy="12.6" r="1.6"/><circle cx="12" cy="3.4" r="1.6"/><path d="M4 5v6M5.6 3.4h4.8c0 4.4-6.4 2.6-6.4 7.6"/></svg>',
    merge: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M2 3.5h3l4 4.5 4 4.5h1"/><path d="M2 12.5h3l4-4.5"/><circle cx="13.4" cy="8" r="1.4"/></svg>',
    book: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M2.4 3.2c2 0 4 .4 5.6 1.4 1.6-1 3.6-1.4 5.6-1.4v9.2c-2 0-4 .4-5.6 1.4-1.6-1-3.6-1.4-5.6-1.4z"/><path d="M8 4.6v9.2"/></svg>',
    eye: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M1.4 8S3.8 3.6 8 3.6 14.6 8 14.6 8 12.2 12.4 8 12.4 1.4 8 1.4 8z"/><circle cx="8" cy="8" r="1.9"/></svg>',
    door: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M3 14V2h7v12"/><path d="M10 2l3 1.5v9L10 14"/><circle cx="8" cy="8.4" r=".9" fill="currentColor"/></svg>',
    broom: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M10.5 1.8L6.2 6.1"/><path d="M3 13.5c.4-2.6 1.6-4.6 3.4-6l2.6 2.6c-1.4 1.8-3.4 3-6 3.4z"/><path d="M6.4 7.5l2.6 2.6"/></svg>',
    bye: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="2" y="2.5" width="5" height="11" rx="1.4"/><path d="M9 8h5M11 5l3 3-3 3"/></svg>',
    pulse: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M1.5 8h3l1.5-4 3.1 8 1.7-4h3.7"/></svg>',
    send: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M2 3l12 5-12 5 2-5z"/><path d="M4 8h6"/></svg>',
    inbox: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M2 3h12v10H2z"/><path d="M2 9h3l1 2h4l1-2h3"/></svg>'
  };

  /* ---------------------------------------------------------------- geometry
     Five columns of 205, a 24 gap. Four lanes. The canvas is 1180 × 960. */
  const W = 1180, H = 1294, CW = 205;
  const X = [34, 263, 492, 721, 950];
  const LANE = [
    { rule: 36,  y: 68,  h: 130, labelX: 34 },
    { rule: 352, y: 372, h: 116, labelX: 34 },
    { rule: 588, y: 620, h: 116, centerOn: ['close', 'bye'] },   // its label sits centred between the two drops from lane 2, at equal distance from each
    { rule: 838, y: 870, h: 130, labelX: 34 },
    { rule: 1088, y: 1120, h: 142, labelX: 34 }
  ];
  const LOOP_X = 14;       // the register's way back up, in the left margin
  const LOOP_Y = 322;      // and its way across, between the launcher's pill and lane 2
  const WAKE_X = 1100;     // the watcher's way up to the seat, through the empty last slot of lane 3

  // id → [lane, column] ; dispatch spans the last two columns
  const PLACE = {
    po: [0, 0], ca: [0, 1], iss: [0, 2], lnch: [0, 3], wt: [0, 4],
    main: [1, 0], gate: [1, 1], wit: [1, 2], pr: [1, 3], seats: [1, 4],
    reg: [2, 0], close: [2, 1], jrn: [2, 2], bye: [2, 3],
    event: [3, 0], watch: [3, 1], read: [3, 2], dispatch: [3, 3],
    ask: [4, 0], rev: [4, 1], opin: [4, 2]
  };
  const SPAN = { dispatch: 2 };

  // refusal notes: which card they hang from, where they sit, how wide
  const PILLS = {
    lnch:  { x: 560, y: 224, w: 360, hangX: 823 },
    gate:  { x: 400, y: 514, w: 300, hangX: 430 },
    bye:   { x: 700, y: 762, w: 300, hangX: 823 },
    close: { x: 263, y: 762, w: 330, hangX: 365 }
  };

  /* ---------------------------------------------------------------- copy */
  const COPY = {
    en: {
      stage: 'Guildwork operating canvas: contract, launch, execution, closeout, learning loop, and the watcher.',
      lanes: [
        'contract and launch — five surfaces · ten checks today',
        'execute and deliver — nobody certifies their own work  ←',
        'close and learn — the durable evidence  ←',
        'watch and route — what exists now, and what comes next',
        'consult — the read from someone with nothing to defend'
      ],
      nodes: {
        po:    { icon: 'person', kind: 'human',   k: 'authority',          t: 'Product Owner',        s: 'human · final say\nlaunches and merges\nunder the named gate' },
        ca:    { icon: 'bot',    kind: 'control', k: 'advisory seat',      t: 'Chief Architect',      s: 'ChatGPT Work\ncontracts, board, rulings\nno local launch surface', tag: 'advisory' },
        iss:   { icon: 'doc',    kind: 'control', k: 'source of truth',    t: 'Issue = contract',     s: 'goal · scope · stops\nauthority, seat, model\ntitle #N first', tick: true },
        lnch:  { icon: 'shield', kind: 'control', k: 'before any session', t: 'Launcher · 10 checks', s: '7 stable, from the contract\n+ 3 hardened by use\nrefuses by name', tag: '7 + 3', tick: true },
        wt:    { icon: 'branch', kind: 'control', k: 'isolated workspace', t: 'Worktree',             s: 'one branch · one writer\nguild-hi at entry\nthe contract travels in', tick: true },
        seats: { icon: 'bot',    kind: 'control', k: 'real execution',     t: 'Executing seats',      s: 'Claude Code · Grok Build\nCodex CLI\nmodel + effort enforced', tag: '3 seats' },
        pr:    { icon: 'merge',  kind: 'control', k: 'delivery surface',   t: 'Pull request',         s: 'delivers mission #N\nwhat actually ran\nand the evidence', tick: true },
        wit:   { icon: 'eye',    kind: 'control', k: 'independent read',   t: 'Witness',              s: 'not the author\nreads the delivery\nagainst the repository', tick: true },
        gate:  { icon: 'door',   kind: 'human',   k: 'human authority',    t: 'Gate',                 s: 'the Product Owner — or\na standing delegation —\ndecides from the witness', tick: true },
        main:  { icon: 'branch', kind: 'landed',  k: 'durable outcome',    t: 'main',                 s: 'merged\nand nothing\nweaker', tag: 'landed' },
        bye:   { icon: 'bye',    kind: 'control', k: 'one exit command',   t: 'guild-bye',            s: '0 durable · 3 incomplete\n2 fatal\nnever rerun exit 3' },
        jrn:   { icon: 'book',   kind: 'control', k: 'session memory',     t: 'Guild Journal',        s: 'one file per session\nreachable from\na pushed ref', tick: true },
        close: { icon: 'broom',  kind: 'control', k: 'after the merge',    t: 'Closeout tool',        s: 'five checks, regenerable\ncloses contracts\nfrom the delivery', tick: true },
        reg:   { icon: 'book',   kind: 'signal',  k: 'learning loop',      t: 'Findings register',    s: 'every mismatch has\nan owner — ruled,\nconverted or declined' },
        event: { icon: 'inbox',  kind: 'watcher', k: 'authorised signal',  t: 'GitHub event',         s: 'a route label is applied\nor the host produces\na new measured reading' },
        watch: { icon: 'pulse',  kind: 'watcher', k: 'today · deterministic', t: 'Watcher',           s: 'polls every two minutes\nsees · dedupes · records\nstarts no model', tag: 'now' },
        read:  { icon: 'eye',    kind: 'watcher', k: 'current output',     t: 'Fresh board reading',  s: 'the latest host state\ntime of the reading\nprojection, never truth', tag: 'now' },
        dispatch: { icon: 'send', kind: 'future', k: 'next · after canaries', t: 'Receive · deliver · wake', s: 'accept the authorised mission event · send the canonical contract\nwake the named existing seat · zero model call when nothing changed', tag: 'next' },
        ask:   { icon: 'doc',  kind: 'control', k: 'what calls for it',  t: 'A contested ruling',        s: 'a ruling under dispute\na design to validate\na figure nobody measured' },
        rev:   { icon: 'bot',  kind: 'control', k: 'outside review',     t: 'Consultant with no surface', s: 'GPT · Grok, outside the tree\nstarts nothing, merges nothing\nhence a neutral read', tag: 'neutral' },
        opin:  { icon: 'book', kind: 'control', k: 'what it produces',   t: 'An opinion, not a decision', s: 'a finding in the register\nthe gate stays human\nan opinion merges nothing' }
      },
      pills: {
        lnch:  '1–7 contract · seat/model/effort · role\nwriter · capability · source · title\n8 exclusive display · 9 transport limit\n10 unreadable scope path',
        gate:  'refused: closes unmerged — the contract stays open',
        bye:   'exit 3: follow the printed push steps;\ndo not rerun',
        close: 'refuses: open · dirty · absent from server\nin use · unmerged'
      },
      labels: { validated: 'validated contract', bye: 'guild-bye', merged: 'after merge', rule: 'becomes the next rule', wake: 'wake the named seat' }
    },
    fr: {
      stage: 'Canvas de fonctionnement de Guildwork : contrat, lancement, exécution, clôture, boucle d’apprentissage, et le watcher.',
      lanes: [
        'contrat et lancement — cinq surfaces · dix contrôles aujourd’hui',
        'exécuter et livrer — personne ne certifie son propre travail  ←',
        'clore et apprendre — la preuve durable  ←',
        'observer et router — ce qui existe, puis la prochaine étape',
        'consulter — l’avis de qui n’a rien à défendre'
      ],
      nodes: {
        po:    { icon: 'person', kind: 'human',   k: 'autorité',            t: 'Product Owner',         s: 'humain · dernier mot\nlance et fusionne\nsous la porte nommée' },
        ca:    { icon: 'bot',    kind: 'control', k: 'siège consultatif',   t: 'Architecte en chef',    s: 'ChatGPT Work\ncontrats et tableau\npas de lancement local', tag: 'conseil' },
        iss:   { icon: 'doc',    kind: 'control', k: 'source de vérité',    t: 'Issue = contrat',       s: 'but · portée · arrêts\nautorité, siège, modèle\ntitre #N en tête', tick: true },
        lnch:  { icon: 'shield', kind: 'control', k: 'avant toute session', t: 'Lanceur · 10 contrôles', s: '7 stables, du contrat\n+ 3 durcis par l’usage\nrefuse en nommant', tag: '7 + 3', tick: true },
        wt:    { icon: 'branch', kind: 'control', k: 'espace isolé',        t: 'Worktree',              s: 'une branche · un scribe\nguild-hi à l’entrée\nle contrat voyage avec', tick: true },
        seats: { icon: 'bot',    kind: 'control', k: 'exécution réelle',    t: 'Sièges d’exécution',    s: 'Claude Code · Grok Build\nCodex CLI\nmodèle + effort imposés', tag: '3 sièges' },
        pr:    { icon: 'merge',  kind: 'control', k: 'surface de livraison', t: 'Pull request',         s: 'livre la mission #N\nce qui a vraiment tourné\net les preuves', tick: true },
        wit:   { icon: 'eye',    kind: 'control', k: 'lecture indépendante', t: 'Témoin',               s: 'pas l’auteur\nlit la livraison\ncontre le dépôt', tick: true },
        gate:  { icon: 'door',   kind: 'human',   k: 'autorité humaine',    t: 'Porte',                 s: 'le Product Owner, ou\nune délégation, décide\nd’après le témoin', tick: true },
        main:  { icon: 'branch', kind: 'landed',  k: 'résultat durable',    t: 'main',                  s: 'fusionné\net rien\nde plus faible', tag: 'intégré' },
        bye:   { icon: 'bye',    kind: 'control', k: 'une commande de sortie', t: 'guild-bye',          s: '0 durable · 3 incomplet\n2 fatal\njamais relancer l’exit 3' },
        jrn:   { icon: 'book',   kind: 'control', k: 'mémoire de session',  t: 'Journal Guild',         s: 'un fichier par session\natteignable depuis\nune ref poussée', tick: true },
        close: { icon: 'broom',  kind: 'control', k: 'après le merge',      t: 'Outil de clôture',      s: 'cinq contrôles\nclôt les contrats\ndepuis la livraison', tick: true },
        reg:   { icon: 'book',   kind: 'signal',  k: 'boucle d’apprentissage', t: 'Registre de constats', s: 'chaque écart a un\npropriétaire : arbitré,\ntransformé ou refusé' },
        event: { icon: 'inbox',  kind: 'watcher', k: 'signal autorisé',     t: 'Événement GitHub',      s: 'une étiquette de route\nou une nouvelle mesure\nde l’hôte' },
        watch: { icon: 'pulse',  kind: 'watcher', k: 'aujourd’hui · déterministe', t: 'Watcher',        s: 'toutes les deux minutes\nvoit, déduplique, note\nne démarre aucun modèle', tag: 'actuel' },
        read:  { icon: 'eye',    kind: 'watcher', k: 'sortie actuelle',     t: 'Lecture fraîche du tableau', s: 'dernier état de l’hôte\nl’heure de la lecture\nprojection, pas vérité', tag: 'actuel' },
        dispatch: { icon: 'send', kind: 'future', k: 'ensuite · après validation', t: 'Recevoir · transmettre · réveiller', s: 'recevoir l’événement autorisé · transmettre le contrat canonique\nréveiller le bon siège existant · zéro appel IA si rien ne change', tag: 'prochain' },
        ask:   { icon: 'doc',  kind: 'control', k: 'ce qui déclenche',   t: 'Une décision contestée',   s: 'un arbitrage discuté\nune conception à valider\nun chiffre non mesuré' },
        rev:   { icon: 'bot',  kind: 'control', k: 'relecture externe',  t: 'Consultant sans surface',  s: 'GPT · Grok, hors de l’arbre\nne lance ni ne fusionne\nd’où l’avis neutre', tag: 'neutre' },
        opin:  { icon: 'book', kind: 'control', k: 'ce que ça produit',  t: 'Un avis, pas une décision', s: 'un constat au registre\nla porte reste humaine\nun avis ne fusionne rien' }
      },
      pills: {
        lnch:  '1–7 contrat · siège/modèle/effort · rôle\nscribe · capacité · source · titre\n8 écran exclusif · 9 limite de transport\n10 chemin de portée illisible',
        gate:  'refusée : close sans merge — le contrat reste ouvert',
        bye:   'exit 3 : suivre les étapes de push imprimées ;\nne pas relancer',
        close: 'refuse : ouverte · sale · absente du serveur\nen usage · non fusionnée'
      },
      labels: { validated: 'contrat validé', bye: 'guild-bye', merged: 'après merge', rule: 'devient la règle suivante', wake: 'réveiller le siège nommé' }
    }
  };

  /* ---------------------------------------------------------------- wires
     Each edge names its ports. 'h' runs a horizontal bezier between the facing
     sides; 'drop' an S between the bottom of one card and the top of the next;
     'path' an explicit polyline with rounded corners. */
  function edges(L) {
    return [
      { a: 'po', b: 'ca', kind: 'control', how: 'h' },
      { a: 'ca', b: 'iss', kind: 'control', how: 'h' },
      { a: 'iss', b: 'lnch', kind: 'control', how: 'h' },
      { a: 'lnch', b: 'wt', kind: 'control', how: 'h' },
      { a: 'wt', b: 'seats', kind: 'control', how: 'drop', ax: 0.5, bx: 0.5, label: L.validated },
      { a: 'seats', b: 'pr', kind: 'control', how: 'h' },
      { a: 'pr', b: 'wit', kind: 'control', how: 'h' },
      { a: 'wit', b: 'gate', kind: 'control', how: 'h' },
      { a: 'gate', b: 'main', kind: 'control', how: 'h' },
      { a: 'seats', b: 'bye', kind: 'control', how: 'drop', ax: 0.2, bx: 0.5, label: L.bye },
      { a: 'main', b: 'close', kind: 'control', how: 'drop', ax: 0.5, bx: 0.5, label: L.merged },
      { a: 'bye', b: 'jrn', kind: 'control', how: 'h' },
      { a: 'jrn', b: 'close', kind: 'control', how: 'h' },
      { a: 'close', b: 'reg', kind: 'signal', how: 'h' },
      { a: 'reg', b: 'ca', kind: 'signal', how: 'loop', label: L.rule },
      { a: 'event', b: 'watch', kind: 'control', how: 'h' },
      { a: 'watch', b: 'read', kind: 'control', how: 'h' },
      { a: 'read', b: 'dispatch', kind: 'future', how: 'h' },
      { a: 'dispatch', b: 'seats', kind: 'future', how: 'wake', label: L.wake },
      { a: 'ask', b: 'rev', kind: 'control', how: 'h' },
      { a: 'rev', b: 'opin', kind: 'signal', how: 'h' }
    ];
  }

  const NS = 'http://www.w3.org/2000/svg';
  const el = (tag, attrs, parent) => {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  };

  // polyline with rounded corners → path data
  function rounded(points, r) {
    let d = `M${points[0][0]},${points[0][1]}`;
    for (let i = 1; i < points.length - 1; i++) {
      const [x0, y0] = points[i - 1], [x1, y1] = points[i], [x2, y2] = points[i + 1];
      const d1 = Math.hypot(x1 - x0, y1 - y0), d2 = Math.hypot(x2 - x1, y2 - y1);
      const k = Math.min(r, d1 / 2, d2 / 2);
      const ax = x1 - (x1 - x0) / d1 * k, ay = y1 - (y1 - y0) / d1 * k;
      const bx = x1 + (x2 - x1) / d2 * k, by = y1 + (y2 - y1) / d2 * k;
      d += ` L${ax},${ay} Q${x1},${y1} ${bx},${by}`;
    }
    const last = points[points.length - 1];
    return d + ` L${last[0]},${last[1]}`;
  }

  /* ------------------------------------------------------------- packets
     The canvas is a production line, so it should read like one: when the
     system runs, you watch the work move through it, and a pipe with nothing
     in it is a pipe that has stopped. Every wire carries a train of parcels
     at one constant speed — filled where something really runs today,
     outlined on the path that is drawn but not yet active. Nothing moves
     under prefers-reduced-motion, and nothing is drawn at all in the
     exported image, which has to stay a still picture. */
  const SPEED = 34;      // pixels per second, the same in every pipe
  const SPACING = 22;    // distance between two parcels in the same pipe
  const MAX_PER_WIRE = 16;

  function packets(svg, wireOf) {
    if (document.documentElement.classList.contains('export')) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    svg.classList.add('running');   // the parcels carry the direction; the arrowheads step aside
    const layer = el('g', { class: 'pkts' }, svg);
    for (const key in wireOf) {
      const w = wireOf[key];
      const len = w.path.getTotalLength();
      if (!isFinite(len) || len < 8) continue;
      const dur = len / SPEED;
      const n = Math.max(1, Math.min(MAX_PER_WIRE, Math.round(len / SPACING)));
      for (let k = 0; k < n; k++) {
        const g = el('g', { class: 'pkt ' + w.kind }, layer);
        g.dataset.a = w.path.dataset.a; g.dataset.b = w.path.dataset.b;
        shape(w.kind, g);
        // 'paced', not 'linear': linear gives every path segment the same slice of
        // time, so a parcel crawls through a 14-pixel corner arc and races down a
        // 300-pixel straight — they pile up in the bends. Paced is constant speed.
        const m = el('animateMotion', {
          dur: dur.toFixed(3) + 's', repeatCount: 'indefinite', rotate: 'auto',
          calcMode: 'paced', begin: (-k * dur / n).toFixed(3) + 's'
        }, g);
        const mp = el('mpath', {}, m);
        mp.setAttribute('href', '#' + w.path.id);
        mp.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#' + w.path.id);
      }
    }
    // a parcel passes behind a label, never across the word: the labels are
    // repainted last so nothing on a wire can sit on top of a word
    svg.querySelectorAll('.wlab-bg, text.wlab').forEach(e => svg.appendChild(e));
  }

  // a parcel where work really moves; an outline where the path is drawn but idle
  function shape(kind, g) {
    if (kind === 'signal') {
      el('circle', { cx: 0, cy: 0, r: 3.5, class: 'body' }, g);            // a finding on its way back
    } else if (kind === 'future') {
      el('rect', { x: -3.4, y: -3.4, width: 6.8, height: 6.8, rx: 1.9, class: 'body hollow' }, g);  // drawn, not running
    } else {
      el('rect', { x: -3.6, y: -3.6, width: 7.2, height: 7.2, rx: 2.1, class: 'body' }, g);         // the mission itself
    }
  }

  function build(host, lang) {
    const T = COPY[lang];
    host.setAttribute('aria-label', T.stage);
    const cv = document.createElement('div');
    cv.className = 'canvas';
    cv.style.width = W + 'px';
    cv.style.height = H + 'px';
    const svg = el('svg', { class: 'wires', viewBox: `0 0 ${W} ${H}`, 'aria-hidden': 'true' });
    const defs = el('defs', {}, svg);
    const colours = { control: '#7FA6D6', signal: '#E9A23B', refuse: '#EC8A79', future: '#5CB9C4' };
    for (const k in colours) {
      const m = el('marker', { id: 'arrow-' + k, markerWidth: 8, markerHeight: 8, refX: 7, refY: 4, orient: 'auto', markerUnits: 'strokeWidth' }, defs);
      el('path', { d: 'M1 1l6 3-6 3', fill: 'none', stroke: colours[k], 'stroke-width': 1.2 }, m);
    }
    cv.appendChild(svg);
    host.appendChild(cv);

    // lanes
    const laneSpans = [];
    T.lanes.forEach((text, i) => {
      const lane = document.createElement('div');
      lane.className = 'lane';
      lane.style.top = LANE[i].rule + 'px';
      const span = document.createElement('span');
      span.textContent = text;
      span.style.left = ((LANE[i].labelX || 34) - 34) + 'px';
      lane.appendChild(span);
      cv.appendChild(lane);
      laneSpans[i] = span;
    });

    // cards
    const box = {};
    for (const id in PLACE) {
      const [li, ci] = PLACE[id];
      const n = T.nodes[id];
      const x = X[ci], y = LANE[li].y, w = SPAN[id] ? (X[ci + SPAN[id] - 1] + CW - x) : CW, h = LANE[li].h;
      box[id] = { x, y, w, h };
      const e = document.createElement('div');
      e.className = 'node ' + n.kind + (n.tag ? ' tagged' : '');
      e.style.cssText = `left:${x}px;top:${y}px;width:${w}px;height:${h}px`;
      e.dataset.id = id;
      e.tabIndex = 0;
      e.innerHTML = `<div class="glyph">${G[n.icon]}</div><div class="copy"><div class="k">${n.k}</div><div class="t">${n.t}</div><div class="s">${n.s}</div></div>` +
        (n.tag ? `<div class="tag">${n.tag}</div>` : '') + (n.tick ? '<div class="tick">✓</div>' : '');
      cv.appendChild(e);
    }

    // a lane label that must sit between two wires is centred between them once its width is known
    LANE.forEach((L, i) => {
      if (!L.centerOn) return;
      const mid = L.centerOn.map(id => box[id].x + box[id].w / 2).reduce((a, b) => a + b) / L.centerOn.length;
      laneSpans[i].style.left = (mid - 34 - laneSpans[i].offsetWidth / 2) + 'px';
    });

    // refusal notes, hung from their card on a dashed red thread
    for (const id in PILLS) {
      const p = PILLS[id];
      const e = document.createElement('div');
      e.className = 'pill';
      e.style.cssText = `left:${p.x}px;top:${p.y}px;width:${p.w}px`;
      e.dataset.id = 'pill-' + id;
      e.textContent = T.pills[id];
      cv.appendChild(e);
      const b = box[id];
      const hd = `M${p.hangX},${b.y + b.h} L${p.hangX},${p.y - 5}`;
      el('path', { d: hd, class: 'casing' }, svg);
      const path = el('path', { d: hd, class: 'wire refuse', 'marker-end': 'url(#arrow-refuse)' }, svg);
      path.dataset.a = id; path.dataset.b = 'pill-' + id;
    }

    // wires
    const wireOf = {};
    const GAP = 5;   // an arrowhead ends this far before the edge it points at, so no card ever covers it
    const port = (b, side, f) => side === 'r' ? [b.x + b.w, b.y + b.h / 2] : side === 'l' ? [b.x, b.y + b.h / 2]
      : side === 'b' ? [b.x + b.w * (f ?? 0.5), b.y + b.h] : [b.x + b.w * (f ?? 0.5), b.y];
    // the point an arrow ends at, GAP outside the side it points at
    const into = (p, side) => side === 'r' ? [p[0] + GAP, p[1]] : side === 'l' ? [p[0] - GAP, p[1]] : side === 'b' ? [p[0], p[1] + GAP] : [p[0], p[1] - GAP];
    const labelAt = (x, y, text, ed) => {
      const t = el('text', { class: 'wlab', x, y, 'text-anchor': 'middle' }, svg);
      t.textContent = text;
      const bb = t.getBBox();
      const bg = el('rect', { x: bb.x - 7, y: bb.y - 3, width: bb.width + 14, height: bb.height + 6, rx: 5, class: 'wlab-bg' });
      svg.insertBefore(bg, t);
      bg.dataset.a = ed.a; bg.dataset.b = ed.b; t.dataset.a = ed.a; t.dataset.b = ed.b;
    };
    edges(T.labels).forEach(ed => {
      const a = box[ed.a], b = box[ed.b];
      let p1, p2, d, lab;
      if (ed.how === 'h') {
        const rightward = b.x > a.x;
        p1 = port(a, rightward ? 'r' : 'l'); p2 = into(port(b, rightward ? 'l' : 'r'), rightward ? 'l' : 'r');
        d = `M${p1[0]},${p1[1]} L${p2[0]},${p2[1]}`;
      } else if (ed.how === 'drop') {
        p1 = port(a, 'b', ed.ax); p2 = into(port(b, 't', ed.bx), 't');
        const my = (p1[1] + p2[1]) / 2;
        d = p1[0] === p2[0] ? `M${p1[0]},${p1[1]} L${p2[0]},${p2[1]}` : rounded([p1, [p1[0], my], [p2[0], my], p2], 14);
        lab = [(p1[0] + p2[0]) / 2, my + 3];
      } else if (ed.how === 'loop') {
        p1 = port(a, 'l'); p2 = into(port(b, 'b'), 'b');
        d = rounded([p1, [LOOP_X, p1[1]], [LOOP_X, LOOP_Y], [p2[0], LOOP_Y], p2], 14);
        lab = [(LOOP_X + p2[0]) / 2 + 20, LOOP_Y + 3];
      } else if (ed.how === 'wake') {
        p1 = [WAKE_X, a.y]; p2 = [WAKE_X, b.y + b.h + GAP];
        d = `M${p1[0]},${p1[1]} L${p2[0]},${p2[1]}`;
        lab = [WAKE_X, (p1[1] + p2[1]) / 2 + 3];
      }
      el('path', { d, class: 'casing' }, svg);   // the wire cuts the lane rule; the rule never cuts the wire
      const pa = el('path', { id: `w-${ed.a}-${ed.b}`, d, class: 'wire ' + ed.kind + (ed.kind === 'signal' || ed.kind === 'future' ? ' flow' : ''), 'marker-end': `url(#arrow-${ed.kind})` }, svg);
      pa.dataset.a = ed.a; pa.dataset.b = ed.b;
      wireOf[ed.a + '>' + ed.b] = { path: pa, kind: ed.kind };
      if (ed.label && lab) labelAt(lab[0], lab[1], ed.label, ed);
    });

    packets(svg, wireOf);

    // focus: a card lights its wires and its neighbours
    const related = id => {
      const ids = new Set([id]);
      svg.querySelectorAll('[data-a]').forEach(p => {
        if (p.dataset.a === id || p.dataset.b === id) { ids.add(p.dataset.a); ids.add(p.dataset.b); p.classList.add('hot'); }
      });
      return ids;
    };
    const focus = (n, on) => {
      cv.querySelectorAll('.hot').forEach(e => e.classList.remove('hot'));
      svg.querySelectorAll('.hot').forEach(e => e.classList.remove('hot'));
      if (!on) { host.classList.remove('focusing'); return; }
      host.classList.add('focusing');
      related(n.dataset.id).forEach(id => { const e = cv.querySelector(`[data-id="${id}"]`); if (e) e.classList.add('hot'); });
    };
    cv.querySelectorAll('.node').forEach(n => {
      n.addEventListener('pointerenter', () => focus(n, true));
      n.addEventListener('pointerleave', () => focus(n, false));
      n.addEventListener('focus', () => focus(n, true));
      n.addEventListener('blur', () => focus(n, false));
    });
    return cv;
  }

  const stage = document.getElementById('stage');
  const lang = document.documentElement.lang === 'fr' ? 'fr' : 'en';
  const cv = build(stage, lang);
  function fit() {
    const exporting = document.documentElement.classList.contains('export');
    const k = exporting ? (stage.clientWidth - 2) / W : Math.min(1, Math.max(.72, (stage.clientWidth - 2) / W));
    cv.style.transform = `scale(${k})`;
    stage.style.height = (H * k + 2) + 'px';
  }
  addEventListener('resize', fit);
  fit();
})();
