<script>
  import Header from './components/Header.svelte';
  import UserTable from './components/UserTable.svelte';
  import UserForm from './components/UserForm.svelte';
  import Modal from './components/Modal.svelte';
  import ConfirmDelete from './components/ConfirmDelete.svelte';
  import Author from './components/Author.svelte';

  // For Conditional Output
  let showModal = $state(false);
  let editing = $state(null);
  let deleting = $state(false)
  let userToDelete = $state({})
  let searchQuery = $state('')



</script>

