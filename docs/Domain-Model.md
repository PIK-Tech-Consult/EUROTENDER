# EuroTender Domain Model

Status: initial modeling draft, 2026-11-02. Candidate boundaries and aggregate designs require validation with the founders, the CAIS EPP expert, and pilot-company scenarios.

## 1. Purpose and authority

This living document connects business scenarios and rules to a proposed domain model. It is not a database schema, class catalogue to implement wholesale, or new MVP scope.

- [Requirements](./Requirements.md) define product scope and acceptance criteria.
- [Architecture](./Architecture.md) records accepted architecture and unresolved decisions.
- [Glossary](../GLOSSARY.md) defines shared business language without implementation details.
- [Project description](./Project-Description.md) provides the product overview.

Labels used below:

- **Confirmed**: stated in the requirements or accepted architecture; this does not mean implemented.
- **Proposed**: a modeling hypothesis to test, not an accepted decision.
- **Open**: requires business clarification or implementation evidence before selection.

An entity has continuing identity; a value object is defined by its values. An aggregate is a consistency boundary with a root controlling its changes. Ownership, screen layout, and database relationships do not by themselves establish aggregate boundaries.

## 2. Domain focus

**Proposed core domain:** trustworthy, evidence-backed tender interpretation and company eligibility assessment. The differentiating capability is explaining what a tender requires, what company evidence supports each outcome, and when that outcome is no longer current.

| Classification | Capabilities | Modeling approach |
|---|---|---|
| Core candidate | Sourced tender interpretation; deterministic eligibility, readiness, and compatibility | Explore real procurement examples and encode explicit rules |
| Supporting candidates | Official tender ingestion, document provenance, company profiles, discovery, monitoring, organization limits | Model business-specific lifecycles and rules without unnecessary abstractions |
| Generic capabilities | Sign-in, email transport, file storage, workflow execution | Integrate through boundaries; do not make vendor concepts the business model |

This classification is proposed for prioritization, not a change to the accepted architecture.

## 3. Scenarios that drive the model

### A. Assess a company against a tender

1. A tender analysis provides sourced eligibility requirements for a known tender/document revision.
2. The assessment uses a known revision of the selected company's structured profile.
3. Deterministic rules compare supported facts and requirements.
4. The result records checklist outcomes, source evidence, facts used, readiness, and compatibility.
5. The result belongs to that company; the shared tender analysis remains company-independent.

**Confirmed:** QUA-01 through QUA-06; architecture section 6.

**Validation examples:** a clearly satisfied numeric threshold; an expired certificate at an explicitly agreed reference date; a supported certificate alternative; an unsupported requirement; experience judged similar only by AI. The last two must never become met merely because the model considers them plausible.

**Open:** reference dates, unknown inputs, currency conversion, applicability/counting, and the precise representation of alternatives.

### B. Change a company profile during assessment

1. An assessment starts using profile revision P1 and analysis revision A1.
2. A company fact changes, producing profile revision P2.
3. Assessments based on the superseded profile are stale.
4. The late P1 result must not replace a newer result or be presented as current for P2.
5. The shared tender analysis is unaffected by this private profile edit.

**Confirmed:** PRO-02, QUA-07; architecture sections 6 and 7.

**Open:** whether recalculation follows automatically or waits for an explicit request. Profile revisions support reproducible checks; they do not introduce the deferred user-facing fact-version-history feature.

### C. Import a tender amendment

1. Import an official deadline change or a new document and retain the tender's change history.
2. Mark dependent analysis and assessments stale; keep the previous result visible until replacement is ready.
3. Use the current official metadata even if the previous analysis extracted a different value.
4. Reschedule upcoming bookmark reminders against the current official deadline.

**Confirmed:** ING-03, ING-04, AI-07, QUA-07, BMK-03.

**Open:** automatic rerun policy, timezone, and reminder identity when deadlines change repeatedly.

### D. Produce analysis with incomplete document coverage

1. Some documents are processed, while others fail or are skipped.
2. The analysis exposes those states rather than implying complete document coverage.
3. Display only quotations verified against their exact source versions; flag unsupported values.
4. A verified quotation establishes the text's presence, not the correctness of its interpretation.

**Confirmed:** DOC-03, AI-03; architecture section 6.

**Open:** publication criteria for partial analysis and OCR-derived evidence verification.

### E. Bookmark and remind without duplicate delivery

