# 🧞‍♂️ TripGenie — Autonomous AI Travel Planning Web Application

> **High-Fidelity Presentation Prototype**  
> Built with **React 18 + Vite + Tailwind CSS + Lucide React**.  
> **Frontend Only**: 100% Client-side state (`useState` / Context), zero backend or database setup, zero external API keys required.

---

## 🌟 Executive Summary

**TripGenie** is an autonomous AI travel planning web application that eliminates chaotic spreadsheets and manual coordination. It solves multi-day travel itineraries using:
1. **Zero Backtracking Route Optimization**: Algorithmic sequencing that minimizes transit time between heritage and city monuments.
2. **Document OCR Anchoring**: Automatic extraction of flight arrival slots (e.g. *Indigo 6E-204 at 10:15 AM*) and hotel check-in times (*ITC Rajputana at 12:00 PM*) from vouchers.
3. **Demographic Safety & Accessibility Auditing**: Dynamically prunes steep staircases for seniors/wheelchair travelers (e.g., *Dadi, 68*) and enforces an **8:00 PM local curfew**.
4. **Zero-Data Offline GPX Navigation**: Standalone waypoint vectors (`.GPX` / `.KML`) that navigate natively on device hardware without cellular reception.
5. **Workation Time-Blocker**: Interactive schedule splitter that locks core remote work hours (10:00 AM – 3:30 PM) and arranges sightseeing strictly during morning and evening windows.

---

## 🧭 The 5 Presentation Screens & User Journey

### 1. `Landing & Auth` (`/landing`)
- **Hero Section**: *"Autonomous Travel Planning Agent — Zero Backtracking, Adaptive Safety & Offline Navigation"*.
- **Primary CTAs**:
  - `Plan a New Trip` (navigates directly into the Intake wizard).
  - `Saved Trips` (opens modal with 3 pre-loaded expeditions: Jaipur, Udaipur, and Ladakh).
- **Feature Highlights**:
  - *Document OCR Anchoring*: Flight & hotel chip preview.
  - *Demographic Safety & Accessibility*: Curfew alert preview.
  - *Zero-Data Offline GPX Navigation*: Local GPS hardware badge.
- **Simulated Auth Card**:
  - "Continue with Google" one-tap OAuth simulation.
  - Live validation checkmarks for email and password fields.
  - Supabase Auth & Row-Level Security (RLS) security badge.

### 2. `Trip Intake` (`/intake`)
- **Step 1: Destination & Bookings**:
  - Pre-filled destination: *Jaipur, Rajasthan*.
  - Date range: *Nov 12 – Nov 16, 2026 • 4 Days*.
  - Target budget slider set to *₹35,000* with dynamic rupee breakdown.
  - Dashed-border **Document Dropzone** displaying extracted OCR chips (*Indigo 6E-204*, *ITC Rajputana*), with a `+ Upload Test Voucher` button to simulate adding passes.
  - External referral quick pills: *MakeMyTrip*, *Google Flights*, and *Booking.com*.
- **Step 2: Traveler Dynamics & Vulnerability Profiler**:
  - Toggle chips: `Solo`, `Couple`, `Family`, and `Friends` (switches member rosters dynamically).
  - 3 Sample Member Cards:
    - *Aarav Sharma* (24, Male, Trip Lead & Driver).
    - *Riya Verma* (23, Female, Tag: `[🥗 Pure Veg]`).
    - *Dadi / Nirmala Sharma* (68, Female, Tags: `[♿ Wheelchair Access]`, `[Low Walking Pace]`).
  - Prominent **Safety & Accessibility Alert Shield**: *"High-Safety & Step-Free Filter Active: Night curfew set to 8:00 PM; steep staircases pruned"*.
- **Step 3: Trip Modality**:
  - Toggle between `Casual / Leisure` and `Professional / Workation`.
  - Selecting **Workation** renders an interactive visual timeline bar: *"Locked Work Hours: 10:00 AM – 3:30 PM (Sightseeing scheduled exclusively in morning & evening windows)"*.
- **Bottom Action**: `Generate Optimized Itinerary` with simulated AI route computation.

