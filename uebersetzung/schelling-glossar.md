# Schelling glossary for the English translation (draft 1, 9 Nov 2026)

Scope: the Sämmtliche Werke ed. K. F. A. Schelling as in the portal corpus, 14 volumes, ≈ 2.46 M words:
- I/1–I/10: Jugendschriften → Zur Geschichte der neueren Philosophie
- II/1–II/4: Mythologie, Offenbarung

Companion to `hegel-glossar.md`. Its structure and conventions are kept: ⚑ = decision needed, ✓ = verified.

**Status:** proposal. Rows marked ⚑ need a decision (section 1). The Hegel draft has its own open decisions (D1–D15). This draft does not re-decide them. Where Schelling's usage collides with a Hegel choice, the row carries a **Cross-author** note. Section 5 collects these collisions in one table.

## 0. Principles (Schelling-specific, proposal)

1. **Follow the current SUNY/Cambridge translations where they exist.** The standard references are:
   - Love/Schmidt, *Freedom essay* (2006)
   - Matthews, *Grounding of Positive Philosophy* (2007)
   - Peterson, *First Outline* (2004)
   - Vater, *Bruno* (1984) and Vater/Wood (2012)
   - Richey/Zisselsberger, *Historical-Critical Introduction* (2007)
   - Harris/Heath, *Ideas* (1988)

   Schelling has no single modern translation team, so the translators disagree more often than Hegel's do. Every disagreement on a key term is listed in section 1. Where they agree, we follow them without discussion.
2. **One rendering per term across all 14 volumes, unless the row states a period rule.** Schelling reuses the same word with shifted meaning: *Potenz* in 1799, 1801, 1810 and 1842; *Indifferenz*; *das Seyende*; *Grund*; *Aktus*. A period rule is allowed only where the row gives one. It is tied to volume ranges, e.g. "*Aktion* = actant in I/3 Erster Entwurf, otherwise action".
3. **No neologisms of our own.** Every rendering already exists in a published translation or in the scholarly literature. Where that is uncertain the row says so. Coinages by single translators (*actant*, *cision*, *eisemplasy*, *potence*, *being-ness*, *pre-jective*) are listed and are adopted only where the row says so.
4. **The German stays recoverable.** Every glossary term carries its German lemma in the markup, exactly as in the Hegel glossary. This applies especially to distinctions English cannot make:
   - Seyn / Wesen / Daseyn / Existenz
   - Indifferenz / Gleichgültigkeit
   - Identität / Einerleiheit
   - Scheidung / Entscheidung / Unterscheidung
   - Gegenstand / Objekt
   - Zusammenziehung / Contraktion
   - ideell / ideal, reell / real
   - Urbild / Vorbild
   - Seynkönnen / Können
5. **Period orthography.** SW prints *Seyn, seyn, Thätigkeit, Princip, Proceß, affirmiren, Centrum, Theil, Nothwendigkeit*. It is the orthography of 1856–61, not a doctrine. *Seyn* = *Sein* = **being**. Never render it "Beyng", "Be-ing" or "Seyn": Heidegger's archaizing *Seyn* has nothing to do with it (Dews p. xviii warns against Heideggerian contamination of *das Seyende* ✓). In quotations and German markup we keep SW's spelling as printed. Search and the glossary fold the spellings (zaehle.py).
6. **Formula notation is copied, not translated.** Copy all of the following character for character, including superscripts, spacing and parentheses:
   - A = A, A = B, +A = B, A = +B, −A, ±A, A : B, A/B
   - A¹, A², A³, A⁴; B; (A = B)
   - 1, 2, 3 for the potencies in II/2 ("1 haben wir bestimmt als das nicht actu Seyende", SW II/2, 81)

   Never expand A² into prose ("the second potency") unless Schelling does. Never "correct" A³ to A^3 or A3. The equals sign in "A = B" is the *copula of identity*, not arithmetic equality: do not render "=" as "equals" when it stands inside a sentence ("die absolute Identität als Grund von Existenz = Schwerkraft", SW I/4, 163 → "… as ground of existence = gravity").
