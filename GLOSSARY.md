# EuroTender

Shared business language for finding and evaluating Bulgarian public procurement opportunities. These definitions distinguish customer data from public tender information and tender analysis from company-specific assessment.

## Language

### Customers and participation

**Organization**:
The paying EuroTender customer, which may manage multiple companies participating in tenders.
_Avoid_: Company, account, tenant when referring to the paying customer.

**Company**:
A tender participant managed by an organization, with its own profile, saved searches, bookmarks, and eligibility assessments.
_Avoid_: Organization, customer when referring to a tender participant.

**Active company**:
The company a user has currently selected as their working context.
_Avoid_: Active organization when referring to the selected company.

**Owner**:
An organization role responsible for managing that organization's companies and members.
_Avoid_: Platform administrator.

**Member**:
An organization role for a user who uses the product without the owner's organization-management responsibilities.

**Platform administrator**:
A platform-wide role for the founders and PIKTech to administer EuroTender customers and operations.
_Avoid_: Owner when referring to platform-wide administration.

### Procurement and evidence

**Tender**:
A public procurement opportunity published in CAIS EPP and tracked by EuroTender.
_Avoid_: Tender analysis when referring to the procurement opportunity itself.

**Contracting authority**:
The body conducting the public procurement.
_Avoid_: Customer when referring to the contracting authority.

**Lot**:
A separately identified part of a tender with its own subject and, where specified, value.

**Official metadata**:
Tender information supplied by the official notice, including deadlines, values, and codes; it takes precedence over conflicting AI-extracted values.

**Tender revision**:
A recorded version of a tender's official information and document references after an imported change.

**Document version**:
A particular version of a tender document used as a source, distinct from later replacements or amendments.

**Source quotation**:
Exact text from an identified document version and location, used as evidence for an analysis value or requirement.
_Avoid_: Summary, paraphrase when referring to an exact quotation.

**Eligibility requirement**:
A tender condition concerning a bidder's qualifications or capabilities, evaluated against company facts.
_Avoid_: Contract obligation when referring to bidder eligibility.

**Contract obligation**:
A condition concerning performance of the contract, distinct from a bidder eligibility requirement.

**Tender analysis**:
A sourced interpretation of a tender's information and requirements, reusable across companies and separate from any company's eligibility assessment.
_Avoid_: Eligibility assessment, company check when referring to shared tender analysis.

### Company facts and assessment

**Company profile**:
The structured collection of facts about a company used to assess tender eligibility.
_Avoid_: Organization profile when referring to a participant's qualifications.

**Company fact**:
A structured statement about a company's capabilities or qualifications, such as turnover, experience, certificates, personnel, or equipment.
_Avoid_: Eligibility requirement when referring to information about the company.

**Profile revision**:
A particular version of a company's profile used as the basis for an eligibility assessment.

**Eligibility assessment**:
A company-specific comparison of tender eligibility requirements with company facts, including checklist outcomes, readiness, and compatibility.
_Avoid_: Tender analysis, eligibility guarantee.

**Requirement outcome**:
The result for one eligibility requirement: met, not met, or needs review, accompanied by its source and the company facts used where available.

**Readiness indicator**:
The overall assessment outcome: blocked, needs review, meets entered requirements, or not assessed; blocked means a mandatory requirement is not met.
_Avoid_: Legal eligibility confirmation, award prediction.

**Compatibility percentage**:
The proportion of applicable tender requirements that the company meets.
_Avoid_: Probability of winning, AI confidence.

**Stale result**:
A previously produced analysis or assessment whose tender or profile inputs have since changed.
_Avoid_: Failed result when referring only to outdated inputs.

### Discovery and monitoring

**Saved search**:
A named set of tender-search criteria belonging to a company.
_Avoid_: Personal saved search when referring to ownership.

**Bookmark**:
A company's shared indication that it is following a tender.
_Avoid_: Personal bookmark when referring to the company-shared record.

**Email summary**:
An email containing new tenders matching saved searches and important changes to bookmarked tenders.
_Avoid_: In-app notification.

**Deadline reminder**:
An email reminder for a bookmarked tender, scheduled relative to its current official bid submission deadline.
