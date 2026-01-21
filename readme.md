# Inštalácia projektu VAII_Semestralka

Pred spustením projektu je potrebné mať nainštalované:

- [Node.js a npm](https://nodejs.org/)


## Postup inštalácie
### 1. Najprv treba naklonovať repozitár

```bash
git clone https://github.com/MartinKubista/VAII_Semestralka.git
```

### 2. Presunieme sa do adresára BazarakFron a naištalujeme node moduly
```bash
cd BazarakFron
npm install
```

### 3. Presunieme sa do adresára BazarakBack a naištalujeme node moduly
```bash
cd BazarakBack
npm install
```

### 4. V adresári BazarakBack vytvoríme .env súbor a vložíme údaje
```bash
JWT_SECRET=tajnehesloservera
DB_PASSWORD=123456MK
DB_NAME=bazarakdb
DB_USER=root
DB_HOST=localhost
```

### 5. V adresári BazarakBack spustíme server
```bash
cd BazarakBack
node server.js
```

### 6. V adresári BazarakFron spustíme klienta
```bash
cd BazarakFron
npm run dev
```