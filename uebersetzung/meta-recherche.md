# Meta-level decisions for the English translation (research draft, 9 Nov 2026)

Internal working file. It lists **every decision above the level of single terms** that has to be made before
6.3 million words (Fichte SW + NW, Schelling SW, Hegel GW 1, 3–9, 11, 12, 15, 17–21) are machine-translated into
English under the glossary. The term-level decisions are in `hegel-glossar.md`, `hegel-glossar-nachtrag.md`,
`fichte-glossar.md`, `schelling-glossar.md` and `gemeinsam-glossar.md` (D-, N-, F-, S- and C-numbers). This file uses
**M-numbers** (M1–M118) so the five series cannot collide. Where `gemeinsam-glossar.md` §4 already proposes a convention, the
entry says so ("→ 4.x"). If my research supports the proposal it says "confirm". If the research points elsewhere it says
"conflict".

**Project premises used in every recommendation:** machine translation controlled by the glossary; free online; the German
always one click away (word and sentence toggle, sentence-aligned storage, lemma on every glossary term: `LIESMICH.md`);
the German texts are CC BY 4.0; the German sites call themselves "Digitale Ausgabe nach dem Text der …", the process is
"maschinell" and the genre word is never "Edition"; open beta; the public text never names modern translators.

**Marks.** ✓ = read in this session, in the source itself (local PDF, OCR of a local scan, or the web page named).
✓(sec) = known only from a secondary report or search summary that quotes or paraphrases the source. **(unchecked)** = from
memory or a catalogue blurb, not verified. If no precedent was found, the entry says "no precedent found". Nothing has been invented.

