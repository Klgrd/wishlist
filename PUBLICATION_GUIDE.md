# Guide de Publication sur GitHub Pages 🚀

## Étape 1: Configuration Git (À faire maintenant)

Exécutez ces commandes dans votre terminal en remplaçant par vos informations :

```bash
git config --global user.name "Votre Nom"
git config --global user.email "votre.email@example.com"
```

## Étape 2: Créer le repository sur GitHub

1. Allez sur [GitHub.com](https://github.com)
2. Cliquez sur le bouton "+" en haut à droite
3. Sélectionnez "New repository"
4. Nommez-le `wishlist` (ou le nom de votre choix)
5. Laissez-le **public**
6. **NE PAS** initialiser avec README (nous l'avons déjà)
7. Cliquez sur "Create repository"

## Étape 3: Publier sur GitHub

Une fois le repository créé, exécutez ces commandes :

```bash
# Ajouter le remote (remplacez USERNAME par votre nom d'utilisateur GitHub)
git remote add origin https://github.com/USERNAME/wishlist.git

# Pousser le code
git branch -M main
git push -u origin main
```

## Étape 4: Activer GitHub Pages

1. Dans votre repository GitHub, allez dans "Settings"
2. Faites défiler jusqu'à "Pages" dans le menu de gauche
3. Dans "Source", sélectionnez "Deploy from a branch"
4. Choisissez la branche "main"
5. Cliquez sur "Save"

## Étape 5: Accéder à votre site

Votre site sera disponible à l'adresse :
`https://USERNAME.github.io/wishlist`

## 🎉 Félicitations !

Votre page de wishlist est maintenant publique sur GitHub Pages !

## 📝 Personnalisation

Pour personnaliser votre wishlist :
1. Modifiez `wishlist_page.html`
2. Ajoutez vos vrais cadeaux avec de vraies images
3. Committez et poussez les changements :
   ```bash
   git add .
   git commit -m "Mise à jour de la wishlist"
   git push
   ```

## 🔗 Liens utiles

- [Documentation GitHub Pages](https://pages.github.com/)
- [Guide Git](https://git-scm.com/doc) 