<script>
  import FortuneDisplay from "./FortuneDisplay.svelte";

  let state = "closed"; // 'closed', 'cracking', 'open'
  let fortune = null;
  let loading = false;

  async function fetchFortune() {
    loading = true;
    try {
      const response = await fetch(`/v1/cookie?limit=1&_t=${Date.now()}`);
      if (!response.ok) throw new Error("API unavailable");
      const data = await response.json();
      fortune = data;
    } catch (e) {
      console.error(e);
      fortune = {
        fortune: { message: "A digital error today, a clear path tomorrow." },
        lesson: { english: "Error", chinese: "错误", pronunciation: "Cuòwù" },
      };
    } finally {
      loading = false;
    }
  }

  function handleCrack() {
    if (state !== "closed" || loading) return;

    state = "cracking";
    fetchFortune();

    setTimeout(() => {
      state = "open";
    }, 600);
  }

  function reset() {
    state = "closed";
    fortune = null;
  }
</script>

<div class="flex flex-col items-center gap-8 perspective-1000 w-full max-w-sm">
  <button
    class="relative w-54 h-54 sm:w-64 sm:h-64 cursor-pointer transition-transform duration-300 hover:scale-105 flex items-center justify-center bg-transparent border-none p-0 outline-none focus-visible:outline-0"
    on:click={handleCrack}
  >
    {#if state !== "open"}
      <img
        src="/cookie.png"
        alt="Fortune Cookie"
        class="w-full h-auto drop-shadow-[4px_4px_0.5px_rgba(0,0,0,0.2)] transition-all duration-300 {state ===
        'cracking'
          ? 'animate-shake'
          : ''}"
      />
    {/if}

    {#if state === "open" && fortune}
      <div
        class="absolute outline-black/50 outline-1 bg-white w-72 sm:w-80 p-4 sm:p-6 shadow-[6px_6px_0px_rgba(0,0,0,0.2)] border-y-4 border-chinese-red text-center animate-in zoom-in-75 fade-in duration-500"
      >
        <p class="text-black text-xl font-bold font-serif leading-relaxed">
          {fortune.fortune.message}
        </p>
      </div>
    {/if}
  </button>

  {#if state === "closed"}
    <p
      class="text-chinese-gold font-light tracking-widest uppercase text-[10px] sm:text-xs animate-bounce"
    >
      Click to reveal your fortune
    </p>
  {/if}

  {#if state === "open"}
    <FortuneDisplay {fortune} {reset} />
  {/if}
</div>
