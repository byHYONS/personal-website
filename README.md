# 🌐 Personal Website – Samuele Paratore

![GitHub repo size](https://img.shields.io/github/repo-size/byHYONS/personal-website?color=blue)
![GitHub stars](https://img.shields.io/github/stars/byHYONS/personal-website?style=social)
![GitHub license](https://img.shields.io/github/license/byHYONS/personal-website)

> **Un sito web moderno e performante che unisce Vue.js con Firebase Functions per un'architettura scalabile e serverless.**  
> Progettato per garantire velocità, sicurezza e automazione nella gestione dei contatti.

---

## 📌 Tecnologie Utilizzate

### 🎨 **Frontend – Vue.js + Vite**

- **Vue.js 3**: Framework reattivo e performante per il frontend.
- **Vite**: Build tool ultra veloce per lo sviluppo locale.
- **Vue Router**: Gestione delle pagine e della navigazione.
- **SCSS & Bootstrap**: Per lo stile e la UI.

### ☁️ **Backend – Firebase Functions (Serverless)**

- **Firebase Cloud Functions**: Logica lato server senza bisogno di un backend dedicato.
- **Firestore**: Database NoSQL per la gestione dei messaggi.
- **Nodemailer**: Integrazione con Gmail per l’invio automatico di email.

### 🔐 **Sicurezza e Ambiente**

- **Variabili d’ambiente (.env)**: Due file `.env` separati per frontend e backend.
- **IAM & Permissions**: Configurazione degli accessi su Firebase.
- **API Google Cloud**: Configurate per gestire Eventarc e Cloud Build.
- **Google reCAPTCHA v3**: Protezione avanzata anti-spam per i moduli di contatto.

---

## ✨ Funzionalità Implementate

### 📩 Sistema di Contatto con Email Automatica

    •	Firestore: Quando un utente invia un messaggio, viene salvato su Firestore.
    •	Cloud Function Trigger: Quando un nuovo messaggio viene salvato, parte un’email automatica.
    •	Email di notifica: L’admin riceve un’email con i dettagli del messaggio.
    •	Email di conferma all’utente: L’utente riceve un’email con il riepilogo del suo messaggio.

### 🛡 Protezione Anti-Spam con Google reCAPTCHA v3

    •	Esecuzione dinamica di reCAPTCHA: Caricamento dello script solo quando necessario.
    •	Verifica del token reCAPTCHA: Ogni richiesta viene autenticata prima dell’invio a Firestore.
    •	Rimozione badge reCAPTCHA su unmount: Per evitare effetti visivi indesiderati.

### 🔥 Effetti UI Avanzati

    •	Modal con overlay animato: Sfondo sfocato e apertura fluida.
    •	Gradient animato nei titoli: Effetto visivo dinamico su testi importanti.
    •	Overlay con gradient animato: Effetto di transizione moderna sulle sezioni del sito.
    •	Messaggi di avviso dinamici: Si mostrano per 25 secondi e poi scompaiono.

## 🏆 Sfide Affrontate 🚀

### 1️⃣ Configurazione Firebase Functions su Node.js 22

    •	Problema: Firebase ha aggiornato il supporto per Node.js 22, cambiando il metodo di registrazione delle funzioni.
    •	Errore iniziale: functions.firestore.document is not a function
    •	Soluzione: Usato onDocumentCreated da firebase-functions/v2/firestore.

### 2️⃣ Implementazione Sicura di reCAPTCHA v3

    •	Problema: Alcuni browser bloccavano il caricamento dello script reCAPTCHA.
    •	Soluzione: Caricato dinamicamente lo script solo quando necessario.

### 3️⃣ Gestione dei Permessi IAM su Google Cloud

    •	Problema: Eventarc non aveva i permessi propagati.
    •	Errore: Permission denied while using the Eventarc Service Agent
    •	Soluzione: Aggiunto service-<PROJECT_NUMBER>@gcp-sa-eventarc.iam.gserviceaccount.com con permessi adeguati.

### 4️⃣ Evitare Spese Inutili su Firebase

    •	Configurato Logging Retention per evitare accumulo di log.
    •	Controllato e ripulito le build images da Google Cloud.

## 📜 Conclusioni

Questo progetto combina frontend moderno, backend serverless e automazione avanzata, garantendo una soluzione efficiente e scalabile.

### 💡 Prossimi miglioramenti:

    •	Dashboard per gestire i messaggi ricevuti.
    •	Ulteriore ottimizzazione delle performance.

### 🔥 Progetto realizzato da Samuele Paratore

### 🌐 Visita il sito: samueleparatore.com

###### byHYONS©

