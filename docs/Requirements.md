# EuroTender MVP — Requirements

## 1. Purpose and scope

This document defines exactly what PIKTech will build for the EuroTender MVP and what is deferred to later versions. It is the scope associated with PIKTech's 33% share.

After signing, anything not described in Sections 3–9 of the source specification is outside the MVP, including the deferred items in Sections 11–13.

## 2. MVP summary and operating assumptions

**MVP in one sentence:** The customer receives new public procurement tenders that are relevant to them, by searching or through a notification. They open a tender and see the important details, with sources: financial information, deadlines, and eligibility requirements. They check whether they meet the requirements, bookmark the tender, and receive a reminder before the deadline.

| Area | MVP |
|---|---|
| Market | Bulgaria only; public procurement published in CAIS EPP (app.eop.bg) |
| Language | Bulgarian interface; AI analysis in Bulgarian |
| Devices | Desktop browsers: recent versions of Chrome, Edge, Firefox, and Safari |

## 3. User accounts, organizations, and roles

| ID | Requirement |
|---|---|
| ACC-01 | An **organization** is the paying customer. It may have multiple **companies** that participate in tenders. Each company has its own profile, saved searches, and bookmarked tenders. |
| ACC-02 | Roles: **owner** (manages the organization, its companies, and members) and **member** (uses the product). A separate **platform administrator** role is for the founders and PIKTech. |
| ACC-03 | Users can sign in, sign out, reset their password by email, and change their email address and password. |
| ACC-04 | An owner can invite members by email; invitees set a password using the invitation link. |
| ACC-05 | An administrator sets the company and user limits for each organization. Adding more is blocked when a limit is reached, with a brief explanation. |
| ACC-06 | Users switch companies in the top bar and work in one company at a time. |
| ACC-07 | One company must never see another company's data. This is enforced server-side for pages, counts, emails, and exports. |
| ACC-08 | Users can delete their own accounts. An administrator can delete an organization's data on request (GDPR). |

## 4. Tender data ingestion and documents

### 4.1 Importing tenders from CAIS EPP

| ID | Requirement |
|---|---|
| ING-01 | All new tenders published in CAIS EPP are imported automatically from the launch date onward. The polling frequency is a setting agreed with the founders and can be changed at any time. |
| ING-02 | Store the following for each tender: title, contracting authority, tender type (works, services, supplies), procedure type, estimated value and currency, bid submission deadline, CPV, region (NUTS), award criterion, EU funding, description, contact, and link to the tender in CAIS EPP. |
| ING-03 | Track changes to deadlines, modification decisions, new documents, and status (active, suspended, closed, terminated). Show them in the tender history. |
| ING-04 | Official notice data (deadlines, values, codes) always takes precedence over AI-extracted values. Flag discrepancies. |
| ING-05 | Collect and store award notices (contractors, awarded amounts, and results by lot) from launch. The source specification says they are to be displayed in the interface immediately after launch. |

### 4.2 Documents

| ID | Requirement |
|---|---|
| DOC-01 | Download and store all current tender documents with a timestamp. |
| DOC-02 | Supported formats: PDF, DOCX, XLSX, legacy `.doc`, and ZIP archives. |
| DOC-03 | Show each document's processing status (processed, failed, or skipped—for example, technical drawings) so users can assess how complete the analysis is. |

## 5. AI tender analysis

| ID | Requirement |
|---|---|
| AI-01 | **When analysis runs:** automatically for new tenders according to a policy agreed with the founders (for example, all new tenders or only those relevant to at least one customer); on demand, using an **Analyze** button, for any other tender. |
| AI-02 | **Analysis content:** a short summary; context and rationale for the tender; contracting authority; financial terms (estimated value, participation and performance guarantees, payment terms, EU funding and funding source); key dates (submission, questions deadline, site visit, opening, contract term); scope and location (place of performance or delivery, quantities); lots (number, subject, value); eligibility requirements; evaluation criteria; and the status of each document. |
| AI-03 | **Sources:** Each value shows its source (document, section, and exact quotation). The system verifies that the quotation actually exists in the document and flags values that cannot be verified. |
| AI-06 | Every analysis includes an AI disclaimer and a link to the original documents in CAIS EPP. |
| AI-07 | If a tender changes after analysis, mark the analysis as stale and allow it to be rerun. Keep the previous result visible until the new one is ready. |
| AI-09 | **Construction section:** For construction tenders, the analysis also shows the required CPRA (Central Professional Register of Builders) category and group, design capacity, site conditions, demolition, materials, permits, warranty period, and maintenance period. |

## 6. Company profile and eligibility

### 6.1 Company profile