1. Two authorized users bookmark the same tender for the same company.
2. They see the same company-shared bookmark, not separate personal bookmarks.
3. Reminders use the current official deadline and applicable organization/user preferences.
4. Duplicate processing or a retry must not send the same reminder twice.

**Confirmed:** BMK-01 through BMK-03, MON-03, MON-04.

**Open:** preference precedence, recipient/delivery identity, and behavior when a company bookmarks after a reminder threshold.

## 4. Candidate bounded contexts and context map

All boundaries in this section are **proposed** refinements of the accepted business-module map. A bounded context is a model/language boundary, not automatically a package, service, or deployment. Validate whether closely related areas need separate models before splitting them.

| Candidate context | Owns | Exchanges |
|---|---|---|
| Organizations and access | Organization/company identity and ownership, limits, lifecycle, authorized working context | Company identities and access/lifecycle decisions; no company facts in identity synchronization |
| Tender ingestion | Canonical official metadata, tender revisions, change history, award-notice collection | Official revisions and change facts for analysis, discovery, and monitoring |
| Document processing | Document versions, processing status, parsed-source locations | Versioned source material and coverage information for analysis and document search |
| Tender analysis | Shared analysis revisions, sourced requirements, evidence verification, discrepancies | Company-independent requirements and provenance for eligibility and views |
| Company profiles | Structured facts and coherent profile revisions | Private, company-scoped assessment inputs |
| Eligibility | Deterministic requirement outcomes, readiness, compatibility, assessment provenance and freshness | Company-scoped results for tender views and top matches |
| Discovery and monitoring | Saved searches, shared bookmarks, notification preferences, reminder/digest behavior | Queries over official tenders, analysis, and authorized assessments; email delivery requests |

Administration invokes the relevant owners' use cases; it is not a second owner of their rules. The tender page and home page assemble read models across boundaries; neither screen requires a new aggregate.

### Proposed relationships

- CAIS EPP -> tender ingestion: translate external notices into canonical tender concepts; isolate external schemas behind an anti-corruption layer.
- Tender ingestion -> document processing -> tender analysis: preserve tender/document identities and exact source versions.
- Tender analysis + company profiles -> eligibility: consume explicit versioned inputs, never a shared mutable object graph.
- Tender ingestion + eligibility -> discovery and monitoring: supply official deadlines and company-scoped results for views and notifications.
- Organizations and access -> private use cases: establish authorized company context and lifecycle constraints; do not infer company permissions from selection alone.
- External identity, model, and email integrations remain adapters. Their payloads are not domain entities or automatic proof that a business action succeeded.

Cross-context events need explicit contracts and minimal identifiers/revisions, not whole private profiles. Public tender information and shared analysis must not acquire company-specific context.

## 5. Candidate entities, aggregates, and value objects

Every classification here is **proposed**. A candidate root may remain a simple record/use case if it has no meaningful invariant-bearing behavior. Cross-aggregate references use identities rather than embedding unrelated lifecycles.

| Candidate root | Identity and lifecycle | Contents / invariant responsibility | Outside the boundary |
|---|---|---|---|
| Organization | Paying customer; administered limits and deletion lifecycle | Organization settings and limit policy; serialize or reserve capacity when admitting companies/users so concurrent additions cannot exceed limits | Company profiles, tenders, assessments, identity-provider membership lifecycle |
| Company | Participant within an organization | Stable ownership and company lifecycle; profile, search, and bookmark ownership must remain company-consistent | Organization and independently changing profile/monitoring records |
| Tender | Canonical opportunity linked to its external identity; revisions and official status changes | Coherent current official metadata, revision identity, and change history; official-data precedence | File contents, parsing attempts, analysis runs, and private assessments |
| Document version | Exact source version; processing can succeed, fail, or be skipped | Immutable source reference and coherent coverage/provenance; distinguish source identity from processing attempts | Tender lifecycle and analysis results |
| Company profile | Profile for a company; changes create a new revision | Structured facts; fact mutation and revision advancement must be atomic so an assessment cannot use mixed inputs | Tender requirements and assessments |
| Tender analysis | Shared result for tender/document revisions and an analysis configuration | Sourced fields, requirement set, coverage, provenance, and publishability checks; reruns retain earlier results | Company facts, company-specific outcomes, workflow attempts |
| Eligibility assessment | Company/profile revision + analysis revision + evaluator version | Requirement results, inputs used, readiness, and compatibility agree for one input set | Mutable live profile/tender objects and shared analysis ownership |
| Saved search | Named company-owned search; rename, change, delete, rerun | Company ownership and valid criteria | Search result sets and delivered emails |
| Bookmark | Company + tender relationship; bookmark/unbookmark | One shared active bookmark for that company/tender pair | Tender metadata, users' individual preferences, delivery attempts |

