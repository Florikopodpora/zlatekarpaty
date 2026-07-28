# 🛡️ AI Project Rules & Memory Guard (Pravidla pro AI model)

Tento soubor vlož do složky svého projektu jako `AGENTS.md` nebo `.cursor/rules/agent.md`.
Každý AI model, který s tebou pracuje, MUSÍ dodržovat tato pravidla:

---

### 1. 🛑 NIKDY NEVYMAZUJ ANI NEPŘEPISUJ EXISTUJÍCÍ KÓD (Safety First)
- **NENÍ DOVOLENO** vymazat funkční soubory ani přeposílat soubory se zástupným textem typu `// ... zbytek kódu zde`.
- **VŽDY** dělej pouze malé, přesné úpravy konkrétních řádků.
- **NIKDY** nesmaž soubor, pokud uživatel doslovně nenapíše: "Smaž tento soubor".

---

### 2. 🧠 UDRŽUJ PAMĚŤ PROJEKTU (`memory.json`)
- Před úpravou kódu zkontroluj paměťový soubor `.agents/memory.json`.
- Měj přehled o tom:
  - Jaké funkce již 100% fungují.
  - Jaká je struktura souborů.

---

### 3. 🔍 NEJDŘÍVE ČTI, PAK TEPVRVE UPRAVUJ
- Vždy si nejprve přečti celý existující soubor od prvního po poslední řádek.
- Zachovej všechny existující funkce, HTML prvky a CSS styly, pokud tě uživatel výslovně nepožádá o jejich změnu.

---

### 4. 🚀 PŘIPOMÍNEJ ULOŽENÍ NA GIT / BACKUP
- Jakmile dokončíš jakoukoliv novou funkci, připomeň uživateli:
  > "Funkce je hotová! Uložme si zálohu přes Git (`git add . && git commit -m 'pridan funkce'`), aby byla tvoje práce v 100% bezpečí."

---

### 5. 💡 ŽÁDNÉ PŘEDPOKLADY A NÁHRADY
- Piš kompletní a funkční kód. Pokud si nejsi jistý, co uživatel chce, raději se zeptej, než abys hádal a smazal kód.

---

## 🛡️ Doplňující pravidla vývoje (Advanced AI Workflows)

### 1. 🛡️ incremental-implementation (Krok za krokem – Žádné mazání!)
- **Pravidlo**: AI vývojář nikdy nedělá 10 velikých změn naráz.
- **Jak to pomáhá**: Upraví vždy pouze 1 funkci nebo 1 soubor, otestuje ho a až potom pokračuje. Díky tomu nikdy nezmaže 80 % projektu!

### 2. 🔍 debugging-and-error-recovery (Systematické opravování chyb)
- **Pravidlo**: Předtím, než AI navrhne opravu, MUSÍ si přečíst celou chybovou hlášku (Error Log).
- **Jak to pomáhá**: AI nebude hádat naslepo ani schovávat chyby, ale najde skutečnou příčinu a opraví ji na první pokus.

### 3. 📚 source-driven-development (Psaní kódu podle oficiální dokumentace)
- **Pravidlo**: AI nepoužívá zastaraný kód z hlavy, ale ověřuje si aktuální dokumentaci knihoven.
- **Jak to pomáhá**: Kód bude 100% moderní, čistý a bez nefunkčních starých příkazů.

### 4. 🧪 test-driven-development (Důkaz místo slibů)
- **Pravidlo**: AI prohlásí úkol za dokončený AŽ VTEDY, když spustí test nebo ověřovací příkaz a ukáže zelený výsledek.
- **Jak to pomáhá**: AI nikdy neřekne "Hotovo!", kým kód opravdu neběží bez chyb.

### 5. 📦 git-workflow-and-versioning (Automatické body záchrany)
- **Pravidlo**: Po každém úspěšném kroku se vytvoří Git Checkpoint (git commit).
- **Jak to pomáhá**: I kdyby se cokoliv pokazilo, jedním příkazem `git checkout .` se za 1 sekundu vrátíš k plně funkčnímu kódu.

---

## 🛠️ Aktivované Nástroje & Metodiky (Agent Skills Pack)

Všechny 24 workflow dovednosti ze systému `addyosmani/agent-skills` byly staženy a uloženy přímo v projektu v adresáři `.agents/skills/`. Při jakémkoliv komplexnějším kroku (psaní specifikací, refaktoring, optimalizace výkonu) aktivuj příslušné detailní pravidlo z této složky.


