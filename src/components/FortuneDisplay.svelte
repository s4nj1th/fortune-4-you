<script>
  export let fortune;
  export let reset;

  const { lesson } = fortune;
</script>

<div
  class="w-full max-w-md bg-white p-6 sm:p-8 border-4 border-chinese-gold shadow-[8px_8px_0px_rgba(0,0,0,0.3)] animate-in slide-in-from-bottom-4 duration-500 mt-4 relative"
>
  <div
    class="absolute top-1 left-1 right-1 bottom-1 border border-chinese-gold pointer-events-none"
  ></div>

  <div class="space-y-6 relative z-10">
    <div class="section">
      <div
        class="text-chinese-red text-center font-chinese text-base sm:text-lg uppercase border-b-2 border-chinese-gold mb-6 mx-auto w-fit"
      >
        Chinese Lesson
      </div>
      <div
        class="items-center gap-4 sm:gap-6 bg-gray-50 p-4 border border-gray-200"
      >
        <div
          class="text-4xl sm:text-4xl font-bold text-chinese-red font-chinese text-center"
        >
          {lesson.chinese}
        </div>
        <div class="text-center mt-4">
          <p
            class="text-chinese-red font-bold text-[10px] sm:text-xs uppercase tracking-tighter"
          >
            {lesson.pronunciation}
          </p>
          <p class="text-lg sm:text-xl font-normal text-gray-800 font-serif">
            {lesson.english}
          </p>
        </div>
      </div>
    </div>
  </div>

  <button
    class="w-full mt-4 py-3 px-6 bg-chinese-red hover:bg-red-800 border-4 border-chinese-gold text-white font-chinese font-bold text-lg sm:text-xl uppercase tracking-widest transition-all active:scale-95 shadow-[4px_4px_0px_rgba(0,0,0,0.2)]"
    on:click={reset}
  >
    Try Another Cookie
  </button>
</div>
