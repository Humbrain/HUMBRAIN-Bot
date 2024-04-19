import {Events} from "discord.js";
import {Events as e} from "../handlers/eventHandler";
import CooldownLevelingMiddleware from "../middlewares/cooldownLevlingMiddleware";
import Leveling from "../utils/Leveling";

const MessageCreate: e = {
    once: false,
    event: Events.MessageCreate,
    run: async (client, message) => {
        if (message.author.bot) return;
        if (!message.guild) return;

        if (message.content.includes(client.user.id)) {
            const messageRigolo = [
                "Tu penses que je vais m'intéresser à ça ? Pense encore.",
                "Tu espères que je vais aider ? Désolé, je suis réservé pour les urgences réelles.",
                "Tu attends ma sympathie ? Tu vas attendre longtemps.",
                "Tu veux que je me soucie de ça ? Essaye quelqu'un d'autre.",
                "Tu penses que je vais sauter à ton commandement ? Détrompe-toi.",
                "Tu cherches de la compassion ici ? Tu peux chercher ailleurs.",
                "Tu veux que je te suive ? Tu ferais mieux de demander à quelqu'un d'autre.",
                "Tu espères que je vais intervenir ? Je te laisse tomber.",
                "Tu crois que je vais perdre mon temps avec ça ? Pas une chance.",
                "Tu attends que je sois concerné ? Essaie un autre numéro.",
                "Tu veux que je m'inquiète ? Je suis déjà préoccupé par mes propres affaires.",
                "Tu comptes sur moi pour ça ? Mauvaise idée.",
                "Tu penses que je vais te sauver ? Détrompe-toi, je sauve ma propre peau.",
                "Tu as besoin d'aide ? Tu ferais mieux de chercher ailleurs.",
                "Tu attends que je sois solidaire ? Tu te trompes de personne.",
                "Tu veux que je sois ton héros ? Oublie ça.",
                "Tu espères que je vais intervenir ? J'ai mieux à faire.",
                "Tu attends que je t'écoute ? Tu perds ton temps.",
                "Tu as besoin de mon assistance ? Demande à quelqu'un de plus motivé.",
                "Tu espères que je vais t'aider ? Bonne chance avec ça.",
                "Tu veux que je te soutienne ? Tu ferais mieux de te débrouiller seul.",
                "Tu penses que je vais être ton ange gardien ? Pense encore.",
                "Tu comptes sur moi pour ça ? Tu te fais des illusions.",
                "Tu attends de moi que je sois concerné ? J'ai d'autres priorités.",
                "Tu veux que je te secoure ? Désolé, je ne suis pas dans cette ligne de travail.",
                "Tu espères que je vais te porter secours ? Ça n'arrivera pas.",
                "Tu attends de moi que je prenne en charge ? Tu te trompes de personne.",
                "Tu penses que je vais te sortir de là ? Détrompe-toi.",
                "Tu veux que je me charge de ça ? Trouve quelqu'un d'autre pour jouer les héros.",
                "Tu as besoin de mon aide ? Tu devrais trouver un meilleur plan.",
                "Tu attends que je te tende la main ? Tu peux attendre longtemps.",
                "Tu veux que je te porte secours ? Je suis déjà pris ailleurs.",
                "Tu espères que je vais te sauver ? Détrompe-toi.",
                "Tu penses que je vais me soucier de ça ? Pense encore.",
                "Tu attends de moi que je sois impliqué ? Tu rêves.",
                "Tu veux que je te soutienne ? Trouve quelqu'un d'autre pour jouer les sauveurs.",
                "Tu as besoin de moi ? Désolé, je suis en congé de compassion.",
                "Tu penses que je vais te sauver ? Essaye quelqu'un d'autre.",
                "Tu veux que je te tire d'affaire ? Tu ferais mieux de te débrouiller seul.",
                "Tu comptes sur moi pour ça ? Tu m'as mal jugé.",
                "Tu espères que je vais m'en préoccuper ? Ne te fais pas d'illusions."
            ]
            message.reply(messageRigolo[Math.floor(Math.random() * messageRigolo.length)])
        }

        if (!await CooldownLevelingMiddleware.run(client, message)) return;
        const leveling = new Leveling(message);
        if (!await leveling.checkIfIsActivated()) return;
        await leveling.addXp();
    }
}

export default MessageCreate;