import logger from 'pino';

export const Logger = logger({
    name: "NovelRobber",
    prettyPrint: true,
    level: "info"
});

export default Logger;
