# Impostazione di Functions di Firebase

## Per le funzioni Firebase, crea un file .env dentro functions/:

```.env
EMAIL_USER=tuo@email.com
EMAIL_PASS=tua_password
EMAIL_DESTINATION=email_destinazione@esempio.com
```

### Installa il pacchetto dotenv

Devi installare dotenv per leggere le variabili .env:

```sh
cd ~/Desktop/proJECT/developer/projects/personal-website/functions
npm install dotenv
```

### Escludi il file .env dal repository

Non vogliamo pushare le credenziali su GitHub! Quindi aggiungiomo .env al file .gitignore:

```sh
echo ".env" >> ~/Desktop/proJECT/developer/projects/personal-website/functions/.gitignore
```

---

## FASE 1: Configurazione di Firebase CLI

Per poter utilizzare Firebase Cloud Functions, devi installare e configurare la CLI di Firebase.

### 1. Installa Firebase CLI

Apri il terminale e installa Firebase CLI globalmente:

```sh
npm install -g firebase-tools
```

### 2. Effettua il login a Firebase

Ora esegui il comando:

```sh
firebase login
```

Ti aprirà una finestra nel browser per autenticarti con il tuo account Google. Accedi con l’account con cui hai creato il progetto Firebase.

### 3. Inizializza il progetto Firebase nel tuo progetto Vue.js

Vai nella root del tuo progetto Vue.js (dove c’è il tuo package.json) e digita:

```sh
firebase init functions
```

Questo avvierà la configurazione delle Cloud Functions. Ti farà alcune domande:
• Select a default Firebase project:
→ Scegli il tuo progetto Firebase (es. webapp-samueleparatore).
• What language would you like to use to write Cloud Functions?
→ Seleziona JavaScript.
• Do you want to use ESLint?
→ Puoi rispondere No, se non vuoi regole di linting forzate.
• Do you want to install dependencies?
→ Rispondi Yes.

Dopo aver completato questa configurazione, nella root del tuo progetto Vue apparirà una cartella chiamata functions/, che conterrà il codice delle Cloud Functions.

## FASE 2: Scrivere la Cloud Function per l’invio dell’email

Ora andiamo a scrivere la funzione che invierà un’email ogni volta che un nuovo messaggio viene salvato nel Firestore.

### 1. Installa la libreria per inviare email

Spostati dentro la cartella functions/ ed esegui:

```sh
cd functions
npm install nodemailer
```

_nodemailer è una libreria che useremo per inviare email con Gmail._

### 2. Apri il file functions/index.js e sostituiscilo il codice, nel mio caso con questo codice:

```js
require("dotenv").config();

const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { initializeApp } = require("firebase-admin/app");
const nodemailer = require("nodemailer");

initializeApp();

// Configura il transporter di Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Password per app!
  },
});

// Funzione trigger per Firestore
exports.sendEmailOnNewMessage = onDocumentCreated(
  "messages/{messageId}",
  async (event) => {
    const data = event.data && event.data.data();
    if (!data) {
      console.error("Nessun dato trovato nel messaggio.");
      return;
    }

    // Avviso email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_DESTINATION,
      subject: "Nuovo Messaggio dal form del sito samueleparatore",
      text:
        `Hai ricevuto un messaggio dal form di contatto del sito web:\n` +
        `samueleparatore.com\n\n` +
        `Nome: ${data.name}\n` +
        `Telefono: ${data.phone}\n` +
        `Email: ${data.email}\n` +
        `Privacy Policy Accettata: True\n` +
        `Messaggio: ${data.message}`,
    };

    // Email di conferma all'utente
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: data.email, // L'email dell'utente che ha inviato il messaggio
      subject: "Ho ricevuto il tuo messaggio!",
      text:
        `Ciao ${data.name},\n\n` +
        `Ho ricevuto il tuo messaggio dal form di contatto del sito web:\n` +
        `samueleparatore.com\n\n` +
        `Ti ricontatterò il prima possibile,` +
        ` generalmente rispondo entro le 24h.\n\n` +
        `Ecco una copia del tuo messaggio:\n` +
        `------------------------------\n` +
        `Nome: ${data.name}\n` +
        `Telefono: ${data.phone}\n` +
        `Email: ${data.email}\n` +
        `Privacy Policy Accettata: True\n` +
        `Messaggio: ${data.message}\n` +
        `------------------------------\n\n` +
        `Cordiali Saluti,\n` +
        `geom. Samuele Paratore`,
    };

    try {
      // Invio email notifica
      await transporter.sendMail(mailOptions);
      console.log("Email inviata con successo a te!");

      // Invio email di conferma all'utente
      await transporter.sendMail(userMailOptions);
      console.log("Email di conferma inviata all'utente!");
    } catch (error) {
      console.error("Errore nell'invio dell'email:", error);
    }
  },
);
```

_Questa funzione si attiverà automaticamente ogni volta che viene aggiunto un documento nella collezione “messages” su Firestore._

### 3. Configura le variabili d’ambiente

Firebase non permette di scrivere direttamente le credenziali nel codice per sicurezza, quindi devi aggiungerle alle variabili d’ambiente.

Prima di tutto, genera una password per app Gmail:
a. vai su: `https://myaccount.google.com/security`;
b. Scorri in basso fino a “Password per le app” (devi attivare l’autenticazione a due fattori);
c. Genera una nuova password per Nodemailer.

Ora aggiungiamo le credenziali alle variabili di ambiente su Firebase:

```sh
firebase functions:config:set email.user="TUO_EMAIL@gmail.com" email.pass="TUA_PASSWORD_GENERATA" email.dest="DESTINATARIO_EMAIL@gmail.com"
```

_Questo imposterà le credenziali per l’invio delle email._

### 4. Creare un account di servizio

Ora ma manca l’account di servizio di Eventarc, che è necessario per il deployment delle Cloud Functions.

#### a. Trova l’account di servizio Eventarc

1. Vai su Google Cloud IAM: `https://console.cloud.google.com/iam-admin/iam`.
2. Clicca su + Concedi l’accesso.
3. Nel campo Nuovi Principali, cerca un account simile a questo:

```
service-<PROJECT_NUMBER>@gcp-sa-eventarc.iam.gserviceaccount.com
```

_Sostituisci <PROJECT_NUMBER> con il numero del tuo progetto. Puoi trovarlo nella console Firebase._

#### b. Assegna il ruolo corretto

1. Nel campo “Seleziona un ruolo”, cerca e seleziona:

```
Eventarc Service Agent
```

2. Clicca Salva.

## FASE 3: Deploy della Cloud Function

### 1. Apri il terminale e spostati nella root del progetto Vue

Nel mio caso mi sposto qui:

```sh
cd ~/Desktop/proJECT/developer/projects/personal-website
```

### 2. Controlla che tutto sia pronto

Prima di fare il deploy, verifica che non ci siano errori nel codice delle Cloud Functions:

```sh
cd functions
npm run lint
```

nel caso di errori, potrebbero essere risolti digitando:

```sh
npm run lint -- --fix
```

Se non ci sono errori, torna nella root del progetto:

```sh
cd ..
```

### 3. Esegui il deploy delle sole Cloud Functions

Ora esegui il comando:

```sh
firebase deploy --only functions
```

_Questo invierà solo le Cloud Functions ai server Firebase senza toccare altre configurazioni._

## finito!
