<script>
  let {query = $bindable(), onSearch, onAdd} = $props()
  
  let search = $state()

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

  <div class="header-right">
    <input class="input" placeholder="Search..." bind:value={search} oninput={() => onSearch?.(search)} />
    <button class="btn ghost small add-user" onclick={() => onAdd?.()}>+ Add User</button>
    <button class="dark-toggle" onclick={toggleTheme}>{theme === 'light' ? '🌙' : '☀️'}</button>
  </div>
</div>

<style>
    .header-right {
        width: 60%;
        display:flex; gap:8px;
        align-items:center;
    }
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
</style>
