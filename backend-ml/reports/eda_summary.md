# EDA Summary

## Vue d'ensemble
- Le dataset contient **5110 lignes** et **12 colonnes**.
- La variable `bmi` contient **201 valeurs manquantes**.
- Le dataset contient **0 doublon**.

## Variable cible `stroke`
- Classe `0` : **4861** observations (**95.13%**).
- Classe `1` : **249** observations (**4.87%**).
- La cible est fortement déséquilibrée, ce qui devra être pris en compte pendant la modélisation.

## Corrélations numériques avec `stroke`
- `age` : corrélation de **0.245** avec `stroke`.
- `heart_disease` : corrélation de **0.135** avec `stroke`.
- `avg_glucose_level` : corrélation de **0.132** avec `stroke`.

## Taux de stroke par groupe
- `gender` : Male = 5.11%, Female = 4.71%, Other = 0.00%
- `hypertension` : 0 = 3.97%, 1 = 13.25%
- `heart_disease` : 0 = 4.18%, 1 = 17.03%
- `smoking_status` : formerly smoked = 7.91%, smokes = 5.32%, never smoked = 4.76%, Unknown = 3.04%

## Points d'attention
- Les valeurs manquantes de `bmi` devront être imputées avant l'entraînement.
- Le déséquilibre de classes suggère l'usage de métriques adaptées et possiblement d'une stratégie de rééquilibrage.
- Les variables liées à l'âge, au glucose, à l'hypertension et aux maladies cardiaques sont à surveiller pendant le preprocessing et la modélisation.
