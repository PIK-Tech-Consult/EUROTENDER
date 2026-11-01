# EuroTender MVP — Project Description

## Overview

EuroTender helps companies find and evaluate Bulgarian public procurement opportunities published in the Centralised Automated Information System for Electronic Public Procurement (CAIS EPP, app.eop.bg).

The MVP is intended for two pilot customers. Each customer is an organization that can manage multiple companies participating in tenders. Users work in the context of one selected company at a time.

## Product goal

Customers receive newly published tenders relevant to them, either by searching or through notifications. They can open a tender and review the important information—with sources—including financial details, deadlines, and eligibility requirements. They can compare those requirements with their company's profile, bookmark tenders, and receive reminders before submission deadlines.

## MVP boundaries

- **Market and data:** Bulgaria only; public procurement published in CAIS EPP. Only tenders published from the MVP launch onward are included.
- **Language:** The MVP interface and AI analysis are in Bulgarian.
- **Devices:** Desktop browsers, using recent versions of Chrome, Edge, Firefox, and Safari.
- **Notifications:** Email summaries and deadline reminders; there is no in-app notification center at launch.
- **Billing:** Pilot customers are invoiced manually. Online card payments and self-service plan management are not included.
- **AI:** Analysis is available for new tenders according to a policy agreed with the founders, and on demand for other tenders. Opening a tender does not itself trigger paid AI processing.

Detailed functional requirements, non-functional requirements, acceptance criteria, dependencies, open questions, and deferred functionality are in [Requirements.md](./Requirements.md).

Confirmed technology choices, proposed system boundaries, and AI processing recommendations are in [Architecture.md](./Architecture.md).

## User experience at a glance

1. The service imports new tenders and their documents from CAIS EPP and tracks changes.
2. Customers search for tenders or receive email summaries matching their saved searches.
3. A tender page brings together the tender details, sourced AI analysis, eligibility checklist, document processing status, and links to original documents.
4. A company profile holds structured facts used to check tender eligibility.
5. Users bookmark tenders and receive email reminders before their submission deadlines.

## Delivery and collaboration

The founders provide access to a CAIS EPP expert for checks and test data, timely decisions and feedback, and the text for the terms and privacy policy. The founders, PIKTech, and the two pilot customers prepare the pilot company profiles before launch.

The MVP is complete when it has been launched for both pilot customers and meets the acceptance criteria in the requirements document.

## Existing-system data

The MVP is a new implementation. Data from the previous system cannot be recovered and will not be migrated. This includes previously imported tenders and analyses, company profiles, saved searches, bookmarked tenders, matching results, and user accounts. Pilot company profiles and saved searches will be set up again with the customers before launch.

## Future scope

The initial release excludes, among other items, data sources beyond CAIS EPP, tenders published before launch, online payments, in-app notifications, team labels and comments, AI-assisted profile creation, competitor analysis, and insurance-related features. A broader roadmap for later versions is recorded in the requirements document.
