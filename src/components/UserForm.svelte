<script>
  let {initial = { name: '', email: '', role: '' }, onSave, onCancel} = $props()

  let name = $state(initial.name)
  let email = $state(initial.email);
  let role = $state(initial.role)

  // Perform Some Basic Validation, Just A Simple RegEx On The Email
  let valid = $derived(name.trim() && /\S+@\S+\.\S+/.test(email) && role.trim());

  // Save The Update Or New Entry
  const handeleSave = (e) => {
    e.preventDefault()
    if (!valid) return;
    onSave?.({ name: name.trim(), email: email.trim(), role: role.trim() });
  }
</script>

<form onsubmit={(e) => handeleSave(e)}>
  <div class="form-row">
    <label for="name">Name</label>
    <input class="input" name="name" bind:value={name}/>
  </div>

  <div class="form-row">
    <label for="email">Email</label>
    <input class="input" name="email" bind:value={email} />
  </div>

  <div class="form-row">
    <label for="role">Role</label>
    <input class="input" name="role" bind:value={role} />
  </div>

  <div class="form-buttons-container">
    <button type="button" class="btn ghost small" onclick={() => onCancel?.()}>Cancel</button>
    <button class="btn small" disabled={!valid}>Save</button>
  </div>
</form>

<style>
    form{
      font-weight: bold;
    }
    input{
      width: 100%;height: 50px; 
    }
    .form-buttons-container{
        width: 100%; height: 30px;
        display:flex; gap:8px;
        justify-content:space-evenly;
        margin-top:20px;
        
    }

    .form-buttons-container button{
      width: 120px;height: 40px;
      font-weight: bold; 
    }
</style>