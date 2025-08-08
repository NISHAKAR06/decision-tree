# Decision Tree (Flask + React)

An educational, full‑stack application for learning and experimenting with Decision Trees, a core algorithm in supervised machine learning.  
Backend: Python Flask (REST API) • Frontend: React + TypeScript (Vite)

## Overview

- Purpose: This application is used to learn decision tree algorithms in machine learning (supervised learning). It helps users understand how trees split data, how metrics like Gini and Entropy work, and how predictions are made.
- Audience: Students, educators, and practitioners who want an interactive way to explore decision trees for classification or regression.

## What is a Decision Tree?

A Decision Tree is a tree‑structured model that makes predictions by repeatedly splitting data into subsets based on feature values:

- Nodes represent questions (feature tests).
- Edges represent answers (outcomes of the test).
- Leaves represent final predictions (class labels or numeric values).

Common concepts:
- Splitting criteria:
  - Classification: Information Gain (based on Entropy) or Gini Impurity.
  - Regression: Variance Reduction or Mean Squared Error reduction.
- Stopping criteria: Maximum depth, minimum samples per node, minimum impurity decrease, or no further improvement.
- Pruning: Techniques (pre- or post-pruning) to reduce overfitting by limiting complexity.
- Handling features: Categorical splits by category; continuous splits by thresholds.
- Pros:
  - Interpretable, visual, and easy to explain.
  - Handles mixed feature types and non-linear relationships.
- Cons:
  - Can overfit without regularization.
  - Small data changes can lead to different trees (instability).
  - May be outperformed by ensembles (Random Forests, Gradient Boosted Trees).

Use cases: Credit risk, medical triage, churn prediction, pricing, and any task where transparent rules are valuable.

## Features (Education-Focused)

- Build and visualize a decision tree from a dataset (classification or regression).
- Inspect split metrics (Gini/Entropy/Information Gain or MSE reduction).
- Step‑through training to see how splits are chosen.
- Make predictions by traversing the tree path.
- Import/export tree and dataset (e.g., JSON/CSV) for experimentation.

Note: Exact feature availability depends on the current implementation status; see the project board or issues for progress.

## Tech Stack

- Backend: Python 3.9+ with Flask (REST API)
- Frontend: React 18 + TypeScript, Vite dev server and build
- Optional/dev: CORS for local development, environment variables for configuration

## Repository Structure

Adjust as needed if your paths differ.

```
decision-tree/
├─ backend/            # Flask API
│  ├─ app.py           # Flask entrypoint (example)
│  ├─ requirements.txt # Python dependencies
│  └─ ...              # blueprints, services, models, utils
└─ frontend/           # React (Vite) app
   ├─ package.json
   ├─ vite.config.ts
   └─ src/
      ├── App.css
            ├── App.tsx
            ├── index.css
            ├── main.tsx
            ├── vite-env.d.ts
            ├── components/
            │   ├── Navbar.tsx
            │   └── ui/

```

## Getting Started

Prerequisites:
- Node.js 18+ and npm (or yarn/pnpm)
- Python 3.9+ and pip

1) Backend (Flask)
- Create and activate a virtual environment
  - macOS/Linux:
    - cd backend
    - python -m venv .venv
    - source .venv/bin/activate
  - Windows (PowerShell):
    - cd backend
    - py -m venv .venv
    - .\.venv\Scripts\Activate.ps1
- Install dependencies
  - pip install -r requirements.txt
- Environment variables (example)
  - Create a .env or export in shell:
    - FLASK_APP=app
    - FLASK_ENV=development
    - PORT=5000
- Run the API
  - flask run --debug --port 5000
  - API served at http://localhost:5000

2) Frontend (React + Vite)
- Install dependencies
  - cd frontend
  - npm install
- Configure API URL
  - Create frontend/.env.local (if not present) and set:
    - VITE_API_URL=http://localhost:5000
- Run the dev server
  - npm run dev
  - App opens at the URL printed in the terminal (default http://localhost:5173)

## Connecting Frontend and Backend

- Frontend usage
  - const baseURL = import.meta.env.VITE_API_URL
- CORS (Flask)
  - For direct browser calls during dev: pip install flask-cors
  - from flask_cors import CORS; CORS(app)
- Optional: Vite dev proxy (avoids CORS)
  - In frontend/vite.config.ts:
    ```ts
    server: { proxy: { '/api': 'http://localhost:5000' } }
    ```
  - Then call fetch('/api/...') from the frontend.

## Example API Contract

Adapt to your implementation.

- Health
  - GET /api/health -> 200 { "status": "ok" }
- Trees
  - GET /api/trees -> list trees
  - GET /api/trees/:id -> get a tree
  - POST /api/trees -> create a tree (JSON body)
  - PUT /api/trees/:id -> update a tree
  - DELETE /api/trees/:id -> delete a tree
- Train/fit
  - POST /api/train -> build a tree from data and return model summary
- Predict
  - POST /api/predict -> return prediction and path taken through the tree

## Datasets and Formats

- CSV (tabular): first row headers; target column specified in request or config.
- JSON: array of records with consistent keys; target key specified.
- Missing values: define your policy (drop, impute, separate branch).

## Learning Objectives

- Understand how supervised learning with decision trees works end‑to‑end.
- Compare splitting metrics (Gini vs Entropy vs MSE).
- Visualize overfitting and apply pruning or depth limits.
- Interpret model decisions via tree paths.
- Practice with classification and regression examples.

## Production

- Backend
  - Use a WSGI server (e.g., gunicorn) with FLASK_ENV=production
  - Example: gunicorn -w 4 -b 0.0.0.0:5000 app:app
- Frontend
  - cd frontend && npm run build
  - Serve dist/ via Nginx/Apache/CDN or configure Flask to serve static files

## Troubleshooting

- Frontend cannot reach API
  - Check VITE_API_URL or Vite proxy settings
  - Ensure Flask is running on the expected port
- CORS errors
  - Enable flask-cors or use the Vite proxy
- Port in use
  - Change ports in .env or run commands

## Roadmap Ideas

- Interactive step‑through training and split visualization
- Import/export of trees (JSON) and datasets (CSV)
- Support for pruning methods and cross‑validation
- Sample datasets and guided tutorials
- Metrics dashboard (accuracy, precision/recall, RMSE)
- Persistence (save/load trees) and sharing links

## Contributing

Contributions are welcome! Please open an issue to discuss ideas, or submit a PR from a feature branch.

## License

Add a LICENSE file (e.g., MIT) if you plan to share or distribute this project.
