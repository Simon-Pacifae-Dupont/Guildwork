<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="brand/logo-lockup-dark.png">
    <img alt="Guildwork â€” la gouvernance de plusieurs agents IA sur un mÃªme dÃ©pÃ´t" src="brand/logo-lockup-light.png" width="600">
  </picture>
</p>

<p align="center"><a href="README.md">English</a> Â· <strong>FranÃ§ais</strong></p>

# Guildwork

**Pack de gouvernance pour faire tourner plusieurs agents de code IA en parallÃ¨le.**

**[simon-pacifae-dupont.github.io/Guildwork/fr/](https://simon-pacifae-dupont.github.io/Guildwork/fr/)** â€” la mÃªme chose, sur une seule page.

**Vous ne dÃ©veloppez pas ?** La mÃªme discipline â€” un contrat avant, un tÃ©moin pendant, un bilan aprÃ¨s, et un lanceur qui refuse de dÃ©marrer ce qui nâ€™est pas en rÃ¨gle â€” tient aussi bien un cabinet, une agence ou un service client. [Cette entrÃ©e est sur la mÃªme page.](https://simon-pacifae-dupont.github.io/Guildwork/fr/#sans-code)

Guildwork est la gouvernance qu'une seule personne a construite, incident
aprÃ¨s incident, pour faire tourner une Ã©quipe d'ingÃ©nierie IA Ã  sept siÃ¨ges
sur un produit rÃ©el, Ã  vingt-quatre merges par jour â€” chaque mission un
contrat, chaque merge derriÃ¨re une porte nommÃ©e, chaque session laissant une
trace durable, et l'humain hors du chemin des messages. Ce dÃ©pÃ´t est ce
systÃ¨me, extrait : les contrats, les formulaires, le vocabulaire, la
spÃ©cification des trois outils qui tiennent l'ensemble, et les incidents qui
ont payÃ© chaque rÃ¨gle.

Il est fait pour Ãªtre lu. Les trois outils sont spÃ©cifiÃ©s, pas livrÃ©s â€” une
page l'est : le lecteur de tableau ci-dessous, que vous pouvez ouvrir tout de
suite.

<p align="center">
  <a href="https://simon-pacifae-dupont.github.io/Guildwork/demo/board/"><picture>
    <source media="(prefers-color-scheme: dark)" srcset="brand/board-demo-dark.png">
    <img alt="Le tableau sur l'exemple fictif Lantern : six compteurs portant chacun la faÃ§on dont il a Ã©tÃ© lu, et une carte de dÃ©cision avec un choix approuver ou suspendre et le commentaire exact qu'elle publierait." src="brand/board-demo-dark.png" width="880">
  </picture></a><br>
  <sub>Le tableau tel qu'il tourne, sur l'exemple fictif Lantern. Six compteurs, portant chacun <em>comment</em> il a Ã©tÃ© lu ; puis la seule dÃ©cision qui revient au Product Owner et Ã  personne d'autre, prise sur la page oÃ¹ elle se lit â€” le commentaire qu'elle publiera Ã©tant montrÃ© mot pour mot avant. Il ne fusionne jamais. <a href="https://simon-pacifae-dupont.github.io/Guildwork/demo/board/">Ouvrir la dÃ©monstration</a> â€” figÃ©e, et elle le dit sur sa face. Elle est en anglais, comme le pack ; <a href="https://simon-pacifae-dupont.github.io/Guildwork/fr/demo/board/">le lecteur livrÃ© existe en franÃ§ais</a>.</sub>
</p>

> **Les quinze documents du pack sont en anglais** et le restent : c'est la
> langue de travail du systÃ¨me, et une rÃ¨gle qui existe en deux versions
> finit par exister en deux versions diffÃ©rentes. Cette page et
> [la page de prÃ©sentation](https://simon-pacifae-dupont.github.io/Guildwork/fr/)
> sont lÃ  pour dÃ©cider, en franÃ§ais, si le reste vaut la lecture.

## Le problÃ¨me

Plusieurs agents de code IA â€” Ã©diteurs diffÃ©rents, harnais diffÃ©rents â€” qui
travaillent en mÃªme temps sur un seul dÃ©pÃ´t produisent quatre dÃ©gÃ¢ts
qu'aucun prompt ne corrige : deux agents qui Ã©crivent le mÃªme fichier, avec
l'humain en guise d'outil de merge ; un agent qui tourne sous un modÃ¨le, un
niveau d'effort ou un prompt que personne n'a dÃ©clarÃ©s, sans que rien
n'enregistre la substitution ; ce qu'un agent a appris qui meurt avec sa
fenÃªtre de contexte, si bien que la session suivante le redÃ©couvre ou
travaille sur un rÃ©sumÃ© pÃ©rimÃ©, avec assurance ; et l'humain qui finit par
porter les instructions d'un agent Ã  l'autre Ã  la main, ce qui est
prÃ©cisÃ©ment le poste que les agents devaient supprimer.

## La forme de la rÃ©ponse

GitHub est la source de vÃ©ritÃ©, avec cinq surfaces qui ont chacune
exactement un rÃ´le : l'**issue** est le contrat, le **tableau** est la file,
le **worktree** est l'espace de travail, la **pull request** est la
livraison, le **journal** est la mÃ©moire de session. Une mission Ã©noncÃ©e
ailleurs n'existe pas.

Un **lanceur** lit le contrat par son numÃ©ro, le valide contre la
gouvernance *au commit sur lequel la mission va tourner*, vÃ©rifie sept
conditions, et refuse â€” en nommant la condition qui a sautÃ© â€” ou bien crÃ©e
l'espace de travail, effectue l'entrÃ©e de session, et dÃ©marre le harnais
dÃ©clarÃ© sous le modÃ¨le et l'effort dÃ©clarÃ©s, avec une premiÃ¨re instruction
gÃ©nÃ©rÃ©e depuis l'issue. Un **cycle de session** ouvre chaque session en
lisant ce que la prÃ©cÃ©dente a laissÃ©, et la referme avec une seule commande
de sortie dont le code est dÃ©cidÃ© par la seule durabilitÃ©. Un **outil de
clÃ´ture** refuse de supprimer tout worktree dont la matiÃ¨re n'est pas
prÃ©servÃ©e de faÃ§on dÃ©montrable, et clÃ´t les contrats depuis leurs livraisons
fusionnÃ©es, avec quatre refus qui lui sont propres.

Sous les outils, quatre principes : *mesurÃ©, pas supposÃ©* ; *Ã©chouer fermÃ©,
et dire quelle condition* ; *un refus n'empÃªche pas la mission, il la
dÃ©place hors de la porte* ; *durable veut dire atteignable depuis une
rÃ©fÃ©rence poussÃ©e*.

<p align="center">
  <a href="brand/lifecycle-canvas.fr.png"><img alt="OÃ¹ une mission peut s'arrÃªter â€” le modÃ¨le de fonctionnement dessinÃ© sur l'exemple Lantern" src="brand/lifecycle-canvas.fr.png" width="880"></a><br>
  <sub>Ã€ lire pour ses points d'arrÃªt : sept conditions avant qu'une session dÃ©marre, un tÃ©moin et une porte avant que quoi que ce soit n'atterrisse, trois codes de sortie dÃ©cidÃ©s par la seule durabilitÃ©, et un registre qui renvoie chaque incident dans le contrat suivant. <a href="https://simon-pacifae-dupont.github.io/Guildwork/brand/lifecycle-canvas.fr.html">Version interactive</a> â€” survolez un bloc pour isoler son chemin.</sub>
</p>

**Le tableau, lu pour ce qu'il doit Ã  chaque siÃ¨ge.** Six compteurs, puis
trois questions dans cet ordre : ce qui attend la dÃ©cision du Product Owner
et celle de personne d'autre, ce que l'architecte fusionne sous dÃ©lÃ©gation
sans lui, et ce qui n'entre dans aucune rÃ¨gle â€” une pull request sans ligne
`Mission:`, une livraison qui nomme une mission close, un lot sans chantier.
Ces derniers sont comptÃ©s sur la face du tableau plutÃ´t que rangÃ©s au jugÃ©,
et ces compteurs sont faits pour afficher zÃ©ro. Chaque chiffre porte la
faÃ§on dont il a Ã©tÃ© obtenu : un compte lu en entier et un compte qui s'est
arrÃªtÃ© en route ne sont pas la mÃªme affirmation.

Il ne dÃ©tient aucun jeton et ne recopie rien : il lit le dÃ©pÃ´t par le
connecteur GitHub du lecteur. Il ne fusionne jamais â€” la page est Ã  un
partage de n'importe qui, et un bouton de fusion sur une page partageable
est une porte que tout le monde franchit. Et il publie ce qu'il ne voit
pas : une session sur une autre machine, un processus qui n'expose pas sa
ligne de commande, un agent lancÃ© Ã  la main.

Ce que le pack livre aujourd'hui, c'est le *lecteur*, sous
`templates/board/`. La lecture de l'hÃ´te et le chemin de dÃ©cision montrÃ©s
dans la dÃ©monstration sont plus rÃ©cents, et rejoindront le pack quand ils
auront cessÃ© de bouger â€” c'est la rÃ¨gle que tout le reste ici applique.
[DÃ©monstration](https://simon-pacifae-dupont.github.io/Guildwork/demo/board/) Â·
[le lecteur livrÃ©, en franÃ§ais](https://simon-pacifae-dupont.github.io/Guildwork/fr/demo/board/).

## Ce que contient ce dÃ©pÃ´t

```
docs/        quinze documents, numÃ©rotÃ©s dans l'ordre de lecture
templates/   les fichiers Ã  poser dans un dÃ©pÃ´t : formulaire d'issue, gabarit de
             pull request, recette d'Ã©tiquettes, profils de rÃ´le, format de journal,
             manifeste des chemins rÃ©gÃ©nÃ©rables, registre de constats, convention de changelog
examples/    une mission fictive suivie de bout en bout â€” issue, transcription du
             lanceur, instruction gÃ©nÃ©rÃ©e, rapport de transmission, pull request,
             entrÃ©e de journal, transcription de clÃ´ture, registre
```

| Document | Ce qu'il tranche |
|---|---|
| [00 â€” Le modÃ¨le de fonctionnement](docs/00-operating-model.md) | les cinq surfaces, les siÃ¨ges, le cycle de vie, les principes |
| [01 â€” Le contrat de mission](docs/01-mission-contract.md) | le formulaire d'issue champ par champ, l'ordre conservateur des options, ce qu'un commentaire peut amender |
| [02 â€” Le contrat de livraison](docs/02-delivery-contract.md) | le gabarit de pull request, la ligne `Mission:` et ses trois Ã©tats, qui dispose de ce qu'une exÃ©cution a crÃ©Ã© |
| [03 â€” La taxonomie d'Ã©tiquettes](docs/03-label-taxonomy.md) | dix-sept Ã©tiquettes et pas une de plus ; les Ã©tiquettes de routage sont des Ã©vÃ©nements, celles de chantier sont descriptives |
| [04 â€” CapacitÃ©s et routage](docs/04-capabilities-and-routing.md) | trois atomes, une Ã©numÃ©ration qui n'est pas une Ã©chelle, `unknown` route comme *ne peut pas* |
| [05 â€” Le lanceur](docs/05-launcher.md) | les sept conditions â€” et pourquoi l'implÃ©mentation de rÃ©fÃ©rence en refuse dix â€” l'Ã©pinglage de la gouvernance, `--resume`, `--list`, l'instruction gÃ©nÃ©rÃ©e |
| [06 â€” EntrÃ©e et sortie de session](docs/06-session-cycle.md) | `guild-hi`, `guild-bye`, les codes de sortie 0/2/3, la dÃ©claration Ã  trois Ã©tats |
| [07 â€” L'outil de clÃ´ture](docs/07-closeout.md) | cinq conditions, le manifeste des chemins rÃ©gÃ©nÃ©rables, ce qui clÃ´t une mission |
| [08 â€” La continuitÃ©](docs/08-continuity.md) | la prÃ©sÃ©ance des sources, les sept modes de dÃ©faillance, ce qu'une passation doit Ã  celui qui suit |
| [09 â€” Le registre de constats](docs/09-findings-register.md) | une issue, deux sorties, revue Ã  chaque passage |
| [10 â€” Effort et paramÃ¨tres d'exÃ©cution](docs/10-effort-and-execution-parameters.md) | la correspondance exacte, les niveaux par siÃ¨ge, *dire ce qui a tournÃ©* |
| [11 â€” Les fragments de changelog](docs/11-changelog-fragments.md) | un fichier par mission, assemblÃ©s Ã  la release |
| [12 â€” Les incidents](docs/12-incidents.md) | quarante-sept dÃ©faillances, et la rÃ¨gle que chacune a payÃ©e |
| [13 â€” Les chiffres](docs/13-by-the-numbers.md) | les chiffres rÃ©els du projet, domaine retirÃ© |
| [14 â€” Le chemin d'adoption](docs/14-adoption-path.md) | quoi faire dans quel ordre, et ce que ce pack ne contient pas |

## Quinze minutes

Lisez `00` pour la forme, `12` pour la raison de cette forme, et la
transcription du lanceur dans `examples/lantern/launcher-dry-run.md` pour ce
que Ã§a fait Ã  l'usage. Si ces trois-lÃ  en mÃ©ritent un quatriÃ¨me, lisez `05`.

## Dix minutes pour installer

```
git clone https://github.com/Simon-Pacifae-Dupont/Guildwork
mkdir -p votre-depot/.github && cp -r Guildwork/templates/github/. votre-depot/.github/
cd votre-depot && sh ../Guildwork/templates/labels.sh
```

Trois commandes : le formulaire d'issue et le gabarit de pull request
atterrissent dans `.github/` sur votre branche par dÃ©faut, et les dix-sept
Ã©tiquettes, les routes `watcher:*` et les chantiers `chantier:*` sont crÃ©Ã©s
une fois, par un humain (sous Windows, lancez les lignes `gh label` de
`labels.sh` depuis PowerShell). Ouvrez ensuite une issue avec le formulaire
*AI mission* â€” le premier contrat existe. Le lanceur qui le lira est Ã  vous
d'Ã©crire, depuis `05` ; `templates/README.md` dit quelle valeur est celle de
Lantern et ce qui vous reste Ã  Ã©crire.

## D'oÃ¹ Ã§a vient

Une application de bureau Windows en Python avec une suite de 12 100 tests,
un seul humain Product Owner, une session Claude Cowork comme architecte en
chef, des siÃ¨ges d'exÃ©cution sur Claude Code et Grok, et Codex en relecteur
externe. Dans les onze jours
jusqu'au 5 septembre 2026, 278 contrats ont Ã©tÃ© ouverts et 262 pull requests
fusionnÃ©es ; 485 sessions se sont closes avec une entrÃ©e de journal, sur les
34 jours d'existence du journal. `docs/13-by-the-numbers.md` contient la table
complÃ¨te, et ses deux lectures.

Tous les exemples sont rÃ©Ã©crits sur un projet fictif, **Lantern** â€” un
tableau de bord de capteurs d'atelier reliÃ© Ã  un contrÃ´leur de banc â€” pour
que les mÃ©caniques puissent Ãªtre montrÃ©es sans dÃ©crire le produit rÃ©el. Rien
de ce qui concerne Lantern n'est porteur.

## Ce que ce n'est pas

Ni un framework, ni un runtime, ni une extension. Les trois outils sont
spÃ©cifiÃ©s dans `05`, `06` et `07` assez prÃ©cisÃ©ment pour Ãªtre auditÃ©s ou
rÃ©implÃ©mentÃ©s, et ils ne sont pas livrÃ©s : installer tout ceci sur un dÃ©pÃ´t,
adapter le vocabulaire aux siÃ¨ges et aux chantiers d'une Ã©quipe, mesurer la
table des capacitÃ©s sur ses machines, Ã©crire les outils contre ses harnais,
et mener les deux premiÃ¨res semaines de missions Ã  ses cÃ´tÃ©s â€” c'est Ã§a, le
travail. Et c'est le travail que fait l'auteur.

## Contact

Simon Dupont â€” [GitHub](https://github.com/simon-pacifae-dupont) Â·
[LinkedIn](https://www.linkedin.com/in/simon-pacifae-dupont/) Â·
simon.pacifae.dupont@gmail.com. Si vous faites tourner, ou comptez faire
tourner, plus d'un agent de code IA sur un code qui compte, Ã©crivez.

## Licence

MIT â€” voir `LICENSE`. Le projet Lantern, son dÃ©pÃ´t, ses personnes et ses
chiffres sont fictifs ; les chiffres de `docs/13-by-the-numbers.md` sont
rÃ©els ; ils ont Ã©tÃ© mesurÃ©s le 6 septembre 2026, sur des jours complets uniquement.
