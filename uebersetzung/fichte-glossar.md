# Fichte glossary for the English translation (draft 1, 9 Nov 2026)

Scope: the Fichte volumes in the portal corpus: SW I–VIII and NW I–III (I. H. Fichte's edition; ≈ 1.93 M words).
These are the early Jena *Wissenschaftslehre* (WL 1794/95, *Grundriss*, the two *Einleitungen* and the *Versuch einer neuen Darstellung*), the *Naturrecht* and the *Sittenlehre*, the *Atheismusstreit* writings and the late WL (1801, 1804, 1810–13). They also include the popular and political writings, from the *Beitrag* on the French Revolution to the *Staatslehre* of 1813.
The roman-numbered pages (e.g. SW III|XVI) are I. H. Fichte's editorial prefaces, not J. G. Fichte. They are translated with the same glossary, but every row and trap below cites Fichte's own text.

**Status:** proposal. Rows marked ⚑ need a decision (section 1). All other rows are the default unless you object.
Where a choice could collide with the Hegel glossary (`hegel-glossar.md`, decisions D1–D15 still open), the row says
**Cross-author**. It states the collision and does not pre-empt the Hegel decision.

## 0. Principles (proposal, Fichte-specific)

1. **Follow the current scholarly translators, and Breazeale in particular.** Breazeale's volumes (*EPW* 1988, *FTP* 1992,
   *Foundation* 2021), Neuhouser/Baur (*FNR* 2000) and Breazeale/Zöller (*SE* 2005) set the vocabulary that anglophone Fichte
   scholarship now quotes. Older versions (Kroeger, Smith, Heath/Lachs) are listed so that readers can recognize them, but
   we do not follow them where they differ.
2. **One rendering per term across 1794 and 1813.** Fichte's vocabulary changes between the Jena and the Berlin WL (Wright,
   *Science of Knowing*, Intro. p. 12 ✓: "positing" is central in 1794 and marginal in 1804). We still keep one English word
   per German word. Where the *sense* shifts (*Bild*, *Erscheinung*, *Sein*, *Begriff*), the row says so and the markup keeps the
   lemma. We never "improve" the late text by importing Jena terms, or the reverse.
3. **Fichte's strangeness is part of the text.** "The I", "the not-I", "the 'through'", "being-a-principle" are as odd in
   German as in English. Fichte chose *das Ich* over the available *das Selbst* on purpose (Breazeale, *EPW*, Note on Translation,
   p. xiv ✓: "it is not a virtue to produce a translation that is more 'readable' … than the original"). No smoothing.
4. **Nominalized particles and pronouns are terms.** *das Durch, das Von, das Soll, das Dass, das Was, das Ist, das Als,
   das Sich* are rendered literally in double quotation marks (the "through"), after Wright ✓. *Das Ich* takes the pronoun
   **it**.
5. **The German stays recoverable** (as in the Hegel glossary, principle 4). Every row whose Danger column says "markup" keeps its lemma in
   the data, for example *Tatsache/Faktum*, *Sittlichkeit/Moralität*, *Sittengesetz/Moralgesetz*, *Leib/Körper*, *Grenze/Schranke*,
   *Bild/Begriff*, *Erziehung/Bildung*, *schlechthin/absolut*.
6. **Context senses are listed explicitly.** The translator may use only the senses listed here (e.g. *Leiden* = passivity in
   the WL, suffering elsewhere; *Künstler* = artisan in the economic writings). Any other choice is logged as a query.
7. **Sensitive passages are translated literally** (section 4). No softening, no modernizing, no silent annotation in the
   text.

Abbreviations (details and pages in section 6): **B88** Breazeale, *Early Philosophical Writings* (1988) · **B92** Breazeale,
*Foundations of Transcendental Philosophy (WL nova methodo)* (1992) · **B94** Breazeale, *Introductions to the WL* (1994) ·
**B21** Breazeale, *Foundation of the Entire WL and Related Writings* (OUP 2021) · **BZ** Breazeale/Zöller, *System of Ethics*
(2005) · **Ba** Neuhouser/Baur, *Foundations of Natural Right* (2000) · **HL** Heath/Lachs, *Science of Knowledge* (1970/82) ·
**W** Wright, *Science of Knowing* (1804 WL, 2005) · **Sm** William Smith (1847–89) · **Kr** A. E. Kroeger (1889, 1897) ·
**JT** Jones/Turnbull, *Addresses* (1922) · **Mo** Moore, *Addresses* (2008) · **NKT** Nakhimovsky/Kapossy/Tribe, *Addresses* (2013) · **Pr** Preuss, *Vocation of Man* (1987) ·
**G** Green, *Critique of All Revelation* (1978) · **Ad** Adler, *Closed Commercial State* (2012) · **SEP** Breazeale, "Johann
Gottlieb Fichte" · **CC** James/Zöller (eds.), *Cambridge Companion to Fichte* (2016).
✓ = checked in the translation itself, its notes or glossary, or a viewable preview. "via B88" means that Breazeale's
glossary reports the HL rendering. Unmarked = from memory, not checked.

**n** = Fichte count from `zaehle.py count` (period spellings folded, prefix match, case-folded, so verb forms are included
where they are homographs). **n†** = case-sensitive count of the capitalized form (includes sentence-initial verbs), made with
a helper on the same corpus file.

---

## 1. Decisions for you

