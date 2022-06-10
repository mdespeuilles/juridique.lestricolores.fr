<template>
  <div>
    <div class="header">
      <div>
        <strong><i>« {{ submission.raisonSociale }} »</i></strong><br />
        <strong>Société par actions simplifiée</strong><br />
        <strong>au capital de {{ submission|capital|currency }}</strong>
        <div v-if="submission">
          <strong>Siège social : <br /><siege :submission="submission"></siege></strong>
        </div>
      </div>
    </div>

    <h1>STATUTS </h1>

    <div style="page-break-before: always;"></div>

    <p>
      <strong>
        LE SOUSSIGNÉ,
      </strong>
    </p>

    <p>
      <people :people="submission.actionnaireUnique" />
    </p>

    <p>
      Ci-après dénommé "l'actionnaire unique",
    </p>
    <p>
      A établi, ainsi qu'il suit, les statuts de la société par actions simplifiée unipersonnelle qu'il a décidé d'instituer.
    </p>

    <div style="page-break-before: always;"></div>

    <h1>Forme – Dénomination – Objet – Siège - Durée</h1>

    <h2>Article 1 – Forme</h2>

    <p>
      Il est formé par l'actionnaire unique propriétaire des actions ci-après créées une société par actions simplifiée régie par les lois et règlements en vigueur, ainsi que par les présents statuts.
    </p>
    <p>
      Elle fonctionne sous la même forme avec un ou plusieurs actionnaires.
    </p>
    <p>
      Dans le cas où la société comporte plusieurs actionnaires, les attributions de l'actionnaire unique sont dévolues à la collectivité des actionnaires.
    </p>
    <p>
      Elle ne peut procéder à une offre au public de ses titres mais peut néanmoins procéder à des offres réservées à des investisseurs qualifiés ou à un cercle restreint d'investisseurs.
    </p>

    <h2>Article 2 – Objet</h2>

    <p>La Société a pour objet, en France et à l'étranger :</p>
    <p style="white-space: pre-line">
      {{ submission.secteurActivite.Description }}
    </p>

    <p>
      Toutes opérations industrielles et commerciales se rapportant à :
      <br /><br />
      - la création, l'acquisition, la location, la prise en location-gérance de tous fonds de commerce, la prise à bail, l'installation, l'exploitation de tous établissements, fonds de commerce, usines, ateliers, se rapportant à l'une ou l'autre des activités spécifiées ci-dessus ;<br />
      - la prise, l'acquisition, l'exploitation ou la cession de tous procédés, brevets et droits de propriété intellectuelle concernant ces activités ;<br />
      - la participation, directe ou indirecte, de la Société dans toutes opérations financières, mobilières ou immobilières ou entreprises commerciales ou industrielles pouvant se rattacher à l'objet social ou à tout objet similaire ou connexe ;<br />
      - toutes opérations quelconques contribuant à la réalisation de cet objet.
    </p>

    <h2>Article 2 – Dénomination</h2>

    La dénomination sociale est : <strong>{{ submission.raisonSociale }}</strong>

    <p>Dans tous les actes et documents émanant de la Société et destinés aux tiers, la dénomination sera précédée ou suivie immédiatement des mots écrits lisiblement "Société par actions simplifiée" ou des initiales "SAS" et de l'énonciation du montant du capital social.</p>

    <p>En outre, la Société doit indiquer en tête de ses factures, notes de commandes, tarifs et documents publicitaires, ainsi que sur toutes correspondances et récépissés concernant son activité et signés par elle ou en son nom, le siège du tribunal au greffe duquel elle est immatriculée au Registre du commerce et des sociétés, et le numéro d'immatriculation qu'elle a reçu.</p>

    <h2>Article 4 – Siège social</h2>

    Le siège social est fixé : <siege :submission="submission"></siege>

    <p>Il peut être transféré en tout endroit par décision de l’actionnaire unique ou par décision collective des actionnaires.</p>

    <h2>Article 5 – Durée</h2>

    <p>La durée de la Société est fixée à 99 années à compter de la date de son immatriculation au Registre du commerce et des sociétés, sauf les cas de dissolution anticipée ou de prorogation.</p>

    <h1>Apport – Capital social – Actions</h1>

    <h2>Article 6 – Apports</h2>

    <p>Lors de la constitution, l'actionnaire unique, soussigné, apporte à la Société :</p>

    <p class="underline">Apports en numéraire</p>

    <p>
      Une somme en numéraire d'un montant total de {{ submission.capital|numberToLetter }} EUROS ({{ submission.capital|currency }}),
      correspondant au montant du capital social et à {{ submission.capital }} actions
      d’une valeur nominale de 1 EUROS (un €),
      souscrites en totalité et
      <span v-if="submission.verseCreation.value === 1">
        intégralement libérées
      </span>

      <span v-if="submission.verseCreation.value !== 1">
        libéré à hauteur de {{ submission.verseCreation.label }}
      </span>
    </p>

    <p>
      Cette somme de {{ (submission.capital*submission.verseCreation.value)|currency }} euros a été régulièrement déposée à un compte ouvert au nom de la Société en formation, à la banque.
    </p>

    <div v-if="montantApports() > 0">
      <p class="underline">Apports en nature</p>

      <people :people="submission.actionnaireUnique" :short="true"/> apporte à la Société,
      sous les garanties ordinaires et de droit :

      <p v-for="apport in submission.actionnaireUnique.apports">- {{ apport.description }} d'une valeur de {{ apport.valorisation|currency }}</p>
    </div>

    <p>
      En rémunération de cet apport évalué à {{ submission|capital|currency }},
      il est attribué à <people :people="submission.actionnaireUnique" :short="true"/>,
      {{ submission|capital }} sociales d'une valeur nominale de un (1) euros chacune,
      entièrement libérées.
    </p>

    <p>
      Cette estimation a été effectuée sans l'intervention d'un Commissaire aux Apports,
      compte tenu de ce que la valeur d'aucun apport en nature n'excède 30 000 euros et
      que la valeur totale de l'ensemble des apports non soumis à l'évaluation d'un Commissaire
      aux Apports n'excède pas la moitié du capital social.
    </p>


    <p class="underline">Récapitulation des apports</p>

    <p>Les apports effectués à la Société s'élèvent à :</p>

    <p>
      • apports en numéraire :
    </p>

    <p>
      {{ submission.capital|numberToLetter }} Euros,<br />
      Ci {{ submission.capital|currency }}
    </p>

    <p v-if="montantApports() > 0">
      • apports en natures :
    </p>

    <p v-if="montantApports() > 0">
      {{ montantApports()|numberToLetter }} Euros,<br />
      Ci {{ montantApports()|currency }}
    </p>

    <p>
      <strong>
        TOTAL DES APPORTS : {{ submission|capital|numberToLetter }} EUROS,
        Ci : {{ submission|capital|currency }}
      </strong>
    </p>

    <h2>Article 7 – Capital social </h2>

    <p>
      Le capital social est fixé à la somme de
      {{ submission|capital|numberToLetter }} EUROS ( {{ submission|capital|currency }}).
      Il est divisé en {{ submission|capital }} actions numérotées de 1 à {{ submission|capital }},
      <span v-if="submission.verseCreation.value === 1">entièrement libérées</span>
      <span v-else>libéré à hauteur de {{ submission.verseCreation.label }}</span>
      et de même catégorie.
    </p>

    <h2>Article 8 – Modifications du capital social</h2>

    <p>
      1 - Le capital social peut être augmenté par tous procédés et selon toutes modalités
      prévues par la loi et les règlements en vigueur, en vertu d'une décision de l'associé
      unique ou d'une décision collective extraordinaire des actionnaires statuant sur le rapport
      du Président.
    </p>

    <p>
      Le capital social est augmenté soit par émission d'actions ordinaires, soit par majoration
      du montant nominal des titres de capital existants. Il peut également être augmenté par
      l'exercice de droits attachés à des valeurs mobilières donnant accès au capital, dans
      les conditions prévues par la loi.
    </p>

    <p>
      L'actionnaire unique ou les actionnaires peuvent déléguer au Président les pouvoirs nécessaires
      à l'effet de réaliser ou de décider, dans les conditions et délais prévus par la loi,
      l'augmentation du capital.
    </p>

    <p>
      En cas d'augmentation par émission d'actions de numéraire ou émission de valeurs mobilières
      donnant accès au capital ou donnant droit à l'attribution de titres de créances,
      l'actionnaire unique ou les actionnaires ont, proportionnellement au montant de leurs actions,
      un droit préférentiel à la souscription des titres émis. Ils peuvent cependant renoncer
      à titre individuel à leur droit préférentiel de souscription et la décision d'augmentation
      du capital peut supprimer ce droit préférentiel dans les conditions prévues par la loi.
    </p>

    <p>
      Le droit à l'attribution d'actions nouvelles, à la suite de l'incorporation au capital de réserves, bénéfices ou primes d'émission appartient au nu-propriétaire, sous réserve des droits de l'usufruitier.
    </p>

    <p>
      2 - Le capital social peut être réduit par tous procédés et selon toutes modalités prévues par la loi et les règlements en vigueur, en vertu d'une décision de l'actionnaire unique ou d'une décision collective extraordinaire des actionnaires statuant sur le rapport du Président. L'actionnaire unique ou les actionnaires peuvent déléguer au Président tous pouvoirs pour réaliser la réduction de capital.
    </p>

    <h2>Article 9 – Modifications du capital social</h2>

    <p>
      Lors de la constitution de la Société, les actions de numéraire sont libérées, lors de la souscription, de la moitié au moins de leur valeur nominale.
    </p>
    <p>
      Lors d'une augmentation de capital, les actions de numéraire sont libérées, lors de la souscription, d'un quart au moins de leur valeur nominale et, le cas échéant, de la totalité de la prime d'émission.
    </p>
    <p>
      La libération du surplus doit intervenir en une ou plusieurs fois sur appel du Président, dans le délai de cinq ans à compter de l'immatriculation au Registre du commerce et des sociétés en ce qui concerne le capital initial, et dans le délai de cinq ans à compter du jour où l'opération est devenue définitive en cas d'augmentation de capital.
    </p>
    <p>
      Les appels de fonds sont portés à la connaissance du souscripteur quinze jours au moins avant la date fixée pour chaque versement, par lettre recommandée avec demande d'avis de réception.
    </p>
    <p>
      Tout retard dans le versement des sommes dues sur le montant non libéré des actions entraîne de plein droit intérêt au taux légal à partir de la date d'exigibilité, sans préjudice de l'action personnelle que la Société peut exercer contre l'actionnaire défaillant et des mesures d'exécution forcée prévues par la loi.
    </p>


    <h2>Article 10 – Forme des actions</h2>

    <p>
      Les actions sont obligatoirement nominatives. Elles donnent lieu à une inscription en compte individuel dans les conditions et selon les modalités prévues par la loi et les règlements en vigueur.
    </p>
    <p>
      Tout actionnaire peut demander à la Société la délivrance d'une attestation d'inscription en compte.
    </p>

    <h2>Article 11 – Transmission des actions</h2>

    <p>
      11.1. Les actions ne sont négociables qu'après l'immatriculation de la Société au Registre du commerce et des sociétés. En cas d'augmentation du capital, les actions sont négociables à compter de la réalisation de celle-ci.
    </p>
    <p>
      Les actions demeurent négociables après la dissolution de la Société et jusqu'à la clôture de la liquidation.
    </p>
    <p>
      La propriété des actions résulte de leur inscription en compte individuel au nom du ou des titulaires sur les registres tenus à cet effet au siège social, dit « registre des mouvements ».
    </p>
    <p>
      En cas de transmission des actions, le transfert de propriété résulte de l'inscription des titres au compte de l'acheteur à la date fixée par l'accord des parties et notifiée à la Société.
    </p>
    <p>
      Les actions résultant d'apports en industrie sont attribuées à titre personnel. Elles sont inaliénables et intransmissibles.
    </p>
    <p>
      Elles seront annulées en cas de décès de leur titulaire comme en cas de cessation par ledit titulaire de ses prestations à l'issue d'un délai de trois (3) mois suivant mise en demeure, par lettre recommandée avec demande d'avis de réception, de poursuivre lesdites prestations dans les conditions prévues à la convention d'apport.
    </p>
    <p>
      11.2. Les cessions ou transmissions, sous quelque forme que ce soit, des actions détenues par l'actionnaire unique sont libres.
    </p>
    <p>
      En cas de dissolution de l'éventuelle communauté de biens existant entre l'actionnaire unique, personne physique, et son conjoint, la Société continue de plein droit, soit avec un actionnaire unique si la totalité des actions est attribuée à l'un des époux, soit avec les deux actionnaires si les actions sont partagées entre les époux.
    </p>
    <p>
      En cas de décès de l'actionnaire unique, la Société continue de plein droit entre ses ayants droit ou héritiers, et éventuellement son conjoint survivant.
    </p>
    <p>
      La cession de droits d'attribution d'actions gratuites, en cas d'augmentation de capital par incorporation de réserves, primes d'émission ou bénéfices, est assimilée à la cession des actions gratuites elles-mêmes, et la cession de droits de souscription à une augmentation de capital par voie d'apports en numéraire est libre.
    </p>

    <p>
      <strong>11.3. Transmission des actions en cas de pluralité d'actionnaires</strong>
    </p>

    <p class="underline">Agrément des cessions</p>

    <p>
      Agrément en cas de cession à un tiers
    </p>
    <p>
      La cession de titres de capital et de valeurs mobilières donnant accès au capital à un tiers est soumise à l'agrément préalable de la collectivité des actionnaires.
    </p>
    <p>
      Les cessions d’actions entre actionnaires sont libres.
    </p>
    <p>
      Le cédant doit notifier par lettre recommandée avec demande d'avis de réception une demande d'agrément au Président de la Société en indiquant les nom, prénoms et adresse du cessionnaire, le nombre des titres de capital ou valeurs mobilières donnant accès au capital dont la cession est envisagée et le prix offert. Cette demande d'agrément est transmise par le Président aux actionnaires.
    </p>
    <p>
      L'agrément résulte d'une décision collective des actionnaires statuant à la majorité des voix des actionnaires disposant du droit de vote.
    </p>
    <p>
      La décision d'agrément ou de refus d'agrément n'a pas à être motivée. Elle est notifiée au cédant par lettre recommandée. A défaut de notification dans les trois (3) mois qui suivent la demande d'agrément, l'agrément est réputé acquis.
    </p>
    <p>
      En cas d'agrément, l'actionnaire cédant peut réaliser librement la cession aux conditions prévues dans la demande d'agrément.
    </p>
    <p>
      En cas de refus d'agrément, la Société est tenue, dans un délai de trois (3) mois à compter de la notification du refus, de faire acquérir les titres de capital ou valeurs mobilières donnant accès au capital, soit par un actionnaire ou par un tiers, soit, avec le consentement du cédant, par la Société, en vue d'une réduction du capital.
    </p>
    <p>
      A défaut d'accord entre les parties, le prix des titres de capital ou valeurs mobilières donnant accès au capital est déterminé par voie d'expertise, dans les conditions prévues à l'article 1843-4 du Code civil.
    </p>
    <p>
      Si les modalités de détermination du prix des titres de capital ou valeurs mobilières donnant accès au capital sont prévues dans une convention liant les parties à la cession ou au rachat, l'expert désigné sera tenu de les appliquer conformément aux dispositions du second alinéa du I de l'article 1843-4 du Code civil.
    </p>
    <p>
      Le cédant peut à tout moment aviser le Président, par lettre recommandée avec demande d'avis de réception, qu'il renonce à la cession de ses titres de capital ou valeurs mobilières donnant accès au capital.
    </p>
    <p>
      Si, à l'expiration du délai de trois (3) mois, l'achat n'est pas réalisé, l'agrément est considéré comme donné. Toutefois, ce délai peut être prolongé par ordonnance de référé du Président du Tribunal de commerce, sans recours possible, l'actionnaire cédant et le cessionnaire dûment appelés.
    </p>
    <p>
      Les dispositions qui précèdent sont applicables à toutes les cessions, que lesdites cessions interviennent en cas de dévolution successorale ou de liquidation d'une communauté de biens entre époux, par voie d'apport, de fusion, de partage consécutif à la liquidation d'une société associée, de transmission universelle de patrimoine d'une société ou par voie d'adjudication publique en vertu d'une décision de justice ou autrement.
    </p>
    <p>
      Elles peuvent aussi s'appliquer à la cession des droits d'attribution en cas d'augmentation de capital par incorporation de réserves, primes d'émission ou bénéfices, ainsi qu'en cas de cession de droits de souscription à une augmentation de capital par voie d'apports en numéraire ou de renonciation individuelle au droit de souscription en faveur de personnes dénommées.
    </p>
    <p>
      La présente clause d'agrément ne peut être supprimée ou modifiée qu'à l'unanimité des actionnaires.
    </p>
    <p>
      Toute cession réalisée en violation de cette clause d'agrément est nulle.
    </p>

    <p>11.4 Location des actions</p>

    <p>
      La location des actions est interdite.
    </p>

    <h2>Article 12 – Droits et obligations attachés aux actions</h2>

    <p>
      12.1 Toute action donne droit, dans les bénéfices et l'actif social, à une part nette proportionnelle à la quotité de capital qu'elle représente.
    </p>
    <p>
      L'actionnaire unique ou la collectivité des actionnaires ne supporte les pertes qu'à concurrence de ses apports.
    </p>
    <p>
      Les droits et obligations suivent l'action quel qu'en soit le titulaire.
    </p>
    <p>
      La propriété d'une action comporte de plein droit adhésion aux statuts de la Société et aux décisions de la collectivité des actionnaires.
    </p>
    <p>
      Les actions sont indivisibles à l'égard de la Société.
    </p>
    <p>
      12.2 Si une action est grevée d'un usufruit, le nu-propriétaire et l'usufruitier ont le droit de participer aux décisions collectives. Ils doivent être convoqués à toutes les assemblées et disposent du même droit d'information.
    </p>
    <p>
      Le droit de vote appartient au nu-propriétaire, sauf pour les décisions relatives à l'affectation des bénéfices où il appartient à l'usufruitier. Toutefois, pour les autres décisions, le nu-propriétaire et l'usufruitier peuvent convenir que le droit de vote sera exercé par l'usufruitier.
    </p>
    <p>
      Lorsqu'une action est grevée d'usufruit, les droits du nu-propriétaire et de l'usufruitier sont, sauf convention contraire des parties, répartis de la manière suivante :
      - les dividendes et le report à nouveau reviennent à l'usufruitier ;
      - le nu-propriétaire a droit aux réserves mais en cas de distribution de ces réserves, l'usufruitier a un droit de jouissance sur les sommes distribuées, sous la forme d'un quasi-usufruit, à charge pour lui de les restituer en fin d'usufruit ;
      - lors du partage, le boni de liquidation et le remboursement des apports reviennent au nu-propriétaire mais restent soumis à l'usufruit, l'usufruitier pouvant disposer librement des sommes correspondantes, à charge pour lui de les restituer en fin d'usufruit (C. civ., art. 587, quasi-usufruit).
    </p>

    <h1>Direction et contrôle de la Société</h1>

    <h2>Article 13 – Président de la Société</h2>

    <p>La société est représentée, dirigée et administrée par un Président, personne physique ou morale, associée ou non de la Société.</p>

    <p><strong>13.1 Désignation</strong></p>

    <p>
      Le Président est nommé ou renouvelé dans ses fonctions par l'actionnaire unique ou la collectivité des actionnaires, qui fixe son éventuelle rémunération.
    </p>
    <p>
      La personne morale Président est représentée par son représentant légal sauf si, lors de sa nomination ou à tout moment en cours de mandat, elle désigne une personne spécialement habilitée à la représenter en qualité de représentant.
    </p>
    <p>
      Lorsqu'une personne morale est nommée Président, ses dirigeants sont soumis aux mêmes conditions et obligations et encourent les mêmes responsabilités civile et pénale que s'ils étaient Président en leur propre nom, sans préjudice de la responsabilité solidaire de la personne morale qu'ils dirigent.
    </p>
    <p>
      Le mandat du président est renouvelable sans limitation.
    </p>
    <p>
      Le Président, personne physique, ou le représentant de la personne morale Président, peut être également lié à la Société par un contrat de travail à condition que ce contrat corresponde à un emploi effectif.
    </p>

    <p><strong>13.2 Durée des fonctions</strong></p>
    <p>
      Le Président est désigné pour une durée déterminée ou non, par l'actionnaire unique ou la collectivité des actionnaires.
    </p>
    <p>
      Les fonctions de Président prennent fin soit par le décès, la démission, la révocation, l'expiration de son mandat, soit par l'ouverture à l'encontre de celui-ci d'une procédure de redressement ou de liquidation judiciaires.
    </p>
    <p>
      Le Président peut démissionner de son mandat à la condition de notifier sa décision à l'actionnaire unique ou à la collectivité des actionnaires, par lettre recommandée.
    </p>
    <p>
      L'actionnaire unique ou la collectivité des actionnaires peut mettre fin à tout moment au mandat du Président. La décision de révocation n'a pas à être motivée.
    </p>
    <p>
      En outre, le Président est révoqué de plein droit, sans indemnisation, dans les cas suivants :<br />
      - interdiction de diriger, gérer, administrer ou contrôler une entreprise ou personne morale, incapacité ou faillite personnelle du Président personne physique,<br />
      - mise en redressement ou liquidation judiciaire, interdiction de gestion ou dissolution du Président personne morale.
    </p>

    <p><strong>13.3 Rémunération</strong></p>

    <p>
      Le Président dirige la Société et la représente à l'égard des tiers. A ce titre, il est investi des pouvoirs les plus étendus pour agir en toute circonstance au nom de la Société dans les limites de l'objet social et des pouvoirs expressément dévolus par la loi et les statuts à l'actionnaire unique ou à la collectivité des actionnaires.
    </p>
    <p>
      Les dispositions des présents statuts limitant les pouvoirs du Président sont inopposables aux tiers.
    </p>
    <p>
      La Société est engagée même par les actes du Président qui ne relèvent pas de l'objet social, à moins qu'elle ne prouve que le tiers savait que l'acte dépassait cet objet ou qu'il ne pouvait l'ignorer compte tenu des circonstances, la seule publication des statuts ne suffisant pas à constituer cette preuve.
    </p>
    <p>
      Le Président peut déléguer à toute personne de son choix certains de ses pouvoirs pour l'exercice de fonctions spécifiques ou l'accomplissement de certains actes.
    </p>

    <p><strong>13.4 Pouvoirs du Président</strong></p>

    <p>
      Le Président dirige la Société et la représente à l'égard des tiers. A ce titre, il est investi des pouvoirs les plus étendus pour agir en toute circonstance au nom de la Société dans les limites de l'objet social et des pouvoirs expressément dévolus par la loi et les statuts à l'actionnaire unique ou à la collectivité des actionnaires.
    </p>
    <p>
      Les dispositions des présents statuts limitant les pouvoirs du Président sont inopposables aux tiers.
    </p>
    <p>
      La Société est engagée même par les actes du Président qui ne relèvent pas de l'objet social, à moins qu'elle ne prouve que le tiers savait que l'acte dépassait cet objet ou qu'il ne pouvait l'ignorer compte tenu des circonstances, la seule publication des statuts ne suffisant pas à constituer cette preuve.
    </p>
    <p>
      Le Président peut déléguer à toute personne de son choix certains de ses pouvoirs pour l'exercice de fonctions spécifiques ou l'accomplissement de certains actes.
    </p>

    <h2>Article 14 – Directeur(s) général(aux)</h2>

    <p><strong>14.1 Désignation</strong></p>
    <p>
      L'actionnaire unique ou la collectivité des actionnaires peut nommer en qualité de Directeur Général une ou plusieurs personnes physiques ou une ou plusieurs personnes morales, pour assister le Président.
    </p>
    <p>
      La personne morale Directeur Général est représentée par son représentant légal sauf si, lors de sa nomination ou à tout moment en cours de mandat, elle désigne une personne spécialement habilitée à la représenter en qualité de représentant.
    </p>
    <p>
      Lorsqu'une personne morale est nommée Directeur Général, ses dirigeants sont soumis aux mêmes conditions et obligations et encourent les mêmes responsabilités civile et pénale que s'ils étaient Directeur Général en leur propre nom, sans préjudice de la responsabilité solidaire de la personne morale qu'ils dirigent.
    </p>
    <p>
      Le Directeur Général personne physique peut être lié à la Société par un contrat de travail.
    </p>


    <p><strong>14.2 Durée des fonctions</strong></p>

    <p>
      La durée des fonctions du ou des Directeurs Généraux est fixée dans la décision de nomination et ne peut excéder celle du mandat du Président.
    </p>
    <p>
      Toutefois, en cas de cessation des fonctions du Président, le ou les Directeurs Généraux conservent leurs fonctions jusqu'à la nomination du nouveau Président, sauf décision contraire des actionnaires.
    </p>
    <p>
      Les fonctions de Directeur Général prennent fin soit par le décès, la démission, la révocation, l'expiration de son mandat, soit par l'ouverture à l'encontre de celui-ci d'une procédure de redressement ou de liquidation judiciaires.
    </p>
    <p>
      Le ou les Directeurs Généraux peuvent démissionner de leur mandat à la condition de notifier leur décision au Président, par lettre recommandée.
    </p>
    <p>
    <p><strong>14.3 Révocation</strong></p>

    <p>
      Le ou les Directeurs Généraux peuvent être révoqués à tout moment, sans qu'il soit besoin d'un juste motif, par décision de l'actionnaire unique ou de la collectivité des actionnaires, sur la proposition du Président. Cette révocation n'ouvre droit à aucune indemnisation.
    </p>
    <p>
      En outre, le ou les Directeurs Généraux sont révoqués de plein droit, sans indemnisation, dans les cas suivants :<br />
      - interdiction de diriger, gérer, administrer ou contrôler une entreprise ou personne morale, incapacité ou faillite personnelle du Directeur Général personne physique,<br />
      - mise en redressement ou liquidation judiciaire, interdiction de gestion ou dissolution du Directeur Général personne morale,
    </p>

    <p><strong>14.4 Rémunération</strong></p>

    <p>
      Le ou les Directeurs Généraux peuvent recevoir une rémunération dont les modalités sont fixées dans la décision de nomination. Elle peut être fixe ou proportionnelle ou à la fois fixe et proportionnelle au bénéfice ou au chiffre d'affaires.
    </p>
    <p>
      En outre, le ou les Directeurs Généraux sont remboursés de leurs frais de représentation et de déplacement sur justificatifs.
    </p>

    <p><strong>14.5 Pouvoirs du Directeur Général</strong></p>

    <p>
      Le ou les Directeurs Généraux disposent des mêmes pouvoirs que le Président, sous réserve des limitations éventuellement fixées par la décision de nomination ou par une décision ultérieure.
    </p>
    <p>
      Le ou les Directeurs Généraux ne disposent pas du pouvoir de représenter la Société à l'égard des tiers.
    </p>

    <h2>Article 15 – Conventions règlementées</h2>

    <p>
      Les conventions intervenues directement ou par personnes interposées entre la Société et son Président, l'un de ses dirigeants, son actionnaire unique ou, s'il s'agit d'une société associée, la société la contrôlant au sens de l'article L. 233-3 du Code de commerce, sont mentionnées sur le registre des décisions.
    </p>
    <p>
      Si la Société comporte plusieurs actionnaires, le Président ou le Commissaire aux Comptes, s'il en existe, présente aux actionnaires, en application des dispositions de l'article L. 227-10 du Code de commerce, un rapport sur les conventions, intervenues directement ou par personne interposée entre la Société et son Président, l'un de ses dirigeants, l'un de ses actionnaires disposant d'une fraction des droits de vote supérieure à dix pour cent ou, s'il s'agit d'une société associée, la Société la contrôlant au sens de l'article L. 233-3 dudit code.
    </p>
    <p>
      Les actionnaires statuent sur ce rapport lors de la décision collective statuant sur les comptes de l'exercice écoulé.
    </p>
    <p>
      Les dispositions qui précèdent ne sont pas applicables aux conventions portant sur les opérations courantes de la Société et conclues à des conditions normales.
    </p>
    <p>
      Les conventions non approuvées produisent néanmoins leurs effets, à charge pour la personne intéressée et, éventuellement, pour le Président et les autres dirigeants d'en supporter les conséquences dommageables pour la Société.
    </p>
    <p>
      Les interdictions prévues à l'article L. 225-43 du Code de commerce s'appliquent dans les conditions déterminées par cet article, au Président et aux autres dirigeants de la Société.
    </p>

    <h2>Article 16 – Commissaires aux comptes</h2>

    <p>
      L'actionnaire unique ou en cas de pluralité d'actionnaires, la collectivité des actionnaires peut nommer un ou plusieurs Commissaires aux Comptes, en application des articles L. 823-1 et suivants du Code de commerce.
    </p>
    <p>
      Cette nomination est obligatoire si la Société dépasse, à la clôture d'un exercice social, les seuils définis légalement et fixés par décret. Le Commissaire aux Comptes sera nommé pour un mandat de six exercices et exercera son mandat dans le cadre d'un audit légal classique.
    </p>
    <p>
      Si un ou plusieurs actionnaires représentant au moins le tiers du capital en font la demande, la Société sera également tenue de désigner un Commissaire aux Comptes, pour un mandat de trois exercices et sera soumise à l'audit légal "petites entreprises".
    </p>
    <p>
      En outre, la nomination d'un Commissaire aux Comptes pourra être demandée en justice par un ou plusieurs actionnaires représentant au moins le dixième du capital.
    </p>
    <p>
      La durée de son mandat sera de six exercices.
    </p>
    <p>
      L'actionnaire unique ou en cas de pluralité d'actionnaires, la collectivité des actionnaires pourra, statuant à la majorité simple des actions émises par la société, désigner volontairement un Commissaire aux Comptes dans les conditions prévues à l'article L. 225-228 du Code de commerce. La Société pourra limiter la durée du mandat à trois exercices et sera ainsi soumise à l'audit légal "petites entreprises".
    </p>
    <p>
      Lorsqu'un Commissaire aux Comptes ainsi désigné est une personne physique ou une société unipersonnelle, un Commissaire aux Comptes suppléant appelé à remplacer le ou les titulaires en cas de refus, d'empêchement, de démission ou de décès, est nommé en même temps que le titulaire pour la même durée.
    </p>
    <p>
      Les Commissaires aux Comptes exercent leur mission de contrôle, conformément aux dispositions législatives et réglementaires en vigueur. Ils ont notamment pour mission permanente de vérifier les valeurs et les documents comptables de la Société, de contrôler la régularité et la sincérité des comptes sociaux et d'en rendre compte à la Société. Ils ne doivent en aucun cas s'immiscer dans la gestion de la Société.
    </p>
    <p>
      Les Commissaires aux Comptes sont invités à participer à toute consultation de la collectivité des actionnaires, conformément aux dispositions légales et réglementaires.
    </p>

    <h1>Décisions</h1>

    <h2>Article 17 – Décisions de l’actionnaire unique</h2>

    <p>
      L'actionnaire unique est seul compétent pour prendre les décisions suivantes :
    </p>
    <p>
      - approbation des comptes annuels et affectation du résultat,<br />
      - modification des statuts, sauf transfert du siège social,<br />
      - augmentation, amortissement ou réduction du capital social,<br />
      - fusion, scission ou apport partiel d'actif,<br />
      - transformation en une société d'une autre forme,<br />
      - dissolution de la Société,<br />
      - nomination des Commissaires aux Comptes,<br />
      - nomination, révocation et rémunération des dirigeants,<br />
    </p>
    <p>
      L'actionnaire unique ne peut pas déléguer ses pouvoirs.
    </p>
    <p>
      Les décisions de l'actionnaire unique font l'objet de procès-verbaux consignés dans un registre coté et paraphé.
    </p>
    <p>
      Les décisions qui ne relèvent pas de la compétence de l'actionnaire unique sont de la compétence du Président.
    </p>

    <h2>Article 18 – Décisions collectives</h2>

    <p>
      Si la Société comporte plusieurs actionnaires, les pouvoirs dévolus à l'actionnaire unique sont exercés par la collectivité des actionnaires.
    </p>

    <h3>18.1 Décisions collectives obligatoires</h3>

    <p>
      La collectivité des actionnaires est seule compétente pour prendre les décisions suivantes :<br />
      - approbation des comptes annuels et affectation des résultats,<br />
      - approbation des conventions réglementées,<br />
      - nomination des Commissaires aux Comptes,<br />
      - augmentation, amortissement et réduction du capital social,<br />
      - transformation de la Société,<br />
      - fusion, scission ou apport partiel d'actif,<br />
      - dissolution et liquidation de la Société,<br />
      - augmentation des engagements des actionnaires,<br />
      - agrément des cessions d'actions,<br />
      - nomination, révocation et rémunération des dirigeants,<br />
      - modification des statuts, sauf transfert du siège social,<br />
    </p>

    <p>
      Toutes autres décisions relèvent de la compétence du Président.
    </p>

    <h3>18.2 Modalités des décisions collectives</h3>

    <p>
      Les décisions collectives sont prises, au choix du Président en assemblée générale ou résultent du consentement des actionnaires exprimé dans un acte sous signature privée. Elles peuvent également faire l'objet d'une consultation écrite et être prises par tous moyens de télécommunication électronique.
    </p>
    <p>
      Toutefois, devront être prises en assemblée générale les décisions relatives à l'approbation des comptes annuels et à l'affectation des résultats, aux modifications du capital social, à des opérations de fusion, scission ou apport partiel d'actif et à l'exclusion d'un associé.
    </p>
    <p>
      Tout actionnaire a le droit de participer aux décisions collectives, personnellement ou par mandataire, quel que soit le nombre d'actions qu'il possède. Il doit justifier de son identité et de l'inscription en compte de ses actions au jour de la décision collective.
    </p>

    <h3>18.3 Consultation écrite</h3>

    <p>
      En cas de consultation écrite, le Président adresse à chaque associé, par lettre recommandée, le texte des résolutions proposées ainsi que les documents nécessaires à l'information des actionnaires.
    </p>
    <p>
      Les actionnaires disposent d'un délai de quinze (15) jours à compter de la réception du projet de résolutions pour transmettre leur vote à l'auteur de la consultation par lettre recommandée.
    </p>
    <p>
      Tout actionnaire n'ayant pas répondu dans le délai ci-dessus est considéré comme s'étant abstenu.
    </p>

    <h3>18.4 Assemblées Générales</h3>

    <p>
      Les Assemblées Générales sont convoquées, soit par le Président, soit par un mandataire désigné par le Président du Tribunal de commerce statuant en référé à la demande d'un ou plusieurs actionnaires réunissant cinq pour cent au moins du capital ou à la demande du comité social et économique en cas d'urgence, soit par le Commissaire aux Comptes, s'il en existe.
    </p>
    <p>
      Pendant la période de liquidation, l'Assemblée est convoquée par le liquidateur.
    </p>
    <p>
      La convocation est effectuée par tous procédés de communication écrite dix (10) jours avant la date de la réunion et mentionne le jour, l'heure, le lieu et l'ordre du jour de la réunion.
    </p>
    <p>
      Toutefois, l'Assemblée Générale se réunit valablement sur convocation verbale et sans délai si tous les actionnaires y consentent.
    </p>
    <p>
      L'ordre du jour est arrêté par l'auteur de la convocation.
    </p>
    <p>
      Un ou plusieurs actionnaires représentant au moins 10 % du capital ont la faculté de requérir l'inscription à l'ordre du jour de l'Assemblée de projets de résolutions par tous moyens de communication écrite. Ces demandes doivent être reçues au siège social cinq (5) jours au moins avant la date de la réunion. Le Président accuse réception de ces demandes dans les deux (2) jours de leur réception.
    </p>
    <p>
      L'Assemblée ne peut délibérer sur une question qui n'est pas à l'ordre du jour. Elle peut cependant, en toutes circonstances, révoquer le Président, un ou plusieurs dirigeants, et procéder à leur remplacement.
    </p>
    <p>
      Les actionnaires peuvent se faire représenter aux délibérations de l'Assemblée par un autre actionnaire ou par un tiers justifiant d'un mandat. Chaque mandataire peut disposer d'un nombre illimité de mandats.
    </p>
    <p>
      Les mandats peuvent être donnés par tous procédés de communication écrite, et notamment par télécopie.
    </p>
    <p>
      Tout actionnaire peut voter par correspondance, au moyen d'un formulaire établi par la Société et remis aux actionnaires qui en font la demande. Il devra compléter le bulletin, en cochant pour chaque résolution, une case unique correspondant au sens de son vote.
    </p>
    <p>
      Le défaut de réponse dans le délai indiqué par la convocation vaut abstention totale de l'associé.
    </p>
    <p>
      En cas de vote à distance au moyen d'un formulaire de vote électronique ou d'un vote par procuration donné par signature électronique, celui-ci s'exerce dans les conditions prévues par la réglementation en vigueur, soit sous la forme d'une signature électronique sécurisée au sens du décret 2017-1416 du 28 septembre 2017, soit sous la forme d'un procédé fiable d'identification garantissant son lien avec l'acte auquel elle s'attache.
    </p>
    <p>
      Lors de chaque assemblée, le président de séance peut décider de mentionner l'identité de chaque associé, le nombre d'actions et le nombre de droits de vote dont il dispose, dans le procès-verbal ou dans une feuille de présence qu'il certifiera après l'avoir fait émarger par les actionnaires présents et les mandataires.
    </p>
    <p>
      Les réunions des assemblées générales ont lieu au siège social ou en tout autre endroit indiqué dans la convocation.
    </p>
    <p>
      L'Assemblée est présidée par le Président ou, en son absence par un actionnaire désigné par l'Assemblée.
    </p>
    <p>
      L'Assemblée désigne un secrétaire qui peut être pris en dehors de ses membres.
    </p>
    <p>
      Les délibérations des Assemblées sont constatées par des procès-verbaux signés par le Président et le Secrétaire et établis sur un registre spécial. Les copies et extraits de ces procès-verbaux sont valablement certifiés par l'un des deux.
    </p>

    <h3>18.5 Règles d'adoption des décisions collectives</h3>

    <p>
      Le droit de vote attaché aux actions est proportionnel à la quotité de capital qu'elles représentent. Chaque action donne droit à une voix.
    </p>

    <h3>18.6 Majorité</h3>

    <p>
      Les décisions collectives entraînant modification des statuts, à l'exception de celles pour lesquelles l'unanimité est exigée par la loi ou par les présents statuts, seront prises à la majorité des deux tiers des actions émises par la société. Les autres décisions seront prises à la majorité simple des actions émises par la société.
    </p>
    <p>
      Doivent être prises à l'unanimité des actionnaires disposant du droit de vote les décisions collectives suivantes :<br />
      - celles prévues par les dispositions légales,<br />
      - les décisions ayant pour effet d'augmenter les engagements des actionnaires,<br />
      - la suppression ou modification de la clause d’agrément.<br />
    </p>

    <h3>18.7 Procès-verbaux des décisions collectives</h3>

    <p>
      Les décisions collectives prises en assemblée sont constatées par des procès-verbaux signés par le Président et le secrétaire et établis sur un registre spécial, ou sur des feuillets mobiles numérotés.
    </p>
    <p>
      Les procès-verbaux doivent indiquer le lieu et la date de la consultation, les documents et informations communiqués préalablement aux actionnaires, un exposé des débats ainsi que le texte des résolutions et pour chaque résolution le résultat du vote.
    </p>
    <p>
      En cas de décision collective résultant du consentement unanime des actionnaires exprimé dans un acte, cet acte doit mentionner les documents et informations communiqués préalablement aux actionnaires. Il est signé par tous les actionnaires et retranscrit sur le registre spécial ou les feuillets numérotés.
    </p>
    <p>
      Les copies ou extraits des procès-verbaux des décisions collectives sont valablement certifiés par le Président, ou un fondé de pouvoir habilité à cet effet.
    </p>

    <h3>18.8 Droit d'information des actionnaires</h3>

    <p>
      Quel que soit le mode de consultation, toute décision des actionnaires doit faire l'objet d'une information préalable comprenant l'ordre du jour, le texte des résolutions et tous documents et informations leur permettant de se prononcer en connaissance de cause sur la ou les résolutions soumises à leur approbation.
    </p>
    <p>
      Les rapports établis par le Président doivent être communiqués aux frais de la Société aux actionnaires dix (10) jours avant la date de la consultation, ainsi que les comptes annuels et, le cas échéant, les comptes consolidés du dernier exercice lors de la décision collective statuant sur ces comptes.
    </p>
    <p>
      L’actionnaire unique non Président ou les actionnaires peuvent, à toute époque, consulter au siège social, et, le cas échéant prendre copie, des statuts à jour de la Société ainsi que, pour les trois derniers exercices, des registres sociaux, des comptes annuels, du tableau des résultats des cinq derniers exercices, des comptes consolidés, des rapports et documents soumis aux actionnaires à l'occasion des décisions collectives.
    </p>

    <h1>Exercice social – Comptes sociaux – Affectation et répartition des bénéfices</h1>

    <h2>Article 19 – Exercice social</h2>

    <p>
      Chaque exercice social a une durée d'une année, qui commence le premier xxxxxx et finit le xxxxxxx.
    </p>

    <p>
      Par exception, le premier exercice commencera le jour de l'immatriculation de la Société au Registre du commerce et des sociétés et se terminera le xxxxx.
    </p>
    <p>
      En outre, les actes accomplis pour son compte pendant la période de constitution et repris par la société seront rattachés à cet exercice.
    </p>

    <h2>Article 20 – Inventaire – Comptes annuels</h2>

    <p>
      Il est tenu une comptabilité régulière des opérations sociales, conformément à la loi et aux usages du commerce.
    </p>
    <p>
      A la clôture de chaque exercice, le Président dresse l'inventaire des divers éléments de l'actif et du passif existant à cette date et établit les comptes annuels comprenant le bilan, le compte de résultat et le cas échéant, l'annexe, conformément aux lois et règlements en vigueur.
    </p>
    <p>
      Le Président établit, le cas échéant, le rapport sur la gestion du groupe et les comptes prévisionnels, dans les conditions prévues par la loi.
    </p>
    <p>
      Tous ces documents sont mis à la disposition du ou des Commissaires aux Comptes de la Société, s'il en existe, dans les conditions légales et réglementaires.
    </p>
    <p>
      L'actionnaire unique approuve les comptes annuels, après rapport du Commissaire aux Comptes, s'il en existe, dans les six mois de la clôture de l'exercice social, et décide l'affectation du résultat.
    </p>
    <p>
      En cas de pluralité d'actionnaires, l'assemblée des actionnaires approuve les comptes annuels, au vu du rapport de gestion et du rapport du Commissaire aux Comptes, s'il en existe, dans les six mois de la clôture de l'exercice social.
    </p>
    <p>
      Le Président dépose les documents énumérés par l'article L. 232-23 du Code de commerce au greffe du tribunal de commerce, dans le mois qui suit l'approbation des comptes annuels.
    </p>

    <h2>Article 21 – Affectation et répartition du résultat</h2>

    <p>
      Le compte de résultat qui récapitule les produits et charges de l'exercice fait apparaître par différence, après déduction des amortissements et des provisions, le bénéfice ou la perte de l'exercice clos.
    </p>
    <p>
      Sur le bénéfice de l'exercice diminué, le cas échéant, des pertes antérieures, il est prélevé cinq pour cent au moins pour constituer le fonds de réserve légale. Ce prélèvement cesse d'être obligatoire lorsque le fonds de réserve atteint le dixième du capital social ; il reprend son cours lorsque, pour une cause quelconque, la réserve légale est descendue au-dessous de ce dixième.
    </p>
    <p>
      Le bénéfice distribuable est constitué par le bénéfice de l'exercice diminué des pertes antérieures et des sommes à porter en réserve, en application de la loi et des statuts, et augmenté du report bénéficiaire.
    </p>
    <p>
      Sur le bénéfice distribuable, il est prélevé tout d'abord toute somme que l'actionnaire unique ou la collectivité des actionnaires décidera de reporter à nouveau sur l'exercice suivant ou d'affecter à tous fonds de réserves générales ou spéciales.
    </p>
    <p>
      Le surplus est attribué à l'actionnaire unique ou réparti entre tous les actionnaires au prorata de leurs droits dans le capital social.
    </p>
    <p>
      De même, l'actionnaire unique ou la collectivité des actionnaires peut décider la distribution de sommes prélevées sur les réserves disponibles en indiquant expressément les postes de réserves sur lesquels les prélèvements ont été effectués. Toutefois, les dividendes sont prélevés par priorité sur le bénéfice distribuable de l'exercice.
    </p>
    <p>
      Hors le cas de réduction du capital, aucune distribution ne peut être faite à l'actionnaire unique ou aux actionnaires lorsque les capitaux propres sont ou deviendraient à la suite de celle-ci, inférieurs au montant du capital augmenté des réserves que la loi ou les statuts ne permettent pas de distribuer. L'écart de réévaluation n'est pas distribuable. Il peut être incorporé en tout ou partie au capital.
    </p>
    <p>
      Les pertes, s'il en existe, sont après l'approbation des comptes par l'actionnaire unique ou la collectivité des actionnaires, reportées à nouveau, pour être imputées sur les bénéfices des exercices ultérieurs jusqu'à extinction.
    </p>

    <h2>Article 22- Paiement des dividendes – Acomptes</h2>

    <p>
      Les modalités de mise en paiement des dividendes en numéraire sont fixées par l'actionnaire unique ou la collectivité des actionnaires. La mise en paiement des dividendes en numéraire doit avoir lieu dans un délai maximal de neuf mois après la clôture de l'exercice, sauf prolongation de ce délai par autorisation de justice.
    </p>
    <p>
      Lorsqu'un bilan établi au cours ou à la fin de l'exercice et certifié par un Commissaire aux Comptes fait apparaître que la Société, depuis la clôture de l'exercice précédent, après constitution des amortissements et provisions nécessaires et déduction faite s'il y a lieu des pertes antérieures ainsi que des sommes à porter en réserve, en application de la loi ou des statuts, a réalisé un bénéfice, il peut être distribué sur décision du Président des acomptes sur dividende avant l'approbation des comptes de l'exercice. Le montant de ces acomptes ne peut excéder le montant du bénéfice ainsi défini.
    </p>
    <p>
      Aucune répétition de dividende ne peut être exigée de l'actionnaire unique ou des actionnaires, sauf lorsque la distribution a été effectuée en violation des dispositions légales et que la Société établit que le bénéficiaire avait connaissance du caractère irrégulier de cette distribution au moment de celle-ci ou ne pouvait l'ignorer compte tenu des circonstances. Le cas échéant, l'action en répétition est prescrite trois ans après la mise en paiement de ces dividendes.
    </p>
    <p>
      Les dividendes non réclamés dans les cinq ans de leur mise en paiement sont prescrits.
    </p>

    <h1>Capitaux propres inférieurs à la moitié du capital – Transformation – Dissolution – Liquidation</h1>

    <h2>Article 23 – Capitaux propres inférieurs à la moitié du capital social</h2>

    <p>
      Si, du fait des pertes constatées dans les documents comptables, les capitaux propres de la Société deviennent inférieurs à la moitié du capital social, le Président doit, dans les quatre mois qui suivent l'approbation des comptes ayant fait apparaître ces pertes, consulter l'actionnaire unique ou la collectivité des actionnaires, à l'effet de décider s'il y a lieu à dissolution anticipée de la Société.
    </p>
    <p>
      Si la dissolution n'est pas prononcée, le capital doit être, dans le délai fixé par la loi, réduit d'un montant égal à celui des pertes qui n'ont pu être imputées sur les réserves si, dans ce délai, les capitaux propres n'ont pas été reconstitués à concurrence d'une valeur au moins égale à la moitié du capital social.
    </p>
    <p>
      Dans tous les cas, la décision de l'actionnaire unique ou de la collectivité des actionnaires doit être publiée dans les conditions légales et réglementaires.
    </p>
    <p>
      En cas d'inobservation de ces prescriptions, tout intéressé peut demander en justice la dissolution de la Société. Toutefois, le tribunal ne peut prononcer la dissolution si, au jour où il statue sur le fond, la régularisation a eu lieu.
    </p>

    <h2>Article 24 – Transformation de la société</h2>

    <p>La Société peut se transformer en société d'une autre forme sur décision de l'actionnaire unique ou de la collectivité des actionnaires à la condition que la Société remplisse les conditions propres à la nouvelle forme de société.</p>

    <h2>Article 25 – Dissolution – Liquidation</h2>

    <p>
      La Société est dissoute dans les cas prévus par la loi et, sauf prorogation, à l'expiration du terme fixé par les statuts ou par décision de l'actionnaire unique ou de la collectivité des actionnaires.
    </p>
    <p>
      Un ou plusieurs liquidateurs sont alors nommés par l'actionnaire unique ou par la collectivité des actionnaires.
    </p>
    <p>
      Le liquidateur représente la Société. Il est investi des pouvoirs les plus étendus pour réaliser l'actif, même à l'amiable. Il est habilité à payer les créanciers et à répartir le solde disponible.
    </p>
    <p>
      L'associée unique ou la collectivité des actionnaires peut l'autoriser à continuer les affaires en cours ou à en engager de nouvelles pour les besoins de la liquidation.
    </p>
    <p>
      L'actif net subsistant après remboursement du nominal des actions est partagé également entre toutes les actions.
    </p>
    <p>
      En cas de réunion de toutes les actions en une seule main, la dissolution de la Société entraîne, lorsque l'actionnaire unique est une personne morale, la transmission universelle du patrimoine de la Société entre les mains de l'actionnaire unique, sans qu'il y ait lieu à liquidation, conformément aux dispositions de l'article 1844-5 du Code civil.
    </p>

    <h1>Contestation</h1>

    <h2>Article 26 – Contestations</h2>

    <p>Toutes les contestations qui pourraient s'élever pendant la durée de la Société ou lors de sa liquidation entre les actionnaires ou entre un actionnaire et la Société ou les dirigeants concernant les affaires sociales, l'interprétation ou l'exécution des présents statuts, seront jugées conformément à la loi et soumises à la juridiction des tribunaux compétents.</p>

    <h1>Constitution de la société</h1>

    <h2>Article 28 – Engagements pour le compte de la société en formation</h2>

    <p>
      Conformément à la loi, la Société ne jouira de la personnalité morale qu'à compter du jour de son immatriculation au Registre du commerce et des sociétés.
    </p>
    <p>
      <people :people="submission.actionnaireUnique" />, actionnaire unique, a établi un état des actes accomplis au nom de la Société en formation, avec l'indication pour chacun d'eux de l'engagement qui en résulte pour la Société. Cet état est annexé aux présents statuts.
    </p>
    <p>
      La signature des présents statuts emportera reprise de ces engagements par la Société, lorsque celle-ci aura été immatriculée au Registre du commerce et des sociétés.
    </p>

    <h2>Article 29 – Formalités de publicité – Pouvoirs</h2>

    <p>
      Tous pouvoirs sont conférés au porteur d'un original ou d'une copie certifiée conforme des présentes à l'effet d'accomplir l'ensemble des formalités de publicité, de dépôt et autres pour parvenir à l'immatriculation de la Société au Registre du commerce et des sociétés.
    </p>

    <br />
    <br />
    <div style="display: flex; justify-content: space-between">
      <div></div>
      <div>
        <fait-le :submission="submission"></fait-le>
        <span>En 4 exemplaires originaux</span>
      </div>
    </div>

    <div style="page-break-before: always;"></div>
  </div>
</template>

<script>
import People from "../people";
import Siege from "../siege";
import FaitLe from "../faitLe";
export default {
  components: {FaitLe, Siege, People},
  props: {
    submission: null
  },
  methods: {
    montantApports() {
      let montant = 0

      for (const apport of this.submission.actionnaireUnique.apports) {
        montant = montant + parseFloat(apport.valorisation)
      }

      return montant
    }
  }
}
</script>