| ID | Requirement |
|---|---|
| PRO-01 | Each company has a profile containing facts entered through structured forms. The launch categories are: (1) total annual turnover; (2) turnover in the tender's field; (3) similar projects (number, value, subject, completion date); (4) certificates (e.g. ISO, including validity); (5) registrations and licenses, including CPRA category and group; (6) professional liability insurance; (7) key personnel (role, qualification, years of experience); (8) equipment; (9) staff count; and (10) EIK/BULSTAT (company identification number). |
| PRO-02 | Facts can be added, edited, and deleted. |
| PRO-03 | Before launch, PIKTech and the founders will fill in the profiles of the two pilot customers together with them. |
| PRO-04 | The facts list supports text or number search, filtering by category, and pagination. |

### 6.2 Eligibility checks

| ID | Requirement |
|---|---|
| QUA-01 | For each eligibility requirement in a tender, the checklist shows **met**, **not met**, or **needs review**, together with the requirement quotation from its source and the company fact used. |
| QUA-02 | An overall **readiness indicator** is one of: **blocked** (a mandatory requirement is not met), **needs review**, **meets entered requirements**, or **not assessed**. Also show a **compatibility percentage**: the proportion of applicable tender requirements that the company meets. |
| QUA-03 | Compare numbers, currencies, periods, and validity dates in code, not with AI. AI must never independently declare a company eligible. |
| QUA-04 | Experience and field-specific turnover count as met only when the subject clearly matches the tender. If AI assesses the subjects as similar, mark the item **check**. |
| QUA-05 | A requirement for “Certificate A or equivalent” is met by any one of the alternatives. |
| QUA-06 | Requirements outside the launch profile categories, and contract obligations that are not bidder eligibility requirements, are shown as **needs review** or listed separately; they are never counted as met. |
| QUA-07 | Check each company automatically against newly analyzed tenders and on demand from a tender page. When the profile or tender changes, mark the result as stale and allow it to be recalculated. |
| QUA-08 | **Top matches:** Show each company's open tenders with the best eligibility-check results on the home page. |

## 7. Tender discovery and workflow

### 7.1 Search and saved searches

| ID | Requirement |
|---|---|
| SRC-01 | Search by keyword (title and description), CPV codes, region, estimated value (range), submission deadline (range), publication period, contracting authority, tender type, status, strategic tenders, award criterion, and EU funding. |
| SRC-02 | Results show title, contracting authority, value, deadline, and publication date; support sorting and pagination. |
| SRC-03 | Save any search with a name for the active company. Saved searches can be renamed, deleted, and rerun with one click. |
| SRC-04 | Search tender documents. Results show snippets with matches highlighted and the document name. |

### 7.2 Tender page

| ID | Requirement |
|---|---|
| TEN-01 | Each tender has one page containing general information and change history; the sourced AI analysis; the eligibility checklist; and the document list, processing statuses, links to originals, and document search (SRC-04). |
| TEN-02 | Opening a tender never triggers paid AI processing by itself. Only the **Analyze** and **Check eligibility** buttons do so. |

## 8. Monitoring, bookmarks, and reminders

### 8.1 Email summaries

| ID | Requirement |
|---|---|
| MON-01 | An email summary lists new tenders matching the user's saved search, as well as updates to tenders already bookmarked. |
| MON-02 | The same summary lists important changes to bookmarked tenders: changed deadlines, modification decisions, new documents, or a tender being suspended or terminated. |
| MON-03 | Each user can enable or disable summaries and email reminders for each company. Every email includes an unsubscribe link. |
| MON-04 | The organization owner chooses which reminders the organization receives. |

### 8.2 Bookmarked tenders and reminders

| ID | Requirement |
|---|---|
| BMK-01 | Users can bookmark and unbookmark tenders. Bookmarks are shared across the company. The bookmarked-tenders list shows deadlines and can be sorted. |
| BMK-02 | Send email reminders for bookmarked tenders **7, 3, and 1 day** before the bid submission deadline. |
| BMK-03 | Reminders always use the current official deadline. When the deadline changes, reschedule upcoming reminders. Never send a reminder twice. |
| BMK-04 | The home page shows upcoming deadlines for bookmarked tenders, the company's top matches, and the newest tenders from saved searches. |

## 9. Administration and support

| ID | Requirement |
|---|---|
| ADM-01 | Provide a basic administration panel for the founders and PIKTech to manage organizations, companies, users, and limits. |
| ADM-02 | Allow an administrator to manually import a tender by its CAIS EPP number and rerun its analysis. |
| ADM-03 | Show failed jobs (import, documents, analysis) with an option to retry. |
| ADM-04 | Record AI costs and processing time for each tender for internal monitoring. |
| ADM-05 | Invoice pilot customers manually; online payments are not available at launch. |
| ADM-06 | Provide terms and privacy policy pages. The founders supply the text. |
| ADM-07 | Provide a basic view of usage by organization (users, companies, saved searches, bookmarked tenders, analyses) and processing status (last CAIS EPP check, imported and analyzed tenders, errors). |