| # | Term(s) | Options | Recommendation |
|---|---|---|---|
| F1 | **Wissenschaftslehre** (897; 1 496 with *W.-L.*) | (a) leave untranslated: B88 ✓ (p. xv), B21 ✓, SEP ✓, "now the most common practice" (W ✓ p. 11) · (b) *Science of Knowledge*: HL (✓ via B88), Kr · (c) *Science of Knowing*: W ✓ · (d) *Doctrine of Science* / *Theory of Scientific Knowledge*: B88 ✓ as possible glosses | **(a)**, in roman type, as a proper name. Expand Fichte's abbreviation *W.-L.* in full. In the English titles the term stays German (*Foundation of the Entire Wissenschaftslehre*). |
| F2 | **das Ich** (n† 1 383 *das Ich*; 16 319 incl. pronoun) / **Nicht-Ich** (596) | (a) *the I* / *the not-I*: B88 ✓, B21 ✓, Ba ✓, W ✓, SEP ✓ · (b) *the self* / *the not-self*: HL (✓ via B88) · (c) *the Ego* / *the Non-Ego*: Sm ✓ (1847 p. 19), Kr ✓ | **(a)**, with pronoun **it** (never *he*). Capitalize *I* as English does; write *not-I* with a hyphen. *Selbst* is kept for *the self*. **Cross-author**: the Hegel glossary already has *Ich* = *the I* (P ✓). The same rule should hold for Schelling. |
| F3 | **Tathandlung** (19) | (a) *F/Act*: B21 ✓ (pp. 5, 13, 18, 27) · (b) *Act*: B88 ✓ (p. xiv), B92 ✓ (p. 13 n. 35), HL (✓ via Klotz in CC) · (c) *fact/act*: SEP ✓ · (d) *enactment*: W ✓ (glossary p. 245) · (e) *deed-action*: Klotz in CC ✓ (suggested) | **(a)** *F/Act* (pl. *F/Acts*). It keeps the play on *Tatsache* (*fact*) that Fichte coined the word against (B21 p. 18 ✓: a "polemical counterpart to Reinhold's *Tatsache*"). Plain *Act* collides with *Handlung* (*act, action*) and *Akt*. Fichte himself equates the *Thathandlung* with his later *Genesis* (NW II 194). |
| F4 | **Anstoß** (71) | (a) *check*: B88 ✓, B21 ✓ (pp. 29, 36), Ba ✓, SEP ✓ · (b) *impetus* / *impulse*, *trigger* (Klotz in CC ✓ "'check' or 'trigger'"), *obstacle* | **(a)** in the technical sense (WL 1794/95, *Grundriss*, FNR § 3). The word means both an obstruction and an impulse, and B21 p. 29 ✓ glosses it as what "obstructs … and 'impels'". A translator's note should state this. Outside the technical sense it is an everyday word (*offense*, *initial push*), see Traps T19. |
| F5 | **schweben, Schweben** (134 main forms) | (a) *hover*: B88 ✓ (2nd), B21 ✓ "hovers above" (p. 29) · (b) *oscillate*: B88 ✓ (1st), B21 ✓ "oscillates between" (p. 29) · (c) *waver*: HL (✓ via B88) | **(a)** *hover* throughout: *zwischen … schweben* = *hover between*, *über … schweben* = *hover over* (late WL: "schwebt über sich", NW I 184). This keeps *schwanken* (43) = *waver* and *Wechsel* = *alternation* distinct. **Cross-author**: Schelling uses *schweben* 77×. Coordinate. |
| F6 | **schlechthin** (2 610) | (a) *purely and simply*: B21 ✓ (pp. 5, 29) · (b) *simply, absolutely*: B88 ✓ · (c) *unconditionally and absolutely*: Martin on B (NDPR ✓) | **(a)** where it qualifies an act or being (*das Ich setzt sich schlechthin* → *the I posits itself purely and simply*). Use *simply* before adjectives and participles (*schlechthin notwendig* → *simply necessary*). **Never *absolutely***: *absolut* (5 224) and *das Absolute* need that word, and machine translation merges them. *schlechterdings* (188) = *absolutely, by all means*. |
| F7 | **Mensch** (2 674 *Mensch/Menschen*); title *Die Bestimmung des Menschen* | (a) *human being*: Ba ✓ (146×) · (b) *man*: B88 ✓ (319×), Sm ✓ · title: *The Vocation of Man* (Pr, SEP ✓) | **(a)** in running text (*Mann* = *man*). Keep the established title *The Vocation of Man* as a citation title only, and add a note. Fichte's text uses *der Mensch* generically. Where he speaks about men as opposed to women (FNR family right), the German itself says *Mann/Weib*. |
| F8 | **Evidenz, evident** (177 / 26) | (a) *self-evidence*, *self-evident*: B88 ✓ (*evident* = "self-evident, obvious") · (b) *manifestness*: W ✓ (75×, glossary p. 243) · (c) *evidence*: false friend | **(a)**. English *evidence* means proof material, and W p. 14 ✓ explains why it is wrong. W's *manifestness* is idiosyncratic and collides with *offenbar* (*manifest*). Markup flags the lemma. |
| F9 | **Sittlichkeit / Moralität; sittlich / moralisch** (334 / 276; n† 623 / 642) | (a) *Sittlichkeit* = *morality*, *sittlich* = *ethical*, *Moralität* = *morality*, *moralisch* = *moral*; distinguished in the markup: CC ✓ ("the highest morality [*Sittlichkeit*]", in a discussion of the *Kritik aller Offenbarung*), BZ title *System of Ethics* ✓ · (b) *Sittlichkeit* = *ethical life* (Hegel P ✓) | **(a)**. *Sittlichkeit* in Fichte is the morality of the *Sittenlehre*, not Hegel's institutional ethical life. **Cross-author collision**: the Hegel glossary has *Sittlichkeit* = *ethical life*. This is a deliberate author-specific exception, marked in the markup. *Sittengesetz* (416) = *moral law* (BZ ✓ via Lotz). *Moralgesetz* (120) = *moral law* (markup). *Sittenlehre* = *ethics, doctrine of ethics*. |
| F10 | **Intelligenz** (365) | (a) *intellect*: B88 ✓ (46×) · (b) *intelligence*: Ba ✓ (11×), Hegel glossary (I) | **(b)** *intelligence*, for consistency across all three authors (Schelling's *System* also needs it). A note says that in Fichte it means the I as a knowing subject, not cleverness. The form is always *the intelligence*, never *intelligence* without the article. |
| F11 | **Wechselwirkung** (208) | (a) *interaction*: B88 ✓ · (b) *reciprocal interaction*: Ba ✓ (25×) · (c) *reciprocal action*: Hegel glossary (M), pending · (d) *reciprocity* | **(b)** *reciprocal interaction*, proposed for **all three authors**. It fits the family *Wechselbestimmung* = *reciprocal determination* (B88 ✓) and *Wechselbegriffe* = *reciprocal concepts* (B88 ✓). |
| F12 | **Tatsache / Faktum; faktisch, Faktizität** (303 / 482; 1 210; 88) | *Tatsache* = *fact* (B92 ✓, W ✓). *Faktum*: (a) *fact*: B88 ✓ · (b) *factum*: B21 ✓ (p. 29). *faktisch*: (a) *factical*: W ✓ (191×) · (b) *factual* | *Tatsache* = **fact**. *Faktum* = **fact** (markup), with *factum* only in the Kantian *Faktum der Vernunft* (*fact of reason*, which is also the Kant translators' rendering) and where Fichte contrasts *Faktum* with *Tatsache*. *faktisch* = **factical** (it is opposed to *genetisch*, and *factual* would wrongly suggest "true"). *Faktizität* = **facticity** (W ✓). |
| F13 | **Selbsttätigkeit, selbsttätig** (133 / 188) | (a) *self-activity, self-active*: Ba ✓, BZ ✓ (via Lotz: "the drive to absolute self-activity", p. 51), Martin on B ✓, Kr ✓ · (b) *spontaneity, spontaneous*: B88 ✓ | **(a)**, because *Spontaneität* (99) also occurs and needs *spontaneity*. |
| F14 | **das Soll / das Sollen** (n† 355 *Soll*, incl. verb; 891 *Sollen*) and the other nominalized particles | (a) *das Sollen* = *the ought*; *das Soll* = *the "ought"* in quotation marks · (b) *the should*: W ✓ ("should, ought", glossary p. 245) · *das Durch* = *the "through"*: W ✓; *das Von* = *the "from"*: W ✓ | **(a)**. All nominalized particles go in double quotation marks: *the "through"*, *the "from"*, *the "that"* (*Dass*), *the "what"* (*Was*), *the "how"* (*Wie*), *the "as"* (*Als*), *the "is"* (*Ist*). In 1804 *Soll* is hypothetical as well as imperative (W ✓, p. 245), and a note says so. **Cross-author**: Hegel *Sollen* = *ought* (dG). This is consistent. |
| F15 | **Volk / Nation / Urvolk; deutsch, Deutschheit** (Reden) | *Volk*: (a) *people* · (b) *nation* · (c) *folk*. JT ✓ uses *nation* 286× and *people* 247× (*folk* 1×). I did not check how often JT's *nation* stands for *Volk*. Mo and NKT: unchecked · *Urvolk*: *original people*: JT ✓ | ***Volk* = *people*** (pl. *peoples*), ***Nation* = *nation***, never interchanged and never *folk* or *race*. *Urvolk* = *original people*. *Deutschheit* = *Germanness*. *das Volk schlechtweg* = *the people pure and simple*. See section 4. |
| F16 | **Dasein / Existenz** (805 / 262) | Hegel D1 (a) proposes *Dasein* = *existence*, *Existenz* = *concrete existence* | In Fichte both = **existence**, distinguished in the markup. Fichte has no Hegelian contrast between them. His pair is *Sein / Dasein* (*being / existence*: SW V 440 ff.; Sm ✓ "Existence" 55×). Rendering his *Existenz* as *concrete existence* would invent a doctrine. **Cross-author exception** to "one rendering". |
| F17 | **Grenze / Schranke / Begrenzung / Beschränkung** (540 / 82 / 114 / 249) | B88 ✓: *Grenze* = boundary, limit; *Schranke* = limit, limitation; *Begrenzung* = limitation · Hegel glossary: *Grenze* = limit, *Schranke* = limitation | Align with Hegel: ***Grenze* = *limit*** (*boundary* in spatial and legal contexts), ***Schranke* = *limitation***, ***Begrenzung* = *delimitation***, ***Beschränkung* = *restriction*** (*beschränkt* = *limited*). The danger is that B88's *limitation* for *Begrenzung* collides with Hegel's *Schranke*. |
| F18 | **The Bild family** (late WL): *Bild, Bilden, Bildsein, Bildlichkeit, Bildwesen, Bildungskraft* | *Bild* = *image*: B88 ✓, W ✓ · *Bilden*: *imaging* (W ✓), *rendering in images* (Zöller in CC ✓) · *Bildwesen*: *imagism* (Zöller in CC ✓) · *Prinzipsein* = *being-a-principle* (W ✓) gives the model for *-sein* | ***Bild* = *image***, ***Bilden* = *imaging***, ***Bildsein* = *being-an-image*** (on W's *being-a-principle*), ***Bildlichkeit* = *imagehood***, ***Bildwesen* = *image-nature*** (Zöller's *imagism* reads like a doctrine), ***Bildungskraft* = *image-forming power*** (Fichte: "the *Bildungskraft*, known under the name *Einbildungskraft*", NW I 488). *Bildung* stays *education / formation* and is never *imaging*. Never *picture*. |

---

## 2. Glossary

Columns: German · n · English · Established · Danger / notes.

### A. Early WL: principles, operations, method

| German | n | English | Established | Danger / notes |
|---|---|---|---|---|
| Wissenschaftslehre, W.-L. | 897 / 1 496 | ⚑ F1 (untranslated) | B88 ✓ B21 ✓ SEP ✓ W ✓ (*science of knowing*) HL (✓ via B88) | Expand the abbreviation. *Wissenschaftslehrer* (21) = *practitioner of the Wissenschaftslehre* ("wir, die Wissenschaftslehrer", NW II 11). Never *scientist*. |
| Wissenschaft | | science | B88 ✓ W ✓ | Any systematic body of knowledge (B88 p. xv ✓), not natural science. |
| Grundsatz, erster Grundsatz | 384 | first principle, principle | B88 ✓ ("first principle, basic principle") | Fichte's three *Grundsätze* (SW I 91 ff.): *first, second, third principle*. *Grundsätze* in the ethics = *principles*. |
| Satz | 853 | proposition, principle | B88 ✓ | *Satz der Identität* = *principle of identity*. *Satz des Bewusstseins* (Reinhold) = *principle of consciousness*. *Satz der Gegensetzung* = *principle of opposition* (SW I 6). Never *sentence*, except in grammar. |
| Lehrsatz | | theorem | B88 ✓ | B21 table of contents ✓ (§ 6 "Third Theorem"). |
| Tathandlung | 19 | ⚑ F3 *F/Act* | B21 ✓ B88 ✓ (*Act*) SEP ✓ (*fact/act*) W ✓ (*enactment*) | Keep the lemma. NW II 194: Fichte says the *Thathandlung* is what he now calls *Genesis*. |
| Tatsache | 303 | fact | B92 ✓ W ✓ B88 ✓ | ⚑ F12. *Tatsachen des Bewusstseins* (52) = *facts of consciousness* (the 1810/13 lecture title). |
| Faktum, Fakta | 482 | fact (factum) | B88 ✓ B21 ✓ (*factum*) | ⚑ F12. Markup distinguishes it from *Tatsache*. |
| faktisch, Faktizität | 1 210 / 88 | factical, facticity | W ✓ | ⚑ F12. Opposed to *genetisch*. Never *factual*, never *in fact*. |
| Genesis, genetisch | 306 / 254 | genesis, genetic | W ✓ (pp. 12–13, glossary p. 243) | Transcendental, not historical (W ✓). Never *origin* or *developmental*, even though W allows them as glosses. |
| Handlung, Handeln | 962 / 1 002 | action, act; acting | B88 ✓ (*Handlung* = action) | *Handlung* = *act* only in "the act of positing". Keep it apart from *Tat* (*deed*) and *Tathandlung* (*F/Act*). |
| Handlungsart, Handelsweise, Handlungsweise | 19 / 50 / 19 | mode of acting | B88 ✓ (*Handlungsart*) | *Handelsweise* (Fichte's own spelling) is not about trade (*Handel*). This is a trap for MT. |
| Tat | | deed | B88 ✓ ("act, deed") | Reserve *deed* for it. |
| Tätigkeit | 1 356 | activity | B88 ✓ | *unabhängige Tätigkeit* = *independent activity*. *ideale / reale Tätigkeit* (75 / 10) = *ideal / real activity*. |
| Selbsttätigkeit, selbsttätig | 133 / 188 | ⚑ F13 self-activity, self-active | Ba ✓ BZ ✓ B88 ✓ (*spontaneity*) | |
| Spontaneität | 99 | spontaneity | | Keep it distinct from *Selbsttätigkeit*. |
| Agilität | 25 | agility | BZ ✓ (via Lotz) | "Thätigkeit ist Agilität, innere Bewegung" (SW I 531). Not *nimbleness*. |
| Tun und Leiden; Wechsel-Tun und Leiden | 1 363 / 266 | activity and passivity; interplay of activity and passivity | B88 ✓ (*Leiden* = passivity, passive state) | Trap T7: *Leiden* in the WL is never *suffering*. *Tun* = *doing* outside this pair. |
| setzen, das Setzen, gesetzt | 4 170 main forms; n† 339 *Setzen* | posit, positing, posited | B88 ✓ B21 ✓ SEP ✓ W ✓ | Never *put*, *place* or *assume*. SEP ✓ glosses it as "to be aware of", but that is a gloss, not a rendering. Trap T1 covers *gesetzt, dass* = *supposing that*. *Gesetztsein* (n† 45) = *positedness* (cf. Hegel). |
| sich setzen (als) | | posit itself (as) | B21 ✓ ("self-positing") | Reflexive *sich* = *itself* (it refers to *das Ich*). *das Sichsetzen* = *self-positing*. |
| entgegensetzen, entgegengesetzt | 94 / 831 | oppose, posit in opposition; opposed | B88 ✓ (HL "counter-posit", via B88) | Where Fichte's point is the act (§ 2), use *posit in opposition*. Otherwise *oppose*. |
| gegensetzen, Gegensetzung | 42 / 23 | counter-posit, counter-positing | | Fichte's own variant (Hegel 2, Schelling 1). Keep it distinct from *Entgegensetzung* (17) = *opposition* and *Gegensatz* (601) = *opposition, contrary*. Markup. |
| Gegensatz | 601 | opposition | | **Cross-author**: Hegel *opposition* (P ✓). |
| bestimmen, bestimmt | 2 374 | determine, determinate | B88 ✓ | *bestimmt* = *specific* only in non-technical use. |
| Bestimmung | 1 589 | determination; vocation | B88 ✓ (lists ten senses) Martin on B ✓ ("specific determination (or 'vocation')") | Two senses only: **determination** (WL), **vocation** (*Bestimmung des Menschen, des Gelehrten*). Never *destination* (old: Sinnett 1846 ✓ title), never *definition*. **Cross-author**: Hegel row already gives *vocation* for the Fichte sense. |
| Bestimmtheit | 363 | determinacy | B88 ✓ | **Cross-author**: Hegel has *determinateness* (dG ✓). Unify on *determinateness*? Low risk either way, but decide together with Hegel. |
| Bestimmbarkeit | 100 | determinability | | High ratio (10.5). |
| Wechselbestimmung | 91 | reciprocal determination | B88 ✓ | ⚑ F11 family. |
| Wechselwirkung | 208 | ⚑ F11 reciprocal interaction | B88 ✓ (*interaction*) Ba ✓ | |
| Wechsel | 235 | alternation, interplay | | Not *change* (*Veränderung*, *Wandel*). "zwischen welcher der Wechsel schwebt" (SW I 196). |
| Wechselbegriffe | | reciprocal concepts | B88 ✓ | |
| Kausalität, Wirksamkeit | 432 / 435 | causality, efficacy | B88 ✓ Ba ✓ | *Wirksamkeit* = *efficacy*, never *effectiveness* (Hegel P has *effectiveness*; in Fichte the agent's causal reach is meant). **Cross-author** note. |
| Wirkung | 355 | effect | B88 ✓ (HL "causal process", via B88) | |
| Substantialität | 44 | substantiality | | |
| Realität, Negation, Limitation | 666 / 167 / 2 | reality, negation, limitation | B21 ✓ (p. 28) | The categories of § 3. |
| Teilbarkeit, teilbar | 24 / 62 | divisibility, divisible | B21 ✓ ("divisible I") | *das teilbare Ich* = *the divisible I*. |
| Synthesis, synthetisch; Antithesis, Thesis | 416 / 362; 31 / 29 | synthesis, synthetic; antithesis, thesis | | |
| Mittelglied | 75 | mediating term | B88 ✓ (*Mittelbegriff* = middle term, mediating concept) | |
| Glied | 669 | term, member | B88 ✓ ("term, element") W ✓ (*term*) | *Glied* of a series or synthesis = *term*. Of a body or state = *member*. *Seitenglieder* = *subordinate terms* (W ✓). |
| Deduktion, deduzieren | 243 / 123 | deduction, deduce | B88 ✓ (*ableiten* = derive) | *ableiten / Ableitung* = *derive / derivation*. Keep the two distinct. |
| Konstruktion, konstruieren | 398 / 340 | construction, construct | W ✓ | |
| Nachkonstruktion | 54 | reconstruction | W ✓ | Not *imitation*. |
| Standpunkt, Gesichtspunkt | 471 / 179 | standpoint, point of view | B92 ✓ ("transcendental point of view" in SW IV 130) | *transzendentaler Gesichtspunkt* = *transcendental point of view*. *gemeiner Standpunkt* = *common standpoint*. |
| gemeines Bewusstsein | 51 | ordinary consciousness | | *gemein* = *common, ordinary*, never *mean* or *vulgar*. Trap T22 for *die Gemeine*. |
| Spekulation, Leben | 171 / 3 106 | speculation, life | | The Jena contrast between speculation and life. |
| Dogmatismus, Dogmatiker | 76 / 40 | dogmatism, dogmatist | | |
| Idealismus, Realismus, Kritizismus | 297 / 88 / 6 | idealism, realism, critical philosophy (criticism) | | *Real-Idealismus / Ideal-Realismus* (1 / 1) = *real-idealism / ideal-realism*. |
| Ding an sich | 63 (+42 pl.) | thing in itself | | As in the Hegel glossary. |
| Kantianer | 39 | Kantians | | |
| Räsonnement, räsonieren | 145 | argumentation, (mere) reasoning | B88 ✓ ("arguing") W ✓ ("(to) reason") | Pejorative. **Cross-author**: Hegel P ✓ *argumentation*. |
| Schwärmerei | 81 | enthusiasm (*Schwärmerei*) | B88 ✓ ("muddled enthusiasm, overheated enthusiasm and fanaticism, fantasy") | No single word fits. Use *enthusiasm* plus markup. *fanaticism* where Fichte attacks *Schwärmer*. |
| pragmatische Geschichte des menschlichen Geistes | 2 (SW I 222) | pragmatic history of the human mind | W ✓ (p. 13: "pragmatic history of the human spirit") | *Geist* here = *mind*. Trap T21. |

### B. Early WL: the I, consciousness and its faculties

| German | n | English | Established | Danger / notes |
|---|---|---|---|---|
| Ich, das Ich | n† 1 383 | ⚑ F2 the I | B88 ✓ B21 ✓ Ba ✓ W ✓ | Pronoun **it**. *das absolute / reine / empirische / endliche Ich* = *the absolute / pure / empirical / finite I*. Plural *Iche* (81, late) = *I's*: "die Gemeine der Iche" (NW II 490) = *the community of I's*. |
| Nicht-Ich | 596 | not-I | B88 ✓ SEP ✓ | Not *non-ego*, not *other*. |
| Ichheit | 98 | I-hood | B88 ✓ B21 ✓ (p. 30) Ba ✓ SEP ✓ | Not *egoity*, *selfhood* or *I-ness*. |
| Ichform | 78 | form of the I | | Exclusive to Fichte (Schelling 0, Hegel 0). Keep the lemma. |
| Ichanschauung | 14 | intuition of the I | | Late. |
| Selbst, das Selbst | n† 52 | the self | | Reserve *self* for it (F2). |
| Selbstbewusstsein | 261 | self-consciousness | | **Cross-author** = Hegel. |
| Selbstgefühl | 26 | self-feeling | B21 ✓ (p. 37: "from feeling to self-feeling") B88 ✓ (*self-awareness*) | Use *self-feeling* with B21. B88's *self-awareness* collides with *Selbstbewusstsein*. |
| Selbstanschauung, Sichanschauen | 112 / 26 | self-intuition, intuiting itself | | |
| Bewusstsein | 2 587 | consciousness | | *unmittelbares Bewusstsein* = *immediate consciousness*. |
| Anschauung, anschauen | 2 437 | intuition, intuit | B88 ✓ W ✓ ("perception, intuition") | *intellektuelle Anschauung* (62) = *intellectual intuition*. **Cross-author**: identical in Hegel and Schelling. W's *perception* is not followed (that is *Wahrnehmung*). |
| Anschauungsform, Denkform, Verstandesform | 48 / 16 / 61 | form of intuition, form of thought, form of the understanding | | |
| Vorstellung, vorstellen | 832 | representation, represent | B88 ✓ B21 ✓ SEP ✓ (HL "presentation", via B88) | Never *idea*. **Cross-author** = Hegel. |
| Darstellung, darstellen | 350 | presentation, exposition; present | B88 ✓ B21 ✓ (p. 13) | *Versuch einer neuen Darstellung* = *Attempt at a New Presentation*. |
| Einbildungskraft, produktive | 357 / 15 | imagination, productive imagination | B88 ✓ B21 ✓ | It hovers (F5) between I and not-I (SW I 216). Late *Bildungskraft* (F18) is distinct. |
| Gefühl | 731 | feeling | B88 ✓ ("feeling, sense") B21 ✓ | Never *emotion*. *Gefühl der Gewissheit* = *feeling of certainty*. |
| Empfindung | 266 | sensation | B88 ✓ | Keep it distinct from *Gefühl*. **Cross-author** = Hegel. |
| Streben, streben | 200 | striving, strive | B88 ✓ B21 ✓ (p. 37) SEP ✓ | Never *effort*, *tendency* or *endeavor*. *Gegenstreben* (9) = *counter-striving* (B21 table of contents ✓ "Opposed Striving"). |
| Sehnen | 105 | longing | B21 ✓ (p. 37) | Its own deduced feeling (SW I 302 f.). Keep it distinct from *Sehnsucht* (24, religion) = *yearning*. |
| Trieb | 1 112 | drive | B88 ✓ ("drive, impulse") B21 ✓ BZ ✓ Ba ✓ (114×) Sm, Kr (*impulse*) | Never *instinct* (*Instinkt*) or *urge*. **Cross-author** = Hegel *drive*. |
| Hemmung, hemmen | 18 / 48 | inhibition, inhibit | B88 ✓ | |
| Gebundenheit | 64 | constrained state, boundness | BZ ✓ ("constrained state", p. 14, via Lotz) | |
| Reflexion, reflektieren | 845 / 503 | reflection, reflect | | *Gesetz der Reflexion* = *law of reflection*. **Cross-author**: Hegel *Reflexion* is a logical category. In Fichte it is an act of the I. Same word, markup. |
| Abstraktion, abstrahieren | 240 / 230 | abstraction, abstract | | |
| Aufmerksamkeit | 181 | attention | B88 ✓ ("attentiveness") W ✓ | |
| Besonnenheit, Besinnung | 83 / 68 | reflective awareness, presence of mind; reflection, coming to one's senses | W ✓ (*Besonnenheit* = reflection; *Besinnung* = consciousness) | W's renderings collide with *Reflexion* and *Bewusstsein*. Use the English given here plus markup. |
| Intelligenz | 365 | ⚑ F10 the intelligence | B88 ✓ (*intellect*) Ba ✓ | |
| Vermögen | 1 065 | faculty, power, capacity | B88 ✓ | Trap T15: in economics and right, *Vermögen* = *assets, wealth*. |
| Gemüt | 314 | mind | B88 ✓ | It is not *Geist*. Use *mind*, never *soul* or *heart*. |
| Geist | 525 | spirit; mind | B88 ✓ ("mind, spirit") | *Geist und Buchstabe* = *spirit and letter*. In the psychology of the Jena writings it can mean *mind*. Default *spirit*. **Cross-author**: Hegel *spirit*. |
| Verstand / Vernunft | 1 331 / 1 384 | understanding, reason | B88 ✓ | **Cross-author** = Hegel. *Instinkt* (64) = *instinct*. |
| Objekt / Gegenstand | 2 529 / 665 | object / object | B88 ✓ | Markup. **Cross-author**: Hegel D3. |
| Mannigfaltiges, Mannigfaltigkeit | 951 / 262 | the manifold, manifoldness | B88 ✓ | Ratio 86–139. Never *variety*. |
| Sinnenwelt, Körperwelt | 506 / 34 | sensible world, physical world | Ba ✓ (*sensible world*, 89×) B88 ✓ (*material world* / *physical world*) | Use *sensible world* (Kantian), not *material world*. |
| übersinnlich | 336 | supersensible | B88 ✓ (*supersensuous*) | Use *supersensible* to match the Kant translations. |
| Sinnlichkeit, sinnlich | 145 / 804 | sensibility, sensible / sensuous | B88 ✓ | |
| Einsicht, einsehen | 952 / 261 | insight, see (into) | W ✓ (pp. 14, 242) | A strong cognitive achievement in the late WL. Never *opinion* or *view*. |
| Ansicht | | view | W ✓ ("aspect, view") | |
| ideal / reell / real | 78 / 138 | ideal / real / real | | **Cross-author**: Hegel distinguishes *reell / real* in markup. Do the same. |
| zentrifugal / zentripetal | 8 / 10 | centrifugal / centripetal | B21 ✓ (p. 36) | |

### C. Late WL (1801–1813): knowing, image, seeing, light

| German | n | English | Established | Danger / notes |
|---|---|---|---|---|
| Wissen, das Wissen | n† 1 905 | knowing, knowledge | W ✓ (*knowing*) | Late WL: *the knowing*, *absolute knowing*. *Wissen des Wissens* = *knowing of knowing*. **Cross-author** = Hegel. |
| Bild | 3 009 | ⚑ F18 image | B88 ✓ W ✓ | Ratio 13–31. Never *picture*. |
| Bilden, bilden | n† 251 (+154 *Bildens*) | imaging, image | W ✓ (*imaging*) Zöller in CC ✓ | |
| Bildsein, Bildlichkeit, Bildwesen | 126 / 59 / 49 | being-an-image, imagehood, image-nature | Zöller in CC ✓ (*imagism*) | ⚑ F18. Exclusive to Fichte. |
| Bildungskraft | 87 | image-forming power | | ⚑ F18 (NW I 488). |
| Nachbild, Urbild, Vorbild, Abbild, Gegenbild | 58 / 57 / 52 / 74 / 10 | copy, archetype, model, copy (likeness), counter-image | W ✓ (*Nachbild* = copy) | *Abbild* and *Nachbild* are both *copy*, so mark them up. **Cross-author**: Schelling *Urbild / Gegenbild* (242 / 109). Coordinate *archetype / counter-image*. |
| Schema, schematisieren | 184 / 80 | schema, schematize | | Late WL: the I as *schema* of the absolute. |
| Sehen, das Sehen | n† 858 (+335 *Sehens*) | seeing | W ✓ ("seeing, vision") | Ratio 22–35. Trap T11. |
| Sichtbarkeit | 285 | visibility | | Ratio 32. |
| Gesicht, Gesichte | 138 | sight, vision (pl. visions) | | **Never *face***. Fichte: "nicht facies oder vultus, sondern visum, idea, wie bei Luther" (NW I 53). "die Gesichte der übersinnlichen Welt" (NW III 160) = *the visions of the supersensible world*. |
| Auge, Blick | 340 / 401 | eye, look / glance | W ✓ (*Auge* = "perceptiveness, eye, perspective") | Use *eye* literally. W's *perceptiveness* is not followed. |
| Hinschauen, Hinschauung | 107 | looking-at (intuitive regard) | | Exclusive to Fichte. |
| Sicherscheinen, Sicherscheinung | 130 | self-appearing, appearing to itself | | Write *self-appearing*, hyphenated. The lemma is kept. |
| Licht, Urlicht | 729 / 8 | light, primordial light | W ✓ | |
| Erscheinung | 2 570 | appearance | W ✓ (also "vision, epiphany" in WL 1804 lect. II, XXVII) Sm ✓ (*Manifestation*, often) | One rendering, *appearance*. W's *epiphany* is not followed. **Cross-author** = Hegel *appearance*. |
| Erscheinen | 654 (n† 144) | appearing | W ✓ | |
| Sein, das Sein | n† 3 335 (+1 056 *Seins*) | being | W ✓ (*Being*) | Lowercase *being* (Hegel D5). In the late WL and the *Anweisung*, *das Sein* is God. *Sein und Dasein* (SW V 440 ff.) = *being and existence*. |
| Dasein | 805 | ⚑ F16 existence | B88 ✓ Sm ✓ | *Daseyn des Seyns* = *the existence of being* (SW V 440). |
| Existenz | 262 | ⚑ F16 existence | | Markup. |
| Seinsform, Grundsein, Seinsetzen | 50 / 47 / 23 | form of being, ground-being, positing of being | | All exclusive to Fichte. |
| das Absolute, absolut | 558 / 5 224 | the absolute, absolute | W ✓ | Lowercase (Hegel D5). Never use *absolutely* for *schlechthin* (F6). |
| an sich, das Ansich | 1 265 | in itself, the in-itself | W ✓ (*in-itself*, 128×) | **Cross-author** = Hegel. |
| Fürsich, das Fürsich | n† 79 | the for-itself | | Late WL (SW II). **Cross-author** = Hegel *for itself*. |
| Durch, das Durch | n† 688 (incl. sentence-initial *durch*; *das Durch* 15) | the "through" | W ✓ (pp. 14–15, glossary p. 242) | ⚑ F14. Trap T10. |
| Durcheinander | 44 | "through one another" | W ✓ (glossary p. 242, long note) | Never *confusion*. |
| Von, das Von | (*das Von* n† 5) | the "from" | W ✓ (glossary p. 246) | ⚑ F14. |
| Soll, das Soll | n† 355 | the "ought" | W ✓ (*should*) | ⚑ F14. Trap T12. |
| Begriff, Begreifen | 4 425 / 485 | concept, conceiving / comprehending | W ✓ (*begreifen* = conceive) | *das Unbegreifliche* (224) = *the inconceivable* (W ✓). *Begreiflichkeit* = *conceivability*. **Cross-author**: Hegel *begreifen* = *comprehend*. In Fichte, *conceive* (the late WL makes the *un-begreifliche* the goal of the *Begreifen*). Decide whether to unify. |
| Verstehen, Sichverstehen | n† 446 / 110 | understanding, self-understanding | | The verbal noun, not *Verstand*. Sonnenklarer Bericht subtitle: "zum Verstehen zu zwingen" = *to force the reader to understand* (B21 ✓ p. 46 n. 117, citing Botterman/Rasch). |
| Verständlichkeit | 78 | intelligibility | W ✓ | |
| Reflexibilität | 103 | reflexibility | | Exclusive to Fichte (NW I 244, 296). Not *reflexivity*. |
| Prinzip, Prinzipiat | 2 358 / 108 | principle, principiate | W ✓ (*Principiat* = "something principled, an outcome") | Use *principiate*, a technical neologism, to keep the pairing with *principle*. Keep the lemma. |
| Prinzipsein, Prinzipheit | 135 / 55 | being-a-principle, principlehood | W ✓ (*Principsein* = being-a-principle) | |
| prinzipiieren | 19 | principle-providing; provide (itself) with a principle | W ✓ (pp. 15, 244) | |
| Projektion, projizieren | 62 / 120 | projection, project | | *Projektion per hiatum* = *projection per hiatum* (W ✓ "through a gap"). |
| Hiatus, per hiatum | 38 / 27 | hiatus, per hiatum | W ✓ (*Hiatus* = gap) | Keep the Latin. |
| Disjunktion, Spaltung | 189 / 105 | disjunction, split | W ✓ (*disjunction*) | |
| Fünffachheit, fünffach | 48 | fivefoldness, fivefold | W ✓ (*five-fold*) | American *fivefold*, unhyphenated. |
| Quantitabilität, quantitieren | 55 / 41 | quantifiability, quantify | W ✓ | |
| Anschaubarkeit, Wiederholbarkeit | 33 / 27 | intuitability, repeatability | | |
| Evidenz | 177 | ⚑ F8 self-evidence | W ✓ (*manifestness*) | |
| Lebendigkeit, Leben | 28 / 3 106 | livingness, life | W ✓ | |
| Vernunft-Effekt (Vernunft = Effekt) | n† 10 | reason's effect | W ✓ (p. 16, glossary p. 246) | Fichte's "=" is read case by case (W p. 16 ✓). |
| intelligieren, Intelligieren | 40 | intellect (vb.), intellecting | W ✓ ("think, intellectualize") | Do not use *think* (*denken*). |
| Vernehmen | 55 | apprehending (awareness) | W ✓ (*awareness*) | |
| Einheit | 1 677 | unity | W ✓ (*oneness*, 341×) | Use *unity* (Hegel). W's *oneness* collides with *Einssein*. Markup. |
| Mannigfaltigkeit | 262 | multiplicity (manifoldness) | | |
| Wandel, Wandelbarkeit | 221 | change, changeability | W ✓ | |
| Geschlossenheit | 43 | closedness | W ✓ (*enclosure*) | Also *Geschlossener Handelsstaat* = *Closed Commercial State*. |
| Urbegriff | 11 | primordial concept | W ✓ | |
| Ahnung (Ahndung) | 69 | presentiment | W ✓ (p. 241 n.) | |
| realisieren, Realisierung | 204 | realize, realization | W ✓ | |
| durchdringen | 197 | penetrate, permeate | W ✓ | |
| Thatsachen des Bewusstseins | 52 | facts of consciousness | | Title of the 1810 and 1813 lectures. |

### D. Practical philosophy I: drives and ethics (*Sittenlehre* 1798 and 1812)

| German | n | English | Established | Danger / notes |
|---|---|---|---|---|
| Sittenlehre | 150 | ethics, doctrine of ethics | BZ ✓ (title) | *System der Sittenlehre* = *System of Ethics*. *Sittenlehre 1812* = *Theory of Ethics* (Crowe, title via SEP ✓). |
| Sittlichkeit, sittlich | 334 / 623† | ⚑ F9 morality, ethical | CC ✓ | |
| Moralität, moralisch | 276 / 642† | ⚑ F9 morality, moral | | Markup. |
| Sittengesetz, Moralgesetz | 416 / 120 | moral law | BZ ✓ (via Lotz) | Markup. *Rechtsgesetz* = *law of right* (E). |
| Pflicht, Pflichten | 988 | duty, duties | BZ ✓ (table of contents: "Duties of the Scholar", via Lotz) | *bedingte / unbedingte Pflichten* = *conditioned / unconditioned duties*. *allgemeine / besondere* = *universal / particular*. |
| Gewissen | n† 208 | conscience | | Trap T23: *gewissen* (adj.) = *certain*. |
| Gesinnung | n† 186 | disposition | | **Cross-author** = Hegel *disposition* (P ✓). |
| Achtung, Selbstachtung | n† 193 | respect, self-respect | | Kantian. |
| Maxime | n† 209 | maxim | | |
| Triebfeder | n† 73 | incentive | | Kantian (*Triebfeder* = incentive). Never *motive spring*. |
| Neigung | n† 157 | inclination | B88 ✓ | |
| Endzweck | n† 261 | final end | | **Cross-author** = Hegel. |
| Zweck, Zweckbegriff | 2 252 / 105 | end, purpose; concept of an end | | Ethics: *end*. **Cross-author**: Hegel *Zweck* = *purpose*. Coordinate: Fichte's *Endzweck / Zweckbegriff* need *end*. |
| Begehrungsvermögen; Begehren | 84 / 113 | faculty of desire; desiring | | Kantian. |
| Wille, Wollen, Willensbestimmung | 2 488 / 332† / 73 | will, willing, determination of the will | | |
| Willkür | n† 175 | arbitrary choice; free choice | B88 ✓ ("caprice, choice") Ba ✓ (*arbitrary choice*) | **Cross-author**: Hegel *arbitrary will / free choice* (P ✓). Use *arbitrary choice* by default and *caprice* only where Fichte is pejorative. |
| Freiheit, formale / materiale Freiheit | 3 583 | freedom, formal / material freedom | | |
| Selbständigkeit, selbständig | n† 244 / 336 | self-sufficiency, self-sufficient | Martin on B ✓ Kr ✓ (*Science of Ethics*, 20×) CC ✓ | *Trieb nach absoluter Selbständigkeit* = *drive for absolute self-sufficiency* (SW IV 191). **Cross-author** = Hegel D11 (a). *Unabhängigkeit* (68) = *independence*. |
| Selbstbestimmung | 120 | self-determination | | |
| Trieb, Urtrieb, Grundtrieb | 1 112 / 16 / 25† | drive, original drive, fundamental drive | BZ ✓ B21 ✓ | "ein und ebenderselbe Urtrieb" (SW IV 130). |
| Naturtrieb, reiner Trieb, sittlicher Trieb | 135 / 14† / 23 | natural drive, pure drive, ethical drive | | *sittlicher Trieb* = *ethical drive*, in line with F9. |
| Bildungstrieb, gesellschaftlicher Trieb | 8 / 9 | formative drive, social drive | B88 ✓ (*social drive*, 14×) Sm ✓ ("Social Impulse", 1847 p. 30) | |
| Vernunftwesen, Sinnenwesen | 124 / 9 | rational being, sensible being | Ba ✓ (*rational being*, 200×) B88 ✓ (*Sinnwesen* = physical being) | |
| Person, Individuum | 797 / 781 | person, individual | Ba ✓ | |
| Leib | 337 (n† 260) | body | Ba ✓ ("our human body [*Leib*]") | Markup distinguishes it from *Körper*. Never *corpse*. "Lived body" is the reviewer's phenomenological gloss (Lotz), not BZ's rendering. Do not use it. |
| Körper | 276 | (material) body | Ba ✓ (*material body*) | **Cross-author**: Schelling's *Körper* (2 236) is mostly physics. |
| Artikulation, artikuliert | 25 / 20 | articulation, articulated | Ba ✓ (15× / 20×) | *artikulierter Leib* = *articulated body*. |
| Legalität | 30 | legality | | |
| Gehorsam | 139 | obedience | | |
| Trägheit, Faulheit, Feigheit, Falschheit | 52† / 8 / 32 / 21 | inertia (sloth), laziness, cowardice, falsity | | Fichte's account of radical evil. Use *inertia* for the moral sense of *Trägheit* (it is a vice, not physics) and *sloth* where the vice is named. |
| das radikale Böse, böse | 6 / 230 | radical evil, evil | | |
| Tugend, Laster | 204 / 74 | virtue, vice | | |
| Werkzeug (des Sittengesetzes) | | instrument (of the moral law) | | Not *tool*. |
| Beruf | n† 129 | calling, profession | | Keep it distinct from *Bestimmung* (*vocation*). This is a real collision in English. |
| Stand, Stände | n† 536 / 157 | estate; class; profession | B88 ✓ (*class*) Ba ✓ (*status*) Sm ✓ ("Distinction of Classes", 1847 contents) | Context sense: social order = *estate* (*Gelehrtenstand* = *scholarly estate*). Status = *status*. Trap T16 for *im Stande, zu Stande*. |
| Gelehrter | 735 | scholar | B88 ✓ Sm ✓ SEP ✓ | Never *learned man* or *academic*. *Gelehrtenrepublik* = *republic of letters*. |
| Volkslehrer | n† 39 | teacher of the people | | |
| Ehe, Weib, Mann | n† 150 / 150 / 550 | marriage, woman, man | | *Weib* = *woman* (the period's neutral term, not *wife*; *Gattin, Ehefrau* (14) = *wife*). See section 4. |
| Geschlecht | n† 389 | sex; (human) race; lineage | | Trap T17. *Menschengeschlecht* (269) = *human race* (Sm ✓ "Race", 196×), never *human gender*. |
| Gattung | 241 | species | | **Cross-author**: Hegel *Gattung* = *genus*. In Fichte it is the human or rational species, so use *species*, with markup. |
| Charakter | 902 | character | | |
| Genuss, Bedürfnis, Arbeit | 262 / 363 / 785 | enjoyment, need, labor | | American *labor*. |

### E. Practical philosophy II: right, state, economy

| German | n | English | Established | Danger / notes |
|---|---|---|---|---|
| Recht | 3 576 | right; law | B88 ✓ ("right, law") Ba ✓ | *Recht* = *right* (the system); *law* only for *Gesetz*. *das Recht* (a right) = *a right*. |
| Naturrecht | 158 | natural right | Ba ✓ (167×) | Never *natural law* (that is *Naturgesetz*, 176 = *law of nature*). |
| Rechtslehre, Staatslehre | 105 / 30 | doctrine of right, doctrine of the state | SEP ✓ (*doctrine of right*) | |
| Rechtsbegriff, Rechtsgesetz | 99 / 145 | concept of right, law of right | Ba ✓ (73× / 70×) | Exclusive to Fichte. |
| Rechtsverhältnis, rechtlich, Rechtlichkeit, rechtmäßig | 40 / 283 / 31 / 145 | relation of right, rightful / juridical, rightfulness, rightful (lawful) | | |
| Urrecht | 57 | original right | Ba ✓ ("original right [*Urrecht*]", 49×) Kr ✓ | |
| Zwangsrecht | 83 | right of coercion | Ba ✓ (49×) Kr ✓ ("right of compulsion") | Not *coercive right*. |
| Zwangsgesetz, Zwang | 35 / 226 | law of coercion, coercion | Ba ✓ (*law of coercion*, 25×) | |
| Aufforderung, auffordern | 60 / 35 | summons, summon | Ba ✓ (21× / 25×) SEP ✓ CC ✓ | Technical in FNR §§ 3–4 (SW III 33–36). Everyday elsewhere (*invitation, request*: SW I 30). Never *call*, *appeal* or *demand* (*Anforderung* = *demand*, Ba ✓). |
| Anerkennung, anerkennen | 97 / 281 | recognition, recognize | | **Cross-author** = Hegel. |
| Staatsbürgervertrag, Bürgervertrag | 29 / 67 | civil contract | Ba ✓ (64×) SEP ✓ (*citizens' contract*) | |
| Eigentumsvertrag | 66 | property contract | Ba ✓ | |
| Schutzvertrag | 13 | protection contract | Ba ✓ | |
| Vereinigungsvertrag | 2 | unification contract | Ba ✓ | |
| Abbüßungsvertrag | 7 | expiation contract | Ba ✓ | |
| Gemeinwesen | 14 | commonwealth | Ba ✓ (25×) | **Cross-author**: Hegel P has *polity*. Decide jointly. *commonwealth* is established for Fichte. |
| Ephorat, Ephoren | 88 | ephorate, ephors | Ba ✓ Kr ✓ | |
| Polizei | 89 | police | Ba ✓ (66×) | Period sense: internal public administration. Add a note at the first occurrence and do not modernize. |
| exekutive Gewalt, Staatsgewalt | 30 / 52 | executive power, state power | | |
| Eigentum | 836 | property | | |
| Wirkungssphäre | 40 | sphere of efficacy | B88 ✓ | |
| Gesetzgebung, Gesetzgeber | 208 / 88 | legislation, legislator | | |
| Strafe, Bestrafung | 243 | punishment | | |
| Notrecht, Notstaat, Vernunftstaat | 6 / 7 / 34 | right of necessity, state of necessity, rational state | Ba ✓ (*right of necessity*, 1×) | *Notstaat* (1812 *Rechtslehre*; *Grundzüge*) means the provisional state of necessity, not *emergency state*. |
| Erlaubnisgesetz | | permissive law | Ba ✓ | Kantian. |
| Obrigkeit, Untertan, Regent | 66 / 119 / 91 | authorities, subject, ruler | | |
| Bürger, Staatsbürger, Mitbürger | 454 / 90 / 83 | citizen, citizen, fellow citizen | | |
| Volk (in FNR) | | the people | Ba ✓ (73×) | ⚑ F15. In FNR *das Volk* is the sovereign people (as against the ephors and the executive). |
| Handelsstaat, geschlossener | 66 | commercial state, closed | Ad (title, SEP ✓) | |
| Landesgeld, Weltgeld | 33 / 21 | national money, world money | Ad (unchecked) | |
| Ware, Preis, Wert, Geld | 256 (*Waare/n*) / 181 / 505 / 427 | commodity, price, value, money | | |
| Landbauer, Künstler, Kaufmann | 57 / 206 / 72 | farmer, artisan, merchant | | **Trap T14**: in the *Handelsstaat* and the *Rechtslehre* (SW III 232; NW II 550), *Künstler* = *artisan* "in der weitesten Bedeutung des Wortes". Never *artist*. |
| Produzent, Gewerbe | 50 / 62 | producer, trade | | |
| Vermögen (econ.) | | assets, wealth | | Trap T15. *National-Vermögen* = *national wealth* (NW II 543). |
| Erziehung, Erzieher, Zögling | 483 / 50 / 155 | education (upbringing), educator, pupil | Ba ✓ ("upbringing [*Erziehung*]") JT ✓ (*education*) | FNR (family right, summons) = *upbringing*. Everywhere else, *education*. *Nationalerziehung* (45) = *national education* (JT ✓). Keep it distinct from *Bildung* in the markup. |
| Sklave | 120 | slave | | |

### F. Religion and the *Atheismusstreit*

| German | n | English | Established | Danger / notes |
|---|---|---|---|---|
| Seligkeit, selig, seliges Leben | 161 / 293 | blessedness, blessed, blessed life | Sm ✓ (*Blessedness*, 90×) | Never *bliss*, *salvation* or *happiness* (*Glückseligkeit* = *happiness*). Fichte: "das Leben ist nothwendig selig" (SW V 401). |
| Seligkeitslehre, Lebenslehre, Religionslehre | 3 / 3 / 25 | doctrine of blessedness, doctrine of life, doctrine of religion | Sm ✓ ("The Doctrine of Religion", subtitle) | |
| Offenbarung | 489 | revelation | G (title) | *Versuch einer Kritik aller Offenbarung* = *Attempt at a Critique of All Revelation*. |
| moralische Weltordnung | 14 (*Weltordnung* 61) | moral world order | | Fichte: *Ordnung* means "ein thätiges Ordnen (ordo ordinans)" (SW V 382), an active ordering, not a static order. A note is required. |
| Weltregierung, göttliche | 48 | governance of the world, divine | SEP ✓ (title: "Divine Governance of the World") | |
| Vorsehung | 40 | providence | | |
| Gott, Gottheit, das Göttliche | 2 039 / 152 / 603 | God, the godhead, the divine | | *Gottheit* = *godhead* (Fichte uses it for the divine as such). |
| Glaube | 1 455 | faith; belief | B88 ✓ ("belief, faith") Sm ✓ ("Book III. Faith") | *Vocation of Man*, Book III = *Faith*. Use *belief* in epistemic contexts (*Glaube an die Realität* = *belief in reality*), and add markup. |
| Liebe | 987 | love | Sm ✓ | |
| Sehnsucht | 24 | yearning | | Keep it distinct from *Sehnen* (*longing*). |
| Andacht | 12 | devotion | | **Cross-author** = Hegel. |
| Sünde, Sündhaftigkeit | 129 / 18 | sin, sinfulness | Sm ✓ ("State of completed Sinfulness") | |
| Wunder, Gnade | 259 / 32 | miracle, grace | | |
| Christentum, Johannesevangelium | 306 | Christianity, the Gospel of John | | |
| Atheismus, Atheismusstreit | 128 | atheism, Atheism Controversy | W ✓ (index: "Atheism Controversy") | |
| Unsterblichkeit, Fortdauer | 39 / 373 | immortality; continuation, persistence | | *Fortdauer nach dem Tode* = *continued existence after death*. Elsewhere *persistence*. |
| heilig | 318 | holy | | |

### G. History, politics, the popular writings, the *Reden*

| German | n | English | Established | Danger / notes |
|---|---|---|---|---|
| Zeitalter | 693 | age | Sm ✓ (391×) | *Grundzüge des gegenwärtigen Zeitalters* = *Characteristics of the Present Age* (Sm ✓). |
| Epoche, Weltplan | 99 / 31 | epoch, world plan | Sm ✓ (*Epoch*) | |
| Vernunftinstinkt | 44 | reason as instinct | Sm ✓ ("Reason as Instinct") | Write it lowercase in running text. |
| Vernunftwissenschaft, Vernunftkunst | 30 / 9 | reason as knowledge, reason as art | Sm ✓ | **Cross-author**: Schelling *Vernunftwissenschaft* (93) = *rational science*. Different sense, keep the markup. |
| Stand der Unschuld, der vollendeten Sündhaftigkeit | 70 (*Unschuld*) | state of innocence, of completed sinfulness | Sm ✓ (Lecture I) | |
| Normalvolk | 20 | normal people | | Exclusive to Fichte (SW VII 133 f.). *Normal* = norm-giving. A note is needed, never *ordinary people*. |
| Urvolk | 8 | ⚑ F15 original people | JT ✓ | |
| Volk, Völker | 609 / 289 | ⚑ F15 people, peoples | JT ✓ | |
| Nation, national | 596 | nation, national | JT ✓ | |
| deutsch, Deutsche, Deutschheit, Deutschtum | 744 / 628 / 7 / 1 | German, Germans, Germanness, Germanness | | *Deutsche schlechtweg* = *Germans pure and simple* (SW VII 266). |
| Ausland, Ausländer, Ausländerei | 185 / 81 / 12 | foreign lands (the foreign), foreigners, foreignism | JT ✓ (*foreign countries*) | *Ausländerei* (SW VII 337 f.) = *foreignism* (pejorative: aping of foreign ways), with markup. |
| Vaterland, Vaterlandsliebe | 112 / 23 | fatherland, love of fatherland | JT ✓ | Not *homeland* or *patriotism*. *Patriotismus* (36) = *patriotism*. |
| lebendige / todte Sprache, neulateinisch | 17 / 11 / 7 | living / dead language, neo-Latin | JT ✓ | |
| Stamm, Stämme | 97 | tribe, stock | | *Stamm* is genealogical and linguistic, not racial. |
| Selbstsucht | 35 | self-seeking, selfishness | JT ✓ | |
| Zwingherr (zur Deutschheit) | 19 | coercive master (taskmaster) for Germanness | | SW VII 565 and the *Staatslehre* (SW IV 436 f.). See section 4. |
| Bildung | 707 | education, formation, cultivation | B88 ✓ | **Cross-author**: Hegel P has *cultural formation*. In Fichte usually *education* or *cultivation*, with markup. Never *imaging* (F18). |
| Kultur | 229 | culture | B88 ✓ Sm ✓ (1847 p. 25) | |
| Menschheit, Menschengeschlecht | 500 / 269 | humanity, human race | Sm ✓ | |
| Aufklärung | 37 | Enlightenment, enlightenment | | Capitalize it only for the movement. |
| Publikum | 309 | public | | |
| Denkfreiheit | 25 | freedom of thought | | |
| Revolution | 77 | revolution | | |
| Adel, Vorrecht | 229 / 62 | nobility, privilege | | |
| Kirche, Geistlichkeit | 487 / 7 | church, clergy | | |
| Universität, Akademie | 310 | university, academy | | |
| Genie, Talent | 154 / 149 | genius, talent | | |
| Barbar, Wilde | 64 / 85 | barbarian, savage | | Period terms, kept (section 4). |
| Machiavelli | 56 | Machiavelli | | Fichte's spelling varies (*Machiavell*, *Makchiavelli*). Normalize it. |

### H. Lecture idiom, particles, fixed phrases (high frequency, high error rate)

| German | n | English | Established | Danger / notes |
|---|---|---|---|---|
| lediglich | 1 218 | solely, exclusively | | Ratio 110 vs Hegel. Not *merely* (*bloß*). "Das Sein ist lediglich in ihr" (NW I 54) = *being is solely in it*. |
| durchaus | 2 023 | thoroughly, utterly; (with negation) not at all | | *durchaus nicht* = *not at all*, never *absolutely not*. |
| inwiefern | 923 | insofar as | | Trap T5. Hegel uses it 40×, Fichte 923×. Usually not *to what extent*. |
| insofern | 605 | insofar as | | |
| allerdings | 949 | to be sure, certainly | | Trap T6. A concessive, not *however*. |
| eigentlich | 1 746 | properly, actually, genuine | | *das eigentliche Wesen* = *the genuine essence*. |
| vermöge, zufolge | 1 201 / 827 | by virtue of, in consequence of | | Keep it distinct from *Vermögen*. |
| vorausgesetzt (daß) | 568 | presupposed; provided (that) | | Trap T1. |
| schlechterdings | 188 | absolutely, by all means | B88 ✓ (*schlechthin* "simply, absolutely") | F6. |
| keineswegs | 68 | by no means | | |
| ohngefähr, von ungefähr | 217 | approximately; by chance | | *von ungefähr* = *by chance* (SW I 75), not *approximately*. |
| Zutun (ohne alles Zutun) | 185 | contribution, doing | | Ratio 8.5. *ohne alles Zuthun des Ich* = *without any contribution of the I* (SW I 212). |
| es hat dabei sein Bewenden | 43 | that is the end of the matter | | |
| meines Erachtens | 83 | in my view | | |
| zum Behuf | 116 | for the purpose of | | |
| im Vorbeigehen | 117 | in passing | | |
| nach Maßgabe | 34 | in proportion to, according to | | |
| in Rücksicht auf | 155 | with regard to | | Not *in consideration*. *Rücksicht* (682) usually = *respect, regard*. |
| Geschäft | 475 | business, task | | *das Geschäft der Philosophie* = *the business of philosophy*. Never *shop*. |
| Aufgabe | 606 | task; problem | | |
| Äußerung | 507 | expression, manifestation | W ✓ (*expression*) | |
| Stunde | 272 | lecture (hour) | W ✓ ("last hour" 15×, "last lecture" 9×) | Trap T18: *in der vorigen Stunde* = *in the previous lecture*. |
| Vortrag, Vorlesung | 368 | lecture, presentation | W ✓ (*Vortrag* = lecture) | |
| Zuhörer | 76 | listeners, audience | W ✓ | |
| Ehrwürdige Versammlung | 34 | Honored Assembly | | The opening address of the *Anweisung* and the Berlin lectures (SW V 401). Keep the formula. |
| Ihr, ihr (address) | | you | | The *Reden* and the *Beitrag* address the audience as *ihr*. Use *you*, never *ye* (SW VI 150). |
| Gemeine, die | 298 (incl. adj.) | community | | Trap T22. |

### I. Canonical English titles

The target is the title used for English citation. ✓ = verified in SEP's bibliography, the translation's own title page,
or an archive.org record.

| German work (corpus location) | English title | Translator(s) | Notes |
|---|---|---|---|
| Grundlage der gesammten Wissenschaftslehre (SW I) | *Foundation of the Entire Wissenschaftslehre* | B21 ✓ SEP ✓ | Older: *Science of Knowledge* (HL ✓ SEP), *Foundations of the Entire Science of Knowledge*. |
| Ueber den Begriff der Wissenschaftslehre (SW I) | *Concerning the Concept of the Wissenschaftslehre* | B88 ✓ | |
| Grundriss des Eigenthümlichen der W.-L. (SW I) | *Outline of the Distinctive Character of the Wissenschaftslehre with respect to the Theoretical Faculty* | B88 ✓ | |
| Erste / Zweite Einleitung; Versuch einer neuen Darstellung (SW I) | *First / Second Introduction to the Wissenschaftslehre*; *Attempt at a New Presentation of the Wissenschaftslehre* | B94 (SEP ✓) | |
| Recension des Aenesidemus (SW I) | *Review of Aenesidemus* | B88 ✓ | |
| Darstellung der Wissenschaftslehre 1801 (SW II) | *Presentation of the Wissenschaftslehre (1801/02)* | (no complete English translation verified) | |
| Die Bestimmung des Menschen (SW II) | *The Vocation of Man* | Pr (SEP ✓) Sm ✓ | Books: *Doubt, Knowledge, Faith* (Sm ✓). F7. Old: *The Destination of Man* (Sinnett 1846 ✓). |
| Sonnenklarer Bericht (SW II) | *A Crystal Clear Report to the General Public concerning the Actual Essence of the Newest Philosophy* | Botterman/Rasch (SEP ✓, B21 ✓ p. 46 n. 117) | |
| Die Wissenschaftslehre, in ihrem allgemeinen Umrisse (1810, SW II) | *The Science of Knowledge in its General Outline* | Wright 1976 (SEP ✓, B21 ✓) | |
| Grundlage des Naturrechts (SW III) | *Foundations of Natural Right* | Ba ✓ SEP ✓ | Old: *The Science of Rights* (Kr 1889 ✓). |
| Der geschlossene Handelsstaat (SW III) | *The Closed Commercial State* | Ad (SEP ✓) | |
| Das System der Sittenlehre (SW IV) | *The System of Ethics* | BZ ✓ (SEP ✓) | Old: *The Science of Ethics as Based on the Science of Knowledge* (Kr 1897 ✓). |
| Die Staatslehre (1813, SW IV) | *The Doctrine of the State* | (no translation verified) | |
| Versuch einer Kritik aller Offenbarung (SW V) | *Attempt at a Critique of All Revelation* | G (SEP ✓) | |
| Ueber den Grund unseres Glaubens an eine göttliche Weltregierung (SW V) | *On the Basis of Our Belief in a Divine Governance of the World* | B94 (SEP ✓) | |
| Appellation an das Publikum; Gerichtliche Verantwortungsschriften (SW V) | *Appeal to the Public*; *Juridical Defense* | Bowman (SEP ✓) | |
| Aus einem Privatschreiben (SW V) | *From a Private Letter* | B94 (SEP ✓) | |
| Die Anweisung zum seligen Leben (SW V) | *The Way towards the Blessed Life; or, the Doctrine of Religion* | Sm ✓ SEP ✓ | |
| Beitrag zur Berichtigung der Urtheile des Publicums über die französische Revolution (SW VI) | *Contribution to the Correction of the Public's Judgment on the French Revolution* | Church/Schön 2021 (SEP ✓) | |
| Zurückforderung der Denkfreiheit (SW VI) | *Reclamation of the Freedom of Thought from the Princes of Europe* | (unchecked) | |
| Einige Vorlesungen über die Bestimmung des Gelehrten (SW VI) | *Some Lectures concerning the Scholar's Vocation* | B88 ✓ SEP ✓ | Old: *The Vocation of the Scholar* (Sm 1847 ✓). |
| Ueber Geist und Buchstab in der Philosophie (SW VIII 270 ff.) | *Concerning the Difference between the Spirit and the Letter within Philosophy* | B88 ✓ | |
| Ueber das Wesen des Gelehrten (SW VI) | *On the Nature of the Scholar and Its Manifestations* | Sm ✓ SEP ✓ | |
| Von der Sprachfähigkeit und dem Ursprung der Sprache (SW VIII 301 ff.) | *On the Linguistic Capacity and the Origin of Language* | Surber (SEP ✓) | |
| Die Grundzüge des gegenwärtigen Zeitalters (SW VII) | *The Characteristics of the Present Age* | Sm ✓ SEP ✓ | |
| Reden an die deutsche Nation (SW VII) | *Addresses to the German Nation* | Mo, Nakhimovsky/Kapossy/Tribe 2013 (SEP ✓), JT 1922 ✓ | |
| Ueber Machiavell (NW III) | *On Machiavelli* | (unchecked) | |
| Sittenlehre 1812 (NW III) | *Lectures on the Theory of Ethics (1812)* | Crowe 2015 (SEP ✓) | |
| Die Bestimmung des Gelehrten 1811 (NW III) | *The Vocation of the Scholar (1811)* | (no translation verified) | Use the B88 pattern: *Lectures on the Scholar's Vocation (1811)*. |
| Wissenschaftslehre 1804 (NW II) | *The Science of Knowing: Fichte's 1804 Lectures on the Wissenschaftslehre* | W ✓ | NW II prints the I. H. Fichte text (W used SW and the *Copia*: W p. 16 ✓). |
| Thatsachen des Bewusstseins (1810, SW II; 1813, NW I); Transscendentale Logik (NW I) | *Facts of Consciousness*; *Transcendental Logic* | (unchecked) | |
| Das System der Rechtslehre (1812, NW II) | *The System of the Doctrine of Right (1812)* | (no translation verified) | Our rendering, following *Rechtslehre* = *doctrine of right*. |

---

## 3. Traps: constructions machine translation gets wrong

Each item gives a corpus example (Sigle|page), what goes wrong, and the rendering.

| # | Construction | Corpus example | Typical MT error | Correct rendering |
|---|---|---|---|---|
| T1 | *gesetzt / vorausgesetzt, daß* | "vorausgesetzt, daß ich weiß, was Vorstellung ist" (NW I 283). Compare "es ist durch dasselbe nur gesetzt, daß sie überhaupt gesetzt sein müsse" (NW I 301) | *gesetzt* always rendered *posited*, or always *supposing* | Conjunction: *supposing / provided that*. Predicate after *ist*: *it is posited that*. Decide from the syntax, and when in doubt, use *posited*. |
| T2 | *Das Ich setzt sich selbst …, und es ist* | "Das Ich setzt sich selbst, und es ist, vermöge dieses blossen Setzens durch sich selbst" (SW I 96) | pronoun *he* or *I am* | *The I posits itself, and it is, by virtue of this mere positing by itself.* Always **it**. |
| T3 | Sentence-initial *Ich* (pronoun vs noun) | "Ich bin Ich" (NW I 194; SW I 61) | *I am me* | *I am I*. Capitalized *Ich* after an article (*das, des, dem*) is the noun. Without an article it is the pronoun. |
| T4 | *schlechthin* + verb | "Das Ich setzt ursprünglich schlechthin sein eigenes Seyn" (SW I 98) | *absolutely*, or dropped | *The I originally posits its own being purely and simply* (F6). |
| T5 | *inwiefern* = conditional | "inwiefern der Zwingherr erbötig ist, aller Welt den Beweis zu führen" (SW IV 437) | *to what extent* | *insofar as the coercive master is prepared to give the whole world proof* |
| T6 | *allerdings* | "und demnach wird durch sie allerdings A + B zugleich …" (SW I 216) | *however* | *to be sure, certainly* |
| T7 | *Leiden* in the WL | "eine Thätigkeit im Nicht-Ich, die ein Leiden im Ich bestimmt" (SW I 150) | *suffering* | *an activity in the not-I that determines a passivity in the I* |
| T8 | *Wechsel-Thun und Leiden* | "Durch Wechsel-Tun und Leiden … wird die unabhängige Tätigkeit … bestimmt" (SW I 150) | *alternating doing and suffering* | *interplay of activity and passivity* (one hyphenated concept). |
| T9 | *entgegensetzen* (impersonal passive) | "So wie dem Ich ein Nicht-Ich entgegengesetzt wird …" (SW I 109) | *a not-I is set against the I* (agentless and vague) | *As soon as a not-I is posited in opposition to the I …*. Keep the act. |
| T10 | Nominalized *Durch* | "Dieses Durch ist die allbekannte Denkform … A ist mithin B; A das Durch für das B" (NW I 47) | the preposition swallowed (*through which*) | *This "through" is the familiar form of thought … A is therefore B; A is the "through" for B.* (F14) |
| T11 | *das Sehen sieht sich* | "Das Sehen sieht sich als Sehen" (NW I 75) | *seeing sees itself* reworded as *one sees oneself* | *Seeing sees itself as seeing.* Keep the article-less verbal noun as subject. |
| T12 | Nominalized *Soll*, hypothetical | "drückt ja das Soll aus, wenn es nur rein problematisch genommen wird" (NW II 227) | *should* (verb), or *the duty* | *the "ought" expresses …, if only it is taken in a purely problematic sense* (F14). |
| T13 | *Das Ich setzt sich selbst, ist nicht wahr* (late self-correction) | "Das Ich setzt sich selbst, ist nicht wahr. Wahr ist: es ist Bild eines Sichsetzens" (NW I 217) | read as a question tag (*… isn't that so?*) | *"The I posits itself" is not true. What is true is: it is an image of a self-positing.* |
| T14 | *Künstler* (economy) | "eine zweite Klasse der Staatsbürger, die ich Künstler, in der weitesten Bedeutung des Wortes, nennen will" (SW III 232) | *artists* | *artisans, in the widest sense of the word*. Note the first occurrence. |
| T15 | *Vermögen* (economy) | "von National-Vermögen, Armuth oder Reichthum" (NW II 543) | *national faculty* | *national wealth* |
| T16 | *zu Stande / im Stande* | "wie ein Begreifen zu Stande komme" (NW I 29) | *state*, *estate* | *how a conceiving comes about*. *im Stande sein* = *be able*. |
| T17 | *Geschlecht* | "Menschengeschlecht" (269); "Treiben des Geschlechtes" (SW III 307) | *gender* | *human race*; *sexual drive* |
| T18 | *Stunde* | "Der ganze in der vorigen Stunde aufgezeigte Unterschied zwischen Seyn und Daseyn" (SW V 452) | *the previous hour* | *the distinction between being and existence shown in the previous lecture* |
| T19 | *Anstoß* outside the technical sense | "einen Anstoss, der vielleicht schon genommen ist, zu beseitigen" (NW I 9) | *check* | *to remove an objection (offense) that may already have been taken*. *check* only in the Jena WL and FNR § 3. |
| T20 | *Gesicht* | "sein Gesicht; (nicht facies oder vultus, sondern visum, idea, wie bei Luther)" (NW I 53) | *face* | *its sight (not facies or vultus, but visum, idea, as in Luther)*. Fichte glosses the word himself. |
| T21 | *Geist* (mind vs spirit) | "Die Wissenschaftslehre soll seyn eine pragmatische Geschichte des menschlichen Geistes" (SW I 222) | *spirit* everywhere | Jena faculty psychology: *mind*. Elsewhere: *spirit*. |
| T22 | *die Gemeine* (noun) | "eine bestimmte und geschlossene Gemeine von Individuen" (NW II 507) | *the common*, *the vulgar* | *a determinate and closed community of individuals* |
| T23 | *gewiss* / *Gewissen* / *so gewiss … so gewiss* | "So gewiss daher das Subject dasselbe begreift, so gewiss hat es …" (SW III 33) | *conscience* | *As surely as the subject comprehends it, so surely does it have …* (Fichte's favorite correlative). |
| T24 | *Daseyn des Seyns* | "unmittelbar und in der Wurzel ist — Daseyn des Seyns das — Bewusstseyn" (SW V 440) | *being-there of being* | *immediately and at the root, the existence of being is consciousness* (F16). |
| T25 | *Ordnung* = *ordo ordinans* | "dass ich darunter nur ein thätiges Ordnen (ordo ordinans) verstehe" (SW V 382) | *the moral world order* as a static structure | *moral world order*, with the note that Fichte means an active ordering. |
| T26 | Dashes and colons | passim (W p. 16 ✓: "his ubiquitous colons") | sentences merged or split, so the argument is lost | Keep Fichte's dash structure where it marks a step. Colons may become semicolons (as in W). Mark every sentence split in the data. |
| T27 | Lecture *Sie / Ihr / Wir* | "Halten Sie sich an jene Denkform" (NW I 48) | the formal address dropped | *Hold on to that form of thought*. Keep the second person and Fichte's lecturer's *we*. |
| T28 | *Thathandlung* = *Genesis* | "eine Thathandlung, was ich in diesen Vorträgen mit dem griechischen Worte … Genesis benannt habe" (NW II 194) | *genesis* lowercased and decoupled | *an F/Act, which in these lectures I have called by the Greek word … Genesis*. Keep both lemmas. |

---

## 4. Sensitive passages: policy and renderings

**Policy.** Translate exactly what Fichte wrote, with the period's vocabulary. Do not soften, euphemize, modernize or omit. Put no
comment inside the text. Context goes into an editorial note attached to the passage, identified as editorial and written once per passage. The
note states facts (date, context, reception), not apologies. These texts are among the most quoted in the debates on Fichte's nationalism and
antisemitism, so an imprecise rendering does real harm in either direction.

1. **The *Beitrag* (1793) on the Jews: SW VI 149–151 (main text and note).** The passage calls *das Judenthum* "ein mächtiger,
   feindselig gesinnter Staat" spread across Europe (SW VI 149). The note on SW VI 150 contains "Menschenrechte müssen sie
   haben … Aber ihnen Bürgerrechte zu geben, dazu sehe ich wenigstens kein Mittel, als das, in einer Nacht ihnen allen die
   Köpfe abzuschneiden und andere aufzusetzen, in denen auch nicht eine jüdische Idee sey". Renderings: *Judenthum* =
   *Judaism* (here the community as a quasi-state; note the double sense, do not substitute *Jewry*); *Staat im Staate* =
   *a state within the state* (Fichte applies the same phrase to the nobility on SW VI 152: keep it parallel); *Menschenrechte* /
   *Bürgerrechte* = *human rights* / *civil rights*; *jüdische Idee* = *Jewish idea*. Translate the head-cutting image literally.
   Do not render it as a figure of speech ("change their minds").
2. **The *Reden an die deutsche Nation* (SW VII).** *Volk* = *people*, *Nation* = *nation*, *Urvolk* = *original people*,
   *Deutschheit* = *Germanness*, *Ausland* = *foreign lands / the foreign*, *Ausländerei* = *foreignism*, *Stamm* = *tribe*,
   *neulateinisch* = *neo-Latin* (F15). Fichte's thesis that the Germans "das Recht hat, sich das Volk schlechtweg … zu nennen"
   (SW VII 359) = *has the right to call itself the people pure and simple*. "Charakter haben und deutsch seyn, ist ohne Zweifel
   gleichbedeutend" (SW VII 446) = *to have character and to be German are without doubt synonymous*. Never use *race* or *folk*:
   neither word is in the German, and both carry later meanings.
3. **"Zwingherr zur Deutschheit" (SW VII 565; cf. *Staatslehre* SW IV 436–437).** Render it *a coercive master (taskmaster) to compel
   Germanness*. Never *tyrant* (Fichte has *Tyrann*, 13×) or *dictator*. Keep *Zwingherr* in the markup.
4. **Women in FNR family right ("Grundriss des Familienrechts", SW III 304 ff.).** *Weib* = *woman*, *Mann* = *man*, *Ehe* = *marriage*. The arguments for women's
   subordination and exclusion from public office are translated literally. Do not render *Weib* as *wife*. *Gattin, Ehefrau* =
   *wife*.
5. **Peoples outside Europe.** *Wilde* = *savages*, *Barbar* = *barbarian*, *Neger* (2×: SW III 80, SW V 91) = *Negro*. Keep the period
   term in the text. The editorial note states that it is the source's word. In SW III 80 Fichte asks whether the protection of right
   extends "dem schwarzen Neger" as well as "dem weissen Europäer". Translate it exactly: the point of the passage depends on it.
6. ***Normalvolk*** (SW VII 133 f.): *normal people* (= the norm-giving original people of the *Grundzüge*), with a note.
   Never *normal folk* or *master race*.

---

## 5. Cross-author collisions (collected)

| German | Fichte (this glossary) | Hegel glossary | Proposal |
|---|---|---|---|
| Ich | the I | the I | identical |
| Bestimmung | determination; vocation | determination; vocation / destiny (P) | Choose *vocation* (BD) for Hegel too. |
| setzen, Gesetztsein | posit, positedness | posit, positedness | identical |
| Anschauung, intellektuelle A. | intuition | intuition | identical |
| an sich, Ansich | in itself, the in-itself | in itself, the in-itself | identical |
| Reflexion | reflection (act of the I) | reflection (logical category) | same word, markup |
| Sein / Dasein / Existenz | being / existence / existence | D1 pending | F16: author-specific exception for *Existenz* |
| Wechselwirkung | reciprocal interaction | reciprocal action (pending) | F11: unify on *reciprocal interaction* |
| Sittlichkeit | morality | ethical life | F9: deliberate exception, markup |
| Selbständigkeit | self-sufficiency | D11 (a) self-sufficient | identical if D11 (a) is adopted |
| Intelligenz | intelligence | intelligence | F10 |
| Grenze / Schranke | limit / limitation | limit / limitation | F17 |
| Bestimmtheit | determinacy (B88) | determinateness | Unify on *determinateness*. |
| Begreifen | conceive | comprehend | Open. The late WL's *das Unbegreifliche* needs *inconceivable*. |
| Zweck | end (ethics) | purpose | Fichte *Endzweck* = *final end* in both. Open for plain *Zweck*. |
| Gattung | species | genus | Context-bound, markup. |
| Gemeinwesen | commonwealth | polity | Open. Decide jointly. |
| Willkür | arbitrary choice | arbitrary will / free choice | Unify on *arbitrary choice*. |
| Bildung | education, cultivation | cultural formation | context-bound, markup |
| Idee | Idea (B88 ✓, Sm ✓ *Divine Idea*) | D5 (b) Idea | identical |
| unmittelbar | immediate (B88 has *direct*) | immediate | identical |
| schweben; Urbild / Gegenbild | hover; archetype / counter-image | — | coordinate with the Schelling glossary |

---

## 6. Sources and verification

**Checked in the translation itself (local PDF, or an openly viewable copy) with page or count:**

- **W**: W. E. Wright, *The Science of Knowing: J. G. Fichte's 1804 Lectures on the Wissenschaftslehre* (SUNY, 2005), local PDF
  (`~/Downloads/The Science Of Knowing …pdf`). Introduction, "Translating Fichte", pp. 10–15: *Wissenschaftslehre* pp. 10–12 (quotes
  B88 p. xv and states that leaving it untranslated "is now the most common practice"); *Genesis* pp. 12–13; *Einsicht* p. 14; *Evidenz* p. 14;
  *Durch* pp. 14–15; *Prinzipiieren* p. 15. "Syntax and Punctuation" p. 16 ("=" sign, colons, *Vernunft = Effekt*). German–English
  Glossary pp. 241–247 (all rows marked W ✓). Rendering counts (my own, on the extracted text): *oneness* 341 / *unity* 34,
  *manifestness* 75, *factical* 191, *facticity* 41, *image* 130, *seeing* 116, *projection* 83, *disjunction* 119, *in-itself* 128;
  *Stunde* → "last hour" 15, "last lecture" 9.
- **Sm (1847)**: W. Smith, *The Vocation of the Scholar* (London, 1847), local PDF (archive.org scan `vocationofschola00fich`):
  "pure Ego", "Non-Ego" p. 19; "culture" p. 25; "the Social Impulse" p. 30. Counts: Ego 31, impulse 40, vocation 45.
- **B88**: D. Breazeale, *Fichte: Early Philosophical Writings* (Cornell, 1988), archive.org text (item
  `fichte-johann-gottlieb-breazeale-daniel-early-philosophical-writings`): Note on Translation pp. xiii–xv (*das Ich* p. xiv;
  *Tathandlung* = "Act" p. xiv; *Wissenschaftslehre* untranslated p. xv; coordination with HL p. xv); German–English Glossary
  pp. xvii–xx (source of all "via B88" HL attributions: *Ich* "H/L = self", *entgegensetzen* "H/L = to counter-posit",
  *schweben* "H/L = to waver", *Vorstellung* "H/L = presentation", *Stoff* "H/L = matter", *Wirkung* "H/L = causal process",
  *Wissenschaftslehre* "H/L = Science of Knowledge"). Table of contents (titles). Counts: *the I* 808, *the self* 11, *man* 319, *human being* 12,
  *drive* 153, *impulse* 10, *intellect* 46, *spontaneity* 26, *social drive* 14.
- **B92**: Breazeale, *Foundations of Transcendental Philosophy (Wissenschaftslehre) nova methodo* (Cornell, 1992), publisher preview
  (api.pageplace.de, ISBN 9781501728983): Editor's Introduction p. 13 n. 35 (*Tatsache* = fact; *Tathandlung* "translated as 'Act'").
- **B21**: Breazeale, *J. G. Fichte: Foundation of the Entire Wissenschaftslehre and Related Writings, 1794–95* (OUP, 2021),
  publisher preview (api.pageplace.de, ISBN 9780192580726), Editor's Introduction: *F/Act* pp. 5, 13, 18 (with "polemical counterpart to
  Reinhold's *Tatsache*"), 20, 27, 28; *Darstellung* "presentation" and *Setzen* "positing" p. 13; *Anstoß* "check", "obstructs … and 'impels'",
  "factum", "oscillates between" / "hovers above", *Vorstellung* p. 29; "I-hood" p. 30; "check" p. 36; feeling, self-feeling,
  longing, drive p. 37; "purely and simply" pp. 5, 29; Sonnenklarer Bericht translation reference p. 46 n. 117. Table of contents
  (§§ 6–11 "Striving", "Feeling", "Drive"). The volume's Notes on the Translation (p. 98) and glossaries (pp. 105–126) were **not**
  in the preview and were not seen.
- **Ba**: F. Neuhouser (ed.), M. Baur (trans.), *Foundations of Natural Right* (Cambridge, 2000), archive.org text (item
  `foundations-of-natural-right-fichte-berserker-books`). Verified from Baur's bracketed German: *Urrecht, Zwangsrecht,
  Staatsbürgervertrag, Schutzvertrag, Leib, Ichheit* ("I-hood"), *Anstoß* ("check"), *Anforderung* ("demand"), *Willkür*,
  *Wirksamkeit, Erziehung* ("upbringing"), *Erlaubnisgesetz, Stand, Darstellung*. Verified by counts: summons 21 / summon 25, upbringing 41,
  right of coercion 49, original right 49, law of right 70, concept of right 73, commonwealth 25, ephor 76, property contract 22,
  protection contract 15, civil contract 64, unification contract 2, expiation 18, reciprocal interaction 25, law of coercion 21+4,
  material body 5, articulation 15, articulated 20, intelligence 11 (intellect 0), self-activity 5, human being 146, man 98, rational being 200,
  sensible world 89, police 66. The translator's note itself is missing from that text. No page numbers are cited.
- **Sm (1889)**: Smith, *The Popular Works of J. G. Fichte*, 4th ed., 2 vols. (Trübner, 1889), archive.org `popularworksofjo01fich`,
  `popularworks02fichuoft`. Vol. I: *Vocation of Man* books "Doubt / Knowledge / Faith"; "Divine Idea" (63×, *Nature of the Scholar*);
  Wissenschaftslehre untranslated 18×, "Doctrine of Knowledge" 1×. Vol. II: *Characteristics*, Lecture I (five epochs: "Reason as
  Instinct", "State of Innocence", "State of completed Sinfulness", "Reason as Knowledge", "Reason as Art"); "Age" 391; "Blessedness"
  80 + "blessedness" 10; "Existence" 55; "Love" 168; "Race" 196.
- **JT**: R. F. Jones and G. H. Turnbull, *Addresses to the German Nation* (Open Court, 1922), archive.org
  `addressestothege00fichuoft`. Counts: nation 286, people 247, folk 1, original people (several), fatherland 43, neo-Latin 13, living
  language 16, dead language 10, national education 29, new education 33, self-seeking / selfishness 30, love of fatherland / patriotism 17.
- **Kr**: A. E. Kroeger, *The Science of Rights* (1889), archive.org `scienceofrights00fich`: Ego 122, original right 39, right of
  compulsion 32+1, Ephor 66. *The Science of Ethics as Based on the Science of Knowledge* (1897), `scienceofethics00fichuoft`: Ego 419,
  impulse 609, self-sufficiency 20.
- **Sinnett**: *The Destination of Man* (1846), title only, archive.org metadata `thedestinationof00fichuoft`.
- **CC**: D. James and G. Zöller (eds.), *The Cambridge Companion to Fichte* (2016), archive.org text
  (`the-cambridge-companion-to-fichte`). Ch. 3 (C. Klotz): "'Tathandlung' (translated as 'Act' in SK, but 'deed-action' would be a more
  literal translation)"; "'check' or 'trigger' (Anstoß) (GA I/2: 355; SK, 189)". Ch. 4 (D. Breazeale): "'f/act' (Tathandlung) and 'check'
  (Anstoß)". Ch. 5 (G. Zöller): "'imagism' (Bildwesen)", "'rendering in images' (Bilden …)". In another chapter, on the *Kritik aller Offenbarung*: "the highest morality [Sittlichkeit] united with the highest
  happiness [Glückseligkeit]" (a paraphrase of Kant's postulate) and "the highest moral perfection [moralische Vollkommenheit] … the highest
  blessedness [Seligkeit]" (cited GA I/1: 19–20; ACR 142–143). I cannot tell whether the wording is Green's or the chapter author's, so G is
  not marked ✓. CC also gives "original rights (Urrechte)" and "body of their own
  (Leib)". No page numbers are cited (they are not reliable in the OCR text).
- **SEP**: D. Breazeale, "Johann Gottlieb Fichte", *Stanford Encyclopedia of Philosophy*,
  https://plato.stanford.edu/entries/johann-fichte/ (consulted 9 Nov 2026): *Tathandlung* "fact/act"; *Anstoß* "check"; *Ichheit*
  "I-hood"; "summons"; *Wissenschaftslehre* untranslated, glossed "Doctrine of Scientific Knowledge"; *setzen* glossed "to be aware of";
  *Staatsbürgervertrag* "citizens' contract"; and the bibliography of translations (the source of every "SEP ✓" title).
- **Martin**: W. M. Martin, review of Breazeale, *Thinking through the Wissenschaftslehre*, NDPR 2015,
  https://ndpr.nd.edu/news/thinking-through-the-wissenschaftslehre-themes-from-fichte-s-early-philosophy/ ("self-sufficiency
  [*Selbständigkeit*]", "unconditionally and absolutely [*schlechthin*]", "I-hood", "drive to absolute self-activity", "check",
  *Bestimmung* "specific determination (or 'vocation')").
- **Lotz**: C. Lotz, review of BZ *System of Ethics*, NDPR 2006.11.14, https://ndpr.nd.edu/reviews/system-of-ethics/ (quotes BZ:
  "constrained state [*Gebundenheit*]" p. 14; "agility"; "the drive to absolute self-activity" p. 51; "the moral law
  [*Sittengesetz*]"; section "Duties of the Scholar"). BZ's own note on the translation and its glossary were **not** seen.

**Publisher or catalog pages (existence and titles only):** SUNY Press page for Adler, *The Closed Commercial State*
(https://sunypress.edu/Books/T/The-Closed-Commercial-State; it lists a German–English glossary, not seen). Cambridge catalog
record for Moore, *Addresses* (ISBN 9780521444040; its "Notes on the text and translation" and glossary were not reachable).

**Not checked (no accessible copy; attributions marked "unchecked" or left without ✓):**
Heath/Lachs directly (all HL attributions come via B88's glossary or Klotz in CC); B94 *Introductions*; BZ's translator's note and glossary;
Preuss; Green (except the CC quotation); Moore; Nakhimovsky/Kapossy/Tribe; Adler's glossary; Crowe; Church/Schön; Botterman/Rasch; Bowman;
Surber; Wood (partial *New Version of the WL*). Also not checked: Neuhouser, *Fichte's Theory of Subjectivity* (1990); Zöller, *Fichte's
Transcendental Philosophy* (1998); Breazeale, *Thinking through the WL* (2013), except through Martin's review; Breazeale, "Check or Checkmate?"
(1995). The Cambridge asset server (frontmatter PDFs), Project MUSE, PhilArchive/PhilPapers and Springer refused automated access.
I made no attempt to get around those blocks. The lending-only (access-restricted) archive.org copies of HL, B94, Preuss, Green and Baur
were not opened.

**Corpus figures:** `python3 -I uebersetzung/zaehle.py count|kwic` on the portal corpus (`fichte.txt`, 22 367 units). Alternation patterns were
recounted after the fix to `zaehle.py` that groups alternatives (9 Nov), so every left word boundary now applies. n† and the page
references in the Traps come from a case-sensitive helper on the same file, using the same spelling folding. Counts are rough measures of
weight, not lemmatized frequencies. *Ich*, *Sein*, *Wissen*, *Sehen* and *Soll* include verb and pronoun homographs unless marked †.
