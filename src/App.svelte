<script>
  import { fade } from 'svelte/transition';

  import Header from './components/Header.svelte';
  import UserTable from './components/UserTable.svelte';
  import UserForm from './components/UserForm.svelte';
  import Modal from './components/Modal.svelte';
  import ConfirmDelete from './components/ConfirmDelete.svelte';
  import Author from './components/Author.svelte';

  import { users } from './stores/user';
  import { get } from 'svelte/store';

  // For Conditional Output
  let showModal = $state(false);
  let editing = $state(null);
  let deleting = $state(false)
  let userToDelete = $state({})
  let searchQuery = $state('')
  let message = $state("");

  let existingEmails = $state([])

// Opens Modal For EDIT and ADD
  const openAdd = () => {
    editing = false; 
    showModal = true;
    existingEmails = get(users).map(user => user.email)
  }
  const openEdit = (id) => { 
    console.log(id);
    editing = id; showModal = true;
    existingEmails = get(users).map(user => user.email)
  }
  const openDelete = (user) => { deleting = true; userToDelete = user; showModal = true; }


  // Saves Data To The Store
  const handleSave = (data) => {
    if (editing) {
      users.updateUser(editing, data);
      message = 'User updated successfully!';
    } else {
      users.add(data);
      message = 'User added successfully!';
    }
    showModal = false;
    setTimeout(() => (message = ''), 2500);
  }

  // Deletes User
  const handleDelete = (id) => {
      users.remove(id)
      showModal = false
      deleting = false
  }

  // Helps To Close The Modal
  const handleCancel = () => { 
    showModal = false; 
    deleting = false
  }

  const handleSearch = (query) => {
    searchQuery = query
  }

  // Use Reactive Variable a User On EDIT or A Template To Add A User
  let initial = $derived(() => {
    return editing ? get(users).find(user => user.id === editing) : { name: '', email: '', role: '' };
  });  
</script>

{#if message}
  <div transition:fade class="alert success">{message}</div>
{/if}
<div class="container">
  <Header bind:query={searchQuery}
    onSearch={handleSearch}
    onAdd={openAdd}
  />

  <UserTable
    query={searchQuery}
    onEdit={openEdit}
    onDelete={openDelete}
  />

  <!-- Modal Used To ADD or EDIT a User -->
  <Modal open={showModal} onClose={handleCancel}>
    {#if deleting}
      <ConfirmDelete onCancel={handleCancel} onDelete={handleDelete} {userToDelete}/>
    {:else}
      <h3>{editing ? 'Edit User' : 'Add A User'}</h3>
      <UserForm
        initial={initial()}
        onSave={handleSave}
        onCancel={handleCancel}
        isEditing={editing}
        {existingEmails}
      />
    {/if}
  </Modal>
</div>
 <Author />

