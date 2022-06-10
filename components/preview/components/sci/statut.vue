<template>
  <div>
    <div class="header">
      <div>
        <strong><i>« {{ submission.raisonSociale }} »</i></strong><br />
        <strong>Société civile immobilière</strong><br />
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
      Ont établi ainsi qu'il suit les statuts d'une société civile immobilière qu'ils sont convenus de constituer entre eux et avec toute autre personne qui viendrait ultérieurement à acquérir la qualité d'associé.
    </p>

    <div style="page-break-before: always;"></div>

    <h2>Article 1 – Forme</h2>

    <p>
      Il est formé par les présentes entre les propriétaires de parts sociales ci-après créées et celles qui pourront l'être ultérieurement, une société civile immobilière régie par les dispositions du Titre IX du Livre III du Code civil, du décret nº 78-704 du 3 juillet 1978 et par toutes les dispositions légales ou réglementaires applicables en pareille matière ainsi que par les présents statuts.
    </p>

    <h2>Article 2 – Objet</h2>

    <p>La Société a pour objet :</p>

    <div v-if="submission.typeDeBien === 'locatif'">
      <p>
        L’acquisition, l’administration, la gestion par location ou autrement de tous immeubles et biens immobiliers
        La réalisation de toutes opérations financières, mobilières ou immobilières se rattachant directement ou indirectement à cet objet
      </p>
    </div>

    <div v-else>
      <p>
        - la propriété de tous immeubles bâtis ou non bâtis par voie d’acquisition, échange, apport ou autrement desdits immeubles,
      </p>
      <p>
        - l’administration et l’exploitation par bail, location ou autrement desdits immeubles,
      </p>
      <p>
        - l’acquisition, l’apport au capital, la détention et la gestion de titres de participations ou parts
        sociales dans une ou plusieurs sociétés à prépondérance immobilières, la cession de ces titres ou parts sociales,
      </p>
      <p>
        - l’emprunt de tous les fonds nécessaires à la réalisation de cet objet et la mise en place de toutes sûretés
        réelles ou autres garanties nécessaires,
      </p>
      <p>
        - Eventuellement et exceptionnellement l'aliénation du ou des immeubles devenus inutiles à la Société,
        au moyen de vente, échange ou apport en société, et généralement toutes opérations quelconques pouvant se rattacher directement ou indirectement à l'objet ci-dessus défini, pourvu que ces opérations ne modifient pas le caractère civil de la Société.
      </p>
    </div>

    <h2>Article 3 – Dénomination</h2>

    <p>
      La Société a pour dénomination sociale  :	{{ submission.raisonSociale }}
    </p>

    <p>
      Dans tous les actes et documents émanant de la Société et destinés aux
      tiers, la dénomination sociale doit, si elle ne les contient pas, être
      précédée ou suivie immédiatement des mots "société civile immobilière"
      suivis de l'indication du capital social, en vertu des dispositions de
      l'article 32 du décret du 3 juillet 1978 précité.
    </p>
    <p>
      La Société indiquera sur ses factures, notes de commande, tarifs et
      documents publicitaires ainsi que sur toutes correspondances et tous
      récépissés concernant son activité et signés par elle ou en son nom, son
      numéro d'identification accompagné de la mention RCS suivie du nom de la
      ville où se trouve le greffe où elle est immatriculée, conformément aux
      dispositions de l'article R. 123-237 du Code de commerce.
    </p>


    <h2>Article 4 – Siège social</h2>

    Le siège social est fixé : <siege :submission="submission"></siege>

    <p>
      Il peut être transféré en tout autre endroit par décision collective
      extraordinaire des associés.
    </p>

    <h2>Article 5 – Durée</h2>

    <p>
      La durée de la Société est fixée à quatre-vingt-dix-neuf années à compter
      de la date de son immatriculation au Registre du commerce et des sociétés,
      sauf dissolution anticipée ou prorogation.
    </p>


    <h2>Article 6 – Apports - Formation du capital</h2>

    <p>Le capital social est constitué par les apports suivants :</p>

    <p class="underline">Apports en numéraire</p>

    <p>
      Il est apporté en numéraire :
    </p>

    <p v-for="actionnaire in submission.actionnaires" v-if="actionnaire.capital">
      - par <people :people="actionnaire" :short="true" />, la somme de {{ actionnaire.capital|currency }}
    </p>

    <p>
      La totalité de cet apport en numéraire, soit la somme de {{ submission|capitalNumeraire|numberToLetter }} euros a été
      dès avant ce jour, déposée au crédit d'un compte ouvert au nom de la
      Société en formation, à la banque <em>(Nom et adresse de la banque),</em>
      ainsi qu'en atteste un certificat de ladite banque.
    </p>


    <div v-if="actionnairesMarieCommunaute.length === 0">
      <p>
        Aucun associé n'étant marié sous un régime de communauté de biens, les dispositions de l'article 1832-2 du Code civil ne sont pas applicables.
      </p>
    </div>

    <div v-if="actionnairesMarieCommunaute.length >= 1">
      <p v-for="actionnaire in actionnairesMarieCommunaute">
        <people :people="actionnaire" :short="true" /> déclare expressément que son apport est fait de deniers propres
        non indivis ou provenus de l'aliénation d'un propre non indivis, et pour
        lui tenir lieu d'emploi ou de remploi, au sens de l'article 1434 du Code
        civil, les parts sociales qui lui sont attribuées en rémunération de son
        apport étant ainsi sa propriété exclusive.
      </p>
    </div>

    <h2>Article 7 – Capital social </h2>

    <p>
      Le capital social est fixé à {{ submission|capital|numberToLetter }} euros ({{ submission|capital|currency }}).
    </p>

    <p>
      Il est divisé en {{ submission|capital }} parts de 1 euro chacune, lesquelles sont attribuées
      comme suit :
    </p>

    <div>
      <p v-for="actionnariat in capitalSocial" v-if="actionnariat.actionnaire.capital">
        à <people :people="actionnariat.actionnaire" :short="true"/>,<br />
        {{ actionnariat.capital|numberToLetter }} parts sociales en pleine propriété,
        numérotées {{ actionnariat.startNumAction }} à {{ actionnariat.endNumAction }}, ci 	{{ actionnariat.capital }} parts
      </p>

      <div style="display: flex;justify-content: space-between">
        <p>Total égal au nombre de parts composant le capital social :</p>
        <p>{{ submission|capital }} parts</p>
      </div>

      <p>
        Conformément à la loi, les associés déclarent expressément que les xxxxx
        (xxxx) parts sociales présentement créées sont souscrites en totalité par
        les associés, et qu'elles sont réparties entre les associés dans les
        proportions indiquées ci-dessus.
      </p>
    </div>

    <h2>Article 8 – Modifications du capital social</h2>

    <p>
      1. Le capital social peut, sur décision de l'Assemblée Générale
      Extraordinaire, être augmenté par la création de parts nouvelles ou par
      l'élévation du montant nominal des parts existantes, soit au moyen
      d'apports en numéraire ou en nature, soit par compensation avec des
      créances liquides et exigibles sur la Société, soit par incorporation de
      bénéfices ou réserves.
    </p>
    <p>
      2. Il peut également être réduit, sur décision de l'Assemblée Générale
      Extraordinaire, pour quelque cause et de quelque manière que ce soit, au
      moyen de l'annulation, du remboursement ou du rachat des parts existantes
      ou de leur échange contre de nouvelles parts d'un montant identique ou
      inférieur, ayant ou non la même valeur nominale.
    </p>


    <h2>Article 9 – Représentation des parts sociales</h2>

    <p>
      Les parts sociales ne peuvent être représentées par des titres négociables.
    </p>
    <p>
      Le droit de chaque associé résulte seulement des présents statuts et des
      actes ultérieurs modifiant le capital social ou constatant des cessions
      régulièrement consenties.
    </p>
    <p>
      Une copie, certifiée conforme par le gérant, de ces documents sera délivrée
      à tout associé qui en fera la demande.
    </p>
    <p>
      Des certificats représentatifs de leurs parts peuvent être remis aux
      associés. Ils doivent être intitulés "certificats représentatifs de parts"
      et très lisiblement barrés de la mention "non négociable". Ils sont établis
      au nom de chaque associé pour le total des parts détenues par lui.
    </p>
    <p>
      <u>Article 10 – Droits et obligations attachés aux parts sociales</u>
    </p>
    <p>
      1 - Droits aux bénéfices, obligations aux pertes
    </p>
    <p>
      Chaque part sociale donne à son propriétaire un droit égal dans les
      bénéfices de la Société et dans tout l'actif social.
    </p>
    <p>
      A l'égard des tiers, les associés répondent indéfiniment des dettes
      sociales à proportion de leur part dans le capital social à la date de
      l'exigibilité ou au jour de la cessation des paiements.
    </p>
    <p>
      Les créanciers ne peuvent poursuivre le paiement des dettes sociales contre
      un associé qu'après avoir préalablement et vainement poursuivi la Société.
    </p>
    <p>
      2 - Droit de communication et d'intervention dans la vie sociale
    </p>
    <p>
      Outre le droit d'information annuel à l'occasion de l'approbation des
      comptes visé ci-après, les associés ont le droit d'obtenir, au moins une
      fois par an, communication des livres et documents sociaux.
    </p>
    <p>
      L'associé pourra prendre lui-même, au siège social, communication de tous
      les livres et documents sociaux, des contrats, factures, correspondances,
      procès-verbaux et plus généralement de tout document établi par la Société
      ou reçu par elle, conformément aux dispositions de l'article 48 du décret
      78-704 du 3 juillet 1978.
    </p>
    <p>
      Chaque associé peut poser toutes questions écrites concernant la gestion de
      la Société, au gérant de celle-ci qui devra répondre dans le délai d'un
      mois, conformément aux dispositions de l'article 1855 du Code civil.
    </p>
    <p>
      Tout associé peut participer aux décisions collectives et y voter, dans les
      conditions relatées ci-après.
    </p>
    <p>
      3 - Transmission des droits et obligations des associés
    </p>
    <p>
      Les droits et obligations attachés à chaque part la suivent dans quelque
      main qu'elle passe. La propriété d'une part emporte, de plein droit,
      adhésion aux statuts et aux décisions de l'assemblée générale.
    </p>
    <p>
      <u>Article 11 – Indivisibilité des parts sociales</u>
    </p>
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
      Toutefois, pour les autres décisions, le nu-propriétaire et l'usufruitier
      peuvent convenir que le droit de vote sera exercé par l'usufruitier. La
      convention est notifiée par lettre recommandée à la Société, qui sera tenue
      d'appliquer cette convention pour toute assemblée qui se réunirait après
      l'expiration d'un délai d'un mois suivant l'envoi de cette lettre.
    </p>
    <p>
      <u>Article 12 – Comptes courants</u>
    </p>
    <p>
      Outre leurs apports, les associés pourront verser ou laisser à disposition
      de la Société toutes sommes dont elle pourrait avoir besoin. Ces sommes
      sont inscrites au crédit d'un compte ouvert au nom de l'associé.
    </p>
    <p>
      Le montant maximum desdites sommes, les conditions de leur remboursement,
      la fixation des intérêts sont fixés par accord entre la gérance et les
      intéressés.
    </p>
    <p>
      <u>Article 13 – Cession et transmission des parts sociales</u>
    </p>
    <p>
      1 - Cession entre vifs
    </p>
    <p>
      Toute cession de parts doit être constatée par un acte notarié ou sous
      signature privée.
    </p>
    <p>
      Pour être opposable à la Société, elle doit, conformément aux dispositions
      de l'article 1690 du Code civil, lui être signifiée par exploit d'huissier
      ou être acceptée par elle dans un acte notarié.
    </p>
    <p>
      Elle est également rendue opposable à la Société par voie d'inscription sur
      le registre des transferts tenu par la Société. Ce registre est constitué
      par la réunion, dans l'ordre chronologique de leur établissement, de
      feuillets identiques utilisés sur une seule face. Chacun de ces feuillets
      est réservé à un titulaire de parts sociales à raison de sa propriété ou à
      plusieurs titulaires à raison de leur copropriété, de leur nue-propriété ou
      de leur usufruit sur ces parts.
    </p>
    <p>
      Elle n'est opposable aux tiers qu'après accomplissement de ces formalités
      et après publication au Registre du commerce et des sociétés ; ce dépôt
      peut être effectué par voie électronique.
    </p>
    <p>
      Lorsque deux époux sont simultanément membres de la Société, les cessions
      faites par l'un d'eux à l'autre doivent, pour être valables, résulter d'un
      acte notarié ou d'un acte sous signature privée ayant acquis date certaine
      autrement que par le décès du cédant, en application des dispositions de
      l'article 1861 du Code civil.
    </p>
    <p>
      <em><u>Restrictions à la libre cessibilité des parts</u></em>
    </p>
    <p>
      Les parts sociales sont librement cessibles entre associés, entre conjoints
      ou partenaires pacsés, ascendants ou descendants des associés, même si le
      conjoint, partenaire pacsé, ascendant ou descendant cessionnaire n'est pas
      associé.
    </p>
    <p>
      Elles ne peuvent être cédées, à titre onéreux ou à titre gratuit, à des
      tiers non associés autres que le conjoint, partenaire pacsé, les ascendants
      ou descendants du cédant, qu'avec le consentement de la majorité des
      associés représentant au moins les deux tiers des parts sociales.
    </p>
    <p>
      Les parts sociales ne peuvent être cédées, à titre onéreux ou à titre
      gratuit, quelle que soit la qualité du cessionnaire, et même entre
      associés, qu'avec le consentement de la majorité des    <a name="_Hlk92864342">associés représentant au moins </a>au moins les deux
      tiers des parts sociales.
    </p>
    <p>
      Pour obtenir cet agrément, l'associé qui désire céder tout ou partie des
      parts qu'il possède, doit notifier son projet à la gérance et à chacun des
      associés, par acte d'huissier ou par lettre recommandée avec demande d'avis
      de réception, en indiquant les nom, prénoms, profession et domicile du
      cessionnaire proposé (dénomination, siège social, montant du capital, et
      immatriculation au registre du commerce et des sociétés en cas de personne
      morale), le nombre de parts qu'il désire céder et, s'il s'agit d'une vente,
      le prix convenu.
    </p>
    <p>
      L'assemblée statue dans le mois suivant la notification à la Société du
      projet de cession et sa décision est notifiée aux associés par lettre
      recommandée avec demande d'avis de réception, dans les 15 jours.
    </p>
    <p>
      Si la Société n'a pas fait connaître sa décision dans le délai de trois
      mois à compter de la notification du projet de cession à la société, le
      consentement à la cession est réputé acquis
    </p>
    <p>
      En cas de refus d'agrément, chaque associé peut se porter acquéreur des
      parts. Lorsque plusieurs associés expriment leur volonté d'acquérir, ils
      sont, sauf convention contraire, réputés acquéreurs à proportion du nombre
      de parts qu'ils détenaient au jour de la notification du projet de cession
      à la société, sans qu’il soit tenu compte des droits sociaux objet de la
      cession projetée.
    </p>
    <p>
      Si aucun associé ne se porte acquéreur, ou s'il existe un reliquat parce
      que les demandes reçues ne portent pas sur la totalité des parts, la
      Société peut faire acquérir les parts par un tiers qui doit être agrée dans
      les conditions prévues ci-dessus. La Société peut également procéder au
      rachat des parts en vue de leur annulation.
    </p>
    <p>
      La gérance a pour mission de collecter les offres individuelles d'achat
      émanant des associés, puis, s'il y a lieu, de susciter l'offre de tiers ou
      de la Société.
    </p>
    <p>
      La gérance notifie au cédant, par lettre recommandée avec demande d'avis de
      réception, le nom de ou des acquéreurs proposés, associés ou tiers, ou
      l'offre de rachat par la Société, ainsi que le prix offert. En cas de
      contestation sur le prix, celui-ci est fixé à dire d'expert dans les
      conditions définies à l'article 1843-4 du Code civil, le tout sans
      préjudice du droit du cédant de conserver ses parts.
    </p>
    <p>
      Si les modalités de détermination du prix des parts sont prévues dans une
      convention liant les parties à la cession ou au rachat, l'expert désigné
      sera tenu de les appliquer conformément aux dispositions du second alinéa
      du I de l'article 1843-4 du Code civil.
    </p>
    <p>
      Si aucune offre de rachat n'est faite au cédant dans un délai six mois à
      compter de la dernière des notifications prévues au troisième alinéa de
      l’article 1861 du Code civil, l'agrément à la cession est réputé acquis, à
      moins que les autres associés, n'aient décidé, dans le même délai, la
      dissolution de la Société, décision que le cédant peut rendre caduque s'il
      notifie à la Société, par acte extrajudiciaire ou par lettre recommandée
      avec demande d'avis de réception, sa renonciation au projet initial de
      cession dans le délai d'un mois à compter de l'intervention de la décision
      de dissolution.
    </p>
    <p>
      La Société peut également, avec le consentement de l'associé cédant,
      décider dans le même délai de réduire son capital du montant de la valeur
      nominale des parts de cet associé et de racheter ces parts au prix
      déterminé conformément à l'article 1843-4 du Code civil en appliquant les
      modalités de détermination de la valeur des parts fixées aux présents
      statuts
    </p>
    <p>
      Un délai de paiement, qui ne saurait excéder deux ans, peut, sur
      justification, être accordé à la Société par ordonnance du Président du
      Tribunal de Commerce du lieu du siège social, statuant par ordonnance de
      référé non susceptible de recours. Les sommes dues portent intérêt au taux
      légal en matière commerciale.
    </p>
    <p>
      Toutefois, l'associé cédant qui détient ses parts depuis moins de deux ans
      ne peut se prévaloir des dispositions du paragraphe précédent, à moins
      qu'il ne les ait reçues par voie de succession, de liquidation de
      communauté entre époux ou de donation à lui faite par son conjoint, un
      ascendant ou un descendant.
    </p>
    <p>
      2 - Revendication par le conjoint de la qualité d'associé
    </p>
    <p>
      La qualité d'associé est reconnue au conjoint commun en biens pour la
      moitié des parts souscrites ou acquises au moyen de fonds communs s'il
      notifie à la Société son intention d'être personnellement associé.
    </p>
    <p>
      Si la notification a été effectuée lors de l'apport ou de l'acquisition,
      l'agrément donné par les associés vaut pour les deux époux. Si le conjoint
      exerce son droit de revendication postérieurement à la réalisation de la
      souscription ou de l'acquisition, il sera soumis à l'agrément des associés
      statuant dans les conditions prévues ci-dessus. L'époux associé sera alors
      exclu du vote et ses parts ne seront pas prises en compte pour le calcul de
      la majorité.
    </p>
    <p>
      La décision des associés doit être notifiée au conjoint dans les deux mois
      de sa demande ; à défaut, l'agrément est réputé acquis. En cas de refus
      d'agrément régulièrement notifié, l'époux associé le reste pour la totalité
      des parts de la communauté. Les notifications susvisées sont faites par
      lettre recommandée avec demande d'avis de réception.
    </p>
    <p>
      3 - Transmissions des parts sociales autres que les cessions
    </p>
    <p>
      3-1. Décès d'un associé
    </p>
    <p>
      La Société n'est pas dissoute par le décès d'un associé, mais les héritiers
      ou légataires devront solliciter l'agrément des associés statuant dans les
      conditions de majorité prévues ci-dessus.
    </p>
    <p>
      3-2. Donation - Dissolution de communauté ou de Pacs du vivant de l'associé
    </p>
    <p>
      La transmission des parts sociales par voie de donation est soumise aux
      mêmes conditions d'agrément que les cessions susvisées.
    </p>
    <p>
      Il en est de même de toute mutation de propriété qui serait l'effet d'une
      liquidation de communauté de biens entre époux.
    </p>
    <p>
      En cas de dissolution d'un Pacs, la liquidation de parts indivises sera
      effectuée par application des dispositions des articles 515-6, alinéa 1 et
      831 du Code civil, avec possibilité d'attribution préférentielle des parts
      à l'autre partenaire par voie de partage, à charge de soulte s'il y a lieu.
    </p>
    <p>
      3-3. Autres transmissions entre vifs
    </p>
    <p>
      Les échanges de parts sociales, apports, attributions issues notamment d'un
      partage ou toute opération ayant pour conséquence le transfert d'un droit
      quelconque de propriété sur une ou plusieurs parts de la société sont
      soumis aux mêmes conditions et modalités d'agrément que les cessions
      sus-relatées.
    </p>
    <p>
      <u>Article 14 – Retrait d’un associé</u>
    </p>
    <p>
      Sans préjudice des droits des tiers, un associé peut se retirer totalement
      ou partiellement de la Société après autorisation donnée par la
      collectivité des associés statuant dans les conditions de majorité prévues
      pour les décisions extraordinaires. Ce retrait peut être autorisé pour
      juste motif par une décision de justice.
    </p>
    <p>
      La demande de retrait est notifiée à la Société et aux associés par lettre
      recommandée avec demande d'avis de réception.
    </p>
    <p>
      L'associé qui se retire a droit au remboursement de la valeur de ses parts
      fixée, à défaut d'accord amiable, par un expert désigné conformément à
      l'article 1843-4 du Code civil. Les frais et honoraires d’expertise sont
      supportés moitié par la société et moitié par l’associé retrayant. Si le
      bien qu'il a apporté et dont les parts concernées ont constitué la
      rémunération, se trouve encore en nature dans l'actif social lors du
      retrait, l'associé peut se le faire attribuer, à charge de soulte, s'il y a
      lieu, conformément au troisième alinéa de l'article 1844-9 du Code civil.
    </p>
    <p>
      L’associé qui se retire de la société reste tenu des dettes sociales
      devenues exigibles à la date d’effet de son retrait. Il n’est plus
      responsable des dettes contractées avant la date d’effet de son retrait
      mais qui ne sont pas encore exigibles à cette date, sauf si le retrayant a
      garanti personnellement les engagements de la société.
    </p>
    <p>
      <u>Article 15 – Nantissement</u>
    </p>
    <p>
      Les parts sociales peuvent faire l'objet d'un nantissement constaté soit
      par acte authentique, soit par acte sous signature privée signifié à la
      société ou accepté par elle dans un acte authentique.
    </p>
    <p>
      Le nantissement donne lieu à la publicité décrite aux articles 53 à 57 du
      décret n° 78-704 du 3 juillet 1978.
    </p>
    <p>
      Tout associé doit obtenir des autres associés leur consentement à un projet
      de nantissement dans les mêmes conditions que leur agrément à une cession
      de parts.
    </p>
    <p>
      Le consentement donné au projet de nantissement emporte agrément du
      cessionnaire en cas de réalisation forcée des parts sociales à la condition
      que cette réalisation soit notifiée un mois avant la vente aux associés et
      à la société.
    </p>
    <p>
      Chaque associé peut se substituer à l'acquéreur dans un délai de cinq jours
      francs à compter de la vente. Si plusieurs associés exercent cette faculté,
      ils sont, sauf clause ou convention contraire, réputés acquéreurs à
      proportion du nombre de parts qu'ils détiennent antérieurement.
    </p>
    <p>
      Si aucun associé n'exerce cette faculté, la société peut racheter les parts
      elle-même, en vue de leur annulation.
    </p>
    <p>
      La réalisation forcée qui ne procède pas d'un nantissement auquel les
      autres associés ont donné leur consentement doit pareillement être notifiée
      un mois avant la vente aux associés et à la société.
    </p>
    <p>
      Les associés peuvent, dans ce délai, décider la dissolution de la société
      ou l'acquisition des parts dans les conditions prévues aux articles 1862 et
      1863 du Code civil.
    </p>
    <p>
      Si la vente a eu lieu, les associés ou la société peuvent exercer la
      faculté de substitution qui leur est reconnue par l'article 1867 du Code
      civil. Le non-exercice de cette faculté emporte agrément de l'acquéreur.
    </p>
    <p>
      <u>Article 16 – Gérance</u>
    </p>
    <p>
      1 - La Société est administrée par un ou plusieurs gérants associés ou non,
      personnes physiques ou morales, désignés pour une durée déterminée ou non
      par décision collective ordinaire des associés représentant plus de la
      moitié du capital social.
    </p>
    <p>
      Le ou les premiers gérants sont nommés par les associés dans un acte séparé
      aussitôt après la signature des statuts.
    </p>
    <p>
      2 - Un gérant peut démissionner sans avoir à justifier sa décision à la
      condition de notifier celle-ci aux autres gérants ou, à défaut d'autre
      gérant, à chaque associé, par lettre recommandée avec avis de réception,
      trois mois au moins à l'avance.
    </p>
    <p>
      La démission n'est recevable en tout état de cause, si le gérant est
      unique, qu'accompagnée d'une convocation de l'assemblée des associés en vue
      de la nomination d'un ou plusieurs nouveaux gérants.
    </p>
    <p>
      Les associés peuvent mettre fin avant terme au mandat d'un gérant, par
      décision collective des associés représentant plus de la moitié des parts.
      La révocation peut également intervenir par voie de justice pour cause
      légitime.
    </p>
    <p>
      Tout gérant révoqué sans motif légitime a droit à des dommages et intérêts.
    </p>
    <p>
      La cessation du mandat social du gérant intervient de plein droit lorsqu’il
      est placé sous l’un des régimes de protection des personnes dites «
      protégées » ou lorsque s’ouvre un mandat de protection future, ou s’il est
      mis fin en faillite personnelle, frappé d’une interdiction de gérer,
      disparaît ou décède. Une assemblée générale devra être convoquée à
      l’initiative de tout associé.
    </p>
    <p>
      Si la Société se trouve dépourvue de gérant, tout associé peut réunir les
      associés ou, à défaut, demander au président du tribunal statuant sur
      requête la désignation d'un mandataire chargé de le faire, à seule fin de
      nommer un ou plusieurs gérants.
    </p>
    <p>
      La nomination et la cessation des fonctions du gérant donnent lieu à
      publication dans les conditions prévues par les dispositions légales et
      réglementaires.
    </p>
    <p>
      3 - Dans les rapports entre les associés, la gérance peut faire tous actes
      de gestion que demande l'intérêt de la Société. S'il y a plusieurs gérants,
      ils exercent séparément ces pouvoirs, sauf le droit qui appartient à chacun
      de s'opposer à une opération avant qu'elle ne soit conclue.
    </p>
    <p>
      Dans les rapports avec les tiers, le gérant engage la Société par les actes
      entrant dans l'objet social.
    </p>
    <p>
      L'opposition formée par un gérant aux actes d'un autre gérant est sans
      effet à l'égard des tiers, à moins qu'il ne soit établi qu'ils en ont eu
      connaissance.
    </p>
    <p>
      La signature sociale est donnée par l'apposition de la signature du ou des
      gérants, de l'un ou de plusieurs d'entre eux, précédée de la mention "Pour
      la société SCI xxxxxx", complétée par l'une des expressions suivantes : "Le
      gérant", "Un gérant" ou "Les gérants".
    </p>
    <p>
      4 - Chaque gérant est responsable individuellement envers la Société et
      envers les tiers, soit des infractions aux lois et règlements, soit de la
      violation des statuts, soit des fautes commises dans sa gestion.
    </p>
    <p>
      Si plusieurs gérants ont participé aux mêmes faits, leur responsabilité est
      solidaire à l'égard des tiers et des associés. Toutefois, dans leurs
      rapports entre eux, le tribunal détermine la part contributive de chacun
      dans la réparation du dommage.
    </p>
    <p>
      Si une personne morale exerce la gérance, ses dirigeants sont soumis aux
      mêmes conditions et obligations, et encourent les mêmes responsabilités
      civiles et pénales que s'ils étaient gérants en leur nom propre, sans
      préjudice de la responsabilité solidaire de la personne morale qu'ils
      dirigent.
    </p>
    <p>
      5 - Les gérants peuvent recevoir une rémunération, qui est fixée et peut
      être modifiée par une décision ordinaire des associés.
    </p>
    <p>
      Tout gérant a, par ailleurs, droit au remboursement de ses frais de
      déplacement et de représentation engagés dans l'intérêt de la Société, sur
      présentation de toutes pièces justificatives.
    </p>
    <p>
      <u>Article 17 – Décisions collectives</u>
    </p>
    <p>
      1 - Nature - Majorité
    </p>
    <p>
      Les décisions collectives des associés sont dites ordinaires ou
      extraordinaires.
    </p>
    <p>
      a) Sont de nature extraordinaire, toutes les décisions emportant
      modification, directe ou indirecte, des statuts ainsi que celles dont les
      présents statuts exigent expressément qu'elles revêtent une telle nature ou
      encore celles qui exigent d'être prises à une condition de majorité autre
      que celle visée ci-dessous.
    </p>
    <p>
      L'assemblée générale extraordinaire peut décider notamment :
    </p>
    <p>
      - l'augmentation ou la réduction du capital social ;
    </p>
    <p>
      - la prorogation de la Société ;
    </p>
    <p>
      - sa dissolution ;
    </p>
    <p>
      - sa transformation en société de toute autre forme.
    </p>
    <p>
      Les décisions extraordinaires doivent, pour être valables, être adoptées
      par un ou plusieurs associés représentant les deux tiers du capital social.
    </p>
    <p>
      b) Sont de nature ordinaire toutes décisions collectives qui ne sont pas
      dans le champ d'application des décisions de nature extraordinaire,
      notamment :
    </p>
    <p>
      - celles s'appliquant à l'approbation du rapport écrit d'ensemble des
      gérants sur l'activité de la société au cours de l'année civile écoulée (ou
      : de l'exercice écoulé) comportant l'indication des bénéfices réalisés ou
      des pertes encourues ;
    </p>
    <p>
      - celles s'appliquant à l'affectation et à la répartition des résultats.
    </p>
    <p>
      Les décisions de nature ordinaire doivent, pour être valables, être
      adoptées par un ou plusieurs associés représentant plus de la moitié du
      capital social.
    </p>
    <p>
      2 - Modalités
    </p>
    <p>
      Les décisions collectives des associés s'expriment, soit par la
      participation de tous les associés à un même acte, authentique ou sous
      signature privée, soit en assemblée. Elles peuvent aussi résulter d'une
      consultation par correspondance.
    </p>
    <p>
      Les assemblées générales ordinaires ou extraordinaires sont convoquées par
      le gérant.
    </p>
    <p>
      Les associés sont convoqués quinze jours au moins avant la réunion de
      l'assemblée par lettre recommandée. La lettre contient indication de
      l'ordre du jour de telle sorte que le contenu et la portée des questions
      qui y sont inscrites apparaissent clairement sans qu'il y ait lieu de se
      reporter à d'autres documents. La convocation peut être verbale, et
      l'assemblée réunie sans délai si tous les associés sont présents ou
      représentés.
    </p>
    <p>
      Dès la convocation, le texte du projet de résolutions proposées et tout
      document nécessaire à l'information des associés sont tenus à leur
      disposition au siège social où ils peuvent en prendre connaissance ou
      copie. Les associés peuvent demander que ces documents leur soient adressés
      soit par simple lettre, soit à leurs frais par lettre recommandée.
    </p>
    <p>
      Lorsque l'ordre du jour porte sur la reddition de compte, la communication
      desdites pièces et documents a lieu dans les conditions relatées à
      l'article ci-après.
    </p>
    <p>
      Un associé non gérant peut à tout moment, par lettre recommandée, demander
      au gérant de provoquer une délibération des associés sur une question
      déterminée. Si le gérant fait droit à la demande, il procède à la
      convocation des associés ou à leur consultation par écrit. Si le gérant
      s'oppose à la demande ou garde le silence, l'associé demandeur peut, à
      l'expiration d'un délai d'un mois à dater de sa demande, solliciter du
      président du tribunal judiciaire, statuant en la forme des référés, la
      désignation d'un mandataire chargé de provoquer la délibération des
      associés.
    </p>
    <p>
      Chaque associé a le droit de participer aux décisions collectives et
      dispose d'un nombre de voix égal à celui des parts qu'il possède. Chaque
      associé peut se faire représenter aux assemblées par son conjoint ou par un
      autre associé justifiant de son pouvoir.
    </p>
    <p>
      La délibération ne peut porter sur aucun autre objet que ceux visés dans
      l'ordre du jour.
    </p>
    <p>
      L'assemblée est réunie au siège social ou en tout autre endroit indiqué
      dans la convocation.
    </p>
    <p>
      Elle est présidée par le gérant ou, s'il n'est pas associé, par l'associé
      présent et acceptant qui possède ou représente le plus grand nombre de
      parts sociales.
    </p>
    <p>
      L'assemblée peut désigner un secrétaire qui peut être pris en dehors des
      associés.
    </p>
    <p>
      Les délibérations de l'assemblée sont constatées par des procès-verbaux
      transcrits sur un registre spécial et signés par le gérant et, le cas
      échéant, par le président de séance. S'il n'est pas établi de feuille de
      présence, les procès-verbaux sont en outre signés par tous les associés
      présents et par les mandataires.
    </p>
    <p>
      La détermination, même à l'égard des tiers, des membres de l'assemblée,
      peut résulter de la simple indication de leur nom au procès-verbal.
    </p>
    <p>
      <u>Article 18 – Conventions réglementées</u>
    </p>
    <p>
      La gérance, ou, s'il en existe un, le Commissaire aux Comptes, doit
      présenter à l'Assemblée Générale Annuelle un rapport sur les conventions
      passées directement ou par personne interposée entre la Société et l'un de
      ses gérants.
    </p>
    <p>
      Ce rapport doit également mentionner les conventions passées entre la
      Société et une société dans laquelle la gérance est associée indéfiniment
      responsable, gérant, administrateur, directeur général, directeur général
      délégué, membre du directoire ou du conseil de surveillance, ou actionnaire
      disposant d’une fraction des droits de vote supérieure à 10 %.
    </p>
    <p>
      L'Assemblée Générale Annuelle statue sur ce rapport dont le contenu doit
      être conforme aux dispositions réglementaires, étant précisé que le gérant
      associé intéressé peut prendre part au vote et que ses parts sont prises en
      compte pour le calcul de la majorité.
    </p>
    <p>
      Les dispositions qui précèdent ne sont pas applicables aux conventions
      portant sur les opérations courantes de la Société et conclues à des
      conditions normales qui, en raison de leur objet ou de leurs implications
      financières, ne sont significatives pour aucune des parties.
    </p>
    <p>
      <u>Article 19 – Commissaire aux comptes</u>
    </p>
    <p>
      Les associés peuvent ou, lorsque les conditions légales sont réunies,
      doivent, nommer par décision ordinaire un ou plusieurs Commissaires aux
      Comptes.
    </p>
    <p>
      En dehors des cas prévus par la loi, la nomination d'un Commissaire aux
      comptes peut être décidée par décision ordinaire des associés. Elle peut
      aussi être demandée en justice par un ou plusieurs associés représentant au
      moins le dixième du capital.
    </p>
    <p>
      Lorsqu'un Commissaire aux Comptes ainsi désigné est une personne physique
      ou une société unipersonnelle, un Commissaire aux Comptes suppléant appelé
      à remplacer le ou les titulaires en cas de refus, d'empêchement, de
      démission ou de décès, est nommé en même temps que le titulaire pour la
      même durée.
    </p>
    <p>
      Les Commissaires aux Comptes exerceront leur mission dans les conditions et
      avec les effets prévus par les dispositions législatives et réglementaires
      en vigueur.
    </p>
    <p>
      <u>Article 20 – Exercice social – Comptes sociaux</u>
    </p>
    <p>
      Chaque exercice social a une durée d'une année, qui commence le 1    <sup>er</sup> xxxxx et finit le 31 xxxxxxx.
    </p>
    <p>
      Par exception, le premier exercice commencera le jour de l'immatriculation
      de la Société au Registre du commerce et des sociétés et se terminera le 31
      xxxxxxxx.
    </p>
    <p>
      Les écritures de la Société sont tenues selon les normes du plan comptable
      national ainsi que, s'il en existe, du plan comptable particulier à
      l'activité définie dans l'objet social.
    </p>
    <p>
      A la clôture de chaque exercice, la gérance dresse un inventaire contenant
      l'indication des divers éléments de l'actif et du passif de la Société, un
      bilan et un compte de résultat récapitulant les produits et charges de
      l'exercice, ainsi que le cas échéant, une annexe complétant et commentant
      l'information donnée par le bilan et le compte de résultat.
    </p>
    <p>
      Il est tenu un livre-journal où sont inscrites jour après jour les recettes
      et les dépenses.
    </p>
    <p>
      Par ailleurs, est tenu constamment à jour un état complet des emprunts
      apportant toutes précisions sur les sûretés les accompagnant et l'état de
      leur remboursement.
    </p>
    <p>
      En outre, est dressé un tableau des immobilisations et des amortissements.
    </p>
    <p>
      Sont portés comme recettes les divers encaissements résultant de l'activité
      de la Société, y compris les cessions d'éléments d'actif et les emprunts.
    </p>
    <p>
      Sont portés comme dépenses les divers versements, les acquisitions
      d'éléments d'actif et les remboursements d'emprunt.
    </p>
    <p>
      La différence relevée entre les recettes et les dépenses constitue
      l'excédent ou le déficit de la période de référence.
    </p>
    <p>
      Au moins une fois par an, le gérant rend compte de sa gestion aux associés
      et leur présente un rapport sur l'activité de la Société au cours de
      l'exercice écoulé comportant l'indication des bénéfices réalisés ou
      prévisibles et des pertes encourues ou prévues.
    </p>
    <p>
      Ce rapport, le texte des résolutions proposées et tous autres documents
      nécessaires à l'information des associés sont adressés à chacun d'eux par
      lettre simple quinze jours au moins avant la réunion de l'Assemblée. Ces
      mêmes documents sont pendant ce délai, tenus à la disposition des associés
      au siège social où ils peuvent en prendre connaissance ou copie.
    </p>
    <p>
      <u>Article 21 – Affectation et répartition des résultats</u>
    </p>
    <p>
      Le bénéfice net de l'exercice est déterminé, pour chaque exercice,
      déduction faite des frais généraux et autres charges de la Société, y
      compris les éventuels amortissements et provisions nécessaires.
    </p>
    <p>
      Le bénéfice distribuable est constitué par le bénéfice net de l'exercice
      diminué des pertes antérieures et augmenté des reports bénéficiaires.
    </p>
    <p>
      Ce bénéfice est réparti entre les associés, proportionnellement au nombre
      de parts appartenant à chacun d'eux. Il est inscrit à leur crédit dans les
      livres sociaux, ou versé effectivement à la date fixée, soit par les
      associés, soit, à défaut, par la gérance.
    </p>
    <p>
      Toutefois, les associés peuvent décider qu'une partie ou la totalité du
      bénéfice sera reportée à nouveau ou affectée à toutes réserves générales ou
      spéciales qu'ils auront créées.
    </p>
    <p>
      Les pertes, s'il en existe, sont, selon la décision de l'assemblée
      générale, supportées par chaque associé à proportion de ses droits dans le
      capital ou imputées sur le compte "report à nouveau" créditeur puis sur les
      réserves, le solde, s'il y a lieu, étant inscrit au compte "report à
      nouveau" pour être imputé sur les bénéfices ultérieurs et/ou directement
      pris en charge par les associés dans la proportion de leurs droits sociaux
    </p>
    <p>
      <u>Article 22 – Transformation de la société</u>
    </p>
    <p>
      La décision de transformation de la Société en une société en nom
      collectif, en commandite simple ou par actions, ou en GIE sera prise à
      l'unanimité des associés réunis en assemblée.
    </p>
    <p>
      La transformation de la Société soit en société civile d'un type
      particulier, soit en société à responsabilité limitée ou en société anonyme
      sera prononcée dans les conditions de majorité des décisions
      extraordinaires.
    </p>
    <p>
      La transformation de la Société n'entraîne pas la création d'une personne
      morale nouvelle.
    </p>
    <p>
      <u>Article 23 – Dissolution</u>
    </p>
    <p>
      1 - La Société prend fin à l'expiration du terme fixé par les statuts ou
      pour toute autre cause prévue par l'article 1844-7 du Code civil, et
      notamment par la dissolution anticipée décidée par les associés à la
      majorité prévue pour les modifications statutaires.
    </p>
    <p>
      Dans le cas où la Société est dépourvue de gérant depuis plus d'un an, tout
      intéressé peut demander au tribunal la dissolution anticipée de la Société.
    </p>
    <p>
      Un an au moins avant l'expiration de la Société, les associés, statuant en
      assemblée dans les conditions de majorité des décisions extraordinaires,
      doivent être consultés à l'effet de décider de la prorogation de la
      Société.
    </p>
    <p>
      2 - La réunion de toutes les parts en une seule main n'entraîne pas la
      dissolution de plein droit de la Société. Tout intéressé peut demander
      cette dissolution si la situation n'a pas été régularisée dans le délai
      d'un an.
    </p>
    <p>
      La dissolution, de la Société devenue unipersonnelle entraîne, si l'associé
      unique est une personne morale, la transmission universelle du patrimoine
      de la Société à l'associé unique, sans qu'il y ait lieu à liquidation, sous
      réserve du droit d'opposition des créanciers, conformément aux dispositions
      de l'article 1844-5 du Code civil.
    </p>
    <p>
      L'appartenance de l'usufruit de toutes les parts sociales à une même
      personne est sans conséquence sur l'existence de la Société.
    </p>
    <p>
      <u>Article 24 – Liquidation</u>
    </p>
    <p>
      La dissolution de la Société entraîne sa liquidation. La personnalité
      morale de la Société subsiste pour les besoins de la liquidation jusqu'à la
      publication de la clôture de celle-ci.
    </p>
    <p>
      Pendant la durée de la liquidation, la dénomination de la Société suivie de
      la mention "société en liquidation", puis du nom du ou des liquidateurs,
      doit figurer sur tous actes et documents émanant de la Société et destinés
      aux tiers.
    </p>
    <p>
      La collectivité des associés nomme un liquidateur, qui peut être le gérant,
      à la majorité simple des voix ; elle fixe ses pouvoirs et sa rémunération.
    </p>
    <p>
      Le liquidateur dispose des pouvoirs les plus étendus, et notamment celui de
      pouvoir réaliser l'actif, même à l'amiable, afin de parvenir à l'entière
      liquidation de la Société. Il peut être autorisé par les associés à
      continuer les affaires en cours où à faire entreprendre de nouvelles
      activités par la Société, pour les besoins de la liquidation.
    </p>
    <p>
      Le liquidateur rend compte, une fois par an, de l'accomplissement de sa
      mission aux associés réunis en assemblée. La décision de clôture de la
      liquidation est prise par les associés après approbation des comptes
      définitifs de liquidation.
    </p>
    <p>
      Si la clôture de la liquidation n'est pas intervenue dans un délai de trois
      ans à compter de la dissolution, le ministère public ou tout intéressé peut
      saisir le tribunal qui fait procéder à la liquidation, ou si celle-ci a été
      commencée, à son achèvement.
    </p>
    <p>
      Après paiement des dettes et remboursement du capital social, le partage de
      l'actif est effectué entre les associés dans les mêmes proportions que leur
      participation aux bénéfices. Les règles concernant le partage des
      successions y compris l'attribution préférentielle s'appliquent au partage
      entre associés.
    </p>
    <p>
      Tout bien apporté qui se retrouve en nature dans la masse partagée est
      attribué, sur sa demande, et à charge de soulte s’il y a lieu, à l’associé
      qui en avait fait l’apport. Cette faculté s’exerce avant tout autre droit à
      une attribution préférentielle.
    </p>
    <p>
      Tous les associés, ou certains d'entre eux seulement, peuvent aussi
      demeurer dans l'indivision pour tout ou partie des biens sociaux. Leurs
      rapports sont alors régis, à la clôture de la liquidation, en ce qui
      concerne ces biens, par les dispositions relatives à l'indivision.
    </p>
    <p>
      <u>Article 25 – Contestations</u>
    </p>
    <p>
      Toutes les contestations qui pourraient surgir pendant la durée de la
      Société ou lors de sa liquidation entre les associés ou entre la Société et
      les associés, relativement aux affaires sociales ou à l'exécution des
      présents statuts, seront soumises aux tribunaux compétents.
    </p>
    <p>
      <u></u>
    </p>
    <p>
      <u>Article 26 – Publicité – Pouvoirs</u>
    </p>
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
      L'immatriculation de la Société au Registre du commerce et des sociétés
      emportera, de plein droit, reprise par elle desdits engagements.
    </p>
    <p>
      <em>
        <u>
          Article 27 – Option pour l’impôt sur les sociétés (si choix IS
          avant de signer)
        </u>
      </em>
      <em> <u></u></em>
    </p>
    <p>
      <em> </em>
    </p>
    <p>
      <em>
        Conformément aux dispositions de l'article 206, 3 du Code général des
        impôts, les associés déclarent opter pour l'impôt sur les sociétés.
      </em>
    </p>
    <p>
      <em> </em>
    </p>
    <p>
      <em>
        Ils sont avertis que cette option devra être notifiée au service des
        impôts au plus tard avant la fin du troisième mois du premier exercice
        social, la notification pouvant être réalisée lors de l'immatriculation
        de la Société auprès du centre de formalités des entreprises par le
        biais du formulaire M0.
      </em>
    </p>
    <p>
      <em> </em>
    </p>
    <p>
      <em>
        Ils ont également été informés des dispositions de l'alinéa 3 du 1 de
        l'article 239 du Code général des impôts aux termes desquelles la
        Société qui désire renoncer à son option pour le régime des sociétés de
        capitaux notifie son choix à l'administration avant la fin du mois
        précédant la date limite de versement du premier acompte d'impôt sur
        les sociétés de l'exercice au titre duquel s'applique la renonciation à
        l'option. En cas de renonciation à l'option, la Société ne peut plus
        opter à nouveau pour le régime des sociétés de capitaux. En l'absence
        de renonciation avant la fin du mois précédant la date limite de
        versement du premier acompte d'impôt sur les sociétés du cinquième
        exercice suivant celui au titre duquel l'option a été exercée, l'option
        devient irrévocable.
      </em>
    </p>
    <p>
      <em> </em>
    </p>
    <p>
      <em>
        Il est en outre précisé que les sociétés soumises à l'impôt sur les
        sociétés sont tenues de recourir aux téléprocédures fiscales, et ce
        quel que soit leur chiffre d'affaires.
      </em>
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

<style lang="scss" scoped>
p {
  u {
    font-weight: bold;
  }
}
</style>