## 10. Non-functional requirements

| Area | Requirement |
|---|---|
| Security | Enforce authorization server-side everywhere, use encrypted connections, store passwords securely, and keep secret keys out of the code. |
| Data protection | Company profile data is commercially sensitive: use it only for eligibility checks and never share it with other customers. Hosting is in the EU; the AI provider is based in the EU. |
| Traceability | Every AI result can be traced to the versions of the documents used, the AI model, and the prompt/instructions version. |
| Costs | Record and report AI cost per tender monthly so the analysis policy (AI-01) can be adjusted. |

## 11. Acceptance criteria

The MVP is complete when it has launched for both pilot customers and meets these criteria:

| Area | Criterion |
|---|---|
| Coverage | At least 90% of new tenders in CAIS are imported, with a weekly check against the official count. |
| Sources | 100% of displayed quotations can be verified in the source document. |

## 12. Founder inputs and open questions

### Founder inputs

1. Time with the CAIS EPP expert for checks and test data; the amount of time is to be agreed in Phase 0.
2. Timely decisions and feedback during development.
3. The text of the terms and privacy policy.

### Questions to resolve during validation

1. Which tenders should be analyzed automatically at launch: all new tenders or only those relevant to a customer (AI-01)?
2. Are the company profile categories (PRO-01) sufficient for the typical tenders of the two pilot customers?
3. Are email-only reminders sufficient at launch?

## 13. Deferred functionality

### 13.1 Excluded from the MVP / planned after launch

The MVP does not include online payments; AI-based company profile creation from pasted text or documents; award results in the interface or competitor analysis; data sources beyond CAIS EPP or tenders published before launch; team labels and comments; an in-app notification center (notifications are by email); or insurance-related features.

| Area | Deferred functionality |
|---|---|
| Import | Display award results on the tender page: contractors, awarded amounts, and results by lot. These are collected from launch; interface display is deferred (the source table refers to ING-06). |
| AI analysis | A table of tasks and technical specifications. |
| Company profile | Facts extracted by AI from pasted text. |
| Eligibility | **Add as company fact** directly from a checklist requirement; remove a linked fact from the result. |
| Monitoring | Per-user unread-tender markers in lists; unread counts in saved searches. |
| Reminders | Reminders for the questions deadline and site visits; configurable reminder days; in-app reminders. |
| Payments | Online card payments and invoicing. |
| Administration | Detailed processing-status dashboard with notifications. |

### 13.2 Later versions

Later versions are to be planned with the founders after the immediate post-launch period and funded as agreed in the partnership terms.

| Area | Deferred functionality |
|---|---|
| Data sources | TED (EU tenders), ISUN (European funds), and public procurement portals in other countries. |
| Documents | An administration screen for selecting files from very large archives. |
| AI analysis | Sector-specific sections for healthcare, ICT, and services (construction is in the MVP under AI-09). |
| Company profile | AI extraction from uploaded documents; duplicate-fact detection; fact versioning; remaining fact categories (e.g. CE marking, medicinal-product registration, ICT capabilities). |
| Eligibility | Full logic for complex conditions; semantic search; self-declarations with an audit trail. |
| Document search | Saved keywords with a document count for each tender. |
| Saved searches | Shareable saved-search links. |
| Notifications | In-app notification center and change notifications. |
| Collaboration | Labels and colors for bookmarked tenders; team comments on tenders. |
| Accounts | Self-service plan and user management; a feedback form and administrator feedback inbox; onboarding tours. |
| Analytics | Competitor analysis and analysis of awarded tenders. |
| Insurance | Insurance-related features, after an agreement with the insurer. |
| Home page | Team activity (recent comments); countdown to the next CAIS EPP check. |

## 14. Legacy-system data

The MVP is an entirely new implementation. Data from the previous system cannot be recovered, so nothing will be migrated:

- Approximately 6,000 tenders imported before launch and their analyses.
- Old company profiles, saved searches, bookmarked tenders, and matching results.
- User accounts, which will be recreated through invitations.

Pilot customers' profiles and saved searches will be set up again with them before launch.

## 15. Source-specification notes

- Requirement IDs are retained as written; gaps in the sequence are intentional to avoid renumbering.
- The source calls the launch profile categories “nine” but lists ten, including EIK/BULSTAT. This translation preserves the ten listed categories.
- The source says award notices are collected from launch and displayed immediately after launch under ING-05, while its deferred-functionality table says interface display is deferred and refers to ING-06. This inconsistency is surfaced here rather than resolved by assumption.
