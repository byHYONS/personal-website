const {onDocumentCreated} = require("firebase-functions/v2/firestore");
const {initializeApp} = require("firebase-admin/app");
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
        `Ho ricevuto il tuo messaggio dal form di contaddo del sito web:\n` +
        `samueleparatore.com\n\n` +
        `Ti ricontatterò il prima possibile, generalmente entro le 24h.\n\n` +
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