### Boundary questions to test

- **Organization limits:** the hard limit cannot be an eventually corrected count. Validate an atomic admission/capacity mechanism without loading all companies or duplicating authoritative membership state.
- **Profile size:** start by testing a small profile consistency boundary; if fact volume makes that unsuitable, retain a coherent revision/snapshot contract rather than silently mixing independently updated facts.
- **Analysis identity:** determine whether one root governs published revisions or each result revision has its own identity and publication coordination. Do not equate every workflow job with a new domain aggregate.
- **Freshness:** staleness may be derived from revision comparisons or maintained as a projection. Correctness must not depend solely on an asynchronous stale flag arriving before a read.
- **Reminders:** validate whether schedules/delivery records warrant a separate aggregate. A bookmark alone cannot guarantee no duplicate external delivery across a crash.
- **Lots:** tender analysis includes lots, but independent lot assessment, cross-lot requirements, and percentage aggregation need expert validation before assigning lot aggregate boundaries.

### Other entity candidates

- A company fact may need identity because users edit/delete a particular fact; its historical values can remain immutable within profile revisions.
- An extracted requirement needs an identifiable position within an analysis revision so checklist outcomes can cite it. Stable identity across reruns is not assumed.
- A lot may be an entity within tender information; independence is not established by having a lot number.
- Users and memberships are externally owned identities; local projections do not become a second identity system.

### Value-object candidates

| Candidate | Meaning / rule to validate |
|---|---|
| Monetary amount | Amount and currency; unsupported conversion must not silently produce a comparison |
| Period / validity interval | Explicit dates or duration semantics, including assessment reference date |
| Source reference / quotation | Exact document version, location, text, and verification information |
| Search criteria | Immutable company search specification, not a collection of current results |
| Requirement condition | Supported threshold or alternative structure, separate from contract obligations |
| Requirement outcome | Met / not met / needs review, explanation, and facts/evidence used |
| Assessment input reference | Company/profile, analysis/tender revisions, and evaluator version defining the evaluated inputs |

The eligibility evaluator is a candidate **domain service**: a deterministic operation over requirements and facts that does not naturally belong to either alone. It returns coherent results; it does not fetch files, call a model, authorize a user, schedule work, or send email.

## 6. Confirmed rules and consistency requirements

These are existing obligations, not newly accepted aggregate designs.

| Rule | Source | Consistency implication |
|---|---|---|
| Organization and company are distinct; private data is company-scoped | ACC-01, ACC-07 | Enforce ownership and authorization on every private operation, not only in the UI |
| Adding companies/users beyond the organization's limit is blocked | ACC-05 | Admission must be concurrency-safe; later reconciliation alone is insufficient |
| Official notice values override conflicting AI extraction | ING-04 | Readers must not present outdated AI values as current official facts |
| All displayed quotations are verifiable in their exact source versions | AI-03; acceptance criteria | Verification gates displayed evidence, including partial results |
| Opening a tender does not itself trigger paid AI processing | TEN-02 | Reads are separate from authorized analysis/assessment commands; automatic policy remains separate |
| Numeric, currency, period, and validity comparisons are deterministic | QUA-03 | Domain tests must run without AI/vendor dependencies |
| Model-only subject similarity does not establish a met requirement | QUA-04 | Advisory similarity cannot promote an uncertain outcome to met |
| Any supported valid alternative may satisfy an alternative requirement | QUA-05 | Model alternatives explicitly; do not require all alternatives |
| Unsupported conditions and contract obligations never count as met | QUA-06 | Preserve review/separation and explicit applicability rules |
| A mandatory unmet requirement blocks readiness | QUA-02 | Readiness and percentage must derive coherently from the same checklist |
| Every company is assessed against newly analyzed tenders | QUA-07; architecture section 6 | Do not silently skip companies through an assessment relevance filter |
| Changed inputs make dependent results stale | AI-07, QUA-07 | Retain input revisions, guard publication, and keep prior results visible as stale |
| Bookmarks are shared within a company | BMK-01 | Concurrent requests must converge on one active company/tender bookmark |
| Reminders use the current deadline and must not repeat | BMK-03 | Recheck current inputs/preferences and reconcile external delivery on retry |
| Deletion blocks new private access/work and late results cannot recreate data | ACC-08; architecture sections 4 and 7 | Lifecycle checks apply at entry, processing, and publication |