7. **Schelling's own Greek, Latin, Hebrew and French stay in the original.** Our translation goes in a note or in square brackets only where Schelling gives none (section 4).
8. **Spelling: American** (per the owner's brief; cf. Hegel D15).
9. **SW pagination.** The reader shows SW page numbers in the margin. Citations inside Schelling's text ("S. 184", "II, 83") stay as printed.

Abbreviations for translations (full references and what was checked: section 6):

| Siglum | Translation |
|---|---|
| **Ma** | Marti, *The Unconditional in Human Knowledge* (1980) |
| **HH** | Harris/Heath, *Ideas* (1988) |
| **Pe** | Peterson, *First Outline* (2004) |
| **He** | Heath, *System of Transcendental Idealism* (1978) |
| **Pf** | Pfau, *Idealism and the Endgame of Theory* (1994; Würzburg System, Stuttgart Seminars) |
| **Va** | Vater, *Bruno* (1984) |
| **VW** | Vater/Wood, *Philosophical Rupture* (2012) |
| **St** | Stott, *Philosophy of Art* (1989) |
| **Mo** | Morgan, *On University Studies* (1966) |
| **Ot** | Ottmann, *Philosophy and Religion* (2010) and *Philosophy of Revelation 1841–42* (2020) |
| **Gu** | Gutmann, *Of Human Freedom* (1936) |
| **LS** | Love/Schmidt, *Philosophical Investigations into the Essence of Human Freedom* (2006) |
| **Bo** | Bolman, *Ages of the World* (1942) |
| **Wi** | Wirth, *Ages of the World* (2000) |
| **No** | Norman, *Ages of the World* (1813 draft, 1997) |
| **La** | Lawrence, *Ages of the World* 1811 (2019) |
| **Sk** | Steinkamp, *Clara* (2002) |
| **Bw** | Bowie (*On the History of Modern Philosophy*, 1994; SEP entry) |
| **Mt** | Matthews, *Grounding of Positive Philosophy* (2007) |
| **RZ** | Richey/Zisselsberger, *Historical-Critical Introduction* (2007) |
| **Hy** | Hayes, *Schelling's Philosophy of Mythology and Revelation* (abridged translation, AASR) |
| **Br** | Brown, *Deities of Samothrace* (1977) |

Secondary works:

| Siglum | Work |
|---|---|
| **Dw** | Dews, *Schelling's Late Philosophy in Confrontation with Hegel* (2023) |
| **Gr** | Grant, *Philosophies of Nature after Schelling* (2006) |
| **Be** | Berger, *Schelling, Hegel, and the Philosophy of Nature* (2023) |
| **Fi** | Fisher, *Schelling's Mystical Platonism* (2024) |

Verification marks:
- **✓** = verified in the translation itself, its glossary or notes, or a viewable scan.
- **✓²** = verified only through a quotation in a review or secondary work (URL in section 6).
- **(unchecked)** = from memory.

**n** = occurrences in the Schelling corpus (zaehle.py, period spellings folded; left-anchored patterns, so compounds are included). Where Fichte (F) and Hegel (H) counts matter for a cross-author decision, they are given as S/F/H. These are rough weights, not lemmatized counts. Where a count is inflated by homographs (*Band* = volume; *Sucht* = verb *sucht*; *sein* = possessive), the note says so.

---

## 1. Decisions for you

| # | Term(s) | Options | Recommendation |
|---|---|---|---|
| S1 | **Potenz, potenziren** (S 3 159 / F 86 / H 521) — **for all three authors** | (a) *potency, raise to a higher potency* throughout: Pe ✓ (glossary "potency, power"), HH ✓ (same), Mo ✓, VW ✓ ("lit., exponent, potency"), Mt ✓ (138×; "the existing potency [die seyende Potenz]", p. 198), Hy ✓, Wi ✓², Fi ✓, Be, Berger/Whistler 2020 ✓ ("potencies or powers") · (b) *power*: He ✓ ("Power (mathematical sense)"), Pf ✓ ("Powers"), Hegel draft (G) · (c) *potence*: St ✓ (rejects "power, exponential, potential", cites the Coleridge first use in the OED), Ot 2020 ✓² · (d) keep *Potenz* in early work, *potentiality* in late work: Dw ✓ (pp. xviii) · (e) *potentials*: Bw (SEP) ✓ | **(a) potency, in all three authors wherever the Schellingian concept is meant.** This includes Hegel's Jena writings (GW 4–8: *Potenz* of the identity system, *Indifferenzpunkt*) and Fichte's polemics against Schelling. Reasons: (1) it is the majority choice across all Schelling periods and the only one used by both the nature-philosophy and the late translators. (2) Schelling himself moves from the exponent sense (1799–1806) to Aristotle's δύναμις (1827 ff.: "Potenz", "potentia", "Seynkönnen" are interchangeable in II/1–II/4), and only "potency" covers both. "Power" covers the first and destroys the second. (3) "Power" collides with *Macht, Kraft, Gewalt, Vermögen* (Schelling: *Kraft* 1 302 in the candidate list). **Exception:** strictly arithmetical use stays *power* in all three authors (Hegel's *Potenzenverhältnis* = ratio of powers; "zur zweiten Potenz erheben" in a mathematical example; *Quadrat*). The markup flags the exponent sense in 1799–1806, so a note can state it once per work. *Potentialität* (53) = *potentiality*. *Exponent* (57) = *exponent*. |
| S2 | **das Seyende** (757; all forms of *seyend-* 2 257) | (a) *that which is*: Mt ✓ (e.g. "das Seyende seyn" → "that which is", pp. 200, 208), Bo ✓ ("what is"), La ✓ ("that which is"), Fakhoury ✓² · (b) *the existent*: Hy ✓ ("'the Existent' or 'what is' for 'das Seiende'"), Binkelmann ✓² · (c) *that which has being*: LS ✓ (p. xxxv, after Wirth), Wi ✓² · (d) *being* (bare): Mt in places ✓ ("being itself" for *das Seyende selbst*, pp. 144, 194) · (e) *being-ness*: Dw ✓ (p. xviii) | **(a) *that which is*.** Plural/indefinite: *ein Seyendes* = *a being*; *Seyendes* (mass) = *what is*. Reasons: (1) it keeps the participle that the late doctrine depends on (the analogy is τὸ ὄν). (2) "the existent" is reserved for *das Existirende* (356), which Schelling contrasts explicitly with *das Seyende* (Dw p. xix ✓; SW I/7: das Existirende vs. Grund). (3) Bare "being" erases the Seyn/Seyende distinction on which II/1 lectures 11–24 turn. Compounds follow: *das Seyende selbst* = *that which is itself* (not "being itself", which Mt's choice makes indistinguishable from *das Seyn selbst*); *das rein Seyende* = *that which purely is* (Hy "the pure existent" ✓); *das bloß Seyende* = *that which merely is* (Mt "that which just is" ✓ p. 49); *das blind Seyende* = *that which blindly is*; *das nicht Seyende* = *that which is not* (section 3, trap T3). |
| S3 | **Seynkönnen; das Seynkönnende / seyn Könnende; das Seynmüssende; das Seynsollende** (261; 452 + 172; 11; 137) | (a) *capacity to be*; *that which can be / must be / ought to be*: Mt ✓ ("infinite capacity to be [unendliche Seynkönnen]", p. 34; "that which has the capacity to be", p. 71) · (b) *power to be*: Hy ✓ · (c) *potential to be*, *can-be* (lit., unchecked) · (d) *ability to be*: Fakhoury ✓² | **(a).** *Seynkönnen* = *capacity to be* (Mt, the only published SUNY translation of a late text). The three participles are rendered as a set: *that which can be*, *that which must be*, *that which ought to be*, so the triad stays parallel with *that which is* (S2). Schelling's spacing must be kept in the markup (*das unmittelbar seyn Könnende*, *das tertio loco seyn Könnende*, SW II/2, 110, 114). The translation does not reproduce the spacing. Do not use "power to be": S1 reserves the *pot-* family for *Potenz*, and Schelling equates *Seynkönnendes* with *Potenz* explicitly ("insgesammt Seynkönnende, demnach Potenzen", II/2, 114). A translator's note can say so. *das nicht nicht seyn Könnende* = *that which cannot not be* (trap T4). |
| S4 | **unvordenklich, das Unvordenkliche, das unvordenkliche Seyn** (87) | (a) *unprethinkable*: Bw (SEP) ✓, Gabriel 2009 ✓², Be ✓ (p. 72), Dw ✓ hyphenated "un-pre-thinkable" (p. xix), Khamis 2021 (title) ✓² · (b) *that before which nothing can be thought*: Mt ✓ (Translator's introduction p. 86: the literal form "often reads the unprethinkable", rejected for "the more liberal rendering") · (c) *immemorial*: Bo ✓ (n. 50), Hy ✓ (adjective) · (d) *primordial*: Hy ✓ | **(a) *unprethinkable* in the technical sense; (c) *immemorial* in the everyday sense.** Technical = predicated of being/existence, mostly I/10 and II/1–II/4 ("sein unvordenkliches Seyn", I/10, 36). Everyday = of tradition, time, age: "eine unvordenkliche Ueberlieferung", I/9, 475 → "an immemorial tradition"; "Gebäude unvordenklicher menschlicher Wissenschaft", II/1, 89 → "immemorial". Reason: Schelling exploits *vor-denken* (prior to all thought), and only (a) keeps it. Mt's paraphrase cannot be used as an adjective in a pipeline. The translator flags each instance as *technical* or *everyday* in the markup. |
| S5 | **Ungrund** (22) (with **Urgrund** 6, **Abgrund** 47, **Grundlosigkeit/grundlos** 37) | (a) *non-ground*: LS ✓ (p. 68, index p. 180) · (b) *unground*: La ✓ (translator's introduction); the standard English for Böhme's *Ungrund* (unchecked for specific Böhme translations) · (c) *the groundless*: Gu ✓² (via Stambaugh: "primal ground or, rather, the groundless") · (d) *groundlessness*: used in the literature, but in Gu ✓² and Bw it renders *Grundlosigkeit* | **(b) *unground*.** Reasons: (1) it keeps the morphological series Grund / Urgrund (*primal ground*, LS ✓ p. 44) / Ungrund / Abgrund (*abyss*, Bo ✓ n. 22), which Schelling builds in SW I/7, 406 ("den Urgrund oder vielmehr Ungrund"). (2) Schelling means not a mere negation of ground but the indifference that "precedes all grounds", the Böhmean *Ungrund*, and "non-ground" suggests a privation. (3) "the groundless" must stay free for *das Grundlose*, "groundlessness" for *Grundlosigkeit* (an attribute of *Wollen*, I/7, 350). *Against:* LS is the edition everyone cites, so readers of LS will meet "non-ground". If you prefer citability, choose (a). |
| S6 | **Grund** (2 688) in the Freiheitsschrift sense; **Grund von / seiner Existenz** (34) | (a) *ground*; *ground of existence*: LS ✓ (p. 27: "the ground of existence"; "ground of his existence") · (b) *basis*; *basis of existence*: Gu ✓² ("an inner basis of his existence", via Stambaugh) | **(a)**, uniformly, also in Naturphilosophie and identity philosophy. *Grund von Existenz* occurs as a formula well before 1809 (I/2, 109; I/4, 163, 265), so it needs one fixed English form. *Basis* (74) = *basis*; *Unterlage* = *substrate*; *Grundlage* = *foundation*. **Cross-author:** same as Hegel's *Grund* = ground (Hegel draft C). The concepts differ but the word stays the same. |
| S7 | **Sehnsucht** (118) (with **Sucht** n < 415, **Begierde** 76) | (a) *longing*: Gu ✓², Bo ✓ ("Passionate urge [Sucht] softens into longing [Sehnsucht]"), La ✓, Dw, Be (17×) · (b) *yearning*: LS ✓ (34×; "the yearning the eternal One feels to give birth to itself", p. 28) · (c) *nostalgia*: Pf ✓ | **(a) *longing*** across all periods. Fixed series: *Sucht* = *craving* (LS ✓ p. 85), *Begierde* = *desire*, *Hunger* = *hunger*. Reason: it is the majority across the Weltalter translations and Gu, and it stays idiomatic in II/2 (mythology), where *Sehnsucht* is non-technical. "Yearning" is also correct but is the minority in the Weltalter drafts. "Nostalgia" is wrong (backward-looking). |
| S8 | **Ineinsbildung** (42), **Einbildung** (≈ 300 excluding *Einbildungskraft*), **Einbildungskraft** (160), **Imagination** (75), **Phantasie** (77) | Ineinsbildung: (a) *in-forming*: VW ✓ (n. 299; index "in-forming (see also Ineinsbildung, imagination)") · (b) *informing into unity*: St ✓ (§ 22) · (c) *forming-into-one*: common in the secondary literature (unchecked) · (d) "no graceful translation" … "in-vention": Va ✓ · (e) *eisemplasy*: Wi ✓ (glossary, Coleridge's coinage) · Einbildung: *informing* St ✓; *embodiment* HH ✓ (glossary); *impression* LS ✓ ("[Ein-Bildung] … genuine impression", p. 31) | **Ineinsbildung = *forming-into-one*; Einbildung (technical) = *in-forming*; Einbildungskraft = *imagination*, with a note on Schelling's etymology (I/5 § 22: *In-Eins-Bildung*).** Reason: two technical terms need two renderings, and each keeps its morphology. Schelling sets them side by side ("Ineinsbildung (Einbildung) des Vorbildlichen und Gegenbildlichen", I/4, 394), so the English must show the near-synonymy without merging them. *Einbildung* in the everyday sense (conceit, fancy, "bloße Einbildung") = *imagination / fancy*: the markup flags the technical sense. *Imagination* (Schelling's Latinism, I/5) = *imagination*, marked as *Imagination* in the markup. *Phantasie* = *fantasy* (Schelling distinguishes them in I/5; St's rendering unchecked). **Cross-author:** Hegel draft E has *Einbildungskraft* = imagination; compatible. |
| S9 | **Urbild / Gegenbild / Vorbild / Abbild / Nachbild** (242 / 109 / 108 / 120 / 21) | Urbild = *archetype*: all ✓ (Va, St, Pf, Mo, LS). Gegenbild: (a) *antitype*: Va ✓ (glossary), Fi ✓ (p. 202) · (b) *reflected image*: St ✓, Pf ✓ · (c) *counterpart*: Bo ✓ · (d) *counter-image*: common in the literature, no verified translation. Vorbild: *pattern / prototype* (Va ✓ "pattern"; Fi ✓ "prototype"); in theology *type* (LS: *Vorbilder* → "typology" ✓ pp. 73, 77). Abbild = *image / copy* (Va ✓). Nachbild = *ectype* (Pf ✓) | **Urbild = archetype; Gegenbild = antitype; Vorbild = prototype (theological contexts: type, prefiguration); Abbild = copy; Nachbild = ectype; urbildlich / gegenbildlich / vorbildlich = archetypal / antitypal / prototypal.** Reason: Va's set is the oldest and is followed by St for Urbild. It is the only set that gives each of the five words its own English term. "Reflected image" collides with *Reflex* (115) and *Widerschein* (33). **Danger:** "antitype" in Christian typology means the *fulfilment* of a type (Christ as antitype of Adam). In II/3–II/4, where *Vorbild* = type, Schelling's *Gegenbild* must still be "antitype" in the identity sense only. Flag every Gegenbild in II/3–II/4 for review. |
| S10 | **Abfall** (63) | (a) *falling-away*: Ot ✓² (P&R 1804: "a falling-away [Abfall] from the Absolute") · (b) *fall*: Mt ✓ ("Abfall … is a fall", p. 151), Bo ✓ · (c) *apostasy, defection* (lit., unchecked) | **(a) *falling-away*** (noun; verb *abfallen* = *fall away*). *Sündenfall* (17) and *Fall* in the theological sense = *the Fall*. Reason: the 1804 doctrine (ideas falling away from the absolute, Plato's ἀπόστασις) is not the biblical Fall. Schelling distinguishes the two and relates them in II/1–II/4, and English can only keep this if *Abfall* ≠ *Fall*. |
| S11 | **Krisis** (130), **Scheidung** (133), **Entscheidung** (68), **Unterscheidung** (304) | Krisis: *crisis* Hy ✓; "separation and judgment" LS ✓ (p. 67), "division" LS ✓ (p. 35). Scheidung: *separation* Bo ✓, La ✓ (context); *scission* La ✓; *cision* Wi ✓² (via La n. 12). Entscheidung: *decision* Bo ✓ | **Krisis = *crisis*** (Greek sense in a note at first occurrence per work: κρίσις = separation/judgment; Schelling himself glosses "die Scheidung (Krisis)", I/7, 366). **Scheidung = *separation*. Entscheidung = *decision*. Unterscheidung = *distinction*. Ausscheidung = *exclusion / excretion* (context). Völkerscheidung / Scheidung der Völker = *separation of the peoples*** (Hy ✓). Reason: plain English, consistent, and the markup preserves the *-scheid-* chain. Wi's "cision" is a coinage (principle 3). |
| S12 | **Umtrieb** (14), **rotatorische Bewegung** (20), **Rad** (21) | Umtrieb: *cycle* Bo ✓; *circular drive* La ✓; *cyclical drive* Dw ✓ (p. 101); *rotatory movement* Wi ✓². rotatorische Bewegung: *rotary movement* Dw ✓, *rotating movement / rotary motion* Bo ✓ | **Umtrieb (Weltalter, Freiheitsschrift, late) = *circular drive*; rotatorische Bewegung = *rotary motion*; Rad = *wheel*.** In Naturphilosophie, *Umtrieb des Bluts* (I/2, 547) = *circulation*; *rastloser Umtrieb* = *restless circulation*. Reason: "drive" keeps the *Trieb* in *Umtrieb* and keeps it apart from the purely kinematic *rotatorische Bewegung*. |
| S13 | **Existenz / existiren / das Existirende** (773 / 1 044 / 356) vs **Daseyn** (670) — collision with Hegel **D1** | Hegel D1 (a) would give Dasein = *existence*, Existenz = *concrete existence*. In Schelling, Existenz/existiren is the technical term (Grund/Existenz 1809; "das nothwendig Existirende", "blindes Existiren" late), rendered *existence / exist / that which exists* by LS ✓ (pp. 27, 40) and Mt ✓ (pp. 123, 207); *existing-ness* Dw ✓. Daseyn = *existence* Pf ✓ (glossary); "real being" Mt ✓ (p. 64, for *wirkliches Daseyn*) | **Schelling: Existenz = *existence*, existiren = *exist*, das Existirende = *the existent / that which exists*; Daseyn = *existence* too, flagged [Daseyn] in the markup; "determinate being" only where Schelling discusses Hegel's category (I/10, 126 ff.).** This is an author-specific rule, so please confirm that the "one rendering per term" principle applies within each author, not across authors. Otherwise Hegel D1 (a) forces "concrete existence" onto Schelling's *Grund von Existenz*, which is unacceptable. |
| S14 | **Capitalization**: *being / Being*, *Idea*, *Absolute*, pronoun for God | LS ✓ (p. xxxv) and Wi capitalize "Being" for *Sein*; Pf ✓ "Being" for *Seyn*, "being" for *Seyendes*; Gu "His" for God ✓²; LS lowercase "he" ✓ (p. 27); Mt lowercase | **Lowercase throughout**, consistent with Hegel D5 (a)/(b): *being, the absolute, spirit, the idea / ideas*. If D5 (b) is adopted, "Idea" is capitalized only for Hegel's absolute Idea. Schelling's *Ideen* in the identity philosophy are plural Platonic forms = *ideas*. **God: "he", lowercase** (LS's practice). The neuter/masculine shift is meaningful in late Schelling (trap T10), so the pronoun must follow the German gender of the antecedent, not piety. |
| S15 | **Names of gods, heroes and Greek authors** | (a) Greek forms (*Dionysos, Kronos, Ouranos, Herakles*): Schelling's own practice in II/2 (he writes *Dionysos, Herodotos, Homeros, Hesiodos, Aeschylos*); Hy mixed ✓ (Kronos, Ouranos, *but* Dionysus) · (b) Latinized English (*Dionysus, Cronus, Uranus, Heracles*) · (c) Brown: *Cabiri* ✓ | **Gods, heroes and cult names: Greek forms in a standard modern transliteration** (Dionysos, Kronos, Ouranos, Rhea, Herakles, Persephone, Kore, Hades/Aïdes, Kybele, Typhon, Zagreus, Iakchos), because Schelling deliberately Hellenizes and argues from the Greek forms. **Authors and places: established English** (Homer, Hesiod, Herodotus, Aeschylus, Pausanias, Plutarch, Samothrace, Egypt, Phoenicia). **Roman gods stay Roman** where Schelling uses the Latin name (Jupiter, Ceres, Minerva, Venus). **Kabiren = Cabiri** (Br ✓). Full list in section 4. |
| S16 | **Wesen** (3 710) | (a) *essence* by default, *being* for entities: LS ✓ (pp. xxxiii–xxxv, after discussion), Hegel draft C · (b) *being* throughout: Wi (per LS p. xxxiv) ✓² · (c) *living being*, sometimes *essence*: La ✓ | **(a).** *essence* where *Wesen* contrasts with form, existence or appearance (identity philosophy: "Wesen und Form"; late: "Wesen" = *quid*). *being* where it denotes an entity or nature: *ein Wesen, Urwesen* (*primal being*), *Grundwesen* (LS ✓ "fundamental being"), *das höchste Wesen, Lichtwesen, Naturwesen*, "das Wesen des Grundes" (LS ✓ "being" here, p. xxxiv). Markup flags each. **Danger:** *Wesen* and *Seyn* both become "being" in the entity sense. Markup is mandatory. |
| S17 | **Aktion** (237; I/3 Erster Entwurf) | (a) *actant*: Pe ✓ (endnote 1, p. 244: chosen "to mirror the foreignness of the term"; "actor" too intentional, "action" too broad) · (b) *action* | **(a) in I/3 *Erster Entwurf* and *Einleitung zu dem Entwurf* only, where *Aktion* = simple productivity, a dynamic atom ("ursprüngliche Aktionen"). Elsewhere *action*.** Pe's is the only translation of this text. |
| S18 | **Duplizität** (248), **Dualität** (50), **Dualismus** (178), **Triplizität** (38) | Duplizität: *duplicity* Pe ✓ (glossary), Gr ✓; *duality* He ✓ ("original duality") | ***duplicity*, *duality*, *dualism*, *triplicity***, with a note at first occurrence (English *duplicity* = deceit; here = twofoldness). Reason: Schelling uses *Duplicität* and *Dualität* side by side; merging them loses the distinction. |
| S19 | **Mensch** (generic; *Menschen* 1 928, *Mensch* 1 089 in candidate list) | (a) *man*: LS ✓ (p. xxxv, reluctantly) · (b) *human being(s)*: Dw ✓ (partly, pp. xx–xxi) | **(b) *the human being / human beings / humanity*;** *man* only in fixed theological pairs where the English tradition is fixed (*Son of Man* = *Menschensohn*; *der erste Mensch* = *the first man*, Adam). Applies to all three authors; please coordinate with the Hegel and Fichte drafts. |
| S20 | **Selbstheit** (143), **Ichheit** (81), **Egoismus** | Selbstheit: *selfhood* LS ✓ (40×; p. 33), Pf ✓ ("selfhood [or] the egoism in God"). Ichheit: *egoism* Bo ✓ (in his introduction); Marti: no verified rendering | **Selbstheit = *selfhood*; Ichheit = *I-hood*** (attested in Fichte translations, unchecked; consistent with *the I*); *Egoismus* = *egoism*; *Eigenheit* = *ownness / peculiarity*. Reason: Ichheit in I/6 is a quasi-technical term (the principle of finitude in the *falling-away*) and must not merge with *Egoismus*. Coordinate with the Fichte glossary (*Ichheit* is frequent in Fichte, 98). |

---

## 2. Glossary

Columns: German · n (Schelling) · English · Established · Danger / notes.

### A. Core vocabulary across all periods (being, ground, potency, identity)

| German | n | English | Established | Danger / notes |
|---|---|---|---|---|
| Seyn / Sein, das Seyn | ≈ 2 255 (noun forms) | being | LS ✓ ("Being"), Mt ✓, Pf ✓ ("Being") | Period spelling (principle 5). Lowercase (S14). **Cross-author:** = Hegel *Sein*. In late Schelling *das Seyn* is often the *determinate, actual* being that *das Seyende* (S2) has. Dw p. xviii ✓ notes the reversed polarity relative to Heidegger, so never import Heideggerian "Being vs beings". |
| seyn (verb, nominalized) | — | to be, being | | "das Seyn-Wollen" = *the willing-to-be*; "seyn zu wollen" = *to want to be*. |
| seyend (adj./adv.) | 296 | existing; as being, in being | | "seyend seyn" = *to be in being / to be as existing* (I/8, 256: "im seyend-Seyn"). Do not render as "be being". |
| das Seyende | 757 | ⚑ S2 *that which is* | | |
| ein Seyendes; Seyendes | 215 | a being; what is | Mt ✓ ("A being", p. 134) | Plural *Seyende* = *beings*. |
| das Seyende selbst | 130 | that which is itself | Mt "being itself" ✓ (pp. 144, 194) | ⚑ S2. Late technical term (I/10, 18–20; II/1 lect. 11 ff.). Mt's "being itself" is ambiguous with *das Seyn selbst*. |
| das, was das Seyende ist | — | that which *is* that which is | Dw ✓ ("that which is das Seyende", p. xix) | Trap T5. Schelling emphasizes *Ist* ("was das Seyende Ist", II/1, XI); render the stress in italics. |
| das Nichtseyende / nicht Seyende | 317 | that which is not | Mt ✓ "nonbeing" (pp. 34, 156) | Trap T3: never "nothing". Schelling insists on the μὴ ὄν / οὐκ ὄν distinction (I/7, 436; I/10, 283). *Nichtseyn* (195) = *non-being*. |
| Nichts | | nothing | | Distinct from *das Nichtseyende* (I/7, 436: "aus dem Nichtseyenden geschaffen, aber nicht aus dem Nichts"). |
| Wesen | 3 710 | ⚑ S16 essence / being | LS ✓ | |
| wesentlich; Wesenheit | | essential; essentiality | LS "ways of being" ✓ (*Wesenheit*, p. 51) | Keep *Wesenheit* = *essentiality* (consistent with Hegel). |
| Existenz; existiren | 773; 1 044 | existence; exist | LS ✓, Mt ✓ | ⚑ S13. **Cross-author: collides with Hegel D1.** |
| das Existirende | 356 | that which exists; the existent | LS ✓ "that which exists" (p. 27), Mt ✓ (p. 207), Dw "existing-ness" ✓ | Reserve "the existent" for this term (S2). |
| das Existiren | — | existing (the act) | Dw "existing-ness" ✓ (p. xix) | "the existing" would mean a thing; prefer "existing" without article or "the act of existing". |
| Daseyn | 670 | existence [Daseyn] | Pf ✓ ("existence"), Mt "real being" ✓ | ⚑ S13. **Cross-author:** Hegel D1. |
| Grund | 2 688 | ground | LS ✓ | ⚑ S6. Also "reason" in argumentative use ("aus diesem Grunde" = *for this reason*; LS ✓ "argument", p. 39). The markup must separate technical *Grund* from the argumentative one. |
| Grund von Existenz; Grund seiner Existenz | 34 | ground of existence; ground of its/his existence | LS ✓ (p. 27) | Appears from 1797 (I/2, 109) and is technical in I/4 (163: = gravity). Never "basis" (Gu). |
| Ungrund | 22 | ⚑ S5 unground | | |
| Urgrund | 6 | primal ground | LS ✓ (p. 44) | |
| Abgrund | 47 | abyss | Bo ✓ (n. 22) | Never "unground". |
| grundlos, Grundlosigkeit | 37 | groundless, groundlessness | Gu ✓², Bw (SEP) ✓ | Attribute of *Wollen* (I/7, 350). Late: "ein grundlos Seyendes" = *something that groundlessly is* (Mt ✓ "groundless being", p. 205). |
| Grundsatz | | principle (first principle) | Ma (unchecked) | Early, Fichtean. **Danger:** *Prinzip* is also "principle". Mark *Grundsatz* = *first principle*, *Satz* = *proposition*. |
| Princip / Prinzip | 4 103 | principle | all | Late: also *ἀρχή* in the sense of origin. The *Princip* of the world ages = *principle*. |
| Prius; prius / posterius | 155 | prius (italic) | Mt ✓ (75×), Hy ✓ ("the Prius of the Existent") | Keep the Latin. Do not translate as "prior" or "priority" (*Priorität*, 50 = priority). |
| Aktus / Actus; actu; actus purus | 374; 351 (*actu/potentia*) | act; actually (*actu*: italic Latin); pure act | LS ✓ ("zum Aktus" → "into actuality", "to full actuality", pp. 62, 66), Mt ✓ ("pure actus", p. 198) | **Danger:** "act" collides with *Akt, Handlung, That, Tathandlung*. Markup [Aktus]. Keep the Latin forms *actu, potentia, actus purus, potentialiter* as Schelling prints them. |
| Potenz; potenziren; Potenzirung | 3 159; 109 | ⚑ S1 potency; raise to a (higher) potency; potentiation | | **Cross-author: S1 applies to Hegel and Fichte.** |
| Potentialität | 53 | potentiality | | Late. |
| Exponent | 57 | exponent | VW ✓ ("lit., exponent, potency") | Identity philosophy ("unter dem gemeinschaftlichen Exponenten der Endlichkeit", I/4, 418). |
| erste, zweite, dritte Potenz | | first, second, third potency | Hy ✓, Wi ✓², Mt ✓ | Never "first power". |
| Möglichkeit, Wirklichkeit, Nothwendigkeit | 1 568 / 825 / 1 128 | possibility, actuality, necessity | Mt ✓ ("actuality") | **Cross-author:** = Hegel. Late: *wirklich* vs *bloß möglich* drives positive philosophy. "Wirklichkeit" = *actuality*, never "reality" (*Realität* 1 048 = reality). |
| Identität; absolute Identität | 2 277; 680 | identity; absolute identity | VW ✓, Va ✓ | **Cross-author:** = Hegel. Distinct from *Einerleiheit* (21) = *sameness* (LS ✓, p. 13) and *Gleichheit* = *equality / likeness* (LS ✓ "alikeness", p. 15). The Freiheitsschrift argues that the law of identity is not sameness, so the three must stay separate. |
| Indifferenz | 632 | indifference | all ✓ (Va n. 27: really "nondifference", but kept as a "foreign borrowing"; St n. 13) | **Cross-author:** same as Hegel H (markup distinguishes from *Gleichgültigkeit*). In 1809 *Indifferenz* = the *Ungrund* (I/7, 406–407). Never "neutrality". |
| Gleichgültigkeit, gleichgültig | 235 | indifference [Gleichgültigkeit], indifferent | | Everyday sense mostly ("das kann uns hier völlig gleichgültig seyn", I/2, 91 → "is a matter of indifference"). Markup. |
| Indifferenzpunkt | 157 | point of indifference | Mo ✓, Va ✓ | Magnetic and systematic sense; in Naturphilosophie also "indifference point" (unchecked). |
| Differenz; quantitative Differenz | 957; 89 | difference; quantitative difference | VW ✓ | **Cross-author:** Hegel *Differenz* = difference with markup. *Unterschied* = *difference/distinction* (markup). |
| indifferenziren, Indifferenziirung; differenziren | 25 + 12; 87 | render indifferent, indifferencing; differentiate | HH ✓ ("indifferencing") | |
| das Absolute, absolut, Absolutheit | 1 321; 267 | the absolute, absolute, absoluteness | | Lowercase (S14). *Absolutheit* ≠ *das Absolute*: "absoluteness". |
| das Unbedingte, unbedingt, Unbedingtheit | 347; 50 | the unconditioned, unconditioned, unconditionedness | Pe ✓ ("the Unconditioned"), Ma ✓ ("unconditional") | Choose "unconditioned" (Kantian standard). Ma's "unconditional" is idiomatic but loses the Kant link. Trap T2 for the *bedingen/Ding* pun. |
| Subjekt, Objekt; Subjektivität, Objektivität | 1 624 / 2 070; 208 / 216 | subject, object; subjectivity, objectivity | | **Cross-author:** Hegel D3 (both *Gegenstand* and *Objekt* = object, markup). In Schelling *Objekt* is the technical word (Natur als Objekt; Subjekt-Objekt), so Hegel's D3 (a) works. |
| Gegenstand, gegenständlich | 1 564 | object [Gegenstand], objective | Mt ✓ ("a real object", p. 76; "Object and resistance [Gegenstand und Widerstand]", p. 76) | Keep wordplay *Gegenstand/Widerstand/Urstand* in a note. Late "das gegenständlich Seyende" = *that which objectively is* (I/10, 19). |
| Subjekt-Objekt; Subjekt-Objektivität; subjekt-objektiviren | 135; 24 | subject-object; subject-objectivity; subject-objectify | HH ✓ ("division into subject and object" for *Subject-Objectivierung*) | Hyphenate exactly as Schelling. "das absolute Subjekt-Objekt" = *the absolute subject-object*. |
| Einheit | 3 176 | unity | | "die drei Einheiten" (identity philosophy) = *the three unities*. Late: distinct from *Einzigkeit* (below). |
| Einzigkeit | 141 | uniqueness / singleness | | **High-ratio term (109×).** Late (II/1, 83, 121, 173): "die Einzigkeit Gottes" = *the uniqueness of God*, Schelling's polemical contrast to *Einheit* in *Der Monotheismus*. It must not become "unity" or "oneness". Early (I/4, 369; I/7, 98) = *uniqueness*. |
| Totalität; relative Totalität | 559; 36 | totality; relative totality | Pf ✓ ("totality [Allheit]" — note: Pf uses "totality" for *Allheit*) | Keep *Totalität* = totality and *Allheit* = allness. |
| Allheit | 195 | allness | St ✓ (on the suffix) | **Danger:** Pf renders it "totality", which merges it with *Totalität*. |
| das All | 444 | the all; the universe [All] | Pf ✓ ("the universe") | Prefer "the All" (capital A, as noun only, to avoid "all"). This is the only capitalization exception: "the all" is unreadable. Markup distinguishes *All* vs *Universum*. |
| Universum | 664 | universe | | |
| das Ewige, ewig, Ewigkeit | 359; 2 616; 463 | the eternal, eternal, eternity | | *das Ewige* (identity philosophy) is a technical term next to *das Endliche / Unendliche*. *von Ewigkeit* = *from all eternity*. |
| das Endliche, das Unendliche; Endlichkeit, Unendlichkeit | 1 512; 340 / 625 | the finite, the infinite; finitude, infinity | | |
| Affirmation; affirmiren; das Affirmirte / Affirmirende; Selbstaffirmation | 213; 781; 35 | affirmation; affirm; the affirmed / the affirming; self-affirmation | St ✓, Pf ✓ ("affirming/affirmed") | Identity philosophy, Würzburg System (I/6). Keep the participles as noun phrases: *das Affirmirte* = *the affirmed*, not "what is affirmed". |
| Bejahung, bejahen; Selbstbejahung; Verneinung | 333; 34; 229 | affirmation [Bejahung], affirm; self-affirmation [Selbstbejahung]; negation [Verneinung] | Bo ✓ ("eternal Yes and No"), Wi ✓² ("negating and affirming potencies") | **Danger:** *Bejahung* and *Affirmation* both = affirmation. Markup. In the Weltalter: *verneinende / bejahende Kraft* = *negating / affirming force*. |
| Position; Negation; Privation; Beraubung | 296; 461; 103; 36 | position (positing); negation; privation; privation [Beraubung] | | **High ratio for Privation (79×).** Naturphilosophie: "bloße Privation" vs "reelle Entgegensetzung" (I/3, 170, 224, 381): render *real opposition*. *Position* is the logical act of positing, never "location". |
| setzen, Setzen, gesetzt, das Setzende | — ; 95 (*Setzende*) | posit, positing, posited, the positing [principle] | Hegel ✓ | **Cross-author:** = Hegel, Fichte. "Gott-setzend" (24) → section I. |
| aufheben | | sublate (technical); cancel, abolish (everyday) | Dw ✓ (pp. xvii: retains "sublate" for both thinkers); Mt varies ✓ ("annulled, abolished, negated, nullified, sublation") | **Cross-author:** Hegel "sublate". Schelling's usage is more often the everyday "cancel, suspend" (Dw). Use "sublate" only where the Hegelian triple sense is intended or Schelling discusses Hegel. Otherwise "cancel / suspend". Markup always. |
| Moment | | moment | | |
| Stufe; Stufenfolge | 584; 129 | stage, level; sequence of stages | Pe ✓ ("Stages of Development") | *dynamische Stufenfolge* (19) = *dynamic sequence of stages*. |
| Übergewicht | 231 | preponderance | | Identity philosophy (quantitative difference as "Uebergewicht der Subjektivität / Objektivität") and chemistry. Never "overweight". |
| Gleichgewicht | 399 | equilibrium | LS ✓ (p. 48) | Not "balance" when technical. |
| Spannung | 272 | tension | | |
| Gegensatz, entgegensetzen | 1 553 | opposition, oppose | | |
| Band | ≈ 569 (incl. *Band* = volume) | bond | LS ✓ (28×; "dark bond of gravity", p. 30) | Freiheitsschrift, identity philosophy (*das Band* = the copula as the living unity of subject and predicate). **Homograph:** *Band* = volume (SW editorial notes). Filter. |
| Kopula / Copula | 79 | copula | LS ✓ (pp. 13–14) | |
| Form | 3 676 | form | | "Wesen und Form" (identity philosophy). |
| Erscheinung, erscheinen | 1 797 | appearance, appear | | **Cross-author:** = Hegel. *Phänomen* (240) = *phenomenon*. |
| Seele | 1 707 | soul | | In Weltseele and in the Stuttgart/Weltalter triad *Geist–Seele–Gemüt*. |
| Geist; geistig | 2 389 | spirit; spiritual | Pf, LS ✓ | Never "mind". *Geister* = *spirits* (Geisterwelt, section G). **Cross-author:** = Hegel. |
| Natur | 6 524 | nature | | |
| Gott; Gottheit | 7 483; 793 | God; divinity / Godhead | Mt ✓ ("divinity", pp. 70, 200) | **Danger:** *Gottheit* (793!) is not always "God". Schelling distinguishes *Gott* from *Gottheit*: the Godhead as pure essence (Weltalter: "Übergottheit" = *supra-Godhead*, Bo "supergodhead" ✓). Rule: "Godhead" where Schelling contrasts it with God (I/8; II/2–II/4), "divinity" for divine nature (mythology: "eine Gottheit" = *a deity*). |
| göttlich | 1 667 | divine | | *das Göttliche* = *the divine*. |
| eigentlich | 2 421 | proper, actual, really (context) | | **Danger: everyday vs technical.** "das eigentliche μὴ ὄν" = *the μὴ ὄν properly so called*; "eigentlich Seyendes" = *that which properly is*. Never "actual" where it would collide with *wirklich*. |
| lauter, Lauterkeit | 215; 42 | pure, sheer; purity | La ✓ ("lucid purity") | "das lautere Seynkönnen" (I/8, 305; I/10, 263) = *the sheer capacity to be*. Do not merge with *rein* (pure): *lauter* = *sheer*, *rein* = *pure*. |
| rein | | pure | | "das rein Seyende" = *that which purely is*. |
| schlechthin | 1 007 | absolutely, simply | | **Cross-author:** Fichte's "schlechthin gesetzt" = *posited absolutely*. Keep the Fichte rendering in I/1. |

### B. Early writings, Fichtean period (I/1: Vom Ich, Philosophische Briefe, Form der Philosophie, Abhandlungen, Neue Deduction des Naturrechts)

| German | n | English | Established | Danger / notes |
|---|---|---|---|---|
| das Ich, Ich = Ich | 1 923; 27 | the I; I = I | Ma ✓; He ✓ ("Self, I") | **Cross-author:** Hegel "the I", Fichte glossary. Not "the self" (He), not "the ego". "absolutes Ich / empirisches Ich" = *absolute / empirical I*. Schelling's genitive *des Ichs* = *of the I*. |
| Nicht-Ich | 311 | not-I | Ma ✓ | Hyphenate. Coordinate with Fichte. |
| Ichheit | 81 | ⚑ S20 I-hood | | |
| Selbstheit (early) | | selfhood | | Already in I/1, 252 ("absolute Selbstheit des Individuums"); same English as 1809 (S20). |
| das Unbedingte; bedingen; Bedingung | 347; 1 282 | the unconditioned; condition; condition | Ma ✓ (n. 22: *bedingen* = "the action by which anything becomes a thing (Ding)"; also "to thingify") | Trap T2. Where Schelling plays on *Be-ding-ung*, add a translator's note. Do not imitate Ma's coinage "thingify" (principle 3). |
| Urform | 74 | primordial form | | I/1 *Form der Philosophie*: "die Urform aller Wissenschaft". "Ur-" = *primordial / primal*; choose **primal** for persons and acts (Urwille, Urwesen) and **primordial** for structures (Urform, Urstoff). |
| Form / Inhalt / Gehalt (der Wissenschaft) | | form / content / import | | **Cross-author:** Hegel D14 (*Gehalt*). Follow the Hegel decision. |
| intellektuelle / intellektuale Anschauung | 130 | intellectual intuition | Ma ✓ | **Cross-author:** = Fichte, Hegel. Schelling writes both *intellectuale* (1795) and *intellektuelle*. Do not mark the variant in English. |
| Anschauung, anschauen | 1 245 | intuition, intuit | He ✓ | **Cross-author:** = Hegel. |
| Kriticismus; Dogmatismus | 113; 246 | criticism; dogmatism | Ma ✓ | Capitalize neither. *Kriticismus* = the critical philosophy, never "criticism" in the everyday sense: add "(critical philosophy)" at first occurrence in *Philosophische Briefe*. |
| Schwärmerei, Schwärmer | 88 | enthusiasm (fanatical), enthusiast | (unchecked) | Pejorative 18th-century sense. Never "swarming" or "rapture". "fanaticism" is too strong except in context. |
| Glückseligkeit; Seligkeit | ; 111 | happiness; blessedness, beatitude | | Kantian *Glückseligkeit* = happiness. *Seligkeit* = blessedness. |
| Moralgesetz, Sittengesetz | | moral law | | |
| absolute Causalität / Kausalität | | absolute causality | | |
| theoretisch / praktisch | | theoretical / practical | | |
| Standpunkt | 414 | standpoint | | |
| Weltanschauung | 14 | worldview | | Rare; not yet the 19th-century cliché. |
| Wissenschaftslehre | 85 | *Wissenschaftslehre* (Doctrine of Science) | LS ✓ ("Doctrine of Science" / "Doctrine of Knowledge", pp. 3, 20) | Keep the German title in italics, as the Fichte glossary will (coordinate). |
| Thätigkeit / Tätigkeit | 1 633 | activity | He ✓ | **Cross-author:** = Fichte. Period spelling. |
| Handlung; Handlungsweise | ; 58 | act, action; mode of action | | **Danger:** *Handlung* (act of the I) vs *Aktus* vs *That*. Markup. |
| Neue Deduction des Naturrechts | | *New Deduction of Natural Right* | Ma ✓ (table of contents) | |
| Abhandlungen zur Erläuterung des Idealismus der Wissenschaftslehre | | *Treatise Explicatory of the Idealism in the Science of Knowledge* | Pf ✓ (title) | Pf's title; keep. |
| Geist (in the *Abhandlungen*) | | spirit | Pf ✓ | "Geist ist ewiges Werden" etc. |
| Selbstanschauung | | self-intuition | | |
| Vorstellung, vorstellen | 1 646 | representation, represent | Hegel P ✓ dG ✓ | **Cross-author:** = Hegel. Late (mythology): *Göttervorstellung* = *representation of gods* (section I). |
| Darstellung, darstellen | 751 | presentation, exposition; present | Be ✓ ("Presentation [Darstellung] of My System", p. 12) | *Darstellung meines Systems* = *Presentation of My System* (title). Never "representation" (reserved for *Vorstellung*). |

### C. Naturphilosophie (I/2–I/4, I/7 essays)

| German | n | English | Established | Danger / notes |
|---|---|---|---|---|
| Naturphilosophie | 432 | philosophy of nature (*Naturphilosophie* in historiographic contexts) | HH ✓, Pe ✓ | In the text: "philosophy of nature". Where Schelling names his own school or the movement ("die Naturphilosophie hat behauptet…"), keep *Naturphilosophie* in italics. |
| spekulative Physik | 70 | speculative physics | Pe ✓ | |
| Natur als Subjekt / als Objekt; natura naturans / naturata | 5 / 11; 38 | nature as subject / object; *natura naturans / naturata* | | Keep the Latin. I/3, 284: *natura naturans* = nature as productivity. |
| Produktivität | 186 | productivity | Pe ✓, Gr ✓ | **Only Schelling has this term (ratio 180).** Not "productiveness" or "production" (*Produktion* 178 = production). |
| Produkt; Naturprodukt | 1 460; 48 | product; natural product | Pe ✓ | |
| produziren, Produciren, das Produciren | 518 | produce, producing | | |
| Hemmung, hemmen, gehemmt; Hemmungspunkt | 106 | inhibition, inhibit, inhibited; point of inhibition | Pe ✓ (glossary; ch. IV), He ✓ ("impeded" for *gehemmt*), Gr ✓ ("retardation") | Use **inhibition**. Keep *Anstoß* = *check* (He ✓, Pf ✓) separate (section D). |
| Aktion; einfache / ursprüngliche Aktionen | 237 | ⚑ S17 actant (I/3) / action | Pe ✓ | |
| Duplizität, Dualität, Dualismus, Triplizität | 248 / 50 / 178 / 38 | ⚑ S18 duplicity, duality, dualism, triplicity | Pe ✓ | |
| Polarität; Pol, Pole | 181; 276 | polarity; pole, poles | | |
| Weltseele | 30 | world soul | HH ✓ ("world-soul"), Fi (22×) | Unhyphenated (current usage). Title: *On the World Soul*. |
| Organismus; Organisation; organisch | 905; 390 | organism; organization; organic | | *Organisation* often = an organized being, "eine Organisation" = *an organized being*, not "an organization" in the institutional sense. |
| anorgisch; unorganisch | 173; 185 | inorganic | | Schelling's *anorgisch* (1799 ff.) and *unorganisch* both = *inorganic*. Markup keeps *anorgisch*. **Danger:** Hegel uses *unorganisch* (343). Same English. |
| Leben; Lebenskraft; Lebensprincip; Lebensproceß | 2 531; 48; 26; 42 | life; vital force; principle of life; life process | | Schelling rejects *Lebenskraft* (vitalism). Keep "vital force" so the polemic is visible. |
| Erregbarkeit, Erregung, erregende Potenzen | 237; 171; 31 | excitability, excitation, exciting potencies | Pe ✓, Be ✓ (p. 92) | John Brown's terms (Brunonianism). "erregende Potenzen" = *exciting potencies* (Brown's "exciting powers"; S1 keeps "potency" here and notes Brown). |
| Reiz, Reizbarkeit | 192; 69 | stimulus; susceptibility (to stimuli) | Pe ✓ (glossary: "stimulant, stimulus / susceptibility") | **Danger:** *Reizbarkeit* in the Freiheitsschrift (I/7) ≈ irritability as a principle of life (LS "irritable principle" ✓, p. 34). Keep "irritability" for *Irritabilität* and "susceptibility" for *Reizbarkeit*. |
| Sensibilität; Irritabilität; Reproduktionskraft / Reproduktion | 369; 358; 60 / 82 | sensibility; irritability; reproductive force / reproduction | Pe ✓ | The three organic functions (Kielmeyer). *Sensibilität* ≠ *Sinnlichkeit* (sensibility, Kant), so mark both. |
| Bildungstrieb | 90 | formative drive | Pe ✓, Be ✓ (p. 89) | Blumenbach's *nisus formativus*. Not "formative impulse". |
| Kunsttrieb | 92 | artistic drive / technical drive | Pe ✓ ("technical drive") | In animals (instinctive construction). Use Pe's *technical drive* in I/3. In I/5 *Kunsttrieb* = *artistic drive*. Period rule. |
| Metamorphose | 167 | metamorphosis | | Goethe's term. |
| Evolution; Epigenesis | 119; 3 | evolution (= preformation); epigenesis | | **False friend.** 18th-c. *Evolution* = unfolding of a preformed germ, the opposite of Darwinian evolution. Note at first occurrence. |
| Intussuszeption | 37 | intussusception | | Growth by internal uptake (vs *Juxtaposition*). |
| Stufenfolge (dynamische) | 129 | (dynamic) sequence of stages | | |
| Magnetismus; Magnet; Magnetnadel | 471; 226; 58 | magnetism; magnet; magnetic needle | | *thierischer Magnetismus* = *animal magnetism* (I/7, I/9). |
| Elektricität; Elektricitäten | 755; 60 | electricity; electricities | | Plural *Elektricitäten* (positive and negative) stays plural. |
| Galvanismus | 91 | galvanism | | |
| chemischer Proceß; Proceß | 353; 1 885 | chemical process; process | | **Cross-author:** = Hegel. |
| dynamisch; Dynamik; Atomistik | 550; 39; 56 | dynamic(al); dynamics; atomism | HH ✓ | "dynamische Physik" = dynamical physics (vs mechanical/atomistic). |
| Kohäsion (aktive / passive); Kohärenz; Kohäsionslinie | 898; 84; 50 | cohesion (active / passive); coherence; line of cohesion | Pe ✓ ("cohesion") | **High ratio.** *Kohärenz* ≠ *Kohäsion*. Markup. |
| Schwere; Schwerkraft; Gravitation | 763; 153; 72 | gravity; force of gravity; gravitation | LS ✓ ("force of gravity", p. 125) | **Cross-author:** = Hegel *Schwere* = gravity. "Schwere und Licht" (Freiheitsschrift) = *gravity and light*. |
| Licht; Lichtwesen | 2 109; 38 | light; light-being / luminous essence | | *Lichtwesen* in I/7 and I/8 = *the essence of light* or *a being of light* (context). |
| Wärme; Wärmestoff; Wärmematerie | 615; 77; 81 | heat; caloric; heat-matter | | **Period chemistry:** *Wärmestoff* = Lavoisier's *calorique* → *caloric*, not "thermal substance". |
| Kapacität / Kapazität | 144 | (heat) capacity | Pe ✓ ("heat-capacity"), HH ✓ ("capacity (heat, etc.)") | **High ratio (116×).** Never "capacity" in the general sense without context. "Kapacität gegen die Wärme" (I/2, 76–77) = *capacity for heat*. |
| Lebensluft | 109 | vital air (= oxygen) | | **Period term**, do not modernize to "oxygen". |
| Luftarten | 100 | kinds of air (gases) | | "azotische Luft" (21) = *azotic air* (nitrogen); "mephitische Luft" = *mephitic air*; "brennbare Luft" = *inflammable air* (hydrogen). Never modernize. |
| Oxygene; Sauerstoff; Stickstoff; Wasserstoff; Kohlenstoff | 173; 329; 81; 70; 47 | oxygen [Oxygene]; oxygen; nitrogen; hydrogen; carbon | | Schelling writes French *Oxygene* (ratio 154). Render "oxygen" but keep [Oxygene] in markup. |
| Phlogiston; Verbrennung, Verbrennungsproceß | 49; 286 | phlogiston; combustion, process of combustion | | |
| Zersetzung; Zerlegung | 90; 57 | decomposition; analysis, breaking down | | |
| Raumerfüllung | 90 | filling of space | | Kant's *Metaphysische Anfangsgründe*. |
| Attraktivkraft / Anziehungskraft / Anziehung | 165 / 79 | attractive force / force of attraction / attraction | HH ✓ (41× "attractive force") | Keep Latinate vs German forms apart in markup. |
| Repulsivkraft / Zurückstoßungskraft / Zurückstoßung | 77 / 64 | repulsive force / force of repulsion / repulsion | HH ✓ (62×) | |
| Expansivkraft; Expansion; Kontraktion | 49; 207; 187 | expansive force; expansion; contraction | Pf ✓ ("expansion"; but *Contraktion* = "concentration") | ⚑ section G (Kontraktion in 1810 ff.). |
| Grundkräfte | 91 | fundamental forces | | |
| Materie; Stoff; Urstoff | 4 156; 758; 34 | matter; stuff, material, substance (chem.); primordial matter | LS ✓ ("primal matter", p. 107) | **Danger:** *Stoff* in chemistry = *substance*, in aesthetics = *material*. *Materie* always *matter*. |
| Körper; Körperchen; Weltkörper | 2 509; 45; 283 | body; corpuscle; celestial body | | *Weltkörper* ≠ "world body". |
| Dimension; Länge, Breite, Tiefe | 638; 210 | dimension; length, breadth, depth | | The three dimensions as magnetism, electricity, chemism (identity philosophy). |
| Centrum / Zentrum / Centro (Latin abl.); Peripherie; Mittelpunkt | 278; 64; 234 | center; periphery; center point | LS ✓ ("centrum", "center"); Snow on LS "centerpoint" ✓² | Schelling uses Latin forms *im Centro, außer dem Centro* (I/2, 190): render "in the center". **Freiheitsschrift:** LS keeps *centrum* (37×). Recommendation: "center" throughout, markup [Centrum]. |
| Fluidum; Äther | 95; 57 | fluid; ether | | **Cross-author:** Hegel draft has "aether"; harmonize with American "ether". |
| Weltbau, Weltsystem, Planetensystem | ; 49; 49 | world structure, world system, planetary system | | |
| Construktion / Konstruktion, construiren | 830 | construction, construct | HH ✓ ("The Construction of Matter"), Mo ✓ | **Cross-author:** Hegel. In Schelling a technical method (presentation of the particular in the absolute, from Kant's mathematical construction). Never "building". |
| Erklärung, erklären | 954 (candidate list) | explanation, explain; declaration (context) | | **Danger: two senses.** In Naturphilosophie mostly *explanation* ("Erklärungsgrund" = *explanatory ground*). In polemics (I/7, I/8) also *declaration, statement*. |
| Hypothese | 159 | hypothesis | | |
| Naturforscher; Naturforschung | 94; 43 | natural scientist (naturalist); natural science, research into nature | | "Naturforscher" in 1800 is not yet "scientist" in the modern professional sense; "naturalist" for older figures. |

### D. System of Transcendental Idealism (I/3) and related texts

| German | n | English | Established | Danger / notes |
|---|---|---|---|---|
| Selbstbewußtseyn; Geschichte des Selbstbewußtseyns | 254 | self-consciousness; history of self-consciousness | He ✓ | **Cross-author:** = Hegel, Fichte. |
| Bewußtseyn; bewußtlos, das Bewußtlose | 2 665; 199 | consciousness; unconscious, the unconscious | Pf ✓ ("the pre-conscious" for *das Bewusstlose*) | Use "unconscious" (Pf's "pre-conscious" is an interpretation). |
| Epoche | 84 | epoch | He ✓ (contents) | Three epochs of STI. Never "era" or "phase". |
| produktive Anschauung | 47 | productive intuition | He ✓ | |
| ideelle / reelle Thätigkeit | 63 / 27 | ideal / real activity | He ✓ ("ideal activity") | Markup [ideell] / [reell] vs [ideal] / [real]. **Cross-author:** Hegel markup distinguishes *ideell / ideal*, *reell / real*. |
| ideell; reell; ideal; real | 607; 679; 1 203; 1 551 | ideal; real; ideal; real | | English cannot distinguish them; markup mandatory. In identity philosophy *das Ideale / das Reale* = *the ideal / the real*. |
| Grenze; Begrenztheit; begrenzen | 771; 109 | limit, boundary; boundedness | He ✓ ("Bound, boundary, limitation"; "boundedness") | |
| Schranke; Beschränktheit | 391 | restriction, limitation; restrictedness | He ✓ ("Restriction, confinement, restrictedness") | **Cross-author:** Hegel *Schranke* = limitation. Choose *restriction* here (He) or *limitation* (Hegel). Recommendation: *limitation* for consistency, *restrictedness* for *Beschränktheit*. |
| Schweben | 77 | oscillation, hovering | He ✓ ("Waver, oscillate") | |
| Anstoß | 47 | check | He ✓ ("check or impression"), Pf ✓ ("check") | **Cross-author:** Fichte's *Anstoß* = *check* (coordinate). In non-technical use = *obstacle* (LS ✓, p. 52). |
| Empfindung | 298 | sensation | | **Cross-author:** = Hegel. |
| Reflexion; Reflex | 505; 115 | reflection; reflex | St ✓ ("perfect reflex") | **Cross-author:** = Hegel *Reflexion*. *Reflex* (identity philosophy) = the mirroring of the absolute, so do not merge with *reflection*. |
| Abstraktion | 219 | abstraction | | |
| Intelligenz | 484 | intelligence | | "die Natur als bewußtlose Intelligenz" = *nature as unconscious intelligence*. |
| Wollen; Wille; Willkür | 1 374; 1 651; 409 | willing; will; free choice / arbitrary will | LS ✓ ("free will", p. 48); Pf ✓ ("spontaneity") | **Cross-author:** Hegel P "arbitrary will / free choice". "Wollen ist Urseyn" (I/7, 350) = *willing is primal being*. |
| Zweckmäßigkeit | 163 | purposiveness | | **Cross-author:** Hegel "purposive". |
| Genie | 72 | genius | | |
| Kunst als Organon der Philosophie | 6 (*Organon*) | art as the organon of philosophy | | |
| ästhetische Anschauung | 6 | aesthetic intuition | | |
| Vorsehung; Schicksal | 73; 235 | providence; fate, destiny | | **Cross-author:** Hegel "fate". |
| Rechtsverfassung; Gesetzmäßigkeit | 11; 133 | legal constitution; lawfulness | | |
| Geschichte; Historie | 1 085; 49 | history; history (as narrative), historiography | | *Historie* vs *Geschichte*: markup. Late *geschichtlich* = *historical* (real history) vs *historisch* = *historical* (in the sense of recorded / factual knowledge). Markup. |

### E. Identity philosophy (I/4–I/6: Darstellung, Bruno, Fernere Darstellungen, Würzburg System, Philosophie und Religion)

| German | n | English | Established | Danger / notes |
|---|---|---|---|---|
| absolute Identität; A = A | 680; 130 | absolute identity; A = A | Va ✓, VW ✓ | Principle 6 for the formula. |
| A = B; +A = B; A = +B | 180 | (copy) | | The "+" marks preponderance (*Übergewicht*). Never read as arithmetic. |
| A¹, A², A³ (potencies) | 308 | (copy) | | Never write "A to the power of 2". |
| quantitative Differenz | 89 | quantitative difference | VW ✓ (n. 20) | |
| Indifferenz; Indifferenzpunkt | 632; 157 | indifference; point of indifference | Va ✓ (n. 27), Mo ✓ | |
| Potenz (identity philosophy) | | potency (exponent sense, note) | Va ✓ ("first power or 'potency'"), VW ✓ | ⚑ S1. |
| Totalität; relative Totalität | 559; 36 | totality; relative totality | | |
| Subjektivität / Objektivität; Übergewicht der S./O. | | subjectivity / objectivity; preponderance of s./o. | | |
| Vernunft (absolute) | 1 662 | reason (absolute reason) | VW ✓ | **Cross-author:** = Hegel. |
| Verstand; Verstandeserkenntniß | 982 | understanding; knowledge of the understanding | LS ✓ ("understanding") | In 1809 *Verstand* = the divine understanding, *Wort* (LS ✓). **Cross-author:** = Hegel. |
| Erkennen; Erkenntniß; Erkenntnißart | 1 254; 1 272; 56 | cognition, cognizing; cognition / knowledge; mode of cognition | Mt ✓ ("a cognition [ein Erkennen]", p. 129; "the actual knowledge [Erkenntniß]", p. 197) | **Cross-author:** Hegel "cognition" for both *Erkennen* and *Erkenntnis*. Schelling: *Erkennen* = cognition. *Erkenntniß* = cognition where it is an act or faculty, *knowledge* where it is a result ("Erkenntniß Gottes"). Markup. *Erkenntnißart* (Bruno) = *mode of cognition*. |
| Wissen; Nichtwissen | 1 841; 102 | knowledge, knowing; non-knowing | Mt ✓ ("ignorance [Nichtwissen]", p. 158) | **Cross-author:** Hegel "knowing / knowledge". *Nichtwissen* (late: *docta ignorantia*) = *non-knowing*, not "ignorance" (which renders *Unwissenheit*, Mt ✓ "unknowing", p. 158). |
| Ineinsbildung; Einbildung | 42; ≈ 300 | ⚑ S8 forming-into-one; in-forming | VW ✓, St ✓ | |
| Urbild, Gegenbild, Vorbild, Abbild, Nachbild; urbildlich, gegenbildlich, vorbildlich | 242 / 109 / 108 / 120 / 21; 47 / 34 / 19 | ⚑ S9 archetype, antitype, prototype, copy, ectype; archetypal, antitypal, prototypal | Va ✓ | |
| das All; Allheit; Universum | | ⚑ see A: the All; allness; universe | | |
| Idee, Ideen; Ideenwelt | 2 559; 48 | idea, ideas; world of ideas | | ⚑ S14 lowercase. Platonic ideas in God (Bruno, I/6). **Cross-author:** Hegel D5. |
| Affirmation, das Affirmirte / Affirmirende, affirmiren; Selbstaffirmation | 213; 781; 35 | affirmation, the affirmed / the affirming, affirm; self-affirmation | St ✓, Pf ✓ | Würzburg System. **High ratio**, exclusively Schelling. |
| Gottgleich, das gottgleiche All | | godlike, the godlike All | | I/7, 162; I/4, 270. |
| Abfall, abfallen | 63 | ⚑ S10 falling-away, fall away | Ot ✓², Mt ✓ | |
| Ichheit | 81 | ⚑ S20 I-hood | | P&R 1804: principle of finitude. |
| Selbständigkeit | 121 | independence | Hegel D11 "self-sufficient" | **Cross-author:** Hegel D11 recommends *self-sufficient*. Schelling (high ratio 29.6): "die Selbständigkeit des Gegenbildes" (P&R) and of the creature; *self-sufficiency* fits; follow Hegel D11. |
| Reflex; Widerschein; Spiegel | 115; 33; 60 | reflex; reflected splendor / reflection; mirror | St ✓ ("reflex") | |
| Schematismus; Schema; Symbol; Allegorie | 51; 185; 422; 205 | schematism; schema; symbol; allegory | St ✓ | The triad schema–allegory–symbol (I/5 § 39). Never "scheme". *Allegorie* also in mythology (section I). |
| Erscheinung; Erscheinungswelt | 1 797; 42 | appearance; world of appearance | | |
| das Endliche, Unendliche, Ewige | | the finite, the infinite, the eternal | Va ✓ | |
| Construktion (identity) | | construction | Mo ✓ ("Historical Construction of Christianity") | |
| Copula; Band | 79; 569 | copula; bond | LS ✓ | |
| Erkenntnißakt | | act of cognition | | "absoluter Erkenntnißakt" (I/2, 67). |
| Identitätssystem / Identitätsphilosophie | 30 | system of identity / philosophy of identity | | |
| intellektuelle Anschauung (identity) | | intellectual intuition | VW ✓ | |
| Einheiten (drei) | 257 (candidate list) | (three) unities | | |
| Natur in Gott | | nature in God | | I/4, 329; I/8, 69. |
| Seele; Weltseele | | soul; world soul | | |

### F. Philosophy of art (I/5 Philosophie der Kunst, Akademie-Rede I/7, I/5 Vorlesungen über die Methode)

| German | n | English | Established | Danger / notes |
|---|---|---|---|---|
| Kunst; Kunstwerk; Künstler | 1 524; 159; 209 | art; work of art; artist | St ✓ | |
| das Schöne; Schönheit | 70; 439 | the beautiful; beauty | St ✓ | **Cross-author:** = Hegel. |
| das Erhabene | 335 | the sublime | St ✓ | |
| Anmut; Grazie | 83 | grace | St ✓ | *Anmut* (high ratio 22.8) and *Grazie* both "grace", so markup. |
| Symbol, symbolisch; Schema; Allegorie | | symbol, symbolic; schema; allegory | St ✓ | I/5 § 39 defines them reciprocally. Keep exactly. |
| Mythologie (als Stoff der Kunst) | | mythology | St ✓ | "Mythologie ist die nothwendige Bedingung und der erste Stoff aller Kunst" (I/5, 405) → *material*. |
| Stoff (der Kunst) | | material | | Not "stuff" or "matter" (*Materie*). |
| Poesie; Dichtkunst; Dichtung; Dichter | 463; 30; 46; 197 | poetry (poesy); the art of poetry; poetry, poetic work; poet | St (unchecked) | **Danger:** *Poesie* in Schelling (as in Schlegel) = productive making in general (ποίησις), wider than "poetry". Note at first occurrence. |
| bildende Kunst; Plastik; Malerei; Architektur / Baukunst; Musik | 79; 131; 186; 119 / 33; 225 | visual / plastic arts; sculpture; painting; architecture; music | St (unchecked) | *Plastik* (high ratio 103) = *sculpture* (never "plastics"). *bildende Kunst* = *the visual arts* (formative arts; markup). |
| Rhythmus; Melodie; Harmonie | 102; 41; 264 | rhythm; melody; harmony | | |
| Zeichnung; Helldunkel; Kolorit | 75; 58; 21 | drawing; chiaroscuro; coloring | | *Helldunkel* (ratio 35) = *chiaroscuro*, never "light-dark". |
| Stil; Manier | 179; 35 | style; manner(ism) | | Distinction from Goethe's *Einfache Nachahmung, Manier, Styl*. Keep "manner". |
| Epos; Lyrik, lyrisch; Drama; Tragödie; Komödie; Roman | 154; 85; 103; 138; 74; 58 | epic; lyric (poetry); drama; tragedy; comedy; novel | | *Roman* = *novel* (not "romance", except Don Quixote contexts by note). |
| Ironie | 39 | irony | | |
| Nachahmung; Naturnachahmung | 111 | imitation; imitation of nature | | |
| das Charakteristische | 44 | the characteristic | | Akademie-Rede (I/7). |
| Einbildungskraft; Phantasie; Imagination | 160; 77; 75 | imagination; fantasy; imagination [Imagination] | St ✓ | ⚑ S8. |
| Genie | 72 | genius | | |
| Akademie (der bildenden Künste) | 407 (candidate list) | academy (of fine arts) | | Mostly the Munich academy and *Akademie der Wissenschaften*; also "akademisches Studium" (I/5). |
| Göttervorstellungen (in art) | | representations of gods | | ⚑ section I. |
| Vers; Silbenmaß | 35 | verse; meter | | |
| Gemälde | 87 | painting | | |
| Statue; Bildsäule | 32 | statue | | |
| Kunsttrieb (art) | | artistic drive | | ⚑ section C, period rule. |

### G. Freiheitsschrift, Stuttgart Private Lectures, Weltalter, Clara, Denkmal Jacobi (I/7–I/9)

| German | n | English | Established | Danger / notes |
|---|---|---|---|---|
| Grund / Existenz; das Existirende; Grund von Existenz | | ⚑ S6, S13: ground / existence; that which exists; ground of existence | LS ✓ | |
| Ungrund; Urgrund; Abgrund | 22; 6; 47 | ⚑ S5 unground; primal ground; abyss | LS ✓, Bo ✓ | |
| Sehnsucht; Sucht; Begierde; Hunger | 118; < 415; 76; 37 | ⚑ S7 longing; craving; desire; hunger | LS ✓ (yearning, craving), Bo ✓ | *Sucht* count inflated by the verb *sucht*. |
| Selbstheit | 143 | ⚑ S20 selfhood | LS ✓, Pf ✓ | |
| Eigenwille; Universalwille; Partikularwille | 27; 6; 5 | self-will; universal will; particular will | LS ✓ (p. 32) | |
| Wille des Grundes; Wille der Liebe | | will of the ground; will of love | LS ✓ (p. 42) | |
| Urwille; ahnender Wille | | primal will; divining will | LS ✓ (pp. 23, 29) | |
| Wille, der nichts will | | the will that wills nothing | Bo ✓ ("the will which wills nothing") | Weltalter. Keep the paradox. |
| Band (der Kräfte; lebendiges Band) | | bond (of forces; living bond) | LS ✓ ("vital bond", p. 31) | |
| Centrum; Peripherie; Centralfeuer | | center; periphery; central fire | LS "centrum" ✓ | See section C. |
| Persönlichkeit; Personalität | 409; 14 | personality; personhood | LS ✓ (personality; "personhood" for *Personalität*, p. 58) | Late *Persönlichkeiten* (80) = *persons* in the Trinity (section J). |
| Liebe; Geist; Wort; Verstand | 327; 2 389; ; 982 | love; spirit; word; understanding | LS ✓ | Freiheitsschrift: "das Wort" = the Logos; capitalize? **No:** "the word" (S14), with markup. |
| das Böse; Bosheit; Sünde; Hang | 282; 17; 117; 19 | evil; wickedness / malice; sin; propensity | LS ✓ ("propensity", pp. 47, 52) | *das Böse* ≠ *das Übel* (*malum*, ill). *Übel* = *ill / bad*; *malum metaphysicum* stays Latin. |
| Krisis; Scheidung; Entscheidung | 130; 133; 68 | ⚑ S11 crisis; separation; decision | LS ✓, Bo ✓ | |
| Zerrüttung; Krankheit | 7; 225 | disruption; disease, illness | LS ✓ ("collapse", p. 34) | Freiheitsschrift analogy: evil as disease. |
| Grimm | 9 | wrath / fury | LS ✓ ("fury", pp. 66, 89) | Böhme's term. Choose "wrath" (Böhme translations, unchecked) or LS "fury". **Recommendation:** "wrath" (Böhmean *Zorn/Grimm* as a divine principle); LS "fury" is acceptable. Minor. |
| Schwermuth | 9 | melancholy | LS ✓ (p. 63), Pf ✓ | "der Schleier der Schwermuth" (I/7, 399) = *the veil of melancholy*. |
| Traurigkeit | | sadness | LS ✓ (p. 62) | |
| das Regellose | 28 | the unruly / anarchy | Gu ✓² "unruliness", LS ✓ "anarchy" (p. xxxiii) | **Recommendation:** "the unruly" (keeps the *Regel* / rule contrast, as LS themselves concede). LS's "anarchy" is interpretive. |
| Gemüth / Gemüt | 224 | heart, disposition (context) | LS ✓ ("disposition", p. 19), Pf ✓ ("temperament"), La ✓ ("the Heart") | **Danger: no English equivalent.** Stuttgart triad *Gemüth – Geist – Seele*: render *Gemüth* = **heart** (La) in that triad, *disposition* elsewhere; markup always. |
| Gottheit; Uebergottheit | 793; 2 | Godhead; supra-Godhead | Bo ✓ ("supergodhead") | "super-" is colloquial; "supra-" is standard theology. |
| Lauterkeit | 42 | purity (sheer purity) | La ✓ ("lucid purity") | Weltalter: God's essence before being. |
| Gelassenheit | 7 | releasement / letting-be | La ✓ ("letting go") | **Danger:** Heideggerian "releasement" (Anderson/Freund) was coined for Heidegger. In Schelling it is Eckhart's term. Use "letting go" (La) or "serenity". **Recommendation:** "releasement", flagged as a mystical term with a note on Eckhart. |
| Zusammenziehung; Contraktion; Ausbreitung; Expansion | 83; 187; 46; 207 | contraction; contraction [Contraktion]; expansion [Ausbreitung]; expansion | Bo ✓, LS ✓ ("contraction"), Bw (SEP) ✓; Pf ✓ "concentration" (minority) | Use "contraction" for both. Pf's "concentration" (Böhme/Swedenborg background) not adopted. Markup separates German / Latin forms. |
| Umtrieb; rotatorische Bewegung; Rad | 14; 20; 21 | ⚑ S12 circular drive; rotary motion; wheel | La ✓, Dw ✓, Bo ✓ | |
| Weltalter | 25 | ages of the world | Bo ✓, Wi ✓ (title) | Not "world ages" (except as an established German loan in scholarship). |
| Vergangenheit, Gegenwart, Zukunft | 308; 231; 191 | past, present, future | Bo ✓ | Capitalize only as book titles (*The Past*). |
| Urzeit; Vorzeit; Urwelt | 54; 48 | primordial time; prehistoric time; primeval world | LS ✓ ("primeval time", p. 46 for *Urzeit*) | *Urzeit* (ratio 38) is a technical term in II/1 (time before history). Keep *Urzeit* ≠ *Vorzeit*: "primordial time" vs "prehistoric time". |
| Geisterwelt; Geister | 112 | spirit world; spirits | Sk ✓ (title: "Spirit World"), Pf ✓ ("world of spirits") | Never "ghost world". |
| ewige Natur | 70 | eternal nature | LS ✓ (p. 89) | Böhmean. |
| Ekstase, Ekstasis; ekstatisch | 17 | ecstasy | Mt ✓ (intro), Bruff ✓², Fakhoury ✓² | Erlangen lectures (I/9, 229): "unser Ich wird außer sich … gesetzt": ex-stasis. Note the etymology at first occurrence. |
| Wahnsinn | 74 | madness | | Weltalter, Stuttgart. Gabriel/Žižek (2009) title. |
| Begeisterung | 69 | inspiration, enthusiasm | LS ✓ ("spiritedness", p. 40) | The *Geist* root matters. Prefer "inspiration" (*be-geist-ert*), flag. |
| Turba; Turba gentium | 8 | turba; *turba gentium* (tumult of peoples) | LS ✓ (p. 46) | Böhme's Latin. Keep it. |
| Mysterium; Geheimniß | 38; 169 | mystery | LS ✓ | Böhme's *mysterium magnum*. Plural *Mysterien* (mystery cults) → section I. |
| Wiederbringung (aller Dinge) | 11 | restoration (of all things), apokatastasis | LS ✓ ("return", p. 67) | Origenist ἀποκατάστασις. Prefer "restoration" with a note; *Wiederherstellung* (93) = *restoration / re-establishment*. Markup. |
| Verklärung | 45 | transfiguration | | |
| Erlösung | 32 | redemption | | |
| Wiedergeburt | 16 | rebirth, regeneration | | |
| Leben / Tod; Unsterblichkeit | 132 | life / death; immortality | Sk | Clara, Stuttgart. |
| Natur in Gott; das in-Gott-Seyn | | nature in God; being-in-God | LS ✓ ("Being-in-God", p. 72) | |
| Seyn / Seyendes / Nichtseyendes (Stuttgart) | | being / that which is / that which is not | Pf ✓ glossary ("Being / being / nonbeing") | ⚑ S2: we do not follow Pf's "being" for *Seyendes*. |
| Uebernatürlich; übergeschichtlich | | supernatural; supra-historical | LS ✓ ("being beyond nature", p. 34) | |
| Ahndung, ahnden | 68 | presentiment, divine (v.) | | **False friend.** Period *ahnden* = *ahnen* (presentiment), not modern *ahnden* (to punish). |
| Vernunftsystem; System der Freiheit | | system of reason; system of freedom | | |
| Pantheismus; Pantheismusstreit | 150 | pantheism; pantheism controversy | LS ✓ ("Pantheism debate") | |
| Fatalismus; Immanenz | | fatalism; immanence | | |
| Gott ist nicht ein Gott der Todten | | God is not a God of the dead | LS (unchecked) | Biblical (Mt 22:32): use the KJV-type wording (section 4). |
| Geist, Seele, Gemüth (Stuttgart triad) | | spirit, soul, heart | La ✓ (heart) | Fixed triad. |
| Clara | | *Clara, or On Nature's Connection to the Spirit World* | Sk ✓ | |

### H. Late philosophy: negative and positive philosophy (I/10, II/1 lect. 11–24, II/3 introductory lectures)

| German | n | English | Established | Danger / notes |
|---|---|---|---|---|
| negative / positive Philosophie | 74 / 169 | negative / positive philosophy | Mt ✓, Bw (SEP) ✓ | **Danger:** "positive" ≠ positivism. A note at first occurrence (*positiv* = what is posited / given, from *ponere*). |
| reinrationale Philosophie; Darstellung der reinrationalen Philosophie | 31 | purely rational philosophy; *Presentation of Purely Rational Philosophy* | Hy ✓ ("pure rational philosophy") | Choose "purely rational" (adverb + adjective, mirrors *rein-rational*). |
| Vernunftwissenschaft / Vernunftswissenschaft | 93 | science of reason | Mt ✓ (47×) | Hy "rational science" ✓ not adopted. |
| Wissenschaft | 2 335 | science (*Wissenschaft*) | | **False friend.** Never narrowly "natural science". Note once per volume. |
| Empirismus; metaphysischer Empirismus; Apriorismus | 167; 1; 2 | empiricism; metaphysical empiricism; apriorism | Mt ✓ ("Apriori", p. 181) | |
| das Seyende; das Seyende selbst | | ⚑ S2 that which is; that which is itself | | |
| das Seynkönnende, Seynkönnen; das Seynmüssende; das Seynsollende | | ⚑ S3 that which can be, capacity to be; that which must be; that which ought to be | Mt ✓ | |
| das rein Seyende; das bloß Seyende; das blind Seyende | 195; ; 58 | that which purely is; that which merely is; that which blindly is | Mt ✓ ("that which just is", p. 49), Hy ✓ ("the pure existent") | |
| das nothwendig Existirende; das nothwendig Seyende | 78 | that which necessarily exists; that which necessarily is | | Do not merge (S2/S13). |
| das nicht nicht seyn Könnende | — (2) | that which cannot not be | | Trap T4. |
| das Ueberseyende | 19 | that which is above being; the supra-existent | Mt ✓ ("that which is above being", pp. 179, 205), Hy ✓ ("supra-existent") | **Recommendation:** "that which is above being" (Mt), consistent with S2. In I/8, 238 Schelling glosses with τὸ ὑπερόν (copy Greek as printed). |
| unvordenklich; das unvordenkliche Seyn | 87 | ⚑ S4 unprethinkable; unprethinkable being | Dw ✓, Bw ✓ | |
| Herr des Seyns | 35 | Lord of being | Mt ✓ (p. 154: "Lord of Being"; p. 202 lowercase), Hy ✓ | Lowercase "being" (S14); "Lord" capitalized as a divine title. |
| Prius; das absolute Prius | 155 | *prius*; the absolute *prius* | Mt ✓ | |
| Was / Daß; quid / quod; das reine Daß | 124 (*das Was/Daß*); 82 / ≈ 358 | the what / the that; *quid / quod*; the pure *that* | Mt ✓ ("whatness", "thatness", pp. 130, 147), Hy ✓ ("a pure That … to the What"), Dw ✓ (keeps *Daß*, p. xvii) | **Recommendation:** *the what* / *the that*, italicized, following Hy. Mt's "whatness/thatness" sound scholastic. Dw's retention of German avoids the ambiguity of "that". Pipeline rule: always italicize *what* / *that* when they render *Was* / *Daß*. |
| Aktus; actus purus; Potenz / Aktus | | act; pure act; potency / act | Mt ✓ | |
| Ekstase der Vernunft | | ecstasy of reason | Bruff ✓² | |
| Ende / Anfang (der Philosophie) | | end / beginning | | |
| umgekehrte Idee | 1 | inverted idea | Mt ✓ ("the inverted idea", p. 50) | |
| Begriff | 5 383 | concept | | **Cross-author:** = Hegel (never "notion"). Late critique of Hegel ("der logische Begriff", "Selbstbewegung des Begriffs") quotes Hegel's terms: use the Hegel glossary's renderings exactly. |
| Idee (late) | | idea | | "die Idee des Seyenden". ⚑ S14. |
| Denken; Gedanke; Denkwissenschaft | | thinking; thought; science of thought | Mt ✓ (p. 158) | **Cross-author:** = Hegel. |
| Erfahrung | 1 060 | experience | | "a posteriori", "Erfahrungsmäßigkeit" (Mt ✓ "commensurate with experience", p. 75). |
| Ursache; causa materialis / efficiens / finalis; Endursache | 1 779; ; 23 | cause; material / efficient / final cause; final cause | | Keep Latin as printed. |
| urständliches Seyn; Urstand | 12; 19 | pre-jective being; primal state | Dw ✓ ("pre-jective", p. xix–xx) | **Danger:** Dw's coinage (principle 3). **Recommendation:** "primal being" with markup [urständlich] and a note on the *Urstand / Gegenstand* pun. Ask the owner if Dw's coinage should be adopted. |
| Gottseyn; das Gott-Seyende | 14 | being-God; that which is God | Mt ✓ ("his divine being", p. 201) | |
| das Seyn als das Gott-setzende | | being as that which posits God | | I/10, 269. Cf. *gottsetzend* (section I). |
| ontologischer Beweis / Argument | 11 | ontological proof / argument | Hy ✓ | |
| Verstandesmetaphysik / Verstandsmetaphysik | | metaphysics of the understanding | Mt ✓ ("[metaphysics] of the understanding", p. 116) | |
| philosophische Religion | | philosophical religion | Hy (unchecked) | II/1, end of lect. 24. |
| Monotheismus (as doctrine) | 352 | monotheism | Hy ✓ | See section I. |
| Einzigkeit / Einheit Gottes | 141 | uniqueness / unity of God | | ⚑ see A. |
| Allheit, All-Einheit | | allness, all-unity | | |
| Seyn-Wollen; Wollen | | willing-to-be; willing | Mt ✓ ("Wanting [Wollen]", pp. 135, 154) | Mt "wanting" not adopted: use "willing" (S14 consistency with I/7). |
| Entlassen; Entlassung | | release | Mt ✓ ("the release [Entlassens]", pp. 60, 175) | Schelling's mockery of Hegel's "die Idee entläßt die Natur" (I/10, 153): use *releases* (Hegel draft wording to be matched). |
| Andersseyn | | otherness / being-other | Mt ✓ ("a different being", p. 175) | **Cross-author:** Hegel "otherness". In I/10 Schelling quotes Hegel: use "otherness". |
| Uebersinnliche | | supersensible | Mt ✓ ("the absolute supersensible", p. 115) | |

### I. Philosophy of mythology (II/1–II/2; I/8 Samothrace; I/9)

| German | n | English | Established | Danger / notes |
|---|---|---|---|---|
| Mythologie; mythologisch | 1 686; 583 | mythology; mythological | RZ ✓ (title), Hy ✓ | **High ratio (73).** |
| Mythus / Mythos; Mythen | 175 | myth; myths | | Schelling's *Mythus* = a single myth or mythical narrative, *Mythologie* = the whole system of god-representations *and* the science. Do not merge. |
| Göttervorstellung(en) | 18 | representation(s) of gods | Hy ✓ ("mythological representations") | **Cross-author:** *Vorstellung* = representation (Hegel draft E). Not "idea of the gods" or "conception". |
| Göttersage; Götterlehre; Göttergeschichte; Götterwelt | 3; 94; 84; 40 | legend of the gods; doctrine of the gods; history of the gods; world of the gods | | *Götterlehre* (Schelling) = the content of mythology as doctrine, so not "theology". |
| Theogonie; theogonisch; theogonischer Proceß | 116; 139 | theogony; theogonic; theogonic process | Hy ✓ | |
| mythologischer Proceß | | mythological process | Hy ✓ | |
| kosmogonisch | 32 | cosmogonic | | |
| tautegorisch | 2 | tautegorical | Hy ✓ ("borrowed from Coleridge"), RZ ✓² (II/1, 196 "mean only what they are", via Félix) | Schelling's own definition, II/1, 196: "nicht allegorisch, sie ist tautegorisch". Keep the term; no paraphrase. |
| allegorisch; Allegorie | 205 | allegorical; allegory | | The counterterm in II/1. |
| Polytheismus; successiver / simultaner Polytheismus | 324; 28 / 6 | polytheism; successive / simultaneous polytheism | Hy ✓, RZ ✓² | |
| Vielgötterei; Göttervielheit | 45; 48 | belief in many gods; plurality of gods | | Keep separate from *Polytheismus* (markup). |
| Monotheismus; relativer Monotheismus; Urmonotheismus | 352; 25; 1 | monotheism; relative monotheism; primordial monotheism | Hy ✓ | |
| der relativ-Eine / der absolut-Eine | | the relatively One / the absolutely One | | II/1, 144. Keep the hyphen logic. Capital "One" because it is a divine name in Schelling's argument (exception to S14, flagged). |
| Urbewußtseyn | 38 | primordial consciousness | Hy ✓ ("Original consciousness") | |
| gottsetzend; das Gott setzende Bewußtseyn | 24 | God-positing; God-positing consciousness | Dw ✓² (chapter title), RZ ✓² ("that which posits God") | |
| Völker; Volk | 573; 659 | peoples; a people | Hy ✓ | "Volk" = *a people*; never "folk" or "race". **Cross-author:** Hegel P "people / nation". |
| Völkerscheidung / Scheidung der Völker | 2 | separation of peoples | Hy ✓ | ⚑ S11. |
| Sprachverwirrung | 5 | confusion of languages | Hy ✓ ("confusion of language") | Babel (Gen. 11). Plural "languages" in English biblical idiom. |
| Krisis (mythological) | | crisis | Hy ✓ ("spiritual (geistige) crisis") | ⚑ S11. |
| Heidenthum; Heiden | 263; 90 | paganism; pagans, heathens | Hy ✓ ("Paganism") | Use "paganism / pagans"; "heathen" only in biblical quotation. |
| Zabismus (Sabäismus) | 75 | Sabianism / Sabaism (star worship) | (unchecked) | **High ratio.** Schelling's spelling *Zabismus* = astral religion. Use "Sabaism" (the English term for star worship) and markup [Zabismus]. Do not confuse with the Sabians (Mandaeans). Note. |
| Uroffenbarung; Offenbarung | 3; 767 | primordial revelation; revelation | | |
| Mysterien; Mysterienlehre | 510; 40 | mysteries (mystery cults); doctrine of the mysteries | | Plural = cult. *Mysterium* (singular) → section G. |
| Kabiren | 89 | Cabiri | Br ✓ | ⚑ S15. Names Axieros, Axiokersa, Axiokersos, Kadmilos: Schelling's spellings (section 4). |
| Göttin; Gott (mythological) | | goddess; god | | "der Gott" in mythology = *the god* (lowercase), distinct from *Gott* (God). Trap T11. |
| Hellenen; Griechen | 90; 230 | Hellenes; Greeks | | Schelling distinguishes them (II/1, 19: only after the separation of god-representations do the *Hellenen* have poets). Keep both. |
| Urzeit; Vorzeit; vorgeschichtlich / übergeschichtlich | | primordial time; prehistoric time; prehistoric / supra-historical | | ⚑ section G. |
| Doktrin, Philosophem | | doctrine, philosopheme | | |
| Euhemerismus | | euhemerism | | |
| Etymologie | 39 | etymology | | |
| Symbolik | 41 | symbolism | | Creuzer's *Symbolik* = title, keep German. |
| Opfer; Opferdienst | 218 | sacrifice; sacrificial cult | | |
| Priester; Braminen | 65; 35 | priests; Brahmins | | *Braminen* = Brahmins (modern spelling). |
| Dionysos (erster, zweiter, dritter); Zagreus; Iakchos | 500 | Dionysos (first, second, third); Zagreus; Iakchos | Hy "Dionysus" ✓ | ⚑ S15. |
| Urania; Kronos; Uranos | 107; 387; 112 | Urania; Kronos; Ouranos | Hy ✓ ("Kronos", "Ouranos") | ⚑ S15. *Urania* = the Aphrodite Urania moment of the process. |
| Persephone; Demeter; Kore | 190; 170 | Persephone; Demeter; Kore | | |
| Osiris, Isis, Typhon, Horos | 200; 56; 200; 76 | Osiris, Isis, Typhon, Horus | | Egyptian names: use the established English forms (Horus); Typhon as in Plutarch. |
| Brama, Wischnu, Schiwa; Maja; Vedas | 74; 80; 70; 37; 104 | Brahma, Vishnu, Shiva; Maya; Vedas | | **Danger:** German transliterations (Wischnu, Schiwa, Brama) must be modernized. Markup keeps the original. |
| Buddha / Buddhismus | 50 / 117 | Buddha / Buddhism | | |
| Melkart, Militta, Mithras, Ahriman | 50; 38; 96; 32 | Melqart, Mylitta, Mithras, Ahriman | | Keep Schelling's form where no established English form exists (Militta → Mylitta per Herodotus 1.131). |
| Jehovah; Elohim | 163; 71 | Jehovah; Elohim | | Schelling's *Jehovah* stays "Jehovah", not "Yahweh" (the distinction Elohim/Jehovah is part of his argument). |

### J. Philosophy of revelation and theology (II/3–II/4; parts of I/7–I/10)

| German | n | English | Established | Danger / notes |
|---|---|---|---|---|
| Offenbarung; geoffenbart; offenbar | 767; 103 | revelation; revealed; manifest | | **Cross-author:** Hegel "revealed religion" (*offenbare / geoffenbarte Religion*). "offenbar" = *manifest* in the sense of open (I/7: "offenbar werden"), not "obvious". |
| Christenthum; Christus; Christologie | 577; 737; 5 | Christianity; Christ; Christology | Hy ✓ | |
| Sohn; Vater; Geist (Trinity) | 626; 606 | Son; Father; Spirit | Hy ✓ | Capitalized as divine persons. "der heilige Geist" = *the Holy Spirit* (not "Ghost"). |
| Persönlichkeiten (in Gott) | 80 | persons, personalities | | Trinity: "persons". Elsewhere "personalities". Markup. |
| Dreieinigkeit; Trinität | 43 | Trinity | | |
| Logos | 62 | Logos | | Capitalized, untranslated (Greek). |
| Menschwerdung | 115 | incarnation (becoming human) | Hy ✓ ("Incarnation") | Lowercase "incarnation" except as doctrinal title. |
| Erniedrigung; Entäußerung; κένωσις | 37; ; 4 | humiliation; divestment / self-emptying; *kenosis* | Hy ✓ ("kenosis (self-emptying)"), Mt ✓ ("free divestment [Entäusserung]", p. 177) | **Cross-author:** Hegel D7 (*Entäußerung* = externalization). In Schelling's Christology *Entäußerung* glosses κένωσις (II/4, 158–159), so render **divestment** (Mt) here, with markup. Do not use "externalization" in II/4. |
| μορφὴ θεοῦ; Gestalt Gottes; Knechtsgestalt | 6 | *morphē theou*; form of God; form of a servant | Hy ✓ | Phil. 2:6–8. Keep the Greek as printed, give the English in brackets once. |
| außergöttlich; widergöttlich | 154; 10 | extra-divine; anti-divine | Hy ✓ ("extra-divine") | "außergöttliche Persönlichkeit" = *extra-divine personality*. **High ratio.** |
| Herrlichkeit | 149 | glory | | Biblical δόξα. Not "splendor" or "magnificence". |
| Satan; Teufel | 164; 51 | Satan; devil | Hy ✓ | Schelling's Satanology distinguishes *Satan* (a cosmic principle) from *der Teufel* (popular figure). Keep both. |
| Engel | 138 | angel(s) | Hy ✓ | |
| Versöhnung; Erlösung | 110; 32 | reconciliation; redemption | | **Cross-author:** Hegel "reconciliation". |
| Opfer; Tod; Auferstehung | 218; ; 37 | sacrifice; death; resurrection | | |
| Schöpfung; Schöpfer; Geschöpf; Kreatur, Creatur | 592; 177; 268; 113 | creation; creator; creature; creature [Kreatur] | LS ✓ ("created being", p. 12) | *Kreatur* in Schelling (ratio 14.7) often pejorative / Böhmean: markup. |
| Monotheismus; Theismus; Pantheismus; Deismus | 352; 158; 150; 8 | monotheism; theism; pantheism; deism | | |
| Messias | 46 | Messiah | | |
| Kirche: petrinisch, paulinisch, johanneisch | 306; 8; 9; 15 | church: Petrine, Pauline, Johannine | Hy ✓ ("the Petrine, the Pauline and the Johannine churches") | |
| Testament (Altes / Neues); Evangelium; Apostel | 46; 48; 207 | (Old / New) Testament; gospel; apostle | | *der Apostel* without a name = Paul (as in Schelling): render "the apostle" (lowercase), don't add "Paul". |
| Glaube | 901 | faith, belief | | **Cross-author:** Hegel "faith". Philosophical *Glaube* (Jacobi) = *faith*; "glauben, daß" = *believe that*. |
| Wunder | 152 | miracle | | |
| Gnade | 32 | grace | | **Danger:** collides with *Anmut* = grace (section F). Markup. |
| Unsterblichkeit | 132 | immortality | | |
| Sündenfall; Fall | 17; — | the Fall | | ⚑ S10. |
| Mittler | | mediator | | |
| Weltschöpfung | | creation of the world | | |
| das Heidenthum / Judenthum / Christenthum | 263; 36; 577 | paganism / Judaism / Christianity | | |
| Lehre, Dogma | 775; 31 | doctrine, dogma | | |
| Geistlich / geistig | | spiritual (religious) / spiritual (mental) | | **Danger:** *geistlich* = clerical, sacred; *geistig* = spiritual (of spirit). Markup. |

### K. History of philosophy, schools and persons (I/10 Zur Geschichte der neueren Philosophie; polemics)

| German | n | English | Established | Danger / notes |
|---|---|---|---|---|
| Spinozismus; Spinoza | 119; 296 | Spinozism; Spinoza | | |
| Cartesius / Kartesius, Deskartes | 105; 51 | Descartes | Bw (unchecked) | Schelling writes Latin *Cartesius*. Render "Descartes" (markup keeps *Cartesius*). |
| Leibniz; Monade, Monadologie | 200; 115 | Leibniz; monad, monadology | | |
| Wolff, Wolffische Schule | | Wolff, Wolffian school | | |
| Kant; Ding an sich; Kritik der reinen Vernunft | 638; 190 | Kant; thing in itself; *Critique of Pure Reason* | | **Cross-author:** Hegel "thing in itself". |
| Fichte; die Fichtesche Philosophie | | Fichte; Fichte's philosophy | | |
| Jacobi; Glaubensphilosophie | | Jacobi; philosophy of faith | | *Denkmal der Schrift … des Herrn F. H. Jacobi* (I/8) title in section M. |
| Hegel; die Hegelsche Philosophie | 93 | Hegel; Hegel's philosophy | | Quotations from Hegel: Hegel glossary renderings. |
| Böhme, Jakob | | Jacob Böhme | | Böhmean vocabulary (Grimm, Turba, Mysterium magnum, ewige Natur, Qual) kept as above. |
| Rationalismus; Empirismus; Sensualismus; Naturalismus; Mysticismus; Theosophie; Scholastik | 110; 167; 6; 31; 52; 59; 68 | rationalism; empiricism; sensualism; naturalism; mysticism; theosophy; scholasticism | Mt ✓ ("theosophy") | |
| Dogmatismus; Kriticismus; Realismus; Idealismus | 246; 113; 172; | dogmatism; criticism (critical philosophy); realism; idealism | Ma ✓ | |
| Identitätsphilosophie; Naturphilosophie; Transscendentalphilosophie | | philosophy of identity; philosophy of nature; transcendental philosophy | | |
| Verstandesmetaphysik | | metaphysics of the understanding | Mt ✓ | |
| Platon; Aristoteles; Plotin | 220; 403 | Plato; Aristotle; Plotinus | | Schelling writes *Platon*: render "Plato". |
| Pythagoreer | 31 | Pythagoreans | | |
| Hume; Newton; Goethe; Winkelmann | 42; 61; 47; 40 | Hume; Newton; Goethe; Winckelmann | | Schelling writes *Winkelmann*: modern spelling "Winckelmann", markup. |
| Steffens; Eschenmayer; Baader; Oken | 42 | (as printed) | | |
| Tertullianus; Arnobius; Marcion (Marcionis, Marcionem) | 40; 51; 41 + 34 + 33 | Tertullian; Arnobius; Marcion | | **Trap:** Latin case forms (*Marcionis*, *Marcionem*, *Marcione*) in running German text: render the name in English nominative unless inside a Latin quotation. |

### L. Editorial and everyday vocabulary that misleads

| German | n | English | Established | Danger / notes |
|---|---|---|---|---|
| der Verfasser | 596 | the author | | **Trap:** Schelling refers to himself as "der Verfasser". In I/5 dialogues "Der Verfasser." is a speaker label: keep "The Author." as speaker tag. |
| der Herausgeber; Handexemplar | 69; 39 | the editor (K. F. A. Schelling); author's copy (with marginalia) | | Editorial notes by the son. Keep "[Editor's note]" convention of the portal. |
| Zusatz; Anmerkung; Erläuterung; Beilage | 589; 104; 132 | addition; remark / note; elucidation; supplement | | *Zusatz* (high ratio) in I/2 (the 1803 additions to the *Ideen*) = *Addition*, capitalized as a section heading. |
| Vorlesung; Vortrag | 267 | lecture; lecture, presentation | | |
| Abhandlung | 262 | treatise, essay | | |
| Ansehung: in Ansehung | 807 | with respect to | | **Ratio 3.9.** Never "in view" or "regarding the sight". |
| in Bezug auf | 923 (*Bezug*) | with reference to, in relation to | | **Ratio 23.** Not a term; never "in reference to the relation". |
| eigentlich | 2 421 | properly, really | | ⚑ see A. |
| allerdings | | certainly, to be sure | | |
| Sinn | 1 814 | sense, meaning | | |
| Bedeutung | 965 | meaning, significance | | |
| Moment | 882 | moment | | Never "instant" in the technical sense. |
| Erklärung | 954 | explanation / declaration | | ⚑ see C. |
| Stelle | 1 283 | passage (in a text); place | | Mostly *passage* in philological contexts (II/1–II/2). |
| Versuch | 237 | attempt; experiment (chemistry) | | Context: I/2 *Versuche* = experiments. |
| Gegend; Gebiet | 52; 174 | region; domain | | |
| Mensch | | ⚑ S19 | | |
| Freund (Anrede) | 212 | friend | | Dialogue address in *Briefe*, *Bruno*. |
| Recension, Recensent | 83; 39 | review, reviewer | | |
| Kreuzer | 63 | Creuzer (person) | | **Trap:** *Kreuzer* in II/2 = Friedrich Creuzer, not "cruiser" or coin. |
| S. (Seite); vgl.; a. a. O. | | p.; cf.; loc. cit. | | Schelling's references stay as printed. |

### M. Canonical English titles of the works

| SW | German title (short) | English title | Translation | Status |
|---|---|---|---|---|
| I/1 | Ueber die Möglichkeit einer Form der Philosophie überhaupt | *On the Possibility of a Form of All Philosophy* | Ma (exact title wording unchecked) | |
| I/1 | Vom Ich als Princip der Philosophie | *Of the I as Principle of Philosophy* | Ma (exact title wording unchecked) | |
| I/1 | Philosophische Briefe über Dogmatismus und Kriticismus | *Philosophical Letters on Dogmatism and Criticism* | Ma (exact title wording unchecked) | |
| I/1 | Neue Deduction des Naturrechts | *New Deduction of Natural Right* | Ma ✓ | |
| I/1 | Abhandlungen zur Erläuterung des Idealismus der Wissenschaftslehre | *Treatise Explicatory of the Idealism in the Science of Knowledge* | Pf ✓ | |
| I/2 | Ideen zu einer Philosophie der Natur | *Ideas for a Philosophy of Nature* | HH ✓ | |
| I/2 | Von der Weltseele | *On the World Soul* | (no full English translation known; unchecked) | |
| I/3 | Erster Entwurf eines Systems der Naturphilosophie; Einleitung zu dem Entwurf | *First Outline of a System of the Philosophy of Nature*; *Introduction to the Outline* | Pe ✓ | |
| I/3 | System des transscendentalen Idealismus | *System of Transcendental Idealism* | He ✓ | |
| I/4 | Darstellung meines Systems der Philosophie | *Presentation of My System of Philosophy* | Vater (2001, partial; venue unchecked), Be ✓ (title form) | |
| I/4 | Bruno oder über das göttliche und natürliche Princip der Dinge | *Bruno, or On the Natural and the Divine Principle of Things* | Va ✓ | Note: Vater's title inverts "göttliche/natürliche"; keep his title as the established one, flag. |
| I/4 | Fernere Darstellungen aus dem System der Philosophie | *Further Presentations from the System of Philosophy* | Vater (Philosophical Forum 32:4, 2001) ✓ | |
| I/5 | Vorlesungen über die Methode des akademischen Studiums | *On University Studies* (literal: *Lectures on the Method of Academic Study*) | Mo ✓ | Prefer the literal title in the portal, cite Mo. |
| I/5 | Philosophie der Kunst | *The Philosophy of Art* | St ✓ | |
| I/6 | Philosophie und Religion | *Philosophy and Religion* | Ot ✓ | |
| I/6 | System der gesammten Philosophie (Würzburg) | *System of Philosophy in General* (Pf: in *Idealism and the Endgame*) | Pf ✓ (contains it; exact title unchecked) | |
| I/7 | Philosophische Untersuchungen über das Wesen der menschlichen Freiheit | *Philosophical Investigations into the Essence of Human Freedom* | LS ✓ | Gu: *Of Human Freedom*. |
| I/7 | Stuttgarter Privatvorlesungen | *Stuttgart Private Lectures* (Pf: *Stuttgart Seminars*) | Pf ✓, Bw (SEP) ✓ | **Recommendation:** "Stuttgart Private Lectures" (literal, Bw). |
| I/7 | Ueber das Verhältniß der bildenden Künste zu der Natur | *On the Relation of the Plastic Arts to Nature* | (unchecked) | |
| I/8 | Denkmal der Schrift von den göttlichen Dingen des Herrn F. H. Jacobi | *Memorial to Mr. F. H. Jacobi's Treatise On Divine Things* | (no translation known) | |
| I/8 | Die Weltalter | *The Ages of the World* | Bo ✓, Wi ✓ | |
| I/8 | Ueber die Gottheiten von Samothrace | *On the Deities of Samothrace* | Br ✓ ("The Deities of Samothrace"); Krell et al. (Indiana UP 2025) ✓ | |
| I/9 | Clara | *Clara, or On Nature's Connection to the Spirit World* | Sk ✓ | Clara is in SW I/9. |
| I/9 | Erlanger Vorträge: Ueber die Natur der Philosophie als Wissenschaft | *On the Nature of Philosophy as Science* | (unchecked) | |
| I/10 | Zur Geschichte der neueren Philosophie | *On the History of Modern Philosophy* | Bw ✓ | |
| II/1 | Historisch-kritische Einleitung in die Philosophie der Mythologie | *Historical-Critical Introduction to the Philosophy of Mythology* | RZ ✓ | |
| II/1 | Philosophische Einleitung … oder Darstellung der reinrationalen Philosophie | *Philosophical Introduction to the Philosophy of Mythology, or Presentation of Purely Rational Philosophy* | Hy ✓ (abridged) | |
| II/1 | Abhandlung über die Quelle der ewigen Wahrheiten | *On the Source of the Eternal Truths* | *Owl of Minerva* 22.1 (1990) ✓ (translator unchecked) | |
| II/2 | Der Monotheismus; Die Mythologie | *Monotheism*; *Mythology* | none | |
| II/3–4 | Philosophie der Offenbarung | *Philosophy of Revelation* | Mt ✓ (*The Grounding of Positive Philosophy* = SW II/3, 1–174, with SW pagination in the margin; Mt, editorial apparatus); Hy (abridged Part II) ✓; Ot (1841–42 Paulus transcript, not the SW text) ✓ | The rest of II/3 and II/4 exists in English only in Hy's abridgement. |

---

## 3. Traps: constructions machine translation gets wrong

Each item has a corpus example (SW volume, page) and the required rendering. The pipeline should test each pattern in QA.

| # | Pattern | Corpus example | Wrong (typical MT) | Correct |
|---|---|---|---|---|
| T1 | **Period orthography read as doctrine** | "Wollen ist Urseyn" (I/7, 350) | "Willing is primal Beyng / Seyn" | "Willing is primal being." *Seyn* = *Sein* (principle 5). |
| T2 | **Be-ding-ung pun** | "Bedingen heißt die Handlung, wodurch etwas zum Ding wird, bedingt, das was zum Ding gemacht ist" (I/1, 166) | "To condition means the action by which something becomes a thing" (pun lost silently) | Translate as "condition" and add a translator's note giving *be-ding-en / Ding* (cf. Ma n. 22 ✓). Never coin "be-thing". |
| T3 | **das Nichtseyende ≠ das Nichts; μὴ ὄν ≠ οὐκ ὄν** | "Alle endlichen Wesen sind aus dem Nichtseyenden geschaffen, aber nicht aus dem Nichts. Das οὐκ ὄν der Griechen ist so wenig … ein Nichts" (I/7, 436); "ebensowohl bloß das μὴ ὄν als das οὐκ ὄν" (I/10, 283) | "created out of non-being, but not out of nothing" (acceptable) → but then "the nothing of the Greeks" | "… from that which is not, but not from nothing. The οὐκ ὄν of the Greeks is no more a nothing …". Greek stays Greek. *das Nichtseyende* = *that which is not* everywhere. |
| T4 | **Double negation in participial compounds** | "als das nicht nicht seyn Könnende und demnach als das nothwendig, das blind Seyende" (I/10, 19) | "as that which cannot be" (one *nicht* dropped) or "the not not being able" | "as that which cannot not be, and therefore as that which necessarily, blindly is". QA: count negations. |
| T5 | **Stress on *Ist*; "that which is that which is"** | "daß er das Seyende, sondern daß er das ist was das Seyende ist" (II/1, 274); "zu dem was das Seyende Ist" (II/1, XI) | "that he is being, but that he is what being is" | "… not that he is that which is, but that he *is* that which is". Keep the italics. The parallel requires S2 (a). |
| T6 | **das Seyende selbst vs das Seyn selbst** | "wir finden das, was wir als das Seyende selbst bestimmt hatten" (I/10, 18) | "being itself" (= *das Seyn selbst*) | "that which is itself". |
| T7 | **Equals sign inside a sentence** | "Also ist die absolute Identität als Grund von Existenz = Schwerkraft" (I/4, 163) | "absolute identity as a reason for existence equals gravity" | "Hence absolute identity as ground of existence = gravity." Copy the "="; render *Grund* as *ground* (S6). |
| T8 | **Formula notation** | "durch das Gesetztseyn von A² = (A = B) als relativer Totalität A³ gesetzt" (I/4, 200); "+A = B und A = +B Pole, A = A aber den Indifferenzpunkt" (I/4, 138) | "A squared", "A to the third", "plus A equals B" | Copy character for character (principle 6). |
| T9 | **Latin inside German compounds** | "das erst tertio loco seyn Könnende" (II/2, 110); "das nicht actu Seyende" (II/2, 81) | "the only third local being-able"; "the not actually being" | "that which can be only *tertio loco* (in the third place)"; "that which is not *actu*". Keep the Latin italicized; gloss once. |
| T10 | **Pronoun gender for God / das Absolute / das Seyende** | "Er ist wirklich … um der Herr des Seyns zu seyn" (I/10, 260); "daß Er ist, geschweige, daß er persönlich … ist" (I/8, 184); "der an sich selbst überseyende" (I/8, 256) | "It is really … in order to be the lord of being"; "that it is" | Follow the German antecedent: masculine *er* (Gott, der Herr) → **he**; neuter *es* (das Absolute, das Seyende, das Ueberseyende, das Seynkönnende) → **it**, even where the referent is God. Schelling's shift from neuter to masculine is part of the argument (the passage from *das Seyende* to the personal God). Lowercase "he" (S14). Where Schelling capitalizes *Er* for emphasis (I/8, 184), use italics: *he*. |
| T11 | **"der Gott" (a god) vs "Gott" (God)** | "die Einzigkeit des Gottes entschieden aufgehoben" (II/1, 121) | "the uniqueness of God was abolished" | "the uniqueness of the god is decisively cancelled". With article and in mythological context = *the god*, lowercase. |
| T12 | **Hyphenated adverb-substantives** | "der relativ-Eine", "der absolut-Eine" (II/1, 144); "das absolut-Formlose (= dem μὴ ὄν …)" (I/3, 31) | "the relative one"; "the absolute formless" | "the relatively One", "the absolutely One"; "the absolutely formless". |
| T13 | **"nicht nichts"** | "die Frage: warum ist nicht nichts, warum ist etwas überhaupt?" (I/6, 155) | "why is not nothing" / "why is there nothing" | "the question: why is there not nothing, why is there anything at all?" |
| T14 | **Latin case forms in German syntax** | "außer dem Centro … im Centro" (I/2, 190); "Marcionis", "Marcionem" (II/4) | "outside the Centro" | "outside the center … in the center"; names in English nominative outside Latin quotations. |
| T15 | **Period chemistry modernized** | "Einiges zur Geschichte der Wasserzersetzung" (I/2, 119); "Kapacität gegen die Wärme" (I/2, 76) | "electrolysis"; "capacity against heat" | "on the history of the decomposition of water"; "capacity for heat". Never modernize *Lebensluft, Wärmestoff, Phlogiston, azotische Luft*. |
| T16 | **Everyday vs technical *unvordenklich*** | "eine unvordenkliche Ueberlieferung" (I/9, 475) vs "eingeschlossen in sein unvordenkliches Seyn" (I/10, 36) | "unprethinkable tradition" / "immemorial being" | "an immemorial tradition" / "enclosed in his unprethinkable being" (S4). |
| T17 | **Gegenbild in revelation contexts** | — (II/3–II/4, typology) | "antitype" read as theological fulfilment | S9: flag every Gegenbild in II/3–II/4 for review. |
| T18 | **Greek quotation + Schelling's own German gloss** | "Der Apostel sagt: ἐκένωσεν ἑαυτόν, er hat sich selbst entäußert" (II/4, 158) | translating the Greek *and* the German, so the gloss is doubled | Keep the Greek; translate only Schelling's German gloss: "he divested himself" (*Entäußerung* = divestment here, section J). |
| T19 | **Speaker labels and self-reference** | "Der Verfasser. Was haben Sie denn hier …" (I/5, 18) | "The writer." / "The composer." | "The Author." (speaker tag, section L). |
| T20 | **Indifferenz vs gleichgültig** | "denn das kann uns hier völlig gleichgültig seyn" (I/2, 91) | marking it as the technical *Indifferenz* | "that can be a matter of complete indifference to us here", with [gleichgültig] in the markup. |
| T21 | **Abfall vs Sündenfall** | "was man den Sündenfall genannt hat" (II/1, 144) vs *Abfall* (I/6) | both "fall" | "what has been called the Fall" / "falling-away" (S10). |
| T22 | **Ich capitalized mid-sentence** | "Ich bin, weil Ich bin" (I/1, 167) | "I am because I am" (correct) but "the ego is" for "das Ich ist" | "I am because I am"; "the I is because it is". |
| T23 | **Spaced vs closed participles** | "das unmittelbar seyn Könnende" (II/2, 114) vs "das Seynkönnende" (II/2, 114) | different English for the two spellings | Same English (S3). Keep the spelling in the markup. |
| T24 | **"Gottheit" with and without article** | "Rückkehr in die Gottheit" (I/1, 317); "eine Gottheit" (II/2 passim) | "God" everywhere | "the Godhead" / "a deity" (section A). |
| T25 | **Evolution (preformation)** | *Evolution* in I/2, I/3 | "evolution" read as Darwinian | "evolution" + note at first occurrence: 18th-century preformationist sense. |
| T26 | **Ahndung (= Ahnung)** | *Ahndung* (68×) | "punishment" | "presentiment". |
| T27 | **Kreuzer = Creuzer** | II/2 passim | "cruiser" | "Creuzer". |
| T28 | **"sich verhalten wie"** in proportional statements | "sich zu … verhalten wie A zu B" | "behaves like" | "is related to … as A to B". |
| T29 | **Rhetorical dialogue in Bruno** | Bruno (I/4): speakers Bruno, Lucian, Anselmo, Alexander | translating names | Keep the names (Va ✓). Anselmo stays "Anselmo". |
| T30 | **Quotations of Hegel inside Schelling** | "die Idee … entschließt sich, sich als Natur … aus sich zu entlassen" (I/10, 153) | free rendering | Use the established rendering of the Hegel passage (Hegel glossary / Cambridge Enc.). Do not retranslate Hegel inside Schelling. |

---

## 4. Greek, Latin, Hebrew and French; names of deities and places

**Quotations.**
1. **Greek** (very frequent in II/1–II/4 and I/8; also in identity philosophy: μὴ ὄν, οὐκ ὄν, τὸ ὑπερόν, κρίσις, κένωσις, μορφὴ θεοῦ, ἐκένωσεν ἑαυτόν):
   - Keep the Greek exactly as printed in SW, including accents and the editor's errors. Never transliterate in the text.
   - Where Schelling gives a German rendering, translate only that rendering.
   - Where he gives none, add an English rendering in square brackets at first occurrence per lecture. Use a standard translation (Loeb for classical authors, RSV/KJV for the New Testament) and name it in the note. Do not invent new versions.
   - Single technical words used as German nouns ("das μὴ ὄν der Alten") stay Greek, unitalicized.
2. **Latin** (*actu, potentia, actus purus, prius, natura naturans / naturata, causa sui, quid / quod, tertio loco, turba gentium, malum metaphysicum, determinatio est negatio, hen kai pan*):
   - Keep the Latin, in italics, untranslated in running text when it is a technical formula.
   - Translate longer Latin quotations in brackets (the practice of LS ✓ and Mt ✓, e.g. *fumum ex fulgore*, *communicativum sui*).
   - Schelling's early Latin works in I/1 (the 1792 dissertation *Antiquissimi de prima malorum humanorum origine* and *De Marcione Paullinarum epistolarum emendatore*, 1795) are translated in full into English. The Latin appears as parallel text only if the portal shows parallels. Latin quotations of Spinoza: use Curley's translation for reference wording (unchecked, coordinate with the Hegel glossary).
3. **Hebrew** (II/2: עֵרֶךְ אֵל, Jehovah/Elohim discussions): keep the Hebrew script as printed. Transliterate only where Schelling transliterates.
4. **French and English quotations** (Cousin, Bayle, Coleridge, Newton): keep the original. French gets an English rendering in brackets; English stays as is.
5. **Bible.** Quotations Schelling gives in German (Luther) are rendered from his German, aligned with the KJV wording where the sense is the same, since KJV idiom is what Anglophone theology readers recognize ("Lord of glory", "form of a servant"). Book names in English (Phil. 2:6–8).

**Names (⚑ S15).**

| Category | Rule | Examples (Schelling's form → English) |
|---|---|---|
| Greek gods, heroes, mythical figures | Greek forms, standard modern transliteration (*k*, *-os*) | Dionysos → Dionysos; Kronos → Kronos; Uranos → Ouranos; Zeus; Persephone; Demeter; Kore; Aïdes / Hades → Hades (Aïdes where Schelling contrasts); Herakles → Herakles; Prometheus; Poseidon; Apollon → Apollo; Hera; Rhea; Kybele → Kybele; Typhon; Zagreus; Iakchos; Titanen → Titans; Kyklopen → Cyclopes (established English) |
| Roman gods (as Schelling names them) | Latin forms | Jupiter, Ceres (Zeres → Ceres), Minerva, Venus, Janus |
| Cabiri (I/8, II/2) | Br ✓ | Kabiren → Cabiri; Axieros, Axiokersa, Axiokersos, Kadmilos as printed (Br's spellings unchecked) |
| Near Eastern, Egyptian, Indian, Persian | established English forms | Osiris, Isis, Horos → Horus, Typhon (Egyptian Seth); Melkart → Melqart; Militta → Mylitta; Mithras; Ahriman; Ormuzd → Ormazd; Brama → Brahma; Wischnu → Vishnu; Schiwa → Shiva; Maja → Maya; Buddha |
| Greek and Latin authors | established English | Homeros / Homer → Homer; Hesiodos → Hesiod; Herodotos → Herodotus; Aeschylos / Äschylos → Aeschylus; Sophokles → Sophocles; Pausanias; Plutarch; Platon → Plato; Aristoteles → Aristotle; Pythagoreer → Pythagoreans; Strabo; Cicero (Zizero → Cicero); Arnobius; Tertullianus → Tertullian |
| Peoples | English ethnonyms; *Hellenen* kept distinct | Hellenen → Hellenes; Griechen → Greeks; Pelasger → Pelasgians; Phönikier → Phoenicians; Ägypter → Egyptians; Perser → Persians; Indier → Indians; Chinesen → Chinese |
| Places | established English | Samothrace, Ägina → Aegina, Eleusis, Phrygien → Phrygia, Ägypten → Egypt, Indien → India, Persien → Persia, Athen → Athens |
| Moderns | standard spelling; markup keeps Schelling's | Kartesius / Cartesius → Descartes; Winkelmann → Winckelmann; Kreuzer → Creuzer; Göthe → Goethe |

Schelling's own transliteration (*Dionysos, Herodotos, Homeros*) stays recoverable in the markup. Etymological discussions (II/2, where Schelling derives names from Semitic roots) keep his forms *in the text* and give the English form in brackets, because the argument depends on the letters.

---

## 5. Cross-author collisions (Schelling ↔ Hegel ↔ Fichte)

| Term | S / F / H (n) | Hegel draft | Schelling proposal | Action |
|---|---|---|---|---|
| **Potenz** | 3 159 / 86 / 521 | G: power (flagged "coordinate") | **potency** (S1) | ⚑ S1: adopt "potency" for the Schellingian concept in all three, "power" only for arithmetic. |
| Indifferenz / Gleichgültigkeit | 632 / 47 / 370; 235 / 109 / 1 775 | indifference + markup | same | Compatible. |
| Identität / Einerleiheit | 2 277 / 279 / 1 824 | identity | identity / sameness | Compatible. |
| Dasein / Existenz | 670 / 808 / 2 459; 773 / 262 / 1 091 | ⚑ D1 (a) existence / concrete existence | Existenz = existence; Daseyn = existence [Daseyn] | ⚑ S13: author-specific rule needed. |
| Grund | 2 688 / 2 349 / 1 900 | ground | ground (S6) | Compatible. |
| Sein / das Seiende | ≈ 2 255 noun / … ; 2 257 / 169 / 1 174 (all *seiend-*) | being; "what is / the existent" (P ✓) | being; **that which is** (S2); "the existent" reserved for *das Existirende* | Hegel row B ("what is / the existent") should be aligned: recommend "that which is" for Hegel too, so *das Seiende* has one English form across authors. |
| Begriff | 5 383 / 4 532 / 6 668 | concept (never notion) | concept | Compatible. |
| Idee | 2 559 / 731 / 1 953 | ⚑ D5 (Idea capitalized?) | lowercase ideas | ⚑ S14: if D5 (b), capitalize only Hegel's absolute Idea. |
| Reflexion | 505 / 845 / 2 108 | reflection | reflection; *Reflex* = reflex | Compatible. |
| Gegenstand / Objekt | 1 564 / 950 / 2 096; 2 070 / 1 303 / 942 | ⚑ D3 (a) both object + markup | same | Compatible with D3 (a). |
| Einbildung, Einbildungskraft | 459 / 369 / 276 (incl. *-kraft*) | imagination | imagination; *Einbildung* (tech.) = in-forming; *Ineinsbildung* = forming-into-one | ⚑ S8. |
| Konstruktion | 830 / 402 / 227 | (not listed) | construction | Add to Hegel (Jena critique of Schelling's construction). |
| Wissen / Erkennen / Erkenntnis | 1 841 / 2 758 / 1 507; 1 254 / 310 / 1 562; 1 272 / 937 / 799 | knowing; cognition | knowledge/knowing; cognition; cognition / knowledge (result) | Minor divergence: Schelling's *Erkenntniß* often = knowledge. Accept context rule. |
| Entäußerung | — | ⚑ D7 externalization | divestment (Christology only) | Context rule in II/4. |
| Selbständigkeit | 121 / … | ⚑ D11 self-sufficient | follow D11 | Compatible. |
| Schranke | 391 / 82 / 290 | limitation | limitation (He "restriction" not adopted) | Compatible. |
| aufheben | — | sublate | sublate only in Hegelian sense; else cancel / suspend | Context rule (Dw ✓). |
| Ich, Nicht-Ich, Ichheit, Anstoß | 1 923 / 3 489 / 440; 311 / 596 / 63; 81 / 98 / 8; 47 / 71 / 48 | the I; not-I | the I; not-I; I-hood; check | Coordinate with the Fichte glossary. |
| intellektuelle Anschauung | 130 / 90 / 39 | intellectual intuition | same | Compatible. |
| Mensch | — | (not decided) | human being (S19) | ⚑ S19 for all three. |
| Äther | 57 / 21 / 56 | aether | ether (American) | Harmonize with D15 (spelling). |

---

## 6. Sources and verification

### Checked by me in local PDFs (page numbers = printed pages)

- **LS**: J. Love and J. Schmidt, *Philosophical Investigations into the Essence of Human Freedom* (Albany: SUNY Press, 2006). I read the Translators' Note in full (pp. xxxi–xxxv: *das Regellose* "anarchy" vs Gutmann's "unruliness"; *Wesen* "essence/being"; *Sein* "Being"; *Seiendes* "that which has being", after Wirth; *Mensch* "man").
  - Renderings counted in the text: yearning 34× / longing 2×; selfhood 40×; non-ground; centrum 37×; bond 28×; ground 324× / basis 42×.
  - Pages cited: non-ground p. 68 and index p. 180; yearning p. 28; selfhood p. 33; self-will and universal will p. 32; bond pp. 30–31; ground of (his) existence p. 27; will of love / of the ground p. 42; melancholy p. 63; sadness p. 62; copula pp. 13–14; sameness (*Einerleiheit*) p. 13; alikeness p. 15; primal ground (*Urgrund*) p. 44; *Krisis* "division" p. 35 and "separation and judgment" p. 67; *Ein-Bildung* "impression" p. 31; *Sucht* "craving" p. 85; *Grimm* "fury" pp. 66, 89; *Gemüt* "disposition" p. 19; propensity pp. 47, 52; *Willkür* "free will" p. 48; equilibrium p. 48; personhood p. 58; *Vorbilder* "typology" pp. 73, 77; irritable principle p. 34; *zum Aktus* "into actuality" pp. 62, 66; Being-in-God p. 72; return (*Wiederbringung*) p. 67; *Begeisterung* "spiritedness" p. 40; *turba gentium* p. 46; primeval time p. 46.
- **Mt**: B. Matthews, *The Grounding of Positive Philosophy: The Berlin Lectures* (Albany: SUNY Press, 2007). It translates SW II/3 with the SW pagination in the margin (editorial apparatus, front matter).
  - Translator's introduction p. 86: renders *das Unvordenkliche* "that before which nothing can be thought" and rejects the literal "unprethinkable".
  - All bracketed German glosses were extracted and counted: potency 138×; science of reason 47×.
  - Pages cited: capacity to be pp. 34, 71, 133; that which just is p. 49; Lord of Being p. 154 (lowercase p. 202); being itself (*das Seyende selbst*) pp. 144, 194; that which is (*das Seyende seyn*) pp. 200, 208; whatness / thatness pp. 130, 147; above being (*das Ueberseyende*) pp. 179, 205; groundless being p. 205; the existing potency p. 198; nonbeing pp. 34, 156; a being p. 134; that which exists pp. 123–124, 207; fall (*Abfall*) p. 151; divestment (*Entäusserung*) p. 177; divinity (*Gottheit*) pp. 70, 200; his divine being (*Gottseyns*) p. 201; release pp. 60, 175; a different being (*Andersseyn*) p. 175; the absolute supersensible p. 115; metaphysics of the understanding p. 116; Wanting (*Wollen*) pp. 135, 154; ignorance / unknowing (*Nichtwissen / Unwissenheit*) p. 158; science of thought p. 158; inverted idea p. 50; object / resistance p. 76; commensurate with experience p. 75; Apriori p. 181.
- **Dw**: P. Dews, *Schelling's Late Philosophy in Confrontation with Hegel* (New York: Oxford University Press, 2023). "Notes on Terminology", pp. xvii–xxi:
  - *Aufheben* "sublate" kept for both thinkers
  - *das reine Daß* kept in German
  - *Potenz* kept in German (early) / "potentiality" (late)
  - *das Seyende* "being-ness", with a warning against Heideggerian readings
  - *das Existirende / das Existiren* "existing-ness"
  - *das unvordenkliche Seyn* "un-pre-thinkable being"
  - *das urständliche Seyn* "pre-jective being"
  - p. 101: Umtrieb "cyclical drive", rotatorische Bewegung "rotary movement"
- **Be**: B. Berger, *Schelling, Hegel, and the Philosophy of Nature* (Routledge, 2023): "unprethinkable (unvordenklich)" p. 72; formative drive p. 89; excitability p. 92; "Presentation [Darstellung]" p. 12.
- **Fi**: N. Fisher, *Schelling's Mystical Platonism* (Oxford University Press, 2024): "power" or "potency" [Potenz] in the mathematical sense, p. 16; "potencies" p. 69; prototype [Vorbild] / antitype [Gegenbild] p. 202.

### Checked online by research agents (URL opened; short quotes recorded)

- **Pe**: K. R. Peterson, *First Outline of a System of the Philosophy of Nature* (SUNY, 2004). Full PDF on monoskop (monoskop.org/images/1/17/Schelling_Friedrich_First_Outline_of_a_System_of_the_Philosophy_of_Nature.pdf):
  - English–German glossary pp. 249–251, German–English glossary pp. 253–255
  - endnote 1 to "Outline of the Whole", p. 244 (*Aktion* = "actant")
  - introduction p. xxxi (potency)
- **HH**: E. E. Harris and P. Heath, *Ideas for a Philosophy of Nature* (Cambridge, 1988). archive.org/details/schelling-ideas-for-a-philosophy-of-nature; glossary pp. xxv–xxvi (Potenz "potency, power"; Einbildung "embodiment"; Indifferenzierung "indifferencing"; Kapacität "capacity").
- **He**: P. Heath, *System of Transcendental Idealism (1800)* (Charlottesville: University Press of Virginia, 1978). archive.org/details/systemoftranscen0000sche (full-text search; glossary: Potenz "Power (mathematical sense)", Grenze, Schranke, Schweben, Ich "Self, I"; "check" for Anstoß).
- **Pf**: T. Pfau, *Idealism and the Endgame of Theory* (SUNY, 1994). archive.org/details/thomas-pfau-idealism-and-the-endgame-of-theory-three-essays-by-f-w-j-schelling; glossary p. xii (Potenzen "Powers"; Contraktion "Concentration"; das Bewusstlose "the pre-conscious"; Willkür "spontaneity"; Anstoss "check"; Seyn / Seyendes / Nicht-Seyendes "Being / being / nonbeing"; Daseyn "existence"); Stuttgart Seminars text (Sehnsucht "nostalgia"; Gemüth "temperament"; Schwermuth "melancholy"; Selbstheit "selfhood").
- **Va**: M. G. Vater, *Bruno* (SUNY, 1984). archive.org/details/brunooronnatural0000sche (search snippets): n. 27 on Indifferenz ("nondifference" vs foreign borrowing); note on Ineinsbildung ("no graceful translation", "in-vention"); glossary pp. 109 ff. (archetype / antitype; the column pairing is OCR-inferred).
- **VW**: M. G. Vater and D. W. Wood, *The Philosophical Rupture between Fichte and Schelling* (SUNY, 2012). archive.org/details/f-w-j-schelling-the-philosophical-rupture-between-fichte-and-schelling; n. 299 (Ineinsbildung "in-forming"), n. 93 (Potenz), n. 20.
- **St**: D. W. Stott, *The Philosophy of Art* (Minneapolis: University of Minnesota Press, 1989). archive.org/details/philosophyofart0000sche:
  - translator's introduction (Potenz "potence"; OED/Coleridge)
  - § 22 "informing into unity"
  - n. p. 293 (Urbild "archetype", following Vater)
  - n. 13 (Indifferenz)
  - "allness"
- **Mo**: E. S. Morgan, *On University Studies* (Athens: Ohio University Press, 1966). archive.org/details/onuniversitystud0000sche (potency; point of indifference; archetype; construction).
- **Ma**: F. Marti, *The Unconditional in Human Knowledge: Four Early Essays (1794–1796)* (Lewisburg: Bucknell University Press, 1980). archive.org/details/unconditionalinh0000sche: n. 22 (bedingen / Ding); table of contents (fourth essay = *New Deduction of Natural Right*).
- **Gr**: I. H. Grant, *Philosophies of Nature after Schelling* (London: Continuum, 2006): Hemmung "retardation"; duplicity; "power [Potenz]".
- **Berger/Whistler**, *The Schelling–Eschenmayer Controversy, 1801* (Edinburgh UP, 2020): chapter 2 "Potency", "'potencies' or 'powers'" (cambridge.org chapter page).
- **Bo**: F. de W. Bolman, *The Ages of the World* (New York: Columbia University Press, 1942). archive.org/details/agesoftheworld032250mbp (open scan):
  - n. 18 (rotary motion)
  - n. 22 (Abgrund "abyss")
  - n. 50 (unvordenklich "immemorial")
  - Umtrieb "cycle"; Sehnsucht / Sucht; "the will which wills nothing"; Entscheidung "decision"; Uebergottheit "supergodhead"
  - Bolman's introduction: Abfall "fall", Gegenbild "counterpart", Ichheit "egoism"
- **La**: J. P. Lawrence, *The Ages of the World: Book One, The Past (Original Version, 1811)* (SUNY, 2019). archive.org/details/the-ages-of-the-world-book-one-the-past-original-version-1811-joseph-p.-lawrence:
  - translator's introduction: Lauterkeit "lucid purity"; Seyendes "that which is"; Wesen "living being"; Scheidung "scission"; Gemüth "the Heart"; Gelassenheit "letting go"; Ungrund "unground"; Sehnsucht "longing"; Umtrieb "circular drive"
  - n. 12 on Wirth's "cision"
- **Wi**: J. M. Wirth, *The Ages of the World* (c. 1815) (SUNY, 2000). The text itself was not accessible (lending only), so these are reported:
  - glossary: Ineinsbildung "eisemplasy" (search snippet)
  - "cision" via La n. 12
  - "rotatory movement", "that which has being", "potencies" via McGeough (2013), journals.uvic.ca/index.php/adcs/article/download/17155/7370/16271
  - The Wirth items are therefore ✓².
- **Gu**: J. Gutmann, *Of Human Freedom* (Chicago: Open Court, 1936). The text was not accessible. Renderings are taken from J. Stambaugh's translation of Heidegger, *Schelling's Treatise on the Essence of Human Freedom* (1985), which quotes Gutmann (beyng.com/pages/en/SchellingsTreatise/SchellingsTreatise.114.html, .121, .122, .170): basis, longing, the groundless, groundlessness. All ✓².
- **Snow, NDPR review** of LS: ndpr.nd.edu/news/philosophical-inquiries-into-the-essence-of-human-freedom/ (unruliness vs anarchy; "centerpoint").
- **Ot**:
  - *Philosophy and Religion* (Putnam, CT: Spring, 2010): Abfall "falling-away", from a reader excerpt (goodreads.com/book/show/1324730) ✓²
  - *Philosophy of Revelation (1841–42) and Related Texts* (Spring, 2020): "potence", per McGrath's review in *Kabiri* (journals.library.mun.ca/index.php/kabiri/article/download/2228/1778/7766) ✓²
- **Hy**: V. C. Hayes, *Schelling's Philosophy of Mythology and Revelation: Three of Seven Books Translated and Reduced* (AASR, open access: openjournals.library.sydney.edu.au/AASR/issue/view/1154; the original print year is unchecked). Chapters downloaded and searched:
  - the Existent / what is
  - power to be
  - the pure existent
  - supra-existent
  - the What / the That
  - rational science
  - Lord of Being
  - primordial being; immemorial
  - extra-divine
  - kenosis; morphe theou
  - the Petrine, the Pauline and the Johannine churches
  - tautegorical (Coleridge)
  - successive polytheism; relative monotheism
  - separation of the peoples; confusion of language
  - theogonic process; Original consciousness
  - mythological representations
  - Kronos, Ouranos, Dionysus, Urania
- **RZ**: M. Richey and M. Zisselsberger, *Historical-Critical Introduction to the Philosophy of Mythology* (SUNY, 2007). **Not accessible** (Google Books blocked; MUSE/JSTOR paywalled). Only quotations in secondary literature were seen: "mean only what they are" (SW XI 196), via Félix, *Aurora* 2025 (periodicos.pucpr.br/aurora/article/download/32137/27582/83130); "that which posits God", via Fakhoury, *Kabiri* (journals.library.mun.ca/index.php/kabiri/article/download/2758/2225/9909); successive polytheism. RZ's English–German glossary (pp. 221–229, per MUSE TOC muse.jhu.edu/book/5207) should be checked in a library copy before the mythology volumes are translated.
- **Br**: R. F. Brown, *Schelling's Treatise on "The Deities of Samothrace"* (Missoula: Scholars Press, 1977). archive.org/details/schellingstreati0000brow ("the symbolism of the Cabiri"). Brown's spellings of the four Cabiri names are unchecked. New bilingual edition: *On the Deities of Samothrace*, ed. D. F. Krell with A. Bilda and J. M. Wirth (Indiana UP, 2025), verified from the listing only.
- **Bw**: A. Bowie, SEP "Friedrich Wilhelm Joseph von Schelling" (plato.stanford.edu/entries/schelling, rev. 2023): contraction; 'negative' and 'positive' philosophy; 'unprethinkable' being; "potentials"; "Stuttgart Private Lectures". Bowie's 1994 translation *On the History of Modern Philosophy* (Cambridge) was **not** accessible: title only.
- **Sk**: F. Steinkamp, *Clara, or, On Nature's Connection to the Spirit World* (SUNY, 2002). Title verified from archive.org metadata only.
- **Secondary terminology** (all ✓² as secondary usage, not translations):
  - Fakhoury (*Kabiri*): "that which is", "ability to be", "Lord of Being"
  - Binkelmann (*Kabiri*, journals.library.mun.ca/index.php/kabiri/article/download/3375/2940/12841): "existent", "super-existent"
  - Bruff (*Kabiri* 1, 2018, …/download/1948/1519): "unprethinkable being", "ecstasy of reason", "Lord of Being"
  - Gabriel, *Mythology, Madness and Laughter* (2009) p. 20: "unprethinkable being", quoted at itself.blog/2010/05/12/…
  - Dews, OUP chapter pages (academic.oup.com/book/44651)
  - Khamis, *To the Unprethinkable and Back Again* (Bonn, 2021): title only

### Not checked (no access) or from memory, marked "(unchecked)" in the tables

- Norman (1997); Wirth (2000) text; Gutmann text; Steinkamp text; Bowie 1994 text; Ottmann texts; Richey/Zisselsberger text and glossary.
- Vater's 2001 *Presentation* translation (venue uncertain).
- Tritten, *Beyond Presence* (2012) and Whistler, *Schelling's Theory of Symbolic Language* (2013): not consulted.
- Böhme translations for *Ungrund* / *Grimm*.
- Fichte translations for *Ichheit* "I-hood".
- Brown's spellings of the Cabiri names; "Sabaism" for *Zabismus*; "On the World Soul" (no translation verified).
- "forming-into-one" for *Ineinsbildung* is common in the literature, but I did not verify it in a published translation.

### Frequencies

Own counts with `zaehle.py` across the 14 SW volumes: period spellings folded, left-anchored regex with grouped alternation, compounds included. They are a measure of weight, not lemmatized counts. Fichte and Hegel counts come from the same script over the other two corpora. Candidate terms were drawn from `kandidaten-schelling.txt` (2 000 most frequent nouns with distinctiveness ratio). The ratios quoted in the notes ("ratio 109") come from that list.
