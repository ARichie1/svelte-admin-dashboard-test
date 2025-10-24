<script>
  let {query = $bindable(), onSearch, onAdd} = $props()
  
  let search = $state()
  let showMenu = $state(false)

  // Dark / Light Toggle
  let theme = $state(localStorage.getItem('theme') || 'light');
  
  $effect(() => {
    document.documentElement.dataset.theme = theme;
  })

  const toggleTheme = () => {
    theme = theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
  }

  // Handle The Search Feature
  const handleSearch = () => {
    if(onSearch) onSearch(query);
  }
</script>

<div class="header">
  <div>
    <h2>SVELTE ADMIN DASHBOARD</h2>
  </div>

    <div class="header-right bg" style="display: n;">
      <input class="input" placeholder="Search..." bind:value={search} oninput={() => onSearch?.(search)} />
      <button class="btn ghost small add-user" onclick={() => onAdd?.()}>+ Add User</button>
      <button class="dark-toggle" onclick={toggleTheme}>{theme === 'light' ? '🌙' : '☀️'}</button>
    </div>

    {#if showMenu}
      <div class="header-right sm" style="display: n;">
        <input class="input" placeholder="Search..." bind:value={search} oninput={() => onSearch?.(search)} />
        <button class="btn ghost small add-user" onclick={() => onAdd?.()}>+ Add User</button>
        <button class="dark-toggle" onclick={toggleTheme}>{theme === 'light' ? '🌙' : '☀️'}</button>
      </div>
    {/if}

  <button class="menu-btn" onclick={() => showMenu = !showMenu}>📑</button>
</div>

<style>
    .header-right {
        width: 60%;
        display:flex; gap:8px;
        align-items:center;
    }
    .bg{display: flex}
    .sm{display: none}
    .input{
        width: 70%; height: 45px;
    }
    .add-user{
      height: 45px;
      background: green;
      font-weight: bold;
    }
    .dark-toggle{
        width: 35px; font-size: 100%;
        border-radius: 100%;
        text-align: center;
        display: flex;
        justify-content: center;
    }
    .menu-btn{display: none ;}
    @media screen and (max-width:600px){
      .header-right {
        position: absolute;
        top: 12%; right: 0%;
        width: 15rem; height: 15rem;
        display:flex; gap:8px;
        align-items:center; justify-content: space-evenly;
        flex-direction: column;
        background: var(--accent);
        border-bottom-left-radius: 6px;
        transition: 1s ease-in-out;
      }
      .input, .add-user{
        width:85%
      }
      .menu-btn{
        display: flex ;
        font-size: 20px;
        cursor: pointer;
        background: transparent;
        border: none;
      }
      .sm{display: flex}
      .bg{display: none}
    }
</style>
