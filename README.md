# 🧬 EZVector

EZVector is a full-stack web application that allows customers to **design and order custom plasmids** in various ways.  
Users can combine synthetic DNA, their own DNA fragments, or perform multi-site mutagenesis — all through an intuitive web interface with live plasmid visualization and automated cost calculations.

---

## 🧠 Overview

EZVector supports:
- 🧫 **Vector + Synthetic DNA**
- 🧬 **Vector + Your Fragments**
- 🧱 **Build Your Own Backbone**
- 🧪 **Multi-Site Mutagenesis**

Each order type includes validation, visualization, pricing, and automated backend processing.  
Managers can track all orders, update statuses, and manage users.

---

## 🚀 Tech Stack

| Layer | Technology |
|--------|-------------|
| **Frontend** | React + TypeScript + TailwindCSS |
| **Backend** | Spring Boot (Java 17, Gradle) |
| **Database** | PostgreSQL (hosted via [Supabase](https://supabase.com)) |
| **Version Control** | Git + GitHub |
| **Deployment (optional)** | Frontend → Vercel / Backend → Render / Database → Supabase |

---

## 🗂️ Project Structure

ezvector/
├── backend/ # Java Spring Boot + Gradle
│ ├── src/ # Backend source files
│ └── build.gradle # Dependencies and config
│
├── frontend/ # React + TypeScript + Tailwind
│ ├── src/ # Components, pages, and services
│ └── package.json # Frontend dependencies
│
├── .gitignore # Ignored files
└── README.md # Setup instructions (you are here)


---

## ⚙️ 1. Prerequisites

Install the following tools before starting:

| Tool | Version | Purpose |
|------|----------|----------|
| **Java** | 17+ | Run backend |
| **Gradle** | 8+ | Build backend |
| **Node.js** | 18+ | Run frontend |
| **npm** | 9+ | Manage frontend packages |
| **Git** | 2.30+ | Version control |
| **PostgreSQL** | optional | Local DB (if not using Supabase) |

---

