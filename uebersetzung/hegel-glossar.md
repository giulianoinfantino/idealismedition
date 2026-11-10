# Hegel glossary for the English translation (draft 1, 9 Nov 2026)

Scope: the 16 GW volumes in the portal corpus (GW 1, 3, 4, 5, 6, 7, 8, 9, 11, 12, 15, 17, 18, 19, 20, 21; ≈ 1.92 M words).
Not yet covered: GW 13, 14 (Philosophy of Right), 16.

**Status:** proposal. Rows marked ⚑ need a decision (section 1). All other rows are the default unless you object.

## 0. Principles (proposal)

1. **Follow the Cambridge Hegel Translations.** di Giovanni (*Science of Logic*, 2010), Pinkard (*Phenomenology*, 2018) and
   Brinkmann/Dahlstrom (*Encyclopedia Logic*, 2010) are what current anglophone scholarship cites. Where they agree,
   we follow them without discussion.
2. **One rendering per term across all volumes**, so that a term found in GW 9 can be found again in GW 12 and GW 20.
   Where the Cambridge translators disagree with each other, we pick one (section 1). We do not switch by work.
3. **No neologisms of our own.** Use only renderings that already exist in the established translations.
4. **The German stays recoverable.** In the reader every glossary term can carry its German lemma in the markup (tooltip
   or parallel view), so distinctions English cannot make (Gegenstand/Objekt, Unterschied/Differenz,
   Gleichgültigkeit/Indifferenz, ideell/ideal, reell/real) are kept in the data instead of in brackets in the text.
5. **Context senses are listed explicitly** (e.g. Bestimmung = "vocation" in the Fichte sense). The translator may use only
   the senses listed. Any other choice is logged as a query.

Sources and abbreviations (section 3): **dG** di Giovanni · **P** Pinkard · **BD** Brinkmann/Dahlstrom · **I** Inwood
(*Philosophy of Mind*, 2007) · **M** Miller. ✓ = checked against the translation itself (local PDF, translator's note or
glossary). Unmarked attributions to Miller's PhG/SL are from memory.

---

## 1. Decisions for you

