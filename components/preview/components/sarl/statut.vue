<template>
  <div>
    <div class="header">
      <div>
        <strong><i>« {{ submission.raisonSociale }} »</i></strong><br />
        <strong>Société à responsabilité limitée</strong><br />
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
        LES SOUSSIGNÉS,
      </strong>
    </p>

    <div v-for="actionnaire in submission.actionnaires" v-if="actionnaire.email">
      <p>
        <people :people="actionnaire" />
      </p>

      <div v-if="actionnaire.regimeMatrimonial">
        <p v-if="actionnaire.regimeMatrimonial.value === 'célibataire'">
          Célibataire, non signataire d’un pacte civil de solidarité ;
        </p>

        <p v-if="actionnaire.regimeMatrimonial.value === 'pacsé'">
          Partenaire d’un pacte civil de solidarité ;
        </p>

        <p v-if="actionnaire.regimeMatrimonial.value === 'marie_communaute'">
          Marié(e) sous le régime de la communauté légale à défaut de contrat de mariage préalable à leur union ;
        </p>

        <p v-if="actionnaire.regimeMatrimonial.value === 'marie_separation'">
          Marié(e) sous le régime de la séparation aux termes d’un contrat de mariage préalable à leur union ;
        </p>
      </div>
    </div>

    <p>
      Ont établi ainsi qu'il suit les statuts d'une société à responsabilité limitée qu'ils sont convenus de constituer entre eux et avec toute autre personne qui viendrait ultérieurement à acquérir la qualité d'associé.
    </p>

    <div style="page-break-before: always;"></div>

    <h2>Article 1 – Forme</h2>

    <p>
      Il est formé, entre les propriétaires des parts ci-après créées et de celles qui pourraient l'être ultérieurement, une société à responsabilité limitée régie par les lois et règlements en vigueur, notamment par les dispositions du Livre II du Code de Commerce ainsi que par les présents statuts.
    </p>

    <h2>Article 2 – Dénomination</h2>

    <p>
      La dénomination de la Société est :	{{ submission.raisonSociale }}
    </p>
    <p>Dans tous les actes et documents émanant de la Société et destinés aux tiers, la dénomination doit être précédée ou suivie immédiatement des mots "société à responsabilité limitée" ou des initiales "SARL" et de l’énonciation du capital social.</p>

    <p>En outre, la Société doit indiquer en tête de ses factures, notes de commandes, tarifs et documents publicitaires, ainsi que sur toutes correspondances et récépissés concernant son activité et signés par elle ou en son nom, le siège du tribunal au greffe duquel elle est immatriculée au Registre du commerce et des sociétés, et le numéro d'immatriculation qu'elle a reçu.</p>


    <h2>Article 3 – Objet</h2>

    <p>La Société a pour objet :</p>
    <p style="white-space: pre-line">
      {{ submission.secteurActivite.Description }}
    </p>

    <p>
      Et généralement, toutes opérations industrielles, commerciales, financières, civiles, mobilières ou immobilières, pouvant se rattacher directement ou indirectement à l'objet social ou à tout objet similaire ou connexe
    </p>

    <h2>Article 4 – Siège social</h2>

    Le siège social est fixé : <siege :submission="submission"></siege>

    <p>Le transfert du siège social est décidé par un ou plusieurs associés représentant plus de la moitié des parts sociales. Le siège social peut cependant être transféré en tout endroit du territoire français par une simple décision de la gérance, sous réserve de ratification par la prochaine décision d'un ou plusieurs associés représentant plus de la moitié des parts sociales.</p>

    <h2>Article 5 – Durée</h2>

    <p>La durée de la Société est fixée à 99  années à compter de la date de son immatriculation au Registre du commerce et des sociétés, sauf dissolution anticipée ou prorogation.</p>


    <h2>Article 6 – Apports</h2>

    <p>Le capital social est constitué par les apports suivants :</p>

    <p class="underline">Apports en numéraire</p>

    <p>
      Il est apporté en numéraire :
    </p>

    <p v-for="actionnaire in submission.actionnaires" v-if="actionnaire.capital">
      - par <people :people="actionnaire" :short="true" />, la somme de {{ actionnaire.capital|currency }}
    </p>


    <div v-if="submission.verseCreation.value === 1">
      <p>
        Soit au total la somme de {{ submission|capitalNumeraire|numberToLetter }} euros ({{ submission|capitalNumeraire|currency }}) déposée intégralement à un compte ouvert au nom de la société en formation à la banque [Dénomination, nom de l'agence et adresse de la banque dépositaire des fonds] ainsi qu'en atteste un certificat de ladite banque.
      </p>

      <p>
        Elle sera retirée par la Gérance sur présentation du certificat du Greffe du Tribunal de commerce attestant l'immatriculation de la Société au Registre du Commerce et des Sociétés.
      </p>
    </div>

    <div v-else>
      <p>
        La partie libérée de ces apports en numéraire, soit la somme de {{ submission|capitalNumeraire|numberToLetter }}
        euros ({{ submission|capitalNumeraire|currency }}) a été dès avant ce jour, déposée à xxxxx à un compte ouvert au nom de la société en formation.
      </p>
      <p>
        Elle sera retirée par la Gérance sur présentation du certificat du Greffe du Tribunal de commerce attestant l'immatriculation de la Société au Registre du Commerce et des Sociétés.
      </p>

      <p>
        La libération du solde interviendra en une ou plusieurs fois sur décision de la gérance dans un délai qui ne peut excéder cinq ans à compter de l'immatriculation de la Société au Registre du commerce et des sociétés.
      </p>
    </div>







    <div v-if="montantApports() > 0">
      <p class="underline">Apports en nature</p>


      <div v-for="actionnaire in submission.actionnaires" v-if="actionnaire.apports">
        <p>
          <people :people="actionnaire" :short="true"/> apporte à la Société, sous les garanties ordinaires et de droit :
        </p>
        <p v-for="apport in actionnaire.apports">- {{ apport.description }} d'une valeur de {{ apport.valorisation|currency }}</p>

        <p>
          En rémunération de cet apport évalué à {{ actionnaireMontantApport(actionnaire)|currency }},
          il est attribué à <people :people="actionnaire" :short="true"/>,
          {{ actionnaireMontantApport(actionnaire) }} parts sociales d'une valeur nominale de un (1) euros chacune,
          entièrement libérées.
        </p>
      </div>

      <p>
        Cette estimation a été effectuée sans l'intervention d'un Commissaire aux Apports,
        compte tenu de ce que la valeur d'aucun apport en nature n'excède 30 000 euros et
        que la valeur totale de l'ensemble des apports non soumis à l'évaluation d'un Commissaire
        aux Apports n'excède pas la moitié du capital social.
      </p>

    </div>


    <p class="underline">Récapitulation des apports</p>

    <p>Les apports effectués à la Société s'élèvent à :</p>

    <p>
      • apports en numéraire :
    </p>

    <p>
      {{ submission|capitalNumeraire|numberToLetter }} Euros,<br />
      Ci {{ submission|capitalNumeraire|currency }}
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

    <p>correspondant au montant du capital social.</p>

    <div v-if="actionnairesMarieCommunaute.length === 0">
      <p>
        <u><i>Dispositions communes :  associé non marié sous le régime de la communauté</i></u>
      </p>
      <p>
        Aucun associé n'étant marié sous un régime de communauté de biens, les dispositions de l'article 1832-2 du Code civil ne sont pas applicables.
      </p>
    </div>

    <div v-if="actionnairesMarieCommunaute.length >= 1">
      <p>
        <u><i>Conformément aux dispositions de l'article 1832-2 du Code civil</i></u>
      </p>

      <p>Liste des conjoints des associés apporteurs mariés sous le régime de la communauté légale (application de l'article 1832-2 du Code civil)</p>

      <p v-for="actionnaire in actionnairesMarieCommunaute">
        {{ actionnaire.conjoint }}, conjoint commun en biens de <people :people="actionnaire" :short="true" />, apporteur de deniers provenant de la communauté, soussigné,
        a été averti, par lettre recommandée avec demande d'avis de réception, de l'apport envisagé et de la
        faculté de revendiquer la qualité d'associé pour la moitié des parts souscrites par son conjoint.
      </p>

      <p>
        <u><i>Dispositions pour les apporteurs mariés sous le régime de la communauté des biens.</i></u>
      </p>

      <p v-for="actionnaire in actionnairesMarieCommunaute">
        <people :people="actionnaire" :short="true" /> déclare expressément que son apport est fait de deniers propres non indivis ou provenus de
        l'aliénation d'un propre non indivis, et pour lui tenir lieu d'emploi ou de remploi,
        au sens de l'article 1434 du Code civil, les parts sociales qui lui sont attribuées
        en rémunération de son apport étant ainsi sa propriété exclusive.
      </p>
    </div>

    <h2>Article 7 – Capital social </h2>

    <div v-if="submission.verseCreation.value === 1">
      <p>
        Il est divisé en {{ submission|capital }} parts sociales de 1 euros chacune, numérotées de 1 à
        {{ submission|capital }}, entièrement souscrites et libérées dans les conditions exposées ci-dessus,
        et attribuées aux associés en proportion de leurs apports respectifs, savoir :
      </p>

      <p v-for="actionnariat in capitalSocial" v-if="actionnariat.actionnaire.capital">
        à <people :people="actionnariat.actionnaire" :short="true"/>,<br />
        {{ actionnariat.capital|numberToLetter }} parts sociales en pleine propriété,
        numérotées {{ actionnariat.startNumAction }} à {{ actionnariat.endNumAction }}, ci 	{{ actionnariat.capital }} parts
      </p>

      <div style="display: flex;justify-content: space-between">
        <p>Total égal au nombre de parts composant le capital social :</p>
        <p>{{ submission|capital }} parts</p>
      </div>

      <p>Les soussignés déclarent que toutes les parts sociales représentant le capital social leur appartiennent, sont réparties entre eux dans les proportions indiquées ci-dessus correspondant à leurs apports respectifs et qu'elles sont toutes souscrites et libérées comme indiqué ci-dessus.</p>
    </div>

    <div v-else>
      <p>
        Le capital social est fixé à {{ submission|capital|numberToLetter }} euros ({{ submission|capital|currency }}).
      </p>

      <p>
        Il est divisé en {{ submission|capital }} parts sociales de 1 euros chacune, numérotées de 1 à
        {{ submission|capital }}, correspondant à des apports en numéraire de xxxx à xxxx libérée de
        {{ submission.verseCreation.label }} de leur valeur nominale  et attribuées aux associés en proportion de
        leurs apports respectifs, savoir :
      </p>

      <p v-for="actionnariat in capitalSocial" v-if="actionnariat.actionnaire.capital">
        à <people :people="actionnariat.actionnaire" :short="true"/>,<br />
        {{ actionnariat.capital|numberToLetter }} parts sociales en pleine propriété,
        numérotées {{ actionnariat.startNumAction }} à {{ actionnariat.endNumAction }}, ci 	{{ actionnariat.capital }} parts
      </p>

      <div style="display: flex;justify-content: space-between">
        <p>Total égal au nombre de parts composant le capital social :</p>
        <p>{{ submission|capital }} parts</p>
      </div>

      <p>Les soussignés déclarent que toutes les parts représentant le capital social leur appartiennent, sont réparties entre eux dans les proportions indiquées ci-dessus correspondant à leurs apports respectifs et sont libérées comme indiqué ci-dessus.</p>
    </div>

    <h2>Article 8 – Comptes courants</h2>

    <p>
      Outre leurs apports, les associés pourront verser ou laisser à disposition de la Société toutes sommes dont elle pourrait avoir besoin. Ces sommes sont inscrites au crédit d'un compte ouvert au nom de l'associé.
      Les comptes courants ne doivent jamais être débiteurs et la Société a la faculté d'en rembourser tout ou partie, après avis donné par écrit un mois à l'avance, sauf stipulation contraire.
    </p>


    <h2>Article 9 – Modifications du capital social</h2>

    <h3>1. Augmentation du capital social</h3>

    <h4>1.1. - Dispositions générales</h4>

    <p>
      Le capital social peut être augmenté, soit par création de parts nouvelles,
      soit par majoration du montant nominal des parts existantes, en vertu d'une
      décision collective extraordinaire des associés.
    </p>
    <p>
      Le capital social peut être augmenté en une ou plusieurs fois au moyen
      d'apports en numéraire par versement d'espèces ou par compensation avec des
      créances liquides et exigibles sur la Société, ou en nature ou encore par
      capitalisation de tout ou partie des primes, bénéfices et réserves de la
      société. Aucune augmentation de capital en numéraire ne peut être réalisée
      tant que le capital n'est pas entièrement libéré.
    </p>
    <p>
      Les augmentations de capital et les modalités de leur réalisation sont
      décidées par les associés à la majorité des deux tiers des parts détenues
      par les associés présents ou représentés, à l'exception des augmentations
      de capital par voie d'incorporation de réserves, de bénéfices ou de primes
      qui sont décidées par les associés représentant la moitié des parts
      sociales et les augmentations de capital en numéraire par élévation de la
      valeur des parts qui sont décidées par l'unanimité des associés.
    </p>
    <p>
      La décision collective portant augmentation du capital peut prévoir que
      celle-ci sera réalisée par la création de parts nouvelles assorties d'une
      prime d'émission ou d'apport dont elle détermine le montant et
      l'affectation.
    </p>
    <p>
      En cas de souscription de parts sociales au moyen de biens ou de fonds
      communs, la qualité d'associé est reconnue à celui des époux qui souscrit.
    </p>
    <p>
      Dès lors que le conjoint du souscripteur aura notifié à la Société son
      intention d'être personnellement associé, cette qualité lui sera également
      reconnue pour la moitié des parts souscrites. Si cette notification a lieu
      lors de la souscription à l'augmentation de capital, l'agrément de
      l'associé vaut pour les deux époux. Si cette notification est postérieure à
      la souscription à l'augmentation de capital, l'agrément du conjoint par les
      autres associés est soumis aux dispositions de l'article "Cession -
      transmission - location des parts sociales". L'époux associé ne participe
      alors pas au vote et ses parts ne sont pas prises en compte pour le calcul
      de la majorité. Si le conjoint n'est pas agréé, l'époux demeure associé
      pour la totalité des parts souscrites.
    </p>
    <p>
      Par décision prise en vertu d'une décision collective extraordinaire des
      associés, de nouvelles parts d'industrie peuvent être créées au cours de la
      vie sociale en vue de leur attribution gratuite à un ou plusieurs nouveaux
      associés afin de rémunérer leurs connaissances techniques et
      professionnelles, leur travail et leur savoir-faire.
    </p>

    <h4>1.2. - Augmentation de capital en numéraire </h4>

    <p>
      En cas d'augmentation du capital en numéraire, l'assemblée qui décide d'une
      telle opération peut instituer pour sa réalisation un droit préférentiel de
      souscription réservé aux associés existants. Elle en détermine les
      modalités d'exercice.
    </p>
    <p>
      En tout état de cause, les parts nouvelles ne peuvent être attribuées
      qu'aux associés ou aux personnes agréées aux conditions fixées à l'article
      "Cession - transmission - location des parts sociales".
    </p>
    <p>
      Les parts nouvelles doivent être libérées, lors de la souscription, d'un
      quart au moins de leur valeur nominale. La libération du surplus doit
      intervenir, en une ou plusieurs fois, dans le délai de cinq ans à compter
      du jour où l'augmentation du capital est devenue définitive.
    </p>
    <p>
      Les fonds affectés à la libération des parts doivent être déposés dans les
      huit jours de leur réception à la Caisse des dépôts et consignations, chez
      un notaire ou dans une banque. Le retrait de ces fonds ne peut être opéré
      par le mandataire de la Société que postérieurement à l'assemblée générale
      constatant la réalisation de l'augmentation du capital et qu'après
      l'établissement du certificat du dépositaire. Mention de la libération des
      parts et du dépôt des fonds doit être portée dans les statuts.
    </p>
    <p>
      Si l'augmentation de capital n'est pas réalisée dans le délai de six mois à
      compter du premier dépôt de fonds, les souscripteurs peuvent, soit
      individuellement, soit par mandataire les représentant collectivement,
      demander au Président du Tribunal de commerce du lieu du siège social,
      statuant sur requête, l'autorisation de retirer le montant de leurs
      souscriptions.
    </p>

    <h4>1.3. - Augmentation de capital par apport en nature</h4>

    <p>
      Si l'augmentation de capital est réalisée, soit en totalité, soit en
      partie, par des apports en nature, la décision des associés relative à
      l'augmentation de capital doit contenir l'évaluation de chaque apport en
      nature, au vu d'un rapport annexé à cette décision et établi sous sa
      responsabilité par un Commissaire aux apports, désigné à l'unanimité des
      associés ou, à défaut, par ordonnance du Président du Tribunal de commerce
      statuant sur requête d'un associé ou de la gérance.
    </p>
    <p>
      Toutefois, les associés peuvent décider à l'unanimité que le recours à un
      commissaire aux apports ne sera pas obligatoire, lorsque la valeur d'aucun
      apport en nature n'excède 30 000 euros et si la valeur totale de l'ensemble
      des apports en nature non soumis à l'évaluation d'un commissaire aux
      apports n'excède pas la moitié du capital.
    </p>

    <h3>2. Réduction du capital social</h3>

    <p>
      Le capital social peut également être réduit, en vertu d'une décision
      collective extraordinaire des associés représentant au moins les deux tiers
      des parts sociales pour quelque cause et de quelque manière que ce soit,
      notamment par voie de remboursement ou de rachat des parts, par réduction
      de leur nombre ou de leur valeur nominale.
    </p>
    <p>
      En aucun cas, la réduction du capital ne peut porter atteinte à l'égalité
      des associés. Si la Société est pourvue d'un (de) Commissaire(s) aux
      Comptes, le projet de réduction du capital lui (leur) est communiqué
      quarante-cinq jours au moins avant la date de la décision des associés
      appelés à statuer sur ce projet. Il(s) fait (font) connaître aux associés
      son (leur) appréciation sur les causes et conditions de la réduction.
    </p>
    <p>
      En cas de décision de réduction du capital non motivée par des pertes, les
      créanciers de la société dont la créance est antérieure à la date de dépôt
      au greffe du Tribunal de commerce du procès-verbal constatant cette
      décision, peuvent former opposition à la réduction dans le délai d'un mois
      à compter de la date du dépôt. L'opposition est signifiée à la Société par
      acte d'huissier et portée devant le Tribunal de commerce. Une décision de
      justice rejette l'opposition ou ordonne, soit le remboursement des
      créances, soit la constitution de garanties si la Société en offre et si
      elles sont jugées suffisantes. Les opérations de réduction ne peuvent
      commencer pendant le délai d'opposition.
    </p>
    <p>
      Lorsque par la décision de réduction du capital non motivée par des pertes,
      la gérance a été autorisée à acheter un nombre déterminé de parts sociales
      pour les annuler, cette acquisition doit être réalisée dans le délai de
      trois mois à compter de l'expiration du délai d'opposition ci-dessus
      précisé en faveur des créanciers. Cet achat emporte annulation desdites
      parts.
    </p>

    <h3>3. Rompus</h3>

    <p>
      Lors de toute augmentation ou réduction du capital social, les associés doivent, le cas échéant, faire leur affaire personnelle de toute acquisition ou cession de parts ou droits nécessaires pour supprimer les rompus et permettre ainsi l'attribution ou l'échange au profit de chacun d'eux d'un nombre entier de parts nouvelles.
    </p>


    <h2>Article 10 – Émission d’obligations</h2>

    <p>
      Si la Société a désigné un Commissaire aux Comptes et que les comptes des
      trois derniers exercices de douze mois ont été régulièrement approuvés par
      les associés, elle peut, conformément à l'article L. 223-11 du Code de
      commerce, émettre des obligations nominatives à condition de ne pas
      procéder à une offre au public de ces obligations. Ce sont des titres
      négociables qui, dans une même émission, confèrent les mêmes droits de
      créance pour une même valeur nominale.
    </p>
    <p>
      L'émission d'obligations nominatives est décidée par l'assemblée générale
      des associés, dans les conditions de majorité requises pour les décisions
      extraordinaires.
    </p>
    <p>
      Lors de chaque émission d'obligations, la Société doit mettre à la
      disposition des souscripteurs une notice relative aux conditions de
      l'émission et un document d'information, conformes aux dispositions des
      articles R. 223-7 et R. 223-9 du Code de commerce.
    </p>
    <p>
      Le prix d'émission est payable en totalité à la souscription, en numéraire
      ou par compensation avec des créances liquides et exigibles sur la Société,
      dans les conditions déterminées par l'assemblée générale des associés.
    </p>
    <p>
      Les droits des titulaires sont représentés par une inscription en compte
      dans les registres de la Société. La Société tient à jour la liste des
      personnes titulaires d'obligations nominatives, avec l'indication du
      domicile déclaré par chacune d'elles.
    </p>
    <p>
      Les obligataires sont groupés, dans les conditions fixées par la loi, en
      une masse jouissant de la personnalité morale. A l'issue de la
      souscription, ils se réuniront en assemblée générale distincte de celle des
      associés de la Société, à la diligence de la gérance, aux fins de désigner,
      dans le respect des règles fixées par les articles L. 228-48 et L. 228-49
      du Code de commerce, leurs représentants qui ne pourront en aucun cas
      excéder trois. En cas d'urgence, les représentants de la masse peuvent être
      désignés par décision de justice à la demande de tout intéressé.
    </p>

    <h2>Article 11 – Souscription, libération et représentation des parts sociales</h2>

    <p>
      1°) Les parts sociales sont souscrites en totalité par les associés. Elles
      sont intégralement libérées lorsqu'elles représentent des apports en
      nature. Les parts représentant des apports en numéraire sont libérées d'au
      moins un cinquième de leur montant. La libération du surplus intervient en
      une ou plusieurs fois sur décision de la gérance, dans un délai qui ne peut
      excéder cinq ans à compter de l'immatriculation de la société au Registre
      du commerce et des sociétés.
    </p>
    <p>
      La Société peut émettre des parts sociales en rémunération d'apports en
      industrie. Ces parts sont émises sans valeur nominale et ne sont pas prises
      en compte pour la formation du capital social. Elles sont attribuées à
      titre personnel et ne peuvent être cédées. En cas de décès de leur
      titulaire ou en cas de cessation par celui-ci de ses prestations, elles
      sont annulées.
    </p>
    <p>
      En cas d'augmentation de capital, le capital social doit être intégralement
      libéré avant toute souscription de nouvelles parts sociales à libérer en
      numéraire, à peine de nullité de l'opération. Les parts représentatives
      d'apports en numéraire doivent être libérées, lors de la souscription, d'un
      quart au moins de leur valeur nominale. La libération du surplus doit
      intervenir, en une ou plusieurs fois, dans le délai de cinq ans à compter
      du jour où l'augmentation du capital est devenue définitive.
    </p>
    <p>
      2°) Les parts sociales ne peuvent jamais être représentées par des titres
      négociables.
    </p>
    <p>
      La propriété des parts résulte seulement des présents statuts, des actes
      ultérieurs qui pourraient modifier le capital social et des cessions et
      attributions qui seraient régulièrement réalisées.
    </p>
    <p>
      Tout défaut de paiement des sommes dues sur le montant non libéré des parts
      sociales entraîne de plein droit et sans qu'il soit besoin de procéder à
      une formalité quelconque, le paiement d'un intérêt au taux légal à partir
      de la date d'exigibilité, sans préjudice des mesures d'exécution forcée
      prévues par la loi.
    </p>
    <p>
      En outre, lorsqu'il n'a pas été procédé dans le délai légal aux appels de
      fonds pour réaliser la libération intégrale du capital, tout intéressé peut
      demander au président du tribunal statuant en référé, soit d'enjoindre sous
      astreinte à la gérance de procéder à des appels de fonds, soit de désigner
      un mandataire chargé de procéder à cette formalité.
    </p>
    <h2>Article 12 – Droits et obligations attachés aux parts sociales</h2>
    <p>
      Chaque part sociale confère à son propriétaire un droit égal dans les
      bénéfices de la Société, dans la propriété de l'actif social et dans le
      boni de liquidation. Elle donne également droit à une voix dans tous les
      votes et délibérations.
    </p>
    <p>
      Les associés ne supportent les pertes que jusqu'à concurrence de leurs
      apports ; au-delà, tout appel de fonds est interdit.
    </p>
    <p>
      Toutefois, les associés sont solidairement responsables pendant cinq ans, à
      l'égard des tiers, de la valeur attribuée aux apports en nature lors de la
      constitution de la Société, lorsqu'il n'y a pas eu de Commissaire aux
      Apports ou lorsque la valeur retenue pour lesdits apports est différente de
      celle proposée par le Commissaire aux Apports.
    </p>
    <p>
      En cas d'augmentation du capital, les Gérants et les souscripteurs sont
      solidairement responsables, pendant cinq ans, à l'égard des tiers, de la
      valeur attribuée aux apports en nature, lorsque la valeur retenue est
      différente de celle proposée par le Commissaire aux Apports.
    </p>
    <p>
      La propriété d'une part emporte de plein droit adhésion aux statuts et aux
      résolutions régulièrement prises par les associés.
    </p>
    <p>
      Les héritiers, créanciers, représentants d'un associé ne peuvent, sous
      aucun prétexte que ce soit, requérir l'apposition des scellés sur les biens
      et documents de la Société, ni s'immiscer en aucune manière dans les actes
      de son administration.
    </p>
    <p>
      Ils doivent pour l'exercice de leurs droits, s'en rapporter aux inventaires
      sociaux et aux décisions collectives des associés.
    </p>
    <p>
      Lorsqu'une part est grevée d'usufruit, les droits du nu-propriétaire et de
      l'usufruitier sont, sauf convention contraire des parties, répartis de la
      manière suivante :
    </p>
    <p>
      - les dividendes et le report à nouveau reviennent à l'usufruitier ;
    </p>
    <p>
      - le nu-propriétaire a droit aux réserves mais en cas de distribution de
      ces réserves, l'usufruitier a un droit de jouissance sur les sommes
      distribuées, sous la forme d'un quasi-usufruit, à charge pour lui de les
      restituer en fin d'usufruit ;
    </p>
    <p>
      - lors du partage, le boni de liquidation et le remboursement des apports
      reviennent au nu-propriétaire mais restent soumis à l'usufruit,
      l'usufruitier pouvant disposer librement des sommes correspondantes, à
      charge pour lui de les restituer en fin d'usufruit (C. civ., art. 587,
      quasi-usufruit).
    </p>
    <h2>Article 13 – Indivisibilité des parts sociales</h2>
    <p>
        Les parts sociales sont indivisibles à l'égard de la Société qui ne
        reconnaît qu'un seul propriétaire pour chaque part.
    </p>
    <p>
      Les copropriétaires indivis sont tenus de désigner l'un d'entre eux pour
      les représenter auprès de la Société ; à défaut d'entente, il appartient à
      l'indivisaire le plus diligent de faire désigner par voie de justice un
      mandataire chargé de les représenter, conformément aux dispositions de
      l'article 1844 du Code civil.
    </p>
    <p>
      Si une part est grevée d'un usufruit, le nu-propriétaire et l'usufruitier
      ont le droit de participer aux décisions collectives, quel que soit le
      titulaire du droit de vote. Ils doivent être convoqués à toutes les
      assemblées et disposent du même droit d'information.
    </p>
    <p>
      Le droit de vote appartient au nu-propriétaire, sauf pour les décisions
      concernant l'affectation des bénéfices, où il est réservé à l'usufruitier.
    </p>
    <p>
      Cependant, les associés peuvent convenir de toute autre répartition du
      droit de vote, sans toutefois pouvoir priver l'usufruitier de son droit à
      voter les décisions concernant l'affectation des bénéfices. La convention
      est notifiée par lettre recommandée à la Société, qui sera tenue
      d'appliquer cette convention pour toute assemblée qui se réunirait après
      l'expiration d'un délai d'un mois suivant l'envoi de cette lettre.
    </p>

    <h2>Article 14 – Cession -Transmission – location des parts sociales</h2>

    <p>
      1 - Cession entre vifs.
    </p>
    <p>
      Toute cession de parts doit être constatée par un acte notarié ou sous
      seing privé.
    </p>
    <p>
      Pour être opposable à la Société, elle doit lui être signifiée par exploit
      d'huissier ou être acceptée par elle dans un acte notarié. La signification
      peut être remplacée par le dépôt d'un original de l'acte de cession au
      siège social contre remise par le gérant d'une attestation de ce dépôt.
    </p>
    <p>
      Elle n'est opposable aux tiers qu'après accomplissement de ces formalités
      et, en outre, après publication des statuts modifiés au Registre du
      commerce et des sociétés ; ce dépôt peut être effectué par voie
      électronique.
    </p>
    <p>
      En l'absence de publication des statuts modifiés au Registre du commerce et
      des sociétés, le cédant ou le cessionnaire peut, après mise en demeure du
      gérant d'effectuer cette publication, restée vaine au terme d'un délai de
      huit jours, et en justifiant de la saisine du président du tribunal en
      application de l'article L. 123-5-1 ou de l'article L. 210-7 du Code de
      commerce, déposer contre récépissé l'acte de cession de parts sociales au
      Registre du commerce et des sociétés. A titre conservatoire et jusqu'à la
      décision du tribunal, ce dépôt rend la cession opposable aux tiers, sous
      réserve de l'accomplissement des formalités prévues au deuxième alinéa du
      présent article.
    </p>
    <p>
      Les parts ne peuvent être transmises, à quelque titre que ce soit, entre
      associés ou à des tiers étrangers à la Société, lorsque la Société comporte
      plus d'un associé, qu'avec le consentement de la majorité des associés
      représentant au moins la moitié des parts sociales, cette majorité étant,
      en outre, déterminée compte tenu de la personne et des parts de l'associé
      cédant.
    </p>
    <p>
      Lorsque la Société comporte plus d'un associé, le projet de cession est
      notifié à la Société et à chacun des associés par acte d'huissier ou par
      lettre recommandée avec demande d'avis de réception. Dans le délai de huit
      jours à compter de cette notification, la gérance doit convoquer
      l'assemblée des associés pour qu'elle délibère sur le projet de cession des
      parts sociales ou consulter les associés par écrit sur ledit projet.
    </p>
    <p>
      La décision de la Société, qui n'a pas à être motivée, est notifiée par la
      gérance au cédant par lettre recommandée avec demande d'avis de réception.
    </p>
    <p>
      Si la Société n'a pas fait connaître sa décision dans le délai de trois
      mois à compter de la dernière des notifications du projet de cession, le
      consentement à la cession est réputé acquis.
    </p>
    <p>
      Si la Société a refusé de consentir à la cession, les associés sont tenus,
      dans le délai de trois mois à compter du refus d'agrément, d'acquérir ou de
      faire acquérir les parts à un prix fixé d'un commun accord entre les
      parties ou en cas de contestation, à dire d'expert dans les conditions
      prévues à l'article 1843-4 du Code civil, les frais d'expertise étant à la
      charge de la Société.
    </p>
    <p>
      A la demande du gérant, ce délai de trois mois peut être prolongé par
      ordonnance du Président du Tribunal de commerce statuant sur requête, sans
      que cette prolongation puisse excéder six mois.
    </p>
    <p>
      En cas de désaccord sur le prix fixé par l'expert, le cédant peut renoncer
      à la cession de ses parts, dans les quinze jours de la notification dudit
      prix, par lettre recommandée avec demande d'avis de réception.
    </p>
    <p>
      La Société peut également, avec le consentement de l'associé cédant,
      décider, dans le même délai, de réduire son capital du montant de la valeur
      nominale des parts du cédant et de racheter les parts au prix déterminé
      dans les conditions prévues ci-dessus. Un délai de paiement, qui ne saurait
      excéder deux ans, peut, sur justification, être accordé à la Société par le
      Président du Tribunal de commerce, statuant par ordonnance de référé. Les
      sommes dues portent intérêt au taux légal en matière commerciale.
    </p>
    <p>
      Pour assurer l'exécution de l'une ou l'autre des solutions ci-dessus, la
      Gérance doit notamment solliciter l'accord du cédant sur un éventuel rachat
      par la Société, centraliser les demandes d'achat émanant des autres
      associés et les réduire éventuellement en proportion des droits de chacun
      d'eux dans le capital si leur total excède le nombre de parts cédées.
    </p>
    <p>
      Si, à l'expiration du délai imparti, aucune des solutions prévues n'est
      intervenue, l'associé peut réaliser la cession initialement projetée, si
      toutefois il détient ses parts depuis au moins deux ans ou en a reçu la
      propriété par succession, liquidation de communauté de biens entre époux ou
      donation de son conjoint, d'un ascendant ou descendant ; l'associé qui ne
      remplit aucune de ces conditions reste propriétaire de ses parts.
    </p>
    <p>
      Dans tous les cas où les parts sont acquises par les associés ou les tiers
      désignés par eux, notification est faite au cédant, par lettre recommandée
      avec demande d'avis de réception adressée huit jours à l'avance, de signer
      l'acte de cession.
    </p>
    <p>
      S'il refuse, la mutation est régularisée d'office par la Gérance ou le
      représentant de la Société spécialement habilité à cet effet, qui signera
      en ses lieu et place l'acte de cession.
    </p>
    <p>
      A cet acte qui relate la procédure suivie sont annexées toutes pièces
      justificatives.
    </p>
    <p>
      Lorsque le cessionnaire doit être agréé, la procédure ci-dessus s'applique
      même aux adjudications publiques volontaires ou forcées.
    </p>
    <p>
      L'adjudicataire doit en conséquence notifier le résultat de l'adjudication
      dans les conditions imparties, comme s'il s'agissait d'un projet de
      cession.
    </p>
    <p>
      Toutefois, si les parts sont vendues, selon les dispositions de l'article 2346 du Code civil,
      en exécution d'un nantissement ayant reçu le consentement de la Société, le cessionnaire se
      trouve de plein droit agréé comme nouvel associé, à moins que la Société ne
      préfère après la cession racheter sans délai les parts en vue de réduire
      son capital.
    </p>
    <p>
      La collectivité des associés doit être consultée par la Gérance dès
      réception de la notification adressée par le cessionnaire à la Société afin
      de statuer sur cette possibilité, le tout dans les formes, délais et
      conditions prévus pour toute décision extraordinaire emportant réduction du
      capital social.
    </p>
    <p>
      2 - Revendication par le conjoint de la qualité d'associé.
    </p>
    <p>
      En cas d'apport de biens ou de deniers communs, ou d'acquisition de parts
      sociales au moyen de deniers communs, le conjoint de l'apporteur ou de
      l'acquéreur peut notifier son intention de devenir personnellement associé
      pour la moitié des parts souscrites ou acquises. Si la notification
      intervient lors de l'apport ou de l'acquisition, l'acceptation ou
      l'agrément donné par les associés vaut pour les deux époux.
    </p>
    <p>
      Si la notification est postérieure à l'apport ou à l'acquisition, le
      conjoint de l'apporteur ou de l'acquéreur doit être agréé personnellement
      selon les conditions prévues ci-dessus pour les cessions de parts sociales.
    </p>
    <p>
      Lors de la délibération sur cet agrément, le conjoint associé ne prend pas
      part au vote et ses parts ne sont pas prises en compte pour le calcul de la
      majorité.
    </p>
    <p>
      En cas de refus d'agrément, notifié au conjoint dans les trois mois de sa
      demande, seul le conjoint souscripteur ou acquéreur demeure ou devient
      associé pour la totalité des parts souscrites ou acquises.
    </p>
    <p>
      L'absence de notification dans le délai de trois mois emporte agrément du
      conjoint.
    </p>
    <p>
      En vue de lui permettre d'exercer ses droits, le conjoint doit être averti
      du projet de souscription ou d'acquisition un mois au moins à l'avance par
      acte extrajudiciaire.
    </p>
    <p>
      Les notifications susvisées sont faites par lettre recommandée avec demande
      d'avis de réception.
    </p>
    <p>
      3 - Transmission par décès.
    </p>
    <p>
      En cas de décès d'un associé, la Société continue entre les associés
      survivants et les héritiers ou ayants droit de l'associé décédé, et
      éventuellement son conjoint survivant.
    </p>
    <p>
      Les parts sociales sont transmises librement par succession au profit du
      conjoint ou des héritiers de l'associé prédécédé comme au profit de toute
      personne ayant déjà la qualité d'associé.
    </p>
    <p>
      Dans les cas prévus ci-dessus, la valeur des droits sociaux est déterminée
      au jour du décès conformément à l'article 1843-4 du Code civil.
    </p>
    <p>
      Pour exercer les droits attachés aux parts sociales de l'associé décédé,
      les héritiers ou ayants droit, qu'ils soient ou non soumis à agrément,
      doivent justifier de leur état civil et de leurs qualités héréditaires
      auprès de la gérance qui peut toujours requérir de tout notaire la
      délivrance d'expéditions ou d'extraits de tous actes établissant lesdites
      qualités.
    </p>
    <p>
      4. Dissolution de communauté ou de Pacs du vivant de l'associé.
    </p>
    <p>
      En cas de liquidation de communauté légale ou conventionnelle de biens
      ayant existé entre un associé et son conjoint, l'attribution de parts
      communes au conjoint qui ne possédait pas la qualité d'associé est soumise
      à l'agrément de la majorité des associés représentant au moins la moitié
      des parts sociales, dans les mêmes conditions que celles prévues pour
      l'agrément d'un tiers non associé.
    </p>
    <p>
      En cas de dissolution d'un Pacs, la liquidation de parts indivises sera
      effectuée par application des dispositions des articles 515-6, alinéa 1 et
      831 du Code civil, avec possibilité d'attribution préférentielle des parts
      à l'autre partenaire par voie de partage, à charge de soulte s'il y a lieu.
    </p>
    <p>
      <u>5 - Location des parts sociales</u>
    </p>
    <p>
      La location des parts sociales est interdite.
    </p>
    <p>
      <u>6 - Nantissement des parts sociales</u>
    </p>
    <p>
      Le nantissement des parts sociales est interdit.
    </p>
    <h2>Article 16 – Décès, interdiction, faillite d’un associé</h2>
    <p>
      La Société n'est pas dissoute par le décès, l'interdiction de gérer, la
      liquidation judiciaire ou la faillite personnelle d'un associé.
    </p>
    <h2>Article 17 – Gérance</h2>
    <p>
      La Société est administrée par un ou plusieurs gérants, personnes
      physiques, associés ou non, avec ou sans limitation de la durée de leur
      mandat.
    </p>
    <p>
      Le ou les premiers gérants sont nommés par les associés dans un acte séparé
      aussitôt après la signature des statuts.
    </p>
    <p>
      Les gérants peuvent recevoir une rémunération, qui est fixée et peut être
      modifiée par une décision ordinaire des associés.
    </p>
    <p>
      Tout gérant a, par ailleurs, droit au remboursement de ses frais de
      déplacement et de représentation engagés dans l'intérêt de la Société, sur
      présentation de toutes pièces justificatives.
    </p>
    <p>
      Dans les rapports avec les tiers, les pouvoirs du ou des gérants sont les
      plus étendus pour agir en toute circonstance au nom de la Société, sous
      réserve des pouvoirs que la loi attribue expressément aux associés.
    </p>
    <p>
      La Société est engagée même par les actes du gérant qui ne relèvent pas de
      l'objet social, à moins qu'elle ne prouve que le tiers savait que l'acte
      dépassait cet objet ou qu'il ne pouvait l'ignorer compte tenu des
      circonstances, la seule publication des statuts ne suffisant pas à
      constituer cette preuve.
    </p>
    <p>
      L'opposition formée par un gérant aux actes d'un autre gérant est sans
      effet à l'égard des tiers, à moins qu'il ne soit établi que ces derniers en
      ont eu connaissance.
    </p>
    <p>
      Dans les rapports entre associés, le gérant ou chacun des gérants a tous
      les pouvoirs nécessaires pour faire, dans l'intérêt de la Société, tous
      actes de gestion, sauf le droit pour chacun des gérants, s'ils sont
      plusieurs, de s'opposer à toute opération avant qu'elle soit conclue.
    </p>
    <p>
      Le gérant est tenu de consacrer tout le temps et les soins nécessaires aux
      affaires sociales.
    </p>
    <p>
      Le gérant peut mettre les statuts de la Société en harmonie avec les
      dispositions impératives de la loi et des règlements, sous réserve de
      ratification par les associés statuant dans les conditions requises pour
      les décisions extraordinaires.
    </p>
    <p>
      Tout gérant, associé ou non, nommé dans les statuts ou en dehors d'eux, est
      révocable par décision des associés représentant plus de la moitié des
      parts sociales. Si cette majorité n'est pas obtenue, les associés sont,
      selon le cas, convoqués ou consultés une seconde fois, et les décisions
      sont prises à la majorité des votes émis, quel que soit le nombre des
      votants.
    </p>
    <p>
      Si la révocation est décidée sans juste motif, elle peut donner lieu à des
      dommages-intérêts. En outre, le gérant est révocable par décision du
      Tribunal de commerce pour cause légitime, à la demande de tout associé.
    </p>
    <p>
      Le gérant peut démissionner de ses fonctions à charge pour lui d'informer
      chacun des associés au moins trois mois à l'avance, par lettre recommandée
      avec demande d'avis de réception.
    </p>
    <p>
      Le décès ou le retrait du gérant n'entraîne pas la dissolution de la
      Société.
    </p>
    <p>
      Si, pour quelque cause que ce soit, la Société se trouve dépourvue de
      gérant et notamment en cas de décès, de démission, de révocation, ou en cas
      de placement sous tutelle du gérant unique, tout associé ou le Commissaire
      aux Comptes de la Société convoque l'assemblée des associés, à seule fin de
      procéder, le cas échéant, à la révocation du gérant unique et, dans tous
      les cas, à la désignation d'un ou de plusieurs gérants. L'assemblée sera
      convoquée dans les conditions de forme et de délai précisées par les
      dispositions réglementaires en vigueur. En cas de décès du gérant unique,
      le délai de convocation de l'assemblée générale est réduit de quinze à huit
      jours.
    </p>
    <p>
      En cas de cessation des fonctions du gérant pour quelque cause que ce soit,
      la mention de son nom dans les statuts peut être supprimée à la majorité
      simple des associés représentant plus de la moitié des parts sociales.
    </p>
    <p>
      Les gérants sont responsables, individuellement ou solidairement selon les
      cas, envers la Société ou envers les tiers, soit des infractions aux
      dispositions législatives ou réglementaires applicables aux sociétés à
      responsabilité limitée, soit des violations des statuts, soit des fautes
      commises dans leur gestion.
    </p>
    <p>
      Si plusieurs gérants ont coopéré aux mêmes faits, le tribunal détermine la
      part contributive de chacun d'eux dans la réparation du dommage.
    </p>
    <p>
      Aucune décision de l'Assemblée ne peut avoir pour effet d'éteindre une
      action en responsabilité contre les gérants pour fautes commises dans
      l'accomplissement de leur mandat.
    </p>
    <h2>Article 18 – Commissaires aux comptes</h2>
    <p>
      Les associés peuvent nommer par décision collective ordinaire un ou
      plusieurs Commissaires aux Comptes, en application des articles L. 223-35,
      L. 823-1 et suivants du Code de commerce.
    </p>
    <p>
      Cette nomination est obligatoire si la Société dépasse, à la clôture d'un
      exercice social, les seuils définis légalement et fixés par décret. Le
      Commissaire aux Comptes sera nommé pour un mandat de six exercices et
      exercera son mandat dans le cadre d'un audit légal classique.
    </p>
    <p>
      Si un ou plusieurs associés représentant au moins le tiers du capital en
      font la demande, la Société sera également tenue de désigner un Commissaire
      aux Comptes, pour un mandat de trois exercices et sera soumise à l'audit
      légal "petites entreprises".
    </p>
    <p>
      En outre, la nomination d'un Commissaire aux Comptes pourra être demandée
      en justice par un ou plusieurs associés représentant au moins le dixième du
      capital. La durée de son mandat sera de six exercices.
    </p>
    <p>
      Dans le cas où une telle nomination demeure facultative, la collectivité
      des associés disposera toujours de la faculté de désigner volontairement un
      Commissaire aux Comptes dans les conditions prévues à l'article L. 223-29
      du Code de commerce. La Société pourra limiter la durée du mandat à trois
      exercices et sera ainsi soumise à l'audit légal "petites entreprises".
    </p>
    <p>
      Lorsqu'un Commissaire aux Comptes ainsi désigné est une personne physique
      ou une société unipersonnelle, un Commissaire aux Comptes suppléant appelé
      à remplacer le ou les titulaires en cas de refus, d'empêchement, de
      démission ou de décès, est nommé en même temps que le titulaire pour la
      même durée.
    </p>
    <p>
      Les Commissaires aux Comptes exercent leur mission de contrôle,
      conformément aux dispositions législatives et réglementaires en vigueur.
      Ils ont notamment pour mission permanente de vérifier les valeurs et les
      documents comptables de la Société, de contrôler la régularité et la
      sincérité des comptes sociaux et d'en rendre compte à la Société. Ils ne
      doivent en aucun cas s'immiscer dans la gestion de la Société.
    </p>
    <p>
      Les Commissaires aux Comptes sont invités à participer à toute consultation
      de la collectivité des associés, conformément aux dispositions légales et
      réglementaires.
    </p>

    <h2>Article 19 – Conventions entre la société et ses associés ou gérants</h2>

    <p>
      La gérance ou le Commissaire aux Comptes, s'il en existe, présente à
      l'Assemblée ou joint aux documents communiqués aux associés en cas de
      consultation écrite, un rapport sur les conventions intervenues entre la
      Société et l'un de ses gérants ou associés.
    </p>
    <p>
      L'Assemblée statue sur ce rapport qui doit contenir les mentions suivantes
      :
    </p>
    <p>
      - l'énumération des conventions soumises à l'approbation de l'assemblée des
      associés ;
    </p>
    <p>
      - le nom des gérants ou associés intéressés ;
    </p>
    <p>
      - la nature et l'objet desdites conventions ;
    </p>
    <p>
      - les modalités essentielles de ces conventions, notamment l'indication des
      prix ou tarifs pratiqués, des ristournes et commissions consenties, des
      délais de paiement accordés, des intérêts stipulés, des sûretés conférées
      et, le cas échéant, toutes autres indications permettant aux associés
      d'apprécier l'intérêt qui s'attachait à la conclusion des conventions
      analysées ;
    </p>
    <p>
      - l'importance des fournitures livrées ou des prestations de services
      fournies, ainsi que le montant des sommes versées ou reçues au cours du
      dernier exercice.
    </p>
    <p>
      Le gérant ou l'associé intéressé ne peut pas prendre part au vote et ses
      parts ne sont pas prises en compte pour le calcul de la majorité.
    </p>
    <p>
      Toutefois, s'il n'existe pas de Commissaire aux Comptes, les conventions
      conclues par un gérant non associé sont soumises à l'approbation préalable
      de l'Assemblée.
    </p>
    <p>
      Les conventions non approuvées produisent néanmoins leurs effets, à charge
      pour le gérant, et s'il y a lieu, pour l'associé contractant, de supporter
      individuellement ou solidairement, selon les cas, les conséquences du
      contrat préjudiciables à la Société.
    </p>
    <p>
      Ces dispositions s'étendent aux conventions passées avec une société dont
      un associé indéfiniment responsable, gérant, administrateur, directeur
      général, membre du directoire ou du conseil de surveillance, est
      simultanément gérant ou associé de la société à responsabilité limitée.
    </p>
    <p>
      Ces dispositions ne sont pas applicables aux conventions portant sur des
      opérations courantes et conclues à des conditions normales.
    </p>
    <p>
      A peine de nullité du contrat, il est interdit aux gérants ou associés
      autres que les personnes morales de contracter sous quelque forme que ce
      soit, des emprunts auprès de la Société, de se faire consentir par elle un
      découvert, en compte courant ou autrement, ainsi que de faire cautionner ou
      avaliser par elle leurs engagements envers les tiers. Cette interdiction
      s'applique aux conjoint, ascendants et descendants des gérants ou associés
      ainsi qu'à toute personne interposée et aux représentants légaux des
      personnes morales associées.
    </p>

    <h2>Article 20 – Décisions collectives</h2>

    <p>
      La volonté des associés s'exprime par des décisions collectives qui,
      régulièrement prises, obligent tous les associés. Elles sont qualifiées
      d'extraordinaires quand elles entraînent une modification des statuts et
      d'ordinaires dans tous les autres cas.
    </p>
    <p>
      Ces décisions résultent, au choix de la gérance, d'une assemblée générale,
      d'une consultation écrite des associés ou du consentement de tous les
      associés exprimé dans un acte ; toutefois, la réunion d'une assemblée est
      obligatoire pour statuer sur l'approbation des comptes de chaque exercice
      ou la réduction du capital et pour toutes autres décisions si elle est
      demandée par un ou plusieurs associés détenant la moitié des parts sociales
      ou détenant, s'ils représentent au moins le dixième des associés, le
      dixième des parts sociales.
    </p>
    <p>
      Toutefois, une assemblée irrégulièrement convoquée ne peut être annulée si
      tous les associés étaient présents ou représentés.
    </p>
    <p>
      Les assemblées sont convoquées dans les conditions prévues par la loi et
      les règlements.
    </p>
    <p>
      Un associé peut se faire représenter par son conjoint, sauf si la Société
      ne comprend que les deux époux. Il peut aussi se faire représenter par un
      autre associé justifiant de son pouvoir, à condition que le nombre des
      associés soit supérieur à deux.
    </p>
    <p>
      <em>Choix possible : Tenue des assemblée en visio conférence</em>
    </p>
    <p>
      Les associés sont autorisés à participer aux assemblées générales par
      visioconférence ou par tous moyens de télécommunication permettant
      l'identification des participants et garantissant leur participation
      effective, conformément à la réglementation en vigueur.
    </p>
    <p>
      Conformément à la loi, cette disposition n'est pas applicable aux
      assemblées portant sur l'approbation des comptes annuels et des comptes
      consolidés.
    </p>
    <p>
      Les associés participant ainsi à distance à l'assemblée sont réputés
      présents pour le calcul du quorum et de la majorité.
    </p>
    <p>
      Toutefois, des associés représentant au moins 10 % du capital et des droits
      de vote pourront s'opposer à l'utilisation de ces moyens par lettre
      recommandée avec demande d'avis de réception adressée à la gérance dans les
      trois jours de la réception des convocations à l'assemblée concernée.
    </p>
    <p>
      Une feuille de présence est émargée par les membres de l'assemblée ;
      toutefois, le procès-verbal de l'assemblée en tient lieu lorsqu'il est
      signé de tous les associés présents.
    </p>
    <p>
      Les consultations écrites se déroulent selon les modalités précisées par
      les textes légaux et réglementaires, le vote par écrit étant, pour chaque
      résolution, formulé par les mots "oui" ou "non".
    </p>

    <h2>Article 21 - Décisions collectives ordinaires</h2>

    <p>
      Sont qualifiées d'ordinaires, les décisions des associés ne concernant ni
      les modifications statutaires ni l'agrément de cession ou mutations de
      parts sociales, droits de souscription ou d'attribution.
    </p>
    <p>
      Les associés sont réunis en assemblée pour statuer sur les comptes dudit
      exercice et l'affectation des résultats dans les six mois de la clôture de
      chaque exercice, sous réserve de prolongation de ce délai par ordonnance du
      président du tribunal de commerce, statuant sur requête.
    </p>
    <p>
      Les décisions collectives ordinaires sont adoptées par un ou plusieurs
      associés représentant plus de la moitié des parts sociales.
    </p>
    <p>
      Si cette majorité n'est pas obtenue à la première consultation, les
      associés sont, selon les cas, convoqués ou consultés une seconde fois et
      les décisions sont prises à la majorité des votes émis, quel que soit le
      nombre des votants, à la condition expresse de ne porter que sur les
      questions ayant fait l'objet de la première consultation.
    </p>

    <h2>Article 22 – Décisions collectives extraordinaires</h2>

    <p>
      Sont qualifiées d'extraordinaires les décisions ayant pour objet de
      modifier les statuts ou d'agréer les cessions ou mutations de parts
      sociales, droits de souscription ou d'attribution.
    </p>
    <p>
      Les décisions extraordinaires ne sont valablement prises que si elles ont
      été adoptées :
    </p>
    <p>
      - à l'unanimité, en cas de changement de nationalité de la Société,
      d'augmentation des engagements d'un associé ou de transformation de la
      Société en société en nom collectif, en société en commandite simple ou par
      actions, en société par actions simplifiée ou en société civile,
    </p>
    <p>
      - à la majorité des associés représentant au moins la moitié des parts
      sociales, en cas d'agrément de nouveaux associés ou d'autorisation de
      nantissement des parts,
    </p>
    <p>
      - par des associés représentant au moins la moitié des parts sociales, s'il
      s'agit d'augmenter le capital par incorporation de bénéfices ou de
      réserves.
    </p>
    <p>
      Pour toutes les autres modifications statutaires, l'assemblée ne délibère
      valablement que si les associés présents ou représentés possèdent au moins,
      sur première convocation, le quart des parts et, sur deuxième convocation,
      le cinquième de celles-ci. A défaut de ce quorum, la deuxième assemblée
      peut être prorogée à une date postérieure de deux mois au plus à celle à
      laquelle elle avait été convoquée. Dans l'un ou l'autre de ces deux cas,
      les modifications sont décidées à la majorité des deux tiers des parts
      détenues par les associés présents ou représentés.
    </p>

    <h2>Article 23 - Droit de communication, d’information et de contrôle des associés</h2>

    <p>
      Tout associé dispose d'un droit de communication permanent dont l'étendue
      et les modalités d'exercice sont déterminées par les dispositions
      réglementaires en vigueur.
    </p>
    <p>
      Avant toute assemblée ou consultation écrite, les associés ont le droit
      d'obtenir communication de documents et d'informations qui leur sont
      adressés ou qui sont mis à leur disposition dans les conditions fixées par
      les dispositions législatives et réglementaires en vigueur.
    </p>
    <p>
      Tout associé non gérant peut, deux fois par an, poser par écrit des
      questions à la gérance sur tout fait de nature à compromettre la continuité
      de l'exploitation. La réponse écrite de la gérance doit intervenir dans le
      délai d'un mois et est communiquée au Commissaire aux Comptes, s'il en
      existe.
    </p>
    <p>
      Un ou plusieurs associés représentant au moins le dixième du capital social
      peuvent, soit individuellement, soit en se groupant sous quelque forme que
      ce soit, demander en justice la désignation d'un ou plusieurs experts
      chargés de présenter un rapport sur une ou plusieurs opérations de gestion.
      Les conditions de sa nomination et de l'exercice de sa mission sont prévues
      par la loi et les règlements.
    </p>


    <h2>Article 24 – Exercice social – comptes sociaux</h2>

    <p>
      Chaque exercice social a une durée d'une année, qui commence le xxxxxxxxx
      et finit le xxxxxxxx.
    </p>

    <p>
      Par exception, le premier exercice commencera le jour de l'immatriculation
      de la Société au Registre du commerce et des sociétés et se terminera le
      xxxxxxxxxxxxx.
    </p>
    <p>
      A la clôture de chaque exercice, la gérance dresse un inventaire de l'actif
      et du passif de la Société, ainsi que des comptes annuels (bilan, compte de
      résultat et le cas échéant, annexe).
    </p>
    <p>
      Le montant des engagements cautionnés, avalisés ou garantis par la Société
      est annexé à la suite du bilan, ainsi qu'un état des sûretés consenties par
      elle.
    </p>
    <p>
      Conformément à la loi, la gérance établit un rapport de gestion sur la
      situation de la Société et son activité au cours de l'exercice écoulé, les
      résultats de cette activité, les progrès réalisés et les difficultés
      rencontrées, l'évolution prévisible de cette situation, et les perspectives
      d'avenir, les événements importants survenus entre la date de clôture de
      l'exercice et la date à laquelle le rapport est établi, enfin les activités
      en matière de recherche et de développement.
    </p>
    <p>
      Lorsque la Société est une petite entreprise au sens des articles L. 123-16
      et D. 123-200, 2° du Code de commerce, elle est dispensée de l'obligation
      d'établir un rapport sur la gestion de la Société pendant l'exercice
      écoulé.
    </p>
    <p>
      Les comptes annuels sont établis après chaque exercice selon les mêmes
      formes et les mêmes méthodes d'évaluation que les années précédentes, sauf
      si un changement exceptionnel est intervenu dans la situation de la
      Société.
    </p>
    <p>
      La gérance procède, même en cas d'absence ou d'insuffisance du bénéfice aux
      provisions et amortissements nécessaires.
    </p>
    <p>
      Si à la clôture de l'exercice, la Société répond à l'un des critères
      définis par décret, la gérance est tenue d'établir une situation de l'actif
      réalisable et disponible, valeurs d'exploitation exclues, et du passif
      exigible, un compte de résultat prévisionnel, un tableau de financement en
      même temps que le bilan annuel et un plan de financement prévisionnel, dans
      les conditions et selon la périodicité prévues par la loi et le décret.
    </p>
    <p>
      Les comptes annuels, le rapport de gestion et le texte des résolutions
      proposées sont mis, le cas échéant, à la disposition du Commissaire aux
      Comptes, s'il en existe, un mois au moins avant la convocation de
      l'assemblée. Ces mêmes documents, et le rapport du Commissaire aux Comptes,
      s'il en existe, sont adressés aux associés quinze jours au moins avant la
      date de l'assemblée appelée à statuer sur les comptes.
    </p>
    <p>
      <u>Article 25 – Affectation et répartition des résultats</u>
    </p>
    <p>
      Le bénéfice (ou la perte) de l'exercice apparaît dans le compte de résultat
      par différence entre les produits et les charges de l'exercice et après
      déduction des amortissements et provisions.
    </p>
    <p>
      Sur ce bénéfice, diminué éventuellement des pertes antérieures, sont
      prélevées les sommes à porter en réserve en application de la loi, et en
      particulier à peine de nullité de toute délibération contraire, une somme
      correspondant à un vingtième pour constituer le fonds de réserve légale. Ce
      prélèvement cesse d'être obligatoire lorsque le fonds de réserve atteint le
      dixième du capital social.
    </p>
    <p>
      Le bénéfice distribuable est constitué par le bénéfice de l'exercice,
      diminué des pertes antérieures et des sommes portées en réserve en
      application de la loi et des statuts, et augmenté du report bénéficiaire.
    </p>
    <p>
      L'Assemblée Générale peut décider la distribution de sommes prélevées sur
      les réserves dont elle a la disposition en indiquant expressément les
      postes de réserves sur lesquels les prélèvements ont été effectués.
      Toutefois, les dividendes sont prélevés par priorité sur le bénéfice
      distribuable de l'exercice.
    </p>
    <p>
      Après approbation des comptes et constatation de l'existence de sommes
      distribuables, l'Assemblée Générale détermine la part attribuée aux
      associés sous forme de dividendes. La part de chaque associé est
      proportionnelle au nombre de parts appartenant à chacun d'eux.
    </p>
    <p>
      Les modalités de mise en paiement des dividendes votés par l'Assemblée
      Générale sont fixées par elle ou, à défaut, par la gérance.
    </p>
    <p>
      Le paiement des dividendes doit avoir lieu dans un délai maximum de neuf
      mois après la clôture de l'exercice, sauf prolongation de ce délai par
      décision de justice.
    </p>
    <p>
      Aucune distribution ne peut être faite lorsque les capitaux propres sont ou
      deviendraient à la suite de celle-ci inférieurs au montant du capital
      augmenté des réserves que la loi ne permet pas de distribuer.
    </p>
    <p>
      L'Assemblée Générale peut également décider d'affecter les sommes
      distribuables aux réserves et au report à nouveau, en totalité ou en
      partie.
    </p>

    <h2>Article 26 – Prorogation</h2>

    <p>
      Un an au moins avant la date d'expiration de la Société, la gérance doit
      provoquer une réunion de la collectivité des associés à l'effet de décider,
      dans les conditions requises pour les décisions collectives
      extraordinaires, si la Société doit être prorogée.
    </p>

    <h2>Article 27 – Capitaux propres inférieurs à la moitié du capital social</h2>

    <p>
      Si, du fait de pertes constatées dans les documents comptables, les
      capitaux propres de la Société deviennent inférieurs à la moitié du capital
      social, la gérance doit, dans les quatre mois qui suivent l'approbation des
      comptes ayant fait apparaître cette perte, consulter les associés afin de
      décider, s'il y a lieu à dissolution anticipée de la Société.
    </p>
    <p>
      Si la dissolution n'est pas prononcée, le capital doit être, dans le délai
      fixé par la loi, réduit d'un montant égal à celui des pertes qui n'ont pu
      être imputées sur les réserves si dans ce délai, les capitaux propres n'ont
      pas été reconstitués à concurrence d'une valeur au moins égale à la moitié
      du capital social.
    </p>
    <p>
      Dans tous les cas, la décision de l'Assemblée Générale doit être publiée
      dans les conditions légales et réglementaires.
    </p>
    <p>
      En cas d'inobservation de ces prescriptions, tout intéressé peut demander
      en justice la dissolution de la Société. Il en est de même si l'Assemblée
      n'a pu délibérer valablement.
    </p>

    <h2>Article 28 – Dissolution – liquidation</h2>

    <p>
      1. Sous réserve des cas de dissolution judiciaire, la Société est dissoute
      à l'expiration du terme fixé par les statuts ou par décision collective
      extraordinaire des associés.
    </p>
    <p>
      2. La Société est en liquidation dès l'instant de sa dissolution pour
      quelque cause que ce soit; sa dénomination sociale doit être suivie de la
      mention "société en liquidation", cette mention, ainsi que le nom du ou des
      liquidateurs, doit figurer sur tous les actes et documents émanant de la
      Société et destinés aux tiers, notamment sur toutes lettres, factures,
      annonces et publications diverses.
    </p>
    <p>
      La personnalité morale de la Société subsiste pour les besoins de la
      liquidation, jusqu'à la clôture de celle-ci.
    </p>
    <p>
      Le liquidateur représente la Société et est investi des pouvoirs les plus
      étendus pour réaliser l'actif même à l'amiable et acquitter le passif.
    </p>
    <p>
      Les associés sont convoqués en fin de liquidation pour statuer sur le
      compte définitif, sur le quitus de la gestion du ou des liquidateurs et
      pour constater la clôture de la liquidation.
    </p>
    <p>
      Le produit net de la liquidation, après l'extinction du passif et des
      charges sociales et le remboursement aux associés du montant nominal non
      amorti de leurs parts sociales, est partagé entre les associés
      proportionnellement au nombre de leurs parts.
    </p>
    <p>
      En cas de réunion de toutes les parts en une seule main, la dissolution
      pouvant, le cas échéant, en résulter entraîne la transmission universelle
      du patrimoine social à l'associé unique, sans qu'il y ait lieu à
      liquidation. Ces dispositions ne sont pas applicables si l'associé unique
      est une personne physique.
    </p>

    <h2>Article 29 – Contestations</h2>

    <p>
      En cas de pluralité d'associés, toutes les contestations qui pourraient
      surgir pendant la durée de la Société ou lors de sa liquidation entre les
      associés ou entre la Société et les associés, relativement aux affaires
      sociales ou à l'exécution des présents statuts, seront soumises aux
      tribunaux compétents.
    </p>

    <h2>Article 30 – Reprise des engagements antérieurs à la signature des statuts et à l’immatriculation de la société – publicité – pouvoirs</h2>

    <p>
      La Société ne jouira de la personnalité morale qu'à compter du jour de son
      immatriculation au Registre du commerce et des sociétés.
    </p>
    <p>
      Cependant, il a été accompli avant la signature des présents statuts, pour
      le compte de la Société en formation, les actes énoncés dans un état annexé
      aux présents statuts, indiquant pour chacun d'eux l'engagement qui en
      résulterait pour la Société.
    </p>
    <p>
      Cet état a été déposé dans les délais légaux au lieu du futur siège social,
      à la disposition des futurs membres de la Société qui ont pu en prendre
      connaissance, ainsi que tous les soussignés le reconnaissent. Cet état
      demeurera annexé aux présentes.
    </p>
    <p>
      Les soussignés donnent mandat à <people :people="submission.president" :short="true" /> à l'effet de
      prendre, au nom et pour le compte de la Société, les engagements suivants :
    </p>
    <p>
      - se faire assister de tous conseils nécessaires pour la création de la
      société,
    </p>
    <p>
      - effectuer toutes démarches de prospections nécessaires au démarrage de
      l'activité,
    </p>
    <p>
      - ouvrir tous comptes bancaires ou postaux.
    </p>
    <p>
      L'immatriculation de la Société au Registre du commerce et des sociétés
      emportera, de plein droit, reprise par elle desdits engagements.
    </p>
    <p>
      Les actes accomplis pour le compte de la Société pendant la période de
      formation et régulièrement repris par celle-ci seront rattachés au premier
      exercice social.
    </p>
    <p>
      Tous pouvoirs sont donnés à <people :people="submission.president" :short="true" /> et au porteur d'un
      original ou d'une copie des présentes pour effectuer les formalités de
      publicité relatives à la constitution de la Société et notamment :
    </p>
    <p>
      - pour signer et faire publier l'avis de constitution dans un support
      habilité à recevoir les annonces légales dans le département du siège
      social ;
    </p>
    <p>
      - pour faire procéder à toutes formalités en vue de l'immatriculation de la
      Société au Registre du commerce et des sociétés ;
    </p>
    <p>
      - et généralement, pour accomplir les formalités prescrites par la loi.
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
  computed: {
    actionnairesMarieCommunaute() {
      let array = []
      for (const actionnaire of this.submission.actionnaires) {
        if (actionnaire.regimeMatrimonial) {
          if (actionnaire.regimeMatrimonial.value === 'marie_communaute') {
            array.push(actionnaire)
          }
        }
      }

      return array
    },
    actionnairesMarieSeparation() {
      let array = []
      for (const actionnaire of this.submission.actionnaires) {
        if (actionnaire.regimeMatrimonial) {
          if (actionnaire.regimeMatrimonial.value === 'marie_separation') {
            array.push(actionnaire)
          }
        }
      }

      return array
    },
    capitalSocial() {
      let capital = []
      let startNumAction = 1
      for (const actionnaire of this.submission.actionnaires) {
        if (actionnaire.capital) {
          capital.push({
            actionnaire: actionnaire,
            capital: this.actionnaireCapital(actionnaire),
            startNumAction: startNumAction,
            endNumAction: startNumAction + this.actionnaireCapital(actionnaire) - 1
          })

          startNumAction = startNumAction + this.actionnaireCapital(actionnaire)
        }
      }

      return capital
    }
  },
  methods: {
    actionnaireCapital(actionnaire) {
      let montant = 0
      if (actionnaire.apports) {
        for (const apport of actionnaire.apports) {
          if (!isNaN(parseFloat(apport.valorisation))) {
            montant = montant + parseFloat(apport.valorisation)
          }
        }
      }

      if (actionnaire.capital) {
        montant = montant + parseFloat(actionnaire.capital)
      }

      return montant
    },
    actionnaireMontantApport(actionnaire) {
      let montant = 0

      if (actionnaire.apports) {
        for (const apport of actionnaire.apports) {
          if (!isNaN(parseFloat(apport.valorisation))) {
            montant = montant + parseFloat(apport.valorisation)
          }
        }
      }

      return montant
    },
    montantApports() {
      let montant = 0

      for (const actionnaire of this.submission.actionnaires) {
        if (actionnaire.apports) {
          for (const apport of actionnaire.apports) {
            if (!isNaN(parseFloat(apport.valorisation))) {
              montant = montant + parseFloat(apport.valorisation)
            }
          }
        }
      }

      return montant
    }
  }
}
</script>
