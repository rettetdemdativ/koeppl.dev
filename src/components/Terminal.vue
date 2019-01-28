<!-- Author(s): Michael Koeppl -->

<template>
  <div id="terminal">
    <div id="term_box">
      <textarea
        v-tooltip="tooltip"
        spellcheck="false"
        autofocus
        id="term_input"
        v-model="termText"
        v-on:keydown.enter="onEnter"
        v-on:keydown.delete="onDelete"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import GitHubApi from "../github_api";
import { StackExchangeApi, StackExchangeUser } from "../stackexchange_api";
var texts = require("../assets/texts.json");
var links = require("../assets/links.json");

@Component
export default class Terminal extends Vue {
  private readonly prompt = "guest@calmandniceperson.com:~";
  private tooltip: string = "Type 'help' to see what you can do";
  private termText: string;
  constructor() {
    super();
    this.termText = this.prompt;
  }

  onEnter(e: Event): void {
    var input = <HTMLInputElement>document.getElementById("term_input");
    var command = this.getCurrentLine(input)
      .substr(this.prompt.length)
      .trimRight();
    this.handleCommand(command, input);
    e.preventDefault();
  }

  private handleCommand(command: string, input: HTMLInputElement): void {
    if (texts[command]) {
      // If we reached a text command, we simply print the text from
      // the JSON.
      input.value += `\n${texts[command].join("")}\n${this.prompt}`;
    } else {
      // Since this command might have two parts, we split it.
      // Can't hurt to do that since we're gonna have a first part
      // of the command anyway.
      var superCommand = command.split(" ")[0];
      if (
        Object.keys(links).some(
          (key): boolean => {
            // Check if there is a key that partially matches. If that's
            // the case, we know that the key either matches completely
            // or there is a subcommand attached which we can read out
            // later.
            return superCommand === key;
          }
        )
      ) {
        var subCommand = command.split(" ")[1];
        // If the subcommand is 'show', we open the respective
        // web pages. Otherwise we default to printing out the info.
        if (subCommand === "show") {
          var win = window.open(links[superCommand], "_blank");
          if (win) win.focus();
        } else if (subCommand === "info" || !subCommand) {
          this.printInfo(superCommand, input);
        }
        this.putPrompt(input);
      } else if (command === "clear") {
        input.value = this.prompt;
      } else if (command === "") {
        this.putPrompt(input);
      } else {
        input.value += `\n${texts.invalid}\n${this.prompt}`;
      }
      // Scroll to bottom
      input.scrollTop = input.scrollHeight;
    }
  }

  // Puts a newline and a prompt. Basically starts a new line in the
  // terminal.
  private putPrompt(input: HTMLInputElement) {
    input.value += `\n${this.prompt}`;
  }

  onDelete(e: Event): void {
    var input = <HTMLInputElement>document.getElementById("term_input");
    var currentLine = this.getCurrentLine(input);
    // If removing the next symbol would mean that we have less than
    // the length of the prompt on the line (which would mean that our
    // prompt wouldn't show), we don't allow the user to delete the
    // rest.
    if (
      currentLine.substr(0, currentLine.length - 1).length >= this.prompt.length
    ) {
      input.value = input.value.substr(0, input.value.length);
    } else {
      e.preventDefault();
    }
  }

  // Splits the text currently contained in the textarea at every endline
  // and returns the last element of the resulting array as the current
  // line.
  private getCurrentLine(input: HTMLInputElement): string {
    var lines = input.value.split("\n");
    return lines[lines.length - 1];
  }

  // Move pointer to the end of the prompt by setting the selection area.
  private movePointerBehindPrompt() {
    var input = <HTMLInputElement>document.getElementById("term_input");
    input.selectionStart = this.prompt.length;
    input.selectionEnd = this.prompt.length;
  }

  private printInfo(superCommand: string, input: HTMLInputElement) {
    switch (superCommand) {
      case "github":
        this.printGitHubInfo(input);
        break;
      case "stackoverflow":
        this.printStackOverflowInfo(input);
        break;
      case "twitter":
        input.value += `\n${links[superCommand]}`;
        break;
    }
  }

  private printGitHubInfo(input: HTMLInputElement) {
    var api = new GitHubApi();
    api.getGitHubRepos((repos: any[]) => {
      input.value += `\nList of repositories:`;
      for (var key in repos) {
        input.value += `\n${repos[key].name}\n\
                    \tDescription: ${repos[key].description}\n\
                    \tStargazers: ${repos[key].stargazers_count}`;
      }
      this.putPrompt(input);
      input.scrollTop = input.scrollHeight;
    });
  }

  private printStackOverflowInfo(input: HTMLInputElement) {
    var api = new StackExchangeApi();
    api.getInfo((user: StackExchangeUser) => {
      input.value += `\nMy StackOverflow profile:\n\
                \tUsername:      ${user.displayName}\n\
                \tNo. of badges:\n\
                \t\tGold: ${user.badgeCountGold}\n\
                \t\tSilver: ${user.badgeCountSilver}\n\
                \t\tBronze: ${user.badgeCountBronze}\n\
                \tNo. of questions asked: ${user.questionCount}\n\
                \tNo. of answers given: ${user.answerCount}`;
      this.putPrompt(input);
      input.scrollTop = input.scrollHeight;
    });
  }

  mounted() {
    this.movePointerBehindPrompt();
  }
}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Inconsolata");

#terminal {
  height: 100%;
}

#term_box {
  display: flex;
  flex-direction: row;
  height: 100%;
  position: relative;
  align-items: stretch;
}

#term_input {
  flex: 1 1 auto;
  padding: 0px;
  margin: 0px;
  overflow: auto;
  background: black;
  color: white;
  font-family: "Inconsolata", sans-serif;
  font-size: 12pt;
  border-width: 0px;
  padding: 10px;
}

.tooltip {
  display: block !important;
  z-index: 10000;

  .tooltip-inner {
    background: lightgray;
    color: black;
    font-family: "Inconsolata", sans-serif;
    font-size: 10pt;
    border-radius: 16px;
    padding: 5px 10px 4px;
  }

  &[aria-hidden="true"] {
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.15s, visibility 0.15s;
  }

  &[aria-hidden="false"] {
    visibility: visible;
    opacity: 1;
    transition: opacity 0.15s;
  }
}
</style>