**Sources read in this session (abbreviations used below).**
- **CK-GE**: Guyer/Wood, "General editors' preface" to the Cambridge Edition of the Works of Immanuel Kant, as printed in
  *Critique of Pure Reason* (Cambridge 1998), front matter (local PDF; printed page numbers not visible in the scan) ✓.
  It sets out four aims (completeness, availability, organization, consistency) and five principles (single glossary;
  literalness over readability; Kant's sentence and paragraph divisions preserved; minimal emendation; segregated notes),
  and says that Akademie pagination is "indicated throughout by means of marginal numbers".
- **GW-NT**: Guyer/Wood, "Note on translation", *Critique of Pure Reason* (1998) ✓. **GW-2025**: 2nd ed. (2025),
  Acknowledgments pp. xiv–xv ✓.
- **dG**: di Giovanni, Translator's note, Hegel, *The Science of Logic* (Cambridge Hegel Translations 2010), pp. lxiii–lxxiv ✓.
- **P**: Pinkard, Translator's Note, Hegel, *The Phenomenology of Spirit* (CHT 2018), pp. xxxvii–xlv ✓.
- **BD**: Brinkmann/Dahlstrom, Translators' note, *Encyclopedia … Part I: Science of Logic* (CHT 2010), pp. xvi–xix ✓
  (general editor of the series named on the series page: Michael Baur ✓).
- **I**: Inwood, *Hegel's Philosophy of Mind* (Oxford 2007): title page "Translated … together with the Zusätze by
  W. Wallace and A. V. Miller, Revised with an Introduction by M. J. Inwood"; Introduction p. xiv on *Geist* ✓.
- **BS**: Brown/Stewart (eds.), Hegel, *Lectures on the History of Philosophy 1825–6*, vol. II (Oxford, Hegel Lectures
  series, ed. P. C. Hodgson, 2006), Editorial Introduction, section "2. This English Edition" (OCR of local scan; page
  numbers not legible) ✓.
- **Br88**: Breazeale, *Fichte: Early Philosophical Writings* (1988), Note on Translation p. xiv–xv. The quotation was checked by
  the Fichte glossary agent (`fichte-glossar.md` §0 ✓). I did not re-check it.
- **Simard 2024**: M. Simard, "Position Paper: Should Machine Translation be Labelled as AI-Generated Content?", AMTA 2024,
  vol. 1 (aclanthology.org/2024.amta-research.11) ✓ (§4 "Summary of Recommendations" read).
- **Sefaria-AI**: sefaria.org/ai ✓ (AI icons; first AI-assisted translation, Kli Yakar, drafted with Claude 3.7 and then
  edited for six months).
- **Zainaldin 2026**: Zainaldin, Pattison, Marai, Wu, Schiefsky, "Evaluating LLM-Based Translation of a Low-Resource
  Technical Language: The Medical and Philosophical Greek of Galen", arXiv:2602.24119 (v2 Apr 2026) ✓ (abstract).
- **Tekgürler 2025**: M. Tekgürler, "LLMs for Translation: Historical, Low-Resourced Languages and Contemporary AI
  Models", arXiv:2503.11898, LaTeCH-CLfL 2025 ✓ (abstract).
- **EMT**: Jonathan Bennett, earlymoderntexts.com, front page ✓.
- Secondary only (✓(sec)): EU AI Act Art. 50(4) commentary (artificialintelligenceact.eu; law-firm notes); ISO 18587:2017 and
  MQM summaries; library harmful-content statements (Princeton, Newberry, Brandeis, Wisconsin Historical Society);
  Kleingeld, "The Problematic Status of Gender-Neutral Language in the History of Philosophy: The Case of Kant",
  *Philosophical Forum* 25 (1993) (philarchive KLETPS; abstract only); Schleiermacher 1813/1815 and Venuti 1995 (course
  readings and abstracts); KJV Crown status (ebible.org/KJV/copr.htm); Loeb (Wikipedia; Slate 2006 quoting J. Henderson);
  Scaife/Perseus CTS (Tauber slides on Zenodo; SCS blog review 2019); US copyright and AI (Thaler v. Perlmutter, via law
  blogs).

---

## Contents

A. Purpose, genre, reader (M1–M6) · B. Scope (M7–M18) · C. Source handling (M19–M33) · D. Style (M34–M51) ·
E. Apparatus (M52–M59) · F. Quotations and intertexts (M60–M68) · G. Names, titles, numbers (M69–M75) ·
H. Sensitive content (M76–M79) · I. Machine pipeline (M80–M89) · J. Quality assurance (M90–M97) ·
K. Labeling, law, license, citation (M98–M104) · L. Reader UX (M105–M108, with UX points folded into C and E) ·
M. Governance and versioning (M109–M114) · N. Sequencing (M115–M118). Section O names the five most consequential decisions.

(118 entries; about a dozen of them only confirm a convention already proposed in `gemeinsam-glossar.md` §4, so roughly 105 are open decisions.)

---

## A. Purpose, genre, reader

**M1 · What is the translation for?**
- Options: (a) a reading aid that always sends the reader back to the German; (b) a stand-alone, citable translation that
  competes with Cambridge/Oxford; (c) mainly an access and search layer (find the passage in English, then read the German).
- Precedent: CK-GE ✓ wants readers "to approach texts … with the same directness as present-day readers of the German";
  each volume is a full scholarly translation. Loeb: facing-page original, the translation as a key to the original
  (✓(sec); Henderson: "Don't hide anything"). EMT ✓: versions "easier to read while leaving intact the main arguments", an
  openly adapted text, not a translation.
- **Rec: (a) + (c).** State it on every page: the English is there to read and find; the German is the text. This one sentence
  sets the bar for literalness (M37), notes (M52) and quality claims (M97). It also keeps the project out of a contest with
  the scholarly translations that it cannot win at 6.3 M words.

**M2 · What is the governing principle: leave interpretation to the reader, or clarity?**
- Options: (a) CK principle: "avoid sacrificing literalness to readability … leave as much of the interpretive work as
  possible to the reader" (CK-GE ✓; GW-NT ✓ "as much interpretative work be left for the reader of the translation as is left
  for the reader of the original"); (b) BD ✓ p. xvi: "faithfully in readable and lucid contemporary English prose", "strike a
  balance"; (c) EMT-style clarification.
- Precedent: P ✓ p. xxxvii warns that making Hegel "more easy-going" "inevitably means that more of the translator's
  interpretation … will be introduced".
- **Rec: (a), with (b)'s register (M34).** LLMs tend to smooth and explain by default, so the prompt must say explicitly that
  ambiguity is kept, not resolved. Write it into the system prompt as a rule: "If the German is ambiguous, the English must be
  ambiguous in the same way where English allows it."

**M3 · Foreignizing or domesticating?**
- Options: (a) foreignizing, i.e. "leave the author in peace and move the reader toward him" (Schleiermacher, *Über die verschiedenen
  Methoden des Übersetzens*, lecture 1813, printed 1815; named "foreignization" by Venuti, *The Translator's Invisibility*,
  1995: ✓(sec)); (b) domesticating; (c) split by level.
- Precedent: P ✓ p. xxxix: "deliberately odd German into deliberately odd English". dG ✓ p. lxv rejects "artificial
  constructs". BD ✓ p. xvi respects the "quirkiness" of the style.
- **Rec: (c).** Foreignizing at the level of terms (the glossary, nominalizations, Hegel's *an sich / für sich*). Domesticating at the
  level of syntax, word order and particles, so that the English is grammatical and not translationese. (It is worth a line in
  the policy note that the theory of this choice comes from a contemporary of our three authors, in Berlin, in 1813.)

**M4 · What do we call the thing (genre word)?**
- Options: "translation" · "machine translation" · "English version" · "reading translation" · "edition" (excluded:
  the German sites never use "Edition" as a genre word).
- Precedent: Inwood's title page ✓ says "Revised … by" when the base is an older translation. Simard 2024 ✓ wants the label to
  say "machine-translated" and from which language. Sefaria-AI ✓ distinguishes "AI-assisted content that has undergone human
  review" from "fully AI-generated content without human review".
- **Rec:** "English machine translation", subtitle "Translated from the German of the digital text after the *Gesammelte Werke* /
  *Sämmtliche Werke* …", role line "prepared by Giuliano Infantino" (parallel to "eingerichtet von"). Never "edition",
  "critical", "authoritative" or "translated by" with a person's name.

**M5 · One policy for all three authors, or three?**
- Precedent: CK-GE ✓ uses one series policy with latitude for volume editors ("we have not attempted to restrict the prerogative of
  editors and translators … maximized consistency by putting a single editor or editorial team in charge of each of the main
  groupings"). The CHT series coordinates across volumes: BD ✓ p. xvii chose "sublate" "since the translation of the Science of
  Logic appearing in this series … chose" it.
- **Rec:** one policy file (this list, once decided) and one shared glossary layer (`gemeinsam`), with author glossaries on top.
  Author-specific exceptions are written down as exceptions (C4, F16), never left to the model.

**M6 · Who is the implied reader?**
- Options: (a) scholars who read some German; (b) students with no German; (c) the general public.
- **Rec: (a) first, (b) second.** This justifies relying on the toggle instead of notes, and keeping the technical terms of the
  anglophone scholarship (the reader will meet them in secondary literature).

## B. Scope

**M7 · All volumes, or a selection?**
- Precedent: CK-GE ✓ aim 1 "Completeness"; aim 3 organization "both chronologically and topically".
- **Rec:** all 41 volumes in principle, released in stages (M115–M118). The excerpt and note volumes (GW 3) may come last.

**M8 · Do we translate the prefaces and notes of the historical editors (I. H. Fichte, K. F. A. Schelling)?**
- Options: (a) translate, marked as editor's text; (b) leave in German; (c) omit.
- Precedent: BS ✓ translate "in full the remarks of the German editors themselves" (modern editors, in their notes).
  `fichte-glossar.md` already treats SW roman-page prefaces as editor's text.
- **Rec: (a).** They are in the German reader, they are public domain, and readers need them, because the son's Schelling edition
  explains its own selection there. Mark them with a visible "Editor (1856)" label and keep them out of the author-term statistics.

**M9 · What about modern editorial matter of the GW (introductions, apparatus, editorial reports)?**
- **Rec:** out of scope. It is not in the corpus (the apparatus is never extracted: project rule), it is under copyright, and the
  reader is pointed to the printed GW.

**M10 · Do we translate tables of contents and registers?**
- Options: translate the printed tables of contents (Inhaltsverzeichnisse / Inhaltsanzeigen) as aligned text · regenerate them from translated
  headings · leave them German.
- **Rec:** translate the printed tables of contents as aligned text (the Hegel tables of contents are copied from print: `toc_druck.py`,
  never rebuilt), and keep page numbers German. Do not translate registers and indexes. English search replaces them (M107).

**M11 · What about Latin works by the authors (Hegel, *De orbitis planetarum* and the Habilitation theses; Schelling's Latin youth writings)?**
- Options: (a) leave untranslated; (b) translate from the Latin into English, with the Latin as the "original" layer; (c) adopt
  an existing translation (copyright).
- Precedent: CK translates Kant's Latin works in the regular volumes (unchecked for page detail; CK-GE ✓ speaks of "the German or
  Latin originals"). Loeb is facing-page Latin/English (✓(sec)).
- **Rec: (b),** labeled "translated from the Latin" on the work's first page. The same alignment model applies, and the toggle
  shows Latin. Use a separate prompt and glossary block for Latin (scholastic and astronomical vocabulary). A small expert
  sample here is mandatory (M90), because Hegel's dissertation is often cited.

**M12 · Other non-German passages (French, Italian, English) inside German works?**
- → 4.11 (keep the original, English in the note layer). **Rec: confirm**, with one refinement (M64): English quotations stay
  as printed.

**M13 · Verse (Hegel's *Eleusis* in GW 1, verse quotations of Goethe and Schiller, Schelling's mythological verse quotations)?**
- Options: prose crib; verse translation; leave untranslated.
- Precedent: Loeb uses prose for verse in most older volumes (unchecked).
- **Rec:** line-by-line prose rendering that keeps the line breaks (one German line = one aligned unit), with no rhyme or metre,
  labeled "prose translation". Verse quoted by the author from another poet is handled as a quotation (M60–M64).

**M14 · Excerpts and notes (GW 3 *Exzerpte und Notizen*; Hegel's excerpts from other authors)?**
- Options: (a) translate everything; (b) translate only Hegel's own words and leave the excerpts; (c) skip the volume.
- Precedent: BS ✓: the German edition quotes source passages "extensively in the original languages". The English edition
  "identifies these passages but only occasionally quotes" them.
- **Rec: (a) for German text** (Hegel's German excerpt is his wording and selection). Text in other languages stays as it is,
  with the note-layer translation (→ 4.11). Mark the volume as "excerpts", lowest priority.

**M15 · Lecture texts and posthumous compilations (Schelling's *Philosophie der Mythologie / Offenbarung*, Hegel's lecture manuscripts)?**
- Precedent: BS ✓ translate "the main text of the German edition", which "presents the most likely reconstruction". I ✓ keeps
  the *Zusätze* and labels them as editors' additions from lectures.
- **Rec:** translate the reading text as it stands. Keep every editorial labeling the German has (Zusatz, Anmerkung, editor's
  insertions). Do not try to separate layers that the German text does not separate.

**M16 · Marginal notes, deletions, insertions in manuscripts (Hegel's *Randnotizen*, shown in the reader since 0.8)?**
- **Rec:** translate the marginal notes as their own aligned units, anchored at the same place. Do not translate anything the
  German reader does not show (deleted text, apparatus).

**M17 · Letters?**
- **Rec:** out of scope (none in the corpus). Record the decision so that nobody adds Hegel's *Briefe* later without a decision.

**M18 · Greek inside German texts (Schelling ≈ 9 400 Greek tokens)?**
- → 4.10 / C25 (Greek stays in Greek script, English in the note layer). **Rec: confirm.** Add: Greek single words that the author
  glosses himself are not translated twice. Transliterated Greek in Latin letters in the German stays transliterated.

## C. Source handling

**M19 · Which text do we translate from?**
- Options: (a) the portal's own German text (SW/GW digital, corrected OCR); (b) the GA / HKA / GW printed text where
  it differs; (c) a mix.
- Precedent: dG ✓ p. lxxiv translates "from the Georg Lasson text (1923/1932)", consulting GW and using GW pagination. P ✓
  p. xlv translates the 1807 edition, checked against the Meiner/GW text. BD ✓ p. xvii uses the Suhrkamp text and notes that
  differences from GW 20 are "largely limited to spelling". GW-NT ✓ uses no single edition, checked against facsimiles.
- **Rec: (a), always and only.** Every English sentence must map to the German sentence on screen. Corrections go into the
  German first and then trigger retranslation of that segment (M87).

**M20 · Errors in the historical source (misprints in SW and GW, errata lists)?**
- Options: (a) translate what is printed (→ 4.23 "no emendations"); (b) emend obvious misprints silently; (c) emend and flag;
  (d) apply only the errata lists printed in the volume itself.
- Precedent: CK-GE ✓ principle 4: emendation "kept to the minimum necessary to correct obvious typographical errors".
  GW-NT ✓: no emendation "as long as we believe some sense can be made of the unemended original". BS ✓ note that the German
  edition "modernize[s] spelling and punctuation".
- **Rec: (d) + (c),** in **conflict with 4.23** as written. Apply the volume's own *Druckfehler* list (it is the historical
  edition's own correction). Where a misprint makes nonsense, translate the obvious sense and put a flag "German reads: …" in
  the note layer. Never correct silently: the toggle would show a mismatch.

**M21 · Period orthography and its traps (Seyn, Thätigkeit, Cartesius, Racen)?**
- **Rec:** no effect on the English, with no marking. Add one prompt rule: period spelling is not a signal (*Seyn* is never
  "Beyng" or "Be-ing"; *Racen* is "races"). The orthography lives on in the German layer.

**M22 · How do we render emphasis (Sperrsatz in Fraktur volumes, Fettdruck, emphasis in Antiqua volumes)?**
- Options: (a) italics (→ 4.1); (b) bold (GW-NT ✓ uses "bold type for emphasis" to "recreate the appearance of Kant's pages",
  where Kant used Fettdruck); (c) letter-spacing as in the German; (d) the translator's own emphasis (BS ✓: "The English italicizes
  words and phrases for emphasis according to its own editorial needs, sometimes where the German does not and vice versa").
- **Rec: (a), strictly from the source.** Every emphasized German span becomes an italic English span, with no additions or deletions
  (contra BS). If one German word becomes several English words, italicize the content word. If the alignment is unclear,
  italicize the whole rendering. Keep the original span as data, so the measured Sperrsatz quality (Hegel "Genauigkeit messen")
  carries over. Because the toggle exists, there is no reason to imitate the German typography (contra GW-NT).

**M23 · How do we mark Antiqua inside Fraktur (foreign words)?**
- Options: (a) roman, no marking (→ 4.2); (b) italics for every Antiqua word (GW-NT ✓: "italics for the foreign words that
  Kant had printed in roman type"); (c) English convention (italicize only non-naturalized foreign words).
- **Rec: (c)**, which is close to 4.2 (confirm). Italics are reserved for emphasis (M22), so they must not also mean "foreign". Keep
  the Antiqua flag as data.

**M24 · How do we mark mention vs use (words named, not used)?**
- Precedent: GW-NT ✓: Kant sometimes uses Fettdruck for mention; "where he does not, we have introduced quotation marks".
- **Rec:** quotation marks for mentioned words when the English would otherwise be unreadable (*das Wort „Sein"* → the word
  "being"). Keep the German word in markup. This interacts with F14 (nominalized particles in quotation marks).

**M25 · German page references in the English text?**
- Precedent: CK-GE ✓ Akademie pagination "by means of marginal numbers". dG ✓ p. lxxiv and P ✓ p. xlv: "pagination in margins refers
  to the text of the Gesammelte Werke". Wirth's *Ages of the World* reportedly follows Bolman in inserting the German page
  numbers (unchecked: search summary only). dG cites by GW volume, page and line ("GW 21, 112.9–11" ✓).
- **Rec:** the German page breaks of our base text (GW for Hegel, SW/NW for Fichte and Schelling) are placed as markers at the
  exact word position (via alignment) and shown in the margin. There is no English pagination at all. Add line numbers only if the
  German reader has them.

**M26 · Which concordances do we offer (Fichte GA, Schelling HKA, Hegel Suhrkamp *Werke*)?**
- Options: (a) none; (b) work-level pointer (as the German "Zitieren" note: cite after GA/HKA/GW); (c) page concordance.
- Precedent: the German sites already tell readers to cite GA / HKA / GW for publications (project memory, 08.11.). GA and
  HKA print the SW pages in their margins. Many anglophone Hegel citations use Suhrkamp *Werke* (BD ✓ translates from them).
- **Rec: (b) now, (c) later** (a concordance is a data task, not a translation task). It is not needed for the first release.

**M27 · Paragraph numbers that do not exist in the German (PhG ¶ numbering)?**
- Precedent: P ✓ p. xlv keeps "the independent paragraph numbering that was introduced by A. V. Miller", but follows "the
  paragraph markings of the critical edition", so his numbers "differ slightly" from Miller's.
- **Rec:** offer ¶ numbers for the *Phenomenology* only (it is how anglophone scholarship cites it), counted on the GW 9
  paragraphs (Pinkard's method). Label them "¶ (count of GW 9 paragraphs; not in Hegel's text)". Do not create this for other works:
  the § numbers of the *Encyclopaedia* are Hegel's own.

**M28 · Headings and internal numbering (§, A., a., α., Roman numerals)?**
- **Rec:** translate heading text and keep all sigla exactly as printed (Greek letters as in source). The heading hierarchy is copied
  from the German structure. Headings are aligned units, like sentences.

**M29 · Author's footnotes and their markers (*, †, 1))?**
- Precedent: CK-GE ✓ principle 5: segregate the author's footnotes, the editors' linguistic notes and explanatory notes (the last as
  endnotes). dG ✓ p. lxxiv: "Footnotes numbered in Arabic are Hegel's own".
- **Rec:** keep the author's notes with their original markers and position, translated as aligned text. Any note by us lives in a
  separate, typed layer (M52) and is never mixed with the author's notes.

**M30 · Editorial brackets inside the German (SW editors' insertions, GW editors' brackets, Fichte's NW shorthand)?**
- **Rec:** keep the bracket type and position from the German. Translate the content. Expand abbreviations silently (→ 4.25, confirm).

**M31 · Words split by a page break, and hyphenation in the source?**
- **Rec (technical):** de-hyphenate before translation. Place the page-break marker after the English word that renders the split
  German word. Log the cases so that page citations stay correct to the word.

**M32 · Mathematical, chemical and logical notation, tables, figures?**
- → 4.24 (unchanged). **Rec: confirm.** Tables are translated cell by cell (each cell an aligned unit). Figures keep their German
  labels plus an English legend in the note layer.

**M33 · What do we do when the German base text is still being corrected (open beta)?**
- **Rec:** translate a frozen German state per volume (record the German version id in every segment). Later German corrections
  mark the affected English segments "stale" until they are retranslated (M87).

## D. Style

**M34 · Register: period-flavoured or contemporary English?**
- Options: (a) neutral contemporary academic English (BD ✓ p. xvi "contemporary English prose"); (b) Victorian flavour
  (Wallace, Haldane, Kroeger); (c) modernized paraphrase (EMT ✓).
- **Rec: (a), American spelling** (→ 4.22, settled). No archaisms ("thou", "hath", "doth"), except inside KJV-aligned Bible
  quotations (M62). Oddness is kept only where the German is odd (P ✓ p. xxxix).

**M35 · Do we keep the long sentences or split them?**
- Precedent: CK-GE ✓ principle 3: "The paragraph, and even more the sentence, is often Kant's unit of argument … we try to
  preserve Kant's own divisions of sentences and paragraphs wherever possible". GW-NT ✓ "preservation of Kant's sentences as
  wholes, even where considerations of readability might have suggested breaking them up". Opposite: Yovel's *Hegel's Preface*
  (Princeton 2005), whose blurb says it breaks up Hegel's long sentences (✓(sec), publisher blurb).
- **Rec: one German sentence = one English sentence**, and the toggle requirement makes this structural. → 4.20 (confirm,
  sharpened). Semicolons, dashes and colons may restructure the inside of the sentence. A split is never allowed in the data. If
  a period ever has to become two English sentences, it stays one aligned unit.

**M36 · Paragraphing?**
- **Rec:** keep exactly (CK-GE ✓). Paragraphs are containers of aligned sentences.

**M37 · How literal?**
- Options: (a) literal wherever English permits (CK-GE ✓ principle 2); (b) balance (BD ✓); (c) free.
- **Rec:** literal for **terms, argumentative connectives and the order of claims**; idiomatic for syntax, particles and word
  order. Write it as a checkable rule: no glossary term may be paraphrased, and every *also, daher, folglich, aber, sondern*
  must have a counterpart.

**M38 · Consistency or idiom (one word per term)?**
- Precedent: GW-NT ✓ "we have always used the same English word for any philosophically significant German word". dG ✓
  admits contextual variation (*Unterschied* as "distinction" or "difference", pp. lxxiii–lxxiv). P ✓ varies and marks the deviation in a
  footnote (*Wesen* as "creature", *Vorstellung* as "imagine", pp. xli, xliii).
- **Rec:** strict concordance for glossary terms within their listed senses (glossary principle 5). Free variation for everything
  else. The model must not "vary for elegance".

**M39 · How do we make deviations from the default rendering visible?**
- Options: (a) footnote each deviation (P ✓); (b) flag the less frequent member (BD ✓ pp. xvii–xviii flag *Differenz*; for
  *Gegenstand / Objekt* they switch which one is flagged at § 193); (c) German in brackets (BD ✓ p. xvii: "we often insert the
  German term in italics and brackets"); (d) Latinate member in footnotes (GW-NT ✓); (e) data markup + hover; (f) nothing
  (dG ✓ p. lxv: "I have steadfastly refused to resort to mechanical devices … Artificial constructs … are … open admissions of failure").
- **Rec: (e),** already implied by the toggle and by 4.9. Every glossary term carries lemma and sense id. The reader shows the German
  on tap and can switch on a "show German terms" mode that prints them in brackets (for copying into papers). This is the
  digital version of (c) and (d), and it answers dG's objection: the English stays clean.

**M40 · Puns and etymological play (*zu Grunde gehen*, *Ur-teil*, *Er-innerung*, *meinen / mein*, *wirklich / wirken*, *zusammenschließen*)?**
- Precedent: dG ✓ p. lxxiv: *zu Grunde gehen* → "to founder", "to founder to the ground", "to founder, thus sinking to the ground".
  BD ✓ pp. xviii–xix: no English for *zusammenschließen* / *schließen*, "we chose to stay with the straightforward translation and
  simply acknowledge its inadequateness" ("Traduttore, traditore!"). P ✓ p. xlii explains *Wirklichkeit* through *wirken*.
- **Rec:** a closed list of "play entries" in the glossary, each with a fixed strategy (calque with a hyphen where the author
  hyphenates, as with *Er-innerung*; a fixed phrase like dG's "founder" where English has one; otherwise plain translation plus a
  standard note in the note layer). The model must not invent puns. Unknown wordplay is caught by the German toggle, not by ad-hoc notes.

**M41 · Neologisms: the author's, and ours?**
- Precedent: project principle "no neologisms of our own" (gemeinsam §0.6; Hegel §0.3). P ✓ p. xlv coins "taking-the-inward-turn"
  and "inwardly-turned-being" for *In-sich-gehen / In-sich-sein*. dG ✓ p. lxv rejects "artificial constructs".
- **Rec:** an author's coinage gets an attested rendering from the glossary or a calque by a written rule (hyphenated compounds,
  → 4.5). An unglossed coinage in the output (any English word not in a standard dictionary) is flagged automatically for
  review.

**M42 · Nominalizations (*das Ansichsein, das Sollen, das Durch*, nominalized infinitives)?**
- → 4.5, F14 (hyphenated calques for terms; particles in quotation marks). **Rec: confirm.** For non-glossary nominalized
  infinitives, prefer the English gerund ("the knowing", "the willing") over "the act of …".

**M43 · Capitalization (Idea, Concept, Spirit, Absolute)?**
- → 4.4 / C21 / D5. BD ✓ p. xvii: "followed ordinary English usage and left most terms uncapitalized". **Rec: confirm** (lowercase
  except God and the other theological proper names).

**M44 · Gender: *Mensch*, generic *er*, *man*?**
- Precedent: CK uses "human being" (GW-CPR 67× ✓, counted for `gemeinsam`). P uses "man" 43× ✓. Kleingeld 1993 ✓(sec) argues that
  the tension between Kant's generic terms and his views on women should be made explicit, not neutralized. (I found no
  published series policy on inclusive language for Hegel, Fichte or Schelling.)
- **Rec:** → 4.7 / C1 *human being* for *Mensch*; → 4.6 / C27 "he" where the German pronoun refers back to *der Mensch*, or repeat the
  noun; never "he or she", "they", "humankind" for rhetorical softening. Where an author speaks of men and women
  (*Mann / Weib*), render literally. One sentence in the policy note: gendered language is the authors'.

**M45 · Impersonal *man*, *wir*, lecture address (*Meine Herren*, *M. H.*)?**
- → 4.21 (*man* → "one"). **Rec: confirm**; *wir* → "we" (not "one"); *Meine Herren* → "Gentlemen" (historical address,
  kept).

**M46 · Particles and fillers (*ja, doch, nun, eben, wohl, allerdings, freilich*)?**
- → gemeinsam §3.1. **Rec:** render their argumentative force (concession, contrast, inference). Pure fillers may be left out.
  Their alignment survives because the toggle works at sentence level.

**M47 · Typography of punctuation (German quotation marks, colon use, dashes, spaced emphasis around punctuation)?**
- **Rec:** English typography (“ ” and ‘ ’), em-dashes kept as em-dashes, the author's parentheses kept. Never add exclamation marks or
  rhetorical questions that are not in the German.

**M48 · Untranslated German words?**
- → 4.8 (only *Wissenschaftslehre*). **Rec: confirm** the minimal list. Every other German word left in the English is a defect.

**M49 · Period sense of everyday words (Physik, Polizei, Witz, Evidenz)?**
- → gemeinsam §0.4, §3. **Rec: confirm** as a meta-rule in the system prompt: "the meaning around 1800, not today".

**M50 · Tense and mood of reported thought, *Konjunktiv I* in indirect speech?**
- Precedent: no precedent found in the sources read.
- **Rec:** render reported speech with "he says that …", "is supposed to", not as the author's own claim. This matters in Hegel's
  history of philosophy, Schelling's mythology lectures and polemics (Fichte against Nicolai), where an LLM easily turns a
  report into an assertion. Add it to the QA error typology (M90) as "attribution error".

**M51 · Should we translate the authors' polemical and comic registers (Fichte's *Nicolai*, Hegel's Jena reviews) in kind?**
- **Rec:** yes, to the same degree and no further. Sarcasm stays sarcastic, with no intensifiers. Add it to the review sample.

## E. Apparatus

**M52 · Translator's notes: none, few, many?**
- Precedent: CK-GE ✓ principle 5 has three segregated note types (author / linguistic / explanatory endnotes). P ✓ footnotes every
  deviation from a default rendering. BS ✓: the German edition's notes are "appreciably longer than the text itself", and the
  English combines and shortens them. Lawrence's *Ages of the World 1811* (SUNY) is described as "heavily annotated" (✓(sec), review
  snippet).
- **Rec:** no discursive translator's notes in the first release. One typed note layer with these types: `lang` (translation of
  Latin, Greek or French), `term` (standard glossary notes, e.g. *Anstoß*), `emend` (M20), `play` (M40), `ed` (marks the historical
  editors' text). Notes appear on demand and never in the reading line. Every note type is generated by rule or reviewed. There
  are no free-form model notes.

**M53 · Make the glossary visible to readers?**
- Precedent: CK-GE ✓: each volume includes "a German–English glossary, an English–German glossary". P ✓ and BD ✓ have glossaries
  (P pp. 475–483, read for `gemeinsam`). The portal already has `glossar.json` (≈ 1 300 entries).
- **Rec:** yes, as a versioned public page, both directions, every entry linked to its occurrences. Keep the vote's decisions and
  reasons visible (without naming modern translators: project rule).

**M54 · A "note on the translation" page?**
- Precedent: every volume read here has one (GW-NT, dG, P, BD). CK-GE ✓: "the general introduction to each volume includes an
  explanation of specific principles of translation".
- **Rec:** one general note (the decided version of this list, in readable prose, ≤ 2 000 words), plus one short note per author
  (what is special: Fichte's particles, Schelling's Greek and potencies, Hegel's *an sich / für sich*). No interpretive introductions.

**M55 · Do we identify the sources of quotations (Brown/Stewart-type editorial notes)?**
- Precedent: BS ✓ identify the passages Hegel quotes or paraphrases.
- **Rec:** not in the first release (it needs the GW apparatus, which is not extracted). Later, the `src` note type could carry
  identified references (AA pages for Kant, Bible verses: M62).

**M56 · Bracketed additions by the translator in the English line?**
- Precedent: Bennett's EMT uses its own bracket and dot conventions (✓(sec); the conventions page was not reached).
- **Rec:** none. Words needed for English grammar are unmarked. Content additions are not allowed. The toggle replaces brackets.

**M57 · Copy and print behaviour?**
- **Rec:** copying an English passage appends "Hegel, GW 9, 23 (English machine translation, v0.x; German: [URL])". Printing a page
  is allowed, but there is no full-work PDF (parallel to the German policy; the TEI export stays: M108).

**M58 · Per-segment status visible?**
- Precedent: Sefaria-AI ✓ has two icons (reviewed and unreviewed AI content).
- **Rec:** yes, quietly, at paragraph level: unreviewed (default), reviewed by an expert, corrected after a report. It is a small
  mark, not a warning colour.

**M59 · Do we credit human reviewers?**
- **Rec:** by name with consent, on a contributors page (parallel to the existing "Friends" list), not in the text.

## F. Quotations and intertexts

**M60 · An author quotes Kant: paste a Cambridge text or translate fresh?**
- → 4.12 (fresh, from the author's German, with CK vocabulary through the glossary). **Rec: confirm.** Reasons: the authors quote
  loosely (their wording is the text), the Cambridge translations are under copyright, and the glossary already carries the Kant
  layer. Optionally add the AA reference as an `src` note where it is identified.

**M61 · The three authors quoting each other?**
- → 4.12. **Rec: confirm**, with a technical rule: when Hegel quotes Fichte verbatim, the English should match our Fichte
  translation of that passage. Implement this as a lookup (fuzzy-match the quoted German against the Fichte corpus; reuse the
  aligned English, adapted to Hegel's wording).

**M62 · Bible quotations?**
- Options: (a) KJV-aligned where the German follows Luther (→ 4.13 / C24); (b) a modern version; (c) fresh.
- Precedent: P ✓ p. xlii n. 14 quotes Luther 1545 and the KJV side by side. BS ✓: "Biblical citations and quotations are according
  to the Revised Standard Version" (RSV is under copyright).
- **Rec: (a).** The KJV is in the public domain everywhere except for printing rights in the UK under Crown letters patent
  (✓(sec), ebible.org). That does not touch an online text produced outside the UK, but note it in the legal memo. Verse
  references in English form.

**M63 · Greek and Latin classics quoted (Plato, Aristotle, Cicero, Spinoza in Latin)?**
- Options: original + note-layer translation (→ 4.10, 4.11, C25); adopt Loeb (copyright for recent volumes); fresh.
- **Rec:** keep the original. The note-layer English is a fresh machine translation of the passage as the author quotes it
  (including his misquotations), labeled. Never copy Loeb or other modern translations.

**M64 · The author quotes an English writer (Locke, Hume, Newton, Shakespeare) in German translation?**
- Options: (a) translate the German back into English; (b) restore the original English wording; (c) restore it and mark it.
- Precedent: no precedent found in the sources read. CK practice for Kant's quotations of Hume (unchecked).
- **Rec: (c)** when the source is identified with confidence and the German is a translation of it, with the note "original wording". Otherwise
  use (a), with the note "translated from the German". Back-translated Hume is the most embarrassing error a reviewer can find.

**M65 · Quotations in French or Italian (Rousseau, Bruno, Jacobi's French)?**
- → 4.11. **Rec: confirm** (original kept, English in the note layer).

**M66 · Do we feed existing modern translations to the model as examples or context?**
- **Rec:** no. Glossary renderings are single terms (not protected). Running text from Pinkard, di Giovanni or Breazeale must not be
  in the prompts. Check the output for verbatim overlap on famous passages (PhG Preface, SL Being–Nothing, the start of the WL) and
  rewrite any long verbatim stretch. That reproduction would be a copyright and a credibility problem.

**M67 · Are public-domain English translations (Wallace 1873/1892/1894, Haldane/Simson 1892–96, Sibree 1857, W. Smith, Kroeger) a base to revise?**
- Options: (a) ignore; (b) use as base and revise (Inwood's model: I ✓ "Revised with an Introduction by", Wallace/Miller);
  (c) use only to calibrate.
- Precedent: I ✓ revised Wallace/Miller instead of retranslating.
- **Rec: (a) for production, (c) for evaluation.** Their texts do not match our base text (often other editions, Michelet's
  compilations, not GW), their terminology conflicts with the glossary (Notion, Ego), and segment alignment would be painful.
  Mention them in the note on translation as historical translations. Note that the corpus volumes rarely overlap with them
  (GW has no Zusätze and no Michelet history-of-philosophy text).

**M68 · How are references inside the texts handled (*S. 59*, *a. a. O.*, *vgl.*)?**
- → 4.16. **Rec: confirm** ("p. 59", "loc. cit.", "cf."). Internal cross-references to SW or GW pages stay German page numbers and
  become links where they can be resolved.

## G. Names, titles, numbers

**M69 · Personal names?**
- → 4.18 (modern English standard forms). **Rec: confirm**, with a lookup table rather than the model's judgement (person names are a
  known weak point: the Fischer/Volk 2025 MT Summit paper on 16th-century letters reports that LLMs struggle with person names
  ✓(sec)).

**M70 · Mythological and classical names (Schelling: Greek vs Latin forms)?**
- **Rec:** keep the author's choice (Zeus stays Zeus, Jupiter stays Jupiter), in English spelling per the Schelling glossary
  table. Never "normalize" Roman to Greek or the other way round. Schelling's argument often depends on the difference.

**M71 · Titles of works cited, and the authors' own titles?**
- → 4.17. **Rec: confirm.** Use established English titles for the authors' own works (glossary "Werktitel"), with the German title in
  markup. A title translated from the German mention stays a translation of that mention ("my *Ideas for a Philosophy of
  Nature*").

**M72 · Sigla and abbreviations (SW, NW, GW, GA, HKA, AA)?**
- → 4.15. **Rec: confirm**, and expand them once per page in a tooltip.

**M73 · Dates, numerals, ordinals?**
- → 4.19. **Rec: confirm.** Never convert old calendar notations. Keep Roman volume numbers as printed.

**M74 · Units and currency?**
- → 4.19 (no conversion; front-matter note for the German mile). **Rec: confirm.**

**M75 · Place names, states, institutions, offices (*Hofrat*, *Geheimer Rat*, *Konsistorium*, *Kurfürst*)?**
- **Rec:** English exonyms where established (Munich, Cologne, Vienna, Prussia, Württemberg unchanged). Offices are translated with
  standard renderings (Privy Councillor, consistory, Elector), with the German lemma in markup. Never leave them German and
  italic.

## H. Sensitive content

**M76 · General policy: literal, softened, annotated?**
- Precedent: library statements keep harmful original language and add context rather than altering it (Princeton,
  Newberry, Brandeis, Wisconsin Historical Society ✓(sec)). Brandeis "does not censor". Kleingeld ✓(sec): make the tension visible.
  The project's proposals: F principle 7 (Fichte), gemeinsam §3.6 / C26 "faithful, non-softening, non-amplifying".
- **Rec: confirm C26.** Translate literally. Do not soften, sharpen or add inline "[sic]". Write one paragraph in the note on
  translation.

**M77 · Which English words for period terms (*Neger, Wilde, Race, Jude, Weib, Zigeuner*)?**
- → §3.6 table (period English equivalents). **Rec: confirm.** Add one QA rule: the English is never stronger than the German
  (no slur where the German is the neutral term of its day), and never weaker.

**M78 · Content notes: none, global, or per passage?**
- Options: (a) none; (b) a global statement; (c) quiet per-passage markers for a curated list (Fichte's 1793 *Beitrag* on Jews; the
  *Reden* on *Volk* and nation; Hegel on Africa, e.g. GW 18, 224 "afrikanischer Stupidität" and GW 20, 477 (Enc. § 482: "Africa
  und der Orient" never had the idea of freedom): both found with `zaehle.py kwic Afrika`; Schelling's ethnography in the
  mythology lectures, e.g. *Neger* 23× in Schelling, 0× in Hegel, per gemeinsam §3.6); (d) interpretive commentary.
- **Rec: (b) + (c), never (d).** The marker links to the global statement and says nothing about the passage. The curated list is
  a decision document, not a model output.

**M79 · What if the model refuses, skips or quietly softens a passage?**
- Precedent: Tekgürler 2025 ✓: Gemini's safety filters "flagged between 14 and 23 percent" of an 18th-century memoir, which left
  passages untranslated. The project has its own precedent: 8 pages of AA 20 were blocked by a content filter in the Kant run
  (project memory).
- **Rec:** treat refusal and omission as the main risk for exactly the passages critics will check first. Detect it automatically
  (length ratio per sentence, alignment gaps, refusal phrases, missing glossary lemmas, a list of trigger words whose
  English counterpart must appear). Retranslate through a second route. If that fails, translate by hand and mark the result
  "translated by hand". Never publish a softened sentence.

## I. Machine pipeline

**M80 · Model and documentation?**
- Options: one model for everything · different models per language (Latin, Greek) · ensemble with a judge.
- **Rec:** one primary model per release. Record model id, date, prompt version and glossary version **per segment**. A different
  model is used as checker (M94). The model name goes into the technical notes (M99).

**M81 · Unit of translation and context?**
- **Rec:** translate paragraph by paragraph, with the previous paragraph and the section heading as context, and return output
  segmented sentence by sentence under the German sentence ids (required by the toggle). Long Hegel periods go in whole. A
  sentence is never cut to fit a window.

**M82 · How does the glossary get into the model?**
- Options: the whole glossary in every prompt · a lemma-matched subset · fine-tuning · constrained decoding.
- **Rec:** a lemma-matched subset (lemmatize the German paragraph and inject only the matching entries with their allowed senses),
  plus the author block and the shared block. Fine-tuning is unnecessary and makes changing a decision expensive.

**M83 · How is the glossary enforced?**
- **Rec:** automatic post-check: every glossary lemma in the German sentence must have an approved English rendering in the aligned
  English sentence, with its sense id. If not, repair it in a loop with the specific instruction. Report the check results per
  volume (they double as a consistency metric, M93).

**M84 · Markup through translation (emphasis spans, page breaks, footnote anchors, term tags, Antiqua flags)?**
- **Rec:** tag-aware translation with placeholders. After translation, validate that every German tag has exactly one English
  counterpart in the same sentence. Any failure is a hard stop for that segment.

**M85 · Non-German segments inside German text?**
- **Rec:** detect them by language and script (Greek blocks, Latin, French) and route them to the `lang` note layer (M52).
  The main pass does not translate them, so it cannot silently "help".

**M86 · Determinism and reproducibility?**
- **Rec:** lowest temperature. Store prompts and outputs. A rerun on the same input with the same versions should change nothing.
  Diffs between releases are then caused by decisions, not by chance, and the changelog (M110) can be generated.

**M87 · What triggers retranslation?**
- **Rec:** (1) a glossary decision changes: every segment containing the lemma is retranslated, the others stay. (2) The German
  segment changes: retranslate that segment. (3) A reader report is accepted: hand-correct the segment and lock it against
  automatic overwriting. This needs a lemma → segment index from the start.

**M88 · Human post-editing: none, light, full (ISO 18587)?**
- Precedent: ISO 18587:2017 distinguishes light post-editing (understandable text) from full post-editing (quality comparable to
  human translation) (✓(sec)). Sefaria-AI ✓ edited a single commentary for six months.
- **Rec:** no post-editing at scale (6.3 M words make it impossible). Full post-editing only for a defined showcase set (e.g. the PhG Preface
  and Introduction, the first sections of the WL 1794, Schelling's *Freiheitsschrift*, *De orbitis*). Report the status per
  segment (M58). Never call the whole thing "reviewed".

**M89 · Budget and pilot?**
- **Rec:** first a pilot on 3–4 volumes chosen to cover the risks (project memory: "trial run on 3–4 volumes"): one Hegel volume
  dense in terms (GW 21), one Fichte late-lecture volume (NW), one Schelling mythology volume (Greek-heavy), and GW 5 (Latin
  *De orbitis*). Measure cost per 1 000 words, the error profile and the review effort before the full run.

## J. Quality assurance

**M90 · Expert sample review: how much, by whom, with what scheme?**
- Precedent: Zainaldin 2026 ✓ use "reference-free expert human evaluation" with MQM because automatic metrics "correlated
  moderately with expert judgment only where quality varied widely, and none distinguished among the high-quality
  translations". MQM has an error typology (accuracy, fluency, terminology …) with severities (✓(sec)).
- **Rec:** a stratified random sample per volume (proposal: 150 sentences per volume, oversampling M91 strata), reviewed by a reader
  of German philosophy with a reduced MQM scheme: omission/addition, mistranslation, terminology (glossary violation),
  attribution (M50), emphasis/markup, fluency. Severity: minor, major, critical. Publish the per-volume result (M97).

**M91 · Where do we expect failures (risk strata)?**
- Precedent: Zainaldin 2026 ✓: "Terminology rarity, operationalized via corpus frequency, emerged as the dominant predictor of
  failure (r = −.97)". Expository text scored 95.2/100, dense pharmacological passages 79.9.
- **Rec:** oversample passages dense in rare terms (Schelling's *Naturphilosophie* and potency calculus, Hegel's philosophy of nature and
  mathematics remarks, Fichte's late WL), Greek and Latin, sensitive passages (M78), and very long sentences. `zaehle.py` can
  provide the term rarity per paragraph.

**M92 · Automatic checks on every segment?**
- **Rec:** sentence length ratio (both directions), German remnants in the English, numbers and sigla preserved, names against
  the lookup (M69), glossary compliance (M83), markup integrity (M84), duplicates (the same English for different German), refusal
  phrases (M79), and model "explanations" (English words such as "i.e." or "that is" that have no counterpart in the German).

**M93 · Consistency checks across volumes?**
- **Rec:** identical German sentences and formulae (*Anmerkung*, *Zusatz*, recurring definitions in the *Encyclopaedia* editions,
  Fichte's repeated WL formulas) must get identical English. Report divergences per release.

**M94 · A second model as checker ("LLM-as-judge")?**
- **Rec:** yes, as a filter that flags segments for human review (different vendor or model from the translator). Never as a
  published quality score.

**M95 · Back-translation?**
- **Rec:** only as a diagnostic for flagged segments (did the meaning survive?). It is not a metric: back-translation rewards literal
  word choice and hides wrong term senses.

**M96 · Do we benchmark against existing translations?**
- **Rec:** internally, yes. Compare the sample with Pinkard / di Giovanni / Breazeale on the same passages to calibrate the review.
  Never publish the comparison text (copyright) or the translators' names (project rule).

**M97 · What do we claim about quality?**
- Precedent: project rule "Genauigkeit messen": never mix kinds of measurement, publish the method. GW-2025 ✓ shows a corrections
  statement with a date ("corrects all errors that we have identified or that have been brought to our attention by September 2023").
- **Rec:** publish the method and the measured per-volume sample result ("sample of N sentences, X major errors per 100
  sentences, date"). Make no adjectives ("accurate", "high-quality") without a number, and no claim for unreviewed volumes beyond "machine
  translation, unreviewed".

## K. Labeling, law, license, citation

**M98 · How is "machine translation" shown?**
- Precedent: Simard 2024 ✓ §4: label MT "systematically … everywhere it is used". The label should say the content "was
  machine-translated and specify the language from which it was translated", with "a link or reference to the original text"
  and pointers to MT literacy. The label can be dropped only if the whole text "has been verified and certified fit-for-purpose".
  Sefaria-AI ✓: "We will clearly label AI-powered content and experiences".
- **Rec:** a fixed line on every English page: "Machine translation from the German, controlled by a published glossary. The German
  text is one click away. Open beta." It links to the note on translation. The label never disappears, because we will never review
  everything.

**M99 · Do we name the AI or the model?**
- Precedent: German sites: "maschinell", the AI named only if legally required (Art. 50 checked for the German transcription: not
  required; project memory). For translation the situation differs: the entire English text is generated. EU AI Act
  Art. 50(4) (applicable from 2 Aug 2026) requires disclosure for AI-generated text "published with the purpose of informing the
  public on matters of public interest", unless it has undergone human review or editorial control and someone holds editorial
  responsibility (✓(sec), commentary; Commission guidelines of July 2026 reported as non-binding). Whether translated philosophy
  is "public interest" information is doubtful, and the exception's "review" would not cover unreviewed volumes.
- **Rec:** say "machine translation (large language model)" in the note on translation and give the model and version in the
  technical notes (M80). Get a short legal opinion on Art. 50(4) before launch. Here, disclosure costs nothing and protects
  credibility.

**M100 · License of the translation?**
- Options: (a) CC BY 4.0, like the German; (b) CC0; (c) more restrictive.
- Background: in US law purely AI-generated output lacks human authorship (Thaler v. Perlmutter, D.D.C. 2023; affirmed on
  appeal 2025: ✓(sec)). Under EU law, originality requires the author's own intellectual creation, so unreviewed machine output
  is probably unprotected (unchecked, legal opinion needed). The glossary, the selection and the hand corrections are human work.
- **Rec: (a), CC BY 4.0,** for the whole publication (consistent, simple), with a plain sentence: "Parts of this text may not be
  protected by copyright; where they are, CC BY 4.0 applies." It allows reuse, AI training included, and that should be a
  conscious choice.

**M101 · How should people cite?**
- Precedent: German sites: "Open beta. For publications we recommend citing the GA / HKA / GW" (project memory, 08.11.).
  Anglophone practice cites the German pagination next to the translation (CK-GE ✓ marginal AA numbers; P ✓, dG ✓ GW in margins).
- **Rec:** "Cite the German text by its German pagination. If you quote this English, cite it as: Hegel, *Phenomenology of
  Spirit*, GW 9, 23, English machine translation, version 0.x, [stable URL], accessed …". Add a clear advice: check any quotation
  against the German before publishing.

**M102 · Disclaimers?**
- **Rec:** short and factual: "Not a substitute for scholarly translations. Open beta. Reports welcome." No legal boilerplate about
  "no warranty" on the reading page, only on the legal page.

**M103 · How are modern translators and publishers mentioned?**
- Project rule: the public text never names modern translators.
- **Rec:** keep the rule in the public note on translation ("the glossary follows the renderings now standard in anglophone
  scholarship"). Internal files (like this one) may name them. Optionally give a courtesy notice to the series editors (Cambridge
  Hegel Translations, the OUP Hegel Lectures) before launch: owner's decision.

**M104 · Accessibility and language tagging?**
- **Rec:** `lang="en"` on the page and `lang="de"` (or `la`, `grc`, `fr`) on every toggled or original span, so that screen readers
  switch voice. Toggled German must be announced, not only coloured.

## L. Reader UX

**M105 · Default view: English with toggle, parallel columns, interlinear?**
- Precedent: Loeb uses facing pages (✓(sec)). The Scaife Viewer uses CTS-addressed source and translation editions side by side. A
  2019 review found that they "at times do not align exactly" (✓(sec), SCS blog). The project's requirement: word and sentence
  toggle.
- **Rec:** English by default with the word and sentence toggle (fixed), plus an optional parallel-column view on wide screens
  driven by the same sentence alignment (the Scaife problem disappears with sentence ids). On phones, offer no interlinear view.

**M106 · Word-level alignment beyond glossary terms?**
- **Rec:** no. Glossary terms (lemma) plus sentences are enough and can be checked. Full word alignment would be noisy and would invite
  false precision.

**M107 · Search?**
- **Rec:** an English full-text index; "search by German lemma" across the English (all *Anschauung* = "intuition" hits, including in
  senses marked otherwise); hits show both languages. This follows the plan to split the index per work (project memory on index
  weight).

**M108 · URLs, anchors, exports?**
- **Rec:** URLs keyed to German pagination (`/en/gw9/23#s14`). TEI export of the translation, sentence-aligned
  (`<s xml:id>` with `@corresp` to the German `<s>`), CC BY, next to the DTABf German download. No full-work PDF.

## M. Governance and versioning

**M109 · Who decides?**
- Precedent: CK-GE ✓ has general editors with editors and teams per grouping. CHT has a series editor (BD ✓ thanks "the series
  editor Michael Baur"). The Hodgson / Jaeschke / Ferrara agreement set "common editorial principles" across language versions of the
  lectures (✓(sec)).
- **Rec:** the owner decides, as general editor in all but name. The reader vote (/translation, 72 questions, closes 30.11.2026) is
  advisory and documented. Each decision gets its ID (D, N, F, S, C, M) and a one-line reason in a public decision log.

**M110 · Changelog?**
- **Rec:** public, per release: decisions changed, segments retranslated (counts per volume), hand corrections. Generate it from the
  segment database (M86, M87).

**M111 · Version numbers?**
- Precedent: German sites have release numbers (Hegel 0.82 etc.). GW-2025 ✓ is a second edition with a dated corrections cut-off.
- **Rec:** a translation version independent of the German version (e.g. "EN 0.1 on DE 0.82"). Each segment stores both. Stable
  URLs show the current version, with a version-pinned permalink for citations. Archive release snapshots (Zenodo DOI) once
  the beta ends.

**M112 · Corrections policy?**
- **Rec:** a report button on every sentence (M58). Triage: glossary issue (goes to decision), segment error (hand fix, locked),
  German error (goes to the German correction workflow first). Record the date of the last processed report in each release
  (GW-2025 ✓ model).

**M113 · Expert panel?**
- **Rec:** one or two reviewers per author for the sample (M90), paid or credited (M59). They review the sample and the showcase set,
  not the whole text.

**M114 · Community edits?**
- **Rec:** suggestions only, curated. No open wiki editing: it would break segment provenance and the decision log.

## N. Sequencing

**M115 · In what order?**
- **Rec:** pilot (M89), then the volumes most read in English in each author (PhG GW 9, SL GW 11/12/21, Encyclopaedia GW 20; Fichte SW I–IV;
  Schelling SW I/3, I/7, I/10, II/1–4), then the rest, with GW 3 (excerpts) last.

**M116 · Release unit?**
- **Rec:** per volume, each with its own sample result (M97) and beta badge. Do not release single works out of a volume (the German
  reader is per volume).

**M117 · When do the glossary decisions freeze?**
- **Rec:** after the vote (30.11.2026) and the owner's decisions on D, N, F, S and C, freeze glossary version 1.0 for the pilot. Any
  later change goes through M87 (targeted retranslation). The full run starts only after the pilot has been reviewed.

**M118 · German first, or English in parallel with German corrections?**
- **Rec:** German first per volume (M33). Do not translate volumes that are offline (GW 16, GW 13 until 1 Jan 2027: project memory,
  §70 protection period).

---

## O. The five most consequential decisions

1. **M1 / M4 / M98: what the English is and what it is called.** "A reading aid that leads to the German, labeled machine
   translation, never 'edition'" sets the standard for literalness, notes, claims and reputation. Everything else follows.
2. **M35 / M81: the German sentence is the unit.** The toggle requirement makes it structural. It settles Hegel's long periods (CK
   principle 3), segmentation in the pipeline, the display of page markers and the exports.
3. **M82 / M83 / M87: glossary enforcement and targeted retranslation.** The glossary will change after the vote and after reports. If
   the system cannot find every segment containing a lemma and retranslate only those, every decision becomes a full rerun or a
   silent inconsistency.
4. **M79 / M90–M92: omission and refusal detection plus expert sampling.** The passages critics check first (Fichte 1793, Hegel on
   Africa, Schelling on peoples) are the ones an LLM is most likely to skip or soften (Tekgürler: 14–23 % flagged). Automatic
   metrics cannot see quality at the top end (Zainaldin).
5. **M99 / M100 / M101: disclosure, license and citation.** Naming the process honestly (EU AI Act Art. 50(4) needs a legal
   check), choosing CC BY knowing that the machine output may not be protected, and telling readers to cite the German pagination
   decide how the scholarly community receives the project.
