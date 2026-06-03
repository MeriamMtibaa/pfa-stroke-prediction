# PFA Stroke Prediction

Application de prédiction du risque d'AVC basée sur le Machine Learning.

Le projet est composé de :

* Un backend FastAPI
* Un frontend React + Vite
* Un modèle de Machine Learning pour la prédiction du risque d'AVC

---

## Stack technique

### Backend

* Python
* FastAPI
* scikit-learn
* imbalanced-learn
* XGBoost

### Frontend

* React
* Vite
* Axios
* React Router DOM

### Machine Learning

* Preprocessing sklearn
* PCA
* SMOTE
* Logistic Regression

---

## Structure du projet

```text
pfa-ml/
├── backend-ml/
│   ├── data/
│   ├── models/
│   ├── reports/
│   ├── src/
│   ├── main.py
│   └── requirements.txt
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
└── README.md
```

---

## Installation du Backend

```bash
cd backend-ml

python3 -m venv venv

source venv/bin/activate

pip install -r requirements.txt
```

### Lancement du Backend

```bash
cd backend-ml

source venv/bin/activate

uvicorn main:app --reload
```

Documentation API :

```text
http://127.0.0.1:8000/docs
```

---

## Installation du Frontend

```bash
cd frontend

npm install
```

### Lancement du Frontend

```bash
cd frontend

npm run dev
```

Application :

```text
http://localhost:5173
```

---

## Routes API principales

```http
GET /
GET /health
GET /model-info
GET /metrics
GET /form-options
GET /sample-patient
POST /predict
```

---

## Modèle Machine Learning

### Modèle final

* Logistic Regression avec PCA

### Pipeline

```text
Preprocessing
→ PCA
→ SMOTE
→ Logistic Regression
```

### Réduction de dimension

```text
21 features → 11 composantes PCA
```

Variance conservée :

```text
95.45%
```

---

## Performances du modèle

| Métrique | Valeur |
| -------- | ------ |
| Recall   | 0.80   |
| ROC-AUC  | 0.8421 |

Le modèle final a été retenu car il minimise les faux négatifs, ce qui est particulièrement important dans un contexte médical.

---

## Commandes Git utiles

```bash
git status

git add .

git commit -m "message"

git push origin main

git pull origin main
```