| # | Term(s) | Options | Recommendation |
|---|---|---|---|
| D1 | **Dasein / Existenz** (2 446 / 1 082) | (a) *existence* / *concrete existence*: dG ✓, BD ✓ · (b) *determinate being* / *existence*: M, Houlgate · (c) both *existence*: P ✓ | **(a)**. Both Cambridge Logic translations agree, and it handles *Daseiendes* and *das Seiende*. |
| D2 | **Beziehung / Verhältnis** (3 480 / 3 482) | (a) *relation* / *relationship*: BD ✓ · (b) *connection, reference* / *relation*: dG ✓ (after Burbidge/di Giovanni, *Jena System*) · (c) both *relation*: P ✓ | **(a)**. It keeps "self-relation" and "self-relating negativity", the phrasing the literature uses. *Verhältnis* = *ratio* in quantitative contexts (dG ✓, BD ✓). |
| D3 | **Gegenstand / Objekt** (2 097 / 1 790) | (a) both *object*, distinguished in the markup: P ✓, BD ✓ (flagged) · (b) *subject matter* / *object*: dG ✓ | **(a)**. "Subject matter" does not work in the PhG ("the object of consciousness"). |
| D4 | **Einzelheit, einzeln, das Einzelne** (920) | (a) *singularity, singular*; *Individuum* = *individual*: dG ✓, P ✓ ("singular individual") · (b) *individuality, individual*: BD, I | **(a)**. It is now standard in the literature on the doctrine of the concept and keeps *Individuum* free. |
| D5 | **Capitalization** | (a) all lowercase (*spirit, concept, idea, absolute*): BD ✓, dG ✓ · (b) lowercase, except *Idea*: P ✓, I ✓ · (c) Miller-style capitals | **(b)**. "the Idea" is how the secondary literature writes it and separates *Idee* from everyday "idea". |
| D6 | **an ihm (selbst)** (1 128) | (a) *in its own self*: P ✓ ("widespread convention", dG) · (b) *in it*, *within it*, dropping *selbst*: dG ✓ | **(a)**. It keeps *an sich* / *an ihm* visibly apart in every passage, which matters more in machine translation than elegance. |
| D7 | **Entäußerung / Entfremdung** (88 / 92) | (a) *externalization* / *alienation*: M, most of the literature · (b) *relinquishment* / *alienation*: P ✓ (84× "relinquish") | **(a)**, with a translator's note on the kenosis sense. P's choice is defensible but has not caught on. |
| D8 | **die Sache selbst** (162) | (a) *the matter itself* · (b) *the crux of the matter*: P ✓ · (c) *the thing itself* · (d) *the heart of the matter* | **(a)**. It keeps the link to *Sache* = *matter* and avoids confusion with Kant's thing in itself. |
| D9 | **Herr / Knecht, Herrschaft / Knechtschaft** | (a) *master / servant*, *mastery / servitude*: P ✓ · (b) *lord / bondsman*: M · (c) *master / slave*: Kojève tradition | **(a)** |
| D10 | **Schein / scheinen** (489 / 727) | (a) *shine* in the Logic of Essence (dG ✓, BD ✓), otherwise *semblance / seem* (P ✓) · (b) *semblance* throughout · (c) *illusory being*: M | **(a)**. The rule is context-bound: doctrine of essence (GW 11 from p. 241; Enc. from § 112) and where the doctrine of the idea takes it up again (Enc. §§ 240 ff., per BD ✓). |
| D11 | **selbständig, Selbständigkeit** | (a) *self-sufficient*: P ✓, BD · (b) *self-subsistent*: dG ✓, M (SL) · (c) *independent*: M (PhG) | **(a)**, uniformly. |
| D12 | **Entzweiung** (25) | (a) *diremption*: dG ✓, I ✓, BD ✓ · (b) *estrangement*: P ✓ · (c) *bifurcation*: Harris/Cerf (unchecked), BD once | **(a)** |
| D13 | **Reflexion-in-sich / in Anderes** (316) | (a) *reflection-into-itself / into-another*: M, Geraets et al., most of the literature · (b) *reflection-in-itself*: BD ✓ · (c) *immanent reflection*: dG ✓ | **(a)** |
| D14 | **Gehalt** (242) | (a) *import* · (b) *basic content*: BD ✓ · (c) *content* (merged with *Inhalt*): P ✓ | **(b)**. It keeps *Inhalt* = *content* unambiguous. |
| D15 | **Spelling** | American (Pinkard, Cambridge US) · British (Inwood, Oxford) | Check what the portal's English pages use and match it. |

---

## 2. Glossary

Columns: German · occurrences in the 16 volumes · rendering · established translations · notes.

### A. Basic operations and reflexive phrases

