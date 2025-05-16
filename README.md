# Template Block

Dit project bevat een Template Block dat gebruikt kan worden als basis om een blok te ontwikkelen binnen `PraatMee`, `Dashboard` of `MapTour`.

## Installatie

De template-block repository wordt gebruikt als template van GitHub. Daarom kan deze repository niet gecloned worden en zal op een alternatieve manier gebruikt worden:

1. Ga naar https://github.com/HiddeS03/template-block en druk op **Use this template** &rarr; **Create a new repository**.
2. Clone jouw repository:

```sh
git clone https://github.com/github-gebruikersnaam/repository-naam.git
```

3. Voeg de remote toe

```sh
git remote add template https://github.com/HiddeS03/template-block.git
```

## Updates

Wanneer een update bestaat in de template-block kan jouw repostiroy geüpdate worden door:

1. Fetch van laatste update:

```sh
git fetch template
```

2. Cherry pick laatste update

```sh
git cherry-pick template/master
```

## Scripts

### `npm run preview`

Start ontwikkelen van jouw blok. Jouw blok is te zien in één van de ontwikkelomgevingen `PraatMee`, `Dashboard` of `MapTour`. Zet in één van deze omgevingen het `Test Blok` aan om het blok in te zien.

> ⚠️ Op zichzelf is deze preview niet bruikbaar zonder een testomgeving zoals `PraatMee Dashboard` of `MapTour`.

> ⚠️ Test blok draait op poort 5174. Er mogen geen andere instanties draaien op deze poort.

### `npm run build`

Maakt twee verschillende output-mappen:

1. **Standaardbuild** – Voor normale integratie.
2. **No-scope build** – Voor gebruik in omgevingen waar bibliotheek versies kunnen conflicteren.

Het is belangrijk om dezelfde bibliotheek versies aan te houden als `PraatMee`, `Dashboard` en `MapTour`. Wanneer dit niet het geval is, wordt de **No-scope build** gebruikt welke geen laadoptimalisaties biedt voor de bibliotheken.

## Belangrijke bestanden

- **`vite.config.ts`**  
  Deze configuratie wordt gebruikt voor het compileren van de standaardbuild. Veranderingen kunnen problemen veroorzaken. Wanneer aangepast, pas ook vite.config.no-scope.ts op dezelfde manier aan als je weet wat je doet.

- **`vite.config.no-scope.ts`**  
  Deze wordt gebruikt voor het bouwen van de alternatieve no-scope versie. Veranderingen kunnen problemen veroorzaken. Wanneer aangepast, pas ook vite.config.no-scope.ts op dezelfde manier aan als je weet wat je doet.

- **`base` directory**  
  De base map bevat bestanden voor de alternatieve build. Het is aan te raden om deze neit aan te passen.

## Configuratiebestanden

- **`form.yaml`**  
  Dit bestand zorgt voor de opbouw van de configuratie vragen bij het maken of aanpassen van het blok. De `blockSettings` krijgt de resultaten van deze vragen binnen.
- **`default.yaml`**
  Dit bestand zorgt ervoor voor de standaard ingevule velden in de `form.yaml`. Vul deze in voor de standaard variabele welke je wil tonen bij de eerste keer inzien van de configuratie lijst.
- **`manifest.yaml`**  
  Dit bestand zorgt ervoor dat het blok herkent wordt door het systeem. ID wordt als het goed is gegenereerd. De rest is aan te raden naar eigen wens in te vullen.
- **`icon.svg`**
  Pas deze aan met je eigen SVG voor je blok. Deze bevat nu nog het template icon.

## Publiceren

Je kan je blok publiceren door de bestanden welke je creëert met `npm run build` te uploaden naar de MapGear omgeving!
