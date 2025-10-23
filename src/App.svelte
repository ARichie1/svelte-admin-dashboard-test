<script>
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

// Opens Modal For EDIT and ADD
  const openAdd = () => { editing = null; showModal = true; }
  const openEdit = (id) => { editing = id; showModal = true; }
  const openDelete = (user) => { deleting = true; userToDelete = user; showModal = true; }

  // Saves Data To The Store
  const handleSave = (data) => {
    if (editing) users.updateUser(editing, data);
    else users.add(data);
    showModal = false;
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

  const handleSearch = (q) => {
    searchQuery = q
  }

  // Use Reactive Variable a User On EDIT or A Template To Add A User
  let initial = $derived(() => editing ? get(users).find(user => user.id === editing) : { name: '', email: '', role: '' });
</script>

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
        {initial}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    {/if}
  </Modal>
</div>
 <Author />

