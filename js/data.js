// Data model for Restaurace Zlaté Karpaty - Gastro Výzvy

const APP_DATA = {
  restaurant: {
    name: "Restaurace Zlaté Karpaty",
    city: "Ústí nad Labem",
    address: "Hornická 2511",
    phone: "732 781 138",
    tiktok: "@batrynstav2",
    tiktokUrl: "https://www.tiktok.com/@batrynstav2",
    openingHours: "Po - Ne: 11:00 - 22:00"
  },

  specialPromo: {
    title: "PLATI ZVLÁŠTNÍ BONUS!",
    reward: "iPhone 15 Pro Max 256 GB 📱",
    condition: "Musí ti zbýt VÍC NEŽ 3 MINUTY ČASU při dokončení jídla!",
    validity: "OD 20.8. DO 20.9."
  },

  challenges: [
    {
      id: "tower-5-pater",
      title: "5 Patrová Věž + 5 Nápojů",
      subtitle: "Akce pro dva ❤️ Zlaté Karpaty",
      image: "assets/tower.png",
      timeLimit: 30, // in minutes
      peopleCount: 2,
      prize: 20000, // 20 000 CZK
      failFee: 3000, // 3 000 CZK
      difficulty: "EXTRÉMNÍ (Pro 2)",
      tag: "MEGA VÝZVA",
      badgeColor: "bg-red-500",
      description: "Gigantická 5-patrová otočná dřevěná věž naplněná pizzami, tacos, hranolky a z každého patra se MUSÍ vypít jedna plechovka nápoje (Birell, Coca-Cola, Fanta, Sprite, 7Up)!",
      rules: [
        "Časový limit přesně 30 minut.",
        "Pro 2 osoby.",
        "Z každého patra se musí vypít 1 plechovka.",
        "Při snězení celého obsahu dostaneš 20 000 Kč v hotovosti!",
        "Při nezvládnutí platíš 3 000 Kč."
      ]
    },
    {
      id: "mega-burger",
      title: "Mega Burger Monster",
      subtitle: "Nákyp hovězího a porce hranolek",
      image: "assets/burger.png",
      timeLimit: 30,
      peopleCount: 1,
      prize: 10000, // 10 000 CZK
      failFee: 1500, // 1 500 CZK
      difficulty: "TĚŽKÁ",
      tag: "OBLÍBENÉ",
      badgeColor: "bg-yellow-500",
      description: "Masivní burger s poctivou porcí hovězího masa, sýrem, slaninou a obří hromadou křupavých hranolek přímo na vrchu housky!",
      rules: [
        "Časový limit 30 minut pro 1 osobu.",
        "Stůl musí zůstat úplně čistý.",
        "Při zvládnutí dostaneš 10 000 Kč!",
        "Při nezvládnutí platíš 1 500 Kč."
      ]
    },
    {
      id: "ceburek-2ks",
      title: "2x Čeburek Smažený",
      subtitle: "Křupavé těsto s masovou náplní",
      image: "assets/ceburek.png",
      timeLimit: 30,
      peopleCount: 1,
      prize: 10000,
      failFee: 1500,
      difficulty: "STŘEDNÍ",
      tag: "NOVINKA",
      badgeColor: "bg-orange-500",
      description: "Dva gigantické zlaťoučké smažené čebureky s poctivou šťavnatou masovou náplní a kořením.",
      rules: [
        "Časový limit 30 minut pro 1 osobu.",
        "Musí se sníst včetně křupavých okrajů.",
        "Při zvládnutí vyhráváš 10 000 Kč!",
        "Při nezvládnutí platíš 1 500 Kč."
      ]
    },
    {
      id: "pelmeni-60ks",
      title: "Pelmeně 60 ks",
      subtitle: "V krémové omáčce s bylinkami",
      image: "assets/pelmeni.png",
      timeLimit: 30,
      peopleCount: 1,
      prize: 10000,
      failFee: 1500,
      difficulty: "TĚŽKÁ",
      tag: "KLASIKA",
      badgeColor: "bg-emerald-500",
      description: "60 kousků tradičních masových pelmeňů zalitých zakysanou smetanou a čerstvou pažitkou.",
      rules: [
        "Časový limit 30 minut pro 1 osobu.",
        "Musí se sníst všech 60 kusů i s omáčkou.",
        "Při zvládnutí vyhráváš 10 000 Kč!",
        "Při nezvládnutí platíš 1 500 Kč."
      ]
    },
    {
      id: "varenyky-50ks",
      title: "50 ks Varenyky Fest",
      subtitle: "Pestrá mísa s omáčkou",
      image: "assets/varenyky.png",
      timeLimit: 30,
      peopleCount: 1,
      prize: 10000,
      failFee: 1500,
      difficulty: "TĚŽKÁ",
      tag: "BAREVNÁ VÝZVA",
      badgeColor: "bg-purple-500",
      description: "Plný podnos 50 kusů plněných tarenyků / varenyků různých barviček s lahodnou dip omáčkou vprostřed.",
      rules: [
        "Časový limit 30 minut pro 1 osobu.",
        "Sníst všech 50 kusů a vytřít omáčku.",
        "Při zvládnutí vyhráváš 10 000 Kč!",
        "Při nezvládnutí platíš 1 500 Kč."
      ]
    },
    {
      id: "golubci-60ks",
      title: "Golubci 60 ks",
      subtitle: "Plněné zelné rolky",
      image: "assets/golubci.png",
      timeLimit: 30,
      peopleCount: 1,
      prize: 10000,
      failFee: 1500,
      difficulty: "EXTRÉMNÍ",
      tag: "PORCE PRO CHLAPA",
      badgeColor: "bg-red-600",
      description: "60 lahodných zelných rolek plněných mletým masem a rýží na tmavé míse.",
      rules: [
        "Časový limit 30 minut pro 1 osobu.",
        "Sníst 60 zelných rolek bez zbytku.",
        "Při zvládnutí vyhráváš 10 000 Kč!",
        "Při nezvládnutí platíš 1 500 Kč."
      ]
    }
  ],

  // Default sample reservations stored in localStorage if empty
  sampleReservations: [
    {
      id: "REZ-89241",
      challengeId: "mega-burger",
      challengeTitle: "Mega Burger Monster",
      date: "2026-08-22",
      time: "17:30",
      customerName: "Martin Novák",
      phone: "+420 777 123 456",
      depositPaid: 1500,
      status: "Potvrzeno",
      paidVia: "Apple Pay",
      qrCodeData: "BATRYNSTAV-REZ-89241-MEGABURGER",
      createdAt: "2026-07-28"
    }
  ],

  leaderboard: [
    { name: "Petr K.", challenge: "2x Čeburek", time: "18:42", result: "VÝHRA 10 000 Kč + iPhone 15 Pro Max 📱", date: "včera" },
    { name: "Tomáš M. & David S.", challenge: "5 Patrová Věž", time: "26:15", result: "VÝHRA 20 000 Kč 🏆", date: "před 3 dny" },
    { name: "Jakub V.", challenge: "Pelmeně 60ks", time: "24:50", result: "VÝHRA 10 000 Kč", date: "před týdnem" },
    { name: "Lukáš R.", challenge: "Mega Burger", time: "30:00+", result: "ZAPLATIL 1 500 Kč ❌", date: "před 2 dny" }
  ]
};
