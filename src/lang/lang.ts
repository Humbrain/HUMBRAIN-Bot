import admin from "./admin";
import moderation from "./moderation";

export default {
    "admin": {...admin},
    "moderation": {...moderation},
    "amount": {
        "en-US": "amount",
        "fr": "montant",
        "de": "betrag",
        "ru": "количество",
        "pt-BR": "quantidade",
        "nl": "hoeveelheid"
    },
    "amount_description": {
        "en-US": "Amount for the command",
        "fr": "Montant pour la commande",
        "de": "Betrag für den Befehl",
        "ru": "Количество для команды",
        "pt-BR": "Quantidade para o comando",
        "nl": "Hoeveelheid voor de opdracht"
    },
    "all": {
        "en-US": "all",
        "fr": "tout",
        "de": "alle",
        "ru": "все",
        "pt-BR": "todos",
        "nl": "allemaal"
    },
    "all_description": {
        "en-US": "All for the command",
        "fr": "Tout pour la commande",
        "de": "Alle für den Befehl",
        "ru": "Все для команды",
        "pt-BR": "Todos para o comando",
        "nl": "Alles voor de opdracht"
    },
    "user": {
        "en-US": "user",
        "de": "benutzer",
        "ru": "пользователь",
        "pt-BR": "usuário",
        "nl": "gebruiker",
        "fr": "utilisateur"
    },
    "user_description": {
        "en-US": "Select a user",
        "de": "Wählen Sie einen Benutzer",
        "ru": "Выберите пользователя",
        "pt-BR": "Selecione um usuário",
        "nl": "Selecteer een gebruiker",
        "fr": "Sélectionnez un utilisateur"
    },
    "reason": {
        "en-US": "reason",
        "de": "grund",
        "ru": "причина",
        "pt-BR": "razão",
        "nl": "reden",
        "fr": "raison"
    },
    "reason_description": {
        "en-US": "The reason for the warning",
        "de": "Der Grund für die Warnung",
        "ru": "Причина предупреждения",
        "pt-BR": "O motivo do aviso",
        "nl": "De reden voor de waarschuwing",
        "fr": "La raison de l'avertissement"
    },
    "duration": {
        "en-US": "duration",
        "de": "dauer",
        "ru": "продолжительность",
        "pt-BR": "duração",
        "nl": "duur",
        "fr": "durée"
    },
    "duration_description": {
        "en-US": "The duration of the mute (e.g. 1d, 1h, 1m)",
        "de": "Die Dauer des Stummschaltens (z. B. 1d, 1h, 1m)",
        "ru": "Продолжительность заглушения (например, 1д, 1ч, 1м)",
        "pt-BR": "A duração do mute (ex. 1d, 1h, 1m)",
        "nl": "De duur van de demping (bijv. 1d, 1h, 1m)",
        "fr": "La durée du mute (par exemple 1d, 1h, 1m)"
    },
    "level": {
        "en-US": "level",
        "de": "niveau",
        "ru": "уровень",
        "pt-BR": "nível",
        "nl": "niveau",
        "fr": "niveau"
    },
    "level_description": {
        "en-US": "Get the level of a user",
        "de": "Holen Sie sich das Niveau eines Benutzers",
        "ru": "Получить уровень пользователя",
        "pt-BR": "Obtenha o nível de um usuário",
        "nl": "Krijg het niveau van een gebruiker",
        "fr": "Obtenez le niveau d'un utilisateur"
    },
    "rank": {
        "en-US": "rank",
        "de": "rang",
        "ru": "ранг",
        "pt-BR": "classificação",
        "nl": "rang",
        "fr": "rang"
    },
    "rank_description": {
        "fr": "Obtenez le top rank",
        "de": "Holen Sie sich den Top-Rang",
        "ru": "Получите лучший ранг",
        "pt-BR": "Obtenha o rank top",
        "nl": "Krijg de top rank",
        "en-US": "Get the top rank"
    },
    "presentation": {
        "en-US": "presentation",
        "de": "präsentation",
        "ru": "презентация",
        "pt-BR": "apresentação",
        "nl": "presentatie",
        "fr": "présentation"
    },
    "presentation_description": {
        "en-US": "Get the presentation",
        "de": "Holen Sie sich die Präsentation",
        "ru": "Получите презентацию",
        "pt-BR": "Obtenha a apresentação",
        "nl": "Krijg de presentatie",
        "fr": "Obtenez la présentation"
    },
} as const;