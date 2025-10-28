²<script>
  import { derived } from "svelte/store";

  let {initial = { name: '', email: '', role: '' }, 
  onSave, onCancel, isEditing, existingEmails} = $props()
  
  // Local States For The Input Fields
  let name = $state(initial.name)
  let email = $state(initial.email)
  let role = $state(initial.role)

  // If "initial" Changes, Update The Local State
  $effect(() => {
    name = initial.name;
    email = initial.email;
    role = initial.role;
  });
  
  // This Will Help Display The Error or Success Message
  let showMessage = $state({
    nameError : false, emailError : false, roleError : false
  })

  // Check On Valid
  let validText = "✔"

  // Valid Roles
  let roleOptions = ["admin", "editor", "user"]

  // Success Object To Keep Track Of User Inputs
  let valid = $state({
    name: null, email:null, role: null
  });

  // Error Object To Keep Track Of User Inputs
  let errors = $state({
    name: null, email:null, role: null
  });

  // Check If Errors Exist Across All The Input Fields
  let errorExist = $derived(() => {
    if (errors.name || errors.email || errors.role) return true
    else return false
  })

  // Perform Some Basic Validation Logic On User Inputs
  let validate = () => {
    let errs = {};

    // Name Field
    if (!name.trim()){ 
      errs.name = "Name is required.";
      showMessage.nameError = true;
    }
    else if (name.length < 2) {errs.name = 'Name must be 2 letters and above'; showMessage.nameError = true}
    else {
      showMessage.nameError = false; 
      valid.name = validText;
    }

    // Email Field
    if (!email.trim()) {errs.email = 'Email is required.'; showMessage.emailError = true}
    else if (!/\S+@\S+\.\S+/.test(email)) {errs.email = 'Email is invalid.'; showMessage.emailError = true}
    else if ((existingEmails).includes(email.trim()) && !isEditing)
      { errs.email = 'Email already exists.'; showMessage.emailError = true}
    else if(!errors.email){
      showMessage.emailError = false
      valid.email = validText}

    // Role Field
    if (!role.trim()) {errs.role = 'Role is required.'; showMessage.roleError = true}
    else if (!["admin", "user", "editor"].includes(role.trim())) {errs.role = "Admin or User or Editor"; showMessage.roleError = true}
    else {showMessage.roleError = false; valid.role = validText;}

    errors = errs

    // If Any There Is Any Input Error
    return Object.keys(errs).length === 0;
  }

  // Save The Update Or New Entry
  const handeleSave = (e) => {
    e.preventDefault()
    if (!validate()) return;
    onSave?.({
      name: name.trim(),
      email: email.trim(),
      role: role.trim()
    });
  }
</script>

<form onsubmit={(e) => handeleSave(e)}>
  <div class="form-row">
    <label for="name">Name</label>
    <div class="input-container">
      <input class={`input ${showMessage.nameError ? "error" : "valid"}`} name="name"  
        bind:value={name} oninput={() => {validate()}}/>
      {#if errors.name}<div class="error-text">{errors.name}</div>{/if}
      {#if (valid.name && !showMessage.nameError)}<div class="valid-message">{valid.name}</div>{/if}
    </div>
  </div>

  <div class="form-row">
    <label for="email">Email</label>
    <div class="input-container">
      <input class={`input ${showMessage.emailError ? "error" : "valid"}`} name="email" 
      bind:value={email} oninput={() => {validate()}}/>
        {#if errors.email}<div class="error-text">{errors.email}</div>{/if}
        {#if (valid.email && !showMessage.emailError)}<div class="valid-message">{valid.email}</div>{/if}
    </div>
  </div>

  <div class="form-row">
    <label for="role">Role</label>
    <div class="input-container">
      <select class={`input ${showMessage.roleError ? "error" : "valid"}`} name="role" 
        bind:value={role} onchange={() => {validate()}}>
        {#each roleOptions as rol}
          <option value={rol}>{rol}</option>
        {/each}
      </select>
      {#if errors.role}<div class="error-text">{errors.role}</div>{/if}
      {#if (valid.role && !showMessage.roleError)}<div class="valid-message">{valid.role}</div>{/if}
    </div>
  </div>

  <div class="form-buttons-container">
    <button type="button" class="btn ghost small" onclick={() => onCancel?.()}>Cancel</button>
    <button class={`btn small ${errorExist() ? "disabled" :  "enabled"}`}>Save</button>
  </div>
</form>

<style>
    form{
      font-weight: bold;
    }
    .input-container{
      position: relative;
    }
    label{
      margin-bottom: 10px;
    }
    .input-container select{
      position: relative;
      width: 100%; height: 50px;
      cursor: pointer;
    }

    input {
      width: 100%;height: 50px;
      border: 2px solid #ccc;
      border-radius: 6px;
      padding: 8px;
      width: 100%;
      color: var(--text)
    }
    input:focus {
      outline: none;
      border-color: var(--input-focus);
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
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
    .valid{
      border-color: #22c55e;
      box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.15);
    }
    .error {
      border-color: #e63946;
      box-shadow: 0 0 0 2px rgba(230, 57, 70, 0.15);
    }
    .error-text { 
      color: #e63946; 
      font-size: 12px; 
      margin-top: 3px; 
    }
    .valid-message{
      position: absolute;
      top: 0%; right: 0%;
      width: 50px; height: 50px;
      display: flex; justify-content: center;
      align-items: center;
      color: #22c55e;
    }
    .enabled{opacity: 1; cursor: pointer;}
    .disabled{opacity: 0.5; cursor: none;}
</style>
