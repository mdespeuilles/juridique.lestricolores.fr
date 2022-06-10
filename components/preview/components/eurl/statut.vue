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
        LE SOUSSIGNÉ,
      </strong>
    </p>

    <p>
      <people :people="submission.actionnaireUnique" />
    </p>

    <div v-if="submission.actionnaireUnique.regimeMatrimonial">
      <p v-if="submission.actionnaireUnique.regimeMatrimonial.value === 'célibataire'">
        Célibataire, non signataire d’un pacte civil de solidarité ;
      </p>

      <p v-if="submission.actionnaireUnique.regimeMatrimonial.value === 'pacsé'">
        Partenaire d’un pacte civil de solidarité ;
      </p>

      <p v-if="submission.actionnaireUnique.regimeMatrimonial.value === 'marie_communaute'">
        Marié(e) sous le régime de la communauté légale à défaut de contrat de mariage préalable à leur union ;
      </p>

      <p v-if="submission.actionnaireUnique.regimeMatrimonial.value === 'marie_separation'">
        Marié(e) sous le régime de la séparation aux termes d’un contrat de mariage préalable à leur union ;
      </p>
    </div>

    <p>
      A établi, ainsi qu'il suit, les statuts de la société à responsabilité limitée qu'il/elle a décidé d'instituer.
    </p>

    <h2>Article 1 – Forme</h2>

    <p>
      La Société est une Société à responsabilité limitée. Elle est régie par les
      dispositions du livre deuxième du Code de commerce, par toutes autres
      dispositions légales et réglementaires en vigueur et par les présents
      statuts.
    </p>
    <p>
      Elle fonctionne indifféremment sous la même forme avec un ou plusieurs
      associés.
    </p>

    <h2>Article 2 – Objet</h2>

    <p>La Société a pour objet, en France et dans tous pays :</p>
    <p style="white-space: pre-line">
      {{ submission.secteurActivite.Description }}
    </p>

    <p>
      - la participation de la Société, par tous moyens, directement ou
      indirectement, dans toutes opérations pouvant se rattacher à son objet par
      voie de création de sociétés nouvelles, d'apport, de souscription ou
      d'achat de titres ou droits sociaux, de fusion ou autrement, de création,
      d'acquisition, de location, de prise en location-gérance de tous fonds de
      commerce ou établissements ; la prise, l'acquisition, l'exploitation ou la
      cession de tous procédés et brevets concernant ces activités.
    </p>
    <p>
      - Et généralement, toutes opérations industrielles, commerciales,
      financières, civiles, mobilières ou immobilières, pouvant se rattacher
      directement ou indirectement à l'objet social ou à tout objet similaire ou
      connexe.
    </p>

    <h2>Article 3 – Dénomination</h2>

    La dénomination de la Société est : <strong>{{ submission.raisonSociale }}</strong>

    <p>
      Dans tous les actes et documents émanant de la Société, la dénomination
      sociale doit être précédée ou suivie immédiatement des mots "société à
      responsabilité limitée" ou des initiales "SARL" et de l'énonciation du
      montant du capital social.
    </p>
    <p>
      En outre, la Société doit indiquer en tête de ses factures, notes de
      commandes, tarifs et documents publicitaires, ainsi que sur toutes
      correspondances et récépissés concernant son activité et signés par elle ou
      en son nom, le siège du tribunal au greffe duquel elle est immatriculée au
      Registre du commerce et des sociétés, et le numéro d'immatriculation
      qu'elle a reçu.
    </p>

    <h2>Article 4 – Siège social</h2>

    Le siège social est fixé : <siege :submission="submission"></siege>

    <p>
      Le déplacement du siège social est décidé par l'associé unique ou par un ou
      plusieurs associés représentant plus de la moitié des parts sociales. Le
      siège social peut cependant être transféré en tout endroit du territoire
      français par une simple décision de la gérance, sous réserve de
      ratification par la prochaine décision de l'associé unique ou par décision
      d'un ou plusieurs associés représentant plus de la moitié des parts
      sociales.
    </p>

    <h2>Article 5 – Durée</h2>

    <p>
      La durée de la Société est fixée à 99 années à compter de la date de son
      immatriculation au Registre du commerce et des sociétés, sauf dissolution
      anticipée ou prorogation.
    </p>

    <h2>Article 6 – Apports</h2>

    <p class="underline">Apports en numéraire</p>

    <div v-if="submission.verseCreation.value === 1">
      <p>
        <people :people="submission.actionnaireUnique" :short="true"/>, associé unique, apporte à la Société une somme de
        <strong>{{ submission.capital|numberToLetter }} EUROS</strong> ({{ submission.capital|currency }}).
      </p>
      <p>
        Toutes les parts sociales d'origine représentent des apports en numéraire
        et sont libérées à hauteur de la totalité de leur valeur nominale.
      </p>
      <p>
        La totalité de cet apport en numéraire, soit la somme de {{ submission.capital|numberToLetter }} euros a été
        dès avant ce jour, déposée au crédit d'un compte ouvert au nom de la
        Société en formation, à la banque, ainsi qu'en atteste un certificat de
        ladite banque.
      </p>
    </div>

    <div v-else>
      <p>
        La partie libérée de ces apports en numéraire, soit la
        somme de {{ submission|capitalNumeraireVerse|currency }} a été dès avant ce jour, déposée au crédit d’un compte
        ouvert au nom de la société en formation, à la banque ainsi qu'en atteste
        un certificat de ladite banque.
      </p>
      <p>
        La libération du solde interviendra en une ou plusieurs fois sur décision
        de la gérance dans un délai qui ne peut excéder cinq ans à compter de
        l'immatriculation de la Société au Registre du commerce et des sociétés.
      </p>
      <p>
        Elle sera retirée par la Gérance sur présentation du certificat du
        Greffe du Tribunal de commerce attestant l'immatriculation de la
        Société au Registre du Commerce et des Sociétés.
      </p>
    </div>


    <div v-if="montantApports() > 0">
      <p class="underline">Apports en nature</p>

      <p>
        <people :people="submission.actionnaireUnique" :short="true"/> apporte à
        la Société, sous les garanties ordinaires et de droit :
      </p>
      <p>

      <p v-for="apport in submission.actionnaireUnique.apports">- {{ apport.description }} d'une valeur de {{ apport.valorisation|currency }}</p>

      <p>
        En rémunération de cet apport évalué à {{ montantApports()|currency }}, il est attribué à
        <people :people="submission.actionnaireUnique" :short="true"/>,
        {{ montantApports() }} parts sociales d'une valeur nominale de un
        (1) euros chacune, entièrement libérées.
      </p>
      <p>
        Cette estimation a été effectuée sans l'intervention d'un Commissaire aux
        Apports, compte tenu de ce que la valeur d'aucun apport en nature n'excède
        30 000 euros et que la valeur totale de l'ensemble des apports non soumis à
        l'évaluation d'un Commissaire aux Apports n'excède pas la moitié du capital
        social.
      </p>
    </div>


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

    <div v-if="submission.actionnaireUnique.regimeMatrimonial !== 'marie_communaute'">
      <p>
        L’associé unique n'étant marié sous un régime de communauté de biens,
        les dispositions de l'article 1832-2 du Code civil ne sont pas applicables.
      </p>
    </div>

    <div v-if="submission.actionnaireUnique.regimeMatrimonial === 'marie_communaute'">
      <p>
        Dispositions pour le conjoint commun en biens de l'apporteur
      </p>

      <p>
        {{ submission.actionnaireUnique.conjoint }}, conjoint(e) commun(e) en biens de
        <people :people="submission.actionnaireUnique" :short="true"/>,
        apporteur de deniers provenant de la communauté,
        intervient au présent acte et reconnaît avoir été,
        conformément aux dispositions de l'article 1832-2 du Code civil,
        averti de l'apport envisagé et avoir reçu une information complète sur cet apport.
        Un original de cet avertissement est annexé aux présents statuts.
      </p>

      <p>
        {{ submission.actionnaireUnique.conjoint }} déclare ne pas vouloir être associe(e) et
        renonce définitivement à revendiquer cette qualité,
        reconnaissant exclusivement cette qualité à son conjoint pour la totalité des parts sociales émises en
        représentation des apports effectués.
      </p>

      <p>
        Dispositions pour l’apporteur marié sous le régime de la communauté des biens
      </p>

      <p>
        <people :people="submission.actionnaireUnique" :short="true"/> déclare expressément que son
        apport est fait de deniers propres non indivis ou
        provenus de l'aliénation d'un propre non indivis, et pour lui tenir lieu d'emploi ou de remploi,
        au sens de l'article 1434 du Code civil, les parts sociales qui lui sont attribuées en rémunération
        de son apport étant ainsi sa propriété exclusive.
      </p>

      <p>En application de l'article 1424 du Code civil,</p>

      <p>
        {{ submission.actionnaireUnique.conjoint }}, conjoint(e) commun(e) en biens de
        <people :people="submission.actionnaireUnique" :short="true"/>,
        intervient au présent acte et reconnaît avoir été,
        conformément aux dispositions de l'article 1424 du Code civil, averti de l'apport en nature envisagé
        et avoir reçu une information complète sur cet apport. Un original de cet avertissement
        est annexé aux présents statuts.
      </p>

      <p>{{ submission.actionnaireUnique.conjoint }} déclare consentir expressément à l'apport en nature effectué par son conjoint.</p>
    </div>

    <div v-if="submission.actionnaireUnique.regimeMatrimonial === 'pacsé'">
      <p>
        {{ submission.actionnaireUnique.conjoint }} et <people :people="submission.actionnaireUnique" :short="true"/>
        ayant conclu un pacte civil de solidarité déclaré conjointement au greffe du tribunal
        et soumis au régime patrimonial de la séparation des biens,
        conformément à l'article 515-5 du Code civil, déclarent que
        <people :people="submission.actionnaireUnique" :short="true"/>
        réalise cet apport pour son compte personnel et que les parts sociales rémunérant cet
        apport demeureront sa propriété exclusive.
      </p>
    </div>

    <div v-if="submission.actionnaireUnique.regimeMatrimonial === 'marie_separation'">
      <p>
        {{ submission.actionnaireUnique.conjoint }} et <people :people="submission.actionnaireUnique" :short="true"/>
        étant marié sous le régime de la séparation de bien, déclarent que
        <people :people="submission.actionnaireUnique" :short="true"/>
        réalise cet apport pour son compte personnel et que les parts sociales rémunérant cet
        apport demeureront sa propriété exclusive.
      </p>
    </div>

    <h2>Article 7 – Capital social </h2>

    <p>
      Le capital social est fixé à {{ submission|capital|numberToLetter }} EUROS
      ({{ submission|capital|currency }}), divisé en <strong>{{ submission|capital|numberToLetter }}</strong>
      ({{ submission|capital }}) parts de <strong>1</strong>
      (1 €) chacune, entièrement libérées, numérotées de 1 à {{ submission|capital }} et attribuées
      en totalité à <people :people="submission.actionnaireUnique" :short="true"/>,
      associé unique, en rémunération de son apport en numéraire.
    </p>

    <h2>Article 8 – Modifications du capital social</h2>
    <p>
      8-1. Augmentation du capital
    </p>
    <p>
      Le capital social peut, en vertu d'une décision de l'associé unique ou
      décision collective extraordinaire des associés être augmenté, en une ou
      plusieurs fois, en contrepartie d'apports en nature ou en numéraire, ou par
      incorporation de tout ou partie des bénéfices ou réserves disponibles, au
      moyen de la création de parts sociales nouvelles ou de l'élévation de la
      valeur nominale des parts existantes.
    </p>
    <p>
      Toutefois, aucune augmentation de capital en numéraire ne peut être
      réalisée tant que le capital n'est pas entièrement libéré.
    </p>
    <p>
      8-2. Réduction du capital social
    </p>
    <p>
      Le capital social peut être réduit, pour quelque cause et de quelque
      manière que ce soit, par décision de l'associé unique ou par décision
      collective extraordinaire des associés.
    </p>
    <h2>Article 9 – Parts sociales</h2>
    <p>
      9.1 Les parts sociales ne peuvent jamais être représentées par des titres
      négociables.
    </p>
    <p>
      La propriété des parts résulte seulement des présents statuts, des actes
      ultérieurs qui pourraient modifier le capital social et des cessions et
      attributions qui seraient régulièrement réalisées.
    </p>
    <p>
      La propriété d'une part emporte de plein droit adhésion aux statuts et aux
      résolutions régulièrement prises par les associés.
    </p>
    <p>
      Chaque part sociale confère à son propriétaire un droit égal dans les
      bénéfices de la Société, dans la propriété de l'actif social et dans le
      boni de liquidation. Elle donne également droit à une voix dans tous les
      votes et délibérations.
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
    <p>
      9.2 Chaque part sociale est indivisible à l'égard de la Société.
    </p>
    <p>
      En cas de pluralité d'associés, les copropriétaires de parts sociales
      indivises sont tenus de désigner l'un d'entre eux pour les représenter
      auprès de la Société ; à défaut d'entente, il appartient à l'indivisaire le
      plus diligent de faire désigner par justice un mandataire chargé de les
      représenter.
    </p>
    <p>
      Si une part est grevée d'un usufruit, le nu-propriétaire et l'usufruitier
      ont le droit de participer aux décisions collectives, quel que soit le
      titulaire du droit de vote. Ils doivent être convoqués à toutes les
      assemblées et disposent du même droit d'information.
    </p>
    <p>
      <em>Choix 1 : Droit de vote nu-propriétaire et usufruitier</em>
    </p>
    <p>
      Le droit de vote appartient au nu-propriétaire, sauf pour les décisions
      concernant l'affectation des bénéfices, où il est réservé à l'usufruitier.
    </p>
    <p>
      Toutefois, pour les autres décisions, le nu-propriétaire et l'usufruitier
      peuvent convenir que le droit de vote sera exercé par l'usufruitier. La
      convention est notifiée par lettre recommandée à la Société, qui sera tenue
      d'appliquer cette convention pour toute assemblée qui se réunirait après
      l'expiration d'un délai d'un mois suivant l'envoi de cette lettre.
    </p>
    <p>
      <em>Choix 2 : Droit de vote nu-propriétaire et usufruitier</em>
    </p>
    <p>
      Le droit de vote appartient au nu-propriétaire pour les décisions
      collectives extraordinaires et à l'usufruitier pour les décisions
      collectives ordinaires.
    </p>
    <p>
      Cependant, les associés peuvent convenir de toute autre répartition du
      droit de vote, sans toutefois pouvoir priver l'usufruitier de son droit à
      voter les décisions concernant l'affectation des bénéfices. La convention
      est notifiée par lettre recommandée à la Société, qui sera tenue
      d'appliquer cette convention pour toute assemblée qui se réunirait après
      l'expiration d'un délai d'un mois suivant l'envoi de cette lettre.
    </p>
    <h2>Article 10 – Comptes courants</h2>
    <p>
      Outre leurs apports, l'associé unique ou les associés pourront verser ou
      laisser à disposition de la Société toutes sommes dont elle pourrait avoir
      besoin. Ces sommes sont inscrites au crédit d'un compte ouvert au nom de
      l'associé.
    </p>
    <p>
      Les comptes courants ne doivent jamais être débiteurs et la Société a la
      faculté d'en rembourser tout ou partie, après avis donné par écrit un mois
      à l'avance, sauf stipulation contraire.
    </p>
    <h2>Article 11 – Cession et transmission des parts sociales</h2>
    <p>
      Toute cession de parts doit être constatée par un acte notarié ou sous
      signature privée.
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
      Les cessions ou transmissions, sous quelque forme que ce soit, des parts
      détenues par l'associé unique sont libres.
    </p>
    <p>
      En cas de dissolution de la communauté de biens existant entre l'associé
      unique et son conjoint, la Société continue de plein droit, soit avec un
      associé unique si la totalité des parts est attribuée à l'un des époux,
      soit avec les deux associés si les parts sont partagées entre les époux.
    </p>
    <p>
      En cas de décès de l'associé unique, la Société continue de plein droit
      entre ses ayants droit ou héritiers, et éventuellement son conjoint
      survivant.
    </p>
    <p>
      <em>Restrictions à la libre cessibilité des parts</em>
    </p>
    <p>
      <em>
        Si les parts sont librement cessibles entres associés et famille proche
      </em>
    </p>
    <p>
      En cas de pluralité d'associés, les parts sociales sont librement cessibles
      entre associés, entre conjoints, ascendants ou descendants des associés,
      même si le conjoint, ascendant ou descendant cessionnaire n'est pas
      associé.
    </p>
    <p>
      Elles ne peuvent être cédées, à titre onéreux ou à titre gratuit, à des
      tiers non associés autres que le conjoint, les ascendants ou descendants du
      cédant, qu'avec le consentement de la majorité des associés représentant au
      moins la moitié des parts sociales.
    </p>
    <p>
      <em>Si les parts sont librement cessibles entres associés uniquement</em>
    </p>
    <p>
      En cas de pluralité d'associés, les parts sociales sont librement cessibles
      entre associés.
    </p>
    <p>
      Elles ne peuvent être cédées, à titre onéreux ou à titre gratuit, à un
      cessionnaire n'ayant déjà la qualité d'associé et quel que soit son degré
      de parenté avec le cédant, qu'avec le consentement de la majorité des
      associés représentant au moins la moitié des parts sociales.
    </p>
    <p>
      <em>Si la cession des parts fait toujours l'objet d'un agrément</em>
    </p>
    <p>
      En cas de pluralité d'associés, les parts sociales ne peuvent être cédées,
      à titre onéreux ou à titre gratuit, quelle que soit la qualité du
      cessionnaire, et même entre associés, qu'avec le consentement de la
      majorité des associés représentant au moins la moitié des parts sociales.
    </p>
    <p>
      Pour obtenir cet agrément, l'associé qui désire céder tout ou partie des
      parts qu'il possède, doit notifier son projet à la gérance et à chacun des
      associés, par acte d'huissier ou par lettre recommandée avec demande d'avis
      de réception, en indiquant les nom, prénoms, profession et domicile du
      cessionnaire proposé, le nombre de parts qu'il désire céder et, s'il s'agit
      d'une vente, le prix convenu.
    </p>
    <p>
      Dans le délai de huit jours à compter de cette notification, la gérance
      doit convoquer l'assemblée des associés pour qu'elle délibère sur le projet
      de cession des parts sociales ou consulter les associés par écrit sur ledit
      projet.
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
      Si les modalités de détermination du prix des parts sont prévues dans une
      convention liant les parties à la cession ou au rachat, l'expert désigné
      sera tenu de les appliquer conformément aux dispositions du second alinéa
      du I de l'article 1843-4 du Code civil.
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
      Si, à l'expiration du délai imparti, aucune des solutions prévues n'est
      intervenue, l'associé peut réaliser la cession initialement projetée, si
      toutefois il détient ses parts depuis au moins deux ans ou en a reçu la
      propriété par succession, liquidation de communauté de biens entre époux ou
      donation de son conjoint, d'un ascendant ou descendant ; l'associé qui ne
      remplit aucune de ces conditions reste propriétaire de ses parts.
    </p>
    <h2>Article 12 – Gérance</h2>
    <p>
      La Société est administrée par un ou plusieurs gérants, personnes
      physiques, associés ou non, avec ou sans limitation de la durée de leur
      mandat.
    </p>
    <p>
      Le ou les premiers gérants de la Société sont nommés par décision séparée
      de l'associé unique, fixant également la durée des fonctions et la
      rémunération de la gérance
    </p>
    <p>
      En cours de vie sociale, le ou les gérants sont nommés par l’associé unique
      ou, en cas de pluralité d’associés, par décision d'un ou plusieurs associés
      représentant plus de la moitié des parts sociales. Si cette majorité n'est
      pas obtenue, les associés sont, selon le cas, convoqués ou consultés une
      seconde fois, et les décisions sont prises à la majorité des votes émis,
      quel que soit le nombre des votants.
    </p>
    <p>
      Le gérant est tenu de consacrer tout le temps et les soins nécessaires aux
      affaires sociales.
    </p>
    <p>
      Le gérant peut mettre les statuts de la Société en harmonie avec les
      dispositions impératives de la loi et des règlements, sous réserve de
      ratification de ces modifications par l'associé unique ou par décision
      collective des associés prise dans les conditions prévues pour la
      modification des statuts.
    </p>
    <p>
      Le ou les gérants peuvent recevoir une rémunération, qui est fixée et peut
      être modifiée par une décision de l'associé unique ou par une décision
      ordinaire des associés.
    </p>
    <p>
      Dans les rapports avec les tiers, les pouvoirs du ou des gérants sont les
      plus étendus pour agir en toute circonstance au nom de la Société, sous
      réserve des pouvoirs que la loi attribue expressément à l'associé unique ou
      aux associés.
    </p>
    <p>
      Le ou les gérants sont révocables par décision de l'associé unique ou, en
      cas de pluralité d'associés, par décision des associés représentant plus de
      la moitié des parts sociales. Si cette majorité n'est pas obtenue, les
      associés sont, selon le cas, convoqués ou consultés une seconde fois, et
      les décisions sont prises à la majorité des votes émis, quel que soit le
      nombre des votants.
    </p>
    <p>
      Le gérant peut démissionner de ses fonctions à charge pour lui d'informer
      l'associé unique ou, en cas de pluralité d'associés, chacun des associés au
      moins trois mois à l'avance, par lettre recommandée avec demande d'avis de
      réception.
    </p>
    <p>
      Le décès ou le retrait du gérant n'entraîne pas la dissolution de la
      Société.
    </p>
    <h2>Article 13 – Conventions entre la société et un gérant ou associé</h2>
    <p>
      Les conventions qui interviennent directement ou par personne interposée
      entre la société et l'un de ses gérants ou associés sont soumises aux
      procédures d'approbation et de contrôle prévues par la loi.
    </p>
    <p>
      Ces dispositions s'appliquent aux conventions passées avec une société dont
      un associé indéfiniment responsable, un gérant, un administrateur, un
      directeur général, un membre du Directoire ou un membre du Conseil de
      surveillance est simultanément gérant ou associé de la société à
      responsabilité limitée. Elles ne s'appliquent pas aux conventions portant
      sur des opérations courantes conclues à des conditions normales.
    </p>
    <p>
      S'il n'existe pas de Commissaire aux Comptes, les conventions conclues par
      le gérant non associé sont soumises à l'approbation préalable de l'associé
      unique ou de l'assemblée des associés.
    </p>
    <p>
      La procédure d'approbation et de contrôle prévue par la loi ne s'applique
      pas aux conventions conclues par l'associé unique, gérant ou non ;
      toutefois, le Commissaire aux Comptes ou à défaut le gérant non associé
      doivent établir un rapport spécial.
    </p>
    <p>
      Les conventions conclues par l'associé unique ou par le gérant non associé
      doivent être mentionnées dans le registre des décisions de l'associé
      unique.
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
    <h2>Article 14 – Décisions d’associés</h2>
    <p>
      1) L'associé unique exerce les pouvoirs dévolus à l'assemblée des associés.
      Il ne peut déléguer ses pouvoirs. Ses décisions sont constatées par des
      procès-verbaux signés par lui et répertoriés dans un registre coté et
      paraphé comme les registres d'assemblées.
    </p>
    <p>
      2) En cas de pluralité d'associés, les décisions collectives des associés
      sont prises en assemblée, ou par voie de consultation écrite, au choix de
      la gérance.
    </p>
    <p>
      Elles peuvent encore résulter du consentement de tous les associés exprimé
      dans un acte.
    </p>
    <p>
      Toutefois, la réunion d'une assemblée est obligatoire pour statuer sur
      l'approbation annuelle des comptes sociaux et pour toutes autres décisions
      prises sur demande d'un ou plusieurs associés détenant la moitié des parts
      sociales ou détenant, s'ils représentent au moins le dixième des associés,
      le dixième des parts sociales.
    </p>
    <p>
      Sont qualifiées d'ordinaires, les décisions des associés ne concernant ni
      les modifications statutaires ni l'agrément de cession ou mutations de
      parts sociales, droits de souscription ou d'attribution.
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
    <p>
      En cas de consultation écrite, la gérance adresse à chaque associé, par
      lettre recommandée, le texte des résolutions proposées ainsi que les
      documents nécessaires à l'information des associés.
    </p>
    <p>
      Les associés disposent d'un délai de quinze jours à compter de la date de
      réception du projet de résolutions pour transmettre leur vote à la gérance
      par lettre recommandée. Tout associé n'ayant pas répondu dans le délai
      ci-dessus est considéré comme s'étant abstenu.
    </p>
    <p>
      En cas de pluralité d'associés, chaque associé a le droit de participer aux
      décisions collectives et dispose d'un nombre de voix égal à celui des parts
      qu'il possède. Il peut se faire représenter par un autre associé, sauf si
      les associés sont au nombre de deux, ou par son conjoint à moins que la
      Société ne comprenne que les deux époux, ou par toute autre personne de son
      choix.
    </p>
    <h2>Article 15 – Commissaires aux comptes</h2>
    <p>
      L'associé unique ou en cas de pluralité d'associés, la collectivité des
      associés peut nommer un ou plusieurs Commissaires aux Comptes, en
      application des articles L. 223-35, L. 823-1 et suivants du Code de
      commerce.
    </p>
    <p>
      Cette nomination est obligatoire si la Société dépasse, à la clôture d'un
      exercice social, les seuils définis légalement et fixés par décret. Le
      Commissaire aux Comptes sera nommé pour un mandat de six exercices et
      exercera son mandat dans le cadre d'un audit légal classique.
    </p>
    <p>
      L'associé unique ou en cas de pluralité d'associés, la collectivité des
      associés pourra désigner volontairement un Commissaire aux Comptes dans les
      conditions prévues à l'article L. 223-29 du Code de commerce. La Société
      pourra limiter la durée du mandat à trois exercices et sera ainsi soumise à
      l'audit légal "petites entreprises".
    </p>
    <p>
      En outre, la nomination d'un Commissaire aux Comptes pourra être demandée
      en justice par un ou plusieurs associés représentant au moins le dixième du
      capital. La durée de son mandat sera de six exercices.
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

    <h2>Article 16 – Exercice social – Comptes sociaux</h2>

    <p>
      Chaque exercice social a une durée d'une année, qui commence le xxxxxxxxxxx
      finit le xx xxxxxxx.
    </p>
    <p>
      Par exception, le premier exercice commencera le jour de l'immatriculation
      de la Société au Registre du commerce et des sociétés et se terminera le
      xxxxxxx.
    </p>
    <p>
      A la clôture de chaque exercice, la gérance dresse l'inventaire des divers
      éléments de l'actif et du passif existant à cette date et établit les
      comptes annuels comprenant le bilan, le compte de résultat et le cas
      échéant, l'annexe, conformément aux lois et règlements en vigueur.
    </p>
    <p>
      L'associé unique approuve les comptes annuels, après rapport du Commissaire
      aux Comptes, s'il en existe, dans les six mois de la clôture de l'exercice
      social, et décide l'affectation du résultat.
    </p>
    <p>
      En cas de pluralité d'associés, l'assemblée des associés approuve les
      comptes annuels dans les six mois de la clôture de l'exercice social.
    </p>
    <p>
      La gérance dépose les documents énumérés par l'article L. 232-22 du Code de
      commerce au greffe du tribunal de commerce, dans le mois qui suit
      l'approbation des comptes annuels.
    </p>

    <h2>Article 17 – Affectation et répartition des résultats</h2>

    <p>
      Le bénéfice distribuable est constitué par le bénéfice de l'exercice,
      diminué des pertes antérieures et des sommes portées en réserve en
      application de la loi et des statuts, et augmenté du report bénéficiaire.
    </p>
    <p>
      Il est attribué à l'associé unique. En cas de pluralité d'associés,
      l'assemblée des associés détermine la part attribuée à chacun des associés.
      L'associé unique ou l'assemblée des associés détermine les modalités de
      mise en paiement des dividendes, qui doit intervenir dans un délai de neuf
      mois après la clôture de l'exercice, sauf prolongation par décision de
      justice.
    </p>
    <p>
      De même, l'associé unique ou l'Assemblée Générale peut décider la
      distribution de sommes prélevées sur les réserves disponibles en indiquant
      expressément les postes de réserves sur lesquels les prélèvements ont été
      effectués. Toutefois, les dividendes sont prélevés par priorité sur le
      bénéfice distribuable de l'exercice.
    </p>
    <p>
      L'associé unique ou l'Assemblée Générale peut également décider d'affecter
      les sommes distribuables aux réserves et au report à nouveau, en totalité
      ou en partie.
    </p>
    <p>
      Aucune distribution ne peut être faite lorsque les capitaux propres sont ou
      deviendraient à la suite de celle-ci inférieurs au montant du capital
      augmenté des réserves que la loi ne permet pas de distribuer.
    </p>
    <h2>Article 18 – Capitaux propres inférieurs à la moitié du capital social</h2>
    <p>
      Si, du fait de pertes constatées dans les documents comptables, les
      capitaux propres de la Société deviennent inférieurs à la moitié du capital
      social, l'associé unique ou, en cas de pluralité d'associés, l'assemblée
      statuant à la majorité requise pour la modification des statuts doit, dans
      les quatre mois qui suivent l'approbation des comptes ayant fait apparaître
      cette perte, décider, s'il y a lieu à dissolution anticipée de la Société.
    </p>
    <p>
      Si la dissolution n'est pas prononcée, le capital doit être dans le délai
      fixé par la loi, réduit d'un montant égal à celui des pertes qui n'ont pu
      être imputées sur les réserves si dans ce délai les capitaux propres ne
      sont pas redevenus au moins égaux à la moitié du capital social.
    </p>
    <p>
      En cas d'inobservation de ces prescriptions, tout intéressé peut demander
      en justice la dissolution de la Société. Il en est de même si l'Assemblée
      n'a pu délibérer valablement.
    </p>
    <p>
      Toutefois, le Tribunal ne peut prononcer la dissolution si, au jour où il
      statue sur le fond, la régularisation a eu lieu.
    </p>
    <p>
      <u>Article 19 – Dissolution – Liquidation</u>
    </p>
    <p>
      La Société est dissoute à l'arrivée du terme statutaire de sa durée, sauf
      prorogation régulière, ou s'il survient une cause de dissolution prévue par
      la loi.
    </p>
    <p>
      Si la Société ne comprend qu'un seul associé personne morale, la
      dissolution pour quelque cause que ce soit entraîne la transmission
      universelle du patrimoine à l'associé unique, sans qu'il y ait lieu à
      liquidation.
    </p>
    <p>
      Les créanciers de la Société peuvent faire opposition à la dissolution dans
      le délai de trente jours à compter de la publication de celle-ci. Le
      Tribunal de commerce saisi de l'opposition peut soit la rejeter, soit
      ordonner le paiement des créances, soit ordonner la constitution de
      garanties si la Société en offre et si elles sont jugées suffisantes. La
      transmission à l'associé unique du patrimoine de la Société et la
      disparition de la personnalité morale de celle-ci n'interviennent qu'à
      l'issue du délai d'opposition ou, le cas échéant, lorsque l'opposition a
      été rejetée en première instance ou que le remboursement des créances a été
      effectué ou les garanties constituées.
    </p>
    <p>
      Si la Société comprend un associé personne physique ou plusieurs associés,
      la dissolution, pour quelque cause que ce soit, entraîne sa liquidation.
      Cette liquidation est effectuée dans les conditions et selon les modalités
      prévues par les dispositions légales et réglementaires en vigueur au moment
      de son ouverture.
    </p>
    <p>
      La liquidation est faite par le ou les gérants alors en fonction à moins
      qu'une décision collective ne désigne un autre liquidateur.
    </p>
    <p>
      Le ou les liquidateurs ont les pouvoirs les plus étendus pour réaliser
      l'actif même à l'amiable et acquitter le passif. Il peut être autorisé par
      les associés à continuer les affaires en cours ou à en engager de nouvelles
      pour les besoins de la liquidation.
    </p>
    <h2>Article 20 – Transformation de la société</h2>
    <p>
      La Société peut être transformée en Société d'une autre forme si elle
      comporte le nombre minimum d'associés requis pour la forme de Société
      qu'elle entend adopter.
    </p>
    <p>
      La décision de transformation est prise par la collectivité des associés
      statuant aux conditions de majorité prévues pour la modification des
      statuts.
    </p>
    <p>
      Toutefois, la transformation en Société en Nom Collectif, en Commandite
      Simple, en Commandite par actions, en Société par actions simplifiée ou en
      Société Civile exige l'unanimité des associés.
    </p>
    <p>
      La décision de transformation en Société Anonyme ou en Société par actions
      simplifiée est précédée des rapports des Commissaires déterminés par la
      loi. Le Commissaire à la Transformation est désigné par Ordonnance du
      Président du Tribunal de commerce statuant sur requête ou par décision
      unanime des associés.
    </p>
    <p>
      Les associés doivent statuer sur l'évaluation des biens composant l'actif
      social et l'octroi des avantages particuliers ; ils ne peuvent les réduire
      qu'à l'unanimité.
    </p>
    <p>
      A défaut d'approbation expresse des associés, mentionnée au procès-verbal,
      la transformation est nulle.
    </p>
    <h2>Article 21 – Contestations</h2>
    <p>
      Toutes les contestations qui pourraient surgir pendant la durée de la
      Société ou lors de sa liquidation entre la Société et l'associé unique ou
      entre la Société et les associés ou entre les associés eux-mêmes,
      relativement aux affaires sociales ou à l'exécution des présents statuts,
      seront soumises aux tribunaux compétents.
    </p>
    <h2>Article 22 – Option pour l’impôt sur les sociétés</h2>
    <p>
      Conformément aux dispositions de l'article 206, 3 du Code général des
      impôts, l'associé unique déclare opter pour l'impôt sur les sociétés.
    </p>
    <p>
      Il reconnaît avoir été averti que cette option devra être notifiée au
      service des impôts au plus tard avant la fin du troisième mois du premier
      exercice social, la notification pouvant être réalisée lors de
      l'immatriculation de la Société auprès du centre de formalités des
      entreprises par le biais du formulaire M0.
    </p>
    <p>
      Il reconnaît également être informé des dispositions de l'alinéa 3 du 1 de
      l'article 239 du Code général des impôts aux termes desquelles la Société
      qui désire renoncer à son option pour le régime des sociétés de capitaux
      notifie son choix à l'administration avant la fin du mois précédant la date
      limite de versement du premier acompte d'impôt sur les sociétés de
      l'exercice au titre duquel s'applique la renonciation à l'option. En cas de
      renonciation à l'option, la Société ne peut plus opter à nouveau pour le
      régime des sociétés de capitaux. En l'absence de renonciation avant la fin
      du mois précédant la date limite de versement du premier acompte d'impôt
      sur les sociétés du cinquième exercice suivant celui au titre duquel
      l'option a été exercée, l'option devient irrévocable.
    </p>
    <p>
      Il est en outre précisé que les sociétés soumises à l'impôt sur les
      sociétés sont tenues de recourir aux téléprocédures fiscales, et ce quel
      que soit leur chiffre d'affaires.
    </p>
    <h2>Article 23 – Reprise des engagements antérieurs à la signature des statuts et à l’immatriculation de la société – Publicité – Pouvoirs</h2>
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
      L'immatriculation de la Société au Registre du commerce et des sociétés
      emportera, de plein droit, reprise par elle desdits engagements.
    </p>
    <p>
      Les actes accomplis pour le compte de la Société pendant la période de
      formation et régulièrement repris par celle-ci seront rattachés au premier
      exercice social.
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
