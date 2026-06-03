# Model Comparison Summary

- PCA appliquee avec **11 composantes**.
- Comparaison realisee entre les modeles entraines sans PCA et avec PCA.

## Synthese par modele
### logistic_regression
- Accuracy : sans PCA = **0.7515**, avec PCA = **0.7622**, delta = **+0.0108**
- Precision : sans PCA = **0.1408**, avec PCA = **0.1465**, delta = **+0.0057**
- Recall : sans PCA = **0.8000**, avec PCA = **0.8000**, delta = **+0.0000**
- F1-score : sans PCA = **0.2395**, avec PCA = **0.2477**, delta = **+0.0082**
- ROC-AUC : sans PCA = **0.8450**, avec PCA = **0.8421**, delta = **-0.0029**

### random_forest
- Accuracy : sans PCA = **0.9188**, avec PCA = **0.8885**, delta = **-0.0303**
- Precision : sans PCA = **0.0976**, avec PCA = **0.1279**, delta = **+0.0303**
- Recall : sans PCA = **0.0800**, avec PCA = **0.2200**, delta = **+0.1400**
- F1-score : sans PCA = **0.0879**, avec PCA = **0.1618**, delta = **+0.0739**
- ROC-AUC : sans PCA = **0.7497**, avec PCA = **0.7813**, delta = **+0.0316**

### xgboost
- Accuracy : sans PCA = **0.9227**, avec PCA = **0.8601**, delta = **-0.0626**
- Precision : sans PCA = **0.2157**, avec PCA = **0.1026**, delta = **-0.1131**
- Recall : sans PCA = **0.2200**, avec PCA = **0.2400**, delta = **+0.0200**
- F1-score : sans PCA = **0.2178**, avec PCA = **0.1437**, delta = **-0.0741**
- ROC-AUC : sans PCA = **0.7891**, avec PCA = **0.7631**, delta = **-0.0260**

## Conclusion
- Meilleur F1-score sans PCA : **logistic_regression** avec **0.2395**.
- Meilleur F1-score avec PCA : **logistic_regression** avec **0.2477**.
- La decision finale peut privilegier soit la performance predictive, soit la reduction de dimension et la simplicite du modele.
