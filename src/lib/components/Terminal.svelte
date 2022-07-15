<script lang="ts">
  import { afterUpdate, onMount } from 'svelte';
  import Tooltip, { Wrapper } from '@smui/tooltip';
  import GitHubApi from '../functions/github';
  import StackExchangeApi from '../functions/stackexchange';
  import { COMMAND_TEXTS } from '../constants/texts';
  import { LINKS } from '../constants/links';

  let terminalTextArea: HTMLTextAreaElement;
  let toolTip = "Type 'help' to see what you can do";
  let prompt = 'guest@koeppl.dev:~ ';
  let termText = '';

  onMount(async () => {
    termText = prompt;
    movePointerBehindPrompt();
  });

  afterUpdate(() => {
    // After DOM is in sync with data, the textarea is scrolled to the bottom
    // as we land here after the input text has been updated.
    terminalTextArea.scrollTop = terminalTextArea.scrollHeight;
  });

  /**
   * Handles ENTER and BACKSPACE key events.
   * @param e The KeyboardEvent instance that was emitted
   */
  function handleTextAreaKeyDown(e: KeyboardEvent): void {
    if (e.key == 'Enter') {
      handleEnter(e);
    } else if (e.key == 'Backspace') {
      handleBackspace(e);
    }
  }

  /**
   * Handles the ENTER keydown event by passing the input on to the
   * {@link handlecommand} function.
   * @param e The KeyboardEvent instance that was emitted
   */
  function handleEnter(e: KeyboardEvent): void {
    const command = getCurrentLine().substr(prompt.length).trimRight();
    handleCommand(command);
    e.preventDefault();
  }

  /**
   * Handles the BACKSPACE keydown event by moving back until the prompt is
   * reached.
   * @param e The KeyboardEvent instance that was emitted
   */
  function handleBackspace(e: KeyboardEvent): void {
    const currentLine = getCurrentLine();
    // If removing the next symbol would mean that we have less than
    // the length of the prompt on the line (which would mean that our
    // prompt wouldn't show), we don't allow the user to delete the
    // rest.
    if (currentLine.substr(0, currentLine.length - 1).length >= prompt.length) {
      termText = termText.substr(0, termText.length);
    } else {
      e.preventDefault();
    }
  }

  /**
   * Handles the various commands that can be entered into the CLI and puts the
   * cursor in the correct place afterwards.
   * @param command The command that is to be executed
   */
  function handleCommand(command: string): void {
    if (COMMAND_TEXTS[command]) {
      // If we reached a text command, we simply print the text from
      // the JSON.
      termText += `\n${COMMAND_TEXTS[command]}\n${prompt}`;
    } else {
      // Since this command might have two parts, we split it.
      // Can't hurt to do that since we're gonna have a first part
      // of the command anyway.
      const superCommand = command.split(' ')[0];
      if (
        Object.keys(LINKS).some((key): boolean => {
          // Check if there is a key that partially matches. If that's
          // the case, we know that the key either matches completely
          // or there is a subcommand attached which we can read out
          // later.
          return superCommand === key;
        })
      ) {
        const subCommand = command.split(' ')[1];
        // If the subcommand is 'show', we open the respective
        // web pages. Otherwise we default to printing out the info.
        if (subCommand === 'show') {
          const win = window.open(LINKS[superCommand], '_blank');
          if (win) {
            win.focus();
          }
        } else if (subCommand === 'info' || !subCommand) {
          printInfo(superCommand);
        }
        putPrompt();
      } else if (command === 'clear') {
        termText = prompt;
      } else if (command === '') {
        putPrompt();
      } else {
        termText += `\n${COMMAND_TEXTS.invalid}\n${prompt}`;
      }
      // Scroll to bottom
      terminalTextArea.scrollTop = terminalTextArea.scrollHeight;
    }
  }

  /**
   * Puts a newline and a prompt. Basically starts a new line in the terminal.
   */
  function putPrompt(): void {
    termText += `\n${prompt}`;
  }

  /**
   * Splits the text currently contained in the textarea at every endline and
   * returns the last element of the resulting array as the current line.
   */
  function getCurrentLine(): string {
    const lines = termText.split('\n');
    return lines[lines.length - 1];
  }

  /**
   * Move pointer to the end of the prompt by setting the selection area.
   */
  function movePointerBehindPrompt(): void {
    terminalTextArea.selectionStart = prompt.length;
    terminalTextArea.selectionEnd = prompt.length;
  }

  /**
   * Handles the 'info' subcommand. The function distinguishes between the
   * different super commands and reacts accordingly by printing their info.
   * @param superCommand
   */
  function printInfo(superCommand: string) {
    switch (superCommand) {
      case 'github':
        printGitHubInfo();
        break;
      case 'stackoverflow':
        printStackOverflowInfo();
        break;
      case 'mastodon':
      case 'twitter':
        termText += `\n${LINKS[superCommand]}`;
        break;
    }
  }

  /**
   * Prints info from GitHub (repos, etc.).
   */
  async function printGitHubInfo(): Promise<void> {
    const api = new GitHubApi();
    termText += await api.getGitHubReposAsString();
    putPrompt();
  }

  /**
   * Prints info from StackOverflow.
   */
  async function printStackOverflowInfo() {
    const api = new StackExchangeApi();
    termText += await api.getInfoAsString();
    putPrompt();
  }
</script>

<div id="terminal">
  <Wrapper>
    <textarea
      id="term_input"
      bind:this={terminalTextArea}
      bind:value={termText}
      on:keydown={handleTextAreaKeyDown}
      spellcheck="false"
    />
    <Tooltip>
      {toolTip}
    </Tooltip>
  </Wrapper>
</div>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Inconsolata');
  #terminal {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    position: relative;
    align-items: stretch;
    overflow: hidden;
  }
  #term_input {
    flex: 1 1 auto;
    padding: 0px;
    margin: 0px;
    overflow: auto;
    background: black;
    color: white;
    font-family: 'Inconsolata', sans-serif;
    font-size: 12pt;
    border-width: 0px;
    padding: 10px;
  }
</style>
