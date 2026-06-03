# Final Model Selection

Le modele final retenu pour l'API est **Logistic Regression avec PCA**,
sauvegarde dans `models/logistic_regression_pca.joblib`.

## Pourquoi ce modele est retenu

- Il offre un **recall eleve de 0.80**, ce qui est essentiel dans un contexte medical pour detecter un maximum de cas positifs.
- Il conserve un **ROC-AUC eleve de 0.8421**, ce qui montre une bonne capacite globale de discrimination.
- Son **F1-score est legerement meilleur avec PCA** que sans PCA, ce qui confirme un meilleur compromis entre precision et recall.
- La **reduction de dimension de 21 features a 11 composantes** simplifie le modele tout en conservant 95.45% de la variance.
- Ce choix est adapte au contexte de prediction du stroke car il **minimise les faux negatifs**, qui sont plus critiques que les faux positifs dans une application medicale.

## Modele deploye

- Modele source : `models/logistic_regression_pca.joblib`
- Modele final pour l'API : `models/final_model.joblib`