| German | n | English | Established | Notes |
|---|---|---|---|---|
| aufheben, Aufhebung, das Aufheben | 2 596 / 828 | sublate, sublation | dG ✓ P ✓ BD ✓ M | No alternatives. Translator's note on the two senses (and the third, "raise up", which P leaves open). |
| Moment | 3 652 | moment | all ✓ | In the technical sense never "aspect" or "factor". |
| setzen, gesetzt | 4 768 | posit, posited | P ✓ dG ✓ | |
| Gesetztsein | 434 | positedness | dG ✓ BD ✓ M | |
| voraussetzen, Voraussetzung | 649 | presuppose, presupposition | all | |
| an sich, Ansich, Ansichsein | 2 566 / 334 | in itself, the in-itself, being-in-itself | dG ✓ P ✓ BD ✓ | **Never** "implicit(ly)" (dG allows it; P rejects it ✓). Hyphenate the noun forms. |
| für sich, Fürsichsein | 3 537 / 707 | for itself, being-for-itself | dG ✓ P ✓ BD ✓ | Colloquial "on its own" only with a note (P's practice ✓). Never "explicit(ly)". |
| an und für sich | 851 | in and for itself | all | |
| an ihm (selbst) | 1 128 | ⚑ D6 | | |
| in sich | | within itself | P ✓ | Keeps it apart from *an sich*. |
| Insichsein, In-sich-gehen | 153 | being-within-itself; going-into-itself | P "inwardly turned being", "take the inward turn" ✓ | P's forms are elegant but non-standard. |
| bei sich (selbst) | 47 | at home with itself / with itself | P "at one with itself" ✓ | "being with oneself in an other" (freedom formula) is the established phrasing. |
| Rückkehr in sich | 377 | return into itself | | |
| Sein-für-Anderes | 81 | being-for-other | dG ✓ (39×) | |
| Anderssein | 598 | otherness | P ✓ dG | |
| das Andere, ein Anderes | 515 | the other, an other | | |
| unmittelbar, Unmittelbarkeit | 4 504 / 1 014 | immediate, immediacy | all ✓ | |
| vermitteln, Vermittlung | 492 / 771 | mediate, mediation | all ✓ | |
| Bestimmung | 4 593 | determination | dG ✓ P ✓ | Context sense **vocation / destiny** (*Bestimmung des Menschen*): P ✓ "destiny", BD ✓ "vocation". |
| Bestimmtheit | 4 169 | determinateness | all ✓ | |
| bestimmt, bestimmen | 4 282 | determinate, determine | P ✓ | "definite" only in non-technical use. |
| Beziehung, sich beziehen | 3 480 | ⚑ D2 | | |
| Verhältnis, sich verhalten | 3 482 | ⚑ D2 | | *sich verhalten* (to behave) = *comport itself* where behavior is meant (dG ✓). |
| Negation, Negativität, das Negative | 1 267 / 564 / 352 | negation, negativity, the negative | all | |
| Einheit, Totalität | 4 726 / 1 476 | unity, totality | all | |
| Bewegung | 2 438 | movement | P ✓ | Not "motion", except in the philosophy of nature. |
| Ruhe, ruhend | | rest, at rest, motionless | P ✓ | P keeps the contrast with *Bewegung* visible. |
| Übergehen, Übergang | 831 | passing over, transition | | |
| Entwicklung | 486 | development | all | |
| Resultat, Anfang | 658 / 786 | result, beginning | | |
| gleichgültig, Gleichgültigkeit | 1 775 | indifferent, indifference | all | Markup distinguishes it from *Indifferenz* (H). |
| zugrunde gehen | | founder, go to the ground | dG ✓ "founder" | Only where Hegel plays on *Grund*, otherwise "perish". |

### B. Doctrine of being

| German | n | English | Established | Notes |
|---|---|---|---|---|
| Sein, das Seiende | 4 123 | being, what is / the existent | P ✓ ("existent") | |
| Nichts | | nothing | | |
| Werden; Entstehen, Vergehen | 550 / 117 / 114 | becoming; coming-to-be, ceasing-to-be | P ✓ (Werden also "coming-to-be") | |
| Dasein, Daseiendes | 2 446 | ⚑ D1 | | In Enc. III, I renders it "reality, embodiment" ✓. We do not follow him there. |
| Qualität, Realität | 672 / 1 412 | quality, reality | | |
| Etwas, Anderes | 97 | something, other | dG | |
| Beschaffenheit | 264 | constitution | dG, M | |
| Grenze, Schranke, Sollen | 593 / 276 / 213 | limit, limitation, ought | dG M BD | |
| Endlichkeit, das Endliche | 2 604 | finitude, the finite | | |
| Unendlichkeit | 4 089 | infinity | | |
| schlechte Unendlichkeit | 69 | bad infinity | dG ✓ (30×) BD ✓ | Not "spurious" (M). |
| Eins, Vieles | 1 420 / 448 | one, many | | |
| Repulsion, Attraktion | 204 / 127 | repulsion, attraction | | |
| Idealität, ideell | 1 218 | ideality, ideal | BD ✓ M | dG's "idealization" ✓ is idiosyncratic. Markup flags *ideell*. |
| reell | 418 | real | | Markup distinguishes it from *real*. |
| Quantität, Quantum, Größe | 1 483 / 1 085 | quantity, quantum, magnitude | dG ✓ | |
| Zahl, Grad | 418 / 218 | number, degree | | |
| Verhältnis (quantitativ) | | ratio | dG ✓ BD ✓ | |
| Maß | 389 | measure | | |

### C. Doctrine of essence

| German | n | English | Established | Notes |
|---|---|---|---|---|
| Wesen | 3 429 | essence | all ✓ | Context sense **being / creature** (*das höchste Wesen* = the supreme being): P ✓ BD ✓. |
| wesentlich, Wesenheit | 1 986 / 167 | essential, essentiality | | |
| Schein, scheinen | 489 / 727 | ⚑ D10 | | |
| Reflexion | 2 091 | reflection | | |
| Reflexion-in-sich | 316 | ⚑ D13 | | |
| Identität | 1 816 | identity | | |
| Unterschied | 2 546 | difference (distinction where the difference is *in dictu*) | dG ✓ BD ✓ P ✓ | |
| Differenz | 717 | difference | BD ✓ (flagged) | dG's "non-indifference" ✓ was not adopted by later translators. Markup distinguishes it. |
| Verschiedenheit | 487 | diversity | dG ✓ | |
| Gegensatz, entgegensetzen | 1 969 | opposition, oppose | P ✓ | |
| Widerspruch | 813 | contradiction | | |
| Grund, Begründetes | 2 108 | ground, grounded | | |
| Existenz | 1 082 | ⚑ D1 | | "the existence of God" stays as it is (dG ✓). |
| Ding, Eigenschaft, Materie | 1 777 / 353 / 1 163 | thing, property, matter | | |
| Ding an sich | 57 | thing in itself | | |
| Erscheinung, erscheinen | 1 107 | appearance, appear | all ✓ | |
| Inhalt, Form | 3 095 / 4 129 | content, form | | |
| Gehalt | 242 | ⚑ D14 | | |
| das Ganze, die Teile | 814 / 1 586 | the whole, the parts | | |
| Kraft, Äußerung | 684 / 173 | force, expression | P ✓ | "Force and the Understanding" (PhG III). |
| das Innere, das Äußere | 83 / 42 | the inner, the outer | | |
| Wirklichkeit, wirklich | 1 762 / 1 218 | actuality, actual | all ✓ | *unwirklich* = non-actual (P ✓). *Wirksamkeit* = effectiveness (P ✓). |
| Möglichkeit, Notwendigkeit, Zufälligkeit | 812 / 1 438 / 1 085 | possibility, necessity, contingency | | |
| Substanz, Akzidenz | 1 523 / 89 | substance, accident | | |
| Kausalität, Ursache, Wirkung | 171 | causality, cause, effect | | |
| Wechselwirkung | 84 | reciprocal action | M | Also "reciprocity". Decide which is the main form when the logic volumes come up. |
| Sache | 1 106 | matter (as a category: **fact**, dG ✓) | P ✓ ("subject matter, fact"), BD ✓ ("basic matter") | |

### D. Doctrine of the concept and the idea

| German | n | English | Established | Notes |
|---|---|---|---|---|
| Begriff | 6 079 | concept | dG ✓ P ✓ BD ✓ I ✓ | **Never** "Notion" (M ✓, Wallace). |
| begreifen, Begreifen | 626 | comprehend, conceptually comprehend; comprehension | P ✓ dG ✓ | |
| begriffslos | | concept-less / thoughtless | | |
| Allgemeinheit, allgemein | 1 676 / 3 821 | universality, universal | all ✓ | |
| Besonderheit, besonder | 865 | particularity, particular | all ✓ | |
| Einzelheit, einzeln | 920 | ⚑ D4 | | |
| Individuum, Individualität | | individual, individuality | dG ✓ P ✓ | |
| Urteil | 1 107 | judgment | | |
| Schluss, schließen | 913 | syllogism, infer | dG ✓ BD ✓ | *zusammenschließen* = join together with (BD ✓). Note on the lost word play. |
| Subjekt, Subjektivität | 2 716 | subject, subjectivity | | |
| Objekt, Objektivität | 1 790 | object, objectivity | | ⚑ D3 for Gegenstand. |
| Mechanismus, Chemismus, Teleologie | 125 / 60 / 24 | mechanism, chemism, teleology | | |
| Zweck, zweckmäßig | 1 662 | purpose, purposive | dG ✓ P ✓ BD ✓ | "end" only in fixed phrases (*Endzweck* = final end). |
| Idee | 1 932 | idea / Idea | ⚑ D5 | |
| Leben, lebendig | 1 353 / 892 | life, living | | |
| Gattung, Art | 686 / 266 | genus, species | P M | *Gattungsprozess* = genus-process. |
| Trieb | 349 | drive | dG | "impulse" in the anthropology, where context requires it. |
| Erkennen, Erkenntnis | 1 899 | cognition, cognize | dG ✓ P ✓ | BD ✓ merges it with *Wissen* ("knowing"). We do not. |
| Methode, Dialektik, spekulativ | 268 / 485 | method, dialectic, speculative | | |

### E. Consciousness and cognition (PhG, subjective spirit)

| German | n | English | Established | Notes |
|---|---|---|---|---|
| Bewusstsein, Selbstbewusstsein | 3 687 / 1 018 | consciousness, self-consciousness | all ✓ | *zum Bewusstsein kommen* = come to consciousness (literal, P ✓). |
| sinnliche Gewissheit, Gewissheit | 532 | sense-certainty, certainty | P ✓ | |
| das Diese, Meinen | 378 / 142 | the this, meaning (*das Meinen*: opining/meaning) | | Note on the pun *meinen/mein*. |
| Wahrnehmung | 191 | perception | | |
| Verstand, verständig | 1 251 / 158 | the understanding, of the understanding | dG P ✓ BD | I's "intellect" ✓ not adopted. |
| Vernunft, vernünftig | 1 664 / 373 | reason, rational | all | |
| verkehrte Welt, Verkehrung | 168 | inverted world, inversion | P ✓ | |
| Begierde | 210 | desire | | |
| Anerkennung, anerkennen | 265 | recognition, recognize | P ✓ | |
| Herr, Knecht | 450 / 99 | ⚑ D9 | | |
| unglückliches Bewusstsein | 11 | unhappy consciousness | P ✓ | |
| Gestalt, Gestaltung | 1 555 | shape, shaping | P ✓ | "shapes of consciousness" |
| Erfahrung | 601 | experience | | |
| Wissen, wissen | 1 459 | knowing, knowledge, know | P ✓ dG ✓ | *absolutes Wissen* = absolute knowing. |
| Wahrheit, das Wahre | 2 264 | truth, the true | | |
| Denken, Gedanke | 1 813 / 1 525 | thinking, thought | | |
| Anschauung, anschauen | 996 | intuition, intuit | P ✓ dG | *intellektuelle Anschauung* = intellectual intuition. |
| Vorstellung, vorstellen | 2 125 / 223 | representation, represent | P ✓ dG ✓ I ✓ BD ✓ | Opposed to *Begriff*: "representational thought" (P ✓). Not "picture-thinking" (M). |
| Gefühl, Empfindung | 789 / 728 | feeling, sensation | | |
| Einbildungskraft | 182 | imagination | | |
| Erinnerung, Er-innerung | 118 | recollection, inwardizing | | |
| Intelligenz | 321 | intelligence | | |
| Seele | 827 | soul | | |
| Sinnlichkeit, sinnlich | 1 076 | sensibility, sensuous/sensory | | |
| Räsonnement, räsonieren | 108 | argumentation (merely clever argumentation) | P ✓ | |
| Darstellung, darstellen | 502 | presentation, exposition; present | P ✓ | |
| Bildung, gebildet | 478 | cultural formation, culturally formed | P ✓ | "education" in school contexts (GW 10, GW 15 speeches). |
| Selbst (das) | 272 | the self | | |
| Ich (das) | 349 | the I | P ✓ | Not "the ego" (except in the Fichte critique, where Fichte translations use it: *Nicht-Ich* = not-I). |

### F. Objective and absolute spirit

| German | n | English | Established | Notes |
|---|---|---|---|---|
| Geist, geistig | 3 747 / 501 | spirit, spiritual | dG ✓ P ✓ BD ✓ | I's "mind" ✓ (1 308×) not adopted. *Weltgeist* = world spirit, *Volksgeist* = spirit of a people. |
| Wille, Willkür | 1 063 / 275 | will, arbitrary will / free choice | P ✓ | |
| Freiheit | 421 | freedom | | |
| Recht | 1 464 | right (law where the legal order is meant) | P ✓ | |
| Sittlichkeit, sittlich, Sitte | 921 | ethical life, ethical, custom/mores | P ✓ | |
| Moralität | 269 | morality | P ✓ | |
| Gewissen, Gesinnung | 169 / 127 | conscience, disposition | P ✓ | |
| Tun, Tat, Handlung, Handeln | 590 / 1 010 / 616 | doing, deed, action, acting | P ✓ | |
| Arbeit, Genuss, Bedürfnis | 545 / 280 | labor, enjoyment, need | P ✓ | |
| Staat, Volk, Stand | 1 321 / 933 | state, people/nation, estate | P ✓ | |
| Gemeinwesen, Gemeinde | 178 | polity, community/congregation | P ✓ | |
| Entäußerung, Entfremdung | 88 / 92 | ⚑ D7 | | |
| Glauben, Aufklärung, Einsicht | 1 074 / 127 / 371 | faith, Enlightenment, insight | P ✓ | *reine Einsicht* = pure insight. |
| Verstellung, schöne Seele, Verzeihung | | dissemblance, beautiful soul, forgiveness | P ✓ | |
| Religion, Offenbarung | 1 646 / 263 | religion, revelation | | *offenbare Religion* = revealed religion (P ✓). *geoffenbarte Religion* = revealed religion. |
| Andacht | 40 | devotion | | |
| Versöhnung | 210 | reconciliation | | |
| Kunst, das Schöne | 287 | art, the beautiful | | |
| Weltgeschichte | 69 | world history | | |
| das Absolute, absolut | 5 931 | the absolute, absolute | P ✓ BD ✓ | Lowercase (D5). |
| Gott, Beweise vom Dasein Gottes, Erhebung | 2 222 / 768 / 242 | God, proofs of God's existence, elevation | dG ✓ | |

### G. Philosophy of nature

| German | n | English | Established | Notes |
|---|---|---|---|---|
| Natur | 3 274 | nature | | |
| Raum, Zeit, Bewegung | 990 / 1 616 | space, time, motion | | In the philosophy of nature *Bewegung* = motion. |
| Materie, Schwere | | matter, gravity | M (PN) | |
| Äther, Licht | 70 / 618 | aether, light | | |
| Prozess | 1 659 | process | | |
| Organismus, organisch | 923 | organism, organic | | |
| Potenz | 501 | power | | ⚑ minor: in the Jena writings (Schelling usage) "potency" is common. Coordinate with the Schelling glossary. |

### H. Jena critical writings and early writings (GW 1, 3, 4, 5)

| German | n | English | Established | Notes |
|---|---|---|---|---|
| Differenz (Differenzschrift) | | difference | Harris/Cerf (unchecked) | *Differenz des Fichte'schen und Schelling'schen Systems* = The Difference Between Fichte's and Schelling's System of Philosophy. |
| Indifferenz, Indifferenzpunkt | 401 | indifference, point of indifference | | Markup distinguishes it from *Gleichgültigkeit*. |
| Entzweiung | 25 | ⚑ D12 | | |
| Reflexionsphilosophie | | philosophy of reflection | | |
| Positivität, positiv | 995 | positivity, positive | Knox (unchecked) | |
| Schicksal, Liebe | 144 / 372 | fate, love | Knox (unchecked) | |
| Volksreligion | | folk religion | | |
| Glauben und Wissen | | Faith and Knowledge | Harris/Cerf (unchecked) | |
| Spekulation | 485 | speculation | | |

---

## 3. Sources and verification

Checked in the local PDFs (translator's notes, glossaries, counts of renderings in the text):

- **dG**: G. di Giovanni, *The Science of Logic* (Cambridge, 2010), Translator's note pp. lxiii–lxxiv.
- **P**: T. Pinkard, *The Phenomenology of Spirit* (Cambridge, 2018), Translator's Note pp. xxxvii–xlv, Glossary pp. 475–483.
- **BD**: K. Brinkmann and D. O. Dahlstrom, *Encyclopedia … Part I: Science of Logic* (Cambridge, 2010), Translators' note pp. xvi–xix (the glossary is missing from the local PDF).
- **I**: M. Inwood, *Philosophy of Mind* (Oxford, 2007), introduction and notes.
- **M**: A. V. Miller, *Philosophy of Nature* (Oxford, 1970), checked by counts. Miller's PhG (1977) and SL (1969) are from memory.

Not checked (no local copy): Harris/Cerf (*Difference*, *Faith and Knowledge*), Knox (*Early Theological Writings*),
Burbidge/di Giovanni (*Jena System 1804–5*), Nisbet (*Philosophy of Right*), Geraets/Suchting/Harris (*Encyclopaedia Logic*, 1991).

Frequencies: own count across the 16 volumes (lemma patterns with period spellings, Sperrsatz removed). They are a
rough measure of weight, not lemmatized counts.
