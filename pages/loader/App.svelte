<div
  class="fixed h-full w-full grid place-items-center bg-slate-200 dark:bg-zinc-800 dark:text-white rounded-lg"
>
  <div class="flex flex-col gap-4 items-center">
    <div class="h-20 w-20 loader">
      <div
        class="h-20 w-20 border-4 rounded-full border-l-purple-500 border-b-purple-500 border-t-purple-500 border-r-slate-300 dark:border-r-zinc-700"
      />
    </div>
    <div class="text-center text-lg">Loading Dasher<br />Sequencer...</div>
    <style>
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
      .loader {
        animation: spin 0.75s linear infinite;
      }
      .loader > div {
        animation: spin 01s ease-in-out infinite;
      }
    </style>
  </div>
</div>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  @font-face {
    font-family: "Satisfy";
    src: url("./static/Satisfy-Regular.ttf") format("truetype");
  }

  * {
    font-family: "Satisfy", cursive;
  }
</style>