## 7. Lifecycles, commands, and events

**Confirmed distinctions:** tender status (active, suspended, closed, terminated), document outcome (processed, failed, skipped), requirement outcome, readiness, and freshness are different dimensions. A stale assessment is not necessarily a failed assessment; blocked readiness is not a tender status.

**Proposed lifecycle approach:** separate in-progress work and failed attempts from published results. A rerun may fail while an older published result remains visible and marked stale. Tender status transitions and partial-analysis publication rules still require validation.

Commands express intent; events record facts that have already happened. The following vocabulary is **proposed**, with mappings to the architecture's provisional trigger names, not a new event API.

| Command / occurrence | Resulting fact | Architecture trigger / consequence |
|---|---|---|
| Import official tender revision | Tender revision imported | `tender.imported` / `tender.revised`; process sources and invalidate dependent results |
| Request analysis | Analysis requested | `analysis.requested`; authorized durable extraction and verification |
| Publish analysis | Analysis completed | `analysis.completed`; assess companies against this analysis revision |
| Add, edit, or delete company fact | Company profile revised | `company.profile.revised`; invalidate affected private assessments |
| Request eligibility assessment | Eligibility assessment requested | `eligibility.requested`; deterministic evaluation for explicit revisions |
| Bookmark/unbookmark tender | Tender bookmarked/unbookmarked | `bookmark.changed`; update company monitoring |
| Import changed official deadline | Tender deadline changed | `tender.deadline.changed`; reschedule upcoming reminders |
| Request organization deletion | Organization deletion requested | `organization.deletion.requested`; block access/work and coordinate deletion |

Durable workflow coordination belongs to application use cases, not entities. The accepted architecture uses transactional event publication, at-least-once delivery, and idempotent consumers, not full event sourcing. Cross-context integration contracts should be distinguished from internal domain events when implemented.

## 8. Open modeling questions

No default answer is adopted here.

| Question | Validation owner / evidence |
|---|---|
| Can every organization member access every company, or are company-specific grants needed? | Founders; ACC-07 and architecture section 4 |
| Which tenders receive automatic analysis, and when do stale results rerun automatically? | Founders; AI-01 and architecture section 12 |
| How are missing facts, zero applicable requirements, partial coverage, and review outcomes reflected in readiness/compatibility? | Founders + CAIS EPP expert; QUA-01, QUA-02, QUA-06 |
| Does QUA-04's "check" mean the existing needs-review outcome or a separate display label? | Founders + expert; do not introduce a fourth outcome by assumption |
| Which dates govern certificate validity and experience periods, and how does time passing affect freshness without a profile edit? | Expert + pilot examples; QUA-03, PRO-01 |
| Which currency conversions and certificate-equivalence relationships are supported? | Expert + founders; QUA-03, QUA-05 |
| Are checks tender-wide or lot-specific, and how do shared/alternative conditions affect the denominator? | Expert + representative multi-lot tenders; AI-02, QUA-02 |
| When may incomplete document coverage yield a publishable analysis? How are OCR quotations verified? | Expert + source corpus; DOC-03, AI-03 |
| How do organization reminder choices and user/company preferences combine? What happens after a reminder threshold or a repeated deadline change? | Founders; MON-03, MON-04, BMK-03 |
| When are award results displayed? | Founders; ING-05 conflicts with deferred scope |

## 9. Next validation slice

1. Walk through one real pilot-company profile and tender with the founders and expert, including an alternative requirement and an amendment.
2. Resolve enough applicability, reference-date, and readiness rules to write concrete expected outcomes; leave other cases explicitly unsupported/reviewable.
3. Implement a framework-free evaluator test slice and a profile-change/late-publication scenario before committing to repositories or table layouts.
4. Update this document and glossary as language stabilizes; promote proposals only with the supporting scenario or decision. Record an ADR only for a consequential, hard-to-reverse trade-off.

### Initial DDD diagnostic

**Document-level readiness: 3/10; not an implementation-quality score.** The draft identifies a core-domain hypothesis, an explicit candidate context map, and translation boundaries for external integrations. The remaining four diagnostic checks are unverified: expert-readable code names, small implemented aggregates, behavior-bearing domain objects, and actual event-based cross-aggregate collaboration. No depth points are claimed for a rich implemented core, invariant enforcement, or consistent vocabulary across code and tests.

This score is a starting checklist, not an acceptance gate. Expert review and executable examples, not additional documentation volume, should improve confidence.
