<script>
  let {query = $bindable(), onSearch, onAdd} = $props()
  
  let search = $state()
  let showMenu = $state(false)
  let showSearch = $state(false)

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
      <button class="dark-toggle" onclick={toggleTheme}>{theme === 'light' ? '🌙 ' : '☀️'}</button>
    </div>

    {#if showMenu} 
      <div class="mobileMenu sm">
        <button class="btn ghost small add-user" onclick={() => onAdd?.()}>+ Add User</button>
        <button class="dark-toggle" onclick={toggleTheme}>{theme === 'light' ? '🌙' : '☀️'}</button>
      </div>
      
    {/if}

    {#if showSearch}
      <div class="mobileSearch">
          <input class="input" placeholder="Search..." bind:value={search} oninput={() => onSearch?.(search)} />
      </div>
    {/if}

  <button class="search-btn mobile" onclick={() => {showSearch = !showSearch; showMenu = false}}>🔍</button>
  <button class="menu-btn mobile" onclick={() => {showMenu = !showMenu; showSearch = false}}>📑</button>
</div>

<style>
  .header{
    position: relative;
  }
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
  .mobile{display:none}
  @media screen and (max-width:600px){
    .mobileMenu {
      position: absolute;
      top: 120%; right: 0%;
      width: 15rem; height: 15rem;
      display:flex; gap:8px;
      align-items:center; justify-content: space-evenly;
      flex-direction: column;
      background: var(--bg);
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
      transition: 1s ease-in-out;
    }
    .input::placeholder{
      color: var(--card)
    }

    .input, .add-user{
      width:85%
    }
    .mobileSearch{
      position: absolute;
      top: 110%;
      width: 100%; height: 40px;
    }
    .mobileSearch input{
      width: 100%; height: 100%;
      background: #fff;
    }
    .mobileSearch input::placeholder{
      color: #000;
    }
    .mobileSearch input:focus{
      border: 2px solid var(--input-focus);
      outline: 2px solid var(--input-focus);
    }
    .menu-btn, .search-btn{
      display: flex ;
      font-size: 20px;
      cursor: pointer;
      background: transparent;
      border: none;
    }
    .mobile{display: flex}
    .sm{display: flex}
    .bg{display: none}
  }
</style>
