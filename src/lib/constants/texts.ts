interface TextData {
  [key: string]: string;
}

export const COMMAND_TEXTS: TextData = {
  invalid: 'You entered an invalid command',
  about: `\nWait, what? How did you even get here?! You... randomly browsing... alright.\n
        Well, since you're already here, I might as well introduce myself.\n
        Hi. My name is Michael. I'm a computer science student from
         Austria.\n`,
  help: `You can use the following commands:
        \n\tabout          personal information about me
        \n\thelp           a help text
        \n\tclear          clear the console
        \n\tgithub
        \n\t\tshow\topens my GitHub page
        \n\t\tinfo\tprints info from my GitHub page
        \n\tstackoverflow
        \n\t\tshow\topens my Stackoverflow page
        \n\t\tinfo\tprints info from my Stackoverflow profile
        \n\tmastodon
        \n\t\tshow\topens Mastodon page
        \n\t\tinfo\tprints link to my Mastodon
        \n\ttwitter
        \n\t\tshow\topens my Twitter page
        \n\t\tinfo\tprints link to my Twitter`
};
