# Decision register for the English translation (draft, 9 Nov 2026)

Everything that has to be decided before the translation of all editions can run, beyond single terms.
Single terms: `abstimmung-quelle.json` (on the page) and `abstimmung-zusatz-*.json` (being extracted).
Research on how established series decided these questions: `meta-recherche.md` (in progress).

**Who decides:** **O** = owner (editorial or legal, not for a public vote) · **C** = suitable for the community page
· **T** = technical (I propose, owner approves). **⇒** = my recommendation.

Corpus facts used below were counted with `zaehle.py` and a language estimate per volume (9 Nov 2026).

---

## A. Scope: what gets translated

| # | Question | Options | ⇒ | Who |
|---|---|---|---|---|
| A1 | Which volumes? | (a) all 41 currently online · (b) start with the most-read works · (c) all, plus GW 13 and GW 16 once their protection ends (1 Jan 2027) | (c), in phases (see A9) | O |
| A2 | **Latin texts** (Schelling SW I/1 youth dissertations ≈ 18 000 Latin words, SW I/9 ≈ 8 000; Hegel GW 5 *De orbitis* and theses ≈ 7 000, GW 1 school pieces ≈ 3 000) | (a) translate from Latin into English · (b) keep Latin, no translation · (c) keep Latin, English as a toggle like the German | (a) with the Latin on tap. The machine handles Latin well, but it needs its own glossary (Hegel's Latin astronomy, Schelling's Latin theology) | O |
| A3 | French and English passages (Hegel GW 3 excerpts ≈ 2 100 French words, GW 5 ≈ 800; Schelling II/1 ≈ 600) | (a) keep as is, English on tap for French · (b) translate French into English in the text | (a) | C |
| A4 | Greek (Schelling mythology and revelation ≈ 34 000 Greek characters; Hegel GW 3, 18) | on the page (*Greek and Latin quotations*) | keep + translation on tap | C |
| A5 | **GW 3 *Frühe Exzerpte*:** Hegel's copies from other authors | (a) translate like everything else · (b) leave out: they are other people's texts · (c) translate only Hegel's own remarks | (a), marked as excerpt (the source is 18th-century, public domain) | O |
| A6 | 19th-century editors' prefaces and notes (I. H. Fichte, K. F. A. Schelling: *Vorrede des Herausgebers*, *Anm. d. H.*) | (a) translate, marked as editor's · (b) leave out | (a). Public domain and part of the text as it is read today | O |
| A7 | Material of the modern GW editors (titles in brackets, supplied words, headings of fragments) | (a) translate what is in our reading text, marked as editorial · (b) leave out | (a). The apparatus stays out, as for the German (never extracted) | O |
| A8 | Verse (Hegel's *Eleusis* in GW 1; verse quotations by Goethe, Schiller, Homer) | (a) prose translation · (b) verse translation | (a) prose, line breaks kept. Verse translation would be a creative work and claim more than we can deliver | C |
| A9 | Order | (a) all at once · (b) pilot of 3–4 volumes (one per author plus one late text), expert sampling, then the rest | (b): pilot GW 9 (Hegel), SW I/7 (Schelling, Freedom essay), SW I (Fichte WL 1794), one late text (NW II or SW II/3) | O |

## B. The German source: what exactly is translated

| # | Question | Options | ⇒ | Who |
|---|---|---|---|---|
| B1 | Known errors in our German text (OCR remnants, open tickets) | (a) translate the text as it stands · (b) fix first, then translate · (c) translate, and re-translate changed sentences automatically | (c). Sentence alignment makes per-sentence re-translation cheap | T |
| B2 | Errors in the historical print (misprints the editors left) | (a) translate the misprint literally · (b) translate the obvious sense and mark it | (b), marked in the markup; never silent | O |
| B3 | Supplied words in brackets in the GW text (≈ 1 650 brackets in Hegel, ≈ 500 in Schelling, e.g. *[er]*) | (a) keep brackets around the corresponding English words · (b) drop brackets in English, mark in markup | (b). English word order rarely lets the bracket sit on one word | T |
| B4 | **Emphasis** (Sperrsatz / letterspacing) | (a) italics · (b) small caps · (c) letterspacing like the original | (a) italics | C |
| B5 | Foreign words set in roman type inside Fraktur (Antiqua marking) | (a) not marked in English · (b) italics (but italics = emphasis) | (a). It was a typesetting convention, not emphasis; the information stays in the German | T |
| B6 | Small caps for names (Kapitälchen) | (a) small caps as in the print · (b) plain | (a), as in the German readers | T |
| B7 | **Pagination** | (a) the German page numbers (SW/GW/NW) in the margin of the English · (b) own English pagination | (a). One citation system for both languages | O |
| B8 | Author's footnotes | translate, same numbering and place | yes | T |
| B9 | Hegel's marginal notes (GW *Randnotizen*) | translate, same place as in the German reader | yes | T |
| B10 | Headings, tables of contents, running heads | (a) translate · (b) translate + German title under it | (a); the toggle shows the German | C |
| B11 | Paragraph numbers (§§), Schelling's formulas (A=B, A², ±A), Hegel's mathematics | unchanged | yes | T |
| B12 | Period abbreviations (*u. s. w.* ≈ 1 300, *d. h.* ≈ 5 650, *vgl.*, *ebd.*) | (a) English equivalents (*etc.*, *i.e.*, *cf.*) · (b) spelled out (*and so on*, *that is*) | (b) in running text, (a) in notes | C |
| B13 | German words quoted inside the English (markup, popovers) | (a) original spelling (*Seyn*, *Thätigkeit*) · (b) modern spelling | (a). It is what stands on the page | T |
| B14 | Hegel's lecture manuscripts (GW 17/18): fragments, keywords, unfinished sentences | (a) translate as fragmentary as the German · (b) smooth into sentences | (a) | O |

## C. Style

| # | Question | Options | ⇒ | Who |
|---|---|---|---|---|
| C1 | **Register** | (a) contemporary academic English · (b) period flavor (19th-century diction) | (a), without anachronistic jargon | C |
| C2 | **Sentence alignment** (needed for the word/sentence toggle) | (a) strictly one English sentence per German sentence · (b) free splitting and merging | (a). Inside the sentence anything goes (semicolons, dashes); Hegel's long periods may become long English sentences | O (follows from the reader) |
| C3 | Paragraphs | one to one | yes | T |
| C4 | Literal vs idiomatic | (a) as literal as English allows (terms always literal) · (b) idiomatic, terms fixed | (a) for terms and argument structure, (b) for connective tissue | C |
| C5 | **How binding the glossary is** | (a) always the glossary word · (b) glossary word unless a listed context sense applies · (c) translator may deviate, logged | (b). Deviations outside the listed senses are flagged automatically and checked | O |
| C6 | Puns and word play (*Er-innerung*, *Ur-teil*, *zugrunde gehen*, *meinen/mein*) | (a) render + note · (b) render + German in markup only · (c) imitate in English | (b), plus a short note only where the argument depends on it | C |
| C7 | Nominalized infinitives (*das Denken*, *das Setzen*) | (a) -ing nouns (*thinking*, *positing*) · (b) abstract nouns (*thought*, *position*) | (a) when it names the act, (b) for the product (glossary decides per term) | T |
| C8 | Hyphenated compounds (*being-for-itself*, *self-relating*) | (a) hyphenate noun forms · (b) open | (a) | T |
| C9 | Capitalization, pronoun for God, *Mensch*, *Weib* | on the page | | C |
| C10 | Generic *er* for *der Mensch* | (a) *he* · (b) *they* · (c) rewrite to plural | (a) where the text is about *der Mensch* in the singular, following the historical text | C |
| C11 | Address to the audience in lectures (*Meine Herren!*, *Sie*) | (a) *Gentlemen!* · (b) neutral (*Ladies and gentlemen*) | (a). Historical fact | C |
| C12 | Archaic forms in quoted scripture (*thou*, *hath*) | (a) KJV forms where matched to the KJV · (b) modern | (a), only inside such quotations | C |
| C13 | Spelling | American (portal) | settled | — |

## D. What the reader sees besides the text

| # | Question | Options | ⇒ | Who |
|---|---|---|---|---|
| D1 | Translator's notes | (a) none · (b) few, only where meaning is at stake · (c) many | (b). Most of what notes usually do is done by the German on tap | O |
| D2 | German words in brackets in the running text | (a) never; markup and popovers instead · (b) at first occurrence of key terms | (a) | C |
| D3 | A glossary visible to readers | (a) per volume · (b) one for all, linked from every term | (b): the glossary page, each term links its entry | T |
| D4 | Notes on sensitive passages (Fichte 1793 on Jews, *Reden*, ethnic terms in the philosophy of history, family right) | (a) translate faithfully, no notes · (b) faithfully + one front-matter note per edition · (c) faithfully + a note at each passage | (b). Never softened | O |
| D5 | Period ethnic terms | (a) faithful period equivalents + front-matter note · (b) modernized · (c) faithful + [sic] | (a). Kept off the public vote | O |

## E. Quotations, names, references

| # | Question | Options | ⇒ | Who |
|---|---|---|---|---|
| E1 | **Quotations from other authors** (Kant, Spinoza, Jacobi, Goethe, Schiller …) | (a) translate fresh from the German as quoted · (b) use existing English translations | (a). Existing modern translations are under copyright, and the author often quotes loosely | O |
| E2 | Bible | on the page (KJV-matched) | | C |
| E3 | Titles of works cited in the text | (a) English title · (b) original title · (c) English + original at first mention | (a), original in markup | C |
| E4 | Personal names | (a) established English forms (*Frederick the Great*, *Plato*) · (b) German forms | (a) | C |
| E5 | Place names | (a) English exonyms (*Munich*, *Cologne*) · (b) German | (a) | C |
| E6 | Names of gods (Schelling) | on the page | | C |
| E7 | Currency, units, dates (*Thaler* ≈ 80, *Gulden*, *Elle*, *Meile*) | (a) keep, no conversion · (b) convert | (a), with the glossary popover | T |
| E8 | Canonical English titles of the works themselves | lists in the glossaries | owner approves the list | O |

## F. Labeling, license, citation

| # | Question | Options | ⇒ | Who |
|---|---|---|---|---|
| F1 | **How the translation describes itself** | (a) "machine translation, guided by a scholarly glossary; not reviewed in full by people" · (b) "translation" without qualification | (a). Matches the German pages' "maschinell" and "keine vollständige Durchsicht durch Menschen" | O |
| F2 | Name the AI/model? | (a) no, "maschinell" as for the German · (b) yes | (a), unless the legal check says otherwise (AI Act Art. 50(4) concerns AI-generated text published to inform the public; check whether it applies to a translation of 1800 philosophy) | O (legal) |
| F3 | Recommended citation | (a) cite the German, translation as a help · (b) cite the English | (a), as on the German pages | O |
| F4 | **License of the English text** | (a) CC BY 4.0 like the German · (b) CC BY-SA · (c) CC0 | (a). Note: whether machine output is protected by copyright at all is uncertain; the license still makes reuse clear | O |
| F5 | Versioning and stable references | (a) version per volume + stable sentence ids · (b) only site versions | (a). Sentence ids also make the toggle and corrections exact | T |
| F6 | Corrections after publication | readers report (feedback form) → fix → re-translate the sentence → changelog | yes | T |
| F7 | Credits | community contributors named on the decisions they shaped, with consent; Friends page | yes | O |

## G. Pipeline and quality

| # | Question | Options | ⇒ | Who |
|---|---|---|---|---|
| G1 | Model | (a) the strongest current model · (b) a cheaper model with review by a stronger one | decide after the pilot by measured error rates and cost | T |
| G2 | Unit of translation | (a) sentence · (b) paragraph with neighbouring context · (c) page | (b), output aligned per sentence | T |
| G3 | **Glossary enforcement** | (a) in the prompt only · (b) prompt + automatic check that every glossary lemma came out as its fixed rendering · (c) + forced re-translation on mismatch | (c) | T |
| G4 | Automatic checks per sentence | untranslated German left · numbers, §§, formulas unchanged · names · sentence count equals German · Greek/Latin untouched | all | T |
| G5 | **Human review** | (a) none · (b) expert sampling per volume with a fixed error taxonomy and a publish threshold · (c) full review | (b), like the accuracy measurements for the German (sampling with many readers, two kinds of error never mixed) | O |
| G6 | Who reviews | (a) owner · (b) invited scholars (credited) · (c) community on the page | (b) for the pilot, (c) afterwards through the feedback form | O |
| G7 | Budget | per volume, measured in the pilot before the full run | | O |
| G8 | Re-runs when the glossary changes | (a) re-translate affected sentences automatically · (b) leave old versions | (a), with changelog | T |

## H. Reader and website

| # | Question | Options | ⇒ | Who |
|---|---|---|---|---|
| H1 | **What English-language visitors see first** | (a) the English text, German on tap · (b) the German, English on tap · (c) side by side | (a) on the English sites, (c) as a switchable view | O |
| H2 | Word and sentence toggle | tap a term → German word; tap a sentence → German sentence (preview on /translation) | settled by the owner (9 Nov) | — |
| H3 | Search | (a) separate English search · (b) English search that also finds the German lemma · (c) both languages at once | (b) | T |
| H4 | URLs | (a) English under the existing addresses, German under /de/ (as the site pages now) · (b) /en/ prefix for texts | (a), consistent with the site pages | T |
| H5 | Downloads | (a) English TEI with alignment to the German · (b) none at first | (a) later, once stable | T |
| H6 | Mac app | include English or not | later | O |

## I. Governance of the decisions themselves

| # | Question | Options | ⇒ | Who |
|---|---|---|---|---|
| I1 | **Is the community result binding?** | (a) binding: the highest score wins · (b) binding, except where results contradict each other or the evidence · (c) advisory | (b), and say so on the page before the round opens | O |
| I2 | Contradictions between decisions (e.g. *Dasein* in Hegel vs Fichte/Schelling, *Potenz* across authors) | owner resolves, publishes the reason | yes | O |
| I3 | Re-opening a decision later | (a) never · (b) on new textual evidence, through the feedback form | (b) | O |
| I4 | Minimum participation | (a) none · (b) a decision counts only with at least n reasoned votes, otherwise the draft stands | (b), n = 5 | O |

## J. Further decisions from the research (`meta-recherche.md`, M1–M118)

The research file covers what the established series decided and gives sources. These points were not yet in the
register above; ⇒ is the research recommendation unless noted.

| # | Question | ⇒ | Who |
|---|---|---|---|
| J1 (M1, M4) | **What is the English for, and what is it called?** A reading aid that leads back to the German; labelled machine translation; never "edition" (consistent with the German pages' self-description) | as stated | O |
| J2 (M2, M3) | Governing principle: leave interpretation to the reader (foreignizing, the current standard series) or aim for clarity (domesticating) | leave interpretation to the reader | O |
| J3 (M5) | One policy for all three authors, or three | one policy, author-specific term senses | O |
| J4 (M6) | Implied reader: scholars, students, general readers | students and scholars who don't read German fluently | O |
| J5 (M10) | Registers/indexes of the historical volumes | translate the headings, link entries to the English text | T |
| J6 (M20) | **Misprints: apply the volume's own errata lists?** Conflicts with the shared convention "no emendations" (§4.23) | apply the printed errata (they are the author's/editor's own), flag other nonsense misprints, never emend silently | O |
| J7 (M21, M49) | Period orthography and period senses (Racen, Cartesius, Physik, Polizei) | glossary decides; never modernize the German shown on tap | T |
| J8 (M24) | Mention vs use (a word named, not used: *das Wort „Seyn“*) | quotation marks, German word kept | T |
| J9 (M26) | Concordances to the critical editions (Fichte GA, Schelling HKA, Hegel *Werke*) | later, where the German readers have them | T |
| J10 (M27) | Paragraph numbers that don't exist in the German (the ¶ numbering of English PhG translations) | not added; German pagination only | O |
| J11 (M31) | Words split across a page break | page mark placed after the whole English word | T |
| J12 (M33, M118) | The German is still being corrected (open beta): translate now or wait | translate now, re-translate changed sentences (B1) | T |
| J13 (M39) | Make deviations from the default rendering visible | yes, in the markup (term tag carries the reason) | T |
| J14 (M41) | Neologisms: the authors' own, and ours | authors' neologisms get a fixed coinage in the glossary; no neologisms of our own beyond those | C |
| J15 (M46) | Particles and fillers (*ja, doch, nun, eben, wohl*) | render by function, never word for word; glossary list | T |
| J16 (M47) | Punctuation typography (German quotes, colons, dashes) | English conventions | T |
| J17 (M48) | Untranslated German words left in English | only *Wissenschaftslehre* and what the glossary lists | C |
| J18 (M50) | *Konjunktiv I* in indirect speech (Hegel reporting other philosophers) | render the distance ("according to him …", reported-speech verbs) | T |
| J19 (M51) | Polemical and comic registers (Fichte's *Nicolai*, Hegel's Jena reviews) | in kind: sharp where the German is sharp | C |
| J20 (M54) | A "note on the translation" page | yes, one page for all editions | O |
| J21 (M55) | Identify the sources of quotations (editorial notes) | not in the first round; later through the feedback layer | O |
| J22 (M56) | Translator's bracketed additions in the English line | none; supplied words in markup only | T |
| J23 (M57, M58) | Copy/print behaviour; per-segment status (machine, reviewed, corrected) visible | copying includes the German pagination and the label "machine translation"; status visible per sentence | T |
| J24 (M61) | The three authors quoting each other | translate the quotation with the quoted author's glossary senses | T |
| J25 (M63) | Classics quoted in Greek/Latin (Plato, Aristotle, Cicero, Spinoza's Latin) | original kept, translation on tap (as decided for Greek and Latin) | C |
| J26 (M64) | **An author quotes an English writer (Locke, Hume, Newton, Shakespeare) in German** | quote the English original where it can be identified, otherwise translate back and mark | O |
| J27 (M65) | Quotations in French or Italian (Rousseau, Bruno, Jacobi) | keep, English on tap | C |
| J28 (M66) | **Feed existing modern translations to the model as examples or context?** | no (copyright); only our own glossary | O |
| J29 (M67) | **Use public-domain English translations (Wallace, Haldane/Simson, Sibree, W. Smith, Kroeger) as a base?** | no as a base (style and terminology are dated); as a cross-check in QA only | O |
| J30 (M68) | References inside the texts (*S. 59*, *a. a. O.*, *vgl.*) | translated (*p. 59*, *loc. cit.*, *cf.*); page numbers point to the German edition cited | T |
| J31 (M72) | Sigla (SW, NW, GW, GA, HKA, AA) | kept as sigla, explained on the note page | T |
| J32 (M75) | Institutions and offices (*Hofrat*, *Geheimer Rat*, *Konsistorium*, *Kurfürst*) | established English (*Elector*, *consistory*), else German + popover | C |
| J33 (M79) | **The model refuses, skips or softens a passage** | detected automatically (length, sentence count, sensitive-term check), re-run, otherwise flagged and done by hand | T |
| J34 (M84) | Markup through translation (emphasis, page breaks, notes, term tags) | carried as placeholders, verified per sentence | T |
| J35 (M86) | Determinism and reproducibility | fixed model version, prompts and glossary version stored per sentence | T |
| J36 (M88) | Human post-editing: none, light, full | none at release, corrections through the feedback layer; full post-editing only for the pilot volumes' samples | O |
| J37 (M93, M94, M95) | Cross-volume consistency checks; a second model as checker; back-translation | yes, yes (for flagged segments), no | T |
| J38 (M96) | Benchmark against existing translations | internally only, never published as comparison (copyright and fairness) | O |
| J39 (M97, M102) | What we claim about quality; disclaimers | only measured error rates from the expert samples; no adjectives | O |
| J40 (M103) | **How modern translators and publishers are mentioned** | not named on the page or in the texts (owner, 9 Nov); a general sentence on the note page that anglophone scholarship's renderings informed the glossary | O |
| J41 (M104) | Accessibility and language tagging | `lang` on every German/Greek/Latin span; toggle reachable by keyboard | T |
| J42 (M106) | Word-level alignment beyond glossary terms | not at first; sentence + term alignment only | T |
| J43 (M110–M112) | Changelog, version numbers, corrections policy | as F5/F6 | T |
| J44 (M113) | An expert panel | small, invited, credited; for the pilot review | O |
| J45 (M114) | Community edits to the text itself | no; suggestions through the feedback layer | O |
| J46 (M115, M116) | Order and release unit | pilot (A9), then per volume | O |
| J47 (M117) | **When do the glossary decisions freeze?** | after the round closes (30 Nov 2026) and the owner's review; later changes trigger re-translation (G8) | O |
