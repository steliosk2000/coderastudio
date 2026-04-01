import 'dotenv/config';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@coderastudio.gr' },
    update: {},
    create: {
      email: 'admin@coderastudio.gr',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  // Clear existing content tables to avoid duplication
  await prisma.service.deleteMany();
  await prisma.customer.deleteMany();

  // Seed Services
  await prisma.service.createMany({
    data: [
      {
        title: "Κατασκευή E-Shop",
        shortDescription: "Σύγχρονα, γρήγορα και ασφαλή ηλεκτρονικά καταστήματα που αυξάνουν τις πωλήσεις σας.",
        description: "Αναλαμβάνουμε την πλήρη κατασκευή του ηλεκτρονικού σας καταστήματος από το μηδέν, με σύγχρονες πλατφόρμες (WooCommerce, Shopify ή Custom). Παρέχουμε διασύνδεση με τράπεζες, μεταφορικές εταιρείες και ERP.",
        features: JSON.stringify(["Custom Σχεδιασμός", "Mobile First Ανάπτυξη", "Ταχύτητα & Ασφάλεια", "Διασύνδεση με Τράπεζες"]),
        pricing: 1200,
        icon: "FaShoppingCart"
      },
      {
        title: "Κατασκευή Μενού QR",
        shortDescription: "Ανέπαφα ψηφιακά μενού για εστιατόρια και καφετέριες με εύκολη διαχείριση.",
        description: "Δημιουργούμε διαδραστικά και εύκολα στη χρήση μενού QR για χώρους εστίασης. Ο πελάτης απλώς σκανάρει και βλέπει τον κατάλογο στο κινητό του χωρίς εφαρμογή.",
        features: JSON.stringify(["Άμεση Αλλαγή Τιμών", "Διγλωσσία", "Απεριόριστα Προϊόντα", "Φιλικό στο Χρήστη"]),
        pricing: 150,
        icon: "FaQrcode"
      },
      {
        title: "Κατασκευή Blog",
        shortDescription: "Προσαρμοσμένα blogs για να μοιράζεστε τα άρθρα σας με το κοινό σας επαγγελματικά.",
        description: "Σχεδιάζουμε πανέμορφα και λειτουργικά blogs για αρθρογράφους, εταιρείες και influencers. Με έμφαση στην ταχύτητα και το SEO.",
        features: JSON.stringify(["Εύκολο Πάνελ Διαχείρισης", "SEO Ready", "Κατηγοριοποίηση & Tags", "Social Media Integration"]),
        pricing: 400,
        icon: "FaPenNib"
      },
      {
        title: "Ιστοσελίδες για Ξενοδοχεία",
        shortDescription: "Εντυπωσιακές ιστοσελίδες με σύστημα κρατήσεων σχεδιασμένες για τον τουριστικό τομέα.",
        description: "Παρέχουμε ολοκληρωμένες λύσεις για ξενοδοχεία και καταλύματα, με εντυπωσιακό design που πουλάει την εμπειρία και ενσωματωμένο σύστημα κρατήσεων (Booking Engine).",
        features: JSON.stringify(["Σύστημα Κρατήσεων/Booking Module", "Channel Manager Integration", "Gallery/Video Tours", "Πολυγλωσσικό Σύστημα"]),
        pricing: 1500,
        icon: "FaHotel"
      },
      {
        title: "Προώθηση Ιστοσελίδων (SEO)",
        shortDescription: "Στρατηγικές SEO και Digital Marketing για να φτάσετε στην πρώτη σελίδα της Google.",
        description: "Εκτοξεύστε την οργανική σας κίνηση. Κάνουμε πλήρες Audit, λέξεις-κλειδιά, On-Page SEO, τεχνικές βελτιώσεις, και Link Building για μόνιμα αποτελέσματα.",
        features: JSON.stringify(["Keyword Research", "Technical Audit", "Content Optimization", "Monthly Reporting"]),
        pricing: 250,
        icon: "FaChartLine"
      },
      {
        title: "Δημιουργία Λογοτύπων",
        shortDescription: "Μοναδικά λογότυπα και εταιρική ταυτότητα που μένουν αξέχαστα στους πελάτες σας.",
        description: "Οι σχεδιαστές μας δημιουργούν μοναδικά και διαχρονικά λογότυπα που αντικατοπτρίζουν απόλυτα το όραμα και το ύφος της επιχείρησής σας.",
        features: JSON.stringify(["3 Προτάσεις Λογοτύπου", "Όλα τα Αρχεία (AI, EPS, PNG, SVG)", "Εγχειρίδιο Σήματος/Brandbook", "Απεριόριστες Αλλαγές"]),
        pricing: 200,
        icon: "FaPaintBrush"
      }
    ]
  });

  // Seed Customers
  await prisma.customer.createMany({
    data: [
      {
        name: "Ramblers",
        category: "Bar & Restaurant",
        service: "Κατασκευή QR Μενού",
        image: "/images/ramblers.png",
        url: "https://rframblers.gr"
      },
      {
        name: "W Suites",
        category: "Hospitality",
        service: "Ιστοσελίδα Κρατήσεων",
        image: "/images/w-suites.png",
        url: "https://wsuites.gr"
      }
    ]
  });

  console.log('Database seeded successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