### 3. `Review Studio` (`/studio`)
- **Dual-Pane Layout**:
  - **Left Pane (Day Timeline)**:
    - Switchable tabs for `Day 1`, `Day 2`, `Day 3`, and `Day 4`.
    - Day 1 chronological venue cards:
      1. *10:30 AM* — Hotel Check-in at ITC Rajputana.
      2. *11:45 AM* — Transit (🚗 18 mins).
      3. *12:15 PM* — City Palace & Jantar Mantar (Badges: `Safety: 9.4/10`, `Wheelchair Accessible`, `Cost: ₹300`).
      4. *02:00 PM* — Pure Veg Rajasthani Lunch Stop (Laxmi Misthan Bhandar).
      5. *03:30 PM* — Hawa Mahal (Photo & Audio Tour).
      6. *05:30 PM* — Sunset at Nahargarh Fort (Badges: `Safety: 8.8/10`, `Alert: Leave before 8:00 PM`).
    - Advisory notice banner: *"⚠️ Operating Hours Advisory: City Palace closes at 5:00 PM. Arrival planned for 12:15 PM."*
  - **Right Pane (Vector Map & Collaborative Drawer)**:
    - Styled dark-mode vector map container of Jaipur with connected numbered waypoint pins (1 ➔ 2 ➔ 3 ➔ 4 ➔ 5 ➔ 6).
    - Pin clicking synchronizes and highlights the active stop card.
    - **In-App Group Chat Drawer**:
      - Message feed with co-traveler message: *"Hey, can we move Nahargarh Fort to sunset tomorrow?"*
      - Interactive input field with simulated AI Agent replies.
      - **Group Proposal Card**: *"Vote: Swap Stop 4 for Chokhi Dhani?"* with clickable `[Approve (2/3)]` and `[Reject]` buttons that update vote counts and status live.

### 4. `Live Navigation` (`/live`)
- **Active Venue Card**: *"Current En Route Stop: Hawa Mahal • Departing in 15 Minutes"*.
  - Distance: 2.4 km • ETA: 12 Mins • Traffic: Light Green.
  - Interactive audio tour mini-player (*"Jaipur Royal Courtyards Commentary"*).
- **Proactive Alarm Card**: *"🔔 Departure Alert: Leave in 15 minutes to reach Albert Hall Museum on schedule"* with live countdown timer.
- **Dual Navigation Buttons**:
  - Primary: `🗺️ Open Turn-by-Turn Route in Google Maps` (triggers GPS turn guidance modal).
  - Secondary: `📥 Download Offline Day Package (.GPX / .KML)` (triggers download of offline waypoint bundle).
- **Dynamic Rescheduler Simulation Section**:
  - `Mark as Visited & Checked In` button (marks current stop visited and advances sequence).
  - **Interactive Missed Stop Box**:
    - Alert: *"⚠️ Missed Check-in Detected: You did not check in at Albert Hall Museum by 4:30 PM. Would you like to drop this stop or reschedule it to tomorrow morning?"*
    - Two clickable buttons: `[Reschedule to Day 2 Morning]` and `[Drop from Route]` with animated confirmation states.

### 5. `Master Dossier` (`/dossier`)
- **Printable A4-Styled Preview Document**:
  - Header: *"TripGenie Master Dossier — Jaipur 4-Day Cultural Tour"* (REF: `TG-JAI-2026-9481`).
  - **Traveler Roster Table**: Demographics, blood groups, and emergency numbers.
  - **Complete 4-Day Summarized Schedule Table**: Morning, afternoon, sunset windows, and curfew status.
  - **Emergency Directory Grid**: Local Police (`112`), Ambulance (`102 / 108`), SMS Medical Hospital (`+91-141-2518210`), and Tourist Police (`+91-141-2372200`).
  - **Ticket Barcode & Hotel Confirmation QR Code** graphic.
- **Action Buttons**:
  - Primary: `📄 Download Complete Dossier (PDF)` (triggers instant PDF download / print dialog).
  - Secondary: `📲 Share Read-Only Tracking Link with Family` (opens share modal with one-click copy).

---

## 🛠️ Environment & Toolchain Setup

The project libraries and Node.js environment are cleanly isolated in the dedicated environment:
```
/Users/sankalp/SRS(UNSYNCED)/Work/7TH SEM/MP/tripgenie_venv
```

### Running Locally

```bash
# 1. Export PATH to use the isolated environment
export PATH="/Users/sankalp/SRS(UNSYNCED)/Work/7TH SEM/MP/tripgenie_venv/bin:$PATH"

# 2. Navigate to project root
cd "/Users/sankalp/SRS(UNSYNCED)/Work/7TH SEM/MP/TripGenie"

# 3. Start development server
npm run dev

# 4. Or build production bundle
npm run build
```

---

## 🎨 Design Tokens

- **Background**: Deep Slate (`#020617` / `bg-slate-950`) with subtle 36px SVG grid pattern
- **Panels**: Glassmorphism (`backdrop-blur-md bg-slate-900/65 border border-slate-800/80`)
- **Electric Cyan Accents**: `#38BDF8` (Active routes, primary highlights, glow shadows)
- **Emerald Accents**: `#10B981` (Safety compliance, step-free access, verified checkmarks)
- **Amber Accents**: `#F59E0B` (Curfew warnings, operating hours advisories, alarms)
- **Typography**: Inter (Body) and Outfit (Headings) via Google Fonts
