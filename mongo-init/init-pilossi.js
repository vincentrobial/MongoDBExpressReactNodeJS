// MongoDB initialization script
// This script runs when the MongoDB container starts for the first time

// Switch to the restaurant_reviews database
db = db.getSiblingDB('pilossi');

// Create the restaurants collection with sample data
db.composants.insertMany([
  {
    nom: "Topaze",
    systech: "ATFCM",
    sensibilite: "jaune", 
    version: {
      valeur: "v1.2.3",
      contenu: "bla bla bla bla bla bla"
    },
    commentaire: "Ceci est un commentaire",
    responsable: {
      nom: "Vincent",
      pole: "S4A"
    },
    homologation: {
      date_homologation: ISODate("2010-10-10T00:00:00Z"),
      duree_homologation: 5,
      jalons_atteints: {
        evaluationSSI: ISODate("2010-10-10T00:00:00Z"),
        evalDATA: ISODate("2010-10-10T00:00:00Z"),
        AR: ISODate("2010-10-10T00:00:00Z"),
        audit: ISODate("2010-10-10T00:00:00Z"),
        MSS: ISODate("2010-10-10T00:00:00Z"),
        comite: ISODate("2010-10-10T00:00:00Z"),
        avis: ISODate("2010-10-10T00:00:00Z"),
      }
    }
  },
  {
    nom: "rubis",
    systech: "ATFCM",
    sensibilite: "orange", 
    version: {
      valeur: "v4.5",
      contenu: "bla bla bla bla bla bla"
    },
    commentaire: "Ceci est un autre commentaire",
    responsable: {
      nom: "Hervé",
      pole: "S4A"
    },
    homologation: {
      date_homologation: ISODate("2010-10-10T00:00:00Z"),
      duree_homologation: 5,
      jalons_atteints: {
        evaluationSSI: ISODate("2010-10-10T00:00:00Z"),
        evalDATA: ISODate("2010-10-10T00:00:00Z"),
        AR: ISODate("2010-10-10T00:00:00Z"),
        audit: ISODate("2010-10-10T00:00:00Z"),
        MSS: ISODate("2010-10-10T00:00:00Z"),
        comite: ISODate("2010-10-10T00:00:00Z"),
        avis: ISODate("2010-10-10T00:00:00Z"),
      }
    }
  },
  {
    nom: "saphir",
    systech: "ASM",
    sensibilite: "rouge", 
    version: {
      valeur: "v9",
      contenu: "bla bla bla bla bla bla"
    },
    commentaire: "Ceci est un commentaire",
    responsable: {
      nom: "Vincent",
      pole: "S4A"
    },
    homologation: {
      date_homologation: ISODate("2010-10-10T00:00:00Z"),
      duree_homologation: 5,
      jalons_atteints: {
        evaluationSSI: ISODate("2010-10-10T00:00:00Z"),
        evalDATA: ISODate("2010-10-10T00:00:00Z"),
        AR: ISODate("2010-10-10T00:00:00Z"),
        audit: ISODate("2010-10-10T00:00:00Z"),
        MSS: ISODate("2010-10-10T00:00:00Z"),
        comite: ISODate("2010-10-10T00:00:00Z"),
        avis: ISODate("2010-10-10T00:00:00Z"),
      }
    }
  }
]);

// Create indexes for better performance
db.composants.createIndex({ "nom": "text" });

print("Database initialization completed!");
print("Created composants collection with", db.composants.countDocuments(), "composants");
print("Created text index on composants.nom field");