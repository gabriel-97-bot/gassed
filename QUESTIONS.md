# Gassed — Spørsmålsdatabase

## Struktur

Alle spørsmål ligger i `/questions/`-mappen:

```
questions/
  trivia_film.json
  trivia_geografi.json
  trivia_musikk.json
  trivia_blandet.json
  jeopardy.json
```

---

## Trivia-format

Fil: `trivia_[kategori].json`

```json
{
  "category": "film",
  "label": "🎬 Film & Kino",
  "questions": [
    {
      "id": "film_001",
      "q": "Hvem spilte Jack i Titanic?",
      "a": ["Leonardo DiCaprio", "Brad Pitt", "Tom Hanks"]
    }
  ]
}
```

- `a[0]` er alltid riktig svar
- `a[1]` og `a[2]` er alltid feil alternativer
- `id` følger mønsteret `[kategori]_[tresifret nummer]`

---

## Jeopardy-format

Fil: `jeopardy.json`

```json
{
  "sets": [
    {
      "id": "set_01",
      "categories": [
        {
          "name": "🍺 Drikke",
          "questions": [
            { "id": "set01_drikke_1", "q": "I hvilken by ble Guinness grunnlagt?", "a": "Dublin", "d": 1 },
            { "id": "set01_drikke_2", "q": "...", "a": "...", "d": 2 },
            { "id": "set01_drikke_3", "q": "...", "a": "...", "d": 3 },
            { "id": "set01_drikke_4", "q": "...", "a": "...", "d": 4 },
            { "id": "set01_drikke_5", "q": "...", "a": "...", "d": 5 }
          ]
        }
      ]
    }
  ]
}
```

- `d` = vanskelighetsgrad: 1=100p, 2=200p, 3=300p, 4=400p, 5=500p
- Hvert sett har alltid 5 kategorier med 5 spørsmål hver

---

## Hvordan Claude Code leser filene

Når du kjører setup-prompten nedenfor, vil `index.html` laste spørsmål
dynamisk fra JSON-filene i stedet for å ha dem hardkodet.

---

## Regler for nye spørsmål

1. Aldri dupliser et spørsmål som allerede finnes i filen
2. Norsk språk alltid
3. Trivia: alltid 1 riktig + 2 feil svar
4. Jeopardy: d=1 skal være lett, d=5 skal være vanskelig
5. ID må være unik og følge navnekonvensjonen
