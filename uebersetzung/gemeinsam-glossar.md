# Cross-author glossary for the English translation (draft 1, 9 Nov 2026)

Scope: everything that cuts across the three editions: Fichte (SW I–VIII, NW I–III; ≈ 1.93 M words), Schelling (SW 1856–61,
14 vols; ≈ 2.46 M words), Hegel (16 GW volumes; ≈ 1.94 M words). The per-author glossaries (`hegel-glossar.md` and the
Fichte and Schelling glossaries being written in parallel) take precedence for terms used by **one** author only. This
file decides what happens when the **same German word** occurs in two or three of them, plus the Kantian layer,
period German and the conventions the pipeline needs.

**Status:** proposal. Rows marked ⚑ need a decision (collected in section 5, numbered **C1–C36**). Hegel's D1–D15 are
not re-decided here. Section 5a shows how each of them would play out in Fichte and Schelling.

## 0. Principles (proposal)

1. **One English word per German lemma across all 41 volumes.** The portal's cross-edition search is the reason: a reader
   who searches "intuition" must find Fichte's, Schelling's and Hegel's *Anschauung* alike.
2. **We diverge only when the *sense* differs, not when the *doctrine* differs.** Fichte's, Schelling's and Hegel's *Ich*
   are three theories of one thing, so all three are "the I". *Herr* as master of a servant and *Herr* as the Lord
   (Schelling's *Herr des Seyns*) are two senses of one word, so the English differs. The test: would a German reader of
   1800 have heard two different words? Then two English words. Would he have heard one word used in a new theory?
   Then one English word.
3. **The Kantian layer follows the Cambridge Edition of the Works of Immanuel Kant** (abbreviated **CK**) unless the
   Cambridge Hegel Translations have since established something else for the same word. Then we decide explicitly
   (e.g. *Zweck*: CK "end", Cambridge Hegel "purpose" → C6).
4. **The period sense comes before the modern sense.** *Physik* is natural science, *Polizei* is internal administration,
   *Witz* is a cognitive faculty, *Evidenz* is self-evidence, *allerdings* often means "certainly, indeed".
5. **The German stays recoverable.** As in the Hegel glossary (principle 4), every glossary term carries its German lemma
   in the markup. Distinctions English cannot make (*Grundsatz/Prinzip*, *Leib/Körper*, *Indifferenz/Gleichgültigkeit*,
   *Moralität/Sittlichkeit* in Fichte) live in the data, not in brackets in the text.
6. **No neologisms of our own.** We use only renderings attested in established translations or in standard English
   usage of the period.

**Marks.** ✓ = checked in this session against the source itself (local PDF, glossary page, or online text; see section 6).
✓(rev.) = checked only through a published review that quotes the translation. **(u)** = from memory, unchecked.
Counts are **F / S / H** = Fichte / Schelling / Hegel, from `zaehle.py count` (period spellings folded, case-insensitive,
left word boundary only, so compounds are included) or, where case matters (*Ich* vs *ich*, *Sein* vs *sein*), from a
case-sensitive regex over the same corpus files. They measure weight, not lemmatized frequency.

**Translation abbreviations.** CK = Cambridge Edition of Kant. **GW-CPR** = Guyer/Wood, *Critique of Pure Reason* (1998;
2nd ed. 2025) ✓. **AN** = Ameriks/Naragon, *Lectures on Metaphysics* (1997) ✓. **Fr** = Friedman, *Metaphysical
Foundations of Natural Science* (Cambridge Texts, 2004) ✓. **GM** = Guyer/Matthews, *Critique of the Power of Judgment*
(2000), ✓(rev.) via Ginsborg. **Gr** = Gregor, *Practical Philosophy* (1996), ✓(rev.) via Kinlaw. **Pl** = Pluhar.
**P**, **dG**, **BD**, **I**, **M** as in the Hegel glossary (Pinkard, di Giovanni, Brinkmann/Dahlstrom, Inwood, Miller).
**Sm** = William Smith, Fichte's *Vocation of the Scholar* (1847) ✓. **Br** = Breazeale. **HL** = Heath/Lachs,
*Science of Knowledge* (1970). **He** = Heath, Schelling's *System of Transcendental Idealism* (1978). **LS** =
Love/Schmidt, Schelling's *Philosophical Investigations into the Essence of Human Freedom* (2006). **Vt** = Vater.
**Mt** = Matthews (Schelling, *Grounding of Positive Philosophy*, 2007). **Wr** = Wirth (*Ages of the World*, 2000).
**DWB** = Grimm, *Deutsches Wörterbuch* (via dwds.de) ✓.

---

## 1. Shared core vocabulary: one rendering or deliberate divergence?

Columns: German · F / S / H · rendering (all three) · established renderings by author · danger · recommendation.
"Same" = one English word everywhere. "Divergence" = deliberately different, with the reason.

### 1A. Subject, I, self, object

| German | F / S / H | Rendering | Established | Danger | Recommendation |
|---|---|---|---|---|---|
| das Ich, Ich (noun) | *das Ich* 1 732 / 906 / 127; *Ich* (capital, incl. pronoun at sentence start) 7 771 / 3 871 / 1 830 | **the I** | F: Br "the I" (u); HL "the self" (u); Sm "the Ego" ✓ (25×). S: He "the self" (u); Marti (*Of the I as Principle*) "the ego" (u). H: P "I" ✓ (glossary) | Three different English words for one German word in the three most-read translations. "self" collides with *Selbst*; "ego" is Freudian for modern readers. | **Same: "the I"** ⚑ C2. Never "the ego", never "the self". Capital *I* is inherent, so no further capitalization question. |
| Ichheit | 98 / 81 / 8 | **I-hood** | Br "I-hood" (u) | "egoity", "selfhood" (= *Selbstheit*). | Same. Keeps *Selbstheit* = "selfhood" free. |
| Nicht-Ich | 596 / 311 / 63 | **the not-I** | Br "Not-I" (u); HL "not-self" (u); Sm "Non-Ego" ✓ (4×); Hegel glossary "not-I" | Case: "Not-I" vs "not-I". | Same: **not-I** (lowercase *n*, hyphen) ⚑ C3. Hegel's critique of Fichte must use the same word as Fichte. |
| Selbst (das) | *das/ein Selbst* (capital) 223 / 227 / 756 | **the self** | P "self" ✓ | Pronoun *selbst* (16 000+ per author) must not be lemmatized as the noun. | Same. Only the noun gets the lemma tag. |
| Selbstheit | 8 / 143 / 10 | **selfhood** | LS "selfhood" (u) | Schelling's Freedom essay: *Selbstheit* is the principle of self-will. | Same. |
| Selbstbewusstsein | 261 / 259 / 1 017 | **self-consciousness** | all ✓ (P, CK glossary) | | Same. |
| Subjekt, subjektiv | 354 / 1 419 / 1 157; adj. 384 / 1 015 / 2 110 | **subject, subjective** | all | Grammatical subject in judgment theory (*Subjekt und Prädikat*) = same word, fine. | Same. |
| Objekt, objektiv | 801 / 1 722 / 565; adj. 1 131 / 1 967 / 1 756 | **object, objective** | all; CK marks *Object* in footnotes ✓ | Merges with *Gegenstand*. | Same, lemma marked. See D3. |
| Gegenstand, gegenständlich | 665 / 1 111 / 1 678 | **object, objective** | CK ✓ ("object (cf. Object)"); P ✓; BD ✓ | dG's "subject matter" ✓ cannot work in Fichte or Schelling (*Gegenstand des Bewusstseins*). | Same as Hegel D3(a); the cross-author evidence settles it (section 5a). |
| Subjekt-Objekt, Subjekt=Objekt, Subjektobjekt | 71 / 135 / 64 | **subject-object** | Vt, He "subject-object" (u) | Hegel's *Differenzschrift* reports Fichte's "subjective subject-object" vs Schelling's "objective subject-object": the three spellings must collapse into one English form. | Same: **subject-object** (hyphen). *subjektives/objektives Subjekt-Objekt* = subjective / objective subject-object. |
| Intelligenz | 365 / 483 / 321 | **intelligence** | F: Br "intellect" (u, First Introduction: "intellect in itself"); HL "intelligence" (u). H: I ✓ "intelligence" (Hegel glossary) | "intellect" would collide with Pinkard's alternative for *Verstand* (P glossary: "the understanding, the intellect" ✓). | Same: **intelligence** ⚑ C12. Never "intellect" (reserve for *Intellekt*, 2 / 50 / 24). |
| Person, Persönlichkeit | *Persönlichkeit* 105 / 409 / 160 | **person, personality** | P "person, legal person" ✓ | Schelling's *Persönlichkeit Gottes* is not "personhood" in the modern bioethical sense. | Same: **personality**. "personhood" never. |
| Individuum, Individualität | 967 / 816 / 1 946 | **individual, individuality** | dG ✓ P ✓ | | Same. *Einzelheit* see D4. |

### 1B. Knowing, intuiting, representing

| German | F / S / H | Rendering | Established | Danger | Recommendation |
|---|---|---|---|---|---|
| Anschauung, anschauen | 2 522 / 1 245 / 1 004 | **intuition, intuit** | CK ✓ ("intuition (intuitus)"); P ✓; Br, He (u) | "view", "contemplation" (older Schelling translations, u). *Weltanschauung* see section 3. | Same. *das Anschauen* = intuiting. |
| intellektuelle Anschauung | 62 / 55 / 25 | **intellectual intuition** | CK ✓ (CPR 9×); P ✓; dG ✓ (7×) | | Same, in all three. Hegel's polemic against Schelling's use must read "intellectual intuition" too. |
| Vorstellung, vorstellen | 832 / 1 646 / 2 144 | **representation, represent** | CK ✓; GM ✓(rev.) (Pl "presentation"); P ✓ ("representation, idea"); dG ✓ | Schelling's late *mythologische Vorstellungen* tempt "notions" or "ideas"; "idea" collides with *Idee*. | Same: **representation**. *sich vorstellen* = imagine (CK ✓ "represent; imagine"). Hegel's contrast with *Begriff* = "representational thought" (P ✓). |
| Begriff, begreifen | 4 532 / 5 383 / 6 668 | **concept; comprehend** | CK ✓; dG P BD ✓ | "notion" (Miller, older Schelling translations, u). | Same. Never "notion". |
| Idee, Ideen | 577+154 / 1 801+758 / 1 727+226 | **idea / Idea** | CK ✓ "idea"; P ✓ "Idea (capitalized)" | Schelling's plural *Ideen* (Platonic archetypes in *Bruno*, *Vorlesungen über die Methode*, *Philosophie der Kunst*) vs Kant's ideas of reason vs Hegel's singular *die Idee*. | Same word; capitalization by D5 (see 5a). |
| Wissen (das) | 2 758 / 1 841 / 1 507 | **knowing** (as act/form); **knowledge** (as possession) | CK ✓ "knowledge (scientia)"; P ✓ "know"; Hegel glossary "knowing, knowledge" | Fichte's late *das absolute Wissen* and Hegel's *das absolute Wissen* must match for search. | ⚑ C10: **"knowing"** for the nominalized infinitive as the topic of philosophy (Fichte's *Wissen* from 1801, Hegel's *absolutes Wissen*); "knowledge" in Kantian contexts (*Meinen, Glauben, Wissen*) and ordinary usage. |
| Erkenntnis, erkennen | 937 / 1 272 / 799; *erkennen* 342 / 1 417 / 1 636 | **cognition, cognize** | CK ✓ ("cognition (cognitio) (cf. kennen, wissen)"; AN ✓; Fr ✓); dG P ✓ | BD merge with *Wissen* ✓. Schelling's *absolute Erkenntnis* (identity philosophy) reads more like "knowledge". | Same: **cognition**. *erkennen* = "recognize" only where re-identification is meant (CK ✓ "cognize; recognize"). |
| Kenntnis, kennen | 192 / 292 / 249 | **acquaintance, knowledge (of facts)** | CK ✓ "acquaintance; information; knowledge"; P ✓ | | Same; lemma marked when "knowledge". |
| Wissenschaft | 2 422 / 3 140 / 1 664 | **science** | CK ✓ "science (scientia)"; P ✓; LS restore "scientific worldview" ✓(rev.) | "scholarship", "discipline", or modern "natural science". | Same: **science**, always. Translator's note once, in the front matter. |
| Wissenschaftslehre | 897 / 85 / 34 | **Wissenschaftslehre** (untranslated) | Br keeps it ✓ (title *Foundation of the Entire Wissenschaftslehre*, OUP 2021); HL "Science of Knowledge" ✓ (catalog title); Thomas-Fogiel glosses "Doctrine of Science" ✓(rev.); Wright "Science of Knowing" (u) | Three different English titles in Schelling's and Hegel's references to Fichte. | ⚑ C22: keep untranslated, roman type, everywhere (Hegel and Schelling included). |
| Reflexion, reflektieren | 845 / 505 / 2 108 | **reflection, reflect** | all; CK ✓ (*Überlegung* = reflection, cf. *Reflexion*) | *Überlegung* also "reflection" in CK. | Same. *Überlegung* = "deliberation" in practical contexts, "reflection" + lemma elsewhere. |
| Spekulation, spekulativ | 171 / 144 / 146; 77 / 258 / 394 | **speculation, speculative** | all | Negative Kantian sense ("idle speculation") vs Schelling/Hegel's positive sense. | Same word; the sense is in the context. |
| Vernunft, vernünftig | 2 108 / 2 071 / 1 867 | **reason, rational** | CK ✓; P ✓ | | Same. *Vernunftwissenschaft* (30 / 93 / 0, late Schelling) = "science of reason" (Mt, u). |
| Verstand, verständig | 1 917 / 1 663 / 1 599 | **the understanding, of the understanding** | CK ✓ "understanding (intellectus)"; P ✓ | I's "intellect" ✓ and P's alternative "intellect" ✓. | Same. *gesunder Menschenverstand* see section 3. |
| Bewusstsein | 510 / 2 664 / 3 634 | **consciousness** | all ✓ | | Same. *Tatsachen des Bewusstseins* = facts of consciousness. |
| Erfahrung | 683 / 1 036 / 602 | **experience** | CK ✓ | *Erlebnis* is not period vocabulary. | Same. |
| Gefühl / Empfindung | 744 / 483 / 788; 266 / 294 / 727 | **feeling / sensation** | CK ✓ (both); Gr merges both as "feeling" ✓(rev., Kinlaw) | Gr's merger. | Same, kept apart. |
| Einbildungskraft | 357 / 160 / 181 | **imagination** (power of imagination in Kantian contexts) | CK ✓ "(power of) imagination" | *Einbildung* in Schelling's *Ineinsbildung* pun. | Same. *Ineinsbildung* (0 / 42 / 0) = "informing into one" or "in-formation" → leave to Schelling glossary. |
| Bild | 4 643 / 503 / 239 | **image** | CK ✓; AN ✓ | Fichte's late WL (*Bild*, *Bild des Bildes*) is the bulk; "picture" breaks the series. | Same: **image**. *Urbild* = archetype (CK ✓), *Abbild* = copy, *Vorbild* = model, *Nachbild* = copy/after-image. |
| Evidenz | 177 / 91 / 17 | **self-evidence, evidentness** | (u) | False friend: not "evidence" in the English sense of proof material (Fichte NW I, 27–28 ✓: "worin uns plötzlich die Evidenz ergreift"). | Same: **self-evidence**. |
| Genesis, genetisch | 550 / 80 / 10 | **genesis, genetic** | (u) | "genetic" now means biological heredity. | Same; translator's note on Fichte's late "genetic" method. |

### 1C. Being, existence, essence

| German | F / S / H | Rendering | Established | Danger | Recommendation |
|---|---|---|---|---|---|
| Sein / Seyn (noun) | ≈ 3 335 / 3 428 / 3 294 (capitalized; includes some sentence-initial possessives) | **being** | all | The *Seyn/Sein* spelling has no meaning for English. | Same. |
| das Seiende, ein Seiendes | 61+18 / 1 818+192 / 167+43 | **that which is; a being** | P "existent, existing" ✓ (glossary); Hegel glossary "what is / the existent" | Schelling's late philosophy (*das Seyende selbst*, *das nicht Seyende*, *das Seyn-Könnende*) depends on keeping *Seiendes* apart from *Existierendes*. "the existent" for *das Seiende* collapses it. | ⚑ C9: **"that which is"** (variant "what is" where syntax demands); *ein Seiendes* = "a being"; *das Existierende* = "the existent". *das nicht Seyende* (281 in S) = "that which is not". |
| Dasein | 808 / 670 / 2 459 | **existence** | CK ✓; AN ✓; P ✓; dG BD ✓ | M "determinate being" would make Fichte's *Sein und Dasein* (late WL, *Anweisung*) nonsense. | Same; see D1 in 5a. |
| Existenz, existieren | 262 / 773 / 1 091 | **existence, exist** | CK ✓ "existence (cf. Dasein)"; P ✓; dG "concrete existence" (Logic) ✓ | Schelling's *Grund von Existenz* (Freedom essay) and positive philosophy's *Existenz* (the "that") must be plain "existence". | "existence" in Fichte and Schelling; Hegel per D1(a). Lemma marked. |
| Wesen | 1 933 / 3 144 / 2 751 | **essence**; **being** (countable: *ein Wesen*, *das höchste Wesen*) | CK ✓ "being; essence"; P ✓ "essence, being" | Schelling's Freedom essay often uses *Wesen* = "being" (*das Wesen, sofern es Grund ist*); title has "essence" (LS ✓ title). | Same rule in all three: **essence** for the what-it-is; **being** for an entity. *Urwesen* = **original being** (CK ✓ "original being (ens originarium)"). |
| Grund | 1 517 / 1 780 / 1 083 | **ground** | all; CK ✓ "ground; basis" | Idioms (*aus diesem Grunde* = for this reason; *zugrunde liegen* = underlie). | Same in philosophical use. *Realgrund/Idealgrund* (18 / 13 / 5) = real ground / ideal ground. *Ungrund* → Schelling glossary (LS "non-ground", u). |
| Identität | 279 / 2 277 / 1 824 | **identity** | all | CK *Einerleiheit* = identity ✓ (AN "sameness" ✓). | Same. *Einerleiheit* = **sameness** (AN ✓) to keep *Identität* distinct. |
| Indifferenz | 51 / 834 / 405 | **indifference** | (u) | Collides with *Gleichgültigkeit* (Hegel). | Same + lemma mark. *Indifferenzpunkt* = point of indifference. |
| Differenz / Unterschied / Verschiedenheit | 56 / 1 070 / 730; 462 / 719 / 2 546; 146 / 285 / 491 | **difference / difference (distinction) / diversity** | CK: *Verschiedenheit* = "difference" ✓, *Unterschied* = "difference" ✓; AN *Verschiedenheit* = "diversity" ✓; dG "diversity" ✓ | CK merges all three. | ⚑ C28: **diversity** for *Verschiedenheit* everywhere (AN ✓, dG ✓) so that only *Differenz/Unterschied* share "difference" (lemma-marked). |
| das Absolute, absolut | 5 224 / 6 940 / 6 316 (*das Absolute* 558 / 654 / 651) | **the absolute** | P ✓ BD ✓ lowercase | Capitalization: many Schelling translations write "the Absolute" (u). | Same; case per D5/C21. |
| unendlich, endlich | 1 323 / 4 647 / 4 178; 872 / 2 707 / 2 660 | **infinite, finite** | all | | Same. *das Unendliche* = the infinite. *schlechte Unendlichkeit* (Hegel) = bad infinity. |
| Potenz | 86 / 3 159 / 521 | **potency** (philosophical); **power** (mathematical exponent) | S: Mt, Vt "potency" (u). H: dG "ratio of powers" ✓ (*Potenzenverhältnis*, 21×). Hegel glossary: "power" with ⚑ minor | Hegel's Jena *Potenzen* (GW 4–8) are Schelling's; "power" there hides the borrowing. | ⚑ C8: **potency** in all three, except arithmetic exponents (*zweite Potenz*, *Potenzenverhältnis*) = power. |
| Erscheinung, erscheinen | 2 570 / 1 797 / 1 115 | **appearance, appear** | CK ✓; P ✓ | Fichte's late *Erscheinung* (of God, of the absolute) is the same word: keep it. | Same. *Phänomen* (153 / 426 / 103) = phenomenon. |
| Schein, scheinen | 114 / 232 / 384 | Kantian: **illusion**; Hegel's logic of essence: **shine**; otherwise **semblance** | CK ✓ "illusion (cf. Erscheinung, Illusion, Blendwerk)"; AN ✓ "seeming, illusion"; P ✓ "seeming to be, semblance"; dG BD "shine" ✓ | One German word, three English words. | ⚑ C16, tied to D10. Fichte (late WL *Schein*) and Schelling: **semblance**; *transzendentaler Schein* = transcendental illusion everywhere. |
| Realität / Wirklichkeit | 666 / 1 048 / 1 412; 472 / 825 / 1 759 | **reality / actuality** | CK ✓ "actuality; reality" for *Wirklichkeit*; P ✓ | CK sometimes "reality" for *Wirklichkeit*. | Same: **actuality** always for *Wirklichkeit*; *wirklich* = actual (not "real"). |
| ideal / ideell; real / reell | 254 / 591 / 159 · 6 / 516 / 737; 310 / 958 / 624 · 123 / 509 / 418 | **ideal; real** (all four) | Hegel glossary: markup flags *ideell*, *reell* | Schelling uses all four, with *das Ideale / das Reale* as poles and *ideell* = posited in thought. | Same + lemma mark. No "ideational", no "realistic". |
| Substanz, Akzidenz, Attribut | 241 / 1 640 / 1 524; 62 / 47 / 89; 1 / 258 / 72 | **substance, accident, attribute** | all | | Same. Spinoza terms see 4.12. |
| Möglichkeit / Notwendigkeit / Zufälligkeit | | **possibility / necessity / contingency** | CK ✓ (*zufällig* = contingent) | Schelling's *Seyn-Könnende* = "that which can be" (u). | Same. |
| Prinzip | 2 341 / 4 015 / 1 229 | **principle** | CK ✓ (cf. *Grundsatz*) | Collides with *Grundsatz*. | Same; ⚑ C32 for *Grundsatz*. |
| Form / Materie / Stoff | 2 333 / 2 763 / 3 537; 518 / 3 574 / 1 166; 378 / 808 / 516 | **form / matter / material** | CK ✓ (*Stoff* = "material, matter"); P ✓ (*Materie* = matter) | *Stoff* = matter merges with *Materie*. | Same: *Stoff* = **material** (Fichte's *Stoff der Vorstellung* = material of representation); chemical *Stoffe* (Schelling) = substances (*Wärmestoff* = caloric). |
| Einheit / Totalität / Allheit | 1 677 / 3 167 / 4 725; 200 / 559 / 1 475; 13 / 195 / 58 | **unity / totality / allness** | CK *Allheit* = totality ✓ (cf. *Totalität*) | CK merges *Allheit* and *Totalität*; Schelling uses both (identity philosophy). | ⚑ C29: *Allheit* = **allness** (Kemp Smith's rendering, u) to keep *Totalität* free; CK "totality" acceptable with lemma mark. |
| Gegensatz / Entgegensetzung | 600 / 1 729 / 1 442; 17 / 253 / 495 | **opposition** (both) | CK ✓ (*Entgegensetzung*); P ✓ (*Gegensatz*) | Fichte's *entgegensetzen* / *Gegensetzen*: HL "counterposit" (u), Br "oppose" (u). | Same: **oppose, opposition**; *das Entgegengesetzte* = the opposite. |
| Grenze / Schranke / Beschränkung | 388 / 724 / 593; 79 / 363 / 276; 567 / 408 / 502 | **limit / limitation / restriction** | CK ✓ *Grenze* = "bound(ary)", *Schranke* = "limitation", *einschränken* = "limit", *begrenzen* = "bound"; dG/M *Grenze* = limit (Hegel glossary) | CK and Cambridge Hegel disagree on *Grenze*. Fichte's *beschränken* is the core verb of the GWL. | ⚑ C14. |
| Wechselwirkung / Wechselbestimmung | 208 / 110 / 84; 91 / 29 / 18 | **interaction / reciprocal determination** | CK ✓ "interaction" (CPR glossary); M "reciprocal action" (Hegel glossary) | Kant's third relational category is the source of all later uses. | ⚑ C13: **interaction** everywhere (CK). |
| Kraft, Macht | 1 211 / 1 346 / 485 | **force; power** | CK ✓ "force, power"; P ✓ (*Kraft* = force, *Macht* = power) | *Vermögen* = faculty, *Gewalt* = violence/authority. | **force** in physics and Hegel's PhG III; **power** for agency (*Willenskraft*); *Macht* = power. Lemma marked. |

### 1D. Activity, freedom, practical philosophy

| German | F / S / H | Rendering | Established | Danger | Recommendation |
|---|---|---|---|---|---|
| setzen, Gesetztsein | 1 314 / 1 286 / 972 (+ *gesetzt* 2 303 / 3 182 / 3 856) | **posit, positedness** | CK ✓ "posit; place; put"; P dG ✓ | "set", "put", "assume". Ordinary *setzen* (*voraussetzen*, *zusammensetzen*) must not become "posit". | Same. *voraussetzen* = presuppose; *zusammensetzen* = compose. |
| Bestimmung | 1 653 / 1 107 / 4 651 | **determination**; **vocation** (*Bestimmung des Menschen, des Gelehrten*) | CK ✓ "determination, vocation"; AN ✓; Sm ✓ "vocation" (66×); P ✓ "destiny"; BD ✓ "vocation" | P's "destiny" would make Fichte's *Bestimmung des Menschen* unrecognizable. | ⚑ C11: **vocation** in all three (never "destiny"). |
| Tätigkeit | 1 355 / 1 633 / 974 | **activity** | CK *Selbsttätigkeit* = self-activity ✓; P ✓ | | Same. *Selbsttätigkeit* (137 / 12 / 33) = self-activity (GW-CPR ✓; AN has "spontaneity" ✓, not adopted). |
| Handlung, Handeln | 962 / 912 / 482 | **action, acting** | AN ✓ "action"; P ✓ | Fichte's *Handlung des Ich* tempts "act" (collides with *Akt*). | Same: **action**. *Akt* (212 / 380 / 51) = **act**. |
| Tat | 788 / 726 / 1 011 | **deed** | P ✓ | | Same. |
| Tathandlung | 19 / 5 / 0 | Fichte glossary decides (Br "F/Act", u; HL "Act", u) | | Schelling's five uses quote Fichte. | Whatever the Fichte glossary chooses applies to Schelling unchanged. |
| Trieb | 1 148 / 179 / 435 | **drive** | dG (Hegel glossary); Br (u); CK *Triebfeder* = incentive ✓ | "impulse", "instinct" (*Instinkt*), "urge". | Same: **drive**. *Bildungstrieb* (8 / 90 / 1, Blumenbach) = formative drive. |
| Triebfeder | 73 / 13 / 48 | **incentive** | CK ✓ (CPR glossary; AN ✓) | "motive" (= *Bewegungsgrund*, CK ✓). | Same. |
| Streben, Bestrebung | 207 / 252 / 86 | **striving** | Fr ✓ (*Bestrebung* = striving); AN *Bestrebung* = "endeavor" ✓ | | Same: **striving** for both. |
| Freiheit | 3 583 / 1 739 / 420 | **freedom** | all | "liberty" except political plural *Freiheiten* (10 / 5 / 5) = liberties. | Same. |
| Wille / Willkür | 2 090 / 1 526 / 1 099; 214 / 195 / 275 | **will / power of choice ~ arbitrariness** | CK: GW-CPR "power of choice" ✓ (12×); AN "choice (power of)" ✓; Gr "choice" ✓(rev.); P "arbitrary, arbitrary free choice" ✓; Hegel glossary "arbitrary will / free choice" | One German word, two senses: the faculty of choosing (Kant, Fichte's ethics and *Naturrecht*) vs caprice opposed to true freedom (Schelling's Freedom essay, Hegel). | ⚑ C5. *willkürlich* = arbitrary / voluntary (AN ✓ both). |
| Wollen (das) | 332 / 382 / 97 | **willing** | AN ✓ | | Same. |
| Sollen | 55 / 33 / 183 (noun) | **ought** | AN ✓; P ✓ | GM's "supposed to" ✓(rev., criticized by Ginsborg). | Same: **the ought**. |
| Recht | 2 530 / 601 / 1 460 | **right**; **law** only for a legal order (*positives Recht* = positive law) | P ✓ "law, right"; AN "justice" ✓ | *Rechtslehre* (Fichte) = doctrine of right; *Naturrecht* = natural right (title *Foundations of Natural Right*, Baur, u). | Same: **right**. *Rechtsbegriff* = concept of right. |
| Moralität / Sittlichkeit / sittlich / Sittenlehre | 276 / 63 / 269; 334 / 121 / 387; *Sittenlehre* 150 / 21 / 14 | **morality / ethical life (Hegel) ~ morality (Kant, Fichte) / ethical / ethics** | AN ✓ *Sittlichkeit* = morality, *Moralität* = morality; P ✓ *Sittlichkeit* = ethical life, *sittlich* = ethical | Kant and Fichte do not distinguish the two nouns; Hegel builds a doctrine on the distinction. | ⚑ C4: deliberate divergence for the noun only. *sittlich* = **ethical** in all three. |
| Sitte, Sitten | 159 / 108 / 161 | **custom(s), mores; morals** (in *Metaphysik der Sitten*) | AN ✓ "morals"; P ✓ "ethos, mores" | "manners". | **custom** default; Kant's titles keep "morals". |
| Gesetz | 4 059 / 1 777 / 2 026 | **law** | CK ✓ | *Recht* = right. | Same. |
| Pflicht | 903 / 95 / 683 | **duty** | (u) | "obligation" (= *Verbindlichkeit*, u). | Same. |
| Gewissen | 208 / 34 / 129 | **conscience** | AN ✓; P ✓ | | Same. |
| Gesinnung | 186 / 120 / 128 | **disposition** | AN ✓; P ✓ | *Denkungsart* (AN "disposition" ✓, GW-CPR "way of thinking" ✓). | Same: **disposition**; *Denkungsart* = **way of thinking** (GW-CPR). |
| Zweck, Endzweck, zweckmäßig | 1 776 / 588 / 1 409; 261 / 26 / 79 | **end ~ purpose; final end; purposive** | CK: GW-CPR ✓ "end; purpose", GM "end" ✓(rev.), AN "end" ✓; Cambridge Hegel "purpose" (dG P BD ✓; P 237× "purpose" vs 66× "end") | Fichte's *Zweckbegriff* (ethics) is Kantian; Hegel's teleology is in Cambridge "purpose". | ⚑ C6. *Endzweck* = **final end** everywhere (AN ✓, CPR ✓, Hegel glossary). *Zweckmäßigkeit* = **purposiveness** (GM ✓(rev.)). |
| Selbständigkeit | 588 / 366 / 1 459 | **self-sufficiency** | CK ✓ "self-sufficient; independent"; P ✓ | dG "self-subsistent". | Same (Hegel D11(a) is also the CK rendering). |
| Aufforderung | 60 / 21 / 5 | **summons** | Baur (u) | "invitation", "request". | Fichte glossary; same in the few Schelling/Hegel echoes. |
| Anstoß | 68 / 46 / 47 | Fichte's technical sense: **check** (HL, Br, u); otherwise **impulse / offense** | | Hegel's and Schelling's *Anstoß* are mostly non-technical (*Anstoß geben* = give impetus; *Stein des Anstoßes* = stumbling block). | Divergence by sense: "check" only in Fichte's theory of the I and when Schelling or Hegel refer to it. |

### 1E. Life, nature, mind, body

| German | F / S / H | Rendering | Established | Danger | Recommendation |
|---|---|---|---|---|---|
| Leben, lebendig | 3 106 / 1 803 / 1 035 | **life, living** | all | | Same. Fichte's *seliges Leben* = blessed life. |
| Geist, geistig | 525 / 1 824 / 2 110 | **spirit, spiritual** | CK ✓ "mind, spirit (cf. Gemüt)"; AN ✓ "spirit, mind"; P dG BD ✓ "spirit"; I "mind" ✓ | "mind" (I, CK) would collide with *Gemüt*. Fichte's *Geist und Buchstabe* (spirit and letter) needs "spirit". | Same: **spirit** in all three; "mind" reserved for *Gemüt*. *Geisterwelt* (62 / 116 / 14) = spirit world. |
| Gemüt | 310 / 217 / 154 | **mind** (cognitive, Kantian); **heart** (affective, religious) | CK ✓ "mind" (CPR, AN); DWB ✓ (Kant's *Gemüt* = *animus*, includes the understanding) | Modern German *Gemüt* = temperament, coziness. Fichte NW I, 36 ✓ ("ihre Gewalt auf das menschliche Gemüth") is affective; Schelling SW I/1, 355 ✓ ("Handlung des Gemüths", on Kant) is Kantian. | ⚑ C7. Never "soul", never "spirit". |
| Seele | 349 / 1 691 / 888 | **soul** | AN ✓ | *Weltseele* (8 / 30 / 5) = world soul. | Same. |
| Herz | 398 / 284 / 456 | **heart** | P ✓ | | Same (and see C7). |
| Leib / Körper | 339 / 626 / 110; 347 / 2 742 / 1 127 | **body / body (physical body)** | AN ✓ *Leib* = "human body", *Körper* = "body" | Fichte's *Naturrecht* deduces the *Leib* (articulated body of a rational being); Schelling's *Körper* are mostly physical bodies. | ⚑ C17. |
| Organismus / Organisation | 6 / 914 / 336; 76 / 390 / 152 | **organism / organization** | (u) | *Organisation* (period) = organized being and its structure (Schelling SW I/1, 386 ✓: "jede Pflanze"…; "Das Weltsystem ist eine Art von Organisation"), not an institution. | ⚑ C31: **organization**, with a front-matter note; never "organism" (keeps the lemma apart). |
| Natur | 1 933 / 6 524 / 3 292 | **nature** | all | Capitalization (C21). | Same, lowercase. |
| Naturphilosophie | 45 / 432 / 84 | **philosophy of nature** | (u) | Anglophone literature uses *Naturphilosophie* as a name for Schelling's program. | ⚑ C23: translate in running text in all three. |
| Licht, Schwere | 616 / 2 109 / 549; 14 / 757 / 616 | **light, gravity** | CK ✓ *Schwere* = gravity | Fichte's late *Licht* (WL 1804) is metaphysical, same word. | Same. |
| Produkt, Produktivität | 803 / 1 907 / 617; 1 / 186 / 0 | **product, productivity** | (u) | | Same. |
| Polarität, Duplizität, Dualität | 3 / 181 / 24; 92 / 248 / 9 | **polarity, duplicity, duality** | Schelling translations "duplicity" (u) | English "duplicity" = deceitfulness. | ⚑ C19. |
| Sensibilität / Irritabilität / Reproduktion | 0 / 369 / 61; 0 / 358 / 61; 96 / 154 / 65 | **sensibility / irritability / reproduction** | (u) | *Sensibilität* (Kielmeyer's organic function) ≠ Kant's *Sinnlichkeit* (= sensibility, CK ✓). | Same word for the organic function, lemma-marked (*Sensibilität* vs *Sinnlichkeit*). |
| Erregbarkeit | 1 / 237 / 3 | **excitability** | (u) | Brownian medicine term, not "irritability". | Same. |
| Bewegung | | **motion** (physics) / **movement** (Hegel's logic, PhG) | CK ✓ "motion"; Fr ✓; P ✓ "movement" | | Hegel glossary rule applies in all three: physics = motion. |

### 1F. God, religion, history

| German | F / S / H | Rendering | Established | Danger | Recommendation |
|---|---|---|---|---|---|
| Gott / Gottheit / das Göttliche | 1 998 / 7 483 / 2 202; 152 / 793 / 162; 45 / 301 / 140 | **God / Godhead (deity) / the divine** | (u) | Schelling's *Gottheit* (mythology: *eine Gottheit* = a deity; theology: *die Gottheit* = the Godhead). | Divergence by sense: *die Gottheit* = **the Godhead**; *eine Gottheit*, *Gottheiten* = **a deity, deities**. |
| Götter | | **gods** | | | lowercase. |
| Offenbarung, offenbaren, offenbar | 489 / 767 / 53 | **revelation, reveal, manifest** | P ✓ "revealed religion" (*offenbare Religion*) | Schelling's Freedom essay: *sich offenbaren* = become manifest; late *Philosophie der Offenbarung* = Philosophy of Revelation. Fichte's *Kritik aller Offenbarung* = Critique of All Revelation (Green, Wood, u). | Same: **revelation**; *offenbar* (adj.) = **manifest**; *Offenbarwerden* = becoming manifest. |
| Religion, Religiosität | 679 / 988 / 1 641; 51 / 9 / 48 | **religion, religiosity** | | *Religiosität* = religious sentiment, not pejorative. | Same. |
| Glaube | 633 / 365 / 841 | **faith** (religious); **belief** (epistemic) | CK ✓ "belief; faith"; P ✓ "faith" | Jacobi's *Glaube* (epistemic, cited by all three) vs Christian faith. | ⚑ C15. |
| Liebe, Seligkeit | 615 / 320 / 372; 286 / 214 / 26 | **love, blessedness** | AN ✓ *Seligkeit* = blessedness | "happiness" (= *Glückseligkeit*, CK ✓), "bliss". | Same: **blessedness**; *selig* = blessed. |
| Ewigkeit | 225 / 605 / 149 | **eternity** | | | Same. |
| Schöpfung | 105 / 592 / 35 | **creation** | AN ✓ | | Same. |
| Abfall | 7 / 57 / 11 | **fall, falling away** | (u) | Schelling's *Philosophie und Religion*. | Same: **falling away** (the noun *Sündenfall* = the Fall). |
| das Böse, Sünde, Gnade, Erlösung, Versöhnung | 90 / 409 / 229; 129 / 117 / 69; 31 / 32 / 62; 8 / 32 / 10; 10 / 110 / 139 | **evil, sin, grace, redemption, reconciliation** | P ✓ *Böse* = evil | | Same. |
| Kirche, Gemeinde (Gemeine) | 486 / 306 / 428; 271 / 24 / 178 | **church; congregation, community** | P ✓ "community, religious community" | Fichte's *Gemeine* in political writings = municipality/commonwealth (cf. SW VII, 541 ff. ✓: *Bürgerbuch*). | **congregation** in religious contexts, **community** otherwise, **municipality** for local government. |
| Christus, Christentum | 71 / 630 / 135 | **Christ, Christianity** | | | Same. |
| Geschichte, geschichtlich / Historie, historisch | *Geschichte* 464 / 1 102 / 672; *geschichtlich* 26 / 340 / 93; *Historie, historisch* 293 / 526 / 152 | **history, historical / history, historical** | | Schelling distinguishes *geschichtlich* (belonging to history as event) from *historisch* (known through report) in places. | Same English; lemma marked. *eine Geschichte* = a story. |
| Mythologie | 3 / 1 686 / 43 | **mythology** | | | Same. *Götterlehre* = doctrine of gods. |
| Heidentum, heidnisch | 13 / 263 / 0 | **paganism, pagan** | | | Same; see 3.8 for *Heiden*. |
| Vorsehung | 40 / 73 / 69 | **providence** | AN ✓ | | Same. |
| Andacht | 12 / 24 / 40 | **devotion** | Hegel glossary | "piety" (= *Frömmigkeit*). | Same. |

### 1G. Method and system

| German | F / S / H | Rendering | Established | Danger | Recommendation |
|---|---|---|---|---|---|
| System | 1 129 / 2 042 / 1 141 | **system** | | | Same. |
| Darstellung, darstellen | 350 / 751 / 502 | **presentation, present**; **exhibition, exhibit** (Kant's sense: presenting a concept in intuition) | CK ✓ "exhibit; present"; Fr ✓ "present"; P ✓ "exposition, account, display"; Vt *Darstellung meines Systems* = Presentation of My System (u) | Schelling's *Konstruktion* theory is a Kantian *Darstellung in der Anschauung*. | ⚑ C18: **presentation** default; "exhibition" only for Kant's technical sense, lemma marked. |
| Konstruktion, konstruieren | 398 / 38 / 216; 274 / 230 / 78 | **construction, construct** | Fr ✓ | | Same. |
| Deduktion | 241 / 159 / 113 | **deduction** | | | Same. |
| Prinzip / Grundsatz | see 1C | | | | ⚑ C32. |
| Idealismus, Realismus, Dogmatismus | 303 / 496 / 308; 89 / 181 / 53; 85 / 246 / 103 | **idealism, realism, dogmatism** | CK ✓ | | Same. |
| Kritik | 182 / 362 / 222 | **critique** (Kant's sense, and Hegel's *Kritik*); **criticism, review** (of books) | | | Divergence by sense. |
| Moment | 278 / 1 201 / 3 360 | **moment** | Hegel glossary | Schelling's *Moment* also temporal ("a moment"). | Same. |
| aufheben, Aufhebung | 393 / 761 / 1 926; 61 / 123 / 105 | Hegel: **sublate**; Fichte, Schelling: **cancel, annul** (and "sublate" where they use Hegel's term) | Hegel glossary | Fichte's GWL *aufheben* (the I and not-I limit each other, *heben sich auf*) is the source of Hegel's term but means "cancel". | Divergence by author's sense, lemma always marked (⚑ C36). |
| Entäußerung | 0 / 68 / 50 | **externalization** (D7 a) | P glossary "emptying" ✓, but 84× "relinquish" in text (Hegel glossary) | Schelling's late *Philosophie der Offenbarung* uses it for Christ's kenosis (Phil 2:7). | See D7 in 5a. |
| Entzweiung | 17 / 132 / 26 | **diremption** | dG I BD ✓; P ✓ "estrangement" | | Same as D12. |

---

## 2. The Kantian layer

All three authors use Kant's terms, often while quoting him (*Kant* named 457 / 958 / 449 times). Readers will check
these terms against the Cambridge Edition. The Cambridge general editors state: "As far as seems advisable, the edition
employs a single general glossary, especially for Kant's technical terms" (GW-CPR, General editors' preface ✓). The
CPR glossary itself is "not meant as a complete guide to Kant's vocabulary… The vast number of obvious cognates (e.g.,
Apperzeption = apperception) are omitted" ✓.

Columns: German · F / S / H · CK rendering (source) · do the idealists follow Kant? · our rendering.

| German | F / S / H | CK rendering | Idealists' usage | Our rendering |
|---|---|---|---|---|
| Erkenntnis | 937 / 1 272 / 799 | cognition (cognitio) — GW-CPR ✓, AN ✓, Fr ✓ | Follows; Schelling's identity philosophy stretches it toward "knowledge". | **cognition** |
| Erkenntnisvermögen | 1 / 75 / 32 | faculty of cognition (17×), cognitive faculty (8×) — GW-CPR text ✓ | Follows. | **faculty of cognition** |
| Anschauung | 2 522 / 1 245 / 1 004 | intuition (intuitus) — GW-CPR ✓ | Follows, and extends (intellectual intuition, which Kant denies to us). | **intuition** |
| intellektuelle Anschauung | 62 / 55 / 25 | intellectual intuition — GW-CPR text ✓ (9×) | Departs in doctrine (Fichte: self-intuition of the I; Schelling: organ of philosophy); same term. | **intellectual intuition** |
| Vorstellung | 832 / 1 646 / 2 144 | representation (repraesentatio) — GW-CPR ✓, GM ✓(rev.) | Follows. | **representation** |
| Gemüt | 310 / 217 / 154 | mind — GW-CPR ✓, AN ✓ | Fichte and early Schelling follow; later usage drifts to the affective sense. | ⚑ C7 |
| Geist | 525 / 1 824 / 2 110 | mind, spirit (cf. Gemüt) — GW-CPR ✓; spirit, mind — AN ✓ | Departs: for Hegel and Schelling *Geist* is a central category, not a synonym of *Gemüt*. | **spirit** |
| Seele | | soul — AN ✓ | Follows. | **soul** |
| Willkür | 214 / 195 / 275 | power of choice — GW-CPR text ✓ (12×); choice (power of) — AN ✓; choice — Gr ✓(rev.) | Fichte follows (ethics, right); Schelling and Hegel use the caprice sense polemically. | ⚑ C5 |
| Wille | | will — AN ✓ | Follows. | **will** |
| Triebfeder | 73 / 13 / 48 | incentive — GW-CPR ✓, AN ✓ | Follows. | **incentive** |
| Bewegungsgrund | | motive — GW-CPR ✓ ("motive (cf. Triebfeder)"); AN ✓ "motive ground, motive" | Follows. | **motive** |
| Achtung | 184 / 75 / 80 | respect (u; Gr, not seen) | Follows (Fichte's ethics). | **respect** |
| Glückseligkeit | 133 / 84 / 105 | happiness — GW-CPR ✓, AN ✓ | Follows. Hegel GW 1, 156 ✓ ("der Gute der Glükseeligkeit würdig"). | **happiness** |
| das höchste Gut | | highest good — GW-CPR text ✓ (12×) | Follows. | **highest good** |
| Urteilskraft | 72 / 21 / 52 | (power of) judgment — GW-CPR ✓, AN ✓; GM "power of judgment" ✓(rev.; Ginsborg prefers "judgment") | Follows. | **power of judgment**; *Urteil* = judgment |
| beurteilen, Beurteilung | | assess; judge / estimation; judgment — GW-CPR ✓; GM "judge" ✓(rev.) | Follows. | **judge, judging** |
| Mannigfaltige, Mannigfaltigkeit | 771 / 235 / 421 | manifold (n.), manifold of elements; manifoldness — GW-CPR ✓ | Follows; Fichte uses it heavily. | **the manifold; manifoldness** |
| Inbegriff | 16 / 79 / 36 | sum total — GW-CPR ✓ (49× in text) | Follows. | **sum total** |
| Schwärmerei, Schwärmer | 100 / 79 / 26 | enthusiasm — GW-CPR ✓; "wild fantasy" — AN ✓; Pl "fanaticism" (reported in secondary literature, not seen) | Follows the Lockean sense (claim to supersensible insight). Fichte NW I, 499 ✓ ("in Schwärmerei und Träumen"). | ⚑ C30: **enthusiasm** (CK), *Enthusiasmus* (8 / 21 / 13) = "enthusiasm" + lemma; or **fanaticism** |
| Erscheinung; Phaenomenon / Noumenon | 2 570 / 1 797 / 1 115; 153 / 426 / 103; 22 / 8 / 1 | appearance — GW-CPR ✓; phenomena / noumena (in text ✓) | Follows; Fichte's late *Erscheinung* departs in doctrine only. | **appearance; phenomenon, noumenon** |
| Ding an sich | 128 / 191 / 57 | thing in itself (52×), things in themselves (100×) — GW-CPR text ✓ | Follows (as target of critique). | **thing in itself** (no hyphens) |
| Apperzeption | 66 / 13 / 22 | apperception — GW-CPR glossary note ✓ | Follows. | **apperception** |
| Spontaneität / Rezeptivität | 99 / 17 / 13; 21 / 140 / 15 | spontaneity / receptivity — GW-CPR text ✓ (32×, 31×); *Empfänglichkeit* = receptivity — AN ✓ | Follows; Schelling's *Rezeptivität* is also organic (Naturphilosophie). | **spontaneity / receptivity** |
| Selbsttätigkeit | 137 / 12 / 33 | self-activity — GW-CPR ✓; spontaneity — AN ✓ | Fichte uses it as near-synonym of *Spontaneität*. | **self-activity** (keeps *Spontaneität* distinct) |
| Grundsatz | 676 / 560 / 257 | principle (cf. Princip, Principium) — GW-CPR ✓; principle, basic proposition — AN ✓ | Fichte's three *Grundsätze* of the GWL. | ⚑ C32 |
| Postulat | 91 / 102 / 50 | postulate — GW-CPR text ✓ (44×) | Follows (Fichte, Hegel's critique of the postulates). | **postulate** |
| Endzweck | 261 / 26 / 79 | final end — AN ✓; GW-CPR text ✓ | Follows. | **final end** |
| Zweck, Zweckmäßigkeit | 1 776 / 588 / 1 409; 16 / 89 / 66 | end; purpose — GW-CPR ✓; end / purposiveness — GM ✓(rev.) | Hegel's Cambridge translators use "purpose". | ⚑ C6; **purposiveness** fixed |
| das Unbedingte | 25 / 110 / 71 | the unconditioned — GW-CPR text ✓ (57×) | Follows; Schelling's *Vom Ich* builds on the pun *bedingen/Ding* ("un-thinged"). | **the unconditioned**; pun in a note |
| Sinnlichkeit, sinnlich | 145 / 84 / 177 | sensibility; sensible — GW-CPR ✓; sensible, sensory — AN ✓ | Follows. | **sensibility; sensible** (Kantian), **sensuous** (aesthetic, Hegel's art) |
| Vermögen | 923 / 229 / 260 | faculty, capacity (facultas) — GW-CPR ✓, AN ✓ "faculty"; Gr "faculty" ✓(rev.); Pl "power" ✓(rev.) | Follows. *Vermögen* also = wealth (Fichte's economics). | **faculty** (philosophy), **property, means** (economics) |
| Fähigkeit | | capacity (capacitas) — GW-CPR ✓; ability — AN ✓ | Follows. | **capacity** |
| Begehrungsvermögen | 84 / 0 / 7 | faculty of desire — GW-CPR text ✓ (3×); Gr ✓(rev.); Pl "power of desire" ✓(rev.) | Follows (Fichte's ethics). | **faculty of desire** |
| Lust / Unlust | 126 / 109 / 68; 13 / 7 / 6 | pleasure / displeasure — GW-CPR ✓, AN ✓ | Follows. | **pleasure / displeasure** |
| Wohlgefallen | | satisfaction — GM ✓(rev.); Pl "liking" ✓(rev.) | Follows (aesthetics). | **satisfaction** |
| Neigung / Hang / Anlage | 157 / 72 / 173 | inclination — AN ✓; propensity — AN ✓; predisposition — GW-CPR ✓ | Follows. | **inclination / propensity / predisposition** |
| Begierde | 54 / 74 / 210 | desire (AN *Begehrung* = desire ✓) | Hegel's *Begierde* (PhG) = desire (Hegel glossary). | **desire** |
| Gesinnung / Denkungsart | 186 / 120 / 128; 258 / 74 / 12 | disposition — AN ✓; way of thinking — GW-CPR ✓ | Follows. | **disposition / way of thinking** |
| Sitte / Sittlichkeit / Moralität | | morals / morality / morality — AN ✓ | Hegel departs. | ⚑ C4 |
| Tugend, Heiligkeit | 178 / 132 / 360 | virtue, holiness — AN ✓ | Follows. | **virtue, holiness** |
| Maxime, kategorischer Imperativ, Autonomie, Heteronomie | 209 / 39 / 70; 117 / 74 / 41; 7 / 37 / 0 | maxim, categorical imperative, autonomy, heteronomy (u; standard) | Follows. | same |
| Nötigung, Zwang | | necessitation — AN ✓; coercion, compulsion — GW-CPR ✓ | Fichte's *Zwangsrecht* = right of coercion. | **necessitation; coercion** |
| Zurechnung | | imputation — GW-CPR ✓ | Follows. | **imputation** |
| Urwesen, Urbild | | original being; archetype (prototypon) — GW-CPR ✓, AN ✓ | Follows; Schelling's *Urbild/Gegenbild* (identity philosophy). | **original being; archetype**; *Gegenbild* = counter-image (AN "correlate" ✓, not adopted) |
| Gedankending | | thought-entity (ens rationis) — GW-CPR ✓ | Follows. | **thought-entity** |
| Begriff / Idee / Kategorie | | concept / idea / category — GW-CPR ✓ | Follow in term, depart in doctrine. | same |
| Vernunftschluss, Schluss | | syllogism; inference of reason / inference — GW-CPR ✓ | Hegel: *Schluss* = syllogism (dG BD ✓). | **syllogism** (Hegel, and Kant's *Vernunftschluss*); **inference** for *Schluss* outside formal logic |
| vernünfteln | | ratiocinate; rationalize — GW-CPR ✓ | Follows. | **ratiocinate** |
| Verbindung / Verknüpfung / Zusammenhang | 322 / 512 / 425 | combination / connection / connection, interconnection — GW-CPR ✓ | Follows; Fichte's *Synthesis* = synthesis. | **combination / connection / interconnection** |
| Wechselwirkung / Gemeinschaft | | interaction / community — GW-CPR ✓; AN "interaction, community" ✓ | Hegel's *Wechselwirkung* (Logic) = M "reciprocal action". | ⚑ C13 |
| Beharrlichkeit | | persistence — GW-CPR ✓; Fr "perduring" (*beharrlich*) ✓ | Follows. | **persistence** |
| Dasein / Existenz | | existence / existence — GW-CPR ✓, AN ✓ | See D1. | **existence** |
| Wirklichkeit | | actuality; reality — GW-CPR ✓ | Follows. | **actuality** (never "reality") |
| Einerleiheit | | identity — GW-CPR ✓; sameness — AN ✓ | | **sameness** |
| Verschiedenheit | | difference — GW-CPR ✓; diversity — AN ✓ | Hegel: diversity (dG ✓). | ⚑ C28 **diversity** |
| Schein / Blendwerk / Wahn | | illusion / semblance, mirage / delusion — GW-CPR ✓ | Hegel departs (shine). | ⚑ C16 |
| transzendental / transzendent | 354 / 388 / 235; 30 / 62 / 20 | transcendental / transcendent — GW-CPR text ✓ | Follow; Schelling's *System des transscendentalen Idealismus*. | **transcendental / transcendent** (spelling *transscendental* folded) |
| a priori / a posteriori | 329 / 349 / 70; 60 / 63 / 0 | a priori (roman in CK) | Follows. | roman, no italics, no hyphen in attributive use ("a priori cognition") |
| synthetisch / analytisch; Synthesis | 359 / 166 / 243; 35 / 76 / 150; 416 / 373 / 83 | synthetic / analytic — GW-CPR ✓ | Follows; Fichte's *synthetische Methode*. | same |
| Fürwahrhalten / Überzeugung / Überredung / Meinung | | taking to be true / conviction / persuasion / opinion — GW-CPR ✓ | Follows. | same |
| Glaube | | belief; faith — GW-CPR ✓ | Follows; Jacobi. | ⚑ C15 |
| Wissen / Wissenschaft | | knowledge (scientia) / science (scientia) — GW-CPR ✓ | See C10. | ⚑ C10; **science** |
| Weltweisheit | 5 / 5 / 8 | philosophy — GW-CPR ✓ | Period synonym (Schelling SW I/1, 430 ✓ quoting Kant's title *Versuch, den Begriff der negativen Größen in die Weltweisheit einzuführen*). | **philosophy** + lemma |
| Bestimmung | | determination (determinatio), vocation — GW-CPR ✓; AN ✓ | Follows. | ⚑ C11 |
| Mensch | | human being — GW-CPR ✓ (67× in text; "mankind" 4×), AN ✓ | | ⚑ C1 |
| selbständig | | self-sufficient; independent — GW-CPR ✓ | Same as Hegel D11(a). | **self-sufficient** |
| Gegenstand / Object | | object (cf. Object) — GW-CPR ✓; Latinate member marked in footnotes ✓ | Same practice as D3(a). | **object** + lemma |
| Sache / Ding | | thing (cf. Ding) / thing (cf. Sache) — GW-CPR ✓; AN *Sache* = matter, object ✓ | Hegel: *Sache* = matter (Hegel glossary, D8). | **matter** for *Sache* (all three), **thing** for *Ding* |
| Beschaffenheit | | constitution; property — GW-CPR ✓ | Follows (dG constitution). | **constitution** |
| Grenze / Schranke / einschränken / begrenzen | | bound(ary) / limitation / limit / bound — GW-CPR ✓ | Hegel departs (dG/M *Grenze* = limit). | ⚑ C14 |
| schlechthin | 2 599 / 1 000 / 1 027 | absolutely — GW-CPR ✓ | Fichte's *schlechthin* (the I posits itself *schlechthin*) is the signature adverb. | **absolutely**; see 3.1 |
| lediglich | 1 184 / 123 / 11 | solely, strictly — GW-CPR ✓ | Fichte's favorite restrictive. | **solely** |
| darstellen | | exhibit; present — GW-CPR ✓; present — Fr ✓ | | ⚑ C18 |
| Konstruktion | | construction — Fr ✓ | Fichte, Schelling. | **construction** |
| Bild | | image — GW-CPR ✓, AN ✓ | Fichte's late WL. | **image** |
| Stoff / Materie | | material, matter / matter — GW-CPR ✓ | | **material / matter** |
| Kultur | | culture — GW-CPR ✓ | Follows; *Bildung* see 3.4. | **culture** |
| Zucht / Disziplin | | correction — GW-CPR ✓; discipline — AN ✓ | | **discipline** |
| Lehrsatz / Erörterung / Erklärung | | theorem / exposition / explanation, definition, declaration — GW-CPR ✓ | *Erklärung* in Fichte/Hegel lecture headings often = definition. | **theorem / exposition / explanation** (definition in definitional contexts) |
| Umfang / Inhalt | | domain / content — GW-CPR ✓ | Logic of concepts: *Umfang* = extension (u, standard logic). | **extension** in logic of concepts, **domain** otherwise |
| Bedeutung | | significance; meaning — GW-CPR ✓ | | **significance**, "meaning" where semantic |
| Menschenverstand (gemeiner, gesunder) | 78 / 58 / 142 | common sense — AN ✓ | Hegel's polemics (GW 1, 156 ✓). | **common (healthy) understanding** ⚑ minor, or "common sense" (AN) |
| Gemeinsinn | 4 / 1 / 4 | common sense (u; GM) | Rare. | **common sense** + lemma (then *gesunder Menschenverstand* = "sound common understanding") |
| Geschmack, das Erhabene, Genie | 57 / 105 / 66; 35 / 108 / 55; 60 / 50 / 47 | taste, the sublime, genius (u; standard) | Follows. | same |
| Ausdehnung / Undurchdringlichkeit | | extension / impenetrability — GW-CPR ✓ | Schelling's dynamics follows Kant's MFNS. | same |
| Anziehung / Zurückstoßung | | attraction / repulsion — Fr ✓ (*Anziehung*) | Follows. | **attraction / repulsion** |
| Chymie | | chemistry — Fr ✓ | | **chemistry** |
| Naturkunde / Naturlehre / Naturgeschichte | 1 / 2 / 1; 15 / 86 / 4; 5 / 44 / 11 | GM *Naturkunde* = natural science ✓(rev.); AN *Naturlehre* = doctrine of nature ✓ | Schelling SW I/3, 46 ✓ ("Die neuere Naturkunde"). | **natural science / doctrine of nature / natural history** |

---

## 3. Period German and false friends (c. 1790–1850)

The machine will translate these with their modern sense. The pipeline must check each occurrence against this list.
Examples are from the corpus (siglum|page as in the portal). Dictionary evidence from Grimm (DWB) ✓ where cited.

### 3.1 Particles and adverbs

| German | F / S / H | Period sense | Wrong (modern) | Rendering | Example |
|---|---|---|---|---|---|
| allerdings | 879 / 928 / 256 | affirmative: **certainly, indeed, to be sure**; concessive only with a following *aber* | "however", "though" (modern concessive) | **indeed / certainly**; "admittedly" only before *aber/doch*. DWB ✓ records the concessive use ("Oft concessiv") and intensifying glosses (*selbst, sogar*). | NW I, 10 ✓: "ist es in diesem Sinne allerdings unser voller Ernst" (= indeed); SW I/1, 100 ✓: "ist allerdings der Akt des Bewußtseyns, aber…" (= to be sure … but) |
| schlechterdings | 182 / 268 / 68 | **absolutely, utterly, under all circumstances** | "badly", "simply" | **absolutely** (DWB ✓: "absolute"; "unbedingt, durchaus, unter allen umständen") | NW I, 335 ✓: "muß schlechterdings also sein" |
| schlechthin | 2 599 / 1 000 / 1 027 | **absolutely, without qualification** | "simply", "par excellence" | **absolutely** (GW-CPR ✓). *das schlechthin Unbedingte* = the absolutely unconditioned. When *schlechterdings* and *schlechthin* co-occur, lemma markup keeps them apart. | |
| lediglich | 1 184 / 123 / 11 | **solely, purely** | "merely" (pejorative) | **solely** (GW-CPR ✓ "solely, strictly") | NW II, 313 ✓: "lediglich um die höhere Polizei … zu handhaben" |
| ohnehin | 11 / 38 / 146 | **in any case, anyway** | | | |
| überhaupt | 2 908 / 3 139 / 3 378 | **in general, as such, at all** (after negation) | "anyway", "actually" | **in general** / **as such**; "at all" after *nicht*. *Bewusstsein überhaupt* = consciousness in general (CK usage, u). | |
| eigentlich | 1 714 / 2 364 / 770 | **proper(ly), genuine(ly), strictly speaking** | "actually" (colloquial filler) | **properly / genuinely / strictly speaking** (P ✓ "really, authentically, genuinely"; AN ✓ "proper") | NW I, 23 ✓: "Dies Ertödten des Lebens ist das eigentliche Geschäft des natürlichen Sinnes" (= proper task) |
| durchaus | 1 994 / 540 / 189 | **throughout, thoroughly, absolutely** | "definitely" (colloquial) | **thoroughly / throughout**; *durchaus nicht* = not at all | |
| freilich | 820 / 872 / 164 | **of course, to be sure** (concessive) | "freely" | **of course / to be sure** | |
| gar | | **at all, even, quite** | "done, cooked" (modern *gar*) | context | |
| bloß | | **mere(ly)** | "naked" | **mere** (GW-CPR ✓ "mere, merely") | |
| eben | | **precisely, just** | "flat, even" | **precisely** | |
| insofern, inwiefern | | **insofar as; to what extent** | | | |
| allein (conj.) | | **but, however** | "alone" | **but** at the start of a clause | |
| itzt, jetzo, anjetzt | | **now** | | | |
| keineswegs / keinesweges | | **by no means** | | | |
| gleichsam | | **as it were** | | | |
| nämlich | | **namely; that is; for** | | | |
| derselbe, dieselbe | | **it, he, she, the latter** (anaphoric pronoun) | "the same" | pronoun; "the same" only for identity | |

### 3.2 Science and medicine c. 1800

| German | F / S / H | Period sense | Wrong | Rendering | Example / note |
|---|---|---|---|---|---|
| Physik, physisch, Physiker | 19 / 396 / 117 | **natural science, physics in the broad sense** (incl. chemistry, physiology); *physisch* = physical, natural | modern "physics" | **physics** with front-matter note; *physisch* = **physical / natural** by context (cf. LS "theory of nature" for *physische Theorie* ✓(rev.)) | SW I/2, 3 ✓ (Schelling quoting Kant: metaphysics "eine Wissenschaft … die der Physik vorangeht") |
| Chemie, Chymie, chemischer Prozess | 4 / 203 / 63 | **chemistry** | | **chemistry** (Fr ✓) | |
| Galvanismus | 0 / 91 / 6 | **galvanism** (animal electricity, Voltaic pile) | "galvanizing" | **galvanism** | SW I/2, 339 ✓: "den sogenannten Galvanismus in der Voltaischen Säule" |
| Magnetismus; tierischer Magnetismus | 25 / 473 / 90; 2 / 6 / 2 | physical magnetism; **animal magnetism** (Mesmerism) | "magnetism" alone for the mesmeric sense | **magnetism**; **animal magnetism** for *tierischer/animalischer Magnetismus*, *magnetischer Schlaf* = magnetic sleep | SW I/3, 158 ✓; SW I/7, 256 ✓ |
| Elektrizität | | **electricity** | | | |
| Wärmestoff, Lichtstoff | 0 / 89 / 21 | **caloric, light-matter** | "heat material" | **caloric**; *Lichtstoff* = luminous matter | |
| Erregbarkeit, Erregung | 1 / 237 / 3 | **excitability, excitation** (Brownian theory) | "irritability" | **excitability** | SW I/2, 412 ✓ ("Grad der Erregbarkeit") |
| Sensibilität, Irritabilität, Reproduktion | | Kielmeyer's three organic functions | Kantian "sensibility" | same words, lemma marked | SW I/2, 562 ✓ |
| Lebenskraft | 5 / 48 / 4 | **vital force** | "life force" (esoteric) | **vital force** | |
| Organisation | 76 / 390 / 152 | **organization** = organized being and its structure | "institution" | **organization** (C31) | SW I/1, 386 ✓ |
| Bildungstrieb | 8 / 90 / 1 | Blumenbach's **formative drive** (*nisus formativus*) | "educational drive" | **formative drive** | |
| Naturkunde / Naturlehre / Naturgeschichte | | natural science / doctrine of nature / natural history (= descriptive classification) | "history of nature" | as in section 2 | SW I/3, 46 ✓ |
| Experiment | 37 / 155 / 22 | **experiment**; also "trial" | | **experiment** | SW I/1, 75 ✓ ("psychologische Experimente anzustellen") |
| Empirie | 239 / 59 / 72 | **empirical knowledge, the empirical** (Fichte: the standpoint of experience) | "empiricism" (= *Empirismus*) | **the empirical** / **empirical knowledge** | NW I, 59 ✓: "Erhebung über die Empirie" |
| Erde, Erden | | chemical **earths** | "soils" | **earths** (GW-CPR, per Ginsborg ✓(rev.)) | |
| Scheidekunst | | **chemistry** (analysis) | "art of separation" | **chemistry** | |
| Arzneikunde, Heilkunde | | **medicine** | | | |
| Seelenkunde, Erfahrungsseelenlehre | | **psychology, empirical psychology** | | | |
| Kakerlaken (Schelling SW I/6, 450) | | **albinos** (period zoological term) | "cockroaches" | **albinos** | SW I/6, 450 ✓ ("blaue Augen bei den Kakerlaken") |

### 3.3 State, society, economy

| German | F / S / H | Period sense | Wrong | Rendering | Example / note |
|---|---|---|---|---|---|
| Polizei | 87 / 5 / 20 | **internal administration and public order** (welfare, safety, health; the *Polizeiwissenschaft*) | "the police (force)" | **police** with front-matter note (the English word had the same broad sense c. 1800, u); "police force" only where officers are meant. DWB ✓: "die regierung, verwaltung und ordnung"; "die sorge eines staats … für das gemeinwohl" | NW II, 615 ✓ (Fichte: *Polizei* such that "die Verborgenheit des Verbrechers nicht zu hoffen sei") |
| polizirt, polizieren | 7 / 0 / 1 | **civilized, refined** (*policé*) | "policed" | **civilized** | GW 1, 46 ✓: "nur auf die polizierteren Stände eingeschränkt" |
| Bürger, bürgerlich | 747 / 25 / 196; 155 / 70 / 195 | **citizen; civil, civic** (and *bourgeois* only where Hegel contrasts *bourgeois/citoyen*) | "burgher", "middle-class" | **citizen; civil**. *bürgerliche Gesellschaft* = **civil society** (Hegel GW 1, 129, 131 ✓, already in the Bern writings); *Bürgervertrag* = civil contract (Fichte) | |
| Stand, Stände | 244+157 / 121+18 / 234+488 | **estate, rank, station**; *Stände* = estates (also the representative body) | "status", "class" (Marxian) | **estate** (P ✓ "estate", "estates"); Sm ✓ "classes" (*Über die Unterschiede der Stände* = "The Distinction of Classes in Society") not adopted | ⚑ C34; GW 1, 46 ✓ |
| Beruf | 112 / 74 / 19 | **calling, vocation**; also office | "profession, job" | **calling** (*Bestimmung* = vocation, C11) | |
| Gelehrter | 514 / 159 / 78 | **scholar, man of learning** | "academic", "scientist" | **scholar** (Sm ✓ 44×) | NW III, 147 ✓ ("was ist der Gelehrte?") |
| Gelehrsamkeit | 21 / 37 / 39 | **erudition, learning** | | **erudition** | |
| Geschäft | 471 / 133 / 245 | **task, business (= what one has to do), affair** | "commercial business, shop" | **task / business** | NW I, 6 ✓: "daß das erste Geschäft demnach sei, den neuen Sinn im Menschen zu wecken" (= the first task) |
| Anstalt; Anstalt machen | 140 / 99 / 101; *Anstalten/Anstalt mach-* 66 / 62 / 49 | **institution, establishment, arrangement**; *Anstalt machen* = **set about, make preparations** | "asylum" (modern *Anstalt*) | **institution / arrangement**; idiom = **set about** | NW I, 54 ✓: "Dazu machen wir nun Anstalt" (= we now set about this) |
| Publikum | 309 / 117 / 131 | **the public, the reading public** | "audience" (theatrical) | **the public** | NW I, V ✓: "dem philosophischen Publikum" |
| Staatswirtschaft | 9 / 0 / 4 | **political economy, public finance** (cameralism) | "state economy" | **political economy** | NW II, 578 ✓; GW 19, 34 ✓: "politischen Oekonomie … rationelle Staatswirthschaft" |
| Ökonomie | 13 / 23 / 5 | **economy** in the sense of household management or ordered arrangement (*Ökonomie der menschlichen Natur*) | modern "the economy" | **economy** (arrangement) / **household management** | GW 1, 180 ✓: "grössere Disposition in der Ökonomie der menschlichen Natur" |
| Eigentum | 835 / 37 / 327 | **property** | | **property** | |
| Vertrag | 542 / 14 / 123 | **contract** | "treaty" (only between states) | **contract** | |
| Strafe | 222 / 51 / 79 | **punishment** | "fine" | **punishment** | |
| Volk | 468 / 659 / 567 | **a people, nation** (political); **the common people** (social, *das gemeine Volk*) | "folk" (romantic), "race" | **a people**; *das (gemeine) Volk* = **the common people**; *Volksreligion* = folk religion (Hegel glossary) | GW 1, 46 ✓: "Die Märchen, die das gemeine Volk unterhalten" |
| Nation | 591 / 208 / 197 | **nation** (cultural-linguistic in Fichte's *Reden*) | | **nation** | |
| Vaterland | 112 / 50 / 71 | **fatherland** (no 20th-century overtone c. 1800); also "native country" | "homeland" | **fatherland** (faithful) | NW III, 211, 217 ✓ (sermon: "daß diese Erde nicht mein Vaterland") |
| deutsch | 744 / 613 / 768 | **German** (cultural-linguistic, before 1871 not a state) | | **German** | |
| Pöbel | | **the rabble, the mob** | "people" | **rabble** | NW II, 132 ✓ ("der schreibende Pöbel") |
| Regierung, Obrigkeit, Fürst | | **government, authorities, prince** | | | |
| Zeitalter | 693 / 272 / 42 | **age, epoch** (Fichte's *Grundzüge des gegenwärtigen Zeitalters*) | "era" (fine) | **age** (Smith's title *Characteristics of the Present Age*, u) | NW I, 28 ✓ ("in unserm Zeitalter") |

### 3.4 Culture, mind, character

| German | F / S / H | Period sense | Wrong | Rendering | Example / note |
|---|---|---|---|---|---|
| Gemüt | 310 / 217 / 154 | Kant: *animus, mens*, includes the understanding (DWB ✓); later the affective inner life | "temperament", "coziness" | ⚑ C7 | NW I, 36 ✓; SW I/1, 355 ✓ |
| Bildung | 706 / 727 / 479 | **formation, cultivation, education**; in nature: **formation** (*Bildung der Erde*) | "education" only | **cultural formation** (P ✓) in Hegel's PhG sense; **cultivation** for Fichte's *Bildung des Menschen*; **formation** in nature; "education" for schooling (*Erziehung* = education, 483 / 59 / 96) | ⚑ minor, fixed by context list |
| Kunst | 521 / 1 524 / 233 | **art** (fine art); also **skill, craft** (*Kunst des Denkens*, *Heilkunst*) | "art" in craft contexts | **art**; "skill/craft" where *Kunst* = technique | |
| Sitte | 159 / 108 / 161 | **custom, mores** | "manners", "morals" | see 1D | GW 1, 266 ✓ ("nach der Sitte der Morgenländer") |
| Phantasie | 87 / 72 / 211 | **imagination, fancy** (often the unregulated productive imagination) | "fantasy" (genre) | **fancy** where opposed to *Einbildungskraft*; **imagination** where not; lemma marked | SW I/1, 52 ✓: "von einer wilden, regellosen Phantasie geleitet" |
| Witz | 44 / 27 / 30 | **wit** = the faculty of finding similarities, quick ingenuity (DWB ✓: Wolff's "die leichtigkeit die ähnlichkeiten wahrzunehmen"); "joke" only from late 18th c. | "joke" | **wit** (AN ✓ "wit"); "witticism" only for an actual quip | GW 18, 36 ✓ ("dem Witze der … vorhergegangenen Geschichte" = ingenuity); GW 11, 401 ✓ ("ein gewöhnlich gewordener Witz" = a commonplace quip) |
| Genie | 60 / 50 / 47 | **genius** (the gifted person and the gift) | | **genius** | |
| Schwärmerei | 100 / 79 / 26 | claim to immediate supersensible insight; religious or political zealotry | "rapture", "crush" | ⚑ C30 | NW I, 499 ✓; NW III, 156 ✓ ("Lügner oder Schwärmer") |
| Begeisterung / Enthusiasmus | 65 / 68 / 30; 8 / 21 / 13 | **inspiration / enthusiasm** | | **inspiration**; *Enthusiasmus* = enthusiasm (if C30 = enthusiasm, lemma marked) | |
| Mystik, Mystiker, mystisch | 22 / 88 / 34 | **mysticism, mystic** | "mystique" | **mysticism** | SW I/1, 319, 326 ✓ |
| Räsonnement, räsonieren | 188 / 41 / 167 | **argumentation, reasoning** (often pejorative: clever but external argument) | "reasoning" (neutral), "grumbling" | **argumentation** (P ✓ "merely clever argumentation" for the pejorative); **reasoning** where neutral | GW 1, 75 ✓ ("Wie weit darf sich Räsonnement einmischen") |
| populär | 65 / 41 / 44 | **popular** = addressed to non-specialists, exoteric (Fichte's *populäre Schriften*); Fichte also uses *populär* = "in plain terms" | "well-liked" | **popular**; "in plain terms" for Fichte's *populär:* glosses | NW I, 179 ✓: "populär, daß es diese Beziehung auch sehe" (= put plainly) |
| positiv, Positivität | 252 / 1 137 / 975 | **positive** = (1) posited, given by authority (Hegel's *Positivität* of religion; positive law); (2) Schelling's late **positive philosophy** (concerned with existence); (3) logical opposite of negative | "optimistic" | **positive** always; translator's note on the three senses | SW I/10, 125 ✓ ("die positive Philosophie … welche sich auf die Existenz bezieht") |
| Gesinnung | | **disposition** | "attitude", "conviction" | **disposition** | |
| Einsicht | 951 / 209 / 370 | **insight** | "inspection" | **insight** (CK ✓ *einsehen* = have insight into) | |
| Religiosität, Andacht | | religiosity, devotion | | | NW III, 57 ✓ |
| Wunder | 151 / 232 / 109 | **miracle**; also wonder | | **miracle** in theology; "wonder" otherwise | |
| Poesie, Dichtung, Erdichtung | 14 / 463 / 46; 51 / 123 / 32 | **poetry**; *Erdichtung* = **fabrication, fiction** (AN ✓) | "poesy" | **poetry; fabrication** | |
| Weltanschauung | 28 / 14 / 30 | **intuition of the world** (transcendental: how the world is intuited) | "worldview" (ideological) | **intuition of the world** where the transcendental sense is present; "worldview" only where an outlook is meant | SW I/3, 182 ✓: "jede Organisation Abdruck eines gewissen Schematismus der Weltanschauung" |
| Ansicht | 890 / 846 / 337 | **view** (standpoint) | | **view** | |
| Sinn | 728 / 1 847 / 561 | **sense** (faculty; meaning); Fichte's *neuer Sinn* = a new sense (organ) | | **sense** | NW I, 6 ✓ |
| Fach | 30 / 24 / 12 | **field, department** | "subject (school)" | **field** | |
| Kritik | | see 1G | "criticism" in Kantian titles | | |
| Evidenz | 177 / 91 / 17 | **self-evidence** | "evidence" | see 1B | NW I, 27–28 ✓ |
| Denker | 58 / 24 / 9 | **thinker** | | | |

### 3.5 Persons and address

| German | F / S / H | Period sense | Rendering | Note |
|---|---|---|---|---|
| Mensch, der Mensch, Menschen | 2 674 / 3 048 / 1 967; *der Mensch* 333 / 619 / 305 | the human being (generic) | ⚑ C1 | CK ✓ "human being"; dG ✓ (26× "human being", 7× "humankind"); P ✓ uses "man" (43×) and "mankind" (6×); Sm ✓ "man" (145×). |
| Menschheit | 500 / 559 / 97 | humanity (the species; also the quality) | **humanity** | "mankind" avoided. |
| Mann, Männer | 536 / 425 / 210 | adult male | **man, men** | Keeps "man" free for *Mann* if C1 = human being. |
| Weib, Weiber | 183 / 99 / 58 | **woman** (period standard term, not yet pejorative in philosophical prose; also "wife") | **woman**; "wife" only where marriage is explicit | SW III, 307 ✓ (Fichte, *Grundriss des Familienrechts*: "dass dieser Trieb beim Weibe unter einer anderen Gestalt…") ⚑ C35 |
| Frau, Frauen | 88 / 42 / 60 | wife, lady; woman | **wife / lady / woman** by context | |
| Herr / Knecht | 419 / 671 / 351 (incl. *Herrn*); 28 / 46 / 99 | (1) master (vs servant); (2) the Lord (God); (3) Mr. / sir (address); (4) lord (feudal) | ⚑ C20 | Schelling's *Herr des Seyns* (0 / 35 / 0) = **Lord of being**. |
| Kind, Jüngling, Greis | | child, youth, old man | | |
| Gelehrter, Lehrer, Schüler, Studierende | | scholar, teacher, pupil/student | | |
| Sie / Er / Ihr (address in lectures) | | "you" | **you** | Fichte's and Hegel's lecture forms (*meine Herren*, *E. H.*) = "gentlemen". |
| man (pronoun) | | one | **one** (GM practice ✓(rev.)); "we" or passive where English demands | |

### 3.6 History-of-the-world and anthropology passages: period ethnic and religious terms

The corpus contains period terms for peoples, many offensive today. Policy proposal (⚑ C26): **faithful, non-softening,
non-amplifying.** Render each term with the English word of the same period and register; do not modernize ("Black
people" for *Neger*), do not sharpen (no slurs where the German is the neutral-descriptive term of its time), add no inline
"[sic]". A single front-matter note explains the policy; the markup flags each occurrence so the reader can show a note.

| German | F / S / H | Rendering | Example |
|---|---|---|---|
| Neger, Negervölker | 2 / 23 / 0 | **Negro, Negro peoples** | SW I/3, 57 ✓ ("die schwarze Farbe des Negers"); SW I/10, 45 ✓ ("den Fetischismus der Negervölker"); SW I/2, 562 ✓ (citing Sömmering) |
| Mohr | | **Moor** | |
| Morgenländer, Orientalen, orientalisch | 0 / 15 / 9 | **Orientals, people(s) of the East, oriental** | GW 1, 256, 266 ✓ ("nach Art der Morgenländer") |
| Wilde | 41 / 25 / 4 | **savages** | |
| Race, Racen | 3 / 40 / 10 | **race(s)** | SW I/3, 57–58 ✓ ("Abartungen oder Racen desselben Stamms") |
| Jude, Juden, jüdisch | 75 / 117 / 108 | **Jew, Jews, Jewish** | NW I, 377 ✓ (Fichte on Leibniz's syllogism example "der Jude glaubt nicht") |
| Heiden, heidnisch | 60 / 405 / 29 | **heathens / pagans, pagan** (pagans for antiquity, heathens for Christian polemic) | |
| Zigeuner, Hottentotten, Eskimo, Mongolen | 1 / 7 / 1 | **Gypsies, Hottentots, Eskimos, Mongols** | |
| Türke, Muhammedaner | | **Turk, Mohammedan** (period English) ⚑ minor (alternatively "Muslim") | |
| Kakerlaken | | **albinos** | see 3.2 |

---

## 4. Conventions for the pipeline

| # | Topic | Proposal | Basis | ⚑ |
|---|---|---|---|---|
| 4.1 | **Sperrsatz (letter-spacing) = emphasis** | → *italics*. Nested emphasis inside italics → roman. | Universal practice of the Cambridge translations (u). | |
| 4.2 | **Antiqua inside Fraktur** (foreign words, Latin tags) | Not emphasis: render roman; Latin/French tags in italics only if English usage italicizes them (*causa sui*, *eo ipso*), never "a priori". | Typographic convention of the source, not authorial emphasis. | |
| 4.3 | **Bold, Kapitälchen** (headings, names in Schelling SW) | Small caps for person names in Kapitälchen are dropped (plain roman); bold kept only in headings. | | |
| 4.4 | **Capitalization** | God, Christ, Holy Spirit, Father/Son (Trinity), Fall (*Sündenfall*), Revelation only as a title; **lowercase**: spirit, nature, the absolute, the I, the not-I, reason, the concept, world spirit, the divine, Godhead **capital** (proper name of the divine essence). *Idee* per D5. | P ✓ capitalizes only "Idea"; BD dG lowercase ✓ (Hegel glossary). | C21 |
| 4.5 | **Hyphenation of compound abstractions** | Hyphenate nominalized phrases: being-in-itself, being-for-itself, being-for-other, subject-object, self-positing, self-intuition, not-I, I-hood. Do **not** hyphenate adverbial use ("the I posits itself for itself"). *Ich = Ich* → "I = I"; *A = A* unchanged. | Hegel glossary row *an sich* ✓; dG P. | |
| 4.6 | **Pronouns** | *das Ich, der Begriff, der Geist, die Natur, das Absolute* → "it". *Gott* → "he" (lowercase; consistent with "God" capitalized). *der Mensch* → "he" (period grammar) or repeat the noun; never singular "they" in the text. | | C27 |
| 4.7 | **Mensch** | "human being" (CK, dG); "man" only for *Mann* and where the German contrasts the sexes. Plural "human beings"; *Menschheit* = humanity; established titles keep their wording in the bibliography (e.g. *The Vocation of Man*, Preuss, u). | GW-CPR ✓; AN ✓; dG ✓; P ✓ "man"; Sm ✓ "man". | C1 |
| 4.8 | **German terms kept untranslated** | Only *Wissenschaftslehre* (roman, no italics, as a proper name). Translated: *Naturphilosophie* (philosophy of nature), *Weltalter* (*Ages of the World*, Wr title, u), *Aufhebung* (sublation, never kept in German), *Dasein*, *Geist*, *Gemüt*, *Bildung*, *Sittlichkeit*, *Volksgeist*, *Ding an sich*. | Br ✓ title keeps *Wissenschaftslehre*. | C22, C23 |
| 4.9 | **Terms English cannot distinguish** | German lemma in markup on every glossary term (`<term lemma="Gegenstand">object</term>`); no bracketed German in the reading text. Reader: tooltip and parallel view. List of mandatory pairs: Gegenstand/Objekt; Dasein/Existenz; Unterschied/Differenz; Gleichgültigkeit/Indifferenz; ideal/ideell; real/reell; Grundsatz/Prinzip; Leib/Körper; Moralität/Sittlichkeit (Fichte); Schein (illusion/semblance/shine); Willkür (choice/arbitrariness); Gemüt (mind/heart); Grenze/Schranke/Beschränkung; Wissen/Erkenntnis/Kenntnis; Allheit/Totalität; Sensibilität/Sinnlichkeit; schlechthin/schlechterdings; Phantasie/Einbildungskraft; geschichtlich/historisch. | Hegel glossary principle 4; CK footnote practice ✓ ("marking the Latinate member of the pair in the footnotes"). | |
| 4.10 | **Greek** (S: ≈ 9 400 Greek tokens; H ≈ 580; F ≈ 50) | Keep in Greek script, exactly as printed (accents as in source). The author's own German gloss is translated; where there is none, an English translation goes into the note layer, not inline. No transliteration. | Counts from corpus regex on Greek Unicode blocks. | C25 |
| 4.11 | **Latin, French, Italian, English quotations** | Keep in the original; English translation in the note layer. Latin tags (*a priori, per se, causa sui, natura naturans, eo ipso, in concreto*) stay without translation. English quotations (Locke, Hume, Newton in Schelling/Hegel) stay as printed. | | C25 |
| 4.12 | **Quotations of Kant, Spinoza, Jacobi, Fichte, Schelling inside the texts** | Translate fresh from the author's German (they quote loosely and their wording matters), **using this glossary's renderings**, so Kant's terms come out as in CK. Do not paste the Cambridge text. Spinoza in Latin stays Latin (4.11); Spinoza in German: *Substanz/Attribut/Modus* = substance/attribute/mode, *natura naturans/naturata* kept. Cross-quotations among our three authors use our own translation of the quoted passage, so that a Hegel quotation of Fichte matches our Fichte. | | |
| 4.13 | **Biblical quotations** | Luther's wording as quoted by the author → translate the author's German, aligned to the **King James Version** wherever the German follows Luther verbatim (the period's English Bible; Pinkard gives the KJV alongside Luther 1545 in his note on Phil 2:6–8 ✓). Book/chapter/verse references in English form (*Joh.* 1, 1 → John 1:1). Corpus: *Joh./Evangel.* 162 / 152 / 60; *Matth./Röm./Kor./1. Mos.* 57 / 85 / 55. | P ✓ note on Philippians. | C24 |
| 4.14 | **Luther's German otherwise** (hymns, Table Talk, catechism) | Translate fresh; mark as quotation. | | |
| 4.15 | **Editorial abbreviations** | Keep the portal's sigla untranslated: **SW** (Fichte: *Sämmtliche Werke*, ed. I. H. Fichte, 1845–46; Schelling: *Sämmtliche Werke*, ed. K. F. A. Schelling, 1856–61), **NW** (Fichte: *Nachgelassene Werke*, 1834–35), **GW** (Hegel: *Gesammelte Werke*). Because "SW" is ambiguous across the portal, the English apparatus prefixes the author where needed: "Fichte, SW III, 307"; "Schelling, SW I/7, 350". | Portal sigla as in corpus files. | |
| 4.16 | **Page references** | Original pagination is retained as markers (`|307|`), never renumbered. References inside the texts (e.g. "S. 59", "p. 17") → "p. 59" unchanged in number. | | |
| 4.17 | **Titles of works cited by the authors** | Established English titles for Kant (CK), Spinoza, Leibniz, Jacobi where they exist; otherwise translate; the German title in markup. | | |
| 4.18 | **Personal names** | Modern standard forms: Leibnitz → Leibniz, Cartes/Cartesius → Descartes, Platon → Plato, Aristoteles → Aristotle, Sokrates → Socrates, Jakob Böhme → Jacob Boehme ⚑ minor. | | |
| 4.19 | **Units, currency, dates** | No conversion. *Fuß* = foot, *Zoll* = inch, *Meile* = mile (German mile; front-matter note: ≈ 7.5 km), *Elle* = ell, *Pfund* = pound, *Lot* = half-ounce (*Loth*); *Taler* = thaler, *Groschen* = groschen, *Gulden* = gulden (florin), *Kreuzer* = kreuzer, *Louisdor* = louis d'or. Dates translated in form ("d. 3. Jun. 1801" → "3 June 1801"). Corpus: currency words 28 / 3 / 68; units 11 / 76 / 58. | | |
| 4.20 | **Sentence and paragraph boundaries** | Preserve the author's sentence as the unit; do not split long periods unless English syntax breaks. | CK general editors ✓: "we try to preserve Kant's own divisions of sentences and paragraphs wherever possible". | |
| 4.21 | **Impersonal *man*** | "one"; "we" or passive only where "one" is unidiomatic. | GM always "one" ✓(rev.) (Ginsborg calls it stiff). | |
| 4.22 | **Spelling** | American (portal decision). *-ize* forms; "labor", "behavior", "judgment", "skeptic", "aesthetic". | Task brief. | (D15 settled) |
| 4.23 | **Emendations and *sic*** | None in the translation; the German text is authoritative and visible in the parallel view. | | |
| 4.24 | **Mathematical and logical notation** | Unchanged (*A = A*, *A = B*, Schelling's potency notation A¹, A², A³, +A, −A). | | |
| 4.25 | **Fichte's late-lecture shorthand** (NW: "u.s.w.", "d. h.", "E. H.", dashes) | Expand abbreviations silently (*d. h.* = "i.e.", *u.s.w.* = "etc."); keep dashes as em-dashes. | | |

---

## 5. ⚑ Decisions

### 5a. How Hegel's D1–D15 play out across Fichte and Schelling

Not re-decided here; this is the cross-author evidence for each.

| # | Term | Fichte | Schelling | Effect on the options |
|---|---|---|---|---|
| D1 | Dasein / Existenz (F 808 / 262; S 670 / 773) | Late Fichte pairs *Sein* and *Dasein* (being and its existence/manifestation); "determinate being" (b) would be wrong. | *Existenz* is a key term: Freedom essay (*Grund von Existenz*, *das Existierende*), positive philosophy (existence as the "that"). It must be plain "existence". | **(a) works across authors** if "concrete existence" stays a context rendering for Hegel's doctrine of essence. (b) fails in Fichte. (c) is what Fichte and Schelling need anyway. |
| D2 | Beziehung / Verhältnis (F 934 / 1 119; S 739 / 2 890) | Ordinary usage; *Verhältnis* also "ratio" in GWL's quantitative passages. | Schelling's *quantitative Differenz*, *Potenzenverhältnis*: "ratio" needed. | (a) fits both; "ratio" rule applies in Schelling's identity philosophy too. |
| D3 | Gegenstand / Objekt (F 665 / 801; S 1 111 / 1 722) | *Objekt* frequent, opposed to *Subjekt*. | *Subjekt-Objekt*. | **(b) "subject matter" is impossible in Fichte and Schelling**; (a) is the only cross-author option, and it is also CK practice ✓. |
| D4 | Einzelheit (F 4; S 46; *einzeln* 1 229 / 2 274) | Rare as a noun. | Rare as a noun. | No cross-author conflict. *Individuum* = individual in all three (keep free, as (a) intends). |
| D5 | Capitalization | *Idee* = Kantian idea or (1805 *Wesen des Gelehrten*) the divine Idea (u). | Plural *Ideen* = archetypes (*Bruno*, *Methode*, *Kunst*); singular *die Idee* in the identity philosophy. | If (b) "Idea": a mechanical rule is needed: capital only for the singular *die Idee* in its absolute sense (Hegel; Schelling's identity philosophy; Fichte 1805/06); lowercase for Kant's ideas of reason and for plurals. (a) needs no rule and is safer for a machine. |
| D6 | an ihm (selbst) (F 3; S 5; H 945) | Practically absent. | Practically absent. | Hegel-only. |
| D7 | Entäußerung / Entfremdung (F 0 / 15; S 68 / 58) | — | Late Christology (*Philosophie der Offenbarung*): Christ's self-emptying (Phil 2:7). | (a) "externalization" fits Schelling's general uses; for the kenotic passages a note is needed in either option. Note: P's own glossary gives *Entäußerung* = "emptying" ✓, although his text uses "relinquish" (Hegel glossary: 84×). |
| D8 | die Sache selbst (F 44; S 67) | Ordinary "the matter itself". | Ordinary. | (a) "the matter itself" is the only option that also works as ordinary usage in Fichte and Schelling. |
| D9 | Herr / Knecht | Few uses; mostly address (*Herr*). | *Herr* = the Lord (*Herr des Seyns*, 35×). | Any option for Hegel; Schelling needs **Lord** by sense (C20). |
| D10 | Schein (F 114; S 232) | Late WL: semblance. | Semblance; art (*schöner Schein*) = beautiful semblance. | (a) works: "semblance" outside Hegel's essence logic; Kant's sense = "illusion" (C16). |
| D11 | selbständig (F 588; S 366) | *Selbstständigkeit* of the I (Fichte's ethics). | Ordinary. | (a) "self-sufficient" = CK too ✓; fits both. |
| D12 | Entzweiung (F 17; S 132) | Rare. | Freedom essay and Stuttgart lectures. | (a) "diremption" fits. |
| D13 | Reflexion-in-sich (F 0; S 0) | — | — | Hegel-only. |
| D14 | Gehalt (F 238; S 72; noun alone 145 / 65 / 209) | *Gehalt* = substantive content (and salary! *Gehalt* in Fichte's university writings, u). | Ordinary. | (b) "basic content" is awkward in Fichte's ordinary uses; allow "import" (a) as context alternative. "salary" where meant. |
| D15 | Spelling | | | American (portal), settled. |

### 5b. Cross-author decisions

✓ = verified rendering (section 6); (u) = unchecked.

| # | Term(s) | Options (who uses what) | Recommendation |
|---|---|---|---|
| C1 | **Mensch** (F 2 674; S 3 048; H 1 967) | (a) *human being*: GW-CPR ✓, AN ✓, dG ✓ · (b) *man*: P ✓ (43×), Sm ✓ (145×), LS (u) · (c) mixed by readability | **(a)**, with "man" reserved for *Mann*. It follows CK and dG, and keeps *Mann/Mensch* apart in the data. Established titles stay in the bibliography. |
| C2 | **das Ich** | (a) *the I*: Br (u), P ✓ · (b) *the self*: HL (u), He (u) · (c) *the ego*: Sm ✓, Marti (u) | **(a)** in all three. |
| C3 | **Nicht-Ich** | (a) *not-I* (Hegel glossary) · (b) *Not-I* (Br, u) · (c) *not-self* (HL, u) · (d) *non-ego* (Sm ✓) | **(a)**, lowercase, matching lowercase "the I"-phrases and 4.4. |
| C4 | **Sittlichkeit** vs **Moralität** | (a) *ethical life* in Hegel, *morality* in Kant/Fichte (both nouns), lemma marked · (b) *ethical life* everywhere (forces Hegel's distinction onto Fichte) · (c) *morality* everywhere (destroys Hegel's) | **(a)** deliberate divergence. Schelling: "ethical life" where he follows Hegel's contrast (rare), otherwise "morality". *sittlich* = **ethical** in all three. *Sittenlehre* = **ethics** (title: *The System of Ethics*, Breazeale/Zöller, u). |
| C5 | **Willkür** | (a) *power of choice* (faculty; GW-CPR ✓, AN ✓) / *arbitrariness* (caprice; Schelling, Hegel) · (b) *choice* throughout (Gr ✓(rev.)) · (c) *arbitrary will* throughout (Hegel glossary, P ✓ "arbitrary free choice") | **(a)** by sense, lemma marked; *freie Willkür* = free choice. The Hegel glossary's "arbitrary will / free choice" fits inside (a). |
| C6 | **Zweck** | (a) *end* (CK: GW-CPR ✓, GM ✓(rev.), AN ✓) · (b) *purpose* (dG P BD ✓) · (c) *end* in Kant-dependent texts (Fichte's ethics, Kant quotations), *purpose* in Hegel and Schelling | **(b) purpose** everywhere, with **end** only in fixed phrases (*Endzweck* = final end, *Zweck an sich selbst* = end in itself, *Reich der Zwecke* = kingdom of ends). Rationale: one word per lemma; Hegel's corpus has already decided for "purpose"; the fixed Kantian phrases carry the Kantian association. |
| C7 | **Gemüt** | (a) *mind* everywhere (CK ✓) · (b) *mind* (cognitive) / *heart* (affective) · (c) *disposition* | **(b)**, lemma marked. Never "soul"/"spirit". With C7(b) *Herz* also = heart: marked. |
| C8 | **Potenz** | (a) *potency* (Schelling translations, u) · (b) *power* (Hegel glossary, dG for the exponent ✓) | **(a)** everywhere, "power" only for arithmetic exponents. Hegel's Jena Potenzen are Schelling's. |
| C9 | **das Seiende** | (a) *that which is / what is* · (b) *the existent* (P ✓) · (c) *being(s)* | **(a)**; *das Existierende* = the existent. |
| C10 | **Wissen** | (a) *knowing* (nominalized infinitive as the topic: Fichte's *Wissen*, Hegel's *absolutes Wissen*) / *knowledge* (Kantian, ordinary) · (b) *knowledge* everywhere (CK ✓) · (c) *knowing* everywhere | **(a)**. Fichte's *absolutes Wissen* and Hegel's must both read "absolute knowing". |
| C11 | **Bestimmung** (des Menschen) | (a) *vocation*: GW-CPR ✓, AN ✓, Sm ✓, BD ✓ · (b) *destiny*: P ✓ | **(a)** in all three. |
| C12 | **Intelligenz** | (a) *intelligence*: I ✓, HL (u) · (b) *intellect*: Br (u) | **(a)**; "intellect" only for *Intellekt*. |
| C13 | **Wechselwirkung** | (a) *interaction*: GW-CPR ✓, AN ✓ · (b) *reciprocal action*: M (Hegel glossary) · (c) *reciprocity* | **(a)**; *Wechselbestimmung* = reciprocal determination. |
| C14 | **Grenze / Schranke / Beschränkung** | (a) *limit / limitation / restriction* · (b) CK *boundary / limitation / limit* (GW-CPR ✓) · (c) *limit / limit / limitation* (Fichte translators, u) | **(a)**: keeps Hegel's *Grenze* = limit (dG/M), gives Kant's *Schranke* its CK "limitation", and frees "restriction" for Fichte's *Beschränkung* (lemma marked; *beschränken* = restrict/limit by context). Kant's *Grenze* vs *Schranke* (Prolegomena § 57) is preserved. |
| C15 | **Glaube** | (a) *faith* (religious) / *belief* (epistemic, incl. Jacobi) · (b) *faith* throughout (P ✓) · (c) *belief* throughout | **(a)** by sense, lemma marked. Hegel's *Glauben und Wissen* = "Faith and Knowledge" (title, u). |
| C16 | **Schein** | (a) *illusion* (Kantian dialectic, CK ✓) / *shine* (Hegel's essence logic, D10) / *semblance* (elsewhere, P ✓) · (b) *semblance* everywhere except Hegel's essence logic | **(a)**. |
| C17 | **Leib / Körper** | (a) both *body*, lemma marked; *physical body* for *Körper* where contrasted · (b) *Leib* = *lived body* (anachronistic) · (c) *Leib* = *human body* (AN ✓) | **(a)**. |
| C18 | **Darstellung** | (a) *presentation* (default; Vt title, u; Fr ✓ "present") / *exhibition* (Kant's technical sense, GW-CPR ✓) · (b) *exposition* (P ✓) | **(a)**; "exposition" only for *Exposition/Erörterung*. |
| C19 | **Duplizität** | (a) *duplicity* (Schelling translations, u) · (b) *duality* (merges with *Dualität*) · (c) *doubleness* | **(a)** with a front-matter note; keeps the lemma unique. |
| C20 | **Herr** | (a) by sense: *master* (vs *Knecht*, D9), *the Lord* (God), *lord* (feudal), *Mr.* (address) · (b) one word | **(a)**. |
| C21 | **Capitalization** (extends D5) | (a) lowercase except God/Christ/Holy Spirit/Godhead and D5's "Idea" · (b) Miller-style capitals (Spirit, Notion, Absolute, Nature) · (c) lowercase everything except God | **(a)** with D5(b), or **(c)** with D5(a). Either way: "the absolute" lowercase in all three. |
| C22 | **Wissenschaftslehre** | (a) untranslated (Br ✓) · (b) *Science of Knowledge* (HL ✓) · (c) *Doctrine of Science* (Thomas-Fogiel ✓(rev.)) · (d) *Science of Knowing* (Wright, u) | **(a)**, in all three. |
| C23 | **Naturphilosophie** | (a) *philosophy of nature* in the text · (b) keep *Naturphilosophie* for Schelling's program | **(a)**; the apparatus may use *Naturphilosophie* as a historical label. |
| C24 | **Bible** | (a) translate the author's German, aligned to KJV where it follows Luther verbatim (P ✓ cites KJV) · (b) align to NRSV · (c) translate fresh without alignment | **(a)**. |
| C25 | **Greek/Latin quotations** | (a) keep original; translation in note layer · (b) keep + bracketed translation inline · (c) translate inline, original in note | **(a)**; essential for Schelling's mythology volumes (≈ 9 400 Greek tokens). |
| C26 | **Period ethnic terms** | (a) faithful period equivalents + one front-matter note + markup flag · (b) modernize · (c) faithful + inline [sic] | **(a)**. |
| C27 | **Pronoun for God / der Mensch** | (a) "he" for both (lowercase for God) · (b) "He" for God · (c) singular "they" for *Mensch* | **(a)**. |
| C28 | **Verschiedenheit** | (a) *diversity* (AN ✓, dG ✓) · (b) *difference* (GW-CPR ✓) | **(a)**. |
| C29 | **Allheit** | (a) *allness* (Kemp Smith, u) · (b) *totality* (GW-CPR ✓) | **(a)**, because Schelling uses *Allheit* and *Totalität* side by side (195 / 559). |
| C30 | **Schwärmerei** | (a) *enthusiasm* (GW-CPR ✓) · (b) *fanaticism* (Pl, per secondary literature) · (c) *wild fantasy* (AN ✓) | **(a)** CK, with lemma mark to keep *Enthusiasmus* recoverable. (b) is clearer for modern readers; your call. |
| C31 | **Organisation** | (a) *organization* + note · (b) *organism* (merges with *Organismus*) | **(a)**. |
| C32 | **Grundsatz / Prinzip** | (a) both *principle*, lemma marked (GW-CPR ✓, P ✓) · (b) *Grundsatz* = *fundamental principle* · (c) *Grundsatz* = *axiom* | **(a)**; Fichte's *erster Grundsatz* = "first principle". |
| C33 | **Evidenz** | (a) *self-evidence* · (b) *evidentness* · (c) *evidence* (false friend) | **(a)**. |
| C34 | **Stand / Stände** | (a) *estate(s)* (P ✓) · (b) *class(es)* (Sm ✓) · (c) *rank / station* | **(a)**; "station" for an individual's *Stand* in life. |
| C35 | **Weib** | (a) *woman* (and *wife* by context) · (b) *female* | **(a)**. |
| C36 | **aufheben** in Fichte and Schelling | (a) *cancel / annul* where they mean it, *sublate* only in Hegel and where they adopt Hegel's sense · (b) *sublate* everywhere (search uniformity) | **(a)** with lemma mark: the search still finds *aufheben* through the lemma; "sublate" in Fichte's GWL would read Hegel back into 1794. |

---

## 6. Sources and verification

### Checked in this session (✓)

**Cambridge Kant (local PDFs, `~/Documents/Archiv/Literatur/Kant/`):**
- **GW-CPR 1998**: Kant, *Critique of Pure Reason*, tr./ed. Paul Guyer and Allen W. Wood (Cambridge, 1998). General
  editors' preface (principle 1 "single general glossary"; principle 3 on sentence divisions); "Note on translation"
  (Gegenstand/Object marked in footnotes; following Kemp Smith "in many of his choices"); **Glossary, German–English**
  (local PDF pp. 802–813; printed page numbers not visible in the scan) with its footnote on omitted cognates. In-text
  counts of renderings run on the extracted text (e.g. "power of choice" 12×, "the unconditioned" 57×, "faculty of desire"
  3×, "human being" 67×, "sum total" 49×).
- **GW-CPR 2025**: 2nd edition (Cambridge, 2025), Glossary pp. 718 ff.: compared with 1998 by diff; no substantive changes
  in the entries used here.
- **AN**: Kant, *Lectures on Metaphysics*, tr./ed. Karl Ameriks and Steve Naragon (Cambridge, 1997), German–English
  glossary pp. 513–516 (e.g. Gemüt = mind; Geist = spirit, mind; Leib = human body; Willkür = choice (power of);
  Schwärmerei = wild fantasy; Selbsttätigkeit = spontaneity; Sittlichkeit = morality; Seligkeit = blessedness; Witz = wit;
  Mensch = human being; Menschenverstand (gemeiner) = common sense; Erdichtung = fabrication, fiction).
- **Fr**: Kant, *Metaphysical Foundations of Natural Science*, tr./ed. Michael Friedman (Cambridge, 2004), Glossary
  German–English (Bestrebung = striving; Chymie = chemistry; Construction = construction; darstellen = present).

**Cambridge Kant via reviews (✓(rev.)):**
- **GM**: Hannah Ginsborg, review of Kant, *Critique of the Power of Judgment*, tr. Guyer and Matthews (2000),
  *Philosophical Review* 111.3 (July 2002), 429–435 (PDF via philosophy.berkeley.edu/file/14/gmreview.pdf): Zweck = end,
  Zweckmäßigkeit = purposiveness (Meredith "finality", Pluhar "purpose/purposiveness"); Vorstellung = representation
  (Pluhar "presentation"); beurteilen = judge; Wohlgefallen = satisfaction (Pluhar "liking"); Urteilskraft = power of
  judgment; *man* = "one"; erzeugen = generate; Naturkunde = natural science; Erde = earths in GW-CPR. The CPJ glossary
  itself (pp. 399–412 per Cambridge Core listing) was not accessible.
- **Gr**: Jeffrey Kinlaw, review of Pluhar's *Critique of Practical Reason* (2002), *Notre Dame Philosophical Reviews*
  (ndpr.nd.edu/reviews/critique-of-practical-reason/): "Gregor uses 'choice' exclusively" for Willkür; Pluhar "power of
  choice", "power of desire"; Gregor "faculty of desire"; Gregor renders both Empfindung and Gefühl as "feeling" (as
  summarized by the search tool; the "choice" and "power of desire" statements were read on the page).
- **LS**: Dale E. Snow, review of Schelling, *Philosophical Inquiries into the Essence of Human Freedom*, tr. Love and
  Schmidt (2006), *NDPR* 16 April 2007 (ndpr.nd.edu/news/philosophical-inquiries-into-the-essence-of-human-freedom/):
  "scientific worldview" (Gutmann "systematic world view"); "theory of nature" for *physische Theorie*; "centerpoint".

**Hegel translations (local PDFs, `~/Documents/Archiv/Literatur/Hegel/`):**
- **P**: Pinkard, *The Phenomenology of Spirit* (Cambridge, 2018), Glossary of Translated Terms pp. 475–483 (read in
  full: Entäußerung = emptying; Willkür = arbitrary, arbitrary free choice; Bestimmung = determination, destiny;
  eigentlich = really, authentically, genuinely; Zweck = purpose, end, aim; Sitte = ethos, mores; Stand = estate;
  Idee = Idea (capitalized); Verstand = the understanding, the intellect; Grundsatz = principle, proposition); counts of
  "man" (43), "mankind" (6); translator's note quoting Luther 1545 and the KJV for Philippians 2:6–8.
- **dG**: di Giovanni, *The Science of Logic* (Cambridge, 2010): counts "human being" 26, "humankind" 7, "men" 2;
  "ratio of powers" 21×; "intellectual intuition" 7×.

**Fichte translation (local PDF):** **Sm**: Fichte, *The Vocation of the Scholar*, tr. William Smith (London, 1847),
`~/Documents/Archiv/Literatur/Deutscher Idealismus/Fichte - The Vocation of the Scholar.pdf`: contents ("The Absolute
Vocation of Man", "The Distinction of Classes in Society", "The Vocation of the Scholar"); counts "Ego" 25, "Non-Ego" 4,
"man" 145, "scholar" 44, "vocation" 66.

**Dictionaries:** Grimm, *Deutsches Wörterbuch* (1st ed.), via dwds.de/wb/dwb/…: *schlechterdings* (Frisch "absolute";
"unbedingt, durchaus, unter allen umständen"); *Polizei* (sense 1 "die regierung, verwaltung und ordnung", 15th–17th c.;
sense 2a care of the state "für das gemeinwohl"); *allerdings* ("Oft concessiv"; glosses *selbst, sogar, beinahe*);
*Witz* (older senses "verstand, klugheit"; Wolff's definition via similarities; "scherz" prevails at the end of the 18th c.);
*Gemüt* (= *mens*, *animus*; for Kant still *animus*, the understanding included).

**Other web sources consulted:** search results confirming Breazeale's title *J. G. Fichte: Foundation of the Entire
Wissenschaftslehre and Related Writings (1794–95)* (OUP, 2021) and the review noting he corrected Heath/Lachs; catalog
records for Heath/Lachs, *Science of Knowledge (Wissenschaftslehre) with the First and Second Introductions*
(Appleton-Century-Crofts, 1970; Cambridge reprint 1982); a review excerpt glossing *Wissenschaftslehre* as "Doctrine of
Science" (Thomas-Fogiel); secondary literature reporting that Pluhar and Bernard render *Schwärmerei* as "fanaticism".

**Corpus:** `zaehle.py count/kwic` (folded) and a case-sensitive regex counter over the same files in the scratchpad
`korpus/` directory; candidate lists `kandidaten-{fichte,schelling,hegel}.txt` compared for nouns in the top 700 of at
least two authors (591 shared nouns). All page references in section 3 were read in KWIC output.

### Not checked (u)

- Breazeale's renderings (*the I*, *Not-I*, *F/Act* for *Tathandlung*, *check* for *Anstoß*, *intellect* for
  *Intelligenz*); Heath/Lachs's *self/not-self*; Heath's *self* in the *System of Transcendental Idealism*; Marti's *ego*;
  Baur's *summons*; Breazeale/Zöller's *System of Ethics* conventions; Wright's *Science of Knowing*; Preuss's
  *Vocation of Man*.
- Schelling translations: Love/Schmidt's *non-ground* and *man*; Matthews's and Vater's *potency*; Vater's
  *Presentation of My System*; Wirth's *Ages of the World*; Schelling translators' *duplicity*.
- Gregor's actual glossary (*Achtung* = respect, *Gesinnung*), Guyer/Matthews's glossary pages, di Giovanni's *Religion*
  glossary, Kemp Smith's *allness*.
- **Cassin**, *Dictionary of Untranslatables* (Princeton, 2014): I could not access the entries on *Geist*, *Gemüt*,
  *Bildung*, *Dasein*, *Wirklichkeit*, *Sittlichkeit*, *Aufheben*; a review (John Toren, *Rain Taxi*) mentions only
  *Dasein*, *Aufheben* and *Sorge*. Nothing in this file relies on Cassin.
- Inwood, *A Hegel Dictionary*; *Historisches Wörterbuch der Philosophie*; Adelung: not consulted (no local copy found,
  not reached online).
- The claim that English "police" c. 1800 still had the broad administrative sense (section 3.3, *Polizei*) is from memory.
